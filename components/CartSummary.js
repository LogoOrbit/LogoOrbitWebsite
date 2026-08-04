import Link from 'next/link'
import { Icons } from './Icons'
import { useCart, cash } from '../lib/cart'
import { site } from '../lib/site'

/**
 * The money panel: subtotal, tax, total, and the way out.
 *
 * Shared by the cart page and the checkout page so the two can never disagree
 * about what the order comes to.
 */
export default function CartSummary({ sticky = false, checkoutLink = false, children }) {
  const { totals } = useCart()

  return (
    <aside
      className={`rounded-2xl border border-slate-200 bg-white p-4 sm:rounded-3xl sm:p-6 ${
        sticky ? 'lg:sticky lg:top-24' : ''
      }`}
    >
      <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">Order summary</h2>

      <dl className="mt-3 space-y-2 text-[14px] sm:mt-4 sm:space-y-2.5 sm:text-[15px]">
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

      <div className="mt-3 flex items-baseline justify-between border-t border-slate-100 pt-3 sm:mt-4 sm:pt-4">
        <span className="text-[15px] font-bold text-ink-900">Total</span>
        <span className="text-2xl font-bold tabular-nums tracking-tight text-ink-900 sm:text-3xl">
          {cash(totals.total)}
        </span>
      </div>

      {/* Plain English, because this is the one line on the page most likely to
          worry someone: it has to say "the price can change, and we will tell
          you before you pay" without a single word anyone has to look up. */}
      {totals.estimated && (
        <p className="mt-3 rounded-xl bg-flare-300/15 p-3 text-[12.5px] leading-snug text-ink-700 sm:mt-4">
          Some items start <strong>from</strong> a price. The final price depends on how big the job is. We
          will tell you the exact price first — you will never get a bill you have not agreed to.
        </p>
      )}

      {checkoutLink && totals.count > 0 && (
        <Link href="/checkout" className="btn-action mt-4 w-full px-5 py-3.5">
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
