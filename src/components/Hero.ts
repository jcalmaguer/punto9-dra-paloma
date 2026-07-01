import heroData from '../data/hero.json'
import { renderHero } from '../logic/heroRenderer'
import type { HeroData } from '../types/types'

export function mountHero(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[Hero] Contenedor #${containerId} no encontrado`)
    return
  }
  container.innerHTML = renderHero(heroData as HeroData)
}