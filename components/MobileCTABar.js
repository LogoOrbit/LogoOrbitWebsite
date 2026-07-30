import Link from 'next/link'
import { Icons } from './Icons'
import { useScrolled } from '../lib/hooks'
import { site } from '../lib/site'

/**
 * Phone-only sticky action bar. On mobile the floating buttons used to sit
 * on top of body copy; a docked bar keeps both actions reachable without
 * covering anything, and the page reserves space for it.
 */
export default function MobileCTABar() {
  const shown = useScrolled(500)

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-lg transition-transform duration-300 ${
        shown ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-ink-900 px-4 py-3 font-semibold text-ink-900"
        >
          <Icons.phone className="w-5 h-5" />
          Call
        </a>
        <Link href="/contact" className="btn-action flex-[1.4] px-4 py-3">
          Get a Free Quote
        </Link>
      </div>
    </div>
  )
}
