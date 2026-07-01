export interface NavbarBrand {
  name:      string
  specialty: string
}

export interface NavLink {
  label: string
  href:  string
}

export interface NavbarData {
  brand: NavbarBrand   // ← reemplaza "logo: string", que no corresponde al diseño
  links: NavLink[]
  cta:   NavLink
}