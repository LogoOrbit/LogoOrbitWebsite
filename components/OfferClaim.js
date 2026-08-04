import Link from 'next/link'
import { Icons } from './Icons'
import { site, whatsappLink } from '../lib/site'

/**
 * The ask, in the two forms a returning customer will actually use: the form,
 * or a message that already says YES for them. Every CTA on the offer pages
 * goes through here so the wording, the order and the reassurance line under
 * them stay identical wherever the reader decides.
 */
export default function OfferClaim({ message, label = 'Reply YES to claim', tone = 'dark', cta = true }) {
  const dark = tone === 'dark'

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/contact" className={`btn-action px-7 py-4 ${cta ? 'deal-cta' : ''}`}>
          {label}
          <Icons.arrow className="w-5 h-5" />
        </Link>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className={
            dark
              ? 'inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20'
              : 'inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-900 px-7 py-4 font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white'
          }
        >
          <Icons.whatsapp className="w-5 h-5" />
          Say YES on WhatsApp
        </a>
      </div>

      <p
        className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] ${
          dark ? 'text-white/60' : 'text-ink-500'
        }`}
      >
        <span className="inline-flex items-center gap-1.5">
          <Icons.shield className={`w-4 h-4 ${dark ? 'text-trust-300' : 'text-trust-600'}`} />
          No card needed to enquire
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icons.phone className={`w-4 h-4 ${dark ? 'text-trust-300' : 'text-trust-600'}`} />
          Or call {site.phone}
        </span>
      </p>
    </div>
  )
}
