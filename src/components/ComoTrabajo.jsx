import { useRef } from 'react'
import { motion, useReducedMotion, useScroll } from 'motion/react'
import { aparecer } from '../lib/entrada'

const pasos = [
  { nombre: 'Conversamos', texto: 'Me cuentas tu negocio y qué te quita tiempo.' },
  { nombre: 'Diseño', texto: 'Te muestro cómo se verá antes de programar.' },
  { nombre: 'Construyo', texto: 'Vas viendo avances que puedes probar.' },
  {
    nombre: 'Entrego y acompaño',
    texto: 'Lo publico y te enseño a usarlo.',
    soporte: 'Durante 30 días corrijo gratis cualquier error del sistema.',
    aclaracion: 'Los cambios o funciones nuevas se conversan y se cotizan aparte.',
  },
]

// Recorrido de 4 pasos. El avance es una barra rellena que crece con el scroll de la sección:
// horizontal en escritorio, vertical en celular. Con movimiento reducido queda llena y quieta.
export default function ComoTrabajo() {
  const reducir = useReducedMotion()
  const lista = useRef(null)
  const { scrollYProgress } = useScroll({ target: lista, offset: ['start 0.8', 'end 0.4'] })
  const avance = reducir ? 1 : scrollYProgress

  return (
    <section id="como-trabajo" aria-labelledby="como-trabajo-titulo" className="bg-papel-2 py-24 text-tinta lg:py-40">
      <div className="marco">
        <motion.h2 id="como-trabajo-titulo" className="font-titulo text-titulo font-medium" {...aparecer(0, reducir)}>
          Cómo trabajo
        </motion.h2>

        <div ref={lista} className="relative mt-12 pl-8 lg:mt-16 lg:pl-0 lg:pt-12">
          {/* Barra: el riel en papel (paso de tono) y el relleno en aguajal */}
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-2 bg-papel lg:inset-x-0 lg:top-0 lg:bottom-auto lg:h-2 lg:w-auto">
            <motion.div style={{ scaleY: avance }} className="h-full w-full origin-top bg-aguajal lg:hidden" />
            <motion.div style={{ scaleX: avance }} className="hidden h-full w-full origin-left bg-aguajal lg:block" />
          </div>

          <ol className="grid gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {pasos.map((paso, i) => (
              <motion.li key={paso.nombre} {...aparecer(i + 1, reducir)}>
                <h3 className="font-titulo text-subtitulo font-medium">{paso.nombre}</h3>
                <p className="mt-3 max-w-[62ch]">{paso.texto}</p>
                {paso.soporte && (
                  <>
                    <p className="mt-3 max-w-[62ch] font-semibold">{paso.soporte}</p>
                    <p className="mt-3 max-w-[62ch] text-nota text-tinta-2">{paso.aclaracion}</p>
                  </>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-4 gap-x-4 gap-y-3 bg-papel p-6 lg:grid-cols-12 lg:gap-x-6 lg:p-10"
          {...aparecer(1, reducir)}
        >
          <h3 className="col-span-4 font-titulo text-subtitulo font-medium lg:col-span-5">Mantenimiento mensual (opcional)</h3>
          <p className="col-span-4 max-w-[62ch] lg:col-span-6 lg:col-start-7">
            Después de la entrega, si quieres, cuido que tu página o sistema siga funcionando, lo actualizo y hago cambios
            pequeños.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
