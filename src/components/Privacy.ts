import privacyData from '../data/privacy.json'
import { renderPrivacy } from '../logic/privacyRenderer'
import { injectPrivacyPageSchema } from '../logic/structuredData'
import type { PrivacyData } from '../types/types'

export function mountPrivacy(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[Privacy] Contenedor #${containerId} no encontrado`)
    return
  }
  const data = privacyData as PrivacyData
  container.innerHTML = renderPrivacy(data)
  document.title = `${data.title} | Dra. Paloma Durán Botello`
  injectPrivacyPageSchema(data)
}
