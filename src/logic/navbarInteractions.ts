// Encapsulates navbar interaction logic: mobile menu toggle + scroll shadow.
// Called by Navbar.ts after the HTML is mounted.
// No external dependencies — pure DOM + event listeners.

export function initNavbarInteractions(containerId: string): void {
  const root = document.getElementById(containerId)
  const nav  = root?.querySelector<HTMLElement>('.site-nav')
  if (!nav) return

  const toggle = nav.querySelector<HTMLButtonElement>('.nav-toggle')
  const links  = nav.querySelector<HTMLElement>('.nav-links')

  // ── Mobile menu toggle ────────────────────────────────────────────────────

  if (toggle && links) {
    const close = (): void => {
      toggle.classList.remove('nav-toggle--open')
      toggle.setAttribute('aria-expanded', 'false')
      links.classList.remove('nav-links--open')
    }

    const open = (): void => {
      toggle.classList.add('nav-toggle--open')
      toggle.setAttribute('aria-expanded', 'true')
      links.classList.add('nav-links--open')
    }

    toggle.addEventListener('click', () => {
      links.classList.contains('nav-links--open') ? close() : open()
    })

    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close))

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    })

    document.addEventListener('click', (e: MouseEvent) => {
      if (!nav.contains(e.target as Node)) close()
    })
  }

  // ── Scroll shadow ──────────────────────────────────────────────────────────
  // Gives the fixed nav a subtle elevation once the hero background
  // scrolls away, instead of a hard-edged bar floating over content.

  const onScroll = (): void => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 8)
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}
