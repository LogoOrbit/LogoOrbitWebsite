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
        <span className="text-ink-300" aria-hidden="true">
          —<span className="sr-only">Not included</span>
        </span>
      )
    }
    return <span className="font-medium text-ink-900">{value}</span>
  }

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="mx-auto flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
      >
        {open ? 'Hide the comparison' : 'Still deciding? Compare them side by side'}
        <Icons.plus className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
      </button>

      {open && (
        <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white">
          <table className="w-full min-w-[42rem] border-collapse text-sm">
            <caption className="sr-only">Feature comparison for each tier</caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th scope="col" className="px-5 py-4 text-left font-semibold text-ink-500">
                  What you get
                </th>
                {compare.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={`px-5 py-4 text-left ${i === featuredIndex ? 'bg-brand-50/70' : ''}`}
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
                  <th scope="row" className="px-5 py-3.5 text-left font-normal text-ink-700">
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={`${row.label}-${compare.columns[i]}`}
                      className={`px-5 py-3.5 ${i === featuredIndex ? 'bg-brand-50/50' : ''}`}
                    >
                      {cell(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
