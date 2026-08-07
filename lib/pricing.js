/**
 * Package catalogue.
 *
 * The pricing page is read by people who do not buy design for a living, so
 * every item carries three plain-English fields alongside the raw spec list:
 *
 *   bestFor   , one sentence naming the sort of business the tier suits
 *   highlights, the three or four things that actually differ between tiers
 *   features  , the complete spec list, kept behind a "show everything" toggle
 *
 * `price` / `was` are numbers so they can be formatted, compared and totalled.
 * `includes` lists the component products of a bundle with their own price.
 * `groups` is used by the wide multi-column packages.
 */

/**
 * `money`, `salesTax` and `withTax` live in lib/money.js and are re-exported
 * here so the older import path keeps working. Anything that needs only the
 * formatter should import from lib/money directly - pulling it from this file
 * drags the entire catalogue below into that page's bundle.
 */
export { money, salesTax, withTax } from './money'

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
    'Everything needed to open the doors: the mark, the printed basics and the website, bought together for less than the three parts cost separately.',
  items: [
    {
      name: 'Basic',
      price: 749,
      bestFor: 'A brand-new business that needs to be online quickly on the smallest budget.',
      highlights: ['One-page website', 'Logo with print-ready files', 'Card, letterhead and envelope'],
      includes: [
        { label: 'Single Page Website', price: 599 },
        { label: 'Silver Logo', price: 149 },
        { label: 'Basic Branding Kit', price: 89 },
      ],
    },
    {
      name: 'Pro',
      price: 1499,
      bestFor: 'Most small businesses, a proper 5-page website, a strong logo and every print basic covered.',
      highlights: ['5-page website', 'Top-tier logo with editable files', 'Full stationery and social covers'],
      includes: [
        { label: 'Static Website (5 pages)', price: 999 },
        { label: 'Platinum Logo', price: 279 },
        { label: 'Corporate Branding Kit', price: 299 },
      ],
    },
    {
      name: 'Corporate',
      price: 2199,
      bestFor: 'Businesses that want to add and edit their own pages without calling a developer.',
      highlights: ['Website you can update yourself', 'Top-tier logo', 'Signage and vehicle branding included'],
      includes: [
        { label: 'Dynamic Website (5 pages)', price: 1799 },
        { label: 'Platinum Logo', price: 279 },
        { label: 'Corporate Branding Kit', price: 299 },
      ],
    },
    {
      name: 'Ultimate',
      price: 2999,
      featured: true,
      badge: 'Best value',
      bestFor: 'Anyone selling products online, the website comes with a working store built in.',
      highlights: ['Online store with cart and payments', 'Top-tier logo', 'Every branded asset we make'],
      includes: [
        { label: 'E-Commerce Website', price: 2499 },
        { label: 'Platinum Logo', price: 279 },
        { label: 'Ultimate Branding Kit', price: 749 },
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
      price: 129,
      bestFor: 'Testing an idea and wanting a logo plus the print basics for the lowest price.',
      highlights: ['2 logo concepts', 'Card, letterhead and envelope'],
      includes: [
        { label: 'Bronze Logo', price: 69 },
        { label: 'Basic Branding Kit', price: 89 },
      ],
    },
    {
      name: 'Pro',
      price: 329,
      bestFor: 'A new business that will be handing out cards and posting on social media from day one.',
      highlights: ['4 logo concepts', 'Social covers and email signature', 'T-shirt and web banner'],
      includes: [
        { label: 'Silver Logo', price: 149 },
        { label: 'Pro Branding Kit', price: 219 },
      ],
    },
    {
      name: 'Corporate',
      price: 449,
      bestFor: 'An established business that needs signage, vehicle stickers and a full stationery set.',
      highlights: ['6 logo concepts, unlimited revisions', '4 social covers', 'Signage and car stickers'],
      includes: [
        { label: 'Gold Logo', price: 209 },
        { label: 'Corporate Branding Kit', price: 299 },
      ],
    },
    {
      name: 'Ultimate',
      price: 899,
      featured: true,
      badge: 'Best value',
      bestFor: 'A brand that wants every asset covered in one go, with nothing left to buy later.',
      highlights: ['Unlimited logo concepts', 'Editable master files', 'Every branded asset we produce'],
      includes: [
        { label: 'Platinum Logo', price: 279 },
        { label: 'Ultimate Branding Kit', price: 749 },
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
  blurb: 'Every tier is drawn by hand for your business, no templates, no stock marks.',
  items: [
    {
      name: 'Bronze',
      kind: 'Logo',
      price: 69,
      bestFor: 'A quick, low-cost mark for a side project or something temporary.',
      highlights: ['2 designs to choose from', '3 rounds of changes', 'Web files only, no print files'],
      features: ['2 Logo Concepts', '3 Revisions', 'No High Res. files', '48 hours Delivery'],
    },
    {
      name: 'Silver',
      kind: 'Logo',
      price: 149,
      bestFor: 'A first real logo, with the files you need for both print and web.',
      highlights: ['4 designs to choose from', '6 rounds of changes', 'Print-ready files', 'Ownership certificate sold separately'],
      features: [
        '4 Logo Concepts',
        '6 Revisions',
        'Custom Logo',
        'Vector PDF File',
        '48 hours Delivery',
        'HQ PNG + JPEG',
        '$499 copyright certificate required for ownership',
      ],
    },
    {
      name: 'Gold',
      kind: 'Logo',
      price: 209,
      bestFor: 'Most businesses, more designs to pick from and changes until you are happy.',
      highlights: ['6 designs to choose from', 'Unlimited changes', 'Ready in 24 to 48 hours', 'Ownership certificate sold separately'],
      features: [
        '6 Logo Concepts',
        'Unlimited Revisions',
        'Custom Logo',
        'Vector EPS, PDF file',
        '24 to 48 H Delivery',
        'HQ PNG + JPEG',
        '$499 copyright certificate required for ownership',
      ],
    },
    {
      name: 'Platinum',
      kind: 'Logo',
      price: 279,
      featured: true,
      badge: 'Most popular',
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
        '24 to 48 H Delivery',
        'Vector EPS, PDF',
        'HQ PNG + JPEG',
        '$499 copyright certificate required for ownership',
        'Business Card Design',
      ],
    },
  ],
  compare: {
    columns: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    rows: [
      { label: 'Designs to choose from', values: ['2', '4', '6', 'Unlimited'] },
      { label: 'Rounds of changes', values: ['3', '6', 'Unlimited', 'Unlimited'] },
      { label: 'Delivery', values: ['48 hours', '48 hours', '24 to 48 hours', '24 to 48 hours'] },
      { label: 'Files for print (PDF, EPS)', values: [false, 'PDF', 'PDF + EPS', 'PDF + EPS'] },
      { label: 'Editable master file (Ai)', values: [false, false, false, true] },
      { label: 'Business card design', values: [false, false, false, true] },
      { label: 'Copyright assignment', values: ['$499 add-on', '$499 add-on', '$499 add-on', '$499 add-on'] },
    ],
  },
}

export const animatedLogo = {
  id: 'animated-logo',
  title: 'Logo Animation',
  subtitle: 'Animated logo',
  blurb:
    'Your finished logo turned into a short moving clip, the bit at the start or end of a video, an ad or a presentation.',
  items: [
    {
      name: 'Bronze',
      kind: 'Animated Logo',
      price: 449,
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
      price: 599,
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
      price: 749,
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
      price: 1299,
      featured: true,
      badge: 'Best value',
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
    'A branding kit is your logo applied to the everyday things a business hands out, prints or posts, business cards, letterheads, social covers and the rest.',
  items: [
    {
      name: 'Basic',
      kind: 'Branding Kit',
      price: 89,
      bestFor: 'The three things every business gets asked for: card, letterhead, envelope.',
      highlights: ['Business card', 'Letterhead', 'Envelope'],
      features: ['Business Card', 'Letterhead', 'Envelope'],
    },
    {
      name: 'Startup',
      kind: 'Branding Kit',
      price: 149,
      bestFor: 'A new business that also needs its social pages and emails to match.',
      highlights: ['Everything in Basic', '2 social media covers', 'Email signature'],
      features: ['Business Card', 'Letterhead', 'Envelope', 'Email Signature', '2 Social Covers'],
    },
    {
      name: 'Pro',
      kind: 'Branding Kit',
      price: 219,
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
      price: 299,
      featured: true,
      badge: 'Most popular',
      bestFor: 'Shops, offices and vehicles, branded inside and out.',
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
      price: 999,
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
      price: 1799,
      bestFor: 'Most businesses, the same site, but you can change the content yourself.',
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
      price: 2499,
      bestFor: 'Selling online, cart, card payments and stock all handled.',
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
      price: 4499,
      from: true,
      featured: true,
      badge: 'Most complete',
      bestFor: 'Platforms where people sign in, job boards, listings, member areas.',
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

export const appPackages = {
  id: 'app-packages',
  title: 'Mobile App',
  subtitle: 'App packages',
  blurb:
    'The screens planned, designed and built into a working app for iPhone and Android, then submitted to the App Store and Google Play under your own accounts.',
  items: [
    {
      name: 'Design Only',
      kind: 'Mobile App',
      price: 1499,
      bestFor: 'You already have a developer and need the screens designed properly before they start building.',
      highlights: ['Up to 10 screens designed', 'A tappable prototype you can try', 'Files a developer can build straight from'],
      features: [
        'Up to 10 App Screens',
        'User Flow Mapping',
        'Wireframes for Every Screen',
        'High-Fidelity UI Design',
        'Clickable Prototype',
        'App Icon Design',
        'Developer Handover Files',
        '2 Weeks Delivery',
        '100% Ownership',
      ],
    },
    {
      name: 'Starter App',
      kind: 'Mobile App',
      price: 4499,
      from: true,
      bestFor: 'A first app that does one job well, bookings, a menu, a catalogue, a loyalty card.',
      highlights: [
        'One build that runs on iPhone and Android',
        'Up to 8 screens designed and built',
        'We put it live in both stores',
      ],
      features: [
        'Up to 8 Screens Designed & Built',
        'Cross-Platform Build (iOS + Android)',
        'User Flow Mapping & Wireframes',
        'High-Fidelity UI Design',
        'App Icon & Splash Screen',
        'Push Notifications',
        'Contact & Enquiry Forms',
        'Analytics Integration',
        'App Store & Google Play Submission',
        'Store Screenshots & Listing Copy',
        '14 Days Post-Launch Bug Fixing',
        '4 to 6 Weeks Delivery',
        '100% Ownership of the Code',
      ],
    },
    {
      name: 'Business App',
      kind: 'Mobile App',
      price: 8999,
      from: true,
      featured: true,
      badge: 'Most popular',
      bestFor: 'Apps where people sign in, pay for something, and you need to see what is going on behind it.',
      highlights: [
        'Accounts, logins and card payments',
        'An admin panel you can actually run',
        'Up to 20 screens, plus 30 days of fixes',
      ],
      features: [
        'Up to 20 Screens Designed & Built',
        'Cross-Platform Build (iOS + Android)',
        'User Accounts & Secure Login',
        'Payment Gateway Integration',
        'In-App Purchases or Subscriptions',
        'Admin Panel & Dashboard',
        'Database & API Development',
        'Push Notifications & In-App Messaging',
        'Third-Party Integrations (maps, chat, CRM)',
        'Analytics & Crash Reporting',
        'App Store & Google Play Submission',
        '30 Days Post-Launch Bug Fixing',
        '8 to 10 Weeks Delivery',
        '100% Ownership of the Code',
      ],
    },
    {
      name: 'Custom Build',
      kind: 'Mobile App',
      price: 14999,
      from: true,
      badge: 'Built to order',
      bestFor: 'Marketplaces, delivery fleets and anything with more than one type of user in it.',
      highlights: [
        'Native iOS and native Android',
        'Built to your spec, screen by screen',
        'Real-time features and a full back end',
      ],
      features: [
        'Unlimited Screens',
        'Native iOS & Native Android Builds',
        'Multi-Role Apps (customer, driver, vendor)',
        'Custom Back End & API Architecture',
        'Real-Time Tracking & Chat',
        'Extensive Admin Panel',
        'Role-Based Permissions',
        'Offline Mode & Data Sync',
        'Security Review Before Launch',
        'Full Deployment & Store Approval Support',
        '60 Days Post-Launch Support',
        '100% Ownership of the Code',
      ],
      choose: {
        label: 'Choose the type of app:',
        options: [
          'Marketplace App',
          'Delivery & Tracking App',
          'Booking & Appointments',
          'E-Commerce App',
          'Social & Community App',
          'Fitness & Health App',
          'Education & Learning App',
          'Field Service App',
        ],
      },
    },
  ],
  compare: {
    columns: ['Design Only', 'Starter App', 'Business App', 'Custom Build'],
    rows: [
      { label: 'Screens', values: ['10', '8', '20', 'Unlimited'] },
      { label: 'Actually built, not just designed', values: [false, true, true, true] },
      { label: 'Runs on iPhone and Android', values: ['Designs only', 'One build', 'One build', 'Native, one each'] },
      { label: 'User accounts and logins', values: [false, false, true, true] },
      { label: 'Take payments in the app', values: [false, false, true, true] },
      { label: 'Admin panel', values: [false, false, true, 'Extensive'] },
      { label: 'We submit it to the stores', values: [false, true, true, true] },
      { label: 'Support after launch', values: [false, '14 days', '30 days', '60 days'] },
      { label: 'Delivery', values: ['2 weeks', '4 to 6 weeks', '8 to 10 weeks', 'Quoted to spec'] },
    ],
  },
}

export const videoPackages = {
  id: 'video-packages',
  title: 'Video, YouTube and sound',
  subtitle: 'Video packages',
  blurb:
    'The same team that draws your logo also cuts your videos. Editing, thumbnails, intros, outros and sound, all finished ready to upload.',
  items: [
    {
      name: 'Starter Edit',
      kind: 'Video',
      price: 219,
      bestFor: 'One video that needs cutting, cleaning up and posting this week.',
      highlights: ['Up to 5 minutes finished', 'Cuts, music and captions', '1 thumbnail', '2 rounds of changes'],
      features: [
        'One edited video up to 5 minutes',
        'Clean cuts and pacing',
        'Background music (licence included)',
        'Burned-in captions',
        '1 custom thumbnail',
        '2 rounds of changes',
        '48 to 72 hours delivery',
      ],
    },
    {
      name: 'YouTube Pro',
      kind: 'Video',
      price: 449,
      bestFor: 'Creators posting regularly who want the video to look properly produced.',
      highlights: [
        'Up to 15 minutes finished',
        'B-roll, motion titles, sound mix',
        'Branded intro and outro',
        '3 thumbnails to pick from',
      ],
      features: [
        'One edited video up to 15 minutes',
        'B-roll and stock footage placement',
        'Animated titles and lower thirds',
        'Sound mixing and noise clean-up',
        'Colour correction',
        'Branded intro and outro',
        '3 custom thumbnails',
        'Captions and chapter markers',
        'Unlimited changes',
      ],
    },
    {
      name: 'Film and Ads',
      kind: 'Video',
      price: 1299,
      bestFor: 'A commercial, a product film or anything that has money riding on it.',
      highlights: [
        'Cinematic colour grading',
        'Full sound design and voice-over',
        '3D and motion graphics',
        'Cut for TV, web and social',
      ],
      features: [
        'Commercial or short-film edit',
        'Cinematic colour grading',
        'Full sound design and mixing',
        'Voice-over recording and sync',
        '3D and motion graphics',
        'Your logo animated into the film',
        'Versions cut for TV, web and social',
        'Unlimited changes',
      ],
    },
  ],
  compare: {
    columns: ['Starter Edit', 'YouTube Pro', 'Film and Ads'],
    rows: [
      { label: 'What you get', values: ['1 video', '1 video', '1 film'] },
      { label: 'Length', values: ['5 minutes', '15 minutes', 'Up to 3 minutes'] },
      { label: 'Thumbnails', values: ['1', '3', 'On request'] },
      { label: 'Shorts and reels', values: [false, false, true] },
      { label: 'Intro and outro', values: [false, true, true] },
      { label: 'Sound design and mixing', values: ['Music only', true, true] },
      { label: 'Colour grading', values: [false, 'Correction', 'Cinematic'] },
      { label: 'Voice-over', values: [false, false, true] },
      { label: 'Rounds of changes', values: ['2', 'Unlimited', 'Unlimited'] },
    ],
  },
}

/* ---------- Wide, multi-column packages ---------- */

export const diamondPackage = {
  id: 'diamond',
  eyebrow: 'Special offer',
  name: 'Diamond',
  kind: 'Package',
  price: 749,
  bestFor:
    'The only package with 250 business cards actually printed and posted to you, plus a one-page website.',
  groups: [
    {
      title: 'Logo Design',
      items: ['10 Logo Concepts', 'Unlimited Revisions', 'Ai, PDF, EPS, JPG & PNG files', '$499 copyright certificate sold separately'],
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
        'Website ownership included; logo copyright certificate sold separately',
      ],
    },
  ],
}

export const awardWinningPackage = {
  id: 'award-winning',
  eyebrow: 'Art Director plan',
  name: 'Award Winning',
  kind: 'Logo Package',
  price: 599,
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
        '$499 copyright certificate sold separately',
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
      title: 'Our Promise',
      items: [
        '100% original, drawn from scratch for you',
        'We keep refining until you sign it off',
        'Free consultation before you commit',
      ],
    },
  ],
}

export const premiumPlan = {
  id: 'extensive-premium',
  eyebrow: 'Art Director plan',
  name: 'Extensive Premium',
  kind: 'Logo + Full Brand',
  price: 899,
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
        '$499 copyright certificate sold separately',
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
        'T-shirt design, front and back',
        'Web banner design',
        'Signage design',
        'Car stickers design',
        'Black and white version',
        'Editable fonts & colour codes',
      ],
    },
  ],
}

export const appLaunchPackage = {
  id: 'app-launch',
  eyebrow: 'App, end to end',
  name: 'Launch Ready',
  kind: 'App Package',
  price: 11999,
  bestFor:
    'The whole thing handled, planned, designed, built, submitted and looked after for the first three months.',
  groups: [
    {
      title: 'Plan & Design',
      items: [
        'Discovery session and feature list',
        'User flow mapping for every journey',
        'Wireframes before any visual design',
        'High-fidelity UI for up to 25 screens',
        'Clickable prototype to test before we build',
        'App icon, splash screen and design system',
      ],
    },
    {
      title: 'Build & Integrate',
      items: [
        'Cross-platform build for iOS and Android',
        'User accounts, logins and profiles',
        'Payments or subscriptions wired in',
        'Admin panel and reporting dashboard',
        'Database, API and third-party integrations',
        'Push notifications and analytics',
      ],
    },
    {
      title: 'Launch & Aftercare',
      items: [
        'Testing on real iPhone and Android devices',
        'Store listing, screenshots and description',
        'App Store and Google Play submission',
        'We handle any review rejections',
        '3 months of fixes and OS updates',
        '100% ownership of the code and the accounts',
      ],
    },
  ],
}

export const ultimateBrandingKit = {
  id: 'ultimate-kit',
  eyebrow: 'Everything, in one kit',
  name: 'Ultimate',
  kind: 'Branding Kit',
  price: 749,
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

/* ---------- The flagship offer ---------- */

/**
 * One offer sits above the catalogue: the complete brand, in a single order.
 *
 * It is built from the highest tier of every service we sell, so the value
 * shown against it is the real sum of those products rather than an invented
 * "RRP". Paying in two halves is what makes a four-figure order easy to say
 * yes to, so the terms are stated on the card rather than buried in a quote.
 */
const _flagship = {
  id: 'complete-brand',
  eyebrow: 'Our best offer',
  name: 'The Complete Brand',
  price: 1899,
  tagline:
    'Every part of how your business looks, the logo, everything it gets printed on, the moving version for video, and the website customers land on, designed together by one team.',
  payment: '50% to start, 50% when you approve the finished work.',
  includes: [
    { label: 'Platinum Logo, unlimited concepts, editable master files', price: 279 },
    { label: 'Ultimate Branding Kit, 16 branded items, cards to signage', price: 749 },
    { label: 'Gold Logo Animation, custom motion graphics with voice-over', price: 749 },
    { label: '5-page website, designed, built and launched', price: 999 },
    { label: '250 business cards printed and posted to you', price: 299 },
    { label: '3 social ad banners and a flyer design', price: 299 },
  ],
  reasons: [
    'One team, one brief, nothing is handed to a freelancer halfway through.',
    'Everything matches, because it is all drawn from the same logo on the same week.',
    'Bought separately these six pieces are ordered from four different suppliers.',
  ],
}

const flagshipWas = _flagship.includes.reduce((sum, part) => sum + part.price, 0)

export const flagship = {
  ..._flagship,
  was: flagshipWas,
  saving: flagshipWas - _flagship.price,
  savingPct: Math.round(((flagshipWas - _flagship.price) / flagshipWas) * 100),
}

/* ---------- Add-ons and brand protection ---------- */

/**
 * The extras clients ask for once the design is signed off. Trademark filing
 * sits first because it is the one most owners do not know they can do, and
 * the one that actually protects what they just paid us to draw.
 */
/**
 * Trademark filing is priced in two parts because it is two pieces of work.
 * $599 buys the filing itself, start to finish, however long the examination
 * runs. $350 is per class of goods or services, and how many of those a
 * business needs is decided by what it actually sells, not by us.
 */
export const brandProtection = {
  id: 'trademark',
  eyebrow: 'Protect your brand',
  title: 'Register your logo as a US trademark',
  href: '/trademark-filing',
  price: 599,
  classPrice: 350,
  plain:
    'A logo you own is yours to use. A logo you have registered is yours to defend. We prepare and file the paperwork with the USPTO, the official US trademark office, so a competitor cannot legally trade on the mark you just paid for.',
  points: [
    'We run a clearance search first and tell you honestly if the name is likely to clash',
    'We prepare and file the application with the USPTO for you',
    'We reply to the examiner on your behalf if they come back with questions',
    'Trademark filing does not replace the separate $499 logo copyright assignment certificate',
  ],
  note: 'Our filing service is $599, plus $350 for each class your business needs. The USPTO charges its own government filing fee per class, paid directly to them.',
}

/**
 * The other half of brand protection, and the one people confuse with the
 * trademark. This assigns our copyright in the finished artwork to the client
 * in signed writing; the trademark registers the mark against competitors.
 * The price was written out by hand in three places before it lived here.
 */
export const copyrightCertificate = {
  id: 'copyright-certificate',
  name: 'Copyright assignment certificate',
  href: '/copyright-certificate',
  price: 499,
  plain:
    'The design fee pays for the work. This is the separate signed instrument that transfers our copyright in the approved final artwork to your business and authorises public commercial use from a stated date.',
}

export const addOns = {
  id: 'add-ons',
  title: 'Add-ons people usually want',
  plain: 'Everything here is optional and can be added at any point, before or after the main job.',
  /**
   * `art` and `tone` pick the drawn scene and colour way the card is painted
   * in, the same pair the service cards use. `kind` is the one-word label above
   * the title, so a row of extras can be sorted by eye before it is read.
   */
  items: [
    {
      name: 'Printed business cards',
      art: 'cards',
      tone: 'blue',
      kind: 'Print',
      price: 149,
      from: true,
      body: 'We print and post the cards we designed for you, on proper stock.',
      // Four quantities crammed into the description read as a wall of
      // numbers. As a row of chips they are a price list you can scan.
      tiers: [
        { qty: '100', price: 149 },
        { qty: '250', price: 259 },
        { qty: '500', price: 429 },
        { qty: '1,000', price: 529 },
      ],
    },
    {
      name: 'Domain and hosting setup',
      art: 'hosting',
      tone: 'violet',
      kind: 'Launch',
      price: 219,
      body: 'We buy the domain, set up the hosting and put the site live. First year included, then it renews at cost.',
    },
    {
      name: 'Extra website pages',
      art: 'pages',
      tone: 'cyan',
      kind: 'Build',
      price: 129,
      body: 'Any page beyond the ones in your package, designed and built to match.',
    },
    {
      name: 'Rush delivery',
      art: 'rush',
      tone: 'orange',
      kind: 'Speed',
      price: 149,
      body: 'Your job jumps the queue and first concepts land within 24 hours.',
    },
    {
      name: 'Social media pack',
      art: 'social',
      tone: 'amber',
      kind: 'Social',
      price: 219,
      body: '12 ready-to-post graphics built from your brand, sized for Instagram, Facebook and LinkedIn.',
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
      'A bundle is simply two or three of the services below ordered at the same time. You get exactly the same work, it just costs less than buying the parts one by one.',
    howToChoose: 'Need a website? Take a 3-in-1. Only need the logo and print basics? Take a 2-in-1.',
    from: Math.min(lowest(bundles3in1), lowest(bundles2in1)),
    groups: [bundles3in1, bundles2in1],
    bigPackages: [diamondPackage],
    bigPackagesTitle: 'One more option: the Diamond package',
    bigPackagesBlurb:
      'Same idea as a 3-in-1, with one difference, we print and post 250 business cards to you. The website is a single page rather than five.',
  },
  {
    id: 'logo',
    tab: 'Logo',
    icon: 'logo',
    title: 'Logo design',
    plain:
      'We draw original designs for your business, you pick one, and we adjust it until it is right. The design price does not include copyright ownership; the separate signed certificate is $499.',
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
      'Your logo applied to the everyday items a business needs, business cards, letterheads, envelopes, email signatures, social media covers, signage.',
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
    id: 'app',
    tab: 'Mobile app',
    icon: 'mobile',
    title: 'Mobile app design & build',
    plain:
      'We work out what the app has to do, design every screen, build it for iPhone and Android and put it live in both stores. The code is yours and the store accounts stay in your name.',
    howToChoose:
      'Two questions: do you need it built as well as designed, and do people have to sign in or pay inside it? That points straight at your tier.',
    from: lowest(appPackages),
    groups: [appPackages],
    bigPackages: [appLaunchPackage],
    bigPackagesTitle: 'Or hand us the whole launch',
    bigPackagesBlurb:
      'Planning, design, build, store submission and the first three months of updates, at one fixed price.',
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
  {
    id: 'video',
    tab: 'Video and YouTube',
    icon: 'animation',
    title: 'Video, YouTube and sound',
    plain:
      'We edit the footage you send us and hand it back ready to upload: cuts, music, captions, thumbnails, intros, outros and a proper sound mix. Film and advert work is graded and scored like a commercial.',
    howToChoose:
      'One video that needs tidying up? Take a Starter Edit. Something with money riding on it, a commercial or a product film? Take Film and Ads.',
    from: lowest(videoPackages),
    groups: [videoPackages],
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
    recommend: 'Platinum Logo',
    price: 279,
    note: 'Unlimited designs and changes, editable master files, matching business card.',
    category: 'logo',
  },
  {
    id: 'logo-and-print',
    question: 'I need a logo and the print basics',
    body: 'Business cards, letterhead and social media covers that all match the logo.',
    recommend: 'Ultimate 2-in-1 Bundle',
    price: 899,
    note: 'Top-tier logo plus all 16 branded items, nothing left to buy later.',
    category: 'bundles',
  },
  {
    id: 'everything',
    question: 'I need the whole brand sorted',
    body: 'Logo, print, the moving version for video, and a website, handled in one go.',
    recommend: 'The Complete Brand',
    price: 1899,
    note: `Our best offer, ${flagship.savingPct}% below buying the six pieces separately.`,
    category: 'complete-brand',
  },
]

/** The single package we point undecided visitors at first. */
export const headline = flagship

/* ---------- Legacy lookups (service pages and the home page) ---------- */

export const pricingSections = [
  bundles3in1,
  bundles2in1,
  logoPackages,
  animatedLogo,
  brandingKits,
  websitePackages,
  appPackages,
  videoPackages,
]

export const sectionById = Object.fromEntries(pricingSections.map((s) => [s.id, s]))

export const bigPackageById = {
  diamond: diamondPackage,
  'award-winning': awardWinningPackage,
  'extensive-premium': premiumPlan,
  'app-launch': appLaunchPackage,
  'ultimate-kit': ultimateBrandingKit,
}
