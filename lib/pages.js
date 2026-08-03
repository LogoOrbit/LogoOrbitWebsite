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
      'Original, hand-crafted logo design from $49. Copyright ownership and public or commercial use require the separate $499 written assignment certificate.',
    highlights: [
      { title: 'Concepts in 24 hours', body: 'Most briefs come back with original concepts the same day, and never later than 48 hours.' },
      { title: 'Unlimited revisions', body: 'On Gold and above we keep refining until it is right, there is no revision counter running.' },
      { title: 'Every file format', body: 'Editable Ai, vector EPS and PDF, plus high-quality PNG and JPEG for web and social.' },
      { title: 'Written ownership option', body: 'Add the separate $499 signed certificate to transfer the approved final logo and authorize public or commercial use.' },
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
    price: 49,
    relatedCatalog: ['brand-identity-design', 'logo-redesign', 'minimalist-logo-design', 'monogram-logo-design', 'brand-guidelines', 'vector-tracing'],
    industrySlugs: ['technology', 'construction', 'restaurants', 'fitness', 'real-estate', 'healthcare'],
    guideSlugs: ['how-much-does-a-logo-cost', 'what-makes-a-good-logo', 'logo-file-formats-explained'],
    faqs: [
      {
        q: 'How many logo concepts will I see?',
        a: 'It depends on the package, from a handful on the entry tier to unlimited concepts on Platinum. What matters more than the count is that they are genuinely different directions rather than the same idea in three colours.',
      },
      {
        q: 'Do I own the logo outright?',
        a: 'Not from the design package alone. Copyright ownership and public or commercial use require the separate $499 Copyright Assignment & Commercial Use Certificate, full payment of the logo project, and signatures from both parties.',
      },
      {
        q: 'What if none of the first concepts work?',
        a: 'Say so plainly and we start again from a fresh direction rather than nudging the same one. On Gold and above there is no revision limit, so nobody is counting.',
      },
      {
        q: 'Will the logo work on signage and embroidery?',
        a: 'We test every mark in one colour, reversed out of a dark background and at favicon size before showing it to you, and we supply a simplified variant for stitching where the main mark carries too much detail.',
      },
      {
        q: 'Can you check whether the name is already taken?',
        a: 'We run a search before filing a trademark application and tell you honestly if the name looks likely to clash. Our trademark fee is $299 per class on top of the government filing fee.',
      },
    ],
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
    price: 699,
    relatedCatalog: ['ecommerce-website-design', 'wordpress-website-design', 'landing-page-design', 'seo-web-design', 'website-redesign', 'ui-ux-design'],
    industrySlugs: ['local-business', 'healthcare', 'real-estate', 'legal', 'restaurants', 'ecommerce'],
    guideSlugs: ['website-cost-guide', 'website-redesign-seo', 'core-web-vitals-guide'],
    faqs: [
      {
        q: 'How long does a website take to build?',
        a: 'A brochure site is typically two to four weeks from the point content is available. E-commerce and custom builds run longer, and the honest bottleneck on almost every project is content rather than design.',
      },
      {
        q: 'Can I edit the site myself afterwards?',
        a: 'Yes. We set up editable content areas with sensible constraints, so you can change text and images without being able to accidentally break the layout, and we walk your team through it at handover.',
      },
      {
        q: 'Who owns the site and the hosting?',
        a: 'You do, in your own accounts and your own name. There is no lock-in, no mandatory retainer, and you can move it elsewhere whenever you want.',
      },
      {
        q: 'Will it be set up for Google?',
        a: 'Yes, as part of the build: semantic markup, structured data, a sitemap, analytics and Search Console, and a Core Web Vitals pass before launch. Adding those afterwards always costs more.',
      },
      {
        q: 'Do you write the content?',
        a: 'We structure it and edit for fit as standard, and full copywriting is available for an additional fee. Most clients supply raw material and we shape it into the page.',
      },
    ],
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
    price: 299,
    relatedCatalog: ['motion-graphics', 'video-editing', 'explainer-video', 'youtube-thumbnail-design', 'youtube-channel-design', 'ad-creative-design'],
    industrySlugs: ['creators', 'gaming', 'entertainment', 'saas', 'music', 'ecommerce'],
    guideSlugs: ['social-media-image-sizes', 'what-makes-a-good-logo', 'logo-file-formats-explained'],
    faqs: [
      {
        q: 'What do I need to supply for a logo animation?',
        a: 'The vector logo file. If you only have a flat image we will redraw it as vector first, which is a small additional cost and something you will want anyway.',
      },
      {
        q: 'How long should an animated logo be?',
        a: 'Four to six seconds for an intro sting. Longer sequences work for presentations and adverts, but anything over about eight seconds in front of a video measurably costs you viewers.',
      },
      {
        q: 'Is the music cleared for commercial use?',
        a: 'Yes. Background music and sound effects are royalty-free and cleared for commercial use, so there is no licensing surprise when the video is monetised.',
      },
      {
        q: 'What file formats do I get?',
        a: 'Full HD MP4 as standard, plus a transparent-background version for overlaying on footage and social-ready aspect ratios for vertical and square placements.',
      },
    ],
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
    price: 199,
    relatedCatalog: ['book-cover-design', 'book-layout-design', 'custom-illustration', 'typography-design', 'album-cover-design', 'brochure-design'],
    industrySlugs: ['education', 'creators', 'nonprofits', 'religious', 'legal', 'entertainment'],
    guideSlugs: ['print-production-guide', 'logo-file-formats-explained', 'design-brief-how-to-write'],
    faqs: [
      {
        q: 'Can you work from a Word manuscript?',
        a: 'Yes, that is the normal starting point. Clean, consistent styling in Word makes typesetting faster, but we can work from a plain manuscript without it.',
      },
      {
        q: 'How is the spine width calculated?',
        a: 'From your final page count and the printer\'s paper specification, which is why the cover cannot be finalised until the interior is laid out. It is the main reason cover and interior are usually done together.',
      },
      {
        q: 'Do I get separate print and ebook files?',
        a: 'Yes. Print is fixed-page and ebook is reflowable, so they are genuinely different builds. We produce both from one source so the content stays in sync.',
      },
      {
        q: 'Will the files pass Amazon KDP or IngramSpark checks?',
        a: 'We build to each platform\'s published specification and check before delivery. If a platform rejects a file we supplied, we fix it at no charge.',
      },
    ],
  },

  'mobile-application': {
    slug: '/mobile-application',
    icon: 'mobile',
    eyebrow: 'Mobile Applications',
    title: 'Apps designed for',
    highlight: 'the people using them',
    intro:
      'We plan the screens, design them and build the working app for iPhone and Android, then put it live in both stores. One team from the first sketch to the day it is approved, and the code is yours at the end of it.',
    metaTitle: 'Mobile App Design & Development',
    metaDescription:
      'iOS and Android app design and development from $999. UX wireframes, cross-platform and native builds, admin panels, payments and full app store launch support.',
    highlights: [
      { title: 'UX before UI', body: 'We map the flows and wireframe them before a single pixel of visual design is drawn.' },
      { title: 'Designed and built here', body: 'The same team that draws the screens writes the code, so nothing is lost in a handover.' },
      { title: 'Both stores covered', body: 'Listing copy, screenshots and submission handled through to approval, including any rejections.' },
      { title: 'The code is yours', body: 'Full source code, the back end and the store accounts, all in your name. No lock-in, no monthly fee to keep it.' },
    ],
    deliverables: [
      'User flow mapping',
      'Wireframes for every screen',
      'High-fidelity UI design',
      'Working iOS and Android build',
      'Accounts, payments & admin panel',
      'App Store and Google Play launch',
    ],
    packages: ['app-packages'],
    featureBig: ['app-launch'],
    price: 999,
    relatedCatalog: ['mobile-app-ui-design', 'ui-ux-design', 'app-icon-design', 'wireframing-prototyping', 'saas-product-design', 'design-system'],
    industrySlugs: ['startups', 'saas', 'healthcare', 'logistics', 'fitness', 'ecommerce'],
    guideSlugs: ['website-cost-guide', 'accessible-design-guide', 'design-brief-how-to-write'],
    faqs: [
      {
        q: 'Do you build the app or only design it?',
        a: 'Both. The same team that draws the screens writes the code, so there is no handover gap between the design file and the working product.',
      },
      {
        q: 'Do we own the source code?',
        a: 'Yes, in full, along with the back end and the store accounts, all in your name. There is no monthly fee to keep the app and no lock-in.',
      },
      {
        q: 'Who handles App Store and Google Play submission?',
        a: 'We do, including listing copy, screenshots and the submission itself, and we handle any rejections through to approval rather than handing the problem back.',
      },
      {
        q: 'Should we build native or cross-platform?',
        a: 'Cross-platform for most apps, because one codebase covers both stores at a much lower cost. Native is worth it when you depend heavily on device hardware or need the highest possible performance, and we will say which applies to you.',
      },
    ],
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
    price: 249,
    relatedCatalog: ['amazon-listing-design', 'packaging-design', 'label-design', 'product-photography-editing', 'ecommerce-website-design', 'ad-creative-design'],
    industrySlugs: ['ecommerce', 'beauty', 'fashion', 'manufacturing', 'pets', 'fitness'],
    guideSlugs: ['amazon-listing-guide', 'ecommerce-conversion-checklist', 'packaging-design-guide'],
    faqs: [
      {
        q: 'What are the rules for an Amazon main image?',
        a: 'Pure white background, product filling most of the frame, and no text, logos, badges or props. Breaking those risks the listing being suppressed, so we keep the hero compliant and put the selling into images two onward.',
      },
      {
        q: 'Is A+ content worth paying for?',
        a: 'For brand-registered sellers with real volume, generally yes. It lifts conversion and reduces returns by setting expectations, though it is not indexed for search the way the title and bullets are.',
      },
      {
        q: 'How quickly do listing changes affect ranking?',
        a: 'Keyword changes can register within days, but Amazon ranks heavily on conversion, so the meaningful movement follows the improvement in conversion rate over a few weeks.',
      },
      {
        q: 'Do you manage the ad spend too?',
        a: 'Yes. Sponsored Product and Sponsored Brand campaigns are tuned weekly against an ACoS target that you set, and you keep control of the budget throughout.',
      },
    ],
  },
}

export const serviceSlugs = Object.keys(servicePages)
