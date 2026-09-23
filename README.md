# Punto 9 — Dra. Paloma Durán Botello

Sitio web profesional para la Dra. Paloma Durán Botello (Neurología Clínica), desarrollado por **Punto Nueve Studio**. Este repositorio contiene la implementación completa del front‑end: componentes de UI, estructura de contenido e identidad visual, con foco en claridad, accesibilidad, diseño responsivo y una experiencia digital centrada en el paciente.

## Stack

- [Vite](https://vitejs.dev/) — servidor de desarrollo y build
- TypeScript (vanilla, sin framework de UI)
- CSS plano, organizado por capas (`base`, `components`, `sections`)

## Requisitos

- Node.js 18+
- npm

## Puesta en marcha

```bash
npm install       # instalar dependencias
npm run dev        # servidor de desarrollo (--host)
npm run build       # type-check + build de producción a /dist
npm run preview      # sirve el build de /dist localmente
```

## Estructura del proyecto

Cada sección del sitio (hero, navbar, specialties, profile, process, testimonials, contact, footer) sigue el mismo patrón de cuatro capas:

```
src/
├── data/         # contenido en JSON (una fuente de verdad por sección)
├── types/        # tipos TypeScript para cada data.json
├── logic/         # funciones puras *Renderer.ts que devuelven HTML (string)
│                   #   + lógica de interacción (p. ej. testimonialsCarrousel.ts)
├── components/     # *.ts con un mount<Seccion>(containerId) que:
│                   #   1. lee el JSON de data/
│                   #   2. lo pasa al renderer correspondiente
│                   #   3. inyecta el HTML resultante en el DOM
├── css/          # base.css, components.css, sections.css
├── assets/         # imágenes e iconos usados en el bundle
└── main.ts         # punto de entrada: monta todas las secciones en DOMContentLoaded
```

`index.html` define los contenedores (`#navbar`, `#hero`, `#specialties`, `#profile`, `#process`, `#testimonials`, `#contact`, `#footer`) que `main.ts` puebla al cargar la página.

### Agregar o modificar una sección

1. Editar el contenido en `src/data/<seccion>.json` (o su tipo en `src/types/`).
2. Ajustar el markup en `src/logic/<seccion>Renderer.ts`.
3. Si la sección requiere interacción (carrusel, formularios, etc.), agregar la lógica en `src/logic/` y llamarla desde el `mount` del componente en `src/components/`.
4. Los estilos van en `src/css/components.css` o `src/css/sections.css` según corresponda.

### Páginas adicionales (multi-page)

El sitio es multi-página con Vite: cada página tiene su propio `.html` en la raíz y su propio entry `.ts` en `src/`, registrados como entradas de build en `vite.config.ts`.

- `index.html` + `src/main.ts` — página principal.
- `especialidad.html` + `src/especialidad.ts` — página de detalle de una especialidad neurológica, seleccionada vía query string (`especialidad.html?id=migraine`, ids definidos en `src/data/specialties.json`). El contenido extendido de cada especialidad (síntomas, cuándo consultar, enfoque de tratamiento, FAQ) vive en `src/data/specialtyDetails.json`, tipado en `src/types/specialtyDetail.ts` y renderizado por `src/logic/specialtyDetailRenderer.ts`.

Para agregar una nueva página siguiendo el mismo patrón: crear `<pagina>.html` + `src/<pagina>.ts`, y añadir la entrada correspondiente en `build.rollupOptions.input` dentro de `vite.config.ts` para que se incluya en `npm run build`.

Los enlaces internos entre páginas usan rutas relativas de archivo (`index.html#seccion`, `especialidad.html?id=...`) en lugar de un router — no hay dependencia de reglas de rewrite en el hosting.

## Contacto

Proyecto desarrollado y mantenido por **Punto Nueve Studio**.
