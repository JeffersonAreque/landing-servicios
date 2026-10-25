import { motion, useReducedMotion } from 'motion/react'

// Fotos y capturas reales (DESIGN.md §7 y §8): esquinas rectas, proporción fija y un zoom muy lento
// (de 1.06 a 1) al entrar en pantalla. Con movimiento reducido la imagen aparece quieta.
const proporciones = { '16:10': 'aspect-[16/10]', '3:2': 'aspect-[3/2]' }

export default function Foto({ fuentes, alt, ancho, alto, sizes, proporcion = '3:2', className = '' }) {
  const reducir = useReducedMotion()
  const [grande] = fuentes.at(-1)

  return (
    <div className={`overflow-hidden ${proporciones[proporcion]} ${className}`}>
      <motion.img
        src={grande}
        srcSet={fuentes.map(([src, w]) => `${src} ${w}w`).join(', ')}
        sizes={sizes}
        alt={alt}
        width={ancho}
        height={alto}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
        {...(reducir
          ? {}
          : {
              initial: { scale: 1.06 },
              whileInView: { scale: 1 },
              viewport: { once: true, margin: '0px 0px -8% 0px' },
              transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
            })}
      />
    </div>
  )
}
