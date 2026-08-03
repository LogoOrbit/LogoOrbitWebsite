import { site } from './site'
import { catalogServices } from './catalog'
import { industryPages } from './industries'
import { locationPages } from './locations'
import { guides } from './guides'

/**
 * The single list of indexable URLs.
 *
 * The sitemap is generated from this rather than maintained by hand, which was
 * the previous arrangement and had already drifted: the static file listed
 * thirteen URLs for a site that now has several hundred.
 */
const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/logo-design', changefreq: 'monthly', priority: '0.9' },
  { path: '/website-design', changefreq: 'monthly', priority: '0.9' },
  { path: '/animation', changefreq: 'monthly', priority: '0.8' },
  { path: '/mobile-application', changefreq: 'monthly', priority: '0.8' },
  { path: '/book-publications', changefreq: 'monthly', priority: '0.8' },
  { path: '/amazon-marketing', changefreq: 'monthly', priority: '0.8' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.9' },
  { path: '/portfolio', changefreq: 'monthly', priority: '0.8' },
  { path: '/industries', changefreq: 'monthly', priority: '0.8' },
  { path: '/locations', changefreq: 'monthly', priority: '0.8' },
  { path: '/guides', changefreq: 'weekly', priority: '0.8' },
  { path: '/resources', changefreq: 'weekly', priority: '0.8' },
  { path: '/glossary', changefreq: 'monthly', priority: '0.7' },
  { path: '/editorial-standards', changefreq: 'yearly', priority: '0.5' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/reviews', changefreq: 'weekly', priority: '0.7' },
  { path: '/faqs', changefreq: 'monthly', priority: '0.7' },
  { path: '/brief', changefreq: 'monthly', priority: '0.8' },
  { path: '/brief/video', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/legal', changefreq: 'yearly', priority: '0.4' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
]

export function allRoutes() {
  return [
    ...staticRoutes,
    ...catalogServices.map((s) => ({ path: `/services/${s.slug}`, changefreq: 'monthly', priority: '0.8' })),
    ...industryPages.map((i) => ({ path: `/industries/${i.slug}`, changefreq: 'monthly', priority: '0.7' })),
    ...locationPages.map((l) => ({ path: `/locations/${l.slug}`, changefreq: 'monthly', priority: '0.6' })),
    ...guides.map((g) => ({
      path: `/guides/${g.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: g.updated,
    })),
    ...[
      'logo-design-process',
      'logo-file-formats',
      'logo-design-cost',
      'brand-identity-checklist',
      'rebranding-checklist',
      'website-design-brief',
      'packaging-design-checklist',
    ].map((slug) => ({
      path: `/resources/${slug}`,
      changefreq: 'yearly',
      priority: '0.7',
      lastmod: '2026-08-03',
    })),
  ]
}

export function sitemapXml() {
  const urls = allRoutes()
    .map(({ path, changefreq, priority, lastmod }) => {
      const loc = `${site.url}${path === '/' ? '/' : path}`
      return [
        '  <url>',
        `<loc>${loc}</loc>`,
        lastmod ? `<lastmod>${lastmod}</lastmod>` : '',
        `<changefreq>${changefreq}</changefreq>`,
        `<priority>${priority}</priority>`,
        '</url>',
      ].join('')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}
