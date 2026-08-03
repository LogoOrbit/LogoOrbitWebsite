export const site = {
  name: 'LogoOrbit',
  domain: 'logoorbit.net',
  url: 'https://www.logoorbit.net',
  // Everything a customer sends goes to support. Contracts, privacy requests
  // and anything a lawyer touches goes to the legal address instead.
  email: 'support@logoorbit.net',
  legalEmail: 'legal@logoorbit.net',
  phone: '+1 (512) 256-1757',
  phoneHref: 'tel:+15122561757',
  hours: 'Mon to Fri, 11 AM to 8 PM',
  rating: 4.5,
  reviewCount: 8503,
  years: 15,
  addresses: [
    'RevoluSys Inc, 8 The Green Ste A, Dover, Delaware, 19901',
    '244 5th Ave. Suite 22, New York, NY 10001',
  ],
}

/**
 * WhatsApp is the quick lane for ordinary website enquiries. A price check,
 * "is my file ready", a question before ordering, anything that would
 * otherwise sit in an inbox for a morning. It is watched by the same team
 * that answers the phone and support@, and it is not a legal channel: the
 * legal desk is reachable by email only.
 */
export const whatsapp = {
  display: '+1 (234) 529-8737',
  number: '12345298737',
  defaultMessage: 'Hi LogoOrbit, I have a quick question about',
}

export function whatsappLink(message = `${whatsapp.defaultMessage} my project.`) {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`
}

/**
 * The two people who take a new enquiry from the first question through to a
 * quote. Writing to either reaches a named person rather than a shared queue.
 * Anything about work already in progress still goes to support.
 */
export const salesTeam = [
  {
    name: 'Brock Wilson',
    role: 'Sales Representative',
    email: 'brock@logoorbit.net',
    blurb: 'New projects, package advice and fixed quotes for logo, brand and print work.',
  },
  {
    name: 'Sam Marcus',
    role: 'Sales Representative',
    email: 'sam@logoorbit.net',
    blurb: 'New projects, package advice and fixed quotes for websites, apps, video and Amazon.',
  },
]

/**
 * The person a client is actually put through to when a question stops being
 * about design and starts being about rights, contracts or data. Email is the
 * only route to him, deliberately, so every legal question arrives in writing.
 */
export const legalCounsel = {
  name: 'Greg Adams',
  role: 'Senior Legal Counsel',
  bar: 'State Bar of California',
  department: 'Legal Compliance Department',
  teams: ['Intellectual Property Review Team', 'Trademark & Brand Protection Division'],
  email: 'legal@logoorbit.net',
  blurb:
    'Greg reviews the ownership paperwork behind every finished design, runs the clearance checks before a trademark application goes to the USPTO, and handles privacy and data requests. If your question is about who owns what, he is the one who answers it.',
  handles: [
    {
      title: 'Copyright and ownership',
      body: 'The written transfer that hands you the design, and any question about what you are free to do with it.',
    },
    {
      title: 'Trademark filings',
      body: 'Clearance searches, USPTO applications, and replying to an examiner if one comes back with questions.',
    },
    {
      title: 'Brand protection',
      body: 'Someone using your mark without permission, or a claim that yours is too close to somebody else’s.',
    },
    {
      title: 'Privacy and your data',
      body: 'Copies of what we hold, corrections, deletion requests and anything else covered by the privacy policy.',
    },
    {
      title: 'Contracts and compliance',
      body: 'Service agreements, NDAs, vendor paperwork and purchase orders that need a signature from our side.',
    },
  ],
}

export const serviceNav = [
  { label: 'All services', href: '/services' },
  { label: 'Logo Design', href: '/logo-design' },
  { label: 'Website', href: '/website-design' },
  { label: 'Animation', href: '/animation' },
  { label: 'Book Publication', href: '/book-publications' },
  { label: 'Mobile App', href: '/mobile-application' },
  { label: 'Amazon Marketing', href: '/amazon-marketing' },
  { label: 'Video and YouTube', href: '/pricing#video' },
  { label: 'Brand Identity', href: '/services/brand-identity-design' },
  { label: 'UI/UX Design', href: '/services/ui-ux-design' },
  { label: 'Packaging Design', href: '/services/packaging-design' },
  { label: 'Print & Stationery', href: '/services/business-card-design' },
  { label: 'Social Media Design', href: '/services/social-media-design' },
]

/** The three hubs that hold the deeper pages together. */
export const exploreNav = [
  { label: 'Industries we design for', href: '/industries' },
  { label: 'Where we work', href: '/locations' },
  { label: 'Guides and resources', href: '/guides' },
]

export const nav = [
  {
    label: 'Portfolio',
    href: '/portfolio',
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Who we are', href: '/about' },
      { label: 'How we work', href: '/about#process' },
      { label: 'Why choose us', href: '/about#why' },
      { label: 'Client reviews', href: '/reviews' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Industries we design for', href: '/industries' },
      { label: 'Where we work', href: '/locations' },
      { label: 'Guides and resources', href: '/guides' },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
    children: [
      { label: 'Our best offer', href: '/pricing#complete-brand' },
      { label: 'Money-saving bundles', href: '/pricing#bundles' },
      { label: 'Logo packages', href: '/pricing#logo' },
      { label: 'Branding kits', href: '/pricing#branding-kit' },
      { label: 'Website packages', href: '/pricing#website' },
      { label: 'Mobile app packages', href: '/pricing#app' },
      { label: 'Logo animation', href: '/pricing#animation' },
      { label: 'Video and YouTube', href: '/pricing#video' },
    ],
  },
  { label: 'Services', href: '/services', children: serviceNav },
  {
    label: 'Brief',
    href: '/brief',
    children: [
      { label: 'Logo and brand brief', href: '/brief/logo.html' },
      { label: 'Website brief', href: '/brief/website.html' },
      { label: 'Video and YouTube brief', href: '/brief/video' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Send a message', href: '/contact' },
      { label: 'Call us', href: 'tel:+15122561757' },
      { label: 'WhatsApp us', href: whatsappLink() },
      { label: 'Email us', href: 'mailto:support@logoorbit.net' },
      { label: 'Talk to sales', href: '/contact#sales' },
      { label: 'Legal & compliance', href: '/legal' },
    ],
  },
]

export const legalLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Guides', href: '/guides' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Legal & Compliance', href: '/legal' },
  { label: 'Contact Us', href: '/contact' },
]

export const services = [
  {
    id: 'logo',
    href: '/logo-design',
    name: 'Logo Design',
    tagline: 'A logo you will still like in ten years',
    description:
      'We draw original logos by hand for your business, show you real options, and change them until you are happy. You get every file type and you own the lot.',
    bullets: ['Changes until it is right', 'Files that print at any size', 'The rights are yours, in writing'],
  },
  {
    id: 'website',
    href: '/website-design',
    name: 'Website Design',
    tagline: 'A site that loads fast and brings you work',
    description:
      'Websites built to look right on a phone, open quickly, show up on Google and turn the people who visit into people who call you.',
    bullets: ['Built for phones first', 'Set up so Google can find you', 'You can edit it yourself'],
  },
  {
    id: 'animation',
    href: '/animation',
    name: 'Video, Animation & YouTube',
    tagline: 'Your brand, moving and with sound',
    description:
      'Animated logos, YouTube edits, thumbnails, shorts, adverts and sound. Send the footage and we hand it back ready to upload.',
    bullets: ['Video and YouTube editing', 'Thumbnails and shorts', 'Sound design and voice-over'],
  },
  {
    id: 'mobile',
    href: '/mobile-application',
    name: 'Mobile Applications',
    tagline: 'An app your customers can actually use',
    description:
      'We plan the screens, design them and build the app for both iPhone and Android, then put it live in the stores for you. From $999, and the code is yours.',
    bullets: ['UX wireframes and prototypes', 'Native & cross-platform builds', 'Live in both app stores'],
  },
  {
    id: 'book',
    href: '/book-publications',
    name: 'Book Publication',
    tagline: 'From finished manuscript to books on sale',
    description:
      'Cover design, page layout and formatting for print and ebook, plus help getting the book listed and selling.',
    bullets: ['Cover & interior design', 'Print + eBook formats', 'Distribution setup'],
  },
  {
    id: 'amazon',
    href: '/amazon-marketing',
    name: 'Amazon Marketing',
    tagline: 'Get found on Amazon and sell more of it',
    description:
      'We rewrite your listings, build the picture-led A+ pages and run the ads, so your product shows up before the competition.',
    bullets: ['Listing SEO', 'A+ brand content', 'PPC management'],
  },
]

export const whyUs = [
  {
    title: 'Nothing here is a template',
    body: 'Every design is drawn from scratch for your business. We never resell a concept and we never pull one out of a stock library.',
  },
  {
    title: 'We turn work around fast',
    body: 'First concepts usually land within 24 hours. Fifteen years of doing this means we are quick without cutting corners.',
  },
  {
    title: 'We have worked in your industry',
    body: 'Plumbers, law firms, food trucks, software companies. Whatever you sell, we have almost certainly branded something like it.',
  },
  {
    title: 'We keep going until you are happy',
    body: 'If a design is not right, say so plainly and we start again. Someone answers the phone whenever you call.',
  },
  {
    title: 'Real designers, in our own studio',
    body: 'Your work is done by our own team in the USA. Nothing gets passed to a freelancer you never speak to.',
  },
  {
    title: 'One team for the whole brand',
    body: 'Logo, website, print, video, social, trademark filing. You never have to find a second supplier halfway through.',
  },
]

export const process = [
  {
    step: '01',
    title: 'Share Your Brief',
    body: 'Tell us what your business does and who buys from you, in your own words. It is free and you are not committing to anything.',
    href: '/brief',
    cta: 'Fill in the brief form',
  },
  {
    step: '02',
    title: 'Designs Back Fast',
    body: 'Our designers start straight away and send you real options to look at, often the same day.',
  },
  {
    step: '03',
    title: 'Refine Together',
    body: 'Point at the one you like and tell us what to change. We keep adjusting it until you are happy with it.',
  },
  {
    step: '04',
    title: 'Own Every File',
    body: 'You get every file you need for print and web, plus the rights in writing. The design is yours for good.',
  },
]

export const testimonials = [
  {
    quote:
      'John helped me a lot in brainstorming the ideas and getting the final files within hours. Excellent work and service.',
    name: 'Rusk Jones',
    company: 'The Sealant Guys',
  },
  {
    quote:
      'Their logo maker is awesome. I would highly recommend this site to businesses who are looking to get a complete brand identity at one place.',
    name: 'Rebecca Rowe',
    company: 'Planticious',
  },
  {
    quote:
      'It was my first experience with any online logo maker tool, and it went really well. Thank you.',
    name: 'Alan Mekinley',
    company: 'Battlefield',
  },
  {
    quote:
      'Franklin walked us through three directions and nailed the final mark on the first revision. The turnaround was genuinely unmatched.',
    name: 'Franklin D.',
    company: 'Northline Logistics',
  },
  {
    quote:
      'We came for a logo and left with a whole brand system, website, social kit, the lot. One team, one invoice, zero hassle.',
    name: 'Guage M.',
    company: 'Guage Fitness',
  },
  {
    quote:
      'Rhonda and the team understood our market better than agencies charging ten times as much. Highly recommended.',
    name: 'Rhonda Pierce',
    company: 'Bloom & Co.',
  },
]

export const faqs = [
  {
    q: 'How fast will I see my first designs?',
    a: 'Usually within 24 hours of you telling us about the business, and never later than 48. If you are up against a deadline, say so and we will put your job at the front of the queue.',
  },
  {
    q: 'Do I own the logo when it is finished?',
    a: 'Yes, completely. The rights transfer to you in writing and you get the master files with them. There is no licence to renew and nothing else to pay, ever.',
  },
  {
    q: 'Can you register my logo as a trademark?',
    a: 'Yes. We run a search first, tell you honestly whether the name is likely to clash, then prepare and file the application with the USPTO for you. Our fee is $299 per class plus the government filing fee.',
  },
  {
    q: 'What files do I actually get?',
    a: 'The ones printers ask for (AI, EPS, PDF, SVG) and the ones websites and social profiles need (PNG with a see-through background, JPG), in every size. If a printer ever asks for something unusual, send us the email and we will make it.',
  },
  {
    q: 'How many changes can I ask for?',
    a: 'On Gold and above, as many as it takes. There is no counter running in the background and nobody will tell you that you have used up your revisions.',
  },
  {
    q: 'Do you do anything besides logos?',
    a: 'Yes. Websites and online shops, business cards and print, video and YouTube editing, thumbnails, logo animation, sound, mobile apps, book covers and Amazon listings. One team, one point of contact.',
  },
  {
    q: 'What if I have no idea what I want?',
    a: 'That is the normal starting point. Fill in the short brief form, or just call us, and a designer will ask a few simple questions and take it from there. You do not need to know any design words.',
  },
]

export const industries = [
  'Technology', 'Healthcare', 'Real Estate', 'Food & Beverage', 'Fitness',
  'Finance', 'Education', 'E-commerce', 'Construction', 'Travel',
  'Beauty', 'Logistics', 'Legal', 'Automotive', 'Non-profit',
]
