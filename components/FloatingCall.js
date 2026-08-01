import { Icons } from './Icons'
import { useScrolled } from '../lib/hooks'
import { site } from '../lib/site'

/**
 * Desktop-only call button. Deliberately just the one circular control  
 * the wider "get a free quote" pill that used to sit beside it overlapped
 * card content on the pricing page, and the header already carries that CTA.
 */
export default function FloatingCall() {
  const shown = useScrolled(600)

  return (
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.phone}`}
      title={`Call ${site.phone}`}
      className={`hidden lg:grid fixed bottom-6 right-6 z-40 place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-action-500 to-action-600 text-white shadow-2xl shadow-action-600/40 animate-pulse-ring transition-all duration-300 hover:scale-105 ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icons.phone className="w-6 h-6" />
    </a>
  )
}
