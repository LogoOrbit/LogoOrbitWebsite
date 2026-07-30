import Link from 'next/link'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Marquee from '../components/Marquee'
import Stats from '../components/Stats'
import Services from '../components/Services'
import Process from '../components/Process'
import Portfolio from '../components/Portfolio'
import WhyUs from '../components/WhyUs'
import About from '../components/About'
import PricingSection from '../components/PricingSection'
import Reveal from '../components/Reveal'
import Guarantees from '../components/Guarantees'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import { Icons } from '../components/Icons'
import { site, faqs } from '../lib/site'
import { logoPackages } from '../lib/pricing'

const description =
  'Get a custom logo made in minutes. LogoOrbit delivers original logo design, websites, animation, mobile apps, book publication and Amazon marketing — 15+ years, 8,500+ brands, 100% ownership.'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#business`,
        name: site.name,
        description,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '244 5th Ave. Suite 22',
          addressLocality: 'New York',
          addressRegion: 'NY',
          postalCode: '10001',
          addressCountry: 'US',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: site.rating,
          reviewCount: site.reviewCount,
          bestRating: 5,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '11:00',
          closes: '20:00',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}/#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <Layout description={description} path="/" jsonLd={jsonLd}>
      <Hero />
      <TrustBar />
      <Marquee />
      <Stats />
      <Services />
      <Process />
      <Portfolio />
      <WhyUs />
      <About />

      <Guarantees />

      <PricingSection section={logoPackages} tone="muted" />

      <section className="bg-slate-50 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Reveal>
            <p className="text-ink-500">
              Logo packages are just the start — we also price branding kits, animated logos, websites and
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

      <Testimonials />
      <CTA />
      <FAQ />
      <Contact />
    </Layout>
  )
}
