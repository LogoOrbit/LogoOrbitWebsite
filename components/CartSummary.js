import Link from 'next/link'
import { Icons } from './Icons'
import { useCart, cash } from '../lib/cart'
import { site } from '../lib/site'

/**
 * The money panel: subtotal, tax, total, and the way out.
 *
 * Shared by the cart page and the checkout page so the two can never disagree
 * about what the order comes to. Monthly items are shown as their own block
 * rather than folded into the one-off total, because a customer signing off on
 * "$3,148" needs to know which part of it recurs.
 */
export default function CartSummary({ sticky = false, checkoutLink = false, children }) {
  const { totals } = useCart()

  return (
    <aside
      className={`rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 ${
        sticky ? 'lg:sticky lg:top-24' : ''
      }`}
    >
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">Order summary</h2>

      <dl className="mt-4 space-y-2.5 text-[15px]">
        <div className="flex items-center justify-between">
          <dt className="text-ink-500">
            Subtotal <span className="text-ink-300">({totals.count} item{totals.count === 1 ? '' : 's'})</span>
          </dt>
          <dd className="font-semibold tabular-nums text-ink-900">{cash(totals.subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-500">
            {totals.taxLabel} <span className="text-ink-300">({totals.taxRate}%)</span>
          </dt>
          <dd className="font-semibold tabular-nums text-ink-900">{cash(totals.tax)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-4">
        <span className="text-[15px] font-bold text-ink-900">Total due</span>
        <span className="text-3xl font-bold tabular-nums tracking-tight text-ink-900">{cash(totals.total)}</span>
      </div>

      {totals.hasRecurring && (
        <div className="mt-4 rounded-2xl bg-brand-50/70 p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">Then monthly</p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-[13.5px] text-ink-500">Recurring items with tax</span>
            <span className="text-lg font-bold tabular-nums text-ink-900">{cash(totals.recurringTotal)}</span>
          </div>
          <p className="mt-1.5 text-[12.5px] leading-snug text-ink-500">
            Billed every month and cancellable at any time. It is kept out of the total above so the one-off
            figure stays honest.
          </p>
        </div>
      )}

      {totals.estimated && (
        <p className="mt-4 rounded-2xl bg-flare-300/15 p-3.5 text-[12.5px] leading-snug text-ink-700">
          Some lines are <strong>from</strong> prices, which move with scope. Treat this total as an estimate
          until we have confirmed it with you — we will not invoice a number you have not seen.
        </p>
      )}

      {checkoutLink && totals.count > 0 && (
        <Link href="/checkout" className="btn-action mt-5 w-full px-5 py-3.5">
          Go to checkout
          <Icons.arrow className="h-4 w-4" />
        </Link>
      )}

      {children}

      <a
        href={site.phoneHref}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink-900 px-5 py-3 text-[15px] font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
      >
        <Icons.phone className="h-4.5 w-4.5" />
        {site.phone}
      </a>
      <p className="mt-2 text-center text-[12.5px] text-ink-500">{site.hours}</p>
    </aside>
  )
}
