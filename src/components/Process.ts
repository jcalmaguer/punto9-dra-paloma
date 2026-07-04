import processData from '../data/process.json'
import { renderProcess } from '../logic/processRenderer'
import type { ProcessData } from '../types/types'

export function mountProcess(containerId: string): void {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`[Process] Container #${containerId} not found`)
    return
  }
  container.innerHTML = renderProcess(processData as ProcessData)
}