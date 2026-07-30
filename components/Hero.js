import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Icons, Star } from './Icons'
import LogoMark, { portfolio } from './LogoMark'
import { site } from '../lib/site'

const showcase = [portfolio[0], portfolio[4], portfolio[9], portfolio[2], portfolio[8]]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % showcase.length), 2600)
    return () => clearInterval(id)
  }, [])

  const active = showcase[index]

  return (
    <section id="top" className="relative -mt-18 pt-18 overflow-hidden mesh-bg text-white">
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />

      {/* drifting light blobs */}
      <div className="absolute -top-24 -left-24 w-[38rem] h-[38rem] rounded-full bg-brand-500/25 blur-3xl animate-drift" aria-hidden="true" />
      <div
        className="absolute -bottom-40 -right-20 w-[34rem] h-[34rem] rounded-full bg-orbit-500/25 blur-3xl animate-drift"
        style={{ animationDelay: '-7s' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-flare-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-flare-400" />
            </span>
            {site.years}+ years · {site.reviewCount.toLocaleString()} brands launched
          </span>

          <h1 className="mt-6 text-[2.5rem] leading-[1.07] sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight text-white">
            Online Logo Maker{' '}
            <span className="block text-gradient-light">&amp; Custom Design Services</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Original logos designed by hand from{' '}
            <span className="font-semibold text-white">$49</span> — with your first concepts back in{' '}
            <span className="font-semibold text-white">24 hours</span>. Then scale into a full brand with
            websites, animation, apps and marketing, all under one roof.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
            <Link href="/contact" className="group btn-action px-7 py-4 text-[17px]">
              Get My Free Quote
              <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <Icons.play className="w-5 h-5" />
              See Our Work
            </Link>
          </div>

          <p className="mt-4 text-sm text-white/55">
            Free consultation · No card required · Reply within one business day
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-7">
            <div className="flex items-center gap-2.5">
              <div className="flex text-flare-400">
                {[0, 1, 2, 3].map((i) => <Star key={i} className="w-4.5 h-4.5" />)}
                <Star className="w-4.5 h-4.5" half id="hero-half" />
              </div>
              <p className="text-sm text-white/75">
                <span className="font-semibold text-white">{site.rating}</span> from{' '}
                {site.reviewCount.toLocaleString()} customers
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Icons.shield className="w-5 h-5 text-trust-300" />
              100% ownership &amp; money-back guarantee
            </div>
          </div>
        </div>

        {/* Live preview card */}
        <div className="relative">
          <div
            className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-brand-500/35 to-orbit-500/35 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative rounded-3xl bg-white p-6 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-medium text-ink-300">{site.domain}/logo-maker</span>
            </div>

            <div className="py-9 grid place-items-center">
              <div
                key={active.name}
                className="grid place-items-center w-40 h-40 rounded-3xl transition-all duration-500"
                style={{ backgroundColor: active.bg, color: active.color }}
              >
                <LogoMark shape={active.shape} className="w-24 h-24" />
              </div>
              <p className="mt-5 text-2xl font-bold tracking-[0.16em] text-ink-900">{active.word}</p>
              <p className="mt-1 text-sm text-ink-500">{active.category}</p>
            </div>

            <div className="flex items-center justify-center gap-2 pb-5">
              {showcase.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${s.name} concept`}
                  className="grid place-items-center h-11 w-6 px-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      i === index ? 'w-7 bg-brand-600' : 'w-1.5 bg-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Reassurance sits inside the card — as floating chips these
                overlapped the card and covered the button beneath. */}
            <div className="grid grid-cols-2 gap-2.5 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2.5">
                <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-trust-50 text-trust-600">
                  <Icons.check className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-ink-900 leading-tight">Unlimited revisions</p>
                  <p className="text-xs text-ink-500 leading-tight">Until it&apos;s perfect</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-brand-50 text-brand-600">
                  <Icons.clock className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-ink-900 leading-tight">24-hour delivery</p>
                  <p className="text-xs text-ink-500 leading-tight">Same-day drafts</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink-900">Concept ready</p>
                <p className="text-xs text-ink-500">Vector files included</p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 rounded-full bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-action-600 transition-colors"
              >
                Customise
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-16 sm:h-20 bg-white [clip-path:ellipse(75%_100%_at_50%_100%)]" aria-hidden="true" />
    </section>
  )
}
