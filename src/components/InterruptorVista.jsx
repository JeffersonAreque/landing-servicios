import { motion } from 'motion/react'

const opciones = [
  { valor: 'cuaderno', texto: 'Cuaderno' },
  { valor: 'sistema', texto: 'Sistema' },
]

// Interruptor accesible: dos botones con aria-pressed; el elegido se pinta en hueso.
export default function InterruptorVista({ vista, alCambiar }) {
  return (
    <div role="group" aria-label="Ver las reservas en" className="inline-flex rounded-full bg-noche-2 p-1">
      {opciones.map((o) => {
        const activa = vista === o.valor
        return (
          <motion.button
            key={o.valor}
            type="button"
            aria-pressed={activa}
            onClick={() => alCambiar(o.valor)}
            whileTap={{ scale: 0.97 }}
            className={`min-h-12 rounded-full px-6 font-semibold transition-colors duration-150 ${
              activa ? 'bg-hueso text-noche' : 'text-hueso hover:text-aguajal-claro'
            }`}
          >
            {o.texto}
          </motion.button>
        )
      })}
    </div>
  )
}
