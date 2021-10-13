if (PRODUCTION && 'serviceWorker' in navigator) {
  // todo [sitnik] возможная проблема SSR
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch((error: string) => {
      console.log('ServiceWorker registration failed: ', error);
    });
  });
}
