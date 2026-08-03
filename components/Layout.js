import Head from 'next/head'
import Nav from './Nav'
import Footer from './Footer'
import FloatingCall from './FloatingCall'
import WhatsAppButton from './WhatsAppButton'
import MobileCTABar from './MobileCTABar'
import { site } from '../lib/site'
import { ORG_ID, SITE_ID, aggregateRating, worldAreaServed } from '../lib/seo'

/**
 * Every page passes through here, so this is where the shared head lives:
 * canonical, robots, social cards and the two schema nodes (Organization and
 * WebSite) that everything else in the graph refers back to by @id.
 */
export default function Layout({
  title,
  description,
  path = '/',
  children,
  jsonLd,
  noIndex = false,
  ogType = 'website',
  image,
  article,
}) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Online Logo Maker & Custom Design Services`
  const canonical = `${site.url}${path === '/' ? '' : path}`
  // Facebook, LinkedIn and X all decline to render an SVG card, so the share
  // image is a raster built from the same mark the header uses.
  const socialImage = image ? `${site.url}${image}` : `${site.url}/og-image.png`

  const baseGraph = [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': ORG_ID,
      name: site.name,
      alternateName: 'Logo Orbit',
      url: site.url,
      logo: { '@type': 'ImageObject', url: `${site.url}/logo.png`, width: 512, height: 512 },
      image: `${site.url}/og-image.png`,
      description:
        'LogoOrbit is a custom design studio providing logo design, brand identity, website design, UI/UX, animation, mobile apps, packaging, print and marketing creative worldwide.',
      email: site.email,
      telephone: site.phone,
      foundingDate: String(new Date().getFullYear() - site.years),
      priceRange: '$$',
      currenciesAccepted: 'USD',
      slogan: 'Original design, delivered fast, owned by you.',
      knowsAbout: [
        'Logo design',
        'Brand identity design',
        'Graphic design',
        'Website design and development',
        'UI/UX design',
        'Packaging design',
        'Motion graphics and animation',
        'Mobile app design',
        'Print design',
        'E-commerce design',
      ],
      areaServed: worldAreaServed,
      address: site.addresses.map((line) => ({ '@type': 'PostalAddress', streetAddress: line })),
      aggregateRating,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '11:00',
        closes: '20:00',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: site.phone,
          email: site.email,
          contactType: 'customer service',
          availableLanguage: ['English', 'Urdu'],
          areaServed: ['US', 'CA', 'GB', 'AU', 'AE', 'PK', 'SA', 'IE', 'NZ', 'SG'],
        },
        {
          '@type': 'ContactPoint',
          email: site.legalEmail,
          contactType: 'legal',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: site.url,
      name: site.name,
      description:
        'Custom logo design, branding, websites, UI/UX, animation and marketing creative from one in-house team.',
      publisher: { '@id': ORG_ID },
      inLanguage: 'en',
    },
  ]

  const pageGraph = jsonLd?.['@graph'] || (jsonLd ? [jsonLd] : [])
  const structuredData = { '@context': 'https://schema.org', '@graph': [...baseGraph, ...pageGraph] }

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta
          name="robots"
          content={
            noIndex
              ? 'noindex,nofollow'
              : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonical} />
        {/* One English page serving every market, so x-default and en point at
            the same URL rather than at localised variants that do not exist. */}
        <link rel="alternate" hrefLang="en" href={canonical} />
        <link rel="alternate" hrefLang="x-default" href={canonical} />

        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${site.name} custom design services`} />
        {article?.published && <meta property="article:published_time" content={article.published} />}
        {article?.updated && <meta property="article:modified_time" content={article.updated} />}
        {article?.section && <meta property="article:section" content={article.section} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
        <meta name="twitter:image:alt" content={`${site.name} custom design services`} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
      <div className="h-[76px] lg:hidden" aria-hidden="true" />
      <FloatingCall />
      <WhatsAppButton />
      <MobileCTABar />
    </>
  )
}
