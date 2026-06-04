/* ─────────────────────────────────────────────────────────
   U Festival — sw.js
   Strategy: Cache-first for assets, network-first for pages
   ───────────────────────────────────────────────────────── */

const CACHE_NAME    = 'ufestival-v4';
const OFFLINE_URL   = './index.html';

/* All files to pre-cache on install */
const PRECACHE_URLS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',

    /* Fonts (cached so they work offline) */
    'https://fonts.googleapis.com/css2?family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',

    /* SVG icons — add any others you use */
    './svg_files/logo_white.svg',
    './svg_files/light_mode.svg',
    './svg_files/nederland_flag.svg',
    './svg_files/uk_flag.svg',
    './svg_files/home_logo.svg',
    './svg_files/info_logo.svg',
    './svg_files/music_logo.svg',
    './svg_files/map_logo.svg',

    /* App icons */
    './icons/icon-192.png',
    './icons/icon-512.png',
];

/* ── Install: pre-cache everything ───────────────────── */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())   /* activate immediately */
    );
});

/* ── Activate: delete old caches ─────────────────────── */
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())    /* take control of all tabs */
    );
});

/* ── Fetch: cache-first with network fallback ─────────── */
self.addEventListener('fetch', event => {
    /* Only handle GET requests */
    if (event.request.method !== 'GET') return;

    /* Skip unsupported schemes, such as chrome-extension:// */
    if (!event.request.url.startsWith('http')) return;

    const url = new URL(event.request.url);

    /* Navigation requests → network-first, fallback to cached page */
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    /* Update cache with fresh page */
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request)
                    .then(cached => cached || caches.match(OFFLINE_URL))
                )
        );
        return;
    }

    /* Static assets → network-first, fallback to cached copy */
    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response && response.status === 200 && response.type !== 'opaque') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});

/* ── Message: SKIP_WAITING from update banner ─────────── */
self.addEventListener('message', event => {
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});