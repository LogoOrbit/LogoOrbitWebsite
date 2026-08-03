import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import LinkGrid from '../../components/LinkGrid'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { team, desks } from '../../lib/team'
import { site } from '../../lib/site'
import { breadcrumb, collectionPageSchema, itemListSchema, absolute, ORG_ID } from '../../lib/seo'

const description =
  'The named people at LogoOrbit: who quotes brand and print work, who quotes websites, apps and video, and who answers the legal questions. Each with a page of their own.'

export default function TeamHub() {
  const jsonLd = {
    '@graph': [
      collectionPageSchema({ path: '/team', name: 'The people at LogoOrbit', description }),
      itemListSchema({
        path: '/team',
        name: 'LogoOrbit team',
        items: team.map((p) => ({ name: p.name, href: `/team/${p.slug}` })),
      }),
      ...team.map((person) => ({
        '@type': 'Person',
        '@id': `${absolute(`/team/${person.slug}`)}#person`,
        name: person.name,
        jobTitle: person.role,
        email: person.email,
        url: absolute(`/team/${person.slug}`),
        worksFor: { '@id': ORG_ID },
      })),
      breadcrumb([{ name: 'Team', href: '/team' }]),
    ],
  }

  return (
    <Layout title="Our Team" description={description} path="/team" jsonLd={jsonLd}>
      <PageHero
        eyebrow="The team"
        breadcrumb="Team"
        title="People with names,"
        highlight="not a ticket queue"
        intro="Three people here are published by name because you are put through to them directly. Everyone else works as a desk, and we would rather say that plainly than invent an org chart."
      />

      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Named contacts</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-ink-900">
              The three people you can write to directly
            </h2>
            <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-ink-500">
              Each has a page setting out what they decide, what they will ask you, and how long they take to come
              back. Read it before you write and the first reply will be a useful one.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {team.map((person, i) => {
              const Icon = Icons[person.icon] || Icons.team
              return (
                <Reveal key={person.slug} delay={i * 80} className="h-full">
                  <Link
                    href={`/team/${person.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl"
                  >
                    <span className="flex items-center gap-3.5">
                      <span
                        className="grid place-items-center w-14 h-14 rounded-2xl text-white font-bold text-lg shadow-lg"
                        style={{ backgroundColor: person.accent }}
                      >
                        {person.initials}
                      </span>
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-50 text-brand-600">
                        <Icon className="w-5 h-5" />
                      </span>
                    </span>

                    <h3 className="mt-5 text-lg font-bold text-ink-900">{person.name}</h3>
                    <p className="mt-1 text-[15px] font-semibold text-brand-600">{person.role}</p>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-500">{person.tagline}</p>

                    <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-ink-900 transition-colors group-hover:text-brand-600">
                      Read the full profile
                      <Icons.arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">The studio</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-ink-900">
              The desks behind the work
            </h2>
            <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-ink-500">
              These are teams rather than single contacts, so we list them as teams. A named designer is still
              assigned to your job the moment it starts, and you deal with the same one until it is delivered.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {desks.map((desk, i) => {
              const Icon = Icons[desk.icon] || Icons.team
              return (
                <Reveal key={desk.id} delay={i * 70} className="h-full">
                  <Link
                    href={desk.href}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
                  >
                    <span className="grid place-items-center w-11 h-11 rounded-2xl bg-brand-50 text-brand-600">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="mt-4 text-[17px] font-bold text-ink-900">{desk.name}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">{desk.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600">
                      See the work
                      <Icons.arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={140} className="mt-8">
            <p className="text-[15px] leading-relaxed text-ink-500">
              Work already in progress goes to{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand-600 underline underline-offset-2">
                {site.email}
              </a>
              , which everybody on the support desk can see. {site.hours}.
            </p>
          </Reveal>
        </div>
      </section>

      <LinkGrid
        eyebrow="Elsewhere"
        title="More about how we work"
        items={[
          { name: 'About LogoOrbit', href: '/about' },
          { name: 'Client reviews', href: '/reviews' },
          { name: 'Legal and compliance', href: '/legal' },
          { name: 'Frequently asked questions', href: '/faqs' },
          { name: 'Guides and resources', href: '/guides' },
          { name: 'From the studio', href: '/blog' },
        ]}
        compact
      />

      <CTA />
    </Layout>
  )
}
