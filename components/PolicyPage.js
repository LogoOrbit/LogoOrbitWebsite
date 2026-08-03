import Reveal from './Reveal'
import { Icons } from './Icons'
import { legalCounsel, site } from '../lib/site'

/**
 * The shared skeleton for terms and privacy: a plain-English summary card, a
 * sticky contents list on the left and the numbered sections on the right.
 *
 * Legal pages get skimmed, not read, so the structure has to answer "where is
 * the bit about X" in one glance. Every section carries an id, so a support
 * reply can link somebody straight at the paragraph that settles the point.
 */
export default function PolicyPage({ summaryTitle, summary, sections, updated }) {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Plain-English summary */}
        <Reveal>
          <div className="rounded-3xl border border-brand-100 bg-brand-50/60 p-6 sm:p-9">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              <Icons.spark className="w-4 h-4" />
              The short version
            </span>
            <h2 className="mt-4 text-xl sm:text-2xl font-bold text-ink-900">{summaryTitle}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {summary.map((line) => (
                <li key={line} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-700">
                  <span className="mt-0.5 grid shrink-0 place-items-center w-5 h-5 rounded-full bg-trust-50 text-trust-600">
                    <Icons.check className="w-3.5 h-3.5" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] text-ink-500">
              This summary is here to be helpful, the numbered sections below are the ones that count.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[15rem_minmax(0,1fr)] gap-10 lg:gap-14">
          {/* Contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-300">On this page</p>
            <ol className="mt-4 space-y-1.5">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex gap-2.5 rounded-lg py-1.5 text-[14px] leading-snug text-ink-500 hover:text-brand-600 transition-colors"
                  >
                    <span className="tabular-nums text-ink-300">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            {updated && (
              <p className="mt-6 border-t border-slate-100 pt-5 text-[13px] text-ink-500">
                Last updated {updated}
              </p>
            )}
          </aside>

          {/* Body */}
          <div className="min-w-0">
            {sections.map((s, i) => (
              <Reveal key={s.id} as="section" className="scroll-mt-28 border-t border-slate-100 pt-9 first:border-0 first:pt-0 pb-9">
                <div id={s.id} className="scroll-mt-28" />
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-bold tabular-nums text-brand-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold leading-snug text-ink-900">{s.title}</h2>
                </div>

                <div className="mt-4 space-y-4">
                  {s.paragraphs?.map((p) => (
                    <p key={p} className="text-[15px] sm:text-base leading-relaxed text-ink-500">
                      {p}
                    </p>
                  ))}

                  {s.list && (
                    <ul className="space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                      {s.list.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-700">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.afterList?.map((p) => (
                    <p key={p} className="text-[15px] sm:text-base leading-relaxed text-ink-500">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}

            {/* Who to ask */}
            <Reveal className="border-t border-slate-100 pt-9">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-ink-900">Questions about any of this?</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                  They go to {legalCounsel.name}, {legalCounsel.role}, {legalCounsel.bar}. He looks after the{' '}
                  {legalCounsel.department.toLowerCase()}, the intellectual property review team and the trademark
                  and brand protection division.
                </p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`mailto:${legalCounsel.email}?subject=Policy%20question`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 font-semibold text-white hover:bg-brand-600 transition-colors"
                  >
                    <Icons.mail className="w-4.5 h-4.5" />
                    {legalCounsel.email}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink-900 hover:border-brand-300 transition-colors"
                  >
                    <Icons.mail className="w-4.5 h-4.5 text-brand-600" />
                    {site.email}
                  </a>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-ink-500">
                  Email is the only way to reach the legal desk. Anything about an order, a file or a price is
                  faster through support, on {site.email}, the phone or WhatsApp.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
