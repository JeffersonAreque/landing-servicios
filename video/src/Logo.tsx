// Logo B · Renglón con los mismos trazos que la web (src/components/logoTrazos.js).
// `escribir` (0–1) dibuja el renglón de izquierda a derecha y luego aparece el cursor.
import { trazos } from '../../src/components/logoTrazos.js'
import { color } from './tokens'

type Props = { alto: number; completo?: boolean; escribir?: number }

export function Logo({ alto, completo = false, escribir = 1 }: Props) {
  const ancho = completo ? trazos.anchoCompleto : 64
  const [renglon, cursor] = trazos.acento
  return (
    <svg viewBox={`0 0 ${ancho} 64`} height={alto} width={(alto * ancho) / 64} aria-hidden>
      <path d={trazos.letras} fill={color.hueso} />
      <rect {...renglon} width={renglon.width * Math.min(1, escribir / 0.7)} fill={color.aguajalClaro} />
      {escribir >= 0.85 && <rect {...cursor} fill={color.aguajalClaro} />}
      {completo && <path d={trazos.nombre} fill={color.hueso} />}
    </svg>
  )
}
