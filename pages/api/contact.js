/**
 * Contact form endpoint.
 *
 * Validates and sends enquiries through Resend. Configure RESEND_API_KEY,
 * CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in the deployment environment.
 */

import { deskRecipients } from '../../lib/notify'
import { clientIp, isRateLimited } from '../../lib/ratelimit'
import { services } from '../../lib/site'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * What the form is allowed to say it is about.
 *
 * Derived from the same list the select is built from rather than typed out
 * again. The two copies had not drifted yet, but the failure mode if they ever
 * did is silent and bad: adding a service to lib/site puts a new option in the
 * dropdown that this endpoint then rejects as invalid, and the visitor is told
 * to "select a service" by a form on which they already have.
 */
const SERVICE_VALUES = new Set([
  ...services.map((s) => s.name),
  'Other',
  'Brief: logo',
  'Brief: website',
  'Brief: video',
])

// The Content-Length check below is advisory — it is a client-supplied header
// and a chunked request has none — so the real ceiling is set here.
export const config = { api: { bodyParser: { sizeLimit: '64kb' } } }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const contentLength = Number(req.headers['content-length'] || 0)
  if (contentLength > 20_000) return res.status(413).json({ error: 'Request is too large.' })

  if (isRateLimited(`contact:${clientIp(req)}`)) {
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' })
  }

  const { name, email, phone, service, message, consent, website } = req.body || {}

  // Bots commonly fill fields hidden from people; return success without sending.
  if (website) return res.status(200).json({ ok: true })

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ error: 'Please enter your name.' })
  }
  if (!email || !EMAIL_RE.test(String(email))) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }
  if (!service || !SERVICE_VALUES.has(String(service))) {
    return res.status(400).json({ error: 'Please select a service.' })
  }
  if (!consent) {
    return res.status(400).json({ error: 'Please accept the privacy policy and terms to continue.' })
  }

  const enquiry = {
    receivedAt: new Date().toISOString(),
    name: String(name).trim().slice(0, 120),
    email: String(email).trim().slice(0, 160),
    phone: String(phone || '').trim().slice(0, 40),
    service: String(service).slice(0, 80),
    message: String(message || '').trim().slice(0, 4000),
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = deskRecipients(process.env.CONTACT_TO_EMAIL, ['support@logoorbit.net'])
  const from = process.env.CONTACT_FROM_EMAIL || 'LogoOrbit Website <website@logoorbit.net>'
  if (!apiKey) return res.status(503).json({ error: 'Online enquiries are temporarily unavailable. Please call or email us.' })

  // The enquiry is written out before the send is attempted, so an enquiry is
  // recoverable from the deployment log on the day the mail provider is down
  // rather than lost with the request.
  console.log(`[contact] ${enquiry.service} from ${enquiry.name} <${enquiry.email}>`)

  /* This call was previously unguarded. Resend being unreachable — DNS, a
     dropped connection, the request timing out — throws rather than returning
     a response, and the throw escaped the handler: the visitor got a bare 500
     with an HTML body, and the form, which expects JSON, showed them a parser
     error instead of anything they could act on. */
  try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: enquiry.email,
        subject: `New ${enquiry.service} enquiry from ${enquiry.name}`,
        text: [
          `Name: ${enquiry.name}`, `Email: ${enquiry.email}`, `Phone: ${enquiry.phone || 'Not provided'}`,
          `Service: ${enquiry.service}`, '', enquiry.message || 'No message provided.', '', `Received: ${enquiry.receivedAt}`,
        ].join('\n'),
      }),
    })

    if (!delivery.ok) {
      console.error('[contact] email delivery failed', delivery.status)
      return res.status(502).json({ error: 'We could not send your enquiry. Please call or email us instead.' })
    }
  } catch (error) {
    console.error('[contact] email delivery threw', error)
    return res.status(502).json({ error: 'We could not send your enquiry. Please call or email us instead.' })
  }

  return res.status(200).json({ ok: true })
}
