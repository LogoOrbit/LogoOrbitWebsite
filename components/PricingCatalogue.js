import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Reveal from './Reveal'
import CardRow from './CardRow'
import CompareTable from './CompareTable'
import { BigPackage } from './PriceCard'
import AddToCart from './AddToCart'
import { Icons } from './Icons'
import { addOnArt, toneVars } from './Illustrations'
import { addOns, brandProtection, categories, finder, money, salesTax } from '../lib/pricing'
import CopyrightOwnershipNotice from './CopyrightOwnershipNotice'

const tabIcon = {
  layers: Icons.layers,
  logo: Icons.logo,
  website: Icons.website,
  animation: Icons.animation,
  mobile: Icons.mobile,
  shield: Icons.shield,
  clock: Icons.clock,
  spark: Icons.spark,
}

/** Trademark filing, given its own band because most owners never think to ask. */
function BrandProtection() {
  return (
    <section id={brandProtection.id} className="scroll-mt-16 sm:scroll-mt-60 lg:scroll-mt-44 py-10 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-2 border-action-500/50 bg-white p-6 sm:p-10 shadow-lg">
            {/* A flat tint rather than a gradient through white, which turned
                into an unreadable sheen once the page went dark. */}
            <div className="absolute inset-0 bg-action-500/5" aria-hidden="true" />

            <div className="relative flex flex-col lg:flex-row lg:items-start justify-between gap-7 lg:gap-10">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-white">
                  <Icons.shield className="w-4 h-4" />
                  {brandProtection.eyebrow}
                </span>

                <h2 className="mt-4 text-[2rem] sm:text-5xl font-bold leading-[1.1] tracking-tight text-ink-900">
                  {brandProtection.title}
                </h2>
                <p className="mt-3 text-[15px] sm:text-[17px] leading-relaxed text-ink-700">{brandProtection.plain}</p>

                <ul className="mt-6 grid gap-2.5">
                  {brandProtection.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[15px] text-ink-700">
                      <Icons.check className="mt-0.5 w-4 h-4 shrink-0 text-trust-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full shrink-0 rounded-3xl border border-slate-200 bg-white p-6 text-center lg:w-[20rem]">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">Our filing fee</p>
                <p className="mt-1.5 text-4xl font-bold tracking-tight text-ink-900">{money(brandProtection.price)}</p>
                <p className="text-[13px] font-semibold text-ink-500">
                  plus {money(brandProtection.classPrice)} per class
                </p>
                <p className="mt-2 text-[13px] leading-snug text-ink-500">{brandProtection.note}</p>
                <p className="mt-2 text-[12px] leading-snug text-ink-300">{salesTax.short}</p>

                {/* The filing fee is what goes in the cart. The per-class fee
                    depends on what the business actually sells, so it is added
                    by hand once we know — quietly inventing a class count here
                    would put a number in the total that nobody agreed to. */}
                <AddToCart
                  item={{
                    sku: 'trademark-filing',
                    name: 'US trademark filing',
                    kind: 'Brand protection',
                    price: brandProtection.price,
                    href: brandProtection.href,
                    note: `plus ${money(brandProtection.classPrice)} per class, confirmed with you`,
                  }}
                  className="mt-5"
                />

                <Link href={brandProtection.href} className="btn-action mt-2.5 w-full px-6 py-3.5">
                  How trademark filing works
                  <Icons.arrow className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * The optional extras, kept out of the tier cards so they stay readable.
 *
 * These were seven identical white boxes with the same small blue icon in the
 * corner, which is the one part of the catalogue nobody stopped to read. Each
 * extra now carries its own drawn scene and colour way, the same pair the
 * service cards use, so the row can be told apart from the pictures, and the
 * price sits in a tag at the top right rather than buried under the copy.
 */
function AddOns() {
  return (
    <section
      id={addOns.id}
      className="relative isolate overflow-hidden scroll-mt-16 sm:scroll-mt-60 lg:scroll-mt-44 py-10 sm:py-20 bg-slate-50"
    >
      {/* Two soft washes so the band behind the cards is not a flat grey. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-8 -z-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-orbit-200/40 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-600">
            <Icons.spark className="w-4 h-4" />
            Optional extras
          </span>
          <h2 className="mt-4 text-[2rem] sm:text-5xl font-bold leading-[1.1] tracking-tight text-ink-900">
            {addOns.title}
          </h2>
          <span className="mt-4 block h-1.5 w-20 rounded-full bg-gradient-to-r from-action-500 to-orbit-400" aria-hidden="true" />
          <p className="mt-3 sm:mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">{addOns.plain}</p>
        </Reveal>

        <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {addOns.items.map((item, i) => {
            const Art = addOnArt[item.art] || addOnArt.social
            return (
              <Reveal key={item.name} delay={i * 60} className="h-full">
                <article
                  className="group card-lift relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
                  style={toneVars(item.tone)}
                >
                  <span className="absolute inset-x-0 top-0 h-1 accent-rule" aria-hidden="true" />
                  <span
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full accent-band blur-xl"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl accent-band accent-ring">
                      <Art className="h-11 w-11 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                    </span>

                    {/* The price as a tag rather than a line of body copy, so a
                        reader skimming the row gets the numbers for free. */}
                    <span className="shrink-0 rounded-2xl accent-chip px-3.5 py-2 text-right">
                      <span className="block text-[17px] font-bold leading-none tabular-nums">
                        {item.from && <span className="text-[11px] font-semibold opacity-70">from </span>}
                        {money(item.price)}
                      </span>
                      <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] opacity-75">
                        one-off
                      </span>
                    </span>
                  </div>

                  <span className="relative mt-4 block text-[10.5px] font-bold uppercase tracking-[0.16em] accent-text">
                    {item.kind}
                  </span>
                  <h3 className="relative mt-1 text-[19px] font-bold leading-snug text-ink-900">{item.name}</h3>
                  <p className="relative mt-2 text-[14px] leading-relaxed text-ink-500">{item.body}</p>

                  {item.tiers && (
                    <ul className="relative mt-4 flex flex-wrap gap-1.5">
                      {item.tiers.map((t) => (
                        <li
                          key={t.qty}
                          className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[12px] font-semibold text-ink-700"
                        >
                          {t.qty} <span className="accent-text">{money(t.price)}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Pushed to the bottom so the links line up across a row of
                      cards whose descriptions are different lengths. */}
                  <div className="relative mt-auto pt-5">
                    <AddToCart
                      item={{
                        sku: `add-on-${item.name}`,
                        name: item.name,
                        kind: `Add-on · ${item.kind}`,
                        price: item.price,
                        from: item.from,
                        href: '/pricing#add-ons',
                      }}
                    />
                    <Link
                      href="/brief"
                      className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-bold accent-text transition-transform duration-200 group-hover:translate-x-1"
                    >
                      Or add it to my quote
                      <Icons.arrow className="h-4 w-4 shrink-0" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            )
          })}

          {/* Seven cards leave a hole at the end of a three-up row. This fills
              it with the thing someone reading a list of extras actually needs
              next, rather than with whitespace, and takes both remaining
              columns so the row closes cleanly. */}
          <Reveal delay={addOns.items.length * 60} className="h-full lg:col-span-2">
            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[28px] border border-dashed border-brand-300 bg-brand-50/60 p-6 sm:p-8">
              <span className="absolute inset-0 accent-dots opacity-50" style={toneVars('blue')} aria-hidden="true" />
              <div className="relative max-w-lg">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm">
                  <Icons.spark className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[21px] sm:text-2xl font-bold leading-snug text-ink-900">
                  Not sure which of these you need?
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                  Tell us what the job is and we will put the package and any extras into one written quote, with
                  nothing added that you would not use.
                </p>
                <Link href="/brief" className="btn-action mt-5 px-6 py-3.5">
                  Get a quote with extras
                  <Icons.arrow className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/**
 * The strip and the scroll-spy have to be built from the same list. Trademark
 * and Add-ons are sections of this page like any other, but they live outside
 * `categories`, and when only the categories were observed the two chips could
 * be tapped and never lit up, so the strip claimed you were still reading the
 * category above them.
 */
const tabs = [
  ...categories,
  { id: brandProtection.id, tab: 'Trademark', tabNote: 'Protect your logo', icon: 'shield' },
  { id: addOns.id, tab: 'Add-ons', tabNote: 'Printing, hosting, care', icon: 'spark' },
]

const jumpTo = (id) => {
  // Jump, do not glide. A tapped shortcut that animates the whole page reads
  // as the screen scrolling away from you rather than as a link.
  //
  // Where a jump lands is set by each section's `scroll-mt-*`, which has to
  // clear the nav and this strip together. The strip is one row on a phone,
  // three between `sm` and `lg` and two above it, hence three values rather
  // than one, and the 5.5rem `scroll-padding-top` on `html` is already part
  // of the total, so the classes carry only the remainder.
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
}

/**
 * For the visitor who has read the prices and still is not sure which one is
 * theirs. These are shortcuts back to a section of the catalogue, not a filter,
 * every package stays on the page either way.
 */
export function Finder() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Still deciding</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
            Which one of these sounds like you?
          </h2>
          <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">
            Tap the closest match and we will take you straight to the packages that fit, with the one most
            people in your position pick.
          </p>
        </Reveal>

        <div className="mt-8 sm:mt-12 grid md:grid-cols-3 gap-4 sm:gap-5">
          {finder.map((f, i) => (
            <Reveal key={f.id} delay={i * 90} className="h-full">
              <button
                type="button"
                onClick={() => jumpTo(f.category)}
                className="group flex h-full w-full flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl"
              >
                <span className="grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-brand-50 text-brand-600 text-lg font-bold">
                  {i + 1}
                </span>
                <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-bold text-ink-900">&ldquo;{f.question}&rdquo;</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{f.body}</p>

                <div className="mt-4 sm:mt-6 flex-1" />

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-300">We would suggest</p>
                  <p className="mt-1 font-bold text-ink-900">
                    {f.recommend}, {money(f.price)}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-500">{f.note}</p>
                </div>

                <span className="mt-4 sm:mt-5 inline-flex items-center gap-2 font-semibold text-brand-600 group-hover:text-action-600 transition-colors">
                  Take me there
                  <Icons.arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Group({ group, multiple }) {
  return (
    <div>
      {multiple && (
        <Reveal className="max-w-3xl">
          <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-2xl sm:text-[2rem] font-bold leading-tight text-ink-900">
            <span>{group.title}</span>
            {group.subtitle && (
              <span className="rounded-full bg-action-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {group.subtitle}
              </span>
            )}
          </h3>
          {group.blurb && (
            <p className="mt-3 text-[15px] sm:text-[17px] leading-relaxed text-ink-500">{group.blurb}</p>
          )}
        </Reveal>
      )}

      <CardRow items={group.items} className={multiple ? 'mt-6 sm:mt-8' : ''} />

      {group.compare && (
        <CompareTable
          compare={group.compare}
          items={group.items}
          featuredIndex={group.items.findIndex((i) => i.featured)}
        />
      )}
    </div>
  )
}

function Category({ category, tone }) {
  const multiple = category.groups.length > 1

  return (
    <section
      id={category.id}
      className={`scroll-mt-16 sm:scroll-mt-60 lg:scroll-mt-44 py-10 sm:py-20 ${tone === 'muted' ? 'bg-slate-50' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-600">
            From {money(category.from)}
          </span>
          <h2 className="mt-4 text-[2rem] sm:text-5xl font-bold leading-[1.1] tracking-tight text-ink-900">
            {category.title}
          </h2>
          <span className="mt-4 block h-1.5 w-20 rounded-full bg-gradient-to-r from-action-500 to-orbit-400" aria-hidden="true" />
          <p className="mt-3 sm:mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">{category.plain}</p>
          {category.howToChoose && (
            <p className="mt-5 flex items-start gap-2.5 rounded-2xl border border-brand-100 bg-brand-50/60 px-4 py-3.5 sm:px-5 sm:py-4 text-[14px] sm:text-[15px] leading-relaxed text-ink-700">
              <Icons.spark className="mt-0.5 w-5 h-5 shrink-0 text-brand-600" />
              <span>
                <strong className="font-semibold text-ink-900">How to choose: </strong>
                {category.howToChoose}
              </span>
            </p>
          )}
        </Reveal>

        <div className={`mt-8 sm:mt-12 ${multiple ? 'space-y-12 sm:space-y-16' : ''}`}>
          {category.groups.map((group) => (
            <Group key={group.id} group={group} multiple={multiple} />
          ))}
        </div>

        {category.bigPackages?.length > 0 && (
          <div className="mt-12 sm:mt-16 space-y-6 sm:space-y-8">
            {(category.bigPackagesTitle || category.bigPackagesBlurb) && (
              <Reveal className="max-w-3xl">
                {category.bigPackagesTitle && (
                  <h3 className="text-2xl sm:text-[2rem] font-bold leading-tight text-ink-900">
                    {category.bigPackagesTitle}
                  </h3>
                )}
                {category.bigPackagesBlurb && (
                  <p className="mt-3 text-[15px] sm:text-[17px] leading-relaxed text-ink-500">
                    {category.bigPackagesBlurb}
                  </p>
                )}
              </Reveal>
            )}

            {category.bigPackages.map((pkg, i) => (
              <Reveal key={pkg.id}>
                <BigPackage pkg={pkg} tone={i % 2 === 0 ? 'dark' : 'light'} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * Every package sits on the page. The sticky strip is a set of jump links with
 * the section you are currently reading highlighted, nothing is hidden behind
 * a tab, so a visitor can also just scroll from top to bottom and see the lot.
 */
export default function PricingCatalogue() {
  const [current, setCurrent] = useState(categories[0].id)
  const strip = useRef(null)

  useEffect(() => {
    const sections = tabs.map((c) => document.getElementById(c.id)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setCurrent(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Keep the highlighted link in view on a phone, where the strip scrolls
  // sideways. Only the strip moves, scrollIntoView would drag the page.
  useEffect(() => {
    const el = strip.current
    const link = el?.querySelector('[data-current]')
    if (!el || !link) return

    const left = link.offsetLeft - (el.clientWidth - link.clientWidth) / 2
    el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [current])

  return (
    <>
      <div id="packages" className="scroll-mt-18 sticky top-18 z-40 border-y-2 border-brand-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          {/* The heading is a luxury a phone cannot afford here: with the nav
              above it and the docked call bar below, every row this strip adds
              is a row of the card underneath that nobody can see. */}
          <p className="hidden pt-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 sm:block">
            Jump straight to what you need
          </p>

          <div
            ref={strip}
            className="flex items-center justify-start gap-2 overflow-x-auto no-scrollbar py-2 sm:flex-wrap sm:justify-center sm:gap-2 sm:overflow-visible sm:py-3"
          >

            {tabs.map((c) => {
              const Icon = tabIcon[c.icon] || Icons.layers
              const isCurrent = c.id === current

              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => jumpTo(c.id)}
                  data-current={isCurrent ? 'true' : undefined}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`flex shrink-0 items-center gap-2 sm:gap-2.5 rounded-2xl border px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-left transition-all ${
                    isCurrent
                      ? 'border-action-500 bg-ink-900 text-white shadow-lg shadow-ink-900/25'
                      : 'border-slate-200 bg-white text-ink-900 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md'
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 ${isCurrent ? 'text-orbit-300' : 'text-brand-600'}`} />
                  <span className="min-w-0">
                    <span className="block text-[13px] sm:text-sm font-bold leading-tight">{c.tab}</span>
                    <span
                      className={`block text-[11px] sm:text-[12px] leading-tight ${
                        isCurrent ? 'text-action-300' : 'text-ink-500'
                      }`}
                    >
                      {c.tabNote || `from ${money(c.from)}`}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {categories.map((c, i) => (
        <Category key={c.id} category={c} tone={i % 2 === 0 ? 'muted' : 'light'} />
      ))}

      <CopyrightOwnershipNotice />
      <BrandProtection />
      <AddOns />

      <section className="bg-white pb-14 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-[14px] leading-relaxed text-ink-500">
            {salesTax.long} Government and third-party fees, such as a USPTO filing fee, are charged at cost and are
            not ours to tax.
          </p>
        </div>
      </section>
    </>
  )
}
