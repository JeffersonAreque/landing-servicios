import { motion, useReducedMotion } from 'motion/react'
import BotonWhatsApp from './BotonWhatsApp'
import ProductoHero from './ProductoHero'

// Entrada del texto: sube 24 px con opacidad, 70 ms entre cada parte.
const entrada = (orden, reducir) =>
  reducir
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: orden * 0.07, ease: [0.22, 1, 0.36, 1] },
      }

export default function Hero() {
  const reducir = useReducedMotion()

  return (
    <section id="inicio" aria-labelledby="titular" className="overflow-x-clip bg-noche pt-8 pb-24 lg:pt-10 lg:pb-40">
      {/* El titular va a todo el ancho: a 112 px "Del cuaderno y el Excel" no entra en 6 columnas
          y DESIGN.md pide dos líneas en escritorio. Debajo: texto (1–5) y producto (7–12). */}
      <div className="marco grid grid-cols-4 gap-x-4 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <h1 id="titular" className="col-span-4 font-titulo text-display font-medium text-hueso lg:col-span-12">
          <motion.span className="block text-display" {...entrada(0, reducir)}>
            Del cuaderno y el Excel
          </motion.span>
          <motion.span className="mt-3 block text-subtitulo lg:text-titulo" {...entrada(1, reducir)}>
            a un sistema que trabaja por ti.
          </motion.span>
        </h1>

        <div className="col-span-4 -mt-4 lg:col-span-5">
          <motion.p className="max-w-[62ch] text-hueso" {...entrada(2, reducir)}>
            Páginas web, sistemas y apps para negocios que quieren crecer. Desde Puerto Maldonado, para todo el Perú.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
            {...entrada(3, reducir)}
          >
            <BotonWhatsApp className="w-full sm:w-auto" />
            <a
              href="#como-trabajo"
              className="font-semibold text-hueso underline decoration-2 underline-offset-4 transition-colors duration-150 hover:text-aguajal-claro"
            >
              Ver cómo trabajo
            </a>
          </motion.div>
        </div>

        <div className="col-span-4 lg:col-span-6 lg:col-start-7">
          <ProductoHero />
        </div>
      </div>
    </section>
  )
}
