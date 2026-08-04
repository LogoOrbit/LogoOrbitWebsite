/**
 * The current limited-time offer for existing customers.
 *
 * Kept in one place because the same numbers appear in four spots: the offers
 * page, the informative-website page, the home page band and the popup. When
 * the promotion ends, edit `offer.active` here and every surface follows.
 */
export const offer = {
  active: true,
  eyebrow: 'Existing customer offer',
  headline: '70% off everything',
  discount: 70,
  wasPrice: 1000,
  nowPrice: 299,
  href: '/offers',
  shortPitch:
    'Our $1000 websites are now just $299 — 70% off. In fact every service we offer is 70% off right now, exclusively for existing customers like you.',
  terms: [
    'Exclusive to existing LogoOrbit customers.',
    'Limited time only — while the promotion runs.',
    'Applies to every service in our catalogue, not websites alone.',
    'No monthly cost, no yearly cost, 100% ownership rights.',
  ],
}

/**
 * The discounted informative website package. The feature list is the offer
 * sheet verbatim, so the page and the quote a customer is given cannot drift.
 */
export const informativeWebsite = {
  name: 'Informative Website',
  price: 499,
  href: '/offers/informative-website',
  tagline: 'Discounted offer',
  features: [
    'Unlimited Logo Concepts',
    '8 Dedicated Designers',
    'Icon Design',
    'Free Custom Stationery Designs',
    'MS Word Letterhead',
    'Conceptual And Dynamic Liquid Website',
    '8 - 10 Website Pages',
    'Mobile Responsive',
    'Custom Forms',
    'Lead Capturing Forms (Optional)',
    'Newsfeed Integration',
    'Social Media Integration',
    'Search Engine Submission',
    'Stock Images',
    'Unique Banner Designs',
    'JQuery Sliders',
    'Free Google Friendly Sitemap',
    'Complete W3C Certified HTML',
    'All Final File Formats',
    'Dedicated Account Manager',
    '100% Ownership Rights',
    '100% Satisfaction Guarantee',
    '100% Unique Design Guarantee',
    'NO Monthly Cost',
    'NO Yearly Cost',
  ],
}

export const offerPages = [offer.href, informativeWebsite.href]
