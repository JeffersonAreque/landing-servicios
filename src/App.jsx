import Navegacion from './components/Navegacion'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import ComoTrabajo from './components/ComoTrabajo'
import Proyectos from './components/Proyectos'
import SobreMi from './components/SobreMi'
import Contacto from './components/Contacto'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navegacion />
      <main>
        <Hero />
        <Servicios />
        <ComoTrabajo />
        <Proyectos />
        <SobreMi />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
