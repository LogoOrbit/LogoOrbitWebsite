import Link from 'next/link'
import Layout from './Layout'
import PageHero from './PageHero'
import TrustBar from './TrustBar'
import Guarantees from './Guarantees'
import Reveal from './Reveal'
import PricingSection from './PricingSection'
import ProcessSteps from './ProcessSteps'
import { BigPackage } from './PriceCard'
import { Icons, serviceIcon } from './Icons'
import FaqAccordion from './FaqAccordion'
import LinkGrid from './LinkGrid'
import { site } from '../lib/site'
import { sectionById, bigPackageById } from '../lib/pricing'
import { breadcrumb, faqSchema, serviceSchema } from '../lib/seo'
import { resources } from '../lib/resources'

const resourceMap = {
  '/logo-design': ['logo-design-process', 'logo-file-formats', 'logo-design-cost'],
  '/website-design': ['website-design-brief', 'brand-identity-checklist', 'rebranding-checklist'],
  '/animation': ['brand-identity-checklist', 'logo-file-formats', 'logo-design-process'],
  '/mobile-application': ['website-design-brief', 'brand-identity-checklist', 'rebranding-checklist'],
  '/book-publications': ['packaging-design-checklist', 'brand-identity-checklist', 'logo-file-formats'],
  '/amazon-marketing': ['packaging-design-checklist', 'brand-identity-checklist', 'website-design-brief'],
}

export default function ServicePage({ page, related = [], industries = [], guides = [] }) {
  const Icon = serviceIcon[page.icon]
  const sections = (page.packages || []).map((id) => sectionById[id]).filter(Boolean)
  const bigPackages = (page.featureBig || []).map((id) => bigPackageById[id]).filter(Boolean)
  const relatedResources = (resourceMap[page.slug] || [])
    .map((slug) => resources.find((resource) => resource.slug === slug))
    .filter(Boolean)

  const jsonLd = {
    '@graph': [
      serviceSchema({
        path: page.slug,
        name: page.eyebrow,
        description: page.metaDescription,
        price: page.price,
        serviceType: page.eyebrow,
      }),
      breadcrumb([
        { name: 'Services', href: '/services' },
        { name: page.eyebrow, href: page.slug },
      ]),
      faqSchema(page.faqs, page.slug),
    ].filter(Boolean),
  }

  return (
    <Layout title={page.metaTitle} description={page.metaDescription} path={page.slug} jsonLd={jsonLd}>
      <PageHero
        eyebrow={page.eyebrow}
        trail={[
          { name: 'Services', href: '/services' },
          { name: page.eyebrow, href: page.slug },
        ]}
        title={page.title}
        highlight={page.highlight}
        intro={page.intro}
      />

      <TrustBar />

      {/* Highlights */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
            <Reveal>
              <span className="grid place-items-center w-16 h-16 rounded-2xl bg-brand-50 text-brand-600">
                <Icon className="w-8 h-8" />
              </span>
              <h2 className="mt-6 text-3xl sm:text-4xl font-bold leading-tight text-ink-900">
                What you get with <span className="text-gradient">{page.eyebrow}</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-500">
                Work with the same in-house team from first brief to final handover, no outsourcing, no
                account-manager relay, and full ownership of everything we produce.
              </p>

              <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {page.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[15px] text-ink-700">
                    <span className="mt-0.5 grid place-items-center w-5 h-5 shrink-0 rounded-full bg-trust-50 text-trust-600">
                      <Icons.check className="w-3.5 h-3.5" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="/contact"
                  className="btn-action px-7 py-3.5"
                >
                  Start a project
                  <Icons.arrow className="w-4.5 h-4.5" />
                </Link>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
                >
                  <Icons.phone className="w-4.5 h-4.5" />
                  {site.phone}
                </a>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {page.highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 80}>
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl">
                    <h3 className="text-lg font-bold text-ink-900">{h.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{h.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">How it works</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-ink-900">
              Four steps, start to finish
            </h2>
          </Reveal>

          <ProcessSteps />
        </div>
      </section>

      {/* Packages for this service */}
      {sections.map((section, i) => (
        <PricingSection key={section.id} section={section} tone={i % 2 === 0 ? 'light' : 'muted'} />
      ))}

      {bigPackages.length > 0 && (
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 space-y-8">
            {bigPackages.map((pkg) => (
              <Reveal key={pkg.id}>
                <BigPackage pkg={pkg} tone="dark" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Guarantees />

      <FaqAccordion items={page.faqs} heading={`${page.eyebrow} questions`} eyebrow="Before you order" tone="muted" />

      {related.length > 0 && (
        <LinkGrid
          eyebrow="Goes with this"
          title="The pieces clients usually add"
          body="One team covers all of it, so nothing has to be handed to a second supplier halfway through."
          items={related}
          tone="light"
        />
      )}

      {industries.length > 0 && (
        <LinkGrid
          eyebrow="By industry"
          title={`${page.eyebrow} by sector`}
          items={industries}
          compact
          tone="muted"
        />
      )}

      {guides.length > 0 && (
        <LinkGrid
          eyebrow="Read first"
          title="Guides worth reading before you commission this"
          items={guides}
          tone="light"
        />
      )}

      {relatedResources.length > 0 && (
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Practical resources</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-ink-900">Checklists for a stronger brief and handover</h2>
            </Reveal>
            <div className="mt-9 grid md:grid-cols-3 gap-5">
              {relatedResources.map((resource, index) => (
                <Reveal key={resource.slug} delay={index * 70}>
                  <Link href={`/resources/${resource.slug}`} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{resource.category}</span>
                    <h3 className="mt-3 text-lg font-bold text-ink-900">{resource.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-500">{resource.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-600">Read resource <Icons.arrow className="w-4 h-4" /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl mesh-bg px-8 py-12 sm:px-12 sm:py-14 text-center text-white">
              <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-bold leading-tight text-white">
                  Ready to get started?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
                  Book a free consultation and we&apos;ll come back with a plan, a timeline and a fixed price.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
                  <Link
                    href="/contact"
                    className="group btn-action px-7 py-4"
                  >
                    Get a Free Quote
                    <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    See all packages
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
