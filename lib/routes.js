import { site } from './site'
import { catalogServices } from './catalog'
import { industryPages } from './industries'
import { locationPages } from './locations'
import { guides } from './guides'
import { posts } from './blog'
import { team } from './team'
import { caseStudies } from './casestudies'
import { websiteCaseStudies } from './websites'
import { packages } from './packages'
import { faqItems } from './faqs'
import { reviewPages } from './reviews'

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
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/team', changefreq: 'monthly', priority: '0.7' },
  { path: '/pricing/packages', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/reviews', changefreq: 'weekly', priority: '0.7' },
  { path: '/faqs', changefreq: 'monthly', priority: '0.7' },
  { path: '/brief', changefreq: 'monthly', priority: '0.8' },
  { path: '/brief/video', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/legal', changefreq: 'yearly', priority: '0.4' },
  { path: '/copyright-certificate', changefreq: 'monthly', priority: '0.8', lastmod: '2026-08-04' },
  { path: '/trademark-filing', changefreq: 'monthly', priority: '0.8', lastmod: '2026-08-04' },
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
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: p.updated,
    })),
    ...team.map((p) => ({ path: `/team/${p.slug}`, changefreq: 'monthly', priority: '0.6' })),
    ...packages.map((p) => ({ path: `/pricing/${p.slug}`, changefreq: 'monthly', priority: '0.7' })),
    ...caseStudies.map((c) => ({ path: `/portfolio/${c.slug}`, changefreq: 'monthly', priority: '0.5' })),
    ...websiteCaseStudies.map((w) => ({
      path: `/portfolio/websites/${w.slug}`,
      changefreq: 'monthly',
      priority: '0.6',
    })),
    ...faqItems.map((f) => ({ path: `/faqs/${f.slug}`, changefreq: 'monthly', priority: '0.5' })),
    ...reviewPages.map((r) => ({ path: `/reviews/${r.slug}`, changefreq: 'monthly', priority: '0.5' })),
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
