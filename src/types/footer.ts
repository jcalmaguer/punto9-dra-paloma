export interface FooterLink {
    text: string
    href: string
}

export interface FooterColumn {
    title: string
    links: FooterLink[]
}

export interface FooterSocial {
    id: string
    href: string
    label: string
}

export interface FooterData {
    name: string
    specialty: string
    description: string
    cedula: string,
    columns: FooterColumn[]
    social: FooterSocial[]
    copyright: string
}