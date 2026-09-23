import type { PrivacyData, PrivacyBlock, PrivacySection } from '../types/types'

function renderBlock(block: PrivacyBlock): string {
  if (block.list) {
    return `<ul class="legal-list">${block.list.map(i => `<li>${i}</li>`).join('')}</ul>`
  }
  return `<p>${block.paragraph ?? ''}</p>`
}

function renderSection(section: PrivacySection): string {
  return `
    <section class="legal-section">
      <h2>${section.heading}</h2>
      ${section.blocks.map(renderBlock).join('')}
    </section>
  `
}

// Legal notice page (aviso-privacidad.html). Reuses the same navy hero
// band and body breadcrumb as the specialty detail page — both are
// "supporting page" headers, not the homepage hero — and adds its own
// prose typography for the section headings/lists in css/legalPage.css.
export function renderPrivacy(data: PrivacyData): string {
  return `
    <main>

      <section class="specialty-hero">
        <span class="eyebrow specialty-hero__eyebrow">Legal</span>
        <h1 class="specialty-hero__title">${data.title}</h1>
        <p class="specialty-hero__desc">Última actualización: ${data.updated}</p>
      </section>

      <div class="breadcrumb-bar">
        <nav class="breadcrumb" aria-label="Ruta de navegación">
          <a href="index.html">Inicio</a>
          <span class="breadcrumb__sep" aria-hidden="true">/</span>
          <span aria-current="page">${data.title}</span>
        </nav>
      </div>

      <section class="section section-white">
        <div class="specialty-content legal-content">
          <p class="legal-intro">${data.intro}</p>
          ${data.sections.map(renderSection).join('')}
        </div>
      </section>

    </main>
  `
}
