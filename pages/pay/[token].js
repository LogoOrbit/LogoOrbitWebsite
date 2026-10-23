import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { site } from '../../lib/site'
import { fetchInvoice } from '../../lib/crmPay'
import { clientIp } from '../../lib/ratelimit'

/**
 * Client-facing invoice + payment page: logoorbit.net/pay/<token>.
 * The invoice comes from the CRM; payment runs on Stripe Checkout.
 */
export default function PayInvoice({ invoice, justPaid, token, payError }) {
  const [paying, setPaying] = useState(false)
  // Coming back from Stripe with the Back button restores this page from
  // cache; re-enable the button.
  useEffect(() => {
    const reset = () => setPaying(false)
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [])

  if (!invoice) {
    return (
      <Layout description="LogoOrbit invoice" path="/pay" noIndex>
        <Shell>
          <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
            <h1 className="text-2xl font-bold text-ink-900">Invoice not found</h1>
            <p className="mt-2 text-ink-500">
              This link may be incomplete. Please check the email we sent, or contact us at{' '}
              <a className="font-semibold text-brand-600" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </Shell>
      </Layout>
    )
  }

  const currency = (invoice.currency || 'usd').toUpperCase()
  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(n) || 0)
  const date = (d) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '')
  const paid = justPaid || invoice.status === 'paid'
  const voided = invoice.status === 'void'
  const items = Array.isArray(invoice.lineItems) && invoice.lineItems.length
    ? invoice.lineItems
    : [{ name: invoice.description || 'Professional services', quantity: 1, unitPrice: Number(invoice.amount) }]

  return (
    <Layout description="Secure invoice payment for LogoOrbit." path="/pay" noIndex>
      <Shell>
        {/* Amount + action */}
        <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
          {paid ? (
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-trust-100 text-xl text-trust-700">✓</span>
              <div>
                <h1 className="text-xl font-bold text-ink-900">Payment received. Thank you!</h1>
                <p className="mt-1 text-sm text-ink-500">A receipt for invoice {invoice.invoiceNumber} has been emailed to you.</p>
              </div>
            </div>
          ) : voided ? (
            <h1 className="text-xl font-bold text-ink-900">This invoice has been cancelled.</h1>
          ) : (
            <>
              <p className="text-sm font-medium text-ink-500">Invoice {invoice.invoiceNumber} · Amount due</p>
              <p className="mt-1 text-4xl font-bold tracking-tight text-ink-900">{fmt(invoice.totalAmount)}</p>
              {invoice.dueDate && <p className="mt-1 text-sm text-ink-500">Due {date(invoice.dueDate)}</p>}
              {/* A plain link, so it works even before the page's scripts load. */}
              <a
                href={`/api/pay/${encodeURIComponent(token)}`}
                onClick={() => setPaying(true)}
                className={`btn-action mt-6 w-full justify-center py-4 text-base ${paying ? 'pointer-events-none opacity-70' : ''}`}
                rel="nofollow"
              >
                {paying ? 'Opening secure checkout…' : `Pay ${fmt(invoice.totalAmount)} securely`}
              </a>
              {payError && (
                <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  {payError === 'closed'
                    ? 'This invoice can no longer be paid online. Please contact us.'
                    : `We couldn't open the payment page just now. Please try again, or call ${site.phone}.`}
                </p>
              )}
              <p className="mt-3 text-center text-xs text-ink-500">Card payments are processed by Stripe. We never see or store your card number.</p>
            </>
          )}
        </div>

        {/* Invoice */}
        <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="flex flex-wrap items-start justify-between gap-4 bg-ink-900 px-6 py-6 text-white sm:px-8">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" width={44} height={44} className="h-11 w-11" />
              <div>
                <p className="text-xl font-bold">Logo<span className="text-orbit-300">Orbit</span></p>
                <p className="text-xs text-white/60">Creative Design &amp; Branding Studio</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold tracking-wide">INVOICE</p>
              <p className="text-sm text-white/60">{invoice.invoiceNumber}</p>
            </div>
          </div>

          <div className="space-y-8 px-6 py-6 sm:px-8">
            <div className="grid gap-6 text-sm sm:grid-cols-3">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-300">Billed to</p>
                <p className="font-semibold text-ink-900">{invoice.client.name}</p>
                {invoice.client.company && <p className="text-ink-500">{invoice.client.company}</p>}
                {invoice.client.email && <p className="text-ink-500">{invoice.client.email}</p>}
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-300">From</p>
                <p className="font-semibold text-ink-900">{site.name}</p>
                <p className="text-ink-500">{site.phone}</p>
                <p className="text-ink-500">{site.domain}</p>
              </div>
              <div className="space-y-1 sm:text-right">
                <p><span className="text-ink-300">Issued </span><span className="text-ink-700">{date(invoice.issuedDate)}</span></p>
                {invoice.dueDate && <p><span className="text-ink-300">Due </span><span className="text-ink-700">{date(invoice.dueDate)}</span></p>}
                {invoice.terms && <p><span className="text-ink-300">Terms </span><span className="text-ink-700">{invoice.terms}</span></p>}
              </div>
            </div>

            <div>
              {items.map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4 border-b border-ink-300/20 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="font-medium text-ink-900">{item.name}</p>
                    {item.description && <p className="text-xs text-ink-500">{item.description}</p>}
                    {Number(item.quantity) !== 1 && <p className="text-xs text-ink-500">{item.quantity} × {fmt(item.unitPrice)}</p>}
                  </div>
                  <p className="shrink-0 font-medium text-ink-900">{fmt(Number(item.quantity) * Number(item.unitPrice))}</p>
                </div>
              ))}
              <div className="ml-auto mt-4 max-w-xs space-y-1 text-sm">
                <Row label="Subtotal" value={fmt(invoice.amount)} />
                {Number(invoice.discount) > 0 && <Row label="Discount" value={`−${fmt(invoice.discount)}`} />}
                {Number(invoice.tax) > 0 && <Row label={`Tax${Number(invoice.taxRate) > 0 ? ` (${Number(invoice.taxRate)}%)` : ''}`} value={fmt(invoice.tax)} />}
                <div className="flex justify-between border-t border-ink-300/30 pt-2 text-base font-bold text-ink-900">
                  <span>Total</span>
                  <span>{fmt(invoice.totalAmount)}</span>
                </div>
              </div>
            </div>

            {invoice.notes && (
              <div className="rounded-2xl bg-brand-50 p-4 text-sm text-ink-700">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-300">Notes</p>
                <p className="whitespace-pre-wrap">{invoice.notes}</p>
              </div>
            )}

            <p className="text-center text-xs text-ink-500">
              Questions about this invoice? Call {site.phone} or email{' '}
              <a className="font-semibold text-brand-600" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </Shell>
    </Layout>
  )
}

function Shell({ children }) {
  return (
    <section className="relative -mt-18 overflow-hidden mesh-bg pt-18">
      <div className="relative mx-auto max-w-2xl px-4 py-12 sm:py-16">{children}</div>
    </section>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-ink-500">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

export async function getServerSideProps({ params, query, req, res }) {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive')
  let invoice = null
  try {
    invoice = await fetchInvoice(params.token, clientIp(req))
  } catch {
    invoice = null
  }
  if (!invoice) res.statusCode = 404
  const payError = ['closed', 'unavailable'].includes(query.error) ? query.error : null
  return { props: { invoice, justPaid: query.status === 'success', token: params.token, payError } }
}
