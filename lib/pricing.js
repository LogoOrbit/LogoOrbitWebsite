/**
 * Package catalogue.
 *
 * The pricing page is read by people who do not buy design for a living, so
 * every item carries three plain-English fields alongside the raw spec list:
 *
 *   bestFor    — one sentence naming the sort of business the tier suits
 *   highlights — the three or four things that actually differ between tiers
 *   features   — the complete spec list, kept behind a "show everything" toggle
 *
 * `price` / `was` are numbers so they can be formatted, compared and totalled.
 * `includes` lists the component products of a bundle with their own price.
 * `groups` is used by the wide multi-column packages.
 */

export const money = (n) => `$${n.toLocaleString('en-US')}`

/**
 * Bundle "was" prices are derived from the component products rather than
 * stored, so the strikethrough, the saving and the percentage can never
 * disagree with the line items shown on the card.
 */
const withTotals = (section) => {
  const items = section.items.map((item) => {
    const was = item.includes.reduce((sum, part) => sum + part.price, 0)
    const saving = was - item.price
    return { ...item, was, saving, savingPct: Math.round((saving / was) * 100) }
  })

  // Exactly one card per group is flagged as the biggest discount, so the
  // claim on the badge is always the true maximum rather than a guess.
  const best = items.reduce((a, b) => (b.savingPct > a.savingPct ? b : a))

  return {
    ...section,
    maxSavingPct: best.savingPct,
    items: items.map((item) => (item === best ? { ...item, bestSaving: true } : item)),
  }
}

const _bundles3in1 = {
  id: 'bundles-3in1',
  title: 'Logo + Branding Kit + Website',
  subtitle: '3 in 1',
  blurb:
    'Everything needed to open the doors: the mark, the printed basics and the website — bought together for less than the three parts cost separately.',
  items: [
    {
      name: 'Basic',
      price: 499,
      bestFor: 'A brand-new business that needs to be online quickly on the smallest budget.',
      highlights: ['One-page website', 'Logo with print-ready files', 'Card, letterhead and envelope'],
      includes: [
        { label: 'Single Page Website', price: 399 },
        { label: 'Silver Logo', price: 99 },
        { label: 'Basic Branding Kit', price: 59 },
      ],
    },
    {
      name: 'Pro',
      price: 999,
      featured: true,
      badge: 'Most popular',
      bestFor: 'Most small businesses — a proper 5-page website, a strong logo and every print basic covered.',
      highlights: ['5-page website', 'Top-tier logo with editable files', 'Full stationery and social covers'],
      includes: [
        { label: 'Static Website (5 pages)', price: 699 },
        { label: 'Platinum Logo', price: 189 },
        { label: 'Corporate Branding Kit', price: 199 },
      ],
    },
    {
      name: 'Corporate',
      price: 1499,
      bestFor: 'Businesses that want to add and edit their own pages without calling a developer.',
      highlights: ['Website you can update yourself', 'Top-tier logo', 'Signage and vehicle branding included'],
      includes: [
        { label: 'Dynamic Website (5 pages)', price: 1199 },
        { label: 'Platinum Logo', price: 189 },
        { label: 'Corporate Branding Kit', price: 199 },
      ],
    },
    {
      name: 'Ultimate',
      price: 1999,
      bestFor: 'Anyone selling products online — the website comes with a working store built in.',
      highlights: ['Online store with cart and payments', 'Top-tier logo', 'Every branded asset we make'],
      includes: [
        { label: 'E-Commerce Website', price: 1699 },
        { label: 'Platinum Logo', price: 189 },
        { label: 'Ultimate Branding Kit', price: 499 },
      ],
    },
  ],
}

const _bundles2in1 = {
  id: 'bundles-2in1',
  title: 'Logo + Branding Kit',
  subtitle: '2 in 1',
  blurb:
    'A logo on its own is only half the job. These pair the mark with the cards, letterheads and social covers it has to live on.',
  items: [
    {
      name: 'Basic',
      price: 89,
      bestFor: 'Testing an idea and wanting a logo plus the print basics for the lowest price.',
      highlights: ['2 logo concepts', 'Card, letterhead and envelope'],
      includes: [
        { label: 'Bronze Logo', price: 49 },
        { label: 'Basic Branding Kit', price: 59 },
      ],
    },
    {
      name: 'Pro',
      price: 219,
      featured: true,
      badge: 'Most popular',
      bestFor: 'A new business that will be handing out cards and posting on social media from day one.',
      highlights: ['4 logo concepts', 'Social covers and email signature', 'T-shirt and web banner'],
      includes: [
        { label: 'Silver Logo', price: 99 },
        { label: 'Pro Branding Kit', price: 149 },
      ],
    },
    {
      name: 'Corporate',
      price: 299,
      bestFor: 'An established business that needs signage, vehicle stickers and a full stationery set.',
      highlights: ['6 logo concepts, unlimited revisions', '4 social covers', 'Signage and car stickers'],
      includes: [
        { label: 'Gold Logo', price: 139 },
        { label: 'Corporate Branding Kit', price: 199 },
      ],
    },
    {
      name: 'Ultimate',
      price: 599,
      bestFor: 'A brand that wants every asset covered in one go, with nothing left to buy later.',
      highlights: ['Unlimited logo concepts', 'Editable master files', 'Every branded asset we produce'],
      includes: [
        { label: 'Platinum Logo', price: 189 },
        { label: 'Ultimate Branding Kit', price: 499 },
      ],
    },
  ],
}

export const bundles3in1 = withTotals(_bundles3in1)
export const bundles2in1 = withTotals(_bundles2in1)

export const logoPackages = {
  id: 'logo-packages',
  title: 'Logo Design',
  subtitle: 'Logo packages',
  blurb: 'Every tier is drawn by hand for your business — no templates, no stock marks.',
  items: [
    {
      name: 'Bronze',
      kind: 'Logo',
      price: 49,
      bestFor: 'A quick, low-cost mark for a side project or something temporary.',
      highlights: ['2 designs to choose from', '3 rounds of changes', 'Web files only — no print files'],
      features: ['2 Logo Concepts', '3 Revisions', 'No High Res. files', '48 hours Delivery'],
    },
    {
      name: 'Silver',
      kind: 'Logo',
      price: 99,
      bestFor: 'A first real logo, with the files you need for both print and web.',
      highlights: ['4 designs to choose from', '6 rounds of changes', 'Print-ready files', 'You own the copyright'],
      features: [
        '4 Logo Concepts',
        '6 Revisions',
        'Custom Logo',
        'Vector PDF File',
        '48 hours Delivery',
        'HQ PNG + JPEG',
        '100% Ownership',
      ],
    },
    {
      name: 'Gold',
      kind: 'Logo',
      price: 139,
      featured: true,
      badge: 'Most popular',
      bestFor: 'Most businesses — more designs to pick from and changes until you are happy.',
      highlights: ['6 designs to choose from', 'Unlimited changes', 'Ready in 24–48 hours', 'You own the copyright'],
      features: [
        '6 Logo Concepts',
        'Unlimited Revisions',
        'Custom Logo',
        'Vector EPS, PDF file',
        '24–48 H Delivery',
        'HQ PNG + JPEG',
        '100% Ownership',
      ],
    },
    {
      name: 'Platinum',
      kind: 'Logo',
      price: 189,
      bestFor: 'Businesses that want the editable master file and a matching business card.',
      highlights: [
        'Unlimited designs and changes',
        'Editable master file (Ai)',
        'Business card designed to match',
      ],
      features: [
        'Unlimited Concepts',
        'Unlimited Revisions',
        'Custom Logo',
        'Editable Vector Ai',
        '24–48 H Delivery',
        'Vector EPS, PDF',
        'HQ PNG + JPEG',
        '100% Ownership',
        'Business Card Design',
      ],
    },
  ],
  compare: {
    columns: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    rows: [
      { label: 'Designs to choose from', values: ['2', '4', '6', 'Unlimited'] },
      { label: 'Rounds of changes', values: ['3', '6', 'Unlimited', 'Unlimited'] },
      { label: 'Delivery', values: ['48 hours', '48 hours', '24–48 hours', '24–48 hours'] },
      { label: 'Files for print (PDF, EPS)', values: [false, 'PDF', 'PDF + EPS', 'PDF + EPS'] },
      { label: 'Editable master file (Ai)', values: [false, false, false, true] },
      { label: 'Business card design', values: [false, false, false, true] },
      { label: 'You own the copyright', values: [false, true, true, true] },
    ],
  },
}

export const animatedLogo = {
  id: 'animated-logo',
  title: 'Logo Animation',
  subtitle: 'Animated logo',
  blurb:
    'Your finished logo turned into a short moving clip — the bit at the start or end of a video, an ad or a presentation.',
  items: [
    {
      name: 'Bronze',
      kind: 'Animated Logo',
      price: 299,
      bestFor: 'A short intro or outro for social videos on a small budget.',
      highlights: ['Up to 4 seconds', 'Ready-made animation style', 'Music and sound effects included'],
      features: [
        'Up to 4 Seconds',
        'HD Quality 1920 × 1080',
        '72 Hrs Delivery Time',
        'Dedicated Specialist Logo Animator',
        'Template Base Logo Animation',
        'Royalty free BG & SFX',
      ],
      samples: [
        { label: 'Sample video 1', url: 'https://www.dropbox.com/s/o4jdybe127mxbhr/option%202%20final.mp4?raw=1' },
        { label: 'Sample video 2', url: 'https://www.dropbox.com/s/4zeiplmcqq1sr57/The%20Living%20Logo%20Option%202%20HD%201080.mp4?raw=1' },
      ],
    },
    {
      name: 'Silver',
      kind: 'Animated Logo',
      price: 399,
      bestFor: 'A custom animation for a YouTube channel or a company video.',
      highlights: ['Up to 8 seconds', 'Animation built for your logo', 'Animated tagline text'],
      features: [
        'Up to 8 Seconds',
        'HD Quality 1920 × 1080',
        '72 Hrs Delivery Time',
        'Dedicated Specialist Logo Animator',
        'Custom Animation',
        'Text Base Logo Animation',
        'Royalty free BG & SFX',
      ],
      samples: [
        { label: 'Sample video 1', url: 'https://www.dropbox.com/s/jahcrnvtcb4jp4b/RCE%20Trading.mp4?raw=1' },
        { label: 'Sample video 2', url: 'https://www.dropbox.com/s/6wnr8ghzv840k34/Be_Great_At_Life_FINAL.mp4?raw=1' },
      ],
    },
    {
      name: 'Gold',
      kind: 'Animated Logo',
      price: 499,
      featured: true,
      badge: 'Most popular',
      bestFor: 'Ads and presentations where the opener has to look properly bespoke.',
      highlights: ['Up to 10 seconds', 'Custom motion graphics', 'Voice-over of your tagline'],
      features: [
        'Up to 10 Seconds',
        'HD Quality 1920 × 1080',
        '72 Hrs Delivery Time',
        'Dedicated Specialist Logo Animator',
        'Tagline Voice Over',
        'Custom motion graphic logo animation',
        'Royalty free BG & SFX',
      ],
      samples: [
        { label: 'Sample video 1', url: 'https://www.dropbox.com/s/yw0fib4g4tzwdy4/Carbeli%20Logo%20Animation.mp4?raw=1' },
        { label: 'Sample video 2', url: 'https://www.dropbox.com/s/te49xkhbzp70nxy/Dark_Shadow_Paranormal_FF.mp4?raw=1' },
      ],
    },
    {
      name: 'Platinum',
      kind: 'Animated Logo',
      price: 899,
      bestFor: 'A longer, cinematic opener with 3D depth and effects.',
      highlights: ['Up to 20 seconds', '3D effects', 'Fully custom animation'],
      features: [
        'Up to 20 Seconds',
        'HD Quality 1920 × 1080',
        '72 Hrs Delivery Time',
        'Dedicated Specialist Logo Animator',
        'Custom Logo animation with element 3D effects',
        'Royalty free BG & SFX',
      ],
      samples: [
        { label: 'Sample video 1', url: 'https://www.dropbox.com/s/g7lkg7i29m13ymv/TGT%20Builders%2003.mp4?raw=1' },
        { label: 'Sample video 2', url: 'https://www.dropbox.com/sh/mxk2dmagry58tyx/AAC74ybeDvXfBsSCQ4Oy3b0Aa?raw=1' },
      ],
    },
  ],
  compare: {
    columns: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    rows: [
      { label: 'Length', values: ['4 seconds', '8 seconds', '10 seconds', '20 seconds'] },
      { label: 'Animation style', values: ['Ready-made', 'Custom', 'Custom motion graphics', 'Custom with 3D effects'] },
      { label: 'Animated tagline text', values: [false, true, true, true] },
      { label: 'Voice-over', values: [false, false, true, false] },
      { label: 'Full HD 1920 × 1080', values: [true, true, true, true] },
      { label: 'Music and sound effects', values: [true, true, true, true] },
      { label: 'Delivery', values: ['72 hours', '72 hours', '72 hours', '72 hours'] },
    ],
  },
}

export const brandingKits = {
  id: 'branding-kits',
  title: 'Branding Kit',
  subtitle: 'Branding kits',
  blurb:
    'A branding kit is your logo applied to the everyday things a business hands out, prints or posts — business cards, letterheads, social covers and the rest.',
  items: [
    {
      name: 'Basic',
      kind: 'Branding Kit',
      price: 59,
      bestFor: 'The three things every business gets asked for: card, letterhead, envelope.',
      highlights: ['Business card', 'Letterhead', 'Envelope'],
      features: ['Business Card', 'Letterhead', 'Envelope'],
    },
    {
      name: 'Startup',
      kind: 'Branding Kit',
      price: 99,
      bestFor: 'A new business that also needs its social pages and emails to match.',
      highlights: ['Everything in Basic', '2 social media covers', 'Email signature'],
      features: ['Business Card', 'Letterhead', 'Envelope', 'Email Signature', '2 Social Covers'],
    },
    {
      name: 'Pro',
      kind: 'Branding Kit',
      price: 149,
      featured: true,
      badge: 'Most popular',
      bestFor: 'Businesses that print merchandise and run online ads.',
      highlights: ['Everything in Startup', 'T-shirt design', 'Web banner for ads'],
      features: [
        'Business Card',
        'Letterhead',
        'Envelope',
        'Email Signature',
        '2 Social Covers',
        'T-Shirt',
        'Web Banner',
      ],
    },
    {
      name: 'Corporate',
      kind: 'Branding Kit',
      price: 199,
      bestFor: 'Shops, offices and vehicles — branded inside and out.',
      highlights: ['Everything in Pro', '4 social media covers', 'Shop signage and car stickers'],
      features: [
        'Business Card',
        'Letterhead',
        'Envelope',
        'Email Signature',
        '4 Social Covers',
        'T-Shirt',
        'Signage Design',
        'Car Stickers',
        'Web Banner',
      ],
    },
  ],
  compare: {
    columns: ['Basic', 'Startup', 'Pro', 'Corporate'],
    rows: [
      { label: 'Business card', values: [true, true, true, true] },
      { label: 'Letterhead and envelope', values: [true, true, true, true] },
      { label: 'Email signature', values: [false, true, true, true] },
      { label: 'Social media covers', values: [false, '2', '2', '4'] },
      { label: 'T-shirt design', values: [false, false, true, true] },
      { label: 'Web banner', values: [false, false, true, true] },
      { label: 'Shop signage', values: [false, false, false, true] },
      { label: 'Car stickers', values: [false, false, false, true] },
    ],
  },
}

export const websitePackages = {
  id: 'website-packages',
  title: 'Website',
  subtitle: 'Website packages',
  blurb:
    'Designed and built by the same team, on any screen size, ready for Google. You own the finished site.',
  items: [
    {
      name: 'Static',
      kind: 'Website',
      price: 699,
      bestFor: 'A simple, fast brochure site when your content rarely changes.',
      highlights: ['5 pages', 'Built for Google from day one', 'We update the content for you'],
      features: [
        '5 Page Static Website',
        'jQuery Slider Banner',
        'W3C Certified HTML',
        'UI Design',
        '3 Banner Design',
        'Favicon',
        'SEO Friendly Design',
      ],
    },
    {
      name: 'Dynamic',
      kind: 'Website',
      price: 1199,
      featured: true,
      badge: 'Most popular',
      bestFor: 'Most businesses — the same site, but you can change the content yourself.',
      highlights: ['5 pages you can edit yourself', 'Social media feeds connected', '10 stock photos included'],
      features: [
        'Web Development',
        '5 Pages Dynamic Website',
        'jQuery Slider Banner',
        'W3C Certified HTML',
        'Web Design & UI',
        '10 Stock Images',
        '5 Banner Designs',
        'Advance UI Effects',
        'SEO Friendly Design',
        'SEO Friendly Sitemap',
        'Social Media Integration',
        '4 Social Platforms',
      ],
    },
    {
      name: 'E-Com',
      kind: 'Website',
      price: 1699,
      bestFor: 'Selling online — cart, card payments and stock all handled.',
      highlights: ['Unlimited pages', 'Cart and card payments', 'Up to 50 products, reviews and search'],
      features: [
        'Web Development',
        'Unlimited Pages',
        'jQuery Slider Banner',
        'W3C Certified HTML',
        'Admin Panel Support',
        'Mobile Responsive Layout',
        'Cart Integration',
        'Payment Module Integration',
        'Inventory Management',
        '50 Products & up to 10 Categories',
        'Easy Product Search',
        'Product Reviews',
        'Web Design & UI',
        '15 Stock Images',
        '8 Banner Designs',
        'Favicon',
        'Advance UI Effects',
        'Basic Search Engine Submission',
        'SEO Friendly Design',
        'SEO Friendly Sitemap',
        'Analytics Integration',
        'Social Media Integration',
        '4 Social Platforms',
      ],
    },
    {
      name: 'Portal',
      kind: 'Website',
      price: 2999,
      from: true,
      bestFor: 'Platforms where people sign in — job boards, listings, member areas.',
      highlights: ['Accounts and dashboards for your users', 'Built to order', 'Full admin panel'],
      features: [
        'Web Development',
        'Client / User Dashboard',
        'Custom Coding',
        'Module-wise Architecture',
        'Extensive Admin Panel',
        'Complete Deployment',
      ],
      choose: {
        label: 'Choose the type of portal:',
        options: [
          'Job Portal',
          'Professional Network',
          'Social Network',
          'Media Portal',
          'Real Estate Portal',
          'Medical Portal',
          'News Portal',
          'Enterprise Portal',
        ],
      },
    },
  ],
  compare: {
    columns: ['Static', 'Dynamic', 'E-Com', 'Portal'],
    rows: [
      { label: 'Pages', values: ['5', '5', 'Unlimited', 'Built to order'] },
      { label: 'Edit the content yourself', values: [false, true, true, true] },
      { label: 'Admin panel', values: [false, false, true, true] },
      { label: 'Sell products (cart and payments)', values: [false, false, true, 'On request'] },
      { label: 'User accounts and dashboards', values: [false, false, false, true] },
      { label: 'Social media connected', values: [false, true, true, 'On request'] },
      { label: 'Search-engine ready', values: [true, true, true, true] },
      { label: 'Stock photos included', values: [false, '10', '15', 'On request'] },
    ],
  },
}

/* ---------- Wide, multi-column packages ---------- */

export const diamondPackage = {
  id: 'diamond',
  eyebrow: 'Special offer',
  name: 'Diamond',
  kind: 'Package',
  price: 499,
  bestFor:
    'The only package with 250 business cards actually printed and posted to you, plus a one-page website.',
  groups: [
    {
      title: 'Logo Design',
      items: ['10 Logo Concepts', 'Unlimited Revisions', 'Ai, PDF, EPS, JPG & PNG files', '100% Ownership'],
    },
    {
      title: 'Business Stationery',
      items: [
        '250 Business Cards Printing',
        'Business Card Designs',
        'Letterhead Designs',
        'Envelope Designs',
        'Social Media Cover Designs',
      ],
    },
    {
      title: 'Website',
      items: [
        '1 Page Dynamic Website',
        'Cross platform compatible',
        'Responsive Layout',
        'Unlimited UI Effects',
        '5 stock photos',
        '100% Ownership',
      ],
    },
  ],
}

export const awardWinningPackage = {
  id: 'award-winning',
  eyebrow: 'Art Director plan',
  name: 'Award Winning',
  kind: 'Logo Package',
  price: 399,
  bestFor: 'Handled personally by an Art Director with 20+ years behind them, delivered in 24 hours.',
  groups: [
    {
      title: 'Design & Delivery',
      items: [
        'Designed by our 20+ years experienced Art Directors',
        'Unlimited logo concepts',
        'Unlimited revisions',
        '24 hours delivery time',
        'Ai, PDF, EPS, JPG & PNG files',
        '100% Ownership',
      ],
    },
    {
      title: 'Included Collateral',
      items: [
        'Business Card Design',
        'Flyer Design',
        'Font names & colour codes',
        'Black and white version files',
        '2 Social cover page designs (add-on)',
      ],
    },
    {
      title: 'Our Guarantees',
      items: ['100% Unique Design Guarantee', '100% Satisfaction Guarantee', '100% Money Back Guarantee'],
    },
  ],
}

export const premiumPlan = {
  id: 'extensive-premium',
  eyebrow: 'Art Director plan',
  name: 'Extensive Premium',
  kind: 'Logo + Full Brand',
  price: 599,
  bestFor: 'A senior Art Director, the editable master files and every branded asset in one order.',
  groups: [
    {
      title: 'Logo & Master Files',
      items: [
        'Designed by our 25+ years experienced Art Directors',
        'Unlimited logo concepts',
        'Unlimited revisions',
        'Master files: editable Ai, vector PDF, vector EPS, JPG & PNG',
        '48 hours delivery time',
        'Custom logo design',
        'PPT presentation',
        '100% Ownership',
      ],
    },
    {
      title: 'Stationery Suite',
      items: [
        'Business Card Design',
        'Letterhead Design',
        'Envelope Design',
        'Email Signature',
        'Invoice Design',
        'Flyer Design',
        'Bag Design',
        'Fax Template',
      ],
    },
    {
      title: 'Brand Collateral',
      items: [
        '4 social covers (FB, Twitter, LinkedIn or others)',
        'T-shirt design — front and back',
        'Web banner design',
        'Signage design',
        'Car stickers design',
        'Black and white version',
        'Editable fonts & colour codes',
      ],
    },
  ],
}

export const ultimateBrandingKit = {
  id: 'ultimate-kit',
  eyebrow: 'Everything, in one kit',
  name: 'Ultimate',
  kind: 'Branding Kit',
  price: 499,
  bestFor: 'Every branded item we design, so nothing has to be ordered again later.',
  groups: [
    {
      title: 'Core Stationery',
      items: ['Social Covers', 'Business Card', 'Letterhead', 'MS Word Letterhead', 'Invoice Design', 'Flyer Design'],
    },
    {
      title: 'Extended Collateral',
      items: ['Bag Design', 'Car Stickers', 'Email Signature', 'Envelope Design', 'Fax Template', 'Favicon Design'],
    },
    {
      title: 'Presentation & Signage',
      items: ['PPT Presentation', 'Signage Design', 'T-Shirt Design', 'Website Banner'],
    },
  ],
}

/* ---------- Categories ---------- */

const lowest = (section) => Math.min(...section.items.map((i) => i.price))

/**
 * The five buying decisions a visitor can actually have, in the order most
 * people need them. The pricing page shows one at a time so nobody has to
 * scroll past four categories that do not apply to them.
 */
export const categories = [
  {
    id: 'bundles',
    tab: 'Bundles',
    tabNote: `Save up to ${Math.max(bundles3in1.maxSavingPct, bundles2in1.maxSavingPct)}%`,
    icon: 'layers',
    title: 'Buy it together, pay less',
    plain:
      'A bundle is simply two or three of the services below ordered at the same time. You get exactly the same work — it just costs less than buying the parts one by one.',
    howToChoose: 'Need a website? Take a 3-in-1. Only need the logo and print basics? Take a 2-in-1.',
    from: Math.min(lowest(bundles3in1), lowest(bundles2in1)),
    groups: [bundles3in1, bundles2in1],
    bigPackages: [diamondPackage],
    bigPackagesTitle: 'One more option: the Diamond package',
    bigPackagesBlurb:
      'Same idea as a 3-in-1, with one difference — we print and post 250 business cards to you. The website is a single page rather than five.',
  },
  {
    id: 'logo',
    tab: 'Logo',
    icon: 'logo',
    title: 'Logo design',
    plain:
      'We draw a set of original designs for your business, you pick one, and we adjust it until it is right. You get the finished files and own the copyright outright.',
    howToChoose: 'The tiers differ in how many designs you see, how many changes you get, and which files you receive.',
    from: lowest(logoPackages),
    groups: [logoPackages],
    bigPackages: [awardWinningPackage, premiumPlan],
    bigPackagesTitle: 'Want a senior Art Director on it?',
    bigPackagesBlurb:
      'Two flat-price plans handled personally by our most experienced designers, with unlimited concepts and the collateral included.',
  },
  {
    id: 'branding-kit',
    tab: 'Branding kit',
    icon: 'layers',
    title: 'Branding kit',
    plain:
      'Your logo applied to the everyday items a business needs — business cards, letterheads, envelopes, email signatures, social media covers, signage.',
    howToChoose: 'Each tier adds more items to the one before it. Pick the one that covers where your brand will appear.',
    from: lowest(brandingKits),
    groups: [brandingKits],
    bigPackages: [ultimateBrandingKit],
    bigPackagesTitle: 'Or take the lot',
    bigPackagesBlurb: 'Every item we design for a brand, in a single kit.',
  },
  {
    id: 'website',
    tab: 'Website',
    icon: 'website',
    title: 'Website design & build',
    plain:
      'A website designed and built by the same team, working on phones and laptops alike, set up so Google can find it. The finished site is yours.',
    howToChoose:
      'Ask two questions: do you want to edit the content yourself, and do you need to sell online? That points straight at your tier.',
    from: lowest(websitePackages),
    groups: [websitePackages],
  },
  {
    id: 'animation',
    tab: 'Logo animation',
    icon: 'animation',
    title: 'Logo animation',
    plain:
      'Your finished logo turned into a short moving clip for videos, ads and presentations. Sound and music are included, and you can watch real samples below.',
    howToChoose: 'Longer clips allow more of a story. Everything from Silver upwards is animated specifically for your mark.',
    from: lowest(animatedLogo),
    groups: [animatedLogo],
  },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]))

/**
 * The plain-language route in for a visitor who does not yet know what they
 * are shopping for. Each answer points at one category and one recommendation.
 */
export const finder = [
  {
    id: 'logo-only',
    question: 'I just need a logo',
    body: 'You have a business name and want a professional mark that is yours to keep.',
    recommend: 'Gold Logo',
    price: 139,
    note: 'Unlimited changes and every file format.',
    category: 'logo',
  },
  {
    id: 'logo-and-print',
    question: 'I need a logo and the print basics',
    body: 'Business cards, letterhead and social media covers that all match the logo.',
    recommend: 'Pro 2-in-1 Bundle',
    price: 219,
    note: 'Logo and branding kit together, cheaper than buying both.',
    category: 'bundles',
  },
  {
    id: 'everything',
    question: 'I need a website as well',
    body: 'The full set: logo, printed basics and a website customers can find you on.',
    recommend: 'Pro 3-in-1 Bundle',
    price: 999,
    note: 'Logo, branding kit and a 5-page website.',
    category: 'bundles',
  },
]

/** The single package we point undecided visitors at first. */
export const headline = bundles3in1.items.find((i) => i.name === 'Pro')

/* ---------- Legacy lookups (service pages and the home page) ---------- */

export const pricingSections = [bundles3in1, bundles2in1, logoPackages, animatedLogo, brandingKits, websitePackages]

export const sectionById = Object.fromEntries(pricingSections.map((s) => [s.id, s]))

export const bigPackageById = {
  diamond: diamondPackage,
  'award-winning': awardWinningPackage,
  'extensive-premium': premiumPlan,
  'ultimate-kit': ultimateBrandingKit,
}
