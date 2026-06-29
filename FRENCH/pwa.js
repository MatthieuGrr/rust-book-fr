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

  var scope = base ? base + '/' : '/';
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register(base + '/sw.js', { scope: scope })
      .catch(function (err) {
        console.warn('[PWA] SW registration failed:', err);
      });
  });

  // Déjà installé en mode standalone — rien à afficher
  if (window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true) return;

  // Déjà fermé par l'utilisateur cette session
  if (sessionStorage.getItem('pwa-dismissed')) return;

  // Capturer le prompt natif si Chrome le propose
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
  });

  window.addEventListener('load', function () {
    setTimeout(showBanner, 2000);
  });

  function showBanner() {
    if (document.getElementById('pwa-install-banner')) return;

    var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    var hint = isIOS
      ? 'Partager ↗ → Sur l\'écran d\'accueil'
      : 'Menu ⋮ → Ajouter à l\'écran d\'accueil';

    var banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.style.cssText =
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
      'background:#CE422B;color:#fff;padding:12px 16px;' +
      'display:flex;align-items:center;gap:10px;' +
      'font-family:sans-serif;font-size:14px;line-height:1.3;' +
      'box-shadow:0 -3px 12px rgba(0,0,0,0.4);';

    var msg = document.createElement('span');
    msg.style.cssText = 'flex:1;';
    msg.innerHTML = '<strong>📲 Installer l\'app</strong><br><small>' + hint + '</small>';

    var btn = document.createElement('button');
    btn.style.cssText =
      'background:#fff;color:#CE422B;border:none;padding:7px 16px;' +
      'border-radius:6px;font-weight:bold;font-size:13px;cursor:pointer;white-space:nowrap;';
    btn.textContent = 'Installer';
    btn.addEventListener('click', function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (c) {
          deferredPrompt = null;
          if (c.outcome === 'accepted') banner.remove();
        });
      } else {
        // Montrer les instructions détaillées
        var steps = isIOS
          ? '1️⃣ Appuyez sur ↗ en bas   2️⃣ « Sur l\'écran d\'accueil »   3️⃣ Ajouter'
          : '1️⃣ Appuyez sur ⋮ en haut   2️⃣ « Ajouter à l\'écran d\'accueil »   3️⃣ Ajouter';
        msg.innerHTML = '<strong>📲 Comment installer :</strong><br><small>' + steps + '</small>';
        btn.textContent = '✕ Fermer';
        btn.onclick = dismiss;
      }
    });

    var close = document.createElement('button');
    close.style.cssText =
      'background:transparent;color:rgba(255,255,255,0.8);border:none;' +
      'font-size:20px;cursor:pointer;padding:0 4px;line-height:1;';
    close.textContent = '×';
    close.addEventListener('click', dismiss);

    function dismiss() {
      banner.remove();
      sessionStorage.setItem('pwa-dismissed', '1');
    }

    banner.appendChild(msg);
    banner.appendChild(btn);
    banner.appendChild(close);
    document.body.appendChild(banner);
  }

  window.addEventListener('appinstalled', function () {
    var b = document.getElementById('pwa-install-banner');
    if (b) b.remove();
  });
})();
