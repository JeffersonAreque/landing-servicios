// Graba la página fotograma por fotograma (1080×1920, 30 fps) y la guarda en public/grabacion.mp4.
// También escribe public/marcas.json: en qué fotograma empieza y termina cada pausa,
// para que Remotion ponga los textos en el momento justo.
//
// Por qué así y no con la grabación de video de Playwright: aquella sale en baja calidad y a
// saltos. Aquí el reloj de la página es falso (page.clock): por cada fotograma muevo el scroll,
// adelanto el reloj 1/30 s y saco una captura. Así las animaciones van a velocidad real en el video
// aunque cada captura tarde lo que tarde.
//
// Uso: node grabar.mjs [url]
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { guion } from './guion.mjs'

const URL_PAGINA = process.argv[2] ?? guion.url
const FPS = 30
const MS = 1000 / FPS
// 432×768 en CSS × 2.5 = 1080×1920 reales: diseño de celular y texto nítido.
const VIEWPORT = { width: 432, height: 768 }
const ESCALA = 2.5

const navegador = await chromium.launch()
const contexto = await navegador.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: ESCALA,
  isMobile: true,
  hasTouch: true,
  reducedMotion: 'no-preference',
})
const pagina = await contexto.newPage()
await pagina.clock.install()

// motion anima opacidad y movimiento con las animaciones del navegador (WAAPI), que corren con el
// reloj real. Las pauso y las coloco a mano en cada fotograma según el reloj falso.
await pagina.addInitScript(() => {
  const inicio = new WeakMap()
  window.__sincronizar = () => {
    const ahora = performance.now()
    for (const a of document.getAnimations()) {
      if (!inicio.has(a)) {
        // motion fija el inicio con el reloj falso y el navegador lo mide con el real: a veces la
        // animación "empieza en el futuro". La que veo por primera vez empieza ahora (el retraso
        // propio de cada una va dentro de su efecto y se respeta igual).
        inicio.set(a, ahora - Math.max(0, a.currentTime ?? 0))
        a.pause()
      }
      const t = ahora - inicio.get(a)
      const fin = a.effect?.getComputedTiming().endTime ?? 0
      if (Number.isFinite(fin) && t >= fin) a.finish()
      else a.currentTime = t
    }
  }
})

await pagina.goto(URL_PAGINA, { waitUntil: 'load', timeout: 60_000 })
// Sin scroll previo (las entradas deben verse animarse), pero con todas las imágenes ya cargadas.
await pagina.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto'
  for (const img of document.images) img.loading = 'eager'
  await document.fonts.ready
  await Promise.all([...document.images].map((i) => (i.complete ? null : i.decode().catch(() => null))))
})

async function avanzar() {
  await pagina.waitForTimeout(8) // deja que el navegador avise qué entró en pantalla
  await pagina.clock.runFor(MS)
  await pagina.evaluate(() => window.__sincronizar())
}
for (let i = 0; i < FPS; i++) await avanzar() // 1 s para que la página se asiente

// Paradas del guion convertidas a posiciones de scroll reales.
// `selector` queda a `margen` px del borde de arriba (deja sitio para el texto del video).
// `terminaEn` (0–1): el elemento debe haber subido al menos hasta esa fracción de la pantalla,
// p. ej. la transformación del hero termina cuando el producto llega al 25 % de la pantalla.
const paradas = await pagina.evaluate((paradas) => {
  const maximo = document.documentElement.scrollHeight - innerHeight
  return paradas.map((p) => {
    let y = 0
    if (p.selector) {
      const arriba = document.querySelector(p.selector).getBoundingClientRect().top + scrollY
      y = arriba - p.margen
      if (p.terminaEn != null) y = Math.max(y, arriba - innerHeight * p.terminaEn + 10)
    }
    return { ...p, y: Math.round(Math.min(maximo, Math.max(0, y))) }
  })
}, guion.paradas)
console.log('Paradas:', paradas.map((p) => `${p.id}@${p.y}`).join('  '))

// Línea de tiempo: pausa → tramo → pausa → … con curva suave (sin saltos de velocidad).
const suave = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const linea = []
const marcas = []
let anterior = 0
for (const p of paradas) {
  const tramo = Math.round(p.tramo * FPS)
  for (let i = 1; i <= tramo; i++) linea.push(anterior + (p.y - anterior) * suave(i / tramo))
  const desde = linea.length
  for (let i = 0; i < Math.round(p.pausa * FPS); i++) linea.push(p.y)
  marcas.push({ id: p.id, llegada: desde, salida: linea.length, inicioTramo: desde - tramo })
  anterior = p.y
}

const ffmpeg = spawn(
  'ffmpeg',
  ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '10', '-pix_fmt', 'yuv420p', '-r', String(FPS),
    'public/grabacion.mp4'],
  { stdio: ['pipe', 'inherit', 'inherit'] },
)
const escrito = new Promise((ok, mal) => ffmpeg.on('close', (c) => (c === 0 ? ok() : mal(new Error(`ffmpeg salió con ${c}`)))))

for (let f = 0; f < linea.length; f++) {
  await pagina.evaluate((y) => window.scrollTo(0, y), linea[f])
  await avanzar()
  const png = await pagina.screenshot({ type: 'png', animations: 'allow', caret: 'initial' })
  if (!ffmpeg.stdin.write(png)) await new Promise((ok) => ffmpeg.stdin.once('drain', ok))
  if (f % 60 === 0) console.log(`fotograma ${f}/${linea.length}`)
}
ffmpeg.stdin.end()
await escrito
await navegador.close()

writeFileSync('public/marcas.json', JSON.stringify({ fps: FPS, fotogramas: linea.length, marcas }, null, 2))
console.log(`Listo: public/grabacion.mp4 (${(linea.length / FPS).toFixed(1)} s) y public/marcas.json`)
