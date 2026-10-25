import { reservas, mes } from '../data/reservas'

const RENGLONES = 13

// Hoja de cuaderno dibujada: renglones y margen en SVG, letra manuscrita (Kalam).
export default function HojaCuaderno() {
  return (
    <div className="hoja relative w-full bg-papel text-tinta">
      <svg
        aria-hidden="true"
        viewBox="0 0 400 500"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-tinta-2"
      >
        {Array.from({ length: RENGLONES }, (_, i) => (
          <line key={i} x1="0" x2="400" y1={36 * (i + 1) + 0.5} y2={36 * (i + 1) + 0.5} stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
        ))}
        <line x1="50" x2="50" y1="0" y2="500" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
      </svg>

      <div className="hoja-texto relative">
        <p className="text-[1.25em]">Reservas — {mes.nombre}</p>
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-[0.9em]">
          <span className="text-tinta-2">día</span>
          <span className="text-tinta-2">nombre</span>
          <span className="text-tinta-2">hab.</span>
          <span className="text-tinta-2">obs.</span>
          {reservas.map((r) => {
            const tachada = r.estado === 'Cancelada' ? 'line-through' : ''
            return [
              <span key={`${r.huesped}-d`} className={tachada}>{r.dia}/11</span>,
              <span key={`${r.huesped}-n`} className={tachada}>{r.huesped}</span>,
              <span key={`${r.huesped}-h`} className={tachada}>{r.habitacion}</span>,
              <span key={`${r.huesped}-o`}>{r.nota}</span>,
            ]
          })}
        </div>
        <p className="mt-[9cqw]">Falta cobrar el saldo a Rosa</p>
      </div>
    </div>
  )
}
