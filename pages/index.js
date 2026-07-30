import Head from 'next/head'

import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Stats from '../components/Stats'
import Services from '../components/Services'
import Process from '../components/Process'
import Portfolio from '../components/Portfolio'
import WhyUs from '../components/WhyUs'
import About from '../components/About'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import FloatingCall from '../components/FloatingCall'

import { site, faqs } from '../lib/site'

const title = 'LogoOrbit | Online Logo Maker & Custom Design Services'
const description =
  'Get a custom logo made in minutes. LogoOrbit delivers original logo design, websites, animation, mobile apps, book publication and Amazon marketing — 15+ years, 8,500+ brands, 100% ownership.'

export default function Home() {
  const structuredData = {
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
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={site.url} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={site.url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <Process />
        <Portfolio />
        <WhyUs />
        <About />
        <Pricing />
        <Testimonials />
        <CTA />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <FloatingCall />
    </>
  )
}
