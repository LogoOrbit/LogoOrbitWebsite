import Link from 'next/link'
import { Icons } from './Icons'

/**
 * Dark gradient header used at the top of every inner page.
 *
 * `trail` takes an array of {name, href} for pages that sit two levels down,
 * so /services/packaging-design shows Home / Services / Packaging Design
 * rather than pretending to be a child of the root. `breadcrumb` remains for
 * the single-level pages that were here first.
 */
export default function PageHero({ eyebrow, title, highlight, intro, breadcrumb, trail, children }) {
  const crumbs = trail?.length ? trail : [{ name: breadcrumb || eyebrow }]

  return (
    <section className="relative -mt-18 pt-18 overflow-hidden mesh-bg text-white">
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
      <div
        className="absolute -top-32 -right-24 w-[34rem] h-[34rem] rounded-full bg-orbit-500/25 blur-3xl animate-drift"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-24 w-[30rem] h-[30rem] rounded-full bg-brand-500/25 blur-3xl animate-drift"
        style={{ animationDelay: '-8s' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 pt-8 pb-14 sm:pt-20 sm:pb-24 text-center">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] sm:text-sm text-white/55"
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          {crumbs.map((crumb, i) => (
            <span key={crumb.name} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {crumb.href && i < crumbs.length - 1 ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.name}</Link>
              ) : (
                <span className="text-white/85">{crumb.name}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <span className="mt-4 sm:mt-6 inline-block rounded-full glass px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]">
            {eyebrow}
          </span>
        )}

        <h1 className="mt-4 sm:mt-5 mx-auto max-w-4xl text-[2rem] sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] sm:leading-[1.08] tracking-tight text-white">
          {/* The dark-surface variant, the light-surface gradient is
              blue-on-blue against this mesh and barely readable. */}
          {title} {highlight && <span className="text-gradient-light">{highlight}</span>}
        </h1>

        {intro && (
          <p className="mt-4 sm:mt-6 mx-auto max-w-2xl text-[15px] sm:text-lg leading-relaxed text-white/70">
            {intro}
          </p>
        )}

        {children ?? (
          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/contact"
              className="group btn-action px-7 py-4"
            >
              Get a Free Quote
              <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        )}
      </div>

      <div className="relative h-14 sm:h-16 bg-white [clip-path:ellipse(75%_100%_at_50%_100%)]" aria-hidden="true" />
    </section>
  )
}
