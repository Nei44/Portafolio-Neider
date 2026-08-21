# Portafolio — Neider Arenas De La Cruz

Reconstrucción en Next.js 16 + TypeScript + React Three Fiber, migrando
desde la versión anterior en HTML/CSS/JS vanilla.

## Estado: Fase 2 de 4 completa

Lo que **ya existe y está verificado** (build, lint y tipos pasan; probado
con Playwright en desktop y móvil: navegación, menú móvil,
`prefers-reduced-motion`, ruta de detalle de proyecto, 404 en slug
inexistente, y el formulario de contacto de punta a punta — validación
vacía, envío válido, respuesta real del servidor):

- Sistema de diseño completo (`src/app/globals.css`): paleta, tipografía,
  radios, sombras, curvas de movimiento.
- Nav accesible en todas las rutas (vive en el layout raíz): teclado,
  indicador de sección activa, menú móvil, skip-link.
- Hero: contenido real en HTML + campo de datos 3D con fallback SVG
  estático (`prefers-reduced-motion` / sin WebGL).
- **Proyectos**: grilla de estudios de caso + página de detalle por
  proyecto en `/proyectos/[slug]` (ruta estática, con metadata SEO
  propia). Un solo proyecto real (econofísica/ML, UNAM), con cada campo
  específico marcado como pendiente — no se inventó un segundo proyecto.
- **Habilidades**: agrupadas por función, sin porcentajes arbitrarios.
  Solo se listan como confirmadas las habilidades mencionadas
  directamente; el resto está marcado `[Herramienta]`.
- **Experiencia**: línea de tiempo con los dos roles reales conocidos
  (QA Tester Trainee en PRACTIA/Publicis Groupe; Analista de Datos,
  sector cobranza), con fechas/responsabilidades marcadas como
  pendientes porque no se dieron.
- **Contacto**: formulario real con `react-hook-form` + `zod`
  (validación, estados de carga/éxito/error, honeypot anti-spam,
  accesible por teclado, `aria-live` para el estado del envío) contra
  un route handler propio (`/api/contact`) que valida y responde de
  verdad — falta únicamente conectar un proveedor de correo real.

Lo que **falta** (Fases 3-4, no implementado todavía):

- Fase 3: visualización de datos interactiva (constelación de skills u
  otra), SEO a nivel sitio (sitemap, robots, Open Graph, datos
  estructurados), conectar el formulario a un proveedor de correo real.
- Fase 4: pruebas automatizadas (Playwright + axe-core) integradas al
  repo, auditoría Lighthouse, optimización de rendimiento fina,
  despliegue.

## Instalación y ejecución

```bash
npm install
npm run dev        # desarrollo, http://localhost:3000
npm run build       # build de producción
npm run start        # sirve el build de producción
npm run lint          # ESLint
npx tsc --noEmit       # solo chequeo de tipos
```

Requiere Node 20+ (probado con Node 22).

## Estructura de carpetas

```
src/
  app/
    layout.tsx                # Nav global, fuentes, metadata, lang="es"
    page.tsx                   # ensambla Hero + Proyectos + Habilidades + Experiencia + Contacto
    globals.css                 # sistema de diseño (design tokens)
    proyectos/[slug]/page.tsx    # estudio de caso por proyecto (SSG + metadata)
    api/contact/route.ts          # valida el formulario, responde; envío real pendiente
  components/
    Nav.tsx                        # navegación + menú móvil + indicador de sección
    Hero.tsx                        # contenido real del hero (HTML)
    Proyectos.tsx / ProjectCard.tsx  # grilla de estudios de caso
    Habilidades.tsx                   # habilidades agrupadas por función
    Experiencia.tsx                    # línea de tiempo profesional
    Contacto.tsx                        # formulario con validación real
    canvas/
      HeroCanvas.tsx        # decide Canvas 3D vs fallback estático
      Scene.tsx              # wrapper de R3F <Canvas>
      DataField.tsx            # campo de puntos + anillo orbital
      StaticField.tsx           # fallback SVG (reduced-motion / sin WebGL)
  hooks/
    usePrefersReducedMotion.ts  # useSyncExternalStore sobre matchMedia
    useWebglSupport.ts            # detección de soporte WebGL, memoizada
  data/
    navigation.ts                  # fuente única de verdad del Nav
    projects.ts                     # estructura de estudio de caso
    skills.ts                        # habilidades agrupadas
    experience.ts                     # historial profesional
  lib/
    contact-schema.ts                  # esquema zod compartido cliente/servidor
```

## Decisiones de arquitectura relevantes

- **Tailwind v4** usa theming CSS-first (`@theme` en `globals.css`), no
  `tailwind.config.js`. Los tokens de color/tipografía/radio están ahí.
- **`duration-fast/base/slow`** existen como variables CSS documentadas,
  pero Tailwind v4 no las expone como namespace de utilidades — en JSX se
  usan las clases numéricas nativas (`duration-150`, etc.) que coinciden
  en valor.
- **Fuente Geist auto-hospedada** (paquete `geist`, no `next/font/google`):
  evita que el build dependa de una llamada de red a Google Fonts.
- **React 19 / reglas de pureza**: el campo de puntos usa un hash
  pseudoaleatorio determinista en vez de `Math.random()`, y los hooks de
  `prefers-reduced-motion`/WebGL usan `useSyncExternalStore` en vez de
  `useState` + `useEffect`, para cumplir las reglas nuevas de
  `eslint-plugin-react-hooks` (`purity`, `set-state-in-effect`).
- El Canvas 3D es puramente decorativo (`aria-hidden="true"`); toda la
  información vive en HTML normal al lado.
- El formulario de contacto valida con el **mismo esquema zod** en
  cliente y servidor (`lib/contact-schema.ts`) — una sola fuente de
  verdad para las reglas de validación.
- El route handler de contacto **valida y responde de verdad**, pero no
  envía correo todavía: falta conectar un proveedor (Resend/SendGrid)
  con una API key real, marcado explícitamente en el código.

## Recursos y decisiones pendientes (no inventados, marcados en el código)

- `[FRASE DE VALOR]` en `Hero.tsx`.
- Foto — aún no integrada al diseño.
- `href="#"` en GitHub/LinkedIn (Hero, Nav, Contacto) — reemplazar por
  URLs reales.
- `/cv-neider-arenas.pdf` — el archivo todavía no existe en `public/`.
- `[CORREO PROFESIONAL]` y disponibilidad profesional en `Contacto.tsx`.
- Proveedor de correo real para el formulario (`api/contact/route.ts`).
- Todos los campos específicos del estudio de caso en
  `data/projects.ts` (contexto, datos, metodología, resultados).
- Fechas y responsabilidades detalladas en `data/experience.ts`.
- Herramientas concretas marcadas `[Herramienta]` en `data/skills.ts`
  (SQL, BI, control de versiones, etc. — solo si son ciertas).
- Segundo proyecto para reemplazar la tarjeta fantasma en Proyectos.
- Dominio y hosting — Vercel es la opción más directa para Next.js.

## Despliegue (cuando esté listo)

```bash
npx vercel
```

o conectando el repositorio de GitHub directamente desde vercel.com.
"# Portafolio-Neider" 
"# Portafolio-Neider" 
