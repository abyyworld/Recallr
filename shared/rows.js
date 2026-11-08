// How query results are written as text, shared by scripts/test-databases.js and the
// practice page (the build pastes this file into the page). Columns are separated by
// ", " and rows by "; ". NULL is null, and a query with no rows gives "(no rows)".
// scripts/jvm-runner/src/main/java/Runner.java writes Cypher and JPA results the same way.
function formatValue(v) {
  if (v === null || v === undefined) return "null";
  if (v instanceof Date) {
    const iso = v.toISOString();
    return iso.endsWith("T00:00:00.000Z") ? iso.slice(0, 10) : iso.slice(0, 19).replace("T", " ");
  }
  if (Array.isArray(v)) return "[" + v.map(formatValue).join(", ") + "]";
  return String(v);
}
function formatRows(rows, fields) {
  if (!rows.length) return "(no rows)";
  return rows.map(r => (Array.isArray(r) ? r : (fields || Object.keys(r).map(name => ({ name }))).map(f => r[f.name]))
    .map(formatValue).join(", ")).join("; ");
}
// The result of the last statement that returns columns, or null if none does.
function lastResult(results) {
  for (let i = results.length - 1; i >= 0; i--)
    if (results[i].fields && results[i].fields.length) return formatRows(results[i].rows, results[i].fields);
  return null;
}
// Row order only counts when the query sorts.
function sameRows(got, expected, ordered) {
  if (got === expected) return true;
  if (ordered) return false;
  const sort = s => s.split("; ").sort().join("; ");
  return sort(got) === sort(expected);
}
// Splits SQL into statements on ; outside quotes, $$ blocks and -- comments.
function splitSql(src) {
  const out = [];
  let cur = "", i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === "-" && src[i + 1] === "-") { while (i < src.length && src[i] !== "\n") i++; continue; }
    if (c === "'" || c === '"') {
      let j = i + 1;
      while (j < src.length && !(src[j] === c && src[j + 1] !== c)) j += src[j] === c ? 2 : 1;
      cur += src.slice(i, j + 1); i = j + 1; continue;
    }
    if (c === "$") {
      const tag = /^\$[A-Za-z_]*\$/.exec(src.slice(i));
      if (tag) {
        const end = src.indexOf(tag[0], i + tag[0].length);
        const stop = end < 0 ? src.length : end + tag[0].length;
        cur += src.slice(i, stop); i = stop; continue;
      }
    }
    if (c === ";") { if (cur.trim()) out.push(cur.trim()); cur = ""; i++; continue; }
    if (c === "\n" && /^\s*\\/.test(cur.split("\n").pop() + "")) { if (cur.trim()) out.push(cur.trim()); cur = ""; i++; continue; }
    cur += c; i++;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
// Runs SQL statements one by one on a PGlite database and returns each result
// ({rows, fields}, rows as arrays). psql's \copy ... FROM 'name.csv' reads files[name.csv].
async function runSql(db, src, files) {
  const results = [];
  for (let stmt of splitSql(src)) {
    let opts = { rowMode: "array" };
    const copy = /^\\copy\s+([\s\S]*?)\s+from\s+'([^']+)'([\s\S]*)$/i.exec(stmt);
    if (copy) {
      const text = files && files[copy[2]];
      if (text === undefined) throw new Error(`no file called ${copy[2]}`);
      stmt = `COPY ${copy[1]} FROM '/dev/blob'${copy[3]}`;
      opts.blob = new Blob([text]);
    } else if (/^\\/.test(stmt)) throw new Error(`psql command ${stmt.split(/\s/)[0]} can't run here`);
    try { results.push(await db.query(stmt, [], opts)); }
    catch (e) { throw new Error(`${e.message}\n  in: ${stmt.split("\n")[0]}`); }
  }
  return results;
}
if (typeof module !== "undefined") module.exports = { formatValue, formatRows, lastResult, sameRows, splitSql, runSql };
