const CACHE_NAME = 'trading-journal-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/css/main.css',
    '/js/app.js',
    '/manifest.json'
];

// Install service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

// Fetch resources
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
