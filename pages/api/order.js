/**
 * Cart checkout endpoint.
 *
 * Takes the basket a visitor built on the site, gives it an order number, and
 * emails it to the sales desk and back to the customer. It takes no payment:
 * the order is a structured enquiry, and the reply that follows is where scope
 * and price are agreed.
 *
 * Totals are recalculated here from the line items rather than trusted from
 * the browser, so the figure in the email is one we computed. The client's
 * total is only used to flag a mismatch worth a human glance.
 *
 * An order is never rejected because mail is down. The order number is issued
 * first and always returned, the whole order is written to the server log, and
 * the response says whether the email actually went out so the confirmation
 * screen can ask the customer to send it on WhatsApp as well.
 *
 * Configure RESEND_API_KEY and CONTACT_FROM_EMAIL in the deployment
 * environment. ORDER_TO_EMAIL overrides the recipient list.
 */

import { randomInt } from 'crypto'
import { deskRecipients } from '../../lib/notify'
import { clientIp, isRateLimited } from '../../lib/ratelimit'
import { salesTax } from '../../lib/money'
import { site, whatsapp } from '../../lib/site'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// As with the contact form, Content-Length is advisory and this is the ceiling
// that actually holds. Forty lines of order plus notes fits comfortably.
export const config = { api: { bodyParser: { sizeLimit: '128kb' } } }

const round2 = (n) => Math.round(n * 100) / 100
const cash = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

/**
 * A short order number the customer can read down the phone: LO-260804-4821.
 * The date makes it sortable by eye, the four digits keep two orders placed in
 * the same minute apart.
 */
function newOrderNumber(date) {
  const stamp = [
    String(date.getUTCFullYear()).slice(2),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('')
  return `LO-${stamp}-${String(randomInt(0, 10000)).padStart(4, '0')}`
}

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
    from: Boolean(raw.from),
  }
}

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const contentLength = Number(req.headers['content-length'] || 0)
  if (contentLength > 60_000) return res.status(413).json({ error: 'That order is too big to send. Please call us.' })

  if (isRateLimited(`order:${clientIp(req)}`, 6)) {
    return res.status(429).json({ error: 'Too many tries. Please wait a minute and try again.' })
  }

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

  const subtotal = round2(lines.reduce((n, l) => n + l.price * l.qty, 0))
  const tax = round2(subtotal * (salesTax.rate / 100))
  const total = round2(subtotal + tax)

  const clientTotal = Number(totals?.total)
  const mismatch = Number.isFinite(clientTotal) && Math.abs(clientTotal - total) > 0.01

  const placedAt = new Date()
  const orderNumber = newOrderNumber(placedAt)

  const order = {
    receivedAt: placedAt.toISOString(),
    name: String(name).trim().slice(0, 120),
    email: String(email).trim().slice(0, 160),
    phone: String(phone || '').trim().slice(0, 40),
    company: String(company || '').trim().slice(0, 160),
    message: String(message || '').trim().slice(0, 3000),
  }

  const units = lines.reduce((n, l) => n + l.qty, 0)
  const itemLines = lines.map(
    (l, i) =>
      `${i + 1}. ${l.name} (${l.kind}) - ${l.qty} x ${l.from ? 'from ' : ''}${cash(l.price)} = ${cash(
        round2(l.price * l.qty)
      )}`
  )

  const body = [
    `Order number: ${orderNumber}`,
    '',
    `Name: ${order.name}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone || 'Not provided'}`,
    `Business: ${order.company || 'Not provided'}`,
    '',
    `Items (${units}):`,
    ...itemLines,
    '',
    `Subtotal: ${cash(subtotal)}`,
    `${salesTax.label} (${salesTax.rate}%): ${cash(tax)}`,
    `Total: ${cash(total)}`,
    ...(lines.some((l) => l.from)
      ? ['', 'Contains "from" prices - the total above is an estimate and needs confirming.']
      : []),
    ...(mismatch ? ['', `NOTE: the browser showed ${cash(clientTotal)}. Server total is ${cash(total)}.`] : []),
    '',
    'Notes:',
    order.message || 'None provided.',
    '',
    `Received: ${order.receivedAt}`,
  ].join('\n')

  // Written out whatever happens next, so an order is recoverable from the
  // deployment log even on the day the mail provider is down.
  console.log(`[order] ${orderNumber}\n${body}`)

  /* ------------------------------------------------------- the HTML copy */

  const td = 'padding:10px 12px;border-bottom:1px solid #e6eaf2;font-size:14px;color:#26324f'
  const num = `${td};text-align:right;white-space:nowrap`
  const totalRow = (label, value, strong) =>
    `<tr><td colspan="3" style="${td};text-align:right;${strong ? 'font-weight:700;font-size:16px' : ''}">${esc(
      label
    )}</td><td style="${num};${strong ? 'font-weight:700;font-size:16px' : ''}">${esc(value)}</td></tr>`

  /** The itemised table, shared by both emails so they can never disagree. */
  const itemsTable = `<table style="width:100%;border-collapse:collapse">
    <thead>
      <tr style="background:#f4f6fb">
        <th align="left" style="${td};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5a6480">Item</th>
        <th align="right" style="${num};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5a6480">Qty</th>
        <th align="right" style="${num};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5a6480">Unit</th>
        <th align="right" style="${num};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5a6480">Line</th>
      </tr>
    </thead>
    <tbody>
      ${lines
        .map(
          (l) =>
            `<tr><td style="${td}"><strong>${esc(l.name)}</strong><br><span style="font-size:12px;color:#5a6480">${esc(
              l.kind
            )}</span></td><td style="${num}">${l.qty}</td><td style="${num}">${
              l.from ? 'from ' : ''
            }${esc(cash(l.price))}</td><td style="${num}">${esc(cash(round2(l.price * l.qty)))}</td></tr>`
        )
        .join('')}
      ${totalRow('Subtotal', cash(subtotal))}
      ${totalRow(`${salesTax.label} (${salesTax.rate}%)`, cash(tax))}
      ${totalRow('Total', cash(total), true)}
    </tbody>
  </table>`

  const numberBadge = `<p style="margin:0 0 18px;padding:12px 14px;background:#f4f6fb;border-radius:12px;font-size:14px">
    Order number <strong style="font-size:18px;letter-spacing:.04em">${esc(orderNumber)}</strong>
  </p>`

  const html = `<div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;max-width:680px;margin:0 auto;color:#0b1733">
  <h2 style="margin:0 0 4px;font-size:20px">New website order - ${esc(cash(total))}</h2>
  <p style="margin:0 0 16px;font-size:13px;color:#5a6480">Placed ${esc(order.receivedAt)} · ${units} item${
    units === 1 ? '' : 's'
  } across ${lines.length} line${lines.length === 1 ? '' : 's'}</p>

  ${numberBadge}

  <table style="width:100%;border-collapse:collapse;margin-bottom:22px">
    <tbody>
      <tr><td style="${td};width:150px;color:#5a6480">Name</td><td style="${td}"><strong>${esc(order.name)}</strong></td></tr>
      <tr><td style="${td};color:#5a6480">Email</td><td style="${td}"><a href="mailto:${esc(order.email)}">${esc(order.email)}</a></td></tr>
      <tr><td style="${td};color:#5a6480">Phone</td><td style="${td}">${esc(order.phone || 'Not provided')}</td></tr>
      <tr><td style="${td};color:#5a6480">Business</td><td style="${td}">${esc(order.company || 'Not provided')}</td></tr>
    </tbody>
  </table>

  ${itemsTable}

  ${
    lines.some((l) => l.from)
      ? '<p style="margin:18px 0 0;padding:12px;background:#fff7e6;border-radius:10px;font-size:13px">Contains <strong>from</strong> prices - the total above is an estimate and needs confirming with the customer.</p>'
      : ''
  }
  ${
    mismatch
      ? `<p style="margin:12px 0 0;padding:12px;background:#fdecec;border-radius:10px;font-size:13px">The browser showed ${esc(
          cash(clientTotal)
        )} but the server totals it at ${esc(cash(total))}. Worth a look before quoting.</p>`
      : ''
  }

  <h3 style="margin:24px 0 6px;font-size:14px">Notes from the customer</h3>
  <p style="margin:0;padding:12px;background:#f4f6fb;border-radius:10px;font-size:14px;white-space:pre-wrap">${esc(
    order.message || 'None provided.'
  )}</p>
</div>`

  /* --------------------------------------------- the customer's own copy */

  const customerText = [
    `Hi ${order.name.split(' ')[0]},`,
    '',
    `Thanks for your order. Here it is in full, with your order number.`,
    '',
    `Order number: ${orderNumber}`,
    '',
    `Your items (${units}):`,
    ...itemLines,
    '',
    `Subtotal: ${cash(subtotal)}`,
    `${salesTax.label} (${salesTax.rate}%): ${cash(tax)}`,
    `Total: ${cash(total)}`,
    ...(lines.some((l) => l.from)
      ? ['', 'Some items start "from" a price, so the total can change once we know the full job. We will agree the final price with you first.']
      : []),
    '',
    'Nothing has been charged. Someone from our team will contact you within one working day to confirm everything.',
    '',
    `Need us sooner? WhatsApp ${whatsapp.display} or call ${site.phone}. Just give us your order number.`,
    '',
    'LogoOrbit',
  ].join('\n')

  const customerHtml = `<div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;max-width:680px;margin:0 auto;color:#0b1733">
  <h2 style="margin:0 0 6px;font-size:20px">Thanks, ${esc(order.name.split(' ')[0])} - we have your order</h2>
  <p style="margin:0 0 16px;font-size:14px;color:#5a6480">Nothing has been charged. A person from our team will contact you within one working day to confirm everything.</p>

  ${numberBadge}

  ${itemsTable}

  ${
    lines.some((l) => l.from)
      ? '<p style="margin:18px 0 0;padding:12px;background:#fff7e6;border-radius:10px;font-size:13px">Some items start <strong>from</strong> a price, so the total can change once we know the full job. We will agree the final price with you before any invoice.</p>'
      : ''
  }

  <p style="margin:20px 0 0;font-size:14px">Need us sooner? WhatsApp <strong>${esc(
    whatsapp.display
  )}</strong> or call <strong>${esc(site.phone)}</strong> and give us your order number.</p>
  <p style="margin:16px 0 0;font-size:13px;color:#5a6480">LogoOrbit · ${esc(site.hours)}</p>
</div>`

  /* -------------------------------------------------------------- sending */

  const apiKey = process.env.RESEND_API_KEY
  /**
   * Orders go to the sales desk and to the legal desk, which keeps the record
   * of what was agreed before any assignment or filing paperwork is drawn up.
   * ORDER_TO_EMAIL names that desk list and accepts a comma-separated set of
   * addresses, so the recipients can be changed without a deploy. The owner's
   * own inbox is added on top of whatever it says.
   */
  const to = deskRecipients(process.env.ORDER_TO_EMAIL, [
    'legal@logoorbit.net',
    process.env.CONTACT_TO_EMAIL || 'sales@logoorbit.net',
  ])
  const from = process.env.CONTACT_FROM_EMAIL || 'LogoOrbit Website <website@logoorbit.net>'

  const send = async (payload) => {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, ...payload }),
    })
    if (!delivery.ok) {
      const detail = await delivery.text().catch(() => '')
      throw new Error(`${delivery.status} ${detail.slice(0, 300)}`)
    }
  }

  // The order number is already issued and the order is already in the log, so
  // a mail failure downgrades the confirmation rather than losing the order.
  let emailed = false
  if (!apiKey) {
    console.error(`[order] ${orderNumber} not emailed: RESEND_API_KEY is not set`)
  } else {
    try {
      await send({
        to,
        reply_to: order.email,
        subject: `Order ${orderNumber} - ${order.name}, ${units} item${units === 1 ? '' : 's'}, ${cash(total)}`,
        text: body,
        html,
      })
      emailed = true
    } catch (err) {
      console.error(`[order] ${orderNumber} desk email failed:`, err.message)
    }

    // The customer's receipt is sent separately: if their address bounces, the
    // sales desk has still had its copy.
    try {
      await send({
        to: [order.email],
        reply_to: site.salesEmail,
        subject: `Your LogoOrbit order ${orderNumber} - ${cash(total)}`,
        text: customerText,
        html: customerHtml,
      })
    } catch (err) {
      console.error(`[order] ${orderNumber} customer receipt failed:`, err.message)
    }
  }

  return res.status(200).json({ ok: true, orderNumber, total, emailed })
}
