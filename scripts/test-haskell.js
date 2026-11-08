// Checks a Haskell module's exercises with GHC and records the "predict" answers.
//   node scripts/test-haskell.js modules/functional-programming
// For every exercise (and its variation): the solution must compile and pass its
// checks, the fill-the-gaps code with the first accepted answer must do the same,
// and the predict expression is evaluated to get its expected output.
// Writes <module>/answers.json. Needs `runghc` on the PATH.
const fs = require("fs"), path = require("path"), cp = require("child_process"), os = require("os");

const dir = path.resolve(process.argv[2] || "");
if (!fs.existsSync(path.join(dir, "deck.js"))) { console.error("usage: node scripts/test-haskell.js <module dir>"); process.exit(2); }
const DECK = require(path.join(dir, "deck.js"));
const { TWINS } = require(path.join(dir, "variations.js"));
const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "recallr-")), "T.hs");

function run(code, exprs) {
  const src = code + "\n\nmain :: IO ()\nmain = do\n" + exprs.map(e => `  print (${e})`).join("\n") + "\n";
  fs.writeFileSync(tmp, src);
  return cp.execFileSync("runghc", [tmp], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim().split("\n");
}

const answers = { course: {}, variation: {} };
let problems = 0;
function test(kind, id, s) {
  const fillCode = s.fill.blanks.reduce((c, b) => c.replace("___", b[0]), s.fill.code);
  // the gap code sometimes leaves out type synonyms that the solution declares
  const context = s.sol.split("\n").filter(l => /^(type|data) /.test(l) && !fillCode.includes(l)).join("\n");
  for (const [part, code] of [["solution", s.sol], ["gaps", (context ? context + "\n" : "") + fillCode]]) {
    const exprs = s.checks.map(c => c[0]);
    if (part === "solution") exprs.push(s.predict.expr);
    let out;
    try { out = run(code, exprs); }
    catch (e) { console.log(`FAIL ${kind}/${id} ${part}\n${e.stderr}`); problems++; continue; }
    s.checks.forEach((c, i) => { if (out[i] !== c[1]) { console.log(`MISMATCH ${kind}/${id} ${part}: ${c[0]} gave ${out[i]}, expected ${c[1]}`); problems++; } });
    if (part === "solution") answers[kind][id] = out[s.checks.length];
  }
}
for (const s of DECK) test("course", s.id, s);
for (const [id, s] of Object.entries(TWINS)) test("variation", id, s);
// mock tests: the blank file must compile, and the model answer must pass every check
const testsFile = path.join(dir, "tests.js");
if (fs.existsSync(testsFile)) {
  for (const T of require(testsFile)) {
    const blank = path.join(path.dirname(tmp), "Blank.hs");
    fs.writeFileSync(blank, T.template.replace(/^module .*$/m, "module Blank where"));
    try { cp.execFileSync("ghc", ["-fno-code", blank], { stdio: ["ignore", "pipe", "pipe"] }); }
    catch (e) { console.log(`FAIL test ${T.id}: blank file doesn't compile\n${e.stderr}`); problems++; }
    const exprs = T.questions.flatMap(q => q.checks.map(c => c[0]));
    const expected = T.questions.flatMap(q => q.checks.map(c => c[1]));
    try {
      const out = run(T.solution, exprs);
      expected.forEach((v, i) => { if (out[i] !== v) { console.log(`MISMATCH test ${T.id}: ${exprs[i]} gave ${out[i]}, expected ${v}`); problems++; } });
    } catch (e) { console.log(`FAIL test ${T.id}: model answer\n${e.stderr}`); problems++; }
  }
}
fs.writeFileSync(path.join(dir, "answers.json"), JSON.stringify(answers, null, 2) + "\n");
console.log(problems ? `${problems} problem(s)` : `all ${DECK.length} exercises and ${Object.keys(TWINS).length} variations pass`);
process.exit(problems ? 1 : 0);
