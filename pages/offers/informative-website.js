import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import { Icons } from '../../components/Icons'
import { site, whatsappLink } from '../../lib/site'
import { informativeWebsite, offer } from '../../lib/offers'
import { ORG_ID } from '../../lib/seo'

const description =
  'Informative Website package, discounted to $499: unlimited logo concepts, 8 dedicated designers, an 8 to 10 page mobile responsive website, stationery, forms, sitemap and 100% ownership rights. No monthly or yearly cost.'

export default function InformativeWebsiteOffer() {
  const jsonLd = {
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${site.url}${informativeWebsite.href}#product`,
        name: `${informativeWebsite.name} package`,
        description,
        brand: { '@id': ORG_ID },
        offers: {
          '@type': 'Offer',
          price: informativeWebsite.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/LimitedAvailability',
          url: `${site.url}${informativeWebsite.href}`,
        },
      },
    ],
  }

  return (
    <Layout
      title={`Informative Website — $${informativeWebsite.price} Discounted Offer`}
      description={description}
      path={informativeWebsite.href}
      jsonLd={jsonLd}
    >
      <PageHero
        eyebrow={informativeWebsite.tagline}
        title="Informative Website —"
        highlight={`$${informativeWebsite.price} only`}
        intro="Everything below is included. One price, paid once: no monthly cost, no yearly cost, and 100% ownership rights on the work."
        trail={[
          { name: 'Offers', href: offer.href },
          { name: 'Informative Website' },
        ]}
      >
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link href="/contact" className="group btn-action px-7 py-4">
            Reply YES to avail now
            <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Icons.phone className="w-5 h-5" />
            {site.phone}
          </a>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-8 py-10 sm:px-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What is included</h2>
              <p className="mt-3 text-lg text-slate-600">
                {informativeWebsite.features.length} items, all of them in the ${informativeWebsite.price}.
              </p>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {informativeWebsite.features.map((f, i) => (
              <Reveal key={f} delay={Math.min(i, 10) * 40} as="li">
                <span className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-800">
                  <Icons.check className="mt-1 w-5 h-5 shrink-0 text-brand-600" />
                  {f}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Discounted offer
            </p>
            <p className="mt-4 text-6xl sm:text-7xl font-bold text-slate-900">${informativeWebsite.price}</p>
            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-slate-900">
              Reply with “YES” to avail now
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Tell us YES on the form, on WhatsApp or on the phone and a dedicated account manager picks it up
              from there. Part of our {offer.discount}% existing-customer promotion.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
              <Link href="/contact" className="group btn-action px-7 py-4">
                Say YES
                <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsappLink(
                  `Hi LogoOrbit, YES — I want the $${informativeWebsite.price} Informative Website offer.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Icons.whatsapp className="w-5 h-5" />
                WhatsApp us
              </a>
            </div>
            <p className="mt-8 text-sm text-slate-500">
              Looking for the rest of the promotion?{' '}
              <Link href={offer.href} className="font-semibold text-brand-600 hover:underline">
                See all {offer.discount}% off services
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
