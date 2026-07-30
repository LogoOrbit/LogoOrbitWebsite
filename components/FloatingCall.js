import Link from 'next/link'
import { Icons } from './Icons'
import { useScrolled } from '../lib/hooks'
import { site } from '../lib/site'

export default function FloatingCall() {
  const shown = useScrolled(600)

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-300 ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Link
        href="/contact"
        className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-900 shadow-xl ring-1 ring-slate-200 hover:-translate-y-0.5 transition-all"
      >
        <Icons.spark className="w-4.5 h-4.5 text-brand-600" />
        Get a free quote
      </Link>

      <a
        href={site.phoneHref}
        aria-label={`Call ${site.phone}`}
        className="grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-brand-600 to-orbit-500 text-white shadow-2xl shadow-brand-600/40 animate-pulse-ring hover:scale-105 transition-transform"
      >
        <Icons.phone className="w-6 h-6" />
      </a>
    </div>
  )
}
