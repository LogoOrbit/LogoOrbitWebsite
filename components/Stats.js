import { useInView, useCountUp } from '../lib/hooks'

const stats = [
  { value: 15, suffix: '+', label: 'Years in design' },
  { value: 8503, suffix: '', label: 'Brands delivered' },
  { value: 24, suffix: 'h', label: 'Average turnaround' },
  { value: 100, suffix: '%', label: 'Ownership rights' },
]

function Stat({ value, suffix, label, active }) {
  const shown = useCountUp(value, active)
  return (
    <div className="text-center">
      <p className="text-4xl sm:text-5xl font-bold tracking-tight text-ink-900 tabular-nums">
        {shown.toLocaleString()}
        <span className="text-brand-600">{suffix}</span>
      </p>
      <p className="mt-2 text-sm font-medium text-ink-500">{label}</p>
    </div>
  )
}

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section ref={ref} className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 rounded-3xl border border-slate-100 bg-slate-50/70 py-10 px-6">
          {stats.map((s) => (
            <Stat key={s.label} {...s} active={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
