if (PRODUCTION && 'serviceWorker' in navigator) {
  // todo [sitnik] возможная проблема SSR
  window.addEventListener('load', () => {
    // todo [sitnik] вынести путь до статики в конфиг
    navigator.serviceWorker.register('/client/service-worker.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch((error: string) => {
      console.log('ServiceWorker registration failed: ', error);
    });
  });
}
