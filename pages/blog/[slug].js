import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import ArticleBody from '../../components/ArticleBody'
import FaqAccordion from '../../components/FaqAccordion'
import LinkGrid from '../../components/LinkGrid'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { posts, postBySlug, blogCategories } from '../../lib/blog'
import { serviceBySlug } from '../../lib/catalog'
import { guideBySlug } from '../../lib/guides'
import { articleSchema, breadcrumb, faqSchema } from '../../lib/seo'

export default function BlogPost({ post, relatedServices, relatedGuides, relatedPosts, contents }) {
  const path = `/blog/${post.slug}`
  const category = blogCategories.find((c) => c.id === post.category)

  const jsonLd = {
    '@graph': [
      {
        ...articleSchema({
          path,
          headline: post.title,
          description: post.metaDescription,
          published: post.published,
          updated: post.updated,
          keywords: post.keywords,
        }),
        '@type': 'BlogPosting',
        articleSection: category?.name,
        wordCount: post.sections.reduce(
          (n, s) =>
            n +
            [...(s.p || []), ...(s.ul || []), ...(s.ol || [])].reduce((c, t) => c + String(t).split(/\s+/).length, 0),
          0
        ),
      },
      breadcrumb([
        { name: 'Blog', href: '/blog' },
        { name: post.title, href: path },
      ]),
      faqSchema(post.faqs, path),
    ].filter(Boolean),
  }

  return (
    <Layout
      title={post.metaTitle}
      description={post.metaDescription}
      path={path}
      jsonLd={jsonLd}
      ogType="article"
      article={{ published: post.published, updated: post.updated, section: category?.name }}
    >
      <PageHero
        eyebrow={category?.name}
        trail={[
          { name: 'Blog', href: '/blog' },
          { name: category?.name || 'Article', href: `/blog#${post.category}` },
          { name: post.title, href: path },
        ]}
        title={post.title}
        intro={post.excerpt}
      >
        <p className="mt-7 text-[14px] text-white/60">
          {post.readMinutes} minute read · published{' '}
          <time dateTime={post.published}>
            {new Date(post.published).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          {post.updated !== post.published && (
            <>
              {' '}· updated{' '}
              <time dateTime={post.updated}>
                {new Date(post.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            </>
          )}
        </p>
      </PageHero>

      <article className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <ArticleBody sections={post.sections} contents={contents} />

          <Reveal className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-900">Got a project this applies to?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              Send two lines about the business and you get a plan, a timeline and one fixed price. If the honest
              answer is that you do not need us for it, we will say that instead.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3.5">
              <Link href="/contact" className="btn-action px-7 py-3.5">
                Get a free quote
                <Icons.arrow className="w-4.5 h-4.5" />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                Write to a named person
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      <FaqAccordion items={post.faqs} heading="Questions this raises" eyebrow="FAQs" tone="muted" />

      <LinkGrid eyebrow="Keep reading" title="More from the studio" items={relatedPosts} tone="light" />

      <LinkGrid eyebrow="Guides" title="The reference version" items={relatedGuides} tone="muted" />

      <LinkGrid eyebrow="Services" title="If you would rather we did it" items={relatedServices} tone="light" />

      <CTA />
    </Layout>
  )
}

export function getStaticPaths() {
  return { paths: posts.map((p) => ({ params: { slug: p.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  const post = postBySlug[params.slug]

  return {
    props: {
      post,
      contents: post.sections.map((s) => s.h).filter(Boolean),
      relatedServices: (post.relatedServices || [])
        .map((slug) => serviceBySlug[slug])
        .filter(Boolean)
        .map((s) => ({ name: s.name, href: `/services/${s.slug}`, description: s.metaDescription, meta: s.priceLabel })),
      relatedGuides: (post.relatedGuides || [])
        .map((slug) => guideBySlug[slug])
        .filter(Boolean)
        .map((g) => ({ name: g.title, href: `/guides/${g.slug}`, description: g.excerpt })),
      relatedPosts: (post.relatedPosts || [])
        .map((slug) => postBySlug[slug])
        .filter(Boolean)
        .map((p) => ({ name: p.title, href: `/blog/${p.slug}`, description: p.excerpt })),
    },
  }
}
