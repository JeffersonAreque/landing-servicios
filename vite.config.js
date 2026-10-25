import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Las fotos y capturas pendientes nunca llegan a producción (DESIGN.md §7):
// si algún archivo importa Pendiente.jsx, o aparece picsum.photos, el build se corta.
// `npm run build:borrador` salta esta comprobación solo para ver que el resto compila.
const nombre = (id) => id.split(/[\\/]src[\\/]/).pop()

function sinPendientes() {
  const usos = new Set()
  let saltar = false
  return {
    name: 'sin-pendientes',
    apply: 'build',
    configResolved(config) {
      saltar = config.mode === 'borrador'
    },
    transform(codigo, id) {
      if (saltar || id.includes('node_modules')) return
      if (codigo.includes('picsum.photos')) usos.add(`${nombre(id)} usa una foto de picsum.photos`)
    },
    buildEnd() {
      if (saltar) return
      for (const id of this.getModuleIds()) {
        if (!/[\\/]Pendiente\.jsx$/.test(id)) continue
        for (const quien of this.getModuleInfo(id).importers) usos.add(`${nombre(quien)} usa una foto o captura pendiente`)
      }
      if (usos.size) {
        this.error(
          `Hay fotos o capturas pendientes; no se puede publicar todavía:\n  - ${[...usos].join('\n  - ')}\n` +
            'Cámbialas por las reales (o usa `npm run build:borrador` solo para revisar).',
        )
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sinPendientes()],
})
