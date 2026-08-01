/**
 * Contact form endpoint.
 *
 * Validates and sends enquiries through Resend. Configure RESEND_API_KEY,
 * CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in the deployment environment.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SERVICE_VALUES = new Set([
  'Logo Design', 'Website Design', 'Video, Animation & YouTube', 'Mobile Applications',
  'Book Publication', 'Amazon Marketing', 'Other', 'Brief: logo', 'Brief: website', 'Brief: video',
])
const requests = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (requests.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000)
  recent.push(now)
  requests.set(ip, recent)
  return recent.length > 5
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const contentLength = Number(req.headers['content-length'] || 0)
  if (contentLength > 20_000) return res.status(413).json({ error: 'Request is too large.' })

  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim()
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Too many requests. Please try again shortly.' })

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
  const to = process.env.CONTACT_TO_EMAIL || 'legal@logoorbit.net'
  const from = process.env.CONTACT_FROM_EMAIL || 'LogoOrbit Website <website@logoorbit.net>'
  if (!apiKey) return res.status(503).json({ error: 'Online enquiries are temporarily unavailable. Please call or email us.' })

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

  return res.status(200).json({ ok: true })
}
