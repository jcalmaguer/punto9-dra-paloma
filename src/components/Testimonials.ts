import testimonialData from '../data/testimonials.json'
import { renderTestimonials } from '../logic/testimonialsRenderer'
import type { TestimonialData } from '../types/types'

export function mountTestimonials(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[Testimonios] Container #${containerId} not found`)
    return
  }
  container.innerHTML = renderTestimonials(testimonialData as TestimonialData)
}