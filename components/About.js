import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'
import LogoMark, { portfolio } from './LogoMark'
import { site } from '../lib/site'

const highlights = [
  'Original, hand-crafted concepts — never templates',
  'In-house design team based in the USA',
  'Free design consultation before you commit',
  'Full copyright ownership on every package',
]

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Visual */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-md aspect-square">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-100 via-orbit-400/20 to-flare-300/25 blur-2xl"
              aria-hidden="true"
            />

            <div className="absolute inset-6 rounded-full border-2 border-dashed border-brand-200 animate-spin-slow" aria-hidden="true" />
            <div
              className="absolute inset-16 rounded-full border-2 border-dashed border-orbit-400/40 animate-spin-slow"
              style={{ animationDirection: 'reverse', animationDuration: '18s' }}
              aria-hidden="true"
            />

            <div className="absolute inset-0 grid place-items-center">
              <div className="grid place-items-center w-32 h-32 rounded-3xl bg-white shadow-2xl shadow-brand-900/15">
                <svg viewBox="0 0 32 32" className="w-16 h-16 text-brand-600" aria-hidden="true">
                  <circle cx="16" cy="16" r="4.4" fill="currentColor" />
                  <ellipse
                    cx="16" cy="16" rx="13" ry="6"
                    transform="rotate(-30 16 16)"
                    stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8"
                  />
                </svg>
              </div>
            </div>

            {/* orbiting sample marks */}
            {[portfolio[1], portfolio[5], portfolio[10], portfolio[3]].map((p, i) => (
              <div
                key={p.name}
                className="absolute grid place-items-center w-16 h-16 rounded-2xl bg-white shadow-xl animate-float-slow"
                style={{
                  color: p.color,
                  animationDelay: `${i * -1.6}s`,
                  ...[
                    { top: '4%', left: '46%' },
                    { top: '44%', right: '0%' },
                    { bottom: '4%', left: '40%' },
                    { top: '40%', left: '0%' },
                  ][i],
                }}
              >
                <LogoMark shape={p.shape} className="w-9 h-9" />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Our story</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] text-ink-900">
              {site.years} years of turning ideas into{' '}
              <span className="text-gradient">brands people remember</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-500">
              LogoOrbit proved to be the hallmark of dedication and perfection in making artistic custom logo
              designs for startups and SMEs across diversified industries. We bring an interactive approach that
              transforms the way logo creation was done before.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-500">
              With over {site.years}+ years working alongside entrepreneurs and multinational ventures, we have
              instilled greatness into every brand mark we designed. Our team of ingenious, professional designers
              is highly adept at hand-crafted work — and every design is original, uniquely tailored to the
              strategic goals of your company.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[15px] text-ink-700">
                  <span className="mt-0.5 grid place-items-center w-5 h-5 shrink-0 rounded-full bg-emerald-50 text-emerald-600">
                    <Icons.check className="w-3.5 h-3.5" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 font-semibold text-white hover:bg-brand-600 transition-colors"
              >
                Book a free consultation
                <Icons.arrow className="w-4.5 h-4.5" />
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
              >
                <Icons.phone className="w-4.5 h-4.5" />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
