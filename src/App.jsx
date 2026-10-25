import Navegacion from './components/Navegacion'
import Hero from './components/Hero'
import BloqueVacio from './components/BloqueVacio'
import SobreMi from './components/SobreMi'

export default function App() {
  return (
    <>
      <Navegacion />
      <main>
        <Hero />
        <BloqueVacio id="servicios" titulo="Servicios" fondo="papel" />
        <BloqueVacio id="como-trabajo" titulo="Cómo trabajo" fondo="papel-2" />
        <BloqueVacio id="proyectos" titulo="Proyectos que construí" fondo="noche" />
        <SobreMi />
        <BloqueVacio id="contacto" titulo="Cierre / contacto" fondo="aguajal" />
      </main>
      <BloqueVacio id="footer" titulo="Footer" fondo="noche" como="footer" />
    </>
  )
}
