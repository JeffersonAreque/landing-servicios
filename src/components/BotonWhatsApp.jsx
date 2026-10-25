import { motion } from 'motion/react'
import { enlaceWhatsApp } from '../lib/whatsapp'

// Botón primario sobre noche: pill plano, 48 px de alto, se encoge a 0.97 al presionar.
export default function BotonWhatsApp({ mensaje, className = '', children = 'Escríbeme por WhatsApp', ...props }) {
  return (
    <motion.a
      href={enlaceWhatsApp(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.97 }}
      className={`inline-flex min-h-12 items-center justify-center rounded-full bg-aguajal-claro px-6 font-semibold text-noche transition-colors duration-150 hover:bg-aguajal-claro-hover ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  )
}
