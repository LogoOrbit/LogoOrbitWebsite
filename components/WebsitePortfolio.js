import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons } from './Icons'
import { websites } from '../lib/websites'

/**
 * Live websites we built.
 *
 * The card is the link, the whole tile is clickable and the address itself is
 * never printed, so the row reads as a set of pieces of work rather than a
 * list of URLs. Each preview panel is painted from the site's own colours and
 * carries its real name and pitch, it is deliberately not dressed up as a
 * screenshot. Drop a real one at /public/portfolio/websites/<slug>.webp and
 * the card swaps the panel for the image inside a browser frame.
 */
function Preview({ site }) {
  if (site.shot) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-slate-100">
        {/* Browser chrome, so a screenshot reads as a screen and not as artwork. */}
        <div className="flex items-center gap-1.5 border-b border-black/5 bg-white/80 px-3 py-2 backdrop-blur">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 h-2.5 flex-1 rounded-full bg-slate-200/80" />
        </div>
        <Image
          src={site.shot}
          alt={`${site.name} website`}
          width={900}
          height={620}
          sizes="(min-width: 1024px) 45vw, 92vw"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(140deg, ${site.accent} 0%, ${site.accent2} 100%)` }}
    >
      <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
      <div
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{ background: site.accent2 }}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
          {site.category}
        </span>

        <div>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-lg font-bold text-white backdrop-blur">
            {site.monogram}
          </span>
          <p className="mt-4 text-2xl sm:text-[1.75rem] font-bold leading-tight tracking-tight text-white">
            {site.name}
          </p>
          <p className="mt-1.5 max-w-sm text-[14px] leading-snug text-white/75">{site.tagline}</p>
        </div>
      </div>
    </div>
  )
}

export default function WebsitePortfolio({ showHeading = true }) {
  const [visibleCount, setVisibleCount] = useState(24)
  const visibleWebsites = websites.slice(0, visibleCount)

  return (
    <section id="websites" className="scroll-mt-28 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {showHeading && (
          <SectionHeading
            eyebrow="Websites"
            title="Sites we designed,"
            highlight="built and launched"
            body="Every one of these is live right now. Tap a card to open it in a new tab and judge it yourself."
          />
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {visibleWebsites.map((site, i) => (
            <Reveal key={site.slug} delay={(i % 4) * 70} className="flex h-full flex-col">
              <a
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/10"
              >
                <div className="aspect-[16/10] w-full">
                  <Preview site={site} />
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold text-ink-900">{site.name}</h3>
                      <p className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-300">
                        {site.category}
                      </p>
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-ink-500 transition-all group-hover:bg-action-500 group-hover:text-white">
                      <Icons.arrow className="h-4 w-4 -rotate-45" />
                    </span>
                  </div>

                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-500 line-clamp-2">{site.body}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    {site.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-600"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600 group-hover:text-action-600 transition-colors">
                      Visit
                      <Icons.arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </a>

              {/* Every build also has a written page of its own: the brief it
                  answered, how it was made and what was handed over. */}
              <Link
                href={`/portfolio/websites/${site.slug}`}
                className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-700 hover:text-brand-600"
              >
                Read how it was built
                <Icons.arrow className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          ))}
        </div>

        {visibleCount < websites.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => Math.min(count + 24, websites.length))}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-900/10 transition-all hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
            >
              Show more websites
              <span className="text-sm text-white/75">
                {Math.min(visibleCount, websites.length)} of {websites.length}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
