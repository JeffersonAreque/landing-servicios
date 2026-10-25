# Landing de servicios — Jefferson Areque

Página de una sola pantalla con scroll que vende mis servicios de desarrollo de software.
También se graba haciendo scroll para usarla como video de marketing (TikTok / LinkedIn).

## Stack
- React + Vite + Tailwind CSS (igual que mi portafolio)
- Animaciones al hacer scroll con la librería `motion` (antes framer-motion)
- Deploy en Vercel; repo en GitHub JeffersonAreque/landing-servicios

## Comandos
- Instalar: `npm install`
- Desarrollo: `npm run dev` → http://localhost:5173
- Build: `npm run build`

## Fuentes de verdad (en este orden)
1. `BRIEF.md` → qué dice la página (textos, servicios, público). No inventes otros servicios ni cifras.
2. `DESIGN.md` → cómo se ve (colores, tipografía, espaciado, movimiento). Si no existe todavía, pregúntame.
3. Figma → la maqueta aprobada, cuando te pase el enlace.

## Reglas
- Textos en español de Perú, tono cercano y directo. Nada de promesas que no pueda cumplir.
- Prohibido inventar testimonios, logos de clientes, cifras ("+100 proyectos") o premios.
- Diseño: sigue la skill de diseño instalada (design-taste-frontend) y web-design-guidelines. Evita el
  "look de IA": degradados morados genéricos, emojis como íconos, todo centrado y con sombras.
- Mobile first: la mayoría me verá desde el celular. Revisar a 390 px y a 1440 px.
- Accesibilidad: contraste mínimo 4.5:1, respetar `prefers-reduced-motion`.
- Rendimiento: imágenes optimizadas, nada de librerías pesadas sin preguntarme.
- Antes de decir "terminado": `npm run build` sin errores y revisión con Playwright en 390 y 1440 px.
- Explícame las decisiones importantes en simple: estoy aprendiendo.
- Animaciones solo con `motion`. No usar GSAP ni Lenis aunque la skill los recomiende.
- No usar `scripts/assets.mjs` de la skill ni descargar imágenes sin preguntarme antes.
- Las fotos de relleno (picsum.photos) nunca llegan a la versión publicada.
- Si una regla de design-taste-frontend choca con `DESIGN.md`, manda `DESIGN.md`.
