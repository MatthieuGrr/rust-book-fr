// Service worker registration — base path auto-détecté depuis l'URL de ce script.
// Le <link rel="manifest"> est injecté statiquement dans le HTML au moment du build.
(function () {
  'use strict';

  if (!('serviceWorker' in navigator)) return;

  var base = '';
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src && scripts[i].src.indexOf('pwa.js') !== -1) {
      var pathname = new URL(scripts[i].src).pathname;
      base = pathname.substring(0, pathname.lastIndexOf('/'));
      break;
    }
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register(base + '/sw.js', { scope: base + '/' || '/' })
      .catch(function (err) {
        console.warn('[PWA] Service worker registration failed:', err);
      });
  });
})();
