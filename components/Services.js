import Link from 'next/link'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons, serviceIcon } from './Icons'
import { services } from '../lib/site'

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="What we do"
          title="One team for every"
          highlight="digital asset you need"
          body="Logos are where most clients start — but the same in-house team can carry your brand all the way to a live website, an animated intro and a selling Amazon listing."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = serviceIcon[service.id]
            return (
              <Reveal key={service.id} delay={i * 70}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-900/10">
                  <span
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-brand-100 to-orbit-400/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <span className="relative grid place-items-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="w-7 h-7" />
                  </span>

                  <h3 className="mt-5 text-xl font-bold text-ink-900">{service.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-600">{service.tagline}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{service.description}</p>

                  <ul className="mt-5 space-y-2">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-ink-700">
                        <Icons.check className="w-4 h-4 shrink-0 text-emerald-500" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 group-hover:text-brand-600 transition-colors"
                  >
                    Explore {service.name}
                    <Icons.arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
