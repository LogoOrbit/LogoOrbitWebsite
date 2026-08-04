import { money } from './pricing'

/**
 * The current limited-time promotion for existing customers.
 *
 * Everything the offer pages, the home band and the popup say about the deal
 * is derived from this file, so ending or changing the promotion is one edit
 * here rather than a hunt through four components.
 *
 * `endsOn` is a real date, not a rolling timer that resets on every visit. The
 * countdown reads from it, and once it passes the countdown stands down of its
 * own accord rather than lying about how long is left.
 */
export const offer = {
  active: true,
  discount: 70,
  endsOn: '2026-08-31T23:59:59-05:00',
  eyebrow: 'Existing customers only',
  href: '/offers',
}

/** What a listed price becomes under the promotion. */
export const offerPrice = (n) => Math.floor(n * (1 - offer.discount / 100))

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/**
 * The saving, priced from the real catalogue rather than an invented "RRP".
 * Each `was` here is the price the same product carries on /pricing today,
 * which is what makes the right-hand column defensible.
 */
export const dealRows = [
  { name: '5-page website, designed, built and launched', kind: 'Website Design', was: 999, href: '/website-design' },
  { name: 'Ultimate Branding Kit, 16 branded items', kind: 'Brand Identity', was: 749, href: '/services' },
  { name: 'Gold Logo Animation with voice-over', kind: 'Animation', was: 749, href: '/animation' },
  { name: 'Platinum Logo, unlimited concepts', kind: 'Logo Design', was: 279, href: '/logo-design' },
  { name: '3 social ad banners and a flyer design', kind: 'Marketing Creative', was: 299, href: '/amazon-marketing' },
].map((row) => {
  const now = offerPrice(row.was)
  return {
    ...row,
    now,
    saving: row.was - now,
    /**
     * The cart holds the discounted price, so a line added from this page is
     * the promotion rather than the catalogue. The sku is anchored to /offers
     * for that reason: the same product at its normal price is a different
     * line, and the two must never merge in a basket.
     */
    cartItem: {
      sku: `/offers#${slugify(row.name)}`,
      name: row.name,
      kind: `${row.kind} · ${offer.discount}% off`,
      price: now,
      href: '/offers',
    },
  }
})

/** The headline: the number a returning customer is here to see. */
export const headline = {
  was: 1000,
  now: 299,
  get saving() {
    return this.was - this.now
  },
}

/** Three steps between reading this and work starting. */
export const claimSteps = [
  {
    n: '01',
    title: 'Reply “YES”',
    body: 'One word on the form, on WhatsApp or on the phone. Nothing to pay, no card, no commitment at this point.',
  },
  {
    n: '02',
    title: 'Your account manager calls',
    body: 'The same day, in your working hours. They confirm the discounted price in writing before anything starts.',
  },
  {
    n: '03',
    title: 'Designers start within 24 hours',
    body: 'Eight dedicated designers pick it up. First concepts land in your inbox the next working day.',
  },
]

/** The objections that stop a returning customer from saying yes. */
export const offerFaqs = [
  {
    q: 'Am I eligible for this?',
    a: 'If you have ordered from LogoOrbit before, yes. This promotion is not published to new customers, it is a thank-you to the people we have already worked with. Mention your previous order when you get in touch and we will match it to your account.',
  },
  {
    q: 'Is the quality lower at this price?',
    a: 'No. Same designers, same number of concepts, same revisions, same file formats and the same written ownership terms. The discount comes out of our margin during a quiet stretch of the calendar, not out of your project.',
  },
  {
    q: 'Does 70% off really apply to everything?',
    a: 'Every service in our catalogue: logo design, brand identity, websites, animation, mobile apps, book publishing and marketing creative. The only thing priced separately is the $499 copyright assignment certificate, which is a legal instrument rather than a design service.',
  },
  {
    q: 'Do I have to pay it all up front?',
    a: 'No. Larger orders are split 50% to start and 50% when you approve the finished work. Smaller packages are usually settled in one payment, and your account manager will confirm which applies before you commit.',
  },
  {
    q: 'What happens when the offer ends?',
    a: 'Prices go back to the ones published on our pricing page. If you have confirmed your order in writing before the end date, your discounted price is held even if the work itself runs past it.',
  },
  {
    q: 'Can I use it on more than one project?',
    a: 'Yes. There is no limit on how many services you take at the discounted price while the promotion runs, and you can combine them into one order so everything is designed by the same team in the same week.',
  },
]

/**
 * The discounted informative website package.
 *
 * The 25 line items are the offer sheet verbatim, but a wall of 25 ticks is
 * not something anyone reads. They are grouped into the four things a buyer is
 * actually weighing up — the brand, the site, the reach, and what they own at
 * the end — with the full list kept intact underneath.
 */
export const informativeWebsite = {
  name: 'Informative Website',
  price: 499,
  href: '/offers/informative-website',
  tagline: 'Discounted offer',
  summary:
    'A complete brand and an 8 to 10 page website, designed together by one team, for one price paid once. No monthly cost, no yearly cost, and the work is yours.',
  groups: [
    {
      id: 'brand',
      icon: 'logo',
      title: 'Your brand, drawn from scratch',
      lead: 'Before a single page is built, we settle what your business looks like.',
      features: [
        'Unlimited Logo Concepts',
        '8 Dedicated Designers',
        'Icon Design',
        'Free Custom Stationery Designs',
        'MS Word Letterhead',
        'Unique Banner Designs',
      ],
    },
    {
      id: 'website',
      icon: 'website',
      title: 'The website itself',
      lead: 'Eight to ten pages, built to look right on a phone first and load fast everywhere.',
      features: [
        'Conceptual And Dynamic Liquid Website',
        '8 - 10 Website Pages',
        'Mobile Responsive',
        'Custom Forms',
        'Lead Capturing Forms (Optional)',
        'JQuery Sliders',
        'Stock Images',
      ],
    },
    {
      id: 'reach',
      icon: 'search',
      title: 'So people can find it',
      lead: 'Submitted, structured and connected to the places your customers already are.',
      features: [
        'Search Engine Submission',
        'Free Google Friendly Sitemap',
        'Complete W3C Certified HTML',
        'Newsfeed Integration',
        'Social Media Integration',
      ],
    },
    {
      id: 'ownership',
      icon: 'shield',
      title: 'What you walk away with',
      lead: 'The files, the rights and one person who answers the phone.',
      features: [
        'All Final File Formats',
        'Dedicated Account Manager',
        '100% Ownership Rights',
        '100% Satisfaction Guarantee',
        '100% Unique Design Guarantee',
        'NO Monthly Cost',
        'NO Yearly Cost',
      ],
    },
  ],
}

/** The cart line for the discounted package. */
export const informativeCartItem = {
  sku: informativeWebsite.href,
  name: `${informativeWebsite.name} (discounted offer)`,
  kind: 'Offer package',
  price: informativeWebsite.price,
  href: informativeWebsite.href,
}

/** The flat list, still the offer sheet in its original order. */
export const informativeFeatures = informativeWebsite.groups.flatMap((g) => g.features)

/** Questions specific to the $499 package. */
export const packageFaqs = [
  {
    q: `Is ${money(informativeWebsite.price)} really the whole cost?`,
    a: 'Yes. One payment, and every one of the 25 items above is inside it. There is no setup fee, no file-release fee, no monthly charge and no yearly renewal. Hosting and a domain are the only things you would buy elsewhere, and they are yours to own rather than rented from us.',
  },
  {
    q: 'How long does it take?',
    a: 'First logo concepts within 24 hours, the site design in the first week, and a finished 8 to 10 page website inside three to four weeks on a typical project. If you need it faster, say so on the call and we will tell you honestly whether it can be done.',
  },
  {
    q: 'What if I do not like the first designs?',
    a: 'You get unlimited logo concepts, so we keep drawing until one is right. The website design is revised until you approve it. Nothing goes live and nothing is final until you say so.',
  },
  {
    q: 'Can I edit the site myself afterwards?',
    a: 'Yes. You receive all final file formats and full ownership of the work, so you can update it in-house, hand it to another developer, or come back to us. You are not locked into anything.',
  },
  {
    q: 'What is not included?',
    a: 'Domain registration, hosting, paid stock beyond the images we supply, and the separate $499 copyright assignment certificate if you want the logo copyright formally assigned in a signed instrument. Everything else on the list is in the price.',
  },
]

export const offerPages = [offer.href, informativeWebsite.href]
