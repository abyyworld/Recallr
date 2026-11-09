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

// Lets people install Recallr as an app (Chrome, Edge, Safari "Add to Dock" / "Add to Home Screen")
// and keeps working offline once loaded.
function pwaHead(base) {
  return `<link rel="manifest" href="${base}manifest.webmanifest"><meta name="theme-color" content="#2c7a57">` +
    `<link rel="icon" href="${base}icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="${base}icon-192.png">` +
    `<script>if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("${base}sw.js").catch(() => {});</script>`;
}

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

  const chips = mod.weeks.map(w => `    <label class="tick"><input type="checkbox" data-week="${w}" checked> Week ${w}</label>`).join("\n");
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
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">${pwaHead("../")}</head><body>\n${html}\n</body></html>\n`);
  built.push(mod);
  console.log(`built docs/${mod.id}/index.html (${DECK.length} exercises)`);
}

for (const f of fs.readdirSync(path.join(root, "shared/pwa"))) fs.copyFileSync(path.join(root, "shared/pwa", f), path.join(root, "docs", f));

const cards = built.map(m => `      <a class="mod" href="${m.id}/">
        <span class="icon">${esc(m.icon)}</span>
        <span class="txt"><b>${esc(m.name)}</b><span>${esc(m.language)} · ${esc(m.scope)}</span></span>
        <span class="go">Start practising &rarr;</span>
      </a>`).join("\n");
fs.writeFileSync(path.join(root, "docs", "index.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Recallr</title>
<meta name="description" content="Coding practice that adapts to you: write it from memory, or step down until you can.">
${pwaHead("")}
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Source+Sans+3:wght@400;600&display=swap">
<style>
:root{--bg:#f6f7f3;--surface:#fff;--ink:#1d2421;--muted:#5f6b66;--line:#dfe4de;--accent:#2c7a57;--accent-ink:#fff;--soft:#e3f1ea}
:root[data-theme="dark"]{--bg:#121614;--surface:#1a201d;--ink:#e7ece9;--muted:#9aa7a1;--line:#2c3531;--accent:#5cc492;--accent-ink:#0d1210;--soft:#1f3a2d;color-scheme:dark}
.theme{position:absolute;top:max(16px,env(safe-area-inset-top));right:max(16px,env(safe-area-inset-right));font:600 13px "Source Sans 3",system-ui,sans-serif;padding:6px 12px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.55 "Source Sans 3",system-ui,sans-serif}
main{max-width:720px;margin:0 auto;padding:56px max(18px,env(safe-area-inset-right)) 56px max(18px,env(safe-area-inset-left));display:flex;flex-direction:column;gap:28px}
h1{font:800 clamp(44px,10vw,72px)/1 "Bricolage Grotesque",system-ui,sans-serif;margin:0;letter-spacing:-.03em}
h1 span{color:var(--accent)}
.lede{font-size:21px;margin:0;max-width:34ch}
.ladder{display:grid;gap:10px;margin:0;padding:0;list-style:none}
.ladder li{display:flex;gap:14px;align-items:baseline;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:var(--surface)}
.ladder b{font-family:"Bricolage Grotesque",system-ui,sans-serif;min-width:118px}
.ladder span{color:var(--muted)}
.mods{display:grid;gap:12px}
.mod{display:flex;align-items:center;gap:16px;padding:20px;border-radius:16px;background:var(--accent);color:var(--accent-ink);text-decoration:none;transition:transform .15s}
.mod:hover{transform:translateY(-2px)}.mod:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.icon{font:800 34px "Bricolage Grotesque",system-ui,sans-serif;width:48px;text-align:center}
.txt{display:flex;flex-direction:column;flex:1;min-width:0}.txt b{font-size:21px}.txt span{opacity:.85;font-size:15px}
.go{font-weight:600;white-space:nowrap}
.note{color:var(--muted);font-size:15px;margin:0}
@media (max-width:480px){.go{display:none}.ladder li{flex-direction:column;gap:2px}}
@media (prefers-reduced-motion:reduce){.mod{transition:none}}
</style>
<script>(function(){ var t = "dark"; try { t = localStorage.getItem("recallr-theme") || "dark"; } catch(e) {} document.documentElement.setAttribute("data-theme", t); })();</script>
</head><body><button class="theme" id="themeBtn">Light mode</button><main>
<h1>Recall<span>r</span></h1>
<p class="lede">Coding practice that adapts to you. Write it from memory, or step down until you can.</p>
<div class="mods">
${cards}
</div>
<ol class="ladder">
  <li><b>Write it</b><span>Write the function from scratch.</span></li>
  <li><b>Fill the gaps</b><span>Stuck? Finish code with a few pieces missing.</span></li>
  <li><b>Predict</b><span>Still stuck? Read code and say what it gives. Then climb back up.</span></li>
</ol>
<p class="note">Free. Your progress saves as you go. Install it as an app from your browser's menu ("Install Recallr" or "Add to Dock"). Spaced repetition brings each skill back after 10 minutes, then 1, 3, 7, 16 and 35 days.</p>
${support}
</main>
<script>
var b = document.getElementById("themeBtn");
function label(){ b.textContent = document.documentElement.getAttribute("data-theme") === "light" ? "Dark mode" : "Light mode"; }
b.onclick = function(){ var n = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light"; document.documentElement.setAttribute("data-theme", n); try { localStorage.setItem("recallr-theme", n); } catch(e) {} label(); };
label();
</script>
</body></html>
`);
console.log("built docs/index.html");
