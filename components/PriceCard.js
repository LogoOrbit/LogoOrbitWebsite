import { useState } from 'react'
import Link from 'next/link'
import MoreOnPhone from './MoreOnPhone'
import AddToCart from './AddToCart'
import { Icons } from './Icons'
import { money } from '../lib/money'
import { packagePathFor } from '../lib/packages'
import { whatsappLink } from '../lib/site'

/**
 * The cart's view of a package card.
 *
 * The page slug is used as the identity rather than the name, because there is
 * a "Pro" in four different ranges and a cart holding two of them has to be
 * able to tell them apart.
 */
export function cartItemFor(item, kind) {
  const href = packagePathFor(item)
  return {
    sku: href || item.name,
    name: item.name,
    kind: kind || item.kind || 'Package',
    price: item.price,
    from: Boolean(item.from),
    href,
  }
}

/**
 * Every card now has a page behind it: the full specification, how the tier
 * compares to the ones either side, and what happens after you order. The
 * card stays a comparison object, the page carries the detail.
 */
function DetailsLink({ item, featured, className = 'mt-3', label = 'See the full package page' }) {
  const href = packagePathFor(item)
  if (!href) return null

  return (
    <Link
      href={href}
      className={`${className} inline-flex w-full items-center justify-center gap-1.5 text-[13.5px] font-semibold transition-colors ${
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

/**
 * The order button is the quieter of the two: "add to cart" is the decision
 * this page is built around, so it takes the solid pill and this one sits
 * under it as an outline.
 */
function OrderButton({ item, featured, className = 'mt-2.5', children = 'Order this package' }) {
  return (
    <Link
      href={whatsappLink(orderMessage(item))}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border px-5 py-3 text-[14.5px] font-semibold transition-colors ${
        featured
          ? 'border-white/25 text-white hover:border-white/50 hover:bg-white/10'
          : 'border-slate-200 text-ink-900 hover:border-ink-900 hover:bg-slate-50'
      }`}
    >
      {children}
      <Icons.arrow className="w-4 h-4" />
    </Link>
  )
}

/**
 * The one-line "who is this for" note that sits under the name.
 *
 * It used to be a tinted panel labelled "Best for". As plain type directly
 * under the title it reads as the card's subtitle, which is what it always
 * was, and the card loses a box it did not need.
 */
function BestFor({ text, featured, className = 'mt-2' }) {
  if (!text) return null

  return (
    <p className={`${className} text-[13.5px] leading-relaxed ${featured ? 'text-white/70' : 'text-ink-500'}`}>
      {text}
    </p>
  )
}

function Badge({ children }) {
  return (
    <span className="pointer-events-none absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-flare-400 to-flare-500 px-4 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink-900 shadow-lg shadow-flare-500/40">
      <span className="flex items-center gap-1.5">
        <Icons.spark className="w-3.5 h-3.5" />
        {children}
      </span>
    </span>
  )
}

/**
 * The card shell.
 *
 * Plain white with a hairline border, one dark card for the tier we
 * recommend. The tiers used to be told apart by a bronze/silver/gold/platinum
 * medal and a matching top bar, which put four colour schemes in a row that is
 * really one product; the name and the price already say which tier you are
 * looking at. The featured card is raised rather than scaled: scaling
 * resamples the text, which reads as a slightly blurred card next to its
 * sharp neighbours. The extra top padding is the room the badge needs.
 */
const shell = (featured) =>
  `relative flex h-full flex-col rounded-[1.75rem] px-6 pb-7 sm:px-7 transition-all duration-300 ${
    featured
      ? 'pt-9 sm:pt-10 bg-ink-900 text-white shadow-2xl shadow-ink-900/25 lg:-translate-y-2'
      : 'pt-7 bg-white border border-slate-200 shadow-sm hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg'
  }`

/** The card's title block: name, what kind of thing it is, who it suits. */
function CardHead({ item, featured, kind, children }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={`text-xl font-bold leading-tight ${featured ? 'text-white' : 'text-ink-900'}`}>
            {item.name}
          </h3>
          {kind && (
            <p className={`mt-1 text-[11px] font-bold uppercase tracking-[0.18em] ${featured ? 'text-orbit-300' : 'text-brand-600'}`}>
              {kind}
            </p>
          )}
        </div>
        {children}
      </div>
      {/* Three lines of room, so the price and the buttons below it start at
          the same height on all four cards however long the sentence is. */}
      <BestFor text={item.bestFor} featured={featured} className="mt-2.5 sm:min-h-[4.1rem]" />
    </div>
  )
}

/** Says out loud why the highlighted card is highlighted. */
function Recommended() {
  return (
    <p className="mt-3 flex items-center justify-center gap-2 text-[12px] font-semibold text-white/70">
      <Icons.check className="w-4 h-4 shrink-0 text-orbit-300" />
      What our designers put most clients on
    </p>
  )
}

/** A ticked line in the feature list. */
function Tick({ children, featured }) {
  return (
    <li className="flex items-start gap-2.5 text-[14px]">
      <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${featured ? 'text-orbit-300' : 'text-trust-500'}`} />
      <span className={featured ? 'text-white/85' : 'text-ink-700'}>{children}</span>
    </li>
  )
}

/**
 * The rest of the card, behind one button.
 *
 * A card carrying nine ticks, a spec sheet and a portal-type grid is a card
 * nobody reads to the bottom, and four of them side by side is a wall. The
 * points that actually separate this tier stay on the card; everything else,
 * the remaining highlights, the full spec list and the "choose a type" grid,
 * sits behind "Show more" and none of it is lost.
 *
 * The grid-rows animation is used rather than max-height so the panel opens to
 * its own height, whatever that turns out to be.
 */
const LEAD_POINTS = 4

function MoreDetails({ item, featured }) {
  const [open, setOpen] = useState(false)

  const points = item.highlights?.length ? item.highlights : item.features || []
  const lead = points.slice(0, LEAD_POINTS)
  const rest = points.slice(LEAD_POINTS)
  // `features` is the full spec list and only exists alongside `highlights`;
  // without highlights it is already the visible list above.
  const spec = item.highlights?.length ? item.features || [] : []
  const hiddenCount = rest.length + spec.length
  const hasMore = hiddenCount > 0 || Boolean(item.choose)

  return (
    <div className="mt-6 flex-1">
      <ul className="space-y-2.5">
        {lead.map((f) => (
          <Tick key={f} featured={featured}>{f}</Tick>
        ))}
      </ul>

      {hasMore && (
        <>
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              {rest.length > 0 && (
                <ul className="mt-2.5 space-y-2.5">
                  {rest.map((f) => (
                    <Tick key={f} featured={featured}>{f}</Tick>
                  ))}
                </ul>
              )}

              {spec.length > 0 && (
                <div className={`mt-4 border-t pt-4 ${featured ? 'border-white/10' : 'border-slate-100'}`}>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${featured ? 'text-white/60' : 'text-ink-500'}`}>
                    Everything included
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {spec.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2 text-[13px] ${featured ? 'text-white/70' : 'text-ink-500'}`}
                      >
                        <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${featured ? 'bg-white/40' : 'bg-ink-300'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.choose && (
                <div className={`mt-4 rounded-2xl p-4 ${featured ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${featured ? 'text-white/60' : 'text-ink-500'}`}>
                    {item.choose.label}
                  </p>
                  <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                    {item.choose.options.map((o) => (
                      <li key={o} className={`text-[13px] ${featured ? 'text-white/75' : 'text-ink-700'}`}>{o}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className={`mt-3.5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors ${
              featured ? 'text-orbit-300 hover:text-white' : 'text-brand-600 hover:text-brand-700'
            }`}
          >
            {open ? 'Show less' : hiddenCount > 0 ? `Show more (${hiddenCount})` : 'Show more'}
            <Icons.plus className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
          </button>
        </>
      )}

      {item.samples && (
        <div className={`mt-4 border-t pt-4 ${featured ? 'border-white/10' : 'border-slate-100'}`}>
          <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${featured ? 'text-white/60' : 'text-ink-500'}`}>
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
  )
}

/** The price line: an optional "from", the number, and the terms. */
function Price({ item, featured, children }) {
  return (
    <div className="mt-5 flex flex-wrap items-baseline gap-x-2">
      {item.from && (
        <span className={`text-[13px] font-medium ${featured ? 'text-white/60' : 'text-ink-500'}`}>from</span>
      )}
      <span className={`text-[2.35rem] font-bold leading-none tracking-tight ${featured ? 'text-white' : 'text-ink-900'}`}>
        {money(item.price)}
      </span>
      {children}
    </div>
  )
}

/**
 * The two buttons and the link to the full page, in the same order on every
 * card so a row of them lines up.
 */
function CardActions({ item, featured, kind, detailsLabel }) {
  return (
    <div className="mt-5">
      <AddToCart item={cartItemFor(item, kind)} variant={featured ? 'gradient' : 'ink'} />
      <OrderButton item={item} featured={featured}>
        Order this now
      </OrderButton>
      <DetailsLink item={item} featured={featured} label={detailsLabel} className="mt-2.5" />
      {featured && <Recommended />}
    </div>
  )
}

/** Standard package card: name, price, who it suits, what makes it different. */
export function PriceCard({ item }) {
  const featured = item.featured

  return (
    <div className={shell(featured)}>
      {featured && item.badge && <Badge>{item.badge}</Badge>}

      <CardHead item={item} featured={featured} kind={item.kind} />

      <Price item={item} featured={featured}>
        <span className={`text-[13px] ${featured ? 'text-white/60' : 'text-ink-500'}`}>one-off</span>
      </Price>

      <CardActions item={item} featured={featured} />

      <MoreDetails item={item} featured={featured} />
    </div>
  )
}

/** Bundle card: what is inside, what each part costs, and the saving. */
export function BundleCard({ item }) {
  const featured = item.featured

  return (
    <div className={shell(featured)}>
      {featured && <Badge>{item.badge || 'Most popular'}</Badge>}

      <CardHead item={item} featured={featured} kind="Bundle">
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-bold ${
            featured ? 'bg-trust-500/20 text-trust-300' : 'bg-trust-50 text-trust-700'
          }`}
        >
          Save {item.savingPct}%
        </span>
      </CardHead>

      <Price item={item} featured={featured}>
        <span className={`text-lg line-through ${featured ? 'text-white/50' : 'text-ink-500'}`}>
          {money(item.was)}
        </span>
      </Price>

      <p className={`mt-2 text-[13.5px] font-semibold ${featured ? 'text-trust-300' : 'text-trust-600'}`}>
        You save {money(item.saving)}
        {item.bestSaving && !featured && (
          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-trust-50 px-2 py-0.5 text-[11.5px] font-bold text-trust-700">
            <Icons.spark className="w-3 h-3" />
            Biggest discount
          </span>
        )}
      </p>

      <CardActions item={item} featured={featured} kind="Bundle" detailsLabel="See what is in this bundle" />

      <div className="mt-6 flex-1">
        <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${featured ? 'text-white/60' : 'text-ink-500'}`}>
          What is in it
        </p>
        <ul className="mt-3 space-y-2.5">
          {item.includes.map((inc) => (
            <li key={inc.label} className="flex items-start justify-between gap-3 text-[14px]">
              <span className="flex items-start gap-2.5">
                <Icons.check className={`mt-0.5 w-4 h-4 shrink-0 ${featured ? 'text-orbit-300' : 'text-trust-500'}`} />
                <span className={featured ? 'text-white/85' : 'text-ink-700'}>{inc.label}</span>
              </span>
              <span className={`shrink-0 text-[13px] font-semibold tabular-nums ${featured ? 'text-white/60' : 'text-ink-500'}`}>
                {money(inc.price)}
              </span>
            </li>
          ))}
        </ul>

        {/* The same number is already struck through beside the price and named
            again in "you save", so on a phone this third telling is dropped. */}
        <div
          className={`mt-4 hidden items-center justify-between rounded-2xl px-4 py-2.5 text-[13.5px] sm:flex ${
            featured ? 'bg-white/5' : 'bg-slate-50'
          }`}
        >
          <span className={featured ? 'text-white/70' : 'text-ink-500'}>Bought separately</span>
          <span className={`font-semibold line-through ${featured ? 'text-white/70' : 'text-ink-500'}`}>
            {money(item.was)}
          </span>
        </div>
      </div>
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
          <div className="flex flex-col items-stretch gap-4 lg:items-end">
            <span className={`text-4xl sm:text-5xl font-bold tracking-tight lg:text-right ${dark ? 'text-white' : 'text-ink-900'}`}>
              {money(pkg.price)}
            </span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <AddToCart
                item={cartItemFor(pkg, pkg.kind || 'Package')}
                variant={dark ? 'featured' : 'solid'}
                full={false}
                className="w-full sm:w-auto"
              />
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
