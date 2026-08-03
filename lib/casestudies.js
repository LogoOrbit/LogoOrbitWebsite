import { portfolioLogos } from './portfolio'

/**
 * A page of its own for every mark on the portfolio wall.
 *
 * The wall shows 151 logos as tiles, which tells a visitor we have done a lot
 * of work and nothing else. What somebody browsing for their own sector
 * actually wants to know is what that kind of business needs from a mark, what
 * it has to survive once it leaves the screen, and what was handed over.
 *
 * That knowledge is real and it is sector-shaped, so it is written once per
 * sector and once per mark form (emblem, monogram, seal, wordmark, symbol) and
 * composed per mark. What we deliberately do NOT do is invent client-specific
 * facts — budgets, timelines, revenue results, quotes. Nothing on a generated
 * page claims anything about a client that we have not been told.
 */

/* ------------------------------------------------------------------ sectors */

export const sectorNotes = {
  Technology: {
    label: 'Technology',
    lead: 'Technology brands are judged at 32 pixels before they are judged anywhere else — an app icon, a favicon, an avatar in a repository. The mark has to survive that first, and look considered at conference-banner size second.',
    demands: [
      'Legible as a favicon and an app icon, where most of the audience meets it',
      'Works on a dark interface without a white box behind it',
      'Distinct from the abstract-swoosh convention that half the sector shares',
      'Scales into a product UI as a small system icon, not just a marketing asset',
    ],
    pitfall:
      'The category default is a rounded abstract gradient, and it is the reason so many technology logos are indistinguishable at thumbnail size. Breaking from it deliberately is usually worth more than polishing inside it.',
    appears: ['App icon and favicon', 'Product interface', 'Pitch decks and investor material', 'Conference stands and swag'],
  },
  'Real Estate': {
    label: 'Real Estate',
    lead: 'A property mark is a trust signal on a yard sign at thirty feet and on a business card at thirty centimetres, and it has to read the same at both. It is also seen next to a photograph of a house more often than on its own.',
    demands: [
      'Readable on a yard sign from across the street',
      'Holds up alongside property photography without competing with it',
      'One-colour version for stamped documents, folders and window vinyl',
      'A stacked lockup for a portrait sign and a horizontal one for a letterhead',
    ],
    pitfall:
      'The roofline-and-key cliché is so common in this sector that it reads as generic rather than reassuring. Where a mark here uses architectural language, it earns it by being specific rather than symbolic.',
    appears: ['Yard and window signage', 'Listing photography overlays', 'Contracts and folders', 'Vehicle livery'],
  },
  Business: {
    label: 'Business & Professional Services',
    lead: 'Consultancies, agencies and professional firms are bought on credibility, and the mark is doing more work on a proposal cover and an email signature than anywhere else. Restraint is the brief.',
    demands: [
      'Reads as established rather than energetic',
      'Sits quietly at the top of a document without dominating the page',
      'Single-colour and reversed versions for letterheads and slide masters',
      'Small enough at email-signature size to still be legible',
    ],
    pitfall:
      'Professional does not have to mean anonymous. The sector is full of blue geometric marks that could belong to any firm in it, which is a wasted opportunity in a category where clients compare three shortlisted names.',
    appears: ['Proposal and report covers', 'Email signatures', 'Slide decks', 'Office signage'],
  },
  Construction: {
    label: 'Construction & Trades',
    lead: 'A construction mark spends its life on a truck door, a site board, a hard hat and a hi-vis vest. It is applied by sign makers and embroiderers, not by designers, and it has to survive all of them.',
    demands: [
      'Bold enough to read from a moving vehicle',
      'Reproduces in a single colour for vinyl, embroidery and stamping',
      'No fine detail that closes up when cut from vinyl or stitched',
      'Strong horizontal lockup for a truck door and a stacked one for a site board',
    ],
    pitfall:
      'Detail is the enemy here. A mark that looks sharp on screen and turns to mush when embroidered onto a polo shirt is a mark that fails on the item most customers will actually see.',
    appears: ['Vehicle doors and wraps', 'Site hoarding and signage', 'Embroidered workwear', 'Invoices and estimates'],
  },
  'Home Services': {
    label: 'Home Services',
    lead: 'Cleaning, landscaping and maintenance businesses are let into somebody’s house. The mark is a reassurance instrument first — it is on the van in the driveway and the shirt at the front door.',
    demands: [
      'Approachable without being childish, because the buyer is often nervous about strangers',
      'Legible on a van at a distance and on a name badge up close',
      'Single-colour version for uniforms, magnets and door hangers',
      'Works next to a phone number, which is usually the loudest element on the vehicle',
    ],
    pitfall:
      'The category defaults to bubbles, sparkles and swooshes, which competes for attention with the phone number. The mark that wins on a driveway is usually the calmest one there.',
    appears: ['Van livery and magnets', 'Uniforms and badges', 'Door hangers and flyers', 'Local directory listings'],
  },
  Fitness: {
    label: 'Fitness',
    lead: 'Fitness marks live on apparel more than on stationery. The real test is whether a member would wear it, because a logo people choose to put on their body is doing marketing no ad budget can buy.',
    demands: [
      'Strong enough as a shape to work on a shirt front, not just a website header',
      'Reproduces in one colour for screen printing and embroidery',
      'A compact badge variant for a sleeve, a cap or a water bottle',
      'Reads on a dark garment as readily as a light one',
    ],
    pitfall:
      'Speed lines and flexing silhouettes date fast and rarely survive being embroidered. Geometry and typography age better in this sector than illustration does.',
    appears: ['Apparel and merchandise', 'Gym signage and window vinyl', 'Class schedules and social posts', 'App and booking screens'],
  },
  Sports: {
    label: 'Sports & Recreation',
    lead: 'A sports mark has to work as a badge. Teams, clubs and academies put it on kit, on a crest, on a bag and on a trophy, and it is expected to look like it has been there for years.',
    demands: [
      'Badge-shaped lockup that holds together inside a crest or a circle',
      'Simplifies cleanly for embroidery on kit',
      'Retains identity in a single colour on a trophy or an etched surface',
      'Reads at both banner scale and sleeve scale',
    ],
    pitfall:
      'Detail that a printer can render and an embroiderer cannot. A crest with six colours and fine linework becomes an expensive compromise the first time it goes onto a shirt.',
    appears: ['Kit and training wear', 'Club signage and banners', 'Trophies and awards', 'Social and fixture graphics'],
  },
  Photography: {
    label: 'Photography',
    lead: 'A photographer’s logo has one unusual constraint: it must never compete with the work. It sits in a corner of an image, on a gallery page, and in a watermark, and its job is to be present without being noticed.',
    demands: [
      'Quiet enough to sit over an image without stealing attention',
      'Works as a watermark in white and in black over varied backgrounds',
      'Compact mark or monogram for a corner placement',
      'Typographic confidence, because the wordmark usually carries the identity',
    ],
    pitfall:
      'A camera or aperture icon says "photography" to nobody who was not already looking at photographs. In this sector the name, set well, usually outperforms the symbol.',
    appears: ['Image watermarks', 'Gallery and portfolio sites', 'Album and print packaging', 'Client proofing galleries'],
  },
  Fashion: {
    label: 'Fashion & Apparel',
    lead: 'A fashion mark is a product feature. It is woven into a label, foiled onto a box and stitched into a garment, and the manufacturing constraints arrive before the aesthetic ones.',
    demands: [
      'Reproduces at woven-label scale, which is smaller and coarser than most people expect',
      'Single-colour and foil-safe versions for packaging and hardware',
      'A monogram or compact variant for hardware, buttons and hang tags',
      'Sufficient elegance to sit on a garment as decoration, not just identification',
    ],
    pitfall:
      'Fine scripts are the most requested and the most fragile. What reads beautifully on a screen frequently disappears when woven at 25 millimetres wide.',
    appears: ['Woven labels and hang tags', 'Packaging and tissue', 'Storefront and lookbooks', 'E-commerce and social'],
  },
  Retail: {
    label: 'Retail',
    lead: 'Retail marks are judged on a shelf and a shopfront, in competition with everything beside them. Distinctiveness beats refinement, because the first job is being seen at all.',
    demands: [
      'Distinct silhouette that separates from neighbouring products on a shelf',
      'Legible on packaging at arm’s length',
      'Works on a fascia sign and a carrier bag',
      'Single-colour version for stamps, stickers and receipts',
    ],
    pitfall:
      'Marks designed to look good in isolation often disappear in context. The useful test is a mock shelf with competitors either side, not a white background.',
    appears: ['Packaging and labels', 'Shopfront and fascia signage', 'Bags, stickers and receipts', 'Marketplace listings'],
  },
  'Food & Drink': {
    label: 'Food & Drink',
    lead: 'Food marks are applied to more surfaces than almost any other sector: cups, boxes, awnings, aprons, menus and delivery apps, most of them at small size and many of them in one colour.',
    demands: [
      'One-colour version for cups, stamps and takeaway packaging',
      'Legible at delivery-app thumbnail size, which is where a lot of ordering now happens',
      'Holds up on an awning or a window at street distance',
      'A compact badge for a lid, a sticker or a cap',
    ],
    pitfall:
      'Hand-drawn detail is the sector default and it is expensive to reproduce well. The mark needs a simplified sibling for the small applications, drawn deliberately rather than scaled down.',
    appears: ['Cups, packaging and stamps', 'Menus and awnings', 'Delivery app listings', 'Aprons and staff wear'],
  },
  Community: {
    label: 'Community & Non-profit',
    lead: 'Community organisations put their mark on things people keep — programmes, banners, shirts, certificates — and it usually has to carry a sense of permanence rather than novelty.',
    demands: [
      'Reads as established and durable rather than fashionable',
      'Works as a seal or badge for documents and certificates',
      'Single-colour reproduction for stamps, embroidery and low-budget print',
      'Legible on a banner at distance and on a lapel pin up close',
    ],
    pitfall:
      'Symbolism chosen by committee tends to accumulate. Marks in this sector work best when one idea is carried well rather than three ideas being represented fairly.',
    appears: ['Banners and signage', 'Certificates and programmes', 'Shirts and merchandise', 'Grant and funding documents'],
  },
  Automotive: {
    label: 'Automotive',
    lead: 'Automotive marks are read at speed and applied to curved, reflective surfaces. Whatever survives being cut from vinyl and wrapped around a panel is the real logo.',
    demands: [
      'Bold enough to read from a passing vehicle',
      'Simple enough to cut cleanly from vinyl without fine detail',
      'Works on gloss, matte and reflective finishes',
      'Horizontal lockup for panels, compact badge for a rear window',
    ],
    pitfall:
      'Chrome and bevel effects are still the sector default and they do not exist in vinyl. A mark that depends on a gradient to look right will look wrong everywhere it actually matters.',
    appears: ['Vehicle wraps and decals', 'Workshop signage', 'Uniforms and paperwork', 'Marketplace and directory listings'],
  },
  Finance: {
    label: 'Finance',
    lead: 'Financial marks are trust instruments. They are seen on statements, portals and correspondence, and the design brief is almost always about signalling stability without becoming invisible.',
    demands: [
      'Legible and calm on dense documents',
      'Single-colour version for statements, stamps and secure print',
      'Reads clearly at email-signature and portal-header size',
      'Distinct from the geometric-blue convention that dominates the sector',
    ],
    pitfall:
      'Conservatism is expected, but the difference between reassuring and forgettable is distinctiveness in one deliberate element rather than none.',
    appears: ['Statements and correspondence', 'Client portals', 'Office and window signage', 'Presentation material'],
  },
  Healthcare: {
    label: 'Healthcare',
    lead: 'Healthcare marks must be calm, legible and never ambiguous. They are read by people who are anxious, often on signage while navigating an unfamiliar building.',
    demands: [
      'Extremely legible at signage distance and small print size',
      'Calm palette that survives being reproduced on forms and stationery',
      'Single-colour version for documents, stamps and scrubs',
      'Free of imagery that could be misread as a clinical claim',
    ],
    pitfall:
      'The cross, the caduceus and the abstract human figure are so heavily used that they carry almost no distinguishing information. Typography usually does more work here than symbolism.',
    appears: ['Building and wayfinding signage', 'Forms and patient material', 'Uniforms and badges', 'Appointment and booking systems'],
  },
  Travel: {
    label: 'Travel',
    lead: 'Travel marks are seen in a crowded competitive context — listings, comparison sites, booking flows — and they have to carry a promise about the experience in a very small space.',
    demands: [
      'Reads at listing-thumbnail size in a booking flow',
      'Works over photography, which dominates this sector’s visual language',
      'Single-colour version for tickets, stamps and documents',
      'Compact variant for an app icon and a social avatar',
    ],
    pitfall:
      'Globes, planes and palm trees describe the category rather than the business. In a list of twenty competitors, describing the category is the same as blending into it.',
    appears: ['Booking listings and app icons', 'Tickets and travel documents', 'Signage and merchandise', 'Social and advertising'],
  },
}

const defaultSector = {
  label: 'Brand identity',
  lead: 'Every mark here was drawn for one business, around what that business sells and who buys from it.',
  demands: [
    'Legible at small size before it is judged at large size',
    'A single-colour version that survives stamping, embroidery and vinyl',
    'A reversed version for dark backgrounds',
    'Files in every format a printer or a developer will ask for',
  ],
  pitfall: 'A mark that only works in the conditions it was designed in is a mark that will be redrawn by somebody else within two years.',
  appears: ['Signage', 'Print and stationery', 'Web and social', 'Merchandise'],
}

/* -------------------------------------------------------------------- forms */

/**
 * The form a mark takes changes what the drawing has to solve, so the "how it
 * was drawn" section is written per form rather than per client.
 */
const forms = {
  emblem: {
    name: 'Emblem',
    summary:
      'An emblem locks the name and the symbol into a single contained shape. It is the hardest form to make work small and the most durable once it does, which is why it suits businesses that want to look long-established.',
    drawing: [
      'The containing shape is drawn first, because everything inside it has to earn its space.',
      'Type is set inside the container at a weight that survives the shape being reduced, rather than at the weight that looks most elegant at full size.',
      'A simplified variant is drawn deliberately for small sizes, usually dropping the outer detail rather than shrinking it.',
    ],
  },
  seal: {
    name: 'Seal',
    summary:
      'A seal is an emblem with formality attached. Circular lockups read as authority and permanence, which is why they persist on certificates, stamps and anything meant to look official.',
    drawing: [
      'Type is set on a curve at a size that stays readable once the whole seal is reduced to stamp scale.',
      'Weight is distributed so the ring does not overpower the centre when it is reproduced in one colour.',
      'A centre-only variant is produced for the sizes where the ring type would close up.',
    ],
  },
  monogram: {
    name: 'Monogram',
    summary:
      'A monogram turns initials into a shape. It is the most compact form of identity there is, which makes it the one that survives hardware, hang tags, favicons and watermarks best.',
    drawing: [
      'The letterforms are drawn rather than typed, so the joins and counters are decisions instead of accidents.',
      'Counters are opened up deliberately, because they are the first thing to fill in when a mark is embroidered or engraved.',
      'The monogram is tested locked to the full name and standing alone, since it has to do both.',
    ],
  },
  wordmark: {
    name: 'Wordmark',
    summary:
      'A wordmark puts the name first, which is the right choice for a business that gets discovered in a search result, a directory or a map pin. Nothing has to be explained before the name is read.',
    drawing: [
      'Letter spacing is adjusted by eye at the sizes the mark will actually be used at, not at the size it is drawn at.',
      'Individual letterforms are modified where a stock typeface leaves the name feeling generic.',
      'A compact or stacked variant is produced for square placements, where a horizontal wordmark would be unreadable.',
    ],
  },
  symbol: {
    name: 'Symbol and wordmark',
    summary:
      'A symbol paired with the name is the most flexible arrangement: the pair does the introducing, and once the audience knows the business, the symbol can travel alone.',
    drawing: [
      'The symbol is built from as few shapes as will carry the idea, because every additional element is another thing to lose at small size.',
      'The lockup is spaced so the symbol and the name read as one unit rather than two adjacent things.',
      'Horizontal, stacked and symbol-only versions are drawn as separate lockups rather than rearranged on the fly.',
    ],
  },
  concept: {
    name: 'Concept mark',
    summary:
      'A concept explored for a client brief without a legible wordmark attached. It is shown here as a piece of drawing rather than as a finished identity, which is why it carries its sector rather than a company name.',
    drawing: [
      'The idea is tested as a silhouette first: if it does not read in solid black, colour will not rescue it.',
      'Proportions are checked at favicon size early, because that is where a symbol-led idea usually fails.',
      'Where a direction survives both tests, it goes forward to be paired with the name.',
    ],
  },
}

/** Reads the form off the slug and the name, which is all we honestly know. */
function detectForm(item) {
  const slug = item.slug
  if (/emblem/.test(slug)) return forms.emblem
  if (/seal/.test(slug)) return forms.seal
  if (/monogram/.test(slug)) return forms.monogram
  if (!item.name) return forms.concept
  // Three words or more is almost always set as a lockup rather than a
  // standalone wordmark, and a short name is usually carried by the type.
  return item.name.split(/\s+/).length >= 3 ? forms.symbol : forms.wordmark
}

/* ---------------------------------------------------------------- assembly */

/** Every mark in the set, with the sector, the form and its siblings resolved. */
export const caseStudies = portfolioLogos.map((item, index) => {
  const sector = sectorNotes[item.category] || defaultSector
  const form = detectForm(item)
  const title = item.name || `${item.category} logo concept`

  const siblings = item.name
    ? portfolioLogos.filter((l) => l.name === item.name && l.slug !== item.slug).map((l) => l.slug)
    : []

  return {
    slug: item.slug,
    name: item.name,
    title,
    category: item.category,
    sectorLabel: sector.label,
    formName: form.name,
    index,
    siblings,
    metaTitle: item.name
      ? `${item.name} Logo Design — ${item.category} Case Study`
      : `${item.category} Logo Concept — Portfolio`,
    metaDescription: item.name
      ? `An original ${item.category.toLowerCase()} logo drawn for ${item.name} by the LogoOrbit studio: the brief the mark answers, where it has to work, and what was delivered.`
      : `An original ${item.category.toLowerCase()} logo concept from the LogoOrbit studio, shown as drawing work: how it was built and what it had to survive.`,
    intro: item.name
      ? `An original mark drawn in-house for ${item.name}, a ${sector.label.toLowerCase()} business. ${form.name} lockup, delivered with full copyright transfer.`
      : `A ${sector.label.toLowerCase()} concept from the studio, shown as drawing work rather than as a finished identity.`,
    sections: [
      {
        h: `What a ${sector.label.toLowerCase()} mark has to do`,
        p: [sector.lead],
        ul: sector.demands,
      },
      {
        h: `Drawing it as ${form.name === 'Symbol and wordmark' ? 'a symbol and wordmark' : `a ${form.name.toLowerCase()}`}`,
        p: [form.summary],
        ol: form.drawing,
      },
      {
        h: 'The mistake this sector makes most',
        p: [sector.pitfall],
      },
      {
        h: 'Where this mark has to live',
        p: [
          'A logo is not finished when it looks right on a screen. It is finished when it still works on every surface the business will put it on, which in this sector means at least these:',
        ],
        ul: sector.appears,
      },
      {
        h: 'What was handed over',
        p: [
          'Every project delivered by this studio ships the same way, whichever package it was bought under: editable vector masters, every export a printer or a developer asks for, and the written copyright assignment that makes the mark genuinely the client’s.',
        ],
        table: [
          ['Vector masters', 'Editable AI and EPS, plus PDF and SVG. Everything else can be regenerated from these, which is why they matter more than any export.'],
          ['Web and social exports', 'PNG with transparency and JPG at the sizes profiles, favicons and site headers need.'],
          ['Lockup variants', 'Horizontal and stacked arrangements, a single-colour version, and a reversed version for dark backgrounds.'],
          ['Colour and type reference', 'Exact colour values for print and screen, and the typefaces used, so anything made later matches.'],
          ['Copyright assignment', 'Written transfer of the design to the client. Not a licence — the assignment is what makes trademark registration in their own name possible.'],
        ],
      },
    ],
  }
})

export const caseStudyBySlug = Object.fromEntries(caseStudies.map((c) => [c.slug, c]))

/** Marks from the same sector, used for the "more like this" row. */
export function relatedMarks(slug, limit = 6) {
  const study = caseStudyBySlug[slug]
  if (!study) return []

  const pool = caseStudies.filter((c) => c.category === study.category && c.slug !== slug)
  const siblings = study.siblings.map((s) => caseStudyBySlug[s]).filter(Boolean)
  const seen = new Set()

  return [...siblings, ...pool]
    .filter((c) => !seen.has(c.slug) && seen.add(c.slug))
    .slice(0, limit)
    .map((c) => ({ name: c.title, href: `/portfolio/${c.slug}`, description: `${c.category} · ${c.formName}` }))
}
