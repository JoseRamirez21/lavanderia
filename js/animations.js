/* ═══════════════════════════════════════
   ANIMATIONS.JS — Scroll reveals · Counters
   ═══════════════════════════════════════ */

/* ─────────────────────────────
   INTERSECTION OBSERVER
   Activa clases .visible en
   .reveal, .reveal-left, etc.
   y .stagger para hijos
───────────────────────────── */
(function initScrollReveal() {
  const selectors = [
    '.reveal',
    '.reveal-left',
    '.reveal-right',
    '.reveal-fade',
    '.reveal-scale',
    '.stagger',
  ];

  const elements = document.querySelectorAll(selectors.join(','));
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Disparar contadores si el elemento los tiene
          if (entry.target.dataset.hasCounters === 'true') {
            entry.target
              .querySelectorAll('[data-target]')
              .forEach((el) => animateCounter(el, +el.dataset.target, 2000));
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ─────────────────────────────
   CONTADORES ANIMADOS
   Uso: <div data-target="500">0</div>
   El elemento padre necesita
   data-has-counters="true"
───────────────────────────── */
function animateCounter(el, target, duration) {
  let startTime = null;

  // Preservar el contenido del <sup> si existe
  const sup = el.querySelector('sup');
  const supHTML = sup ? sup.outerHTML : '';

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing: ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.innerHTML = current + supHTML;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.innerHTML = target + supHTML;
    }
  };

  requestAnimationFrame(step);
}

/* ─────────────────────────────
   COUNTERS SECTION OBSERVER
   Para la sección de contadores
   con la clase .counters-section
───────────────────────────── */
(function initCounters() {
  const counterSection = document.querySelector('.counters-section');
  if (!counterSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target
            .querySelectorAll('[data-target]')
            .forEach((el) => animateCounter(el, +el.dataset.target, 2000));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(counterSection);
})();

/* ─────────────────────────────
   PARALLAX SUAVE EN HERO
   Solo en desktop (>900px)
───────────────────────────── */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  const onScroll = () => {
    if (window.innerWidth < 900) return;
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();