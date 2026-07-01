export interface HeroTitle {
  italic: string
  normal: string
}

export interface HeroLink {
  label: string
  href:  string
}

export interface HeroCta {
  primary:  HeroLink
  whatsapp: HeroLink
}

export interface HeroPhoto {
  initials: string
  name:     string
  license:  string
}

export interface HeroStat {
  value:  string
  suffix: string
  label:  string
}

export interface HeroData {
  badge:       string
  title:       HeroTitle
  specialty:   string
  description: string
  cta:         HeroCta
  photo:       HeroPhoto
  stats:       HeroStat[]
}