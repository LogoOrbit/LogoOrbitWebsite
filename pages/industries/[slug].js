import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TrustBar from '../../components/TrustBar'
import Portfolio from '../../components/Portfolio'
import Guarantees from '../../components/Guarantees'
import Testimonials from '../../components/Testimonials'
import Reveal from '../../components/Reveal'
import FaqAccordion from '../../components/FaqAccordion'
import LinkGrid from '../../components/LinkGrid'
import { Icons } from '../../components/Icons'
import { site } from '../../lib/site'
import { industryPages, industryBySlug } from '../../lib/industries'
import { serviceBySlug } from '../../lib/catalog'
import { guides } from '../../lib/guides'
import { breadcrumb, faqSchema, serviceSchema, collectionPageSchema } from '../../lib/seo'

export default function IndustryPage({ industry, services, relatedGuides, siblings }) {
  const path = `/industries/${industry.slug}`

  const jsonLd = {
    '@graph': [
      collectionPageSchema({
        path,
        name: `${industry.name} design and branding`,
        description: industry.metaDescription,
      }),
      serviceSchema({
        path,
        name: `${industry.name} branding and design`,
        description: industry.metaDescription,
        serviceType: 'Graphic design',
        category: industry.name,
      }),
      breadcrumb([
        { name: 'Industries', href: '/industries' },
        { name: industry.name, href: path },
      ]),
      faqSchema(industry.faqs, path),
    ].filter(Boolean),
  }

  return (
    <Layout title={industry.metaTitle} description={industry.metaDescription} path={path} jsonLd={jsonLd}>
      <PageHero
        eyebrow={industry.name}
        trail={[
          { name: 'Industries', href: '/industries' },
          { name: industry.name, href: path },
        ]}
        title={industry.h1}
        highlight={industry.highlight}
        intro={industry.intro}
      />

      <TrustBar />

      {/* What this sector runs into */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              What we see in this sector
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
              The problems that come up every time
            </h2>
            <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">
              These are the constraints that shape a {industry.name.toLowerCase()} brief, and the reason a
              generalist brief template usually produces the wrong result here.
            </p>
          </Reveal>

          <div className="mt-8 sm:mt-11 grid md:grid-cols-3 gap-4 sm:gap-5">
            {industry.challenges.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-6">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-50 text-brand-600">
                    <Icons.spark className="w-5 h-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold leading-snug text-ink-900">{c.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-9 flex flex-col sm:flex-row gap-3.5">
            <Link href="/contact" className="btn-action px-7 py-3.5">
              Talk to us about your {industry.name.toLowerCase()} brand
              <Icons.arrow className="w-4.5 h-4.5" />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
            >
              <Icons.phone className="w-4.5 h-4.5" />
              {site.phone}
            </a>
          </Reveal>
        </div>
      </section>

      <LinkGrid
        eyebrow="What this sector buys"
        title={`Design services for ${industry.name.toLowerCase()}`}
        body="Ordered by how often businesses in this sector actually ask for them."
        items={services}
        tone="muted"
      />

      {industry.portfolioCategory && (
        <Portfolio showHeading={false} initial={8} step={16} filterTo={industry.portfolioCategory} />
      )}

      <Guarantees />

      <FaqAccordion
        items={industry.faqs}
        heading={`${industry.name} design questions`}
        eyebrow="FAQs"
        tone="muted"
      />

      <Testimonials />

      {relatedGuides.length > 0 && (
        <LinkGrid
          eyebrow="Guides"
          title="Worth reading before you brief anyone"
          items={relatedGuides.map((g) => ({ name: g.title, href: `/guides/${g.slug}`, description: g.excerpt }))}
          tone="light"
        />
      )}

      <LinkGrid
        eyebrow="Other sectors"
        title="We work across these too"
        items={siblings}
        compact
        tone="muted"
      />
    </Layout>
  )
}

export function getStaticPaths() {
  return {
    paths: industryPages.map((i) => ({ params: { slug: i.slug } })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const industry = industryBySlug[params.slug]

  const services = industry.services
    .map((slug) => serviceBySlug[slug])
    .filter(Boolean)
    .map((s) => ({ name: s.name, href: `/services/${s.slug}`, description: s.metaDescription, meta: s.priceLabel }))

  // Guides earn a place here by covering one of the services this sector buys,
  // so the recommendation stays honest rather than being a generic list.
  const relatedGuides = guides
    .filter((g) => g.relatedServices.some((s) => industry.services.includes(s)))
    .slice(0, 3)
    .map(({ slug, title, excerpt }) => ({ slug, title, excerpt }))

  const siblings = industryPages
    .filter((i) => i.slug !== industry.slug)
    .map((i) => ({ name: i.name, href: `/industries/${i.slug}` }))

  return { props: { industry, services, relatedGuides, siblings } }
}
