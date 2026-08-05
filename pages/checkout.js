import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import CartSummary from '../components/CartSummary'
import ProtectionCheck from '../components/ProtectionCheck'
import { Icons } from '../components/Icons'
import {
  useCart,
  cash,
  orderSummaryText,
  orderWhatsAppLink,
  orderMailtoLink,
  ORDER_FORM_ID,
} from '../lib/cart'
import { salesTax } from '../lib/money'
import { site, whatsapp } from '../lib/site'
import { breadcrumb } from '../lib/seo'

const description =
  'Send your LogoOrbit order to our team. Your list and total go over in one message — on WhatsApp, by email, or straight to the phone. Nothing is charged here.'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ---------------------------------------------------------------- the form */

function Field({ label, hint, error, children }) {
  return (
    <label className="block">
      <span className="text-[13px] font-semibold text-ink-700">{label}</span>
      {children}
      {error ? (
        // role="alert" so a rejected field is spoken rather than only turning
        // red. The whole point of this screen is that the order reaches us,
        // and a validation message nobody perceives is an abandoned order.
        <span role="alert" className="mt-1 block text-[12.5px] font-semibold text-action-600">
          {error}
        </span>
      ) : (
        hint && <span className="mt-1 block text-[12.5px] text-ink-500">{hint}</span>
      )}
    </label>
  )
}

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 sm:rounded-2xl sm:px-4 sm:py-3'

/* --------------------------------------------------------------- the steps */

/**
 * One card in the checkout. Deliberately tight on a phone: this page is a form
 * to be worked through, not an article to be read, and every extra pixel of
 * padding is another swipe between a visitor and the button they came for.
 */
function Step({ n, title, sub, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:rounded-3xl sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink-900 text-[13px] font-bold text-white sm:h-8 sm:w-8 sm:text-[14px]">
          {n}
        </span>
        <h2 className="text-[17px] font-bold leading-tight text-ink-900 sm:text-xl">{title}</h2>
      </div>
      {sub && <p className="mt-2 text-[13.5px] leading-snug text-ink-500 sm:text-[14.5px]">{sub}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default function CheckoutPage() {
  const { items, totals, ready, clear } = useCart()

  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    website: '', // honeypot: hidden from people, filled by bots
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [serverError, setServerError] = useState('')
  const [copied, setCopied] = useState(false)
  const [numberCopied, setNumberCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)

  /**
   * What was actually placed. Snapshotted at submit time because the cart is
   * emptied straight afterwards, and the confirmation screen still has to be
   * able to show the order and offer to send it on WhatsApp.
   */
  const [placed, setPlaced] = useState(null)

  const formTop = useRef(null)
  const fieldRefs = useRef({})

  const set = (key) => (e) => {
    setDetails((d) => ({ ...d, [key]: e.target.value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: null } : prev))
  }

  const summary = useMemo(() => orderSummaryText(items, totals, details), [items, totals, details])

  // The WhatsApp link carries whatever has been typed so far. Filling the form
  // in first makes for a better message, but nobody is made to: the point of
  // the WhatsApp route is that it works with one tap and zero typing.
  const waHref = useMemo(() => orderWhatsAppLink(items, totals, details), [items, totals, details])
  const mailHref = useMemo(() => orderMailtoLink(items, totals, details), [items, totals, details])

  // A confirmation the visitor has to scroll up to find reads as a failure.
  // The page jumps back to the top the moment the order lands.
  useEffect(() => {
    if (status === 'sent' && typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [status])

  /**
   * Copies, and falls back to a selection when it cannot.
   *
   * navigator.clipboard does not exist on an insecure origin and is refused
   * outright by some in-app browsers — exactly the WhatsApp and Instagram
   * webviews a good share of this traffic arrives in. The old version answered
   * that by setting the flag back to false, so the button simply did nothing
   * and gave no reason. Selecting the text at least leaves the visitor able to
   * copy it themselves with the menu they already know.
   */
  const copyText = async (text, mark) => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('no clipboard')
      await navigator.clipboard.writeText(text)
      mark(true)
      setTimeout(() => mark(false), 2200)
      setCopyFailed(false)
    } catch {
      mark(false)
      setCopyFailed(true)
    }
  }

  const validate = () => {
    const next = {}
    if (!details.name.trim() || details.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!EMAIL_RE.test(details.email.trim())) next.email = 'Please enter a valid email address.'
    setErrors(next)

    // Scrolling the block into view helps a sighted visitor and nobody else.
    // Putting the caret in the first field that was rejected moves everyone to
    // the same place, and is what makes the role="alert" above get read.
    const firstBad = next.name ? 'name' : next.email ? 'email' : null
    if (firstBad) {
      formTop.current?.scrollIntoView({ block: 'center' })
      fieldRefs.current[firstBad]?.focus({ preventScroll: true })
    }

    return Object.keys(next).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending' || !validate() || items.length === 0) return

    setStatus('sending')
    setServerError('')

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...details, items, totals, summary }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.orderNumber) {
        setStatus('error')
        setServerError(
          data.error || 'We could not send that. Please send it on WhatsApp or call us instead.'
        )
        return
      }

      setPlaced({
        orderNumber: data.orderNumber,
        total: Number.isFinite(data.total) ? data.total : totals.total,
        emailed: data.emailed !== false,
        email: details.email.trim(),
        firstName: details.name.trim().split(' ')[0],
        count: totals.count,
        waHref: orderWhatsAppLink(items, totals, details, data.orderNumber),
        summary: orderSummaryText(items, totals, details, data.orderNumber),
      })
      setStatus('sent')
      clear()
    } catch {
      setStatus('error')
      setServerError('Your internet dropped before it sent. WhatsApp and the phone both still work.')
    }
  }

  const jsonLd = { '@graph': [breadcrumb([{ name: 'Cart', href: '/cart' }, { name: 'Checkout', href: '/checkout' }])] }

  /* ------------------------------------------------------------ empty cart */

  if (ready && items.length === 0 && status !== 'sent') {
    return (
      <Layout title="Checkout" description={description} path="/checkout" jsonLd={jsonLd} noIndex>
        <PageHero compact eyebrow="Checkout" breadcrumb="Checkout" title="There is nothing" highlight="to order yet">
          {/* The stock hero buttons repeat the one below, so they are cleared. */}
          <></>
        </PageHero>
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto max-w-xl px-5 text-center">
            <p className="text-[15px] leading-relaxed text-ink-500 sm:text-[16px]">
              Add a package or a service to your cart. Then this page sends the whole list to our team in
              one go.
            </p>
            <Link href="/pricing" className="btn-action mt-6 px-6 py-3.5">
              See prices
              <Icons.arrow className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </Layout>
    )
  }

  /* --------------------------------------------------------- order placed */

  if (status === 'sent' && placed) {
    return (
      <Layout title="Order Placed" description={description} path="/checkout" jsonLd={jsonLd} noIndex>
        <section className="bg-slate-50 py-6 sm:py-14">
          <div className="mx-auto max-w-xl px-4 sm:px-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center sm:rounded-3xl sm:p-9">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-trust-50 text-trust-600 sm:h-16 sm:w-16">
                <Icons.check className="h-7 w-7 sm:h-8 sm:w-8" />
              </span>

              <h1 className="mt-4 text-[22px] font-bold text-ink-900 sm:text-3xl">Order placed</h1>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500 sm:text-[15.5px]">
                Thanks{placed.firstName ? `, ${placed.firstName}` : ''}. We have your order. Nothing has been
                charged.
              </p>

              {/* The order number is the thing this screen exists to hand over,
                  so it is the biggest element on it and it can be copied in
                  one tap — most people are about to paste it into WhatsApp. */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
                  Your order number
                </p>
                <p className="mt-1.5 select-all break-all text-[26px] font-bold tracking-tight text-ink-900 sm:text-[32px]">
                  {placed.orderNumber}
                </p>
                <button
                  type="button"
                  onClick={() => copyText(placed.orderNumber, setNumberCopied)}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-ink-900 px-5 py-2.5 text-[14px] font-bold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
                >
                  {numberCopied && <Icons.check className="h-4 w-4" />}
                  {numberCopied ? 'Copied' : 'Copy order number'}
                </button>
                {copyFailed && (
                  <p role="alert" className="mt-2 text-[12.5px] font-semibold text-action-700">
                    Your browser would not let us copy it. The number above is already selected — copy it
                    with your browser&apos;s own menu.
                  </p>
                )}
                <p className="mt-2.5 text-[13px] text-ink-500">
                  {placed.count} item{placed.count === 1 ? '' : 's'} · {cash(placed.total)}
                </p>
              </div>

              {placed.emailed ? (
                <p className="mt-4 text-[14px] leading-relaxed text-ink-500">
                  We have emailed all the details to <strong className="text-ink-900">{placed.email}</strong>.
                  Someone will contact you within one working day to confirm the price before anything is
                  billed.
                </p>
              ) : (
                <p className="mt-4 rounded-2xl bg-flare-300/20 p-3.5 text-[13.5px] leading-relaxed text-ink-700">
                  Your order is saved, but our email is not going out right now. Please send it on WhatsApp
                  too, so we can start straight away.
                </p>
              )}

              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={placed.waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <Icons.whatsapp className="h-5 w-5" />
                  Send it on WhatsApp too
                </a>
                <a
                  href={site.phoneHref}
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink-900 px-5 py-3 font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
                >
                  <Icons.phone className="h-5 w-5" />
                  Call {site.phone}
                </a>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => copyText(placed.summary, setCopied)}
                  className="text-[13.5px] font-bold text-brand-600 hover:text-brand-700"
                >
                  {copied ? 'Order copied' : 'Copy my full order'}
                </button>
                <p className="mt-3 text-[13px] text-ink-500">
                  <Link href="/" className="font-semibold text-ink-700 hover:text-brand-600">
                    Back to home
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  /* ---------------------------------------------------------------- normal */

  return (
    <Layout title="Checkout" description={description} path="/checkout" jsonLd={jsonLd} noIndex>
      <PageHero
        compact
        eyebrow="Checkout"
        trail={[{ name: 'Cart', href: '/cart' }, { name: 'Checkout', href: '/checkout' }]}
        title="Place your order"
        intro="No card and no payment here. You send us your list, we check it, then we tell you the exact price before you pay anything."
      >
        <p className="mt-4 text-[13.5px] text-white/70">
          {totals.count} item{totals.count === 1 ? '' : 's'} · {cash(totals.total)} with {salesTax.label}
        </p>
      </PageHero>

      <section className="bg-slate-50 py-6 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_23rem] lg:items-start lg:gap-8">
            <div className="space-y-4 sm:space-y-6">
              {/* ---------------------------------------------- 1. the order */}
              <Step n="1" title="What you are ordering">
                <ul className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-start justify-between gap-3 py-2.5 first:pt-0">
                      <div className="min-w-0">
                        <p className="text-[14.5px] font-semibold leading-snug text-ink-900">{item.name}</p>
                        <p className="text-[12.5px] text-ink-500">
                          {item.kind} · {item.qty} × {item.from ? 'from ' : ''}
                          {cash(item.price)}
                        </p>
                      </div>
                      <p className="shrink-0 text-[14.5px] font-bold tabular-nums text-ink-900">
                        {cash(item.price * item.qty)}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* On a phone the summary panel sits far below everything else,
                    so the total is repeated here where the items are. */}
                <dl className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-[13.5px] lg:hidden">
                  <div className="flex justify-between">
                    <dt className="text-ink-500">Subtotal</dt>
                    <dd className="font-semibold tabular-nums text-ink-900">{cash(totals.subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-500">
                      {totals.taxLabel} ({totals.taxRate}%)
                    </dt>
                    <dd className="font-semibold tabular-nums text-ink-900">{cash(totals.tax)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <dt className="text-[15px] font-bold text-ink-900">Total</dt>
                    <dd className="text-[22px] font-bold tabular-nums tracking-tight text-ink-900">
                      {cash(totals.total)}
                    </dd>
                  </div>
                </dl>

                {totals.estimated && (
                  <p className="mt-3 rounded-xl bg-flare-300/15 p-3 text-[12.5px] leading-snug text-ink-700 lg:hidden">
                    Some items start <strong>from</strong> a price. The final price depends on how big the job
                    is. We will tell you the exact price first.
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <Link href="/cart" className="text-[13.5px] font-bold text-brand-600 hover:text-brand-700">
                    ← Change or remove items
                  </Link>
                </div>
              </Step>

              {/* ------------------------------------------- 2. protecting it */}
              <Step
                n="2"
                title="Do you want to protect your brand?"
                sub="Two optional extras. Skip them if you are not sure — we will ask again later."
              >
                <ProtectionCheck />
              </Step>

              {/* --------------------------------------------- 3. who you are */}
              <Step n="3" title="Your details" sub="So we know who to send the price to.">
                <div ref={formTop} />
                {/* Named so other parts of the page could drive it, though the
                    page now shows exactly one Place my order button on purpose. */}
                <form id={ORDER_FORM_ID} onSubmit={submit} noValidate>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <Field label="Your name" error={errors.name}>
                      <input
                        ref={(el) => (fieldRefs.current.name = el)}
                        className={inputClass}
                        value={details.name}
                        onChange={set('name')}
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        placeholder="Jane Whitfield"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        ref={(el) => (fieldRefs.current.email = el)}
                        className={inputClass}
                        type="email"
                        value={details.email}
                        onChange={set('email')}
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        placeholder="jane@business.com"
                      />
                    </Field>
                    <Field label="Phone or WhatsApp" hint="Optional. It is the fastest way to reach you.">
                      <input
                        className={inputClass}
                        type="tel"
                        value={details.phone}
                        onChange={set('phone')}
                        autoComplete="tel"
                        placeholder="+1 555 000 0000"
                      />
                    </Field>
                    <Field label="Business name" hint="Optional.">
                      <input
                        className={inputClass}
                        value={details.company}
                        onChange={set('company')}
                        autoComplete="organization"
                        placeholder="Whitfield & Co"
                      />
                    </Field>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <Field
                      label="Anything we should know"
                      hint="A deadline, a colour you do not like, a brand you like. One or two lines is enough."
                    >
                      <textarea
                        className={`${inputClass} min-h-[5.5rem] resize-y sm:min-h-[7rem]`}
                        value={details.message}
                        onChange={set('message')}
                        maxLength={2000}
                        placeholder="We need this ready before the trade show on the 14th."
                      />
                    </Field>
                  </div>

                  {/* Hidden from people, filled in by bots. */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    value={details.website}
                    onChange={set('website')}
                  />

                  {serverError && (
                    <p
                      role="alert"
                      className="mt-4 rounded-2xl bg-action-500/10 p-3.5 text-[13.5px] font-semibold text-action-700"
                    >
                      {serverError}
                    </p>
                  )}

                  {/* The only Place my order button on the page. It is the one
                      thing the whole checkout is built around, so nothing else
                      is allowed to look like it or repeat it. */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-action mt-4 w-full px-5 py-4 text-[16px] disabled:opacity-60 sm:py-5 sm:text-[17px]"
                  >
                    {status === 'sending' ? 'Placing your order…' : `Place my order · ${cash(totals.total)}`}
                    <Icons.arrow className="h-5 w-5" />
                  </button>
                  <p className="mt-2.5 text-center text-[12.5px] leading-snug text-ink-500">
                    This sends your list and your details to our team. It does not take payment, and you can
                    still change your mind.
                  </p>
                </form>
              </Step>

              {/* ------------------------------------------- 4. talk to a human */}
              <Step
                n="4"
                title="Or send it to us yourself"
                sub="Same order, sent a different way. Pick whichever is easiest for you."
              >
                <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-0.5 rounded-2xl bg-[#25D366] px-4 py-3.5 text-center font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <span className="flex items-center gap-2 text-[15.5px]">
                      <Icons.whatsapp className="h-5 w-5" />
                      Send on WhatsApp
                    </span>
                    <span className="text-[12px] font-medium text-white/85">
                      Your order is already typed in — just press send
                    </span>
                  </a>

                  <a
                    href={site.phoneHref}
                    className="flex flex-col items-center gap-0.5 rounded-2xl bg-ink-900 px-4 py-3.5 text-center font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <span className="flex items-center gap-2 text-[15.5px]">
                      <Icons.phone className="h-5 w-5" />
                      Call us
                    </span>
                    <span className="text-[12px] font-medium text-white/70">{site.phone}</span>
                  </a>
                </div>

                <p className="mt-2.5 text-center text-[12.5px] text-ink-500">
                  We answer {site.hours}. WhatsApp: {whatsapp.display}
                </p>

                {/* This block used to be a wall of grey text with no stated
                    purpose. It now says, in one line, what it is and what to do
                    with it, and the message itself is folded away until asked
                    for so it costs nothing to scroll past. */}
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                  <p className="text-[14px] font-bold text-ink-900">Your order, written as a message</p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-500">
                    Copy this, then paste it into WhatsApp, an email, or a text and send it to us. It has
                    everything we need.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => copyText(summary, setCopied)}
                      className="rounded-full bg-ink-900 px-4 py-2 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
                    >
                      {copied ? 'Copied' : 'Copy message'}
                    </button>
                    <a
                      href={mailHref}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-ink-700 transition-colors hover:border-ink-300"
                    >
                      Email it instead
                    </a>
                  </div>

                  {copyFailed && (
                    <p role="alert" className="mt-2.5 text-[12.5px] font-semibold text-action-700">
                      Your browser would not let us copy it. Open the message below and copy it by hand,
                      or use one of the buttons above.
                    </p>
                  )}

                  <details className="group mt-3" open={copyFailed}>
                    <summary className="cursor-pointer list-none text-[13px] font-bold text-brand-600 hover:text-brand-700">
                      <span className="group-open:hidden">Show the message</span>
                      <span className="hidden group-open:inline">Hide the message</span>
                    </summary>
                    <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-white p-3 text-[12.5px] leading-relaxed text-ink-700">
                      {summary}
                    </pre>
                  </details>
                </div>
              </Step>
            </div>

            {/* The money panel is desktop only. On a phone the same totals sit
                inside step 1, where the items are, instead of at the very
                bottom of a long page. */}
            <div className="hidden lg:block">
              <CartSummary sticky />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
