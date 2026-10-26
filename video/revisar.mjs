// Revisión de los MP4 finales: comprueba formato con ffprobe y saca fotogramas clave
// (intro, cada texto, cierre) más una hoja de contacto a out/revision/, para mirarlos uno por uno.
// Uso: node revisar.mjs
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'

const { marcas } = JSON.parse(readFileSync('public/marcas.json', 'utf8'))
const INICIO_GRABACION = 75 - 8 // igual que en src/Root.tsx (intro − cruce)

const videos = [
  { archivo: 'out/video-vertical-1080x1920.mp4', nombre: 'vertical', ancho: 1080, alto: 1920 },
  { archivo: 'out/video-linkedin-1080x1080.mp4', nombre: 'cuadrado', ancho: 1080, alto: 1080 },
]

// Momentos a revisar: mitad de la intro, cada pausa con texto (ya entrado) y el final del cierre.
const momentos = [
  { id: 'intro', f: 40 },
  ...marcas.filter((m) => m.id !== 'hero').map((m) => ({ id: m.id, f: INICIO_GRABACION + m.llegada + 20 })),
]

mkdirSync('out/revision', { recursive: true })
const ffprobe = (archivo, entradas) =>
  execFileSync('ffprobe', ['-v', 'error', ...entradas, '-of', 'default=nw=1', archivo], { encoding: 'utf8' }).trim()

let errores = 0
for (const v of videos) {
  const info = Object.fromEntries(
    ffprobe(v.archivo, ['-show_entries', 'stream=codec_type,codec_name,width,height,r_frame_rate,pix_fmt:format=duration'])
      .split(/\r?\n/) // en Windows ffprobe termina las líneas con \r\n
      .map((l) => l.split('=')),
  )
  const duracion = Number(info.duration)
  const audio = ffprobe(v.archivo, ['-select_streams', 'a', '-show_entries', 'stream=index'])
  const fallas = [
    info.codec_name !== 'h264' && `códec ${info.codec_name}`,
    (Number(info.width) !== v.ancho || Number(info.height) !== v.alto) && `tamaño ${info.width}×${info.height}`,
    info.r_frame_rate !== '30/1' && `fps ${info.r_frame_rate}`,
    info.pix_fmt !== 'yuv420p' && `píxeles ${info.pix_fmt}`,
    (duracion < 20 || duracion > 30) && `duración ${duracion.toFixed(1)} s`,
    audio && 'tiene pista de audio',
  ].filter(Boolean)
  errores += fallas.length
  console.log(`${v.nombre}: h264 ${info.width}×${info.height} ${info.r_frame_rate} fps, ${duracion.toFixed(1)} s, sin audio: ${!audio}` +
    (fallas.length ? `  ✗ ${fallas.join(', ')}` : '  ✓'))

  const total = Math.round(duracion * 30)
  const lista = [...momentos, { id: 'cierre', f: total - 10 }]
  const salidas = lista.map(({ id, f }) => {
    const salida = `out/revision/${v.nombre}-${id}.png`
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', v.archivo, '-vf', `select=eq(n\\,${f})`, '-frames:v', '1', salida])
    return salida
  })
  const hoja = `out/revision/${v.nombre}-hoja.png`
  execFileSync('ffmpeg', [
    '-v', 'error', '-y', ...salidas.flatMap((s) => ['-i', s]),
    '-filter_complex', `hstack=${salidas.length},scale=2400:-1`, hoja,
  ])
  console.log(`  fotogramas: ${salidas.join(', ')}\n  hoja de contacto: ${hoja}`)
}
process.exit(errores ? 1 : 0)
