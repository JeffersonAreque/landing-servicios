import { trazos } from './logoTrazos'

// Logo B · Renglón: "JA" sobre un renglón que termina en un cursor.
// `completo` agrega el nombre. Las letras toman el color del texto; el acento depende del fondo.
const acentos = { noche: 'fill-aguajal-claro', papel: 'fill-aguajal' }

export default function Logo({ completo = false, fondo = 'noche', className = '' }) {
  const ancho = completo ? trazos.anchoCompleto : 64
  return (
    <svg viewBox={`0 0 ${ancho} 64`} aria-hidden="true" focusable="false" className={className}>
      <path d={trazos.letras} fill="currentColor" />
      {trazos.acento.map((r, i) => (
        <rect key={i} {...r} className={acentos[fondo]} />
      ))}
      {completo && <path d={trazos.nombre} fill="currentColor" />}
    </svg>
  )
}
