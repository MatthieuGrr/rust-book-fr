// PWA support — manifest + service worker registration
// Ce fichier est ajouté via additional-js dans FRENCH/book.toml.
// Le base path est auto-détecté depuis l'URL de ce script — pas de hardcode.
(function () {
  'use strict';

  // Dériver le base path depuis l'URL de ce script (fonctionne sur GitHub Pages
  // (/rust-book-fr/) comme sur un domaine custom (/))
  var base = '';
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src && scripts[i].src.indexOf('pwa.js') !== -1) {
      // ex: "https://user.github.io/rust-book-fr/pwa.js" → base = "/rust-book-fr"
      var pathname = new URL(scripts[i].src).pathname;
      base = pathname.substring(0, pathname.lastIndexOf('/'));
      break;
    }
  }

  // --- Manifest ---
  var link = document.createElement('link');
  link.rel = 'manifest';
  link.href = base + '/manifest.json';
  document.head.appendChild(link);

  // --- Meta PWA ---
  var metaTheme = document.createElement('meta');
  metaTheme.name = 'theme-color';
  metaTheme.content = '#CE422B';
  document.head.appendChild(metaTheme);

  // iOS / Safari
  var metaApple = document.createElement('meta');
  metaApple.name = 'apple-mobile-web-app-capable';
  metaApple.content = 'yes';
  document.head.appendChild(metaApple);

  var metaAppleTitle = document.createElement('meta');
  metaAppleTitle.name = 'apple-mobile-web-app-title';
  metaAppleTitle.content = 'Rust Book FR';
  document.head.appendChild(metaAppleTitle);

  var appleIcon = document.createElement('link');
  appleIcon.rel = 'apple-touch-icon';
  appleIcon.href = base + '/icon-192.png';
  document.head.appendChild(appleIcon);

  // --- Service Worker ---
  if ('serviceWorker' in navigator) {
    var scope = base + '/';
    // Sur un domaine custom servi à la racine, base = '' et scope = '/'
    if (!scope) scope = '/';

    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register(base + '/sw.js', { scope: scope })
        .catch(function (err) {
          console.warn('[PWA] Service worker registration failed:', err);
        });
    });
  }
})();
