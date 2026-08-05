import Reveal from './Reveal'
import { salesTax } from '../lib/money'
import CardRow from './CardRow'
import CompareTable from './CompareTable'

/** A single catalogue, used on the home page and the service pages. */
export default function PricingSection({ section, tone = 'light' }) {
  return (
    <section id={section.id} className={`py-12 sm:py-20 ${tone === 'muted' ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            {section.subtitle}
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">{section.title}</h2>
          {section.blurb && (
            <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">{section.blurb}</p>
          )}
        </Reveal>

        <CardRow items={section.items} className="mt-8 sm:mt-12" />

        <p className="mt-5 text-[13px] leading-relaxed text-ink-300">{salesTax.short}</p>

        {section.compare && (
          <CompareTable
            compare={section.compare}
            items={section.items}
            featuredIndex={section.items.findIndex((i) => i.featured)}
          />
        )}
      </div>
    </section>
  )
}
