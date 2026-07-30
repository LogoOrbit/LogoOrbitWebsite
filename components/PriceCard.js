import Link from 'next/link'
import { Icons } from './Icons'
import { money } from '../lib/pricing'

/** Standard package card: name, price, feature list. */
export function PriceCard({ item }) {
  const featured = item.featured

  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 ${
        featured
          ? 'bg-ink-900 text-white shadow-2xl shadow-ink-900/25 ring-1 ring-white/10'
          : 'bg-white border border-slate-200 hover:-translate-y-1.5 hover:shadow-xl'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-flare-400 to-flare-500 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-900">
          Most popular
        </span>
      )}

      <p className={`text-xl font-bold ${featured ? 'text-white' : 'text-ink-900'}`}>{item.name}</p>
      {item.kind && (
        <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${featured ? 'text-orbit-400' : 'text-brand-600'}`}>
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
            <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${featured ? 'text-orbit-400' : 'text-emerald-500'}`} />
            <span className={featured ? 'text-white/80' : 'text-ink-700'}>{f}</span>
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
            References
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {item.samples.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-[13px] font-medium underline underline-offset-2 ${
                  featured ? 'text-orbit-400 hover:text-white' : 'text-brand-600 hover:text-orbit-600'
                }`}
              >
                <Icons.play className="w-3.5 h-3.5" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/contact"
        className={`mt-6 flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition-all hover:-translate-y-0.5 ${
          featured
            ? 'bg-gradient-to-r from-brand-500 to-orbit-500 text-white shadow-lg shadow-brand-600/30'
            : 'bg-ink-900 text-white hover:bg-brand-600'
        }`}
      >
        Order Now
        <Icons.arrow className="w-4 h-4" />
      </Link>
    </div>
  )
}

/** Bundle card: shows component products and the saving. */
export function BundleCard({ item }) {
  const featured = item.featured
  const saving = item.was - item.price

  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 ${
        featured
          ? 'bg-ink-900 text-white shadow-2xl shadow-ink-900/25 ring-1 ring-white/10'
          : 'bg-white border border-slate-200 hover:-translate-y-1.5 hover:shadow-xl'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-flare-400 to-flare-500 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-900">
          Best value
        </span>
      )}

      <p className={`text-xl font-bold ${featured ? 'text-white' : 'text-ink-900'}`}>{item.name}</p>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${featured ? 'text-orbit-400' : 'text-brand-600'}`}>
        Bundle
      </p>

      <div className="mt-4 flex items-baseline gap-2.5">
        <span className={`text-4xl font-bold tracking-tight ${featured ? 'text-white' : 'text-ink-900'}`}>
          {money(item.price)}
        </span>
        <span className={`text-lg line-through ${featured ? 'text-white/40' : 'text-ink-300'}`}>
          {money(item.was)}
        </span>
      </div>

      <span
        className={`mt-2.5 self-start rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
          featured ? 'bg-emerald-400/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
        }`}
      >
        Save {money(saving)}
      </span>

      <ul className={`mt-6 flex-1 space-y-3 border-t pt-5 ${featured ? 'border-white/10' : 'border-slate-100'}`}>
        {item.includes.map((inc) => (
          <li key={inc.label} className="flex items-start justify-between gap-3 text-sm">
            <span className="flex items-start gap-2.5">
              <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${featured ? 'text-orbit-400' : 'text-emerald-500'}`} />
              <span className={featured ? 'text-white/85' : 'text-ink-700'}>{inc.label}</span>
            </span>
            <span className={`shrink-0 text-[13px] font-semibold ${featured ? 'text-white/50' : 'text-ink-300'}`}>
              {money(inc.price)}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`mt-6 flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition-all hover:-translate-y-0.5 ${
          featured
            ? 'bg-gradient-to-r from-brand-500 to-orbit-500 text-white shadow-lg shadow-brand-600/30'
            : 'bg-ink-900 text-white hover:bg-brand-600'
        }`}
      >
        Order Now
        <Icons.arrow className="w-4 h-4" />
      </Link>
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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            {pkg.eyebrow && (
              <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-orbit-400' : 'text-brand-600'}`}>
                {pkg.eyebrow}
              </span>
            )}
            <h3 className={`mt-2 text-3xl sm:text-4xl font-bold ${dark ? 'text-white' : 'text-ink-900'}`}>
              {pkg.name} <span className="font-normal opacity-60">{pkg.kind}</span>
            </h3>
          </div>

          <div className="flex items-center gap-5">
            <span className={`text-5xl font-bold tracking-tight ${dark ? 'text-white' : 'text-ink-900'}`}>
              {money(pkg.price)}
            </span>
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-all hover:-translate-y-0.5 ${
                dark
                  ? 'bg-white text-ink-900 shadow-xl shadow-black/25'
                  : 'bg-ink-900 text-white hover:bg-brand-600'
              }`}
            >
              Order Now
              <Icons.arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className={`mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 border-t pt-8 ${dark ? 'border-white/10' : 'border-slate-100'}`}>
          {pkg.groups.map((group) => (
            <div key={group.title}>
              <p className={`text-sm font-bold uppercase tracking-wider ${dark ? 'text-orbit-400' : 'text-brand-600'}`}>
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm">
                    <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${dark ? 'text-orbit-400' : 'text-emerald-500'}`} />
                    <span className={dark ? 'text-white/80' : 'text-ink-700'}>{it}</span>
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
