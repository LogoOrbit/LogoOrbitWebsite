import Link from 'next/link'
import Reveal from './Reveal'
import AddToCart from './AddToCart'
import { Icons } from './Icons'
import { toneVars } from './Illustrations'

/**
 * The full-catalogue grid, one card per service.
 *
 * The old version was a plain white box with a name and an arrow, and the
 * price sat as a line of small grey text at the bottom, easy to miss
 * entirely. Each card now carries the same accent-colour language as the
 * add-ons row (a top rule, a tinted icon chip, a coloured price tag), so the
 * price reads as the second thing on the card rather than the last, and a
 * row of these looks like part of the same site as the pricing page instead
 * of a plain sitemap.
 *
 * `tone` sets the colour for the whole section; an individual item can carry
 * its own `tone` to override it, which is how a single flat list spanning
 * every discipline (rather than one grid per discipline) still comes out in
 * mixed colour rather than one block colour.
 *
 * `surface` has to be an explicit class rather than inherited page
 * background: `bg-slate-50` repaints for dark mode through a redefined
 * CSS variable, but a section with no background class at all keeps the
 * hard-coded white `body` colour even in dark mode, which put the near-white
 * dark-mode heading straight onto a white surface.
 *
 * An item carrying a `price` also gets an add-to-cart button. That turns the
 * card from a signpost into something you can act on where you are standing:
 * a visitor who already knows they want two of these no longer has to open the
 * page, read it, and come back. The card body is still one big link, but it is
 * now a stretched overlay rather than a wrapping anchor, because a button
 * nested inside an anchor is neither valid markup nor clickable.
 */
export default function CatalogueGrid({
  eyebrow,
  title,
  body,
  items,
  tone = 'blue',
  surface = 'light',
  id,
  // Where a jump to this section lands. The default clears the nav; a page
  // with a sticky strip under the nav passes a bigger one.
  scrollMt = 'scroll-mt-24',
}) {
  if (!items?.length) return null

  return (
    <section
      id={id}
      className={`${scrollMt} py-10 sm:py-14 ${surface === 'muted' ? 'bg-slate-50' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {(eyebrow || title) && (
          <Reveal className="max-w-2xl">
            {eyebrow && (
              <span
                className="inline-flex items-center gap-2 rounded-full accent-chip px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em]"
                style={toneVars(tone)}
              >
                {eyebrow}
              </span>
            )}
            {title && <h3 className="mt-3.5 text-xl sm:text-2xl font-bold leading-tight text-ink-900">{title}</h3>}
            {body && <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{body}</p>}
          </Reveal>
        )}

        <div className={`${title ? 'mt-6' : ''} grid gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3`}>
          {items.map((item, i) => {
            const Icon = Icons[item.icon] || Icons.spark
            return (
              <Reveal key={item.href} delay={(i % 6) * 50} className="h-full">
                <article
                  style={toneVars(item.tone || tone)}
                  className="group card-lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300"
                >
                  <span className="absolute inset-x-0 top-0 h-1 accent-rule" aria-hidden="true" />
                  <span
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full accent-band blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  {/* The whole card still opens the page. It sits above the copy
                      and below the cart button, so the two targets never fight. */}
                  <Link
                    href={item.href}
                    aria-label={`${item.name}, see details`}
                    className="absolute inset-0 z-10 rounded-2xl"
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl accent-band accent-ring">
                      <Icon className="h-5 w-5 accent-text" />
                    </span>

                    {item.meta && (
                      <span className="shrink-0 rounded-full accent-chip px-3 py-1.5 text-[13px] font-bold tabular-nums leading-none">
                        {item.meta}
                      </span>
                    )}
                  </div>

                  <span className="relative mt-4 block text-[15.5px] font-bold leading-snug text-ink-900">
                    {item.name}
                  </span>
                  {item.description && (
                    <span className="relative mt-1.5 block text-[13.5px] leading-relaxed text-ink-500">
                      {item.description}
                    </span>
                  )}

                  <div className="relative z-20 mt-auto pt-4">
                    {item.price > 0 && (
                      <AddToCart
                        item={{
                          // The service page's own button uses the same sku, so
                          // adding from either place lands on one cart line.
                          sku: item.sku || item.href,
                          name: item.name,
                          kind: item.kind || 'Service',
                          price: item.price,
                          // Catalogue prices are starting figures; the checkout
                          // calls the total an estimate when any line is one.
                          from: item.from !== false,
                          href: item.href,
                        }}
                        // Near-black, as on the package cards. Each card in this
                        // grid carries its own accent colour, and a row of brand
                        // blue buttons argues with every one of them.
                        variant="ink"
                        padding="px-4 py-2.5"
                        className="mb-3"
                      />
                    )}

                    <Link
                      href={item.href}
                      className="relative flex items-center gap-1.5 text-[13px] font-bold accent-text"
                    >
                      See details
                      <Icons.arrow className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
