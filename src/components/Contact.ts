import contactData from '../data/contact.json'
import { renderContact } from '../logic/contactRenderer'
import { initContactForm } from '../logic/contactFormWhatsapp'
import type { ContactData } from '../types/types'

export function mountContact(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[Contacto] Container #${containerId} not found`)
    return
  }
  const data = contactData as ContactData
  container.innerHTML = renderContact(data)
  initContactForm(containerId, data.whatsapp.href)
}