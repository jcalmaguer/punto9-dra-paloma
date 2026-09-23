import specialtiesData from '../data/specialties.json'
import specialtyDetailsData from '../data/specialtyDetails.json'
import contactData from '../data/contact.json'
import { renderSpecialtyDetail, renderSpecialtyNotFound } from '../logic/specialtyDetailRenderer'
import { injectSpecialtyPageSchema } from '../logic/structuredData'
import type { SpecialtiesData, SpecialtyDetailData, ContactData } from '../types/types'

export function mountSpecialtyDetail(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[SpecialtyDetail] Contenedor #${containerId} no encontrado`)
    return
  }

  const data   = specialtiesData as SpecialtiesData
  const detail = specialtyDetailsData as SpecialtyDetailData
  const contact = contactData as ContactData

  const id   = new URLSearchParams(window.location.search).get('id')
  const item = data.items.find(i => i.id === id)
  const info = detail.items.find(d => d.id === id)

  if (!item || !info) {
    container.innerHTML = renderSpecialtyNotFound()
    document.title = 'Especialidad no encontrada | Dra. Paloma Durán'
    return
  }

  const related = data.items.filter(i => i.id !== id)

  container.innerHTML = renderSpecialtyDetail(item, info, related, contact.whatsapp.href)
  document.title = `${item.title} | Dra. Paloma Durán — Neurología Clínica`
  injectSpecialtyPageSchema(item, info)
}
