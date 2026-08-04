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
    lead: 'Paying for a logo pays for the work. It does not make the logo legally yours. This signed paper does.',
    matters: [
      'You need it to register your logo as a trademark later',
      'Banks, investors and buyers ask for it to check what your business owns',
      'Without it, someone else still holds the rights to your logo',
    ],
    skip: 'You already have this paper signed for this exact logo, or you are not buying artwork.',
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
    lead: 'Owning your logo does not stop someone else opening a business with your name. Registering it does.',
    matters: [
      'A competitor cannot legally use a name you have registered',
      'Amazon, app stores and ad platforms take action when you are registered, and usually not before',
      'Registering now is cheap. Changing your whole brand later is not',
    ],
    skip: 'Your name is not final yet, or you are not using it in business yet. Wait — registering a name you are about to change is money spent twice.',
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

/**
 * One protection, offered without a wall of text.
 *
 * The card leads with what it is, what it costs and the one sentence that
 * explains why it exists. Everything else — the reasons it matters, the reason
 * to skip it — is folded away, because on a phone this section sat between a
 * visitor and the order button and made them scroll past two essays to reach
 * it. Anyone who wants the detail is one tap away from all of it.
 */
function Option({ option, inCart }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">{option.eyebrow}</p>
      <h3 className="mt-1 text-[16px] font-bold leading-snug text-ink-900 sm:text-[18px]">{option.title}</h3>

      <p className="mt-1 text-[13.5px] font-semibold text-ink-500">
        {money(option.price)} <span className="font-normal text-ink-300">· {option.priceNote}</span>
      </p>

      <p className="mt-2.5 text-[14px] leading-relaxed text-ink-700">{option.lead}</p>

      <details className="group mt-2.5">
        <summary className="cursor-pointer list-none text-[13px] font-bold text-brand-600 hover:text-brand-700">
          <span className="group-open:hidden">Why this matters</span>
          <span className="hidden group-open:inline">Show less</span>
        </summary>

        <ul className="mt-2.5 space-y-1.5">
          {option.matters.map((m) => (
            <li key={m} className="flex items-start gap-2 text-[13.5px] leading-snug text-ink-700">
              <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-trust-500" />
              {m}
            </li>
          ))}
        </ul>

        {/* The reason not to buy it, given the same weight as the reasons to.
            A protection page that never says "not yet" is an advert. */}
        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-[13px] leading-relaxed text-ink-500">
          <span className="font-bold text-ink-700">Skip this if:</span> {option.skip}
        </p>

        <Link
          href={option.href}
          className="mt-2.5 flex items-center gap-1.5 text-[13px] font-bold text-brand-600 hover:text-brand-700"
        >
          Read the full explanation
          <Icons.arrow className="h-4 w-4" />
        </Link>
      </details>

      <div className="mt-auto pt-4">
        {inCart ? (
          <p className="flex items-center justify-center gap-2 rounded-full bg-trust-50 px-4 py-2.5 text-[14px] font-bold text-trust-700">
            <Icons.check className="h-4.5 w-4.5" />
            In your order
          </p>
        ) : (
          <AddToCart item={option.cart} label="Add this" />
        )}
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
      <p className="flex items-start gap-3 rounded-2xl bg-trust-50 p-3.5 text-[14px] leading-relaxed text-trust-700">
        <Icons.shield className="mt-0.5 h-5 w-5 shrink-0" />
        Both are in your order. Your logo will be legally yours, and your name will be registered so nobody
        else can use it.
      </p>
    )
  }

  if (dismissed) {
    return (
      <p className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3.5 text-[13.5px] text-ink-500">
        Nothing added. You can add either one later, and we will ask you once more before we send your files.
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
      <p className="text-[14px] leading-relaxed text-ink-700 sm:text-[15px]">
        One makes the logo legally yours. The other stops anyone else using your name. No design company
        includes these, ours included, so it is better to know now than later.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {options.map((option) => (
          <Option key={option.id} option={option} inCart={inCart(option)} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
        <p className="text-[13px] leading-relaxed text-ink-500">
          Not sure if you need these? Call us before you order. It takes two minutes, and we will tell you if
          the answer is “not yet”.
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink-700 transition-colors hover:border-ink-300"
        >
          No thanks, not now
        </button>
      </div>
    </div>
  )
}
