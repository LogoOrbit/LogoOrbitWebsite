import Head from 'next/head'
import Nav from './Nav'
import Footer from './Footer'
import FloatingCall from './FloatingCall'
import WhatsAppButton from './WhatsAppButton'
import MobileCTABar from './MobileCTABar'
import { site } from '../lib/site'

export default function Layout({ title, description, path = '/', children, jsonLd, noIndex = false }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Online Logo Maker & Custom Design Services`
  const canonical = `${site.url}${path === '/' ? '' : path}`
  // Facebook, LinkedIn and X all decline to render an SVG card, so the share
  // image is a raster built from the same mark the header uses.
  const socialImage = `${site.url}/og-image.png`
  const baseGraph = [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/logo.png`,
      email: site.email,
      telephone: site.phone,
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { '@id': `${site.url}/#organization` },
      inLanguage: 'en-US',
    },
  ]
  const pageGraph = jsonLd?.['@graph'] || (jsonLd ? [jsonLd] : [])
  const structuredData = { '@context': 'https://schema.org', '@graph': [...baseGraph, ...pageGraph] }

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${site.name} custom design services`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />

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
