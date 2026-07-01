export interface NavLink {
  label: string
  href:  string
}

export interface NavbarData {
  brand: {
    name:      string
    specialty: string
  }
  links: NavLink[]
  cta:   NavLink
}