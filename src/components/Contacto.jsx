import { motion, useReducedMotion } from 'motion/react'
import BotonWhatsApp from './BotonWhatsApp'
import { FotoPendiente } from './Pendiente'
import { aparecer } from '../lib/entrada'

const CORREO = 'jarequechirinos16@gmail.com'

// Cierre: el único campo de color entero y lo único centrado de la página (la frase de cierre).
export default function Contacto() {
  const reducir = useReducedMotion()

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="bg-aguajal py-24 text-white lg:py-40">
      <div className="marco grid grid-cols-4 items-center gap-x-4 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="col-span-4 flex flex-col items-center text-center lg:col-span-6">
          {/* La frase del brief, sin cambiar palabras: la primera parte es el título y la segunda va debajo,
              así el título no pasa de dos líneas */}
          <motion.h2 id="contacto-titulo" className="font-titulo text-titulo font-medium text-balance" {...aparecer(0, reducir)}>
            Cuéntame qué te quita tiempo en tu negocio.
          </motion.h2>
          <motion.p className="mt-4 font-titulo text-subtitulo font-medium" {...aparecer(1, reducir)}>
            La primera conversación es gratis.
          </motion.p>
          <motion.div className="mt-10 flex w-full flex-col items-center gap-6" {...aparecer(2, reducir)}>
            <BotonWhatsApp
              fondo="aguajal"
              mensaje="Hola Jefferson, quiero contarte qué me quita tiempo en mi negocio."
              className="w-full sm:w-auto"
            />
            {/* En celular el correo va en su propia línea para no partirse */}
            <p>
              o escríbeme a{' '}
              <a
                href={`mailto:${CORREO}`}
                className="block font-semibold underline sm:inline decoration-2 underline-offset-4 transition-[text-decoration-thickness] duration-150 hover:decoration-4"
              >
                {CORREO}
              </a>
            </p>
          </motion.div>
        </div>

        <motion.div className="col-span-4 lg:col-span-6 lg:col-start-7" {...aparecer(3, reducir)}>
          <FotoPendiente descripcion="Puerto Maldonado (río, calle o puerto)" proporcion="3:2" />
        </motion.div>
      </div>
    </section>
  )
}
