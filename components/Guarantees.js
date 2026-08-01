import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'
import { site } from '../lib/site'

const guarantees = [
  {
    icon: Icons.shield,
    title: 'Free consultation first',
    body: 'Talk the project through with a designer before you pay anything. No card required, no obligation to go ahead.',
  },
  {
    icon: Icons.check,
    title: 'You own it outright',
    body: 'Copyright transfers to you on delivery, along with the editable source files. No licence to renew and nothing to pay again later.',
  },
  {
    icon: Icons.spark,
    title: '100% original, or it is free',
    body: 'Every mark is drawn from scratch for your business. We never resell a concept and never work from a template library.',
  },
]

/** Risk reversal — placed immediately before the pricing ask. */
export default function Guarantees() {
  return (
    <section className="py-16 sm:py-20 bg-trust-50/60">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-trust-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-trust-700">
            <Icons.shield className="w-4 h-4" />
            Included every time
          </span>
          <h2 className="mt-4 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
            The same three things in every package
          </h2>
          <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">
            Whatever you spend, these never change.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {guarantees.map((g, i) => {
            const Icon = g.icon
            return (
              <Reveal key={g.title} delay={i * 90}>
                <div className="h-full rounded-3xl border border-trust-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-trust-50 text-trust-600">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">{g.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{g.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={140} className="mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Link href="/pricing" className="btn-action px-7 py-4">
              See packages &amp; pricing
              <Icons.arrow className="w-5 h-5" />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white px-7 py-4 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
            >
              <Icons.phone className="w-5 h-5" />
              Talk to a designer
            </a>
          </div>
          <p className="mt-4 text-center text-sm text-ink-500">
            Free consultation · No card required · {site.hours}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
