import Logo from './Logo'

// Sobre mí: el monograma en lugar de una foto personal. El texto se completa al construir la sección.
export default function SobreMi() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-titulo" className="bg-papel py-24 text-tinta lg:py-40">
      <div className="marco grid grid-cols-4 gap-x-4 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="col-span-4 grid aspect-[3/2] place-items-center bg-papel-2 lg:col-span-5 lg:aspect-[4/5]">
          <Logo fondo="papel" className="w-2/5 lg:w-3/5" />
        </div>
        <div className="col-span-4 lg:col-span-6 lg:col-start-7">
          <h2 id="sobre-mi-titulo" className="font-titulo text-titulo font-medium">
            Sobre mí
          </h2>
        </div>
      </div>
    </section>
  )
}
