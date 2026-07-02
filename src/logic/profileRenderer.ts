import type { ProfileData, ProfileCredential } from '../types/types'

// Synapse icon: central node with 4 branching dendrites.
// Used in the photo frame as a subtle neurological watermark —
// present at low opacity, reinforcing the medical identity
// without competing with the initials or a future real photo.
const SYNAPSE_WATERMARK = `
  <svg class="perfil-watermark" viewBox="0 0 120 120" fill="none"
       aria-hidden="true">
    <circle cx="60" cy="60" r="10" stroke="currentColor" stroke-width="1.5"/>
    <!-- dendrites -->
    <line x1="60" y1="50" x2="60" y2="18"  stroke="currentColor" stroke-width="1"/>
    <line x1="60" y1="70" x2="60" y2="102" stroke="currentColor" stroke-width="1"/>
    <line x1="50" y1="60" x2="18"  y2="60" stroke="currentColor" stroke-width="1"/>
    <line x1="70" y1="60" x2="102" y2="60" stroke="currentColor" stroke-width="1"/>
    <!-- terminal buttons -->
    <circle cx="60"  cy="14"  r="4" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="60"  cy="106" r="4" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="14"  cy="60"  r="4" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="106" cy="60"  r="4" stroke="currentColor" stroke-width="1.5"/>
    <!-- diagonal synapses — secondary connections -->
    <line x1="53" y1="53" x2="28" y2="28" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
    <line x1="67" y1="53" x2="92" y2="28" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
    <line x1="53" y1="67" x2="28" y2="92" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
    <line x1="67" y1="67" x2="92" y2="92" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
    <circle cx="24"  cy="24"  r="3" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <circle cx="96"  cy="24"  r="3" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <circle cx="24"  cy="96"  r="3" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <circle cx="96"  cy="96"  r="3" stroke="currentColor" stroke-width="1" opacity="0.5"/>
  </svg>
`

function renderCredentials(credentials: ProfileCredential[]): string {
  return credentials.map(c => `
    <div class="cred-item">
      <div class="cred-dot"></div>
      <div class="cred-text">
        <strong>${c.title}</strong> — ${c.detail}
      </div>
    </div>
  `).join('')
}

function renderBio(paragraphs: string[]): string {
  return paragraphs
    .map(p => `<p>${p}</p>`)
    .join('')
}

export function renderProfile(data: ProfileData): string {
  return `
    <section class="section section-white" id="perfil">
      <div class="about-grid">

        <!-- Visual column: photo frame + floating credential badge -->
        <div class="about-visual">
          <div class="about-photo-frame">

            <!-- Synapse watermark: neurological identity at low opacity.
                 Replace with <img> when the real photo is available. -->
            ${SYNAPSE_WATERMARK}

            <!-- Initials placeholder -->
            <div class="about-ini" aria-hidden="true">${data.initials}</div>

          </div>

          <!-- Floating badge: institution + degree.
               Positioned absolute over the bottom-right corner of the frame.
               The navy background anchors it visually to the header. -->
          <div class="about-badge">
            <strong>${data.badge.institution}</strong>
            <span>${data.badge.degree}</span>
          </div>
        </div>

        <!-- Text column: credential eyebrow → title → bio → credentials → CTA -->
        <div class="about-text">

          <!-- Credential eyebrow: establishes authority before the patient
               reads the section title. Same visual pattern as .eyebrow
               in section headers — spatial consistency across the page. -->
          <div class="about-cred">${data.credential}</div>

          <!-- Title: italic (emotional qualifier) + normal (factual claim).
               "Committed" is warm and active — a promise, not a description. -->
          <h2>
            <em>${data.title.italic}</em><br>
            ${data.title.normal}
          </h2>

          <!-- Bio: two paragraphs in first person.
               First = professional context.
               Second = care philosophy + emotional connection. -->
          <div class="about-bio">
            ${renderBio(data.bio)}
          </div>

          <!-- Credentials list: dots as synaptic node metaphor.
               Each credential is a "connection" in her professional network. -->
          <div class="cred-list">
            ${renderCredentials(data.credentials)}
          </div>

          <!-- CTA: reuses .btn-primary from components.css.
               Placed at the natural end of the reading flow —
               the patient has just finished reading her story. -->
          <a href="${data.cta.href}" class="btn-primary">
            ${data.cta.label}
          </a>

        </div>
      </div>
    </section>
  `
}