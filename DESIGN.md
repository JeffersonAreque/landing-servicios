# DESIGN.md — "Noche y papel"

> Fuente de verdad de **cómo se ve** la landing. El contenido manda en `BRIEF.md`.
> Si una regla de la skill design-taste-frontend choca con este archivo, manda este archivo.

## 1. La idea en una frase

**En esta página, el cuaderno donde un negocio anota sus reservas se convierte en el sistema que trabaja por él.**

Todo sale del titular del brief ("Del cuaderno y el Excel a un sistema que trabaja por ti"):
el hero muestra literalmente ese paso, y la página alterna dos ambientes:

- **Noche**: oscuro, premium, tecnológico (inspiración: Reflect). Para el hero y los proyectos,
  donde se demuestra lo que sé hacer.
- **Papel**: claro, cálido, humano (inspiración: Aro). Para servicios, proceso, sobre mí y
  contacto, donde el dueño de un hotel o restaurante decide si confía en mí.

El cambio entre los dos es un **corte limpio de color** (como salir de noche a la luz del día),
nunca un degradado de una sección a otra.

**Objetivo de tono visual:** elegante pero cercano. Profesional sin intimidar a un negocio pequeño
de Puerto Maldonado.

---

## 2. Color

### Tokens

| Token | Hex | Uso |
|---|---|---|
| `--noche` | `#0D1311` | Fondo oscuro: casi negro con tono de río de noche (no violeta). |
| `--noche-2` | `#151D1A` | Superficie un paso más clara sobre noche (paneles, pantalla del sistema). |
| `--hueso` | `#EEF0EC` | Texto principal sobre noche. |
| `--hueso-2` | `#A3ABA6` | Texto secundario sobre noche. |
| `--papel` | `#F2ECE3` | Fondo claro cálido (arena, no amarillo crema). |
| `--papel-2` | `#E8E0D4` | Superficie un paso más oscura sobre papel. |
| `--tinta` | `#16201C` | Texto principal sobre papel. |
| `--tinta-2` | `#4F5A55` | Texto secundario sobre papel. |
| `--aguajal` | `#1E7A5A` | **Acento** sobre papel y campo de color del cierre. |
| `--aguajal-hover` | `#186649` | Hover/presionado del acento sobre papel. |
| `--aguajal-claro` | `#4FC08D` | **Acento** sobre noche. |
| `--aguajal-claro-hover` | `#6FD0A3` | Hover/presionado del acento sobre noche. |

**El acento es el verde de los aguajales** de Madre de Dios vistos desde el avión: un guiño
discreto a la Amazonía sin hojas ni dibujos de selva. Nunca violeta, índigo ni morado.

### Contrastes comprobados (mínimo 4.5:1)

| Combinación | Contraste |
|---|---|
| `--hueso` sobre `--noche` | 16.4:1 |
| `--hueso-2` sobre `--noche` | 8.0:1 (7.3:1 sobre `--noche-2`) |
| `--tinta` sobre `--papel` | 14.2:1 |
| `--tinta-2` sobre `--papel` | 6.1:1 (5.5:1 sobre `--papel-2`) |
| Blanco sobre `--aguajal` (botón en papel, sección de cierre) | 5.3:1 |
| `--noche` sobre `--aguajal-claro` (botón en noche) | 8.3:1 |
| `--aguajal-claro` sobre `--noche` (enlaces) | 8.3:1 |

Cada combinación nueva se mide antes de usarla. Si no llega a 4.5:1, no se usa.

### Reglas de color

- Un fondo, un color de texto y un acento por sección.
- El acento va en **el botón de WhatsApp** y como mucho en un detalle más por sección
  (un enlace, el estado "En desarrollo"). Nunca en una palabra suelta del titular.
- Las superficies se separan con un **paso de tono** (`--noche` → `--noche-2`, `--papel` → `--papel-2`),
  no con líneas ni sombras.
- El texto que se lee va siempre en `--hueso` o `--tinta` a opacidad completa. El gris
  (`-2`) es solo para notas secundarias.

### Excepción aprobada: el brillo del hero

Detrás del "producto" del hero hay **un único brillo suave**: un `radial-gradient` de
`--aguajal-claro` a ~18 % de opacidad que se desvanece a transparente, de unos 60 % del ancho del
producto. Reglas:

- **Solo en el hero.** Ningún otro degradado ni brillo en toda la página (ni en botones, ni en
  texto, ni en fondos de sección).
- Nunca queda texto encima del brillo.
- No parpadea ni late. Como mucho, se desplaza muy poco con el scroll (y queda quieto con
  `prefers-reduced-motion`).
- Al pasar el inspector de la skill, se permite solo esa regla para ese elemento.

---

## 3. Tipografía

Dos familias, el máximo:

| Rol | Familia | Origen | Uso |
|---|---|---|---|
| Titulares | **Boska** (serif) | Fontshare, gratis para uso comercial | h1, h2, nombres de servicios, pasos y proyectos, frase de cierre, nombre en el footer. Pesos 500 y 700. |
| Texto | **Onest** (sans) | Google Fonts / `@fontsource/onest` | Párrafos, navegación, botones, datos de la pantalla del sistema. Pesos 400 y 600. |

Las fuentes se sirven **desde el propio proyecto** (archivos `woff2` en `public/fonts/`, solo el
subconjunto latino), con `font-display: swap` y precarga solo de Boska 500 y Onest 400.

**Excepción: Kalam** (manuscrita, Google Fonts, OFL) se usa **solo dentro del dibujo de la hoja de
cuaderno del hero**, como "la letra del dueño". Es parte de la imagen, no de la tipografía de la página:
ningún texto de la página va en Kalam.

### Escala (cinco tamaños, mobile first)

| Paso | Tamaño | Interlineado | Tracking | Uso |
|---|---|---|---|---|
| `display` | `clamp(2.75rem, 1.2rem + 6.4vw, 7rem)` (44 → 112 px) | 0.95 | -0.03em | Primera parte del h1. |
| `titulo` | `clamp(2rem, 1.3rem + 2.8vw, 3.75rem)` (32 → 60 px) | 1.05 | -0.02em | h2 de cada sección, segunda parte del h1 en escritorio, frase de cierre. |
| `subtitulo` | `clamp(1.375rem, 1.1rem + 1vw, 2rem)` (22 → 32 px) | 1.2 | -0.01em | Nombres de servicios, pasos y proyectos. Segunda parte del h1 en celular. |
| `texto` | `clamp(1.0625rem, 1rem + 0.25vw, 1.25rem)` (17 → 20 px) | 1.55 | 0 | Párrafos y subtítulo del hero. |
| `nota` | `0.9375rem` (15 px) | 1.45 | 0 | Datos secundarios ("En equipo · mi parte: backend"), footer. Nunca menos de 15 px. |

- Párrafos de 45 a 70 caracteres por línea (`max-width: 62ch`).
- Todo alineado a la izquierda. Solo se centra una cosa en toda la página: la frase de cierre.
- Sin mayúsculas pequeñas con espaciado, sin monoespaciada, sin itálicas ni colores para resaltar
  una palabra de un titular.

### El titular dividido en dos tamaños

El texto **no cambia**: "Del cuaderno y el Excel a un sistema que trabaja por ti." Va en un solo `<h1>`
con dos partes:

```html
<h1>
  <span class="display">Del cuaderno y el Excel</span>
  <span class="titulo">a un sistema que trabaja por ti.</span>
</h1>
```

- **1440 px:** una línea grande y una línea más chica (dos líneas en total).
- **390 px:** la parte grande ocupa dos líneas y la chica una o dos. Es una excepción aceptada a la
  regla de "dos líneas máximo" de la skill: el texto del brief es fijo y así se lee mejor que
  a un solo tamaño reducido.

---

## 4. Espacio y retícula

- **Mobile first.** Se diseña a 390 px y luego se amplía. Se revisa siempre a 390 y 1440 px.
- **Márgenes laterales iguales:** 20 px en celular, 32 px desde `md` (768 px), 48 px desde `xl` (1280 px).
  El contenido llega a un máximo de 1344 px y se centra.
- **Retícula:** 4 columnas en celular, 12 desde `lg` (1024 px), con 16 / 24 px de separación.
- **Separación entre secciones:** 96 px en celular y 160 px en escritorio. Dentro de una sección
  nada se separa más de 64 px.
- Los textos de toda la página se alinean a dos o tres bordes izquierdos como mucho.
- Ninguna sección deja media pantalla vacía: si el texto va a la izquierda, a la derecha va su
  imagen, una lista o una segunda columna.

---

## 5. Componentes

### Botones

- **Totalmente redondeados** (`border-radius: 999px`), planos y de un solo color. Sin sombras
  ni degradados.
- Alto mínimo de 48 px (cómodo para el pulgar), texto en Onest 600, tamaño `texto`.
- **Primario sobre papel:** fondo `--aguajal`, texto blanco; hover `--aguajal-hover`.
- **Primario sobre noche:** fondo `--aguajal-claro`, texto `--noche`; hover `--aguajal-claro-hover`.
- **Primario sobre el cierre verde:** fondo `--papel`, texto `--tinta`.
- **Secundario:** solo texto subrayado (subrayado de 2 px, separado 4 px) en el color de texto de la
  sección. Nada de botones con borde fino.
- Al presionar: escala a 0.97. Foco: contorno de 2 px en el acento de la sección, separado 3 px.
- El botón de WhatsApp abre `https://wa.me/51910130538` con un mensaje ya escrito según dónde
  se pulse (por ejemplo, desde Páginas web: "Hola Jefferson, quiero una página web para mi negocio").

### Navegación

- Barra simple sobre `--noche`, no fija: nombre "Jefferson Areque" a la izquierda, enlaces
  (Servicios, Cómo trabajo, Proyectos, Sobre mí) y el botón "Escríbeme por WhatsApp".
- **En celular:** solo el nombre y el botón de WhatsApp. Sin menú hamburguesa, porque la página es
  corta y se recorre con scroll.
- Sin efecto vidrio (blur), sin cápsula flotante y sin línea inferior.

### Logo

**Decidido: logo principal B · Renglón y favicon C · Ventana.**

- **B · Renglón** (logo principal): "JA" en Boska 700 escrito sobre un renglón de cuaderno que termina
  en un cursor de bloque. Las letras van en el color de texto de la sección (`--hueso` sobre noche,
  `--tinta` sobre papel) y el renglón y el cursor en el acento (`--aguajal-claro` sobre noche,
  `--aguajal` sobre papel). Es la idea de la página (del cuaderno al sistema) en un solo signo.
  - Navegación: logo con el nombre "Jefferson Areque" (36 px de alto en celular, 48 px en escritorio).
  - "Sobre mí": el monograma grande, en lugar de una foto personal.
  - Redes (TikTok, LinkedIn): imagen de perfil cuadrada con el monograma centrado, dentro del recorte
    circular (`diseno/logos/elegido/perfil-redes-*-1080.png`).
- **C · Ventana** (solo favicon): ficha `--aguajal-claro` con el radio de las pantallas del sistema y
  "JA" en Onest 600 color `--noche`. Se usa solo en la pestaña del navegador (`public/favicon.svg`) y
  como icono de iPhone (`public/apple-touch-icon.png`), porque a 16 px se lee mejor que el renglón.
  No se usa en ninguna otra parte de la página.
- Todo en SVG con las letras convertidas a trazos (no dependen de que cargue la fuente). En React, el
  componente `Logo` (`src/components/Logo.jsx`) usa los trazos de `src/components/logoTrazos.js`.
- Los archivos finales están en `diseno/logos/elegido/`. Las tres propuestas originales siguen en
  `diseno/logos/` y en `diseno/prueba-logos.html`, como registro.

### Fotos e imágenes

- Esquinas **rectas** en fotos y capturas. La única excepción son las "pantallas" de sistema
  hechas en HTML, que llevan el radio de una ventana real (12 px).
- Proporciones fijas: escenas 3:2 y capturas de sistema 16:10. No hay retratos: no se usa foto personal.
- Nunca hay nada encima de un titular.

### Prohibido (resumen de la skill + CLAUDE.md)

Etiquetas pequeñas sobre los titulares, insignias tipo cápsula, numeración "01 / 02", líneas finas
divisorias, cajas con borde de 1 px, sombras en elementos quietos, degradados (salvo el brillo del
hero), efecto vidrio, emojis o íconos como adorno, tarjetas con ícono arriba, filas de tarjetas
iguales y paneles falsos de barras grises.

---

## 6. Secciones, en orden

| # | Sección | Fondo | Composición |
|---|---|---|---|
| 1 | Hero | Noche | Texto y producto |
| 2 | Servicios | Papel | Lista tipo menú |
| 3 | Cómo trabajo | Papel-2 | Recorrido horizontal |
| 4 | Proyectos que construí | Noche | Imagen grande alternada |
| 5 | Sobre mí | Papel | Logo y texto |
| 6 | Cierre / contacto | Aguajal | Campo de color |
| 7 | Footer | Noche | Nombre a todo el ancho |

Las secciones vecinas nunca repiten la misma composición.

### 1. Hero (noche)

**Escritorio (1440):** el `<h1>` ocupa las 12 columnas (a 112 px "Del cuaderno y el Excel" no entra
en 6 columnas y debe quedar en una línea). Debajo, el texto ocupa las columnas 1–5 y el producto las 7–12.
- Debajo del `<h1>`, a 32–48 px, el subtítulo del brief en `texto` y `--hueso`.
- Después, el botón primario "Escríbeme por WhatsApp" y el secundario "Ver cómo trabajo".
- **El producto:** una **hoja de cuaderno dibujada en HTML/CSS** (renglones y margen en SVG, letra
  manuscrita Kalam, proporción 4:5) con reservas anotadas a mano, ligeramente girada, y detrás el brillo
  aguajal. Al hacer scroll, la hoja se aparta y en su lugar aparece la
  **pantalla de un sistema de reservas** hecha en HTML (tabla con fecha, huésped, habitación y estado,
  con **los mismos datos** que la hoja). El título de la pantalla es "Reservas · Tu lodge", sin nombres
  de negocios reales.
- **Lo interactivo:** debajo del producto hay un interruptor accesible "Cuaderno / Sistema" para
  cambiar de estado sin depender del scroll. Funciona con el pulgar y con el teclado.

**Celular (390):** primero el `<h1>`, después el subtítulo y el botón a todo el ancho. Debajo va el
producto a todo el ancho, con el brillo detrás, y el interruptor.

La primera pantalla responde en cinco segundos quién soy, qué hago y cómo escribirme.

### 2. Servicios (papel)

Los cuatro servicios, en el orden del brief, presentados **como un menú** en vez de tarjetas.
- Cada servicio es una fila. A la izquierda (columnas 1–5) va el nombre en `subtitulo`; a la derecha
  (columnas 7–12), la descripción en `texto`.
- Las filas se separan con espacio y alternan `--papel` / `--papel-2`, sin líneas.
- **Páginas web va primero y más destacada:** fila más alta, con su propio botón "Quiero mi página
  web" (WhatsApp con mensaje escrito). Así sigue la estrategia del brief de vender primero la web.
- En celular, el nombre va arriba y la descripción debajo. Sin íconos.

### 3. Cómo trabajo (papel-2)

- Los cuatro pasos van en un `<ol>` real. En escritorio forman una fila de cuatro columnas, con el
  nombre del paso en `subtitulo` y su explicación debajo. En celular van uno debajo del otro.
- El orden se entiende por la posición, sin números "01", "02".
- El avance se muestra con **una barra rellena** de `--aguajal` que crece al hacer scroll (en celular
  es vertical), en vez de una línea fina.
- La frase de los **30 días de corrección gratis** se destaca en `--tinta` 600, con la aclaración de
  que los cambios nuevos se cotizan aparte.
- Debajo hay un bloque en `--papel` para **Mantenimiento mensual (opcional)**, sin precio.

### 4. Proyectos que construí (noche)

- Título h2: "Proyectos que construí". Nunca "clientes" ni "casos de éxito".
- Cada proyecto ocupa una banda con la imagen grande (7 columnas) y el texto (5 columnas). El lado
  se alterna de un proyecto a otro.
- El texto lleva el nombre en `subtitulo`, el problema que resuelve en `texto` y, en `nota` /
  `--hueso-2`, el contexto exacto del brief:
  - SafePickup: proyecto universitario en equipo; mi parte, el backend; artículo **en redacción**.
  - Ojo de Dios: proyecto de curso, hecho solo, versión inicial.
  - EcoMap: **En desarrollo** (en `--aguajal-claro`), lo lidero, postulado a Capital Semilla UNAMAD
    2026, en equipo.
- **Imagen:** capturas reales de cada proyecto o, si no hay, un fragmento de su interfaz hecho en
  HTML con datos coherentes. Nunca barras grises de relleno.
- Al final, los enlaces discretos a Portafolio y GitHub (secundarios, en `nota`).
- Sin brillo: el brillo solo está en el hero.

### 5. Sobre mí (papel)

- **Sin foto personal.** En escritorio, el **monograma del logo** va grande en las columnas 1–5, sobre un
  bloque `--papel-2` de proporción 4:5, y el texto en las 7–12. En celular, el bloque con el monograma va
  arriba (más bajo, alineado a la izquierda) y el texto debajo.
- El monograma es un SVG en `--tinta` (y el acento solo si la opción elegida lo lleva). No es una foto:
  no cuenta como `FotoPendiente`.
- Texto en primera persona: soy de Puerto Maldonado, estudiante de 8.º ciclo de Ingeniería de
  Sistemas e Informática (UNAMAD), puedo ir en persona dentro de Madre de Dios y trabajo en remoto
  para todo el Perú.

### 6. Cierre / contacto (campo `--aguajal`)

- Es la única sección con fondo de color entero. El texto va en blanco.
- La frase de cierre del brief va en `titulo`. **Es lo único centrado** de la página.
- Debajo van el botón "Escríbeme por WhatsApp" (fondo `--papel`) y el correo como enlace secundario.
- Una **foto real de Puerto Maldonado** (3:2) acompaña al texto: al lado en escritorio y debajo
  en celular.

### 7. Footer (noche)

- Mi nombre en Boska ocupa todo el ancho, como firma.
- Debajo, en `nota`: Puerto Maldonado, Perú · Portafolio · GitHub · correo · © 2026.

---

## 7. Fotos: marcadores mientras llegan las reales

Las fotos las tomará Jefferson con el celular. **No se usan fotos de stock ni picsum.photos.**

> **Excepción autorizada por Jefferson (25/10/2026):** la foto del cierre es de Wikimedia Commons con
> licencia libre. Su crédito se ve debajo de la foto y queda registrado en `src/data/credits.json`.
> Toda foto de terceros que se agregue debe ir igual: licencia libre, crédito visible y entrada en ese archivo.
> Las capturas de Proyectos son de los sistemas reales funcionando con datos de prueba.

| Foto pendiente | Dónde va | Proporción |
|---|---|---|
| Una escena de Puerto Maldonado (río, calle, puerto) | Cierre | 3:2 |
| Capturas reales de SafePickup, Ojo de Dios y EcoMap (si existen) | Proyectos | 16:10 |

Mientras tanto:
- Hay un solo componente `<FotoPendiente descripcion="…" proporcion="4:5" />`. Es un bloque de color
  plano `--noche-2` o `--papel-2` con el texto "FOTO PENDIENTE: …" bien visible y el atributo
  `data-placeholder`.
- **Nunca llega a producción:** antes de publicar, el build debe fallar si queda algún
  `FotoPendiente` o `data-placeholder` en el código. Esa comprobación se añade al implementar.
- Las fotos reales se optimizan antes de usarlas: WebP/AVIF, como mucho unos 200 KB cada una, con
  `width` y `height` definidos y `loading="lazy"` salvo en el hero.
- Cada foto lleva un `alt` que describe lo que se ve.

---

## 8. Movimiento (solo con `motion`)

Sin GSAP, sin Lenis y sin secuestrar el scroll. Solo se animan `transform` y `opacity`.

| Qué | Cómo |
|---|---|
| **Movimiento estrella:** cuaderno → sistema | `useScroll` + `useTransform` en el hero. La hoja gira y se desliza hacia atrás mientras la pantalla del sistema sube y se asienta. Las filas aparecen una a una (60 ms entre cada una). |
| Entrada de cada sección | `whileInView` una sola vez. Primero el título, luego el texto, luego la imagen, con 70 ms de diferencia. Suben 24 px con opacidad, en 0.6 s con `ease: [0.22, 1, 0.36, 1]`. |
| Barra del proceso | Crece con el scroll de la sección (`scaleX`, o `scaleY` en celular). |
| Fotos | Zoom muy lento (de 1.06 a 1) al entrar en pantalla. |
| Botones y enlaces | Hover: cambio de color en 150 ms. Al presionar: escala a 0.97. Foco siempre visible. |

**`prefers-reduced-motion`** (`useReducedMotion`):
- No hay desplazamientos ni zoom: el contenido aparece ya en su sitio.
- El hero muestra directamente el estado "Sistema" y el interruptor sigue funcionando sin animación.
- El brillo queda quieto.

**Regla de seguridad:** si el JavaScript falla, todo el contenido es visible. Nada empieza oculto
solo con CSS.

**Para el video:** el scroll de arriba abajo debe verse fluido a 60 fps en celular. Las animaciones
terminan dentro de su sección para que cada pantalla del video quede limpia.

---

## 9. Implementación en Tailwind v4

Los tokens van en `src/index.css` con `@theme`, para usar clases como `bg-noche`, `text-tinta` o
`text-display`:

```css
@import "tailwindcss";

@theme {
  --color-noche: #0D1311;
  --color-noche-2: #151D1A;
  --color-hueso: #EEF0EC;
  --color-hueso-2: #A3ABA6;
  --color-papel: #F2ECE3;
  --color-papel-2: #E8E0D4;
  --color-tinta: #16201C;
  --color-tinta-2: #4F5A55;
  --color-aguajal: #1E7A5A;
  --color-aguajal-hover: #186649;
  --color-aguajal-claro: #4FC08D;
  --color-aguajal-claro-hover: #6FD0A3;

  --font-titulo: "Boska", Georgia, serif;
  --font-texto: "Onest", system-ui, sans-serif;

  --text-display: clamp(2.75rem, 1.2rem + 6.4vw, 7rem);
  --text-titulo: clamp(2rem, 1.3rem + 2.8vw, 3.75rem);
  --text-subtitulo: clamp(1.375rem, 1.1rem + 1vw, 2rem);
  --text-texto: clamp(1.0625rem, 1rem + 0.25vw, 1.25rem);
  --text-nota: 0.9375rem;
}
```

No se escriben colores ni tamaños sueltos en los componentes: todo sale de estos tokens.

---

## 10. Antes de decir "terminado"

- [ ] `npm run build` sin errores.
- [ ] Revisión con Playwright a 390 y 1440 px (capturas de cada sección).
- [ ] Contraste ≥ 4.5:1 en todo texto. Foco visible en todos los controles. El interruptor del hero
      funciona con teclado.
- [ ] Con `prefers-reduced-motion` todo el contenido se ve y nada se desplaza.
- [ ] No queda ningún `FotoPendiente`, `data-placeholder` ni enlace a picsum.photos.
- [ ] No hay testimonios, logos, cifras inventadas ni "nosotros".
- [ ] Linter e inspector de la skill sin FAIL (con la excepción del brillo del hero).
