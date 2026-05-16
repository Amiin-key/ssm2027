const CACHE_NAME = 'ssm-invest-v2';
const ASSETS = [
  './',
  './index.html',
  './dashboard.html',
  './login.html',
  './register.html',
  './profile.html',
  './deposit.html',
  './withdraw.html',
  './account_management.html',
  './invest.html',
  './manifest.json',
  './logo.png'
];

// Is-diiwaangelinta Cache-ka (Install Event)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('PWA: Gelinaya faylasha Cache-ka...');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Nifadiinta Cache-gii hore (Activate Event)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('PWA: Tirtiraya cache-gii hore...', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Maareynta marka Offline la yahay (Fetch Event)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      // Haddii uu cache ku jiro soo sii, haddii kalena internet-ka ka raadi
      return cachedResponse || fetch(e.request);
    })
  );
});
