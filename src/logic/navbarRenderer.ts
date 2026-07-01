import type { NavbarData, NavLink } from '../types'

// SVG de neurona: nodo central con axones irradiando — evoca neurología sin ser un cerebro literal
const NEURO_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round">
    <circle cx="12" cy="12" r="2.5"/>
    <circle cx="4"  cy="6"  r="1.5"/>
    <circle cx="20" cy="6"  r="1.5"/>
    <circle cx="4"  cy="18" r="1.5"/>
    <circle cx="20" cy="18" r="1.5"/>
    <circle cx="12" cy="3"  r="1.5"/>
    <circle cx="12" cy="21" r="1.5"/>
    <line x1="12" y1="9.5"  x2="12" y2="4.5"/>
    <line x1="12" y1="14.5" x2="12" y2="19.5"/>
    <line x1="9.8"  y1="10.8" x2="5.5"  y2="7.2"/>
    <line x1="14.2" y1="10.8" x2="18.5" y2="7.2"/>
    <line x1="9.8"  y1="13.2" x2="5.5"  y2="16.8"/>
    <line x1="14.2" y1="13.2" x2="18.5" y2="16.8"/>
  </svg>
`

function renderLinks(links: NavLink[]): string {
  return links
    .map(link => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join('')
}

export function renderNavbar(data: NavbarData): string {
  return `
    <nav>
      <a href="#" class="nav-brand">
        <div class="nav-logo">
          ${NEURO_ICON}
        </div>
        <div class="nav-name">
          ${data.brand.name}
          <span>${data.brand.specialty}</span>
        </div>
      </a>

      <ul class="nav-links">
        ${renderLinks(data.links)}
      </ul>

      <a href="${data.cta.href}" class="nav-cta">
        ${data.cta.label}
      </a>
    </nav>
  `
}