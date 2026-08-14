/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },

  /**
   * Issued client certificates live in `clients/`, outside `public/`, because
   * everything in `public/` is served at the site root with no auth and a URL
   * guessable from the client's own name - and these documents carry a client's
   * legal name and home address. /api/clients/[id] reads them from disk after
   * checking the session.
   *
   * Nothing imports those PDFs, so Next's dependency tracing has no reason to
   * believe the serverless bundle needs them, and the route would answer 404 in
   * production while working perfectly in `next dev`. This says otherwise.
   */
  outputFileTracingIncludes: {
    '/api/clients/[id]': ['./clients/**/*.pdf'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          /* SAMEORIGIN rather than DENY, and 'self' rather than 'none' below.
             Chrome draws a PDF inside a child frame of the page that served
             it, so DENY does not just stop other sites embedding us - it stops
             our own specimen PDF from rendering, and /documents/*.pdf opens as
             a blank grey page. Clickjacking is a cross-origin attack, and both
             of these still refuse every foreign ancestor. */
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'" },
        ],
      },
      {
        source: '/brief/:path*.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      /* The client portal and the documents it serves. The page already sets
         noIndex through Layout, but a meta tag only helps for something a
         crawler renders - the PDF stream is not, and a certificate in a search
         index has already leaked. Sent as a header so it covers both. */
      {
        source: '/clients',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
      {
        source: '/api/clients/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ]
  },

  /**
   * Names this site has been asked for but never served.
   *
   * Search Console reports not-found pages for URLs nobody here links to:
   * they come from the old site, from directory listings, from somebody
   * typing the name they expected. Until now every one of them landed on a
   * 404, which Google records against the site and keeps re-crawling.
   *
   * Each entry below is the obvious alias of a page that exists - the plural,
   * the hyphenated long form, the word another agency would have used - and
   * sends it to the real page with a permanent redirect, so the equity
   * follows and the URL stops being re-crawled as missing.
   */
  async redirects() {
    const alias = {
      '/home': '/',
      '/index.html': '/',
      '/logo': '/logo-design',
      '/logos': '/logo-design',
      '/logo-designing': '/logo-design',
      '/branding': '/services/brand-identity-design',
      '/graphic-design': '/services',
      '/web-design': '/website-design',
      '/web-development': '/website-design',
      '/websites': '/website-design',
      '/ecommerce': '/services/ecommerce-website-design',
      '/apps': '/mobile-application',
      '/app-development': '/mobile-application',
      '/mobile-app': '/mobile-application',
      '/animations': '/animation',
      '/video-animation': '/animation',
      '/motion-graphics': '/services/motion-graphics',
      '/book-publishing': '/book-publications',
      '/amazon': '/amazon-marketing',
      '/digital-marketing': '/amazon-marketing',
      '/work': '/portfolio',
      '/our-work': '/portfolio',
      '/gallery': '/portfolio',
      '/packages': '/pricing/packages',
      '/plans': '/pricing',
      '/prices': '/pricing',
      '/faq': '/faqs',
      '/testimonials': '/reviews',
      '/about-us': '/about',
      '/contact-us': '/contact',
      '/quote': '/contact',
      '/get-a-quote': '/contact',
      '/privacy-policy': '/privacy',
      '/terms-of-service': '/terms',
      '/terms-and-conditions': '/terms',
      '/refund-policy': '/terms',
      '/blog/index': '/blog',
    }

    return Object.entries(alias).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }))
  },
}

module.exports = nextConfig
