# Portafolio audiovisual · ALTO IMPACTO

El proyecto ofrece dos recorridos:

- **Portafolio** (/): muestra los trabajos y cierra con contacto directo, sin precios.
- **Portafolio + servicios** (/servicios/): conserva niveles, planes, tabla comparativa y cotizador para Telegram.

**Sitio público:** https://altairss262.github.io/portafolio-videos/

## Casos de estudio

1. **El valor del diseño sonoro:** comparación directa entre `vaquero-base.mp4` y `vaquero-diseno-sonoro.mp4`.
2. **Yo en la Baticueva:** pieza de comedia con concepto, montaje y timing visual.
3. **Gabriel Analytic:** presentación de un aplicativo de gestión empresarial y de su ecosistema automatizado.

## Funciones del sitio

- Comparador interactivo de cuatro niveles de edición.
- Versión principal enfocada en trabajos y contacto.
- Versión de servicios con tres planes, descuento mensual y mensaje listo para Telegram.
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
