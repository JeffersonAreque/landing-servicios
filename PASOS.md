# Landing de servicios + video — paso a paso

Un paso por sesión de Claude Code. Al terminar cada paso: `/clear` (ahorra uso del plan Pro).

---

## PASO 0 — Ordenar tus herramientas (una sola vez, ~15 min)

### La regla de orden
| Dónde se instala | Qué va ahí | Por qué |
|---|---|---|
| **Global** (`~/.claude/skills/`) | Tu *método de trabajo*: skills que sirven en TODOS los proyectos | Las instalas una vez |
| **Proyecto** (`.claude/skills/` dentro del proyecto) | Skills *de ese tipo* de proyecto (diseño web solo en proyectos web) | No contaminan otros proyectos; viajan con el repo |
| **MCP de usuario** (`--scope user`) | Conexiones a herramientas: Figma, Playwright | Disponibles en cualquier carpeta |

### Carpetas
```
Documents\proyectos\
├── laboratorio-claude\     ← práctica (ya lo tienes)
├── landing-servicios\      ← este proyecto
└── ecomap\                 ← el siguiente
```

### Comandos (en una terminal normal, NO dentro de Claude Code)
```powershell
# 1) Ver qué trae el pack de Addy Osmani antes de instalar
npx skills add addyosmani/agent-skills --list

# 2) Instalar GLOBAL solo el núcleo del método (revisa los nombres con la lista de arriba)
npx skills add addyosmani/agent-skills -g -a claude-code --skill using-agent-skills --skill interview-me --skill incremental-implementation --skill test-driven-development

# 3) Conexiones (MCP) disponibles en todos tus proyectos
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
claude mcp add --scope user playwright -- npx @playwright/mcp@latest

# 4) Comprobar
npx skills list -g
claude mcp list
```
> Si Figma ya existía solo en el laboratorio, no pasa nada: ahora queda para todos.
> La primera vez en un proyecto nuevo, en Claude Code usa `/mcp` → figma → Authenticate.

### Revisión de seguridad (obligatoria con skills descargadas)
En Claude Code: `Revisa las skills de ~/.claude/skills y dime si algún script descarga o envía datos, o hace algo raro.`

---

## PASO 1 — Crear el proyecto
1. Copia esta carpeta a `Documents\proyectos\landing-servicios`.
2. En esa carpeta (terminal normal), instala las skills **de diseño** solo aquí:
   ```powershell
   npx skills add leonxlnx/taste-skill -a claude-code
   npx skills add vercel-labs/agent-skills -a claude-code --skill web-design-guidelines
   npx skills list
   ```
3. Abre Claude Code en la carpeta, **modo Plan**, y escribe:
   `Crea la base del proyecto según CLAUDE.md (React + Vite + Tailwind + motion), sin diseñar nada todavía. Inicia git.`

## PASO 2 — Pulir el contenido (skill interview-me)
`/clear` y luego:
`Entrevístame una pregunta a la vez para mejorar BRIEF.md. Al final, actualízalo.`
*Qué aprendes:* el contenido se decide ANTES del diseño. Así trabajan las agencias.

## PASO 3 — Elegir el estilo (DESIGN.md)
1. Entra a https://getdesign.md o a la sección Styles de Refero y elige 2–3 estilos que te gusten
   (por ejemplo, oscuros y elegantes como el video de Joel). Descarga su DESIGN.md.
2. Ponlos en una carpeta `referencias/` del proyecto.
3. `/clear` y luego:
   `Lee los DESIGN.md de referencias/ y crea MI DESIGN.md: toma la estructura y el nivel de calidad, pero con identidad propia (otro color de acento, otras fuentes, nada de logos ni nombres de esas marcas). Muéstrame 2 opciones de paleta antes de decidir.`
*Qué aprendes:* referencias sí, copias no.

## PASO 4 — Maqueta en Figma
`/clear` y luego (modo Plan):
`Usando Figma MCP, crea un archivo nuevo "Landing servicios" y diseña la versión móvil (390 px) siguiendo DESIGN.md y BRIEF.md: hero, servicios, proceso, proyectos, contacto. Pásame el enlace.`
Revisa en Figma, cambia lo que no te guste **tú mismo** (es tu marca). Luego:
`Haz la versión de escritorio (1440 px) a partir de la móvil que ya ajusté.`

## PASO 5 — Programar desde Figma
`/clear` y luego (modo Plan):
`Implementa la landing desde Figma: [enlace móvil] y [enlace escritorio]. Respeta DESIGN.md. Agrega animaciones al hacer scroll estilo storytelling (cada sección aparece y los mockups cambian), suaves y respetando prefers-reduced-motion.`

## PASO 6 — Revisión automática con Playwright
`/clear` y luego:
`Con Playwright abre la página en 390 px y en 1440 px, toma capturas de cada sección, compáralas con Figma y corrige lo que no coincida. Revisa también contraste y que los botones de WhatsApp funcionen.`
*Qué aprendes:* Claude revisa su propio trabajo con un navegador real.

## PASO 7 — Publicar
`Sube los cambios a GitHub en un repo nuevo landing-servicios` (usa tu skill de commits),
luego en Vercel: Add New → Project → importar → Deploy.

## PASO 8 — Grabar el video de marketing (automático)
`/clear` y luego:
`Con Playwright graba un video vertical (390x844) de la página publicada haciendo scroll lento de arriba a abajo, pausando 2 segundos en cada sección. Guárdalo en video/.`
Edita en CapCut: música, tu voz o subtítulos tipo "Así se ve un sitio hecho a medida".

---

## Cuándo usar qué (guía rápida)
| Situación | Usa | Cómo se activa |
|---|---|---|
| Empiezo algo y no tengo claro qué construir | `interview-me` | "Entrevístame…" |
| Tarea grande o que toca varios archivos | **Modo Plan** | Shift+Tab hasta "plan mode" |
| Programar una función paso a paso con pruebas | `incremental-implementation`, `test-driven-development` | Solas, al pedir funciones |
| Que se vea profesional y no genérico | `taste-skill` + `web-design-guidelines` + DESIGN.md | Solas, en proyectos web |
| Tengo o quiero un diseño | **Figma MCP** | Pegando el enlace o pidiendo "en Figma" |
| Verificar cómo se ve / probar la página | **Playwright MCP** | "Abre con Playwright…" |
| Guardar y subir | Skill de commits | "Sube los cambios" |
| Algo que repito 2+ veces | **Crear una skill nueva** | "Crea una skill que…" |

## Cuidar tu límite del plan Pro
- `/clear` entre pasos: una conversación larga gasta más en cada mensaje.
- `/context` muestra cuánto llevas cargado.
- Tareas simples (textos, ajustes de color) → `/model` y elige **Sonnet**; Opus para planificar y lo difícil.
- No instales skills "por si acaso": cada una suma.
