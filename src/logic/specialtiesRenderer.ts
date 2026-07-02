import type { SpecialtiesData, SpecialtyItem } from '../types/types'

// Each icon is neurologically meaningful at 24x24px:
// migraine  → head silhouette with internal zap (pain signal)
// epilepsy  → EEG trace with characteristic spike
// ms        → neural network with one broken link (myelin damage)
// dementia  → brain outline with fading cross (cognitive decline)
// neuropathy→ sinusoidal nerve fiber with terminal endpoints
// parkinson → concentric tremor rings emanating from center
const ICONS: Record<string, string> = {

  migraine: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 3A6 6 0 0 0 3 9c0 2.8 1.5 5.2 4 6.5V18a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2.5c2.5-1.3 4-3.7 4-6.5a6 6 0 0 0-6-6H8z"/>
    <path d="M12 7l-1.5 3.5H12l-1.5 4 4-5.5h-2L12 7z"/>
  </svg>`,

  epilepsy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 12h2.5l1.5-5 2.5 10 1.5-7 1 4 1.5-4.5 2 7.5 1.5-5H22"/>
  </svg>`,

  ms: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <circle cx="12" cy="4"  r="2"/>
    <circle cx="4"  cy="18" r="2"/>
    <circle cx="20" cy="18" r="2"/>
    <circle cx="12" cy="13" r="2"/>
    <line x1="12"  y1="6"    x2="12"  y2="11"/>
    <line x1="5.7" y1="16.7" x2="10.7" y2="14.2"/>
    <line x1="18.3" y1="16.7" x2="13.3" y2="14.2" stroke-dasharray="2 2" opacity="0.5"/>
  </svg>`,

  dementia: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9.5 3C7 3 5 5 5 7.5c0 .6.1 1.1.3 1.6C3.9 9.8 3 11.3 3 13c0 2.8 2.2 5 5 5h8c2.8 0 5-2.2 5-5 0-1.7-.9-3.2-2.3-4.1.2-.5.3-1 .3-1.6C19 5 17 3 14.5 3c-.8 0-1.5.2-2 .5C12 3.2 11.3 3 9.5 3z"/>
    <path d="M9 11h6M12 8v6" opacity="0.5"/>
  </svg>`,

  neuropathy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <path d="M2 12c1.5-4 3-6 5-6s3.5 4 5 4 3.5-4 5-4 3.5 2 5 6"/>
    <circle cx="2"  cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="22" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M7 6C7 4 8 3 9 3M17 6c0-2-1-3-2-3" opacity="0.35"/>
  </svg>`,

  parkinson: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <circle cx="12" cy="12" r="2.5"/>
    <circle cx="12" cy="12" r="5.5"  opacity="0.55"/>
    <circle cx="12" cy="12" r="9"    opacity="0.25"/>
    <line x1="12" y1="2"  x2="12" y2="3.5"  opacity="0.4"/>
    <line x1="12" y1="20.5" x2="12" y2="22" opacity="0.4"/>
    <line x1="2"  y1="12" x2="3.5"  y2="12" opacity="0.4"/>
    <line x1="20.5" y1="12" x2="22" y2="12" opacity="0.4"/>
  </svg>`,
}

function renderCard(item: SpecialtyItem): string {
  const icon = ICONS[item.icon] ?? ''

  return `
    <article class="specialty-card" data-id="${item.id}">
      <div class="card-icon">
        ${icon}
      </div>
      <h3 class="card-title">${item.title}</h3>
      <p  class="card-desc">${item.description}</p>
    </article>
  `
}

export function renderSpecialties(data: SpecialtiesData): string {
  return `
    <section class="specialties">

      <header class="section-header">
        <span class="eyebrow">${data.eyebrow}</span>
        <h2 class="section-title">
          ${data.title.normal} <em>${data.title.italic}</em>
        </h2>
        <div class="divider"></div>
        <p class="section-subtitle">${data.subtitle}</p>
      </header>

      <div class="cards-grid">
        ${data.items.map(renderCard).join('')}
      </div>

    </section>
  `
}