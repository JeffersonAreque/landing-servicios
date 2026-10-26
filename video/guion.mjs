// Guion de la grabación: lo único que cambia de una página a otra.
// Cada parada: a dónde ir (`selector`), cuánto tarda el scroll hasta ahí (`tramo`, en s)
// y cuánto se queda quieta (`pausa`, en s). Los textos del video están en src/textos.ts.
export const guion = {
  url: 'https://jefferson-areque-servicios.vercel.app',
  paradas: [
    { id: 'hero', tramo: 0, pausa: 1.5 },
    // El producto del hero: el scroll mismo hace la transformación cuaderno → sistema.
    { id: 'sistema', selector: '#inicio .relative.grid', margen: 180, terminaEn: 0.25, tramo: 2.2, pausa: 1.8 },
    { id: 'servicios', selector: '#servicios', margen: 100, tramo: 1.5, pausa: 1.6 },
    { id: 'proyectos', selector: '#proyectos', margen: 100, tramo: 2.6, pausa: 1.6 },
    { id: 'contacto', selector: '#contacto', margen: 100, tramo: 3.2, pausa: 1.8 },
  ],
}
