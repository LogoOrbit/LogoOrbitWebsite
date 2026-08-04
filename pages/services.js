import Link from 'next/link'
import Layout from '../components/Layout'
import BrandProtectionBand from '../components/BrandProtectionBand'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import Services from '../components/Services'
import VideoServices from '../components/VideoServices'
import Process from '../components/Process'
import Guarantees from '../components/Guarantees'
import Reveal from '../components/Reveal'
import LinkGrid from '../components/LinkGrid'
import CatalogueGrid from '../components/CatalogueGrid'
import CTA from '../components/CTA'
import { Icons } from '../components/Icons'
import { capabilityArt, toneVars } from '../components/Illustrations'
import { serviceNav, services } from '../lib/site'
import { serviceGroups, catalogServices, groupTone } from '../lib/catalog'
import { industryPages } from '../lib/industries'
import { breadcrumb, collectionPageSchema, itemListSchema } from '../lib/seo'

/**
 * The six disciplines, as illustrated cards.
 *
 * They were six identical text boxes, which told a reader nothing until they
 * had read all six. Each one now carries its own colour, its own drawn scene
 * and the three things it actually hands over, so the row can be scanned by
 * picture and by deliverable before a paragraph of it is read.
 */
const capabilities = [
  {
    title: 'Brand identity systems',
    body: 'Logo families, color, typography, imagery, icons and practical guidelines that keep every touchpoint consistent.',
    href: '/logo-design',
    tone: 'blue',
    art: 'identity',
    deliverables: ['Logo family', 'Colour and type', 'Brand guidelines'],
  },
  {
    title: 'UI and UX design',
    body: 'User flows, wireframes, accessible interface design, responsive prototypes and design systems for websites and applications.',
    href: '/website-design',
    tone: 'violet',
    art: 'interface',
    deliverables: ['Wireframes', 'Prototypes', 'Design system'],
  },
  {
    title: 'Packaging design',
    body: 'Dieline-ready packaging, labels, product variants, retail hierarchy and ecommerce presentation built for production.',
    href: '/contact',
    tone: 'emerald',
    art: 'packaging',
    deliverables: ['Print-ready dielines', 'Labels', 'Retail and ecommerce'],
  },
  {
    title: 'Print and sales collateral',
    body: 'Business cards, stationery, brochures, presentations, signage and campaign materials prepared for real vendors.',
    href: '/contact',
    tone: 'cyan',
    art: 'collateral',
    deliverables: ['Stationery', 'Brochures', 'Signage'],
  },
  {
    title: 'Motion graphics',
    body: 'Logo animation, explainers, social motion, title sequences, transitions, editing and sound for branded video.',
    href: '/animation',
    tone: 'orange',
    art: 'motion',
    deliverables: ['Logo animation', 'Explainers', 'Edit and sound'],
  },
  {
    title: 'Digital marketing design',
    body: 'Campaign creative, social systems, display assets, landing-page design and marketplace content built around one identity.',
    href: '/amazon-marketing',
    tone: 'amber',
    art: 'campaign',
    deliverables: ['Ad creative', 'Social systems', 'Landing pages'],
  },
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
  'Every design service under one roof: logos and brand identity, websites, UI/UX, packaging, print, social and ad creative, motion, illustration and presentations.'

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
      <section className="relative overflow-hidden py-16 sm:py-20 bg-slate-50">
        {/* Two soft washes of brand colour, so the panel behind the cards is
            not a flat grey slab on either theme. */}
        <span aria-hidden="true" className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
        <span aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orbit-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Creative capabilities</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-ink-900">The disciplines behind a complete brand</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">Use them individually or connect them into one system. Scope, deliverables, ownership and production requirements are agreed before work begins.</p>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((capability, index) => {
              const Art = capabilityArt[capability.art]
              return (
                <Reveal key={capability.title} delay={index * 60} className="h-full">
                  <Link
                    href={capability.href}
                    className="group card-lift relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 sm:p-7"
                    style={toneVars(capability.tone)}
                  >
                    <span className="accent-rule absolute inset-x-0 top-0 h-1" aria-hidden="true" />
                    {/* The number, kept as a watermark in the empty corner
                        beside the link: it orders the row without competing
                        with the heading. */}
                    <span
                      className="accent-text pointer-events-none absolute bottom-2 right-4 text-[72px] font-black leading-none tabular-nums opacity-[0.13]"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="relative flex items-center gap-4">
                      <span className="accent-band accent-ring relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl">
                        <span className="accent-dots absolute inset-0 opacity-60" aria-hidden="true" />
                        <Art className="relative h-14 w-14 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                      </span>
                      <h3 className="text-xl font-bold leading-tight text-ink-900">{capability.title}</h3>
                    </div>

                    <p className="mt-4 text-[15px] leading-relaxed text-ink-500">{capability.body}</p>

                    {/* What actually lands in the client's hands. */}
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {capability.deliverables.map((item) => (
                        <li key={item} className="accent-chip rounded-full px-3 py-1 text-[12.5px] font-semibold">
                          {item}
                        </li>
                      ))}
                    </ul>

                    <span className="accent-text mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-bold">
                      Discuss the work
                      <Icons.arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
      <VideoServices />

      {/* The full catalogue, grouped by discipline. */}
      <section className="relative isolate overflow-hidden pt-14 sm:pt-20 bg-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-32 -z-10 h-72 w-72 rounded-full bg-orbit-200/40 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-600">
              <Icons.spark className="h-4 w-4" />
              The full catalogue, {catalogServices.length} services
            </span>
            <h2 className="mt-4 text-[2rem] sm:text-5xl font-bold leading-[1.1] tracking-tight text-ink-900">
              Every specific thing we design
            </h2>
            <span className="mt-4 block h-1.5 w-20 rounded-full bg-gradient-to-r from-action-500 to-orbit-400" aria-hidden="true" />
            <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">
              The six above are how most projects start. This is everything underneath them, from a woven clothing
              label to a design system, each with its own page explaining what is included and what it costs.
            </p>
          </Reveal>
        </div>
      </section>

      {groups.map((group, i) => (
        <CatalogueGrid
          key={group.id}
          id={group.id}
          eyebrow={group.name}
          title={group.blurb}
          items={group.items}
          tone={groupTone[group.id]}
          surface={i % 2 === 0 ? 'light' : 'muted'}
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
      <BrandProtectionBand />
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
          icon: s.icon,
        })),
    }))
    .filter((g) => g.items.length > 0)

  const allItems = [
    ...services.map((s) => ({ name: s.name, href: s.href })),
    ...catalogServices.map((s) => ({ name: s.name, href: `/services/${s.slug}` })),
  ]

  return { props: { groups, allItems } }
}
