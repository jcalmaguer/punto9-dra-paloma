export interface ProfileBadge {
  institution: string
  degree:      string
}

export interface ProfileCredential {
  title:  string
  detail: string
}

export interface ProfileTitle {
  italic: string
  normal: string
}

export interface ProfileCta {
  label: string
  href:  string
}

export interface ProfileData {
  initials:    string
  credential:  string
  badge:       ProfileBadge
  title:       ProfileTitle
  bio:         string[]
  credentials: ProfileCredential[]
  cta:         ProfileCta
}