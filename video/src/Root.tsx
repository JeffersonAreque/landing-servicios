// Dos composiciones con la misma grabación:
// - Vertical 1080×1920 (TikTok): la grabación a pantalla completa, textos dentro de la zona segura.
// - Cuadrado 1080×1080 (LinkedIn): la grabación vertical a la izquierda y los textos a la derecha.
import { AbsoluteFill, Composition, interpolate, Sequence, useCurrentFrame } from 'remotion'
import { Cierre } from './Cierre'
import { fotogramasGrabacion, Grabacion } from './Grabacion'
import { Intro } from './Intro'
import { color } from './tokens'
import { SEGURA, ZonaSegura } from './ZonaSegura'

const FPS = 30
const INTRO = 75 // 2,5 s
const CRUCE = 8 // la intro se desvanece encima de la grabación
const CIERRE = 90 // 3 s
const INICIO_GRABACION = INTRO - CRUCE
const INICIO_CIERRE = INICIO_GRABACION + fotogramasGrabacion
const TOTAL = INICIO_CIERRE + CIERRE

type Props = { guias: boolean }

// Desvanece un tramo al final (intro) o al principio (cierre).
function Fundido({ children, entra, sale }: { children: React.ReactNode; entra?: number; sale?: [number, number] }) {
  const f = useCurrentFrame()
  let o = 1
  if (entra) o = Math.min(o, interpolate(f, [0, entra], [0, 1], { extrapolateRight: 'clamp' }))
  if (sale) o = Math.min(o, interpolate(f, [sale[0], sale[1]], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>
}

function Vertical({ guias }: Props) {
  const ancho = SEGURA.derecha - SEGURA.izquierda
  return (
    <AbsoluteFill style={{ backgroundColor: color.noche }}>
      <Sequence from={INICIO_GRABACION} durationInFrames={fotogramasGrabacion}>
        <Grabacion
          video={{ left: 0, top: 0, width: 1080, height: 1920 }}
          caja={{ top: 250, left: 0, width: SEGURA.derecha }}
          sangria={SEGURA.izquierda}
          tamano={60}
        />
      </Sequence>
      <Sequence durationInFrames={INTRO}>
        <Fundido sale={[INTRO - CRUCE, INTRO]}>
          <Intro tamano={104} ancho={ancho} izquierda={SEGURA.izquierda} />
        </Fundido>
      </Sequence>
      <Sequence from={INICIO_CIERRE} durationInFrames={CIERRE}>
        <Fundido entra={6}>
          <Cierre escala={1} caja={{ left: SEGURA.izquierda, width: ancho, centroY: 780 }} />
        </Fundido>
      </Sequence>
      {guias && <ZonaSegura />}
    </AbsoluteFill>
  )
}

function Cuadrado(_: Props) {
  // 1920 → 1080 de alto: la grabación queda de 607,5 × 1080 a la izquierda.
  const anchoVideo = Math.round(1080 * (1080 / 1920))
  const margen = 56
  return (
    <AbsoluteFill style={{ backgroundColor: color.noche }}>
      <Sequence from={INICIO_GRABACION} durationInFrames={fotogramasGrabacion}>
        <Grabacion
          video={{ left: 0, top: 0, width: anchoVideo, height: 1080 }}
          caja={{ top: 400, left: anchoVideo + margen, width: 1080 - anchoVideo - margen * 2 }}
          tamano={48}
          relleno={false}
        />
      </Sequence>
      <Sequence durationInFrames={INTRO}>
        <Fundido sale={[INTRO - CRUCE, INTRO]}>
          <Intro tamano={96} ancho={1080 - 96 * 2} izquierda={96} />
        </Fundido>
      </Sequence>
      <Sequence from={INICIO_CIERRE} durationInFrames={CIERRE}>
        <Fundido entra={6}>
          <Cierre escala={0.8} caja={{ left: 96, width: 1080 - 96 * 2, centroY: 540 }} />
        </Fundido>
      </Sequence>
    </AbsoluteFill>
  )
}

export function Root() {
  return (
    <>
      <Composition id="Vertical" component={Vertical} width={1080} height={1920} fps={FPS} durationInFrames={TOTAL} defaultProps={{ guias: false }} />
      <Composition id="Cuadrado" component={Cuadrado} width={1080} height={1080} fps={FPS} durationInFrames={TOTAL} defaultProps={{ guias: false }} />
    </>
  )
}
