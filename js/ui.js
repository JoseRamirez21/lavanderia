/* ═══════════════════════════════════════
   UI.JS — Filtros · WhatsApp · Forms · Tabs
   ═══════════════════════════════════════ */

/* ─────────────────────────────
   WHATSAPP HELPERS
   Abre WhatsApp con mensaje
   predefinido o personalizado
───────────────────────────── */
const WA_NUMBER = '51901267943'; // ← cambiar por el número real

function waOpen(mensaje = '') {
  const texto = mensaje
    ? encodeURIComponent(mensaje)
    : encodeURIComponent('Hola, me interesa conocer más sobre sus servicios de lavandería 👕');
  window.open(`https://wa.me/${WA_NUMBER}?text=${texto}`, '_blank');
}

function waServicio(servicio) {
  const texto = `Hola, quiero consultar sobre el servicio de *${servicio}* 🧺`;
  waOpen(texto);
}

function waPedido() {
  waOpen('Hola, quiero hacer un pedido 🧺');
}

// Exponer globalmente para uso en HTML inline
window.waOpen      = waOpen;
window.waServicio  = waServicio;
window.waPedido    = waPedido;

/* ─────────────────────────────
   FILTROS DE SERVICIOS/CARDS
   Uso:
   <button class="filter-btn" data-filter="lavado">Lavado</button>
   <div class="filterable" data-cat="lavado">...</div>
───────────────────────────── */
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Actualizar botón activo
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      document.querySelectorAll('.filterable').forEach((card, i) => {
        const match = filter === 'all' || card.dataset.cat === filter;

        if (match) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
})();

/* ─────────────────────────────
   TABS GENÉRICOS
   Uso:
   <button class="tab-btn" data-tab="express">Express</button>
   <div class="tab-panel" id="tab-express">...</div>
───────────────────────────── */
(function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = `tab-${btn.dataset.tab}`;

      document.querySelectorAll('.tab-panel').forEach((panel) => {
        panel.classList.remove('active');
      });

      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });
})();

/* ─────────────────────────────
   FORMULARIO DE CONTACTO
   Validación básica + feedback
───────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre  = form.querySelector('[name="nombre"]')?.value.trim();
    const tel     = form.querySelector('[name="telefono"]')?.value.trim();
    const servicio = form.querySelector('[name="servicio"]')?.value;
    const mensaje = form.querySelector('[name="mensaje"]')?.value.trim();

    if (!nombre || !tel) {
      showFormFeedback('Por favor completa nombre y teléfono.', 'error');
      return;
    }

    // Construir mensaje para WhatsApp
    const text = [
      `*Nuevo mensaje desde el sitio web*`,
      `👤 Nombre: ${nombre}`,
      `📱 Teléfono: ${tel}`,
      servicio ? `🧺 Servicio: ${servicio}` : '',
      mensaje  ? `💬 Mensaje: ${mensaje}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    waOpen(text);
    showFormFeedback('¡Mensaje enviado! Serás redirigido a WhatsApp.', 'success');
    form.reset();
  });
})();

function showFormFeedback(msg, type) {
  let feedback = document.getElementById('formFeedback');

  if (!feedback) {
    feedback = document.createElement('div');
    feedback.id = 'formFeedback';
    feedback.style.cssText = `
      padding: 0.8rem 1.2rem;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      margin-top: 1rem;
      transition: opacity 0.3s ease;
    `;
    const form = document.getElementById('contactForm');
    form?.parentNode.insertBefore(feedback, form.nextSibling);
  }

  feedback.textContent = msg;
  feedback.style.opacity = '1';

  if (type === 'success') {
    feedback.style.background = 'rgba(76, 201, 122, 0.1)';
    feedback.style.color = '#38A862';
    feedback.style.border = '1px solid rgba(76, 201, 122, 0.3)';
  } else {
    feedback.style.background = 'rgba(215, 43, 43, 0.08)';
    feedback.style.color = '#D72B2B';
    feedback.style.border = '1px solid rgba(215, 43, 43, 0.2)';
  }

  setTimeout(() => {
    feedback.style.opacity = '0';
  }, 4000);
}

/* ─────────────────────────────
   COUNTDOWN GENÉRICO
   Uso: <span id="countdown"
        data-target-hours="23:59:59">
───────────────────────────── */
(function initCountdown() {
  const cdH = document.getElementById('cd-h');
  const cdM = document.getElementById('cd-m');
  const cdS = document.getElementById('cd-s');
  if (!cdH || !cdM || !cdS) return;

  const update = () => {
    const now  = new Date();
    const end  = new Date(now);
    end.setHours(23, 59, 59, 0);
    const diff = end - now;

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    cdH.textContent = String(h).padStart(2, '0');
    cdM.textContent = String(m).padStart(2, '0');
    cdS.textContent = String(s).padStart(2, '0');
  };

  update();
  setInterval(update, 1000);
})();