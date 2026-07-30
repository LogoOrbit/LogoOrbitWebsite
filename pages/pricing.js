import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import PricingSection from '../components/PricingSection'
import { BigPackage } from '../components/PriceCard'
import { Icons } from '../components/Icons'
import {
  pricingSections,
  diamondPackage,
  awardWinningPackage,
  premiumPlan,
  ultimateBrandingKit,
} from '../lib/pricing'
import { site } from '../lib/site'

const jump = [
  { label: '3 In 1 Bundles', href: '#bundles-3in1' },
  { label: '2 In 1 Bundles', href: '#bundles-2in1' },
  { label: 'Logo', href: '#logo-packages' },
  { label: 'Animated Logo', href: '#animated-logo' },
  { label: 'Branding Kits', href: '#branding-kits' },
  { label: 'Websites', href: '#website-packages' },
]

export default function Pricing() {
  return (
    <Layout
      title="Pricing & Packages"
      description="LogoOrbit pricing — logo packages from $49, branding kits from $59, websites from $699, animated logos from $299, plus 2-in-1 and 3-in-1 bundles."
      path="/pricing"
    >
      <PageHero
        eyebrow="Pricing"
        title="Straightforward pricing,"
        highlight="no hidden extras"
        intro="Buy a single service or save with a bundle. Every package includes full copyright ownership and our money-back guarantee."
      >
        <div className="mt-9 flex flex-wrap justify-center gap-2">
          {jump.map((j) => (
            <a
              key={j.href}
              href={j.href}
              className="rounded-full glass px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              {j.label}
            </a>
          ))}
        </div>
      </PageHero>

      {/* Special offer */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <BigPackage pkg={diamondPackage} tone="dark" />
          </Reveal>
        </div>
      </section>

      {/* Bundles */}
      <PricingSection section={pricingSections[0]} tone="muted" />
      <PricingSection section={pricingSections[1]} tone="light" />

      {/* Logo packages */}
      <PricingSection section={pricingSections[2]} tone="muted" />

      {/* Flagship logo packages */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 space-y-8">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Art Director plans
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-ink-900">
              When the mark has to be perfect
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              Handled personally by our most senior Art Directors, with unlimited concepts and the complete
              collateral suite included.
            </p>
          </Reveal>

          <Reveal>
            <BigPackage pkg={awardWinningPackage} tone="light" />
          </Reveal>
          <Reveal>
            <BigPackage pkg={premiumPlan} tone="dark" />
          </Reveal>
        </div>
      </section>

      {/* Animated logo */}
      <PricingSection section={pricingSections[3]} tone="muted" />

      {/* Branding kits */}
      <PricingSection section={pricingSections[4]} tone="light" />

      <section className="py-4 sm:py-8 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <BigPackage pkg={ultimateBrandingKit} tone="dark" />
          </Reveal>
        </div>
      </section>

      {/* Websites */}
      <PricingSection section={pricingSections[5]} tone="muted" />

      {/* Help band */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-3xl border border-slate-200 bg-slate-50 px-8 py-10">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">
                  Not sure which package fits?
                </h2>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-500">
                  Tell us what you are building and we will recommend the right tier — or put together a custom
                  quote if nothing here matches. Free consultation, no obligation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-orbit-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/25 hover:-translate-y-0.5 transition-all"
                >
                  Ask for a quote
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
