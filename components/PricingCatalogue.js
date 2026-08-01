import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import CardRow from './CardRow'
import CompareTable from './CompareTable'
import { BigPackage } from './PriceCard'
import { Icons } from './Icons'
import { categories, finder, money } from '../lib/pricing'

const tabIcon = {
  layers: Icons.layers,
  logo: Icons.logo,
  website: Icons.website,
  animation: Icons.animation,
}

const jumpTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * "I do not know what I need" is the most common state a visitor arrives in,
 * so the page answers that before it shows a single price. These are shortcuts
 * to a section further down, not a filter — every package stays on the page.
 */
function Finder() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Start here</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
            Which one of these sounds like you?
          </h2>
          <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">
            Tap the closest match to jump to those packages. Everything we sell is on this page — this only saves
            you the scroll.
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
                    {f.recommend} — {money(f.price)}
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
          <h3 className="text-xl sm:text-2xl font-bold text-ink-900">
            {group.title}
            {group.subtitle && (
              <span className="ml-3 align-middle rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600">
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
      className={`scroll-mt-32 py-12 sm:py-20 ${tone === 'muted' ? 'bg-slate-50' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            From {money(category.from)}
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">{category.title}</h2>
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
                  <h3 className="text-xl sm:text-2xl font-bold text-ink-900">{category.bigPackagesTitle}</h3>
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
 * the section you are currently reading highlighted — nothing is hidden behind
 * a tab, so a visitor can also just scroll from top to bottom and see the lot.
 */
export default function PricingCatalogue() {
  const [current, setCurrent] = useState(categories[0].id)
  const strip = useRef(null)

  useEffect(() => {
    const sections = categories.map((c) => document.getElementById(c.id)).filter(Boolean)
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
  // sideways. Only the strip moves — scrollIntoView would drag the page.
  useEffect(() => {
    const el = strip.current
    const link = el?.querySelector('[data-current]')
    if (!el || !link) return

    const left = link.offsetLeft - (el.clientWidth - link.clientWidth) / 2
    el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [current])

  return (
    <>
      <Finder />

      <div id="packages" className="scroll-mt-18 sticky top-18 z-40 border-y border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div ref={strip} className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2.5 sm:py-3">
            <span className="hidden lg:block shrink-0 pr-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-300">
              Jump to
            </span>

            {categories.map((c) => {
              const Icon = tabIcon[c.icon] || Icons.layers
              const isCurrent = c.id === current

              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => jumpTo(c.id)}
                  data-current={isCurrent ? 'true' : undefined}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`flex shrink-0 items-center gap-2 sm:gap-2.5 rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-left transition-all ${
                    isCurrent
                      ? 'bg-ink-900 text-white shadow-lg shadow-ink-900/20'
                      : 'text-ink-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 ${isCurrent ? 'text-orbit-300' : 'text-brand-600'}`} />
                  <span className="min-w-0">
                    <span className="block text-[13px] sm:text-sm font-bold leading-tight">{c.tab}</span>
                    <span
                      className={`block text-[11px] sm:text-[12px] leading-tight ${
                        isCurrent ? 'text-white/60' : 'text-ink-500'
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
    </>
  )
}
