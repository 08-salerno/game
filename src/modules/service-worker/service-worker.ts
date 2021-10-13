/// <reference lib="WebWorker" />
/* eslint-disable @typescript-eslint/no-floating-promises, no-undef */
import { apiUrl } from '../api/utils';

// workaround for correct types if no import
// export type {};

declare const self: ServiceWorkerGlobalScope;

const version = 'v1';
const swStartTime = new Date().toLocaleString();
const cacheName = `${version}_${swStartTime}`;

const urls = ['/', '/app.js'];
const yandexApiUrl = apiUrl('/');

const offlineResponse = (): Response => new Response('Отсутствует сетевое соединение', { status: 418 });

self.addEventListener('install', (event: ExtendableEvent) => {
  self.skipWaiting().catch(() => {
    console.log('service-worker install', 'not skipWaiting');
  });
  event.waitUntil(caches.open(cacheName).then((cache: Cache) => cache.addAll(urls)));
});

// Новый воркер не будет активирован, если есть хотя бы одна вкладка,
// использующая старый воркер без вызова clients.claim
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.indexOf(cacheName) !== 0)
          .map((key) => caches.delete(key)),
      )),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  const isWebRequest = request.url.indexOf('http') === 0;
  if (!isWebRequest) return;

  // Т.к. cache.put не поддерживает не get запросы
  const isGetRequest = request.method === 'GET';
  if (!isGetRequest) {
    event.respondWith(
            fetch(request).catch(() => offlineResponse()) as Promise<Response>,
    );
    return;
  }

  if (requestUrlEndsWithCached(request.url)) {
    makeRespond(event);
    return;
  }

  if (requestUrlMatchApi(request.url)) {
    makeRespond(event);
    return;
  }

  // Предполагается, что здесь будут обрабатываться запросы рутов приложения
  // поэтому на любой такой запрос будет возвращён индекс
  event.respondWith(caches.match('/')
    .then((response) => responseOrOfflineResponse(response)));
});

function makeRespond(event: FetchEvent): void {
  const { request } = event;
  event.respondWith(
    caches.match(request).then((response) => {
      console.log('fetch check cache', response);
      if (response) {
        return response;
      }

      const fetchRequest = request.clone();
      return fetch(fetchRequest).then((response) => {
        console.log('fetched request', response);
        // Если не 2хх статус
        if (!response || response.status.toString().indexOf('2') !== 0) {
          return response;
        }

        const responseToCache = response.clone();
        console.log('put cache by name', cacheName);
        caches.open(cacheName)
          .then((cache) => {
            // Записываем в кеш ответ, используя в качестве ключа запрос
            cache.put(request, responseToCache);
          });

        return response;
      }).catch(() => offlineResponse());
    }),
  );
}

function responseOrOfflineResponse(response: Response | undefined): Response {
  if (response) {
    return response;
  }
  return offlineResponse();
}

function requestUrlEndsWithCached(requestUrl: string): boolean {
  return urls.some((url) => requestUrl.endsWith(url));
}

function requestUrlMatchApi(requestUrl: string): boolean {
  return requestUrl.indexOf(yandexApiUrl) === 0;
}
