"""Arma diseno/prueba-logos.html con las tres propuestas."""
import base64

OPCIONES = [
    ('a', 'Opción A · Firma', 'La J de Boska baja como un trazo de lapicero y pasa por debajo de la A: se lee como una firma. Sin caja ni adornos; la más elegante.'),
    ('b', 'Opción B · Renglón', 'Las letras van escritas sobre un renglón de cuaderno que termina en un cursor de sistema: es la idea de la página (del cuaderno al sistema) en un solo signo. Usa el acento aguajal.'),
    ('c', 'Opción C · Ventana', 'Una ficha con el mismo radio que las pantallas del sistema, con JA en Onest (la letra de la interfaz). La más tecnológica y la más fuerte en tamaño chico.'),
]
def uri(svg):
    return 'data:image/svg+xml;base64,' + base64.b64encode(svg.encode()).decode()

def construir(datos):
    bloques = []
    for op, titulo, idea in OPCIONES:
        d = datos[op]
        fav = uri(d['favicon'])
        bloques.append(f'''
<section class="opcion" aria-labelledby="t-{op}">
  <h2 id="t-{op}">{titulo}</h2>
  <p class="idea">{idea}</p>
  <div class="paneles">
    <div class="panel noche">
      <div class="mono">{d['monograma-noche']}</div>
      <div class="logo">{d['logo-noche']}</div>
      <div class="nav"><div class="logo-nav">{d['logo-noche']}</div><span class="boton">WhatsApp</span></div>
    </div>
    <div class="panel papel">
      <div class="mono">{d['monograma-papel']}</div>
      <div class="logo">{d['logo-papel']}</div>
      <div class="nav"><div class="logo-nav">{d['logo-papel']}</div><span class="boton papel-boton">WhatsApp</span></div>
    </div>
  </div>
  <div class="favicons">
    <p class="nota">Favicon</p>
    <div class="pestana clara"><img src="{fav}" width="16" height="16" alt=""><span>Jefferson Areque · Páginas web</span></div>
    <div class="pestana oscura"><img src="{fav}" width="16" height="16" alt=""><span>Jefferson Areque · Páginas web</span></div>
    <img src="{fav}" width="32" height="32" alt="Favicon a 32 px">
    <img src="{fav}" width="64" height="64" alt="Favicon a 64 px">
  </div>
</section>''')

    html = f'''<!doctype html>
<html lang="es-PE">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Prueba de logos · Jefferson Areque</title>
<link rel="icon" href="data:,">
<script type="module">import '/src/index.css'</script>
<style>
  /* Página de prueba (no se publica). Solo tokens de DESIGN.md. */
  body {{ margin: 0; background: var(--color-papel-2); color: var(--color-tinta); font-family: var(--font-texto); }}
  main {{ max-width: 84rem; margin: 0 auto; padding: 3rem 1.25rem 6rem; }}
  h1 {{ font-family: var(--font-titulo); font-weight: 500; font-size: var(--text-titulo); line-height: 1.05; letter-spacing: -0.02em; margin: 0 0 1rem; }}
  h2 {{ font-family: var(--font-titulo); font-weight: 500; font-size: var(--text-subtitulo); line-height: 1.2; margin: 0 0 .5rem; }}
  .intro, .idea {{ max-width: 62ch; margin: 0 0 1.5rem; }}
  .nota {{ font-size: var(--text-nota); color: var(--color-tinta-2); margin: 0; }}
  .opcion {{ margin-top: 5rem; }}
  .paneles {{ display: grid; gap: 1rem; }}
  @media (width >= 64rem) {{ .paneles {{ grid-template-columns: 1fr 1fr; }} }}
  .panel {{ padding: 2rem 1.25rem; display: grid; gap: 2rem; justify-items: start; }}
  .noche {{ background: var(--color-noche); color: var(--color-hueso); }}
  .papel {{ background: var(--color-papel); }}
  .mono svg {{ width: 128px; height: 128px; display: block; }}
  .logo svg {{ height: 56px; width: auto; max-width: 100%; display: block; }}
  .nav {{ display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 350px; }}
  .logo-nav svg {{ height: 32px; width: auto; display: block; }}
  .boton {{ background: var(--color-aguajal-claro); color: var(--color-noche); border-radius: 999px; padding: .6rem 1.1rem; font-weight: 600; font-size: var(--text-nota); }}
  .papel-boton {{ background: var(--color-aguajal); color: #fff; }}
  .favicons {{ display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; margin-top: 1rem; }}
  .pestana {{ display: flex; align-items: center; gap: .5rem; padding: .5rem .9rem; border-radius: 8px 8px 0 0; font-size: 13px; }}
  .clara {{ background: #FFFFFF; color: #202124; }}
  .oscura {{ background: #35363A; color: #E8EAED; }}
</style>
</head>
<body>
<main>
  <h1>Elige tu logo</h1>
  <p class="intro">Tres opciones, cada una como monograma, con tu nombre (también al tamaño de la barra de navegación en celular) y como favicon. Todas en SVG y con los colores de DESIGN.md.</p>
  {''.join(bloques)}
</main>
</body>
</html>'''
    return html
