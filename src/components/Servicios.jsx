import { motion, useReducedMotion } from 'motion/react'
import BotonWhatsApp from './BotonWhatsApp'
import { aparecer } from '../lib/entrada'

// Páginas web va primero y destacada (estrategia del brief: vender primero la web).
const servicios = [
  {
    nombre: 'Páginas web',
    descripcion:
      'Para que te encuentren en Google y te escriban por WhatsApp. Tu negocio con su propia página: qué ofreces, dónde estás y un botón para escribirte.',
    boton: { texto: 'Quiero mi página web', mensaje: 'Hola Jefferson, quiero una página web para mi negocio.' },
  },
  {
    nombre: 'Sistemas a medida',
    descripcion: 'Reservas, inventario, ventas, registro de clientes y reportes, pensados para cómo trabaja tu negocio.',
  },
  {
    nombre: 'Automatizaciones',
    descripcion:
      'Las tareas repetitivas que hoy haces a mano: reportes, avisos, formularios o conectar las herramientas que ya usas. Incluso con IA, cuando de verdad ayuda.',
  },
  {
    nombre: 'Apps móviles',
    descripcion: 'Apps para Android, para tus clientes o para tu equipo.',
  },
]

// Lista tipo menú: cada servicio es una fila; las filas alternan papel / papel-2, sin líneas.
export default function Servicios() {
  const reducir = useReducedMotion()

  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="bg-papel py-24 text-tinta lg:py-40">
      <div className="marco">
        <motion.h2 id="servicios-titulo" className="font-titulo text-titulo font-medium" {...aparecer(0, reducir)}>
          Lo que puedo hacer por tu negocio
        </motion.h2>
      </div>

      {/* Las filas llegan a los bordes de la pantalla; el texto sigue en el marco */}
      <ul className="mt-12 lg:mt-16">
        {servicios.map((servicio, i) => {
          const destacado = Boolean(servicio.boton)
          return (
            <li key={servicio.nombre} className={i % 2 === 0 ? 'bg-papel-2' : 'bg-papel'}>
              <div
                className={`marco grid grid-cols-4 gap-x-4 gap-y-3 lg:grid-cols-12 lg:gap-x-6 ${
                  destacado ? 'py-12 lg:py-20' : 'py-8 lg:py-10'
                }`}
              >
                <motion.h3
                  className="col-span-4 font-titulo text-subtitulo font-medium lg:col-span-5"
                  {...aparecer(1, reducir)}
                >
                  {servicio.nombre}
                </motion.h3>
                <motion.div className="col-span-4 lg:col-span-6 lg:col-start-7" {...aparecer(2, reducir)}>
                  <p className="max-w-[62ch]">{servicio.descripcion}</p>
                  {destacado && (
                    <BotonWhatsApp fondo="papel" mensaje={servicio.boton.mensaje} className="mt-8 w-full sm:w-auto">
                      {servicio.boton.texto}
                    </BotonWhatsApp>
                  )}
                </motion.div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
