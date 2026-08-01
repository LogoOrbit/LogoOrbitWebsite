import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'
import { site } from '../lib/site'

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.35fr_1fr] gap-6">
        {/* Primary */}
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-3xl mesh-bg px-8 py-12 sm:px-12 sm:py-14 text-white">
            <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
            <div
              className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-orbit-500/30 blur-3xl animate-drift"
              aria-hidden="true"
            />

            <div className="relative max-w-lg">
              <h2 className="text-3xl sm:text-[2.5rem] font-bold leading-[1.12] text-white">
                Try our online logo maker &amp; custom design services now
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                Scalable branding solutions that maximise ROI, from a single logo to a complete identity
                system, priced for every budget.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="/contact"
                  className="group btn-action px-7 py-4"
                >
                  Start now
                  <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <Icons.phone className="w-5 h-5" />
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Designers */}
        <Reveal delay={90}>
          <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50 px-8 py-10">
            <div>
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-flare-400/20 text-flare-500">
                <Icons.spark className="w-6 h-6" />
              </span>
              <h3 className="mt-5 text-2xl font-bold leading-snug text-ink-900">
                Are you a designer?
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                Sell your custom-made logos and get paid for your time and effort. We&apos;re always looking for
                skilled, creative professionals to join our growing team.
              </p>
            </div>

            <a
              href={`mailto:${site.email}?subject=Designer%20application`}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 font-semibold text-white hover:bg-brand-600 transition-colors"
            >
              Apply here
              <Icons.arrow className="w-4.5 h-4.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
