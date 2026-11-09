// Network first, so a new version shows up straight away; the cached copy is only used offline.
// Progress is never stored here (it lives in the browser's storage), so updating this file can't lose it.
const CACHE = "recallr-pages";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  // pages always check with the server for a newer version (cheap: unchanged pages come back as "not modified")
  const fresh = req.mode === "navigate" ? fetch(req.url, { cache: "no-cache" }) : fetch(req);
  e.respondWith(
    fresh
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req))
  );
});
