---
name: video-marketing
description: Hace un video de marketing de una landing publicada, sin editar a mano. Graba la página con Playwright fotograma por fotograma (scroll suave, 1080×1920, 30 fps) y lo monta con Remotion con intro, textos animados en las pausas y cierre con logo y llamada a WhatsApp. Saca la versión vertical para TikTok y una cuadrada para LinkedIn. Úsala cuando Jefferson pida un video, reel, TikTok o clip de su página o de la página de un cliente, o cuando diga "graba la página" o "haz el video como el de la landing".
---

# Video de marketing de una landing

Proceso probado en `landing-servicios` (carpeta `video/`). Para otro proyecto, copia `video/`
sin `node_modules/`, `out/` ni `public/grabacion.mp4`, y cambia solo lo que dice "Adaptar".

## Requisitos de entrega (no negociables)
- MP4 H.264, yuv420p, 30 fps, **sin audio** (la música se pone en TikTok, que tiene licencia).
- Vertical **1080×1920**, de 20 a 30 s. Cuadrado **1080×1080** para LinkedIn.
- Texto nítido: calidad antes que velocidad (PNG por fotograma, x264 `veryslow`, CRF 16).
- Textos **solo del BRIEF.md** del proyecto: nada de cifras, testimonios, logos de clientes
  ni promesas que no estén ahí.
- Estilo del **DESIGN.md** del proyecto (colores, fuentes, botones). Lo centrado solo en el cierre.
- Los MP4 nunca van a git (`*.mp4` y `video/out/` en `.gitignore`).

## Pasos
1. **Instalar** (una vez): en `video/`, `npm install`, `npm run preparar` (copia las fuentes de
   `../public/fonts`) y `npx playwright install chromium`.
2. **Adaptar el guion** en `video/guion.mjs`: la URL publicada y las paradas (`selector` de cada
   sección, `margen` desde arriba, `tramo` = segundos de scroll hasta ahí, `pausa` = 1–2 s quieto).
   La parada de un efecto ligado al scroll lleva `terminaEn` (fracción de pantalla donde termina).
   Suma de tramos + pausas ≈ 17–20 s, para que con intro (2,5 s) y cierre (3 s) quede en 20–30 s.
3. **Adaptar los textos** en `video/src/textos.ts` (intro, 3–4 textos clave con el `id` de su parada,
   cierre) y, si cambia la marca, `src/tokens.ts`, `src/Logo.tsx` y las fuentes de `preparar`.
4. **Grabar**: `npm run grabar` → `public/grabacion.mp4` + `public/marcas.json` (≈ 1,5 min).
   Revisa 5–6 fotogramas sueltos con ffmpeg antes de seguir (`-vf "select=eq(n\,N)"`).
5. **Montar y revisar con guías**:
   `npx remotion render Vertical out/revision/vertical-guias.mp4 --props='{"guias":true}' --x264-preset=fast`
   Saca fotogramas de cada texto y míralos: lo rojo es lo que tapa TikTok.
6. **Render final**: `npm run render` → `out/video-vertical-1080x1920.mp4` y `out/video-linkedin-1080x1080.mp4`.
7. **Revisión final**: `npm run revisar` (formato con ffprobe + fotogramas y hoja de contacto en
   `out/revision/`). Mira **cada** imagen tú mismo: texto cortado, desalineado, fuera de la zona
   segura, ilegible o pixelado. Corrige y vuelve a renderizar hasta que esté limpio.
8. Entrega las rutas de los MP4 y 3 descripciones para TikTok con hashtags locales, todo sacado del brief.

## Zona segura de TikTok (1080×1920)
Todo texto dentro de **x 64–900, y 220–1340**: arriba está "Siguiendo / Para ti", a la derecha
los botones (~180 px) y abajo la descripción y la música (~580 px). `src/ZonaSegura.tsx` lo dibuja.
Truco: con `margen: 100` la sección queda a 250 px del borde y el texto clave (arriba, en y = 250)
cae justo en el espacio vacío de arriba de la sección, sin tapar su título.

## Cómo funciona la grabación (y qué hacer si falla)
- Viewport 432×768 con `deviceScaleFactor: 2.5` = 1080×1920 reales, con el diseño de celular.
- Reloj falso (`page.clock.install()`): por cada fotograma se mueve el scroll, se adelanta el reloj
  1/30 s y se saca la captura, que va directo a ffmpeg (CRF 10). Por eso no hay saltos.
- `motion` (y cualquier animación del navegador, WAAPI) corre con el reloj real: `grabar.mjs` las
  pausa y las coloca a mano en cada fotograma (`__sincronizar`). Una animación vista por primera vez
  empieza "ahora", aunque diga que empieza en el futuro: si no, las entradas aparecen tarde.
- Antes de grabar: imágenes `lazy` → `eager` y espera a fuentes e imágenes, **sin** hacer scroll
  previo (las entradas `whileInView` deben verse en el video).
- Si una sección sale en blanco o una animación no avanza: revisa ese momento con fotogramas
  sueltos; sube la espera real de `avanzar()` (8 ms) para que el navegador avise qué entró en
  pantalla. Plan B: grabar en tiempo real con CDP `Page.startScreencast` a la misma resolución.
- `npx remotion still` es muy lento con este video (busca el fotograma cada vez); para revisar
  conviene renderizar el video con `--x264-preset=fast` y sacar fotogramas con ffmpeg.

## Reglas del proyecto que siguen valiendo
- Nada de GSAP ni Lenis; no descargar imágenes ni usar `scripts/assets.mjs` sin preguntar.
- `video/` tiene su propio `package.json`: no entra al build de la web (y `src/index.css` lleva
  `@source not "../video";` para que Tailwind no lo lea). Comprueba con `npm run build` en la raíz.
