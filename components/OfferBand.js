import Link from 'next/link'
import Reveal from './Reveal'
import OfferCountdown from './OfferCountdown'
import { Icons } from './Icons'
import { money } from '../lib/money'
import { offer, headline, informativeWebsite, informativeFeatures } from '../lib/offers'

/**
 * The home page's slot for whatever promotion is running. Renders nothing when
 * `offer.active` is false, so ending the promotion is a one-line edit in
 * lib/offers.js rather than a change to this page.
 */
export default function OfferBand() {
  if (!offer.active) return null

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl mesh-bg text-white">
            <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
            <div
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-action-500/30 blur-3xl animate-drift"
              aria-hidden="true"
            />

            <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  <Icons.spark className="h-4 w-4" />
                  {offer.eyebrow} · limited time
                </span>

                <h2 className="mt-4 text-[1.7rem] font-bold leading-[1.12] text-white sm:text-[2.5rem]">
                  Our {money(headline.was)} websites are now just{' '}
                  <span className="text-gradient-light">{money(headline.now)}</span>
                </h2>

                <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-lg">
                  That is {offer.discount}% off — and every other service is {offer.discount}% off too,
                  exclusively for existing customers. Same designers, same files, same ownership terms.
                </p>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {informativeFeatures.slice(0, 4).map((f) => (
                    <li key={f} className="rounded-full glass px-3.5 py-1.5 text-[13px] font-medium text-white/85">
                      {f}
                    </li>
                  ))}
                  <li className="rounded-full glass px-3.5 py-1.5 text-[13px] font-medium text-white/60">
                    + {informativeFeatures.length - 4} more
                  </li>
                </ul>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href={offer.href} className="btn-action deal-cta px-7 py-4">
                    See the offer
                    <Icons.arrow className="h-5 w-5" />
                  </Link>
                  <Link
                    href={informativeWebsite.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20"
                  >
                    {informativeWebsite.name} — {money(informativeWebsite.price)}
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div
                  className="deal-aura pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-action-500/25 blur-2xl"
                  aria-hidden="true"
                />
                <div className="deal-panel relative rounded-3xl bg-white/10 p-6 text-center ring-1 ring-white/15 backdrop-blur">
                  <p className="deal-save inline-flex items-center gap-1.5 rounded-full bg-trust-500/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-trust-300">
                    Save {money(headline.saving)}
                  </p>
                  <p className="mt-3 flex items-baseline justify-center gap-2.5">
                    <span className="deal-price inline-block text-5xl font-bold tracking-tight text-white">
                      {money(headline.now)}
                    </span>
                    <span className="deal-was text-lg text-white/45">{money(headline.was)}</span>
                  </p>
                  <OfferCountdown className="mt-5" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
