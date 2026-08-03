import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import Services from '../components/Services'
import VideoServices from '../components/VideoServices'
import Process from '../components/Process'
import Guarantees from '../components/Guarantees'
import Reveal from '../components/Reveal'
import LinkGrid from '../components/LinkGrid'
import CTA from '../components/CTA'
import { Icons } from '../components/Icons'
import { serviceNav, services } from '../lib/site'
import { serviceGroups, catalogServices } from '../lib/catalog'
import { industryPages } from '../lib/industries'
import { breadcrumb, collectionPageSchema, itemListSchema } from '../lib/seo'

/**
 * The hub the Services menu points at.
 *
 * It carries two layers: the six headline services that have their own
 * top-level pages, and the full catalogue underneath them grouped by
 * discipline. Every catalogue page is one click from here, which is what stops
 * the deeper pages becoming orphans.
 */
const description =
  'Every design service under one roof: logos and brand identity, websites, UI/UX, packaging, print, social and ad creative, motion, illustration, presentations and ongoing design subscriptions.'

export default function ServicesPage({ groups, allItems }) {
  const jsonLd = {
    '@graph': [
      collectionPageSchema({ path: '/services', name: 'LogoOrbit services', description }),
      itemListSchema({ path: '/services', name: 'LogoOrbit services', items: allItems }),
      breadcrumb([{ name: 'Services', href: '/services' }]),
    ],
  }

  return (
    <Layout title="Our Services" description={description} path="/services" jsonLd={jsonLd}>
      <PageHero
        eyebrow="Services"
        breadcrumb="Services"
        title="Everything we make,"
        highlight="on one page"
        intro={`Six headline services and ${catalogServices.length} specialist ones underneath them, all handled by the same in-house team. Start with a logo, or hand us the whole brand, the website and the channel that goes with it.`}
      />

      <TrustBar />

      {/* A plain list of the pages under this one, for anyone who arrived
          knowing exactly what they came for. */}
      <section className="pt-12 sm:pt-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Jump straight to</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {serviceNav
                .filter((s) => s.href !== '/services')
                .map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[14px] font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    {s.label}
                    <Icons.arrow className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Services />
      <VideoServices />

      {/* The full catalogue, grouped by discipline. */}
      <section className="pt-14 sm:pt-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              The full catalogue
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
              Every specific thing we design
            </h2>
            <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">
              The six above are how most projects start. This is everything underneath them, from a woven clothing
              label to a design system, each with its own page explaining what is included and what it costs.
            </p>
          </Reveal>
        </div>
      </section>

      {groups.map((group, i) => (
        <LinkGrid
          key={group.id}
          id={group.id}
          eyebrow={group.name}
          title={group.blurb}
          items={group.items}
          tone={i % 2 === 0 ? 'light' : 'muted'}
        />
      ))}

      <LinkGrid
        eyebrow="By sector"
        title="Or start from your industry"
        body="Every sector page covers the constraints that actually shape the brief, and which of these services that industry buys most."
        items={industryPages.map((ind) => ({ name: ind.name, href: `/industries/${ind.slug}` }))}
        compact
        tone="light"
      />

      <Process />
      <Guarantees />
      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  const groups = serviceGroups
    .map((g) => ({
      ...g,
      items: catalogServices
        .filter((s) => s.group === g.id)
        .map((s) => ({
          name: s.name,
          href: `/services/${s.slug}`,
          description: s.metaDescription,
          meta: s.priceLabel,
        })),
    }))
    .filter((g) => g.items.length > 0)

  const allItems = [
    ...services.map((s) => ({ name: s.name, href: s.href })),
    ...catalogServices.map((s) => ({ name: s.name, href: `/services/${s.slug}` })),
  ]

  return { props: { groups, allItems } }
}
