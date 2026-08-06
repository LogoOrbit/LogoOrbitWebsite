import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import CTA from '../components/CTA'
import { Icons } from '../components/Icons'
import { loadSearchIndex, rankResults } from '../lib/search'
import { breadcrumb } from '../lib/seo'

// How many hits land on a single page of results, Google-style, so a broad
// query doesn't dump hundreds of rows into one endless scroll.
const PAGE_SIZE = 10

/**
 * Windowed page list with ellipses, the way Google's own results footer
 * does it: first page, last page, and a run around the current one, so the
 * bar stays a fixed width instead of growing with the result count.
 */
function pageNumbers(current, total) {
  const set = new Set([1, total, current, current - 1, current + 1])
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)

  const out = []
  let prev = 0
  for (const n of nums) {
    if (prev && n - prev > 1) out.push('…')
    out.push(n)
    prev = n
  }
  return out
}

/**
 * Search as a real page, not only as the palette in the header.
 *
 * The palette is faster for someone who knows what they want, but it cannot
 * be linked to, bookmarked or shared, and it disappears the moment you look
 * away from it. This page gives the same index a URL — /search?q=logo — so a
 * result set can be sent to a colleague, and gives the 404 page and footer
 * somewhere to point people who are lost rather than browsing.
 */
export default function SearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(null)
  const [page, setPage] = useState(1)
  const inputRef = useRef(null)
  const syncedFromUrl = useRef(false)

  useEffect(() => {
    loadSearchIndex().then(setIndex)
  }, [])

  // Seed from ?q= once the router has parsed the URL, so a shared link lands
  // on its results rather than on an empty box.
  useEffect(() => {
    if (!router.isReady || syncedFromUrl.current) return
    syncedFromUrl.current = true
    const initial = typeof router.query.q === 'string' ? router.query.q : ''
    setQuery(initial)
    const initialPage = Math.max(1, parseInt(router.query.page, 10) || 1)
    setPage(initialPage)
    if (!initial) inputRef.current?.focus()
  }, [router.isReady, router.query.q, router.query.page])

  // Keep the URL in step with the box, shallowly and replacing rather than
  // pushing, so the back button leaves the page instead of walking back
  // through every keystroke. Every fresh query starts back at page 1.
  useEffect(() => {
    if (!syncedFromUrl.current) return
    const current = typeof router.query.q === 'string' ? router.query.q : ''
    if (current === query) return
    setPage(1)
    const id = window.setTimeout(() => {
      router.replace(query ? { pathname: '/search', query: { q: query } } : { pathname: '/search' }, undefined, {
        shallow: true,
      })
    }, 250)
    return () => window.clearTimeout(id)
  }, [query, router])

  // Page changes are deliberate clicks, not keystrokes, so they land in the
  // URL immediately rather than waiting out the typing debounce above.
  useEffect(() => {
    if (!syncedFromUrl.current) return
    const currentPage = Math.max(1, parseInt(router.query.page, 10) || 1)
    if (currentPage === page) return
    router.replace(
      { pathname: '/search', query: { ...(query ? { q: query } : {}), ...(page > 1 ? { page } : {}) } },
      undefined,
      { shallow: true }
    )
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  const results = useMemo(() => {
    if (!index || !query.trim()) return []
    return rankResults(index, query)
  }, [index, query])

  const trimmed = query.trim()

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageResults = useMemo(
    () => results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [results, safePage]
  )

  const grouped = useMemo(() => {
    const map = new Map()
    for (const r of pageResults) {
      if (!map.has(r.category)) map.set(r.category, [])
      map.get(r.category).push(r)
    }
    return [...map.entries()]
  }, [pageResults])

  const goToPage = (n) => {
    const clamped = Math.min(Math.max(1, n), totalPages)
    if (clamped === page) return
    setPage(clamped)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Layout
      title={trimmed ? `Search: ${trimmed}` : 'Search'}
      description="Search everything on the LogoOrbit site: services, pricing, portfolio, industries, locations, guides and FAQs."
      path="/search"
      noIndex
      jsonLd={breadcrumb([{ name: 'Search', href: '/search' }])}
    >
      <PageHero
        eyebrow="Search"
        trail={[{ name: 'Search', href: '/search' }]}
        title="Search"
        highlight="everything here"
        intro="Every service, package, portfolio piece, guide and FAQ on this site, in one box."
      >
        {/* The box belongs in the hero rather than below it: this is the one
            page where the input is the entire reason for the visit, so it
            should never start below the fold. */}
        <div className="mx-auto mt-7 sm:mt-9 flex max-w-2xl items-center gap-3 rounded-full bg-white/10 px-5 py-1.5 ring-1 ring-white/25 backdrop-blur focus-within:ring-white/50">
          <Icons.search className="w-5 h-5 shrink-0 text-white/60" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search services, pricing, portfolio, guides, FAQs…"
            aria-label="Search the site"
            className="h-12 flex-1 bg-transparent text-[15px] sm:text-base text-white placeholder:text-white/50 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setPage(1)
                inputRef.current?.focus()
              }}
              aria-label="Clear search"
              className="shrink-0 rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <Icons.close className="w-5 h-5" />
            </button>
          )}
        </div>
      </PageHero>

      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <p className="text-sm text-ink-500" aria-live="polite">
            {!trimmed && index && `${index.length.toLocaleString('en-US')} pages ready to search.`}
            {trimmed && index === null && 'Loading…'}
            {trimmed && index !== null && (
              results.length
                ? `${results.length} result${results.length === 1 ? '' : 's'} for “${trimmed}”${
                    totalPages > 1 ? ` — page ${safePage} of ${totalPages}` : ''
                  }.`
                : `No results for “${trimmed}”.`
            )}
          </p>

          {trimmed && index !== null && results.length === 0 && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-ink-700">
                Nothing matched that. Try a shorter or more general word — or tell us what you are after and
                we will point you at it.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/contact" className="btn-action px-6 py-3">Ask us directly</Link>
                <Link
                  href="/services"
                  className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600"
                >
                  Browse all services
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-10">
            {grouped.map(([category, items]) => (
              <section key={category}>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
                  {category}
                </h2>
                <div className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-100">
                  {items.map((r) => (
                    <Link
                      key={r.url}
                      href={r.url}
                      className="flex items-start gap-3 px-4 py-4 transition-colors hover:bg-brand-50"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium text-ink-900">{r.title}</span>
                        {r.description && (
                          <span className="mt-0.5 block text-sm text-ink-500">{r.description}</span>
                        )}
                      </span>
                      <Icons.arrow className="mt-1 w-4 h-4 shrink-0 opacity-30" />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Search results pages" className="mt-10 flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="rounded-full px-3 py-2 text-sm font-medium text-ink-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
              >
                Previous
              </button>

              {pageNumbers(safePage, totalPages).map((n, i) =>
                n === '…' ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-sm text-ink-400">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    type="button"
                    onClick={() => goToPage(n)}
                    aria-current={n === safePage ? 'page' : undefined}
                    className={`h-9 w-9 shrink-0 rounded-full text-sm font-medium transition-colors ${
                      n === safePage
                        ? 'bg-brand-600 text-white'
                        : 'text-ink-600 hover:bg-slate-100'
                    }`}
                  >
                    {n}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="rounded-full px-3 py-2 text-sm font-medium text-ink-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </section>

      <CTA />
    </Layout>
  )
}
