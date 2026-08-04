import { useMemo, useState } from 'react'
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
import { salesTax } from '../lib/pricing'
import { site, whatsapp } from '../lib/site'
import { breadcrumb } from '../lib/seo'

const description =
  'Send your LogoOrbit selection to our team: the whole cart, quantities and total go over on WhatsApp, by email, or straight to the phone.'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ---------------------------------------------------------------- the form */

function Field({ label, hint, error, children }) {
  return (
    <label className="block">
      <span className="text-[13px] font-semibold text-ink-700">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-[12.5px] font-semibold text-action-600">{error}</span>
      ) : (
        hint && <span className="mt-1 block text-[12.5px] text-ink-500">{hint}</span>
      )}
    </label>
  )
}

const inputClass =
  'mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'

/* --------------------------------------------------------------- the steps */

function Step({ n, title, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink-900 text-[14px] font-bold text-white">
          {n}
        </span>
        <h2 className="text-xl font-bold text-ink-900">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
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
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [serverError, setServerError] = useState('')
  const [copied, setCopied] = useState(false)

  const set = (key) => (e) => {
    setDetails((d) => ({ ...d, [key]: e.target.value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: null } : prev))
  }

  const summary = useMemo(
    () => orderSummaryText(items, totals, details),
    [items, totals, details]
  )

  // The WhatsApp link carries whatever has been typed so far. Filling the form
  // in first makes for a better message, but nobody is made to: the point of
  // the WhatsApp route is that it works with one tap and zero typing.
  const waHref = useMemo(() => orderWhatsAppLink(items, totals, details), [items, totals, details])
  const mailHref = useMemo(() => orderMailtoLink(items, totals, details), [items, totals, details])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  const validate = () => {
    const next = {}
    if (!details.name.trim() || details.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!EMAIL_RE.test(details.email.trim())) next.email = 'Please enter a valid email address.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate() || items.length === 0) return

    setStatus('sending')
    setServerError('')

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...details, items, totals, summary }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus('error')
        setServerError(data.error || 'We could not send that. Please use WhatsApp or call us instead.')
        return
      }
      setStatus('sent')
    } catch {
      setStatus('error')
      setServerError('Your connection dropped before it sent. WhatsApp and the phone both still work.')
    }
  }

  const jsonLd = { '@graph': [breadcrumb([{ name: 'Cart', href: '/cart' }, { name: 'Checkout', href: '/checkout' }])] }

  /* ------------------------------------------------------------ empty cart */

  if (ready && items.length === 0 && status !== 'sent') {
    return (
      <Layout title="Checkout" description={description} path="/checkout" jsonLd={jsonLd} noIndex>
        <PageHero eyebrow="Checkout" breadcrumb="Checkout" title="There is nothing" highlight="to check out yet">
          {/* The stock hero buttons repeat the one below, so they are cleared. */}
          <></>
        </PageHero>
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-xl px-5 text-center">
            <p className="text-[16px] leading-relaxed text-ink-500">
              Add a package, a bundle or a service to your cart and this page will carry the whole list to
              our team in one message.
            </p>
            <Link href="/pricing" className="btn-action mt-6 px-6 py-3.5">
              Browse pricing
              <Icons.arrow className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </Layout>
    )
  }

  /* ------------------------------------------------------------------ sent */

  if (status === 'sent') {
    return (
      <Layout title="Order Received" description={description} path="/checkout" jsonLd={jsonLd} noIndex>
        <PageHero eyebrow="Order received" breadcrumb="Checkout" title="Got it —" highlight="we are on it">
          <></>
        </PageHero>
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto max-w-2xl px-5 sm:px-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center sm:p-10">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-trust-50 text-trust-600">
                <Icons.check className="h-8 w-8" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-ink-900">Your order summary is with our team</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                {details.name ? `Thanks, ${details.name.split(' ')[0]}. ` : ''}
                A named person will come back to you within one working day, usually much sooner, to confirm
                the scope and the final figure before anything is invoiced.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <Icons.whatsapp className="h-5 w-5" />
                  Send it on WhatsApp too — get an answer now
                </a>
                <a
                  href={site.phoneHref}
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink-900 px-5 py-3.5 font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
                >
                  <Icons.phone className="h-5 w-5" />
                  Call {site.phone}
                </a>
              </div>

              <button
                type="button"
                onClick={clear}
                className="mt-6 text-[13.5px] font-semibold text-ink-500 underline underline-offset-4 hover:text-action-600"
              >
                Clear my cart
              </button>
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
        eyebrow="Checkout"
        trail={[{ name: 'Cart', href: '/cart' }, { name: 'Checkout', href: '/checkout' }]}
        title="Send us your selection,"
        highlight="talk to a person"
        intro="No card, no payment step. Your list and its total go to our sales desk, and a named person confirms the scope and the final figure before an invoice exists."
      >
        {/* The hero's stock buttons send a reader who has already chosen back
            to browsing. Both of these carry the order they have built. */}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <Icons.whatsapp className="h-5 w-5" />
            Send this order on WhatsApp
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20"
          >
            <Icons.phone className="h-5 w-5" />
            {site.phone}
          </a>
        </div>
        <p className="mt-4 text-[13.5px] text-white/60">
          {totals.count} item{totals.count === 1 ? '' : 's'} · {cash(totals.total)} including {salesTax.label}
        </p>
      </PageHero>

      <section className="bg-slate-50 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_23rem] lg:items-start lg:gap-8">
            <div className="space-y-6">
              {/* ---------------------------------------------- 1. the order */}
              <Step n="1" title="What you are ordering">
                <ul className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-start justify-between gap-4 py-3 first:pt-0">
                      <div className="min-w-0">
                        <p className="text-[15px] font-semibold leading-snug text-ink-900">{item.name}</p>
                        <p className="text-[13px] text-ink-500">
                          {item.kind} · {item.qty} × {item.from ? 'from ' : ''}
                          {cash(item.price)}
                        </p>
                      </div>
                      <p className="shrink-0 text-[15px] font-bold tabular-nums text-ink-900">
                        {cash(item.price * item.qty)}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <Link href="/cart" className="text-[13.5px] font-bold text-brand-600 hover:text-brand-700">
                    ← Change quantities or remove items
                  </Link>
                  <p className="text-[13px] text-ink-500">{salesTax.short}</p>
                </div>
              </Step>

              {/* ------------------------------------------- 2. protecting it */}
              <Step n="2" title="Before you order: is this protected?">
                <ProtectionCheck />
              </Step>

              {/* --------------------------------------------- 3. who you are */}
              <Step n="3" title="Who we are quoting for">
                {/* Named so the summary panel and the phone action bar can
                    carry their own Place order buttons without duplicating
                    the form or lifting its state out of this page. */}
                <form id={ORDER_FORM_ID} onSubmit={submit} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your name" error={errors.name}>
                      <input
                        className={inputClass}
                        value={details.name}
                        onChange={set('name')}
                        autoComplete="name"
                        placeholder="Jane Whitfield"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        className={inputClass}
                        type="email"
                        value={details.email}
                        onChange={set('email')}
                        autoComplete="email"
                        placeholder="jane@business.com"
                      />
                    </Field>
                    <Field label="Phone or WhatsApp" hint="Optional, but it is the fastest way back to you.">
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

                  <div className="mt-4">
                    <Field
                      label="Anything we should know"
                      hint="Deadlines, a colour you hate, a competitor you like. Two lines is plenty."
                    >
                      <textarea
                        className={`${inputClass} min-h-[7rem] resize-y`}
                        value={details.message}
                        onChange={set('message')}
                        maxLength={2000}
                        placeholder="We need this live before the trade show on the 14th."
                      />
                    </Field>
                  </div>

                  {serverError && (
                    <p className="mt-4 rounded-2xl bg-action-500/10 p-3.5 text-[13.5px] font-semibold text-action-700">
                      {serverError}
                    </p>
                  )}

                  {/* The one button the whole page is built around, so it is
                      the largest thing on it and it says what it does. */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-action mt-5 w-full px-6 py-5 text-[17px] disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Placing your order…' : `Place my order · ${cash(totals.total)}`}
                    <Icons.arrow className="h-5 w-5" />
                  </button>
                  <p className="mt-2.5 text-center text-[12.5px] text-ink-500">
                    This sends the list above and your details to our sales desk. It does not take payment and
                    it does not commit you to anything.
                  </p>
                </form>
              </Step>

              {/* ------------------------------------------- 4. talk to a human */}
              <Step n="4" title="Or talk to an agent right now">
                <p className="text-[15px] leading-relaxed text-ink-500">
                  Want it moving today? Both of these carry the same order — the WhatsApp button writes your
                  full selection and total into the message box for you, so all you do is press send.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 rounded-2xl bg-[#25D366] px-5 py-4 text-center font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <span className="flex items-center gap-2 text-[16px]">
                      <Icons.whatsapp className="h-5 w-5" />
                      Send this order on WhatsApp
                    </span>
                    <span className="text-[12.5px] font-medium text-white/85">{whatsapp.display}</span>
                  </a>

                  <a
                    href={site.phoneHref}
                    className="flex flex-col items-center gap-1 rounded-2xl bg-ink-900 px-5 py-4 text-center font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <span className="flex items-center gap-2 text-[16px]">
                      <Icons.phone className="h-5 w-5" />
                      Call our agent
                    </span>
                    <span className="text-[12.5px] font-medium text-white/70">{site.phone}</span>
                  </a>
                </div>

                <p className="mt-3 text-center text-[13px] text-ink-500">
                  Talk to our agent to move forward with your selected deals or services. {site.hours}.
                </p>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
                      The message we will send
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={copy}
                        className="text-[13px] font-bold text-brand-600 hover:text-brand-700"
                      >
                        {copied ? 'Copied' : 'Copy text'}
                      </button>
                      <a href={mailHref} className="text-[13px] font-bold text-brand-600 hover:text-brand-700">
                        Email it instead
                      </a>
                    </div>
                  </div>
                  <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[12.5px] leading-relaxed text-ink-700">
                    {summary}
                  </pre>
                </div>
              </Step>
            </div>

            <CartSummary sticky>
              <button
                type="submit"
                form={ORDER_FORM_ID}
                disabled={status === 'sending'}
                className="btn-action mt-5 w-full px-5 py-4 text-[16px] disabled:opacity-60"
              >
                {status === 'sending' ? 'Placing your order…' : 'Place my order'}
                <Icons.arrow className="h-4.5 w-4.5" />
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <Icons.whatsapp className="h-5 w-5" />
                Order on WhatsApp
              </a>
            </CartSummary>
          </div>
        </div>
      </section>
    </Layout>
  )
}
