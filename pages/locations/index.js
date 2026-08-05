import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TrustBar from '../../components/TrustBar'
import LinkGrid from '../../components/LinkGrid'
import Reveal from '../../components/Reveal'
import Guarantees from '../../components/Guarantees'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { site } from '../../lib/site'
import { locationPages, locationsByCountry } from '../../lib/locations'
import { breadcrumb, collectionPageSchema, itemListSchema } from '../../lib/seo'

const description =
  'LogoOrbit works with businesses across the US, Canada, the UK, Ireland, Pakistan, the UAE, Australia, New Zealand and Singapore. Offices in New York and Delaware.'

export default function LocationsHub({ countries, items }) {
  const jsonLd = {
    '@graph': [
      collectionPageSchema({ path: '/locations', name: 'Where we work', description }),
      itemListSchema({ path: '/locations', name: 'Locations served', items }),
      breadcrumb([{ name: 'Locations', href: '/locations' }]),
    ],
  }

  return (
    <Layout title="Where We Work" description={description} path="/locations" jsonLd={jsonLd}>
      <PageHero
        eyebrow="Locations"
        breadcrumb="Locations"
        title="Two registered offices,"
        highlight="clients on five continents"
        intro="Design is delivered digitally, so where we sit matters far less than whether we answer the phone. Here is where our clients actually are, and what changes about the work in each market."
      />

      <TrustBar />

      {/* The two real addresses, stated plainly before the city list. */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Our addresses</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-ink-900">
              Where the company actually is
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              Everywhere else on this page is a market we serve remotely, and each page says so. These two are
              registered addresses.
            </p>
          </Reveal>

          <div className="mt-7 grid sm:grid-cols-2 gap-4">
            {site.addresses.map((address) => (
              <Reveal key={address} className="h-full">
                <div className="flex h-full gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <Icons.pin className="mt-0.5 w-5 h-5 shrink-0 text-brand-600" />
                  <p className="text-[15px] leading-relaxed text-ink-700">{address}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {countries.map((country, i) => (
        <LinkGrid
          key={country.name}
          eyebrow={i === 0 ? 'By country' : undefined}
          title={country.name}
          items={country.cities}
          tone={i % 2 === 0 ? 'muted' : 'light'}
        />
      ))}

      <Guarantees />
      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  const countries = Object.entries(locationsByCountry).map(([name, cities]) => ({
    name,
    cities: cities.map((l) => ({
      name: l.city,
      href: `/locations/${l.slug}`,
      description: l.intro,
      // Only the two registered addresses carry a badge; the key is omitted
      // entirely elsewhere because getStaticProps cannot serialise undefined.
      ...(l.office ? { meta: 'Registered office' } : {}),
    })),
  }))

  return {
    props: {
      countries,
      items: locationPages.map((l) => ({ name: `${l.city}, ${l.country}`, href: `/locations/${l.slug}` })),
    },
  }
}
