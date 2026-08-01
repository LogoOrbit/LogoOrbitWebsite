import Reveal from './Reveal'
import { Icons } from './Icons'
import { PriceCard, BundleCard } from './PriceCard'

/**
 * The four tiers of one catalogue.
 *
 * Stacked vertically on a phone each card is close to a full screen, so four
 * tiers meant four screens of scrolling before the next category even began.
 * Below `sm` this is a snapping side-swipe instead, with the next card peeking
 * in so the gesture is obvious; from `sm` up it is the usual grid.
 */
export default function CardRow({ items, className = '' }) {
  const isBundle = Boolean(items[0]?.includes)

  // Keep the tier number with the item, then move the highlighted package to
  // second place. Sitting last it was the card people scrolled past; second is
  // where the eye lands after the cheapest one, and it stays next to a price
  // it can be compared against.
  const ordered = items.map((item, tier) => ({ item, tier }))
  const star = ordered.findIndex((o) => o.item.featured)
  if (star > 1) ordered.splice(1, 0, ordered.splice(star, 1)[0])

  return (
    <div className={className}>
      <p className="mb-3 flex items-center gap-1.5 text-[13px] font-medium text-ink-500 sm:hidden">
        <Icons.arrow className="w-4 h-4" />
        Swipe sideways for all {items.length} options
      </p>

      <div className="-mx-5 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto no-scrollbar px-5 pt-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pt-0 sm:pb-0 lg:grid-cols-4">
        {ordered.map(({ item, tier }, i) => (
          <Reveal key={item.name} delay={i * 70} className="h-full w-[85%] shrink-0 snap-center sm:w-auto sm:shrink">
            {isBundle ? <BundleCard item={item} tier={tier} /> : <PriceCard item={item} tier={tier} />}
          </Reveal>
        ))}
      </div>
    </div>
  )
}
