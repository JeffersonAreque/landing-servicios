const enlace = 'underline-offset-4 transition-colors duration-150 hover:text-aguajal-claro hover:underline'

const datos = [
  { texto: 'Puerto Maldonado, Perú' },
  { texto: 'Portafolio', href: 'https://jefferson-areque.vercel.app' },
  { texto: 'GitHub', href: 'https://github.com/JeffersonAreque' },
  { texto: 'jarequechirinos16@gmail.com', href: 'mailto:jarequechirinos16@gmail.com' },
  { texto: '© 2026' },
]

// Footer: el nombre vuelve a todo el ancho, como firma.
export default function Footer() {
  return (
    <footer aria-label="Pie de página" className="bg-noche pt-24 pb-10 text-hueso lg:pt-40 lg:pb-12">
      {/* El tamaño se mide en ancho del marco (cqw), así el nombre llena de margen a margen en cualquier pantalla */}
      <div className="marco [container-type:inline-size]">
        <p className="font-titulo text-[length:15.2cqw] leading-none font-bold tracking-[-0.03em] whitespace-nowrap">
          Jefferson Areque
        </p>
        {/* El punto va después de cada dato, así nunca queda suelto al empezar una línea */}
        <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2 text-nota text-hueso-2">
          {datos.map((dato) => (
            <li key={dato.texto} className="after:ml-3 after:content-['·'] last:after:content-none">
              {dato.href ? (
                <a
                  href={dato.href}
                  {...(dato.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  className={enlace}
                >
                  {dato.texto}
                </a>
              ) : (
                dato.texto
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
