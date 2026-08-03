import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'
import { brandProtection, salesTax } from '../lib/pricing'

/**
 * The two legal steps that sit either side of the design work: owning the
 * artwork, and registering the name. They are constantly confused for each
 * other, so they are shown as a pair wherever a visitor is close to buying —
 * the home page, the pricing catalogue, every service page and the legal desk.
 *
 * `tone` picks the surface the band sits on so it can follow whichever section
 * it lands between, and `compact` drops the section padding for callers that
 * already have their own.
 */
export default function BrandProtectionBand({ tone = 'muted', compact = false }) {
  const wrapper = compact ? '' : `py-14 sm:py-20 ${tone === 'muted' ? 'bg-slate-50' : 'bg-white'}`

  return (
    <section className={wrapper} aria-labelledby="brand-protection-band">
      <div className={compact ? '' : 'mx-auto max-w-7xl px-5 sm:px-6'}>
        <Reveal className="max-w-3xl">
          <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8a6a22]">
            Own it, then defend it
          </span>
          <h2 id="brand-protection-band" className="mt-3 text-2xl font-bold leading-tight text-ink-900 sm:text-4xl">
            A design becomes a brand when the{' '}
            <span className="text-gradient">paperwork says it is yours</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500 sm:text-lg">
            Two separate steps, constantly mistaken for each other. One puts the artwork in your name. The other puts
            the name on the federal register so a competitor cannot trade under it.
          </p>
        </Reveal>

        <p className="mt-4 text-[13px] text-ink-300">{salesTax.short}</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#c9a044]/12 text-[#8a6a22]">
                  <Icons.scales className="h-5 w-5" />
                </span>
                <span className="doc-mono text-[13px] font-bold text-ink-900">$499</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink-900">Copyright assignment certificate</h3>
              <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-500">
                The signed instrument that moves our copyright in your approved final logo to your business, and
                authorises public commercial use. Read all ten sections before you buy — the specimen is published.
              </p>
              <Link
                href="/copyright-certificate"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                See the certificate
                <Icons.arrow className="h-4 w-4" />
              </Link>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <article className="flex h-full flex-col rounded-3xl border-2 border-[#c9a044]/60 bg-white p-6 shadow-lg shadow-[#c9a044]/10 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#c9a044]/12 text-[#8a6a22]">
                  <Icons.badge className="h-5 w-5" />
                </span>
                <span className="doc-mono text-[13px] font-bold text-ink-900">
                  ${brandProtection.price} + ${brandProtection.classPrice}/class
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink-900">US trademark filing</h3>
              <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-500">
                Clearance search, the classes your business actually needs, the USPTO application filed in your name,
                and the examiner answered by our legal desk. Work out your class count on the page.
              </p>
              <Link href={brandProtection.href} className="btn-action mt-5 px-6 py-3.5">
                See trademark filing
                <Icons.arrow className="h-4 w-4" />
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
