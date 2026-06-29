// Service Worker — Le langage de programmation Rust (FR)
// Stratégie : stale-while-revalidate (offline immédiat, fraîcheur en arrière-plan)
// Incrémenter CACHE_VERSION lors de mises à jour majeures pour invalider l'ancien cache.
const CACHE_VERSION = 'v1';
const CACHE_NAME = 'rust-book-fr-' + CACHE_VERSION;

// Ressources à précacher à l'installation (la coquille minimale)
const PRECACHE_URLS = [
  './',
  './index.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Précache en mode no-throw : si une URL échoue on continue quand même
      return Promise.allSettled(
        PRECACHE_URLS.map((url) => cache.add(url).catch(() => {}))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // On ne gère que les requêtes GET vers notre propre origine
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(staleWhileRevalidate(event.request));
});

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  // Lance la requête réseau en arrière-plan pour mettre à jour le cache
  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  // Retourne la version en cache immédiatement si disponible,
  // sinon attend la réponse réseau (premier accès hors-ligne impossible)
  return cached || networkFetch;
}
