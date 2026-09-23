export interface ContactDetail {
  icon:   string
  label:  string
  value:  string
  href?:  string
}

export interface ContactWhatsApp {
  label:    string
  href:     string
  // Not read by the renderer — kept as a plain reference so the real
  // number is easy to restore after `href` is swapped for testing.
  hrefOriginal?: string
  sublabel: string
}

export interface ContactForm {
  title:       string
  subtitle:    string
  submitLabel: string
  legal:       string
  motivos:     string[]
}

export interface ContactReassurance {
  responseTime: string
  privacy:      string
}

// Structured fields for schema.org markup — not rendered directly on the
// page (the free-text `details` array already covers that), just the
// machine-readable shape Physician/PostalAddress/OpeningHoursSpecification
// need.
export interface ContactSchemaAddress {
  street:     string
  locality:   string
  region:     string
  postalCode: string
}

export interface ContactSchemaHours {
  days:   string[]
  opens:  string
  closes: string
}

export interface ContactSchema {
  telephone: string
  address:   ContactSchemaAddress
  hours:     ContactSchemaHours
}

export interface ContactData {
  eyebrow:      string
  title:        string
  titleItalic:  string
  description:  string
  details:      ContactDetail[]
  whatsapp:     ContactWhatsApp
  reassurance:  ContactReassurance
  form:         ContactForm
  schema:       ContactSchema
}