import {
  money,
  pricingSections,
  bigPackageById,
  flagship,
  brandProtection,
  addOns,
} from './pricing'

/**
 * Every package on the pricing page, given a page of its own.
 *
 * The pricing page is a comparison surface: cards side by side, spec lists
 * behind a toggle, built for somebody choosing between tiers. It is a poor
 * landing page for somebody who searched for one specific thing, and it is a
 * terrible thing to link to from an email, because "see the Gold logo package"
 * lands them at the top of a very long page.
 *
 * So each package is also a page. The price, the spec and the comparison come
 * straight from lib/pricing.js — nothing is retyped here and nothing can drift.
 * What is written here is the framing: who a tier is for, what it deliberately
 * leaves out, and what happens after somebody buys it.
 */

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/* ------------------------------------------------------------------ families */

/**
 * Written once per product family rather than once per package, because what
 * happens after you buy a Gold logo and a Platinum logo is the same thing.
 */
const families = {
  logo: {
    label: 'Logo design',
    hub: { name: 'Logo design', href: '/logo-design' },
    lead: 'Every tier here produces an original mark drawn by hand for one business. What changes between them is how many directions get explored, how long the refining runs, and which files come back.',
    process: [
      'You send the brief — two or three sentences about the business is genuinely enough.',
      'A named designer is assigned and the first concepts come back, usually inside 24 hours and never past 48.',
      'You point at what is working and what is not. Refinement runs from there.',
      'On approval the files are exported, checked and delivered with the written copyright assignment.',
    ],
    faqs: [
      {
        q: 'Do I own the logo outright?',
        a: 'Yes, on every package that produces original artwork. Copyright is assigned to you in writing, which is what makes registering it as a trademark in your own name possible.',
      },
      {
        q: 'What if I do not like the first concepts?',
        a: 'Say so plainly, including if the only reason is that it feels wrong. We take a different direction. That is a normal part of the process rather than a complaint.',
      },
      {
        q: 'Can I upgrade after ordering?',
        a: 'Yes. You pay the difference between the tiers rather than starting again, and the work already done carries forward.',
      },
    ],
  },
  bundle: {
    label: 'Bundles',
    hub: { name: 'All pricing', href: '/pricing' },
    lead: 'A bundle is the same work as the individual items, bought together for less. The saving is real and it is calculated from the listed price of each component, which is printed on this page so you can check it.',
    process: [
      'The logo runs first, because everything else in the bundle is drawn from it.',
      'Once the mark is approved, the print and brand items follow within a few days.',
      'Website or app work starts in parallel as soon as there is an approved logo to build around.',
      'Everything is delivered together with the master files and the copyright assignment.',
    ],
    faqs: [
      {
        q: 'Is the saving genuine?',
        a: 'Yes, and it is arithmetic rather than marketing. The components are listed with their individual prices on this page; the bundle price is lower than their total by the amount shown.',
      },
      {
        q: 'What if I only want part of it?',
        a: 'Buy the parts. A bundle is only good value if you actually want everything in it — buying the website portion to "have it ready" a year early is worse value than buying it when you need it.',
      },
      {
        q: 'Can the parts be delivered separately?',
        a: 'Yes, and they usually are. The logo lands first because the rest depends on it.',
      },
    ],
  },
  branding: {
    label: 'Branding kits',
    hub: { name: 'Brand identity design', href: '/services/brand-identity-design' },
    lead: 'A branding kit is everything the logo has to live on: the cards, the letterhead, the covers, the signage. It is bought by people who have discovered that a logo on its own does not make a brand.',
    process: [
      'Kits start from an approved logo, whether we drew it or you already had one.',
      'Every item is laid out to the same grid and palette so the set holds together.',
      'You review the set as a set rather than item by item, which is how inconsistencies get caught.',
      'Print-ready files go out with bleed and crop marks so any printer can take them.',
    ],
    faqs: [
      {
        q: 'Can you do a kit for a logo you did not design?',
        a: 'Yes, provided you have the vector files. If they no longer exist, redrawing the mark properly first is usually a small job and it prevents every other item inheriting a low-resolution problem.',
      },
      {
        q: 'Are the files ready for a commercial printer?',
        a: 'Yes — correct bleed, crop marks and colour space. If your printer asks for something unusual, forward the email and we will produce it.',
      },
    ],
  },
  website: {
    label: 'Websites',
    hub: { name: 'Website design', href: '/website-design' },
    lead: 'Websites here are designed and built by the same team, which is why the mockup does not arrive at the build stage as a surprise. Every tier is responsive, fast and yours at the end of it.',
    process: [
      'Scope first: what a visitor should do, how many pages, who supplies copy and photography.',
      'Design of the key templates, reviewed before anything is built.',
      'Build, then a staging link where you click through the real thing.',
      'Launch, with the domain and hosting in your own account wherever possible.',
    ],
    faqs: [
      {
        q: 'Do I own the site?',
        a: 'Yes, and we would rather the domain and hosting sat in your own account than rented from us. If it is easier for us to manage it, that is a choice you make rather than a lock-in.',
      },
      {
        q: 'Who writes the copy?',
        a: 'You, unless you ask us to. It is the single most common cause of a stalled build, so it gets agreed at the quote stage rather than assumed.',
      },
      {
        q: 'Can I edit it myself afterwards?',
        a: 'On the dynamic and e-commerce tiers, yes, and you are shown how. Static builds are edited by us, which is cheaper to run if you rarely change anything.',
      },
    ],
  },
  app: {
    label: 'Mobile apps',
    hub: { name: 'Mobile applications', href: '/mobile-application' },
    lead: 'App work covers the screens, the build for both platforms and the store submissions. The source code is handed over at the end, which is written into the quote rather than argued about later.',
    process: [
      'Scope the one thing version one must do. Everything else is version two, and that is not a downgrade.',
      'Wireframes and prototypes so the flow can be judged before anything is built.',
      'Build for iOS and Android, with test builds you can install and use.',
      'Store submission, review responses, and handover of the source.',
    ],
    faqs: [
      {
        q: 'Do the app store fees come out of this price?',
        a: 'No. Apple and Google both charge their own developer fees and both review submissions. Those are yours and they are named up front rather than buried.',
      },
      {
        q: 'Is the code mine?',
        a: 'Yes, handed over on completion the same way design files are.',
      },
    ],
  },
  video: {
    label: 'Video and motion',
    hub: { name: 'Video, animation and YouTube', href: '/animation' },
    lead: 'The motion desk covers logo animation, video and YouTube editing, thumbnails, shorts and sound. Send the footage and it comes back ready to upload.',
    process: [
      'You send the raw footage and say where it is being published and in what aspect ratio.',
      'A rough cut comes back for structural notes — pacing and order, before polish.',
      'Graphics, captions, colour and sound are finished against the approved cut.',
      'Final exports in every format and ratio the brief named.',
    ],
    faqs: [
      {
        q: 'How fast is turnaround?',
        a: 'A logo animation runs to 72 hours. A full edit depends on how much footage there is, and the estimate comes after we have seen it rather than before.',
      },
      {
        q: 'Do I get vertical and horizontal cuts?',
        a: 'Yes, when it is asked for at brief stage. Deciding afterwards means re-framing rather than re-exporting, which is a bigger job.',
      },
    ],
  },
  animation: {
    label: 'Logo animation',
    hub: { name: 'Video, animation and YouTube', href: '/animation' },
    lead: 'An animated logo is the version of your mark that works at the start of a video, on a screen in a reception, and at the end of an advert. It is drawn from your vector files rather than from a screenshot.',
    process: [
      'We start from the vector master, so edges stay sharp at any size.',
      'A style frame or two establishes how the mark will move before the animation is built.',
      'The animation is built, then timed against the length the platform actually wants.',
      'Exports in the formats you need, including a transparent version where the tier includes one.',
    ],
    faqs: [
      {
        q: 'Do you need my logo files?',
        a: 'Yes, ideally the vector master. If only a PNG exists, the mark is redrawn first — animating a low-resolution image is how you get soft edges in the one place everybody is looking.',
      },
      {
        q: 'Can you add sound?',
        a: 'Yes. Sound design and voice-over are available on the higher tiers, and a two-second audio signature is worth more than most people expect.',
      },
    ],
  },
  flagship: {
    label: 'Complete brand',
    hub: { name: 'All pricing', href: '/pricing' },
    lead: 'The whole brand, designed together by one team in the same weeks: the mark, everything it gets printed on, the moving version, and the website customers land on.',
    process: [
      '50% to start, 50% when you approve the finished work.',
      'The logo runs first because every other component is drawn from it.',
      'Print, motion and web run in parallel once the mark is approved.',
      'Everything is delivered together, with master files and the copyright assignment.',
    ],
    faqs: [
      {
        q: 'How long does the whole thing take?',
        a: 'Typically three to five weeks end to end, and the longest pole is usually feedback rather than production. A launch date agreed up front rearranges the queue around it.',
      },
      {
        q: 'Can I drop a component I do not need?',
        a: 'Yes, and the price is rebuilt from the remaining parts rather than discounted arbitrarily. It usually makes more sense to buy the smaller bundle instead.',
      },
    ],
  },
  protection: {
    label: 'Brand protection',
    hub: { name: 'Legal and compliance', href: '/legal' },
    lead: 'A logo you own is yours to use. A logo you have registered is yours to defend. This is handled by our legal desk rather than by the design team.',
    process: [
      'A clearance search runs first, and you get an honest read on the risk rather than a green light.',
      'Classes are selected around what you actually sell, not everything you might one day sell.',
      'The application is filed with the USPTO with the specimen and description prepared properly.',
      'If an examiner comes back with questions, the response is drafted and filed for you.',
    ],
    faqs: [
      {
        q: 'What does the government charge on top?',
        a: 'The USPTO sets its own filing fee per class, paid directly to them. Our $599 is the professional fee for doing the work, and the $350 per class is the classification that goes with it.',
      },
      {
        q: 'What if the search comes back badly?',
        a: 'Then you have saved the filing fee and, more importantly, the cost of discovering the conflict after the signage was printed. That is a good outcome even though it does not feel like one.',
      },
      {
        q: 'Do I own the design if I do not register it?',
        a: 'Yes. Copyright is assigned to you either way. Registration is a separate, stronger right in the mark as a trade identifier.',
      },
    ],
  },
  addon: {
    label: 'Add-ons',
    hub: { name: 'All pricing', href: '/pricing' },
    lead: 'Optional extras that can be added at any point, before or after the main job. Nothing here is a prerequisite for anything else.',
    process: [
      'Add-ons can be bought alongside a package or on their own afterwards.',
      'Anything that depends on your logo starts from the approved vector master.',
      'Print items are produced to the same standards as the packages, with bleed and crop marks.',
      'Delivery times are quoted when you order rather than assumed.',
    ],
    faqs: [
      {
        q: 'Do I have to buy a package first?',
        a: 'No. Add-ons can be bought on their own, though anything built from a logo needs vector files to work from.',
      },
      {
        q: 'Is it cheaper inside a bundle?',
        a: 'Frequently, yes. If you want several of these, ask — the bundle maths often beats buying them one at a time.',
      },
    ],
  },
}

/** Which family each pricing section belongs to, and the slug prefix it uses. */
const sectionMeta = {
  'bundles-3in1': { family: 'bundle', prefix: 'bundle-3in1' },
  'bundles-2in1': { family: 'bundle', prefix: 'bundle-2in1' },
  'logo-packages': { family: 'logo', prefix: 'logo' },
  'animated-logo': { family: 'animation', prefix: 'logo-animation' },
  'branding-kits': { family: 'branding', prefix: 'branding-kit' },
  'website-packages': { family: 'website', prefix: 'website' },
  'app-packages': { family: 'app', prefix: 'mobile-app' },
  'video-packages': { family: 'video', prefix: 'video' },
}

const bigMeta = {
  diamond: { family: 'logo' },
  'award-winning': { family: 'logo' },
  'extensive-premium': { family: 'logo' },
  'app-launch': { family: 'app' },
  'ultimate-kit': { family: 'branding' },
}

/* ------------------------------------------------------------------ builders */

/**
 * The narrative body of a package page.
 *
 * Everything here is derived from the package data or from the family notes,
 * so a price change in lib/pricing.js rewrites the prose rather than leaving
 * it stale — the failure mode that makes most pricing microsites untrustworthy.
 */
function buildSections({ pkg, family, siblings }) {
  const cheaper = siblings.filter((s) => s.price < pkg.price).sort((a, b) => b.price - a.price)[0]
  const dearer = siblings.filter((s) => s.price > pkg.price).sort((a, b) => a.price - b.price)[0]

  const sections = [
    {
      h: 'Who this one is for',
      p: [pkg.bestFor || family.lead, family.lead !== pkg.bestFor ? family.lead : null].filter(Boolean),
    },
  ]

  if (pkg.includes?.length) {
    sections.push({
      h: 'What is in it, and what each part costs on its own',
      p: [
        `Bought separately these come to ${money(pkg.was)}. Together they are ${money(pkg.price)}, which is ${money(
          pkg.saving
        )} less — a ${pkg.savingPct}% saving, and it is arithmetic rather than a marketing figure.`,
      ],
      table: pkg.includes.map((part) => [part.label, `${money(part.price)} bought on its own`]),
    })
  }

  if (pkg.features?.length) {
    sections.push({
      h: 'Everything included',
      p: ['The complete specification, exactly as it appears on the pricing page. Nothing here is conditional.'],
      ul: pkg.features,
    })
  }

  if (pkg.groups?.length) {
    pkg.groups.forEach((group) => {
      sections.push({ h: `Included: ${group.title}`, ul: group.items })
    })
  }

  if (cheaper || dearer) {
    sections.push({
      h: 'How it sits against the tiers either side',
      p: [
        'The honest way to choose a tier is to work out which one stops doing something you need, rather than which one has the longest list.',
      ],
      table: [
        cheaper ? [`Below it: ${cheaper.name} (${money(cheaper.price)})`, cheaper.bestFor || 'A smaller version of the same job.'] : null,
        [`This one: ${pkg.name} (${money(pkg.price)})`, pkg.bestFor || 'What you are looking at.'],
        dearer ? [`Above it: ${dearer.name} (${money(dearer.price)})`, dearer.bestFor || 'More exploration, more deliverables, or both.'] : null,
      ].filter(Boolean),
    })
  }

  sections.push({
    h: 'What happens after you order',
    ol: family.process,
  })

  return sections
}

function buildPackage({ pkg, slug, family, sectionTitle, sectionId, siblings, kind }) {
  const fam = families[family]
  const priceLabel = money(pkg.price)

  return {
    slug,
    name: pkg.name,
    kind: kind || pkg.kind || sectionTitle,
    family,
    familyLabel: fam.label,
    hub: fam.hub,
    sectionId,
    sectionTitle,
    price: pkg.price,
    priceLabel,
    was: pkg.was || null,
    saving: pkg.saving || null,
    savingPct: pkg.savingPct || null,
    featured: Boolean(pkg.featured),
    badge: pkg.badge || null,
    bestFor: pkg.bestFor || null,
    highlights: pkg.highlights || [],
    features: pkg.features || [],
    groups: pkg.groups || [],
    includes: pkg.includes || [],
    metaTitle: `${pkg.name} ${sectionTitle} — ${priceLabel}`,
    metaDescription: `${pkg.name} ${sectionTitle.toLowerCase()} package from LogoOrbit at ${priceLabel}. ${
      pkg.bestFor || fam.lead
    }`.slice(0, 300),
    intro: pkg.bestFor || fam.lead,
    sections: buildSections({ pkg, family: fam, siblings }),
    faqs: fam.faqs,
    siblings: siblings.map((s) => ({ name: s.name, slug: s.slug, price: s.price })),
  }
}

/* --------------------------------------------------------------- the catalogue */

/**
 * Maps the exact item objects the pricing components render onto their page
 * slugs, by identity rather than by name.
 *
 * Names repeat across sections — there is a "Pro" in four different ranges —
 * so a name lookup would send the Pro website card to the Pro bundle page.
 * Both sides import the same module instances, so identity is exact.
 */
const slugByItem = new Map()

/** The page for a package card, or null if that card has no page. */
export function packagePathFor(item) {
  const slug = slugByItem.get(item)
  return slug ? `/pricing/${slug}` : null
}

const fromSections = pricingSections.flatMap((section) => {
  const meta = sectionMeta[section.id]
  if (!meta) return []

  const withSlugs = section.items.map((item) => {
    const slug = `${meta.prefix}-${slugify(item.name)}`
    slugByItem.set(item, slug)
    return { ...item, slug }
  })

  return withSlugs.map((item) =>
    buildPackage({
      pkg: item,
      slug: item.slug,
      family: meta.family,
      sectionTitle: section.title,
      sectionId: section.id,
      siblings: withSlugs.filter((s) => s.slug !== item.slug),
      kind: item.kind || section.subtitle,
    })
  )
})

const fromBigPackages = Object.entries(bigPackageById).map(([id, pkg]) => {
  const slug = slugify(`${pkg.name}-package`)
  slugByItem.set(pkg, slug)

  return buildPackage({
    pkg,
    slug,
    family: bigMeta[id]?.family || 'logo',
    sectionTitle: pkg.kind || 'Package',
    sectionId: id,
    siblings: [],
    kind: pkg.eyebrow || pkg.kind,
  })
})

slugByItem.set(flagship, 'complete-brand')
slugByItem.set(brandProtection, 'trademark-registration')

const flagshipPage = buildPackage({
  pkg: flagship,
  slug: 'complete-brand',
  family: 'flagship',
  sectionTitle: 'Complete brand package',
  sectionId: 'complete-brand',
  siblings: [],
  kind: 'Our best offer',
})

const trademarkPage = {
  slug: 'trademark-registration',
  name: 'US trademark registration',
  kind: 'Brand protection',
  family: 'protection',
  familyLabel: families.protection.label,
  hub: families.protection.hub,
  sectionId: 'trademark',
  sectionTitle: 'Brand protection',
  price: brandProtection.price,
  priceLabel: `${money(brandProtection.price)} per class`,
  was: null,
  saving: null,
  savingPct: null,
  featured: false,
  badge: null,
  bestFor: 'Any business that wants the mark it just paid for to be defensible rather than merely owned.',
  highlights: brandProtection.points.slice(0, 3),
  features: brandProtection.points,
  groups: [],
  includes: [],
  siblings: [],
  metaTitle: `US Trademark Registration — ${money(brandProtection.price)} per class`,
  metaDescription:
    'Clearance search, USPTO filing and examiner responses handled by our legal desk. $599 plus $350 per class, and the government filing fee on top.',
  intro: brandProtection.plain,
  sections: [
    { h: 'What registration actually gives you', p: [brandProtection.plain] },
    { h: 'What is included', ul: brandProtection.points },
    { h: 'What it costs', p: [brandProtection.note] },
    { h: 'How the filing runs', ol: families.protection.process },
  ],
  faqs: families.protection.faqs,
}

const addOnPages = addOns.items.map((item) => {
  const priceLabel = `${item.from ? 'from ' : ''}${money(item.price)}`
  slugByItem.set(item, `add-on-${slugify(item.name)}`)

  return {
    slug: `add-on-${slugify(item.name)}`,
    name: item.name,
    kind: item.kind || 'Add-on',
    family: 'addon',
    familyLabel: families.addon.label,
    hub: families.addon.hub,
    sectionId: 'add-ons',
    sectionTitle: 'Add-ons',
    price: item.price,
    priceLabel,
    was: null,
    saving: null,
    savingPct: null,
    featured: false,
    badge: null,
    bestFor: item.body,
    highlights: item.tiers ? item.tiers.map((t) => `${t.qty} for ${money(t.price)}`) : [item.body],
    features: item.tiers ? item.tiers.map((t) => `${t.qty} — ${money(t.price)}`) : [],
    groups: [],
    includes: [],
    siblings: [],
    metaTitle: `${item.name} — ${priceLabel}`,
    metaDescription: `${item.name} from LogoOrbit, ${priceLabel}. ${item.body}`.slice(0, 300),
    intro: item.body,
    sections: [
      { h: 'What this is', p: [item.body] },
      ...(item.tiers
        ? [
            {
              h: 'Quantities and prices',
              table: item.tiers.map((t) => [`${t.qty} cards`, money(t.price)]),
            },
          ]
        : []),
      { h: 'How add-ons work', p: [addOns.plain], ol: families.addon.process },
    ],
    faqs: families.addon.faqs,
  }
})

export const packages = [...fromSections, ...fromBigPackages, flagshipPage, trademarkPage, ...addOnPages]

export const packageBySlug = Object.fromEntries(packages.map((p) => [p.slug, p]))

/** Grouped for the package index, in the order the pricing page uses. */
export const packageFamilies = Object.keys(families)
  .map((id) => ({
    id,
    label: families[id].label,
    lead: families[id].lead,
    packages: packages.filter((p) => p.family === id),
  }))
  .filter((f) => f.packages.length > 0)
