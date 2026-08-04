import Link from 'next/link'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import Guarantees from '../components/Guarantees'
import FaqAccordion from '../components/FaqAccordion'
import OfferCountdown from '../components/OfferCountdown'
import OfferClaim from '../components/OfferClaim'
import AddToCart from '../components/AddToCart'
import { Icons, Star } from '../components/Icons'
import { site, services, testimonials } from '../lib/site'
import { money } from '../lib/pricing'
import {
  offer,
  headline,
  dealRows,
  claimSteps,
  offerFaqs,
  informativeWebsite,
  informativeFeatures,
  informativeCartItem,
} from '../lib/offers'
import { ORG_ID, absolute, breadcrumb, faqSchema } from '../lib/seo'

const description =
  'Existing customer offer: 70% off every LogoOrbit service. The website we normally build for $1,000 is $299, and the same discount applies to logo design, brand identity, animation, apps and marketing. Limited time.'

const waMessage = 'Hi LogoOrbit, YES — I am an existing customer and I want to claim the 70% offer.'

/** The service tiles carry the icon their own page uses, so the grid is scannable. */
const serviceIcons = {
  logo: Icons.logo,
  website: Icons.website,
  animation: Icons.animation,
  mobile: Icons.mobile,
  book: Icons.book,
  amazon: Icons.amazon,
}

/* ---------------------------------------------------------------- hero ---- */

function Hero() {
  return (
    <section className="relative -mt-18 overflow-hidden mesh-bg pt-18 text-white">
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-action-500/25 blur-3xl animate-drift"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full bg-orbit-500/25 blur-3xl animate-drift"
        style={{ animationDelay: '-8s' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-white/55 sm:text-sm">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white/85">Offers</span>
        </nav>

        {/* On a phone these three blocks stack in the order a returning buyer
            needs them: what this is, what it costs, then why to say yes. The
            price panel is second in the DOM on a narrow screen for that
            reason — sitting last, it landed two screens below the headline. */}
        <div className="mt-6 flex flex-col gap-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start lg:gap-12">
          {/* The pitch */}
          <Reveal className="order-1 lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white sm:text-xs">
              <Icons.spark className="h-4 w-4" />
              {offer.eyebrow} · limited time
            </span>

            <h1 className="mt-4 text-[2.1rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              Everything we make is{' '}
              <span className="text-gradient-light">{offer.discount}% off</span> for you
            </h1>

            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75 sm:text-lg">
              You have worked with us before, so this one is yours: the website we normally build for{' '}
              {money(headline.was)} is {money(headline.now)}. And it is not only websites — every service in
              our catalogue is {offer.discount}% off while this runs.
            </p>
          </Reveal>

          {/* Why to say yes. Below the price on a phone, beside it on a desktop. */}
          <Reveal delay={60} className="order-3 lg:col-start-1 lg:row-start-2">
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {[
                'Same designers, same revisions, same files',
                'One fixed price, agreed in writing first',
                '100% ownership of the finished work',
                'No monthly cost, no yearly cost',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px] text-white/80">
                  <Icons.check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-trust-300" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <OfferClaim message={waMessage} />
            </div>

            {/* Proof, kept to one line so it supports the ask without delaying it. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-[13px] text-white/65">
              <span className="inline-flex items-center gap-1.5">
                <span className="flex text-flare-400">
                  {[0, 1, 2, 3].map((i) => (
                    <Star key={i} className="h-4 w-4" />
                  ))}
                  <Star className="h-4 w-4" half id="offer-rating-half" />
                </span>
                {site.rating} from {site.reviewCount.toLocaleString('en-US')} reviews
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icons.clock className="h-4 w-4 text-orbit-300" />
                {site.years} years, {site.hours}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icons.team className="h-4 w-4 text-orbit-300" />8 dedicated designers per project
              </span>
            </div>
          </Reveal>

          {/* The number */}
          <Reveal delay={90} className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28">
            <div className="relative">
              <div
                className="deal-aura pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-action-500/25 blur-2xl"
                aria-hidden="true"
              />

              <div className="deal-panel relative rounded-3xl bg-white/10 p-6 text-center ring-1 ring-white/15 backdrop-blur sm:p-7">
                <p className="deal-save inline-flex items-center gap-1.5 rounded-full bg-trust-500/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-trust-300">
                  <Icons.spark className="h-3.5 w-3.5" />
                  Save {money(headline.saving)} · {offer.discount}% off
                </p>

                <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  Website design, from
                </p>

                <p className="mt-1.5 flex items-baseline justify-center gap-3">
                  <span className="deal-price inline-block text-5xl font-bold tracking-tight text-white sm:text-6xl">
                    {money(headline.now)}
                  </span>
                  <span className="deal-was text-xl text-white/45">{money(headline.was)}</span>
                </p>

                <OfferCountdown className="mt-6" />

                <Link href="#claim" className="btn-action deal-cta mt-6 w-full px-6 py-3.5">
                  Claim {offer.discount}% off
                  <Icons.arrow className="h-4 w-4" />
                </Link>

                <p className="mt-3 text-[13px] leading-snug text-white/65">
                  Or take the {informativeWebsite.name} package,{' '}
                  <Link href={informativeWebsite.href} className="font-semibold text-white underline underline-offset-4">
                    {money(informativeWebsite.price)} all in
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- maths ---- */

/**
 * The discount made concrete. A percentage is an abstraction; two columns of
 * real catalogue prices are not, and this is the section that turns "70% off"
 * into a number someone can picture spending.
 */
function TheMaths() {
  const wasTotal = dealRows.reduce((sum, r) => sum + r.was, 0)
  const nowTotal = dealRows.reduce((sum, r) => sum + r.now, 0)

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            What {offer.discount}% off actually means
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-ink-900 sm:text-4xl">
            The same work. The prices you paid last time, cut by {offer.discount}%.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-500 sm:text-lg">
            Every figure on the left is the price this product carries on our pricing page today. Nothing here
            is an inflated “was” invented for the sale.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-9 overflow-hidden rounded-3xl border border-slate-200 bg-white">
            {/* Column headings, desktop only: on a phone each row is a card and
                the labels live inside it. */}
            <div className="hidden grid-cols-[minmax(0,1fr)_5rem_6rem_6rem_10.5rem] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500 lg:grid">
              <span>Service</span>
              <span className="text-right">Normal</span>
              <span className="text-right">Yours now</span>
              <span className="text-right">You save</span>
              <span className="text-right">Order</span>
            </div>

            <ul className="divide-y divide-slate-200">
              {dealRows.map((row) => (
                <li
                  key={row.name}
                  className="grid gap-2 px-5 py-4 sm:grid-cols-2 sm:gap-x-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_5rem_6rem_6rem_10.5rem] lg:items-center"
                >
                  <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                    <Link
                      href={row.href}
                      className="text-[15px] font-semibold text-ink-900 transition-colors hover:text-brand-600"
                    >
                      {row.name}
                    </Link>
                    <p className="mt-0.5 text-[13px] text-ink-500">{row.kind}</p>
                  </div>

                  <div className="flex items-baseline gap-2 lg:block lg:text-right">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 lg:hidden">
                      Normal
                    </span>
                    <span className="text-[15px] text-ink-500 line-through tabular-nums">{money(row.was)}</span>
                  </div>

                  <div className="flex items-baseline gap-2 lg:block lg:text-right">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 lg:hidden">
                      Yours now
                    </span>
                    <span className="text-xl font-bold text-ink-900 tabular-nums lg:text-[17px]">
                      {money(row.now)}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 lg:block lg:text-right">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 lg:hidden">
                      You save
                    </span>
                    <span className="inline-flex rounded-full bg-trust-50 px-2.5 py-1 text-[13px] font-bold text-trust-700 tabular-nums">
                      −{money(row.saving)}
                    </span>
                  </div>

                  <div className="mt-1.5 sm:col-span-2 sm:mt-2 lg:col-span-1 lg:mt-0">
                    <AddToCart
                      item={row.cartItem}
                      label="Add to cart"
                      padding="px-4 py-2.5"
                      className="text-[14px]"
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="grid gap-2 border-t-2 border-ink-900/10 bg-slate-50 px-5 py-4 sm:gap-x-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_5rem_6rem_6rem_10.5rem] lg:items-center">
              <p className="text-[15px] font-bold text-ink-900">
                All five, ordered together
                <span className="ml-2 font-normal text-ink-500 lg:hidden">
                  {money(nowTotal)} instead of {money(wasTotal)}
                </span>
              </p>
              <p className="hidden text-[15px] text-ink-500 line-through tabular-nums lg:block lg:text-right">
                {money(wasTotal)}
              </p>
              <p className="hidden text-[17px] font-bold text-ink-900 tabular-nums lg:block lg:text-right">
                {money(nowTotal)}
              </p>
              <p className="lg:text-right">
                <span className="inline-flex rounded-full bg-trust-500 px-2.5 py-1 text-[13px] font-bold text-white tabular-nums">
                  −{money(wasTotal - nowTotal)}
                </span>
              </p>
            </div>
          </div>
        </Reveal>

        <p className="mt-4 text-center text-[13px] text-ink-500">
          Prices shown are the current catalogue prices on{' '}
          <Link href="/pricing" className="font-semibold text-brand-600 hover:underline">
            our pricing page
          </Link>
          . Your discounted price is confirmed in writing before anything starts.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- package ---- */

function FeaturedPackage() {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl mesh-bg text-white">
            <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
            <div
              className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-orbit-500/30 blur-3xl animate-drift"
              aria-hidden="true"
            />

            <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  <Icons.spark className="h-4 w-4" />
                  {informativeWebsite.tagline}
                </span>

                <h2 className="mt-4 text-[1.7rem] font-bold leading-tight text-white sm:text-4xl">
                  {informativeWebsite.name} —{' '}
                  <span className="text-gradient-light">{money(informativeWebsite.price)} only</span>
                </h2>

                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-[17px]">
                  {informativeWebsite.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {['Unlimited logo concepts', '8 – 10 pages', '8 designers', '100% ownership'].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full glass px-3.5 py-1.5 text-[13px] font-semibold text-white/90"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
                  <Link href={informativeWebsite.href} className="btn-action inline-flex px-7 py-4">
                    See all {informativeFeatures.length} things included
                    <Icons.arrow className="h-5 w-5" />
                  </Link>
                  <AddToCart
                    item={informativeCartItem}
                    variant="featured"
                    full={false}
                    padding="px-7 py-4"
                    label={`Add to cart — ${money(informativeWebsite.price)}`}
                    className="sm:w-64"
                  />
                </div>
              </div>

              <ul className="grid gap-x-6 gap-y-2.5 self-center rounded-2xl glass p-6 sm:grid-cols-2 lg:grid-cols-1">
                {informativeFeatures.slice(0, 9).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px] text-white/85">
                    <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-trust-300" />
                    {f}
                  </li>
                ))}
                <li className="pt-1 text-[13px] text-white/55">
                  + {informativeFeatures.length - 9} more, all inside the {money(informativeWebsite.price)}.
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ services ---- */

function AllServices() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            Not just websites
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-ink-900 sm:text-4xl">
            {offer.discount}% off every service we sell
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500 sm:text-lg">
            Take one, or combine several into a single order so everything is designed by the same team in the
            same week. The discount applies either way.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.id] || Icons.spark
            return (
              <Reveal key={s.id} delay={i * 55}>
                <Link
                  href={s.href}
                  className="card-lift group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-action-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                      {offer.discount}% off
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-ink-900">{s.name}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-500">{s.tagline}</p>

                  <ul className="mt-4 space-y-1.5">
                    {s.bullets.slice(0, 2).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[14px] text-ink-700">
                        <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-trust-600" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600">
                    See what is included
                    <Icons.arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- steps ---- */

function HowToClaim() {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            Three steps
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-ink-900 sm:text-4xl">
            From “YES” to designers working, inside a day
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {claimSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 70}>
              <div className="relative h-full rounded-3xl border border-slate-200 bg-white p-7">
                <span className="text-[2.75rem] font-bold leading-none text-brand-100">{step.n}</span>
                <h3 className="mt-3 text-lg font-bold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- proof --- */

function Proof() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-ink-900 sm:text-4xl">
            The people who already said yes
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <figure className="flex h-full flex-col rounded-3xl border border-slate-200 bg-slate-50 p-7">
                <span className="flex text-flare-400">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4" />
                  ))}
                </span>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-[14px]">
                  <span className="block font-bold text-ink-900">{t.name}</span>
                  <span className="text-ink-500">{t.company}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- close --- */

function Close() {
  return (
    <section id="claim" className="scroll-mt-24 bg-white pb-16 pt-4 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl mesh-bg px-6 py-12 text-white sm:px-12 sm:py-16">
            <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
            <div
              className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-action-500/30 blur-3xl animate-drift"
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-[1.8rem] font-bold leading-tight text-white sm:text-[2.75rem]">
                Reply with <span className="text-gradient-light">“YES”</span> to avail now
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/75 sm:text-lg">
                One word is enough. Your account manager takes it from there, confirms the {offer.discount}%
                price in writing, and nothing is charged until you are happy with what has been agreed.
              </p>

              <OfferCountdown className="mx-auto mt-8 max-w-md" />

              <div className="mt-8 flex justify-center">
                <div className="text-left">
                  <OfferClaim message={waMessage} label="Say YES now" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- page --- */

export default function Offers() {
  const jsonLd = {
    '@graph': [
      breadcrumb([{ name: 'Offers', href: '/offers' }]),
      {
        '@type': 'Offer',
        '@id': absolute('/offers') + '#offer',
        name: `${offer.discount}% off all services for existing customers`,
        description,
        url: absolute('/offers'),
        price: headline.now,
        priceCurrency: 'USD',
        priceValidUntil: offer.endsOn.slice(0, 10),
        availability: 'https://schema.org/LimitedAvailability',
        eligibleCustomerType: 'https://schema.org/ReturningCustomer',
        offeredBy: { '@id': ORG_ID },
      },
      faqSchema(offerFaqs, '/offers'),
    ],
  }

  return (
    <Layout
      title={`${offer.discount}% Off Everything — Existing Customer Offer`}
      description={description}
      path="/offers"
      jsonLd={jsonLd}
    >
      <Hero />
      <TheMaths />
      <FeaturedPackage />
      <AllServices />
      <HowToClaim />
      <Proof />
      <Guarantees />
      <FaqAccordion items={offerFaqs} heading="Before you say yes" eyebrow="Straight answers" />
      <Close />
    </Layout>
  )
}
