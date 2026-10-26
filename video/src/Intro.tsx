// Intro: la pregunta, palabra por palabra, escrita "sobre un renglón" que termina en el cursor
// del logo. Fondo noche, alineada a la izquierda como toda la página.
import { Fragment } from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { textos } from './textos'
import { color, fuente, SUAVE } from './tokens'

type Props = { tamano: number; ancho: number; izquierda: number }

export function Intro({ tamano, ancho, izquierda }: Props) {
  const f = useCurrentFrame()
  const palabras = textos.intro.split(' ')
  const linea = interpolate(f, [16, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: SUAVE })
  const cursorVisible = f >= 38 && Math.floor((f - 38) / 12) % 2 === 0
  // La pregunta se va antes del cruce con la grabación, para que no se mezcle con el titular.
  const salida = interpolate(f, [58, 66], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: color.noche, justifyContent: 'center', paddingLeft: izquierda }}>
      <div style={{ width: ancho, opacity: salida }}>
        <h1
          style={{
            margin: 0,
            fontFamily: fuente.titulo,
            fontWeight: 700,
            fontSize: tamano,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            color: color.hueso,
          }}
        >
          {palabras.map((p, i) => {
            const t = interpolate(f, [i * 3, i * 3 + 16], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: SUAVE,
            })
            // El espacio va fuera del span para que la línea pueda cortarse entre palabras.
            return (
              <Fragment key={i}>
                <span style={{ display: 'inline-block', opacity: t, transform: `translateY(${(1 - t) * 24}px)` }}>{p}</span>
                {i < palabras.length - 1 ? ' ' : ''}
              </Fragment>
            )
          })}
        </h1>
        {/* El renglón del cuaderno, con el cursor del logo al final */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: tamano * 0.12, marginTop: tamano * 0.35 }}>
          <div style={{ height: tamano * 0.07, width: ancho * 0.55 * linea, backgroundColor: color.aguajalClaro }} />
          <div
            style={{
              height: tamano * 0.5,
              width: tamano * 0.3,
              backgroundColor: color.aguajalClaro,
              opacity: cursorVisible ? 1 : 0,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  )
}
