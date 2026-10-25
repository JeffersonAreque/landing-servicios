import { motion, useReducedMotion } from 'motion/react'
import Logo from './Logo'
import { aparecer } from '../lib/entrada'

// Sobre mí: el monograma en lugar de una foto personal (decisión del brief).
export default function SobreMi() {
  const reducir = useReducedMotion()

  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-titulo" className="bg-papel py-24 text-tinta lg:py-40">
      <div className="marco grid grid-cols-4 gap-x-4 gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-6">
        <motion.div
          className="col-span-4 grid aspect-[3/2] place-items-center bg-papel-2 lg:col-span-5 lg:aspect-[4/5]"
          {...aparecer(2, reducir)}
        >
          <Logo fondo="papel" className="w-2/5 lg:w-3/5" />
        </motion.div>
        <div className="col-span-4 lg:col-span-6 lg:col-start-7">
          <motion.h2 id="sobre-mi-titulo" className="font-titulo text-titulo font-medium" {...aparecer(0, reducir)}>
            Sobre mí
          </motion.h2>
          <motion.div className="mt-8 grid max-w-[62ch] gap-5" {...aparecer(1, reducir)}>
            <p>
              Soy Jefferson Areque, desarrollador de software en Puerto Maldonado. Estudio el 8.º ciclo de Ingeniería de
              Sistemas e Informática en la UNAMAD.
            </p>
            <p>
              Trabajo con negocios de Madre de Dios —si estás por aquí, puedo ir en persona— y de forma remota con negocios
              de todo el Perú.
            </p>
            <p>Me gusta empezar por entender cómo trabajas hoy, y recién después decidir qué construir.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
