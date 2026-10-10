const CACHE_NAME = 'v1';
const ASSETS = [
  './',
  'script.js',
  'obj.png'
];

// Evento de Instalación: Almacena los recursos en caché
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Fuerza al Service Worker en espera a convertirse en el activo
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Assets cached');
        return cache.addAll(ASSETS);
      })
      .catch((err) => console.log('Could not cache assets', err))
  );
});

// Evento de Activación: Limpia cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Evento Fetch: Intercepta las solicitudes HTTP
self.addEventListener('fetch', (event) => {
  console.log('Intercepted fetch:', event.request.url);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Si existe en caché, retorna el recurso almacenado
      if (cachedResponse) {
        return cachedResponse;
      }
      // 2. Si no está en caché, realiza la petición de red normal
      return fetch(event.request);
    })
  );
});