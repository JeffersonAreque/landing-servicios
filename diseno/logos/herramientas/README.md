# Herramientas del logo

Scripts que dibujan el logo a partir de los contornos reales de las fuentes del proyecto
(`public/fonts/`). Así el logo es SVG puro: no depende de que la fuente cargue.

| Archivo | Qué hace |
|---|---|
| `generar.py` | Dibuja las tres propuestas (A · Firma, B · Renglón, C · Ventana) y escribe todos los archivos. Aquí se cambia el diseño (tamaños, separación, cursor, colores). |
| `glifos.py` | Convierte letras de una fuente en trazos SVG y mide su caja. |
| `pagina.py` | Arma la página de comparación `diseno/prueba-logos.html`. |

## Cómo usarlo

Una sola vez, instala lo que necesita (mejor en un entorno virtual, fuera del proyecto):

```bash
pip install fonttools brotli
```

Luego, desde la raíz del repo:

```bash
python diseno/logos/herramientas/generar.py
```

Escribe:

- `diseno/logos/opcion-{a,b,c}-*.svg`: las tres propuestas, como registro.
- `diseno/logos/elegido/`: logo B (con nombre, monograma y perfil de redes) y favicon C.
- `public/favicon.svg`: el favicon que usa la página.
- `src/components/logoTrazos.js`: los trazos del logo B que usa `src/components/Logo.jsx`.
- `diseno/prueba-logos.html`: se ve con `npm run dev` en `/diseno/prueba-logos.html`.

## Los PNG (paso aparte)

`generar.py` no crea los PNG porque hace falta un navegador. Después de regenerar, pídele a Claude
que los exporte con Playwright abriendo cada SVG a su tamaño:

- `diseno/logos/elegido/perfil-redes-noche-1080.png` y `perfil-redes-papel-1080.png` (1080 × 1080).
- `public/apple-touch-icon.png` (180 × 180): el favicon C **con esquinas rectas**, porque el iPhone
  ya redondea las esquinas por su cuenta.

## Ojo

- Los colores están en `TEMAS`, dentro de `generar.py`, y deben coincidir con los tokens de `DESIGN.md`.
- Si cambias el logo B, revisa la barra de navegación a 390 px: el logo con nombre y el botón de
  WhatsApp tienen que caber con 20 px de margen a cada lado.
