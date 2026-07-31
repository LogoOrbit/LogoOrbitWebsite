import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import Guarantees from '../components/Guarantees'
import Reveal from '../components/Reveal'
import PricingExplorer from '../components/PricingExplorer'
import { Icons } from '../components/Icons'
import { headline, money } from '../lib/pricing'
import { process, site } from '../lib/site'

const promises = [
  { icon: Icons.check, label: 'One fixed price', sub: 'quoted up front' },
  { icon: Icons.shield, label: 'Money-back guarantee', sub: 'on every package' },
  { icon: Icons.spark, label: 'You own everything', sub: 'copyright included' },
]

/** Money questions, in the words a first-time buyer actually uses. */
const pricingFaqs = [
  {
    q: 'Is the price on the card the price I pay?',
    a: 'Yes. Every package is a single fixed price with nothing added afterwards — no setup fee, no file-release fee, no subscription. The only thing that changes the price is you asking for extra work that is not listed, and we would agree that with you in writing first.',
  },
  {
    q: 'I do not know anything about design. Will that be a problem?',
    a: 'No — most of our clients do not. You tell us about your business in plain words, we do the design thinking, and we show you finished options to react to. "I like this one but not the colour" is a perfectly good brief.',
  },
  {
    q: 'What is the difference between a logo and a branding kit?',
    a: 'The logo is the mark itself. The branding kit is that mark applied to the things you actually hand out and post — business cards, letterheads, email signatures, social media covers, signage. Most businesses end up needing both, which is why the bundles exist.',
  },
  {
    q: 'Can I start small and add more later?',
    a: 'Yes. Plenty of clients start with a logo and come back for the branding kit or the website. Buying them together is cheaper, but nothing is lost by taking it one step at a time — we keep your files on record.',
  },
  {
    q: 'What if I do not like any of the designs?',
    a: 'We keep revising within your package. If we still cannot produce something you are happy to use, you get your money back in full — no forms and no argument.',
  },
  {
    q: 'How long does it take?',
    a: 'First logo concepts land within 24 to 48 hours depending on the package. Branding kits follow within a few days of the logo being signed off, and websites typically run two to four weeks depending on size.',
  },
]

function PricingFaqs() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Before you buy</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-ink-900">
            The questions everyone asks
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
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
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-ink-900">{item.q}</span>
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
                      <p className="px-6 pb-5 text-[15px] leading-relaxed text-ink-500">{item.a}</p>
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

export default function Pricing() {
  return (
    <Layout
      title="Pricing & Packages"
      description="Simple, fixed LogoOrbit pricing — logos from $49, branding kits from $59, websites from $699, logo animation from $299, and money-saving bundles from $89. No hidden extras."
      path="/pricing"
    >
      <PageHero
        eyebrow="Pricing"
        title="Pick what you need."
        highlight="One fixed price."
        intro="Five simple categories, four tiers in each, and a plain-English note on every card telling you who it suits. No jargon, no hidden extras."
      >
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {promises.map((p) => {
            const Icon = p.icon
            return (
              <span key={p.label} className="flex items-center gap-2.5 rounded-2xl glass px-4 py-2.5 text-left">
                <Icon className="w-5 h-5 shrink-0 text-trust-300" />
                <span>
                  <span className="block text-sm font-bold leading-tight text-white">{p.label}</span>
                  <span className="block text-[12px] leading-tight text-white/60">{p.sub}</span>
                </span>
              </span>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
          <a href="#packages" className="btn-action px-7 py-4">
            See the packages
            <Icons.arrow className="w-5 h-5" />
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Icons.phone className="w-5 h-5" />
            Ask us which one
          </a>
        </div>
      </PageHero>

      <TrustBar />

      {/* The one package to point at when someone has no idea where to start. */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl mesh-bg text-white">
              <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />

              <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-8 sm:p-10">
                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
                    <Icons.spark className="w-4 h-4" />
                    Most people choose this
                  </span>
                  <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
                    The {headline.name} 3-in-1 Bundle
                  </h2>
                  <p className="mt-3 text-[17px] leading-relaxed text-white/75">{headline.bestFor}</p>

                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {headline.includes.map((inc) => (
                      <li key={inc.label} className="flex items-center gap-2 text-[15px] text-white/85">
                        <Icons.check className="w-4 h-4 shrink-0 text-trust-300" />
                        {inc.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 rounded-3xl bg-white/10 p-6 text-center backdrop-blur">
                  <p className="flex items-baseline justify-center gap-2.5">
                    <span className="text-5xl font-bold tracking-tight text-white">{money(headline.price)}</span>
                    <span className="text-lg text-white/45 line-through">{money(headline.was)}</span>
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-trust-300">
                    You save {money(headline.saving)} buying it together
                  </p>

                  <Link href="/contact" className="btn-action mt-5 w-full px-7 py-3.5">
                    Order this package
                    <Icons.arrow className="w-4 h-4" />
                  </Link>
                  <a
                    href="#packages"
                    className="mt-3 block text-[13px] font-medium text-white/70 underline underline-offset-4 hover:text-white"
                  >
                    Or compare everything first
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PricingExplorer />

      {/* What actually happens once you order. */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">After you order</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-ink-900">
              Four steps, and none of them are your job
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              You describe the business. We handle every design decision and come back with finished work to react to.
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 100}>
                <div className="grid place-items-center w-16 h-16 rounded-2xl bg-white shadow-lg shadow-brand-900/5 ring-1 ring-slate-100">
                  <span className="text-lg font-bold text-gradient">{item.step}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Guarantees />

      <PricingFaqs />

      {/* Help band */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-3xl border border-slate-200 bg-slate-50 px-8 py-10">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">Still not sure which one?</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-500">
                  Tell us what you are building in a sentence or two and we will tell you which package fits — or
                  quote you for something custom if none of them do. Free, and there is no pressure to buy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
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
