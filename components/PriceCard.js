import Link from 'next/link'
import { Icons } from './Icons'
import { money } from '../lib/pricing'

function OrderButton({ featured, children = 'Order Now' }) {
  return (
    <Link
      href="/contact"
      className={
        featured
          ? 'btn-action mt-6 w-full px-5 py-3.5'
          : 'mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-action-600'
      }
    >
      {children}
      <Icons.arrow className="w-4 h-4" />
    </Link>
  )
}

function Reassurance({ featured }) {
  return (
    <p
      className={`mt-3 flex items-center justify-center gap-1.5 text-[13px] ${
        featured ? 'text-white/60' : 'text-ink-500'
      }`}
    >
      <Icons.shield className="w-3.5 h-3.5 text-trust-500" />
      Money-back guarantee
    </p>
  )
}

/** Standard package card: name, price, feature list. */
export function PriceCard({ item }) {
  const featured = item.featured

  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 ${
        featured
          ? 'bg-ink-900 text-white shadow-2xl shadow-ink-900/30 ring-2 ring-action-500/60'
          : 'bg-white border border-slate-200 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-action-400 to-action-600 px-3.5 py-1 text-[12px] font-bold uppercase tracking-wider text-white shadow-lg shadow-action-600/40">
          Most popular
        </span>
      )}

      <p className={`text-xl font-bold ${featured ? 'text-white' : 'text-ink-900'}`}>{item.name}</p>
      {item.kind && (
        <p className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${featured ? 'text-orbit-300' : 'text-brand-600'}`}>
          {item.kind}
        </p>
      )}

      <p className="mt-4 flex items-baseline gap-1.5">
        {item.from && (
          <span className={`text-xs font-medium ${featured ? 'text-white/50' : 'text-ink-300'}`}>from</span>
        )}
        <span className={`text-4xl font-bold tracking-tight ${featured ? 'text-white' : 'text-ink-900'}`}>
          {money(item.price)}
        </span>
      </p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {item.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${featured ? 'text-trust-300' : 'text-trust-500'}`} />
            <span className={featured ? 'text-white/85' : 'text-ink-700'}>{f}</span>
          </li>
        ))}
      </ul>

      {item.choose && (
        <div className={`mt-5 rounded-2xl p-4 ${featured ? 'bg-white/5' : 'bg-slate-50'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider ${featured ? 'text-white/60' : 'text-ink-500'}`}>
            {item.choose.label}
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
            {item.choose.options.map((o) => (
              <li key={o} className={`text-[13px] ${featured ? 'text-white/75' : 'text-ink-700'}`}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      {item.samples && (
        <div className={`mt-5 border-t pt-4 ${featured ? 'border-white/10' : 'border-slate-100'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider ${featured ? 'text-white/60' : 'text-ink-500'}`}>
            See it in action
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {item.samples.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-[13px] font-medium underline underline-offset-2 ${
                  featured ? 'text-orbit-300 hover:text-white' : 'text-brand-600 hover:text-orbit-600'
                }`}
              >
                <Icons.play className="w-3.5 h-3.5" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <OrderButton featured={featured} />
      <Reassurance featured={featured} />
    </div>
  )
}

/** Bundle card: component prices, the saving, and the percentage. */
export function BundleCard({ item }) {
  const featured = item.featured

  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 ${
        featured
          ? 'bg-ink-900 text-white shadow-2xl shadow-ink-900/30 ring-2 ring-action-500/60'
          : 'bg-white border border-slate-200 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-action-400 to-action-600 px-3.5 py-1 text-[12px] font-bold uppercase tracking-wider text-white shadow-lg shadow-action-600/40">
          Best value
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-xl font-bold ${featured ? 'text-white' : 'text-ink-900'}`}>{item.name}</p>
          <p className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${featured ? 'text-orbit-300' : 'text-brand-600'}`}>
            Bundle
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-bold ${
            featured ? 'bg-trust-500/20 text-trust-300' : 'bg-trust-50 text-trust-700'
          }`}
        >
          −{item.savingPct}%
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-2.5">
        <span className={`text-4xl font-bold tracking-tight ${featured ? 'text-white' : 'text-ink-900'}`}>
          {money(item.price)}
        </span>
        <span className={`text-lg line-through ${featured ? 'text-white/40' : 'text-ink-300'}`}>
          {money(item.was)}
        </span>
      </div>

      <p className={`mt-1.5 text-sm font-semibold ${featured ? 'text-trust-300' : 'text-trust-600'}`}>
        You save {money(item.saving)}
      </p>

      <ul className={`mt-6 flex-1 space-y-3 border-t pt-5 ${featured ? 'border-white/10' : 'border-slate-100'}`}>
        {item.includes.map((inc) => (
          <li key={inc.label} className="flex items-start justify-between gap-3 text-sm">
            <span className="flex items-start gap-2.5">
              <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${featured ? 'text-trust-300' : 'text-trust-500'}`} />
              <span className={featured ? 'text-white/85' : 'text-ink-700'}>{inc.label}</span>
            </span>
            <span className={`shrink-0 text-[13px] font-semibold ${featured ? 'text-white/45' : 'text-ink-300'}`}>
              {money(inc.price)}
            </span>
          </li>
        ))}
      </ul>

      <div
        className={`mt-4 flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm ${
          featured ? 'bg-white/5' : 'bg-slate-50'
        }`}
      >
        <span className={featured ? 'text-white/60' : 'text-ink-500'}>Bought separately</span>
        <span className={`font-semibold line-through ${featured ? 'text-white/45' : 'text-ink-300'}`}>
          {money(item.was)}
        </span>
      </div>

      <OrderButton featured={featured} />
      <Reassurance featured={featured} />
    </div>
  )
}

/** Wide, multi-column card for the flagship packages. */
export function BigPackage({ pkg, tone = 'dark' }) {
  const dark = tone === 'dark'

  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${
        dark ? 'mesh-bg text-white' : 'border border-slate-200 bg-white'
      }`}
    >
      {dark && <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />}

      <div className="relative p-8 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            {pkg.eyebrow && (
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                  dark ? 'bg-white/10 text-orbit-300' : 'bg-brand-50 text-brand-600'
                }`}
              >
                {pkg.eyebrow}
              </span>
            )}
            <h3 className={`mt-3 text-3xl sm:text-4xl font-bold ${dark ? 'text-white' : 'text-ink-900'}`}>
              {pkg.name} <span className="font-normal opacity-60">{pkg.kind}</span>
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <span className={`text-5xl font-bold tracking-tight ${dark ? 'text-white' : 'text-ink-900'}`}>
              {money(pkg.price)}
            </span>
            <div>
              <Link href="/contact" className="btn-action px-6 py-3.5">
                Order Now
                <Icons.arrow className="w-4 h-4" />
              </Link>
              <p className={`mt-2 flex items-center gap-1.5 text-[13px] ${dark ? 'text-white/55' : 'text-ink-500'}`}>
                <Icons.shield className="w-3.5 h-3.5 text-trust-400" />
                Money-back guarantee
              </p>
            </div>
          </div>
        </div>

        <div className={`mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 border-t pt-8 ${dark ? 'border-white/10' : 'border-slate-100'}`}>
          {pkg.groups.map((group) => (
            <div key={group.title}>
              <p className={`text-sm font-bold uppercase tracking-wider ${dark ? 'text-orbit-300' : 'text-brand-600'}`}>
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm">
                    <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${dark ? 'text-trust-300' : 'text-trust-500'}`} />
                    <span className={dark ? 'text-white/85' : 'text-ink-700'}>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
