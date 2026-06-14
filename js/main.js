
/* ═══════════════════════════════════════
   MAIN.JS — Loader · Navbar · Cursor
   ═══════════════════════════════════════ */

/* ─────────────────────────────
   LOADER
   Oculta el loader tras 2.2s
───────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  setTimeout(() => {
    loader.style.transition = 'opacity 0.65s ease';
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 700);
  }, 2200);
});

/* ─────────────────────────────
   NAVBAR — Scroll effect
   Agrega .scrolled al bajar,
   quita el offset del ticker
───────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial
})();

/* ─────────────────────────────
   MENÚ MOBILE — Hamburger
───────────────────────────── */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
})();

function closeMobile() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─────────────────────────────
   ACTIVE LINK — Resalta la
   página actual en el navbar
───────────────────────────── */
(function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPage = href.split('/').pop();

    if (
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
})();

/* ─────────────────────────────
   SMOOTH SCROLL — Para anclas
   internas dentro de la misma
   página (href="#sección")
───────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      closeMobile();

      const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
      const tickerHeight = 32;
      const offset = navHeight + tickerHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});