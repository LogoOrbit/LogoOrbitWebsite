import Reveal from './Reveal'
import { PriceCard, BundleCard } from './PriceCard'

export default function PricingSection({ section, tone = 'light' }) {
  const isBundle = Boolean(section.items[0]?.includes)

  return (
    <section id={section.id} className={`py-16 sm:py-20 ${tone === 'muted' ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            {section.subtitle}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-ink-900">{section.title}</h2>
          {section.blurb && <p className="mt-4 text-lg leading-relaxed text-ink-500">{section.blurb}</p>}
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {section.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 70} className="h-full">
              {isBundle ? <BundleCard item={item} /> : <PriceCard item={item} />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
