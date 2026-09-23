export interface PrivacyBlock {
  paragraph?: string
  list?:      string[]
}

export interface PrivacySection {
  heading: string
  blocks:  PrivacyBlock[]
}

export interface PrivacyData {
  title:      string
  updated:    string
  // ISO 8601 date, used only for the schema.org dateModified field —
  // `updated` above is the human-readable string shown on the page.
  updatedISO: string
  intro:      string
  sections:   PrivacySection[]
}
