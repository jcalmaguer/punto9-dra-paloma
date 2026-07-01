import navbarData from '../data/navbar.json'
import { renderNavbar } from '../logic/navbarRenderer'
import type { NavbarData } from '../types/types'

export function mountNavbar(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[Navbar] Contenedor #${containerId} no encontrado`)
    return
  }
  container.innerHTML = renderNavbar(navbarData as NavbarData)
}