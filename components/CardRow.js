import Reveal from './Reveal'
import { PriceCard, BundleCard } from './PriceCard'

/**
 * The four tiers of one catalogue.
 *
 * This used to be a snapping side-swipe on a phone, which fought the page's
 * own vertical scroll: a card wider than the screen meant the one beside it
 * was always sliced down the middle, and a card taller than the screen meant
 * the price you had swiped to read was already off the bottom. Now every card
 * is full width and stacked, and the detail that made them tall is folded
 * away behind a tap (see `MoreOnPhone`), so a whole tier fits on one screen.
 * From `sm` up it is the usual grid, unchanged.
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
      {/* The badge on the highlighted card hangs above its top edge, so the row
          carries the padding that keeps it clear of whatever sits above. */}
      <div className="grid items-stretch gap-5 pt-6 sm:grid-cols-2 sm:gap-5 sm:gap-y-8 sm:pt-5 lg:grid-cols-4">
        {ordered.map(({ item, tier }, i) => (
          <Reveal key={item.name} delay={i * 70} className="h-full">
            {isBundle ? <BundleCard item={item} tier={tier} /> : <PriceCard item={item} tier={tier} />}
          </Reveal>
        ))}
      </div>
    </div>
  )
}
