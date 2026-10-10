let registration = null;

// Función para registrar el Service Worker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js', { scope: './' })
      .then((res) => {
        console.log('Service Worker successfully registered');
        registration = res;
      })
      .catch((err) => {
        console.log('Could not register Service Worker', err);
      });
  }
}

// Función para desregistrar el Service Worker (útil para limpieza)
function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let reg of registrations) {
        reg.unregister();
      }
      console.log('Service Worker unregistered');
    }).catch((err) => {
      console.log('Could not unregister Service Worker', err);
    });
  }
}

// Evento para simular peticiones de recursos localmente
window.addEventListener('click', () => {
  fetch('obj.png')
    .then((res) => {
      console.log('from script.js I got the response:', res);
    });
});

// Iniciar el registro al cargar el script
registerServiceWorker();