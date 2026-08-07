import { site, testimonials } from './site'

/**
 * Every schema block on the site is minted here so the @id values stay
 * consistent. Google merges nodes by @id, so a Service on a landing page and
 * the same Service referenced from a hub have to agree on their identifier or
 * the graph fragments into duplicates.
 */

export const ORG_ID = `${site.url}/#organization`
export const SITE_ID = `${site.url}/#website`

/* Evaluated once at build time rather than per node, so every date and notice
   in the graph agrees with every other one on the same deploy. */
const YEAR = new Date().getFullYear()

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

/* -------------------------------------------------------------- Q&A pages --- */

/**
 * The FAQ library is standing reference content rather than a dated feed, so
 * nothing in lib/faqs.js carries a timestamp of its own. Google's Q&A report
 * still wants a date on both the question and the accepted answer, so the day
 * the library went up and the day it was last reviewed are stated once here
 * instead of being invented per page.
 */
export const QA_PUBLISHED = '2026-01-15'
export const QA_UPDATED = '2026-08-01'

/**
 * One question, one answer, on a page of its own.
 *
 * Nobody votes on anything here - there is no voting control on the site - so
 * `upvoteCount` is 0 rather than a flattering number. The field is required by
 * the Q&A rich result and 0 is the honest value for a page with no ballot on
 * it.
 */
export function qaSchema({ path, question, answer, published = QA_PUBLISHED, updated = QA_UPDATED }) {
  const url = absolute(path)
  return {
    '@type': 'QAPage',
    '@id': `${url}#qa`,
    url,
    mainEntity: {
      '@type': 'Question',
      '@id': `${url}#question`,
      name: question,
      text: question,
      answerCount: 1,
      upvoteCount: 0,
      datePublished: published,
      dateModified: updated || published,
      author: { '@id': ORG_ID },
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
        url,
        upvoteCount: 0,
        datePublished: published,
        dateModified: updated || published,
        author: { '@id': ORG_ID },
      },
    },
  }
}

/* ------------------------------------------------------------ image rights --- */

/**
 * Every image we publish is our own work shown under the portfolio clause in
 * the terms, so the licence answer is the same one for all of them: read the
 * clause, and talk to us if you want to use a mark you do not already own.
 * Google's image-metadata report asks for exactly these three fields and drops
 * the licence badge from the result without them.
 */
export const imageLicense = `${site.url}/terms#portfolio`
export const imageAcquireLicensePage = `${site.url}/contact`
export const imageCopyrightNotice = `© ${YEAR} ${site.name}`

/** Every ImageObject on the site, so none of them can forget its rights block. */
export function imageObject({ id, url, name, caption, width, height, encodingFormat = 'image/webp' }) {
  const node = {
    '@type': 'ImageObject',
    contentUrl: url,
    url,
    creator: { '@id': ORG_ID },
    creditText: site.name,
    copyrightNotice: imageCopyrightNotice,
    license: imageLicense,
    acquireLicensePage: imageAcquireLicensePage,
  }
  if (id) node['@id'] = id
  if (name) node.name = name
  if (caption) node.caption = caption
  if (width) node.width = width
  if (height) node.height = height
  if (encodingFormat) node.encodingFormat = encodingFormat
  return node
}

/* ------------------------------------------------------- merchant listings --- */

/** ISO codes for the same markets `worldAreaServed` names in longhand. */
export const merchantCountries = ['US', 'CA', 'GB', 'AU', 'AE', 'SA', 'IE', 'NZ', 'SG']

const shippingDestination = merchantCountries.map((c) => ({
  '@type': 'DefinedRegion',
  addressCountry: c,
}))

/**
 * Almost nothing here goes in a box. Files are delivered over email and the
 * client portal, which in merchant-listing terms is free delivery everywhere
 * we trade, handled the same day or the next one. Saying so explicitly is
 * better than leaving Google to assume an unpriced shipping step exists.
 */
export const digitalShipping = {
  '@type': 'OfferShippingDetails',
  '@id': `${site.url}/#digital-delivery`,
  name: 'Delivered digitally, at no extra cost',
  shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
  shippingDestination,
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
    transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
  },
}

/**
 * The exception: the few packages that include business cards we actually
 * print and put in the post. Still no separate charge, but a printer and a
 * courier are involved, so claiming same-day delivery on those would be a lie
 * told in machine-readable form.
 */
export const printedShipping = {
  '@type': 'OfferShippingDetails',
  '@id': `${site.url}/#print-delivery`,
  name: 'Printed items posted to you, at no extra cost',
  shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
  shippingDestination,
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
    transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 10, unitCode: 'DAY' },
  },
}

/**
 * Commissioned artwork cannot be sent back, and the terms say so: payment is
 * taken up front and what gets refunded is a billing error rather than a
 * change of mind. `MerchantReturnNotPermitted` is the schema value that
 * matches the published terms, and the link points at the clause itself so
 * the claim is checkable rather than asserted.
 */
export const returnPolicy = {
  '@type': 'MerchantReturnPolicy',
  '@id': `${site.url}/#return-policy`,
  name: 'Custom design work is made to order and is not returnable',
  applicableCountry: merchantCountries,
  returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
  merchantReturnLink: `${site.url}/terms#billing`,
}

/** Published prices hold for the calendar year they are published in. */
export const OFFER_VALID_FROM = `${YEAR}-01-01`

/**
 * One Offer shape for the whole site.
 *
 * Every priced node used to write its own Offer, which is how four of them
 * ended up without `validFrom`, a shipping statement or a returns statement
 * while the fifth had them. Minting it here means a merchant listing cannot
 * ship half-dressed again.
 */
export function offerNode({
  price,
  url,
  name,
  description,
  availability = 'https://schema.org/InStock',
  priceValidUntil,
  validFrom = OFFER_VALID_FROM,
  priceCurrency = 'USD',
  shipping = digitalShipping,
}) {
  const node = {
    '@type': 'Offer',
    price: String(price),
    priceCurrency,
    availability,
    itemCondition: 'https://schema.org/NewCondition',
    url,
    validFrom,
    priceValidUntil: priceValidUntil || `${YEAR + 1}-12-31`,
    seller: { '@id': ORG_ID },
    shippingDetails: shipping,
    hasMerchantReturnPolicy: returnPolicy,
  }
  if (name) node.name = name
  if (description) node.description = description
  return node
}

/**
 * The brand behind a product.
 *
 * This used to reference the Organization node by @id, but that node declares
 * itself as both Organization and ProfessionalService, and Google rejected the
 * pair as an invalid object type for `brand`. A plain Brand is unambiguous.
 */
export const brandNode = { '@type': 'Brand', name: site.name }

/**
 * Published client quotes as Review nodes, reusing the same 5-star shape the
 * individual review pages already emit so a product page and a review page
 * cannot disagree about what a client said.
 */
export function clientReviews(count = 3) {
  return testimonials.slice(0, count).map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewBody: t.quote,
    publisher: { '@id': ORG_ID },
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5, worstRating: 1 },
  }))
}

/**
 * A priced package as a Product, with everything the merchant listing and
 * product snippet reports ask for: an image, a real Brand, the rating, a
 * handful of reviews and a fully specified Offer.
 */
export function productSchema({
  path,
  id,
  name,
  description,
  price,
  category,
  image,
  availability,
  priceValidUntil,
  url,
  shipping,
}) {
  const pageUrl = url || absolute(path)
  const images = image ? (Array.isArray(image) ? image : [image]) : [`${site.url}/og-image.png`]
  const node = {
    '@type': 'Product',
    '@id': id || `${pageUrl}#product`,
    name,
    description,
    url: pageUrl,
    image: images,
    brand: brandNode,
    aggregateRating,
    review: clientReviews(),
    offers: offerNode({ price, url: pageUrl, availability, priceValidUntil, shipping }),
  }
  if (category) node.category = category
  return node
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
  if (price) node.offers = offerNode({ price, url: absolute(path) })
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
    image: imageObject({
      url: `${site.url}/og-image.png`,
      name: `${site.name} custom design services`,
      width: 1200,
      height: 630,
      encodingFormat: 'image/png',
    }),
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
