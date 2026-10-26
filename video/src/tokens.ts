// Colores, fuentes y movimiento de DESIGN.md (los mismos de src/index.css de la web).
import { loadFont } from '@remotion/fonts'
import { Easing, staticFile } from 'remotion'

export const color = {
  noche: '#0D1311',
  noche2: '#151D1A',
  hueso: '#EEF0EC',
  hueso2: '#A3ABA6',
  papel: '#F2ECE3',
  tinta: '#16201C',
  aguajal: '#1E7A5A',
  aguajalClaro: '#4FC08D',
}

export const fuente = {
  titulo: '"Boska", Georgia, serif',
  texto: '"Onest", system-ui, sans-serif',
}

// La curva de DESIGN.md §8: ease [0.22, 1, 0.36, 1].
export const SUAVE = Easing.bezier(0.22, 1, 0.36, 1)

export const fuentesListas = Promise.all([
  loadFont({ family: 'Boska', url: staticFile('fonts/boska-500.woff2'), weight: '500' }),
  loadFont({ family: 'Boska', url: staticFile('fonts/boska-700.woff2'), weight: '700' }),
  loadFont({ family: 'Onest', url: staticFile('fonts/onest-var.woff2'), weight: '400 600' }),
])
