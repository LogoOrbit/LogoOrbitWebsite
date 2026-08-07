import { useEffect, useState } from 'react'
import { offer } from '../lib/offers'

const UNITS = [
  ['Days', 86400],
  ['Hours', 3600],
  ['Mins', 60],
  ['Secs', 1],
]

function remaining(end) {
  const diff = end - Date.now()
  if (diff <= 0) return null
  let left = Math.floor(diff / 1000)
  return UNITS.map(([label, size]) => {
    const value = Math.floor(left / size)
    left -= value * size
    return { label, value }
  })
}

/**
 * Time left on the promotion.
 *
 * The clock counts down to the real end date held in lib/offers.js, so it does
 * not reset when someone reloads the page and it does not claim urgency the
 * business has not committed to. Once the date passes the component renders
 * nothing at all.
 *
 * The first paint carries no digits: the server has no idea what time it is in
 * the reader's browser, and rendering a guess produces a hydration mismatch and
 * a visible flicker on the number that matters most.
 *
 * It does, however, carry the boxes. Returning null until the first tick and
 * the full clock immediately after made the component grow by its own height a
 * frame into the page - inside the offer popup that was the whole of the site's
 * layout shift, because the panel it sits in is sized by its content. Blank
 * slots of the final size cost nothing and mean the only thing that changes is
 * the digits.
 */
const PLACEHOLDER = UNITS.map(([label]) => ({ label, value: null }))

export default function OfferCountdown({ tone = 'dark', className = '' }) {
  const end = new Date(offer.endsOn).getTime()
  const [parts, setParts] = useState(null)
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    const tick = () => {
      const next = remaining(end)
      if (next) setParts(next)
      else setEnded(true)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [end])

  // Once the date has genuinely passed there is nothing to count down to.
  if (ended) return null

  const slots = parts || PLACEHOLDER
  const dark = tone === 'dark'

  return (
    <div className={className}>
      <p
        className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
          dark ? 'text-white/55' : 'text-ink-500'
        }`}
      >
        Offer ends in
      </p>
      <div className="mt-2 flex gap-2 sm:gap-2.5" role="timer" aria-live="off">
        {slots.map((p) => (
          <div
            key={p.label}
            className={`min-w-[3.75rem] flex-1 rounded-2xl px-2 py-2.5 text-center sm:min-w-[4.25rem] ${
              dark ? 'bg-white/10 ring-1 ring-white/15 backdrop-blur' : 'bg-white ring-1 ring-slate-200'
            }`}
          >
            <span
              className={`block text-xl font-bold tabular-nums leading-none sm:text-2xl ${
                dark ? 'text-white' : 'text-ink-900'
              }`}
            >
              {p.value === null ? '\u2013\u2013' : String(p.value).padStart(2, '0')}
            </span>
            <span
              className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] ${
                dark ? 'text-white/50' : 'text-ink-500'
              }`}
            >
              {p.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
