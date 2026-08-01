/**
 * Contact form endpoint.
 *
 * This validates and records the enquiry. It does NOT yet send email  
 * to deliver enquiries to support@logoorbit.net, plug an email provider in
 * where marked below (e.g. Resend, SendGrid, Postmark) and add the API key
 * as a Vercel environment variable.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, service, message, consent } = req.body || {}

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ error: 'Please enter your name.' })
  }
  if (!email || !EMAIL_RE.test(String(email))) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }
  if (!service) {
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

  // Visible in the Vercel runtime logs for this function.
  console.log('[contact] new enquiry', enquiry)

  // TODO: forward to support@logoorbit.net via your email provider, e.g.
  //
  //   await fetch('https://api.resend.com/emails', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       from: 'website@logoorbit.net',
  //       to: 'support@logoorbit.net',
  //       subject: `New ${enquiry.service} enquiry from ${enquiry.name}`,
  //       text: JSON.stringify(enquiry, null, 2),
  //     }),
  //   })

  return res.status(200).json({ ok: true })
}
