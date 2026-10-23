import { clientIp } from '../../../lib/ratelimit'
import { startCheckout, validToken } from '../../../lib/crmPay'

// Pay button → CRM → Stripe Checkout URL.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { token } = req.query
  if (!validToken(token)) return res.status(404).json({ error: 'Invoice not found' })
  try {
    const { status, data } = await startCheckout(token, clientIp(req))
    if (status !== 200 || !data.url) {
      return res.status(status === 200 ? 502 : status).json({ error: data.error || 'Online payment is temporarily unavailable.' })
    }
    return res.status(200).json({ url: data.url })
  } catch {
    return res.status(502).json({ error: 'Online payment is temporarily unavailable.' })
  }
}
