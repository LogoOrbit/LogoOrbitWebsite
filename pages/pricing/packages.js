import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import LinkGrid from '../../components/LinkGrid'
import CTA from '../../components/CTA'
import AddToCart from '../../components/AddToCart'
import { Icons } from '../../components/Icons'
import { packages, packageFamilies } from '../../lib/packages'
import { money, salesTax } from '../../lib/money'
import { breadcrumb, collectionPageSchema, itemListSchema } from '../../lib/seo'

const description =
  'Every LogoOrbit package on one index, each with a page of its own: logo tiers, bundles, branding kits, websites, apps, video, trademark registration and add-ons.'

export default function PackageIndex({ families }) {
  const jsonLd = {
    '@graph': [
      collectionPageSchema({ path: '/pricing/packages', name: 'All packages', description }),
      itemListSchema({
        path: '/pricing/packages',
        name: 'LogoOrbit packages',
        items: packages.map((p) => ({ name: `${p.name} ${p.sectionTitle}`, href: `/pricing/${p.slug}` })),
      }),
      breadcrumb([
        { name: 'Pricing', href: '/pricing' },
        { name: 'All packages', href: '/pricing/packages' },
      ]),
    ],
  }

  return (
    <Layout title="Every Package" description={description} path="/pricing/packages" jsonLd={jsonLd}>
      <PageHero
        eyebrow="All packages"
        trail={[
          { name: 'Pricing', href: '/pricing' },
          { name: 'All packages', href: '/pricing/packages' },
        ]}
        title={`${packages.length} packages,`}
        highlight="each on its own page"
        intro="The pricing page is built for comparing tiers side by side. This is the index: every package with its full specification, what it deliberately leaves out, and what happens after you order."
      />

      <section className="bg-white pt-10 sm:pt-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-[14px] leading-relaxed text-ink-500">
            {salesTax.long}
          </p>
        </div>
      </section>

      {families.map((family, i) => (
        <section
          key={family.id}
          id={family.id}
          className={`scroll-mt-24 py-12 sm:py-16 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <Reveal className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
                {family.packages.length} package{family.packages.length === 1 ? '' : 's'}
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-ink-900">{family.label}</h2>
              <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-ink-500">{family.lead}</p>
            </Reveal>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {family.packages.map((pkg, j) => (
                <Reveal key={pkg.slug} delay={(j % 3) * 60} className="h-full">
                  {/* The card is a link and the Add to cart control is a
                      button, so the button sits outside the anchor: nesting
                      one inside the other is invalid and swallows the click. */}
                  <div
                    className={`group flex h-full flex-col rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      pkg.featured ? 'border-brand-300 shadow-lg shadow-brand-900/5' : 'border-slate-200 hover:border-brand-200'
                    }`}
                  >
                  <Link href={`/pricing/${pkg.slug}`} className="flex flex-1 flex-col">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                        {pkg.kind}
                      </span>
                      {pkg.badge && (
                        <span className="rounded-full bg-flare-400 px-2.5 py-1 text-[11px] font-bold text-ink-900">
                          {pkg.badge}
                        </span>
                      )}
                    </span>

                    <h3 className="mt-2.5 text-[17px] font-bold leading-snug text-ink-900">
                      {pkg.name}
                      <span className="block text-[13px] font-semibold text-ink-500">{pkg.sectionTitle}</span>
                    </h3>

                    {pkg.bestFor && (
                      <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-500">{pkg.bestFor}</p>
                    )}

                    <span className="mt-4 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-ink-900">{pkg.priceLabel}</span>
                      {pkg.was && <span className="text-[13px] text-ink-400 line-through">{money(pkg.was)}</span>}
                    </span>

                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
                      See the full package
                      <Icons.arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>

                  <AddToCart
                    className="mt-4"
                    padding="px-4 py-2.5"
                    item={{
                      sku: `/pricing/${pkg.slug}`,
                      name: pkg.name,
                      kind: pkg.sectionTitle,
                      price: pkg.price,
                      from: /from/i.test(pkg.priceLabel || ''),
                      href: `/pricing/${pkg.slug}`,
                    }}
                  />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <LinkGrid
        eyebrow="Still deciding"
        title="Other ways in"
        items={[
          { name: 'Compare tiers side by side', href: '/pricing' },
          { name: 'Our best offer', href: '/pricing/complete-brand' },
          { name: 'Logo design', href: '/logo-design' },
          { name: 'Website design', href: '/website-design' },
          { name: 'Talk to a named person', href: '/team' },
          { name: 'Send a brief', href: '/brief' },
        ]}
        compact
      />

      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: {
      families: packageFamilies.map((f) => ({
        id: f.id,
        label: f.label,
        lead: f.lead,
        packages: f.packages.map((p) => ({
          slug: p.slug,
          name: p.name,
          sectionTitle: p.sectionTitle,
          kind: p.kind,
          bestFor: p.bestFor,
          price: p.price,
          priceLabel: p.priceLabel,
          was: p.was,
          featured: p.featured,
          badge: p.badge,
        })),
      })),
    },
  }
}
