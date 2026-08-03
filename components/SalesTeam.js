import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'
import SalesAvatar from './SalesAvatar'
import { salesTeam, site } from '../lib/site'
import { team } from '../lib/team'

/** Matches a card to its profile page by email, which is the stable key. */
const profileFor = (email) => team.find((person) => person.email === email)

/**
 * The sales desk, given the same treatment as the legal desk: a face, a name,
 * what that person covers, the desks under them and one address that reaches
 * them directly.
 *
 * Two people rather than a shared inbox, and they do not sell the same thing,
 * so each gets their own card, their own portrait and their own colour. A
 * visitor should be able to work out which of the two is theirs without
 * reading both profiles.
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
            Thinking about a project and want a price before you commit? Write to whichever of them covers your kind
            of work. You get a named person, not a ticket, and normally an answer the same working day.
          </p>
        </Reveal>

        <div className="mt-12 space-y-6">
          {salesTeam.map((person, i) => (
            <Reveal key={person.email} delay={i * 90}>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-ink-900/5">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_1.55fr]">
                  {/* Portrait side */}
                  <div className="relative overflow-hidden mesh-bg px-7 py-10 text-center text-white sm:px-10">
                    <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
                    <div
                      className={`absolute -right-16 -top-20 w-64 h-64 rounded-full blur-3xl animate-drift ${person.theme.blob}`}
                      aria-hidden="true"
                    />

                    <div className="relative">
                      <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]">
                        <Icons.team className="w-4 h-4" />
                        Sales desk
                      </span>

                      <SalesAvatar
                        variant={person.avatar}
                        id={`${person.avatar}-profile`}
                        className="mx-auto mt-7 w-44 h-44 sm:w-52 sm:h-52 drop-shadow-2xl"
                      />

                      <h3 className="mt-6 text-2xl font-bold text-white">{person.name}</h3>
                      <p className={`mt-1 text-[15px] font-semibold ${person.theme.textLight}`}>{person.role}</p>

                      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] text-white/85">
                        <Icons.spark className="w-4 h-4 text-flare-300" />
                        {person.focus}
                      </p>
                    </div>
                  </div>

                  {/* Detail side */}
                  <div className="px-6 py-9 sm:px-10 sm:py-11">
                    <h3 className="text-2xl sm:text-[1.75rem] font-bold leading-tight text-ink-900">
                      {person.headline}
                    </h3>
                    <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-ink-500">{person.blurb}</p>

                    {/* Which desks sit under this person */}
                    <ul className="mt-7 space-y-2.5">
                      {[person.department, ...person.teams].map((line, index) => (
                        <li key={line} className="flex items-center gap-3">
                          <span
                            className={`grid shrink-0 place-items-center w-8 h-8 rounded-xl ${
                              index === 0 ? person.theme.chipSolid : person.theme.chip
                            }`}
                          >
                            {index === 0 ? (
                              <Icons.team className="w-4.5 h-4.5" />
                            ) : (
                              <Icons.layers className="w-4.5 h-4.5" />
                            )}
                          </span>
                          <span className="text-[15px] font-medium text-ink-700">{line}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <a
                        href={`mailto:${person.email}?subject=Project%20enquiry`}
                        className={`flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 transition-colors ${person.theme.hover}`}
                      >
                        <span
                          className={`grid shrink-0 place-items-center w-10 h-10 rounded-xl ${person.theme.chip}`}
                        >
                          <Icons.mail className="w-5 h-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-300">
                            Write to {person.name.split(' ')[0]} directly
                          </span>
                          <span className="block truncate font-semibold text-ink-900">{person.email}</span>
                        </span>
                      </a>
                    </div>

                    {/* Each rep also has a page of their own: what lands on
                        the desk, what they will ask, how fast they answer. */}
                    {profileFor(person.email) && (
                      <Link
                        href={`/team/${profileFor(person.email).slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600 hover:text-brand-700"
                      >
                        Read {person.name.split(' ')[0]}’s full profile
                        <Icons.arrow className="w-4 h-4" />
                      </Link>
                    )}

                    <p className="mt-4 text-[13px] leading-relaxed text-ink-500">
                      Quotes are fixed, not estimates that move later. If the job is closer to the other desk,
                      whichever of them you wrote to will pass it across rather than send you back to the form.
                    </p>
                  </div>
                </div>

                {/* What this person actually handles */}
                <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-9 sm:px-10">
                  <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-ink-500">
                    Bring these to {person.name.split(' ')[0]}
                  </h4>
                  <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                    {person.handles.map((item) => (
                      <div key={item.title} className="flex gap-3">
                        <span className="mt-0.5 grid shrink-0 place-items-center w-6 h-6 rounded-full bg-trust-50 text-trust-600">
                          <Icons.check className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="font-semibold text-ink-900">{item.title}</p>
                          <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
