import type { TestimonialData, TestimonialItem } from '../types/types'

// Generates star icons from a numeric rating.
// Filled stars use the gold token; empty stars use a muted border.
// Returns accessible HTML with aria-label on the container.
function renderStars(rating: number): string {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < rating
    return `<span class="star ${filled ? 'star--filled' : 'star--empty'}"
                  aria-hidden="true">★</span>`
  }).join('')

  return `
    <div class="testi-stars" role="img" aria-label="Calificación: ${rating} de 5 estrellas">
      ${stars}
      <span class="testi-rating-num">${rating}.0</span>
    </div>
  `
}

function renderCard(item: TestimonialItem): string {
  return `
    <article class="testi-card">

      <!-- Decorative quote mark: background watermark, not readable content.
           Pure CSS via ::before — no markup needed here. -->

      ${renderStars(item.rating)}

      <!-- blockquote: semantically correct for quoted patient speech.
           The condition pill inside lets patients self-identify
           with a specific neurological diagnosis at a glance. -->
      <blockquote class="testi-quote">
        <span class="testi-condition">${item.condition}</span>
        "${item.quote}"
      </blockquote>

      <!-- footer: author attribution inside an article is semantically
           correct per the HTML spec. -->
      <footer class="testi-author">
        <div class="testi-avatar" aria-hidden="true">${item.initials}</div>
        <div class="testi-meta">
          <div class="testi-name">${item.name}</div>
          <div class="testi-info">${item.details}</div>
        </div>
      </footer>

    </article>
  `
}

export function renderTestimonials(data: TestimonialData): string {
  return `
    <section class="section section-white" id="testimonios">

      <header class="section-header">
        <span class="eyebrow">${data.eyebrow}</span>
        <h2 class="section-title">
          ${data.title.normal} <em>${data.title.italic}</em>
        </h2>
        <div class="divider"></div>
      </header>

      <div class="testimonials-grid">
        ${data.testimonials.map(renderCard).join('')}
      </div>

    </section>
  `
}