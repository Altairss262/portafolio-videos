/**
 * Portafolio de Edición de Video - Lógica del Tarificador Interactivo
 * Desarrollado con vanilla JavaScript para máxima velocidad y fluidez.
 */

// ==========================================================================
// CONFIGURACIÓN DE TARIFAS Y CONTACTO
// ==========================================================================
const PHONE_NUMBER = "5491130000000"; // Reemplaza con tu número de WhatsApp real (incluyendo código de país)

const PRICING_TIERS = {
  1: {
    name: "Nivel 1: Esencial",
    basePrice: 12,
    range: "$10 - $15 USD"
  },
  2: {
    name: "Nivel 2: Dinámico",
    basePrice: 25,
    range: "$20 - $30 USD"
  },
  3: {
    name: "Nivel 3: Alto Impacto",
    basePrice: 50,
    range: "$45 - $60 USD"
  }
};

const PACK_DISCOUNT_PERCENT = 15; // 15% de descuento para paquetes mensuales (12+ videos)
const PACK_MINIMUM_VIDEOS = 12;   // Cantidad mínima de videos para sugerir y aplicar descuento automático

// ==========================================================================
// ESTADO DE LA APLICACIÓN
// ==========================================================================
let state = {
  selectedTier: 3, // Empezamos por defecto en el Nivel 3 (Recomendado/Premium)
  videoQty: 12,    // Por defecto sugerimos un paquete de 12 videos (Tip Pro)
  isMonthly: true  // Por defecto activo
};

let currentPriceDisplayValue = 0;
let animationFrameId = null;

// ==========================================================================
// ELEMENTOS DEL DOM
// ==========================================================================
const videoRangeInput = document.getElementById('video-range');
const rangeValDisplay = document.getElementById('range-val-display');
const monthlySwitch = document.getElementById('monthly-switch');
const discountBadge = document.getElementById('discount-badge');
const totalPriceDisplay = document.getElementById('total-price-display');

// Elementos de la factura / desglose
const breakdownLevel = document.getElementById('breakdown-level');
const breakdownQty = document.getElementById('breakdown-qty');
const breakdownBaseRate = document.getElementById('breakdown-base-rate');
const breakdownDiscountRow = document.getElementById('breakdown-discount-row');
const breakdownDiscountAmount = document.getElementById('breakdown-discount-amount');
const whatsappCtaBtn = document.getElementById('whatsapp-cta-btn');

// ==========================================================================
// LÓGICA DE CÁLCULO Y ANIMACIÓN
// ==========================================================================

/**
 * Realiza los cálculos y actualiza toda la interfaz
 */
function updateCalculator() {
  const tier = PRICING_TIERS[state.selectedTier];
  const qty = state.videoQty;
  
  // Cálculo de Subtotal y Descuentos
  const unitPrice = tier.basePrice;
  const subtotal = qty * unitPrice;
  
  let discount = 0;
  if (state.isMonthly) {
    discount = subtotal * (PACK_DISCOUNT_PERCENT / 100);
  }
  
  const total = subtotal - discount;
  
  // Actualizar textos básicos
  breakdownLevel.textContent = tier.name;
  breakdownQty.textContent = `${qty} ${qty === 1 ? 'video' : 'videos'}`;
  breakdownBaseRate.textContent = `$${unitPrice} USD`;
  
  // Desglose de descuentos
  if (discount > 0) {
    breakdownDiscountRow.style.display = 'flex';
    breakdownDiscountAmount.textContent = `-$${discount.toFixed(2)} USD`;
  } else {
    breakdownDiscountRow.style.display = 'none';
  }
  
  // Animar el precio total de forma fluida
  animatePrice(Math.round(total));
  
  // Actualizar el enlace del botón de WhatsApp
  updateWhatsAppLink(tier, qty, unitPrice, discount, total);
}

/**
 * Anima el cambio de número del precio total (Odometer effect)
 */
function animatePrice(targetPrice) {
  if (currentPriceDisplayValue === targetPrice) {
    totalPriceDisplay.textContent = targetPrice;
    return;
  }
  
  const start = currentPriceDisplayValue;
  const end = targetPrice;
  const duration = 200; // milisegundos
  let startTime = null;
  
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(progress * (end - start) + start);
    
    totalPriceDisplay.textContent = currentValue;
    currentPriceDisplayValue = currentValue;
    
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step);
    } else {
      totalPriceDisplay.textContent = end;
      currentPriceDisplayValue = end;
    }
  }
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  animationFrameId = requestAnimationFrame(step);
}

/**
 * Genera y actualiza la URL para el contacto de WhatsApp con un mensaje pre-redactado
 */
function updateWhatsAppLink(tier, qty, unitPrice, discount, total) {
  const modeText = state.isMonthly 
    ? `Paquete Mensual (Ahorro del ${PACK_DISCOUNT_PERCENT}%)` 
    : 'Videos Individuales';
    
  const discountText = discount > 0 
    ? `\n- *Ahorro mensual:* -$${discount.toFixed(2)} USD` 
    : '';

  const message = `¡Hola! Visité tu portafolio y coticé un proyecto mediante el tarificador:\n\n` +
    `🎥 *Detalles del Servicio:*\n` +
    `- *Nivel:* ${tier.name}\n` +
    `- *Cantidad:* ${qty} ${qty === 1 ? 'video' : 'videos'}\n` +
    `- *Modalidad:* ${modeText}${discountText}\n` +
    `- *Precio promedio sugerido:* $${unitPrice} USD por video\n\n` +
    `💰 *Presupuesto Estimado:* $${total.toFixed(2)} USD\n\n` +
    `Me gustaría conversar sobre los detalles de edición y comenzar.`;

  whatsappCtaBtn.href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ==========================================================================
// EVENT LISTENERS & GESTIÓN DE EVENTOS
// ==========================================================================

/**
 * Configura los botones de selección de nivel dentro de la calculadora
 */
function setupLevelSelector() {
  const buttons = [
    { el: document.getElementById('btn-lvl-1'), level: 1 },
    { el: document.getElementById('btn-lvl-2'), level: 2 },
    { el: document.getElementById('btn-lvl-3'), level: 3 }
  ];
  
  buttons.forEach(btnObj => {
    btnObj.el.addEventListener('click', () => {
      // Remover clase activa de todos
      buttons.forEach(b => {
        b.el.classList.remove('active');
        b.el.setAttribute('aria-checked', 'false');
      });
      
      // Agregar al seleccionado
      btnObj.el.classList.add('active');
      btnObj.el.setAttribute('aria-checked', 'true');
      
      state.selectedTier = btnObj.level;
      updateCalculator();
    });
  });

  // Activar visualmente el nivel por defecto (Nivel 3) al iniciar
  const defaultBtn = buttons.find(b => b.level === state.selectedTier);
  if (defaultBtn) {
    buttons.forEach(b => {
      b.el.classList.remove('active');
      b.el.setAttribute('aria-checked', 'false');
    });
    defaultBtn.el.classList.add('active');
    defaultBtn.el.setAttribute('aria-checked', 'true');
  }
}

/**
 * Configura la respuesta del Slider de cantidad de videos
 */
function setupRangeInput() {
  videoRangeInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.videoQty = val;
    rangeValDisplay.textContent = val;
    
    // Regla inteligente (Tip Pro): 
    // Si la cantidad es >= 12 (mínimo de paquete mensual) y el switch está apagado,
    // lo activamos automáticamente para demostrar la ventaja del descuento.
    if (val >= PACK_MINIMUM_VIDEOS && !state.isMonthly) {
      state.isMonthly = true;
      monthlySwitch.checked = true;
      highlightDiscountBadge();
    }
    
    updateCalculator();
  });
}

/**
 * Configura la respuesta del interruptor de Paquete Mensual
 */
function setupMonthlySwitch() {
  monthlySwitch.addEventListener('change', (e) => {
    state.isMonthly = e.target.checked;
    
    // Si se activa manualmente el descuento, y la cantidad es baja, se mantiene,
    // pero si es alta, agregamos efecto de relieve en el badge de descuento.
    if (state.isMonthly && state.videoQty >= PACK_MINIMUM_VIDEOS) {
      highlightDiscountBadge();
    }
    
    updateCalculator();
  });
}

/**
 * Genera un sutil efecto visual sobre el badge de descuento para llamar la atención
 */
function highlightDiscountBadge() {
  discountBadge.style.transform = 'scale(1.15)';
  discountBadge.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  setTimeout(() => {
    discountBadge.style.transform = 'scale(1)';
  }, 300);
}

/**
 * Conecta los botones "Cotizar en Calculadora" de las tarjetas de arriba
 * para que hagan scroll suave y seleccionen el nivel correcto en la calculadora.
 */
function setupTierCardsButtons() {
  const cardButtons = document.querySelectorAll('.select-tier-btn');
  cardButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tierId = parseInt(e.target.getAttribute('data-tier'));
      
      // Hacer scroll suave hacia la sección de la calculadora
      const calcSection = document.getElementById('calculadora');
      calcSection.scrollIntoView({ behavior: 'smooth' });
      
      // Simular clic en el botón de nivel correspondiente
      const targetBtn = document.getElementById(`btn-lvl-${tierId}`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });
}

// ==========================================================================
// PORTFOLIO EVOLUTIVO / SHOWCASE INTERACTIVO
// ==========================================================================
const PORTFOLIO_DATA = {
  1: {
    badge: "Fase de Edición 1",
    title: "Nivel 1: Esencial",
    description: "Mapea y pule el bruto de tu celular. Eliminamos silencios incómodos y añadimos subtítulos legibles para que te entiendan incluso sin audio.",
    videoSrc: "Portafolio/Primer video con subtitulos.mp4",
    retention: "35%",
    retentionVal: 35,
    retentionColor: "var(--accent-cyan)",
    comment: "Ideal para mantener presencia básica, pero con riesgo de abandono temprano.",
    addedValue: [
      "Elimina el 100% de los silencios, muletillas y 'ehh...'",
      "Añade subtítulos con estilo para retener a los usuarios sin sonido.",
      "Pule el audio de fondo y estabiliza el volumen de la voz."
    ]
  },
  2: {
    badge: "Fase de Edición 2",
    title: "Nivel 2: Dinámico",
    description: "El salto de calidad. Hacemos que el video fluya agregando B-rolls, memes y zooms constantes para que la vista del usuario no descanse.",
    videoSrc: "Portafolio/Segundo video con ediciones .mp4",
    retention: "60%",
    retentionVal: 60,
    retentionColor: "var(--accent-primary)",
    comment: "Aumenta la retención visual media. Excelente para construir una marca sólida.",
    addedValue: [
      "Todo lo del Nivel 1 incluido.",
      "Cortes dinámicos con zoom-ins/out que mantienen el ritmo constante.",
      "B-Rolls de stock y memes estáticos para dar apoyo visual a tus palabras.",
      "Efectos de sonido básicos (SFX) para acentuar las transiciones."
    ]
  },
  3: {
    badge: "Fase de Edición 3",
    title: "Nivel 3: Alto Impacto",
    description: "La fórmula definitiva para campañas y lanzamientos. Diseño de sonido cinematográfico y animaciones fluidas diseñadas para enganchar y vender.",
    videoSrc: "Portafolio/Tercer video con detallitos.mp4",
    retention: "85%",
    retentionVal: 85,
    retentionColor: "var(--accent-secondary)",
    comment: "Máxima retención para hooks de anuncios. Optimizado para convertir espectadores en clientes.",
    addedValue: [
      "Todo lo del Nivel 2 incluido.",
      "Gráficos dinámicos y listas numeradas animadas al ritmo de la voz.",
      "Personajes Flork animados con movimiento y gags personalizados.",
      "Diseño de sonido detallado (impactos, record scratches, risas, suspiros).",
      "Estructura orientada a ventas y optimización de ganchos (hooks)."
    ]
  }
};

let currentPortfolioTier = 1;

function setupPortfolioShowcase() {
  const tabs = document.querySelectorAll('.portfolio-tab');
  const player = document.getElementById('portfolio-player');
  const badge = document.getElementById('portfolio-badge');
  const title = document.getElementById('portfolio-title');
  const description = document.getElementById('portfolio-description');
  const retentionPercent = document.getElementById('retention-percentage');
  const retentionBar = document.getElementById('retention-bar');
  const retentionComment = document.getElementById('retention-comment');
  const addedValueList = document.getElementById('added-value-list');
  const portfolioCtaBtn = document.getElementById('portfolio-cta-btn');

  if (!player) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tierId = parseInt(tab.getAttribute('data-portfolio-tier'));
      if (tierId === currentPortfolioTier) return;

      currentPortfolioTier = tierId;

      // Clase activa en pestañas
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Obtener datos
      const data = PORTFOLIO_DATA[tierId];

      // Actualizar textos
      badge.textContent = data.badge;
      title.textContent = data.title;
      description.textContent = data.description;
      retentionPercent.textContent = data.retention;
      retentionComment.textContent = data.comment;

      // Actualizar barra
      retentionBar.style.width = data.retention;
      retentionBar.style.background = data.retentionColor;

      // Actualizar lista de valor
      addedValueList.innerHTML = '';
      data.addedValue.forEach(val => {
        const li = document.createElement('li');
        li.innerHTML = `<i data-lucide="check"></i> <span>${val}</span>`;
        addedValueList.appendChild(li);
      });

      // Recargar iconos Lucide
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // Cambiar origen del reproductor y reproducir
      player.src = data.videoSrc;
      player.load();
      player.muted = true;
      player.play().catch(err => {
        console.log("Autoplay bloqueado por políticas del navegador.");
      });
    });
  });

  // Conectar botón de cotización del portafolio con la calculadora
  if (portfolioCtaBtn) {
    portfolioCtaBtn.addEventListener('click', () => {
      const calcSection = document.getElementById('calculadora');
      calcSection.scrollIntoView({ behavior: 'smooth' });

      const targetBtn = document.getElementById(`btn-lvl-${currentPortfolioTier}`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  }
}

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar iconos de Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // 2. Configurar componentes interactivos
  setupLevelSelector();
  setupRangeInput();
  setupMonthlySwitch();
  setupTierCardsButtons();
  setupPortfolioShowcase();
  
  // 3. Renderizar primer cálculo
  updateCalculator();
});


