import type { ProcessData, ProcessStep } from '../types/types'

// Refined stroke icons at 20px optical size — clinical and precise.
// stroke-width 1.5 keeps them light enough to not dominate the card.
const STEP_ICONS: Record<number, string> = {

  1: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8"  y1="2" x2="8"  y2="6"/>
        <line x1="3"  y1="10" x2="21" y2="10"/>
        <circle cx="8"  cy="15" r="1" fill="currentColor" stroke="none"/>
        <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/>
        <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none"/>
      </svg>`,

  2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10
                 a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <circle cx="12" cy="13" r="2"/>
        <path d="M9 17c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2"/>
      </svg>`,

  3: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a7 7 0 0 1 7 7c0 3.5-2 6-4 7.4V19
                 a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.6
                 C7 16 5 13.5 5 10a7 7 0 0 1 7-7z"/>
        <path d="M7.5 11h1.5l1-2.5 2 5 1-2.5h1.5" stroke-width="1.2"/>
      </svg>`,

  4: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M8 12h1.5l1-2 2 4 1-2H16" stroke-width="1.2"/>
      </svg>`,
}

function renderStep(step: ProcessStep, index: number, total: number): string {
  const icon      = STEP_ICONS[step.number] ?? ''
  const isLast    = index === total - 1
  const stepClass = isLast ? 'step-card step-card--last' : 'step-card'

  return `
    <div class="${stepClass}">

      <div class="step-card__header">
        <!-- Step number: brand-blue accent in the top-left corner.
             Reads as "sequence marker" without dominating the card. -->
        <span class="step-card__number">${step.number}</span>

        <!-- Icon container: right-aligned to balance the number. -->
        <div class="step-card__icon">
          ${icon}
        </div>
      </div>

      <h4 class="step-card__title">${step.title}</h4>
      <p  class="step-card__desc">${step.description}</p>

      <!-- Connector arrow between cards — hidden on last card.
           Pure CSS, no extra markup needed in the last item. -->
      <div class="step-card__connector" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.5" stroke-linecap="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>

    </div>
  `
}

export function renderProcess(data: ProcessData): string {
  const steps = data.ProcessSteps

  return `
    <section class="section section-cream" id="proceso">

      <header class="section-header">
        <span class="eyebrow">${data.eyebrow}</span>
        <h2 class="section-title">
          ${data.title} <em>${data.italicTitle}</em>
        </h2>
        <div class="divider"></div>
      </header>

      <div class="process-steps">
        ${steps.map((step, i) => renderStep(step, i, steps.length)).join('')}
      </div>

    </section>
  `
}