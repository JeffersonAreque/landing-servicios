// Guías de la zona segura de TikTok, solo para revisar (prop `guias`). Lo rojo lo tapa la interfaz:
// arriba la barra "Siguiendo / Para ti", a la derecha los botones y abajo la descripción y la música.
import { AbsoluteFill } from 'remotion'

export const SEGURA = { arriba: 220, derecha: 900, abajo: 1340, izquierda: 64 }

const rojo = 'rgba(255, 0, 0, 0.28)'

export function ZonaSegura() {
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: SEGURA.arriba, background: rojo }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: SEGURA.abajo, bottom: 0, background: rojo }} />
      <div style={{ position: 'absolute', left: SEGURA.derecha, right: 0, top: SEGURA.arriba, height: SEGURA.abajo - SEGURA.arriba, background: rojo }} />
      <div style={{ position: 'absolute', left: 0, width: SEGURA.izquierda, top: SEGURA.arriba, height: SEGURA.abajo - SEGURA.arriba, background: rojo }} />
    </AbsoluteFill>
  )
}
