import contactData from '../data/contact.json'
import { renderContact } from '../logic/contactRenderer'
import type { ContactData } from '../types/types'

export function mountContact(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[Contacto] Container #${containerId} not found`)
    return
  }
  container.innerHTML = renderContact(contactData as ContactData)
}