import { Icons, Star } from './Icons'
import { site } from '../lib/site'

const points = [
  { icon: Icons.shield, label: 'Unlimited revisions', sub: 'on Gold and above' },
  { icon: Icons.check, label: 'Rights in writing', sub: 'logo certificate available' },
  { icon: Icons.clock, label: '24-hour', sub: 'first concepts' },
  { icon: Icons.team, label: 'In-house team', sub: 'based in the USA' },
]

/** Sits directly under the hero, the first thing a sceptical visitor checks. */
export default function TrustBar() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-6 items-center">
          <div className="col-span-2 lg:col-span-1 flex items-center gap-3">
            <div>
              <div className="flex text-flare-400">
                {[0, 1, 2, 3].map((i) => <Star key={i} className="w-4 h-4" />)}
                <Star className="w-4 h-4" half id="trustbar-half" />
              </div>
              <p className="mt-1 text-sm text-ink-500">
                <span className="font-bold text-ink-900">{site.rating}/5</span> from{' '}
                {site.reviewCount.toLocaleString()} clients
              </p>
            </div>
          </div>

          {points.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.label} className="flex items-center gap-3">
                <span className="grid place-items-center w-10 h-10 shrink-0 rounded-xl bg-trust-50 text-trust-600">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink-900 leading-tight">{p.label}</p>
                  <p className="text-xs text-ink-500 leading-tight">{p.sub}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
