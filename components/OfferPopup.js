import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icons } from './Icons'
import { offer, informativeWebsite } from '../lib/offers'

const STORAGE_KEY = 'logoorbit-offer-dismissed'

/**
 * The promotion popup. It appears once per browser session, on whichever page
 * the visitor lands on, a beat after the page settles so it never fights the
 * first paint. Dismissal is remembered in sessionStorage rather than
 * localStorage: a returning visitor should see the offer again next visit, but
 * nobody should be shown it twice while clicking around the same site.
 *
 * It hides itself on the offer pages themselves — a visitor already reading the
 * offer does not need to be told about it.
 */
export default function OfferPopup() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const closeRef = useRef(null)
  const onOfferPage = router.pathname.startsWith('/offers')

  useEffect(() => {
    if (!offer.active || onOfferPage) return
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setOpen(true), 1400)
    return () => clearTimeout(timer)
  }, [onOfferPage])

  // Escape closes it, and the page behind it stops scrolling while it is up.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && dismiss()
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-popup-title"
      onClick={(e) => e.target === e.currentTarget && dismiss()}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl mesh-bg px-7 py-9 sm:px-10 sm:py-11 text-white shadow-2xl">
        <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
        <div
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-orbit-500/30 blur-3xl"
          aria-hidden="true"
        />

        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Close offer"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full glass text-white hover:bg-white/25 transition-colors"
        >
          <Icons.close className="w-4 h-4" />
        </button>

        <div className="relative">
          <span className="inline-block rounded-full glass px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]">
            {offer.eyebrow}
          </span>

          <h2 id="offer-popup-title" className="mt-4 text-3xl sm:text-[2.25rem] font-bold leading-[1.12] text-white">
            Everything is <span className="text-gradient-light">{offer.discount}% off</span>
          </h2>

          <p className="mt-3 flex flex-wrap items-baseline gap-3">
            <span className="text-xl font-semibold text-white/50 line-through">${offer.wasPrice}</span>
            <span className="text-4xl font-bold text-white">${offer.nowPrice}</span>
            <span className="text-sm text-white/70">websites — limited time</span>
          </p>

          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            Every service is {offer.discount}% off right now, exclusively for existing customers. The{' '}
            {informativeWebsite.name} package is just ${informativeWebsite.price}.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link href={offer.href} onClick={dismiss} className="group btn-action px-6 py-3.5">
              See the offer
              <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={informativeWebsite.href}
              onClick={dismiss}
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 font-semibold text-white hover:bg-white/20 transition-colors"
            >
              ${informativeWebsite.price} website package
            </Link>
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="mt-4 text-sm text-white/55 hover:text-white/80 transition-colors"
          >
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
