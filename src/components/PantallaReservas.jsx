import { motion } from 'motion/react'
import { reservas, mes } from '../data/reservas'

const filas = {
  oculta: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

// Pantalla del sistema de reservas hecha en HTML, con los mismos datos que la hoja.
// `data-ui` marca que es un fragmento de interfaz real (puede llevar las líneas de su tabla).
export default function PantallaReservas({ filasVisibles, reducir }) {
  const ocupadas = reservas.filter((r) => r.estado !== 'Cancelada').length
  const porConfirmar = reservas.filter((r) => r.estado === 'Por confirmar').length
  return (
    <div data-ui className="flex w-full flex-col rounded-xl bg-noche-2 p-4 text-hueso lg:aspect-[16/10] lg:p-6">
      <div className="flex items-baseline justify-between gap-4 pb-3 lg:pb-5">
        <p className="font-semibold">Reservas · Tu lodge</p>
        <p className="text-nota text-hueso-2 capitalize">{mes.nombre} 2026</p>
      </div>
      <table className="w-full text-left text-nota">
        <thead className="text-hueso-2">
          <tr>
            <th scope="col" className="py-2 pr-2 sm:pr-3 font-normal">Fecha</th>
            <th scope="col" className="py-2 pr-2 sm:pr-3 font-normal">Huésped</th>
            <th scope="col" className="py-2 pr-2 sm:pr-3 font-normal">
              <span className="sm:hidden">Hab.</span>
              <span className="hidden sm:inline">Habitación</span>
            </th>
            <th scope="col" className="py-2 font-normal">Estado</th>
          </tr>
        </thead>
        <motion.tbody
          initial={false}
          animate={filasVisibles ? 'visible' : 'oculta'}
          transition={{ staggerChildren: reducir ? 0 : 0.06 }}
        >
          {reservas.map((r) => (
            <motion.tr
              key={r.huesped}
              variants={reducir ? undefined : filas}
              className="border-t border-hueso/10" // taste-skill-ignore: líneas de una tabla real dentro de data-ui
            >
              <td className="py-2.5 pr-2 sm:pr-3 whitespace-nowrap">{r.dia} {mes.corto}</td>
              <td className="py-2.5 pr-2 sm:pr-3">{r.huesped}</td>
              <td className="py-2.5 pr-2 sm:pr-3">{r.habitacion}</td>
              <td className={`py-2.5 ${r.estado === 'Confirmada' || r.estado === 'Con adelanto' ? '' : 'text-hueso-2'}`}>
                {r.estado}
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
      <p className="mt-auto pt-4 text-nota text-hueso-2">
        {ocupadas} de {reservas.length} habitaciones reservadas · {porConfirmar} por confirmar
      </p>
    </div>
  )
}
