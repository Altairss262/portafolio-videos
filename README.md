# Tarificador Interactivo de Servicios de Edición de Video

Este es un portal web interactivo de nivel premium diseñado para cotizar servicios de edición de video (Shorts, Reels, TikToks < 60s) en tres niveles de complejidad. Está optimizado para captar clientes desde portafolios o enlaces directos, convirtiendo el tráfico en cotizaciones listas para enviar por Telegram.

## 🚀 Características Premium

- **Diseño Moderno e Inmersivo**: Tema oscuro premium con gradientes vibrantes (morado/rosa/cian), sombras de neon y efectos de cristal (glassmorphism).
- **Calculadora en Tiempo Real**: Los clientes seleccionan el nivel de edición y deslizan la cantidad de videos para ver el presupuesto inmediato con animaciones numéricas fluidas.
- **Tip Pro Integrado (Paquete Mensual)**: Sistema automatizado que incentiva la venta recurrente aplicando un **15% de descuento** si el cliente selecciona un paquete mensual (por defecto o al superar los 12 videos).
- **CTA Inteligente a Telegram**: Genera automáticamente un enlace directo a Telegram con un mensaje pre-formateado y detallado de la cotización calculada por el cliente.
- **Tabla Comparativa**: Una sección detallada y responsiva que compara las características incluidas en cada nivel de edición de hasta 1 minuto.

---

## 📂 Estructura de Archivos

- **[index.html](file:///g:/Mi%20unidad/Biblioteca/Proyectos/index.html)**: Estructura semántica, carga de fuentes (Google Fonts) e iconos modernos (Lucide Icons).
- **[styles.css](file:///g:/Mi%20unidad/Biblioteca/Proyectos/styles.css)**: Sistema de diseño, variables CSS, animaciones de fondo, sliders personalizados y estilos responsivos.
- **[app.js](file:///g:/Mi%20unidad/Biblioteca/Proyectos/app.js)**: Lógica interactiva de cálculos, animación de precios y generación de enlaces de Telegram.
- **[.gitignore](file:///g:/Mi%20unidad/Biblioteca/Proyectos/.gitignore)**: Configuración para omitir archivos temporales y locales en el repositorio de Git.

---

## 🛠️ Personalización

Para adaptar este tarificador a tus propios servicios, solo necesitas modificar las constantes al principio de **[app.js](file:///g:/Mi%20unidad/Biblioteca/Proyectos/app.js)**:

### 1. Configurar tu usuario de Telegram
Busca la siguiente línea al inicio del archivo y escribe tu nombre de usuario de Telegram (sin el símbolo `@`):
```javascript
const TELEGRAM_USER = "Altairss262"; // Reemplaza con tu usuario real
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

## 🖥️ Cómo Visualizarlo Localmente

Dado que es un proyecto de frontend puro (HTML/CSS/JS), puedes ejecutarlo de varias maneras:

1. **Directo en el navegador**: Debido a políticas de seguridad CORS, algunos navegadores bloquean la carga de videos locales si se abre mediante `file://`.
2. **Servidor Local Rápido (Recomendado)**:
   Si tienes Node.js instalado, puedes usar:
   ```bash
   npx serve .
   ```
   O si tienes Python instalado:
   ```bash
   python -m http.server 8080
   ```
   Luego abre `http://localhost:8080` en tu navegador.

---

## 🌐 Cómo Desplegar en GitHub Pages

Para obtener una URL pública de tu portafolio interactivo y compartirlo con tus clientes:

### Paso 1: Crear un Repositorio en GitHub
1. Inicia sesión en tu cuenta de [GitHub](https://github.com).
2. Haz clic en **New** (Nuevo) para crear un repositorio vacío.
3. Ponle un nombre (ejemplo: `portafolio-videos`) y mantenlo como **Public** (Público).
4. Haz clic en **Create repository** (Crear repositorio).

### Paso 2: Vincular tu Carpeta Local y Subir el Código
Abre la consola en la carpeta de tu PC y ejecuta los siguientes comandos para conectar y subir tu código (reemplaza `TU_USUARIO` y `TU_REPOSITORIO` con tus datos de GitHub):
```bash
# Cambiar el nombre de la rama a main si es necesario
git branch -M main

# Vincular el repositorio remoto de GitHub
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Subir tu código a GitHub
git push -u origin main
```

### Paso 3: Activar GitHub Pages
1. Dentro de tu repositorio en GitHub, ve a la pestaña **Settings** (Configuración) en el menú superior.
2. En la barra lateral izquierda, busca la sección **Code and automation** y haz clic en **Pages**.
3. En la sección **Build and deployment**, bajo **Source**, selecciona **Deploy from a branch**.
4. Debajo, en **Branch**, cambia `None` por **`main`** (y mantén `/ (root)`). Haz clic en **Save** (Guardar).
5. Espera unos 1-2 minutos. Si refrescas la página, verás un recuadro arriba con un mensaje como: *"Your site is live at: https://TU_USUARIO.github.io/TU_REPOSITORIO/"*. ¡Esa es tu URL pública!
