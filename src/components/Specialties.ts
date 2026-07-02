import specialtiesData from '../data/specialties.json'
import { renderSpecialties } from '../logic/specialtiesRenderer'
import type { SpecialtiesData } from '../types/types'

export function mountSpecialties(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[Especialidades] Container #${containerId} not found`)
    return
  }
  container.innerHTML = renderSpecialties(specialtiesData as SpecialtiesData)
}