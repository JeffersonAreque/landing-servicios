// Bloque provisional: muestra el nombre y el fondo de cada sección mientras se construye.
const fondos = {
  papel: 'bg-papel text-tinta',
  'papel-2': 'bg-papel-2 text-tinta',
  noche: 'bg-noche text-hueso',
  aguajal: 'bg-aguajal text-white',
}

export default function BloqueVacio({ id, titulo, fondo, como = 'section' }) {
  const Etiqueta = como
  return (
    <Etiqueta id={id} aria-labelledby={`${id}-titulo`} className={`${fondos[fondo]} py-24 lg:py-40`}>
      <div className="marco">
        <h2 id={`${id}-titulo`} className="font-titulo text-titulo font-medium">
          {titulo}
        </h2>
      </div>
    </Etiqueta>
  )
}
