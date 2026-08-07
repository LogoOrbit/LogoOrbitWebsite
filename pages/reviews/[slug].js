import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import LinkGrid from '../../components/LinkGrid'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { reviewPages, reviewBySlug, reviewThemes, reviewPlatforms } from '../../lib/reviews'
import { site } from '../../lib/site'
import { absolute, breadcrumb, ORG_ID } from '../../lib/seo'

export default function ReviewPage({ review, theme, others }) {
  const path = `/reviews/${review.slug}`
  const description = `${review.quote.slice(0, 150)}${review.quote.length > 150 ? '…' : ''}`

  const jsonLd = {
    '@graph': [
      {
        '@type': 'Review',
        '@id': `${absolute(path)}#review`,
        url: absolute(path),
        reviewBody: review.quote,
        name: `${review.name}, ${review.company}`,
        author: { '@type': 'Person', name: review.name },
        publisher: { '@id': ORG_ID },
        itemReviewed: { '@id': ORG_ID },
        reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5, worstRating: 1 },
      },
      breadcrumb([
        { name: 'Reviews', href: '/reviews' },
        { name: `${review.name}, ${review.company}`, href: path },
      ]),
    ],
  }

  return (
    <Layout
      title={`${review.name} - ${review.company} review`}
      description={description}
      path={path}
      jsonLd={jsonLd}
      ogType="article"
    >
      <PageHero
        eyebrow="Client review"
        trail={[
          { name: 'Reviews', href: '/reviews' },
          { name: `${review.name}, ${review.company}`, href: path },
        ]}
        title={review.company}
        intro={`${review.subject} · reviewed by ${review.name}`}
      >
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/contact" className="group btn-action px-7 py-4">
            Start a project
            <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/reviews"
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20"
          >
            All reviews
          </Link>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <Reveal>
            <figure className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-ink-900/5 sm:p-9">
              <Icons.quote className="w-9 h-9 text-brand-200" />
              <blockquote className="mt-4 text-xl sm:text-2xl leading-[1.5] font-medium text-ink-900">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3.5 border-t border-slate-100 pt-5">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-brand-50 text-lg font-bold text-brand-700">
                  {review.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-bold text-ink-900">{review.name}</span>
                  <span className="block text-[14px] text-ink-500">{review.company}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Clearly separated: the quote is theirs, the commentary is ours. */}
          {review.note.length > 0 && (
            <Reveal delay={70} className="mt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-ink-900">Our note on this one</h2>
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                Written by us, not by the client
              </p>
              {review.note.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 text-[16px] sm:text-[17px] leading-[1.75] text-ink-700">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          )}

          {theme && (
            <Reveal delay={100} className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
                A pattern in our feedback
              </span>
              <h2 className="mt-3 text-xl font-bold text-ink-900">{theme.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{theme.body}</p>
            </Reveal>
          )}

          <Reveal delay={130} className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-[14px] leading-relaxed text-ink-500">
              <strong className="text-ink-700">Where this came from.</strong> Every review we publish was left by
              somebody who paid for work and received it. We do not pay for feedback and we do not edit it. The
              quote above is reproduced exactly as it was written, and we do not attach project details - budgets,
              timelines or results - that the client did not state themselves. Our overall rating is {site.rating}{' '}
              from {site.reviewCount.toLocaleString()} customers.
            </p>
          </Reveal>
        </div>
      </section>

      <LinkGrid
        eyebrow="More reviews"
        title="What other clients wrote"
        items={others}
        tone="muted"
      />

      <LinkGrid
        eyebrow="Read them elsewhere"
        title="Independent platforms"
        body="These pages are not ours to edit, which is exactly why they are worth reading."
        items={reviewPlatforms.map((p) => ({ name: p.name, href: p.href, description: p.note }))}
        tone="light"
        columns={3}
      />

      <CTA />
    </Layout>
  )
}

export function getStaticPaths() {
  return { paths: reviewPages.map((r) => ({ params: { slug: r.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  const review = reviewBySlug[params.slug]

  return {
    props: {
      review,
      theme: reviewThemes.find((t) => t.id === review.theme) || null,
      others: reviewPages
        .filter((r) => r.slug !== review.slug)
        .map((r) => ({
          name: `${r.name}, ${r.company}`,
          href: `/reviews/${r.slug}`,
          description: `“${r.quote.slice(0, 110)}${r.quote.length > 110 ? '…' : ''}”`,
        })),
    },
  }
}
