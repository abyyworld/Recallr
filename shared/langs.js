// Languages other than Haskell: SQL, Cypher, JPA, JPQL and JDL (the databases module).
// Highlighting, the tables or graph an exercise runs against, marking and new questions.
// The build pastes shared/rows.js and this file into the page, after the data. shared/app.html
// calls in through a few one-line hooks marked "other languages"; Haskell cards never reach this code.
const DEFAULT_LANG = "__DEFAULT_LANG__";
const SQL_KW = "SELECT|FROM|WHERE|GROUP|BY|HAVING|ORDER|JOIN|LEFT|RIGHT|FULL|INNER|OUTER|NATURAL|ON|AS|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|VIEW|ALTER|ADD|DROP|TRUNCATE|PRIMARY|KEY|FOREIGN|REFERENCES|NOT|NULL|UNIQUE|CHECK|DEFAULT|AND|OR|IN|IS|LIKE|ILIKE|BETWEEN|DISTINCT|LIMIT|OFFSET|PREPARE|EXECUTE|DO|DECLARE|BEGIN|END|IF|THEN|ELSE|ELSIF|LOOP|FOR|WHILE|RAISE|NOTICE|CONSTRAINT|COLUMN|DESC|ASC|CASCADE|WITH|COPY|INDEX|RETURNING|FORMAT|USING|RENAME|TO|TYPE";
const LANG = {
  sql: { name: "SQL", judge: "PostgreSQL 16", kw: SQL_KW, ci: true, rows: true, setup: "Tables",
    write: "Write the SQL. The tables are above.", predict: "rows like: Ann, 3; Bo, 5",
    copy: "Copy mine with the tables", copyHint: "Paste it into instate or psql to run it, or compare line by line." },
  cypher: { name: "Cypher", judge: "Neo4j 5", kw: "MATCH|OPTIONAL|WHERE|RETURN|CREATE|MERGE|ON|SET|DELETE|DETACH|REMOVE|WITH|ORDER|BY|LIMIT|SKIP|UNION|ALL|AS|AND|OR|NOT|IS|NULL|DISTINCT|DESC|ASC|UNWIND|IN|CONTAINS|STARTS|ENDS|count|collect", rows: true, setup: "Graph",
    write: "Write the Cypher. The graph is above.", predict: "rows like: Ann, Golf; Bo, null",
    copy: "Copy mine with the graph", copyHint: "Paste it into the Neo4j browser in vLab to run it, or compare line by line." },
  jpa: { name: "Java (JPA)", judge: "javac and Hibernate 6", kw: "@\\w+|public|private|class|enum|new|return|import|static|final|void", setup: "Rows",
    write: "Write the entity classes. <code>jakarta.persistence.*</code> and <code>java.util.*</code> are already imported.", predict: "your answer",
    copy: "Copy mine", copyHint: "Compare yours line by line with the answer." },
  jpql: { name: "JPQL", judge: "Hibernate 6", kw: SQL_KW + "|COUNT|SUM|AVG|MIN|MAX|@\\w+|public|private|class", ci: true, rows: true, setup: "Entities and rows",
    write: "Write one JPQL query. The entities are above.", predict: "rows like: Emma; Dune",
    copy: "Copy mine", copyHint: "Compare yours line by line with the answer." },
  jdl: { name: "JDL", judge: "the JHipster JDL parser", kw: "entity|relationship|OneToMany|ManyToOne|OneToOne|ManyToMany|enum|required|unique|min|max|minlength|maxlength|pattern|to|with|builtInEntity", setup: "JDL",
    write: "Write the JDL.", predict: "your answer",
    copy: "Copy mine", copyHint: "Paste it into JDL Studio or the instate JDL editor to see the diagram, or compare line by line." },
};
// The language of a card, or null for Haskell.
function otherLang(s){ const k = (s && s.lang) || DEFAULT_LANG; return k === "haskell" ? null : LANG[k] || null; }

(function(){
  const css = document.createElement("style");
  css.textContent = `.card details.setup{background:var(--code-bg);border:none;border-radius:10px;padding:0 14px}
.card details.setup summary{font-size:13px;color:var(--muted);padding:8px 0}
.card details.setup pre.code{padding:0 0 12px;background:none}`;
  document.head.appendChild(css);
  // the mock test is in the vLab Haskell style, so it only shows for modules that have one
  if (!TESTS.length) { const v = document.querySelector(".chip.view"); if (v) v.parentElement.hidden = true; }
})();

// ---------- showing a card ----------
// Strings and keywords in one pass, so a keyword is never matched inside a span tag.
function hlOther(src){
  const l = current && otherLang(V(current.s));
  if (!l) return null;
  const re = new RegExp(`("[^"\\n]*"|'[^'\\n]*')|(?<![\\w@])(${l.kw})\\b`, l.ci ? "gi" : "g");
  let out = "", last = 0;
  for (const m of src.matchAll(re)) {
    out += esc(src.slice(last, m.index)) + `<span class="${m[1] ? "st" : "kw"}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(src.slice(last));
}
function setupBox(s){
  const parts = [s.entities, s.setup].filter(Boolean);
  for (const [name, text] of Object.entries(s.files || {})) parts.push(`-- ${name}\n${text.trim()}`);
  if (!parts.length) return "";
  return `<details class="setup" open><summary>${otherLang(s).setup}</summary><pre class="code">${hl(parts.join("\n\n"))}</pre></details>`;
}
function bodyOther(s, lvl){
  const l = otherLang(s);
  let body = setupBox(s);
  if (lvl === 3) {
    body += `<p class="task">${md(s.write.task)}</p>
      <label class="label" for="code">Your code</label>
      <textarea id="code" spellcheck="false" autocapitalize="off" autocomplete="off">${esc(s.write.starter)}</textarea>
      <p class="hint">${l.write} Ctrl+Enter to check.</p>`;
  } else if (lvl === 2) {
    let i = 0;
    const parts = esc(s.fill.code).split("___").map((p, k, arr) => k < arr.length-1 ? hl(unesc(p)) + `<input class="blank" id="b${i++}" aria-label="gap ${k+1}" autocomplete="off" spellcheck="false" size="10">` : hl(unesc(p)));
    body += `<p class="task">Fill the gap${s.fill.blanks.length>1?'s':''} so the code is correct.</p>
      <p class="task hint">${md(s.write.task)}</p>
      <pre class="code">${parts.join("")}</pre>`;
  } else {
    const ask = s.predict.ask ? md(s.predict.ask)
      : s.predict.expr ? `Read the code. What does <code>${esc(s.predict.expr)}</code> give?`
      : "Read the code. What does it return?";
    body += `<p class="task">${ask}</p>
      <pre class="code">${hl(s.predict.code)}</pre>
      <div class="answer-row"><input id="pred" autocomplete="off" spellcheck="false" placeholder="${esc(l.predict)}" aria-label="Your answer"></div>
      ${l.rows && !s.predict.ask ? '<p class="hint">Columns separated by commas, rows by semicolons. Write <code>null</code> for NULL and <code>(no rows)</code> if nothing comes back.</p>' : ""}`;
  }
  return body;
}

// ---------- marking ----------
function predictOther(input, s){
  const n = x => x.toLowerCase().replace(/['"`]/g, "").replace(/\s+/g, "");
  const a = n(input), b = n(s.predict.answer);
  if (!a) return false;
  const rows = x => x.split(";").filter(Boolean).sort().join(";");
  return a === b || (!/\border\s+by\b/i.test(s.predict.code) && rows(a) === rows(b));
}
async function checkOther(s, lvl){
  if (lvl === 1) {
    const v = $("pred").value;
    if (!v.trim()) return $("pred").focus();
    return predictOther(v, s) ? finish(true, "Right.", null) : retry("That's not what it gives. Trace it again one step at a time.");
  }
  if (lvl === 2) {
    const vals = s.fill.blanks.map((_, i) => $("b"+i).value);
    if (vals.some(v => !v.trim())) return document.querySelector(".blank:placeholder-shown, .blank")?.focus();
    const fold = otherLang(s).ci ? x => norm(x).toLowerCase() : norm;
    if (s.fill.blanks.every((acc, i) => acc.map(fold).includes(fold(vals[i])))) return finish(true, "Right.", null);
    let filled = s.fill.code; vals.forEach(v => filled = filled.replace("___", v));
    if (s.lang === "sql") {
      const r = await runCheck(s, filled);
      if (r) return r.ok ? finish(true, "Right. It gives the same result on PostgreSQL.", null) : retry(r.msg);
    }
    if (!sample) return retry("That doesn't match the expected answer. Check spelling and brackets.");
    return aiGrade(filled, true);
  }
  const code = $("code").value;
  if (norm(code) === norm(s.write.starter)) return $("code").focus();
  if (s.lang === "sql") {
    const r = await runCheck(s, code);
    if (r) return r.ok ? finish(true, "Correct. It ran on PostgreSQL and gave the right result.", code, current.tries > 0) : retry(r.msg);
  }
  if (!sample) return selfGrade();
  return aiGrade(code, false);
}
function markPrompt(s, code){
  const l = otherLang(s);
  const context = [s.entities, s.setup].filter(Boolean).join("\n\n");
  return `You are marking a beginner's ${l.name} exercise for a university __MODULE_NAME__ module. Judge it like ${l.judge} would.

TASK: ${s.write.task}
${context ? `ALREADY SET UP BEFORE THE STUDENT'S CODE RUNS:\n${context}\n` : ""}REFERENCE SOLUTION (one correct answer, others can be fine):
${s.sol}
TESTS IT MUST PASS (check => expected output; "@result" is what the student's code itself returns; rows are written "a, b; c, d"):
${s.checks.map(c => c[0] + " => " + c[1]).join("\n")}

STUDENT'S CODE (between the lines):
-----
${code}
-----

Extra whitespace, different letter case in keywords, aliases and other valid ways of writing it are fine. Judge only what is actually written above; read every line carefully before deciding, and never invent a line that isn't there.

Decide:
- "compiles": would ${l.judge} accept it without an error? Be strict about syntax: missing commas or brackets, misspelt keywords, wrong names of tables, columns, labels or classes.
- "correct": does it run AND give the expected output for every test? Different but valid approaches count as correct. Must do what the task asks, with the names the task uses.
- "line": if not correct, the single line of the student's code that is wrong, copied EXACTLY character for character from the code above; "" if correct or if the problem is something missing.
- "feedback": 1-3 short sentences for a beginner with little coding experience. If wrong, point to the exact line and the exact problem, and how to fix that one thing. Do not paste a full solution. If right, say briefly what they did well. Plain words, no jargon.

Do NOT give the corrected code or the answer. Give a hint that lets them fix it themselves.

Reply with only JSON: {"compiles": true/false, "correct": true/false, "line": "...", "feedback": "..."}`;
}
function selfGradeOther(s){
  const l = otherLang(s);
  setBusy(true);
  $("res").innerHTML = `<div class="result meh"><h3>Compare with this</h3>
    <pre class="code">${hl(s.sol)}</pre>
    <p class="hint">${l.copyHint} Be honest: it only helps you.</p>
    <div class="actions">
      <button class="btn" id="copyRun">${l.copy}</button>
      <button class="btn primary" id="selfYes">Mine works</button>
      <button class="btn" id="selfNo">Mine doesn't</button>
    </div></div>`;
  $("copyRun").onclick = () => {
    const mine = ($("code") ? $("code").value : s.sol).trim();
    const text = (s.lang === "sql" || s.lang === "cypher") && s.setup ? s.setup.trim() + "\n\n" + mine + "\n" : mine + "\n";
    const done = () => { const b = $("copyRun"); if (b) b.textContent = "Copied"; };
    try { navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text)); } catch(e) { fallbackCopy(text); }
  };
  $("selfYes").onclick = () => finish(true, "Marked as correct.", $("code")?.value ?? null, true);
  $("selfNo").onclick = () => finish(false, "Marked as not yet. It steps down a level and comes back soon.", $("code")?.value ?? null, true);
}
function explainContext(s){
  const ctx = [s.entities, s.setup].filter(Boolean);
  return ctx.length ? "Set up first:\n" + ctx.join("\n\n") + "\n" : "";
}

// ---------- running SQL in the page ----------
// PostgreSQL itself (PGlite) loads from a CDN the first time. If it can't load,
// marking falls back to the checker or to marking it yourself.
const PGLITE_URL = "https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.5.15/dist/index.js";
let pgLoad = null;
function loadPg(){ return pgLoad || (pgLoad = import(PGLITE_URL).then(m => m.PGlite).catch(() => null)); }
async function runCheck(s, code){
  setBusy(true);
  $("res").innerHTML = `<div class="result meh"><h3>Running it…</h3><p class="hint">Running your SQL on PostgreSQL in this page. The first run takes a few seconds.</p></div>`;
  let db = null;
  try {
    const PG = await loadPg();
    if (!PG) return null;
    try { db = new PG(); await db.waitReady; } catch(e) { return null; }
    try {
      if (s.setup) await runSql(db, s.setup, s.files);
      const res = await runSql(db, code, s.files);
      const mine = lastResult(res) ?? "(no rows)";
      for (const [q, want] of s.checks) {
        const got = q === "@result" ? mine : (lastResult(await runSql(db, q, s.files)) ?? "(no rows)");
        if (sameRows(got, want, /\border\s+by\b/i.test(q === "@result" ? s.sol : q))) continue;
        const shown = got.length > 160 ? got.slice(0, 160) + "…" : got;
        return { ok: false, msg: q === "@result"
          ? `It runs, but it returns <code>${esc(shown)}</code>, which isn't what the task asks for.`
          : `It runs, but afterwards <code>${esc(q)}</code> gives <code>${esc(shown)}</code>, which isn't right.` };
      }
      return { ok: true };
    } catch(e) {
      return { ok: false, msg: `PostgreSQL says: <code>${esc(String(e.message || e))}</code>` };
    }
  } finally {
    if (db) { try { db.close(); } catch(e) {} }
    setBusy(false);
  }
}

// ---------- new questions ----------
// Like generate() for Haskell. A generated SQL question is run on PostgreSQL before it's used:
// its expected outputs and predict answer come from the real result, and one that fails is dropped.
async function generateOther(){
  if (!sample) return;
  const weeks = [...weeksSel].sort();
  const pool = allSkills().filter(inWeek);
  const topics = [...new Set(pool.map(s => `week ${s.week}: ${s.topic} (${s.lang || DEFAULT_LANG})`))].join("; ");
  const langs = [...new Set(pool.map(s => s.lang || DEFAULT_LANG))];
  const example = pool.find(s => !s.gen && s.lang === "sql") || pool.find(s => !s.gen) || DECK[0];
  const ex = { week: example.week, topic: example.topic, title: example.title, lang: example.lang, entities: example.entities, setup: example.setup, sol: example.sol, checks: example.checks, write: example.write, fill: example.fill, predict: { code: example.predict.code, expr: example.predict.expr, ask: example.predict.ask, answer: example.predict.answer }, explain: example.explain };
  $("genBtn").disabled = true; $("genStatus").textContent = "Writing new questions… this can take a minute.";
  const prompt = `Write 5 NEW practice exercises in ${langs.map(x => LANG[x].name).join(" or ")} for a university __MODULE_NAME__ module, for a student who is new to programming.
Weeks: ${weeks.join(", ")}. Topics covered in those weeks: ${topics}.
They must be different from these existing ones: ${pool.map(s => s.title).join(", ")}.
Use the exact JSON shape of this example (one object per exercise):
${JSON.stringify(ex)}
Rules: "lang" is one of ${langs.join(", ")} (use the language the topic is taught in); for sql and cypher "setup" creates small tables or a small graph that the code runs against (jpql also has "entities", the @Entity classes); "sol" is a complete correct answer (PostgreSQL syntax for sql); "checks" are [check, expected output] pairs, where "@result" is what "sol" itself returns, written with columns separated by ", ", rows by "; ", NULL as null and no rows as (no rows); the task names the exact columns and, for several rows, the sort order; "fill.code" is the solution with 1 or 2 parts replaced by ___ and "fill.blanks" lists the accepted answers for each gap; "predict.code" is a short query run after "setup" and "predict.answer" is exactly what it returns in that format (for jpa and jdl give "predict.expr", a check, and "predict.ask", the question in words); "week" is one of ${weeks.join(", ")}; plain words in "task" and "explain". Double-check every expected output.
Reply with only a JSON array of 5 objects.`;
  try {
    const arr = await sample.json(prompt, { modelTier: "default", effort: "medium" });
    const ok = (Array.isArray(arr) ? arr : []).filter(g => g && g.sol && g.write && g.write.task && g.fill && typeof g.fill.code === "string" && g.fill.code.includes("___") && Array.isArray(g.fill.blanks) && g.predict && g.predict.answer != null && Array.isArray(g.checks) && weeksSel.has(Number(g.week)) && langs.includes(g.lang));
    const stamp = Date.now();
    const opt = v => v == null || v === "" ? undefined : String(v);
    let made = ok.map((g, i) => ({ id: `gen-${stamp}-${i}`, gen: true, week: Number(g.week), topic: String(g.topic || "Practice"), title: String(g.title || "new question"), lang: String(g.lang), entities: opt(g.entities), setup: opt(g.setup), sol: String(g.sol), checks: g.checks.map(c => [String(c[0]), String(c[1])]), write: { task: String(g.write.task), starter: String(g.write.starter || "") }, fill: { code: g.fill.code, blanks: g.fill.blanks.map(b => (Array.isArray(b) ? b : [b]).map(String)) }, predict: { code: String(g.predict.code || g.sol), expr: opt(g.predict.expr), ask: opt(g.predict.ask), answer: String(g.predict.answer) }, explain: String(g.explain || "") }));
    made = (await Promise.all(made.map(verifySql))).filter(Boolean);
    state.generated = (state.generated || []).concat(made);
    persist(); renderStats();
    $("genStatus").textContent = made.length ? `Added ${made.length} new question${made.length > 1 ? "s" : ""}. They're marked "AI-generated"; SQL ones were run on PostgreSQL to get their answers.` : "That didn't produce usable questions. Try again.";
    if (made.length && (!current || checked)) pickAndRender();
  } catch(e) {
    $("genStatus").textContent = e && e.code === "bad_key" ? "Your API key was rejected. Check it and save it again." : e && e.code === "rate_limited" ? "Too many requests just now. Try again in a minute." : "Couldn't generate questions just now. Try again.";
  }
  $("genBtn").disabled = !sample;
}
async function verifySql(g){
  if (g.lang !== "sql") return g;
  const PG = await loadPg();
  if (!PG) return g;
  let db = null;
  try {
    db = new PG(); await db.waitReady;
    if (g.setup) await runSql(db, g.setup);
    const mine = lastResult(await runSql(db, g.sol)) ?? "(no rows)";
    for (const c of g.checks) c[1] = c[0] === "@result" ? mine : (lastResult(await runSql(db, c[0])) ?? "(no rows)");
    db.close(); db = new PG(); await db.waitReady;
    if (g.setup) await runSql(db, g.setup);
    g.predict.answer = lastResult(await runSql(db, g.predict.code)) ?? "(no rows)";
    g.verified = true;
    return g;
  } catch(e) { return null; }
  finally { if (db) { try { db.close(); } catch(e) {} } }
}
