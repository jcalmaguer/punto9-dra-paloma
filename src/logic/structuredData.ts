// Injects schema.org JSON-LD into <head> at mount time. This is a DOM
// side effect (like the `document.title` assignments in the page
// components), so it lives here rather than in the pure *Renderer.ts
// functions, and is called from each page's mount step.
import contactData from '../data/contact.json'
import footerData from '../data/footer.json'
import profileData from '../data/profile.json'
import type {
  ContactData,
  FooterData,
  ProfileData,
  SpecialtyItem,
  SpecialtyDetailItem,
  PrivacyData,
} from '../types/types'

function setJsonLd(id: string, data: Record<string, unknown>): void {
  document.getElementById(id)?.remove()
  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

function absoluteUrl(path: string): string {
  return new URL(path, window.location.origin).href
}

function breadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  }
}

// ── Home page ────────────────────────────────────────────────────────────

// Physician is the core local-SEO schema: name, specialty, address, phone
// and hours in one machine-readable block, sourced from the same JSON
// already used to render the contact section and profile bio.
export function injectHomeSchema(): void {
  const contact = contactData as ContactData
  const footer  = footerData as FooterData
  const profile = profileData as ProfileData

  setJsonLd('ld-physician', {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: footer.name,
    description: profile.bio[0],
    medicalSpecialty: 'Neurology',
    url: absoluteUrl('/index.html'),
    telephone: contact.schema.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.schema.address.street,
      addressLocality: contact.schema.address.locality,
      addressRegion: contact.schema.address.region,
      postalCode: contact.schema.address.postalCode,
      addressCountry: 'MX',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: contact.schema.hours.days,
      opens: contact.schema.hours.opens,
      closes: contact.schema.hours.closes,
    },
  })
}

// ── Specialty detail page ───────────────────────────────────────────────

export function injectSpecialtyPageSchema(item: SpecialtyItem, detail: SpecialtyDetailItem): void {
  const path = `/especialidad.html?id=${item.id}`

  setJsonLd('ld-medical-condition', {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: item.title,
    url: absoluteUrl(path),
    about: {
      '@type': 'MedicalCondition',
      name: item.title,
      description: detail.overview,
      signOrSymptom: detail.symptoms.map(s => ({
        '@type': 'MedicalSignOrSymptom',
        name: s,
      })),
    },
  })

  if (detail.faqs.length) {
    setJsonLd('ld-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: detail.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
  }

  setJsonLd('ld-breadcrumb', breadcrumbSchema([
    { name: 'Inicio', path: '/index.html' },
    { name: 'Especialidades', path: '/index.html#especialidades' },
    { name: item.title, path },
  ]))
}

// ── Privacy page ─────────────────────────────────────────────────────────

export function injectPrivacyPageSchema(data: PrivacyData): void {
  setJsonLd('ld-webpage', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.title,
    description: data.intro,
    url: absoluteUrl('/aviso-privacidad.html'),
    dateModified: data.updatedISO,
  })

  setJsonLd('ld-breadcrumb', breadcrumbSchema([
    { name: 'Inicio', path: '/index.html' },
    { name: data.title, path: '/aviso-privacidad.html' },
  ]))
}
