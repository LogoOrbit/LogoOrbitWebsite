import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'

export default function CopyrightOwnershipNotice({ compact = false }) {
  return (
    <section className={compact ? '' : 'bg-white py-10 sm:py-16'} aria-labelledby="copyright-ownership-notice">
      <div className={compact ? '' : 'mx-auto max-w-7xl px-5 sm:px-6'}>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-2 border-action-500/45 bg-action-500/5 p-6 sm:p-8">
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  <Icons.shield className="h-4 w-4" />
                  Ownership notice
                </span>
                <h2 id="copyright-ownership-notice" className="mt-4 text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">
                  Logo design and copyright ownership are separate purchases.
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-700 sm:text-[17px]">
                  Paying for a LogoOrbit logo package covers the design service. It does not, by itself, transfer
                  our copyright. Public or commercial use is authorized only after the project is paid in full and
                  the separate $499 Copyright Assignment &amp; Commercial Use Certificate is completed and signed.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/copyright-certificate" className="btn-action px-6 py-3.5">
                  See the $499 certificate
                  <Icons.arrow className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/logoorbit-sample-copyright-assignment-certificate.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
                >
                  Download sample PDF
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
