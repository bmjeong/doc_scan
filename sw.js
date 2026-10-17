// 모서리 스캐너 service worker — 앱 파일을 캐시해서 오프라인에서도 열리게 합니다.
// index.html을 고친 뒤에는 VERSION 숫자를 올려야 사용자 기기에 새 버전이 반영됩니다.
const VERSION = 'v2';
const APP = 'scanner-app-' + VERSION;
const FONTS = 'scanner-fonts';
const FILES = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k.startsWith('scanner-app-') && k !== APP).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts: 캐시에 있으면 바로 쓰고, 뒤에서 갱신
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  if (url.origin !== location.origin) return;

  // 페이지: 네트워크 우선(새 버전 반영), 오프라인이면 캐시
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => {
      const copy = r.clone(); caches.open(APP).then(c => c.put('./index.html', copy)); return r;
    }).catch(() => caches.match('./index.html')));
    return;
  }

  // 나머지 앱 파일: 캐시 우선
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
