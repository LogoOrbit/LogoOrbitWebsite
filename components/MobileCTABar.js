import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icons } from './Icons'
import { useScrolled } from '../lib/hooks'
import { site } from '../lib/site'
import { useCart, cash } from '../lib/cart'

/**
 * Phone-only sticky action bar. On mobile the floating buttons used to sit
 * on top of body copy; a docked bar keeps both actions reachable without
 * covering anything, and the page reserves space for it.
 */
export default function MobileCTABar() {
  const shown = useScrolled(500)
  const { totals, ready } = useCart()
  const { pathname } = useRouter()
  // Once there is a cart, it is the more useful of the two actions: a reader
  // who has picked three things does not want to start a quote from scratch.
  // On the cart page itself the bar moves one step further along, to checkout.
  const cartFilled = ready && totals.count > 0
  const onCart = pathname === '/cart'

  // The checkout page carries exactly one "Place my order" button by design.
  // A second copy of it docked to the bottom of the screen made the page look
  // like it was asking twice, so the bar stands down there entirely.
  if (pathname === '/checkout') return null

  return (
    <div
      className={`xl:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-lg transition-transform duration-300 ${
        shown ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-ink-900 px-4 py-3 font-semibold text-ink-900"
        >
          <Icons.phone className="w-5 h-5" />
          Call
        </a>
        {cartFilled ? (
          <Link href={onCart ? '/checkout' : '/cart'} className="btn-action flex-[1.4] gap-2 px-4 py-3">
            <Icons.cart className="w-5 h-5" />
            {onCart ? 'Checkout' : 'Cart'} · {cash(totals.total)}
          </Link>
        ) : (
          <Link href="/contact" className="btn-action flex-[1.4] px-4 py-3">
            Get a Free Quote
          </Link>
        )}
      </div>
    </div>
  )
}
