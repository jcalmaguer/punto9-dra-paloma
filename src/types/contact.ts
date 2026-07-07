export interface ContactDetail {
  icon:   string
  label:  string
  value:  string
  href?:  string
}

export interface ContactWhatsApp {
  label:    string
  href:     string
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

export interface ContactData {
  eyebrow:      string
  title:        string
  titleItalic:  string
  description:  string
  details:      ContactDetail[]
  whatsapp:     ContactWhatsApp
  reassurance:  ContactReassurance
  form:         ContactForm
}