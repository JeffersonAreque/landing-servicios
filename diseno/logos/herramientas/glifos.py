# Extrae contornos de glifos como paths SVG (y hacia abajo, línea base en y=0).
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

FUENTES = {}
def fuente(ruta):
    if ruta not in FUENTES:
        FUENTES[ruta] = TTFont(ruta)
    return FUENTES[ruta]

def texto(ruta, cadena, tam, x=0, y=0, tracking=0, kern=None):
    """Devuelve (d, ancho) del texto con tamaño `tam` px, línea base en (x, y)."""
    f = fuente(ruta)
    upm = f['head'].unitsPerEm
    esc = tam / upm
    cmap = f.getBestCmap()
    gs = f.getGlyphSet()
    hmtx = f['hmtx']
    partes = []
    cx = 0
    kern = kern or {}
    prev = None
    for ch in cadena:
        if prev and (prev + ch) in kern:
            cx += kern[prev + ch] / esc
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (esc, 0, 0, -esc, x + cx * esc, y))
        gs[g].draw(tp)
        partes.append(pen.getCommands())
        cx += hmtx[g][0] + tracking * upm
        prev = ch
    return ' '.join(partes), cx * esc

def caja(ruta, ch):
    f = fuente(ruta); gs = f.getGlyphSet(); g = f.getBestCmap()[ord(ch)]
    bp = BoundsPen(gs); gs[g].draw(bp)
    return bp.bounds, f['hmtx'][g][0], f['head'].unitsPerEm


def medir(ruta, cadena, tam, x=0, y=0):
    """Caja real (x0, y0, x1, y1) en px SVG del texto dibujado."""
    f = fuente(ruta); upm = f['head'].unitsPerEm; esc = tam / upm
    cmap = f.getBestCmap(); gs = f.getGlyphSet(); hmtx = f['hmtx']
    bp = BoundsPen(gs); cx = 0
    for ch in cadena:
        g = cmap[ord(ch)]
        gs[g].draw(TransformPen(bp, (esc, 0, 0, -esc, x + cx * esc, y)))
        cx += hmtx[g][0]
    return bp.bounds
