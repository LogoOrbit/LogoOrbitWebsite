import { clientIp } from '../../../lib/ratelimit'
import { fetchInvoice, validToken } from '../../../lib/crmPay'
import { buildPaidInvoicePdf } from '../../../lib/paidInvoicePdf'

// Downloads the paid invoice as a PDF with a LogoOrbit PAID stamp.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { token } = req.query
  if (!validToken(token)) return res.status(404).json({ error: 'Invoice not found' })
  try {
    const invoice = await fetchInvoice(token, clientIp(req))
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' })
    if (invoice.status !== 'paid') return res.status(409).json({ error: 'This invoice has not been paid yet.' })
    const bytes = await buildPaidInvoicePdf(invoice)
    const name = `LogoOrbit-${String(invoice.invoiceNumber).replace(/[^A-Za-z0-9-]/g, '')}-paid.pdf`
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`)
    return res.status(200).send(Buffer.from(bytes))
  } catch (error) {
    console.error('Receipt PDF failed:', error)
    return res.status(500).json({ error: 'Could not create the PDF. Please try again.' })
  }
}
