import { useState } from 'react'
import { Icons } from './Icons'
import { money } from '../lib/pricing'

/**
 * Side-by-side comparison of the tiers in one category.
 *
 * Collapsed by default: someone who already knows what they want should not
 * have to scroll past a spec grid, but someone stuck between two tiers gets a
 * single place where the difference is spelled out in one word per row.
 */
export default function CompareTable({ compare, items, featuredIndex }) {
  const [open, setOpen] = useState(false)

  if (!compare) return null

  const cell = (value) => {
    if (value === true) {
      return (
        <span className="inline-flex items-center gap-1.5 font-medium text-trust-600">
          <Icons.check className="w-4 h-4" />
          <span className="sr-only">Included</span>
        </span>
      )
    }
    if (value === false) {
      return (
        <span className="text-[13px] font-medium text-ink-300">Not included</span>
      )
    }
    return <span className="font-medium text-ink-900">{value}</span>
  }

  return (
    <div className="mt-8 sm:mt-10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="mx-auto flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3.5 text-[14px] font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600 sm:w-auto sm:px-6 sm:py-3 sm:text-sm"
      >
        {open ? 'Hide the comparison' : 'Still deciding? Compare them side by side'}
        <Icons.plus className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
      </button>

      {open && (
        <>
          {/* The table cannot fit four tiers on a phone, so say so rather than
              leaving the last column hidden off the edge. */}
          <p className="mt-5 flex items-center justify-center gap-1.5 text-[13px] text-ink-500 sm:hidden">
            <Icons.arrow className="w-4 h-4" />
            Swipe the table sideways to see every tier
          </p>

          <div className="mt-3 overflow-x-auto rounded-3xl border border-slate-200 bg-white sm:mt-6">
            <table className="w-full min-w-[38rem] border-collapse text-sm">
              <caption className="sr-only">Feature comparison for each tier</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-4 text-left font-semibold text-ink-500 sm:px-5">
                    What you get
                  </th>
                  {compare.columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={`px-4 py-4 text-left sm:px-5 ${i === featuredIndex ? 'bg-brand-50/70' : ''}`}
                    >
                      <span className="block font-bold text-ink-900">{col}</span>
                      {items?.[i] && (
                        <span className="block text-[13px] font-medium text-ink-500">
                          {items[i].from ? 'from ' : ''}
                          {money(items[i].price)}
                        </span>
                      )}
                      {i === featuredIndex && (
                        <span className="mt-1 inline-block rounded-full bg-action-500 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                          Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.rows.map((row) => (
                  <tr key={row.label} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="px-4 py-3.5 text-left font-normal text-ink-700 sm:px-5">
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={`${row.label}-${compare.columns[i]}`}
                        className={`px-4 py-3.5 sm:px-5 ${i === featuredIndex ? 'bg-brand-50/50' : ''}`}
                      >
                        {cell(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
