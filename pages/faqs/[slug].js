import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import LinkGrid from '../../components/LinkGrid'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { faqItems, faqBySlug } from '../../lib/faqs'
import { site, whatsappLink } from '../../lib/site'
import { absolute, breadcrumb, ORG_ID } from '../../lib/seo'

export default function FaqPage({ item, siblings, otherGroups }) {
  const path = `/faqs/${item.slug}`
  const Icon = Icons[item.group.icon] || Icons.spark

  const jsonLd = {
    '@graph': [
      {
        '@type': 'QAPage',
        '@id': `${absolute(path)}#qa`,
        url: absolute(path),
        mainEntity: {
          '@type': 'Question',
          '@id': `${absolute(path)}#question`,
          name: item.q,
          text: item.q,
          answerCount: 1,
          acceptedAnswer: {
            '@type': 'Answer',
            text: [item.a, ...item.more].join(' '),
            url: absolute(path),
            author: { '@id': ORG_ID },
          },
        },
      },
      breadcrumb([
        { name: 'FAQs', href: '/faqs' },
        { name: item.group.title, href: `/faqs#${item.group.id}` },
        { name: item.q, href: path },
      ]),
    ],
  }

  return (
    <Layout
      title={item.q}
      description={item.a.length > 155 ? `${item.a.slice(0, 152)}...` : item.a}
      path={path}
      jsonLd={jsonLd}
    >
      <PageHero
        eyebrow={item.group.title}
        trail={[
          { name: 'FAQs', href: '/faqs' },
          { name: item.group.title, href: `/faqs#${item.group.id}` },
          { name: item.q, href: path },
        ]}
        title={item.q}
      >
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/contact" className="group btn-action px-7 py-4">
            Ask us something else
            <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/faqs"
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20"
          >
            All questions
          </Link>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <Reveal>
            <div className="rounded-3xl border border-brand-200 bg-brand-50/60 p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                <Icon className="w-4.5 h-4.5" />
                The short answer
              </span>
              <p className="mt-3.5 text-[17px] sm:text-lg leading-[1.7] text-ink-900">{item.a}</p>
            </div>
          </Reveal>

          {item.more.length > 0 && (
            <Reveal delay={70} className="mt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-ink-900">The longer answer</h2>
              {item.more.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-4 text-[16px] sm:text-[17px] leading-[1.75] text-ink-700"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          )}

          <Reveal delay={110} className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-900">Still not answered?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              Ask a person. WhatsApp is fastest for something short, the phone is best for anything that needs a
              conversation, and {site.email} is watched all day.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={whatsappLink(`Hi LogoOrbit, a question: ${item.q}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-action px-6 py-3.5"
              >
                <Icons.whatsapp className="w-4.5 h-4.5" />
                WhatsApp us
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                <Icons.phone className="w-4.5 h-4.5" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                <Icons.mail className="w-4.5 h-4.5" />
                Email support
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {item.links.length > 0 && (
        <LinkGrid eyebrow="Read next" title="Pages that go into this properly" items={item.links} tone="muted" compact />
      )}

      <LinkGrid
        eyebrow={item.group.title}
        title="Other questions in this group"
        items={siblings}
        tone="light"
      />

      <LinkGrid eyebrow="More questions" title="Browse the other groups" items={otherGroups} tone="muted" compact />

      <CTA />
    </Layout>
  )
}

export function getStaticPaths() {
  return { paths: faqItems.map((item) => ({ params: { slug: item.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  const item = faqBySlug[params.slug]

  const siblings = faqItems
    .filter((f) => f.group.id === item.group.id && f.slug !== item.slug)
    .map((f) => ({ name: f.q, href: `/faqs/${f.slug}` }))

  const seen = new Set()
  const otherGroups = faqItems
    .filter((f) => f.group.id !== item.group.id && !seen.has(f.group.id) && seen.add(f.group.id))
    .map((f) => ({ name: f.group.title, href: `/faqs#${f.group.id}` }))

  return { props: { item, siblings, otherGroups } }
}
