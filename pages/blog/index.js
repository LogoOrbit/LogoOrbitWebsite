import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import LinkGrid from '../../components/LinkGrid'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { posts, postsByDate, blogCategories } from '../../lib/blog'
import { breadcrumb, collectionPageSchema, itemListSchema, absolute, ORG_ID } from '../../lib/seo'

const description =
  'Articles from the LogoOrbit studio: how we price, how we brief, where we use AI and where we will not, and what is actually changing in design, video and branding work.'

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogIndex({ latest, rest, grouped }) {
  const jsonLd = {
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${absolute('/blog')}#blog`,
        name: 'The LogoOrbit blog',
        description,
        url: absolute('/blog'),
        publisher: { '@id': ORG_ID },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          '@id': `${absolute(`/blog/${p.slug}`)}#article`,
          headline: p.title,
          url: absolute(`/blog/${p.slug}`),
          datePublished: p.published,
          dateModified: p.updated,
          author: { '@id': ORG_ID },
        })),
      },
      collectionPageSchema({ path: '/blog', name: 'The LogoOrbit blog', description }),
      itemListSchema({
        path: '/blog',
        name: 'Articles',
        items: posts.map((p) => ({ name: p.title, href: `/blog/${p.slug}` })),
      }),
      breadcrumb([{ name: 'Blog', href: '/blog' }]),
    ],
  }

  return (
    <Layout title="Blog" description={description} path="/blog" jsonLd={jsonLd}>
      <PageHero
        eyebrow="Blog"
        breadcrumb="Blog"
        title="Written from"
        highlight="inside the studio"
        intro="Not a content calendar. These are the arguments we have internally about pricing, briefs, revisions and where the tools help, published because clients keep asking the same questions."
      />

      {/* The newest piece, given the room to be read from the index. */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <Link
              href={`/blog/${latest.slug}`}
              className="group grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl sm:p-9 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
                  Latest · {latest.categoryName}
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold leading-tight text-ink-900">{latest.title}</h2>
                <p className="mt-3.5 text-[15px] sm:text-[17px] leading-relaxed text-ink-500">{latest.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink-900 transition-colors group-hover:text-brand-600">
                  Read the article
                  <Icons.arrow className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-3 self-start lg:grid-cols-1">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Published</dt>
                  <dd className="mt-1.5 text-[15px] font-bold text-ink-900">
                    <time dateTime={latest.published}>{formatDate(latest.published)}</time>
                  </dd>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Length</dt>
                  <dd className="mt-1.5 text-[15px] font-bold text-ink-900">{latest.readMinutes} minute read</dd>
                </div>
              </dl>
            </Link>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 60} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                    {post.categoryName}
                  </span>
                  <h3 className="mt-3 text-[17px] font-bold leading-snug text-ink-900">{post.title}</h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-500">{post.excerpt}</p>
                  <span className="mt-4 flex items-center justify-between gap-3 text-[13px] font-semibold text-ink-500">
                    <time dateTime={post.published}>{formatDate(post.published)}</time>
                    <span className="text-brand-600">{post.readMinutes} min</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Every article again, grouped, so a reader who wants one subject can
          find all of it without scanning dates. */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">By subject</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-ink-900">Browse by what it is about</h2>
          </Reveal>

          <div className="mt-8 space-y-10">
            {grouped.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-24">
                <h3 className="text-lg font-bold text-ink-900">{group.name}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-500">{group.blurb}</p>

                <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                    >
                      <span className="text-[15px] font-bold leading-snug text-ink-900">{post.title}</span>
                      <span className="mt-2 text-[14px] leading-relaxed text-ink-500">{post.excerpt}</span>
                      <span className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
                        Read it
                        <Icons.arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LinkGrid
        eyebrow="Reference"
        title="Looking for a how-to rather than an opinion?"
        body="The guides section is the evergreen half: file formats, costs, trademarks, colour, SEO. Written to be useful whether or not you hire anyone."
        items={[
          { name: 'All guides', href: '/guides' },
          { name: 'How much a logo costs', href: '/guides/how-much-does-a-logo-cost' },
          { name: 'Logo file formats explained', href: '/guides/logo-file-formats-explained' },
          { name: 'Trademarking your logo', href: '/guides/trademark-your-logo' },
          { name: 'What makes a good logo', href: '/guides/what-makes-a-good-logo' },
          { name: 'Meet the team', href: '/team' },
        ]}
        compact
      />

      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  const withCategory = postsByDate.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    published: p.published,
    readMinutes: p.readMinutes,
    categoryName: blogCategories.find((c) => c.id === p.category).name,
  }))

  return {
    props: {
      latest: withCategory[0],
      rest: withCategory.slice(1),
      grouped: blogCategories
        .map((c) => ({
          ...c,
          posts: postsByDate
            .filter((p) => p.category === c.id)
            .map(({ slug, title, excerpt }) => ({ slug, title, excerpt })),
        }))
        .filter((c) => c.posts.length > 0),
    },
  }
}
