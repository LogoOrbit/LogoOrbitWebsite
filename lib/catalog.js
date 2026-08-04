/**
 * The extended service catalogue.
 *
 * The six pages in lib/pages.js are the headline offers and keep their own
 * top-level URLs. This file covers everything underneath them: the specific
 * jobs people actually type into a search box, from "menu design" to
 * "SaaS dashboard UI". Each entry gets its own page at /services/<slug>.
 *
 * Every entry is written once and reused by the page, the hub, the sitemap and
 * the schema graph, so a service can never appear in the navigation with copy
 * that has drifted from the page it points at.
 */

export const serviceGroups = [
  {
    id: 'brand',
    name: 'Brand & Identity',
    blurb: 'The mark, the system around it, and the rules that keep it consistent.',
  },
  {
    id: 'print',
    name: 'Print & Packaging',
    blurb: 'Everything that gets printed, posted, wrapped or handed across a counter.',
  },
  {
    id: 'digital',
    name: 'Web & Product Design',
    blurb: 'Sites, stores, apps and interfaces designed to be used, not just admired.',
  },
  {
    id: 'content',
    name: 'Marketing & Social',
    blurb: 'The creative that fills your feed, your ad account and your inbox.',
  },
  {
    id: 'illustration',
    name: 'Illustration & Specialty',
    blurb: 'Drawn work: characters, icons, covers, lettering and merchandise.',
  },
  {
    id: 'motion',
    name: 'Video & Motion',
    blurb: 'Anything that moves, from a four-second logo sting to a full edit.',
  },
  {
    id: 'programme',
    name: 'Programmes & Consulting',
    blurb: 'Ongoing design capacity and the strategy work that sits above it.',
  },
]

/**
 * One accent colour per discipline, so any grid built from `catalogServices`
 * reads as several distinct collections rather than one flat list, no matter
 * which page is doing the listing.
 */
const groupTones = ['blue', 'emerald', 'violet', 'amber', 'pink', 'cyan', 'orange']
export const groupTone = Object.fromEntries(
  serviceGroups.map((g, i) => [g.id, groupTones[i % groupTones.length]])
)

export const catalogServices = [
  /* ---------------------------------------------------------------- brand */
  {
    slug: 'brand-identity-design',
    name: 'Brand Identity Design',
    group: 'brand',
    icon: 'logo',
    price: 449,
    priceLabel: 'from $449',
    metaTitle: 'Brand Identity Design Services',
    metaDescription:
      'Complete brand identity design: logo system, colour palette, typography, imagery direction and usage rules, delivered as one coherent kit you own outright.',
    h1: 'A brand identity that holds together',
    highlight: 'everywhere it appears',
    intro:
      'A logo on its own is one asset. A brand identity is the system around it: the palette, the type, the way photographs are treated, the spacing rules, and the decisions that stop a business looking like three different companies across its website, its van and its invoice.',
    whoFor:
      'Businesses that already have a name and now need everything downstream of it to look deliberate rather than assembled.',
    deliverables: [
      'Primary, stacked and horizontal logo lockups',
      'Colour palette with HEX, RGB, CMYK and Pantone values',
      'Typographic scale for headings, body and UI',
      'Imagery and iconography direction',
      'Clear-space, minimum-size and misuse rules',
      'Applied mockups across print and screen',
    ],
    faqs: [
      {
        q: 'What is the difference between a logo and a brand identity?',
        a: 'The logo is one mark. The identity is the full set of decisions that make everything else recognisably yours: colours, fonts, layout habits, photographic style and the rules for using them. You can buy the logo alone, but the identity is what makes a stranger recognise you before they read the name.',
      },
      {
        q: 'Do I need a brand identity if I am a one-person business?',
        a: 'A lighter one, yes. Even a sole trader sends quotes, posts on social and hands over a card. Agreeing a palette and two typefaces up front takes a day and saves you re-deciding every time you make something.',
      },
      {
        q: 'Can you build an identity around a logo I already own?',
        a: 'Yes, and it is common. We audit what you have, keep what is working, redraw what is not, and build the system outward from the existing mark so your recognition is not thrown away.',
      },
    ],
    related: ['brand-guidelines', 'visual-identity-design', 'rebranding-services', 'brand-strategy'],
    keywords: 'brand identity design, corporate identity, identity system, brand kit, brand assets',
  },
  {
    slug: 'brand-guidelines',
    name: 'Brand Guidelines & Style Guide',
    group: 'brand',
    icon: 'book',
    price: 369,
    priceLabel: 'from $369',
    metaTitle: 'Brand Guidelines & Brand Style Guide Design',
    metaDescription:
      'Brand guideline documents that keep a brand consistent across teams, agencies and printers, with logo rules, colour specs, typography and real usage examples.',
    h1: 'The document that stops your brand',
    highlight: 'drifting',
    intro:
      'Guidelines exist for the moment you are not in the room: when a printer, a freelancer or a new hire has to make something and needs to know what is allowed. We write them as a working reference rather than a showpiece, so people actually open them.',
    whoFor:
      'Any brand with more than one person making things, or one that hands artwork to outside suppliers.',
    deliverables: [
      'Logo construction, clear space and minimum sizes',
      'Approved and prohibited logo variations',
      'Full colour specification including print values',
      'Type hierarchy with real-world examples',
      'Photography, illustration and icon direction',
      'Print-ready PDF plus editable source',
    ],
    faqs: [
      {
        q: 'How long is a typical brand guideline document?',
        a: 'Between twelve and forty pages depending on how much you apply the brand. A single-location business rarely needs more than fifteen; a franchise with signage, vehicles, uniforms and packaging needs the longer version.',
      },
      {
        q: 'Can our team edit the guidelines later?',
        a: 'Yes. You get the editable source file alongside the PDF, so adding a new application or swapping a supplier photo does not mean coming back to us.',
      },
      {
        q: 'Do guidelines cover our website and social channels too?',
        a: 'They can. We include a digital section with UI colour roles, button styles, social avatar and cover crops, and the safe areas each platform enforces.',
      },
    ],
    related: ['brand-identity-design', 'design-system', 'visual-identity-design', 'rebranding-services'],
    keywords: 'brand guidelines, brand style guide, brand book, brand manual, brand standards',
  },
  {
    slug: 'visual-identity-design',
    name: 'Visual Identity Design',
    group: 'brand',
    icon: 'spark',
    price: 449,
    priceLabel: 'from $449',
    metaTitle: 'Visual Identity Design Services',
    metaDescription:
      'Visual identity design covering logo, palette, type, pattern, icon and layout language, built so every touchpoint reads as the same brand.',
    h1: 'Every touchpoint speaking',
    highlight: 'in one voice',
    intro:
      'Visual identity is the part of a brand people see before they read anything. We design the whole visual language, not just the mark: the patterns, the crops, the graphic devices and the layout habits that make a piece of your marketing recognisable even with the logo cropped off.',
    whoFor:
      'Brands that need to look distinctive in a crowded category where everyone has already settled on the same blue.',
    deliverables: [
      'Logo suite and responsive mark variants',
      'Secondary graphic devices and patterns',
      'Custom icon set in the brand style',
      'Colour and type systems',
      'Layout grids for print and screen',
      'Application examples across six touchpoints',
    ],
    faqs: [
      {
        q: 'How is visual identity different from brand identity?',
        a: 'Visual identity is the seen half: marks, colour, type, pattern, imagery. Brand identity in the fuller sense also covers voice, positioning and messaging. We do both, and most clients start with the visual half because it is what unblocks the rest of their marketing.',
      },
      {
        q: 'Will my identity work in one colour?',
        a: 'It has to. We test every mark in solid black, reversed out of a dark background and at favicon size before we show it to you. If it only works in full colour it is not finished.',
      },
      {
        q: 'How many directions will I see?',
        a: 'Three genuinely different territories, not three versions of the same idea. Once you pick one we take it deep rather than spreading effort across directions you have already ruled out.',
      },
    ],
    related: ['brand-identity-design', 'brand-guidelines', 'icon-design', 'typography-design'],
    keywords: 'visual identity, identity design, brand visual language, graphic identity',
  },
  {
    slug: 'rebranding-services',
    name: 'Rebranding & Brand Refresh',
    group: 'brand',
    icon: 'spark',
    price: 749,
    priceLabel: 'from $749',
    metaTitle: 'Rebranding Services & Brand Refresh',
    metaDescription:
      'Rebranding and brand refresh for businesses that have outgrown their identity, with an audit, a migration plan and every asset rebuilt in the new system.',
    h1: 'Change how you look',
    highlight: 'without losing who you are',
    intro:
      'Most rebrands fail on the rollout, not the design. We start with an audit of everything currently carrying your old mark, agree what is worth keeping, then work through a sequenced replacement plan so nothing is left half-changed six months later.',
    whoFor:
      'Established businesses whose identity no longer matches what they sell, who they sell it to, or how big they have become.',
    deliverables: [
      'Audit of every existing branded asset',
      'Evolution or replacement recommendation',
      'New identity system in full',
      'Prioritised rollout checklist',
      'Rebuilt templates and stationery',
      'Announcement graphics for launch',
    ],
    faqs: [
      {
        q: 'Should we evolve the current logo or start again?',
        a: 'It depends on how much recognition you would be throwing away. If customers can describe your mark from memory, evolve it. If they cannot, or if the associations are actively wrong, start clean. We give you an honest recommendation before any design work begins.',
      },
      {
        q: 'How long does a rebrand take?',
        a: 'Design usually runs three to six weeks. Rollout depends entirely on how much you own: a service business can be finished in a fortnight, a business with vehicles, signage and printed stock usually staggers it over a quarter.',
      },
      {
        q: 'Will we lose our search rankings if we rebrand?',
        a: 'Not if the domain is handled properly. Where a rebrand includes a new domain we map every old URL to its replacement with permanent redirects, which preserves the great majority of accumulated authority.',
      },
    ],
    related: ['brand-identity-design', 'logo-redesign', 'brand-strategy', 'website-redesign'],
    keywords: 'rebranding, brand refresh, brand relaunch, corporate rebrand, identity refresh',
  },
  {
    slug: 'brand-strategy',
    name: 'Brand Strategy & Positioning',
    group: 'programme',
    icon: 'team',
    price: 899,
    priceLabel: 'from $899',
    metaTitle: 'Brand Strategy & Positioning Consulting',
    metaDescription:
      'Brand strategy and positioning work that decides what you stand for and who you are for, before a single pixel of identity design gets drawn.',
    h1: 'Decide what you stand for',
    highlight: 'before you draw anything',
    intro:
      'Design without a decision behind it is decoration. Strategy is the short, uncomfortable conversation about who you are actually for, what you will refuse to do, and what a customer should think when they hear your name. It makes every later design choice obvious.',
    whoFor:
      'Founders and marketing leads who keep going round in circles on creative because the underlying positioning was never settled.',
    deliverables: [
      'Competitor and category audit',
      'Audience definition and buying triggers',
      'Positioning statement and proof points',
      'Brand personality and tone of voice',
      'Messaging hierarchy for the website',
      'Naming and tagline recommendations',
    ],
    faqs: [
      {
        q: 'Is strategy worth paying for on a small budget?',
        a: 'If your budget is tight it matters more, not less, because you cannot afford to redo the work. A half-day of positioning usually saves a full round of design revisions.',
      },
      {
        q: 'What do we actually walk away with?',
        a: 'A written document you can hand to any designer, writer or agency: who the audience is, what the promise is, how the brand sounds, and what proof backs the claim. It is not a slide deck of adjectives.',
      },
      {
        q: 'Can you do strategy and identity together?',
        a: 'That is the usual arrangement, and it is cheaper than buying them separately. Strategy runs first, identity follows from it, and the two are quoted as one project.',
      },
    ],
    related: ['brand-identity-design', 'rebranding-services', 'startup-branding', 'creative-consulting'],
    keywords: 'brand strategy, brand positioning, brand consulting, naming, tone of voice',
  },
  {
    slug: 'logo-redesign',
    name: 'Logo Redesign',
    group: 'brand',
    icon: 'logo',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'Logo Redesign & Logo Modernisation',
    metaDescription:
      'Logo redesign that modernises a dated mark while keeping the recognition you have already paid for, delivered in full vector with every file format.',
    h1: 'Keep the equity,',
    highlight: 'lose the dated bits',
    intro:
      'Most logos that feel old are not badly drawn, they are just carrying twenty-year-old habits: a bevel, a gradient, a typeface that was everywhere in 2006. We strip those out and rebuild the mark cleanly, usually keeping enough of the original that regulars do not notice a change so much as an improvement.',
    whoFor:
      'Businesses with a recognised mark that no longer holds up next to newer competitors or at small sizes on a phone.',
    deliverables: [
      'Assessment of what is worth keeping',
      'Redrawn mark in clean vector',
      'Simplified variant for small sizes',
      'Updated colour and type pairing',
      'Side-by-side before and after',
      'Full file set for print and web',
    ],
    faqs: [
      {
        q: 'How much will customers notice?',
        a: 'That is your call, and we design to it. A refresh keeps the silhouette so it reads as tidying up. A redesign changes the mark outright and needs announcing. We show you both before you commit.',
      },
      {
        q: 'My logo is only a JPEG. Can you still work from it?',
        a: 'Yes. Redrawing from a flat image is routine. You get proper vector artwork at the end of it, which is usually worth the exercise on its own.',
      },
      {
        q: 'Do we have to change everything at once?',
        a: 'No. We supply a rollout order so the highest-visibility items change first and printed stock can be used up rather than binned.',
      },
    ],
    related: ['rebranding-services', 'brand-identity-design', 'vector-tracing', 'brand-guidelines'],
    keywords: 'logo redesign, logo refresh, modernise logo, logo update, logo makeover',
  },
  {
    slug: 'minimalist-logo-design',
    name: 'Minimalist Logo Design',
    group: 'brand',
    icon: 'logo',
    price: 69,
    priceLabel: 'from $69',
    metaTitle: 'Minimalist Logo Design',
    metaDescription:
      'Clean, minimal logo design built from simple geometry that stays legible at favicon size and reproduces perfectly in one colour.',
    h1: 'Simple marks that survive',
    highlight: 'being shrunk',
    intro:
      'Minimal is harder than it looks, because there is nowhere to hide a weak idea. We work from geometry and negative space rather than detail, which is why these marks still read at sixteen pixels, embroider cleanly and never need a special version for dark backgrounds.',
    whoFor:
      'Technology, professional services and premium consumer brands that need to look confident rather than busy.',
    deliverables: [
      'Geometric mark built on a construction grid',
      'Monogram or symbol variant',
      'Single-colour and reversed versions',
      'Favicon and app-icon crops',
      'Type pairing recommendation',
      'Vector master files',
    ],
    faqs: [
      {
        q: 'Will a minimal logo look generic?',
        a: 'Only if the idea underneath it is generic. We spend the effort on the concept rather than on ornament, so the mark is simple to reproduce but specific to your business.',
      },
      {
        q: 'Does minimal suit a traditional industry?',
        a: 'Often, yes. Law firms, clinics and financial advisers usually gain from restraint. Where heritage matters we keep a serif or a crest element rather than going flat for its own sake.',
      },
      {
        q: 'Can you make a minimal version of my existing busy logo?',
        a: 'Yes. A simplified companion mark for favicons, app icons and social avatars is a common add-on, and it does not require replacing your main logo.',
      },
    ],
    related: ['logo-redesign', 'monogram-logo-design', 'app-icon-design', 'icon-design'],
    keywords: 'minimalist logo, minimal logo design, simple logo, modern logo design, flat logo',
  },
  {
    slug: 'monogram-logo-design',
    name: 'Monogram & Lettermark Logos',
    group: 'brand',
    icon: 'logo',
    price: 119,
    priceLabel: 'from $119',
    metaTitle: 'Monogram & Lettermark Logo Design',
    metaDescription:
      'Custom monogram and lettermark logo design, initials drawn as a single considered mark rather than two letters pushed together.',
    h1: 'Your initials, drawn',
    highlight: 'as one mark',
    intro:
      'A monogram is the most compact identity there is, which makes it ideal for a name that is long, hard to spell or shared with three other firms. Done properly the letters interlock into a single shape rather than sitting side by side, so it works as an avatar, a stamp and an embroidery file.',
    whoFor:
      'Law firms, fashion labels, hospitality, personal brands and any business with a long or multi-word name.',
    deliverables: [
      'Custom-drawn letterform monogram',
      'Enclosed and open variants',
      'Full lockup with the business name',
      'Embroidery-safe simplified version',
      'Stamp and watermark treatments',
      'Vector master files',
    ],
    faqs: [
      {
        q: 'Should the monogram replace my full name in the logo?',
        a: 'No, they work together. The full lockup carries the name on your website and signage, the monogram takes over where space is tight: avatars, favicons, labels, buttons and merchandise.',
      },
      {
        q: 'Can you use three initials?',
        a: 'Yes, though three is harder to balance than two. We usually letter one dominant character and support it with the other two rather than giving all three equal weight.',
      },
      {
        q: 'Will it embroider well?',
        a: 'We supply a simplified variant specifically for stitching, with thin strokes thickened and any overlap opened out, because thread cannot hold detail the way print can.',
      },
    ],
    related: ['minimalist-logo-design', 'typography-design', 'luxury-logo-design', 'apparel-design'],
    keywords: 'monogram logo, lettermark, initials logo, custom monogram, letter logo design',
  },
  {
    slug: 'mascot-logo-design',
    name: 'Mascot & Character Logos',
    group: 'brand',
    icon: 'spark',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'Mascot Logo Design & Character Logos',
    metaDescription:
      'Custom mascot logo design for sports teams, food brands, gaming channels and family businesses, drawn with personality and built to reproduce cleanly.',
    h1: 'A face people',
    highlight: 'remember and repeat',
    intro:
      'Mascots do something abstract marks cannot: they carry warmth and they can be posed. We draw yours with a clear silhouette and controlled detail so the same character survives a jersey embroidery, a truck panel and a two-centimetre app icon.',
    whoFor:
      'Sports clubs, restaurants and food trucks, kids brands, gaming and streaming channels, and trades that want to feel approachable.',
    deliverables: [
      'Original character design',
      'Full logo lockup with the name',
      'Head-only badge variant',
      'One-colour and reversed versions',
      'Two additional poses or expressions',
      'Vector master files',
    ],
    faqs: [
      {
        q: 'Can the mascot be used in more than one pose later?',
        a: 'Yes. We build the character so extra poses can be drawn consistently, and two are included up front. Additional poses are quoted individually and stay in the same style.',
      },
      {
        q: 'Will it work embroidered on a shirt?',
        a: 'The head-only badge is designed exactly for that. Full-body mascots lose detail below about seven centimetres, which is why the simplified badge exists.',
      },
      {
        q: 'Do I own the character outright?',
        a: 'Completely, including all the poses. Copyright transfers to you in writing on delivery with no licensing and no ongoing fee.',
      },
    ],
    related: ['character-design', 'custom-illustration', 'apparel-design', 'sticker-design'],
    keywords: 'mascot logo, character logo, cartoon logo, sports team logo, mascot design',
  },
  {
    slug: 'luxury-logo-design',
    name: 'Luxury & Premium Logo Design',
    group: 'brand',
    icon: 'logo',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'Luxury Logo Design for Premium Brands',
    metaDescription:
      'Refined logo design for luxury, premium and high-ticket brands, built on classical proportion, custom lettering and restrained detail.',
    h1: 'Restraint is what',
    highlight: 'reads as expensive',
    intro:
      'Premium brands signal value by leaving things out. We work with generous spacing, considered letterform detail and a narrow palette, then design specifically for foil, emboss and deboss so the mark carries the same weight on a printed box as on a screen.',
    whoFor:
      'Jewellery, fashion, hospitality, private clients, real estate and any brand competing on quality rather than price.',
    deliverables: [
      'Custom or refined letterform wordmark',
      'Crest, seal or emblem variant',
      'Foil and emboss-ready single-colour artwork',
      'Restrained supporting palette',
      'Packaging and stationery application',
      'Vector master files',
    ],
    faqs: [
      {
        q: 'Why does premium design use so little colour?',
        a: 'Because colour competes for attention and premium positioning is built on calm. Most luxury identities run on one dark neutral, one metallic and a lot of white space.',
      },
      {
        q: 'Can you design for foil stamping?',
        a: 'Yes, and it changes how a mark is drawn. Foil needs slightly heavier strokes and no hairlines, so we supply a dedicated single-colour version alongside the standard artwork.',
      },
      {
        q: 'Do you do custom lettering rather than a font?',
        a: 'For premium work we usually start from a quality typeface and then redraw the specific letters, which gives you something ownable without the cost of a full custom typeface.',
      },
    ],
    related: ['monogram-logo-design', 'typography-design', 'packaging-design', 'brand-identity-design'],
    keywords: 'luxury logo design, premium brand logo, elegant logo, high-end branding, foil logo',
  },
  {
    slug: 'startup-branding',
    name: 'Startup Branding',
    group: 'programme',
    icon: 'spark',
    price: 1299,
    priceLabel: 'from $1,299',
    metaTitle: 'Startup Branding Packages',
    metaDescription:
      'Branding for startups: name-ready identity, pitch deck, landing page and social kit delivered fast enough to keep up with a funding round.',
    h1: 'Everything a startup needs',
    highlight: 'to look funded',
    intro:
      'Startups need brand assets in the order investors and early users encounter them: the deck, the landing page, the product UI, then everything else. We work to that order, in sprints, so you are never waiting on a full identity to book a demo.',
    whoFor:
      'Pre-seed to Series A companies who need credible design now and cannot afford a three-month agency engagement.',
    deliverables: [
      'Logo and core identity system',
      'Investor pitch deck design',
      'Launch landing page design',
      'Product UI starter components',
      'Social and app store assets',
      'Founder-ready asset library',
    ],
    faqs: [
      {
        q: 'How fast can a startup identity be ready?',
        a: 'A working identity in about a week, and the deck and landing page inside the fortnight. We deliberately sequence deliverables so you can start using the brand before every piece is finished.',
      },
      {
        q: 'What if we pivot after the branding is done?',
        a: 'It happens constantly, which is why we build a flexible system rather than a fixed one. A pivot in positioning usually means new messaging and one round of asset updates, not a new identity.',
      },
      {
        q: 'Can you work alongside our in-house developer?',
        a: 'Yes. We hand over design tokens, component specs and exported assets in the format your developer asks for, and we will sit in on the implementation review.',
      },
    ],
    related: ['pitch-deck-design', 'saas-product-design', 'landing-page-design', 'brand-strategy'],
    keywords: 'startup branding, startup logo design, seed stage branding, founder brand package',
  },
  {
    slug: 'enterprise-branding',
    name: 'Enterprise & Corporate Branding',
    group: 'programme',
    icon: 'team',
    price: 3699,
    priceLabel: 'from $3,699',
    metaTitle: 'Enterprise & Corporate Branding Services',
    metaDescription:
      'Corporate branding for multi-site and multi-brand organisations: architecture, sub-brand systems, governance and rollout across every division.',
    h1: 'One brand,',
    highlight: 'many divisions',
    intro:
      'Large organisations rarely have a logo problem. They have an architecture problem: eleven sub-brands, four legacy acquisitions and no agreed rule about which one goes on the front of a proposal. We map what exists, decide the hierarchy, then design the system that governs it.',
    whoFor:
      'Multi-division, multi-site or post-acquisition organisations that need brand order rather than a new mark.',
    deliverables: [
      'Brand architecture map and recommendation',
      'Master brand and sub-brand system',
      'Division and product lockup rules',
      'Templates for every internal team',
      'Governance and approval process',
      'Phased rollout plan by department',
    ],
    faqs: [
      {
        q: 'What is brand architecture?',
        a: 'The rules deciding how your brands relate: whether a division carries its own name, a shared name, or an endorsement from the parent. Getting it wrong means every new product triggers the same argument again.',
      },
      {
        q: 'Can you work with our procurement and legal teams?',
        a: 'Yes. Enterprise projects run on a written scope, agreed milestones and named approvers, and we are used to security review, MSAs and staged invoicing.',
      },
      {
        q: 'How do you keep hundreds of staff on-brand?',
        a: 'Templates plus governance. People go off-brand when the on-brand option is harder to use, so we ship editable templates for the documents each team actually makes.',
      },
    ],
    related: ['brand-guidelines', 'brand-strategy', 'presentation-design', 'design-system'],
    keywords: 'enterprise branding, corporate branding, brand architecture, multi-brand system',
  },

  /* ---------------------------------------------------------------- print */
  {
    slug: 'business-card-design',
    name: 'Business Card Design',
    group: 'print',
    icon: 'layers',
    price: 49,
    priceLabel: 'from $49',
    metaTitle: 'Custom Business Card Design',
    metaDescription:
      'Business card design supplied print-ready with bleed, crop marks and CMYK conversion, so the file works at any printer first time.',
    h1: 'A card that survives',
    highlight: 'a pocket and a printer',
    intro:
      'Most business cards fail at the printer, not the design stage: no bleed, RGB colour, type too close to the trim. We supply files set up properly, in the exact dimensions your printer expects, with the finish options marked up.',
    whoFor: 'Anyone who still hands something over in person, which is most trades, consultants and salespeople.',
    deliverables: [
      'Front and reverse design',
      'Print-ready PDF with bleed and crop marks',
      'CMYK conversion with rich-black setup',
      'Spot UV, foil or emboss layers where used',
      'Digital version for email signatures',
      'Editable source file',
    ],
    faqs: [
      {
        q: 'What size should a business card be?',
        a: 'US standard is 3.5 × 2 inches, Europe and most of Asia use 85 × 55 mm. We set up whichever your printer wants, and both if you order in two regions.',
      },
      {
        q: 'Can you send the file straight to my printer?',
        a: 'Yes, tell us who they are and we will match their template and their preferred file spec. If they reject anything we fix it at no charge.',
      },
      {
        q: 'Do you design for QR codes?',
        a: 'Yes, and we generate the code as vector so it stays sharp. We keep it above two centimetres and away from the trim, since scanners struggle with anything smaller.',
      },
    ],
    related: ['stationery-design', 'letterhead-design', 'flyer-design', 'brand-identity-design'],
    keywords: 'business card design, visiting card design, print ready business cards, card printing design',
  },
  {
    slug: 'stationery-design',
    name: 'Stationery Design',
    group: 'print',
    icon: 'layers',
    price: 149,
    priceLabel: 'from $149',
    metaTitle: 'Corporate Stationery Design',
    metaDescription:
      'Full corporate stationery design: letterhead, compliment slips, envelopes, invoices, folders and email signatures, all built from one identity system.',
    h1: 'The paperwork,',
    highlight: 'looking like it belongs to you',
    intro:
      'Stationery is the least glamorous and most frequently seen part of a brand. Every quote, invoice and letter you send is a brand impression, and a mismatched invoice template undoes a lot of expensive design work.',
    whoFor: 'Professional services, contractors and any business that sends documents rather than posts.',
    deliverables: [
      'Letterhead, first and continuation pages',
      'Compliment slip and envelope artwork',
      'Invoice and quotation templates',
      'Presentation folder artwork',
      'HTML email signature',
      'Word and Google Docs editable versions',
    ],
    faqs: [
      {
        q: 'Will the letterhead work in Word?',
        a: 'Yes. We supply a print artwork file for professional printing and a separate Word or Google Docs template with the margins already set so your text never lands on the header.',
      },
      {
        q: 'Do you design invoices that our accounting software can use?',
        a: 'We design to what your software allows. QuickBooks, Xero and Zoho all accept custom templates within limits, and we work inside those rather than handing you a file the system rejects.',
      },
      {
        q: 'Is an email signature included?',
        a: 'Yes, as tested HTML that survives Outlook, which is where most signature designs break.',
      },
    ],
    related: ['business-card-design', 'letterhead-design', 'brand-identity-design', 'presentation-design'],
    keywords: 'stationery design, corporate stationery, letterhead and envelope design, invoice template design',
  },
  {
    slug: 'letterhead-design',
    name: 'Letterhead Design',
    group: 'print',
    icon: 'layers',
    price: 59,
    priceLabel: 'from $59',
    metaTitle: 'Letterhead Design Services',
    metaDescription:
      'Professional letterhead design delivered as print artwork plus a working Word and Google Docs template with margins correctly set.',
    h1: 'Letterhead that works',
    highlight: 'in the software you use',
    intro:
      'A letterhead is only finished when someone can type a letter into it without fighting the layout. We deliver the print artwork and the editable document template together, with the text area, margins and continuation page already defined.',
    whoFor: 'Law firms, clinics, accountants, schools and anyone whose correspondence is formal.',
    deliverables: [
      'First page and continuation page artwork',
      'Print-ready PDF with bleed',
      'Word template with locked header',
      'Google Docs version',
      'Digital PDF variant for email',
      'Editable source file',
    ],
    faqs: [
      {
        q: 'Why does my current letterhead break when I type?',
        a: 'Almost always because the design lives in the body of the document rather than the header, so text pushes it around. We build ours into the header and footer, which fixes it permanently.',
      },
      {
        q: 'Do I need a separate second page?',
        a: 'For formal correspondence, yes. Continuation pages carry a lighter mark and no full address block, which is a convention clients in law and finance expect.',
      },
      {
        q: 'Can you include registration and compliance details?',
        a: 'Yes, and for many jurisdictions those details are legally required in the footer. Send us the wording and we set it at a legible size.',
      },
    ],
    related: ['stationery-design', 'business-card-design', 'brand-identity-design', 'presentation-design'],
    keywords: 'letterhead design, company letterhead, word letterhead template, business letterhead',
  },
  {
    slug: 'brochure-design',
    name: 'Brochure & Catalogue Design',
    group: 'print',
    icon: 'book',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'Brochure & Catalogue Design Services',
    metaDescription:
      'Brochure, catalogue and company profile design with proper typographic hierarchy, imposition-ready artwork and full print production support.',
    h1: 'Long-form print that',
    highlight: 'people finish reading',
    intro:
      'A brochure is a reading experience, not a poster with more words. We plan the pagination first, decide what each spread has to do, and set the type so a reader can skim the headings or read the whole thing without losing their place.',
    whoFor:
      'Manufacturers, property developers, schools, hotels and any business whose sale needs more than a page of explanation.',
    deliverables: [
      'Page plan and content structure',
      'Full spread-by-spread layout',
      'Typographic system for long copy',
      'Image sourcing and retouching',
      'Print-ready PDF with imposition notes',
      'Digital PDF for email and download',
    ],
    faqs: [
      {
        q: 'How many pages should a brochure be?',
        a: 'Print binding works in multiples of four, so eight, twelve, sixteen and twenty-four are the practical sizes. We plan content to fit one of those rather than leaving blank pages at the back.',
      },
      {
        q: 'Do you write the copy?',
        a: 'We structure it and edit for fit, and we can write it from your material for an additional fee. Most clients supply raw content and we shape it.',
      },
      {
        q: 'Can the same design work as a digital download?',
        a: 'Yes. We export a separate screen PDF with single pages, hyperlinks live and file size compressed, because the print file is usually too heavy to email.',
      },
    ],
    related: ['catalog-design', 'flyer-design', 'presentation-design', 'book-layout-design'],
    keywords: 'brochure design, catalogue design, company profile design, bifold trifold brochure',
  },
  {
    slug: 'catalog-design',
    name: 'Product Catalogue Design',
    group: 'print',
    icon: 'book',
    price: 369,
    priceLabel: 'from $369',
    metaTitle: 'Product Catalogue Design',
    metaDescription:
      'Product catalogue design for wholesalers and manufacturers, with repeatable grids, spec tables and artwork built to update year on year.',
    h1: 'A catalogue you can',
    highlight: 'update next year',
    intro:
      'Catalogues live for years and get reissued, so the design has to be a system rather than a set of one-off pages. We build a master grid, style the product block once, and set the file up so adding forty SKUs next season does not mean redesigning the book.',
    whoFor: 'Wholesalers, distributors, manufacturers and retailers with a large or seasonal product range.',
    deliverables: [
      'Master grid and product block system',
      'Category dividers and navigation',
      'Specification and price table styles',
      'Product image treatment standard',
      'Index and cross-reference pages',
      'Reusable source file with paragraph styles',
    ],
    faqs: [
      {
        q: 'Can the catalogue be built from a spreadsheet?',
        a: 'Yes, and for anything over a hundred products it should be. We set up a data-merge from your product spreadsheet so the copy in the catalogue always matches your master list.',
      },
      {
        q: 'How do you handle price changes?',
        a: 'Either a separate price list insert, which is what most wholesalers do, or a data-linked field so a reissue is a re-export rather than a redesign.',
      },
      {
        q: 'Do you retouch product photography?',
        a: 'Yes, including background removal, colour consistency and shadow reconstruction so a range shot on different days looks like one set.',
      },
    ],
    related: ['brochure-design', 'packaging-design', 'amazon-listing-design', 'ecommerce-website-design'],
    keywords: 'product catalogue design, catalog layout, wholesale catalogue, price list design',
  },
  {
    slug: 'flyer-design',
    name: 'Flyer & Leaflet Design',
    group: 'print',
    icon: 'layers',
    price: 59,
    priceLabel: 'from $59',
    metaTitle: 'Flyer & Leaflet Design Services',
    metaDescription:
      'Flyer and leaflet design built around one offer and one action, supplied print-ready and in matching sizes for social and email.',
    h1: 'One offer, one action,',
    highlight: 'read in three seconds',
    intro:
      'A flyer gets about three seconds on a doormat or a counter. That means one offer, one instruction and a phone number large enough to read at arm\'s length. Everything else is what makes flyers get binned.',
    whoFor: 'Local trades, restaurants, gyms, events, clinics and anyone running a door-drop or a handout campaign.',
    deliverables: [
      'Single or double-sided flyer design',
      'Headline and offer hierarchy',
      'Print-ready PDF with bleed',
      'Matching social media crops',
      'Editable version for future offers',
      'Distribution size variants (A5, A6, DL)',
    ],
    faqs: [
      {
        q: 'What size flyer works best for door drops?',
        a: 'A5 is the usual compromise: large enough to carry an offer, cheap enough to print in volume, and it fits a letterbox without folding.',
      },
      {
        q: 'Can I reuse the design for next month\'s offer?',
        a: 'Yes, that is why the editable file is included. Most clients change the offer line and the date and reprint.',
      },
      {
        q: 'Do you design for both print and Instagram?',
        a: 'We supply matching crops as standard: square, story and the print size, all from the same artwork so the campaign looks like one thing.',
      },
    ],
    related: ['poster-design', 'brochure-design', 'social-media-design', 'menu-design'],
    keywords: 'flyer design, leaflet design, handout design, door drop flyer, promotional flyer',
  },
  {
    slug: 'poster-design',
    name: 'Poster & Banner Design',
    group: 'print',
    icon: 'layers',
    price: 69,
    priceLabel: 'from $69',
    metaTitle: 'Poster & Large Format Banner Design',
    metaDescription:
      'Poster, roll-up banner and large-format design set up at the right scale and resolution for wide-format printing.',
    h1: 'Readable from',
    highlight: 'across the room',
    intro:
      'Large format has its own rules: the viewing distance sets the type size, the bottom third of a roll-up is hidden behind people, and a file that looks fine on screen can be a quarter of the resolution a wide-format printer needs. We build to those constraints.',
    whoFor: 'Events, exhibitions, retail, gyms, clinics and anyone printing anything above A3.',
    deliverables: [
      'Poster artwork at final scale',
      'Roll-up and pull-up banner layouts',
      'Safe-area mapping for stands',
      'Resolution-correct linked imagery',
      'Print-ready PDF for wide format',
      'Matching digital screen version',
    ],
    faqs: [
      {
        q: 'What resolution does a large banner need?',
        a: 'Less than people expect, because it is viewed from further away. We work at a scaled ratio rather than 300 dpi at full size, which keeps the file printable instead of gigabytes.',
      },
      {
        q: 'Why is the bottom of a roll-up banner usually empty?',
        a: 'Because the lowest 30 centimetres sits behind the base, a table or a queue of people. We keep essential information above that line.',
      },
      {
        q: 'Can you design for outdoor use?',
        a: 'Yes, including mesh banners and vinyl. Outdoor work needs heavier contrast and fewer words, and we specify the material with the printer.',
      },
    ],
    related: ['flyer-design', 'signage-design', 'trade-show-design', 'social-media-design'],
    keywords: 'poster design, banner design, roll up banner, large format design, exhibition banner',
  },
  {
    slug: 'menu-design',
    name: 'Menu Design',
    group: 'print',
    icon: 'book',
    price: 119,
    priceLabel: 'from $119',
    metaTitle: 'Restaurant & Cafe Menu Design',
    metaDescription:
      'Menu design for restaurants, cafes and bars, laid out to guide ordering, drop prices down the page and print or update cheaply.',
    h1: 'A menu that sells',
    highlight: 'the dishes you want to sell',
    intro:
      'Menu layout is quiet sales work. Where a dish sits on the page, whether prices are aligned in a column, and how many items sit in each section all measurably change what people order. We design for the margin, not just the look.',
    whoFor: 'Restaurants, cafes, bars, food trucks, hotels and catering businesses.',
    deliverables: [
      'Full food and drink menu layout',
      'Section structure and dish hierarchy',
      'Price treatment that avoids column scanning',
      'Print-ready PDF plus laminate-safe version',
      'QR-linked digital menu artwork',
      'Editable file for seasonal changes',
    ],
    faqs: [
      {
        q: 'Should prices be lined up in a column?',
        a: 'No. A price column invites people to scan down it and order the cheapest thing. Prices set immediately after the description, without leader dots, keep attention on the dish.',
      },
      {
        q: 'Can we update the menu ourselves?',
        a: 'Yes. The editable file is included and most kitchens change a few lines seasonally. If you would rather we did it, seasonal updates are a small fixed fee.',
      },
      {
        q: 'Do you design digital and QR menus?',
        a: 'Yes, as a mobile-first web menu rather than a PDF, because a PDF on a phone means pinching and zooming at a table.',
      },
    ],
    related: ['flyer-design', 'brochure-design', 'signage-design', 'social-media-design'],
    keywords: 'menu design, restaurant menu, cafe menu design, food menu layout, QR menu',
  },
  {
    slug: 'packaging-design',
    name: 'Packaging Design',
    group: 'print',
    icon: 'shop',
    price: 449,
    priceLabel: 'from $449',
    metaTitle: 'Product Packaging Design Services',
    metaDescription:
      'Packaging design built on the manufacturer dieline, with compliant labelling, shelf-tested hierarchy and print-ready separations.',
    h1: 'Packaging that works',
    highlight: 'on a shelf and in a warehouse',
    intro:
      'Packaging has to do three jobs at once: catch attention at two metres, explain itself at arm\'s length, and satisfy the regulations printed on the back. We design from the actual dieline your manufacturer supplies, so what you approve is what runs.',
    whoFor: 'Food and drink, cosmetics, supplements, household goods and any physical product going to retail or Amazon.',
    deliverables: [
      'Artwork built on the supplied dieline',
      'Front-of-pack hierarchy and shelf test',
      'Back-of-pack compliance layout',
      'Barcode, batch and date-code placement',
      'Colour separations and special finishes',
      '3D render for listings and marketing',
    ],
    faqs: [
      {
        q: 'What is a dieline and do I need one?',
        a: 'It is the flat cutting template for your pack, supplied by whoever is printing or manufacturing it. We need it before design starts, and if you do not have one yet we will help you request the right one.',
      },
      {
        q: 'Do you handle regulatory information?',
        a: 'We lay it out correctly and to the required minimum sizes. We are not a compliance consultancy, so the wording itself needs signing off by you or your regulatory adviser.',
      },
      {
        q: 'Can you supply a render for our product listing?',
        a: 'Yes, a photorealistic 3D render of the finished pack is included, which is usually needed months before physical stock exists.',
      },
    ],
    related: ['label-design', 'catalog-design', 'amazon-listing-design', 'brand-identity-design'],
    keywords: 'packaging design, product packaging, box design, pouch design, dieline artwork',
  },
  {
    slug: 'label-design',
    name: 'Label & Sticker Design',
    group: 'print',
    icon: 'shop',
    price: 119,
    priceLabel: 'from $119',
    metaTitle: 'Product Label & Sticker Design',
    metaDescription:
      'Product label and sticker design for bottles, jars, pouches and tins, set up for roll printing with correct bleed and die shapes.',
    h1: 'Labels that fit',
    highlight: 'the bottle you actually have',
    intro:
      'Labels wrap around curves, sit under condensation and get applied by a machine with a tolerance. We design to your exact container and application method rather than to a flat rectangle, which is why our artwork does not need reworking at the printer.',
    whoFor: 'Drinks, cosmetics, candles, sauces, supplements and small-batch producers.',
    deliverables: [
      'Label artwork on the true die shape',
      'Wrap allowance and overlap handling',
      'Ingredient and compliance panel',
      'Barcode at scannable size',
      'Variant designs across a product range',
      'Roll-print ready PDF',
    ],
    faqs: [
      {
        q: 'How do I know what size my label should be?',
        a: 'Measure the flat face of the container and subtract a few millimetres each side, or send us the container spec. For curved bottles we allow an overlap so the join is not visible from the front.',
      },
      {
        q: 'Can you design a range that looks like a family?',
        a: 'That is most of the work in label design. We fix the layout and change one variable, usually colour or an illustration, so five flavours read as one brand from a distance.',
      },
      {
        q: 'Will the barcode scan?',
        a: 'Yes. We place it at the minimum permitted magnification with the quiet zone protected, on a light background, never over artwork.',
      },
    ],
    related: ['packaging-design', 'sticker-design', 'brand-identity-design', 'amazon-listing-design'],
    keywords: 'label design, product label, bottle label design, jar label, sticker label artwork',
  },
  {
    slug: 'sticker-design',
    name: 'Sticker & Decal Design',
    group: 'print',
    icon: 'spark',
    price: 59,
    priceLabel: 'from $59',
    metaTitle: 'Custom Sticker & Decal Design',
    metaDescription:
      'Custom sticker, decal and die-cut design with proper cut lines, supplied ready for any sticker printer or vinyl cutter.',
    h1: 'Die-cut artwork',
    highlight: 'with the cut line right',
    intro:
      'The design is the easy half of a sticker. The cut path, the bleed behind it and the white border are what decide whether the printed result matches the proof. We supply both layers, correctly named, so the printer does not have to guess.',
    whoFor: 'Merch drops, product sealing, vehicle decals, laptop stickers, events and giveaway campaigns.',
    deliverables: [
      'Sticker artwork with die-cut path',
      'Kiss-cut and through-cut variants',
      'White border and bleed handling',
      'Sheet layout for multi-design runs',
      'Vinyl-cutter ready vector for decals',
      'Mockup for listings and social',
    ],
    faqs: [
      {
        q: 'What is a kiss cut?',
        a: 'A cut through the sticker but not the backing, so the sticker peels off a square sheet. It is the standard for sheets and packs. A through cut separates each sticker entirely.',
      },
      {
        q: 'Can you do transparent or holographic stickers?',
        a: 'Yes, though both change how artwork is built. Transparent needs a white underprint layer where you want opacity, and we supply that as a separate named layer.',
      },
      {
        q: 'Are vehicle decals different?',
        a: 'Yes, they are usually cut vinyl rather than printed, so the artwork has to be pure vector with no gradients and no fine detail below about a centimetre.',
      },
    ],
    related: ['label-design', 'vehicle-wrap-design', 'merchandise-design', 'mascot-logo-design'],
    keywords: 'sticker design, die cut sticker, decal design, vinyl sticker artwork, custom stickers',
  },
  {
    slug: 'vehicle-wrap-design',
    name: 'Vehicle Wrap & Livery Design',
    group: 'print',
    icon: 'shop',
    price: 299,
    priceLabel: 'from $299',
    metaTitle: 'Vehicle Wrap & Van Livery Design',
    metaDescription:
      'Vehicle wrap and van livery design built on the correct vehicle template, readable at traffic speed and set up for the wrap installer.',
    h1: 'A van that gets read',
    highlight: 'at thirty miles an hour',
    intro:
      'A wrapped vehicle is the cheapest advertising a local business owns and the easiest to get wrong. Doors, handles, wheel arches and windows eat the layout, and anything smaller than a fist is unreadable in traffic. We design on the real template for your exact model.',
    whoFor: 'Trades, cleaning firms, couriers, mobile services and any business whose vehicles pass their customers.',
    deliverables: [
      'Artwork on the correct make and model template',
      'All four sides plus roof where used',
      'Panel-break and handle avoidance',
      'Contact details at readable scale',
      'Full, partial and spot-graphic options',
      'Installer-ready scaled vector files',
    ],
    faqs: [
      {
        q: 'Do I need a full wrap?',
        a: 'Usually not. A partial wrap on the doors, rear and lower flanks delivers most of the visibility at a fraction of the cost, and we will show you both before you decide.',
      },
      {
        q: 'What should actually go on the van?',
        a: 'What you do, where you do it, and one way to contact you. Three things, large. Long service lists and social handles are invisible at speed and cost you the readable elements.',
      },
      {
        q: 'Can my wrap installer use your files?',
        a: 'Yes. We supply scaled vector artwork with the template layer intact, which is exactly what installers ask for, and we will talk to them directly if anything needs adjusting.',
      },
    ],
    related: ['signage-design', 'sticker-design', 'poster-design', 'brand-identity-design'],
    keywords: 'vehicle wrap design, van livery, truck wrap graphics, car wrap design, fleet branding',
  },
  {
    slug: 'signage-design',
    name: 'Signage & Wayfinding Design',
    group: 'print',
    icon: 'pin',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'Shop Signage & Wayfinding Design',
    metaDescription:
      'Shopfront signage, fascia and wayfinding design produced to the sign-maker\'s specification, with illumination and material options mapped out.',
    h1: 'Signage that reads',
    highlight: 'from the other pavement',
    intro:
      'Sign design is constrained by things a screen never is: fascia dimensions, illumination type, planning rules and the angle people approach from. We design within those constraints and hand the sign-maker files they can fabricate from directly.',
    whoFor: 'Retail, restaurants, clinics, gyms, offices and multi-room premises needing internal wayfinding.',
    deliverables: [
      'Fascia and projecting sign design',
      'Illuminated and non-illuminated options',
      'Window vinyl and door graphics',
      'Internal wayfinding and door signs',
      'Material and finish specification',
      'Scaled vector artwork for fabrication',
    ],
    faqs: [
      {
        q: 'Do you deal with the sign maker?',
        a: 'Yes, and it saves a round of revisions. We ask them for the fascia dimensions and their preferred file format before we start rather than after.',
      },
      {
        q: 'Will the design need planning permission?',
        a: 'Illuminated and projecting signs often do, and rules vary by council or city. We flag likely issues, but the application itself is between you and your local authority.',
      },
      {
        q: 'Can you design internal wayfinding too?',
        a: 'Yes, as a numbered sign schedule with each panel drawn to size, which is what a fabricator needs to quote a whole building accurately.',
      },
    ],
    related: ['vehicle-wrap-design', 'poster-design', 'trade-show-design', 'brand-guidelines'],
    keywords: 'signage design, shop sign design, fascia sign, wayfinding design, storefront signage',
  },
  {
    slug: 'trade-show-design',
    name: 'Trade Show & Exhibition Design',
    group: 'print',
    icon: 'shop',
    price: 519,
    priceLabel: 'from $519',
    metaTitle: 'Trade Show Booth & Exhibition Stand Design',
    metaDescription:
      'Exhibition stand and trade show graphics designed to the stand build specification, with the whole visitor-facing kit supplied together.',
    h1: 'A stand that stops',
    highlight: 'someone walking past',
    intro:
      'You get roughly four seconds as someone walks the aisle, and most of your stand is blocked by staff and visitors. We design for the top half of the wall, one legible claim, and a graphics pack that covers everything from the backdrop to the leaflet in the visitor\'s hand.',
    whoFor: 'Exhibitors at industry shows, expos, conferences and regional trade fairs.',
    deliverables: [
      'Backdrop and wall panel graphics',
      'Roll-up banners and counter wrap',
      'Header and hanging sign artwork',
      'Handout leaflet and lead-capture card',
      'Screen loop graphics for stand monitors',
      'Build-spec ready files for the stand contractor',
    ],
    faqs: [
      {
        q: 'What should the big message on the wall say?',
        a: 'What you do, in plain words a stranger in your industry would use. Slogans lose to clarity at a trade show, because visitors are scanning for relevance, not personality.',
      },
      {
        q: 'Can you work to our stand builder\'s template?',
        a: 'Yes, and we ask for it up front. Every modular system has different panel breaks and safe areas, and designing before we have them wastes a round.',
      },
      {
        q: 'Do you supply the digital screen content?',
        a: 'Yes, as a silent looping graphic set sized to the screens on your stand, since audio is unusable in an exhibition hall.',
      },
    ],
    related: ['poster-design', 'signage-design', 'presentation-design', 'brochure-design'],
    keywords: 'trade show design, exhibition stand graphics, booth design, expo banner design',
  },

  /* -------------------------------------------------------------- digital */
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    group: 'digital',
    icon: 'website',
    price: 1199,
    priceLabel: 'from $1,199',
    metaTitle: 'UI/UX Design Services',
    metaDescription:
      'UI and UX design covering research, flows, wireframes, high-fidelity interfaces and a handover developers can build from without guessing.',
    h1: 'Interfaces designed around',
    highlight: 'what people are trying to do',
    intro:
      'UX is the decision about what the screen should do; UI is how it looks doing it. We run both, in that order, so you are not paying to make a confusing flow prettier. Everything ships with states, edge cases and specs, because half-designed products are where development time disappears.',
    whoFor: 'SaaS products, marketplaces, internal tools and any app where users have to complete a task, not just browse.',
    deliverables: [
      'User flows and task mapping',
      'Low-fidelity wireframes',
      'High-fidelity UI for every screen',
      'Empty, loading, error and success states',
      'Component library and design tokens',
      'Developer handover with redlines',
    ],
    faqs: [
      {
        q: 'Do you do user research?',
        a: 'We run lightweight research as standard: competitor teardowns, a review of your support tickets and analytics, and where possible five user interviews. Full-scale research programmes are quoted separately.',
      },
      {
        q: 'What format do developers get?',
        a: 'A Figma file with components, tokens and inspect access, plus exported assets. If your team uses a specific system we will build to it rather than imposing ours.',
      },
      {
        q: 'Can you improve an existing product rather than redesigning it?',
        a: 'Yes, and it is usually the better investment. We audit the current flows, rank problems by how many users hit them, and fix the expensive ones first.',
      },
    ],
    related: ['saas-product-design', 'dashboard-design', 'wireframing-prototyping', 'design-system'],
    keywords: 'ui ux design, user interface design, user experience design, product design, figma design',
  },
  {
    slug: 'saas-product-design',
    name: 'SaaS Product Design',
    group: 'digital',
    icon: 'website',
    price: 2199,
    priceLabel: 'from $2,199',
    metaTitle: 'SaaS Product & App Design',
    metaDescription:
      'SaaS product design covering onboarding, core workflows, billing, settings and the empty states most product teams leave until launch week.',
    h1: 'The screens SaaS teams',
    highlight: 'always run out of time for',
    intro:
      'Every SaaS gets its dashboard designed and then ships onboarding, billing, permissions and empty states in a rush the week before launch. Those are the screens that decide activation and churn. We design the whole surface, in the order that affects revenue.',
    whoFor: 'B2B and B2C software companies from first release through to Series B rebuilds.',
    deliverables: [
      'Onboarding and activation flow',
      'Core workflow screens',
      'Settings, permissions and team management',
      'Billing, plan and upgrade screens',
      'Empty, error and edge-case states',
      'Responsive and dark-mode variants',
    ],
    faqs: [
      {
        q: 'Where should we start if the budget is limited?',
        a: 'Onboarding and the first core workflow. Those two decide whether a trial user ever reaches value, and everything else can follow once retention is not leaking.',
      },
      {
        q: 'Do you design for dark mode?',
        a: 'Yes, and properly, as a second token set rather than an inverted palette. Inverting a light theme produces unreadable greys and blown-out brand colour.',
      },
      {
        q: 'Can you work in our existing component library?',
        a: 'Yes. Working inside your library is faster and cheaper than designing against it, and we will extend it where a screen genuinely needs something new.',
      },
    ],
    related: ['ui-ux-design', 'dashboard-design', 'design-system', 'startup-branding'],
    keywords: 'saas design, saas ui, product design, software interface design, b2b app design',
  },
  {
    slug: 'dashboard-design',
    name: 'Dashboard & Data UI Design',
    group: 'digital',
    icon: 'website',
    price: 1299,
    priceLabel: 'from $1,299',
    metaTitle: 'Dashboard & Analytics UI Design',
    metaDescription:
      'Dashboard and analytics interface design that ranks information by decision value, with accessible chart colour and real data density.',
    h1: 'Dashboards that answer',
    highlight: 'a question, not fill a screen',
    intro:
      'A dashboard is worth having only if someone changes a decision because of it. We start by asking what decision each viewer makes, cut the metrics that never change anything, and design the chart types around the comparison being made rather than around variety.',
    whoFor: 'Analytics products, internal ops tools, admin panels and any interface where the data is the product.',
    deliverables: [
      'Metric hierarchy by decision value',
      'Chart type selection per comparison',
      'Accessible categorical and sequential palettes',
      'Filter, date-range and drill-down patterns',
      'Table, sort and export design',
      'Responsive and print-friendly views',
    ],
    faqs: [
      {
        q: 'How many metrics should a dashboard show?',
        a: 'Fewer than you think. Three to five headline figures with everything else one click deeper beats twenty tiles nobody parses. The tiles people never look at are actively harmful, because they slow down finding the ones that matter.',
      },
      {
        q: 'Do you handle chart accessibility?',
        a: 'Yes. Palettes are tested for contrast and for the common forms of colour blindness, and no chart relies on colour alone to carry meaning.',
      },
      {
        q: 'Can you design against our charting library?',
        a: 'Yes, and we ask which one before we start. Designing something Recharts or ECharts cannot render is a waste of everyone\'s week.',
      },
    ],
    related: ['saas-product-design', 'ui-ux-design', 'web-app-design', 'infographic-design'],
    keywords: 'dashboard design, analytics ui, admin panel design, data visualisation design, chart design',
  },
  {
    slug: 'web-app-design',
    name: 'Web Application Design',
    group: 'digital',
    icon: 'website',
    price: 1799,
    priceLabel: 'from $1,799',
    metaTitle: 'Web Application Design Services',
    metaDescription:
      'Web app interface design for portals, booking systems, CRMs and internal tools, designed around real workflows and real data volumes.',
    h1: 'Tools designed for people',
    highlight: 'who use them all day',
    intro:
      'Consumer design rewards delight; internal tools reward speed. When someone uses a screen four hundred times a week, keyboard flow, density and a short click path matter far more than animation. We design for that user, not for a screenshot.',
    whoFor: 'Businesses building customer portals, booking systems, CRMs, back-office tools and internal platforms.',
    deliverables: [
      'Role-based flow mapping',
      'Navigation and information architecture',
      'List, detail and bulk-action patterns',
      'Form design with validation states',
      'Permission and role variations',
      'Keyboard and accessibility specification',
    ],
    faqs: [
      {
        q: 'Our tool is ugly but it works. Is redesign worth it?',
        a: 'Only if it is costing you something measurable: training time, support tickets, data-entry errors or staff refusing to use it. We will tell you honestly if the answer is no.',
      },
      {
        q: 'Can you design for different user roles?',
        a: 'Yes, and it is usually essential. An admin, a manager and a field user need different defaults, and designing one screen for all three normally means it suits none of them.',
      },
      {
        q: 'Do you build as well as design?',
        a: 'Yes. Design and development are handled by the same team here, so there is no handover gap between the file and the working product.',
      },
    ],
    related: ['ui-ux-design', 'dashboard-design', 'saas-product-design', 'wireframing-prototyping'],
    keywords: 'web application design, portal design, crm interface, internal tool design, admin ui',
  },
  {
    slug: 'landing-page-design',
    name: 'Landing Page Design',
    group: 'digital',
    icon: 'website',
    price: 519,
    priceLabel: 'from $519',
    metaTitle: 'High-Converting Landing Page Design',
    metaDescription:
      'Landing page design built around one offer and one conversion, with the message hierarchy, proof and form structure set up to be tested.',
    h1: 'One page,',
    highlight: 'one job to do',
    intro:
      'A landing page has a single measurable purpose, and everything that does not serve it is a leak: the full navigation, the second call to action, the paragraph about your company history. We design the page around the offer and the objection order, then set it up so you can test it.',
    whoFor: 'Anyone running paid traffic, a product launch, a lead magnet or a campaign that needs a destination.',
    deliverables: [
      'Message hierarchy and objection order',
      'Above-the-fold offer and proof',
      'Form or checkout section design',
      'Social proof and trust elements',
      'Mobile-first responsive layout',
      'A/B test variant of the hero',
    ],
    faqs: [
      {
        q: 'Should a landing page have navigation?',
        a: 'Generally not. Every extra link is an exit. Campaign pages keep the logo and a single call to action, and the standard navigation is reserved for the main site.',
      },
      {
        q: 'How long should the page be?',
        a: 'As long as the decision requires. A $20 impulse purchase needs one screen; a $20,000 service needs proof, process and objection handling. Length itself is not the variable, relevance is.',
      },
      {
        q: 'Do you build the page or just design it?',
        a: 'Either. We can hand over the design, build it in your existing stack, or build and host it as a standalone page on your domain.',
      },
    ],
    related: ['ecommerce-website-design', 'ad-creative-design', 'ui-ux-design', 'conversion-optimisation'],
    keywords: 'landing page design, conversion landing page, sales page design, campaign page, lead capture page',
  },
  {
    slug: 'ecommerce-website-design',
    name: 'E-commerce Website Design',
    group: 'digital',
    icon: 'shop',
    price: 1499,
    priceLabel: 'from $1,499',
    metaTitle: 'E-commerce Website Design & Development',
    metaDescription:
      'Online store design and build with product, category and checkout flows designed to reduce abandonment, on Shopify, WooCommerce or custom.',
    h1: 'A store built around',
    highlight: 'the path to checkout',
    intro:
      'Most online stores lose money in three places: category filtering, the product page, and the last step of checkout. We design those three properly first, then everything else, because a beautiful homepage on a leaking funnel just makes the leak more expensive.',
    whoFor: 'Retailers, D2C brands, wholesalers and anyone moving from a marketplace to their own storefront.',
    deliverables: [
      'Category and filtering design',
      'Product page with variant handling',
      'Cart and multi-step checkout',
      'Account, orders and returns screens',
      'Search and empty-result design',
      'Speed and Core Web Vitals build',
    ],
    faqs: [
      {
        q: 'Shopify or WooCommerce?',
        a: 'Shopify if you want the platform to handle payments, hosting and compliance and you can live inside its rules. WooCommerce if you need unusual pricing, custom logic or full control of the data. We build both and will recommend based on your catalogue, not our preference.',
      },
      {
        q: 'Can you migrate our existing store?',
        a: 'Yes, including products, customers, order history and the URL redirects that stop you losing search traffic on the switch.',
      },
      {
        q: 'What actually reduces cart abandonment?',
        a: 'Showing shipping cost early, allowing guest checkout, cutting form fields, and keeping payment on one page. Those four fixes routinely outperform any redesign of the homepage.',
      },
    ],
    related: ['shopify-store-design', 'landing-page-design', 'amazon-listing-design', 'product-photography-editing'],
    keywords: 'ecommerce website design, online store design, shopify design, woocommerce store, d2c website',
  },
  {
    slug: 'shopify-store-design',
    name: 'Shopify Store Design',
    group: 'digital',
    icon: 'shop',
    price: 1299,
    priceLabel: 'from $1,299',
    metaTitle: 'Shopify Store Design & Theme Customisation',
    metaDescription:
      'Custom Shopify store design and theme customisation, built on sections your team can rearrange without touching code.',
    h1: 'A Shopify store',
    highlight: 'your team can run',
    intro:
      'A Shopify build is only as good as what your team can change afterwards. We work in sections and theme settings so merchandising, banners and landing pages can be rearranged from the admin, without a developer and without breaking the layout.',
    whoFor: 'Shopify and Shopify Plus merchants launching, replatforming or outgrowing a bought theme.',
    deliverables: [
      'Custom theme design or deep customisation',
      'Reusable section library for the editor',
      'Product template variations by category',
      'Checkout branding and upsell placement',
      'App integration and styling',
      'Speed optimisation and asset cleanup',
    ],
    faqs: [
      {
        q: 'Do we need a custom theme?',
        a: 'Not always. A well-chosen paid theme, customised properly, is faster and cheaper for most stores under a few hundred SKUs. We will say so rather than selling you a custom build you do not need.',
      },
      {
        q: 'Why is our Shopify store slow?',
        a: 'Almost always apps. Every app injects scripts, and stores routinely carry apps nobody uses. An audit and cleanup is usually the cheapest speed win available.',
      },
      {
        q: 'Can you keep our existing product data?',
        a: 'Yes. Design and theme work does not touch products, collections or orders, and on a replatform we migrate them intact.',
      },
    ],
    related: ['ecommerce-website-design', 'landing-page-design', 'product-photography-editing', 'email-template-design'],
    keywords: 'shopify design, shopify theme customisation, shopify store setup, shopify plus design',
  },
  {
    slug: 'wordpress-website-design',
    name: 'WordPress Website Design',
    group: 'digital',
    icon: 'website',
    price: 999,
    priceLabel: 'from $999',
    metaTitle: 'WordPress Website Design & Development',
    metaDescription:
      'Custom WordPress website design and build with a clean editing experience, proper SEO foundations and no page-builder bloat.',
    h1: 'WordPress without',
    highlight: 'the plugin sprawl',
    intro:
      'WordPress powers a huge share of the web and most of it is slow, because of stacked page builders and forty plugins doing what a hundred lines of code would. We build lean, with a block setup your team can edit, and no dependency you cannot explain.',
    whoFor: 'Businesses that want to own and edit their own site without being locked into a proprietary platform.',
    deliverables: [
      'Custom design across all page types',
      'Block or ACF-based editing setup',
      'Blog, category and archive templates',
      'Contact and enquiry forms with spam handling',
      'SEO foundations, sitemap and schema',
      'Backups, security hardening and handover training',
    ],
    faqs: [
      {
        q: 'Will I be able to edit the site myself?',
        a: 'Yes, that is the point of choosing WordPress. We set up editable blocks with sensible constraints so you can change content without being able to accidentally break the layout.',
      },
      {
        q: 'Do you use Elementor or Divi?',
        a: 'Only if you already run one and want to stay on it. For new builds we prefer native blocks, because builders add a large amount of markup that shows up directly in your page speed scores.',
      },
      {
        q: 'Who hosts the site?',
        a: 'You do, in your own account, and we will recommend a host that suits your traffic. Everything is in your name so you are never locked to us.',
      },
    ],
    related: ['website-redesign', 'landing-page-design', 'ecommerce-website-design', 'seo-web-design'],
    keywords: 'wordpress website design, wordpress development, custom wordpress theme, cms website',
  },
  {
    slug: 'website-redesign',
    name: 'Website Redesign',
    group: 'digital',
    icon: 'website',
    price: 1299,
    priceLabel: 'from $1,299',
    metaTitle: 'Website Redesign Services',
    metaDescription:
      'Website redesign that keeps your rankings intact, with a content audit, redirect map and measurable conversion goals set before the design starts.',
    h1: 'Redesign without',
    highlight: 'losing your traffic',
    intro:
      'The classic redesign disaster is a beautiful new site that halves organic traffic, because URLs changed and nobody mapped them. We start with a crawl of what you have, keep what is earning, and carry the redirects across as a deliverable rather than an afterthought.',
    whoFor: 'Businesses with an existing site that converts poorly, loads slowly or no longer reflects what they do.',
    deliverables: [
      'Full crawl and content audit',
      'Page-level keep, merge or retire decisions',
      'Complete 301 redirect map',
      'New design across every template',
      'Core Web Vitals and speed work',
      'Post-launch ranking and conversion monitoring',
    ],
    faqs: [
      {
        q: 'Will a redesign hurt our SEO?',
        a: 'Only if URLs, content or internal linking change without a plan. Handled properly, a redesign usually improves rankings, because speed, structure and internal linking all get fixed at once.',
      },
      {
        q: 'Should we keep our blog posts?',
        a: 'Keep anything with traffic, links or conversions. Merge thin overlapping posts into one stronger page and redirect the rest. The audit tells us which is which rather than guesswork.',
      },
      {
        q: 'How long does a redesign take?',
        a: 'Typically four to eight weeks depending on page count and how much content needs rewriting. The audit takes the first week and tends to shorten everything after it.',
      },
    ],
    related: ['wordpress-website-design', 'seo-web-design', 'conversion-optimisation', 'landing-page-design'],
    keywords: 'website redesign, site refresh, replatform website, redesign without losing seo',
  },
  {
    slug: 'seo-web-design',
    name: 'SEO-Focused Web Design',
    group: 'digital',
    icon: 'website',
    price: 899,
    priceLabel: 'from $899',
    metaTitle: 'SEO Web Design & Technical SEO Build',
    metaDescription:
      'Websites designed and built for search: clean structure, fast Core Web Vitals, structured data, internal linking and crawlable content from day one.',
    h1: 'Built to be found,',
    highlight: 'not retrofitted later',
    intro:
      'SEO added after a site is built is always more expensive than SEO designed in. Heading structure, URL design, internal linking, image handling, schema and page speed are architecture decisions, and once a site is live they are all harder to change.',
    whoFor: 'Businesses that depend on organic search rather than paid traffic or referrals.',
    deliverables: [
      'Keyword-mapped site architecture',
      'Semantic heading and content structure',
      'Schema markup across every template',
      'Core Web Vitals performance build',
      'Internal linking and hub structure',
      'Sitemap, robots and Search Console setup',
    ],
    faqs: [
      {
        q: 'Is this the same as an SEO retainer?',
        a: 'No. This is the build-side work: structure, speed, markup and internal linking. Ongoing content and link acquisition are separate and can be quoted alongside.',
      },
      {
        q: 'How quickly will we see rankings?',
        a: 'Technical fixes on an established domain can move within weeks. A new domain competing for commercial terms is a matter of months, and anyone promising otherwise is guessing.',
      },
      {
        q: 'What is Core Web Vitals and does it matter?',
        a: 'It is Google\'s measure of loading, interactivity and layout stability. It is a real ranking input, but more importantly a slow site loses conversions regardless of where it ranks.',
      },
    ],
    related: ['website-redesign', 'wordpress-website-design', 'conversion-optimisation', 'landing-page-design'],
    keywords: 'seo web design, technical seo, core web vitals, schema markup, search optimised website',
  },
  {
    slug: 'conversion-optimisation',
    name: 'Conversion Rate Optimisation',
    group: 'digital',
    icon: 'spark',
    price: 749,
    priceLabel: 'from $749',
    metaTitle: 'Conversion Rate Optimisation & CRO Design',
    metaDescription:
      'CRO work that finds where visitors drop out, redesigns those steps and tests the change, rather than redesigning a whole site on instinct.',
    h1: 'Fix the step',
    highlight: 'people actually leave on',
    intro:
      'Conversion work starts with data, not opinion. We look at where people leave, what they do just before they leave, and which device they leave on. Then we change one thing, measure it, and keep the version that wins.',
    whoFor: 'Sites with existing traffic that is not turning into enquiries, signups or sales.',
    deliverables: [
      'Funnel and drop-off analysis',
      'Session recording and heatmap review',
      'Prioritised list of fixes by expected impact',
      'Redesign of the highest-loss steps',
      'A/B test setup and result reporting',
      'Form and checkout friction audit',
    ],
    faqs: [
      {
        q: 'How much traffic do we need for testing?',
        a: 'Meaningful A/B testing needs a few hundred conversions a month. Below that we make the obvious fixes and measure over longer periods rather than pretending a test is significant.',
      },
      {
        q: 'What usually moves the needle most?',
        a: 'Form length, page speed on mobile, showing price or shipping earlier, and making the primary action unambiguous. Rarely the colour of the button.',
      },
      {
        q: 'Do you need access to our analytics?',
        a: 'Yes, read access to analytics and ideally a session-recording tool. Without data this becomes decoration with a different name.',
      },
    ],
    related: ['landing-page-design', 'ecommerce-website-design', 'website-redesign', 'ui-ux-design'],
    keywords: 'conversion rate optimisation, cro, ab testing design, funnel optimisation, landing page testing',
  },
  {
    slug: 'wireframing-prototyping',
    name: 'Wireframing & Prototyping',
    group: 'digital',
    icon: 'layers',
    price: 669,
    priceLabel: 'from $669',
    metaTitle: 'Wireframing & Interactive Prototyping',
    metaDescription:
      'Wireframes and clickable prototypes that let you test a product idea with real users before committing to development budget.',
    h1: 'Test the idea',
    highlight: 'before you build it',
    intro:
      'A clickable prototype costs a fraction of a build and answers the questions that otherwise get answered expensively in code. We wireframe the flows, make them clickable, and put them in front of real users so the arguments get settled with evidence.',
    whoFor: 'Founders validating a concept, teams pitching for budget, and anyone about to commission development.',
    deliverables: [
      'Task and flow definition',
      'Low-fidelity wireframes for every screen',
      'Clickable interactive prototype',
      'Usability test script',
      'Findings summary with recommendations',
      'Annotated screens ready for UI design',
    ],
    faqs: [
      {
        q: 'Why not skip straight to visual design?',
        a: 'Because layout arguments are cheap to settle in wireframes and expensive in polished screens. Fidelity also biases feedback: people comment on colour instead of whether the flow works.',
      },
      {
        q: 'Can we use the prototype to raise money?',
        a: 'Yes, and many clients do. A clickable prototype demonstrates the product far better than slides, and it works on a phone in a meeting.',
      },
      {
        q: 'How many users should we test with?',
        a: 'Five per role uncovers the large majority of usability problems. Beyond that you get diminishing returns until you have changed something.',
      },
    ],
    related: ['ui-ux-design', 'saas-product-design', 'web-app-design', 'mobile-app-ui-design'],
    keywords: 'wireframing, prototyping, clickable prototype, figma prototype, usability testing',
  },
  {
    slug: 'mobile-app-ui-design',
    name: 'Mobile App UI Design',
    group: 'digital',
    icon: 'mobile',
    price: 1499,
    priceLabel: 'from $1,499',
    metaTitle: 'Mobile App UI Design for iOS & Android',
    metaDescription:
      'Mobile app interface design that follows iOS and Android platform conventions, with every state, size class and store asset delivered.',
    h1: 'App screens that feel',
    highlight: 'native on both platforms',
    intro:
      'iOS and Android have different navigation conventions, different gesture expectations and different typography. An app that ignores them feels wrong in a way users cannot name but do abandon. We design to each platform properly rather than shipping one layout twice.',
    whoFor: 'Anyone commissioning an app build, or improving an existing app with weak retention.',
    deliverables: [
      'Platform-specific navigation patterns',
      'Full screen set for both platforms',
      'Interaction and transition specification',
      'Adaptive layouts for phone and tablet',
      'App icon and store screenshot set',
      'Developer handover with assets exported',
    ],
    faqs: [
      {
        q: 'Can one design serve both iOS and Android?',
        a: 'The visual language can be shared; navigation, back behaviour and system components should not be. We design one system with two platform-correct expressions.',
      },
      {
        q: 'Do you provide App Store screenshots?',
        a: 'Yes, at every required size, with captions. Store screenshots are a major driver of install rate and deserve real design attention.',
      },
      {
        q: 'What about tablets?',
        a: 'Included where it matters. For most apps a phone-first design with a considered tablet layout for the main screens is the right investment.',
      },
    ],
    related: ['ui-ux-design', 'app-icon-design', 'wireframing-prototyping', 'saas-product-design'],
    keywords: 'mobile app ui design, ios app design, android app design, app interface, app screen design',
  },
  {
    slug: 'app-icon-design',
    name: 'App Icon Design',
    group: 'digital',
    icon: 'mobile',
    price: 119,
    priceLabel: 'from $119',
    metaTitle: 'App Icon & Favicon Design',
    metaDescription:
      'App icon and favicon design that stays legible on a crowded home screen, delivered at every size iOS, Android and the web require.',
    h1: 'An icon that stands out',
    highlight: 'on a crowded home screen',
    intro:
      'An app icon is a one-centimetre square competing with sixty others, most of them brightly coloured. It needs a single strong shape, high contrast against both light and dark wallpapers, and no text. We design specifically for that context rather than shrinking your logo.',
    whoFor: 'App publishers, SaaS products and any website that wants a favicon that is not a squashed logo.',
    deliverables: [
      'Icon concept designed for small size',
      'iOS icon with correct corner masking',
      'Android adaptive icon layers',
      'Full favicon and PWA size set',
      'Light and dark background testing',
      'Home-screen mockups for review',
    ],
    faqs: [
      {
        q: 'Can we just use our logo as the app icon?',
        a: 'Usually not directly. Most logos include a wordmark that vanishes at icon size. We extract or design a symbol that carries the same recognition in a square.',
      },
      {
        q: 'What is an Android adaptive icon?',
        a: 'Android composites your icon from a foreground and background layer so the launcher can mask it into different shapes. Supplying a flat square gets it cropped badly, so we build both layers.',
      },
      {
        q: 'Do you supply favicons too?',
        a: 'Yes, the complete set including the 16px version, the touch icon and the web manifest entries, because browsers still ask for all of them.',
      },
    ],
    related: ['mobile-app-ui-design', 'minimalist-logo-design', 'icon-design', 'ui-ux-design'],
    keywords: 'app icon design, favicon design, ios icon, android adaptive icon, pwa icon',
  },
  {
    slug: 'design-system',
    name: 'Design System Development',
    group: 'digital',
    icon: 'layers',
    price: 2999,
    priceLabel: 'from $2,999',
    metaTitle: 'Design System Development & Component Libraries',
    metaDescription:
      'Design systems with tokens, components, usage rules and developer documentation, built so teams stop rebuilding the same button.',
    h1: 'Stop redesigning',
    highlight: 'the same button',
    intro:
      'A design system pays for itself the moment two people are building screens. Tokens for colour, spacing and type, components with defined states, and written rules about when to use which one, so consistency is the default rather than a review comment.',
    whoFor: 'Product teams with more than one designer or developer, or more than one product surface.',
    deliverables: [
      'Design token set for colour, type and spacing',
      'Core component library with all states',
      'Accessibility rules baked into components',
      'Usage documentation with do and do-not examples',
      'Figma library published for the team',
      'Code component specification for developers',
    ],
    faqs: [
      {
        q: 'Do we need a design system?',
        a: 'If you have one designer and one product, probably not yet. If two people are building screens, or you have a marketing site and an app that keep drifting apart, yes.',
      },
      {
        q: 'Should we build on an existing library?',
        a: 'Usually. Starting from a proven base and theming it is faster, better tested and more accessible than building components from scratch, and we will recommend one that fits your stack.',
      },
      {
        q: 'Who maintains it afterwards?',
        a: 'You do, and we set it up to be maintainable: documented decisions, named tokens and a contribution process. We can also stay on retainer to govern it.',
      },
    ],
    related: ['ui-ux-design', 'saas-product-design', 'brand-guidelines', 'enterprise-branding'],
    keywords: 'design system, component library, design tokens, figma library, ui kit',
  },

  /* -------------------------------------------------------------- content */
  {
    slug: 'social-media-design',
    name: 'Social Media Design',
    group: 'content',
    icon: 'spark',
    price: 149,
    priceLabel: 'from $149',
    metaTitle: 'Social Media Design & Content Templates',
    metaDescription:
      'Social media graphics and editable templates for Instagram, LinkedIn, Facebook and TikTok, sized correctly for every placement.',
    h1: 'A feed that looks like',
    highlight: 'one brand posted it',
    intro:
      'Posting daily is only sustainable if making a post takes minutes. We design a template set your team can fill in, in the exact sizes each platform crops to, so the feed stays consistent without a designer in the loop every morning.',
    whoFor: 'Any business posting regularly that does not have an in-house designer available daily.',
    deliverables: [
      'Profile, cover and highlight artwork',
      'Post template set across content types',
      'Story and reel cover templates',
      'Carousel layout system',
      'Editable Canva or Figma library',
      'Platform-correct export sizes',
    ],
    faqs: [
      {
        q: 'Can our team edit the templates without a designer?',
        a: 'Yes. We deliver in Canva or Figma with fonts and colours locked and text and image slots free, so nobody can accidentally go off-brand.',
      },
      {
        q: 'How many templates do we need?',
        a: 'Six to ten covers most businesses: a quote, an offer, a testimonial, an announcement, an educational carousel and a couple of image-led layouts.',
      },
      {
        q: 'Do you also write and schedule the posts?',
        a: 'Design is our side of it. We supply the assets and a suggested cadence, and we work happily alongside whoever handles your copy and scheduling.',
      },
    ],
    related: ['ad-creative-design', 'instagram-post-design', 'youtube-thumbnail-design', 'brand-guidelines'],
    keywords: 'social media design, instagram templates, social graphics, content templates, social media kit',
  },
  {
    slug: 'instagram-post-design',
    name: 'Instagram Design',
    group: 'content',
    icon: 'spark',
    price: 119,
    priceLabel: 'from $119',
    metaTitle: 'Instagram Post, Story & Carousel Design',
    metaDescription:
      'Instagram design covering grid posts, carousels, stories, reel covers and highlight icons, sized for current crops and safe areas.',
    h1: 'A grid that earns',
    highlight: 'the profile visit',
    intro:
      'Instagram is judged twice: once in the feed and once on the profile grid. We design for both, with carousels built to hold attention past the first card and covers that make the grid readable as a whole rather than nine unrelated images.',
    whoFor: 'Retail, hospitality, fitness, beauty, creators and any brand whose customers browse before buying.',
    deliverables: [
      'Grid post templates in current ratios',
      'Multi-card carousel system',
      'Story templates with safe areas mapped',
      'Reel cover set for a consistent grid',
      'Highlight icon set',
      'Bio and profile picture artwork',
    ],
    faqs: [
      {
        q: 'What size should Instagram posts be now?',
        a: 'Portrait at 4:5 for feed posts, 9:16 for stories and reels. We supply both and keep essential content inside the crop the feed preview shows.',
      },
      {
        q: 'Do carousels really perform better?',
        a: 'They tend to, because a swipe is a signal of interest. The gain comes from the first two cards, so that is where the design effort goes.',
      },
      {
        q: 'Can you match our existing feed?',
        a: 'Yes. We can work within what you have if it is already consistent, or rebuild the system if the feed currently looks like several different brands.',
      },
    ],
    related: ['social-media-design', 'ad-creative-design', 'youtube-thumbnail-design', 'influencer-branding'],
    keywords: 'instagram design, instagram templates, carousel design, story templates, reel covers',
  },
  {
    slug: 'ad-creative-design',
    name: 'Ad Creative Design',
    group: 'content',
    icon: 'spark',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'Ad Creative Design for Meta & Google',
    metaDescription:
      'Paid ad creative for Meta, Google, TikTok and LinkedIn, delivered as testable variant sets in every required placement size.',
    h1: 'Creative built to be',
    highlight: 'tested, not admired',
    intro:
      'Paid media eats creative. One execution fatigues in weeks, so what you need is not a great ad but a system that produces variants: different hooks, different proof, different formats, all shipped as a set you can rotate and measure.',
    whoFor: 'Anyone spending on Meta, Google, TikTok or LinkedIn ads who is running out of creative.',
    deliverables: [
      'Concept set with distinct hooks',
      'Static variants in every placement size',
      'Short-form motion versions',
      'UGC-style and native-feel variants',
      'Headline and copy pairings',
      'Naming convention for clean reporting',
    ],
    faqs: [
      {
        q: 'How many creative variants do we need?',
        a: 'Enough to test angles rather than colours. Three to five distinct concepts, each in the placements you buy, is a sensible starting batch for most accounts.',
      },
      {
        q: 'Do polished ads or rough ones perform better?',
        a: 'It depends on placement. Feed and stories often reward native, less-polished executions; search display and LinkedIn reward clarity and polish. We supply both and let the numbers decide.',
      },
      {
        q: 'Can you work with our media buyer?',
        a: 'Yes, and it produces better creative. We take the performance data back from them and design the next batch against what actually worked.',
      },
    ],
    related: ['social-media-design', 'landing-page-design', 'motion-graphics', 'amazon-listing-design'],
    keywords: 'ad creative design, facebook ad design, google display ads, ppc creative, ad variants',
  },
  {
    slug: 'youtube-thumbnail-design',
    name: 'YouTube Thumbnail Design',
    group: 'content',
    icon: 'play',
    price: 49,
    priceLabel: 'from $49',
    metaTitle: 'YouTube Thumbnail Design',
    metaDescription:
      'Click-tested YouTube thumbnail design that reads at mobile size, with A/B variants and a consistent style across a channel.',
    h1: 'Thumbnails that win',
    highlight: 'the click at phone size',
    intro:
      'Most thumbnails are designed on a large monitor and consumed at the size of a postage stamp. We design at final viewing size: three or four words maximum, one clear face or object, and enough contrast to survive being surrounded by other thumbnails.',
    whoFor: 'YouTubers, course creators, agencies and brands publishing video regularly.',
    deliverables: [
      'Thumbnail designed and checked at small size',
      'Two A/B variants for testing',
      'Face and subject cutout with retouching',
      'Channel-consistent style system',
      'Editable template for future uploads',
      'Correct 1280 × 720 export under 2 MB',
    ],
    faqs: [
      {
        q: 'How many words should a thumbnail have?',
        a: 'Three or four. The title already carries the detail, and any more than that is illegible on a phone, which is where most viewers see it.',
      },
      {
        q: 'Do you offer bulk rates for a channel?',
        a: 'Yes. Regular publishers move onto a monthly volume rate, which is substantially cheaper than ordering one at a time.',
      },
      {
        q: 'Can you match a style we already use?',
        a: 'Yes, and if your channel is working we would rather extend your existing style than reset your audience\'s recognition.',
      },
    ],
    related: ['youtube-channel-design', 'video-editing', 'social-media-design', 'ad-creative-design'],
    keywords: 'youtube thumbnail design, thumbnail designer, ctr thumbnail, video thumbnail, channel thumbnails',
  },
  {
    slug: 'youtube-channel-design',
    name: 'YouTube Channel Branding',
    group: 'content',
    icon: 'play',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'YouTube Channel Branding & Banner Design',
    metaDescription:
      'Complete YouTube channel branding: banner, avatar, intro animation, end screens, lower thirds and a thumbnail template system.',
    h1: 'A channel that looks',
    highlight: 'like a channel, not a folder',
    intro:
      'Channel branding is what converts a viewer who liked one video into a subscriber. The banner has to survive being cropped four different ways, the intro has to be short enough not to lose people, and the thumbnails have to look like a set.',
    whoFor: 'Creators, educators and brands building an audience on YouTube.',
    deliverables: [
      'Channel banner across all crop sizes',
      'Avatar and watermark artwork',
      'Animated intro and outro sting',
      'End screen and subscribe overlays',
      'Lower thirds and title cards',
      'Thumbnail template system',
    ],
    faqs: [
      {
        q: 'Why does my banner look wrong on mobile?',
        a: 'YouTube crops the same image differently on TV, desktop and phone. Only the centre strip is guaranteed visible, so anything essential has to live inside it. We design to the safe area and check all three.',
      },
      {
        q: 'How long should an intro be?',
        a: 'Under three seconds. Retention graphs show viewers leaving during long intros, so the sting should establish the brand and get out of the way.',
      },
      {
        q: 'Do you edit the videos too?',
        a: 'Yes, editing is a separate service and often bought alongside, so the branding and the edits come from the same team.',
      },
    ],
    related: ['youtube-thumbnail-design', 'video-editing', 'motion-graphics', 'social-media-design'],
    keywords: 'youtube channel branding, youtube banner design, channel art, intro animation, end screen',
  },
  {
    slug: 'presentation-design',
    name: 'Presentation Design',
    group: 'content',
    icon: 'layers',
    price: 299,
    priceLabel: 'from $299',
    metaTitle: 'Professional Presentation & Slide Design',
    metaDescription:
      'PowerPoint and Google Slides design with a reusable master template, clean data slides and a layout library your team can build from.',
    h1: 'Slides that support you',
    highlight: 'instead of competing with you',
    intro:
      'A slide is a visual aid, not a document. We cut the walls of text, turn the numbers into charts that make one point each, and build a master template with real layouts so the next deck your team makes is already on-brand.',
    whoFor: 'Sales teams, consultants, trainers, conference speakers and internal comms.',
    deliverables: [
      'Master template with true slide masters',
      'Twenty-plus reusable layout variants',
      'Chart and data slide styles',
      'Icon and diagram library',
      'Existing deck rebuilt into the system',
      'PowerPoint and Google Slides versions',
    ],
    faqs: [
      {
        q: 'Will the template work in Google Slides and PowerPoint?',
        a: 'We deliver both, built natively in each rather than converted, because a converted deck loses masters and reflows text.',
      },
      {
        q: 'Can you redesign a deck we already use?',
        a: 'Yes, and it is the most common request. We rebuild it onto the new master so it becomes maintainable rather than a one-off file.',
      },
      {
        q: 'Do you help with the narrative?',
        a: 'We restructure the flow as part of design, because a deck that is out of order cannot be fixed with formatting. Full storyline work is quoted alongside.',
      },
    ],
    related: ['pitch-deck-design', 'infographic-design', 'enterprise-branding', 'brochure-design'],
    keywords: 'presentation design, powerpoint design, google slides template, slide deck design, corporate deck',
  },
  {
    slug: 'pitch-deck-design',
    name: 'Pitch Deck Design',
    group: 'content',
    icon: 'layers',
    price: 599,
    priceLabel: 'from $599',
    metaTitle: 'Investor Pitch Deck Design',
    metaDescription:
      'Investor pitch deck design with the standard slide sequence investors expect, clear metrics presentation and a data room-ready export.',
    h1: 'A deck that survives',
    highlight: 'three minutes of skimming',
    intro:
      'Investors skim decks on a phone between meetings. That means the point of each slide has to land from the headline alone, the numbers have to be legible and honest, and the sequence has to follow the order investors are used to reading.',
    whoFor: 'Founders raising pre-seed through Series B, and businesses pitching for partnerships or grants.',
    deliverables: [
      'Full investor sequence, problem through ask',
      'Traction and metrics slides done properly',
      'Market sizing built on defensible logic',
      'Competitive positioning visual',
      'Team, roadmap and use-of-funds slides',
      'Send-ahead and in-person versions',
    ],
    faqs: [
      {
        q: 'How many slides should a pitch deck be?',
        a: 'Ten to fifteen for the send-ahead version. A longer appendix is fine and expected, but the main sequence should be readable in three minutes.',
      },
      {
        q: 'Do you write the content or just design it?',
        a: 'We structure and edit it, and we will push back hard on claims that will not survive diligence. Writing from scratch is available for an additional fee.',
      },
      {
        q: 'Why two versions?',
        a: 'A deck you present has fewer words because you are the narration. A deck you email has to stand alone. Sending the presentation version is a common and costly mistake.',
      },
    ],
    related: ['presentation-design', 'startup-branding', 'infographic-design', 'brand-strategy'],
    keywords: 'pitch deck design, investor deck, fundraising deck, seed deck design, startup presentation',
  },
  {
    slug: 'infographic-design',
    name: 'Infographic Design',
    group: 'content',
    icon: 'layers',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'Infographic & Data Visualisation Design',
    metaDescription:
      'Infographic and data visualisation design that makes one clear argument, with accurate charts and formats for print, web and social.',
    h1: 'Data that makes',
    highlight: 'one clear point',
    intro:
      'An infographic works when it argues something. We start from the conclusion you want a reader to reach, pick chart forms that support the specific comparison being made, and cut every decorative element that competes with the data.',
    whoFor: 'Marketing teams, research publishers, agencies and anyone turning a report into shareable content.',
    deliverables: [
      'Narrative structure and key takeaway',
      'Chart selection matched to each comparison',
      'Accessible, colour-blind-safe palette',
      'Custom icons and diagram elements',
      'Long-form web, print and social crops',
      'Editable source with the data linked',
    ],
    faqs: [
      {
        q: 'Can you work from our raw data?',
        a: 'Yes, send the spreadsheet. We will also flag where a chart would mislead, such as a truncated axis, before it goes out with your name on it.',
      },
      {
        q: 'What formats do we get?',
        a: 'A tall web version, a print-ready PDF and square and portrait social crops, since the tall version is unreadable in a feed.',
      },
      {
        q: 'Do infographics still earn links?',
        a: 'Genuinely original data does. Restating known statistics does not. The linkable asset is the research, and the design is what makes it usable.',
      },
    ],
    related: ['presentation-design', 'dashboard-design', 'social-media-design', 'brochure-design'],
    keywords: 'infographic design, data visualisation, chart design, information graphic, report design',
  },
  {
    slug: 'email-template-design',
    name: 'Email Template Design',
    group: 'content',
    icon: 'mail',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'Email Newsletter & Template Design',
    metaDescription:
      'Email template design coded and tested across Outlook, Gmail and Apple Mail, built as reusable modules in your ESP.',
    h1: 'Email that survives',
    highlight: 'Outlook',
    intro:
      'Email design is constrained by rendering engines two decades old. A layout that looks perfect in a browser can collapse entirely in Outlook. We build modular, tested templates in your email platform so your team can assemble campaigns without them breaking.',
    whoFor: 'E-commerce brands, newsletters, SaaS lifecycle emails and any business emailing a list regularly.',
    deliverables: [
      'Master template with reusable modules',
      'Campaign, transactional and newsletter variants',
      'Dark mode handling',
      'Rendering tests across major clients',
      'Built directly in Klaviyo, Mailchimp or your ESP',
      'Plain-text fallback version',
    ],
    faqs: [
      {
        q: 'Why do our emails break in Outlook?',
        a: 'Outlook on Windows renders email using Microsoft Word\'s engine, which ignores most modern CSS. Templates have to be built defensively with tables and inline styles, which is what we do.',
      },
      {
        q: 'Can you build it in our email platform?',
        a: 'Yes, and it is worth it. A template built as native editable blocks in Klaviyo or Mailchimp means your team assembles campaigns without a developer.',
      },
      {
        q: 'Does dark mode matter for email?',
        a: 'A great deal, because a large share of readers use it and it can invert your logo into an unreadable block. We test and supply dark-safe assets.',
      },
    ],
    related: ['ecommerce-website-design', 'social-media-design', 'landing-page-design', 'brand-guidelines'],
    keywords: 'email template design, newsletter design, klaviyo template, mailchimp design, html email',
  },
  {
    slug: 'amazon-listing-design',
    name: 'Amazon Listing & A+ Content Design',
    group: 'content',
    icon: 'amazon',
    price: 369,
    priceLabel: 'from $369',
    metaTitle: 'Amazon Listing Images & A+ Content Design',
    metaDescription:
      'Amazon listing image sets, infographic stacks and A+ brand content modules designed to Amazon specification and mobile-first.',
    h1: 'Listing images that answer',
    highlight: 'the question before it is asked',
    intro:
      'On Amazon the image carousel does the selling, because most shoppers never read the bullets. We design the full stack: the compliant hero, the feature infographics, the size and comparison shots, and the lifestyle images that handle objections.',
    whoFor: 'Amazon sellers, private label brands and manufacturers launching or refreshing a listing.',
    deliverables: [
      'Compliant white-background hero image',
      'Feature and benefit infographic set',
      'Dimension and what-is-included graphics',
      'Lifestyle and in-use imagery',
      'A+ / EBC module design',
      'Storefront banner and category tiles',
    ],
    faqs: [
      {
        q: 'How many images should a listing have?',
        a: 'Use every slot Amazon gives you, typically seven plus video. Each one should make a different point rather than showing the same angle again.',
      },
      {
        q: 'What are the rules for the main image?',
        a: 'Pure white background, product filling most of the frame, no text, no props, no logos or badges. Breaking those risks suppression, so we keep the hero compliant and put the selling into images two onward.',
      },
      {
        q: 'Is A+ content worth the cost?',
        a: 'For brand-registered sellers, generally yes: it lifts conversion and reduces returns by setting expectations. It is not indexed for search the way the listing copy is, so it is a conversion tool, not a ranking one.',
      },
    ],
    related: ['packaging-design', 'ecommerce-website-design', 'product-photography-editing', 'ad-creative-design'],
    keywords: 'amazon listing design, a+ content, ebc design, amazon infographics, product listing images',
  },
  {
    slug: 'product-photography-editing',
    name: 'Product Photo Editing & Retouching',
    group: 'content',
    icon: 'spark',
    price: 49,
    priceLabel: 'from $49 per image',
    metaTitle: 'Product Photo Editing & Retouching',
    metaDescription:
      'Product photo retouching, background removal, colour correction and shadow work at volume, delivered in every marketplace format.',
    h1: 'Product shots that match',
    highlight: 'across the whole range',
    intro:
      'A catalogue shot over several sessions rarely looks like one set: the whites drift, the shadows differ, the crops wander. We normalise all of it, so your storefront looks like a considered range rather than a folder of uploads.',
    whoFor: 'E-commerce sellers, marketplaces, catalogue publishers and anyone with a large product library.',
    deliverables: [
      'Background removal and clean cutouts',
      'Colour and white-balance normalisation',
      'Natural shadow and reflection reconstruction',
      'Blemish and dust retouching',
      'Consistent crops and margins',
      'Marketplace-specific size exports',
    ],
    faqs: [
      {
        q: 'Do you work at volume?',
        a: 'Yes. Per-image pricing drops sharply past a hundred images, and we work to a written style specification so a batch stays consistent regardless of who edits it.',
      },
      {
        q: 'Can you match colour to the physical product?',
        a: 'Closely, if you tell us the reference: a Pantone, a fabric swatch photograph or a sample. Cameras and screens both shift colour, so a reference matters more than the original file.',
      },
      {
        q: 'What if we do not have photography yet?',
        a: 'For pre-production items we can build a photorealistic 3D render from your packaging artwork, which is how most listings launch before stock arrives.',
      },
    ],
    related: ['amazon-listing-design', 'ecommerce-website-design', 'catalog-design', 'packaging-design'],
    keywords: 'product photo editing, background removal, image retouching, ecommerce photo editing, clipping path',
  },

  /* ---------------------------------------------------------- illustration */
  {
    slug: 'custom-illustration',
    name: 'Custom Illustration',
    group: 'illustration',
    icon: 'spark',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'Custom Illustration Services',
    metaDescription:
      'Original illustration for websites, editorial, packaging and campaigns, drawn in a style built for your brand and owned by you.',
    h1: 'Drawn for you,',
    highlight: 'not licensed from a library',
    intro:
      'Stock illustration is the fastest way to look like every other company using the same pack. Custom work costs more and is the only way to own a visual style: once we establish it, every future piece extends the same world rather than starting again.',
    whoFor: 'Brands whose category is visually crowded, and anyone tired of recognising their own website illustrations elsewhere.',
    deliverables: [
      'Style exploration and agreed direction',
      'Final illustrations in vector or raster',
      'Colour variants for light and dark use',
      'Cropped versions for social and print',
      'Layered source files',
      'Style notes for extending the set later',
    ],
    faqs: [
      {
        q: 'How much does custom illustration cost?',
        a: 'Spot illustrations start around $149; complex scenes with multiple figures cost more. Commissioning a set together is materially cheaper than ordering them one at a time.',
      },
      {
        q: 'Can you match a style we like?',
        a: 'We can work in a similar territory, but we will not copy a living illustrator\'s work. Style is not protected, individual artwork is, and we stay firmly on the right side of that line.',
      },
      {
        q: 'Do we own the illustrations?',
        a: 'Yes, fully, including the source files. There is no licence period and no usage restriction.',
      },
    ],
    related: ['character-design', 'icon-design', 'book-cover-design', 'brand-identity-design'],
    keywords: 'custom illustration, brand illustration, vector illustration, editorial illustration, hand drawn',
  },
  {
    slug: 'icon-design',
    name: 'Custom Icon Design',
    group: 'illustration',
    icon: 'layers',
    price: 149,
    priceLabel: 'from $149',
    metaTitle: 'Custom Icon Set Design',
    metaDescription:
      'Custom icon sets drawn on a consistent grid with matched stroke weights, delivered as optimised SVG and an icon font.',
    h1: 'Icons that look like',
    highlight: 'one person drew them',
    intro:
      'Mixed icon sets are one of the most visible signs of a rushed brand: different stroke weights, different corner radii, some filled and some outlined. A custom set drawn on one grid fixes it permanently and costs less than most people expect.',
    whoFor: 'Product teams, websites with feature sections, and brands whose guidelines specify an icon style.',
    deliverables: [
      'Icons drawn on a shared grid',
      'Consistent stroke weight and radius',
      'Outline and filled variants',
      'Optimised SVG sprite or icon font',
      'Small-size legibility testing',
      'Template for drawing future icons',
    ],
    faqs: [
      {
        q: 'How many icons do we need?',
        a: 'Most sites need twenty to forty. We suggest starting with the ones already in use and adding as needed, using the template so later additions match.',
      },
      {
        q: 'Why not use a free icon library?',
        a: 'For a plain interface, a good open library is a sensible choice and we will say so. Custom icons are worth it when the icons carry brand personality or depict things generic libraries do not cover.',
      },
      {
        q: 'What file formats do we get?',
        a: 'Optimised individual SVGs, a sprite sheet, an icon font, and PNG exports at common sizes.',
      },
    ],
    related: ['custom-illustration', 'design-system', 'ui-ux-design', 'visual-identity-design'],
    keywords: 'icon design, custom icon set, svg icons, icon font, ui icons',
  },
  {
    slug: 'character-design',
    name: 'Character Design',
    group: 'illustration',
    icon: 'spark',
    price: 299,
    priceLabel: 'from $299',
    metaTitle: 'Character Design & Brand Mascots',
    metaDescription:
      'Original character design with turnarounds, expression sheets and pose libraries so a character can be reused consistently.',
    h1: 'A character you can',
    highlight: 'keep using',
    intro:
      'A single drawing is not a character. What makes one usable is the supporting material: a turnaround so it can be redrawn from any angle, an expression sheet, and a set of poses that keep proportions consistent across everyone who ever draws it again.',
    whoFor: 'Games, apps, kids brands, education, animation projects and mascot-led marketing.',
    deliverables: [
      'Character concept exploration',
      'Final character design in colour',
      'Front, side and rear turnaround',
      'Expression sheet',
      'Four action or usage poses',
      'Rig-ready layered file for animation',
    ],
    faqs: [
      {
        q: 'What is a turnaround and why does it matter?',
        a: 'It is the character drawn from several angles at matched proportions. Without one, every new illustration drifts, and animation becomes impossible to keep consistent.',
      },
      {
        q: 'Can the character be animated later?',
        a: 'Yes. We supply a layered file with limbs and features separated, which is what an animator needs to rig it without redrawing.',
      },
      {
        q: 'Do we own the character?',
        a: 'Entirely, including all poses and expressions. Copyright transfers in writing on delivery.',
      },
    ],
    related: ['mascot-logo-design', 'custom-illustration', 'motion-graphics', 'book-cover-design'],
    keywords: 'character design, mascot design, character turnaround, game character art, brand character',
  },
  {
    slug: 'typography-design',
    name: 'Typography & Custom Lettering',
    group: 'illustration',
    icon: 'book',
    price: 299,
    priceLabel: 'from $299',
    metaTitle: 'Custom Lettering & Typography Design',
    metaDescription:
      'Custom lettering, wordmark drawing and brand typography systems, including licensing guidance for the fonts you actually use.',
    h1: 'Letterforms drawn',
    highlight: 'rather than typed',
    intro:
      'Setting your name in a licensed font gives you something anyone can reproduce. Drawing the letters gives you something ownable. We draw wordmarks and lettering, and we also sort out the unglamorous part: which fonts you are actually licensed to use, and where.',
    whoFor: 'Brands wanting a distinctive wordmark, and organisations needing a defensible font licensing position.',
    deliverables: [
      'Custom-drawn wordmark or lettering',
      'Kerning and optical spacing pass',
      'Alternate weights or variants',
      'Brand type scale for print and screen',
      'Font licensing audit and recommendations',
      'Vector outlines and web font package',
    ],
    faqs: [
      {
        q: 'Do we need a fully custom typeface?',
        a: 'Almost never. Custom lettering for the logo plus a well-licensed typeface family for everything else gives you distinctiveness at a fraction of the cost of commissioning a typeface.',
      },
      {
        q: 'Can we use Google Fonts commercially?',
        a: 'Yes, they are open licensed for commercial use including web and print. The licensing problems usually come from desktop fonts bundled with software, which often exclude web embedding.',
      },
      {
        q: 'What is kerning and does it matter that much?',
        a: 'It is the spacing between specific letter pairs. In body text it barely matters; in a logo set at large size, poor kerning is the single most visible sign of amateur work.',
      },
    ],
    related: ['monogram-logo-design', 'luxury-logo-design', 'brand-guidelines', 'visual-identity-design'],
    keywords: 'custom lettering, typography design, wordmark design, font pairing, type system',
  },
  {
    slug: 'book-cover-design',
    name: 'Book Cover Design',
    group: 'illustration',
    icon: 'book',
    price: 299,
    priceLabel: 'from $299',
    metaTitle: 'Book Cover Design for Print & Kindle',
    metaDescription:
      'Genre-aware book cover design that reads at thumbnail size, with full wraparound artwork calculated to your exact page count.',
    h1: 'A cover that sells',
    highlight: 'at thumbnail size',
    intro:
      'Readers meet your book as a two-centimetre image in a list of forty. Genre signalling has to be instant, the title legible at that size, and the spine width calculated from your actual page count and paper stock or the print file will be rejected.',
    whoFor: 'Self-published authors, small presses and businesses publishing a lead-generation book.',
    deliverables: [
      'Front cover concepts in genre',
      'Full wraparound jacket with calculated spine',
      'Back cover blurb and barcode layout',
      'Kindle and ePub cover exports',
      'Thumbnail legibility test',
      'Print-ready PDF to your printer\'s spec',
    ],
    faqs: [
      {
        q: 'How do you calculate the spine width?',
        a: 'From your final page count and the printer\'s paper specification. It cannot be finalised until the interior is laid out, which is why cover and interior are usually done together.',
      },
      {
        q: 'Does the cover really need to match the genre?',
        a: 'Yes. Readers browse by genre cues, and a cover that ignores them reads as unprofessional regardless of how good the design is on its own.',
      },
      {
        q: 'Can you design a series?',
        a: 'Yes, with a shared template so the books read as a set on a shelf while remaining individually distinguishable.',
      },
    ],
    related: ['book-layout-design', 'album-cover-design', 'custom-illustration', 'typography-design'],
    keywords: 'book cover design, kindle cover, self publishing cover, ebook cover, novel cover design',
  },
  {
    slug: 'book-layout-design',
    name: 'Book Interior Layout & Typesetting',
    group: 'illustration',
    icon: 'book',
    price: 449,
    priceLabel: 'from $449',
    metaTitle: 'Book Interior Layout & Typesetting',
    metaDescription:
      'Professional book typesetting and interior layout for paperback, hardback and ebook, from one source with proper front and back matter.',
    h1: 'Pages that read',
    highlight: 'without you noticing them',
    intro:
      'Good typesetting is invisible. Consistent margins, a comfortable measure, correct running heads and no widowed lines at the top of a page. Bad typesetting is the thing readers describe as the book "feeling self-published".',
    whoFor: 'Authors and publishers moving from a finished manuscript to a printable book.',
    deliverables: [
      'Typographic specification and page grid',
      'Full interior typesetting',
      'Front and back matter setup',
      'Chapter openers and running heads',
      'Reflowable ePub and Kindle build',
      'Print-ready PDF with correct bleed',
    ],
    faqs: [
      {
        q: 'Can you typeset directly from Word?',
        a: 'Yes, that is the normal starting point. Clean styling in Word makes it faster, but we can work from a plain manuscript.',
      },
      {
        q: 'Is the ebook the same file as the print book?',
        a: 'No. Print is fixed-page, ebook is reflowable and page layout has no meaning in it. We build both from one source so the content stays in sync.',
      },
      {
        q: 'Do you handle images and tables?',
        a: 'Yes, including resolution checking and placement. Ebooks handle tables poorly, so complex ones are usually rebuilt as images for the digital edition.',
      },
    ],
    related: ['book-cover-design', 'brochure-design', 'catalog-design', 'typography-design'],
    keywords: 'book typesetting, interior layout, book formatting, epub formatting, kindle formatting',
  },
  {
    slug: 'album-cover-design',
    name: 'Album & Podcast Cover Design',
    group: 'illustration',
    icon: 'play',
    price: 219,
    priceLabel: 'from $219',
    metaTitle: 'Album Artwork & Podcast Cover Design',
    metaDescription:
      'Album artwork and podcast cover design meeting Spotify, Apple and distributor specs, legible at the size platforms actually display.',
    h1: 'Artwork that works',
    highlight: 'at 55 pixels',
    intro:
      'Streaming platforms show cover art tiny and everywhere. A design that depends on fine detail or small type disappears. We design the full-size artwork and check it at the sizes Spotify and Apple actually render, because that is where listeners see it.',
    whoFor: 'Musicians, labels, podcasters and audio publishers.',
    deliverables: [
      'Cover artwork at 3000 × 3000 px',
      'Small-size legibility check',
      'Distributor-spec compliant export',
      'Single, EP and album variants',
      'Social and canvas crops',
      'Editable source file',
    ],
    faqs: [
      {
        q: 'What size does album artwork need to be?',
        a: '3000 × 3000 pixels RGB is what every major distributor requires. Anything smaller gets rejected, and upscaling shows.',
      },
      {
        q: 'Can we use a photograph we found online?',
        a: 'Only with a licence covering commercial release. Distributors do reject artwork on rights grounds, and it can pull a release. We will source properly licensed imagery or shoot around it.',
      },
      {
        q: 'Do podcast covers have different rules?',
        a: 'Same square format, but the title has to be much larger, since podcast directories display covers smaller and the show name is the main navigation cue.',
      },
    ],
    related: ['book-cover-design', 'custom-illustration', 'merchandise-design', 'social-media-design'],
    keywords: 'album cover design, podcast cover art, spotify artwork, single artwork, music branding',
  },
  {
    slug: 'merchandise-design',
    name: 'Merchandise Design',
    group: 'illustration',
    icon: 'shop',
    price: 149,
    priceLabel: 'from $149',
    metaTitle: 'Merchandise & Promotional Product Design',
    metaDescription:
      'Merchandise design for apparel, mugs, caps, totes and promotional items, supplied with the print-method-specific files each supplier needs.',
    h1: 'Merch people wear',
    highlight: 'without being asked',
    intro:
      'Merchandise fails when it is just a logo enlarged. The pieces that get used have a design worth wearing, with the brand present rather than shouted. We design for that, and supply artwork built for the specific print method each item uses.',
    whoFor: 'Brands, bands, events, communities and companies ordering staff or promotional kit.',
    deliverables: [
      'Merch graphic concepts',
      'Placement mockups per product',
      'Screen-print colour separations',
      'Embroidery-ready simplified artwork',
      'DTG and vinyl-cut file variants',
      'Print-on-demand ready exports',
    ],
    faqs: [
      {
        q: 'Why do we need different files for different products?',
        a: 'Because print methods differ. Screen printing needs colour separations, embroidery needs simplified shapes and thicker strokes, DTG needs a high-resolution raster. One file cannot serve all three well.',
      },
      {
        q: 'How many colours should a screen-printed design use?',
        a: 'Fewer is cheaper: each colour is another screen. Two or three colours usually gives the best balance of impact and unit cost.',
      },
      {
        q: 'Can you set us up on print-on-demand?',
        a: 'Yes. We supply files at the exact templates Printful, Printify and similar require, so nothing gets rejected at upload.',
      },
    ],
    related: ['apparel-design', 'sticker-design', 'mascot-logo-design', 'brand-identity-design'],
    keywords: 'merchandise design, promotional product design, merch artwork, swag design, print on demand',
  },
  {
    slug: 'apparel-design',
    name: 'Apparel & T-Shirt Design',
    group: 'illustration',
    icon: 'shop',
    price: 119,
    priceLabel: 'from $119',
    metaTitle: 'T-Shirt & Apparel Design Services',
    metaDescription:
      'T-shirt and apparel design with correct placement, colour separations and garment-specific artwork for screen print, DTG or embroidery.',
    h1: 'Garment design that',
    highlight: 'prints how it looks',
    intro:
      'The gap between a t-shirt mockup and the printed garment is where most designs disappoint. Ink sits on top of fabric, colours shift on dark cloth, and fine lines break up. We design accounting for the garment colour, the fabric and the print method.',
    whoFor: 'Clothing brands, teams, events, staff uniforms and merchandise ranges.',
    deliverables: [
      'Front, back and sleeve placement design',
      'Artwork adapted per garment colour',
      'Screen-print separations with underbase',
      'Embroidery digitising-ready files',
      'Size scaling across garment sizes',
      'Mockups for listings and pre-orders',
    ],
    faqs: [
      {
        q: 'Why does my design look different on a dark shirt?',
        a: 'Because ink on dark fabric needs a white underbase, which shifts colours. We build the underbase layer and adjust the palette per garment colour rather than sending one file for all.',
      },
      {
        q: 'What size should a chest print be?',
        a: 'Typically 28 to 30 cm wide for an adult front print, scaled down for smaller sizes. Printing one size across an entire run makes it look wrong on both XS and XXL.',
      },
      {
        q: 'Can you design a full clothing range?',
        a: 'Yes, including tech packs and colourways if you are manufacturing rather than printing blanks.',
      },
    ],
    related: ['merchandise-design', 'sticker-design', 'mascot-logo-design', 'fashion-branding'],
    keywords: 't-shirt design, apparel design, clothing brand design, screen print artwork, hoodie design',
  },
  {
    slug: 'nft-digital-art',
    name: 'Digital Art & Collectible Design',
    group: 'illustration',
    icon: 'spark',
    price: 369,
    priceLabel: 'from $369',
    metaTitle: 'Digital Art & Collectible Artwork Design',
    metaDescription:
      'Digital collectible and generative artwork design, including trait systems, layered assets and the metadata structure collections need.',
    h1: 'Collectible artwork',
    highlight: 'with a system behind it',
    intro:
      'A collection is an engineering problem as much as an art one: traits have to layer without clashing, rarity has to be planned, and the export has to line up with the metadata. We handle the art and the structure so the generated set is actually usable.',
    whoFor: 'Digital collectible projects, game asset sets and brands producing generative artwork.',
    deliverables: [
      'Base character or object artwork',
      'Trait layers designed to combine cleanly',
      'Rarity tier planning',
      'Correctly ordered layered export',
      'Metadata structure and naming scheme',
      'Preview and marketing artwork',
    ],
    faqs: [
      {
        q: 'How many traits does a collection need?',
        a: 'Enough for the target supply without visual repetition. Roughly seven layers with six to ten options each covers a few thousand unique combinations comfortably.',
      },
      {
        q: 'Do you handle the smart contract?',
        a: 'No, we do the artwork, the layer system and the metadata structure. We work alongside whoever handles your contract and minting.',
      },
      {
        q: 'Do we own the artwork?',
        a: 'Yes, in full, including every layer file. Copyright transfers to you in writing.',
      },
    ],
    related: ['character-design', 'custom-illustration', 'merchandise-design', 'motion-graphics'],
    keywords: 'nft art, digital collectible design, generative art, trait layers, pfp collection',
  },

  /* --------------------------------------------------------------- motion */
  {
    slug: 'motion-graphics',
    name: 'Motion Graphics',
    group: 'motion',
    icon: 'animation',
    price: 449,
    priceLabel: 'from $449',
    metaTitle: 'Motion Graphics & Animated Design',
    metaDescription:
      'Motion graphics for ads, social, product demos and presentations, delivered in every aspect ratio with captions burned in.',
    h1: 'Design that',
    highlight: 'moves properly',
    intro:
      'Motion earns attention in a feed, but only if the timing is right. Most amateur motion work is too slow to hold a scroller and too fast to read. We animate to the platform, deliver every ratio, and caption everything because most feeds play silent.',
    whoFor: 'Advertisers, social teams, product marketers and anyone whose static creative has stopped performing.',
    deliverables: [
      'Storyboard and timing plan',
      'Animated sequence in brand style',
      'Square, vertical and landscape versions',
      'Burned-in captions and subtitle file',
      'Licensed music and sound design',
      'Silent-autoplay optimised version',
    ],
    faqs: [
      {
        q: 'How long should a social motion piece be?',
        a: 'Six to fifteen seconds for feed and stories. The first second decides whether the rest is seen, so that is where the work concentrates.',
      },
      {
        q: 'Do we need captions?',
        a: 'Yes. Most feed video plays muted, so uncaptioned motion loses the majority of its audience. We burn them in and supply an SRT.',
      },
      {
        q: 'Can you animate our existing static ads?',
        a: 'Often yes, if the source is layered. Adding motion to a proven static ad is one of the cheapest ways to refresh a fatiguing campaign.',
      },
    ],
    related: ['ad-creative-design', 'explainer-video', 'video-editing', 'social-media-design'],
    keywords: 'motion graphics, animated ads, social video design, kinetic typography, after effects',
  },
  {
    slug: 'explainer-video',
    name: 'Explainer Video Production',
    group: 'motion',
    icon: 'play',
    price: 1199,
    priceLabel: 'from $1,199',
    metaTitle: 'Animated Explainer Video Production',
    metaDescription:
      'Animated explainer videos from script to final cut, with professional voice-over, custom illustration and versions for every channel.',
    h1: 'Explain the thing',
    highlight: 'in ninety seconds',
    intro:
      'An explainer succeeds or fails at the script. We spend the effort there first: what the viewer already believes, what one idea has to land, and what they should do next. Animation without that discipline is an expensive way to say nothing.',
    whoFor: 'SaaS, healthcare, fintech, education and anyone selling something that needs explaining before it sells.',
    deliverables: [
      'Script written and approved',
      'Storyboard and style frames',
      'Professional voice-over recording',
      'Full custom animation',
      'Music and sound design',
      'Landing page, social and ad cutdowns',
    ],
    faqs: [
      {
        q: 'How long should an explainer be?',
        a: 'Sixty to ninety seconds, which is roughly 150 to 220 spoken words. Beyond two minutes drop-off becomes severe unless the viewer is already committed.',
      },
      {
        q: 'Is the voice-over included?',
        a: 'Yes, professionally recorded with a choice of artists. Multi-language versions are quoted per language.',
      },
      {
        q: 'Can we get shorter versions for ads?',
        a: 'Yes, cutdowns at fifteen and thirty seconds are included, since the full explainer is too long for most paid placements.',
      },
    ],
    related: ['motion-graphics', 'video-editing', 'saas-product-design', 'ad-creative-design'],
    keywords: 'explainer video, animated video production, saas video, whiteboard animation, product video',
  },
  {
    slug: 'video-editing',
    name: 'Video Editing',
    group: 'motion',
    icon: 'play',
    price: 149,
    priceLabel: 'from $149',
    metaTitle: 'Professional Video Editing Services',
    metaDescription:
      'Video editing for YouTube, social and marketing, including colour grading, audio cleanup, captions and every platform cutdown.',
    h1: 'Send the footage,',
    highlight: 'get it back ready to post',
    intro:
      'Editing is where footage becomes watchable: pacing, cutting the dead air, fixing the audio that was recorded in a room with a fan on. We handle the whole post chain and hand back the finished file plus the vertical cutdowns.',
    whoFor: 'YouTubers, course creators, marketing teams and businesses producing video regularly.',
    deliverables: [
      'Full edit with pacing and structure',
      'Colour correction and grading',
      'Audio cleanup, levelling and mixing',
      'Titles, lower thirds and B-roll',
      'Captions and subtitle file',
      'Vertical shorts cutdowns',
    ],
    faqs: [
      {
        q: 'How do we send large footage files?',
        a: 'A shared drive link is easiest. We work from Google Drive, Dropbox or Frame.io, whichever you already use.',
      },
      {
        q: 'What is the turnaround?',
        a: 'Two to four working days for a standard edit. Regular publishers move onto a booked weekly slot with a fixed delivery day.',
      },
      {
        q: 'Do you make shorts from long videos?',
        a: 'Yes, and it is included. We pull the strongest moments, reframe them vertically and caption them for Shorts, Reels and TikTok.',
      },
    ],
    related: ['youtube-thumbnail-design', 'youtube-channel-design', 'motion-graphics', 'explainer-video'],
    keywords: 'video editing, youtube editing, short form editing, video post production, reels editing',
  },

  /* ------------------------------------------------------------ programmes */
  {
    slug: 'design-subscription',
    name: 'Design Subscription',
    group: 'programme',
    icon: 'clock',
    price: 1499,
    priceLabel: 'from $1,499 per month',
    metaTitle: 'Monthly Design Subscription Service',
    metaDescription:
      'A monthly design subscription giving you a dedicated team, unlimited requests in a queue and a predictable flat fee with no contract.',
    h1: 'A design team',
    highlight: 'without the payroll',
    intro:
      'Hiring a designer means salary, software, management and the awkward months when there is not enough work. A subscription gives you the same output as a flat monthly cost: submit requests to a queue, get them back in order, pause when you do not need it.',
    whoFor: 'Marketing teams, agencies and growing businesses with steady, varied design demand.',
    deliverables: [
      'Unlimited requests in a managed queue',
      'One or two active tasks at a time',
      'Typical turnaround of one to two days',
      'A named designer who learns your brand',
      'Source files delivered with every request',
      'Pause or cancel any month',
    ],
    faqs: [
      {
        q: 'What does unlimited actually mean?',
        a: 'Unlimited requests in the queue, worked one or two at a time. You can submit fifty; they come back in your priority order. It is honest capacity, not a marketing word.',
      },
      {
        q: 'What can we not ask for?',
        a: 'Anything needing a specialist retainer of its own: full development builds, long-form video production and complex 3D. Those are quoted as projects, and we will say so up front.',
      },
      {
        q: 'Can we pause the subscription?',
        a: 'Yes, any month. Quiet quarter, pause it; busy launch, restart it. There is no contract and no cancellation fee.',
      },
    ],
    related: ['social-media-design', 'ad-creative-design', 'creative-consulting', 'presentation-design'],
    keywords: 'design subscription, unlimited design service, monthly design retainer, dedicated designer',
  },
  {
    slug: 'creative-consulting',
    name: 'Creative Direction & Consulting',
    group: 'programme',
    icon: 'team',
    price: 599,
    priceLabel: 'from $599',
    metaTitle: 'Creative Direction & Design Consulting',
    metaDescription:
      'Creative direction and design consulting for in-house teams: audits, art direction, hiring support and outside review of work in progress.',
    h1: 'Senior direction,',
    highlight: 'without a senior hire',
    intro:
      'Plenty of teams have capable designers and no one setting the bar. Consulting supplies that: regular critique, an outside audit of what is going out of the door, and help deciding what to build in-house versus buy.',
    whoFor: 'In-house teams without a design lead, and founders making creative decisions outside their expertise.',
    deliverables: [
      'Audit of current output and consistency',
      'Written creative direction and standards',
      'Scheduled critique sessions',
      'Vendor and freelancer selection support',
      'Hiring briefs and portfolio review',
      'Roadmap for building design capability',
    ],
    faqs: [
      {
        q: 'How is this different from just hiring you for projects?',
        a: 'Projects produce artwork. Consulting improves what your own team produces after we leave, which is better value if you already have designers.',
      },
      {
        q: 'How much time is involved?',
        a: 'Typically a half day a fortnight, plus asynchronous review. Enough to hold a standard without becoming a bottleneck.',
      },
      {
        q: 'Can you help us hire a designer?',
        a: 'Yes, including writing the brief, screening portfolios and sitting in on interviews. Portfolio review is where most non-design hiring managers go wrong.',
      },
    ],
    related: ['brand-strategy', 'design-system', 'enterprise-branding', 'design-subscription'],
    keywords: 'creative direction, design consulting, art direction, design audit, fractional creative director',
  },
  {
    slug: 'nonprofit-branding',
    name: 'Nonprofit & Charity Branding',
    group: 'programme',
    icon: 'shield',
    price: 599,
    priceLabel: 'from $599',
    metaTitle: 'Nonprofit & Charity Branding',
    metaDescription:
      'Branding for nonprofits and charities, covering identity, campaign creative, donor communications and annual report design.',
    h1: 'Design that earns',
    highlight: 'donor trust',
    intro:
      'Nonprofits are held to a stricter standard than businesses: spend visibly on design and someone asks why it did not go to the cause. So the work has to look credible without looking expensive, and it has to make donating easy.',
    whoFor: 'Charities, foundations, community organisations, faith groups and social enterprises.',
    deliverables: [
      'Identity system and logo',
      'Campaign and appeal creative',
      'Donation page and form design',
      'Annual report and impact layout',
      'Volunteer and event materials',
      'Editable templates for lean teams',
    ],
    faqs: [
      {
        q: 'Do you offer nonprofit rates?',
        a: 'Yes, registered charities and community organisations get reduced pricing. Tell us about the organisation and we will quote accordingly.',
      },
      {
        q: 'What matters most for donations?',
        a: 'Clarity about where the money goes, a specific ask rather than an open field, and a donation form short enough to finish on a phone.',
      },
      {
        q: 'Can our volunteers keep making materials?',
        a: 'Yes, that is why templates are included. We deliver a Canva library so anyone can produce on-brand posters and posts without design skills.',
      },
    ],
    related: ['brand-identity-design', 'presentation-design', 'social-media-design', 'flyer-design'],
    keywords: 'nonprofit branding, charity design, ngo branding, fundraising design, annual report design',
  },
  {
    slug: 'influencer-branding',
    name: 'Personal & Influencer Branding',
    group: 'programme',
    icon: 'spark',
    price: 449,
    priceLabel: 'from $449',
    metaTitle: 'Personal Brand & Influencer Design',
    metaDescription:
      'Personal branding for creators, coaches and consultants: identity, media kit, channel art, templates and a site that converts followers.',
    h1: 'A personal brand',
    highlight: 'that can be booked',
    intro:
      'A personal brand has to work commercially: sponsors need a media kit, audiences need consistency across four platforms, and there has to be somewhere to actually book or buy. We build the whole set rather than just an avatar.',
    whoFor: 'Creators, coaches, consultants, speakers, authors and public-facing professionals.',
    deliverables: [
      'Personal identity and wordmark',
      'Cross-platform profile and cover art',
      'Sponsor-ready media kit',
      'Content template library',
      'Landing or booking page design',
      'Speaker one-sheet and press kit',
    ],
    faqs: [
      {
        q: 'What goes in a media kit?',
        a: 'Audience size and demographics, engagement figures, previous partnerships, formats you offer and rates. Brands compare kits side by side, so vagueness costs deals.',
      },
      {
        q: 'Should a personal brand use my name or a business name?',
        a: 'Your name if you are the product and you intend to stay so. A business name if you plan to build a team or sell the entity later. It is a strategic decision and we will talk it through before designing.',
      },
      {
        q: 'Do I need a website if I have a large following?',
        a: 'Yes. Platforms change reach and rules without warning; an email list and a site you own are the only audience assets that cannot be taken away.',
      },
    ],
    related: ['social-media-design', 'youtube-channel-design', 'landing-page-design', 'brand-strategy'],
    keywords: 'personal branding, influencer brand design, creator branding, media kit design, coach branding',
  },
  {
    slug: 'vector-tracing',
    name: 'Vector Tracing & File Conversion',
    group: 'illustration',
    icon: 'layers',
    price: 49,
    priceLabel: 'from $49',
    metaTitle: 'Logo Vector Tracing & File Conversion',
    metaDescription:
      'Hand-redrawn vector tracing that converts a low-resolution logo into clean scalable artwork with every print and web file format.',
    h1: 'Turn a blurry JPEG',
    highlight: 'into proper artwork',
    intro:
      'A great many businesses only have their logo as a small image from an email years ago. Auto-tracing produces wobbly edges and hundreds of stray points. We redraw it by hand, so the curves are clean and the file is genuinely printable at any size.',
    whoFor: 'Anyone whose printer, sign-maker or embroiderer has asked for a vector file they do not have.',
    deliverables: [
      'Hand-redrawn vector artwork',
      'Exact colour matching with Pantone values',
      'Type identified or redrawn',
      'AI, EPS, SVG and PDF files',
      'Transparent PNG at multiple sizes',
      'One-colour and reversed variants',
    ],
    faqs: [
      {
        q: 'Can you work from a very small image?',
        a: 'Usually yes. We are redrawing rather than tracing pixels, so a small reference is enough as long as the shapes are readable.',
      },
      {
        q: 'How is this different from auto-trace?',
        a: 'Auto-trace approximates edges and leaves jagged curves and hundreds of anchor points. Hand redrawing produces clean geometry that scales to a billboard.',
      },
      {
        q: 'Can you match the exact colours?',
        a: 'We sample from your file and convert to Pantone and CMYK. Where the source was compressed we will show you the closest options rather than guessing.',
      },
    ],
    related: ['logo-redesign', 'business-card-design', 'merchandise-design', 'signage-design'],
    keywords: 'vector tracing, logo vectorisation, jpg to vector, redraw logo, eps conversion',
  },
  {
    slug: 'fashion-branding',
    name: 'Fashion & Apparel Branding',
    group: 'brand',
    icon: 'shop',
    price: 749,
    priceLabel: 'from $749',
    metaTitle: 'Fashion Brand & Clothing Label Design',
    metaDescription:
      'Branding for fashion and clothing labels: identity, woven labels, swing tags, lookbooks, packaging and a storefront that fits the label.',
    h1: 'A label that belongs',
    highlight: 'inside the garment',
    intro:
      'Fashion branding lives on physical things: a woven neck label, a swing tag, a printed mailer, the tissue inside it. We design the identity and every physical touchpoint together, because in this category the unboxing is most of the brand experience.',
    whoFor: 'Clothing labels, boutiques, streetwear brands and accessories makers.',
    deliverables: [
      'Brand identity and logo suite',
      'Woven and printed label artwork',
      'Swing tag and care label design',
      'Lookbook and line sheet layout',
      'Packaging and mailer design',
      'Storefront and social kit',
    ],
    faqs: [
      {
        q: 'What is a line sheet and do I need one?',
        a: 'A wholesale document listing each style with a photo, code, sizing, wholesale and retail price. If you want stockists, buyers will ask for it before anything else.',
      },
      {
        q: 'Do you design woven labels?',
        a: 'Yes, with simplified artwork suited to weaving, which cannot hold thin strokes or gradients the way print can.',
      },
      {
        q: 'How important is packaging for a small label?',
        a: 'Very. For an online-only brand the mailer is the only physical brand moment, and it drives the unboxing content customers post for free.',
      },
    ],
    related: ['apparel-design', 'packaging-design', 'ecommerce-website-design', 'luxury-logo-design'],
    keywords: 'fashion branding, clothing label design, streetwear brand, swing tag design, lookbook design',
  },
]

export const serviceBySlug = Object.fromEntries(catalogServices.map((s) => [s.slug, s]))

export function servicesInGroup(groupId) {
  return catalogServices.filter((s) => s.group === groupId)
}
