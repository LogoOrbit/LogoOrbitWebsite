import { useState } from 'react'
import Link from 'next/link'
import MoreOnPhone from './MoreOnPhone'
import { Icons } from './Icons'
import { money } from '../lib/pricing'
import { packagePathFor } from '../lib/packages'
import { whatsappLink } from '../lib/site'

/**
 * Every card now has a page behind it: the full specification, how the tier
 * compares to the ones either side, and what happens after you order. The
 * card stays a comparison object, the page carries the detail.
 */
function DetailsLink({ item, featured, label = 'See the full package page' }) {
  const href = packagePathFor(item)
  if (!href) return null

  return (
    <Link
      href={href}
      className={`mt-3 inline-flex w-full items-center justify-center gap-1.5 text-[14px] font-semibold transition-colors ${
        featured ? 'text-orbit-300 hover:text-white' : 'text-brand-600 hover:text-brand-700'
      }`}
    >
      {label}
      <Icons.arrow className="w-4 h-4" />
    </Link>
  )
}

/** The message a WhatsApp order link opens with, naming the exact card clicked. */
function orderMessage(item) {
  return `Hi LogoOrbit, I'd like to order the ${item.name} ${(item.kind || 'package').toLowerCase()} at ${money(item.price)}.`
}

function OrderButton({ item, featured, children = 'Order this package' }) {
  return (
    <Link
      href={whatsappLink(orderMessage(item))}
      target="_blank"
      rel="noopener noreferrer"
      className={
        // Both variants keep the same type size and stay on one line: a
        // wrapped "Order this / package" next to a single-line one made the
        // four cards look like different components.
        featured
          ? 'btn-action mt-6 w-full whitespace-nowrap px-5 py-3.5 text-[15px]'
          : 'mt-6 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink-900 px-5 py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-action-600'
      }
    >
      {children}
      <Icons.arrow className="w-4 h-4" />
    </Link>
  )
}

/** The one-line "who is this for" note that sits under every price. */
function BestFor({ text, featured }) {
  if (!text) return null

  return (
    <div className={`mt-5 rounded-2xl px-4 py-3 ${featured ? 'bg-white/10' : 'bg-brand-50/70'}`}>
      <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${featured ? 'text-orbit-300' : 'text-brand-600'}`}>
        Best for
      </p>
      <p className={`mt-1 text-[14px] leading-snug ${featured ? 'text-white/85' : 'text-ink-700'}`}>{text}</p>
    </div>
  )
}

function Badge({ children }) {
  return (
    <span className="pointer-events-none absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-action-400 to-action-600 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-white shadow-lg shadow-action-600/50">
      <span className="flex items-center gap-1.5">
        <Icons.spark className="w-3.5 h-3.5" />
        {children}
      </span>
    </span>
  )
}

/**
 * Each tier gets its own colour, medal and top bar. Four identical white cards
 * in a row give a reader nothing to hold on to; a Bronze card should be
 * recognisably a different thing from a Platinum one at a glance.
 *
 * The accents are decorative only: every piece of text keeps the readable
 * ink/white colours, so nothing here depends on colour to be understood.
 */
const tierStyles = [
  { bar: 'from-amber-700 via-amber-500 to-amber-600', medal: 'from-amber-600 to-amber-400', hover: 'hover:border-amber-300' },
  { bar: 'from-slate-400 via-slate-300 to-slate-400', medal: 'from-slate-400 to-slate-300', hover: 'hover:border-slate-400' },
  { bar: 'from-yellow-500 via-amber-300 to-yellow-500', medal: 'from-yellow-500 to-amber-300', hover: 'hover:border-yellow-400' },
  { bar: 'from-violet-500 via-orbit-300 to-violet-500', medal: 'from-violet-500 to-orbit-300', hover: 'hover:border-violet-400' },
]

const tierOf = (tier = 0) => tierStyles[tier % tierStyles.length]

/**
 * The medal carries the tier's colour and the package's initial. It used to
 * carry the tier number, but the highlighted card is moved up the row, so the
 * numbers read 1, 4, 2, 3 on screen, which looks like a bug rather than a rank.
 */
function TierMedal({ tier = 0, featured, label = '' }) {
  const style = tierOf(tier)

  return (
    <span
      className={`grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br ${style.medal} text-[15px] font-bold text-white shadow-sm ${
        featured ? 'ring-2 ring-white/25' : ''
      }`}
      aria-hidden="true"
    >
      {label.trim().charAt(0).toUpperCase()}
    </span>
  )
}

/**
 * The accent bar has to stop where the card's rounded corner starts. Rounding
 * the bar itself does not do that, a 6px strip with a 24px top radius keeps
 * square bottom corners that poke out past the curve, so the clipping is done
 * by a wrapper that shares the card's radius.
 */
function TopBar({ tier = 0 }) {
  return (
    <span
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1.5 overflow-hidden rounded-t-3xl"
      aria-hidden="true"
    >
      <span className={`block h-full w-full bg-gradient-to-r ${tierOf(tier).bar}`} />
    </span>
  )
}

// The featured card is raised rather than scaled: scaling resamples the text
// and the ring, which reads as a slightly blurred card next to its sharp
// neighbours. The extra top padding is the room the badge needs.
const shell = (featured, tier = 0) =>
  `relative flex h-full flex-col rounded-3xl px-6 pb-6 sm:px-7 sm:pb-7 transition-all duration-300 ${
    featured
      ? 'pt-9 sm:pt-10 bg-gradient-to-b from-ink-900 to-[#111d3b] text-white shadow-2xl shadow-action-900/20 ring-2 ring-action-500 lg:-translate-y-2'
      : `pt-6 sm:pt-7 bg-white border border-slate-200 hover:-translate-y-1.5 hover:shadow-xl ${tierOf(tier).hover}`
  }`

/** Says out loud why the highlighted card is highlighted. */
function Recommended() {
  return (
    <p className="mt-4 flex items-center justify-center gap-2 rounded-full bg-action-500/15 px-3 py-2 text-[12px] font-semibold text-action-300">
      <Icons.check className="w-4 h-4 shrink-0" />
      What our designers put most clients on
    </p>
  )
}

/**
 * The full spec list, hidden until asked for. The three or four points that
 * actually separate the tiers are always visible; the long list underneath is
 * only useful to someone who is already comparing closely.
 */
function FullList({ features, featured }) {
  const [open, setOpen] = useState(false)

  if (!features?.length) return null

  return (
    <div className={`mt-4 border-t pt-4 ${featured ? 'border-white/10' : 'border-slate-100'}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 text-[13px] font-semibold ${
          featured ? 'text-orbit-300 hover:text-white' : 'text-brand-600 hover:text-brand-700'
        }`}
      >
        {open ? 'Hide the full list' : `See the full list (${features.length} items)`}
        <Icons.plus className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
      </button>

      <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <ul className="mt-3 space-y-1.5">
            {features.map((f) => (
              <li key={f} className={`flex items-start gap-2 text-[13px] ${featured ? 'text-white/70' : 'text-ink-500'}`}>
                <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${featured ? 'bg-white/40' : 'bg-ink-300'}`} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/** Standard package card: name, price, who it suits, what makes it different. */
export function PriceCard({ item, tier = 0 }) {
  const featured = item.featured
  const points = item.highlights?.length ? item.highlights : item.features

  // The first three points are what actually separate this tier from the one
  // above it, and they stay on the card at every width. Everything after them
  // is spec-sheet detail, which a phone reader only wants once they have
  // narrowed it down to this card, so it folds away below `sm`.
  // Only fold when folding actually buys a screen back. Hiding one or two
  // bullets behind a tap costs a card a whole extra control and saves forty
  // pixels, and on a tier that also carries a full spec list it left two
  // disclosures stacked on top of each other.
  //
  // `FullList` and the "choose a type" grid are left out of the fold for the
  // same reason: the first is a disclosure of its own, and the second is four
  // words in two columns, so neither is worth a tap.
  const tail = points.slice(3)
  const fold = tail.length >= 3
  const lead = fold ? points.slice(0, 3) : points
  const rest = fold ? tail : []

  return (
    <div className={shell(featured, tier)}>
      <TopBar tier={tier} />
      {featured && item.badge && <Badge>{item.badge}</Badge>}

      <div className="flex items-center gap-3">
        <TierMedal tier={tier} featured={featured} label={item.name} />
        <div className="min-w-0">
          <p className={`text-lg sm:text-xl font-bold leading-tight ${featured ? 'text-white' : 'text-ink-900'}`}>
            {item.name}
          </p>
          {item.kind && (
            <p className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${featured ? 'text-orbit-300' : 'text-brand-600'}`}>
              {item.kind}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 flex flex-wrap items-baseline gap-x-1.5">
        {item.from && (
          <span className={`text-xs font-medium ${featured ? 'text-white/70' : 'text-ink-500'}`}>from</span>
        )}
        <span className={`text-[2.1rem] sm:text-4xl font-bold tracking-tight ${featured ? 'text-white' : 'text-ink-900'}`}>
          {money(item.price)}
        </span>
        <span className={`text-[13px] ${featured ? 'text-white/70' : 'text-ink-500'}`}>
          {item.per || 'one-off'}
        </span>
      </p>

      <BestFor text={item.bestFor} featured={featured} />

      <div className="mt-5 flex-1">
        <ul className="space-y-2.5">
          {lead.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${featured ? 'text-trust-300' : 'text-trust-500'}`} />
              <span className={featured ? 'text-white/85' : 'text-ink-700'}>{f}</span>
            </li>
          ))}
        </ul>

        {fold && (
          <MoreOnPhone
            className="mt-4"
            tone={featured ? 'dark' : 'light'}
            label={`See full details (${rest.length} more)`}
          >
            <ul className="space-y-2.5 pt-4 sm:pt-0">
              {rest.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${featured ? 'text-trust-300' : 'text-trust-500'}`} />
                  <span className={featured ? 'text-white/85' : 'text-ink-700'}>{f}</span>
                </li>
              ))}
            </ul>
          </MoreOnPhone>
        )}

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

        {item.highlights && <FullList features={item.features} featured={featured} />}

        {item.samples && (
          <div className={`mt-4 border-t pt-4 ${featured ? 'border-white/10' : 'border-slate-100'}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider ${featured ? 'text-white/60' : 'text-ink-500'}`}>
              Watch a real example
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
      </div>

      <OrderButton item={item} featured={featured} />
      <DetailsLink item={item} featured={featured} />
      {featured && <Recommended />}
    </div>
  )
}

/** Bundle card: what is inside, what each part costs, and the saving. */
export function BundleCard({ item, tier = 0 }) {
  const featured = item.featured

  return (
    <div className={shell(featured, tier)}>
      <TopBar tier={tier} />
      {featured && <Badge>{item.badge || 'Most popular'}</Badge>}

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <TierMedal tier={tier} featured={featured} label={item.name} />
          <div className="min-w-0">
            <p className={`text-lg sm:text-xl font-bold leading-tight ${featured ? 'text-white' : 'text-ink-900'}`}>
              {item.name}
            </p>
            <p className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${featured ? 'text-orbit-300' : 'text-brand-600'}`}>
              Bundle
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-bold ${
            featured ? 'bg-trust-500/20 text-trust-300' : 'bg-trust-50 text-trust-700'
          }`}
        >
          Save {item.savingPct}%
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-2.5">
        <span className={`text-[2.1rem] sm:text-4xl font-bold tracking-tight ${featured ? 'text-white' : 'text-ink-900'}`}>
          {money(item.price)}
        </span>
        <span className={`text-lg line-through ${featured ? 'text-white/60' : 'text-ink-500'}`}>
          {money(item.was)}
        </span>
      </div>

      <p className={`mt-1.5 text-sm font-semibold ${featured ? 'text-trust-300' : 'text-trust-600'}`}>
        You save {money(item.saving)}
      </p>

      {item.bestSaving && !featured && (
        <span className="mt-2.5 inline-flex items-center gap-1.5 self-start rounded-full bg-trust-50 px-2.5 py-1 text-[12px] font-bold text-trust-700">
          <Icons.spark className="w-3.5 h-3.5" />
          Biggest discount
        </span>
      )}

      <BestFor text={item.bestFor} featured={featured} />

      <div className={`mt-5 flex-1 border-t pt-5 ${featured ? 'border-white/10' : 'border-slate-100'}`}>
        <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${featured ? 'text-white/70' : 'text-ink-500'}`}>
          What is in it
        </p>
        <ul className="mt-3 space-y-3">
          {item.includes.map((inc) => (
            <li key={inc.label} className="flex items-start justify-between gap-3 text-sm">
              <span className="flex items-start gap-2.5">
                <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${featured ? 'text-trust-300' : 'text-trust-500'}`} />
                <span className={featured ? 'text-white/85' : 'text-ink-700'}>{inc.label}</span>
              </span>
              <span className={`shrink-0 text-[13px] font-semibold tabular-nums ${featured ? 'text-white/70' : 'text-ink-500'}`}>
                {money(inc.price)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* The same number is already struck through beside the price and named
          again in "you save", so on a phone this third telling is dropped. */}
      <div
        className={`mt-4 hidden items-center justify-between rounded-2xl px-4 py-2.5 text-sm sm:flex ${
          featured ? 'bg-white/5' : 'bg-slate-50'
        }`}
      >
        <span className={featured ? 'text-white/70' : 'text-ink-500'}>Bought separately</span>
        <span className={`font-semibold line-through ${featured ? 'text-white/70' : 'text-ink-500'}`}>
          {money(item.was)}
        </span>
      </div>

      <OrderButton item={item} featured={featured} />
      <DetailsLink item={item} featured={featured} label="See what is in this bundle" />
      {featured && <Recommended />}
    </div>
  )
}

/** Wide, multi-column card for the flagship packages. */
export function BigPackage({ pkg, tone = 'dark' }) {
  const dark = tone === 'dark'
  const lineCount = pkg.groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${
        dark ? 'mesh-bg text-white' : 'border border-slate-200 bg-white'
      }`}
    >
      {dark && <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />}

      <div className="relative p-5 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 sm:gap-6">
          <div className="max-w-xl">
            {pkg.eyebrow && (
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                  dark ? 'bg-white/10 text-orbit-300' : 'bg-brand-50 text-brand-600'
                }`}
              >
                {pkg.eyebrow}
              </span>
            )}
            <h3 className={`mt-3 text-[1.6rem] sm:text-4xl font-bold leading-tight ${dark ? 'text-white' : 'text-ink-900'}`}>
              {pkg.name} <span className="font-normal opacity-60">{pkg.kind}</span>
            </h3>
            {pkg.bestFor && (
              <p className={`mt-2.5 text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-ink-500'}`}>
                {pkg.bestFor}
              </p>
            )}
          </div>

          {/* On a phone the price and the button are the two things worth the
              width, so they take a row each rather than wrapping awkwardly. */}
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            <span className={`text-4xl sm:text-5xl font-bold tracking-tight ${dark ? 'text-white' : 'text-ink-900'}`}>
              {money(pkg.price)}
            </span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={whatsappLink(orderMessage(pkg))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-action w-full px-6 py-3.5 sm:w-auto"
              >
                Order this package
                <Icons.arrow className="w-4 h-4" />
              </Link>
              <DetailsLink item={pkg} featured={dark} label="Read the full details" />
            </div>
          </div>
        </div>

        <MoreOnPhone
          className={`mt-6 border-t pt-6 sm:mt-8 sm:pt-8 ${dark ? 'border-white/10' : 'border-slate-100'}`}
          tone={dark ? 'dark' : 'light'}
          label={`See everything included (${lineCount} items)`}
        >
          <div className="grid gap-7 pt-6 sm:grid-cols-2 sm:gap-8 sm:pt-0 lg:grid-cols-3">
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
        </MoreOnPhone>
      </div>
    </div>
  )
}
