import fs from 'fs'
import path from 'path'
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib'
import { site } from './site'

/**
 * Builds the downloadable PDF of a paid invoice, with a LogoOrbit PAID stamp.
 * Uses the built-in PDF fonts, so text is reduced to characters they carry.
 */

const INK = rgb(0.043, 0.09, 0.2)
const MUTED = rgb(0.35, 0.39, 0.5)
const LINE = rgb(0.88, 0.9, 0.93)
const GREEN = rgb(0.02, 0.59, 0.41)
const VIOLET = rgb(0.77, 0.71, 0.99)

const clean = (value) =>
  String(value ?? '')
    .replace(/−/g, '-')
    .normalize('NFKC')
    .replace(/[^\x20-\x7E\xA0-\xFF–—‘’“”•]/g, '')

function wrap(text, font, size, maxWidth) {
  const words = clean(text).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(next, size) <= maxWidth) line = next
    else {
      if (line) lines.push(line)
      line = word
    }
  }
  if (line) lines.push(line)
  return lines.length ? lines : ['']
}

export async function buildPaidInvoicePdf(invoice) {
  const pdf = await PDFDocument.create()
  pdf.setTitle(`LogoOrbit invoice ${clean(invoice.invoiceNumber)} - Paid`)
  pdf.setAuthor(site.name)
  const page = pdf.addPage([612, 792])
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const { width } = page.getSize()
  const left = 48
  const right = width - 48

  const currency = (invoice.currency || 'usd').toUpperCase()
  const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(n) || 0)
  const date = (d) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '')
  const text = (value, x, y, { size = 10, font = regular, color = INK } = {}) =>
    page.drawText(clean(value), { x, y, size, font, color })
  const textRight = (value, x, y, opts = {}) => {
    const font = opts.font || regular
    const size = opts.size || 10
    text(value, x - font.widthOfTextAtSize(clean(value), size), y, opts)
  }

  // Header band
  page.drawRectangle({ x: 0, y: 692, width, height: 100, color: INK })
  try {
    const logo = await pdf.embedPng(fs.readFileSync(path.join(process.cwd(), 'public', 'logo.png')))
    page.drawImage(logo, { x: left, y: 714, width: 56, height: 56 })
  } catch {
    // The PDF is still complete without the mark.
  }
  text('Logo', left + 66, 744, { size: 22, font: bold, color: rgb(1, 1, 1) })
  text('Orbit', left + 66 + bold.widthOfTextAtSize('Logo', 22), 744, { size: 22, font: bold, color: VIOLET })
  text('Creative Design & Branding Studio', left + 66, 726, { size: 9, color: rgb(0.75, 0.8, 0.9) })
  textRight('INVOICE', right, 744, { size: 22, font: bold, color: rgb(1, 1, 1) })
  textRight(invoice.invoiceNumber, right, 726, { size: 10, color: rgb(0.75, 0.8, 0.9) })

  // Parties and dates
  let y = 650
  text('FROM', left, y, { size: 8, font: bold, color: MUTED })
  text('BILLED TO', 230, y, { size: 8, font: bold, color: MUTED })
  textRight('DETAILS', right, y, { size: 8, font: bold, color: MUTED })
  y -= 16
  const from = [site.name, site.phone, site.email, site.domain]
  const to = [invoice.client?.name, invoice.client?.company, invoice.client?.email].filter(Boolean)
  const details = [
    `Issued ${date(invoice.issuedDate)}`,
    invoice.dueDate ? `Due ${date(invoice.dueDate)}` : '',
    invoice.terms ? `Terms: ${invoice.terms}` : '',
    `Paid ${date(invoice.paidDate)}`,
  ].filter(Boolean)
  for (let i = 0; i < Math.max(from.length, to.length, details.length); i++) {
    if (from[i]) text(from[i], left, y, { font: i === 0 ? bold : regular })
    if (to[i]) text(to[i], 230, y, { font: i === 0 ? bold : regular })
    if (details[i]) textRight(details[i], right, y)
    y -= 14
  }

  // Items
  y -= 18
  text('DESCRIPTION', left, y, { size: 8, font: bold, color: MUTED })
  textRight('QTY', 430, y, { size: 8, font: bold, color: MUTED })
  textRight('AMOUNT', right, y, { size: 8, font: bold, color: MUTED })
  y -= 8
  page.drawLine({ start: { x: left, y }, end: { x: right, y }, thickness: 1, color: LINE })
  const items = Array.isArray(invoice.lineItems) && invoice.lineItems.length
    ? invoice.lineItems
    : [{ name: invoice.description || 'Professional services', quantity: 1, unitPrice: Number(invoice.amount) }]
  for (const item of items.slice(0, 18)) {
    y -= 16
    const nameLines = wrap(item.name, bold, 10, 330)
    nameLines.forEach((line, i) => text(line, left, y - i * 13, { font: bold }))
    textRight(String(item.quantity), 430, y)
    textRight(money(Number(item.quantity) * Number(item.unitPrice)), right, y)
    y -= (nameLines.length - 1) * 13
    if (item.description) {
      for (const line of wrap(item.description, regular, 9, 330).slice(0, 3)) {
        y -= 12
        text(line, left, y, { size: 9, color: MUTED })
      }
    }
    y -= 8
    page.drawLine({ start: { x: left, y }, end: { x: right, y }, thickness: 0.5, color: LINE })
  }

  // Totals
  y -= 20
  const totals = [['Subtotal', money(invoice.amount)]]
  if (Number(invoice.discount) > 0) totals.push(['Discount', `-${money(invoice.discount)}`])
  if (Number(invoice.tax) > 0) totals.push([`Tax${Number(invoice.taxRate) > 0 ? ` (${Number(invoice.taxRate)}%)` : ''}`, money(invoice.tax)])
  for (const [label, value] of totals) {
    text(label, 380, y, { color: MUTED })
    textRight(value, right, y, { color: MUTED })
    y -= 16
  }
  page.drawLine({ start: { x: 380, y: y + 6 }, end: { x: right, y: y + 6 }, thickness: 1, color: LINE })
  y -= 8
  text('Total paid', 380, y, { size: 12, font: bold })
  textRight(money(invoice.totalAmount), right, y, { size: 12, font: bold, color: GREEN })
  y -= 16
  text('Balance due', 380, y, { color: MUTED })
  textRight(money(0), right, y, { color: MUTED })

  // PAID stamp, tilted like a rubber stamp, beside the totals.
  const cx = 200
  const cy = y + 26
  page.drawCircle({ x: cx, y: cy, size: 62, borderColor: GREEN, borderWidth: 3, opacity: 0, borderOpacity: 0.9 })
  page.drawCircle({ x: cx, y: cy, size: 54, borderColor: GREEN, borderWidth: 1, opacity: 0, borderOpacity: 0.9 })
  const angle = 15
  const rad = (angle * Math.PI) / 180
  const stamp = (value, offset, size, font) => {
    const w = font.widthOfTextAtSize(value, size)
    const h = size * 0.7
    // Centre the rotated line on a point `offset` above the stamp centre.
    const px = cx - Math.sin(rad) * offset
    const py = cy + Math.cos(rad) * offset
    page.drawText(value, {
      x: px - (Math.cos(rad) * w) / 2 + (Math.sin(rad) * h) / 2,
      y: py - (Math.sin(rad) * w) / 2 - (Math.cos(rad) * h) / 2,
      size,
      font,
      color: GREEN,
      rotate: degrees(angle),
      opacity: 0.9,
    })
  }
  stamp('LOGOORBIT', 26, 9, bold)
  stamp('PAID', 0, 30, bold)
  stamp(clean(date(invoice.paidDate) || ''), -26, 9, bold)

  // Notes and footer
  if (invoice.notes) {
    let ny = Math.min(y - 60, cy - 90)
    text('NOTES', left, ny, { size: 8, font: bold, color: MUTED })
    for (const line of wrap(invoice.notes, regular, 9, right - left).slice(0, 5)) {
      ny -= 13
      text(line, left, ny, { size: 9, color: MUTED })
    }
  }
  page.drawLine({ start: { x: left, y: 70 }, end: { x: right, y: 70 }, thickness: 0.5, color: LINE })
  const thanks = `Thank you for your business! - ${site.name}`
  text(thanks, (width - regular.widthOfTextAtSize(thanks, 10)) / 2, 52, { color: MUTED })
  const contact = `${site.domain} · ${site.email} · ${site.phone}`
  text(contact, (width - regular.widthOfTextAtSize(clean(contact), 8)) / 2, 38, { size: 8, color: MUTED })

  return pdf.save()
}
