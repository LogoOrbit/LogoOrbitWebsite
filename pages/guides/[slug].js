import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import FaqAccordion from '../../components/FaqAccordion'
import LinkGrid from '../../components/LinkGrid'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { guides, guideBySlug, guideCategories } from '../../lib/guides'
import { serviceBySlug } from '../../lib/catalog'
import { articleSchema, breadcrumb, faqSchema } from '../../lib/seo'

/** Renders one content block. Kept dumb so the data file stays the source of truth. */
function Block({ block }) {
  return (
    <Reveal className="mt-10 first:mt-0">
      {block.h && (
        <h2 className="text-xl sm:text-2xl font-bold leading-snug text-ink-900 scroll-mt-24" id={slugify(block.h)}>
          {block.h}
        </h2>
      )}

      {block.p?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="mt-4 text-[16px] sm:text-[17px] leading-[1.75] text-ink-700">
          {paragraph}
        </p>
      ))}

      {block.ul && (
        <ul className="mt-5 space-y-3">
          {block.ul.map((item) => (
            <li key={item} className="flex gap-3 text-[16px] leading-[1.7] text-ink-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {block.ol && (
        <ol className="mt-5 space-y-3">
          {block.ol.map((item, i) => (
            <li key={item} className="flex gap-3.5 text-[16px] leading-[1.7] text-ink-700">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-[13px] font-bold text-brand-600">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      )}

      {block.table && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <tbody>
              {block.table.map(([label, value]) => (
                <tr key={label} className="border-b border-slate-200 last:border-b-0">
                  <th
                    scope="row"
                    className="w-[38%] bg-slate-50 px-4 py-3.5 align-top text-[14px] font-bold text-ink-900"
                  >
                    {label}
                  </th>
                  <td className="px-4 py-3.5 align-top text-[15px] leading-relaxed text-ink-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Reveal>
  )
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function GuidePage({ guide, relatedServices, relatedGuides, contents }) {
  const path = `/guides/${guide.slug}`
  const category = guideCategories.find((c) => c.id === guide.category)

  const jsonLd = {
    '@graph': [
      articleSchema({
        path,
        headline: guide.title,
        description: guide.metaDescription,
        published: guide.published,
        updated: guide.updated,
        keywords: guide.keywords,
      }),
      breadcrumb([
        { name: 'Guides', href: '/guides' },
        { name: guide.title, href: path },
      ]),
      faqSchema(guide.faqs, path),
    ].filter(Boolean),
  }

  return (
    <Layout
      title={guide.metaTitle}
      description={guide.metaDescription}
      path={path}
      jsonLd={jsonLd}
      ogType="article"
      article={{ published: guide.published, updated: guide.updated, section: category?.name }}
    >
      <PageHero
        eyebrow={category?.name}
        trail={[
          { name: 'Guides', href: '/guides' },
          { name: category?.name || 'Guide', href: `/guides#${guide.category}` },
          { name: guide.title, href: path },
        ]}
        title={guide.title}
        intro={guide.excerpt}
      >
        <p className="mt-7 text-[14px] text-white/60">
          {guide.readMinutes} minute read · updated{' '}
          <time dateTime={guide.updated}>
            {new Date(guide.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
        </p>
      </PageHero>

      <article className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          {contents.length > 2 && (
            <Reveal className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">On this page</p>
              <ul className="mt-3.5 space-y-2">
                {contents.map((h) => (
                  <li key={h}>
                    <a
                      href={`#${slugify(h)}`}
                      className="text-[15px] font-medium text-ink-700 underline-offset-4 hover:text-brand-600 hover:underline"
                    >
                      {h}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {guide.sections.map((block, i) => (
            <Block key={block.h || `block-${i}`} block={block} />
          ))}

          <Reveal className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-900">Want this done for you?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              We will tell you honestly whether you need us for it. Send a two-line description of the business and
              we come back with a plan, a timeline and one fixed price.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3.5">
              <Link href="/contact" className="btn-action px-7 py-3.5">
                Get a free quote
                <Icons.arrow className="w-4.5 h-4.5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
              >
                See pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      <FaqAccordion items={guide.faqs} heading="Questions people ask about this" eyebrow="FAQs" tone="muted" />

      <LinkGrid
        eyebrow="Services"
        title="What this covers, if you would rather we did it"
        items={relatedServices}
        tone="light"
      />

      <LinkGrid
        eyebrow="Keep reading"
        title="Related guides"
        items={relatedGuides}
        tone="muted"
      />

      <CTA />
    </Layout>
  )
}

export function getStaticPaths() {
  return { paths: guides.map((g) => ({ params: { slug: g.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  const guide = guideBySlug[params.slug]

  return {
    props: {
      guide,
      contents: guide.sections.map((s) => s.h).filter(Boolean),
      relatedServices: guide.relatedServices
        .map((slug) => serviceBySlug[slug])
        .filter(Boolean)
        .map((s) => ({ name: s.name, href: `/services/${s.slug}`, description: s.metaDescription, meta: s.priceLabel })),
      relatedGuides: guide.relatedGuides
        .map((slug) => guideBySlug[slug])
        .filter(Boolean)
        .map((g) => ({ name: g.title, href: `/guides/${g.slug}`, description: g.excerpt })),
    },
  }
}
