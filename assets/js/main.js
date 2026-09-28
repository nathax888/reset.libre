/* RESET · petits comportements du site (menu mobile, fenêtre "aide urgente") */
(function () {
  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Met en évidence la page en cours dans le menu
  var here = window.location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.site-nav li a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });

  // Fenêtre "Besoin d'aide urgente ?"
  // Les numéros complets sont sur la page /aide-urgente/. Si tu changes un numéro, change-le aux deux endroits.
  var numbers = [
    ['Urgence vitale (ambulance, pompiers)', '24h/24, gratuit', '112'],
    ['Centre Antipoisons', 'Overdose, intoxication, mélange de produits. 24h/24, gratuit', '070 245 245'],
    ['Centre de Prévention du Suicide', 'Écoute anonyme, 24h/24, gratuit', '0800 32 123'],
    ['Télé-Accueil', 'Besoin de parler à quelqu’un. 24h/24, gratuit', '107'],
    ['Infor-Drogues & Addictions', 'Drogues, alcool, jeux. Lun-ven 8h-22h, sam 10h-14h', '02 227 52 52']
  ];

  var pill = document.querySelector('[data-urgent]');
  if (pill && typeof HTMLDialogElement === 'function') {
    var dialog = document.createElement('dialog');
    dialog.className = 'urgent-dialog';
    dialog.setAttribute('aria-labelledby', 'urgent-title');
    var items = numbers.map(function (n) {
      return '<li class="help-item"><div><strong>' + n[0] + '</strong><span>' + n[1] + '</span></div>' +
        '<a class="tel" href="tel:' + n[2].replace(/\s/g, '') + '">' + n[2] + '</a></li>';
    }).join('');
    dialog.innerHTML =
      '<button class="close" type="button" aria-label="Fermer">×</button>' +
      '<div class="inner">' +
      '<h2 id="urgent-title">Besoin d’aide maintenant\u00a0?</h2>' +
      '<p>Si toi ou quelqu’un est en danger, appelle tout de suite. Tu ne déranges personne.</p>' +
      '<ul class="help-list">' + items + '</ul>' +
      '<p style="margin:18px 0 0"><a class="link-arrow" href="/aide-urgente/">Tous les numéros d’aide en Belgique</a></p>' +
      '</div>';
    document.body.appendChild(dialog);

    pill.addEventListener('click', function (e) {
      e.preventDefault();
      dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  }
})();
