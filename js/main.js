/* =========================================================
   Noumbi Resort · interactions
   Aucune dépendance. Sans JavaScript, tout le contenu reste visible
   et les liens WhatsApp fonctionnent.
   ========================================================= */
(function () {
  'use strict';

  var WHATSAPP = '242055338959';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 900px)').matches;
  var conn = navigator.connection || {};
  var saveData = conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || '');

  // Découpe le titre en lettres avant le premier affichage
  splitTitle();

  function start() { requestAnimationFrame(function () { root.classList.add('is-loaded'); }); }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
  setTimeout(start, 1800); // filet de sécurité sur connexion lente

  document.addEventListener('DOMContentLoaded', function () {
    var year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();

    initMenu();
    initHeader();
    initReveal();
    initDayCycle();
    initTimeline();
    initGallery();
    initBookingLinks();
    initFilters();
    initSlides();
    initRoute();
    initMap();
    initHeroVideo();
  });

  /* ---------- Accueil : lettres une par une ---------- */
  function splitTitle() {
    var i = 0;
    document.querySelectorAll('.hero-title .word').forEach(function (word) {
      var text = word.textContent;
      word.textContent = '';
      text.split('').forEach(function (ch) {
        var span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch;
        span.style.setProperty('--i', i++);
        word.appendChild(span);
      });
    });
  }

  /* ---------- Menu mobile ---------- */
  function initMenu() {
    var btn = document.querySelector('.menu-btn');
    var nav = document.getElementById('nav');
    if (!btn || !nav) return;
    function setOpen(open) {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      nav.classList.toggle('is-open', open);
    }
    btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); btn.focus(); }
    });
  }

  /* ---------- En-tête et bouton WhatsApp flottant ---------- */
  function initHeader() {
    var header = document.querySelector('.site-header');
    var float = document.querySelector('.wa-float');
    var hero = document.querySelector('.hero');
    var last = 0, ticking = false;
    function update() {
      var y = window.scrollY;
      var heroH = hero ? hero.offsetHeight : 600;
      header.classList.toggle('is-scrolled', y > heroH - 100);
      var menuOpen = document.querySelector('.nav.is-open');
      header.classList.toggle('is-hidden', !menuOpen && y > heroH && y > last + 2);
      if (y < last - 2) header.classList.remove('is-hidden');
      if (float) float.classList.toggle('is-visible', y > heroH * 0.6);
      last = y;
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Apparitions au scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    items.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); });
      var i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty('--d', Math.min(i, 5) * 0.08 + 's');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Une journée à Noumbi : le fond change au fil des sections ---------- */
  function initDayCycle() {
    var sections = document.querySelectorAll('main .section[data-bg], .site-footer[data-bg]');
    var navLinks = document.querySelectorAll('.nav a');
    if (!sections.length) return;
    root.classList.add('bg-sync');
    var current = null;

    function update() {
      var line = window.innerHeight * 0.6;
      var active = null;
      sections.forEach(function (s) {
        if (s.getBoundingClientRect().top <= line) active = s;
      });
      if (!active) active = sections[0];
      if (active !== current) {
        current = active;
        document.body.style.backgroundColor = active.dataset.bg;
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', active.dataset.bg);
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', active.id && a.getAttribute('href') === '#' + active.id);
        });
      }
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(function () { update(); ticking = false; }); }
    }, { passive: true });
    update();
  }

  /* ---------- Histoire : la frise se trace au scroll ---------- */
  function initTimeline() {
    var tl = document.querySelector('.timeline');
    if (!tl || reduceMotion) return;
    var items = tl.querySelectorAll('li');
    onScrollProgress(tl, 0.85, 0.45, function (p) {
      tl.style.setProperty('--progress', p.toFixed(3));
      items.forEach(function (li, i) { li.style.setProperty('--dot', p >= i / items.length ? 1 : 0); });
    });
  }

  /* ---------- Camp : galerie (glisser à la souris, flèches) ---------- */
  function initGallery() {
    var g = document.querySelector('.gallery');
    if (!g) return;
    var prev = document.querySelector('.gallery-nav [data-dir="-1"]');
    var next = document.querySelector('.gallery-nav [data-dir="1"]');

    function step() { var f = g.querySelector('figure'); return f ? f.offsetWidth + 16 : 400; }
    function updateBtns() {
      if (!prev) return;
      prev.disabled = g.scrollLeft < 8;
      next.disabled = g.scrollLeft + g.clientWidth > g.scrollWidth - 8;
    }
    document.querySelectorAll('.gallery-nav button').forEach(function (b) {
      b.addEventListener('click', function () {
        g.scrollBy({ left: step() * Number(b.dataset.dir), behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
    g.addEventListener('scroll', updateBtns, { passive: true });
    updateBtns();

    // Glisser à la souris (desktop). Au doigt, le défilement natif suffit.
    var down = false, startX = 0, startLeft = 0, moved = false;
    g.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; startX = e.clientX; startLeft = g.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; g.classList.add('is-dragging'); }
      g.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      g.classList.remove('is-dragging');
      if (moved) {
        // retour sur la photo la plus proche
        var s = step();
        g.scrollTo({ left: Math.round(g.scrollLeft / s) * s, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
    g.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }

  /* ---------- Réservation : message WhatsApp prérempli ---------- */
  function initBookingLinks() {
    document.querySelectorAll('.bungalow').forEach(function (card) {
      var a = card.querySelector('.wa-book');
      var name = card.dataset.name;
      var cap = card.dataset.cap;
      var msg = 'Bonjour Noumbi Resort, je souhaite réserver le bungalow ' + name +
        ' (' + cap + ' pers.) du … au …. Nous serons … personnes. Merci !';
      a.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
    });
  }

  /* ---------- Bungalows : filtre par capacité ---------- */
  function initFilters() {
    var pills = document.querySelectorAll('.filters .pill');
    var cards = document.querySelectorAll('.bungalow');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        var cap = pill.dataset.cap;
        pills.forEach(function (p) {
          var on = p === pill;
          p.classList.toggle('is-on', on);
          p.setAttribute('aria-pressed', String(on));
        });
        function apply() {
          cards.forEach(function (c) {
            c.hidden = !(cap === 'all' || c.dataset.cap === cap);
            c.classList.add('is-in');
          });
        }
        if (reduceMotion) { apply(); return; }
        cards.forEach(function (c) { c.classList.add('is-hiding'); });
        setTimeout(function () {
          apply();
          requestAnimationFrame(function () { cards.forEach(function (c) { c.classList.remove('is-hiding'); }); });
        }, 220);
      });
    });
  }

  /* ---------- Bungalows : carrousel (s'active dès 2 photos) ---------- */
  function initSlides() {
    document.querySelectorAll('.bungalow .slides').forEach(function (slides) {
      var imgs = slides.querySelectorAll('img');
      if (imgs.length < 2) return;
      var name = slides.closest('.bungalow').dataset.name;
      var wrap = document.createElement('div');
      wrap.className = 'slides-wrap';
      slides.parentNode.insertBefore(wrap, slides);
      wrap.appendChild(slides);
      var dots = document.createElement('div');
      dots.className = 'dots';
      imgs.forEach(function (img, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Photo ' + (i + 1) + ' sur ' + imgs.length + ', ' + name);
        b.addEventListener('click', function () {
          slides.scrollTo({ left: slides.clientWidth * i, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
        dots.appendChild(b);
      });
      wrap.appendChild(dots);
      function update() {
        var idx = Math.round(slides.scrollLeft / slides.clientWidth);
        dots.querySelectorAll('button').forEach(function (b, i) { b.setAttribute('aria-current', String(i === idx)); });
      }
      slides.addEventListener('scroll', update, { passive: true });
      update();
    });
  }

  /* ---------- Accès : le trajet se dessine étape par étape ---------- */
  function initRoute() {
    var route = document.querySelector('.route');
    if (!route || reduceMotion) return;
    var steps = route.querySelectorAll('li');
    steps.forEach(function (li) { li.style.setProperty('--fill', 0); });
    onScrollProgress(route, 0.8, 0.5, function (p) {
      var reached = p * steps.length;
      steps.forEach(function (li, i) {
        li.classList.toggle('is-on', reached > i && !li.classList.contains('is-end'));
        li.style.setProperty('--fill', reached > i + 1 ? 1 : 0);
      });
    });
  }

  /* ---------- Accès : la carte Google ne se charge qu'au clic ---------- */
  function initMap() {
    var btn = document.querySelector('.map-btn');
    var map = document.querySelector('.map');
    if (!btn || !map) return;
    btn.addEventListener('click', function () {
      if (map.querySelector('iframe')) { map.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      var iframe = document.createElement('iframe');
      iframe.src = map.dataset.mapSrc;
      iframe.title = 'Carte de l\'emplacement de Noumbi Resort';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      map.innerHTML = '';
      map.appendChild(iframe);
      btn.lastChild.textContent = ' Carte affichée';
    });
  }

  /* ---------- Accueil : vidéo de vagues (desktop, si fournie) ---------- */
  function initHeroVideo() {
    var media = document.querySelector('.hero-media[data-video]');
    if (!media || !desktop || saveData || reduceMotion) return;
    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
    v.setAttribute('aria-hidden', 'true');
    v.src = media.dataset.video;
    v.addEventListener('canplay', function () { media.classList.add('is-playing'); v.play().catch(function () {}); }, { once: true });
    media.appendChild(v);
  }

  /* ---------- Utilitaire : progression 0 → 1 d'un élément pendant le scroll ---------- */
  function onScrollProgress(el, startAt, span, cb) {
    var ticking = false;
    function update() {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = (vh * startAt - r.top) / (r.height + vh * span);
      cb(Math.max(0, Math.min(1, p)));
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }
})();
