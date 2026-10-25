const NUMERO = '51910130538'

export const MENSAJE_GENERAL = 'Hola Jefferson, vi tu página y quiero contarte sobre mi negocio.'

export function enlaceWhatsApp(mensaje = MENSAJE_GENERAL) {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensaje)}`
}
