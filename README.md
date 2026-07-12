# Tarificador Interactivo de Servicios de Edición de Video

Este es un portal web interactivo de nivel premium diseñado para cotizar servicios de edición de video (Shorts, Reels, TikToks < 60s) en tres niveles de complejidad. Está optimizado para captar clientes desde portafolios como Behance, convirtiendo el tráfico en cotizaciones listas para enviar por WhatsApp.

## 🚀 Características Premium

- **Diseño Moderno e Inmersivo**: Tema oscuro premium con gradientes vibrantes (morado/rosa/cian), sombras de neon y efectos de cristal (glassmorphism).
- **Calculadora en Tiempo Real**: Los clientes seleccionan el nivel de edición y deslizan la cantidad de videos para ver el presupuesto inmediato con animaciones numéricas fluidas.
- **Tip Pro Integrado (Paquete Mensual)**: Sistema automatizado que incentiva la venta recurrente aplicando un **15% de descuento** si el cliente selecciona un paquete mensual (por defecto o al superar los 12 videos).
- **CTA Inteligente a WhatsApp**: Genera automáticamente un enlace directo a WhatsApp con un mensaje pre-formateado y detallado de la cotización calculada por el cliente.
- **Tabla Comparativa**: Una sección detallada y responsiva que compara las características incluidas en cada nivel de edición.

---

## 📂 Estructura de Archivos

- **[index.html](file:///g:/Mi%20unidad/Biblioteca/Proyectos/index.html)**: Estructura semántica, carga de fuentes (Google Fonts) e iconos modernos (Lucide Icons).
- **[styles.css](file:///g:/Mi%20unidad/Biblioteca/Proyectos/styles.css)**: Sistema de diseño, variables CSS, animaciones de fondo, sliders personalizados y estilos responsivos.
- **[app.js](file:///g:/Mi%20unidad/Biblioteca/Proyectos/app.js)**: Lógica interactiva de cálculos, animación de precios y generación de enlaces de WhatsApp.
- **[.gitignore](file:///g:/Mi%20unidad/Biblioteca/Proyectos/.gitignore)**: Configuración para omitir archivos temporales y locales en el repositorio de Git.

---

## 🛠️ Personalización

Para adaptar este tarificador a tus propios servicios, solo necesitas modificar las constantes al principio de **[app.js](file:///g:/Mi%20unidad/Biblioteca/Proyectos/app.js)**:

### 1. Configurar tu número de WhatsApp
Busca la siguiente línea al inicio del archivo y escribe tu número con código de país (sin espacios ni símbolos):
```javascript
const PHONE_NUMBER = "5491130000000"; // Reemplaza con tu número real
```

### 2. Cambiar los precios base o rangos
Puedes ajustar las tarifas de cada nivel editando el objeto `PRICING_TIERS`:
```javascript
const PRICING_TIERS = {
  1: {
    name: "Nivel 1: Esencial",
    basePrice: 12,          // Precio para el cálculo automático
    range: "$10 - $15 USD"  // Rango mostrado en las tarjetas
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
```

### 3. Modificar el Descuento por Paquete
Si prefieres ofrecer un porcentaje diferente de descuento o cambiar el umbral de videos sugeridos:
```javascript
const PACK_DISCOUNT_PERCENT = 15; // Porcentaje de descuento (ej. 15%)
const PACK_MINIMUM_VIDEOS = 12;   // Activa automáticamente el switch al llegar a esta cantidad
```

---

## 🖥️ Cómo Visualizarlo

Dado que es un proyecto de frontend puro (HTML/CSS/JS), puedes ejecutarlo de varias maneras:

1. **Directo en el navegador**: Haz doble clic sobre `index.html` para abrirlo en tu navegador.
2. **Servidor Local Rápido (Recomendado)**:
   Si tienes Node.js instalado, puedes usar:
   ```bash
   npx serve .
   ```
   O si tienes Python instalado:
   ```bash
   python -m http.server 8000
   ```
   Luego abre `http://localhost:8000` en tu navegador.
