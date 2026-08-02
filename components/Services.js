import Link from 'next/link'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons } from './Icons'
import { serviceArt, toneVars } from './Illustrations'
import { services } from '../lib/site'

/**
 * One card per service.
 *
 * The old card was a white box with a small blue line icon, and six of them in
 * a row looked like six of the same thing. Each card now carries its own colour
 * and its own drawn scene, so the row can be understood from the pictures
 * before a word of it is read, and the words underneath are laid out in the
 * order someone actually needs them: what it is, the promise in one line, the
 * detail, what you get, then the way in.
 */
/**
 * A colour way per service, plus the short name the button uses. "Video,
 * Animation & YouTube" wrapped its button onto two lines and broke the row, so
 * the button gets a name that fits on one.
 */
const card = {
  logo: { tone: 'blue', short: 'logo design' },
  website: { tone: 'violet', short: 'website design' },
  animation: { tone: 'orange', short: 'video and animation' },
  mobile: { tone: 'emerald', short: 'mobile apps' },
  book: { tone: 'pink', short: 'book publication' },
  amazon: { tone: 'amber', short: 'Amazon marketing' },
}

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title="One team for every"
          highlight="digital asset you need"
          body="Logos are where most clients start, but the same in-house team can carry your brand all the way to a live website, an animated intro and a selling Amazon listing."
        />

        <div className="mt-12 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, i) => {
            const Art = serviceArt[service.id]
            const look = card[service.id]
            return (
              <Reveal key={service.id} delay={i * 70} className="h-full">
                <article
                  className="group card-lift relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
                  style={toneVars(look.tone)}
                >
                  {/* The picture band. Big enough to be understood at a glance
                      on a phone without pushing the words off the screen. */}
                  <div className="relative h-36 sm:h-40 shrink-0 accent-band">
                    <span className="absolute inset-0 accent-dots opacity-70" aria-hidden="true" />
                    <span className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full accent-chip text-[13px] font-bold tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Art className="absolute left-1/2 top-1/2 h-24 w-24 sm:h-28 sm:w-28 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                  </div>

                  <span className="h-1 w-full accent-rule" aria-hidden="true" />

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-[21px] sm:text-[22px] font-bold leading-tight text-ink-900">
                      {service.name}
                    </h3>

                    <p className="mt-2.5 w-fit rounded-full accent-chip px-3 py-1.5 text-[13px] font-semibold leading-snug">
                      {service.tagline}
                    </p>

                    <p className="mt-3.5 text-[15px] leading-relaxed text-ink-500">{service.description}</p>

                    <ul className="mt-5 space-y-2.5">
                      {service.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[15px] font-medium text-ink-700">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-trust-50 text-trust-600">
                            <Icons.check className="h-3.5 w-3.5" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Pushed to the bottom so the buttons line up across a row
                        of cards whose descriptions are different lengths. */}
                    <div className="mt-auto pt-6">
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 rounded-full accent-chip px-5 py-2.5 text-[14px] font-bold transition-transform duration-200 group-hover:translate-x-1"
                      >
                        See {look.short}
                        <Icons.arrow className="h-4 w-4 shrink-0" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
