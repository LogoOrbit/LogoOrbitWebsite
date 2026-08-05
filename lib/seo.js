import { site } from './site'

/**
 * Every schema block on the site is minted here so the @id values stay
 * consistent. Google merges nodes by @id, so a Service on a landing page and
 * the same Service referenced from a hub have to agree on their identifier or
 * the graph fragments into duplicates.
 */

export const ORG_ID = `${site.url}/#organization`
export const SITE_ID = `${site.url}/#website`

export function absolute(path = '/') {
  if (!path || path === '/') return site.url
  if (path.startsWith('http')) return path
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Breadcrumbs are the single highest-leverage bit of markup on a deep page:
 * they replace the raw URL in the result with a readable path and they tell
 * the crawler where a page sits without relying on it inferring the hierarchy.
 */
export function breadcrumb(trail) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absolute(trail[trail.length - 1]?.href)}#breadcrumb`,
    itemListElement: [{ name: 'Home', href: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.href),
    })),
  }
}

export function faqSchema(faqs, path) {
  if (!faqs?.length) return null
  return {
    '@type': 'FAQPage',
    '@id': `${absolute(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/**
 * A Service node with an Offer attached. The price is the entry price of the
 * cheapest package that covers the service, which is what a rich result should
 * quote: a shopper comparing two agencies wants the "from" number.
 */
export function serviceSchema({ path, name, description, price, serviceType, areaServed, category }) {
  const node = {
    '@type': 'Service',
    '@id': `${absolute(path)}#service`,
    name,
    description,
    url: absolute(path),
    serviceType: serviceType || name,
    provider: { '@id': ORG_ID },
    areaServed: areaServed || worldAreaServed,
    audience: { '@type': 'BusinessAudience', name: 'Startups, small businesses and enterprise brands' },
  }
  if (category) node.category = category
  if (price) {
    node.offers = {
      '@type': 'Offer',
      price: String(price),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: absolute(path),
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      seller: { '@id': ORG_ID },
    }
  }
  return node
}

/** The markets we actually take work from, said once and reused everywhere. */
export const worldAreaServed = [
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'Canada' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'Australia' },
  { '@type': 'Country', name: 'United Arab Emirates' },
  { '@type': 'Country', name: 'Saudi Arabia' },
  { '@type': 'Country', name: 'Ireland' },
  { '@type': 'Country', name: 'New Zealand' },
  { '@type': 'Country', name: 'Singapore' },
]

export function articleSchema({ path, headline, description, published, updated, keywords }) {
  return {
    '@type': 'Article',
    '@id': `${absolute(path)}#article`,
    headline,
    description,
    url: absolute(path),
    datePublished: published,
    dateModified: updated || published,
    inLanguage: 'en',
    keywords,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    image: `${site.url}/og-image.png`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absolute(path) },
    isPartOf: { '@id': SITE_ID },
  }
}

export function itemListSchema({ path, name, items }) {
  return {
    '@type': 'ItemList',
    '@id': `${absolute(path)}#list`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absolute(item.href),
    })),
  }
}

export function collectionPageSchema({ path, name, description }) {
  return {
    '@type': 'CollectionPage',
    '@id': `${absolute(path)}#collection`,
    name,
    description,
    url: absolute(path),
    isPartOf: { '@id': SITE_ID },
  }
}

export function howToSchema({ path, name, description, steps }) {
  return {
    '@type': 'HowTo',
    '@id': `${absolute(path)}#howto`,
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  }
}

/** The rating block, minted once so no page invents its own numbers. */
export const aggregateRating = {
  '@type': 'AggregateRating',
  ratingValue: site.rating,
  reviewCount: site.reviewCount,
  bestRating: 5,
  worstRating: 1,
}
