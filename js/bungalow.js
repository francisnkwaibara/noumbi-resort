/* =========================================================
   Noumbi Resort · page d'un bungalow (bungalow.html?b=kelly)
   Lit les données de js/bungalows.js et remplit la page.
   Chargé avant main.js : les liens WhatsApp et les apparitions
   sont ensuite branchés par main.js comme sur l'accueil.
   ========================================================= */
(function () {
  'use strict';

  var list = window.BUNGALOWS || [];
  var id = new URLSearchParams(location.search).get('b');
  var b = list.filter(function (x) { return x.id === id; })[0];
  if (!b) { location.replace('index.html#bungalows'); return; }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CAMERA = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';

  var page = document.querySelector('.b-detail');
  page.dataset.name = b.name;
  page.dataset.cap = b.cap;

  document.title = b.name + ' · Bungalow ' + b.cap + ' pers. · Noumbi Resort';
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', 'Bungalow ' + b.name + ' à Noumbi Resort, éco-lodge au Congo. ' + b.summary + ' ' + b.price + ' ' + b.priceNote + '. Réservation sur WhatsApp.');

  page.querySelector('.b-name').textContent = b.name;
  page.querySelector('.b-cap').textContent = b.cap + ' personnes';
  page.querySelector('.b-summary').textContent = b.summary;
  page.querySelector('.b-book-label').textContent = 'Réserver ' + b.name + ' sur WhatsApp';
  page.querySelectorAll('.b-price').forEach(function (p) {
    p.querySelector('strong').textContent = b.price;
    p.querySelector('span').textContent = b.priceNote;
  });

  var facts = page.querySelector('.b-facts');
  b.details.forEach(function (d) {
    var dt = document.createElement('dt');
    var dd = document.createElement('dd');
    dt.textContent = d[0];
    dd.textContent = d[1];
    facts.appendChild(dt);
    facts.appendChild(dd);
  });

  buildGallery(b.photos);
  buildOthers();
  initBack();
  page.hidden = false;

  /* ---------- Retour : revenir sur la carte du bungalow dans l'accueil ---------- */
  function initBack() {
    var back = document.querySelector('.back-link');
    back.href = 'index.html#b-' + b.id;
    back.addEventListener('click', function (e) {
      // Arrivé depuis l'accueil : l'historique remet la page exactement où elle était.
      // Sinon (lien partagé, autre bungalow…), le lien mène directement à la carte.
      var ref;
      try { ref = new URL(document.referrer); } catch (err) { return; }
      if (ref.origin === location.origin && /\/(index\.html)?$/.test(ref.pathname) && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    });
  }

  /* ---------- Galerie : swipe au doigt, glisser à la souris, flèches, clavier ---------- */
  function buildGallery(photos) {
    var slider = page.querySelector('.b-slider');
    var thumbs = page.querySelector('.b-thumbs');
    var dots = page.querySelector('.b-dots');
    var count = page.querySelector('.b-count');
    var prev = page.querySelector('.b-prev');
    var next = page.querySelector('.b-next');
    var n = photos.length;

    photos.forEach(function (p, i) {
      var slide = document.createElement('figure');
      slide.className = 'b-slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', 'Photo ' + (i + 1) + ' sur ' + n);
      var thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'b-thumb';
      thumb.setAttribute('aria-label', 'Voir la photo ' + (i + 1));

      if (p.placeholder) {
        slide.classList.add('placeholder');
        slide.innerHTML = CAMERA + '<span></span>';
        slide.querySelector('span').textContent = '[' + p.placeholder + ']';
        thumb.classList.add('is-empty');
        thumb.innerHTML = CAMERA;
      } else {
        if (p.h > p.w) slide.classList.add('is-portrait');
        slide.appendChild(makeImg(p, i === 0, '(min-width: 900px) 60vw, 100vw'));
        var t = document.createElement('img');
        t.src = p.small; t.alt = ''; t.loading = 'lazy';
        thumb.appendChild(t);
      }
      slider.appendChild(slide);
      thumb.addEventListener('click', function () { go(i); });
      thumbs.appendChild(thumb);

      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Photo ' + (i + 1) + ' sur ' + n);
      dot.addEventListener('click', function () { go(i); });
      dots.appendChild(dot);
    });

    if (n < 2) {
      [prev, next, dots, thumbs, count].forEach(function (el) { el.hidden = true; });
      return;
    }

    function current() { return Math.round(slider.scrollLeft / slider.clientWidth) || 0; }
    function go(i) {
      i = Math.max(0, Math.min(n - 1, i));
      slider.scrollTo({ left: slider.clientWidth * i, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    function update() {
      var i = current();
      count.textContent = (i + 1) + ' / ' + n;
      dots.querySelectorAll('button').forEach(function (d, k) { d.setAttribute('aria-current', String(k === i)); });
      thumbs.querySelectorAll('button').forEach(function (t, k) { t.setAttribute('aria-current', String(k === i)); });
      prev.disabled = i === 0;
      next.disabled = i === n - 1;
    }

    prev.addEventListener('click', function () { go(current() - 1); });
    next.addEventListener('click', function () { go(current() + 1); });
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
    });
    slider.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function () { go(current()); });
    update();

    // Glisser à la souris (desktop). Au doigt, le défilement natif suffit.
    var down = false, startX = 0, startLeft = 0;
    slider.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; startX = e.clientX; startLeft = slider.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) slider.classList.add('is-dragging');
      slider.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function (e) {
      if (!down) return;
      down = false;
      var dx = e.clientX - startX;
      slider.classList.remove('is-dragging');
      // un petit geste suffit pour changer de photo
      var from = Math.round(startLeft / slider.clientWidth);
      if (dx < -40) go(from + 1); else if (dx > 40) go(from - 1); else go(from);
    });
    slider.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }

  /* ---------- Les autres bungalows ---------- */
  function buildOthers() {
    var ul = document.querySelector('.b-mini-list');
    list.forEach(function (o) {
      if (o.id === b.id) return;
      var photo = o.photos.filter(function (p) { return !p.placeholder; })[0];
      var li = document.createElement('li');
      li.className = 'reveal';
      var a = document.createElement('a');
      a.className = 'b-mini';
      a.href = 'bungalow.html?b=' + o.id;
      var media = document.createElement('span');
      media.className = 'b-mini-media';
      if (photo) {
        var img = document.createElement('img');
        img.src = photo.small; img.alt = ''; img.loading = 'lazy';
        media.appendChild(img);
      }
      var body = document.createElement('span');
      body.className = 'b-mini-body';
      var name = document.createElement('strong');
      name.textContent = o.name;
      var meta = document.createElement('span');
      meta.textContent = o.cap + ' pers. · ' + o.price;
      body.appendChild(name);
      body.appendChild(meta);
      a.appendChild(media);
      a.appendChild(body);
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  function makeImg(p, eager, sizes) {
    var img = document.createElement('img');
    img.src = p.src;
    img.srcset = p.small + ' 700w, ' + p.src + ' ' + p.w + 'w';
    img.sizes = sizes;
    img.alt = p.alt;
    img.width = p.w;
    img.height = p.h;
    img.draggable = false;
    if (eager) img.fetchPriority = 'high'; else img.loading = 'lazy';
    return img;
  }
})();
