import profileData from '../data/profile.json'
import { renderProfile } from '../logic/profileRenderer'
import type { ProfileData } from '../types/types'

export function mountProfile(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[Profile] Container #${containerId} not found`)
    return
  }
  container.innerHTML = renderProfile(profileData as ProfileData)
}