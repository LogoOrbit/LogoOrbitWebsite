import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'

const steps = [
  'Pick what the job is: a logo, a website, or video',
  'Answer a handful of plain questions in your own words',
  'A designer reads it and replies within one working day',
]

/**
 * The single clearest thing a visitor can do. It says outright that clicking
 * opens a form, because "get started" tells nobody what happens next.
 */
export default function BriefCTA({ tone = 'light' }) {
  const dark = tone === 'dark'

  return (
    <section className={`py-14 sm:py-20 ${dark ? 'bg-white' : 'bg-slate-50'}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl mesh-bg px-6 py-9 sm:px-10 sm:py-12 text-white">
            <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]">
                  <Icons.spark className="w-4 h-4 text-flare-300" />
                  Takes about 3 minutes
                </span>

                <h2 className="mt-4 text-2xl sm:text-4xl font-bold leading-tight text-white">
                  Tell us what you need. We will tell you what it costs.
                </h2>
                <p className="mt-3 text-[15px] sm:text-[17px] leading-relaxed text-white/75">
                  Clicking the button opens a short form. No design words in it, nothing to install, and no card
                  needed to send it.
                </p>

                <ul className="mt-6 grid gap-2.5">
                  {steps.map((s, i) => (
                    <li key={s} className="flex items-start gap-3 text-[15px] text-white/85">
                      <span className="grid place-items-center w-6 h-6 shrink-0 rounded-full bg-white/15 text-[12px] font-bold">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full shrink-0 lg:w-[19rem]">
                <Link href="/brief" className="btn-action w-full px-7 py-4 text-[17px]">
                  Fill in the quick form
                  <Icons.arrow className="w-5 h-5" />
                </Link>

                <p className="mt-3 text-center text-[13px] text-white/65">
                  Prefer to talk it through? Call us and we will fill it in with you.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
