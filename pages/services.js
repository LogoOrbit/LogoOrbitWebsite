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

const capabilities = [
  { title: 'Brand identity systems', body: 'Logo families, color, typography, imagery, icons and practical guidelines that keep every touchpoint consistent.', href: '/logo-design' },
  { title: 'UI and UX design', body: 'User flows, wireframes, accessible interface design, responsive prototypes and design systems for websites and applications.', href: '/website-design' },
  { title: 'Packaging design', body: 'Dieline-ready packaging, labels, product variants, retail hierarchy and ecommerce presentation built for production.', href: '/contact' },
  { title: 'Print and sales collateral', body: 'Business cards, stationery, brochures, presentations, signage and campaign materials prepared for real vendors.', href: '/contact' },
  { title: 'Motion graphics', body: 'Logo animation, explainers, social motion, title sequences, transitions, editing and sound for branded video.', href: '/animation' },
  { title: 'Digital marketing design', body: 'Campaign creative, social systems, display assets, landing-page design and marketplace content built around one identity.', href: '/amazon-marketing' },
]

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
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Creative capabilities</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-ink-900">The disciplines behind a complete brand</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">Use them individually or connect them into one system. Scope, deliverables, ownership and production requirements are agreed before work begins.</p>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((capability, index) => (
              <Reveal key={capability.title} delay={index * 60}>
                <Link href={capability.href} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl">
                  <span className="text-sm font-bold tracking-[0.18em] text-brand-600">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-xl font-bold text-ink-900">{capability.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-500">{capability.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-600">Discuss the work <Icons.arrow className="w-4 h-4" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
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
