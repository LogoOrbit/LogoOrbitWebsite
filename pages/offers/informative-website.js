import Link from 'next/link'
import Layout from '../../components/Layout'
import Reveal from '../../components/Reveal'
import FaqAccordion from '../../components/FaqAccordion'
import OfferCountdown from '../../components/OfferCountdown'
import OfferClaim from '../../components/OfferClaim'
import AddToCart from '../../components/AddToCart'
import { Icons, Star } from '../../components/Icons'
import { site, testimonials } from '../../lib/site'
import { money } from '../../lib/pricing'
import {
  offer,
  informativeWebsite,
  informativeFeatures,
  informativeCartItem,
  packageFaqs,
  claimSteps,
} from '../../lib/offers'
import { ORG_ID, absolute, breadcrumb, faqSchema } from '../../lib/seo'

const { name, price, href, tagline, summary, groups } = informativeWebsite

const description =
  'Informative Website, $499 in this discounted offer: unlimited logo concepts, 8 dedicated designers, an 8 to 10 page mobile responsive website, stationery, lead forms, sitemap, W3C certified HTML and 100% ownership rights. No monthly or yearly cost.'

const waMessage = `Hi LogoOrbit, YES — I want the ${money(price)} Informative Website offer.`

const groupIcons = {
  logo: Icons.logo,
  website: Icons.website,
  search: Icons.search,
  shield: Icons.shield,
}

/** The four things a buyer weighs, in the order they weigh them. */
const highlights = [
  { icon: Icons.spark, label: 'Unlimited logo concepts', sub: 'we draw until one is right' },
  { icon: Icons.team, label: '8 dedicated designers', sub: 'one team, one brief' },
  { icon: Icons.website, label: '8 – 10 page website', sub: 'mobile responsive, built to load fast' },
  { icon: Icons.shield, label: '100% ownership rights', sub: 'no monthly cost, no yearly cost' },
]

/* ---------------------------------------------------------------- hero ---- */

function Hero() {
  return (
    <section className="relative -mt-18 overflow-hidden mesh-bg pt-18 text-white">
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-orbit-500/25 blur-3xl animate-drift"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full bg-action-500/20 blur-3xl animate-drift"
        style={{ animationDelay: '-8s' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-12">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[13px] text-white/55 sm:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={offer.href} className="transition-colors hover:text-white">
            Offers
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white/85">{name}</span>
        </nav>

        {/* Phone order: what it is, what it costs, then the detail. The price
            panel sits second in the flow rather than last, so the number is
            not two screens below the headline on a narrow screen. */}
        <div className="mt-6 flex flex-col gap-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start lg:gap-12">
          <Reveal className="order-1 lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white sm:text-xs">
              <Icons.spark className="h-4 w-4" />
              {tagline}
            </span>

            <h1 className="mt-4 text-[2.1rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              A brand and a website, finished, for{' '}
              <span className="text-gradient-light">{money(price)}</span>
            </h1>

            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75 sm:text-lg">{summary}</p>
          </Reveal>

          {/* What makes it worth the price, beside the panel on a desktop. */}
          <Reveal delay={60} className="order-3 lg:col-start-1 lg:row-start-2">
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-start gap-3 rounded-2xl glass px-4 py-3.5">
                  <h.icon className="mt-0.5 h-5 w-5 shrink-0 text-orbit-300" />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold leading-snug text-white">{h.label}</span>
                    <span className="block text-[13px] leading-snug text-white/60">{h.sub}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <OfferClaim message={waMessage} label="Reply YES to avail now" />
            </div>
          </Reveal>

          {/* Price rail. Sticky on a desktop so the ask travels with the list. */}
          <Reveal delay={90} className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28">
            <div className="relative">
              <div
                className="deal-aura pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-action-500/25 blur-2xl"
                aria-hidden="true"
              />

              <div className="deal-panel relative rounded-3xl bg-white/10 p-6 text-center ring-1 ring-white/15 backdrop-blur sm:p-7">
                <p className="deal-save inline-flex items-center gap-1.5 rounded-full bg-trust-500/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-trust-300">
                  <Icons.spark className="h-3.5 w-3.5" />
                  Discounted offer
                </p>

                <p className="mt-3 flex items-baseline justify-center gap-2">
                  <span className="deal-price inline-block text-5xl font-bold tracking-tight text-white sm:text-6xl">
                    {money(price)}
                  </span>
                  <span className="text-base text-white/50">only</span>
                </p>

                <p className="mt-2 text-[13px] leading-snug text-white/65">
                  Paid once. All {informativeFeatures.length} items below are inside it.
                </p>

                <OfferCountdown className="mt-6" />

                <Link href="#claim" className="btn-action deal-cta mt-6 w-full px-6 py-3.5">
                  Reply YES to avail now
                  <Icons.arrow className="h-4 w-4" />
                </Link>

                {/* For anyone who would rather order than be called back. */}
                <AddToCart item={informativeCartItem} variant="featured" className="mt-3" />

                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-left">
                  {['NO monthly cost', 'NO yearly cost', '100% satisfaction guarantee'].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-[13px] text-white/75">
                      <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-trust-300" />
                      {t}
                    </li>
                  ))}
                </ul>

                <a
                  href={site.phoneHref}
                  className="mt-4 flex items-center justify-center gap-2 text-[13px] font-semibold text-white/70 underline underline-offset-4 hover:text-white"
                >
                  <Icons.phone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- included --- */

/**
 * The offer sheet, grouped.
 *
 * Twenty-five ticks in one column is a list nobody finishes. Split into the
 * four questions a buyer is actually asking — what my brand looks like, what
 * the site is, how people find it, what I own afterwards — the same 25 items
 * become four things to agree with.
 */
function Included() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            Everything in the {money(price)}
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-ink-900 sm:text-4xl">
            {informativeFeatures.length} things included, in four parts
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500 sm:text-lg">
            Nothing below is an upsell, an add-on or a “from”. It is the package, and this is the whole of it.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          {groups.map((group, i) => {
            const Icon = groupIcons[group.icon] || Icons.check
            return (
              <Reveal key={group.id} delay={i * 70}>
                <div className="card-lift flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold leading-snug text-ink-900 sm:text-xl">{group.title}</h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{group.lead}</p>
                    </div>
                  </div>

                  <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {group.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[15px] leading-snug text-ink-700">
                        <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-trust-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={80}>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-trust-50/70 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
            <p className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-700">
              <Icons.shield className="mt-0.5 h-5 w-5 shrink-0 text-trust-600" />
              <span>
                <strong className="font-bold text-ink-900">One payment, and that is the end of it.</strong> No
                setup fee, no file-release fee, no subscription and no renewal. Logo copyright assignment is
                available separately through our signed {money(499)} certificate.
              </span>
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-start">
              <AddToCart item={informativeCartItem} full={false} padding="px-6 py-3.5" />
              <Link
                href="#claim"
                className="shrink-0 rounded-full bg-ink-900 px-6 py-3.5 text-center font-semibold text-white transition-colors hover:bg-action-600"
              >
                Claim it for {money(price)}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- process --- */

function Timeline() {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            What happens after YES
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Concepts in 24 hours, a finished site in weeks
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {claimSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 70}>
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-7">
                <span className="text-[2.75rem] font-bold leading-none text-brand-100">{step.n}</span>
                <h3 className="mt-3 text-lg font-bold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.name} className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <span className="flex text-flare-400">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4" />
                  ))}
                </span>
                <blockquote className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-[13px]">
                  <span className="block font-bold text-ink-900">{t.name}</span>
                  <span className="text-ink-500">{t.company}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- close --- */

function Close() {
  return (
    <section id="claim" className="scroll-mt-24 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl mesh-bg px-6 py-12 text-white sm:px-12 sm:py-16">
            <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
            <div
              className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-action-500/30 blur-3xl animate-drift"
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-2xl text-center">
              <p className="deal-save inline-flex items-center gap-1.5 rounded-full bg-trust-500/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-trust-300">
                <Icons.spark className="h-3.5 w-3.5" />
                {tagline}
              </p>

              <p className="deal-price mt-4 text-6xl font-bold tracking-tight text-white sm:text-7xl">
                {money(price)}
              </p>

              <h2 className="mt-4 text-[1.8rem] font-bold leading-tight text-white sm:text-[2.5rem]">
                Reply with <span className="text-gradient-light">“YES”</span> to avail now
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/75 sm:text-lg">
                Send one word and a dedicated account manager picks it up the same day. Part of our{' '}
                {offer.discount}% existing-customer promotion — nothing is charged until the price is agreed
                in writing.
              </p>

              <OfferCountdown className="mx-auto mt-8 max-w-md" />

              <div className="mt-8 flex justify-center">
                <div className="text-left">
                  <OfferClaim message={waMessage} label="Say YES now" />

                  <div className="mt-5 border-t border-white/10 pt-5">
                    <p className="mb-2.5 text-[13px] text-white/60">
                      Prefer to order it yourself? Put it straight in the cart.
                    </p>
                    <AddToCart
                      item={informativeCartItem}
                      variant="featured"
                      label={`Add to cart — ${money(price)}`}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-8 text-[14px] text-white/60">
                Want the rest of the promotion?{' '}
                <Link href={offer.href} className="font-semibold text-white underline underline-offset-4">
                  Every service is {offer.discount}% off
                </Link>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- page --- */

export default function InformativeWebsiteOffer() {
  const jsonLd = {
    '@graph': [
      breadcrumb([
        { name: 'Offers', href: offer.href },
        { name, href },
      ]),
      {
        '@type': 'Product',
        '@id': `${absolute(href)}#product`,
        name: `${name} package`,
        description,
        brand: { '@id': ORG_ID },
        offers: {
          '@type': 'Offer',
          price,
          priceCurrency: 'USD',
          priceValidUntil: offer.endsOn.slice(0, 10),
          availability: 'https://schema.org/LimitedAvailability',
          url: absolute(href),
          seller: { '@id': ORG_ID },
        },
      },
      faqSchema(packageFaqs, href),
    ],
  }

  return (
    <Layout
      title={`${name} — ${money(price)} Only (Discounted Offer)`}
      description={description}
      path={href}
      jsonLd={jsonLd}
    >
      <Hero />
      <Included />
      <Timeline />
      <FaqAccordion items={packageFaqs} heading={`Questions about the ${money(price)} package`} eyebrow="Straight answers" />
      <Close />
    </Layout>
  )
}
