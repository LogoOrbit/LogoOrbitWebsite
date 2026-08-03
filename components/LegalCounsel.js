import Reveal from './Reveal'
import { Icons } from './Icons'
import LawyerAvatar from './LawyerAvatar'
import { legalCounsel, site } from '../lib/site'

/**
 * The legal desk, put on the page as a person rather than as an address.
 *
 * Most sites bury this in a footer line and a generic inbox, so nobody is
 * sure whether anyone is on the other end. Showing the counsel, what he is
 * admitted to practise and which teams sit under him answers the only
 * question a worried client actually has: is there a real lawyer here.
 *
 * There is one route to him and it is email. The WhatsApp number belongs to
 * the support team, so it is deliberately not offered here.
 */
export default function LegalCounsel({ compact = false }) {
  return (
    <section id="legal-counsel" className={`${compact ? 'py-14 sm:py-16' : 'py-16 sm:py-24'} bg-slate-50`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-ink-900/5">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_1.55fr]">
              {/* Portrait side */}
              <div className="relative overflow-hidden mesh-bg px-7 py-10 text-center text-white sm:px-10">
                <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
                <div
                  className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-orbit-500/25 blur-3xl animate-drift"
                  aria-hidden="true"
                />

                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]">
                    <Icons.scales className="w-4 h-4" />
                    Legal desk
                  </span>

                  <LawyerAvatar className="mx-auto mt-7 w-44 h-44 sm:w-52 sm:h-52 drop-shadow-2xl" />

                  <h3 className="mt-6 text-2xl font-bold text-white">{legalCounsel.name}</h3>
                  <p className="mt-1 text-[15px] font-semibold text-orbit-300">{legalCounsel.role}</p>

                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] text-white/85">
                    <Icons.badge className="w-4 h-4 text-flare-300" />
                    Admitted, {legalCounsel.bar}
                  </p>
                </div>
              </div>

              {/* Detail side */}
              <div className="px-6 py-9 sm:px-10 sm:py-11">
                <h2 className="text-2xl sm:text-[2rem] font-bold leading-tight text-ink-900">
                  A named lawyer, not a support inbox
                </h2>
                <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-ink-500">{legalCounsel.blurb}</p>

                {/* The reporting line, drawn as a stack so it is obvious at a
                    glance which desks sit under him. */}
                <ul className="mt-7 space-y-2.5">
                  {[legalCounsel.department, ...legalCounsel.teams].map((line, i) => (
                    <li key={line} className="flex items-center gap-3">
                      <span
                        className={`grid shrink-0 place-items-center w-8 h-8 rounded-xl ${
                          i === 0 ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600'
                        }`}
                      >
                        {i === 0 ? <Icons.shield className="w-4.5 h-4.5" /> : <Icons.layers className="w-4.5 h-4.5" />}
                      </span>
                      <span className="text-[15px] font-medium text-ink-700">{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href={`mailto:${legalCounsel.email}?subject=Legal%20enquiry`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 transition-colors hover:border-brand-300"
                  >
                    <span className="grid shrink-0 place-items-center w-10 h-10 rounded-xl bg-brand-50 text-brand-600">
                      <Icons.mail className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-300">
                        The only way to reach Greg
                      </span>
                      <span className="block truncate font-semibold text-ink-900">{legalCounsel.email}</span>
                    </span>
                  </a>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-ink-500">
                  Email is the only route to the legal desk, so that every question arrives in writing with a record
                  attached. Messages are answered in the order they arrive, normally within one working day. Our
                  phone and WhatsApp lines are support lines, they do not reach Greg, and design or order questions
                  are faster through {site.email}, that inbox is watched all day.
                </p>
              </div>
            </div>

            {/* What the desk actually handles */}
            <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-9 sm:px-10">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-ink-500">
                Bring these to Greg
              </h3>
              <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {legalCounsel.handles.map((item) => (
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
      </div>
    </section>
  )
}
