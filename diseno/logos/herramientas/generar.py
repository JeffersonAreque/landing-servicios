"""Genera todos los archivos del logo a partir de los contornos de Boska y Onest.

Uso (desde la raíz del repo):  python diseno/logos/herramientas/generar.py
Necesita:  pip install fonttools brotli

Escribe:
- diseno/logos/opcion-{a,b,c}-*.svg   las tres propuestas (registro)
- diseno/logos/elegido/*.svg          logo B (Renglón) y favicon C (Ventana)
- diseno/prueba-logos.html            página para comparar las propuestas
- public/favicon.svg                  favicon C
- src/components/logoTrazos.js        trazos del logo B para el componente Logo
Los PNG (perfil de redes y apple-touch-icon) se exportan aparte: ver README.md.
"""
import os, re, sys, json, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from glifos import texto, medir
import pagina

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
F = os.path.join(RAIZ, 'public', 'fonts')
B5, B7 = os.path.join(F, 'boska-500.woff2'), os.path.join(F, 'boska-700.woff2')

def onest_600():
    """Onest es variable: se fija el peso 600 en un archivo temporal para leer sus contornos."""
    ruta = os.path.join(tempfile.gettempdir(), 'onest-600-logo.ttf')
    if not os.path.exists(ruta):
        fija = instancer.instantiateVariableFont(TTFont(os.path.join(F, 'onest-var.woff2')), {'wght': 600})
        fija.flavor = None
        fija.save(ruta)
    return ruta

O6 = onest_600()

TEMAS = {
    'noche': dict(fondo='#0D1311', tinta='#EEF0EC', acento='#4FC08D', sobre_acento='#0D1311'),
    'papel': dict(fondo='#F2ECE3', tinta='#16201C', acento='#1E7A5A', sobre_acento='#FFFFFF'),
}

def centrar(ruta, cad, tam, caja_w, caja_h, dx=0, dy=0):
    """Posición (x, y de línea base) para centrar ópticamente el texto en la caja."""
    x0, y0, x1, y1 = medir(ruta, cad, tam, 0, 0)
    return (caja_w - (x1 - x0)) / 2 - x0 + dx, (caja_h - (y1 - y0)) / 2 - y0 + dy

# ---------- Opción A · Firma: la J pasa por debajo de la A ----------
def firma(t, tam=60):
    # J y A de Boska 700; la A se monta sobre la cola de la J
    jx0, jy0, jx1, jy1 = medir(B7, 'J', tam)
    ax0, ay0, ax1, ay1 = medir(B7, 'A', tam)
    sola = tam * 0.15          # avance de la A sobre la J (se tocan las serifas)
    ancho = (jx1 - jx0) + (ax1 - ax0) - sola
    alto = max(jy1, ay1) - min(jy0, ay0)
    return ancho, alto, -jx0, -min(jy0, ay0), (jx1 - jx0) - sola - ax0

def marca_firma(t, w=64, h=64, tam=60):
    ancho, alto, ox, oy, axo = firma(t, tam)
    x = (w - ancho) / 2 + ox
    y = (h - alto) / 2 + oy
    j, _ = texto(B7, 'J', tam, x, y)
    a, _ = texto(B7, 'A', tam, x + axo, y)
    return f'<path d="{j} {a}" fill="{t["tinta"]}"/>'

# ---------- Opción B · Renglón: las letras sobre un renglón que termina en un cursor ----------
def marca_renglon(t, w=64, h=64, tam=40, grueso=2.5):
    x0, y0, x1, y1 = medir(B7, 'JA', tam)
    cursor_w = tam * 0.36  # bloque ancho, como el cursor de una terminal (no se confunde con una I)
    hueco = tam * 0.08
    ancho = (x1 - x0) + hueco + cursor_w
    capa = medir(B7, 'A', tam)
    alto = capa[3] - capa[1]
    bx = (w - ancho) / 2 - x0
    by = (h - alto) / 2 - capa[1]          # línea base: centra la altura de mayúscula
    jj, aj = texto(B7, 'J', tam, bx, by)
    aa, _ = texto(B7, 'A', tam, bx + aj - tam * 0.02, by)
    fin = bx + x1 + hueco
    renglon = f'<rect x="{bx + x0 - tam*0.04:.2f}" y="{by + 0.6:.2f}" width="{fin - (bx + x0 - tam*0.04) - hueco:.2f}" height="{grueso}" fill="{t["acento"]}"/>'
    cursor = f'<rect x="{fin:.2f}" y="{by - alto * 0.62 + 0.6:.2f}" width="{cursor_w:.2f}" height="{alto * 0.62 + grueso:.2f}" fill="{t["acento"]}"/>'
    return f'<path d="{jj} {aa}" fill="{t["tinta"]}"/>{renglon}{cursor}'

# ---------- Opción C · Ventana: ficha con el radio de las pantallas del sistema ----------
def marca_ventana(t, w=64, h=64, tam=34):
    x, y = centrar(O6, 'JA', tam, w, h, dy=0)
    d, _ = texto(O6, 'JA', tam, x, y)
    return f'<rect width="{w}" height="{h}" rx="{w*12/64:.2f}" fill="{t["acento"]}"/><path d="{d}" fill="{t["sobre_acento"]}"/>'

MARCAS = {'a': marca_firma, 'b': marca_renglon, 'c': marca_ventana}

def svg(w, h, cuerpo, titulo):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h:g}" role="img" aria-label="{titulo}">'
            f'<title>{titulo}</title>{cuerpo}</svg>')

def logo_con_nombre(op, t):
    """Marca de 64 + nombre en Boska 500, alineado a la altura de mayúscula de la marca."""
    marca = MARCAS[op](t)
    tam = 34
    x = 64 + 18
    cap = medir(B5, 'J', tam)
    y = 32 + (cap[3] - cap[1]) / 2 - cap[3]
    d, ancho = texto(B5, 'Jefferson Areque', tam, x, y)
    nombre = f'<path d="{d}" fill="{t["tinta"]}"/>'
    w = x + ancho + 2
    return svg(round(w, 1), 64, f'<g>{marca}</g>{nombre}', 'Jefferson Areque')

def favicon(op):
    """Favicon: 32x32, siempre sobre su propio fondo para verse en pestañas claras y oscuras."""
    n = TEMAS['noche']
    if op == 'a':
        cuerpo = f'<rect width="64" height="64" rx="14" fill="{n["fondo"]}"/>' + marca_firma(n, tam=66)
    elif op == 'b':
        cuerpo = f'<rect width="64" height="64" rx="14" fill="{n["fondo"]}"/>' + marca_renglon(n, tam=38, grueso=4.5)
    else:
        cuerpo = marca_ventana(n, tam=36)
    return svg(64, 64, cuerpo, 'JA')

def perfil_redes(t):
    """Imagen de perfil cuadrada: el monograma B centrado, dentro del recorte circular."""
    cuerpo = (f'<rect width="64" height="64" fill="{t["fondo"]}"/>'
              f'<g transform="translate(32 32) scale(0.78) translate(-32 -32)">{marca_renglon(t)}</g>')
    return svg(64, 64, cuerpo, 'Jefferson Areque')

def corto(d):
    """Redondea a 2 decimales para que el JS pese menos."""
    return re.sub(r'-?\d+\.\d+', lambda n: f'{float(n.group()):.2f}'.rstrip('0').rstrip('.'), d)

def trazos_js():
    """Trazos del logo B separados por color, para src/components/Logo.jsx."""
    m = marca_renglon(dict(tinta='LETRAS', acento='ACENTO'))
    letras = re.search(r'<path d="([^"]+)" fill="LETRAS"', m).group(1)
    rects = re.findall(r'<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" fill="ACENTO"', m)
    tam, x = 34, 64 + 18
    cap = medir(B5, 'J', tam)
    y = 32 + (cap[3] - cap[1]) / 2 - cap[3]
    nombre, ancho = texto(B5, 'Jefferson Areque', tam, x, y)
    datos = dict(
        letras=corto(letras),
        acento=[dict(x=float(a), y=float(b), width=float(c), height=float(d)) for a, b, c, d in rects],
        nombre=corto(nombre),
        anchoCompleto=round(x + ancho + 2, 1),
    )
    return ('// Generado desde los contornos de Boska (diseno/logos). No editar a mano.\n'
            'export const trazos = ' + json.dumps(datos, ensure_ascii=False, indent=2) + '\n')

def escribir(ruta, contenido):
    ruta = os.path.join(RAIZ, ruta)
    os.makedirs(os.path.dirname(ruta), exist_ok=True)
    with open(ruta, 'w', encoding='utf-8', newline='\n') as f:
        f.write(contenido)
    print('  ', os.path.relpath(ruta, RAIZ))

if __name__ == '__main__':
    datos = {}
    for op in 'abc':
        datos[op] = {}
        for tema, t in TEMAS.items():
            datos[op][f'monograma-{tema}'] = svg(64, 64, MARCAS[op](t), 'JA · Jefferson Areque')
            datos[op][f'logo-{tema}'] = logo_con_nombre(op, t)
        datos[op]['favicon'] = favicon(op)
        for nombre, contenido in datos[op].items():
            escribir(f'diseno/logos/opcion-{op}-{nombre}.svg', contenido)

    # Elegido: B (Renglón) como logo principal y C (Ventana) solo como favicon
    for tema, t in TEMAS.items():
        escribir(f'diseno/logos/elegido/logo-{tema}.svg', datos['b'][f'logo-{tema}'])
        escribir(f'diseno/logos/elegido/monograma-{tema}.svg', datos['b'][f'monograma-{tema}'])
        escribir(f'diseno/logos/elegido/perfil-redes-{tema}.svg', perfil_redes(t))
    escribir('diseno/logos/elegido/favicon.svg', datos['c']['favicon'])
    escribir('public/favicon.svg', datos['c']['favicon'])
    escribir('src/components/logoTrazos.js', trazos_js())
    escribir('diseno/prueba-logos.html', pagina.construir(datos))
