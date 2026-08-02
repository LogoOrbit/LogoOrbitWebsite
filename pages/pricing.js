import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import Guarantees from '../components/Guarantees'
import Reveal from '../components/Reveal'
import ProcessSteps from '../components/ProcessSteps'
import PricingCatalogue, { Finder } from '../components/PricingCatalogue'
import MoreOnPhone from '../components/MoreOnPhone'
import { Icons } from '../components/Icons'
import { flagship, money } from '../lib/pricing'
import { site } from '../lib/site'

const promises = [
  { icon: Icons.check, label: 'One fixed price', sub: 'quoted up front' },
  { icon: Icons.shield, label: 'Free consultation', sub: 'before you pay' },
  { icon: Icons.spark, label: 'You own everything', sub: 'copyright included' },
]

/** What a client can hand us, in the words they would use. */
const capabilities = [
  { icon: Icons.logo, label: 'Logos & brand identity' },
  { icon: Icons.layers, label: 'Business cards, flyers & print' },
  { icon: Icons.website, label: 'Websites & online stores' },
  { icon: Icons.animation, label: 'Motion graphics & animation' },
  { icon: Icons.spark, label: 'Banners & social media design' },
  { icon: Icons.shop, label: 'Marketing & ad creative' },
  { icon: Icons.mobile, label: 'Mobile apps' },
  { icon: Icons.book, label: 'Book covers & publishing' },
]

/** Money questions, in the words a first-time buyer actually uses. */
const pricingFaqs = [
  {
    q: 'Is the price on the card the price I pay?',
    a: 'Yes. Every package is a single fixed price with nothing added afterwards, no setup fee, no file-release fee, no subscription. The only thing that changes the price is you asking for extra work that is not listed, and we would agree that with you in writing first.',
  },
  {
    q: 'Do I have to pay all of it up front?',
    a: 'No. On The Complete Brand it is half to start and half when you approve the finished work. On the smaller packages most clients simply pay on completion, ask and we will split it.',
  },
  {
    q: 'I do not know anything about design. Will that be a problem?',
    a: 'No, most of our clients do not. You tell us about your business in plain words, we do the design thinking, and we show you finished options to react to. "I like this one but not the colour" is a perfectly good brief.',
  },
  {
    q: 'What is the difference between a logo and a branding kit?',
    a: 'The logo is the mark itself. The branding kit is that mark applied to the things you actually hand out and post, business cards, letterheads, email signatures, social media covers, signage. Most businesses end up needing both, which is why the bundles exist.',
  },
  {
    q: 'Can I start small and add more later?',
    a: 'Yes. Plenty of clients start with a logo and come back for the branding kit or the website. Buying them together is cheaper, but nothing is lost by taking it one step at a time, we keep your files on record.',
  },
  {
    q: 'What if I do not like any of the designs?',
    a: 'Tell us plainly and we start again from a fresh direction rather than nudging the same one. Gold and above include unlimited revisions, so there is no counter running while we get it right.',
  },
  {
    q: 'How long does it take?',
    a: 'First logo concepts land within 24 to 48 hours depending on the package. Branding kits follow within a few days of the logo being signed off, and websites typically run two to four weeks depending on size.',
  },
]

function PricingFaqs() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-12 sm:py-20 bg-slate-50">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Before you buy</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
            The questions everyone asks
          </h2>
        </Reveal>

        <div className="mt-8 sm:mt-12 space-y-3">
          {pricingFaqs.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 45}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                    isOpen ? 'border-brand-200 shadow-lg shadow-brand-900/5' : 'border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
                  >
                    <span className="text-[15px] sm:text-base font-semibold text-ink-900">{item.q}</span>
                    <span
                      className={`grid shrink-0 place-items-center w-8 h-8 rounded-full transition-all duration-300 ${
                        isOpen ? 'rotate-45 bg-brand-600 text-white' : 'bg-slate-100 text-ink-500'
                      }`}
                    >
                      <Icons.plus className="w-4.5 h-4.5" />
                    </span>
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 sm:px-6 text-[15px] leading-relaxed text-ink-500">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/**
 * The offer we want every undecided visitor to see first.
 *
 * On a phone the three blocks stack in the order a buyer needs them: what it
 * is, what it costs, then what is in it. The price panel used to be last in
 * the DOM, which on a narrow screen put it below a six-line pitch and a
 * six-item list, so the whole point of the card sat two screens down.
 */
function Flagship() {
  return (
    <section id="complete-brand" className="scroll-mt-24 sm:scroll-mt-32 py-8 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl mesh-bg text-white">
            <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />

            <div className="relative p-5 sm:p-10">
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:gap-10">
                <div className="max-w-2xl lg:col-start-1 lg:row-start-1">
                  <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-white">
                    <Icons.spark className="w-4 h-4" />
                    {flagship.eyebrow}
                  </span>

                  <h2 className="mt-3.5 text-[1.7rem] sm:text-4xl font-bold leading-tight text-white">
                    {flagship.name}
                  </h2>
                  <p className="mt-2.5 text-[15px] sm:text-[17px] leading-relaxed text-white/75">
                    {flagship.tagline}
                  </p>
                </div>

                <div className="relative w-full shrink-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
                  {/* A soft breathing glow so the saving is where the eye lands. */}
                  <div
                    className="deal-aura pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-action-500/25 blur-2xl"
                    aria-hidden="true"
                  />

                  <div className="deal-panel relative rounded-3xl bg-white/10 p-5 sm:p-6 text-center ring-1 ring-white/15 backdrop-blur">
                    <p className="deal-save inline-flex items-center gap-1.5 rounded-full bg-trust-500/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-trust-300">
                      <Icons.spark className="w-3.5 h-3.5" />
                      Save {money(flagship.saving)}, {flagship.savingPct}% off
                    </p>

                    <p className="mt-2.5 flex items-baseline justify-center gap-2.5">
                      <span className="deal-price inline-block text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        {money(flagship.price)}
                      </span>
                      <span className="deal-was text-lg text-white/45">{money(flagship.was)}</span>
                    </p>

                    <p className="mt-2 text-[13px] leading-snug text-white/70">
                      The same six pieces bought one at a time come to {money(flagship.was)}.
                    </p>

                    <Link href="/contact" className="btn-action deal-cta mt-5 w-full px-7 py-3.5">
                      Claim this package
                      <Icons.arrow className="w-4 h-4" />
                    </Link>

                    <p className="mt-3 flex items-start justify-center gap-1.5 text-[13px] leading-snug text-white/70">
                      <Icons.shield className="mt-0.5 w-4 h-4 shrink-0 text-trust-300" />
                      {flagship.payment}
                    </p>

                    <a
                      href="#packages"
                      className="mt-3 block text-[13px] font-medium text-white/70 underline underline-offset-4 hover:text-white"
                    >
                      Or browse the smaller packages
                    </a>
                  </div>
                </div>

                <div className="max-w-2xl lg:col-start-1 lg:row-start-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orbit-300 sm:hidden">
                    The six pieces
                  </p>

                  <ul className="mt-3 space-y-3 sm:mt-0 sm:space-y-2.5">
                    {flagship.includes.map((inc) => {
                      // "Platinum Logo, unlimited concepts, editable master
                      // files" is one line on a desktop card and three on a
                      // phone. Leading with the name and demoting the detail
                      // underneath keeps the list scannable at any width.
                      const [name, ...detail] = inc.label.split(', ')

                      return (
                        <li key={inc.label} className="flex items-start justify-between gap-3 sm:gap-4">
                          <span className="flex min-w-0 items-start gap-2.5">
                            <Icons.check className="mt-0.5 w-4 h-4 shrink-0 text-trust-300" />
                            <span className="min-w-0">
                              <span className="block text-[15px] font-semibold leading-snug text-white">{name}</span>
                              {detail.length > 0 && (
                                <span className="block text-[13px] leading-snug text-white/60">
                                  {detail.join(', ')}
                                </span>
                              )}
                            </span>
                          </span>
                          <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white/45">
                            {money(inc.price)}
                          </span>
                        </li>
                      )
                    })}
                  </ul>

                  <MoreOnPhone
                    className="mt-5 border-t border-white/10 pt-5"
                    tone="dark"
                    label="Why buy it as one package"
                  >
                    <ul className="grid gap-2 pt-4 sm:pt-0">
                      {flagship.reasons.map((r) => (
                        <li key={r} className="flex items-start gap-2.5 text-[14px] text-white/70">
                          <Icons.spark className="mt-0.5 w-4 h-4 shrink-0 text-orbit-300" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </MoreOnPhone>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Pricing() {
  return (
    <Layout
      title="Pricing & Packages"
      description="Simple, fixed LogoOrbit pricing, logos from $49, branding kits from $59, websites from $699, logo animation from $299, and The Complete Brand package at $1,299. No hidden extras."
      path="/pricing"
    >
      <PageHero
        eyebrow="Pricing"
        title="Pick what you need."
        highlight="One fixed price."
        intro="Everything we sell is on this page, grouped into five plain categories with a note on every card telling you who it suits."
      >
        <div className="mt-7 sm:mt-9 mx-auto grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
          {promises.map((p) => {
            const Icon = p.icon
            return (
              <span
                key={p.label}
                className="flex flex-col items-center gap-1.5 rounded-2xl glass px-2 py-3 text-center sm:flex-row sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-left"
              >
                <Icon className="w-5 h-5 shrink-0 text-trust-300" />
                <span>
                  <span className="block text-[12px] sm:text-sm font-bold leading-tight text-white">{p.label}</span>
                  <span className="hidden sm:block text-[12px] leading-tight text-white/60">{p.sub}</span>
                </span>
              </span>
            )
          })}
        </div>

        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a href="#complete-brand" className="btn-action px-7 py-3.5 sm:py-4">
            See our best offer
            <Icons.arrow className="w-5 h-5" />
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-3.5 sm:py-4 font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Icons.phone className="w-5 h-5" />
            Ask us which one
          </a>
        </div>
      </PageHero>

      <TrustBar />

      <Flagship />

      {/* Prices first. Everything that helps you choose sits underneath them. */}
      <PricingCatalogue />

      <Finder />

      {/* One team for the whole lot, said plainly, once the prices are read. */}
      <section className="py-10 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">One team</span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
              Whatever the job is, it stays in this building
            </h2>
            <p className="mt-3 text-[15px] sm:text-lg leading-relaxed text-ink-500">
              You never have to find a second supplier halfway through. If it carries your brand, we design it.
            </p>
          </Reveal>

          <div className="mt-7 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {capabilities.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.label} delay={i * 50} className="h-full">
                  <div className="flex h-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5">
                    <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[14px] font-semibold leading-snug text-ink-900">{c.label}</span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* What actually happens once you order. */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">After you order</span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
              Four steps, and none of them are your job
            </h2>
            <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">
              You describe the business. We handle every design decision and come back with finished work to react to.
            </p>
          </Reveal>

          <ProcessSteps />
        </div>
      </section>

      <Guarantees />

      <PricingFaqs />

      {/* Help band */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-7 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-8 sm:py-10">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-xl sm:text-3xl font-bold text-ink-900">Still not sure which one?</h2>
                <p className="mt-3 text-[15px] sm:text-[17px] leading-relaxed text-ink-500">
                  Tell us what you are building in a sentence or two and we will tell you which package fits, or
                  quote you for something custom if none of them do. Free, and there is no pressure to buy.
                </p>
              </div>

              <div className="flex w-full flex-col sm:w-auto sm:flex-row gap-3 shrink-0">
                <Link href="/contact" className="btn-action px-7 py-3.5">
                  Ask for a recommendation
                  <Icons.arrow className="w-4.5 h-4.5" />
                </Link>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
                >
                  <Icons.phone className="w-4.5 h-4.5" />
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
