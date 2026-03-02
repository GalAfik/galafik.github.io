'use strict';

/* ── 1. PARALLAX SHAPES ─────────────────────────────────────────
   12 geometric shapes pinned to a fixed canvas behind the page.
   Each animates independently via requestAnimationFrame —
   no libraries, pure CSS transforms on the GPU compositor.
   ─────────────────────────────────────────────────────────────── */
(function initShapes() {
  var canvas = document.getElementById('px-canvas');
  var defs = [
    {t:'ring',    c:'#f5e642',s:180,l:8,  top:15, r:0.12, rot:0.04,  osc:15,freq:0.7,bw:1.5,op:0.55},
    {t:'ring',    c:'#00f5d4',s:300,l:88, top:25, r:0.06, rot:-0.03, osc:20,freq:0.5,bw:1,  op:0.45},
    {t:'diamond', c:'#ff2d78',s:60, l:15, top:55, r:0.18, rot:0.08,  osc:10,freq:1.1,bw:0,  op:0.60},
    {t:'diamond', c:'#a855f7',s:90, l:75, top:70, r:0.08, rot:-0.05, osc:18,freq:0.6,bw:0,  op:0.55},
    {t:'ring',    c:'#ff6b2b',s:120,l:55, top:40, r:0.14, rot:0.06,  osc:8, freq:1.3,bw:1.5,op:0.50},
    {t:'cross',   c:'#f5e642',s:50, l:92, top:60, r:0.22, rot:0.10,  osc:12,freq:0.9,bw:0,  op:0.20},
    {t:'ring',    c:'#00f5d4',s:80, l:35, top:85, r:0.09, rot:-0.04, osc:6, freq:1.5,bw:1,  op:0.17},
    {t:'diamond', c:'#f5e642',s:40, l:65, top:10, r:0.25, rot:0.12,  osc:22,freq:0.4,bw:0,  op:0.22},
    {t:'ring',    c:'#a855f7',s:220,l:2,  top:75, r:0.05, rot:0.02,  osc:5, freq:0.8,bw:1,  op:0.45},
    {t:'cross',   c:'#00f5d4',s:35, l:48, top:20, r:0.30, rot:-0.15, osc:30,freq:0.3,bw:0,  op:0.20},
    {t:'diamond', c:'#ff2d78',s:70, l:22, top:95, r:0.11, rot:0.07,  osc:14,freq:1.0,bw:0,  op:0.52},
    {t:'ring',    c:'#f5e642',s:50, l:80, top:5,  r:0.20, rot:0.09,  osc:25,freq:0.6,bw:1.5,op:0.20}
  ];

  var items = defs.map(function(d) {
    var el = document.createElement('div');
    el.className = 'px-shape px-' + d.t;
    el.style.cssText = [
      'width:'   + d.s   + 'px',
      'height:'  + d.s   + 'px',
      'left:'    + d.l   + 'vw',
      'top:'     + d.top + 'vh',
      'opacity:' + d.op,
      'color:'   + d.c
    ].join(';');
    if (d.t === 'ring') {
      el.style.borderWidth = d.bw + 'px';
      el.style.borderColor = d.c;
    } else if (d.t === 'diamond') {
      el.style.background = d.c;
    }
    canvas.appendChild(el);
    return { el: el, d: d, angle: Math.random() * 360, phase: Math.random() * Math.PI * 2, t: 0 };
  });

  var scrollY = 0;
  window.addEventListener('scroll', function() { scrollY = window.scrollY; }, { passive: true });

  var raf;
  function tick() {
    for (var i = 0; i < items.length; i++) {
      var o = items[i];
      o.t     += 0.008;
      o.angle += o.d.rot;
      var tx = Math.sin(o.phase + o.t * o.d.freq) * o.d.osc;
      var ty = scrollY * o.d.r;
      o.el.style.transform = 'translate(' + tx + 'px,' + ty + 'px) rotate(' + o.angle + 'deg)';
    }
    raf = requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) { cancelAnimationFrame(raf); } else { tick(); }
  });
  tick();
})();


/* ── 2. HERO PARALLAX ───────────────────────────────────────────
   Grid background and ambient orbs move at different scroll rates
   creating a multi-layer depth effect.
   ─────────────────────────────────────────────────────────────── */
(function initHeroParallax() {
  var grid = document.getElementById('hero-grid');
  var orbs = document.querySelectorAll('.hero-orb');
  var rates = [0.15, 0.25, 0.10];
  window.addEventListener('scroll', function() {
    var sy = window.scrollY;
    if (grid) grid.style.transform = 'translateY(' + (sy * 0.3) + 'px)';
    orbs.forEach(function(orb, i) {
      orb.style.transform = 'translateY(' + (sy * (rates[i] || 0.2)) + 'px)';
    });
  }, { passive: true });
})();


/* ── 3. FADE-UP OBSERVER ────────────────────────────────────────
   Elements with .fade-up animate in once when entering viewport.
   ─────────────────────────────────────────────────────────────── */
(function initFadeUps() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(function(el) { obs.observe(el); });
})();


/* ── 4. ACTIVE NAV LINK ─────────────────────────────────────────
   Highlights the nav link for whichever section is scrolled into.
   ─────────────────────────────────────────────────────────────── */
(function initNavActive() {
  var sections = Array.from(document.querySelectorAll('section[id]'));
  var links    = Array.from(document.querySelectorAll('.nav-links a'));
  function update() {
    var cur = '';
    sections.forEach(function(s) { if (window.scrollY >= s.offsetTop - 160) cur = s.id; });
    links.forEach(function(a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ── 5. NAV SHRINK ──────────────────────────────────────────────
   Tightens nav padding once user scrolls past 60px.
   ─────────────────────────────────────────────────────────────── */
(function initNavShrink() {
  var nav = document.getElementById('main-nav');
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();


/* ── 6. MOBILE HAMBURGER ────────────────────────────────────────
   Toggles mobile nav drawer.
   ─────────────────────────────────────────────────────────────── */
(function initHamburger() {
  var btn   = document.getElementById('hamburger');
  var links = document.getElementById('nav-links');
  btn.addEventListener('click', function() {
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ── 7. SKILL TABS ──────────────────────────────────────────────
   Switches between Game Dev and Web & Systems panels.
   Re-observes hidden fade-ups when a panel becomes visible.
   ─────────────────────────────────────────────────────────────── */
(function initSkillTabs() {
  var tabs   = document.querySelectorAll('.skill-tab');
  var panels = document.querySelectorAll('.skill-panel');
  var revObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  tabs.forEach(function(btn) {
    btn.addEventListener('click', function() {
      tabs.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      panels.forEach(function(p) { p.classList.remove('active'); });
      var target = document.getElementById('tab-' + btn.dataset.tab);
      if (target) {
        target.classList.add('active');
        target.querySelectorAll('.fade-up:not(.visible)').forEach(function(el) { revObs.observe(el); });
      }
    });
  });
})();


/* ── 8. PROJECT FILTER ──────────────────────────────────────────
   Shows / hides project cards by category.
   ─────────────────────────────────────────────────────────────── */
(function initProjectFilter() {
  var btns  = document.querySelectorAll('.pf-btn');
  var cards = document.querySelectorAll('.proj-card');
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      cards.forEach(function(card) {
        card.style.display = (f === 'all' || card.dataset.cat === f) ? '' : 'none';
      });
    });
  });
})();


/* ── 9. VIDEO MODAL ─────────────────────────────────────────────
   Opens YouTube trailer in a lightbox overlay.
   Pauses video on close by replacing the iframe src.
   ─────────────────────────────────────────────────────────────── */
(function initVideoModal() {
  var modal     = document.getElementById('video-modal');
  var iframe    = document.getElementById('modal-iframe');
  var openBtns  = document.querySelectorAll('[data-open-trailer]');
  var closeBtn  = document.getElementById('modal-close-btn');
  var YT_SRC    = 'https://www.youtube.com/embed/lC331DLOe4I?autoplay=1&rel=0&modestbranding=1';

  function openModal() {
    iframe.src = YT_SRC;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    iframe.src = '';
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(function(btn) { btn.addEventListener('click', openModal); });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();
