import Reveal from './Reveal'
import { Icons } from './Icons'
import { salesTeam, site } from '../lib/site'

/**
 * The people who quote the work, named and reachable directly.
 *
 * A new enquiry usually starts with "what would this cost", and the fastest
 * answer comes from a person who can price it rather than from a shared
 * inbox. Once a job is running, support takes it back over, so both routes
 * are spelled out here to save anyone guessing which address to use.
 */
export default function SalesTeam({ compact = false }) {
  return (
    <section id="sales" className={`${compact ? 'py-14 sm:py-16' : 'py-16 sm:py-24'} bg-white`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="max-w-3xl">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            Talk to sales
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-[1.15] text-ink-900">
            Two people who can <span className="text-gradient">quote your job</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-500">
            Thinking about a project and want a price before you commit? Write to either of them directly. You get a
            named person, not a ticket, and normally an answer the same working day.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {salesTeam.map((person, i) => (
            <Reveal key={person.email} delay={i * 90}>
              <a
                href={`mailto:${person.email}?subject=Project%20enquiry`}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl"
              >
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600">
                  <Icons.team className="w-6 h-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{person.name}</h3>
                <p className="mt-1 text-[15px] font-semibold text-brand-600">{person.role}</p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-500">{person.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">
                  <Icons.mail className="w-4.5 h-4.5" />
                  {person.email}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180} className="mt-8">
          <p className="text-[15px] leading-relaxed text-ink-500">
            Already have a project running with us? Send it to{' '}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand-600 underline underline-offset-2">
              {site.email}
            </a>{' '}
            instead, that inbox is watched all day and everyone on the team can see it.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
