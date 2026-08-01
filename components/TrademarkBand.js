import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'
import { brandProtection, money } from '../lib/pricing'

/**
 * Most owners do not know a logo can be registered, and the ones who do assume
 * it needs a lawyer. Both are worth correcting on the home page.
 */
export default function TrademarkBand() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-2 border-action-500/50 bg-white p-6 sm:p-10 shadow-lg">
            <div className="absolute inset-0 bg-action-500/5" aria-hidden="true" />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-7">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  <Icons.shield className="w-4 h-4" />
                  {brandProtection.eyebrow}
                </span>

                <h2 className="mt-4 text-[1.75rem] sm:text-4xl font-bold leading-tight tracking-tight text-ink-900">
                  We can register your logo as a US trademark
                </h2>
                <p className="mt-3 text-[15px] sm:text-[17px] leading-relaxed text-ink-700">
                  Owning a design and owning the rights to stop other people using it are two different things. We
                  file the paperwork with the USPTO for you, so nobody else can trade on the mark you paid us to
                  draw. Our fee is {money(brandProtection.price)} per class.
                </p>
              </div>

              <div className="flex w-full flex-col sm:flex-row lg:w-auto gap-3 shrink-0">
                <Link href="/pricing#trademark" className="btn-action px-7 py-3.5">
                  How it works
                  <Icons.arrow className="w-4.5 h-4.5" />
                </Link>
                <Link
                  href="/brief"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
                >
                  Ask about my logo
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
