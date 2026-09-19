# Portafolio audiovisual · ALTO IMPACTO

Portafolio público de edición de video para Reels, TikToks y Shorts. El sitio conserva la presentación original del servicio, los cuatro niveles de evolución, los planes, la tabla comparativa y el cotizador para Telegram.

**Sitio público:** https://altairss262.github.io/portafolio-videos/

## Casos de estudio

1. **El valor del diseño sonoro:** comparación directa entre `vaquero-base.mp4` y `vaquero-diseno-sonoro.mp4`.
2. **Yo en la Baticueva:** pieza de comedia con concepto, montaje y timing visual.
3. **Gemini Pro:** anuncio vertical de 30 segundos con voz original, beneficios, precio, urgencia y contacto persistente.

## Funciones del sitio

- Comparador interactivo de cuatro niveles de edición.
- Tres planes de servicio para contenido corto.
- Cotizador con descuento mensual y mensaje listo para Telegram.
- Casos audiovisuales responsivos con reproducción exclusiva para evitar audios simultáneos.
- Metadatos Open Graph, Twitter Cards, datos estructurados, `robots.txt`, `sitemap.xml` y `llms.txt`.

## Desarrollo local

El proyecto usa HTML, CSS y JavaScript sin proceso de compilación.

```bash
npx serve .
```

Después abre la URL local indicada por el servidor.

## Configuración

Las tarifas y el usuario de Telegram del cotizador se encuentran al inicio de `app.js`:

```javascript
const TELEGRAM_USER = "Altairss262";
const PACK_DISCOUNT_PERCENT = 15;
const PACK_MINIMUM_VIDEOS = 12;
```

El contacto `@ChiguireToolsBot` se usa únicamente en el caso promocional de Gemini Pro.
