/* RESET · Lecteur de la vidéo d'accueil (HLS : qualité adaptée à la connexion) */
(function () {
  var box = document.querySelector('.vsl-video');
  var btn = box && box.querySelector('.vsl-poster');
  if (!btn) return;
  var SRC = box.getAttribute('data-src');
  var POSTER = btn.querySelector('img').getAttribute('src');

  function start() {
    var v = document.createElement('video');
    v.setAttribute('controls', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('preload', 'auto');
    v.setAttribute('poster', POSTER);
    v.setAttribute('aria-label', 'Vidéo de présentation de Nathan et de la Méthode RESET');
    box.appendChild(v);
    btn.remove();
    function play() { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    if (v.canPlayType('application/vnd.apple.mpegurl')) { v.src = SRC; play(); return; }
    var s = document.createElement('script');
    s.src = '/assets/js/hls.light.min.js';
    s.onload = function () {
      if (window.Hls && window.Hls.isSupported()) {
        var hls = new window.Hls({ startLevel: -1, capLevelToPlayerSize: true });
        hls.loadSource(SRC); hls.attachMedia(v);
        hls.on(window.Hls.Events.MANIFEST_PARSED, play);
      } else { v.src = SRC; play(); }
    };
    document.head.appendChild(s);
  }
  btn.addEventListener('click', start);
})();
