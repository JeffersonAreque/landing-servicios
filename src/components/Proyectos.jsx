import { motion, useReducedMotion } from 'motion/react'
import { CapturaPendiente } from './Pendiente'
import { aparecer } from '../lib/entrada'

// Proyectos que construí: nunca como clientes. Se explican por el problema que resuelven
// y la nota dice el contexto exacto del brief (en equipo, mi parte, estado).
const proyectos = [
  {
    nombre: 'SafePickup',
    problema:
      'Que solo las personas autorizadas recojan a los niños del colegio: el sistema reconoce el rostro de quien llega y verifica si tiene permiso.',
    contexto: [
      'Proyecto universitario, en equipo con un compañero',
      'Mi parte: el sistema que procesa los datos (backend)',
      'Artículo científico en redacción',
    ],
  },
  {
    nombre: 'Ojo de Dios',
    problema:
      'Vigilancia forestal: compara imágenes de dron de dos fechas, detecta dónde se perdió vegetación y muestra alertas en un mapa.',
    contexto: ['Proyecto de curso, hecho solo', 'Versión inicial (MVP)'],
  },
  {
    nombre: 'EcoMap',
    estado: 'En desarrollo',
    problema: 'Un sistema para gestionar la recolección de residuos.',
    contexto: [
      'Lo lidero',
      'En equipo con un compañero y un docente mentor',
      'Postulado al concurso Capital Semilla UNAMAD 2026',
    ],
  },
]

const enlaceDiscreto =
  'font-semibold text-hueso underline decoration-2 underline-offset-4 transition-colors duration-150 hover:text-aguajal-claro'

export default function Proyectos() {
  const reducir = useReducedMotion()

  return (
    <section id="proyectos" aria-labelledby="proyectos-titulo" className="bg-noche py-24 text-hueso lg:py-40">
      <div className="marco">
        <motion.h2 id="proyectos-titulo" className="font-titulo text-titulo font-medium" {...aparecer(0, reducir)}>
          Proyectos que construí
        </motion.h2>
        <motion.p className="mt-6 max-w-[62ch]" {...aparecer(1, reducir)}>
          Los construí en la universidad; no son encargos de clientes. Te los cuento por el problema que resuelven.
        </motion.p>

        {/* Dentro de una sección nada se separa más de 64 px (DESIGN.md §4) */}
        <div className="mt-16 grid gap-y-16">
          {proyectos.map((proyecto, i) => {
            // El lado de la imagen se alterna de un proyecto a otro
            const imagenDerecha = i % 2 === 1
            return (
              <article
                key={proyecto.nombre}
                aria-labelledby={`proyecto-${i}`}
                className="grid grid-cols-4 items-center gap-x-4 gap-y-8 lg:grid-cols-12 lg:gap-x-6"
              >
                <motion.div
                  className={`col-span-4 lg:col-span-7 lg:row-start-1 ${imagenDerecha ? 'lg:col-start-6' : 'lg:col-start-1'}`}
                  {...aparecer(2, reducir)}
                >
                  <CapturaPendiente proyecto={proyecto.nombre} />
                </motion.div>

                <div
                  className={`col-span-4 lg:col-span-5 lg:row-start-1 ${imagenDerecha ? 'lg:col-start-1' : 'lg:col-start-8'}`}
                >
                  <motion.h3 id={`proyecto-${i}`} className="font-titulo text-subtitulo font-medium" {...aparecer(0, reducir)}>
                    {proyecto.nombre}
                  </motion.h3>
                  {proyecto.estado && (
                    <motion.p className="mt-2 font-semibold text-aguajal-claro" {...aparecer(0, reducir)}>
                      {proyecto.estado}
                    </motion.p>
                  )}
                  <motion.p className="mt-4 max-w-[62ch]" {...aparecer(1, reducir)}>
                    {proyecto.problema}
                  </motion.p>
                  <motion.ul className="mt-4 grid gap-1 text-nota text-hueso-2" {...aparecer(2, reducir)}>
                    {proyecto.contexto.map((dato) => (
                      <li key={dato}>{dato}</li>
                    ))}
                  </motion.ul>
                </div>
              </article>
            )
          })}
        </div>

        <motion.p className="mt-16 text-nota text-hueso-2" {...aparecer(0, reducir)}>
          ¿Quieres ver el detalle técnico?{' '}
          <a href="https://jefferson-areque.vercel.app" target="_blank" rel="noopener noreferrer" className={enlaceDiscreto}>
            Portafolio
          </a>{' '}
          ·{' '}
          <a href="https://github.com/JeffersonAreque" target="_blank" rel="noopener noreferrer" className={enlaceDiscreto}>
            GitHub
          </a>
        </motion.p>
      </div>
    </section>
  )
}
