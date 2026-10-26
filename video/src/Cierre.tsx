// Cierre: logo B, la frase, la URL y el botón de WhatsApp. Fondo noche para que el logo vaya en
// sus colores (hueso + aguajal claro) y el botón sea el primario sobre noche de DESIGN.md.
// Es la única pantalla centrada, como la frase de cierre de la página.
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { Logo } from './Logo'
import { textos } from './textos'
import { color, fuente, SUAVE } from './tokens'

// `caja`: dónde va el bloque centrado (en vertical, dentro de la zona segura de TikTok).
type Props = { escala: number; caja: { left: number; width: number; centroY: number } }

export function Cierre({ escala, caja }: Props) {
  const f = useCurrentFrame()
  const subir = (desde: number) => {
    const t = interpolate(f, [desde, desde + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: SUAVE })
    return { opacity: t, transform: `translateY(${(1 - t) * 24}px)` }
  }
  const escribir = interpolate(f, [4, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: SUAVE })
  const { cierre } = textos

  return (
    <AbsoluteFill style={{ backgroundColor: color.noche }}>
      <div
        style={{
          position: 'absolute',
          left: caja.left,
          width: caja.width,
          top: caja.centroY,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={subir(0)}>
          <Logo alto={150 * escala} escribir={escribir} />
        </div>
        <p
          style={{
            ...subir(6),
            margin: `${48 * escala}px 0 0`,
            fontFamily: fuente.titulo,
            fontWeight: 500,
            fontSize: 72 * escala,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: color.hueso,
            textWrap: 'balance',
          }}
        >
          {cierre.frase}
        </p>
        <div
          style={{
            ...subir(12),
            marginTop: 56 * escala,
            padding: `${30 * escala}px ${56 * escala}px`,
            borderRadius: 999,
            backgroundColor: color.aguajalClaro,
            color: color.noche,
            fontFamily: fuente.texto,
            fontWeight: 600,
            fontSize: 44 * escala,
            lineHeight: 1.2,
          }}
        >
          {cierre.boton}
        </div>
        <p
          style={{
            ...subir(16),
            margin: `${36 * escala}px 0 0`,
            fontFamily: fuente.texto,
            fontWeight: 400,
            fontSize: 38 * escala,
            color: color.hueso,
          }}
        >
          {cierre.url}
        </p>
      </div>
    </AbsoluteFill>
  )
}
