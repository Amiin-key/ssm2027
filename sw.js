const cacheName = 'ssm-invest-v1';
const staticAssets = [
  './',
  './index.html',
  './ssm.js',
  './manifest.json'
];

// Instalka Service Worker-ka
self.addEventListener('install', async el => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

// Firfircoonida iyo nadiifinta cash-ka hore
self.addEventListener('activate', el => {
  self.clients.claim();
});

// Soo jiidashada xogta (Offline Support)
self.addEventListener('fetch', async el => {
  const req = el.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    el.respondWith(cacheFirst(req));
  } else {
    el.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const refresh = await fetch(req);
    await cache.put(req, refresh.clone());
    return refresh;
  } catch (hi) {
    const cached = await cache.match(req);
    return cached;
  }
}
