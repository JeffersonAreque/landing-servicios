import { motion, useReducedMotion } from 'motion/react'
import Foto from './Foto'
import { aparecer } from '../lib/entrada'
import safepickup800 from '../assets/proyectos/safepickup-800.webp'
import safepickup1440 from '../assets/proyectos/safepickup-1440.webp'
import ojoDeDios800 from '../assets/proyectos/ojo-de-dios-800.webp'
import ojoDeDios1440 from '../assets/proyectos/ojo-de-dios-1440.webp'
import ecomap800 from '../assets/proyectos/ecomap-800.webp'
import ecomap1440 from '../assets/proyectos/ecomap-1440.webp'

// Proyectos que construí: nunca como clientes. Se explican por el problema que resuelven
// y la nota dice el contexto exacto del brief (en equipo, mi parte, estado).
// Las capturas son de cada sistema funcionando con datos de prueba: ningún rostro ni dato real.
const proyectos = [
  {
    nombre: 'SafePickup',
    captura: {
      fuentes: [[safepickup800, 800], [safepickup1440, 1440]],
      alt: 'Panel de SafePickup con datos de prueba: estudiantes, apoderados, recojos del día y alertas de suplantación bloqueada',
    },
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
    captura: {
      fuentes: [[ojoDeDios800, 800], [ojoDeDios1440, 1440]],
      alt: 'Mapa de Ojo de Dios: una concesión de prueba sobre imagen satelital, con tres alertas de pérdida de vegetación',
    },
    problema:
      'Vigilancia forestal: compara imágenes de dron de dos fechas, detecta dónde se perdió vegetación y muestra alertas en un mapa.',
    contexto: ['Proyecto de curso, hecho solo', 'Versión inicial (MVP)'],
  },
  {
    nombre: 'EcoMap',
    estado: 'En desarrollo',
    captura: {
      fuentes: [[ecomap800, 800], [ecomap1440, 1440]],
      alt: 'Panel de EcoMap con una jornada de prueba: recorrido GPS del camión sobre las calles de la zona piloto, con distancia y duración',
    },
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
                  <Foto
                    {...proyecto.captura}
                    ancho={1440}
                    alto={900}
                    proporcion="16:10"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="bg-noche-2"
                  />
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
