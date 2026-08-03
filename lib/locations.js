/**
 * Location pages.
 *
 * We are a remote-first studio with two registered US addresses, and these
 * pages say so plainly rather than implying a storefront in every city. What
 * makes each page worth having is the local specifics: which sectors dominate
 * there, which of our services those sectors buy, and how the working hours
 * overlap.
 *
 * `office: true` marks the two cities where we actually have a registered
 * address. Everywhere else the page is explicit that we work remotely.
 */

export const locationPages = [
  /* ------------------------------------------------------------------ US */
  {
    slug: 'new-york',
    city: 'New York',
    region: 'New York',
    country: 'United States',
    countryCode: 'US',
    office: true,
    address: '244 5th Ave. Suite 22, New York, NY 10001',
    utcOffset: '-05:00',
    intro:
      'Our New York address is on 5th Avenue, and a large share of our longest-running client relationships are with businesses in the five boroughs and the surrounding tri-state area.',
    localNote:
      'New York work skews toward professional services, hospitality, fashion and real estate, and it is the market where clients most often arrive with an existing brand that needs sharpening rather than a blank sheet. Competition for attention here is unusually high, which is why so much of the work is about clarity and restraint rather than volume.',
    sectors: ['real-estate', 'restaurants', 'fashion', 'finance', 'legal', 'startups'],
  },
  {
    slug: 'dover-delaware',
    city: 'Dover',
    region: 'Delaware',
    country: 'United States',
    countryCode: 'US',
    office: true,
    address: 'RevoluSys Inc, 8 The Green Ste A, Dover, Delaware, 19901',
    utcOffset: '-05:00',
    intro:
      'Our registered corporate address is in Dover, Delaware, which is where the company is incorporated and where contracts, invoicing and copyright assignments are administered from.',
    localNote:
      'A great many of our clients are Delaware-incorporated even when they operate elsewhere, which means the paperwork side of a design engagement — the copyright transfer in particular — is something we handle routinely and in writing.',
    sectors: ['startups', 'legal', 'finance', 'local-business', 'construction', 'technology'],
  },
  {
    slug: 'los-angeles',
    city: 'Los Angeles',
    region: 'California',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-08:00',
    intro:
      'We work with businesses across Los Angeles County remotely, from Santa Monica agencies to Valley trades, with working hours that overlap the whole Pacific business day.',
    localNote:
      'Los Angeles briefs lean heavily toward entertainment, personal brands, fitness and food. It is also the market where motion and short-form video are most often part of the initial brief rather than an add-on later, which shapes how we scope the work.',
    sectors: ['entertainment', 'creators', 'fitness', 'restaurants', 'fashion', 'music'],
  },
  {
    slug: 'chicago',
    city: 'Chicago',
    region: 'Illinois',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-06:00',
    intro:
      'Chicago clients get Central-time working hours and the same in-house team, covering everything from Loop professional services to trade businesses across the metro.',
    localNote:
      'The Chicago market is broad in a way the coasts are not: manufacturing, logistics, finance and food all sit in the same client list. It is a city where a well-designed printed capability document still wins commercial work.',
    sectors: ['manufacturing', 'logistics', 'finance', 'restaurants', 'construction', 'legal'],
  },
  {
    slug: 'houston',
    city: 'Houston',
    region: 'Texas',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-06:00',
    intro:
      'We design for Houston businesses across energy, construction, healthcare and the enormous services economy that supports them.',
    localNote:
      'Houston work is dominated by industrial and energy-adjacent businesses, where the brand has to survive being printed on hard hats, trucks, hi-vis and site boards. That constraint shapes the mark from the first sketch.',
    sectors: ['energy', 'construction', 'logistics', 'healthcare', 'manufacturing', 'home-services'],
  },
  {
    slug: 'dallas',
    city: 'Dallas',
    region: 'Texas',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-06:00',
    intro:
      'Dallas-Fort Worth clients work with us remotely across branding, websites and the full print and signage set that local growth demands.',
    localNote:
      'DFW is one of the fastest-growing metros in the country, which shows up in the brief: a great many clients here are opening second and third locations and need an identity system that scales without being redrawn each time.',
    sectors: ['real-estate', 'construction', 'home-services', 'restaurants', 'finance', 'local-business'],
  },
  {
    slug: 'austin',
    city: 'Austin',
    region: 'Texas',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-06:00',
    intro:
      'Our US phone number is an Austin line, and the city is one of our most active markets for startup and software branding.',
    localNote:
      'Austin briefs are disproportionately early-stage: seed companies needing an identity, a deck and a landing page before a raise, and food and music businesses with strong visual expectations. Speed matters more here than in almost any other market we work in.',
    sectors: ['startups', 'saas', 'technology', 'music', 'restaurants', 'creators'],
  },
  {
    slug: 'san-francisco',
    city: 'San Francisco',
    region: 'California',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-08:00',
    intro:
      'We work with San Francisco Bay Area software companies on product design, design systems and the marketing surfaces around them.',
    localNote:
      'Bay Area work is almost entirely product-led: interface design, design systems and the pricing and onboarding surfaces that decide conversion. Clients here usually have engineering in place and need design that ships rather than design that presents.',
    sectors: ['saas', 'artificial-intelligence', 'technology', 'startups', 'finance', 'agencies'],
  },
  {
    slug: 'miami',
    city: 'Miami',
    region: 'Florida',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-05:00',
    intro:
      'Miami clients work with us on branding, e-commerce and bilingual design across a market that trades in two languages as a matter of course.',
    localNote:
      'Bilingual delivery comes up more in Miami than anywhere else in our US client base. English and Spanish versions of a site or a menu need designing together, because Spanish typically runs a fifth longer and breaks layouts built only in English.',
    sectors: ['real-estate', 'hospitality', 'restaurants', 'beauty', 'fitness', 'ecommerce'],
  },
  {
    slug: 'atlanta',
    city: 'Atlanta',
    region: 'Georgia',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-05:00',
    intro:
      'We design for Atlanta businesses across logistics, healthcare, music and the large small-business economy across the metro.',
    localNote:
      'Atlanta sits at the intersection of freight, film and music, and the client list reflects it. It is also a market where local search work carries unusual weight, because the metro is spread across so many distinct suburban centres.',
    sectors: ['logistics', 'music', 'entertainment', 'healthcare', 'local-business', 'real-estate'],
  },
  {
    slug: 'seattle',
    city: 'Seattle',
    region: 'Washington',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-08:00',
    intro:
      'Seattle clients get Pacific-time coverage across product design, e-commerce and brand work for a technically demanding market.',
    localNote:
      'Seattle briefs are software-heavy and accessibility-aware. Clients here more often than not arrive already asking about contrast ratios and keyboard operation, which is a welcome change and shapes how we present work.',
    sectors: ['saas', 'technology', 'ecommerce', 'startups', 'artificial-intelligence', 'government'],
  },
  {
    slug: 'denver',
    city: 'Denver',
    region: 'Colorado',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-07:00',
    intro:
      'We work with Denver and Front Range businesses on identity, signage, vehicle graphics and websites built for local search.',
    localNote:
      'Colorado work skews toward outdoor, construction, home services and wellness. Marks here get printed on trucks and trail signage as often as they appear on screens, which means one-colour legibility is a first-round requirement.',
    sectors: ['construction', 'home-services', 'fitness', 'travel', 'energy', 'local-business'],
  },
  {
    slug: 'phoenix',
    city: 'Phoenix',
    region: 'Arizona',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-07:00',
    intro:
      'Phoenix and the wider Valley are a strong market for us in home services, construction and healthcare branding.',
    localNote:
      'Phoenix is a vehicle-and-signage market. HVAC, pool services, roofing and landscaping dominate, and for those businesses the wrapped truck genuinely is the marketing budget rather than a supplement to it.',
    sectors: ['home-services', 'construction', 'healthcare', 'real-estate', 'automotive', 'local-business'],
  },
  {
    slug: 'boston',
    city: 'Boston',
    region: 'Massachusetts',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-05:00',
    intro:
      'Boston clients work with us across education, healthcare, biotech and professional services branding.',
    localNote:
      'Boston work carries an institutional flavour: universities, hospitals, research groups and the professional services around them. Brand guidelines and governance matter more here than in most markets, because the organisations are larger and older.',
    sectors: ['education', 'healthcare', 'finance', 'legal', 'technology', 'nonprofits'],
  },
  {
    slug: 'san-diego',
    city: 'San Diego',
    region: 'California',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-08:00',
    intro:
      'We design for San Diego businesses across hospitality, healthcare, fitness and the cross-border economy with Tijuana.',
    localNote:
      'San Diego briefs often involve tourism and hospitality alongside a strong biotech and defence services base, and bilingual material is a regular requirement given the border economy.',
    sectors: ['hospitality', 'healthcare', 'fitness', 'restaurants', 'travel', 'local-business'],
  },
  {
    slug: 'philadelphia',
    city: 'Philadelphia',
    region: 'Pennsylvania',
    country: 'United States',
    countryCode: 'US',
    utcOffset: '-05:00',
    intro:
      'Philadelphia clients work with us on identity, print and websites across trades, healthcare and independent retail.',
    localNote:
      'Philadelphia has an unusually strong independent retail and restaurant scene, where a distinctive hand-drawn identity outperforms the polished corporate look that works in larger markets.',
    sectors: ['restaurants', 'healthcare', 'construction', 'local-business', 'education', 'ecommerce'],
  },

  /* -------------------------------------------------------------- Canada */
  {
    slug: 'toronto',
    city: 'Toronto',
    region: 'Ontario',
    country: 'Canada',
    countryCode: 'CA',
    utcOffset: '-05:00',
    intro:
      'We work with Toronto and GTA businesses remotely, on Eastern time, across branding, websites and product design.',
    localNote:
      'Toronto work covers finance, real estate and a large startup ecosystem. Bilingual English and French material comes up regularly for clients selling nationally, and we build layouts that accommodate French text expansion from the start.',
    sectors: ['finance', 'real-estate', 'startups', 'saas', 'restaurants', 'legal'],
  },
  {
    slug: 'vancouver',
    city: 'Vancouver',
    region: 'British Columbia',
    country: 'Canada',
    countryCode: 'CA',
    utcOffset: '-08:00',
    intro:
      'Vancouver clients get Pacific-time coverage across brand identity, e-commerce and web design.',
    localNote:
      'Vancouver briefs lean toward wellness, outdoor, food and film production. Sustainability claims come up often, and we push clients toward specific evidence rather than the generic green iconography that the market has stopped believing.',
    sectors: ['fitness', 'restaurants', 'energy', 'entertainment', 'ecommerce', 'travel'],
  },

  /* ------------------------------------------------------------------ UK */
  {
    slug: 'london',
    city: 'London',
    region: 'England',
    country: 'United Kingdom',
    countryCode: 'GB',
    utcOffset: '+00:00',
    intro:
      'We work with London businesses remotely, with our morning overlapping the UK afternoon and files delivered to UK print specifications.',
    localNote:
      'UK print work has its own conventions: A-sizes rather than US letter, 85 × 55 mm business cards, and different paper stock standards. We set files up to UK spec so nothing needs reworking at a London printer.',
    sectors: ['finance', 'legal', 'startups', 'restaurants', 'fashion', 'real-estate'],
  },
  {
    slug: 'manchester',
    city: 'Manchester',
    region: 'England',
    country: 'United Kingdom',
    countryCode: 'GB',
    utcOffset: '+00:00',
    intro:
      'Manchester clients work with us on branding, websites and e-commerce, with artwork supplied to UK print standards.',
    localNote:
      'Manchester has a dense independent business scene across hospitality, media and e-commerce, and the briefs reflect it: strong personality, tight budgets and a preference for work that looks made rather than manufactured.',
    sectors: ['ecommerce', 'restaurants', 'creators', 'sports', 'fitness', 'local-business'],
  },
  {
    slug: 'birmingham',
    city: 'Birmingham',
    region: 'England',
    country: 'United Kingdom',
    countryCode: 'GB',
    utcOffset: '+00:00',
    intro:
      'We design for Birmingham and West Midlands businesses across manufacturing, trades, retail and professional services.',
    localNote:
      'The West Midlands remains a manufacturing and trade heartland, and much of the work is the practical kind: technical catalogues, fleet livery, site signage and B2B websites that have to serve specifiers rather than consumers.',
    sectors: ['manufacturing', 'construction', 'logistics', 'automotive', 'local-business', 'legal'],
  },

  /* ------------------------------------------------------------- Ireland */
  {
    slug: 'dublin',
    city: 'Dublin',
    region: 'Leinster',
    country: 'Ireland',
    countryCode: 'IE',
    utcOffset: '+00:00',
    intro:
      'Dublin clients work with us on brand identity, SaaS product design and websites, to European print and accessibility standards.',
    localNote:
      'Dublin carries an outsized software and international headquarters presence, so the work skews toward product design and multi-market brand systems that have to function across several European languages.',
    sectors: ['saas', 'technology', 'startups', 'finance', 'restaurants', 'legal'],
  },

  /* ------------------------------------------------------------ Pakistan */
  {
    slug: 'karachi',
    city: 'Karachi',
    region: 'Sindh',
    country: 'Pakistan',
    countryCode: 'PK',
    utcOffset: '+05:00',
    intro:
      'We have built and shipped live websites for Karachi businesses, including bilingual English and Urdu builds, and we work across the full Pakistan business day.',
    localNote:
      'Karachi is Pakistan\'s commercial centre, and the briefs run from clinics and production companies to textile exporters. Bilingual English and Urdu design is a regular requirement, and Urdu is right-to-left with different line-height needs, so it has to be designed in rather than translated afterwards.',
    sectors: ['healthcare', 'ecommerce', 'manufacturing', 'entertainment', 'fashion', 'startups'],
  },
  {
    slug: 'lahore',
    city: 'Lahore',
    region: 'Punjab',
    country: 'Pakistan',
    countryCode: 'PK',
    utcOffset: '+05:00',
    intro:
      'Lahore businesses work with us on branding, websites, packaging and e-commerce, in Pakistan Standard Time working hours.',
    localNote:
      'Lahore has a strong food, retail and creative services economy, plus a growing software sector. Packaging and menu work comes up frequently, and the print market here supports finishes that are expensive elsewhere, which is worth designing for.',
    sectors: ['restaurants', 'ecommerce', 'fashion', 'technology', 'education', 'startups'],
  },
  {
    slug: 'islamabad',
    city: 'Islamabad',
    region: 'Islamabad Capital Territory',
    country: 'Pakistan',
    countryCode: 'PK',
    utcOffset: '+05:00',
    intro:
      'We design for Islamabad and Rawalpindi businesses across technology, professional services, education and real estate.',
    localNote:
      'Islamabad briefs skew toward software companies, consultancies, development organisations and education. Reporting and presentation design comes up more here than in other Pakistani markets, driven by the NGO and institutional sector.',
    sectors: ['technology', 'saas', 'education', 'nonprofits', 'real-estate', 'legal'],
  },
  {
    slug: 'rawalpindi',
    city: 'Rawalpindi',
    region: 'Punjab',
    country: 'Pakistan',
    countryCode: 'PK',
    utcOffset: '+05:00',
    intro:
      'Rawalpindi businesses work with us on logos, signage, print and websites, with everything delivered digitally and priced in USD.',
    localNote:
      'Rawalpindi work is heavily local trade and retail: shop signage, menus, printed marketing and simple websites that need to be findable locally rather than compete nationally.',
    sectors: ['local-business', 'restaurants', 'construction', 'ecommerce', 'healthcare', 'automotive'],
  },
  {
    slug: 'faisalabad',
    city: 'Faisalabad',
    region: 'Punjab',
    country: 'Pakistan',
    countryCode: 'PK',
    utcOffset: '+05:00',
    intro:
      'We work with Faisalabad businesses, particularly textile manufacturers and exporters, on brand identity, catalogues and export-ready material.',
    localNote:
      'Faisalabad is Pakistan\'s textile centre, and much of the work is export-facing: line sheets, catalogues, labels and trade show material aimed at buyers in Europe and North America, which means designing to their conventions rather than local ones.',
    sectors: ['manufacturing', 'fashion', 'ecommerce', 'logistics', 'local-business', 'agencies'],
  },
  {
    slug: 'peshawar',
    city: 'Peshawar',
    region: 'Khyber Pakhtunkhwa',
    country: 'Pakistan',
    countryCode: 'PK',
    utcOffset: '+05:00',
    intro:
      'Peshawar businesses work with us remotely on branding, signage, print and web design.',
    localNote:
      'Peshawar work is largely local trade, retail, healthcare and education, with bilingual Urdu and Pashto material coming up regularly for anything customer-facing.',
    sectors: ['local-business', 'healthcare', 'education', 'restaurants', 'construction', 'nonprofits'],
  },
  {
    slug: 'multan',
    city: 'Multan',
    region: 'Punjab',
    country: 'Pakistan',
    countryCode: 'PK',
    utcOffset: '+05:00',
    intro:
      'We design for Multan businesses across agriculture, retail, food and local services.',
    localNote:
      'Multan\'s economy runs on agriculture, food processing and regional trade. Packaging and labelling for food producers is the most common brief, and export labelling requirements shape a lot of it.',
    sectors: ['manufacturing', 'restaurants', 'local-business', 'ecommerce', 'logistics', 'healthcare'],
  },

  /* ------------------------------------------------------------------ UAE */
  {
    slug: 'dubai',
    city: 'Dubai',
    region: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    utcOffset: '+04:00',
    intro:
      'Dubai clients work with us across branding, websites and bilingual Arabic and English design, within Gulf business hours.',
    localNote:
      'Bilingual Arabic and English is standard for most Dubai work, and it is not a translation job. Arabic is right-to-left, needs a properly paired Arabic typeface rather than a default system font, and mirrors the entire layout. We design both directions together.',
    sectors: ['real-estate', 'hospitality', 'finance', 'ecommerce', 'restaurants', 'startups'],
  },
  {
    slug: 'abu-dhabi',
    city: 'Abu Dhabi',
    region: 'Abu Dhabi',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    utcOffset: '+04:00',
    intro:
      'We design for Abu Dhabi organisations across energy, government-adjacent services, real estate and hospitality.',
    localNote:
      'Abu Dhabi work tends to be more institutional than Dubai\'s: larger organisations, formal brand governance and bilingual guidelines that have to cover Arabic typography as thoroughly as Latin.',
    sectors: ['energy', 'government', 'real-estate', 'hospitality', 'finance', 'education'],
  },
  {
    slug: 'riyadh',
    city: 'Riyadh',
    region: 'Riyadh Province',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    utcOffset: '+03:00',
    intro:
      'Riyadh clients work with us on bilingual brand identity, websites and product design across a fast-moving market.',
    localNote:
      'Saudi briefs increasingly demand Arabic-first design rather than Arabic as a secondary layer, which changes the typographic hierarchy and often the logo itself, since a bilingual lockup has to balance two scripts with very different proportions.',
    sectors: ['finance', 'real-estate', 'startups', 'hospitality', 'energy', 'technology'],
  },

  /* ------------------------------------------------------------ Oceania */
  {
    slug: 'sydney',
    city: 'Sydney',
    region: 'New South Wales',
    country: 'Australia',
    countryCode: 'AU',
    utcOffset: '+11:00',
    intro:
      'Sydney clients work with us asynchronously, with work delivered overnight Australian time and files set to A-series print sizes.',
    localNote:
      'The time difference is an advantage rather than an obstacle: feedback sent at the end of an Australian day is worked on overnight, so revisions are typically waiting the next morning.',
    sectors: ['real-estate', 'startups', 'restaurants', 'construction', 'fitness', 'ecommerce'],
  },
  {
    slug: 'melbourne',
    city: 'Melbourne',
    region: 'Victoria',
    country: 'Australia',
    countryCode: 'AU',
    utcOffset: '+11:00',
    intro:
      'We design for Melbourne businesses across hospitality, retail, creative services and construction.',
    localNote:
      'Melbourne has an exacting independent hospitality and retail scene with strong design literacy, so the briefs tend to be more considered and the work more typographic than in most markets we serve.',
    sectors: ['restaurants', 'ecommerce', 'fashion', 'construction', 'creators', 'local-business'],
  },
  {
    slug: 'auckland',
    city: 'Auckland',
    region: 'Auckland',
    country: 'New Zealand',
    countryCode: 'NZ',
    utcOffset: '+13:00',
    intro:
      'Auckland businesses work with us remotely across brand identity, websites and e-commerce.',
    localNote:
      'New Zealand work is predominantly small and medium business: trades, hospitality, tourism and e-commerce brands selling internationally from a small domestic base, which puts extra weight on the online storefront.',
    sectors: ['travel', 'ecommerce', 'construction', 'restaurants', 'local-business', 'fitness'],
  },
  {
    slug: 'singapore',
    city: 'Singapore',
    region: 'Singapore',
    country: 'Singapore',
    countryCode: 'SG',
    utcOffset: '+08:00',
    intro:
      'Singapore clients work with us on brand identity, product design and multi-market material across Southeast Asia.',
    localNote:
      'Singapore briefs are usually regional rather than local: one identity that has to work across several Southeast Asian markets and scripts, which means designing for translation and character-set differences from the outset.',
    sectors: ['finance', 'saas', 'startups', 'logistics', 'hospitality', 'ecommerce'],
  },
]

export const locationBySlug = Object.fromEntries(locationPages.map((l) => [l.slug, l]))

export const locationsByCountry = locationPages.reduce((acc, l) => {
  acc[l.country] = acc[l.country] || []
  acc[l.country].push(l)
  return acc
}, {})
