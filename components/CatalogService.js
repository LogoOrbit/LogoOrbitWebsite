import Link from 'next/link'
import Layout from './Layout'
import PageHero from './PageHero'
import TrustBar from './TrustBar'
import Guarantees from './Guarantees'
import Reveal from './Reveal'
import ProcessSteps from './ProcessSteps'
import FaqAccordion from './FaqAccordion'
import LinkGrid from './LinkGrid'
import { Icons } from './Icons'
import { site } from '../lib/site'
import { serviceGroups, serviceBySlug } from '../lib/catalog'
import { industryPages } from '../lib/industries'
import { breadcrumb, faqSchema, serviceSchema } from '../lib/seo'

/** The four promises every package carries, said once here rather than per service. */
const promises = [
  { icon: Icons.spark, title: 'Drawn for you', body: 'Original work every time. Nothing templated, nothing resold to anyone else.' },
  { icon: Icons.clock, title: 'Fast turnaround', body: 'First work back within 24 to 48 hours on most briefs, sooner if you have a deadline.' },
  { icon: Icons.shield, title: 'Revisions until right', body: 'No counter running in the background. We keep going until you are happy with it.' },
  { icon: Icons.check, title: 'You own everything', body: 'Full copyright transferred in writing, with every source file, on delivery.' },
]

export default function CatalogService({ service, related, guides = [] }) {
  const group = serviceGroups.find((g) => g.id === service.group)
  const path = `/services/${service.slug}`

  const industryLinks = industryPages
    .filter((i) => i.services.includes(service.slug))
    .slice(0, 6)
    .map((i) => ({ name: i.name, href: `/industries/${i.slug}` }))

  const jsonLd = {
    '@graph': [
      serviceSchema({
        path,
        name: service.name,
        description: service.metaDescription,
        price: service.price,
        serviceType: service.name,
        category: group?.name,
      }),
      breadcrumb([
        { name: 'Services', href: '/services' },
        { name: group?.name || 'Services', href: `/services#${service.group}` },
        { name: service.name, href: path },
      ]),
      faqSchema(service.faqs, path),
    ].filter(Boolean),
  }

  return (
    <Layout title={service.metaTitle} description={service.metaDescription} path={path} jsonLd={jsonLd}>
      <PageHero
        eyebrow={service.name}
        trail={[
          { name: 'Services', href: '/services' },
          { name: service.name, href: path },
        ]}
        title={service.h1}
        highlight={service.highlight}
        intro={service.intro}
      >
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/contact" className="group btn-action px-7 py-4">
            Get a fixed quote
            <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Icons.phone className="w-5 h-5" />
            {site.phone}
          </a>
        </div>
        <p className="mt-5 text-[14px] text-white/60">
          {service.priceLabel} · free consultation · full copyright included
        </p>
      </PageHero>

      <TrustBar />

      {/* What you get */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
                {group?.name}
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
                What {service.name.toLowerCase()} includes
              </h2>
              <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">{service.whoFor}</p>

              <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[15px] text-ink-700">
                    <span className="mt-0.5 grid place-items-center w-5 h-5 shrink-0 rounded-full bg-trust-50 text-trust-600">
                      <Icons.check className="w-3.5 h-3.5" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
                <Link href="/brief" className="btn-action px-7 py-3.5">
                  Send us a brief
                  <Icons.arrow className="w-4.5 h-4.5" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
                >
                  See all pricing
                </Link>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {promises.map((p, i) => {
                const Icon = p.icon
                return (
                  <Reveal key={p.title} delay={i * 70}>
                    <div className="h-full rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl">
                      <span className="grid place-items-center w-11 h-11 rounded-2xl bg-brand-50 text-brand-600">
                        <Icon className="w-5.5 h-5.5" />
                      </span>
                      <h3 className="mt-4 text-[17px] font-bold text-ink-900">{p.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{p.body}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">How it works</span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
              Four steps, start to finish
            </h2>
          </Reveal>
          <ProcessSteps />
        </div>
      </section>

      <Guarantees />

      <FaqAccordion
        items={service.faqs}
        heading={`${service.name} questions`}
        eyebrow="Before you order"
        tone="muted"
      />

      {industryLinks.length > 0 && (
        <LinkGrid
          eyebrow="By industry"
          title={`Who buys ${service.name.toLowerCase()}`}
          items={industryLinks}
          compact
          tone="light"
        />
      )}

      {related?.length > 0 && (
        <LinkGrid
          eyebrow="Related services"
          title="Often bought alongside this"
          body="Buying two or three together is cheaper than ordering them separately, and the work stays consistent because it never leaves the same team."
          items={related.map((slug) => {
            const s = serviceBySlug[slug]
            return s && { name: s.name, href: `/services/${s.slug}`, description: s.metaDescription, meta: s.priceLabel }
          }).filter(Boolean)}
          tone="muted"
        />
      )}

      {guides.length > 0 && (
        <LinkGrid
          eyebrow="Read first"
          title="Guides worth reading before you buy"
          items={guides.map((g) => ({ name: g.title, href: `/guides/${g.slug}`, description: g.excerpt }))}
          tone="light"
        />
      )}

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl mesh-bg px-6 py-11 sm:px-12 sm:py-14 text-center text-white">
              <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-2xl sm:text-4xl font-bold leading-tight text-white">
                  Ready to start your {service.name.toLowerCase()} project?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[15px] sm:text-lg text-white/75">
                  Tell us about the business in a sentence or two. We come back with a plan, a timeline and one
                  fixed price, usually within a business day.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
                  <Link href="/contact" className="group btn-action px-7 py-4">
                    Get a free quote
                    <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    See our work
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
