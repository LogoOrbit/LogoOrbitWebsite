import { clientIp } from '../../../lib/ratelimit'
import { startCheckout, validToken } from '../../../lib/crmPay'

/**
 * Pay button → CRM → Stripe Checkout.
 *
 * GET is what the button links to: it works the instant the page appears,
 * before (or without) JavaScript, and answers with a redirect to Stripe. On
 * failure it sends the visitor back to the invoice with a message.
 * POST returns the URL as JSON for scripted callers.
 */
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { token } = req.query
  if (!validToken(token)) return res.status(404).json({ error: 'Invoice not found' })

  let status = 502
  let data = {}
  try {
    ;({ status, data } = await startCheckout(token, clientIp(req)))
  } catch {
    data = {}
  }
  const ok = status === 200 && typeof data.url === 'string' && data.url.startsWith('https://checkout.stripe.com/')

  if (req.method === 'GET') {
    if (ok) return res.redirect(303, data.url)
    const reason = status === 409 ? 'closed' : 'unavailable'
    return res.redirect(303, `/pay/${encodeURIComponent(token)}?error=${reason}`)
  }
  if (!ok) {
    return res.status(status === 200 ? 502 : status).json({ error: data.error || 'Online payment is temporarily unavailable.' })
  }
  return res.status(200).json({ url: data.url })
}
