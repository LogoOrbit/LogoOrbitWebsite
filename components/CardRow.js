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

  return (
    <div className={className}>
      <p className="mb-3 flex items-center gap-1.5 text-[13px] font-medium text-ink-500 sm:hidden">
        <Icons.arrow className="w-4 h-4" />
        Swipe sideways for all {items.length} options
      </p>

      <div className="-mx-5 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto no-scrollbar px-5 pt-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pt-0 sm:pb-0 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.name} delay={i * 70} className="h-full w-[85%] shrink-0 snap-center sm:w-auto sm:shrink">
            {isBundle ? <BundleCard item={item} /> : <PriceCard item={item} />}
          </Reveal>
        ))}
      </div>
    </div>
  )
}
