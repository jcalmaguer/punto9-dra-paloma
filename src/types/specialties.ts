export interface SpecialtyItem {
  id:          string
  icon:        string   // key del mapa de SVGs en el renderer
  title:       string
  description: string
}

export interface SpecialtiesData {
  eyebrow: string
  title: {
    normal: string
    italic: string
  }
  subtitle: string
  items: SpecialtyItem[]
}