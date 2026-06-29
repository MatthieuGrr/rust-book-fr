// PWA : enregistrement du service worker + bouton d'installation visible.
(function () {
  'use strict';

  if (!('serviceWorker' in navigator)) return;

  // Détecter le base path depuis l'URL de ce script
  var base = '';
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src && scripts[i].src.indexOf('pwa.js') !== -1) {
      var pathname = new URL(scripts[i].src).pathname;
      base = pathname.substring(0, pathname.lastIndexOf('/'));
      break;
    }
  }

  // Enregistrer le service worker
  var scope = base ? base + '/' : '/';
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register(base + '/sw.js', { scope: scope })
      .then(function (reg) {
        console.log('[PWA] SW enregistré, scope:', reg.scope);
      })
      .catch(function (err) {
        console.warn('[PWA] Échec enregistrement SW:', err);
      });
  });

  // Capturer l'événement d'installation Chrome et afficher un bouton visible
  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
  });

  function showInstallBanner() {
    if (document.getElementById('pwa-install-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.setAttribute('role', 'button');
    banner.style.cssText =
      'position:fixed;bottom:16px;right:16px;background:#CE422B;color:#fff;' +
      'padding:10px 18px;border-radius:8px;font-family:sans-serif;font-size:15px;' +
      'font-weight:bold;cursor:pointer;z-index:9999;' +
      'box-shadow:0 3px 10px rgba(0,0,0,0.35);user-select:none;';
    banner.textContent = '📲 Installer l\'app';
    banner.addEventListener('click', function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choice) {
        console.log('[PWA] Choix:', choice.outcome);
        deferredPrompt = null;
        banner.remove();
      });
    });
    document.body.appendChild(banner);
  }

  // Supprimer le bouton après installation
  window.addEventListener('appinstalled', function () {
    var b = document.getElementById('pwa-install-banner');
    if (b) b.remove();
    deferredPrompt = null;
  });
})();
