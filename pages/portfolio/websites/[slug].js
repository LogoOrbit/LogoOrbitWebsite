import Link from 'next/link'
import Layout from '../../../components/Layout'
import PageHero from '../../../components/PageHero'
import Reveal from '../../../components/Reveal'
import ArticleBody from '../../../components/ArticleBody'
import LinkGrid from '../../../components/LinkGrid'
import CTA from '../../../components/CTA'
import { Icons } from '../../../components/Icons'
import { websiteCaseStudies, websiteBySlug } from '../../../lib/websites'
import { serviceBySlug } from '../../../lib/catalog'
import { absolute, breadcrumb, ORG_ID } from '../../../lib/seo'

const relatedServiceSlugs = ['ui-ux-design', 'website-redesign', 'ecommerce-website-design', 'landing-page-design']

export default function WebsiteCaseStudy({ project, related, services }) {
  const path = `/portfolio/websites/${project.slug}`

  const jsonLd = {
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${absolute(path)}#work`,
        name: `${project.name} website`,
        description: project.metaDescription,
        url: absolute(path),
        creator: { '@id': ORG_ID },
        genre: `${project.category} website design`,
        about: project.tagline,
        sameAs: project.href,
        inLanguage: 'en',
      },
      breadcrumb([
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Websites', href: '/portfolio#websites' },
        { name: project.name, href: path },
      ]),
    ],
  }

  return (
    <Layout title={project.metaTitle} description={project.metaDescription} path={path} jsonLd={jsonLd} ogType="article">
      <PageHero
        eyebrow={project.category}
        trail={[
          { name: 'Portfolio', href: '/portfolio' },
          { name: 'Websites', href: '/portfolio#websites' },
          { name: project.name, href: path },
        ]}
        title={project.name}
        intro={project.intro || project.body}
      >
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-action px-7 py-4"
          >
            Visit the live site
            <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            href="/website-design"
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20"
          >
            Website packages
          </Link>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <Reveal>
            <div
              className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-ink-900/5"
              style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent2})` }}
            >
              <div className="grid place-items-center px-6 py-16 sm:py-24 text-center">
                <span className="grid place-items-center w-24 h-24 rounded-3xl bg-white/15 text-3xl font-bold text-white backdrop-blur">
                  {project.monogram}
                </span>
                <p className="mt-6 text-xl sm:text-2xl font-bold text-white">{project.name}</p>
                <p className="mt-2 text-[15px] text-white/80">{project.tagline}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 bg-white px-5 py-4 sm:px-7">
                <span className="text-[15px] font-bold text-ink-900">{project.category}</span>
                <span className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[12px] font-semibold text-ink-700"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </Reveal>

          {project.stack && (
            <Reveal delay={80} className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {project.stack.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <Icons.check className="w-5 h-5 text-brand-600" />
                  <p className="mt-2.5 text-[14px] font-semibold leading-snug text-ink-900">{item}</p>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <article className="pb-12 sm:pb-16 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <ArticleBody
            sections={project.sections || []}
            contents={(project.sections || []).map((s) => s.h).filter(Boolean)}
          />

          <Reveal className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-900">Want a site that works this hard?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              Tell us what a visitor should do when they land — call, book, buy or read — and you get a page
              structure, a timeline and one fixed price back.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3.5">
              <Link href="/contact" className="btn-action px-7 py-3.5">
                Get a website quote
                <Icons.arrow className="w-4.5 h-4.5" />
              </Link>
              <Link
                href="/team/sam-marcus"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                Write to the web desk
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      <LinkGrid eyebrow="More builds" title="Other sites we designed and built" items={related} tone="muted" />

      <LinkGrid eyebrow="Services" title="How this kind of work is bought" items={services} tone="light" />

      <CTA />
    </Layout>
  )
}

export function getStaticPaths() {
  return { paths: websiteCaseStudies.map((w) => ({ params: { slug: w.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  const project = websiteBySlug[params.slug]

  return {
    props: {
      project,
      related: websiteCaseStudies
        .filter((w) => w.slug !== project.slug)
        .map((w) => ({ name: w.name, href: `/portfolio/websites/${w.slug}`, description: w.tagline, meta: w.category })),
      services: relatedServiceSlugs
        .map((slug) => serviceBySlug[slug])
        .filter(Boolean)
        .map((s) => ({ name: s.name, href: `/services/${s.slug}`, description: s.metaDescription, meta: s.priceLabel })),
    },
  }
}
