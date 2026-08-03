import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import ArticleBody from '../../components/ArticleBody'
import LinkGrid from '../../components/LinkGrid'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { caseStudies, caseStudyBySlug, relatedMarks } from '../../lib/casestudies'
import { industryBySlug } from '../../lib/industries'
import { serviceBySlug } from '../../lib/catalog'
import { site } from '../../lib/site'
import { absolute, breadcrumb, ORG_ID } from '../../lib/seo'

/** Portfolio categories mapped onto the industry pages that cover them. */
const industryForCategory = {
  Technology: 'technology',
  'Real Estate': 'real-estate',
  Business: 'agencies',
  Construction: 'construction',
  'Home Services': 'home-services',
  Fitness: 'fitness',
  Sports: 'sports',
  Photography: 'photography',
  Fashion: 'fashion',
  Retail: 'ecommerce',
  'Food & Drink': 'restaurants',
  Community: 'nonprofits',
  Automotive: 'automotive',
  Finance: 'finance',
  Healthcare: 'healthcare',
  Travel: 'travel',
}

const servicesForForm = {
  Emblem: ['brand-identity-design', 'logo-redesign', 'brand-guidelines'],
  Seal: ['brand-identity-design', 'monogram-logo-design', 'brand-guidelines'],
  Monogram: ['monogram-logo-design', 'brand-identity-design', 'luxury-logo-design'],
  Wordmark: ['typography-design', 'brand-identity-design', 'minimalist-logo-design'],
  'Symbol and wordmark': ['brand-identity-design', 'minimalist-logo-design', 'brand-guidelines'],
  'Concept mark': ['brand-identity-design', 'minimalist-logo-design', 'logo-redesign'],
}

export default function CaseStudyPage({ study, related, services, industry, neighbours }) {
  const path = `/portfolio/${study.slug}`
  const imageUrl = `${site.url}/portfolio/${study.slug}.webp`

  const jsonLd = {
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${absolute(path)}#work`,
        name: `${study.title} logo design`,
        headline: `${study.title} logo design`,
        description: study.metaDescription,
        url: absolute(path),
        creator: { '@id': ORG_ID },
        genre: `${study.category} logo design`,
        inLanguage: 'en',
        image: {
          '@type': 'ImageObject',
          contentUrl: imageUrl,
          url: imageUrl,
          caption: `${study.title} logo designed by ${site.name}`,
          creditText: site.name,
          creator: { '@id': ORG_ID },
          width: 520,
          height: 520,
          encodingFormat: 'image/webp',
        },
        isPartOf: { '@id': `${site.url}/portfolio#gallery` },
      },
      breadcrumb([
        { name: 'Portfolio', href: '/portfolio' },
        { name: study.title, href: path },
      ]),
    ],
  }

  return (
    <Layout title={study.metaTitle} description={study.metaDescription} path={path} jsonLd={jsonLd} ogType="article">
      <PageHero
        eyebrow={`${study.category} · ${study.formName}`}
        trail={[
          { name: 'Portfolio', href: '/portfolio' },
          { name: study.category, href: '/portfolio' },
          { name: study.title, href: path },
        ]}
        title={study.title}
        intro={study.intro}
      >
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/contact" className="group btn-action px-7 py-4">
            Get a mark like this
            <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20"
          >
            Back to the wall
          </Link>
        </div>
      </PageHero>

      {/* The mark itself, on the white it was drawn for. */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <Reveal>
            <figure className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-ink-900/5">
              <div className="grid place-items-center bg-white p-8 sm:p-14">
                <Image
                  src={`/portfolio/${study.slug}.webp`}
                  alt={`${study.title} logo design by ${site.name}`}
                  width={520}
                  height={520}
                  priority
                  sizes="(min-width: 1024px) 520px, 80vw"
                  className="h-auto w-full max-w-[420px] object-contain"
                />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
                <span className="text-[15px] font-bold text-ink-900">{study.title}</span>
                <span className="text-[13px] font-semibold text-ink-500">
                  {study.category} · {study.formName} · Drawn in-house
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={80} className="mt-6 grid gap-3.5 sm:grid-cols-3">
            {[
              { label: 'Sector', value: study.sectorLabel },
              { label: 'Mark form', value: study.formName },
              { label: 'Rights', value: 'Assigned to the client' },
            ].map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">{fact.label}</p>
                <p className="mt-1.5 text-[15px] font-bold text-ink-900">{fact.value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <article className="pb-12 sm:pb-16 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <ArticleBody sections={study.sections} contents={study.sections.map((s) => s.h).filter(Boolean)} />

          {/* Said plainly on every one of these pages: the sector knowledge is
              ours, the client's private business is not ours to publish. */}
          <Reveal className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="text-[14px] leading-relaxed text-ink-500">
              <strong className="text-ink-700">A note on what this page does not claim.</strong> We publish the mark,
              the sector it was drawn for and how work of this kind is built. We do not publish a client’s budget,
              timeline or commercial results, and we do not invent them. If a client wants their project written up
              in full, they tell us so and we ask them for the numbers.
            </p>
          </Reveal>

          <Reveal className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-900">Want something like this for your business?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              Every mark on this wall started as two or three sentences about a business. Send yours and you get
              original concepts back, usually inside 24 hours.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3.5">
              <Link href="/brief" className="btn-action px-7 py-3.5">
                Send a brief
                <Icons.arrow className="w-4.5 h-4.5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                See logo pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      <LinkGrid
        eyebrow="More like this"
        title={`Other ${study.category.toLowerCase()} marks`}
        items={related}
        tone="muted"
      />

      <LinkGrid
        eyebrow="Services"
        title="How this kind of work is bought"
        items={services}
        tone="light"
      />

      <LinkGrid
        eyebrow="Browse on"
        title="Keep looking"
        items={[
          ...(industry ? [{ name: `Design for ${industry.name.toLowerCase()}`, href: `/industries/${industry.slug}` }] : []),
          { name: 'The full portfolio', href: '/portfolio' },
          { name: 'Logo design packages', href: '/logo-design' },
          ...neighbours,
        ]}
        tone="muted"
        compact
      />

      <CTA />
    </Layout>
  )
}

export function getStaticPaths() {
  return { paths: caseStudies.map((c) => ({ params: { slug: c.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  const study = caseStudyBySlug[params.slug]
  const industrySlug = industryForCategory[study.category]
  const industry = industrySlug ? industryBySlug[industrySlug] : null

  // Previous and next mark on the wall, so every page is reachable from the
  // one beside it rather than only from the grid.
  const prev = caseStudies[(study.index - 1 + caseStudies.length) % caseStudies.length]
  const next = caseStudies[(study.index + 1) % caseStudies.length]

  return {
    props: {
      study,
      related: relatedMarks(study.slug),
      services: (servicesForForm[study.formName] || ['brand-identity-design'])
        .map((slug) => serviceBySlug[slug])
        .filter(Boolean)
        .map((s) => ({ name: s.name, href: `/services/${s.slug}`, description: s.metaDescription, meta: s.priceLabel })),
      industry: industry ? { name: industry.name, slug: industry.slug } : null,
      neighbours: [
        { name: `Previous: ${prev.title}`, href: `/portfolio/${prev.slug}` },
        { name: `Next: ${next.title}`, href: `/portfolio/${next.slug}` },
      ],
    },
  }
}
