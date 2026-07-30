import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons } from './Icons'
import { pricing } from '../lib/site'

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Flexible packages for"
          highlight="every budget"
          body="Straightforward pricing with no hidden fees. Every package includes full copyright ownership and a money-back guarantee."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-6 items-start">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90}>
              <div
                className={`relative h-full rounded-3xl p-8 transition-all duration-300 ${
                  tier.featured
                    ? 'bg-ink-900 text-white shadow-2xl shadow-ink-900/25 lg:-translate-y-4'
                    : 'bg-white border border-slate-200 hover:-translate-y-1.5 hover:shadow-xl'
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-flare-400 to-flare-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink-900">
                    Most popular
                  </span>
                )}

                <h3 className={`text-lg font-bold ${tier.featured ? 'text-white' : 'text-ink-900'}`}>
                  {tier.name}
                </h3>
                <p className={`mt-1.5 text-sm ${tier.featured ? 'text-white/60' : 'text-ink-500'}`}>
                  {tier.blurb}
                </p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className={`text-sm font-medium ${tier.featured ? 'text-white/60' : 'text-ink-300'}`}>
                    from
                  </span>
                  <span className={`text-5xl font-bold tracking-tight ${tier.featured ? 'text-white' : 'text-ink-900'}`}>
                    ${tier.price}
                  </span>
                </p>

                <a
                  href="#contact"
                  className={`mt-7 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-all hover:-translate-y-0.5 ${
                    tier.featured
                      ? 'bg-gradient-to-r from-brand-500 to-orbit-500 text-white shadow-lg shadow-brand-600/30'
                      : 'bg-ink-900 text-white hover:bg-brand-600'
                  }`}
                >
                  Get started
                  <Icons.arrow className="w-4.5 h-4.5" />
                </a>

                <ul className="mt-7 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px]">
                      <Icons.check
                        className={`mt-0.5 w-4.5 h-4.5 shrink-0 ${
                          tier.featured ? 'text-orbit-400' : 'text-emerald-500'
                        }`}
                      />
                      <span className={tier.featured ? 'text-white/80' : 'text-ink-700'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-ink-500">
            Need something bigger — a full brand system, an app, or an ongoing retainer?{' '}
            <a href="#contact" className="font-semibold text-brand-600 underline underline-offset-4 hover:text-orbit-600">
              Ask for a custom quote
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
