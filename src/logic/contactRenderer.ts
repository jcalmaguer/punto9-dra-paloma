import type { ContactData, ContactDetail } from '../types/types'

// Clinically grounded icons — each maps to a real contact channel.
// stroke="currentColor" allows CSS color control without SVG fill overrides.
const ICONS: Record<string, string> = {

  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2
                     19.79 19.79 0 0 1-8.63-3.07
                     A19.5 19.5 0 0 1 4.69 12
                     19.79 19.79 0 0 1 1.71 3.38
                     A2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72
                     12.84 12.84 0 0 0 .7 2.81
                     2 2 0 0 1-.45 2.11L7.91 8.6
                     a16 16 0 0 0 6 6l1.27-1.27
                     a2 2 0 0 1 2.11-.45
                     12.84 12.84 0 0 0 2.81.7
                     A2 2 0 0 1 22 15z"/>
          </svg>`,

  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12
                     c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6
                     c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>`,

  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
               <path d="M21 10c0 7-9 13-9 13S3 17 3 10
                        a9 9 0 0 1 18 0z"/>
               <circle cx="12" cy="10" r="3"/>
             </svg>`,

  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>`,

  wa: `<svg viewBox="0 0 24 24" fill="currentColor">
         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967
                  -.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164
                  -.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475
                  -.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606
                  .134-.133.298-.347.446-.52.149-.174.198-.298.298-.497
                  .099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207
                  -.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01
                  -.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479
                  0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487
                  .709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118
                  .571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413
                  -.074-.124-.272-.198-.57-.347
                  m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214
                  -3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26
                  c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898
                  a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884
                  m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892
                  c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654
                  a11.882 11.882 0 005.683 1.448h.005
                  c6.554 0 11.89-5.335 11.893-11.893
                  a11.821 11.821 0 00-3.48-8.413z"/>
       </svg>`,

  send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
           <line x1="22" y1="2" x2="11" y2="13"/>
           <polygon points="22 2 15 22 11 13 2 9 22 2"/>
         </svg>`,

  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
             <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
             <polyline points="9 12 11 14 15 10"/>
           </svg>`,
}

function renderDetail(detail: ContactDetail): string {
  const icon    = ICONS[detail.icon] ?? ''
  const content = `
    <div class="contact-icon">${icon}</div>
    <div class="contact-item__text">
      <span class="c-strong">${detail.label}</span>
      <span class="c-val">${detail.value}</span>
    </div>
  `

  // Phone and email become clickable anchors — reduces friction on mobile
  if (detail.href) {
    return `
      <a href="${detail.href}" class="contact-item contact-item--link">
        ${content}
      </a>
    `
  }

  return `<div class="contact-item">${content}</div>`
}

function renderMotives(motivos: string[]): string {
  const options = motivos
    .map(m => `<option value="${m}">${m}</option>`)
    .join('')

  return `
    <option value="" disabled selected>Selecciona una especialidad</option>
    ${options}
  `
}

export function renderContact(data: ContactData): string {
  return `
    <section class="contact-section" id="contacto">
      <div class="contact-grid">

        <!-- Left column: info + reassurance + WhatsApp CTA -->
        <div class="contact-info">

          <span class="eyebrow contact-eyebrow">${data.eyebrow}</span>

          <h2>
            ${data.title} <em>${data.titleItalic}</em>
          </h2>

          <p>${data.description}</p>

          <!-- Contact details: phone, email, location, hours.
               Phone and email are clickable anchors on mobile. -->
          <div class="contact-details">
            ${data.details.map(renderDetail).join('')}
          </div>

          <!-- WhatsApp CTA: prominent alternative to the form.
               For patients who are mobile-first or prefer async chat. -->
          <a href="${data.whatsapp.href}"
             target="_blank"
             rel="noopener noreferrer"
             class="contact-wa-cta">
            <span class="contact-wa-cta__icon">${ICONS.wa}</span>
            <span class="contact-wa-cta__text">
              <strong>${data.whatsapp.label}</strong>
              <small>${data.whatsapp.sublabel}</small>
            </span>
          </a>

          <!-- Reassurance block: response time + privacy note.
               These address the two main anxieties at the decision moment. -->
          <div class="contact-reassurance">
            <div class="contact-reassurance__item">
              <span class="contact-reassurance__dot"></span>
              ${data.reassurance.responseTime}
            </div>
            <div class="contact-reassurance__item">
              <span class="contact-reassurance__icon">${ICONS.shield}</span>
              ${data.reassurance.privacy}
            </div>
          </div>

        </div>

        <!-- Right column: appointment request form -->
        <div class="contact-form">

          <div class="form-heading">
            <p class="form-title">${data.form.title}</p>
            <p class="form-sub">${data.form.subtitle}</p>
          </div>

          <form action="" method="post" novalidate>

            <div class="form-row">
              <div class="form-group">
                <label for="contact-name">Nombre completo</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Tu nombre completo"
                  autocomplete="name"
                  required>
              </div>
              <div class="form-group">
                <label for="contact-phone">Teléfono</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="+52 462 123 4567"
                  autocomplete="tel"
                  required>
              </div>
            </div>

            <div class="form-group">
              <label for="contact-email">Correo electrónico</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                autocomplete="email"
                required>
            </div>

            <div class="form-group">
              <label for="contact-motivo">Motivo de consulta</label>
              <select id="contact-motivo" name="motivo" required>
                ${renderMotives(data.form.motivos)}
              </select>
            </div>

            <div class="form-group">
              <label for="contact-mensaje">Mensaje <span class="form-optional">(opcional)</span></label>
              <textarea
                id="contact-mensaje"
                name="mensaje"
                placeholder="Describe brevemente tus síntomas o dudas..."
                rows="4"></textarea>
            </div>

            <button type="submit" class="btn-form">
              ${ICONS.send}
              ${data.form.submitLabel}
            </button>

          </form>

          <p class="form-legal">${data.form.legal}</p>

        </div>
      </div>
    </section>
  `
}