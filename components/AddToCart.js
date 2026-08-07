import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Icons } from './Icons'
import { useCart, cash, lineId } from '../lib/cart'

/**
 * The button that puts a priced thing in the cart, plus the quantity stepper
 * it turns into once the thing is already in there.
 *
 * Two states rather than two controls: before the first click it is a single
 * wide button, because that is the only decision on offer. After the click it
 * becomes minus / count / plus with a line to the cart, because at that point
 * "how many" and "what now" are the only two questions left. A row of cards
 * showing steppers on every tier before anyone has chosen anything reads as a
 * spreadsheet rather than a price list.
 */

/** Quantity stepper. Shared by the cards and the cart page. */
export function QtyStepper({ value, onChange, tone = 'light', size = 'md', label = 'Quantity' }) {
  const dark = tone === 'dark'
  const pad = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const box =
    size === 'sm' ? 'min-w-[2.25rem] text-[14px]' : 'min-w-[2.75rem] text-[15px]'

  const btn = `grid ${pad} place-items-center rounded-full transition-colors disabled:opacity-35 disabled:cursor-not-allowed ${
    dark
      ? 'text-white/80 hover:bg-white/10 hover:text-white'
      : 'text-ink-700 hover:bg-slate-100 hover:text-ink-900'
  }`

  return (
    <div
      className={`inline-flex items-center rounded-full border ${
        dark ? 'border-white/20 bg-white/5' : 'border-slate-200 bg-white'
      }`}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Reduce quantity"
        className={btn}
      >
        <Icons.minus className="h-4 w-4" />
      </button>
      <span
        aria-live="polite"
        className={`px-1 text-center font-bold tabular-nums ${box} ${dark ? 'text-white' : 'text-ink-900'}`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= 99}
        aria-label="Increase quantity"
        className={btn}
      >
        <Icons.plus className="h-4 w-4" />
      </button>
    </div>
  )
}

/**
 * The paint of the "add to cart" pill, one entry per variant. Written out in
 * full rather than composed, because Tailwind only ships the class names it
 * can see as literal strings at build time.
 */
const VARIANTS = {
  solid: 'bg-brand-600 text-white hover:bg-brand-700',
  ink: 'bg-ink-900 text-white shadow-md shadow-ink-900/15 hover:bg-brand-700',
  gradient:
    'bg-gradient-to-r from-brand-500 to-orbit-500 text-white shadow-lg shadow-orbit-500/30 hover:from-brand-600 hover:to-orbit-600',
  featured: 'bg-white text-ink-900 hover:bg-orbit-100',
  ghost: 'border-2 border-ink-900 bg-transparent text-ink-900 hover:bg-ink-900 hover:text-white',
}

/**
 * @param item     anything with a name and a price. `kind`, `from`, `href`,
 *                 `sku` and `note` are all used when present.
 * @param variant  'solid' (default), 'ink' for the near-black pill the pricing
 *                 cards use, 'gradient' and 'featured' for dark cards, 'ghost'
 *                 for a quieter row inside a page body.
 */
export default function AddToCart({
  item,
  variant = 'solid',
  className = '',
  label = 'Add to cart',
  full = true,
  // Passed rather than overridden through className: two competing padding
  // utilities on one element resolve by stylesheet order, not by the order
  // they are written in, so the winner is whichever Tailwind emitted last.
  padding = 'px-5 py-3.5',
}) {
  const { add, setQty, qtyOf, ready } = useCart()
  const qty = qtyOf(item)
  const [flash, setFlash] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const onAdd = () => {
    add(item, 1)
    setFlash(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setFlash(false), 1800)
  }

  // Both dark-card variants sit on the near-black card, so the stepper they
  // turn into has to be the dark one either way.
  const dark = variant === 'featured' || variant === 'gradient'
  const width = full ? 'w-full' : ''

  // Until localStorage has been read the count is unknown, so the button
  // renders in its "add" state on both server and client and only swaps once
  // the real cart is in hand.
  if (!ready || qty === 0) {
    const base = VARIANTS[variant] || VARIANTS.solid

    return (
      <button
        type="button"
        onClick={onAdd}
        className={`inline-flex ${width} items-center justify-center gap-2 whitespace-nowrap rounded-full ${padding} text-[15px] font-semibold transition-all hover:-translate-y-0.5 ${base} ${className}`}
      >
        <Icons.cart className="h-4.5 w-4.5" />
        {label}
      </button>
    )
  }

  return (
    <div className={`${width} ${className}`}>
      <div
        className={`flex items-center justify-between gap-3 rounded-full border px-2 py-2 ${
          dark ? 'border-white/20 bg-white/10' : 'border-trust-500/40 bg-trust-50'
        }`}
      >
        <QtyStepper
          value={qty}
          onChange={(n) => setQty(lineId(item), n)}
          tone={dark ? 'dark' : 'light'}
          size="sm"
          label={`Quantity of ${item.name}`}
        />
        <span
          className={`pr-2 text-right text-[13px] font-bold leading-tight ${
            dark ? 'text-white' : 'text-trust-700'
          }`}
        >
          {cash(item.price * qty)}
          <span className={`block text-[11px] font-semibold ${dark ? 'text-white/60' : 'text-trust-600'}`}>
            {flash ? 'Added' : 'in cart'}
          </span>
        </span>
      </div>

      <Link
        href="/cart"
        className={`mt-2 flex w-full items-center justify-center gap-1.5 text-[13.5px] font-bold transition-colors ${
          dark ? 'text-orbit-300 hover:text-white' : 'text-brand-600 hover:text-brand-700'
        }`}
      >
        View cart and checkout
        <Icons.arrow className="h-4 w-4" />
      </Link>
    </div>
  )
}
