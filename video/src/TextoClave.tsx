// Texto corto sobre la grabación: un bloque noche recto (sin sombra ni degradado) con el texto en
// hueso y, debajo, el renglón con cursor del logo. Entra subiendo 24 px y sale desvaneciéndose.
import { interpolate, useCurrentFrame } from 'remotion'
import { color, fuente, SUAVE } from './tokens'

type Props = {
  texto: string
  entra: number
  sale: number
  caja: { top: number; left: number; width: number }
  tamano: number
  // Sin relleno a los lados cuando el bloque ya está sobre fondo noche (versión cuadrada).
  relleno?: boolean
  // El bloque nace en el borde del cuadro y el texto entra `sangria` px: así no asoma nada de la
  // página a su izquierda y el texto sigue dentro de la zona segura.
  sangria?: number
}

const ENTRADA = 15
const SALIDA = 8

export function TextoClave({ texto, entra, sale, caja, tamano, relleno = true, sangria = 0 }: Props) {
  const f = useCurrentFrame()
  if (f < entra || f > sale + SALIDA) return null

  const t = interpolate(f, [entra, entra + ENTRADA], [0, 1], { extrapolateRight: 'clamp', easing: SUAVE })
  const fuera = interpolate(f, [sale, sale + SALIDA], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const renglon = interpolate(f, [entra + 6, entra + 22], [0, 1], { extrapolateRight: 'clamp', easing: SUAVE })

  return (
    <div
      style={{
        position: 'absolute',
        ...caja,
        opacity: t * (1 - fuera),
        transform: `translateY(${(1 - t) * 24 - fuera * 12}px)`,
      }}
    >
      <div style={{ display: 'inline-block', backgroundColor: color.noche, padding: `${tamano * 0.42}px ${relleno ? tamano * 0.55 : 0}px ${tamano * 0.42}px ${sangria + (relleno ? tamano * 0.55 : 0)}px` }}>
        <p
          style={{
            margin: 0,
            fontFamily: fuente.titulo,
            fontWeight: 500,
            fontSize: tamano,
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            color: color.hueso,
            textWrap: 'balance',
          }}
        >
          {texto}
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: tamano * 0.1, marginTop: tamano * 0.28 }}>
          <div style={{ height: tamano * 0.08, width: tamano * 3.2 * renglon, backgroundColor: color.aguajalClaro }} />
          <div style={{ height: tamano * 0.42, width: tamano * 0.24, backgroundColor: color.aguajalClaro, opacity: renglon >= 1 ? 1 : 0 }} />
        </div>
      </div>
    </div>
  )
}
