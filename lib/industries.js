/**
 * Industry landing pages.
 *
 * A logo brief from a dental practice and one from a gaming channel are not
 * the same job, and the search terms behind them are not the same either. Each
 * entry here is a page at /industries/<slug> written around what that sector
 * actually needs, with the portfolio filtered to matching work where we have it.
 *
 * `portfolioCategory` maps to the categories in lib/portfolio.js. Where a
 * sector has no matching client work the field is null and the page shows the
 * general wall instead of pretending to have sector examples.
 */

export const industryPages = [
  {
    slug: 'technology',
    name: 'Technology',
    metaTitle: 'Branding & Design for Technology Companies',
    metaDescription:
      'Logo design, product UI and websites for technology companies, built to look credible to buyers who evaluate a dozen vendors before they call.',
    h1: 'Design for technology companies',
    highlight: 'that have to look credible',
    intro:
      'Technology buyers shortlist from a browser tab. Your site, your product screenshots and your one-pager get compared against better-funded competitors before anyone speaks to you, and looking underbuilt costs you the meeting.',
    portfolioCategory: 'Technology',
    challenges: [
      {
        title: 'Everyone picked the same blue',
        body: 'Enterprise technology has converged on one palette and one geometric sans. We deliberately design outside it while keeping the credibility signals buyers look for.',
      },
      {
        title: 'The product screenshot is the ad',
        body: 'For most technology companies the interface is the strongest marketing asset there is. If the UI looks unfinished, no amount of website polish covers for it.',
      },
      {
        title: 'Explaining what it does',
        body: 'Technical products fail on the homepage when they describe architecture instead of outcome. We structure the page around what changes for the buyer.',
      },
    ],
    services: ['saas-product-design', 'ui-ux-design', 'brand-identity-design', 'pitch-deck-design', 'explainer-video', 'landing-page-design'],
    faqs: [
      {
        q: 'Do you understand technical products?',
        a: 'Well enough to design them. We have branded infrastructure tools, IT consultancies, drone operators and SaaS platforms, and we ask for a product walkthrough before design starts rather than working from a brief alone.',
      },
      {
        q: 'Can you design our product UI as well as the marketing site?',
        a: 'Yes, and it is worth doing together. The single most common problem in technology branding is a polished marketing site that leads into a product that looks like a different company built it.',
      },
    ],
    keywords: 'tech company branding, software logo design, IT company design, technology brand identity',
  },
  {
    slug: 'saas',
    name: 'SaaS',
    metaTitle: 'Branding & Product Design for SaaS Companies',
    metaDescription:
      'SaaS branding and product design covering identity, marketing site, onboarding, dashboards and the pricing page that converts trials.',
    h1: 'Design for SaaS companies',
    highlight: 'from landing page to logged-in',
    intro:
      'SaaS design is really two products: the site that sells the trial and the app that has to justify the subscription. Most teams get one right. We work across both, because activation is where the money leaks.',
    portfolioCategory: 'Technology',
    challenges: [
      {
        title: 'The pricing page decides revenue',
        body: 'Plan structure, feature comparison and where the emphasis sits change conversion more than almost anything else on a SaaS site.',
      },
      {
        title: 'Onboarding is always last',
        body: 'The screens that decide whether a trial converts are usually built the week before launch. We design them first, not last.',
      },
      {
        title: 'The marketing site and app drift apart',
        body: 'Two teams, two codebases, two palettes. A shared token set and a real design system stops the split before it starts.',
      },
    ],
    services: ['saas-product-design', 'ui-ux-design', 'dashboard-design', 'design-system', 'landing-page-design', 'startup-branding'],
    faqs: [
      {
        q: 'Can you design our pricing page?',
        a: 'Yes, and we treat it as a conversion problem rather than a layout one: how many plans, what anchors the middle tier, which features are visible at a glance, and what the comparison table hides.',
      },
      {
        q: 'Do you work in our existing Figma library?',
        a: 'Yes. Working inside an established library is faster and produces something your engineers can ship, rather than a beautiful file that never gets built.',
      },
    ],
    keywords: 'saas branding, saas web design, b2b software design, saas ui ux, subscription product design',
  },
  {
    slug: 'startups',
    name: 'Startups',
    metaTitle: 'Startup Branding & Design Services',
    metaDescription:
      'Fast, complete branding for startups: identity, pitch deck, landing page and product UI delivered in sprints that keep up with a raise.',
    h1: 'Design for startups',
    highlight: 'moving faster than agencies',
    intro:
      'Startups do not need a twelve-week brand engagement. They need a credible identity this week, a deck before the meeting, and a landing page before the launch. We sequence delivery so the useful things arrive first.',
    portfolioCategory: 'Business',
    challenges: [
      {
        title: 'Everything is needed at once',
        body: 'Deck, site, product, social. We deliver in priority order so you can start using the brand while the rest is still being built.',
      },
      {
        title: 'The positioning is still moving',
        body: 'Early-stage positioning changes. We build a flexible system rather than a rigid one, so a pivot means new messaging, not a new identity.',
      },
      {
        title: 'Looking bigger than you are',
        body: 'Enterprise buyers and investors both read design as a proxy for competence. Consistency signals a real company more than headcount does.',
      },
    ],
    services: ['startup-branding', 'pitch-deck-design', 'landing-page-design', 'brand-identity-design', 'saas-product-design', 'wireframing-prototyping'],
    faqs: [
      {
        q: 'We have no budget yet. Where should we spend it?',
        a: 'The deck and the landing page, in that order, then a logo good enough not to be a distraction. A full identity system can wait until you know what you are selling and to whom.',
      },
      {
        q: 'How fast can you turn around a pitch deck?',
        a: 'Three to five working days for a full design pass on existing content. If you have a meeting sooner than that, tell us and we will work to the date.',
      },
    ],
    keywords: 'startup branding, startup logo, seed stage design, founder brand, mvp design',
  },
  {
    slug: 'artificial-intelligence',
    name: 'AI & Machine Learning',
    metaTitle: 'Branding & Design for AI Companies',
    metaDescription:
      'Branding and interface design for AI and machine learning companies, avoiding the neural-network cliché while making the product legible.',
    h1: 'Design for AI companies',
    highlight: 'without the glowing brain',
    intro:
      'AI branding has settled into a small set of visual clichés: purple gradients, node diagrams, a glowing brain. They signal category and nothing else. The harder and more valuable job is making an abstract capability feel concrete and trustworthy.',
    portfolioCategory: 'Technology',
    challenges: [
      {
        title: 'Every competitor looks identical',
        body: 'The gradient-and-node aesthetic is now the category default, which means it differentiates nobody. We design away from it deliberately.',
      },
      {
        title: 'Trust is the buying obstacle',
        body: 'Buyers worry about accuracy, data handling and control. Design that shows sources, confidence and an undo path outperforms design that promises magic.',
      },
      {
        title: 'The interface is unusual',
        body: 'Conversational and generative interfaces have few settled patterns, so states, streaming, errors and correction all need designing rather than borrowing.',
      },
    ],
    services: ['saas-product-design', 'ui-ux-design', 'brand-identity-design', 'explainer-video', 'pitch-deck-design', 'landing-page-design'],
    faqs: [
      {
        q: 'How do you design for a product whose output varies?',
        a: 'By designing the states rather than the happy path: what a user sees while it generates, when it is uncertain, when it is wrong, and how they correct it. That is most of the real work in AI interfaces.',
      },
      {
        q: 'Do you use AI in your own process?',
        a: 'For exploration and production support, yes. Final identity work is drawn by our designers, because generated marks cannot be reliably cleared for ownership and that is exactly what you are buying.',
      },
    ],
    keywords: 'ai company branding, machine learning design, ai product ui, ai startup logo',
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce & Retail',
    metaTitle: 'E-commerce & Retail Brand Design',
    metaDescription:
      'Branding and store design for e-commerce and retail: identity, packaging, product imagery, storefront and the checkout that keeps the sale.',
    h1: 'Design for retail brands',
    highlight: 'sold online and on a shelf',
    intro:
      'Retail brands are judged in three places: a thumbnail in a search result, a product page, and the moment the box arrives. We design all three together, because a strong storefront with weak packaging loses the repeat purchase.',
    portfolioCategory: 'Retail',
    challenges: [
      {
        title: 'The thumbnail does the selling',
        body: 'Whether on your own store or a marketplace, the first image decides the click. It has to work at postage-stamp size.',
      },
      {
        title: 'Unboxing is free marketing',
        body: 'Packaging is the one physical brand moment an online-only business gets, and it is what customers photograph and post.',
      },
      {
        title: 'Checkout leaks',
        body: 'Surprise shipping costs, forced account creation and long forms cost more sales than any design decision above the fold.',
      },
    ],
    services: ['ecommerce-website-design', 'packaging-design', 'shopify-store-design', 'amazon-listing-design', 'product-photography-editing', 'brand-identity-design'],
    faqs: [
      {
        q: 'Should we sell on our own site or a marketplace?',
        a: 'Both, usually. A marketplace buys reach and takes the margin and the customer relationship; your own store keeps both and has to earn its own traffic. The design work differs and we handle each properly.',
      },
      {
        q: 'How much does packaging design matter for a small brand?',
        a: 'Disproportionately. It is the difference between a parcel and a brand experience, and it is the cheapest thing you can do to increase the chance of a second order.',
      },
    ],
    keywords: 'ecommerce branding, retail brand design, d2c branding, online store design, packaging design',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & Medical',
    metaTitle: 'Healthcare & Medical Practice Branding',
    metaDescription:
      'Branding and website design for clinics, practices and healthcare providers, balancing warmth with the credibility patients look for.',
    h1: 'Design for healthcare providers',
    highlight: 'patients decide to trust',
    intro:
      'Patients choose a clinic on a mix of credentials and comfort, and design carries both signals. Too clinical reads as cold, too soft reads as unqualified. The website also has to do practical work: booking, locations, hours and insurance answers.',
    portfolioCategory: 'Healthcare',
    challenges: [
      {
        title: 'Credibility and warmth at once',
        body: 'Healthcare design has to reassure on competence and on being treated like a person. That balance is the whole job.',
      },
      {
        title: 'The site is a booking tool',
        body: 'Most healthcare traffic wants one of four things: book, call, find you, or check whether you take their insurance. Everything else is secondary.',
      },
      {
        title: 'Accessibility is not optional',
        body: 'Patient audiences skew older and include impaired vision and motor control. Contrast, type size and tap targets matter more here than anywhere.',
      },
    ],
    services: ['wordpress-website-design', 'brand-identity-design', 'signage-design', 'explainer-video', 'stationery-design', 'seo-web-design'],
    faqs: [
      {
        q: 'Can you handle patient privacy requirements?',
        a: 'We design forms and flows to minimise collected data and we do not host patient information ourselves. Where a form touches protected health information we integrate a compliant provider rather than building it ourselves.',
      },
      {
        q: 'Do you design for multi-location practices?',
        a: 'Yes, including individual location pages with correct local business markup, which is what drives the map results patients search from.',
      },
    ],
    keywords: 'healthcare branding, medical logo design, clinic website design, dental practice branding',
  },
  {
    slug: 'dental',
    name: 'Dental Practices',
    metaTitle: 'Dental Practice Branding & Website Design',
    metaDescription:
      'Branding and websites for dental practices, designed around local search, online booking and the treatment pages patients actually read.',
    h1: 'Design for dental practices',
    highlight: 'competing on the same high street',
    intro:
      'Dentistry is one of the most locally competitive categories there is. Patients search on their phone, compare three practices in a map pack, and book with whichever one made it easiest. The design job is mostly about removing friction.',
    portfolioCategory: 'Healthcare',
    challenges: [
      {
        title: 'The map pack is the shop window',
        body: 'Most dental traffic starts in local results. Consistent listings, real photographs and structured data decide whether you appear in the three shown.',
      },
      {
        title: 'Anxiety is the real objection',
        body: 'Nervous patients need reassurance before they need a price list. Photographs of the actual practice and team outperform stock imagery decisively.',
      },
      {
        title: 'Treatment pages carry the search',
        body: 'People search for implants, aligners or whitening, not for dentists. Each treatment needs a page that answers cost, process and recovery.',
      },
    ],
    services: ['wordpress-website-design', 'brand-identity-design', 'seo-web-design', 'signage-design', 'social-media-design', 'flyer-design'],
    faqs: [
      {
        q: 'What actually brings in new patients?',
        a: 'Being visible in local results, being easy to book, and having a treatment page that answers cost honestly. Those three outperform almost any other spend.',
      },
      {
        q: 'Should we show prices?',
        a: 'A range, yes. Practices that hide prices entirely lose enquiries to those that publish a from-price, because patients assume the worst in the absence of information.',
      },
    ],
    keywords: 'dental branding, dentist website design, dental practice logo, orthodontist marketing design',
  },
  {
    slug: 'finance',
    name: 'Finance & Fintech',
    metaTitle: 'Finance & Fintech Brand Design',
    metaDescription:
      'Branding and product design for financial services and fintech, built for regulated environments where trust is the entire proposition.',
    h1: 'Design for financial services',
    highlight: 'where trust is the product',
    intro:
      'Financial brands are buying credibility. The design has to feel established without feeling dated, and every claim has to survive a compliance review, which changes how you write and lay out a page.',
    portfolioCategory: 'Finance',
    challenges: [
      {
        title: 'Compliance shapes the layout',
        body: 'Disclaimers, risk warnings and required disclosures are part of the design, not something added afterwards in six-point grey.',
      },
      {
        title: 'Serious without being stuffy',
        body: 'Fintech has to look safe enough for money and modern enough to be worth switching to. Getting both requires restraint rather than novelty.',
      },
      {
        title: 'Numbers have to be readable',
        body: 'Tabular figures, aligned decimals and clear positive-negative treatment are basic, and routinely missing from financial interfaces.',
      },
    ],
    services: ['brand-identity-design', 'saas-product-design', 'dashboard-design', 'presentation-design', 'wordpress-website-design', 'brand-guidelines'],
    faqs: [
      {
        q: 'Can you work with our compliance team?',
        a: 'Yes, and the earlier the better. Designing a page then having disclosures forced in afterwards produces the worst result for everyone.',
      },
      {
        q: 'Why do so many finance brands look alike?',
        a: 'Because navy and a serif read as safe, so everyone defaults to them. Differentiation in this category usually comes from clarity and tone rather than colour.',
      },
    ],
    keywords: 'fintech branding, financial services design, bank logo design, investment firm branding',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate & Property',
    metaTitle: 'Real Estate & Property Brand Design',
    metaDescription:
      'Branding for estate agents, brokers and developers: identity, listing templates, signage, brochures and a site built around property search.',
    h1: 'Design for property professionals',
    highlight: 'selling on presentation',
    intro:
      'Property is sold on presentation, and the brand has to work across a sign in a garden, a listing on a portal, a brochure and an agent\'s personal marketing. Our largest single body of client work sits in this sector.',
    portfolioCategory: 'Real Estate',
    challenges: [
      {
        title: 'The agent is also a brand',
        body: 'Individual agents market themselves alongside the brokerage. The system has to accommodate personal branding without fragmenting.',
      },
      {
        title: 'Listings need templates, not designs',
        body: 'Agents produce listing graphics daily. What they need is a template that stays on-brand at speed, not a bespoke design each time.',
      },
      {
        title: 'The mark has to work on a board',
        body: 'A logo that reads on a screen can disappear on a sign at the end of a driveway. Board legibility is a design constraint from the start.',
      },
    ],
    services: ['brand-identity-design', 'signage-design', 'brochure-design', 'social-media-design', 'wordpress-website-design', 'business-card-design'],
    faqs: [
      {
        q: 'Do you design listing and sold templates?',
        a: 'Yes, as an editable template set so agents can produce them in minutes without a designer, in the sizes each portal and platform expects.',
      },
      {
        q: 'Can agents have their own version of the logo?',
        a: 'Yes, and it should be planned. We build a personal lockup rule into the identity so agent branding endorses the brokerage rather than competing with it.',
      },
    ],
    keywords: 'real estate branding, realtor logo design, property developer brand, estate agent design',
  },
  {
    slug: 'construction',
    name: 'Construction & Trades',
    metaTitle: 'Construction & Trade Business Branding',
    metaDescription:
      'Branding for builders, contractors and trades: logos that read on a van, signage, workwear, tender documents and a site that gets calls.',
    h1: 'Design for builders',
    highlight: 'and the trades',
    intro:
      'A construction brand lives outdoors: on a van at thirty miles an hour, on a site board, on a hi-vis jacket, on a tender document. It has to survive all of that in one colour, and we have branded a great many firms that do exactly this.',
    portfolioCategory: 'Construction',
    challenges: [
      {
        title: 'The van is the advertising',
        body: 'For most trades the vehicle is the highest-impression marketing they own, and it is usually designed last and badly.',
      },
      {
        title: 'One colour, dirty surfaces',
        body: 'Marks get embroidered, printed on hi-vis and stencilled on boards. Fine detail and gradients do not survive any of it.',
      },
      {
        title: 'Tenders are judged on presentation',
        body: 'On commercial work the submission document is compared side by side with competitors, and a scruffy one loses before it is read.',
      },
    ],
    services: ['vehicle-wrap-design', 'brand-identity-design', 'signage-design', 'business-card-design', 'wordpress-website-design', 'presentation-design'],
    faqs: [
      {
        q: 'What should go on my van?',
        a: 'What you do, where you work and one phone number, all large. Long service lists are unreadable in traffic and cost you the elements that matter.',
      },
      {
        q: 'Do you design tender and pre-qualification documents?',
        a: 'Yes, as a reusable template with your accreditations, case studies and team pages already laid out, so each submission is content work rather than design work.',
      },
    ],
    keywords: 'construction branding, builder logo design, contractor branding, trade business design',
  },
  {
    slug: 'home-services',
    name: 'Home Services',
    metaTitle: 'Home Services Branding & Design',
    metaDescription:
      'Branding for cleaning, landscaping, plumbing, HVAC and home service businesses, built for local search and repeat bookings.',
    h1: 'Design for home service',
    highlight: 'businesses',
    intro:
      'Home services compete on trust and proximity. A homeowner letting a stranger into the house wants to see a business that looks established, and most of that impression is made by the van, the uniform and the first page of Google.',
    portfolioCategory: 'Home Services',
    challenges: [
      {
        title: 'Trust before the doorbell',
        body: 'Uniforms, marked vehicles and named team photographs materially raise conversion for services delivered inside someone\'s home.',
      },
      {
        title: 'Local search is the whole funnel',
        body: 'Most enquiries come from a map result or a neighbourhood recommendation, which makes listings and reviews as important as the website.',
      },
      {
        title: 'Repeat business needs reminding',
        body: 'Gutter clearing, servicing and deep cleans are annual. Simple branded reminder material is often the highest-return thing a firm can print.',
      },
    ],
    services: ['vehicle-wrap-design', 'brand-identity-design', 'flyer-design', 'wordpress-website-design', 'business-card-design', 'social-media-design'],
    faqs: [
      {
        q: 'Do leaflets still work for home services?',
        a: 'In a defined local area, yes, better than most digital channels for the money. One offer, one number, delivered repeatedly to the same streets.',
      },
      {
        q: 'What is the fastest improvement we can make?',
        a: 'Usually a properly marked vehicle and a complete Google Business Profile with real photographs. Both are cheap and both are visible immediately.',
      },
    ],
    keywords: 'home services branding, cleaning company logo, plumber branding, hvac design, landscaping logo',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants & Food',
    metaTitle: 'Restaurant & Food Business Branding',
    metaDescription:
      'Branding for restaurants, cafes and food businesses: identity, menus, signage, packaging and the social content the category lives on.',
    h1: 'Design for restaurants',
    highlight: 'and food businesses',
    intro:
      'Food brands are photographed constantly, by staff and by customers. The identity has to look good on a menu, a takeaway box, a shopfront and in a badly lit photograph taken at a table, because that last one is most of your marketing.',
    portfolioCategory: 'Food & Drink',
    challenges: [
      {
        title: 'The menu is a sales document',
        body: 'Layout, section order and price treatment measurably change what people order and what you make per cover.',
      },
      {
        title: 'Packaging travels',
        body: 'Delivery has turned every takeaway container into a piece of outdoor advertising sitting on someone\'s desk.',
      },
      {
        title: 'Photographs decide the visit',
        body: 'People choose restaurants from images. Consistent treatment across your own photography and reposted customer content matters.',
      },
    ],
    services: ['menu-design', 'brand-identity-design', 'signage-design', 'packaging-design', 'social-media-design', 'wordpress-website-design'],
    faqs: [
      {
        q: 'How often should a menu be redesigned?',
        a: 'The design should last years; the content changes seasonally. That is why we hand over an editable file, so a new dish is a five-minute change.',
      },
      {
        q: 'Do we need a website if we are on delivery platforms?',
        a: 'Yes. Platforms take a large cut and own the customer. A simple site with direct ordering pays for itself quickly at any real volume.',
      },
    ],
    keywords: 'restaurant branding, cafe logo design, food truck branding, menu design, hospitality identity',
  },
  {
    slug: 'hospitality',
    name: 'Hotels & Hospitality',
    metaTitle: 'Hotel & Hospitality Brand Design',
    metaDescription:
      'Branding for hotels, resorts and hospitality businesses, from identity and signage to in-room collateral and direct booking sites.',
    h1: 'Design for hotels',
    highlight: 'and hospitality',
    intro:
      'A hotel brand is experienced in sequence: the listing, the booking confirmation, the sign at the entrance, the key card, the folder in the room. Consistency across that sequence is what makes a property feel considered rather than assembled.',
    portfolioCategory: 'Travel',
    challenges: [
      {
        title: 'Direct booking versus the OTAs',
        body: 'Every booking through an aggregator costs commission. A site that makes direct booking obviously better is a margin decision, not a design one.',
      },
      {
        title: 'Dozens of physical touchpoints',
        body: 'Signage, key cards, door hangers, menus, uniforms, toiletries. Each needs artwork, and each is a chance for the brand to fall apart.',
      },
      {
        title: 'Photography carries everything',
        body: 'Guests book from images. Design frames and sequences them; poor photography cannot be rescued by layout.',
      },
    ],
    services: ['brand-identity-design', 'signage-design', 'menu-design', 'wordpress-website-design', 'brochure-design', 'brand-guidelines'],
    faqs: [
      {
        q: 'How do we get more direct bookings?',
        a: 'Make the direct rate visibly the best, keep the booking flow to as few steps as the aggregators, and show real photographs of the actual rooms rather than staged stock.',
      },
      {
        q: 'Do you design in-room collateral?',
        a: 'Yes, the full set: directories, door hangers, key card sleeves, menus and signage, all from one system.',
      },
    ],
    keywords: 'hotel branding, hospitality design, resort logo, boutique hotel identity, guest house branding',
  },
  {
    slug: 'travel',
    name: 'Travel & Tourism',
    metaTitle: 'Travel & Tourism Brand Design',
    metaDescription:
      'Branding and website design for tour operators, travel agencies and tourism businesses, built around itineraries and enquiry conversion.',
    h1: 'Design for travel',
    highlight: 'and tourism businesses',
    intro:
      'Travel is sold on anticipation, and the design has to carry that while doing very practical work: itineraries, dates, prices, inclusions and a booking or enquiry path that survives being used on a phone in another time zone.',
    portfolioCategory: 'Travel',
    challenges: [
      {
        title: 'Itineraries are complex content',
        body: 'Day-by-day plans, inclusions, exclusions and pricing tiers need a layout system, not a fresh design for each tour.',
      },
      {
        title: 'Selling a place, not a product',
        body: 'Imagery does most of the persuasion, so the identity has to sit lightly on top of photography rather than compete with it.',
      },
      {
        title: 'Trust for a large prepayment',
        body: 'Customers are paying substantial sums months ahead. Credentials, protection and reviews need to be visible without cluttering the page.',
      },
    ],
    services: ['wordpress-website-design', 'brand-identity-design', 'brochure-design', 'social-media-design', 'landing-page-design', 'custom-illustration'],
    faqs: [
      {
        q: 'Should tours be bookable online or enquiry only?',
        a: 'Depends on the price and complexity. Packaged day tours should be bookable instantly; bespoke multi-week itineraries convert better through a structured enquiry that starts a conversation.',
      },
      {
        q: 'Do you design printed brochures for travel?',
        a: 'Yes, and they still work in this category, particularly for older and higher-value customers who browse at home before enquiring.',
      },
    ],
    keywords: 'travel branding, tour operator design, tourism logo, travel agency website, itinerary design',
  },
  {
    slug: 'fitness',
    name: 'Fitness & Wellness',
    metaTitle: 'Gym, Fitness & Wellness Branding',
    metaDescription:
      'Branding for gyms, studios, trainers and wellness businesses: identity, apparel, class schedules, signage and membership sign-up design.',
    h1: 'Design for gyms, studios',
    highlight: 'and trainers',
    intro:
      'Fitness brands get worn. Members buy the hoodie, post the class graphic and tag the studio, which means the identity has to look good on a garment and in a feed, not just on a sign. It is one of our largest bodies of client work.',
    portfolioCategory: 'Fitness',
    challenges: [
      {
        title: 'The logo goes on clothing',
        body: 'Fitness marks end up embroidered and printed constantly. Anything that cannot be stitched cleanly limits your merchandise revenue.',
      },
      {
        title: 'Schedules change weekly',
        body: 'Class timetables and challenge graphics are made weekly, so the system has to be template-driven or nobody keeps it up.',
      },
      {
        title: 'Community is the retention engine',
        body: 'Member photography, transformation posts and event graphics keep people in. The brand has to make user content look on-brand.',
      },
    ],
    services: ['brand-identity-design', 'apparel-design', 'social-media-design', 'signage-design', 'wordpress-website-design', 'merchandise-design'],
    faqs: [
      {
        q: 'Will the logo work embroidered on a hoodie?',
        a: 'We design for it from the start and supply a stitch-safe variant, because it is one of the most common uses of a fitness mark and one of the most common places they fail.',
      },
      {
        q: 'Do you design class timetable graphics?',
        a: 'Yes, as an editable weekly template so your team can update times without coming back to us.',
      },
    ],
    keywords: 'gym branding, fitness logo design, personal trainer brand, yoga studio design, wellness branding',
  },
  {
    slug: 'beauty',
    name: 'Beauty & Cosmetics',
    metaTitle: 'Beauty & Cosmetics Brand Design',
    metaDescription:
      'Branding for salons, cosmetics brands and beauty businesses, from identity and packaging to booking sites and social content systems.',
    h1: 'Design for beauty',
    highlight: 'and cosmetics brands',
    intro:
      'Beauty is a visual category with brutal competition on shelf and in feed. The identity has to work as a tiny label on a bottle, as a shopfront, and as the frame around before-and-after content that customers post themselves.',
    portfolioCategory: 'Fashion',
    challenges: [
      {
        title: 'Small labels, strict rules',
        body: 'Cosmetic labelling carries required ingredient and warning information, all of which has to fit on a very small surface.',
      },
      {
        title: 'Shade ranges need a system',
        body: 'A product line with twenty shades needs a naming and layout system, not twenty individual label designs.',
      },
      {
        title: 'Booking beats browsing',
        body: 'For salons the whole website exists to get an appointment booked, ideally in under a minute on a phone.',
      },
    ],
    services: ['packaging-design', 'label-design', 'brand-identity-design', 'social-media-design', 'ecommerce-website-design', 'instagram-post-design'],
    faqs: [
      {
        q: 'Can you fit the required ingredient list on a small label?',
        a: 'Yes, that is a standard constraint. Where the surface genuinely cannot hold it, the solution is a peel-back label or an outer carton, and we will design for whichever your regulator accepts.',
      },
      {
        q: 'How do we look premium on a small budget?',
        a: 'Restraint and one good material decision. A simple mark, a narrow palette and a single quality finish reads more expensive than a complex design printed cheaply.',
      },
    ],
    keywords: 'beauty branding, cosmetics packaging, salon logo design, skincare brand identity',
  },
  {
    slug: 'fashion',
    name: 'Fashion & Apparel',
    metaTitle: 'Fashion & Clothing Brand Design',
    metaDescription:
      'Branding for fashion labels and clothing brands: identity, woven labels, swing tags, lookbooks, packaging and storefront design.',
    h1: 'Design for fashion labels',
    highlight: 'and clothing brands',
    intro:
      'Fashion branding is physical. The neck label, the swing tag, the mailer and the tissue are where the brand actually gets experienced, and they need designing together with the identity rather than as an afterthought.',
    portfolioCategory: 'Fashion',
    challenges: [
      {
        title: 'Woven labels lose detail',
        body: 'Thread cannot hold thin strokes, so the mark needs a simplified variant designed for weaving from the outset.',
      },
      {
        title: 'Wholesale needs different documents',
        body: 'Buyers want line sheets and look books with codes, sizing and wholesale pricing, not the consumer-facing marketing.',
      },
      {
        title: 'Returns are a design problem',
        body: 'Clear sizing information, honest photography and good fit guides cut returns more than any policy change does.',
      },
    ],
    services: ['fashion-branding', 'apparel-design', 'packaging-design', 'ecommerce-website-design', 'instagram-post-design', 'brand-identity-design'],
    faqs: [
      {
        q: 'What do we need before approaching stockists?',
        a: 'A line sheet, a look book and consistent product photography. Buyers compare these side by side and an incomplete pack usually ends the conversation.',
      },
      {
        q: 'Do you design the garments themselves?',
        a: 'We design graphics, prints and branding rather than patterns and construction. For manufacturing we produce tech-pack-ready artwork to work alongside your pattern cutter.',
      },
    ],
    keywords: 'fashion branding, clothing brand design, apparel identity, streetwear branding, lookbook design',
  },
  {
    slug: 'education',
    name: 'Education & Training',
    metaTitle: 'Education & Training Brand Design',
    metaDescription:
      'Branding for schools, colleges, training providers and course creators, covering identity, prospectus, course materials and enrolment sites.',
    h1: 'Design for schools, colleges',
    highlight: 'and course providers',
    intro:
      'Education brands speak to two audiences at once: the learner and whoever is paying. A school site has to reassure parents while appealing to students, and a course platform has to convert a browser while remaining usable for months afterwards.',
    portfolioCategory: 'Business',
    challenges: [
      {
        title: 'Two audiences, one page',
        body: 'Students and parents, or learners and employers, want different information. The page has to serve both without becoming a compromise.',
      },
      {
        title: 'Prospectus and site must agree',
        body: 'Print prospectuses still drive enrolment decisions, and they need to be recognisably the same brand as the site the reader visits next.',
      },
      {
        title: 'Course material is design work',
        body: 'Slides, worksheets and certificates are what learners spend the most time with, and they are usually the least designed thing an institution owns.',
      },
    ],
    services: ['brand-identity-design', 'brochure-design', 'wordpress-website-design', 'presentation-design', 'signage-design', 'social-media-design'],
    faqs: [
      {
        q: 'Do you design course and workbook materials?',
        a: 'Yes, as a template system so your teaching team can produce consistent materials without design skills.',
      },
      {
        q: 'Can you design for an online course platform?',
        a: 'Yes, including the sales page, the lesson layout and the certificate, which learners share and which quietly markets the course.',
      },
    ],
    keywords: 'education branding, school logo design, university brand, training provider design, course branding',
  },
  {
    slug: 'legal',
    name: 'Legal & Professional Services',
    metaTitle: 'Law Firm & Professional Services Branding',
    metaDescription:
      'Branding for law firms, accountants and consultancies, balancing authority with approachability across identity, site and documents.',
    h1: 'Design for law firms',
    highlight: 'and professional services',
    intro:
      'Professional services sell judgment, which cannot be photographed. Design has to carry the credibility instead, across a site, a proposal, a letterhead and a business card, all of which are read carefully by people paying substantial fees.',
    portfolioCategory: 'Business',
    challenges: [
      {
        title: 'Authority without coldness',
        body: 'Firms that look too corporate lose individual clients; firms that look too casual lose commercial ones. Positioning decides where to sit.',
      },
      {
        title: 'The proposal wins the work',
        body: 'Most professional services are won on a document. A well-designed, reusable proposal template is one of the highest-return investments available.',
      },
      {
        title: 'Individuals carry the brand',
        body: 'Partners and consultants have personal reputations. The identity has to make room for named individuals without fragmenting.',
      },
    ],
    services: ['brand-identity-design', 'stationery-design', 'wordpress-website-design', 'presentation-design', 'letterhead-design', 'business-card-design'],
    faqs: [
      {
        q: 'Should partners have individual profile pages?',
        a: 'Yes. In professional services, individual profiles are among the most visited pages on the site, because clients are hiring a person as much as a firm.',
      },
      {
        q: 'Do you design proposal and pitch documents?',
        a: 'Yes, as a reusable template with credentials, case studies and pricing sections already laid out, so each pitch is content work rather than a redesign.',
      },
    ],
    keywords: 'law firm branding, legal logo design, accountant branding, consultancy identity, professional services design',
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    metaTitle: 'Automotive & Motor Trade Branding',
    metaDescription:
      'Branding for garages, dealerships, detailers and automotive businesses, designed for signage, vehicles, workwear and local search.',
    h1: 'Design for the',
    highlight: 'motor trade',
    intro:
      'Automotive brands are seen on forecourts, workshop signage, courtesy cars and workwear, usually outdoors and often dirty. The mark has to be bold, simple and legible in one colour on almost any surface.',
    portfolioCategory: 'Automotive',
    challenges: [
      {
        title: 'Outdoor legibility',
        body: 'Forecourt signage, banners and vehicle graphics are viewed at distance and speed, which puts hard limits on detail.',
      },
      {
        title: 'Trust in a low-trust category',
        body: 'Customers approach garages expecting to be overcharged. Transparent pricing and visible accreditations do real conversion work.',
      },
      {
        title: 'Stock changes constantly',
        body: 'Dealership sites need listing templates that stay tidy as inventory turns over rather than bespoke pages per vehicle.',
      },
    ],
    services: ['vehicle-wrap-design', 'signage-design', 'brand-identity-design', 'wordpress-website-design', 'social-media-design', 'poster-design'],
    faqs: [
      {
        q: 'Do you design forecourt and workshop signage?',
        a: 'Yes, the full set including fascia, banners, bay numbers and safety signage, produced to your sign-maker\'s specification.',
      },
      {
        q: 'What works best for a detailing or tuning business?',
        a: 'Before-and-after content, consistently framed and branded. It is the most persuasive material in the category and costs almost nothing beyond the template.',
      },
    ],
    keywords: 'automotive branding, garage logo design, car dealership brand, detailing business design',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing & Industrial',
    metaTitle: 'Manufacturing & Industrial Brand Design',
    metaDescription:
      'Branding for manufacturers and industrial suppliers: identity, technical catalogues, spec sheets, trade show stands and B2B websites.',
    h1: 'Design for manufacturers',
    highlight: 'and industrial suppliers',
    intro:
      'Industrial buyers are looking for specification, availability and reliability, not personality. The design job is making dense technical information findable and making a serious company look as capable as it is.',
    portfolioCategory: 'Business',
    challenges: [
      {
        title: 'Technical data is the content',
        body: 'Spec tables, tolerances, materials and certifications are what buyers came for. They need typographic care, not decoration.',
      },
      {
        title: 'Long, offline sales cycles',
        body: 'The site generates the enquiry; a catalogue, a spec sheet and a stand at a trade show close it. All of them need to match.',
      },
      {
        title: 'Big catalogues, frequent updates',
        body: 'Hundreds of SKUs with periodic revisions need a data-driven layout system rather than hand-built pages.',
      },
    ],
    services: ['catalog-design', 'brand-identity-design', 'trade-show-design', 'wordpress-website-design', 'brochure-design', 'presentation-design'],
    faqs: [
      {
        q: 'Can you build a catalogue from our product database?',
        a: 'Yes. Above roughly a hundred products we set up a data merge from your spreadsheet or export, so a reissue does not mean re-laying out the book.',
      },
      {
        q: 'Is a website worth it if we sell through distributors?',
        a: 'Yes. Distributors and specifiers research online before they order, and an unfindable manufacturer loses specification battles it never hears about.',
      },
    ],
    keywords: 'manufacturing branding, industrial logo design, b2b catalogue design, engineering firm brand',
  },
  {
    slug: 'logistics',
    name: 'Logistics & Transport',
    metaTitle: 'Logistics & Transport Brand Design',
    metaDescription:
      'Branding for logistics, haulage and courier businesses: fleet livery, tracking interfaces, quote flows and credible B2B websites.',
    h1: 'Design for logistics',
    highlight: 'and transport firms',
    intro:
      'A logistics brand is mostly seen on the side of a moving vehicle. Beyond the livery the design work is practical: quote forms, tracking screens and the credential-led site that wins a contract.',
    portfolioCategory: 'Business',
    challenges: [
      {
        title: 'Fleet livery at scale',
        body: 'Artwork has to work across vans, rigids and trailers at wildly different proportions, from one consistent system.',
      },
      {
        title: 'Tracking is a product surface',
        body: 'The tracking page is where customers spend the most time with your brand, and it is usually the least designed thing you own.',
      },
      {
        title: 'Quotes decide the enquiry',
        body: 'A quote form that asks for too much up front loses leads. Getting the minimum viable question set right is the whole job.',
      },
    ],
    services: ['vehicle-wrap-design', 'brand-identity-design', 'web-app-design', 'wordpress-website-design', 'presentation-design', 'signage-design'],
    faqs: [
      {
        q: 'Do you design full fleet livery?',
        a: 'Yes, on the correct templates for each vehicle type, with a rule set so future additions to the fleet stay consistent without redesign.',
      },
      {
        q: 'Can you design our tracking or portal interface?',
        a: 'Yes. Customer portals and tracking pages are a core part of what we do, and they usually deliver more brand impressions than the marketing site.',
      },
    ],
    keywords: 'logistics branding, haulage fleet livery, courier company design, transport logo, freight brand',
  },
  {
    slug: 'gaming',
    name: 'Gaming & Esports',
    metaTitle: 'Gaming & Esports Brand Design',
    metaDescription:
      'Branding for game studios, esports teams and streamers: logos, jerseys, overlays, channel art and store assets designed for the audience.',
    h1: 'Design for games,',
    highlight: 'teams and streamers',
    intro:
      'Gaming audiences are visually literate and quick to spot generic work. A team mark has to survive being a tiny icon in a bracket and a large jersey print, and a streamer needs a whole overlay system rather than a logo.',
    portfolioCategory: 'Sports',
    challenges: [
      {
        title: 'Tiny icons and big jerseys',
        body: 'The same mark appears at 32 pixels in a tournament bracket and thirty centimetres on a shirt. Both have to work.',
      },
      {
        title: 'Overlays are a system',
        body: 'Streamers need starting screens, alerts, panels, transitions and camera frames, all consistent and all built to the exact stream layout.',
      },
      {
        title: 'Audiences reject generic work',
        body: 'This is a community that recognises stock aggression and templated mascots instantly, and treats them as a credibility problem.',
      },
    ],
    services: ['mascot-logo-design', 'character-design', 'youtube-channel-design', 'merchandise-design', 'motion-graphics', 'apparel-design'],
    faqs: [
      {
        q: 'Do you design stream overlays?',
        a: 'Yes, the full package: starting soon, be right back, ending screens, alerts, panels, chat boxes and camera frames, sized to your layout.',
      },
      {
        q: 'Can the team logo go on jerseys?',
        a: 'Yes, and we supply the sublimation and embroidery variants your kit supplier needs, plus the small-size version for brackets and avatars.',
      },
    ],
    keywords: 'esports logo design, gaming branding, stream overlay design, team jersey design, twitch branding',
  },
  {
    slug: 'entertainment',
    name: 'Entertainment & Events',
    metaTitle: 'Entertainment & Event Brand Design',
    metaDescription:
      'Branding for events, festivals, venues and entertainment businesses, from identity and posters through to signage and ticketing pages.',
    h1: 'Design for events',
    highlight: 'and entertainment',
    intro:
      'Events have a deadline that does not move and a huge asset list: posters, tickets, wristbands, stage backdrops, social countdowns, signage and a site that survives an on-sale spike. It is a production job as much as a design one.',
    portfolioCategory: 'Community',
    challenges: [
      {
        title: 'A fixed, immovable date',
        body: 'Print deadlines work backwards from the event, and everything has to be scheduled around them rather than around design preference.',
      },
      {
        title: 'One identity, fifty assets',
        body: 'From wristbands to a twelve-metre backdrop. A flexible system beats a fixed logo lockup every time.',
      },
      {
        title: 'Lineups change late',
        body: 'Poster and social artwork gets reissued repeatedly as names are added, so the artwork must be built to be updated.',
      },
    ],
    services: ['poster-design', 'brand-identity-design', 'social-media-design', 'signage-design', 'motion-graphics', 'landing-page-design'],
    faqs: [
      {
        q: 'How far ahead should event design start?',
        a: 'Identity and the announcement asset around three months out, print and signage six weeks before, on the day material two weeks before. Print lead times are the constraint, not design.',
      },
      {
        q: 'Can you handle a full annual event brand?',
        a: 'Yes, including a system that carries year to year while looking new each edition, which is what regular attendees expect.',
      },
    ],
    keywords: 'event branding, festival design, concert poster design, venue branding, event identity',
  },
  {
    slug: 'music',
    name: 'Music & Audio',
    metaTitle: 'Music & Artist Brand Design',
    metaDescription:
      'Branding for musicians, labels and podcasters: cover artwork, logos, merchandise, tour posters and the platform assets releases require.',
    h1: 'Design for artists,',
    highlight: 'labels and podcasters',
    intro:
      'A release is an asset list: cover art, platform canvases, social cuts, a press shot treatment and merchandise. We design it as a set so the campaign looks coordinated across every place a listener meets it.',
    portfolioCategory: 'Community',
    challenges: [
      {
        title: 'Distributors reject non-compliant art',
        body: 'Size, resolution and rights requirements are strict, and a rejection can delay a release date that has already been announced.',
      },
      {
        title: 'Artwork is displayed tiny',
        body: 'Streaming shows covers at thumbnail scale, so detail-heavy artwork loses to bold, simple composition.',
      },
      {
        title: 'Merch is the revenue',
        body: 'Streaming pays badly; merchandise does not. Designing merch alongside the release, not after it, matters commercially.',
      },
    ],
    services: ['album-cover-design', 'merchandise-design', 'poster-design', 'social-media-design', 'motion-graphics', 'apparel-design'],
    faqs: [
      {
        q: 'What size does streaming artwork need to be?',
        a: '3000 × 3000 pixels RGB for every major distributor. Anything smaller is rejected, and upscaled artwork is visibly soft.',
      },
      {
        q: 'Can you design a whole release campaign?',
        a: 'Yes: cover, canvas, social cuts, countdown assets, lyric video and merchandise, all delivered as one coordinated set with the dates mapped.',
      },
    ],
    keywords: 'music branding, album artwork design, artist logo, band merch design, podcast branding',
  },
  {
    slug: 'sports',
    name: 'Sports & Clubs',
    metaTitle: 'Sports Club & Team Brand Design',
    metaDescription:
      'Branding for sports clubs, academies and teams: crests, kit design, sponsor boards, membership materials and club websites.',
    h1: 'Design for clubs,',
    highlight: 'teams and academies',
    intro:
      'A club crest has to hold up embroidered on a shirt, printed on a flag, and shrunk into a league table. It also has to survive being loved by members who will notice any change, which makes sports rebranding a delicate business.',
    portfolioCategory: 'Sports',
    challenges: [
      {
        title: 'Kit manufacturers have constraints',
        body: 'Sublimation, embroidery and heat transfer each need different artwork, and suppliers reject files that ignore their templates.',
      },
      {
        title: 'Members are attached to the crest',
        body: 'Club identities carry real sentiment. Change usually works best as careful evolution with the membership consulted.',
      },
      {
        title: 'Sponsors need to be accommodated',
        body: 'Shirt sponsors, board advertising and programme placements all need designed space rather than being squeezed in later.',
      },
    ],
    services: ['mascot-logo-design', 'apparel-design', 'signage-design', 'brand-identity-design', 'social-media-design', 'poster-design'],
    faqs: [
      {
        q: 'Can you design our kit as well as the crest?',
        a: 'Yes, to your manufacturer\'s templates, including home, away and training variants with sponsor placement mapped out.',
      },
      {
        q: 'How do we modernise a crest without upsetting members?',
        a: 'Keep the silhouette and the colours, tidy the drawing, and fix the legibility problems. Most successful club refreshes are barely describable but obviously better.',
      },
    ],
    keywords: 'sports club branding, team crest design, kit design, academy logo, football club identity',
  },
  {
    slug: 'nonprofits',
    name: 'Nonprofits & Charities',
    metaTitle: 'Nonprofit & Charity Brand Design',
    metaDescription:
      'Design for nonprofits and charities: identity, campaign creative, donation pages, annual reports and templates for volunteer teams.',
    h1: 'Design for charities',
    highlight: 'and community organisations',
    intro:
      'Nonprofits are scrutinised for every pound spent on themselves, which means design has to look credible without looking lavish. The practical goals are simple: make donating easy and make impact visible.',
    portfolioCategory: 'Community',
    challenges: [
      {
        title: 'Justifying design spend',
        body: 'Trustees and donors both question it. Templates that let volunteers self-serve are the most defensible investment available.',
      },
      {
        title: 'The donation form is the product',
        body: 'Suggested amounts, one page, no forced account creation. Small changes here outperform almost everything else.',
      },
      {
        title: 'Impact has to be shown, not claimed',
        body: 'Annual reports and impact pages need real figures presented clearly. Vague warmth does not raise money from institutional funders.',
      },
    ],
    services: ['nonprofit-branding', 'brand-identity-design', 'landing-page-design', 'presentation-design', 'social-media-design', 'infographic-design'],
    faqs: [
      {
        q: 'Do you offer charity rates?',
        a: 'Yes, registered charities and community organisations get reduced pricing. Tell us about the organisation and we will quote accordingly.',
      },
      {
        q: 'Can volunteers make their own materials afterwards?',
        a: 'Yes, and they should. We supply locked Canva templates so anyone can produce on-brand posters and posts without design skills.',
      },
    ],
    keywords: 'charity branding, nonprofit design, ngo logo, fundraising campaign design, donation page design',
  },
  {
    slug: 'agencies',
    name: 'Agencies & Studios',
    metaTitle: 'White Label Design for Agencies',
    metaDescription:
      'White-label design and build capacity for agencies and studios: overflow work, specialist skills and NDA-covered delivery under your brand.',
    h1: 'White-label capacity',
    highlight: 'for agencies',
    intro:
      'Agencies win work in bursts and staff for the average. We take the overflow, or the specialisms you do not keep in house, under your brand and to your standards, delivered as your own team\'s work.',
    portfolioCategory: 'Business',
    challenges: [
      {
        title: 'Peaks you cannot staff for',
        body: 'Turning down work is expensive; hiring for a peak is worse. Flexible external capacity solves both.',
      },
      {
        title: 'Specialisms outside your team',
        body: 'Packaging, motion, illustration or complex build work that comes up a few times a year rarely justifies a permanent hire.',
      },
      {
        title: 'Your client must never notice',
        body: 'That means working in your files, following your process, meeting your deadlines and staying invisible.',
      },
    ],
    services: ['design-subscription', 'ui-ux-design', 'motion-graphics', 'packaging-design', 'wordpress-website-design', 'custom-illustration'],
    faqs: [
      {
        q: 'Will you contact our clients?',
        a: 'Never, unless you ask us to join a call as your team. We work through you, under NDA, and we do not publish white-label work in our portfolio.',
      },
      {
        q: 'Can you work in our file structures and tools?',
        a: 'Yes. We adopt your Figma conventions, naming standards and project management tools rather than asking you to adopt ours.',
      },
    ],
    keywords: 'white label design, agency overflow, outsourced design partner, freelance design team',
  },
  {
    slug: 'creators',
    name: 'Creators & Influencers',
    metaTitle: 'Creator & Influencer Brand Design',
    metaDescription:
      'Branding for creators and influencers: channel art, thumbnails, templates, media kits and the store or booking page that monetises an audience.',
    h1: 'Design for creators',
    highlight: 'building a business',
    intro:
      'An audience only becomes income when there is something to buy and a reason for brands to pay attention. We build the full creator kit: consistent channel design, a media kit sponsors take seriously, and somewhere to actually sell.',
    portfolioCategory: null,
    challenges: [
      {
        title: 'Consistency across four platforms',
        body: 'YouTube, Instagram, TikTok and a newsletter all crop differently. One system, correctly sized everywhere, beats four separate looks.',
      },
      {
        title: 'Sponsors compare media kits',
        body: 'Brands request kits from several creators at once. A vague one loses to a specific one regardless of audience size.',
      },
      {
        title: 'Publishing volume needs templates',
        body: 'Nobody designs a thumbnail from scratch three times a week. A template system is what makes consistency sustainable.',
      },
    ],
    services: ['influencer-branding', 'youtube-thumbnail-design', 'youtube-channel-design', 'social-media-design', 'landing-page-design', 'merchandise-design'],
    faqs: [
      {
        q: 'How many followers do we need before this is worth it?',
        a: 'Fewer than people assume. Consistent presentation is part of how an audience grows, and brands routinely pay smaller creators with a professional kit over larger ones without.',
      },
      {
        q: 'Can you do thumbnails on an ongoing basis?',
        a: 'Yes, at a monthly volume rate with a booked turnaround, which is how most regular publishers work with us.',
      },
    ],
    keywords: 'creator branding, influencer design, youtube branding, media kit design, content creator logo',
  },
  {
    slug: 'local-business',
    name: 'Local Businesses',
    metaTitle: 'Local Business Branding & Design',
    metaDescription:
      'Affordable branding for local businesses: logo, signage, vehicle graphics, print and a website built to be found in local search.',
    h1: 'Design for local',
    highlight: 'businesses',
    intro:
      'A local business does not need a brand strategy deck. It needs a good logo, a sign, a marked vehicle, something to hand out and a website that shows up when someone nearby searches. We do exactly that, at prices that make sense.',
    portfolioCategory: 'Home Services',
    challenges: [
      {
        title: 'The map pack is the market',
        body: 'For most local searches, the three map results take the majority of the clicks. Listings, reviews and structured data decide who appears.',
      },
      {
        title: 'Budgets are real',
        body: 'Spending has to be sequenced by return. We will tell you what to buy now and what can wait a year.',
      },
      {
        title: 'One person does everything',
        body: 'Owners have no time to make graphics. Templates and a self-editable site are what make it sustainable.',
      },
    ],
    services: ['brand-identity-design', 'vehicle-wrap-design', 'signage-design', 'flyer-design', 'wordpress-website-design', 'business-card-design'],
    faqs: [
      {
        q: 'What should a local business buy first?',
        a: 'A logo, a marked vehicle if you have one, and a Google Business Profile with real photographs. A website comes next; printed material after that.',
      },
      {
        q: 'Is a cheap logo good enough to start?',
        a: 'A well-drawn simple logo at our entry price is genuinely fine to start with, and it is a proper vector file you own. What is not fine is a generated mark you cannot print or defend.',
      },
    ],
    keywords: 'local business branding, small business logo design, affordable branding, local seo web design',
  },
  {
    slug: 'photography',
    name: 'Photography & Creative Studios',
    metaTitle: 'Photographer & Studio Brand Design',
    metaDescription:
      'Branding and portfolio site design for photographers, videographers and creative studios, built to show the work and book the enquiry.',
    h1: 'Design for photographers',
    highlight: 'and creative studios',
    intro:
      'A photographer\'s brand has to disappear behind the work. The identity should be quiet, the site should load large images fast, and the whole thing should get to the enquiry form without a dozen clicks. It is one of the categories we have worked in most.',
    portfolioCategory: 'Photography',
    challenges: [
      {
        title: 'Big images, fast pages',
        body: 'Photography sites are the slowest category on the web. Modern formats, sizing and lazy loading are the difference between a portfolio and a bounce.',
      },
      {
        title: 'The mark must not compete',
        body: 'A loud logo fights the photography. Watermarks and marks need designing to sit lightly on top of a wide range of images.',
      },
      {
        title: 'Pricing conversations',
        body: 'Packages, deliverables and turnaround presented clearly filter enquiries and save hours of unpaid negotiation.',
      },
    ],
    services: ['brand-identity-design', 'wordpress-website-design', 'social-media-design', 'business-card-design', 'seo-web-design', 'brochure-design'],
    faqs: [
      {
        q: 'Should we show prices on a photography site?',
        a: 'A starting price at minimum. It filters out enquiries you would decline anyway and increases the quality of the ones you get.',
      },
      {
        q: 'How do we keep a gallery site fast?',
        a: 'Serve modern formats at the size actually displayed, lazy load below the fold, and resist full-screen video backgrounds. That alone usually halves load time.',
      },
    ],
    keywords: 'photographer branding, photography website design, studio logo, portfolio site design',
  },
  {
    slug: 'insurance',
    name: 'Insurance & Brokerage',
    metaTitle: 'Insurance & Brokerage Brand Design',
    metaDescription:
      'Branding and web design for insurers and brokers, focused on quote flows, plan comparison and the trust signals that convert enquiries.',
    h1: 'Design for insurers',
    highlight: 'and brokers',
    intro:
      'Insurance is bought reluctantly and compared aggressively. The design work is mostly about making a complicated product comparable and a long quote form survivable on a phone.',
    portfolioCategory: 'Finance',
    challenges: [
      {
        title: 'Long forms lose people',
        body: 'Quote journeys are where most insurance traffic dies. Progressive disclosure, saved progress and honest step counts fix most of it.',
      },
      {
        title: 'Comparison is unavoidable',
        body: 'Customers will compare you whether or not you help them. Clear coverage tables convert better than hiding the detail.',
      },
      {
        title: 'Regulated language',
        body: 'Required wording has to be designed in legibly, not buried in grey small print that fails accessibility standards.',
      },
    ],
    services: ['wordpress-website-design', 'brand-identity-design', 'web-app-design', 'landing-page-design', 'presentation-design', 'infographic-design'],
    faqs: [
      {
        q: 'How do we improve quote completion?',
        a: 'Show progress honestly, ask the cheap questions first, save partial answers, and never ask for a phone number before showing a number.',
      },
      {
        q: 'Can you design comparison tables that are actually clear?',
        a: 'Yes, and it usually means fewer rows. Comparison tables fail by including everything; the useful ones show the handful of differences that change a decision.',
      },
    ],
    keywords: 'insurance branding, broker website design, insurtech design, quote flow design',
  },
  {
    slug: 'government',
    name: 'Government & Public Sector',
    metaTitle: 'Government & Public Sector Design',
    metaDescription:
      'Design for public sector bodies and agencies, meeting accessibility standards with clear information design and plain-language layout.',
    h1: 'Design for public',
    highlight: 'sector organisations',
    intro:
      'Public sector design serves everyone, which means accessibility is a requirement rather than a preference, and clarity beats personality. The audience includes people with impairments, older devices and low bandwidth, and the design has to work for all of them.',
    portfolioCategory: null,
    challenges: [
      {
        title: 'Accessibility is mandatory',
        body: 'WCAG conformance is a legal obligation in most jurisdictions, and it constrains colour, type, interaction and structure from the first decision.',
      },
      {
        title: 'Plain language, complex topics',
        body: 'Forms, entitlements and processes have to be understandable by the whole population, not by policy specialists.',
      },
      {
        title: 'Procurement and documentation',
        body: 'Public work runs on written scopes, audit trails and accessibility statements, all of which we produce as deliverables.',
      },
    ],
    services: ['wordpress-website-design', 'infographic-design', 'presentation-design', 'brand-guidelines', 'signage-design', 'web-app-design'],
    faqs: [
      {
        q: 'Do you meet WCAG standards?',
        a: 'We design and build to WCAG 2.2 AA, including contrast, keyboard operation, focus visibility and screen reader semantics, and we supply the accessibility statement content.',
      },
      {
        q: 'Can you work within an existing government design system?',
        a: 'Yes, and we prefer to. Established public sector design systems are well tested, and working inside one is faster and more accessible than designing around it.',
      },
    ],
    keywords: 'government design, public sector web design, accessible design, wcag compliant website',
  },
  {
    slug: 'energy',
    name: 'Energy & Sustainability',
    metaTitle: 'Energy & Sustainability Brand Design',
    metaDescription:
      'Branding for renewable energy, solar and sustainability businesses, avoiding greenwash clichés while making the numbers credible.',
    h1: 'Design for energy',
    highlight: 'and sustainability businesses',
    intro:
      'Every company in this sector uses a green leaf, and buyers have learned to discount it. Credible design in energy comes from specificity: real figures, real installations, real payback periods, presented clearly.',
    portfolioCategory: 'Construction',
    challenges: [
      {
        title: 'The green leaf problem',
        body: 'Generic environmental symbolism now reads as greenwash. Differentiation comes from evidence rather than iconography.',
      },
      {
        title: 'Payback is the decision',
        body: 'Domestic and commercial buyers both decide on numbers. Calculators and clear cost breakdowns do the selling.',
      },
      {
        title: 'Two very different buyers',
        body: 'A homeowner and a commercial procurement team need different sites, and trying to serve both with one page serves neither.',
      },
    ],
    services: ['brand-identity-design', 'wordpress-website-design', 'infographic-design', 'vehicle-wrap-design', 'presentation-design', 'landing-page-design'],
    faqs: [
      {
        q: 'How do we avoid looking like every other green brand?',
        a: 'Drop the leaf, pick an unexpected palette, and lead with your actual installations and figures. Specificity is the differentiator in this category.',
      },
      {
        q: 'Do you build savings calculators?',
        a: 'Yes. A calculator that gives an honest indicative figure is usually the highest-converting element on an energy website.',
      },
    ],
    keywords: 'renewable energy branding, solar company logo, sustainability design, green energy brand',
  },
  {
    slug: 'pets',
    name: 'Pet & Veterinary',
    metaTitle: 'Pet Business & Veterinary Branding',
    metaDescription:
      'Branding for veterinary practices, groomers, pet brands and animal services, warm enough for owners and credible on clinical care.',
    h1: 'Design for pet businesses',
    highlight: 'and veterinary practices',
    intro:
      'Pet owners buy emotionally and judge clinical competence at the same time. Groomers and pet brands can lean warm; veterinary practices have to hold both, because the same client wants a friendly reception and a surgeon they trust.',
    portfolioCategory: null,
    challenges: [
      {
        title: 'Warmth and clinical trust',
        body: 'Too cute undermines confidence in surgery; too clinical loses the routine business that pays the bills.',
      },
      {
        title: 'Emergencies need finding fast',
        body: 'Out-of-hours numbers and directions have to be immediately visible, because that visit is often the highest-value one.',
      },
      {
        title: 'Pet photography is the content',
        body: 'Owners engage with animals, not services. A social system built around client pet photography practically runs itself.',
      },
    ],
    services: ['brand-identity-design', 'wordpress-website-design', 'signage-design', 'social-media-design', 'packaging-design', 'flyer-design'],
    faqs: [
      {
        q: 'Should a veterinary logo include an animal?',
        a: 'Not necessarily. Many of the strongest veterinary identities are typographic with a subtle symbol, which ages better and avoids looking like a grooming salon.',
      },
      {
        q: 'What matters most on a veterinary website?',
        a: 'Emergency contact, opening hours, location and how to register. Everything else, including the team page, comes after those four.',
      },
    ],
    keywords: 'veterinary branding, pet brand design, groomer logo, animal clinic website, pet product packaging',
  },
  {
    slug: 'religious',
    name: 'Churches & Faith Organisations',
    metaTitle: 'Church & Faith Organisation Branding',
    metaDescription:
      'Design for churches, ministries and faith organisations: identity, service graphics, signage, giving pages and volunteer-run templates.',
    h1: 'Design for churches',
    highlight: 'and faith organisations',
    intro:
      'Faith organisations produce a remarkable amount of design every week: series artwork, slides, bulletins, social posts, signage. Almost all of it is made by volunteers, so the real deliverable is a system they can run without a designer.',
    portfolioCategory: 'Community',
    challenges: [
      {
        title: 'Weekly production volume',
        body: 'Series graphics, slides and announcements every week. Without templates the load falls on one exhausted volunteer.',
      },
      {
        title: 'A wide age range',
        body: 'Congregations span every age and level of technical confidence, which puts real weight on legibility and simplicity.',
      },
      {
        title: 'Newcomers need practical answers',
        body: 'Times, location, parking, what to expect and what to do with children. Those five answers matter more than any other page.',
      },
    ],
    services: ['brand-identity-design', 'social-media-design', 'signage-design', 'wordpress-website-design', 'presentation-design', 'flyer-design'],
    faqs: [
      {
        q: 'Can our volunteers keep making graphics?',
        a: 'Yes, that is the point of how we deliver. A locked Canva library means anyone can produce on-brand series art and announcements in minutes.',
      },
      {
        q: 'What should a church website prioritise?',
        a: 'Service times, address with directions, what to expect on a first visit, provision for children, and giving. Those five above anything else.',
      },
    ],
    keywords: 'church branding, ministry design, faith organisation logo, sermon series graphics, church website',
  },
]

export const industryBySlug = Object.fromEntries(industryPages.map((i) => [i.slug, i]))
