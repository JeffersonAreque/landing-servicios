import Navegacion from './components/Navegacion'
import Hero from './components/Hero'
import BloqueVacio from './components/BloqueVacio'

export default function App() {
  return (
    <>
      <Navegacion />
      <main>
        <Hero />
        <BloqueVacio id="servicios" titulo="Servicios" fondo="papel" />
        <BloqueVacio id="como-trabajo" titulo="Cómo trabajo" fondo="papel-2" />
        <BloqueVacio id="proyectos" titulo="Proyectos que construí" fondo="noche" />
        <BloqueVacio id="sobre-mi" titulo="Sobre mí" fondo="papel" />
        <BloqueVacio id="contacto" titulo="Cierre / contacto" fondo="aguajal" />
      </main>
      <BloqueVacio id="footer" titulo="Footer" fondo="noche" como="footer" />
    </>
  )
}
