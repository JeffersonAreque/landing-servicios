// Entrada de cada sección: sube 24 px con opacidad, una sola vez, 70 ms entre cada parte.
// Con movimiento reducido no devuelve nada: el contenido aparece ya en su sitio.
export const SUAVE = [0.22, 1, 0.36, 1]

export const aparecer = (orden, reducir) =>
  reducir
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        // Se dispara apenas el bloque asoma: con scroll rápido (o en el video) nada queda en blanco
        viewport: { once: true, margin: '0px 0px -8% 0px' },
        transition: { duration: 0.6, delay: orden * 0.07, ease: SUAVE },
      }
