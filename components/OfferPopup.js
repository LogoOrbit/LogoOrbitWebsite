import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icons } from './Icons'
import { useScrollLock } from '../lib/hooks'
import OfferCountdown from './OfferCountdown'
import { money } from '../lib/pricing'
import { offer, headline, informativeWebsite } from '../lib/offers'

const STORAGE_KEY = 'logoorbit-offer-dismissed'

/* Safari in private mode, a locked-down enterprise profile and a browser with
   cookies blocked all throw on sessionStorage rather than returning null. Both
   calls were bare: the read threw inside an effect, and the write threw inside
   the dismiss handler, which meant on those browsers the popup could not be
   closed at all — the one failure mode that turns a promotion into a wall. */
const remembered = () => {
  try {
    return Boolean(sessionStorage.getItem(STORAGE_KEY))
  } catch {
    return false
  }
}

const remember = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* It just will not be remembered past this page. Closing still works. */
  }
}

/**
 * The promotion popup.
 *
 * It appears once per browser session, on whichever page the visitor lands on,
 * a beat after the page settles so it never fights the first paint. Dismissal
 * is remembered in sessionStorage rather than localStorage: a returning
 * visitor should see the offer again on their next visit, but nobody should be
 * shown it twice while clicking around the same site.
 *
 * It stands down on the offer pages themselves and on the checkout, where a
 * modal in front of a payment form is only ever a lost order.
 */
export default function OfferPopup() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const { pathname } = router
  const suppressed = pathname.startsWith('/offers') || pathname === '/checkout' || pathname === '/cart'

  useEffect(() => {
    if (!offer.active || suppressed) return
    if (remembered()) return
    const timer = setTimeout(() => setOpen(true), 1600)
    return () => clearTimeout(timer)
  }, [suppressed])

  // The page behind stops scrolling through the shared lock, so this and the
  // nav drawer cannot undo each other.
  useScrollLock(open)

  // Escape closes it, and Tab is held inside the dialog while it is up.
  useEffect(() => {
    if (!open) return

    function onKey(e) {
      if (e.key === 'Escape') return dismiss()
      if (e.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()

    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function dismiss() {
    remember()
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-900/75 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-popup-title"
      onClick={(e) => e.target === e.currentTarget && dismiss()}
    >
      <div
        ref={panelRef}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto overflow-x-hidden rounded-3xl mesh-bg text-white shadow-2xl"
      >
        <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
        <div
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-action-500/30 blur-3xl"
          aria-hidden="true"
        />

        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Close offer"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full glass text-white transition-colors hover:bg-white/25"
        >
          <Icons.close className="h-4 w-4" />
        </button>

        <div className="relative px-6 py-8 sm:px-9 sm:py-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
            <Icons.spark className="h-3.5 w-3.5" />
            {offer.eyebrow}
          </span>

          <h2
            id="offer-popup-title"
            className="mt-4 text-[1.75rem] font-bold leading-[1.12] text-white sm:text-[2.1rem]"
          >
            Everything is <span className="text-gradient-light">{offer.discount}% off</span>
          </h2>

          <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
            <span className="flex items-baseline gap-2.5">
              <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {money(headline.now)}
              </span>
              <span className="text-lg text-white/45 line-through">{money(headline.was)}</span>
            </span>
            <span className="rounded-full bg-trust-500/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-trust-300">
              Save {money(headline.saving)}
            </span>
          </div>

          <p className="mt-3.5 text-[15px] leading-relaxed text-white/75">
            Our {money(headline.was)} websites are now {money(headline.now)} — and every other service is{' '}
            {offer.discount}% off too, exclusively for existing customers like you.
          </p>

          <OfferCountdown className="mt-6" />

          <div className="mt-7 flex flex-col gap-3">
            <Link href={offer.href} onClick={dismiss} className="btn-action deal-cta w-full px-6 py-3.5">
              See the offer
              <Icons.arrow className="h-5 w-5" />
            </Link>
            <Link
              href={informativeWebsite.href}
              onClick={dismiss}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full glass px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/20"
            >
              {informativeWebsite.name} — {money(informativeWebsite.price)} only
            </Link>
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="mt-4 w-full text-[13px] text-white/55 transition-colors hover:text-white/85"
          >
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
