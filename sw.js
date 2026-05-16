const CACHE_NAME = 'ssm-invest-v1';
const ASSETS = [
  'index.html',
  'dashboard.html',
  'reg.html',
  'log.html',
  'profile.html',
  'deposit.html',
  'withdraw.html',
  'manifest.json'
];

// Is-diiwaangelinta Cache-ka
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Maareynta marka Offline la yahay
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});
