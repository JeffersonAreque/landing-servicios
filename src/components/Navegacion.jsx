import BotonWhatsApp from './BotonWhatsApp'

const enlaces = [
  { href: '#servicios', texto: 'Servicios' },
  { href: '#como-trabajo', texto: 'Cómo trabajo' },
  { href: '#proyectos', texto: 'Proyectos' },
  { href: '#sobre-mi', texto: 'Sobre mí' },
]

export default function Navegacion() {
  return (
    <header className="bg-noche">
      <nav aria-label="Principal" className="marco flex min-h-20 items-center justify-between gap-6">
        <a href="#inicio" className="font-titulo text-subtitulo font-medium text-hueso">
          Jefferson Areque
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <a
                href={enlace.href}
                className="text-nota text-hueso underline-offset-4 transition-colors duration-150 hover:text-aguajal-claro hover:underline"
              >
                {enlace.texto}
              </a>
            </li>
          ))}
        </ul>
        {/* En celular el texto completo no entra junto al nombre: se acorta y se mantiene el nombre accesible */}
        <BotonWhatsApp aria-label="Escríbeme por WhatsApp">
          <span className="lg:hidden">WhatsApp</span>
          <span className="hidden lg:inline">Escríbeme por WhatsApp</span>
        </BotonWhatsApp>
      </nav>
    </header>
  )
}
