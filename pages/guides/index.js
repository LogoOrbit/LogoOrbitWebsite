import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import LinkGrid from '../../components/LinkGrid'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { guides, guideCategories } from '../../lib/guides'
import { breadcrumb, collectionPageSchema, itemListSchema } from '../../lib/seo'

const description =
  'Practical guides on logo design, branding, print production, web design, SEO and working with designers, written to be useful whether or not you hire anyone.'

export default function GuidesHub({ grouped, items, featured }) {
  const jsonLd = {
    '@graph': [
      collectionPageSchema({ path: '/guides', name: 'Design and branding guides', description }),
      itemListSchema({ path: '/guides', name: 'Guides', items }),
      breadcrumb([{ name: 'Guides', href: '/guides' }]),
    ],
  }

  return (
    <Layout title="Design & Branding Guides" description={description} path="/guides" jsonLd={jsonLd}>
      <PageHero
        eyebrow="Guides"
        breadcrumb="Guides"
        title="Everything we know,"
        highlight="written down"
        intro="Straight answers to the questions people ask before they commission anything, including the ones where the honest answer is that you do not need to pay us."
      />

      {/* The three most-read pieces, given a bigger card than the rest. */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Start here</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-ink-900">
              The three most useful ones
            </h2>
          </Reveal>

          <div className="mt-7 grid md:grid-cols-3 gap-4 sm:gap-5">
            {featured.map((g, i) => (
              <Reveal key={g.slug} delay={i * 70} className="h-full">
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                    {g.categoryName}
                  </span>
                  <h3 className="mt-3 text-lg font-bold leading-snug text-ink-900">{g.title}</h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-500">{g.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600">
                    Read it
                    <Icons.arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {grouped.map((group, i) => (
        <section
          key={group.id}
          id={group.id}
          className={`scroll-mt-24 py-12 sm:py-16 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <Reveal className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Guides</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-ink-900">{group.name}</h2>
            </Reveal>

            <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.guides.map((g, j) => (
                <Reveal key={g.slug} delay={(j % 3) * 60} className="h-full">
                  <Link
                    href={`/guides/${g.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
                  >
                    <h3 className="text-[16px] font-bold leading-snug text-ink-900">{g.title}</h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-500">{g.excerpt}</p>
                    <span className="mt-4 text-[13px] font-semibold text-brand-600">
                      {g.readMinutes} min read
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <LinkGrid
        eyebrow="Elsewhere on the site"
        title="Hubs worth a look"
        items={[
          { name: 'All services', href: '/services' },
          { name: 'Industries we design for', href: '/industries' },
          { name: 'Where we work', href: '/locations' },
          { name: 'Pricing and packages', href: '/pricing' },
          { name: 'Portfolio', href: '/portfolio' },
          { name: 'Send a brief', href: '/brief' },
        ]}
        compact
        tone="light"
      />

      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  const byCategory = guideCategories
    .map((c) => ({
      id: c.id,
      name: c.name,
      guides: guides
        .filter((g) => g.category === c.id)
        .map(({ slug, title, excerpt, readMinutes }) => ({ slug, title, excerpt, readMinutes })),
    }))
    .filter((c) => c.guides.length > 0)

  const featuredSlugs = ['how-much-does-a-logo-cost', 'what-makes-a-good-logo', 'website-cost-guide']

  return {
    props: {
      grouped: byCategory,
      featured: featuredSlugs.map((slug) => {
        const g = guides.find((x) => x.slug === slug)
        return {
          slug: g.slug,
          title: g.title,
          excerpt: g.excerpt,
          categoryName: guideCategories.find((c) => c.id === g.category).name,
        }
      }),
      items: guides.map((g) => ({ name: g.title, href: `/guides/${g.slug}` })),
    },
  }
}
