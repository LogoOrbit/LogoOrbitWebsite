import Link from 'next/link'
import { useMemo, useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons } from './Icons'
import LogoMark, { portfolio } from './LogoMark'

export default function Portfolio({ showHeading = true }) {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(portfolio.map((p) => p.category)))],
    []
  )
  const [filter, setFilter] = useState('All')

  const items = filter === 'All' ? portfolio : portfolio.filter((p) => p.category === filter)

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {showHeading && (
          <SectionHeading
            eyebrow="Portfolio"
            title="Marks we've built for"
            highlight="real businesses"
            body="Every concept below was drawn from scratch by our in-house team — never templated, never resold."
          />
        )}

        <Reveal className={`${showHeading ? 'mt-10' : ''} flex flex-wrap justify-center gap-2`}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-ink-900 text-white shadow-lg shadow-ink-900/20'
                  : 'bg-slate-100 text-ink-500 hover:bg-slate-200 hover:text-ink-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 4) * 70}>
              <figure className="group relative overflow-hidden rounded-3xl border border-slate-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-900/10">
                <div
                  className="grid place-items-center aspect-square transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <LogoMark shape={item.shape} className="w-20 h-20 sm:w-24 sm:h-24" />
                </div>

                <figcaption className="flex items-center justify-between gap-2 bg-white px-4 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold tracking-wider text-ink-900">{item.word}</p>
                    <p className="truncate text-xs text-ink-500">{item.category}</p>
                  </div>
                  <span
                    className="grid shrink-0 place-items-center w-8 h-8 rounded-full transition-colors"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    <Icons.arrow className="w-4 h-4" />
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href="/contact"
            className="btn-action px-7 py-4"
          >
            Start a project like these
            <Icons.arrow className="w-5 h-5" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
