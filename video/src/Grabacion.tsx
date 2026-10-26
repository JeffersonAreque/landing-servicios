// La grabación de la página con los textos clave sincronizados con las pausas (public/marcas.json).
import { AbsoluteFill, OffthreadVideo, staticFile } from 'remotion'
import marcas from '../public/marcas.json'
import { TextoClave } from './TextoClave'
import { textos } from './textos'

type Props = {
  // Dónde va la grabación dentro del cuadro y dónde los textos.
  video: { left: number; top: number; width: number; height: number }
  caja: { top: number; left: number; width: number }
  tamano: number
  relleno?: boolean
  sangria?: number
}

// El texto entra un poco antes de que el scroll se detenga y sale apenas vuelve a moverse.
const ANTES = 8
const DESPUES = 4

export function Grabacion({ video, caja, tamano, relleno, sangria }: Props) {
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile('grabacion.mp4')}
        muted
        toneMapped={false}
        transparent
        style={{ position: 'absolute', ...video }}
      />
      {textos.claves.map(({ id, texto }) => {
        const m = marcas.marcas.find((x) => x.id === id)
        if (!m) return null
        return <TextoClave key={id} texto={texto} entra={m.llegada - ANTES} sale={m.salida + DESPUES} caja={caja} tamano={tamano} relleno={relleno} sangria={sangria} />
      })}
    </AbsoluteFill>
  )
}

export const fotogramasGrabacion = marcas.fotogramas
