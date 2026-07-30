/**
 * Full package catalogue.
 *
 * `price` / `was` are numbers so they can be formatted consistently.
 * `includes` lists component products with their standalone price.
 * `groups` is used by the large multi-column packages.
 */

export const money = (n) => `$${n.toLocaleString('en-US')}`

export const bundles3in1 = {
  id: 'bundles-3in1',
  title: '3 In 1 Bundles',
  subtitle: 'Logo + Website + Branding Kit',
  blurb: 'Everything a new business needs to launch, bought together for less than the parts.',
  items: [
    {
      name: 'Basic',
      price: 499,
      was: 557,
      includes: [
        { label: 'Single Page Website', price: 399 },
        { label: 'Silver Logo', price: 99 },
        { label: 'Basic Branding Kit', price: 59 },
      ],
    },
    {
      name: 'Pro',
      price: 999,
      was: 1087,
      featured: true,
      includes: [
        { label: 'Basic Static Website', price: 699 },
        { label: 'Platinum Logo', price: 189 },
        { label: 'Corporate Kit', price: 199 },
      ],
    },
    {
      name: 'Corporate',
      price: 1499,
      was: 1587,
      includes: [
        { label: 'CMS Website', price: 1199 },
        { label: 'Platinum Logo', price: 189 },
        { label: 'Corporate Kit', price: 199 },
      ],
    },
    {
      name: 'Ultimate',
      price: 1999,
      was: 2387,
      includes: [
        { label: 'E-Com Website', price: 1699 },
        { label: 'Platinum Logo', price: 189 },
        { label: 'Ultimate Kit', price: 499 },
      ],
    },
  ],
}

export const bundles2in1 = {
  id: 'bundles-2in1',
  title: '2 In 1 Bundles',
  subtitle: 'Logo + Branding Kit',
  blurb: 'Pair a logo with the stationery and social assets that carry it into the real world.',
  items: [
    {
      name: 'Basic',
      price: 89,
      was: 108,
      includes: [
        { label: 'Bronze Logo', price: 49 },
        { label: 'Basic Branding Kit', price: 59 },
      ],
    },
    {
      name: 'Pro',
      price: 219,
      was: 248,
      featured: true,
      includes: [
        { label: 'Silver Logo', price: 99 },
        { label: 'Pro Branding Kit', price: 149 },
      ],
    },
    {
      name: 'Corporate',
      price: 299,
      was: 338,
      includes: [
        { label: 'Gold Logo', price: 139 },
        { label: 'Corporate Branding Kit', price: 199 },
      ],
    },
    {
      name: 'Ultimate',
      price: 599,
      was: 668,
      includes: [
        { label: 'Platinum Logo', price: 189 },
        { label: 'Ultimate Branding Kit', price: 499 },
      ],
    },
  ],
}

export const logoPackages = {
  id: 'logo-packages',
  title: 'Logo Packages',
  subtitle: 'Custom marks, drawn from scratch',
  blurb: 'Every tier is designed by hand for your business — no templates, no stock marks.',
  items: [
    {
      name: 'Bronze',
      kind: 'Logo',
      price: 49,
      features: ['2 Logo Concepts', '3 Revisions', 'No High Res. files', '48 hours Delivery'],
    },
    {
      name: 'Silver',
      kind: 'Logo',
      price: 99,
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
}

export const animatedLogo = {
  id: 'animated-logo',
  title: 'Animated Logo',
  subtitle: 'Motion built around your mark',
  blurb: 'HD logo animations produced by a dedicated specialist animator, with royalty-free music and effects.',
  items: [
    {
      name: 'Bronze',
      kind: 'Animated Logo',
      price: 299,
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
}

export const brandingKits = {
  id: 'branding-kits',
  title: 'Branding Kits',
  subtitle: 'The assets your logo lives on',
  blurb: 'Stationery, social covers and collateral designed to match your mark exactly.',
  items: [
    {
      name: 'Basic',
      kind: 'Branding Kit',
      price: 59,
      features: ['Business Card', 'Letterhead', 'Envelope'],
    },
    {
      name: 'Startup',
      kind: 'Branding Kit',
      price: 99,
      features: ['Business Card', 'Letterhead', 'Envelope', 'Email Signature', '2 Social Covers'],
    },
    {
      name: 'Pro',
      kind: 'Branding Kit',
      price: 149,
      featured: true,
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
}

export const websitePackages = {
  id: 'website-packages',
  title: 'Website Packages',
  subtitle: 'From a landing page to a full portal',
  blurb: 'Responsive, SEO-ready builds with the design and development handled by one team.',
  items: [
    {
      name: 'Static',
      kind: 'Website',
      price: 699,
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
      features: [
        'Web Development',
        'Client / User Dashboard',
        'Custom Coding',
        'Module-wise Architecture',
        'Extensive Admin Panel',
        'Complete Deployment',
      ],
      choose: {
        label: 'Any one of:',
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
}

/* ---------- Large multi-column packages ---------- */

export const diamondPackage = {
  id: 'diamond',
  eyebrow: 'Special Offer',
  name: 'Diamond',
  kind: 'Package',
  price: 499,
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
  eyebrow: 'Award Winning Design Team',
  name: 'Award Winning',
  kind: 'Package',
  price: 399,
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
  eyebrow: "Extensive Premium Art Director's Plan",
  name: 'Extensive Premium',
  kind: 'Package',
  price: 599,
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
  eyebrow: 'Branding Kits',
  name: 'Ultimate',
  kind: 'Branding Kit',
  price: 499,
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

/** Ordered sections rendered on /pricing. */
export const pricingSections = [bundles3in1, bundles2in1, logoPackages, animatedLogo, brandingKits, websitePackages]

export const sectionById = Object.fromEntries(pricingSections.map((s) => [s.id, s]))

export const bigPackageById = {
  diamond: diamondPackage,
  'award-winning': awardWinningPackage,
  'extensive-premium': premiumPlan,
  'ultimate-kit': ultimateBrandingKit,
}
