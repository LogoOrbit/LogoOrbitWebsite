import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'

/**
 * The internal-linking workhorse.
 *
 * Every service, industry, location and guide page ends with two or three of
 * these, which is what turns a pile of landing pages into a navigable set. A
 * page nobody links to is a page nobody crawls.
 *
 * Every link here carries `prefetch={false}`. A grid like this routinely holds
 * thirty or more entries, and the home page carries five of them, so the
 * default viewport prefetch was pulling down the route bundle for a hundred
 * pages nobody had asked for - several hundred kilobytes of JavaScript
 * competing with the bytes the current page still needs to finish painting.
 * Next still prefetches on hover and on touch-start, so a link someone is
 * actually about to follow is still warm before the tap lands.
 */
export default function LinkGrid({
  eyebrow,
  title,
  body,
  items,
  tone = 'light',
  columns = 3,
  compact = false,
  id,
}) {
  if (!items?.length) return null
  const muted = tone === 'muted'
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns]

  return (
    <section id={id} className={`scroll-mt-24 py-12 sm:py-16 ${muted ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {(eyebrow || title) && (
          <Reveal className="max-w-2xl">
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">{eyebrow}</span>
            )}
            {title && (
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-ink-900">{title}</h2>
            )}
            {body && <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-ink-500">{body}</p>}
          </Reveal>
        )}

        {compact ? (
          <Reveal className={`${title ? 'mt-6' : ''} flex flex-wrap gap-2.5`}>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[14px] font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                {item.name}
                <Icons.arrow className="w-3.5 h-3.5 opacity-40" />
              </Link>
            ))}
          </Reveal>
        ) : (
          /* One Reveal around the grid rather than one per card. A grid of
             forty entries meant forty IntersectionObservers, and the home page
             carries five grids - ninety-nine observers on one page, all of them
             re-measuring on scroll. The per-card stagger survives as CSS: the
             cards animate off the grid's own `is-visible`, three columns deep,
             which costs one observer instead of forty. */
          <Reveal className={`${title ? 'mt-7 sm:mt-9' : ''} grid ${cols} gap-3.5 sm:gap-4`}>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="link-card group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="text-[15px] font-bold leading-snug text-ink-900">{item.name}</span>
                  <Icons.arrow className="mt-0.5 w-4 h-4 shrink-0 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
                </span>
                {item.description && (
                  <span className="mt-2 text-[14px] leading-relaxed text-ink-500">{item.description}</span>
                )}
                {item.meta && (
                  <span className="mt-3 text-[13px] font-semibold text-brand-600">{item.meta}</span>
                )}
              </Link>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}
