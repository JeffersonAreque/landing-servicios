import { motion } from 'motion/react'
import { enlaceWhatsApp } from '../lib/whatsapp'

// Botón primario: pill plano, 48 px de alto, se encoge a 0.97 al presionar.
// El color depende del fondo de la sección (DESIGN.md §5).
const colores = {
  noche: 'bg-aguajal-claro text-noche hover:bg-aguajal-claro-hover',
  papel: 'bg-aguajal text-white hover:bg-aguajal-hover',
  aguajal: 'bg-papel text-tinta hover:bg-papel-2',
}

export default function BotonWhatsApp({
  mensaje,
  fondo = 'noche',
  className = '',
  children = 'Escríbeme por WhatsApp',
  ...props
}) {
  return (
    <motion.a
      href={enlaceWhatsApp(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.97 }}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 font-semibold transition-colors duration-150 ${colores[fondo]} ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  )
}
