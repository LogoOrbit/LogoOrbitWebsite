import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons } from './Icons'
import { portfolioLogos, portfolioCategories } from '../lib/portfolio'

/**
 * The wall of client marks.
 *
 * There are over 150, which is the selling point and also the problem: all
 * of them at once is a page nobody reaches the bottom of. So the grid opens on
 * a slice and grows on demand, and the home page asks for a smaller slice than
 * the portfolio page does.
 *
 * Tiles keep a white face in both themes. The logos were drawn for white
 * backgrounds and many have white knocked out of the mark itself, so flipping
 * the tile dark would show holes in other people's brands.
 */
export default function Portfolio({
  showHeading = true,
  initial = 16,
  step = 32,
  showAllLink = false,
  filterTo = null,
}) {
  const [filter, setFilter] = useState(filterTo || 'All')
  const [shown, setShown] = useState(initial)

  const items = useMemo(
    () => (filter === 'All' ? portfolioLogos : portfolioLogos.filter((l) => l.category === filter)),
    [filter]
  )

  // An industry page opens on its own category and hides the chip row: the
  // visitor came for one sector, and the filter would only invite them away
  // from the reason they landed here.
  const locked = Boolean(filterTo)

  const visible = items.slice(0, shown)
  const pick = (cat) => {
    setFilter(cat)
    setShown(initial)
  }

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {showHeading && (
          <SectionHeading
            eyebrow="Portfolio"
            title="Marks we've built for"
            highlight="real businesses"
            body={`${portfolioLogos.length} logos drawn from scratch by our in-house team, never templated, never resold.`}
          />
        )}

        {locked && (
          <Reveal className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Our work</span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
              {filterTo} marks we have <span className="text-gradient">drawn from scratch</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-[15px] sm:text-lg leading-relaxed text-ink-500">
              Real client work from this sector. Every one was drawn for that business and never resold.
            </p>
          </Reveal>
        )}

        <Reveal
          className={`${showHeading ? 'mt-10' : ''} ${locked ? 'hidden' : 'flex'} flex-wrap justify-center gap-2`}
        >
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => pick(cat)}
              aria-pressed={filter === cat}
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

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {visible.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 4) * 70}>
              <figure className="group h-full overflow-hidden rounded-3xl border border-slate-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-900/10">
                <div
                  className="grid place-items-center aspect-square p-5 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <Image
                    src={`/portfolio/${item.slug}.webp`}
                    alt={item.name ? `${item.name} logo` : `${item.category} logo concept`}
                    width={520}
                    height={520}
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 45vw"
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* A mark with no legible wordmark carries its industry as the
                    headline rather than a name we would have had to invent. */}
                <figcaption className="flex items-center justify-between gap-2 bg-white px-4 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink-900">{item.name || item.category}</p>
                    <p className="truncate text-xs text-ink-500">
                      {item.name ? item.category : 'Logo concept'}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-4">
          {shown < items.length && (
            <button
              type="button"
              onClick={() => setShown(shown + step)}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-7 py-3.5 font-semibold text-ink-700 transition-colors hover:bg-slate-200"
            >
              Show more work
              <span className="text-ink-500">({items.length - shown} left)</span>
            </button>
          )}

          {(showAllLink || locked) && (
            <Link href="/portfolio" className="btn-action px-7 py-4">
              See the full portfolio
              <Icons.arrow className="w-5 h-5" />
            </Link>
          )}

          <Link
            href="/contact"
            className={
              showAllLink || locked
                ? 'text-[15px] font-semibold text-brand-600 hover:text-brand-700'
                : 'btn-action px-7 py-4'
            }
          >
            Start a project like these
            {!showAllLink && !locked && <Icons.arrow className="w-5 h-5" />}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
