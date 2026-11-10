// Checks a maths module's exercises and records the answers the page marks against.
//   node scripts/test-maths.js modules/artificial-intelligence-2
// For every exercise (and its variation):
//   - the final answer is computed from answer.calc, or checked as a formula or a word,
//     and the way it is written after marking ("show") must be marked right, and every
//     listed typical mistake ("wrong") must be marked wrong;
//   - every accepted answer for every gap must be marked right against the gap's true value;
//   - the "plug in" value is computed;
//   - no text has a leftover ___ gap, an em dash or an en dash;
//   - each lesson card (if the module has them) shows its own worked value and gives no answer away,
//     and the Essentials (core) cover every topic of their week.
// The marking itself is shared/maths.js, the same code the page uses.
// Writes <module>/answers.json. Needs only Node.
const fs = require("fs"), path = require("path");
const MATHS = require("../shared/maths.js");

const dir = path.resolve(process.argv[2] || "");
if (!fs.existsSync(path.join(dir, "deck.js"))) { console.error("usage: node scripts/test-maths.js <module dir>"); process.exit(2); }
const DECK = require(path.join(dir, "deck.js"));
const { SRC, TWINS } = require(path.join(dir, "variations.js"));
const mod = JSON.parse(fs.readFileSync(path.join(dir, "module.json"), "utf8"));

// Names that answer.calc, fill.values and predict.calc can use.
const choose = (n, k) => MATHS.fact(n) / (MATHS.fact(k) * MATHS.fact(n - k));
const HELPERS = {
  ln: Math.log, log: Math.log, log2: Math.log2, log10: Math.log10, exp: Math.exp, sqrt: Math.sqrt,
  abs: Math.abs, pow: Math.pow, min: Math.min, max: Math.max, PI: Math.PI, E: Math.E,
  ceil: Math.ceil, floor: Math.floor, round: Math.round,
  fact: MATHS.fact, choose, C: choose,
  sigmoid: z => 1 / (1 + Math.exp(-z)),
  sum: xs => xs.reduce((a, b) => a + b, 0),
  mean: xs => xs.reduce((a, b) => a + b, 0) / xs.length,
  range: (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i),
  // entropy in bits of a list of probabilities (zeros allowed)
  entropy: ps => -ps.filter(p => p > 0).reduce((t, p) => t + p * Math.log2(p), 0),
};
const near = (x, y) => Math.abs(x - y) <= 1e-12 * Math.max(1, Math.abs(y));
if (!near(HELPERS.entropy([0.5, 0.5]), 1) || choose(4, 2) !== 6 || HELPERS.sigmoid(0) !== 0.5 || !near(HELPERS.entropy([1, 0]), 0)) {
  console.error("helper self-check failed"); process.exit(2);
}
function calc(src) {
  const f = new Function(...Object.keys(HELPERS), `"use strict"; return (${src});`);
  return f(...Object.values(HELPERS));
}
const tidyNum = x => Number(x.toPrecision(12));

let problems = 0;
const problem = (where, msg) => { console.log(`PROBLEM ${where}: ${msg}`); problems++; };

// Every string anywhere in an exercise, with its path, for the text checks.
function strings(v, at, out) {
  if (typeof v === "string") out.push([at, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => strings(x, `${at}[${i}]`, out));
  else if (v && typeof v === "object") for (const k in v) strings(v[k], at ? `${at}.${k}` : k, out);
  return out;
}

function answerSpec(where, a) {
  if (!a) { problem(where, "no answer"); return null; }
  const type = a.type || "number";
  let spec;
  if (type === "number") {
    let v;
    try { v = calc(a.calc); } catch (e) { problem(where, `answer.calc fails: ${e.message}`); return null; }
    if (typeof v !== "number" || !Number.isFinite(v)) { problem(where, `answer.calc gives ${v}`); return null; }
    spec = { type, value: tidyNum(v), show: a.show || MATHS.format(v) };
    if (a.whole) {
      if (!Number.isInteger(spec.value)) { problem(where, `answer is marked whole but answer.calc gives ${v}`); return null; }
      spec.whole = true;
    }
  } else if (type === "expr") {
    if (!a.ref || !a.vars || !a.calc) { problem(where, "a formula answer needs ref, vars and calc"); return null; }
    let f;
    try { f = calc(a.calc); } catch (e) { problem(where, `answer.calc fails: ${e.message}`); return null; }
    // the maths-syntax reference must agree with the independent JS version everywhere we sample
    const names = Object.keys(a.vars);
    let compared = 0;
    for (let i = 0; i < 12; i++) {
      const pt = {};
      for (const n of names) {
        const [lo, hi, integer] = a.vars[n];
        let v = lo + ((i * 7919 + n.charCodeAt(0) * 104729) % 1000) / 1000 * (hi - lo);
        if (integer) v = Math.round(v);
        pt[n] = v;
      }
      let want, got;
      try { want = f(...names.map(n => pt[n])); } catch (e) { continue; }
      if (!Number.isFinite(want)) continue;
      try { got = MATHS.evaluate(a.ref, pt); } catch (e) { problem(where, `answer.ref can't be read: ${e.message}`); return null; }
      if (Math.abs(got - want) > 1e-9 * Math.max(1, Math.abs(want))) { problem(where, `answer.ref ${a.ref} disagrees with answer.calc at ${JSON.stringify(pt)}: ${got} vs ${want}`); return null; }
      compared++;
    }
    if (!compared) { problem(where, "answer.calc gives no finite values in the variable ranges"); return null; }
    spec = { type, ref: a.ref, vars: a.vars, show: a.show || a.ref };
    for (const alt of a.alsoRight || []) if (MATHS.check(alt, spec) !== "ok") problem(where, `"${alt}" should be marked right but isn't`);
  } else if (type === "text") {
    if (!Array.isArray(a.accept) || !a.accept.length) { problem(where, "a word answer needs accept: [...]"); return null; }
    spec = { type, accept: a.accept, show: a.show || a.accept[0] };
    // phones type curly apostrophes: "they’re" must count as "they're"
    for (const x of a.accept) if (x.includes("'") && MATHS.check(x.replace(/'/g, "’"), spec) !== "ok") problem(where, `"${x}" typed with a curly apostrophe would be marked wrong`);
  } else { problem(where, `unknown answer type ${type}`); return null; }
  if (MATHS.check(spec.show, spec) !== "ok") problem(where, `the shown answer "${spec.show}" would be marked wrong`);
  // a listed mistake must be told it is wrong, not "right idea, more digits"
  for (const bad of a.wrong || []) {
    const r = MATHS.check(bad, spec);
    if (r !== "wrong") problem(where, `"${bad}" is listed as wrong but would be marked ${r === "ok" ? "right" : r}`);
  }
  return spec;
}

const answers = { course: {}, variation: {}, write: { course: {}, variation: {} }, fill: { course: {}, variation: {} } };

// A lesson card (shown before a new skill): { what, example, trace: [{ line, note }], value, result, tip }.
// value is the example's final number as JS (null for a word or formula); result is how the last line
// writes it. The example must not give away the answer of either version of the exercise.
function lessonCheck(where, L, mine, other){
  for (const f of ["what", "example", "tip"]) if (typeof L[f] !== "string" || !L[f].trim()) problem(where, `lesson has no ${f}`);
  if (!Array.isArray(L.trace) || L.trace.length < 2) return problem(where, "lesson needs at least 2 steps");
  for (const st of L.trace) {
    if (!st || typeof st.line !== "string") { problem(where, "a lesson step has no line"); continue; }
    if (st.line.length > 44) problem(where, `lesson line over 44 characters: "${st.line}"`);
  }
  if (typeof L.result !== "string" || !L.result.trim()) return problem(where, "lesson has no result");
  const last = L.trace[L.trace.length - 1].line || "";
  if (!last.replace(/\s/g, "").includes(L.result.replace(/\s/g, ""))) problem(where, `the lesson's last step "${last}" doesn't show its result "${L.result}"`);
  if (L.value == null) return;
  let v;
  try { v = calc(L.value); } catch (e) { return problem(where, `lesson value fails: ${e.message}`); }
  if (!Number.isFinite(v)) return problem(where, `lesson value gives ${v}`);
  const r = MATHS.check(L.result, { type: "number", value: v });
  if (r !== "ok") problem(where, `lesson result "${L.result}" would be marked ${r} (true value ${MATHS.format(v)})`);
  for (const a of [mine, other]) if (a && a.type === "number" && Math.abs(v - a.value) <= 1e-6 * Math.max(1, Math.abs(a.value))) problem(where, `the lesson's example gives away an answer (${a.show})`);
}

function test(side, id, s) {
  const where = `${side}/${id}`;
  for (const f of ["title", "sol", "explain"]) if (typeof s[f] !== "string" || !s[f].trim()) problem(where, `missing ${f}`);
  if (!s.write || !s.write.task) problem(where, "missing write.task");
  if (!s.fill || typeof s.fill.code !== "string" || !Array.isArray(s.fill.blanks) || !Array.isArray(s.fill.values)) { problem(where, "fill needs code, blanks and values"); return; }
  if (!s.predict || !s.predict.code || !s.predict.ask) { problem(where, "predict needs code and ask"); return; }

  // text checks
  for (const [at, str] of strings(s, "", [])) {
    if (/[\u2014\u2013]/.test(str)) problem(where, `${at} has an em or en dash`);
    if (str.includes("___") && at !== "fill.code") problem(where, `${at} has a ___ gap outside fill.code`);
  }

  // the final answer (Solve it)
  const spec = answerSpec(`${where} answer`, s.answer);
  if (spec) answers.write[side][id] = spec;

  // the gaps (Fill the gaps)
  const gaps = s.fill.code.split("___").length - 1;
  if (gaps < 1) problem(where, "fill.code has no ___ gap");
  if (gaps !== s.fill.blanks.length || gaps !== s.fill.values.length) problem(where, `fill.code has ${gaps} gaps but ${s.fill.blanks.length} blanks and ${s.fill.values.length} values`);
  const gapSpecs = s.fill.blanks.map((accepted, i) => {
    const gw = `${where} gap ${i + 1}`;
    const val = s.fill.values[i];
    if (!Array.isArray(accepted) || !accepted.length) { problem(gw, "no accepted answers"); return null; }
    let g;
    if (val === null) g = { type: "text", accept: accepted, show: accepted[0] };
    else if (typeof val === "object") {
      // { calc, whole: true } is a whole-number gap; { ref, vars, calc } is a formula gap
      g = answerSpec(gw, val.ref ? Object.assign({ type: "expr" }, val) : Object.assign({ type: "number", show: accepted[0] }, val));
    } else {
      let v;
      try { v = calc(val); } catch (e) { problem(gw, `value fails: ${e.message}`); return null; }
      if (!Number.isFinite(v)) { problem(gw, `value gives ${v}`); return null; }
      g = { type: "number", value: tidyNum(v), show: accepted[0] };
    }
    if (!g) return null;
    for (const a of accepted) if (MATHS.check(a, g) !== "ok") problem(gw, `accepted answer "${a}" would be marked ${MATHS.check(a, g)}${g.type === "number" ? ` (true value ${MATHS.format(g.value)})` : ""}`);
    return g;
  });
  if (gapSpecs.every(Boolean)) answers.fill[side][id] = gapSpecs;

  // the last step (Plug in)
  if (s.predict.code.includes("___")) problem(where, "predict.code has a ___ gap");
  if (s.predict.accept) {
    answers[side][id] = { type: "text", accept: s.predict.accept, show: s.predict.accept[0] };
  } else {
    const src = s.predict.calc || (s.answer && (s.answer.type || "number") === "number" ? s.answer.calc : null);
    if (!src) { problem(where, "predict needs calc (or accept) when the final answer is not a number"); return; }
    let v;
    try { v = calc(src); } catch (e) { problem(where, `predict.calc fails: ${e.message}`); return; }
    if (!Number.isFinite(v)) { problem(where, `predict.calc gives ${v}`); return; }
    const p = { type: "number", value: tidyNum(v), show: s.predict.show || MATHS.format(v) };
    // a whole-number final answer makes the plug-in value whole too, unless predict has its own calc
    if (s.predict.whole || (!s.predict.calc && s.answer && s.answer.whole)) {
      if (!Number.isInteger(p.value)) problem(where, `the plug-in value is marked whole but is ${v}`);
      else p.whole = true;
    }
    if (MATHS.check(p.show, p) !== "ok") problem(where, `predict.show "${p.show}" would be marked wrong`);
    answers[side][id] = p;
  }
}

const seen = new Set();
for (const s of DECK) {
  if (seen.has(s.id)) problem(s.id, "duplicate id");
  seen.add(s.id);
  if (!mod.weeks.includes(s.week)) problem(s.id, `week ${s.week} is not in module.json`);
  if (!s.topic) problem(s.id, "missing topic");
  if (!SRC[s.id]) problem(s.id, "no SRC entry (where it comes from)");
  if (!TWINS[s.id]) problem(s.id, "no variation in TWINS");
  test("course", s.id, s);
}
for (const id of Object.keys(TWINS)) {
  if (!seen.has(id)) { problem(id, "variation without a course exercise"); continue; }
  test("variation", id, TWINS[id]);
}
// lessons: optional, but once a module has them, every exercise and variation needs one
const withLessons = DECK.some(s => s.lesson) || Object.values(TWINS).some(t => t.lesson);
if (withLessons) for (const s of DECK) {
  for (const [side, x, other] of [["course", s, "variation"], ["variation", TWINS[s.id], "course"]]) {
    if (!x) continue;
    if (!x.lesson) { problem(`${side}/${s.id}`, "no lesson"); continue; }
    lessonCheck(`${side}/${s.id} lesson`, x.lesson, answers.write[side][s.id], answers.write[other][s.id]);
  }
}
// Essentials (core: true) must cover every topic of every week
const coreWeeks = new Set(DECK.filter(s => s.core).map(s => s.week));
for (const s of DECK) if (coreWeeks.has(s.week) && !DECK.some(c => c.core && c.week === s.week && c.topic === s.topic)) problem(s.id, `Essentials miss the topic "${s.topic}" in week ${s.week}`);
for (const id of Object.keys(SRC)) {
  if (!seen.has(id)) problem(id, "SRC entry without an exercise");
  if (/[\u2014\u2013]/.test(SRC[id])) problem(id, "SRC has an em or en dash");
}

fs.writeFileSync(path.join(dir, "answers.json"), JSON.stringify(answers, null, 2) + "\n");
console.log(problems ? `${problems} problem(s)` : `all ${DECK.length} exercises and ${Object.keys(TWINS).length} variations pass`);
process.exit(problems ? 1 : 0);
