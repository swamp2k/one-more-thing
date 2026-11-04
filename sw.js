const CACHE = 'omt-v0-4-0';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './expansion.css',
  './people.css',
  './manifest.webmanifest',
  './assets/icon.svg',
  './src/app.js',
  './src/engine.js',
  './src/runtime.js',
  './src/opening.js',
  './src/game-data.js',
  './src/expansion-data.js',
  './src/world-data.js',
  './src/people-data.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
    )
  );
});
