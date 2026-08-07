import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import ArticleBody from '../../components/ArticleBody'
import FaqAccordion from '../../components/FaqAccordion'
import LinkGrid from '../../components/LinkGrid'
import BillingEntityRelation from '../../components/BillingEntityRelation'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { team, teamBySlug } from '../../lib/team'
import { site, billingEntity } from '../../lib/site'
import { breadcrumb, faqSchema, absolute, ORG_ID } from '../../lib/seo'

export default function TeamMemberPage({ person, colleagues }) {
  const path = `/team/${person.slug}`
  const Icon = Icons[person.icon] || Icons.team
  /* "Write to Brock" reads correctly off the first word of a name; "Write to
     Professor" does not. Anyone carrying a title supplies their own short
     form rather than having one guessed from a space. */
  const shortName = person.shortName || person.name.split(' ')[0]

  const jsonLd = {
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${absolute(path)}#person`,
        name: person.name,
        jobTitle: person.role,
        description: person.summary,
        email: person.email,
        url: absolute(path),
        worksFor: { '@id': ORG_ID },
        knowsAbout: person.responsibilities,
        ...(person.photo ? { image: absolute(person.photo) } : {}),
        ...(person.credentials ? { honorificSuffix: person.credentials } : {}),
        ...(person.bar ? { memberOf: { '@type': 'Organization', name: person.bar } } : {}),
        ...(person.slug === billingEntity.officerSlug
          ? {
              affiliation: {
                '@type': 'Organization',
                name: billingEntity.name,
                url: billingEntity.site,
                address: billingEntity.address,
              },
            }
          : {}),
      },
      {
        '@type': 'ProfilePage',
        '@id': `${absolute(path)}#profile`,
        name: `${person.name} - ${person.role}`,
        url: absolute(path),
        mainEntity: { '@id': `${absolute(path)}#person` },
      },
      breadcrumb([
        { name: 'Team', href: '/team' },
        { name: person.name, href: path },
      ]),
      faqSchema(person.faqs, path),
    ].filter(Boolean),
  }

  return (
    <Layout title={person.metaTitle} description={person.metaDescription} path={path} jsonLd={jsonLd} ogType="profile">
      <PageHero
        eyebrow={person.role}
        trail={[
          { name: 'Team', href: '/team' },
          { name: person.name, href: path },
        ]}
        title={person.name}
        intro={person.tagline}
      >
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <a href={`mailto:${person.email}?subject=Project%20enquiry`} className="group btn-action px-7 py-4">
            <Icons.mail className="w-5 h-5" />
            {person.email}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20"
          >
            Other ways to reach us
          </Link>
        </div>
      </PageHero>

      {/* The facts somebody wants before writing to a stranger: what this
          person decides, how fast they answer, and when they are there. */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-ink-900/5">
              <div
                className={`grid gap-7 p-6 sm:p-8 ${
                  person.photo ? 'lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10' : 'sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6'
                }`}
              >
                {person.photo ? (
                  /* A real photograph is the single most convincing thing on a
                     page about a real person, so it is given the width of a
                     column rather than shrunk into the slot the initials tile
                     used to occupy. 4:5 because that is a portrait's shape. */
                  <div className="mx-auto w-full max-w-[300px] lg:mx-0">
                    <Image
                      src={person.photo}
                      alt={person.photoAlt || person.name}
                      width={600}
                      height={750}
                      priority
                      sizes="(min-width: 1024px) 300px, 300px"
                      className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-xl ring-1 ring-slate-200"
                    />
                    <div className="mt-4 flex items-center gap-3">
                      <span className="grid place-items-center w-11 h-11 shrink-0 rounded-2xl bg-brand-50 text-brand-600">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-bold leading-tight text-ink-900">
                          {person.name}
                          {person.credentials ? `, ${person.credentials}` : ''}
                        </span>
                        <span className="mt-0.5 block text-[13.5px] font-semibold leading-tight text-brand-600">
                          {person.role}
                        </span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex sm:flex-col items-center gap-4">
                    <span
                      className="grid place-items-center w-20 h-20 rounded-3xl text-white text-2xl font-bold shadow-xl"
                      style={{ backgroundColor: person.accent }}
                    >
                      {person.initials}
                    </span>
                    <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600">
                      <Icon className="w-6 h-6" />
                    </span>
                  </div>
                )}

                <div>
                  {person.badges && (
                    <ul className="mb-5 flex flex-wrap gap-2">
                      {person.badges.map((badge) => (
                        <li
                          key={badge}
                          className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[12.5px] font-semibold text-brand-700"
                        >
                          <Icons.check className="w-3.5 h-3.5" />
                          {badge}
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="text-[16px] sm:text-[17px] leading-[1.75] text-ink-700">{person.summary}</p>

                  <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Desk</dt>
                      <dd className="mt-1.5 text-[15px] font-bold text-ink-900">{person.desk}</dd>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Replies in</dt>
                      <dd className="mt-1.5 text-[15px] font-bold text-ink-900">{person.respondsIn}</dd>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Available</dt>
                      <dd className="mt-1.5 text-[15px] font-bold text-ink-900">{person.coverage}</dd>
                    </div>
                  </dl>

                  {person.bar && (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700">
                      <Icons.badge className="w-4 h-4" />
                      Admitted, {person.bar}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-900">What lands on this desk</h2>
            <ul className="mt-5 space-y-3">
              {person.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] sm:text-base leading-[1.7] text-ink-700">
                  <Icons.check className="mt-1 w-4.5 h-4.5 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-500">{person.handoff}</p>
          </Reveal>
        </div>
      </section>

      <article className="pb-12 sm:pb-16 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <ArticleBody sections={person.sections} contents={person.sections.map((s) => s.h).filter(Boolean)} />

          <Reveal className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-900">Write to {shortName}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              Two or three lines about the business is enough to start. {person.respondsIn}.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3.5">
              <a href={`mailto:${person.email}?subject=Project%20enquiry`} className="btn-action px-7 py-3.5">
                <Icons.mail className="w-4.5 h-4.5" />
                {person.email}
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                <Icons.phone className="w-4.5 h-4.5" />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </article>

      {person.slug === billingEntity.officerSlug && <BillingEntityRelation tone="light" />}

      <FaqAccordion items={person.faqs} heading={`Questions about ${shortName}’s desk`} tone="muted" />

      <LinkGrid eyebrow="Related" title="What this desk covers" items={person.related} tone="light" columns={4} compact />

      <LinkGrid eyebrow="The team" title="The other people you can write to" items={colleagues} tone="muted" columns={2} />

      <CTA />
    </Layout>
  )
}

export function getStaticPaths() {
  return { paths: team.map((p) => ({ params: { slug: p.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  const person = teamBySlug[params.slug]

  return {
    props: {
      person,
      colleagues: team
        .filter((p) => p.slug !== person.slug)
        .map((p) => ({ name: `${p.name}, ${p.role}`, href: `/team/${p.slug}`, description: p.tagline })),
    },
  }
}
