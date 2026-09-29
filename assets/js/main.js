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

  // Sections temporaires : masquées automatiquement après la date indiquée dans data-expires
  document.querySelectorAll('[data-expires]').forEach(function (el) {
    var end = Date.parse(el.getAttribute('data-expires'));
    if (!isNaN(end) && Date.now() > end) el.hidden = true;
  });

  // Met en évidence la page en cours dans le menu
  var here = window.location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.site-nav li a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });

  // Fenêtre "Besoin d'aide urgente ?"
  // Les numéros complets sont sur la page /aide-urgente/. Si tu changes un numéro, change-le aux deux endroits.
  var numbers = {
    be: [
      ['Urgence vitale (ambulance, pompiers)', '24h/24, gratuit', '112'],
      ['Centre Antipoisons', 'Overdose, intoxication, mélange de produits. 24h/24, gratuit', '070 245 245'],
      ['Centre de Prévention du Suicide', 'Écoute anonyme, 24h/24, gratuit', '0800 32 123'],
      ['Télé-Accueil', 'Besoin de parler à quelqu\u2019un. 24h/24, gratuit', '107'],
      ['Infor-Drogues & Addictions', 'Drogues, alcool, jeux. Lun-ven 8h-22h, sam 10h-14h', '02 227 52 52']
    ],
    fr: [
      ['SAMU (urgence médicale)', 'Malaise, overdose, intoxication. 24h/24, gratuit', '15'],
      ['3114, prévention du suicide', '24h/24, 7j/7, gratuit et confidentiel', '3114'],
      ['SOS Amitié', 'Besoin de parler à quelqu\u2019un. 24h/24', '09 72 39 40 50'],
      ['Drogues Info Service', '7j/7 de 8h à 2h, gratuit et anonyme', '0 800 23 13 13'],
      ['Alcool Info Service', '7j/7 de 8h à 2h, anonyme', '0 980 980 930'],
      ['Joueurs Info Service', 'Jeux d\u2019argent. 7j/7 de 8h à 2h, anonyme', '09 74 75 13 13']
    ]
  };

  var pill = document.querySelector('[data-urgent]');
  if (pill && typeof HTMLDialogElement === 'function') {
    var dialog = document.createElement('dialog');
    dialog.className = 'urgent-dialog';
    dialog.setAttribute('aria-labelledby', 'urgent-title');
    var list = function (country) {
      return numbers[country].map(function (n) {
        return '<li class="help-item"><div><strong>' + n[0] + '</strong><span>' + n[1] + '</span></div>' +
          '<a class="tel" href="tel:' + n[2].replace(/\s/g, '') + '">' + n[2] + '</a></li>';
      }).join('');
    };
    dialog.innerHTML =
      '<button class="close" type="button" aria-label="Fermer">×</button>' +
      '<div class="inner">' +
      '<h2 id="urgent-title">Besoin d\u2019aide maintenant\u00a0?</h2>' +
      '<p>Si toi ou quelqu\u2019un est en danger, appelle tout de suite. Tu ne déranges personne.</p>' +
      '<div class="country-tabs" role="tablist" aria-label="Pays">' +
      '<button type="button" role="tab" id="tab-be" aria-controls="list-be" aria-selected="true">Belgique</button>' +
      '<button type="button" role="tab" id="tab-fr" aria-controls="list-fr" aria-selected="false">France</button>' +
      '</div>' +
      '<ul class="help-list" id="list-be" role="tabpanel" aria-labelledby="tab-be">' + list('be') + '</ul>' +
      '<ul class="help-list" id="list-fr" role="tabpanel" aria-labelledby="tab-fr" hidden>' + list('fr') + '</ul>' +
      '<p style="margin:18px 0 0"><a class="link-arrow" href="/aide-urgente/">Tous les numéros d\u2019aide</a></p>' +
      '</div>';
    dialog.querySelectorAll('[role="tab"]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        dialog.querySelectorAll('[role="tab"]').forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          dialog.querySelector('#' + t.getAttribute('aria-controls')).hidden = !on;
        });
      });
    });
    document.body.appendChild(dialog);

    pill.addEventListener('click', function (e) {
      e.preventDefault();
      dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  }
})();
