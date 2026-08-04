import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'
import { offer, informativeWebsite } from '../lib/offers'

/**
 * The home page's slot for whatever promotion is running. Renders nothing when
 * `offer.active` is false, so ending the promotion is a one-line edit in
 * lib/offers.js rather than a change to the page.
 */
export default function OfferBand() {
  if (!offer.active) return null

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl mesh-bg px-8 py-12 sm:px-12 sm:py-14 text-white">
            <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
            <div
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-orbit-500/30 blur-3xl animate-drift"
              aria-hidden="true"
            />

            <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
              <div>
                <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                  {offer.eyebrow} — limited time
                </span>
                <h2 className="mt-5 text-3xl sm:text-[2.5rem] font-bold leading-[1.12] text-white">
                  Our ${offer.wasPrice} websites are now just{' '}
                  <span className="text-gradient-light">${offer.nowPrice}</span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/75">
                  That is {offer.discount}% off — and every other service is {offer.discount}% off too,
                  exclusively for existing customers like you.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
                  <Link href={offer.href} className="group btn-action px-7 py-4">
                    See the offer
                    <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href={informativeWebsite.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    {informativeWebsite.name} — ${informativeWebsite.price}
                  </Link>
                </div>
              </div>

              <ul className="space-y-2.5 rounded-2xl glass p-7">
                <li className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
                  ${informativeWebsite.price} package includes
                </li>
                {informativeWebsite.features.slice(0, 6).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-white/85">
                    <Icons.check className="mt-1 w-4 h-4 shrink-0" />
                    {f}
                  </li>
                ))}
                <li className="pt-1 text-sm text-white/60">
                  + {informativeWebsite.features.length - 6} more, all included.
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
