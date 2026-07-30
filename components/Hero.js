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

          <h1 className="mt-6 text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-[4.15rem] font-bold tracking-tight">
            Online Logo Maker
            <span className="block text-gradient">& Custom Design Services</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Get a custom logo made in <span className="font-semibold text-white">03:00 minutes</span> — then
            scale it into a full brand with websites, animation, apps and marketing. All under one roof.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink-900 shadow-xl shadow-black/25 hover:-translate-y-0.5 hover:shadow-2xl transition-all"
            >
              Start My Design
              <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <Icons.play className="w-5 h-5" />
              See Our Work
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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
              <Icons.shield className="w-5 h-5 text-white/60" />
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
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-7 bg-brand-600' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink-900">Concept ready</p>
                <p className="text-xs text-ink-500">Vector files included</p>
              </div>
              <a
                href="#contact"
                className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
              >
                Customise
              </a>
            </div>
          </div>

          {/* floating chips */}
          <div className="hidden sm:flex absolute -left-8 top-16 items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl animate-float-slow">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600">
              <Icons.check className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">Unlimited revisions</p>
              <p className="text-xs text-ink-500">Until it&apos;s perfect</p>
            </div>
          </div>

          <div
            className="hidden sm:flex absolute -right-6 bottom-14 items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl animate-float-fast"
            style={{ animationDelay: '-2s' }}
          >
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-brand-50 text-brand-600">
              <Icons.clock className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">24-hour delivery</p>
              <p className="text-xs text-ink-500">Same-day drafts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-16 sm:h-20 bg-white [clip-path:ellipse(75%_100%_at_50%_100%)]" aria-hidden="true" />
    </section>
  )
}
