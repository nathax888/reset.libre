/* RESET · Animations de la page d'accueil */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js-anim');

  // Titre : mot par mot
  document.querySelectorAll('[data-words]').forEach(function (h) {
    var i = 0;
    function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span'); s.className = 'w'; s.textContent = part;
            s.style.animationDelay = (1 + i++ * 0.12) + 's'; frag.appendChild(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) wrap(n);
      });
    }
    wrap(h);
  });

  // Grande phrase : un mot par span
  document.querySelectorAll('[data-fill]').forEach(function (q) {
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span'); s.className = 'fw'; s.textContent = part; frag.appendChild(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) split(n);
      });
    })(q);
  });

  // Délais en cascade
  document.querySelectorAll('.stagger').forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (c, i) { c.style.transitionDelay = (i * 0.12) + 's'; });
  });

  function count(el) {
    var to = +el.getAttribute('data-count'), t0 = null;
    if (reduce) { el.textContent = to; return; }
    function f(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); }
    requestAnimationFrame(f);
  }
  function type(el) {
    var s = el.getAttribute('data-type');
    if (reduce) { el.textContent = s; return; }
    el.textContent = ''; el.classList.add('typing'); var i = 0;
    var tk = setInterval(function () { el.textContent = s.slice(0, ++i); if (i >= s.length) { clearInterval(tk); setTimeout(function () { el.classList.remove('typing'); }, 1500); } }, 45);
  }

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal,.stagger').forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target; el.classList.add('in'); io.unobserve(el);
      el.querySelectorAll && el.querySelectorAll('[data-count]').forEach(count);
      if (el.classList.contains('final-sun')) el.querySelectorAll('[data-type]').forEach(type);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal,.stagger,.final-sun').forEach(function (e) { io.observe(e); });

  // Défilement : phrase qui se remplit + profondeur de la photo
  var fills = document.querySelectorAll('[data-fill]');
  var pars = document.querySelectorAll('[data-parallax] img');
  function onScroll() {
    var vh = window.innerHeight;
    fills.forEach(function (q) {
      var r = q.getBoundingClientRect(), words = q.querySelectorAll('.fw');
      var p = reduce ? 1 : Math.min(Math.max((vh * 0.85 - r.top) / (vh * 0.5), 0), 1);
      var n = Math.round(p * words.length);
      words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
    });
    if (!reduce) pars.forEach(function (img) {
      var r = img.getBoundingClientRect(); var c = (r.top + r.height / 2 - vh / 2) / vh;
      img.style.transform = 'translateY(' + (c * -30).toFixed(1) + 'px) scale(1.04)';
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
