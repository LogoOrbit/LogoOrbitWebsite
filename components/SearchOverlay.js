import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Icons } from './Icons'
import { useScrollLock } from '../lib/hooks'
import { loadSearchIndex, rankResults } from '../lib/search'

/**
 * Site-wide search, opened from Nav via a button or Ctrl/Cmd+K.
 *
 * The whole index is fetched once as JSON and filtered entirely in the
 * browser (lib/search.js) - there is no per-keystroke request, so results
 * update as fast as the input does.
 */
export default function SearchOverlay({ open, onClose }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(null)
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const itemRefs = useRef([])

  useScrollLock(open)

  useEffect(() => {
    if (open) loadSearchIndex().then(setIndex)
  }, [open])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActive(0)
      return
    }
    const id = window.setTimeout(() => inputRef.current?.focus(), 20)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') return onClose()

      /* This dialog says aria-modal, which is a promise that focus stays in
         it. It did not: Tab walked straight out into the page underneath,
         which is still rendered and still focusable, and a keyboard user ended
         up interacting with a page they could not see behind the backdrop. */
      if (e.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (!panelRef.current.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const close = () => onClose()
    router.events.on('routeChangeComplete', close)
    return () => router.events.off('routeChangeComplete', close)
  }, [open, router.events, onClose])

  const results = useMemo(() => {
    if (!index || !query.trim()) return []
    return rankResults(index, query, 20)
  }, [index, query])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    itemRefs.current[active]?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!open) return null

  const go = (url) => {
    onClose()
    router.push(url)
  }

  const onInputKeyDown = (e) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const hit = results[active]
      if (hit) go(hit.url)
    }
  }

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search the site">
      <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={onClose} />

      <div ref={panelRef} className="relative mx-auto mt-[10vh] w-[92%] max-w-xl px-0">
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl shadow-ink-900/20">
          <div className="flex items-center gap-3 border-b border-slate-100 px-4">
            <Icons.search className="w-5 h-5 shrink-0 text-ink-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              type="text"
              inputMode="search"
              autoComplete="off"
              spellCheck={false}
              placeholder="Search services, pricing, portfolio, guides, FAQs…"
              aria-label="Search the site"
              aria-controls="search-results-list"
              aria-activedescendant={results[active] ? `search-result-${active}` : undefined}
              className="h-14 flex-1 bg-transparent text-[15px] text-ink-900 placeholder:text-ink-300 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="-mr-2 shrink-0 rounded-lg p-2 text-ink-400 hover:text-ink-700"
            >
              <Icons.close className="w-5 h-5" />
            </button>
          </div>

          <div id="search-results-list" role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
            {!query.trim() && (
              <p className="px-3 py-10 text-center text-sm text-ink-500">
                Start typing to search the whole site: services, pricing, portfolio, industries, guides and FAQs.
              </p>
            )}
            {query.trim() && index === null && (
              <p className="px-3 py-10 text-center text-sm text-ink-500">Loading…</p>
            )}
            {query.trim() && index !== null && results.length === 0 && (
              <p className="px-3 py-10 text-center text-sm text-ink-500">
                No results for &ldquo;{query}&rdquo;. Try a different word, or{' '}
                <Link href="/contact" onClick={onClose} className="font-medium text-brand-600 hover:underline">
                  ask us directly
                </Link>
                .
              </p>
            )}
            {results.map((r, i) => (
              <button
                key={`${r.url}-${i}`}
                id={`search-result-${i}`}
                ref={(el) => (itemRefs.current[i] = el)}
                role="option"
                aria-selected={i === active}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.url)}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  i === active ? 'bg-brand-50' : 'hover:bg-slate-50'
                }`}
              >
                <span className="mt-0.5 shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                  {r.category}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-medium text-ink-900">{r.title}</span>
                  {r.description && (
                    <span className="block truncate text-[13px] text-ink-500">{r.description}</span>
                  )}
                </span>
                <Icons.arrow className="mt-1 w-4 h-4 shrink-0 opacity-30" />
              </button>
            ))}
          </div>

          {results.length > 0 && (
            <button
              type="button"
              onClick={() => go(`/search?q=${encodeURIComponent(query.trim())}`)}
              className="flex w-full items-center justify-center gap-1.5 border-t border-slate-100 px-4 py-3 text-[13px] font-medium text-brand-600 hover:bg-brand-50"
            >
              See all results for &ldquo;{query.trim()}&rdquo;
              <Icons.arrow className="w-4 h-4" />
            </button>
          )}

          <div className="hidden items-center justify-between border-t border-slate-100 px-4 py-2 text-[12px] text-ink-400 sm:flex">
            <span>↑↓ to navigate · Enter to select · Esc to close</span>
            {index && <span>{index.length.toLocaleString('en-US')} pages indexed</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
