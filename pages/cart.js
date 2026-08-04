import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import CartSummary from '../components/CartSummary'
import { QtyStepper } from '../components/AddToCart'
import { Icons } from '../components/Icons'
import { useCart, cash } from '../lib/cart'
import { salesTax } from '../lib/pricing'
import { site } from '../lib/site'
import { breadcrumb } from '../lib/seo'

const description =
  'Your LogoOrbit selection: every package, bundle, add-on and service you picked, with quantities, sales tax and the total before you talk to us.'

/** The row for one line in the cart. */
function Line({ item, onQty, onRemove }) {
  return (
    <li className="flex flex-col gap-4 border-b border-slate-100 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">{item.kind}</p>
        {item.href ? (
          <Link href={item.href} className="text-[17px] font-bold leading-snug text-ink-900 hover:text-brand-600">
            {item.name}
          </Link>
        ) : (
          <p className="text-[17px] font-bold leading-snug text-ink-900">{item.name}</p>
        )}
        <p className="mt-1 text-[13.5px] text-ink-500">
          {item.from && <span className="font-semibold">from </span>}
          {cash(item.price)} {item.per ? item.per : 'one-off'}
          {item.note && <span className="text-ink-300"> · {item.note}</span>}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <QtyStepper value={item.qty} onChange={(n) => onQty(item.id, n)} label={`Quantity of ${item.name}`} />

        <p className="min-w-[6rem] text-right text-[18px] font-bold tabular-nums text-ink-900">
          {cash(item.price * item.qty)}
          {item.per && <span className="block text-[11px] font-semibold text-ink-500">{item.per}</span>}
        </p>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name} from cart`}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink-300 transition-colors hover:bg-slate-100 hover:text-action-600"
        >
          <Icons.trash className="h-5 w-5" />
        </button>
      </div>
    </li>
  )
}

function Empty() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <Icons.cart className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-2xl font-bold text-ink-900">Your cart is empty</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
        Add any package, bundle, add-on or service and it will collect here. Nothing is charged — the cart
        is how you hand us a complete list instead of describing it from scratch.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/pricing" className="btn-action px-6 py-3.5">
          Browse pricing
          <Icons.arrow className="h-4 w-4" />
        </Link>
        <Link
          href="/services"
          className="flex items-center justify-center gap-2 rounded-full border-2 border-ink-900 px-6 py-3.5 font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
        >
          See every service
        </Link>
      </div>
      <p className="mt-6 text-[13.5px] text-ink-500">
        Or skip it entirely and{' '}
        <a href={site.phoneHref} className="font-semibold text-brand-600 hover:underline">
          call {site.phone}
        </a>
        .
      </p>
    </div>
  )
}

export default function CartPage() {
  const { items, totals, ready, setQty, remove, clear } = useCart()

  const jsonLd = {
    '@graph': [breadcrumb([{ name: 'Cart', href: '/cart' }])],
  }

  return (
    <Layout title="Your Cart" description={description} path="/cart" jsonLd={jsonLd} noIndex>
      <PageHero
        eyebrow="Your selection"
        breadcrumb="Cart"
        title="Everything you picked,"
        highlight="totalled up"
        intro="Change the quantities, drop anything you have thought better of, and take the whole list to checkout. Nothing is charged here — the next step is a person."
      >
        {/* The hero's default pair of buttons is "get a quote / view pricing",
            which is the wrong offer to a reader who has already chosen. */}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          {ready && items.length > 0 && (
            <Link href="/checkout" className="group btn-action px-7 py-4">
              Go to checkout · {cash(totals.total)}
              <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20"
          >
            Keep browsing packages
          </Link>
        </div>
      </PageHero>

      <section className="bg-slate-50 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          {!ready ? (
            <p className="py-16 text-center text-ink-500">Loading your cart…</p>
          ) : items.length === 0 ? (
            <Empty />
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start lg:gap-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-ink-900">
                    {totals.lines} item{totals.lines === 1 ? '' : 's'}{' '}
                    <span className="font-normal text-ink-500">({totals.count} total)</span>
                  </h2>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-[13.5px] font-semibold text-ink-500 underline underline-offset-4 hover:text-action-600"
                  >
                    Empty the cart
                  </button>
                </div>

                <ul>
                  {items.map((item) => (
                    <Line key={item.id} item={item} onQty={setQty} onRemove={remove} />
                  ))}
                </ul>

                <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-[13.5px] leading-relaxed text-ink-500">
                  {salesTax.long}
                </p>

                <Link
                  href="/pricing"
                  className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-brand-600 hover:text-brand-700"
                >
                  <Icons.plus className="h-4 w-4" />
                  Add something else
                </Link>
              </div>

              <CartSummary sticky checkoutLink />
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
