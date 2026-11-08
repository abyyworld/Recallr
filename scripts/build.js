// Builds one practice page per module into docs/<module>/index.html, plus docs/index.html.
//   node scripts/build.js
// Run the module's test script first: it writes answers.json, which the page needs.
const fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "..");
const template = fs.readFileSync(path.join(root, "shared/app.html"), "utf8");
const site = JSON.parse(fs.readFileSync(path.join(root, "site.json"), "utf8"));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const support = site.supportUrl
  ? `<p class="note"><a href="${esc(site.supportUrl)}" target="_blank" rel="noopener">${esc(site.supportLabel || "Support Recallr")}</a>. Recallr is free; this is optional.</p>`
  : "";

const built = [];
for (const name of fs.readdirSync(path.join(root, "modules"))) {
  const dir = path.join(root, "modules", name);
  if (!fs.existsSync(path.join(dir, "module.json"))) continue;
  const mod = JSON.parse(fs.readFileSync(path.join(dir, "module.json"), "utf8"));
  const DECK = require(path.join(dir, "deck.js"));
  const { SRC, TWINS } = require(path.join(dir, "variations.js"));
  const testsFile = path.join(dir, "tests.js");
  const TESTS = fs.existsSync(testsFile) ? require(testsFile) : [];
  const answersFile = path.join(dir, "answers.json");
  if (!fs.existsSync(answersFile)) { console.error(`${name}: no answers.json, run its test script first`); process.exit(1); }
  const answers = JSON.parse(fs.readFileSync(answersFile, "utf8"));
  for (const s of DECK) s.predict.answer = answers.course[s.id];
  for (const id in TWINS) TWINS[id].predict.answer = answers.variation[id];
  const missing = DECK.filter(s => s.predict.answer === undefined).map(s => s.id);
  if (missing.length) { console.error(`${name}: answers.json is out of date (${missing.join(", ")}), rerun its test script`); process.exit(1); }

  const chips = mod.weeks.map(w => `    <button class="chip" data-week="${w}" aria-pressed="false">Week ${w}</button>`).join("\n");
  const json = v => JSON.stringify(v).replace(/</g, "\\u003c");
  const html = template
    .split("__MODULE_NAME__").join(esc(mod.name))
    .split("__MODULE_ICON__").join(esc(mod.icon))
    .split("__MODULE_SCOPE__").join(esc(mod.scope))
    .split("__MODULE_ID__").join(mod.id)
    .split("__LANG__").join(mod.language)
    .split("__COMPILER__").join(mod.compiler)
    .replace("__WEEK_CHIPS__", chips)
    .replace("__SUPPORT__", support)
    .replace("__DECK__", json(DECK))
    .replace("__TWINS__", json(TWINS))
    .replace("__SRC__", json(SRC))
    .replace("__TESTS__", json(TESTS));
  fs.mkdirSync(path.join(root, "docs", mod.id), { recursive: true });
  fs.writeFileSync(path.join(root, "docs", mod.id, "index.html"),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>\n${html}\n</body></html>\n`);
  built.push(mod);
  console.log(`built docs/${mod.id}/index.html (${DECK.length} exercises)`);
}

const list = built.map(m => `<li><a href="${m.id}/">${esc(m.icon)} ${esc(m.name)}</a> <span>${esc(m.scope)}</span></li>`).join("\n");
fs.writeFileSync(path.join(root, "docs", "index.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Recallr</title>
<style>
:root{--bg:#f6f7f3;--ink:#1d2421;--muted:#5f6b66;--accent:#2c7a57}
@media (prefers-color-scheme:dark){:root{--bg:#121614;--ink:#e7ece9;--muted:#9aa7a1;--accent:#5cc492;color-scheme:dark}}
body{background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,sans-serif;margin:0;padding:40px max(16px,env(safe-area-inset-left))}
main{max-width:640px;margin:0 auto}h1{font-size:40px;margin:0}p{color:var(--muted)}
ul{list-style:none;padding:0;display:grid;gap:10px}a{color:var(--accent);font-weight:600;font-size:18px}li span{color:var(--muted);margin-left:8px}
</style></head><body><main>
<h1>Recallr</h1>
<p>Coding practice that adapts to you. Write the function from memory; if you can't, step down to filling the gaps or predicting the output, then climb back up. Skills you know come back on a spaced schedule.</p>
<ul>
${list}
</ul>
${support}
</main></body></html>
`);
console.log("built docs/index.html");
