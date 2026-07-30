import { industries } from '../lib/site'

export default function Marquee() {
  const row = [...industries, ...industries]

  return (
    <section className="py-10 bg-white border-y border-slate-100">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink-300">
        Trusted across every industry
      </p>

      <div className="marquee mt-6 overflow-hidden mask-fade-x">
        <div className="marquee-track flex w-max gap-3">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-ink-500"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
