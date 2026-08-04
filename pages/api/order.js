/**
 * Cart checkout endpoint.
 *
 * Takes the basket a visitor built on the site and emails it to the sales
 * desk. It takes no payment and stores nothing: the order is a structured
 * enquiry, and the reply that follows is where scope and price are agreed.
 *
 * Totals are recalculated here from the line items rather than trusted from
 * the browser, so the figure in the email is one we computed. The client's
 * total is only used to flag a mismatch worth a human glance.
 *
 * Configure RESEND_API_KEY, ORDER_TO_EMAIL (or CONTACT_TO_EMAIL) and
 * CONTACT_FROM_EMAIL in the deployment environment.
 */

import { salesTax } from '../../lib/pricing'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const requests = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (requests.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000)
  recent.push(now)
  requests.set(ip, recent)
  return recent.length > 6
}

const round2 = (n) => Math.round(n * 100) / 100
const cash = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

/** Cleans one submitted line down to the fields we are willing to print. */
function cleanLine(raw) {
  const price = Number(raw?.price)
  const qty = Math.round(Number(raw?.qty))
  if (!raw?.name || !Number.isFinite(price) || price < 0 || !Number.isFinite(qty) || qty < 1) return null

  return {
    name: String(raw.name).trim().slice(0, 160),
    kind: String(raw.kind || 'Package').trim().slice(0, 60),
    price: round2(price),
    qty: Math.min(99, qty),
    per: raw.per ? String(raw.per).trim().slice(0, 30) : null,
    from: Boolean(raw.from),
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const contentLength = Number(req.headers['content-length'] || 0)
  if (contentLength > 60_000) return res.status(413).json({ error: 'That order is too large to send. Please call us.' })

  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim()
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Too many requests. Please try again shortly.' })

  const { name, email, phone, company, message, items, totals, website } = req.body || {}

  // Honeypot, same as the contact form: bots fill hidden fields.
  if (website) return res.status(200).json({ ok: true })

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ error: 'Please enter your name.' })
  }
  if (!email || !EMAIL_RE.test(String(email))) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Your cart is empty.' })
  }
  if (items.length > 40) {
    return res.status(400).json({ error: 'That is more items than we can take online. Please call us.' })
  }

  const lines = items.map(cleanLine).filter(Boolean)
  if (lines.length === 0) return res.status(400).json({ error: 'We could not read your cart. Please try again.' })

  const oneOff = lines.filter((l) => !l.per)
  const recurring = lines.filter((l) => l.per)
  const sum = (list) => round2(list.reduce((n, l) => n + l.price * l.qty, 0))

  const subtotal = sum(oneOff)
  const tax = round2(subtotal * (salesTax.rate / 100))
  const total = round2(subtotal + tax)
  const recurringSubtotal = sum(recurring)
  const recurringTotal = round2(recurringSubtotal * (1 + salesTax.rate / 100))

  const clientTotal = Number(totals?.total)
  const mismatch = Number.isFinite(clientTotal) && Math.abs(clientTotal - total) > 0.01

  const order = {
    receivedAt: new Date().toISOString(),
    name: String(name).trim().slice(0, 120),
    email: String(email).trim().slice(0, 160),
    phone: String(phone || '').trim().slice(0, 40),
    company: String(company || '').trim().slice(0, 160),
    message: String(message || '').trim().slice(0, 3000),
  }

  const body = [
    `Name: ${order.name}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone || 'Not provided'}`,
    `Business: ${order.company || 'Not provided'}`,
    '',
    `Items (${lines.reduce((n, l) => n + l.qty, 0)}):`,
    ...lines.map(
      (l, i) =>
        `${i + 1}. ${l.name} (${l.kind}) — ${l.qty} x ${l.from ? 'from ' : ''}${cash(l.price)}${
          l.per ? ` ${l.per}` : ''
        } = ${cash(round2(l.price * l.qty))}${l.per ? ` ${l.per}` : ''}`
    ),
    '',
    `Subtotal: ${cash(subtotal)}`,
    `${salesTax.label} (${salesTax.rate}%): ${cash(tax)}`,
    `Total: ${cash(total)}`,
    ...(recurring.length
      ? ['', `Monthly items: ${cash(recurringSubtotal)} before tax, ${cash(recurringTotal)} with tax, per month`]
      : []),
    ...(lines.some((l) => l.from)
      ? ['', 'Contains "from" prices — the total above is an estimate and needs confirming.']
      : []),
    ...(mismatch ? ['', `NOTE: the browser showed ${cash(clientTotal)}. Server total is ${cash(total)}.`] : []),
    '',
    'Notes:',
    order.message || 'None provided.',
    '',
    `Received: ${order.receivedAt}`,
  ].join('\n')

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ORDER_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'sales@logoorbit.net'
  const from = process.env.CONTACT_FROM_EMAIL || 'LogoOrbit Website <website@logoorbit.net>'

  // Without a mail key the order cannot be delivered, and saying so plainly
  // matters more than a fake success: the checkout page still offers WhatsApp
  // and the phone, both of which work regardless.
  if (!apiKey) {
    return res
      .status(503)
      .json({ error: 'Online ordering is temporarily unavailable. Please send it on WhatsApp or call us.' })
  }

  const delivery = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to,
      reply_to: order.email,
      subject: `Website order — ${order.name}, ${lines.length} item${lines.length === 1 ? '' : 's'}, ${cash(total)}`,
      text: body,
    }),
  })

  if (!delivery.ok) {
    console.error('[order] email delivery failed', delivery.status)
    return res.status(502).json({ error: 'We could not send your order. Please use WhatsApp or call us instead.' })
  }

  return res.status(200).json({ ok: true, total })
}
