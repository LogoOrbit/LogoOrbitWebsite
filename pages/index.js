import Link from 'next/link'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import BrandStarter from '../components/BrandStarter'
import OfferBand from '../components/OfferBand'
import TrustBar from '../components/TrustBar'
import Marquee from '../components/Marquee'
import Stats from '../components/Stats'
import Services from '../components/Services'
import VideoServices from '../components/VideoServices'
import BriefCTA from '../components/BriefCTA'
import BrandProtectionBand from '../components/BrandProtectionBand'
import Process from '../components/Process'
import Portfolio from '../components/Portfolio'
import WhyUs from '../components/WhyUs'
import About from '../components/About'
import PricingSection from '../components/PricingSection'
import Reveal from '../components/Reveal'
import Guarantees from '../components/Guarantees'
import VideoReviews from '../components/VideoReviews'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import LinkGrid from '../components/LinkGrid'
import { Icons } from '../components/Icons'
import { site, faqs, services } from '../lib/site'
import { logoPackages } from '../lib/pricing'
import { catalogServices } from '../lib/catalog'
import { industryPages } from '../lib/industries'
import { locationPages } from '../lib/locations'
import { guides } from '../lib/guides'
import { videoReviewSchema } from '../lib/videoReviews'
import { ORG_ID, SITE_ID, faqSchema, itemListSchema } from '../lib/seo'

const description =
  'Custom logo concepts within 24 hours. Original logo design, brand identity, websites, UI/UX, animation, apps and print from LogoOrbit, with written rights terms.'

export default function Home({ hubs, popular, sectors, cities, reads }) {
  // The Organization node lives in Layout so every page agrees on it. The home
  // page adds the things that are genuinely page-level: the WebPage itself, the
  // FAQ block below, and the list of what we sell.
  const jsonLd = {
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${site.url}/#webpage`,
        url: site.url,
        name: `${site.name} | Online Logo Maker & Custom Design Services`,
        description,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': ORG_ID },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${site.url}/og-image.png` },
      },
      {
        '@type': 'OfferCatalog',
        '@id': `${site.url}/#catalog`,
        name: 'LogoOrbit design services',
        url: `${site.url}/services`,
        provider: { '@id': ORG_ID },
        itemListElement: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, url: `${site.url}${s.href}` },
        })),
      },
      ...videoReviewSchema(site.url),
      itemListSchema({ path: '/', name: 'Design services', items: popular }),
      faqSchema(faqs, '/'),
    ],
  }

  return (
    <Layout description={description} path="/" jsonLd={jsonLd}>
      <Hero />
      <OfferBand />
      <BrandStarter />
      <TrustBar />
      <Marquee />
      <Stats />
      <Services />
      <BriefCTA />

      <VideoServices />

      <Process />
      {/* The home page shows a taste of the wall; the portfolio page has all of it. */}
      <Portfolio initial={12} showAllLink />
      <WhyUs />
      <About />

      <BrandProtectionBand tone="light" />

      <Guarantees />

      <PricingSection section={logoPackages} tone="muted" />

      <section className="bg-slate-50 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Reveal>
            <p className="text-ink-500">
              Logo packages are just the start, we also price branding kits, animated logos, websites and
              money-saving bundles.
            </p>
            <Link
              href="/pricing"
              className="mt-5 btn-action px-7 py-3.5"
            >
              See all packages &amp; bundles
              <Icons.arrow className="w-4.5 h-4.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <VideoReviews />
      <Testimonials />

      {/* The home page is the strongest page on the site, so the three hubs
          that hold the deeper pages together are linked from it directly
          rather than being reachable only through the footer. */}
      <LinkGrid
        eyebrow="Find your way in"
        title="Three ways to start"
        body="By what you need making, by the sector you are in, or by reading up first. All three lead to the same team."
        items={hubs}
        tone="light"
      />

      <LinkGrid
        eyebrow="Popular services"
        title="The specific things people ask us for"
        items={popular}
        compact
        tone="muted"
      />

      <LinkGrid eyebrow="By industry" title="Sectors we design for" items={sectors} compact tone="light" />

      <LinkGrid eyebrow="Where we work" title="Clients on five continents" items={cities} compact tone="muted" />

      <LinkGrid
        eyebrow="Guides"
        title="Straight answers, before you spend anything"
        items={reads}
        tone="light"
      />

      <CTA />
      <FAQ />
      <Contact />
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: {
      hubs: [
        {
          name: 'Every service we offer',
          href: '/services',
          description: `Six headline services and ${catalogServices.length} specialist ones underneath them, each with its own page and its own price.`,
        },
        {
          name: 'Industries we design for',
          href: '/industries',
          description: `${industryPages.length} sectors, each written around the constraints that actually shape the brief in that market.`,
        },
        {
          name: 'Guides and resources',
          href: '/guides',
          description: `${guides.length} guides on cost, file formats, rebranding, web design and working with designers.`,
        },
      ],
      popular: catalogServices
        .filter((s) =>
          [
            'brand-identity-design',
            'business-card-design',
            'packaging-design',
            'ui-ux-design',
            'landing-page-design',
            'ecommerce-website-design',
            'social-media-design',
            'youtube-thumbnail-design',
            'pitch-deck-design',
            'brochure-design',
            'vehicle-wrap-design',
            'apparel-design',
            'custom-illustration',
            'motion-graphics',
            'book-cover-design',
          ].includes(s.slug)
        )
        .map((s) => ({ name: s.name, href: `/services/${s.slug}` })),
      sectors: industryPages.map((i) => ({ name: i.name, href: `/industries/${i.slug}` })),
      cities: locationPages.map((l) => ({ name: `${l.city}, ${l.country}`, href: `/locations/${l.slug}` })),
      reads: guides
        .slice(0, 6)
        .map((g) => ({ name: g.title, href: `/guides/${g.slug}`, description: g.excerpt })),
    },
  }
}
