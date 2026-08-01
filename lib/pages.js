/**
 * Copy for each service page. `packages` names the pricing sections
 * (from lib/pricing.js) that should be surfaced on that page.
 */

export const servicePages = {
  'logo-design': {
    slug: '/logo-design',
    icon: 'logo',
    eyebrow: 'Logo Design',
    title: 'A mark your customers',
    highlight: 'actually remember',
    intro:
      'Every LogoOrbit logo is drawn from scratch by our in-house team around your positioning, your market and your audience, never pulled from a template library, never resold to anyone else.',
    metaTitle: 'Custom Logo Design Services',
    metaDescription:
      'Original, hand-crafted logo design from $49. Unlimited revisions, full vector source files and 100% copyright ownership on every package.',
    highlights: [
      { title: 'Concepts in 24 hours', body: 'Most briefs come back with original concepts the same day, and never later than 48 hours.' },
      { title: 'Unlimited revisions', body: 'On Gold and above we keep refining until it is right, there is no revision counter running.' },
      { title: 'Every file format', body: 'Editable Ai, vector EPS and PDF, plus high-quality PNG and JPEG for web and social.' },
      { title: '100% ownership', body: 'Full copyright transfers to you on delivery. Use the mark anywhere, forever, with no licensing.' },
    ],
    deliverables: [
      'Primary logo lockup',
      'Secondary / stacked variants',
      'Black and white version',
      'Favicon-ready mark',
      'Font names and colour codes',
      'Business card design (Platinum)',
    ],
    packages: ['logo-packages'],
    featureBig: ['award-winning', 'extensive-premium'],
  },

  'website-design': {
    slug: '/website-design',
    icon: 'website',
    eyebrow: 'Website Design',
    title: 'Websites built to',
    highlight: 'load fast and convert',
    intro:
      'Design and development handled by one team, so nothing gets lost in translation. Every build is responsive, W3C-certified and structured for search from day one.',
    metaTitle: 'Custom Website Design & Development',
    metaDescription:
      'Responsive, SEO-ready website design from $699, static, dynamic, e-commerce and custom portal builds with design and development under one roof.',
    highlights: [
      { title: 'Mobile-first', body: 'Layouts are designed at phone width first, then scaled up, because that is where your traffic is.' },
      { title: 'SEO foundations', body: 'Clean semantic markup, sitemap, analytics and search console wired in before launch.' },
      { title: 'Admin you can use', body: 'Dynamic and e-commerce builds ship with an admin panel your team can actually operate.' },
      { title: 'Complete handover', body: 'You get the code, the hosting setup and a walkthrough. No lock-in, no retainer required.' },
    ],
    deliverables: [
      'UI design for every page',
      'Slider and banner design',
      'Stock imagery sourcing',
      'Cart & payment integration (E-Com)',
      'Analytics and sitemap setup',
      'Social platform integration',
    ],
    packages: ['website-packages'],
  },

  animation: {
    slug: '/animation',
    icon: 'animation',
    eyebrow: 'Logo & Video Animation',
    title: 'Put your logo',
    highlight: 'in motion',
    intro:
      'A dedicated specialist animator turns your static mark into an HD intro, sting or motion-graphic sequence, with royalty-free music and sound effects cleared for commercial use.',
    metaTitle: 'Logo Animation & Video Animation Services',
    metaDescription:
      'HD logo animation from $299. Template, custom motion graphic and 3D element animation by dedicated specialist animators, delivered in 72 hours.',
    highlights: [
      { title: 'HD 1920 × 1080', body: 'Every package delivers full HD, ready for web, social, presentations and broadcast.' },
      { title: '72-hour delivery', body: 'Standard turnaround across all four tiers, from a 4-second sting to a 20-second sequence.' },
      { title: 'Royalty-free audio', body: 'Background music and sound effects are cleared for commercial use, no licensing surprises.' },
      { title: 'Voice over available', body: 'Gold adds a professional tagline voice over recorded to match your brand tone.' },
    ],
    deliverables: [
      'Animated logo sequence',
      'Alpha / transparent version',
      'Social-ready aspect ratios',
      'Background music & SFX',
      'Tagline voice over (Gold+)',
      '3D element effects (Platinum)',
    ],
    packages: ['animated-logo'],
  },

  'book-publications': {
    slug: '/book-publications',
    icon: 'book',
    eyebrow: 'Book Publication',
    title: 'From manuscript to',
    highlight: 'shelf-ready title',
    intro:
      'Cover design, interior layout, formatting and distribution support, the production work that stands between a finished manuscript and a book people can actually buy.',
    metaTitle: 'Book Cover Design & Publishing Services',
    metaDescription:
      'Professional book cover design, interior layout, print and eBook formatting, and distribution setup for self-published and independent authors.',
    highlights: [
      { title: 'Cover that sells', body: 'Genre-aware cover design built to read clearly at thumbnail size on every storefront.' },
      { title: 'Print + eBook', body: 'Interiors formatted for paperback, hardback, Kindle and ePub from a single source file.' },
      { title: 'Spine & jacket', body: 'Full wraparound artwork calculated to your exact page count and paper stock.' },
      { title: 'Distribution setup', body: 'We prepare and check the files each platform requires so your upload passes first time.' },
    ],
    deliverables: [
      'Front cover design',
      'Full wraparound jacket',
      'Interior page layout',
      'eBook (ePub / Kindle) build',
      'ISBN & barcode placement',
      'Print-ready PDF export',
    ],
    packages: [],
  },

  'mobile-application': {
    slug: '/mobile-application',
    icon: 'mobile',
    eyebrow: 'Mobile Applications',
    title: 'Apps designed for',
    highlight: 'the people using them',
    intro:
      'Wireframes, interface design and build for iOS and Android, grounded in how your customers actually move through a product, not how an app template says they should.',
    metaTitle: 'Mobile App Design & Development',
    metaDescription:
      'iOS and Android app design and development, UX wireframes, native and cross-platform builds, and full app store launch support.',
    highlights: [
      { title: 'UX before UI', body: 'We map the flows and wireframe them before a single pixel of visual design is drawn.' },
      { title: 'Native or cross-platform', body: 'We recommend the stack that fits your budget and roadmap, not the one we prefer.' },
      { title: 'Store launch support', body: 'Listing assets, screenshots and submission handled through to approval.' },
      { title: 'Design system included', body: 'Components and tokens handed over so future features stay visually consistent.' },
    ],
    deliverables: [
      'User flow mapping',
      'Wireframes for every screen',
      'High-fidelity UI design',
      'Interactive prototype',
      'App icon & store assets',
      'Developer handover files',
    ],
    packages: [],
  },

  'amazon-marketing': {
    slug: '/amazon-marketing',
    icon: 'amazon',
    eyebrow: 'Amazon Marketing',
    title: 'Get your products',
    highlight: 'found and bought',
    intro:
      'Listing optimisation, A+ brand content and managed advertising that moves your products up the results page and keeps them converting once they are there.',
    metaTitle: 'Amazon Listing Optimisation & PPC Management',
    metaDescription:
      'Amazon marketing services, keyword-driven listing optimisation, A+ brand content design, storefront build and managed PPC campaigns.',
    highlights: [
      { title: 'Keyword-led listings', body: 'Titles, bullets and backend terms built from real search volume, not guesswork.' },
      { title: 'A+ brand content', body: 'Comparison modules and lifestyle imagery that answer objections before they cost you a sale.' },
      { title: 'Managed PPC', body: 'Sponsored Product and Brand campaigns tuned weekly against ACoS targets you set.' },
      { title: 'Storefront design', body: 'A branded multi-page storefront that turns one-product buyers into repeat customers.' },
    ],
    deliverables: [
      'Keyword research report',
      'Optimised titles & bullets',
      'A+ content module design',
      'Product image & infographic set',
      'Storefront page build',
      'Monthly performance reporting',
    ],
    packages: [],
  },
}

export const serviceSlugs = Object.keys(servicePages)
