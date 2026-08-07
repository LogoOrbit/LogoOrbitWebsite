import Link from 'next/link'
import { Icons } from './Icons'
import { useCart } from '../lib/cart'

/**
 * The header's cart control.
 *
 * It is deliberately quiet while the cart is empty - an empty cart badge on
 * every page of a design studio's site is noise - and gains a count and a
 * colour the moment something is in it.
 */
export default function CartIndicator({ light, compact = false }) {
  const { totals, ready } = useCart()
  const count = ready ? totals.count : 0
  const filled = count > 0

  return (
    <Link
      href="/cart"
      aria-label={filled ? `Cart, ${count} item${count === 1 ? '' : 's'}` : 'Cart, empty'}
      className={`relative flex shrink-0 items-center gap-2 rounded-full transition-colors ${
        compact
          ? `p-2 ${light ? 'text-white' : 'text-ink-900'}`
          : `border px-2.5 py-2 text-[13px] font-semibold ${
              filled
                ? 'border-action-500 bg-action-500/10 text-action-600'
                : light
                  ? 'border-white/25 text-white/85 hover:bg-white/10 hover:text-white'
                  : 'border-slate-200 text-ink-500 hover:border-brand-300 hover:text-brand-600'
            }`
      }`}
    >
      <Icons.cart className={compact ? 'h-6 w-6' : 'h-4 w-4'} />
      {filled && (
        // The badge sits on the control's own corner, not the glyph's: hung
        // off the icon it landed on top of the cart drawing, and a two-digit
        // count covered it completely. The ring cuts it out of whatever it
        // overlaps so the count stays legible against the icon and the
        // button's border alike.
        <span
          className={`pointer-events-none absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-action-500 px-1 text-[10px] font-bold leading-none text-white tabular-nums ring-2 ${
            light ? 'ring-ink-900' : 'ring-white'
          }`}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
      {/* Icon and badge only. The header row is already tight at laptop
          widths, and the running total would add another sixty pixels to it
          for information that is one click away on the cart page itself. */}
    </Link>
  )
}
