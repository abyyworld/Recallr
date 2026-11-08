// Maths answer checking, shared by the practice page (inlined by the build) and
// by scripts/test-maths.js, so the page marks answers exactly as the tests do.
//
//   MATHS.evaluate("3/8 + 0.25")             -> 0.625
//   MATHS.evaluate("k/n", {k: 3, n: 4})      -> 0.75
//   MATHS.checkNumber("0.27", 0.2689)        -> "ok"
//   MATHS.checkExpr("s*(1-s)", "s - s^2", {s: [0.1, 0.9]}) -> "ok"
//
// Typed answers can be numbers (0.27, .27, 27%, 1e-3, 1,000), fractions (8/27) or sums
// (1 - 11/36). Supported: + - * / ^ ( ) !, implicit multiplication (2p, s(1-s)),
// ln, log (natural; log(x, 2) for another base), log2, log10, exp, sqrt, abs, sigmoid,
// choose(n, k), e, pi. A one-value function needs no brackets: ln 20, √0.5, log₂ 8.
const MATHS = (() => {
  const FUNCS = {
    ln: Math.log, log: Math.log, log2: Math.log2, log10: Math.log10, exp: Math.exp,
    sqrt: Math.sqrt, abs: Math.abs, sigmoid: z => 1 / (1 + Math.exp(-z)),
    choose: (n, k) => fact(n) / (fact(k) * fact(n - k)),
  };
  const CONSTS = { e: Math.E, pi: Math.PI };

  function fact(n) {
    if (!Number.isInteger(n) || n < 0 || n > 170) return NaN;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  // Unicode and typing habits: −, ×, ·, ÷, ², ³, √, π, ≈, log₂, "1,000" (thousands),
  // "0,25" (a decimal comma).
  function tidy(src) {
    let s = String(src).trim()
      .replace(/[\u2212\u2012\u2013\u2014]/g, "-")
      .replace(/[×⋅·]/g, "*")
      .replace(/÷/g, "/")
      .replace(/²/g, "^2").replace(/³/g, "^3")
      .replace(/√/g, " sqrt ").replace(/π/g, "pi").replace(/σ/g, "sigmoid")
      .replace(/[\u2080-\u2089]+/g, d => [...d].map(c => c.charCodeAt(0) - 0x2080).join("") + " ")   // log₂ 8
      .replace(/\*\*/g, "^")
      .replace(/^(?:[a-zA-Z_][\w]*\s*)?(?:=|≈|~)\s*/, "")   // "p = 0.27", "≈ 0.27"
      .replace(/^(?:≈|~)/, "")
      .trim();
    if (/^-?[1-9]\d{0,2}(,\d{3})+$/.test(s)) s = s.replace(/,/g, "");
    else if (!s.includes(".") && /^-?\d+,\d+$/.test(s)) s = s.replace(",", ".");
    return s;
  }

  function tokenize(s) {
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      const num = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(s.slice(i));
      if (num) {
        if (out.length && out[out.length - 1].t === "num") throw new Error("two numbers are next to each other");   // "1 600"
        out.push({ t: "num", v: parseFloat(num[0]) }); i += num[0].length; continue;
      }
      const id = /^[a-zA-Z_][a-zA-Z_0-9]*/.exec(s.slice(i));
      if (id) { out.push({ t: "id", v: id[0] }); i += id[0].length; continue; }
      if ("+-*/^()!%,".includes(c)) { out.push({ t: c }); i++; continue; }
      throw new Error(`I can't read "${c}"`);
    }
    return out;
  }

  // Recursive descent: expr := term (+|- term)*; term := unary ((*|/|implicit) unary)*;
  // unary := (+|-) unary | power; power := postfix (^ unary)?; postfix := primary (!|%)*
  function parse(src, vars) {
    const toks = tokenize(tidy(src));
    let p = 0;
    const peek = () => toks[p], take = () => toks[p++];
    const startsPrimary = t => t && (t.t === "num" || t.t === "id" || t.t === "(");
    function expr() {
      let v = term();
      while (peek() && (peek().t === "+" || peek().t === "-")) {
        const op = take().t, r = term();
        v = op === "+" ? v + r : v - r;
      }
      return v;
    }
    function term() {
      let v = unary();
      for (;;) {
        const t = peek();
        if (t && (t.t === "*" || t.t === "/")) { take(); const r = unary(); v = t.t === "*" ? v * r : v / r; }
        else if (startsPrimary(t)) v *= unary();
        else return v;
      }
    }
    function unary() {
      const t = peek();
      if (t && t.t === "-") { take(); return -unary(); }
      if (t && t.t === "+") { take(); return unary(); }
      return power();
    }
    function power() {
      const base = postfix();
      if (peek() && peek().t === "^") { take(); return Math.pow(base, unary()); }
      return base;
    }
    function postfix() {
      let v = primary();
      while (peek() && (peek().t === "!" || peek().t === "%")) v = take().t === "!" ? fact(v) : v / 100;
      return v;
    }
    function args() {
      take(); // (
      const list = [expr()];
      while (peek() && peek().t === ",") { take(); list.push(expr()); }
      if (!peek() || peek().t !== ")") throw new Error("a bracket is not closed");
      take();
      return list;
    }
    function primary() {
      const t = take();
      if (!t) throw new Error("the answer stops too early");
      if (t.t === "num") return t.v;
      if (t.t === "(") {
        const v = expr();
        if (!peek() || peek().t !== ")") throw new Error("a bracket is not closed");
        take();
        return v;
      }
      if (t.t === "id") {
        const name = t.v;
        if (vars && Object.prototype.hasOwnProperty.call(vars, name)) return vars[name];
        const fname = name === "C" ? "choose" : name;
        const f = Object.prototype.hasOwnProperty.call(FUNCS, fname) ? FUNCS[fname] : null;
        if (f && peek() && peek().t === "(") {
          const list = args();
          if (fname === "log" && list.length === 2) return Math.log(list[0]) / Math.log(list[1]);   // log(x, 2)
          if (list.length !== f.length) throw new Error(`${name} takes ${f.length === 1 ? "one value" : f.length + " values"}`);
          return f(...list);
        }
        // "ln 20", "√0.5": a one-value function applies to what follows it
        if (f && f.length === 1 && startsPrimary(peek())) return f(power());
        if (Object.prototype.hasOwnProperty.call(CONSTS, name)) return CONSTS[name];
        // a run of single-letter variables typed together, like "kn" for k*n
        if (vars && [...name].every(ch => Object.prototype.hasOwnProperty.call(vars, ch))) return [...name].reduce((a, ch) => a * vars[ch], 1);
        throw new Error(`I don't know "${name}"`);
      }
      throw new Error(`"${t.t}" is in the wrong place`);
    }
    if (!toks.length) throw new Error("the answer is empty");
    const v = expr();
    if (p < toks.length) throw new Error(`"${toks[p].t === "num" || toks[p].t === "id" ? toks[p].v : toks[p].t}" is in the wrong place`);
    return v;
  }

  function evaluate(src, vars) { return parse(src, vars); }

  // A bare number typed by hand: how many decimals and significant figures it has.
  function literal(src) {
    const s = tidy(src).replace(/\s+/g, "");
    const m = /^([+-]?)(\d*)(?:\.(\d*))?(%?)$/.exec(s);
    if (!m || (m[2] === "" && (m[3] === undefined || m[3] === ""))) return null;
    const digits = (m[2] + (m[3] || "")).replace(/^0+/, "");
    return { decimals: (m[3] || "").length + (m[4] ? 2 : 0), sig: digits.length || 1 };
  }

  // "ok", "precision" (right value but too few digits), "wrong" or "invalid".
  function checkNumber(input, answer) {
    let x;
    try { x = evaluate(input); } catch (e) { return "invalid"; }
    if (!Number.isFinite(x)) return "invalid";
    const a = Number(answer), diff = Math.abs(x - a), scale = Math.max(1, Math.abs(a));
    if (diff <= 1e-9 * scale) return "ok";
    const lit = literal(input);
    if (lit) {
      const half = 0.5 * Math.pow(10, -lit.decimals) * (1 + 1e-9);
      // A whole-number answer (a count such as 600 or 2^8) typed as a whole
      // number must be exact: 599 or 255 is a real mistake, not rounding.
      const count = lit.decimals === 0 && Math.abs(a - Math.round(a)) <= 1e-9 * scale;
      const close = diff <= half || (!count && a !== 0 && diff <= 0.01 * Math.abs(a));
      if (!close) return "wrong";
      if (lit.sig >= 2) return "ok";
      // One significant figure (0.7 for 0.722) is "the right idea" only when it
      // has a decimal point and is near the answer. A single whole digit is
      // usually a different answer: 0 for 0.05, 1 for 0.73, 2 bits for 1.906.
      return lit.decimals > 0 && x !== 0 && diff <= 0.15 * Math.abs(a) ? "precision" : "wrong";
    }
    // a typed calculation such as 1/(1+2.718): allow small rounding inside it
    return a !== 0 && diff <= 0.005 * Math.abs(a) ? "ok" : "wrong";
  }

  // Deterministic sample points inside each variable's [low, high] range.
  function samples(ranges, count) {
    const names = Object.keys(ranges);
    let seed = 12345;
    const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
    const pts = [];
    for (let i = 0; i < count; i++) {
      const pt = {};
      for (const n of names) {
        const [lo, hi, integer] = ranges[n];
        let v = lo + rnd() * (hi - lo);
        if (integer) v = Math.round(v);
        pt[n] = v;
      }
      pts.push(pt);
    }
    return pts;
  }

  // Is a typed formula the same function as the reference over the given ranges?
  function checkExpr(input, ref, ranges) {
    const pts = samples(ranges, 8);
    let compared = 0;
    for (const pt of pts) {
      let want, got;
      try { want = evaluate(ref, pt); } catch (e) { continue; }
      if (!Number.isFinite(want)) continue;
      try { got = evaluate(input, pt); } catch (e) { return "invalid"; }
      if (!Number.isFinite(got)) return "wrong";
      if (Math.abs(got - want) > 1e-7 * Math.max(1, Math.abs(want))) return "wrong";
      compared++;
    }
    return compared ? "ok" : "invalid";
  }

  const squash = s => String(s).toLowerCase().replace(/[\s.,;:!?'"`()\-‘’“”]/g, "");
  // A word answer is right if it matches an accepted answer, ignoring case, spaces
  // and punctuation. An answer with an explanation, like "S (sunny spot)" or
  // "no, dependent", is also right when every part of it is an accepted answer.
  function checkText(input, accepted) {
    const a = squash(input);
    if (!a) return "invalid";
    const ok = x => accepted.some(y => squash(y) === squash(x));
    if (ok(input)) return "ok";
    const parts = String(input).split(/[,;:()[\]]|\s[-\u2013\u2014]\s/).filter(p => squash(p));
    return parts.length > 1 && parts.every(ok) ? "ok" : "wrong";
  }

  // Short, readable form of a computed answer: whole numbers as they are, else 4 significant figures.
  function format(x) {
    if (typeof x !== "number") return String(x);
    if (Number.isInteger(x)) return String(x);
    return String(parseFloat(x.toPrecision(4)));
  }

  // Mark one answer against an answer spec {type: "number"|"expr"|"text", value, whole, ref, vars, accept}.
  // whole: the answer is a whole number (a count, or n rounded up) and must be exact.
  function check(input, spec) {
    if (spec.type === "expr") return checkExpr(input, spec.ref, spec.vars);
    if (spec.type === "text") return checkText(input, spec.accept);
    // "5/6 (0.833)" or "0.7 (70%)": an answer followed by the same value written
    // another way. Both must be right; it is not 5/6 times 0.833.
    const both = /^(.*\S)\s+\(\s*(-?[\d.,]+\s*(?:%|\/\s*[\d.]+)?)\s*\)\s*$/.exec(String(input));
    if (both) {
      const r = [markNumber(both[1], spec), markNumber(both[2], spec)];
      for (const worst of ["invalid", "wrong", "precision"]) if (r.includes(worst)) return worst;
      return "ok";
    }
    return markNumber(input, spec);
  }
  function markNumber(input, spec) {
    if (spec.whole) {
      let x;
      try { x = evaluate(input); } catch (e) { return "invalid"; }
      if (!Number.isFinite(x)) return "invalid";
      return Math.abs(x - spec.value) <= 1e-9 * Math.max(1, Math.abs(spec.value)) ? "ok" : "wrong";
    }
    return checkNumber(input, spec.value);
  }

  return { evaluate, checkNumber, checkExpr, checkText, check, format, fact, tidy };
})();
if (typeof module !== "undefined") module.exports = MATHS;
