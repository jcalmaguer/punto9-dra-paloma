// Encapsulates all carousel interaction logic.
// Called by Testimonios.ts after the HTML is mounted.
// No external dependencies — pure DOM + event listeners.

const SWIPE_THRESHOLD = 50  // px — minimum drag to register as swipe
const TRANSITION_MS   = 420 // must match CSS transition duration

export function initCarousel(sectionId: string): void {
  const section = document.getElementById(sectionId)
  if (!section) return

  const track   = section.querySelector<HTMLElement>('.carousel__track')
  const slides  = section.querySelectorAll<HTMLElement>('.testi-card')
  const dots    = section.querySelectorAll<HTMLButtonElement>('.carousel__dot')
  const btnPrev = section.querySelector<HTMLButtonElement>('.carousel__btn--prev')
  const btnNext = section.querySelector<HTMLButtonElement>('.carousel__btn--next')
  const carousel = section.querySelector<HTMLElement>('.carousel')

  if (!track || !slides.length || !carousel) return

  let current    = 0
  let isAnimating = false
  const total    = slides.length

  // ── Core navigation ───────────────────────────────────────────────────────

  function goTo(index: number): void {
    if (isAnimating) return

    isAnimating = true
    current = ((index % total) + total) % total

    // Slide the track
    track!.style.transform = `translateX(-${current * 100}%)`

    // Sync dots
    dots.forEach((dot, i) => {
      const active = i === current
      dot.classList.toggle('carousel__dot--active', active)
      dot.setAttribute('aria-selected', String(active))
    })

    // Sync aria-hidden on slides — screen readers skip hidden slides
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', String(i !== current))
    })

    setTimeout(() => { isAnimating = false }, TRANSITION_MS)
  }

  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  // ── Button listeners ──────────────────────────────────────────────────────

  btnNext?.addEventListener('click', next)
  btnPrev?.addEventListener('click', prev)

  // ── Dot listeners ─────────────────────────────────────────────────────────

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i))
  })

  // ── Keyboard navigation ───────────────────────────────────────────────────

  // Scoped to the carousel container so it doesn't interfere with
  // page-level keyboard shortcuts when the carousel is not focused.
  carousel.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
  })

  // ── Touch / swipe support ─────────────────────────────────────────────────

  let touchStartX = 0
  let touchStartY = 0

  track.addEventListener('touchstart', (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX
    touchStartY = e.changedTouches[0].screenY
  }, { passive: true })

  track.addEventListener('touchend', (e: TouchEvent) => {
    const deltaX = touchStartX - e.changedTouches[0].screenX
    const deltaY = touchStartY - e.changedTouches[0].screenY

    // Only register as horizontal swipe if X movement dominates Y
    // (prevents triggering carousel when the user is scrolling the page)
    if (Math.abs(deltaX) > Math.abs(deltaY) &&
        Math.abs(deltaX) > SWIPE_THRESHOLD) {
      deltaX > 0 ? next() : prev()
    }
  }, { passive: true })

  // ── Initialize ────────────────────────────────────────────────────────────

  goTo(0)
}