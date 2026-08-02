import { useState } from 'react'
import { Icons } from './Icons'

/**
 * The long tail of a pricing card, folded away on a phone.
 *
 * A spec list that costs a desktop reader two inches of a four-column grid
 * costs a phone reader most of a screen, which is what turned this page into
 * a scroll marathon. Below `sm` the children sit behind one tap; from `sm` up
 * the toggle disappears and the content is simply always open, so nothing
 * about the desktop card changes.
 */
export default function MoreOnPhone({
  label,
  openLabel = 'Show less',
  tone = 'light',
  className = '',
  children,
}) {
  const [open, setOpen] = useState(false)
  const dark = tone === 'dark'

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-[14px] font-semibold transition-colors sm:hidden ${
          dark
            ? 'border-white/15 bg-white/5 text-white'
            : 'border-slate-200 bg-slate-50 text-ink-900'
        }`}
      >
        {open ? openLabel : label}
        <Icons.plus className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out sm:grid-rows-[1fr]! ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
