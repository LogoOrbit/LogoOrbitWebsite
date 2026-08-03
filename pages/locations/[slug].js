import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TrustBar from '../../components/TrustBar'
import Guarantees from '../../components/Guarantees'
import Testimonials from '../../components/Testimonials'
import Reveal from '../../components/Reveal'
import FaqAccordion from '../../components/FaqAccordion'
import LinkGrid from '../../components/LinkGrid'
import { Icons } from '../../components/Icons'
import { site } from '../../lib/site'
import { locationPages, locationBySlug } from '../../lib/locations'
import { industryBySlug } from '../../lib/industries'
import { catalogServices } from '../../lib/catalog'
import { ORG_ID, aggregateRating, breadcrumb, faqSchema, absolute } from '../../lib/seo'

/** The six headline services every location page surfaces. */
const headline = [
  { name: 'Logo Design', href: '/logo-design' },
  { name: 'Website Design', href: '/website-design' },
  { name: 'Brand Identity', href: '/services/brand-identity-design' },
  { name: 'UI/UX Design', href: '/services/ui-ux-design' },
  { name: 'Mobile Apps', href: '/mobile-application' },
  { name: 'Video & Animation', href: '/animation' },
]

export default function LocationPage({ location, sectors, popular, siblings, sameCountry }) {
  const path = `/locations/${location.slug}`
  const title = `Design & Branding in ${location.city}`
  const description = `Logo design, branding, websites and UI/UX for ${location.city} businesses. ${
    location.office ? 'One of our two registered offices.' : 'Worked remotely, delivered digitally, priced in USD.'
  } Free consultation and a fixed quote.`

  const faqs = [
    {
      q: `Do you have an office in ${location.city}?`,
      a: location.office
        ? `Yes. ${location.address}. Most of the work is still done and delivered digitally, so you are not required to visit, but the address is real and the company is registered at it.`
        : `No. We are a remote-first studio with registered addresses in New York and Dover, Delaware, and we work with ${location.city} clients over email, calls and shared files. Everything we produce is delivered digitally, so there is nothing a local office would change about the result.`,
    },
    {
      q: `How do the time zones work for ${location.city} clients?`,
      a: `${location.city} is at UTC ${location.utcOffset}. In practice it makes very little difference: briefs and feedback are handled asynchronously, and where a call is needed we book it at a time that suits you rather than us. Clients furthest from our working hours usually find revisions waiting for them the next morning.`,
    },
    {
      q: 'How do we pay, and in what currency?',
      a: 'Everything is quoted and invoiced in US dollars, and we take card and bank transfer. Your bank handles the conversion, and the price on the quote is the price on the invoice.',
    },
    {
      q: `Can you supply files that work with ${location.city} printers?`,
      a: `Yes. Tell us who is printing and we will match their template, page size and file specification, whether that is US letter and inches or A-series and millimetres. If a printer rejects anything we supplied, we fix it at no charge.`,
    },
  ]

  const jsonLd = {
    '@graph': [
      {
        '@type': location.office ? 'LocalBusiness' : 'Service',
        '@id': `${absolute(path)}#business`,
        name: `${site.name} — ${location.city}`,
        description,
        url: absolute(path),
        image: `${site.url}/og-image.png`,
        ...(location.office
          ? {
              telephone: site.phone,
              email: site.email,
              priceRange: '$$',
              aggregateRating,
              address: {
                '@type': 'PostalAddress',
                streetAddress: location.address,
                addressLocality: location.city,
                addressRegion: location.region,
                addressCountry: location.countryCode,
              },
              parentOrganization: { '@id': ORG_ID },
            }
          : {
              serviceType: 'Graphic design and branding',
              provider: { '@id': ORG_ID },
              areaServed: {
                '@type': 'City',
                name: location.city,
                containedInPlace: { '@type': 'Country', name: location.country },
              },
            }),
      },
      breadcrumb([
        { name: 'Locations', href: '/locations' },
        { name: location.city, href: path },
      ]),
      faqSchema(faqs, path),
    ],
  }

  return (
    <Layout title={title} description={description} path={path} jsonLd={jsonLd}>
      <PageHero
        eyebrow={`${location.city}, ${location.country}`}
        trail={[
          { name: 'Locations', href: '/locations' },
          { name: location.city, href: path },
        ]}
        title={`Design and branding for`}
        highlight={`${location.city} businesses`}
        intro={location.intro}
      >
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/contact" className="group btn-action px-7 py-4">
            Get a free quote
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

      <TrustBar />

      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
                Working with {location.city}
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
                What we see in this market
              </h2>
              <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">{location.localNote}</p>
              <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">
                {location.office
                  ? `We are registered at ${location.address}, and the work itself is produced and delivered digitally by the same in-house team that handles every other project.`
                  : `We do not have a studio in ${location.city}. Everything is worked remotely and delivered digitally, which is how design has been produced for a long time now — you get the same team, the same turnaround and the same files as a client down the road from our registered address.`}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
                <Link href="/brief" className="btn-action px-7 py-3.5">
                  Send a brief
                  <Icons.arrow className="w-4.5 h-4.5" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
                >
                  See pricing
                </Link>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
                <h3 className="text-lg font-bold text-ink-900">The practical details</h3>
                <dl className="mt-5 space-y-4 text-[15px]">
                  <div className="flex gap-3">
                    <Icons.pin className="mt-0.5 w-4.5 h-4.5 shrink-0 text-brand-600" />
                    <div>
                      <dt className="font-semibold text-ink-900">Coverage</dt>
                      <dd className="text-ink-500">
                        {location.city}, {location.region}, {location.country}
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icons.clock className="mt-0.5 w-4.5 h-4.5 shrink-0 text-brand-600" />
                    <div>
                      <dt className="font-semibold text-ink-900">Time zone</dt>
                      <dd className="text-ink-500">UTC {location.utcOffset} · asynchronous by default</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icons.shield className="mt-0.5 w-4.5 h-4.5 shrink-0 text-brand-600" />
                    <div>
                      <dt className="font-semibold text-ink-900">Pricing</dt>
                      <dd className="text-ink-500">Quoted and invoiced in USD, fixed before work starts</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icons.phone className="mt-0.5 w-4.5 h-4.5 shrink-0 text-brand-600" />
                    <div>
                      <dt className="font-semibold text-ink-900">Talk to us</dt>
                      <dd>
                        <a href={site.phoneHref} className="text-brand-600 hover:text-brand-700">{site.phone}</a>
                        <span className="text-ink-500"> · </span>
                        <a href={`mailto:${site.email}`} className="text-brand-600 hover:text-brand-700">
                          {site.email}
                        </a>
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <LinkGrid
        eyebrow="Services"
        title={`What ${location.city} clients order most`}
        items={headline}
        compact
        tone="muted"
      />

      <LinkGrid
        eyebrow="Sectors"
        title={`Industries we work with in ${location.city}`}
        body="These are the sectors that come up most often from this market. Each page covers what actually changes about the brief."
        items={sectors}
        tone="light"
      />

      <Guarantees />

      <FaqAccordion items={faqs} heading={`Working with us from ${location.city}`} eyebrow="FAQs" tone="muted" />

      <Testimonials />

      <LinkGrid
        eyebrow="Popular services"
        title="Everything else we make"
        items={popular}
        compact
        tone="light"
      />

      {sameCountry.length > 0 && (
        <LinkGrid
          eyebrow={location.country}
          title={`Other cities in ${location.country}`}
          items={sameCountry}
          compact
          tone="muted"
        />
      )}

      <LinkGrid
        eyebrow="Worldwide"
        title="Everywhere else we work"
        items={siblings}
        compact
        tone={sameCountry.length > 0 ? 'light' : 'muted'}
      />
    </Layout>
  )
}

export function getStaticPaths() {
  return {
    paths: locationPages.map((l) => ({ params: { slug: l.slug } })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const location = locationBySlug[params.slug]

  const sectors = location.sectors
    .map((slug) => industryBySlug[slug])
    .filter(Boolean)
    .map((i) => ({ name: i.name, href: `/industries/${i.slug}`, description: i.metaDescription }))

  // A rotating slice keyed off the slug, so every location page links out to a
  // different part of the catalogue rather than all of them pointing at the
  // same twelve services.
  const offset = location.slug.length * 7
  const popular = Array.from({ length: 14 }, (_, i) => catalogServices[(offset + i * 3) % catalogServices.length])
    .filter((s, i, arr) => arr.findIndex((x) => x.slug === s.slug) === i)
    .map((s) => ({ name: s.name, href: `/services/${s.slug}` }))

  const sameCountry = locationPages
    .filter((l) => l.country === location.country && l.slug !== location.slug)
    .map((l) => ({ name: l.city, href: `/locations/${l.slug}` }))

  const siblings = locationPages
    .filter((l) => l.country !== location.country)
    .map((l) => ({ name: `${l.city}, ${l.country}`, href: `/locations/${l.slug}` }))

  return { props: { location, sectors, popular, siblings, sameCountry } }
}
