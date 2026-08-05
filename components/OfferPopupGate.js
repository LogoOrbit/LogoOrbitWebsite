import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

export const OFFER_DISMISSED_KEY = 'logoorbit-offer-dismissed'

/* Safari in private mode, a locked-down enterprise profile and a browser with
   cookies blocked all throw on sessionStorage rather than returning null. This
   read is bare in the popup itself, so it stays guarded here too. */
const remembered = () => {
  try {
    return Boolean(sessionStorage.getItem(OFFER_DISMISSED_KEY))
  } catch {
    return false
  }
}

/**
 * Decides whether the offer popup is going to be shown, and only then fetches
 * it.
 *
 * The popup is mounted from _app, so it is on every page on the site. Imported
 * directly it put its own markup, the countdown, the icon set and the offer
 * copy into the shared bundle that has to be parsed before any page can
 * hydrate — for a panel that appears a second and a half later, and never at
 * all for the visitor who already dismissed it or who landed on the checkout.
 *
 * So this file holds the cheap half: three conditions, a timer, and no imports
 * beyond the router. When the conditions say yes, the popup arrives as its own
 * chunk, fetched at a point where the network and the main thread are both
 * idle. When they say no, that chunk is never requested.
 */
const OfferPopup = dynamic(() => import('./OfferPopup'), { ssr: false })

export default function OfferPopupGate() {
  const [show, setShow] = useState(false)
  const { pathname } = useRouter()

  // A modal in front of a payment form is only ever a lost order, and there is
  // nothing to advertise to someone already reading the offer.
  const suppressed =
    pathname.startsWith('/offers') || pathname === '/checkout' || pathname === '/cart'

  useEffect(() => {
    if (suppressed) return
    if (remembered()) return
    const timer = setTimeout(() => setShow(true), 1600)
    return () => clearTimeout(timer)
  }, [suppressed])

  if (!show) return null
  return <OfferPopup />
}
