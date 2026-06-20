/* ═══════════════════════════════════════════════════
   TRANSITIONS.JS — Transiciones suaves entre páginas
   Usa View Transitions API (Chrome/Edge) con fallback
   elegante en Firefox/Safari (fade manual con CSS)
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Soporte View Transitions API ──
  const supportsVT = !!document.startViewTransition;

  // ── Interceptar clics en links internos ──
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Solo links internos relativos (sin http, mailto, tel, #ancla)
    const isInternal =
      !href.startsWith('http') &&
      !href.startsWith('mailto') &&
      !href.startsWith('tel') &&
      !href.startsWith('#') &&
      !link.hasAttribute('target');

    if (!isInternal) return;

    e.preventDefault();

    if (supportsVT) {
      // View Transitions API — fade nativo del navegador
      document.startViewTransition(() => {
        window.location.href = href;
      });
    } else {
      // Fallback: fade out manual, luego navegar
      document.body.style.transition = 'opacity 0.25s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = href;
      }, 260);
    }
  });

  // ── Fade in al entrar a la página ──
  window.addEventListener('pageshow', function (e) {
    document.body.style.transition = 'none';
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.35s ease';
        document.body.style.opacity = '1';
      });
    });
  });

})();