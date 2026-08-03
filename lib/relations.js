import { servicePages } from './pages'
import { serviceBySlug } from './catalog'
import { industryBySlug } from './industries'
import { guideBySlug } from './guides'

/**
 * Turns the slug lists on a flagship service page into the link objects
 * LinkGrid expects.
 *
 * This runs at build time from getStaticProps rather than inside the component,
 * so the six flagship pages ship the resolved links in their HTML instead of
 * pulling the whole catalogue into the client bundle to look them up.
 */
export function serviceRelations(key) {
  const page = servicePages[key]

  return {
    related: (page.relatedCatalog || [])
      .map((slug) => serviceBySlug[slug])
      .filter(Boolean)
      .map((s) => ({ name: s.name, href: `/services/${s.slug}`, description: s.metaDescription, meta: s.priceLabel })),

    industries: (page.industrySlugs || [])
      .map((slug) => industryBySlug[slug])
      .filter(Boolean)
      .map((i) => ({ name: i.name, href: `/industries/${i.slug}` })),

    guides: (page.guideSlugs || [])
      .map((slug) => guideBySlug[slug])
      .filter(Boolean)
      .map((g) => ({ name: g.title, href: `/guides/${g.slug}`, description: g.excerpt })),
  }
}
