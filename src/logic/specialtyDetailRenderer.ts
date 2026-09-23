import type { SpecialtyItem, SpecialtyDetailItem, SpecialtyFaq } from '../types/types'
import { ICONS, renderCard } from './specialtiesRenderer'

// Breadcrumb lives in the body, right under the fixed navbar, instead of
// inside the navy hero — keeps the hero focused on the condition intro
// and avoids crowding the main nav menu directly above it.
function renderBreadcrumb(currentLabel: string): string {
  return `
    <div class="breadcrumb-bar">
      <nav class="breadcrumb" aria-label="Ruta de navegación">
        <a href="index.html">Inicio</a>
        <span class="breadcrumb__sep" aria-hidden="true">/</span>
        <a href="index.html#especialidades">Especialidades</a>
        <span class="breadcrumb__sep" aria-hidden="true">/</span>
        <span aria-current="page">${currentLabel}</span>
      </nav>
    </div>
  `
}

function renderSymptoms(symptoms: string[]): string {
  return symptoms
    .map(s => `<li><span class="symptom-dot"></span>${s}</li>`)
    .join('')
}

function renderFaq(faq: SpecialtyFaq): string {
  return `
    <details class="faq-item">
      <summary>
        ${faq.question}
        <span class="faq-item__chevron" aria-hidden="true"></span>
      </summary>
      <p>${faq.answer}</p>
    </details>
  `
}

// Full detail page for a single specialty: breadcrumb hero, overview,
// symptoms + "when to consult" callout, treatment approach, FAQ,
// related specialties and a closing CTA. Reuses .section / .eyebrow /
// .divider / .btn-primary / .specialty-card from the shared design system —
// only the page-specific pieces (hero band, callout, FAQ, symptom list)
// get their own classes, defined in css/specialtyPage.css.
export function renderSpecialtyDetail(
  item: SpecialtyItem,
  detail: SpecialtyDetailItem,
  related: SpecialtyItem[],
  whatsappHref: string
): string {
  const icon = ICONS[item.icon] ?? ''

  // Prefilled WhatsApp message: the patient arrives at the chat with the
  // specialty already stated instead of a blank "Hola" — less typing,
  // and Paloma sees the context before the first reply.
  const waMessage = encodeURIComponent(`Hola, quisiera una consulta sobre ${item.title}.`)
  const waHref = `${whatsappHref}?text=${waMessage}`

  return `
    <main>

      <!-- ── Detail hero: navy band with the condition intro ── -->
      <section class="specialty-hero">
        <div class="specialty-hero__icon" aria-hidden="true">${icon}</div>
        <span class="eyebrow specialty-hero__eyebrow">Área de atención</span>
        <h1 class="specialty-hero__title">${item.title}</h1>
        <p class="specialty-hero__desc">${item.description}</p>
      </section>

      <!-- ── Breadcrumb: in the body, right under the navbar — keeps the
           fixed menu clear instead of sharing the navy hero band ── -->
      ${renderBreadcrumb(item.title)}

      <!-- ── Overview ── -->
      <section class="section section-white">
        <div class="specialty-content">
          <p class="specialty-overview">${detail.overview}</p>
        </div>
      </section>

      <!-- ── Symptoms + when-to-consult callout ── -->
      <section class="section section-cream">
        <div class="specialty-content specialty-split">
          <div>
            <h2 class="specialty-block-title">Síntomas frecuentes</h2>
            <ul class="symptom-list">
              ${renderSymptoms(detail.symptoms)}
            </ul>
          </div>

          <aside class="specialty-callout">
            <h3>¿Cuándo consultar?</h3>
            <p>${detail.whenToConsult}</p>
            <a href="index.html#contacto" class="btn-primary">Agendar valoración</a>
          </aside>
        </div>
      </section>

      <!-- ── Treatment approach ── -->
      <section class="section section-white">
        <div class="specialty-content">
          <h2 class="specialty-block-title">Nuestro enfoque de tratamiento</h2>
          <p class="specialty-approach">${detail.approach}</p>
        </div>
      </section>

      <!-- ── FAQ ── -->
      <section class="section section-cream">
        <header class="section-header">
          <span class="eyebrow">Dudas frecuentes</span>
          <h2 class="section-title">Preguntas <em>sobre esta condición</em></h2>
          <div class="divider"></div>
        </header>

        <div class="specialty-content">
          <div class="faq-list">
            ${detail.faqs.map(renderFaq).join('')}
          </div>
        </div>
      </section>

      <!-- ── Related specialties ── -->
      <section class="section section-white">
        <header class="section-header">
          <span class="eyebrow">Explora más</span>
          <h2 class="section-title">Otras <em>especialidades</em></h2>
          <div class="divider"></div>
        </header>

        <div class="cards-grid">
          ${related.map(renderCard).join('')}
        </div>
      </section>

      <!-- ── Closing CTA ── -->
      <section class="specialty-cta">
        <h2>¿Listo para tu valoración con la Dra. Paloma?</h2>
        <p>Agenda tu consulta o escribe directamente por WhatsApp para resolver tus dudas.</p>
        <div class="hero-actions specialty-cta__actions">
          <a href="index.html#contacto" class="btn-primary">Agendar consulta</a>
          <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="btn-wa">WhatsApp</a>
        </div>
        <p class="specialty-disclaimer">
          Esta información tiene fines orientativos y no sustituye una valoración médica profesional.
        </p>
      </section>

    </main>
  `
}

// Fallback shown when the URL's ?id= doesn't match any known specialty.
export function renderSpecialtyNotFound(): string {
  return `
    <main>
      <section class="specialty-hero specialty-hero--notfound">
        <span class="eyebrow specialty-hero__eyebrow">Área de atención</span>
        <h1 class="specialty-hero__title">Especialidad no encontrada</h1>
        <p class="specialty-hero__desc">
          No pudimos encontrar la especialidad que buscas. Puedes ver el listado completo
          de áreas de atención en la página principal.
        </p>
        <a href="index.html#especialidades" class="btn-primary" style="margin-top: 28px;">
          Ver especialidades
        </a>
      </section>

      ${renderBreadcrumb('No encontrada')}
    </main>
  `
}
