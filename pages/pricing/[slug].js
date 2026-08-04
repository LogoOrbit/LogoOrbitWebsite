import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import ArticleBody from '../../components/ArticleBody'
import FaqAccordion from '../../components/FaqAccordion'
import LinkGrid from '../../components/LinkGrid'
import CTA from '../../components/CTA'
import AddToCart from '../../components/AddToCart'
import { Icons } from '../../components/Icons'
import { packages, packageBySlug } from '../../lib/packages'
import { money, salesTax } from '../../lib/pricing'
import { site, whatsappLink } from '../../lib/site'
import { absolute, breadcrumb, faqSchema, ORG_ID } from '../../lib/seo'

export default function PackagePage({ pkg, siblings }) {
  const path = `/pricing/${pkg.slug}`

  const jsonLd = {
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${absolute(path)}#product`,
        name: `${pkg.name} ${pkg.sectionTitle}`,
        description: pkg.metaDescription,
        url: absolute(path),
        brand: { '@id': ORG_ID },
        category: pkg.familyLabel,
        offers: {
          '@type': 'Offer',
          price: String(pkg.price),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: absolute(path),
          priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
          seller: { '@id': ORG_ID },
        },
      },
      breadcrumb([
        { name: 'Pricing', href: '/pricing' },
        { name: `${pkg.name} ${pkg.sectionTitle}`, href: path },
      ]),
      faqSchema(pkg.faqs, path),
    ].filter(Boolean),
  }

  return (
    <Layout title={pkg.metaTitle} description={pkg.metaDescription} path={path} jsonLd={jsonLd} ogType="product">
      <PageHero
        eyebrow={`${pkg.kind} · ${pkg.priceLabel}`}
        trail={[
          { name: 'Pricing', href: '/pricing' },
          { name: pkg.sectionTitle, href: `/pricing#${pkg.sectionId}` },
          { name: pkg.name, href: path },
        ]}
        title={pkg.name}
        highlight={pkg.sectionTitle.toLowerCase().includes(pkg.name.toLowerCase()) ? '' : pkg.sectionTitle}
        intro={pkg.intro}
      >
        <div className="mt-7 flex flex-col items-center gap-4">
          <p className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-bold text-white">{pkg.priceLabel}</span>
            {pkg.was && (
              <span className="text-lg text-white/50 line-through">{money(pkg.was)}</span>
            )}
          </p>
          {pkg.savingPct ? (
            <span className="rounded-full bg-flare-400 px-4 py-1.5 text-[13px] font-bold text-ink-900">
              Save {money(pkg.saving)} · {pkg.savingPct}% off buying the parts separately
            </span>
          ) : null}

          <p className="text-[13px] text-white/50">{salesTax.short}</p>

          <div className="mt-2 flex flex-col sm:flex-row justify-center gap-3">
            <AddToCart
              item={{
                sku: path,
                name: pkg.name,
                kind: pkg.sectionTitle,
                price: pkg.price,
                per: pkg.per || null,
                from: /from/i.test(pkg.priceLabel || ''),
                href: path,
              }}
              variant="featured"
              full={false}
              padding="px-7 py-4"
              label="Add to cart"
            />
            <Link href="/contact" className="group btn-action px-7 py-4">
              Order this package
              <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappLink(`Hi LogoOrbit, I have a question about the ${pkg.name} ${pkg.sectionTitle}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Icons.whatsapp className="w-5 h-5" />
              Ask a question first
            </a>
          </div>
        </div>
      </PageHero>

      {pkg.highlights?.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <Reveal className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {pkg.highlights.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5">
                  <Icons.check className="mt-0.5 w-5 h-5 shrink-0 text-brand-600" />
                  <span className="text-[15px] font-semibold leading-snug text-ink-900">{item}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <article className="pb-12 sm:pb-16 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <ArticleBody sections={pkg.sections} contents={pkg.sections.map((s) => s.h).filter(Boolean)} />

          <Reveal className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-900">Not sure this is the right tier?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              Describe the business in two lines and we will tell you which package covers it — including when that is
              a cheaper one than the page you are on.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3.5">
              <Link href="/contact" className="btn-action px-7 py-3.5">
                Get a free quote
                <Icons.arrow className="w-4.5 h-4.5" />
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                <Icons.phone className="w-4.5 h-4.5" />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </article>

      <FaqAccordion items={pkg.faqs} heading={`Questions about ${pkg.familyLabel.toLowerCase()}`} tone="muted" />

      {siblings.length > 0 && (
        <LinkGrid
          eyebrow="Compare"
          title="The other tiers in this range"
          body="Every tier has a page of its own, so you can read the whole specification rather than a card."
          items={siblings}
          tone="light"
        />
      )}

      <LinkGrid
        eyebrow="Elsewhere"
        title="Keep looking"
        items={[
          { name: 'All packages', href: '/pricing/packages' },
          { name: 'The full pricing page', href: '/pricing' },
          pkg.hub,
          { name: 'Portfolio', href: '/portfolio' },
          { name: 'Send a brief', href: '/brief' },
          { name: 'Talk to a named person', href: '/team' },
        ]}
        tone="muted"
        compact
      />

      <CTA />
    </Layout>
  )
}

export function getStaticPaths() {
  return { paths: packages.map((p) => ({ params: { slug: p.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  const pkg = packageBySlug[params.slug]

  return {
    props: {
      pkg,
      siblings: pkg.siblings.map((s) => ({
        name: s.name,
        href: `/pricing/${s.slug}`,
        description: packageBySlug[s.slug]?.bestFor || '',
        meta: money(s.price),
      })),
    },
  }
}
