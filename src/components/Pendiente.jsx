// Marcadores de fotos y capturas que todavía no existen (DESIGN.md §7).
// Nunca llegan a producción: el build falla si este archivo se importa en alguna parte (vite.config.js).
const fondos = {
  noche: 'bg-noche-2 text-hueso',
  papel: 'bg-papel-2 text-tinta',
}

const proporciones = { '16:10': 'aspect-[16/10]', '3:2': 'aspect-[3/2]', '4:5': 'aspect-[4/5]' }

export function FotoPendiente({ descripcion, proporcion = '3:2', fondo = 'papel', etiqueta = 'FOTO PENDIENTE', className = '' }) {
  return (
    <div
      data-placeholder
      role="img"
      aria-label={`${etiqueta}: ${descripcion}`}
      className={`grid place-items-center p-6 text-center font-semibold ${fondos[fondo]} ${proporciones[proporcion]} ${className}`}
    >
      {etiqueta}: {descripcion}
    </div>
  )
}

export function CapturaPendiente({ proyecto, className = '' }) {
  return <FotoPendiente etiqueta="CAPTURA PENDIENTE" descripcion={proyecto} proporcion="16:10" fondo="noche" className={className} />
}
