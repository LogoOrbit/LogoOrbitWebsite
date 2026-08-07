import { site } from './site'
import { servicePages } from './pages'
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
import { resources, glossary } from './resources'

/**
 * Every searchable page on the site, flattened to one shape.
 *
 * This mirrors lib/routes.js in spirit: rather than maintaining a hand-picked
 * shortlist of "important" pages, the index is generated from the same data
 * modules the pages themselves render from, so a new service, guide or
 * location is searchable the moment it exists. Anything not indexable from
 * its own data (the handful of one-off pages like /contact or /terms) is
 * listed once, by hand, below.
 */

const trim = (text, max) => {
  if (!text) return ''
  const clean = String(text).trim()
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean
}

const staticPages = [
  { title: 'Home', url: '/', description: `${site.name} - custom logo design, websites, animation, apps and marketing.`, category: 'Page' },
  { title: 'All services', url: '/services', description: 'The full catalogue: every service LogoOrbit offers, in one place.', category: 'Page' },
  { title: 'Pricing', url: '/pricing', description: 'Every package and its price, from single logos to full brand programmes.', category: 'Page' },
  { title: 'Every package, one per page', url: '/pricing/packages', description: 'Every pricing tier on the site, each with its own page and spec.', category: 'Page' },
  { title: 'Portfolio', url: '/portfolio', description: 'Real client work: logos, websites and animation delivered by the studio.', category: 'Page' },
  { title: 'Logo design portfolio', url: '/portfolio/logo-design', description: 'Original logo marks drawn in-house, shown by industry.', category: 'Page' },
  { title: 'Website design portfolio', url: '/portfolio/website-design', description: 'Live sites designed and built by the studio.', category: 'Page' },
  { title: 'Logo animation portfolio', url: '/portfolio/animation', description: 'Animated logo stings and motion graphic sequences.', category: 'Page' },
  { title: 'Industries', url: '/industries', description: 'Design work broken down by the sector it was made for.', category: 'Page' },
  { title: 'Locations', url: '/locations', description: 'Where LogoOrbit works from, and the markets clients come from.', category: 'Page' },
  { title: 'Guides', url: '/guides', description: 'Long-form, evergreen answers to the questions people ask before buying.', category: 'Page' },
  { title: 'Resources', url: '/resources', description: 'Practical, step-by-step reference articles on design and production.', category: 'Page' },
  { title: 'Glossary', url: '/glossary', description: 'Plain-English definitions of common design and branding terms.', category: 'Page' },
  { title: 'From the studio (blog)', url: '/blog', description: 'Dated posts on how the studio works and what is changing in briefs.', category: 'Page' },
  { title: 'Meet the team', url: '/team', description: 'The named people a client actually talks to, and what each one handles.', category: 'Page' },
  { title: 'About LogoOrbit', url: '/about', description: `${site.years}+ years designing brand identities for startups, SMEs and larger ventures.`, category: 'Page' },
  { title: 'Client reviews', url: '/reviews', description: `${site.reviewCount.toLocaleString('en-US')}+ reviews at a ${site.rating}-star average.`, category: 'Page' },
  { title: 'FAQs', url: '/faqs', description: 'Every question support gets asked twice a week, answered plainly.', category: 'Page' },
  { title: 'Start a brief', url: '/brief', description: 'Tell us what you need and get a designer assigned to it.', category: 'Page' },
  { title: 'Video brief', url: '/brief/video', description: 'Start a brief for logo animation, editing or a YouTube package.', category: 'Page' },
  { title: 'USPTO trademark brief', url: '/brief/trademark', description: 'The intake form for a US trademark filing: the mark, the legal owner, the goods and services and your dates of first use.', category: 'Page' },
  { title: 'Contact us', url: '/contact', description: `Call, email or message the team. ${site.hours}.`, category: 'Page' },
  { title: 'Copyright certificate', url: '/copyright-certificate', description: 'The $499 written copyright assignment that transfers logo ownership to you.', category: 'Page' },
  { title: 'Trademark filing', url: '/trademark-filing', description: 'USPTO trademark clearance search and filing, from $599 plus government fees.', category: 'Page' },
  { title: 'Legal', url: '/legal', description: 'Terms, privacy and the studio’s legal counsel.', category: 'Page' },
  { title: 'Terms of service', url: '/terms', description: 'The terms that govern working with LogoOrbit.', category: 'Page' },
  { title: 'Privacy policy', url: '/privacy', description: 'How LogoOrbit collects, uses and protects your information.', category: 'Page' },
  { title: 'Editorial standards', url: '/editorial-standards', description: 'How guides, blog posts and resources on this site are written and kept current.', category: 'Page' },
]

function buildIndex() {
  const entries = [...staticPages]

  for (const page of Object.values(servicePages)) {
    entries.push({
      title: page.eyebrow,
      description: trim(page.metaDescription || page.intro, 180),
      url: page.slug,
      category: 'Service',
    })
  }

  for (const s of catalogServices) {
    entries.push({
      title: s.name,
      description: trim(s.metaDescription || s.intro, 180),
      url: `/services/${s.slug}`,
      category: 'Service',
    })
  }

  for (const i of industryPages) {
    entries.push({
      title: `${i.name} design`,
      description: trim(i.metaDescription || i.intro, 180),
      url: `/industries/${i.slug}`,
      category: 'Industry',
    })
  }

  for (const l of locationPages) {
    entries.push({
      title: `${l.city}, ${l.region}`,
      description: trim(l.intro, 180),
      url: `/locations/${l.slug}`,
      category: 'Location',
    })
  }

  for (const g of guides) {
    entries.push({
      title: g.title,
      description: trim(g.metaDescription || g.excerpt, 180),
      url: `/guides/${g.slug}`,
      category: 'Guide',
    })
  }

  for (const p of posts) {
    entries.push({
      title: p.title,
      description: trim(p.metaDescription || p.excerpt, 180),
      url: `/blog/${p.slug}`,
      category: 'Blog',
    })
  }

  for (const r of resources) {
    entries.push({
      title: r.title,
      description: trim(r.description, 180),
      url: `/resources/${r.slug}`,
      category: 'Resource',
    })
  }

  for (const [term, definition] of glossary) {
    entries.push({
      title: term,
      description: trim(definition, 180),
      url: `/glossary#letter-${term[0].toUpperCase()}`,
      category: 'Glossary',
    })
  }

  for (const p of team) {
    entries.push({
      title: p.name,
      description: trim(`${p.role} - ${p.tagline}`, 180),
      url: `/team/${p.slug}`,
      category: 'Team',
    })
  }

  for (const p of packages) {
    entries.push({
      title: `${p.name} - ${p.sectionTitle || p.familyLabel}`,
      description: trim(p.bestFor || p.metaDescription, 180),
      url: `/pricing/${p.slug}`,
      category: 'Pricing',
    })
  }

  for (const f of faqItems) {
    entries.push({
      title: f.q,
      description: trim(f.a, 180),
      url: `/faqs/${f.slug}`,
      category: 'FAQ',
    })
  }

  for (const r of reviewPages) {
    entries.push({
      title: `${r.name} - ${r.company}`,
      description: trim(r.quote, 180),
      url: `/reviews/${r.slug}`,
      category: 'Review',
    })
  }

  for (const c of caseStudies) {
    entries.push({
      title: c.title,
      description: trim(c.metaDescription, 180),
      url: `/portfolio/${c.slug}`,
      category: 'Portfolio',
    })
  }

  for (const w of websiteCaseStudies) {
    entries.push({
      title: w.name,
      description: trim(w.tagline || w.body, 180),
      url: `/portfolio/websites/${w.slug}`,
      category: 'Website portfolio',
    })
  }

  return entries
}

let cached = null

/** Computed once per server instance; the underlying data only changes at deploy time. */
export function getSearchIndex() {
  if (!cached) cached = buildIndex()
  return cached
}
