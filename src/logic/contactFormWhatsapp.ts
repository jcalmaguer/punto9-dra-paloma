// Routes the appointment-request form to WhatsApp instead of a backend
// that doesn't exist yet: on submit, builds a prefilled message from the
// form fields and opens it in wa.me, addressed to the practice's number.
// Called by Contact.ts after the HTML is mounted.

function field(data: FormData, name: string): string {
  return (data.get(name) as string | null)?.trim() ?? ''
}

export function initContactForm(containerId: string, whatsappHref: string): void {
  const container = document.getElementById(containerId)
  const form = container?.querySelector<HTMLFormElement>('#contact-form')
  if (!form) return

  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault()

    // reportValidity() still runs the Constraint Validation API (required,
    // type="email", etc.) and shows the native bubbles even though the
    // form carries novalidate — that attribute only suppresses the
    // automatic check on a native (non-JS) submit.
    if (!form.reportValidity()) return

    const data = new FormData(form)

    const lines = [
      'Hola, quisiera agendar una consulta.',
      '',
      `Nombre: ${field(data, 'name')}`,
      `Teléfono: ${field(data, 'phone')}`,
      `Correo: ${field(data, 'email')}`,
      `Motivo de consulta: ${field(data, 'motivo')}`,
    ]

    const mensaje = field(data, 'mensaje')
    if (mensaje) {
      lines.push(`Mensaje: ${mensaje}`)
    }

    const url = `${whatsappHref}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener,noreferrer')
    form.reset()
  })
}
