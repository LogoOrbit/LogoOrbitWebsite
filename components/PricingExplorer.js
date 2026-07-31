import { useState } from 'react'
import Reveal from './Reveal'
import CompareTable from './CompareTable'
import { PriceCard, BundleCard, BigPackage } from './PriceCard'
import { Icons } from './Icons'
import { categories, finder, money } from '../lib/pricing'

const tabIcon = {
  layers: Icons.layers,
  logo: Icons.logo,
  website: Icons.website,
  animation: Icons.animation,
}

/**
 * "I do not know what I need" is the most common state a visitor arrives in,
 * so the page answers that before it shows a single price.
 */
function Finder({ onPick }) {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Step 1</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-ink-900">
            Which one of these sounds like you?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            Pick the closest match and we will take you straight to the packages that fit. Nothing here needs any
            design knowledge — if none of them are right, one phone call sorts it.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {finder.map((f, i) => (
            <Reveal key={f.id} delay={i * 90} className="h-full">
              <button
                type="button"
                onClick={() => onPick(f.category)}
                className="group flex h-full w-full flex-col rounded-3xl border border-slate-200 bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl"
              >
                <span className="grid place-items-center w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 text-lg font-bold">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink-900">&ldquo;{f.question}&rdquo;</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{f.body}</p>

                <div className="mt-6 flex-1" />

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-300">We would suggest</p>
                  <p className="mt-1 font-bold text-ink-900">
                    {f.recommend} — {money(f.price)}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-500">{f.note}</p>
                </div>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-600 group-hover:text-action-600 transition-colors">
                  Show me these
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
  const isBundle = Boolean(group.items[0]?.includes)

  return (
    <div>
      {multiple && (
        <Reveal className="max-w-3xl">
          <h3 className="text-2xl font-bold text-ink-900">
            {group.title}
            {group.subtitle && (
              <span className="ml-3 align-middle rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600">
                {group.subtitle}
              </span>
            )}
          </h3>
          {group.blurb && <p className="mt-3 text-[17px] leading-relaxed text-ink-500">{group.blurb}</p>}
        </Reveal>
      )}

      <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch ${multiple ? 'mt-8' : ''}`}>
        {group.items.map((item, i) => (
          <Reveal key={item.name} delay={i * 70} className="h-full">
            {isBundle ? <BundleCard item={item} /> : <PriceCard item={item} />}
          </Reveal>
        ))}
      </div>

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

function CategoryPanel({ category }) {
  const multiple = category.groups.length > 1

  return (
    <div id={`packages-${category.id}`} role="tabpanel" aria-labelledby={`tab-${category.id}`}>
      <Reveal className="max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-ink-900">{category.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-500">{category.plain}</p>
        {category.howToChoose && (
          <p className="mt-5 flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 px-5 py-4 text-[15px] leading-relaxed text-ink-700">
            <Icons.spark className="mt-0.5 w-5 h-5 shrink-0 text-brand-600" />
            <span>
              <strong className="font-semibold text-ink-900">How to choose: </strong>
              {category.howToChoose}
            </span>
          </p>
        )}
      </Reveal>

      <div className={`mt-12 ${multiple ? 'space-y-16' : ''}`}>
        {category.groups.map((group) => (
          <Group key={group.id} group={group} multiple={multiple} />
        ))}
      </div>

      {category.bigPackages?.length > 0 && (
        <div className="mt-16 space-y-8">
          {(category.bigPackagesTitle || category.bigPackagesBlurb) && (
            <Reveal className="max-w-3xl">
              {category.bigPackagesTitle && (
                <h3 className="text-2xl font-bold text-ink-900">{category.bigPackagesTitle}</h3>
              )}
              {category.bigPackagesBlurb && (
                <p className="mt-3 text-[17px] leading-relaxed text-ink-500">{category.bigPackagesBlurb}</p>
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
  )
}

/**
 * One category at a time. The old page stacked all six catalogues end to end,
 * which meant a visitor who wanted a logo scrolled through websites, bundles
 * and animation to find it.
 */
export default function PricingExplorer() {
  const [active, setActive] = useState(categories[0].id)
  const category = categories.find((c) => c.id === active)

  // Coming from the finder, always travel to the catalogue. Coming from the
  // sticky tab strip, only travel if the visitor is already deep inside a
  // panel — otherwise switching tabs would yank the page around underneath them.
  const show = (id, { force = false } = {}) => {
    setActive(id)
    const el = document.getElementById('packages')
    if (el && (force || el.getBoundingClientRect().top < 0)) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <Finder onPick={(id) => show(id, { force: true })} />

      <section id="packages" className="scroll-mt-18 bg-slate-50">
        <div className="sticky top-18 z-40 border-y border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-3" role="tablist" aria-label="Package categories">
              {categories.map((c) => {
                const Icon = tabIcon[c.icon] || Icons.layers
                const isActive = c.id === active

                return (
                  <button
                    key={c.id}
                    id={`tab-${c.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`packages-${c.id}`}
                    onClick={() => show(c.id)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-2.5 text-left transition-all ${
                      isActive
                        ? 'bg-ink-900 text-white shadow-lg shadow-ink-900/20'
                        : 'text-ink-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-orbit-300' : 'text-brand-600'}`} />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold leading-tight">{c.tab}</span>
                      <span
                        className={`block text-[12px] leading-tight ${isActive ? 'text-white/60' : 'text-ink-500'}`}
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

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <CategoryPanel key={category.id} category={category} />
        </div>
      </section>
    </>
  )
}
