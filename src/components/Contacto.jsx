import { motion, useReducedMotion } from 'motion/react'
import BotonWhatsApp from './BotonWhatsApp'
import Foto from './Foto'
import { aparecer } from '../lib/entrada'
import creditos from '../data/credits.json'
import rio720 from '../assets/fotos/puerto-maldonado-rio-720.webp'
import rio1200 from '../assets/fotos/puerto-maldonado-rio-1200.webp'

const CORREO = 'jarequechirinos16@gmail.com'
// La licencia CC BY-SA pide nombrar al autor, enlazar la licencia y decir si se cambió la foto
const credito = creditos.find((c) => c.id === 'puerto-maldonado-rio')

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

        <motion.figure className="col-span-4 lg:col-span-6 lg:col-start-7" {...aparecer(3, reducir)}>
          <Foto
            fuentes={[[rio720, 720], [rio1200, 1200]]}
            alt="Canoas de madera en la orilla del río Madre de Dios, en Puerto Maldonado, bajo un cielo con nubes"
            ancho={1200}
            alto={800}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <figcaption className="mt-3 text-nota">
            Río Madre de Dios, Puerto Maldonado. Foto:{' '}
            <a href={credito.fuente} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              {credito.autor}, Wikimedia Commons
            </a>
            ,{' '}
            <a href={credito.licenciaUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              {credito.licencia}
            </a>
            . {credito.cambios}.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
