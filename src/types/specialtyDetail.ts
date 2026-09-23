export interface SpecialtyFaq {
  question: string
  answer:   string
}

export interface SpecialtyDetailItem {
  id:            string  // matches SpecialtyItem.id in specialties.json
  overview:      string
  symptoms:      string[]
  whenToConsult: string
  approach:      string
  faqs:          SpecialtyFaq[]
}

export interface SpecialtyDetailData {
  items: SpecialtyDetailItem[]
}
