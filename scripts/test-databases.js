// Checks the databases module's exercises and records the "predict" answers.
//   node scripts/test-databases.js modules/databases-and-web-programming
// Needs `npm install` (PGlite and the JHipster JDL parser) and, for Cypher and JPA,
// Java 21 and Maven: the first run builds scripts/jvm-runner (embedded Neo4j, Hibernate, H2).
//
// Each exercise has a `lang` and runs on a real engine:
//   sql     PostgreSQL (PGlite). `setup` runs first, then the code. `files` holds CSV files for \copy.
//   cypher  Neo4j. `setup` creates the graph, then the code runs.
//   jpa     the code is @Entity classes; Hibernate creates the tables, then `setup` (SQL) adds rows.
//   jpql    the code is one JPQL query, run against `entities` (classes) and `setup` rows.
//   jdl     the code is JDL, parsed and validated by the JHipster parser.
// checks are [expression, expected output]. "@result" is what the code itself returned;
// anything else is run afterwards (SQL or Cypher; "jpql: ...", "sql: ...", "columns: <table>"
// or "tables:" for jpa and jpql; "entities", "fields <Entity>", "relationships" or "valid" for jdl).
// For every exercise (and its variation) the solution and the gap code with the first
// accepted answers must pass the checks. The predict answer is what predict.expr gives after
// setup and predict.code, or what predict.code itself returns when there is no expr.
// Writes <module>/answers.json.
const fs = require("fs"), path = require("path"), cp = require("child_process"), os = require("os");
const { formatRows, lastResult, sameRows, runSql } = require("../shared/rows.js");

const dir = path.resolve(process.argv[2] || "");
if (!fs.existsSync(path.join(dir, "deck.js"))) { console.error("usage: node scripts/test-databases.js <module dir>"); process.exit(2); }
const DECK = require(path.join(dir, "deck.js"));
const { SRC, TWINS } = require(path.join(dir, "variations.js"));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "recallr-"));

let problems = 0;
const fail = msg => { console.log(msg); problems++; };
const ordered = code => /\border\s+by\b/i.test(code);

// ---------- engines ----------
// One PGlite database at a time: each holds a whole Postgres in memory.
let PGlite, sqlQueue = Promise.resolve();
function sqlJob(ex, code, queries) {
  return sqlQueue = sqlQueue.then(async () => {
    PGlite = PGlite || require("@electric-sql/pglite").PGlite;
    const db = new PGlite();
    try {
      if (ex.setup) await runSql(db, ex.setup, ex.files);
      const res = await runSql(db, code, ex.files);
      const results = [];
      for (const q of queries) {
        if (q === "@result") { results.push(lastResult(res) ?? "(no rows)"); continue; }
        try { results.push(lastResult(await runSql(db, q, ex.files)) ?? "(no rows)"); }
        catch (e) { results.push({ error: e.message }); }
      }
      return { ok: true, results };
    } catch (e) { return { ok: false, error: e.message }; }
    finally { await db.close(); }
  });
}

let jdlCore;
function jdl(code) {
  jdlCore = jdlCore || require("jhipster-core");
  const file = path.join(tmp, "x.jdl");
  fs.writeFileSync(file, code);
  const ast = jdlCore.parseFromFiles([file]);
  // the importer validates names and relationships; it writes a .jhipster folder, so run it in tmp
  const cwd = process.cwd();
  process.chdir(tmp);
  try { jdlCore.JDLImporter.createImporterFromContent(code, { applicationName: "recallr", databaseType: "sql", skipFileGeneration: true }).import(); }
  finally { process.chdir(cwd); }
  const field = f => [f.name, f.type, ...f.validations.map(v => v.value === "" ? v.key : `${v.key}(${v.value})`)].join(" ");
  const side = s => s.name + (s.injectedField ? `{${s.injectedField}}` : "");
  return q => {
    if (q === "valid") return "valid";
    if (q === "entities") return ast.entities.map(e => e.name).sort().join(", ") || "(none)";
    if (q === "relationships") return ast.relationships.map(r => `${r.cardinality} ${side(r.from)} to ${side(r.to)}`).sort().join("; ") || "(none)";
    const m = /^fields (\w+)$/.exec(q);
    if (m) {
      const e = ast.entities.find(x => x.name === m[1]);
      if (!e) throw new Error(`no entity ${m[1]}`);
      return e.body.map(field).join(", ") || "(none)";
    }
    throw new Error(`unknown JDL check: ${q}`);
  };
}
function jdlJob(code, queries) {
  try {
    const ask = jdl(code);
    return Promise.resolve({ ok: true, results: queries.map(q => { if (q === "@result") return "valid"; try { return ask(q); } catch (e) { return { error: e.message }; } }) });
  } catch (e) { return Promise.resolve({ ok: false, error: e.message.split("\n")[0] }); }
}

// Cypher, JPA and JPQL jobs are collected and run in one JVM at the end.
const jvmJobs = [];
function jvmJob(job) { return new Promise(resolve => jvmJobs.push({ job, resolve })); }
function runJvm() {
  if (!jvmJobs.length) return;
  const runner = path.join(__dirname, "jvm-runner");
  if (!fs.existsSync(path.join(runner, "target", "classes", "Runner.class")))
    cp.execFileSync("mvn", ["-q", "-B", "package"], { cwd: runner, stdio: "inherit" });
  const file = path.join(tmp, "jobs.json");
  fs.writeFileSync(file, JSON.stringify(jvmJobs.map(j => j.job)));
  const sep = path.delimiter;
  const out = cp.execFileSync("java", ["-cp", `target/classes${sep}target/lib/*`, "Runner", file],
    { cwd: runner, encoding: "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] });
  JSON.parse(out).forEach((r, i) => jvmJobs[i].resolve(r));
}

// Runs code for an exercise and returns the outputs of queries ("@result" included).
function run(ex, code, queries) {
  switch (ex.lang) {
    case "sql": return sqlJob(ex, code, queries);
    case "jdl": return jdlJob(code, queries);
    case "cypher": {
      const qs = queries.filter(q => q !== "@result");
      return jvmJob({ kind: "cypher", setup: ex.setup || "", code, queries: qs })
        .then(r => r.ok ? { ok: true, results: queries.map(q => q === "@result" ? (r.codeResult ?? "(no rows)") : r.results[qs.indexOf(q)]) } : r);
    }
    case "jpa": return jvmJob({ kind: "jpa", code, setup: ex.setup || "", queries });
    case "jpql":
      return jvmJob({ kind: "jpa", code: ex.entities, setup: ex.setup || "", queries: queries.map(q => q === "@result" ? "jpql: " + code : q) });
    default: return Promise.resolve({ ok: false, error: `unknown lang ${ex.lang}` });
  }
}

// ---------- checks ----------
const answers = { course: {}, variation: {} };
const pending = [];
const DASH = /[\u2013\u2014]/;

function lint(kind, id, s) {
  const blanks = (s.fill.code.match(/___/g) || []).length;
  if (blanks !== s.fill.blanks.length) fail(`LINT ${kind}/${id}: fill has ${blanks} gaps but ${s.fill.blanks.length} answer lists`);
  if (DASH.test(JSON.stringify(s))) fail(`LINT ${kind}/${id}: contains an en or em dash`);
  if (!["sql", "cypher", "jpa", "jpql", "jdl"].includes(s.lang)) fail(`LINT ${kind}/${id}: lang must be sql, cypher, jpa, jpql or jdl`);
  if (s.lang === "jpql" && !s.entities) fail(`LINT ${kind}/${id}: jpql exercises need entities`);
  if (!s.checks || !s.checks.length) fail(`LINT ${kind}/${id}: no checks`);
}

function test(kind, id, s) {
  lint(kind, id, s);
  const exprs = s.checks.map(c => c[0]);
  const fillCode = s.fill.blanks.reduce((c, b) => c.replace("___", b[0]), s.fill.code);
  for (const [part, code] of [["solution", s.sol], ["gaps", fillCode]]) {
    pending.push(run(s, code, exprs).then(r => {
      if (!r.ok) return fail(`FAIL ${kind}/${id} ${part}: ${r.error}`);
      s.checks.forEach((c, i) => {
        const got = r.results[i];
        if (typeof got !== "string") return fail(`FAIL ${kind}/${id} ${part}: ${c[0]} gave an error: ${got && got.error}`);
        // rows only have to be in order when the task's own solution sorts them
        const sorted = ordered(c[0] === "@result" ? s.sol : c[0]) || s.lang === "jdl";
        if (!sameRows(got, c[1], sorted)) fail(`MISMATCH ${kind}/${id} ${part}: ${c[0]} gave ${got}, expected ${c[1]}`);
      });
    }));
  }
  const p = s.predict;
  pending.push(run(s, p.code, [p.expr || "@result"]).then(r => {
    if (!r.ok) return fail(`FAIL ${kind}/${id} predict: ${r.error}`);
    const got = r.results[0];
    if (typeof got !== "string") return fail(`FAIL ${kind}/${id} predict: ${got && got.error}`);
    answers[kind][id] = got;
  }));
}

// Lessons: once the module has them, every exercise and variation needs one. The example runs
// on the exercise's engine (sql, cypher, jpql: a query after setup; jpa, jdl: a check on the
// solution), and the last step of the trace, after "= ", must be exactly what it gives.
function lessonCheck(kind, id, s, lesson) {
  const where = `${kind}/${id} lesson`;
  if (!lesson) return fail(`LINT ${where}: missing`);
  if (!lesson.what || !lesson.example || !Array.isArray(lesson.trace) || lesson.trace.length < 2) return fail(`LINT ${where}: needs what, example and a trace of 2 or more steps`);
  if (lesson.trace.some(t => typeof t.line !== "string" || !t.line.trim())) return fail(`LINT ${where}: every step needs a line`);
  const last = lesson.trace[lesson.trace.length - 1].line;
  if (!/^= /.test(last)) return fail(`LINT ${where}: the last step must start with "= " and give the result`);
  const want = last.slice(2).trim();
  const job = ["jpa", "jdl"].includes(s.lang) ? run(s, s.sol, [lesson.example]) : run(s, lesson.example, ["@result"]);
  pending.push(job.then(r => {
    if (!r.ok) return fail(`FAIL ${where}: ${r.error}`);
    const got = r.results[0];
    if (typeof got !== "string") return fail(`FAIL ${where}: ${got && got.error}`);
    if (!sameRows(got, want, ordered(lesson.example) || s.lang === "jdl")) fail(`MISMATCH ${where}: the example gives ${got}, but the last step says ${want}`);
  }));
}

(async () => {
  for (const s of DECK) test("course", s.id, s);
  for (const [id, t] of Object.entries(TWINS)) {
    const base = DECK.find(s => s.id === id);
    if (!base) { fail(`LINT variation/${id}: no course exercise with this id`); continue; }
    test("variation", id, Object.assign({}, base, t));
  }
  if (DECK.some(s => s.lesson) || Object.values(TWINS).some(t => t.lesson)) for (const s of DECK) {
    lessonCheck("course", s.id, s, s.lesson);
    if (TWINS[s.id]) lessonCheck("variation", s.id, Object.assign({}, s, TWINS[s.id]), TWINS[s.id].lesson);
  }
  for (const s of DECK) {
    if (!TWINS[s.id]) fail(`LINT course/${s.id}: no variation`);
    if (!SRC[s.id]) fail(`LINT course/${s.id}: no source in SRC`);
  }
  const ids = DECK.map(s => s.id);
  ids.filter((x, i) => ids.indexOf(x) !== i).forEach(x => fail(`LINT duplicate id ${x}`));
  try { runJvm(); } catch (e) { fail(`FAIL java runner: ${e.message}`); jvmJobs.forEach(j => j.resolve({ ok: false, error: "runner failed" })); }
  await Promise.all(pending);
  const order = o => Object.fromEntries(Object.keys(o).sort((a, b) => ids.indexOf(a) - ids.indexOf(b)).map(k => [k, o[k]]));
  if (!problems) fs.writeFileSync(path.join(dir, "answers.json"), JSON.stringify({ course: order(answers.course), variation: order(answers.variation) }, null, 2) + "\n");
  console.log(problems ? `${problems} problem(s), answers.json not written` : `all ${DECK.length} exercises and ${Object.keys(TWINS).length} variations pass`);
  process.exit(problems ? 1 : 0);
})();
