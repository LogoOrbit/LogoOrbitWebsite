import Head from 'next/head'
import Nav from './Nav'
import Footer from './Footer'
import FloatingCall from './FloatingCall'
import { site } from '../lib/site'

export default function Layout({ title, description, path = '/', children, jsonLd }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Online Logo Maker & Custom Design Services`
  const canonical = `${site.url}${path === '/' ? '' : path}`

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />

        {jsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}
      </Head>

      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingCall />
    </>
  )
}
