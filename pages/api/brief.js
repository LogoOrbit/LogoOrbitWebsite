/**
 * Brief endpoint for the logo and website brief forms in /public/brief.
 *
 * The form builds the PDF in the browser with jsPDF, so the client can keep a
 * copy without waiting on us, and posts that same document here as base64. We
 * attach it to the email, which means the copy in our inbox is byte-identical
 * to the one the client downloaded rather than a link that has to be resolved
 * later. Configure RESEND_API_KEY and, optionally, BRIEF_TO_EMAIL and
 * CONTACT_FROM_EMAIL in the deployment environment.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TYPES = { logo: 'Logo', website: 'Website' }

// A text-only jsPDF brief runs to a few tens of kilobytes. Base64 inflates it
// by a third, so this leaves room for a long brief and still refuses anything
// that could only be an attempt to post something else through the form.
const MAX_PDF_BYTES = 3 * 1024 * 1024

const requests = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (requests.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000)
  recent.push(now)
  requests.set(ip, recent)
  return recent.length > 5
}

const clean = (value, max) => String(value == null ? '' : value).trim().slice(0, max)

export const config = { api: { bodyParser: { sizeLimit: '5mb' } } }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown')
    .split(',')[0]
    .trim()
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again shortly.' })
  }

  const body = req.body || {}
  const type = TYPES[body.type] ? body.type : null
  const name = clean(body.name, 120)
  const email = clean(body.email, 160)
  const company = clean(body.company, 160)
  const summary = clean(body.summary, 8000)
  const brief = clean(body.brief, 40000)

  if (!type) return res.status(400).json({ error: 'Unknown brief type.' })
  if (!name) return res.status(400).json({ error: 'Please tell us your name.' })
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' })

  // The PDF is optional on purpose: if jsPDF fails on an old browser we would
  // rather deliver the brief as text than lose the enquiry altogether.
  const attachments = []
  const pdfBase64 = typeof body.pdfBase64 === 'string' ? body.pdfBase64.replace(/\s/g, '') : ''
  if (pdfBase64) {
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(pdfBase64)) {
      return res.status(400).json({ error: 'The attached brief could not be read.' })
    }
    if (Buffer.byteLength(pdfBase64, 'utf8') > MAX_PDF_BYTES) {
      return res.status(413).json({ error: 'The attached brief is too large.' })
    }
    const filename = clean(body.filename, 120).replace(/[^A-Za-z0-9._-]/g, '') || `LogoOrbit-${TYPES[type]}-Brief.pdf`
    attachments.push({ filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`, content: pdfBase64 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.BRIEF_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'support@logoorbit.net'
  const from = process.env.CONTACT_FROM_EMAIL || 'LogoOrbit Website <website@logoorbit.net>'
  if (!apiKey) {
    return res.status(503).json({ error: 'Briefs are temporarily unavailable. Please call or email us.' })
  }

  const who = company || name
  const lines = [
    `${TYPES[type]} brief from ${who}`,
    '',
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    '',
    'WHAT THE CLIENT WANTS',
    summary || '(not provided)',
    '',
    'FULL BRIEF',
    brief || '(not provided)',
    '',
    attachments.length
      ? 'The same brief is attached as a PDF, and the client has downloaded a copy.'
      : 'No PDF was attached, the client’s browser could not build one.',
  ].filter((line) => line !== null)

  try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New ${TYPES[type]} Brief - ${who}`,
        text: lines.join('\n'),
        attachments,
      }),
    })

    if (!delivery.ok) {
      console.error('[brief] email delivery failed', delivery.status)
      return res.status(502).json({ error: 'We could not send your brief. Please try again.' })
    }
  } catch (error) {
    console.error('[brief] email delivery threw', error)
    return res.status(502).json({ error: 'We could not send your brief. Please try again.' })
  }

  return res.status(200).json({ ok: true })
}
