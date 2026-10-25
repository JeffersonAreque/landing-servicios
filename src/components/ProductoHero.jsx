import { useLayoutEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import HojaCuaderno from './HojaCuaderno'
import PantallaReservas from './PantallaReservas'
import InterruptorVista from './InterruptorVista'

const SUAVE = [0.22, 1, 0.36, 1]

// El producto del hero: la hoja de cuaderno se aparta y aparece el sistema de reservas.
// `progreso` va de 0 (cuaderno) a 1 (sistema). Lo mueve el scroll o el interruptor.
export default function ProductoHero() {
  const reducir = useReducedMotion()
  const caja = useRef(null)
  const rango = useRef([0, 1])
  // null = manda el scroll; 0 o 1 = el visitante eligió con el interruptor
  const eleccion = useRef(null)

  const { scrollY } = useScroll()
  const progreso = useMotionValue(reducir ? 1 : 0)
  const [vista, setVista] = useState(reducir ? 'sistema' : 'cuaderno')
  const [filasVisibles, setFilasVisibles] = useState(Boolean(reducir))

  const progresoDelScroll = (y) => {
    const [inicio, fin] = rango.current
    return Math.min(1, Math.max(0, (y - inicio) / (fin - inicio)))
  }

  const seguirScroll = (y) => {
    if (reducir) return
    const v = progresoDelScroll(y)
    if (eleccion.current !== null) {
      // El scroll recupera el control cuando llega al mismo estado que se eligió: así no hay saltos.
      if ((eleccion.current === 1 && v < 1) || (eleccion.current === 0 && v > 0)) return
      eleccion.current = null
    }
    progreso.set(v)
  }

  // La transición empieza cuando el producto está al 60 % de la pantalla y dura 35 % de pantalla.
  // Se mide sobre el producto, así funciona igual en celular (debajo del texto) y en escritorio.
  useLayoutEffect(() => {
    const medir = () => {
      const rect = caja.current.getBoundingClientRect()
      const arriba = rect.top + window.scrollY
      const alto = window.innerHeight
      const inicio = Math.max(0, arriba - alto * 0.6)
      rango.current = [inicio, inicio + alto * 0.35]
      seguirScroll(window.scrollY)
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [reducir])

  useMotionValueEvent(scrollY, 'change', seguirScroll)
  useMotionValueEvent(progreso, 'change', (v) => {
    setVista(v >= 0.5 ? 'sistema' : 'cuaderno')
    setFilasVisibles(v >= 0.6)
  })

  const cambiarVista = (nueva) => {
    const destino = nueva === 'sistema' ? 1 : 0
    // Si el scroll ya muestra ese estado, no hace falta quitarle el control.
    eleccion.current = destino === progresoDelScroll(window.scrollY) ? null : destino
    if (reducir) progreso.set(destino)
    else animate(progreso, destino, { duration: 0.7, ease: SUAVE })
  }

  // La hoja gira y se va hacia atrás; la pantalla sube y se asienta.
  const hojaRotar = useTransform(progreso, [0, 1], [-3, -9])
  const hojaX = useTransform(progreso, [0, 1], ['0%', '-10%'])
  const hojaY = useTransform(progreso, [0, 1], ['0%', '-6%'])
  const hojaEscala = useTransform(progreso, [0, 1], [1, 0.86])
  const pantallaOpacidad = useTransform(progreso, [0.1, 0.4], [0, 1])
  const pantallaY = useTransform(progreso, [0, 1], [48, 0])
  const pantallaEscala = useTransform(progreso, [0, 1], [0.96, 1])
  // El brillo apenas se desplaza con el scroll (quieto con movimiento reducido).
  const brilloY = useTransform(scrollY, [0, 800], [0, reducir ? 0 : -32])

  const enSistema = vista === 'sistema'

  return (
    <figure aria-label="Ejemplo: las reservas de un lodge, del cuaderno al sistema" className="flex flex-col items-start gap-6">
      <div ref={caja} className="relative grid w-full">
        <motion.div
          aria-hidden="true"
          style={{ y: brilloY }}
          className="brillo pointer-events-none absolute inset-y-0 -inset-x-[10%]"
        />

        <motion.div
          aria-hidden={enSistema}
          style={{ rotate: hojaRotar, x: hojaX, y: hojaY, scale: hojaEscala }}
          className="relative col-start-1 row-start-1 w-[92%] justify-self-center lg:w-[72%] lg:justify-self-end"
        >
          <HojaCuaderno />
        </motion.div>

        <motion.div
          aria-hidden={!enSistema}
          style={{ opacity: pantallaOpacidad, y: pantallaY, scale: pantallaEscala }}
          className={`relative col-start-1 row-start-1 self-center ${enSistema ? '' : 'pointer-events-none'}`}
        >
          <PantallaReservas filasVisibles={filasVisibles} reducir={reducir} />
        </motion.div>
      </div>

      <InterruptorVista vista={vista} alCambiar={cambiarVista} />
    </figure>
  )
}
