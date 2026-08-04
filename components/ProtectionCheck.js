import { useState } from 'react'
import Link from 'next/link'
import AddToCart from './AddToCart'
import { Icons } from './Icons'
import { useCart, lineId } from '../lib/cart'
import { brandProtection, copyrightCertificate, money } from '../lib/pricing'

/**
 * The question asked before an order is placed: do you own what you are
 * buying, and can anyone else use it?
 *
 * This is written as an explanation rather than an upsell, because for most
 * of the people reading it the honest answer is that they have never been
 * told the difference between the two documents, and finding out after a
 * dispute has started is the expensive way to learn. So each card leads with
 * what the protection actually does, says plainly when it is not needed yet,
 * and links to the page that explains it in full. Declining is a first-class
 * option sitting in the same row as the buttons — a step that can only be
 * agreed with is a sales gate, not a question.
 *
 * Nothing here is added to the cart by default. A charge somebody did not ask
 * for is the fastest way to lose the order and deserve to.
 */

/* The two products, described in terms of the risk they answer. */
const options = [
  {
    id: 'copyright',
    eyebrow: 'Who owns the artwork',
    title: 'Copyright assignment certificate',
    price: copyrightCertificate.price,
    priceNote: 'one-off, per project',
    href: copyrightCertificate.href,
    lead: 'Paying a designer buys the design work. It does not, on its own, move the copyright in the drawing to you — that transfers in signed writing or it does not transfer at all.',
    matters: [
      'It is what lets you register the mark as a trademark in your own name later',
      'It is the document an investor or a buyer asks for when they check what the business owns',
      'Without it you are using artwork somebody else still holds the rights to',
    ],
    skip: 'You already have a signed assignment for this exact artwork, or the package you are buying is not original artwork.',
    cart: {
      sku: '/copyright-certificate',
      name: 'Copyright assignment certificate',
      kind: 'Ownership document',
      price: copyrightCertificate.price,
      href: copyrightCertificate.href,
      note: 'issued once the project balance is paid',
    },
  },
  {
    id: 'trademark',
    eyebrow: 'Who else can use it',
    title: 'US trademark registration',
    price: brandProtection.price,
    priceNote: `plus ${money(brandProtection.classPrice)} per class`,
    href: brandProtection.href,
    lead: 'Owning the artwork stops nobody from opening a business under your name next year. A registered trademark is what turns "please stop" into something a court will enforce.',
    matters: [
      'A competitor cannot legally trade on a mark you have registered',
      'Marketplaces, app stores and ad platforms act on a registration and usually ignore anything less',
      'Filing early is cheap; rebranding after somebody else registers your name is not',
    ],
    skip: 'The name is not settled yet, or you are not trading under it. Filing on a mark you are about to change is money spent twice — we would rather you waited.',
    cart: {
      sku: 'trademark-filing',
      name: 'US trademark filing service',
      kind: 'Brand protection',
      price: brandProtection.price,
      href: brandProtection.href,
      note: `plus ${money(brandProtection.classPrice)} per class, confirmed with you`,
    },
  },
]

function Option({ option, inCart }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">{option.eyebrow}</p>
      <h3 className="mt-1.5 text-[18px] font-bold leading-snug text-ink-900">{option.title}</h3>

      <p className="mt-1 text-[14px] font-semibold text-ink-500">
        {money(option.price)} <span className="font-normal text-ink-300">· {option.priceNote}</span>
      </p>

      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">{option.lead}</p>

      <ul className="mt-4 space-y-2">
        {option.matters.map((m) => (
          <li key={m} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-700">
            <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-trust-500" />
            {m}
          </li>
        ))}
      </ul>

      {/* The reason not to buy it, given the same weight as the reasons to.
          A protection page that never says "not yet" is an advert. */}
      <p className="mt-4 rounded-xl bg-slate-50 p-3.5 text-[13px] leading-relaxed text-ink-500">
        <span className="font-bold text-ink-700">Skip this if:</span> {option.skip}
      </p>

      <div className="mt-auto pt-5">
        {inCart ? (
          <p className="flex items-center justify-center gap-2 rounded-full bg-trust-50 px-4 py-3 text-[14px] font-bold text-trust-700">
            <Icons.check className="h-4.5 w-4.5" />
            In your order
          </p>
        ) : (
          <AddToCart item={option.cart} label="Add this protection" />
        )}
        <Link
          href={option.href}
          className="mt-2.5 flex items-center justify-center gap-1.5 text-[13.5px] font-bold text-brand-600 hover:text-brand-700"
        >
          Read how it works first
          <Icons.arrow className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

export default function ProtectionCheck() {
  const { items } = useCart()
  const [dismissed, setDismissed] = useState(false)

  const inCart = (option) => items.some((i) => i.id === lineId(option.cart))
  const covered = options.every(inCart)

  if (covered) {
    return (
      <p className="flex items-start gap-3 rounded-2xl bg-trust-50 p-4 text-[14.5px] leading-relaxed text-trust-700">
        <Icons.shield className="mt-0.5 h-5 w-5 shrink-0" />
        Both protections are in your order: you will own the artwork outright and the mark will be registered
        against anyone else trading on it.
      </p>
    )
  }

  if (dismissed) {
    return (
      <p className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4 text-[14px] text-ink-500">
        Noted — nothing added. Either can be bought later, and the team will raise it once more before the
        artwork is delivered.
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="font-bold text-brand-600 hover:text-brand-700"
        >
          Show me again
        </button>
      </p>
    )
  }

  return (
    <div>
      <p className="text-[15px] leading-relaxed text-ink-700">
        Two different things protect a brand, and they are constantly mistaken for each other. One decides
        whether the artwork is yours. The other decides whether anybody else can trade under it. Neither is
        included in a design package anywhere in this industry, including ours, so it is worth knowing where
        you stand before you order rather than after.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {options.map((option) => (
          <Option key={option.id} option={option} inCart={inCart(option)} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-[13.5px] leading-relaxed text-ink-500">
          Not sure which applies to you? Ask on the phone before you order — it is a two-minute answer and we
          will tell you if the honest one is “neither, yet”.
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-ink-700 transition-colors hover:border-ink-300"
        >
          No thanks, not now
        </button>
      </div>
    </div>
  )
}
