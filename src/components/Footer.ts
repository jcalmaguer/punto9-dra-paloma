import footerData from '../data/footer.json'
import { renderFooter } from '../logic/footerRenderer'
import type { FooterData } from '../types/types'

export function mountFooter(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[Footer] Container #${containerId} not found`)
    return
  }
  container.innerHTML = renderFooter(footerData as FooterData)
}