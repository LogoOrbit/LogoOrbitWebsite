/**
 * Long-form guides.
 *
 * These exist to answer the questions people ask before they are ready to buy
 * anything. Each one is written to be genuinely useful on its own, including
 * where the honest answer is "you probably do not need to pay us for this".
 *
 * Structure: `sections` is an ordered list of blocks. `h` renders an h2, `p`
 * is an array of paragraphs, `ul` an unordered list, `ol` a numbered one and
 * `table` a two-column reference table.
 */

export const guideCategories = [
  { id: 'branding', name: 'Branding' },
  { id: 'web', name: 'Web & SEO' },
  { id: 'print', name: 'Print & Production' },
  { id: 'business', name: 'Working with designers' },
]

export const guides = [
  {
    slug: 'how-much-does-a-logo-cost',
    category: 'business',
    title: 'How much does a logo actually cost in 2026?',
    metaTitle: 'How Much Does a Logo Cost? Real 2026 Price Ranges',
    metaDescription:
      'What logo design really costs at every level, from $5 marketplaces to $50,000 agencies, what you get at each price, and how to decide which tier you need.',
    excerpt:
      'Prices range from five dollars to fifty thousand for what looks like the same deliverable. Here is what actually differs between the tiers, and how to work out which one your business needs.',
    published: '2026-01-14',
    updated: '2026-07-22',
    readMinutes: 9,
    keywords: 'logo design cost, logo price, how much for a logo, logo design pricing',
    sections: [
      {
        p: [
          'Logo pricing is genuinely confusing because the deliverable sounds identical at every price point. Someone charging $10 and someone charging $10,000 will both promise you "a professional logo with source files". The difference is not the drawing. It is how much thinking precedes it, how many people have already been sold the same idea, and what happens when you need something the original brief did not anticipate.',
        ],
      },
      {
        h: 'The five tiers, and what actually differs',
        table: [
          ['$5 to $50 — marketplaces and generators', 'A template or an AI generation with your name set into it. Fast, and occasionally fine for a side project. The mark is rarely exclusive, source files are often withheld, and trademark registration is usually impossible because you cannot prove authorship.'],
          ['$50 to $500 — professional entry level', 'A designer drawing something original for your specific business. Limited concepts, limited revisions, full vector files and copyright transfer. This is where the great majority of small businesses should be.'],
          ['$500 to $3,000 — identity, not just a logo', 'The mark plus the system: palette, typography, applications and usage rules. What you are buying is consistency across everything else you make.'],
          ['$3,000 to $15,000 — strategy-led branding', 'Research, positioning and competitor work before the design. Appropriate when the brand decision affects a large revenue line or a funding round.'],
          ['$15,000 and up — agency engagements', 'Multi-brand architecture, naming, extensive research, governance. Genuinely necessary for large organisations and a waste of money for everyone else.'],
        ],
      },
      {
        h: 'What actually drives the price',
        ul: [
          'Exclusivity. A template sold a thousand times costs less than a mark drawn once. That is the single biggest variable.',
          'Revision structure. Fixed revision counts are cheaper to sell and worse to buy, because the design ends when the counter runs out rather than when it is right.',
          'Deliverable breadth. A logo is one file. A brand identity is fifty, and most of the cost sits in the applications rather than the mark.',
          'Ownership. Full copyright assignment in writing costs more than a licence, and it is the thing that matters if you ever want to trademark or sell the business.',
          'Who does the work. A studio with a named designer costs more than an anonymous marketplace queue, and the difference shows most when a brief is unusual.',
        ],
      },
      {
        h: 'The honest test for which tier you need',
        p: [
          'Ask what the logo is going to be doing in three years. If the answer is "sitting on invoices for a business that will still have four employees", the entry tier is entirely adequate and spending more is vanity. If the answer involves retail shelves, franchise locations, an acquisition or a category where customers compare brands before buying, the identity tier pays for itself the first time you avoid redoing everything.',
          'The expensive mistake is not buying cheap. It is buying cheap twice, then paying the identity price anyway eighteen months later, having thrown away whatever recognition the first mark built.',
        ],
      },
      {
        h: 'What to check before you pay anything',
        ol: [
          'Is copyright transferred in writing, or are you buying a licence? Ask explicitly. A licence cannot be trademarked in your name.',
          'Do you get editable vector source files, not just PNGs? Without them every future change means redrawing.',
          'Is there a revision limit, and what happens when you hit it?',
          'Has the mark been checked against existing trademarks in your class? A basic search costs nothing and prevents an expensive rename.',
          'Does it work in one colour, at favicon size, and reversed out of a dark background? Ask to see all three before approving.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a $50 logo ever a good idea?',
        a: 'Yes, when it is drawn by a real designer, comes with vector files and transfers copyright. What is not a good idea is a $50 template sold to hundreds of other businesses, because you cannot protect it and you may not even be the only one in your city using it.',
      },
      {
        q: 'Why do agencies charge tens of thousands?',
        a: 'Because for a large organisation the design is a small part of the engagement. Most of the cost is research, stakeholder alignment, brand architecture and governance across dozens of teams. For a business with one location, almost none of that applies.',
      },
      {
        q: 'Should I pay more for unlimited revisions?',
        a: 'Usually yes, and not because you will use a hundred of them. Unlimited revisions change the incentive: the designer is paid to get it right rather than to get it finished.',
      },
    ],
    relatedServices: ['brand-identity-design', 'logo-redesign', 'minimalist-logo-design', 'brand-strategy'],
    relatedGuides: ['what-makes-a-good-logo', 'ai-logo-generators-vs-designers', 'logo-file-formats-explained'],
  },

  {
    slug: 'logo-file-formats-explained',
    category: 'print',
    title: 'Logo file formats explained: which file to send where',
    metaTitle: 'Logo File Formats Explained: AI, EPS, SVG, PNG & PDF',
    metaDescription:
      'A plain-English guide to logo file formats, what each one is for, which to send a printer, and why your PNG keeps coming back rejected.',
    excerpt:
      'AI, EPS, SVG, PDF, PNG, JPG. Six formats, and printers reject the wrong one constantly. Here is what each is actually for and which to send in every situation.',
    published: '2026-02-03',
    updated: '2026-06-30',
    readMinutes: 7,
    keywords: 'logo file formats, vector vs raster, ai eps svg png, print ready logo files',
    sections: [
      {
        p: [
          'The single most common support question any design studio gets is a forwarded email from a printer saying "we need this in vector". Here is what that means and what to send.',
        ],
      },
      {
        h: 'Vector versus raster, in one paragraph',
        p: [
          'A raster file is a grid of coloured pixels. Enlarge it and you get bigger, blurrier pixels. A vector file is a set of mathematical instructions describing shapes, so it can be scaled to a billboard with no loss. Logos should always be created as vectors, and raster versions exported from them as needed. Going the other way — turning a PNG into a vector — means someone has to redraw it.',
        ],
      },
      {
        h: 'What each format is for',
        table: [
          ['AI', 'Adobe Illustrator\'s editable master file. This is the original artwork. Keep it safe; it is what any future designer will ask for first.'],
          ['EPS', 'The universal vector exchange format. Older, widely accepted, and what most commercial printers and sign-makers ask for.'],
          ['SVG', 'Vector for the web. Small, sharp at any zoom, and it can be recoloured with CSS. Use it for your website logo and favicons.'],
          ['PDF', 'Can contain vector data and is universally openable. A print-ready PDF is what most modern printers actually prefer.'],
          ['PNG', 'Raster with transparency. Use for social profiles, email signatures, presentations and anywhere a transparent background matters.'],
          ['JPG', 'Raster with no transparency and lossy compression. Only appropriate for photographs. Never send a JPG logo to a printer.'],
        ],
      },
      {
        h: 'Which file to send where',
        ul: [
          'Commercial printer, sign-maker or vehicle wrapper: EPS or print-ready PDF, in CMYK, with fonts converted to outlines.',
          'Embroidery: a simplified vector version, plus the thread colours. Embroiderers will digitise from it, and fine detail cannot be stitched.',
          'Website: SVG for the logo, PNG for anything the CMS refuses to accept as SVG.',
          'Social media profile: PNG, square, at least 500 × 500, with the mark not touching the edges since most platforms crop to a circle.',
          'Microsoft Office or Google Slides: PNG with transparency. Vector support in office software is unreliable.',
          'Merchandise supplier: ask them. Screen printing wants separations, DTG wants high-resolution PNG, vinyl cutting wants clean vector.',
        ],
      },
      {
        h: 'Colour modes matter more than people think',
        p: [
          'RGB is for screens and covers a wider range of colour than ink can reproduce. CMYK is for printing. A bright RGB blue printed in CMYK will come back duller, and there is no fixing that at the printer. This is why brand guidelines specify separate values for each, and why a Pantone reference matters when a colour has to match exactly across different suppliers.',
          'If your logo has ever come back from a printer looking flat, this is almost certainly why.',
        ],
      },
      {
        h: 'What a complete logo package contains',
        ol: [
          'Editable vector master (AI or equivalent).',
          'EPS and print-ready PDF for suppliers.',
          'SVG for web.',
          'Transparent PNGs at several sizes.',
          'One-colour black and one-colour white versions.',
          'A colour reference sheet with HEX, RGB, CMYK and Pantone values.',
        ],
      },
    ],
    faqs: [
      {
        q: 'My designer only sent me a PNG. Is that a problem?',
        a: 'Yes, eventually. You will be able to use it online but not print it well or scale it, and any future work means paying someone to redraw it. Ask for the vector files; if the original designer cannot supply them, a vector redraw is inexpensive.',
      },
      {
        q: 'Can I convert a PNG to a vector myself?',
        a: 'Automatic tracing exists in Illustrator and various online tools, but the result has wobbly edges and hundreds of stray anchor points. It looks acceptable on screen and falls apart when scaled or printed.',
      },
      {
        q: 'What does "convert fonts to outlines" mean?',
        a: 'It turns editable text into shapes, so the file no longer needs the font installed to display correctly. Printers ask for it because otherwise your typeface gets silently substituted for something else.',
      },
    ],
    relatedServices: ['vector-tracing', 'business-card-design', 'brand-guidelines', 'merchandise-design'],
    relatedGuides: ['how-much-does-a-logo-cost', 'print-production-guide', 'what-makes-a-good-logo'],
  },

  {
    slug: 'what-makes-a-good-logo',
    category: 'branding',
    title: 'What makes a good logo: five tests that actually matter',
    metaTitle: 'What Makes a Good Logo? Five Practical Tests',
    metaDescription:
      'Forget the theory. Five practical tests any logo should pass before you approve it, and the common mistakes that fail them.',
    excerpt:
      'Most advice about logos is either abstract or wrong. These are the five checks a mark has to survive before you sign it off.',
    published: '2026-01-28',
    updated: '2026-05-18',
    readMinutes: 8,
    keywords: 'good logo design, logo design principles, how to judge a logo, logo checklist',
    sections: [
      {
        p: [
          'People approve logos on a large screen, in full colour, in isolation, at the end of a process they are tired of. That is the least representative viewing condition imaginable. Here are five tests that predict whether a mark will still be working in five years.',
        ],
      },
      {
        h: '1. The squint test',
        p: [
          'Shrink the logo to 16 pixels — the size of a browser tab favicon — and look at it. Can you tell what it is? Most failed logos fail here, because they were designed at 400 pixels wide and contain detail that dissolves. If the mark becomes a grey smudge, you need a simplified variant at minimum, and possibly a simpler mark.',
        ],
      },
      {
        h: '2. The one-colour test',
        p: [
          'Print it in solid black. Then reverse it out of black. A logo that only works in its gradient is a logo you cannot embroider, emboss, fax, stamp, engrave, or print in a single-colour newspaper advertisement. Colour should be a reinforcement, never the thing carrying the identity.',
        ],
      },
      {
        h: '3. The memory test',
        p: [
          'Show it to someone for five seconds, take it away, and ask them to describe it. If they cannot, it is not distinctive enough to be recognised, which is the only job a logo has. Note that "describe it" is a much lower bar than "draw it" — almost nobody can accurately draw a logo from memory, including famous ones.',
        ],
      },
      {
        h: '4. The category test',
        p: [
          'Put it beside your five closest competitors. Does it look like it belongs in the category, and does it look different from the others in it? Both matter. A law firm that looks like a toy brand loses clients; a law firm indistinguishable from four others gains nothing from its design at all.',
        ],
      },
      {
        h: '5. The application test',
        p: [
          'Mock it up on the three things it will actually appear on most. For a builder that is a van, a hi-vis jacket and an invoice. For a SaaS company it is a favicon, an app store listing and a slide footer. Approving a logo on a white background is approving it in the one place it will almost never appear.',
        ],
      },
      {
        h: 'Common failures',
        ul: [
          'Too much detail. Illustrative marks with fine linework fail the squint test immediately.',
          'Dependence on a gradient or a photograph. Both break in single-colour reproduction.',
          'A typeface doing all the work. If the name set in a font is the whole logo, you own nothing distinctive.',
          'Following a trend precisely. The 2010s flat-and-geometric wave now dates work as reliably as a 1990s bevel does.',
          'Clip-art symbolism. A globe for international, a leaf for eco, a lightbulb for ideas. These say nothing because everyone uses them.',
          'Text too small in the lockup. Company names in logos are routinely set at sizes that become unreadable on signage.',
        ],
      },
      {
        h: 'What does not matter as much as people think',
        p: [
          'Whether it "means" something. Most iconic marks are abstract and acquired meaning through use rather than carrying it inherently. A clever hidden concept is a nice bonus and a terrible primary criterion — nobody but you will ever notice it.',
          'Colour psychology. The claimed effects are far weaker and more culturally variable than marketing articles suggest. Choose colour for distinctiveness within your category and for legibility, not because a chart says blue means trust.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should my logo include what my business does?',
        a: 'Not necessarily in the symbol. A tagline or descriptor alongside the mark does that job better and can be dropped later once you are known. Symbols that literally depict the service tend to trap a business that later expands.',
      },
      {
        q: 'How many concepts should a designer show me?',
        a: 'Two or three genuinely different directions. A dozen options usually signals that the designer is guessing rather than reasoning, and it makes the decision harder rather than easier.',
      },
      {
        q: 'Can I test a logo with customers?',
        a: 'Carefully. Asking people which logo they prefer produces bad data, because preference is not recognition. Asking which one they would expect to be more expensive, or which they can describe after five seconds, produces something useful.',
      },
    ],
    relatedServices: ['brand-identity-design', 'minimalist-logo-design', 'logo-redesign', 'visual-identity-design'],
    relatedGuides: ['how-much-does-a-logo-cost', 'choosing-brand-colours', 'rebrand-or-refresh'],
  },

  {
    slug: 'rebrand-or-refresh',
    category: 'branding',
    title: 'Rebrand or refresh? How to decide, and what it costs you',
    metaTitle: 'Rebrand or Brand Refresh: How to Decide',
    metaDescription:
      'When a business should rebrand completely versus refresh what it has, what each costs in money and lost recognition, and how to roll it out.',
    excerpt:
      'A full rebrand throws away recognition you have already paid for. Sometimes that is exactly right. Here is how to tell which situation you are in.',
    published: '2026-03-11',
    updated: '2026-07-02',
    readMinutes: 8,
    keywords: 'rebrand vs refresh, when to rebrand, brand refresh, rebranding decision',
    sections: [
      {
        p: [
          'Every rebrand destroys something: the accumulated recognition in your existing mark. That is not an argument against rebranding, but it is a cost that should appear on the ledger, and it almost never does.',
        ],
      },
      {
        h: 'Refresh when',
        ul: [
          'The mark is recognised but looks dated — bevels, gradients, a period typeface.',
          'It does not work at small sizes or in one colour, but the underlying idea is sound.',
          'The business has not fundamentally changed what it sells or to whom.',
          'Customers can describe your logo from memory. That recognition is an asset worth keeping.',
        ],
      },
      {
        h: 'Rebrand when',
        ul: [
          'What you sell has genuinely changed, and the name or mark now describes something you no longer do.',
          'You are moving upmarket or downmarket, and the current identity signals the wrong price point.',
          'There is a legal or trademark conflict.',
          'The brand carries associations you actively need to escape — a merger, a scandal, a failed product line.',
          'You are expanding into markets where the name or symbol does not translate.',
        ],
      },
      {
        h: 'The cost nobody budgets for',
        p: [
          'The design fee is usually the smallest line. The real cost is replacement: signage, vehicles, printed stock, uniforms, packaging, email templates, the twelve places on your website nobody remembers, the supplier who has your old logo on file, the Google Business Profile, the app store listing. For a business with physical presence, rollout routinely costs several times the design.',
          'Budget for it before you commit, and get a rollout inventory produced early. It frequently changes the decision.',
        ],
      },
      {
        h: 'Rolling it out without a mess',
        ol: [
          'Inventory everything carrying the old mark. Everything, including the things you forgot.',
          'Rank by visibility. Website, signage and vehicles first; the internal template nobody sees can wait.',
          'Set a switch date for digital, where everything can change at once. Digital consistency is cheap and inconsistency is glaring.',
          'Use up printed stock where it is not customer-facing. Nobody is offended by an old letterhead on an internal form.',
          'Tell customers. A rebrand announced reads as growth; a rebrand discovered reads as a company that got bought.',
          'Update every third-party listing: search profiles, directories, social, review sites, app stores, supplier portals.',
        ],
      },
      {
        h: 'If a domain change is involved',
        p: [
          'This is where rebrands cause real financial damage. Every URL on the old domain needs a permanent redirect to its specific replacement — not all of them to the homepage, which is the classic mistake and throws away most of the accumulated authority. Keep the old domain registered indefinitely and keep the redirects live permanently. Expect a temporary ranking dip regardless; handled properly it recovers within a few months.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How often should a brand be refreshed?',
        a: 'There is no schedule. Most identities need attention every seven to ten years, but the trigger should be a real problem — dated appearance, poor reproduction, changed offering — rather than a calendar.',
      },
      {
        q: 'Will customers be upset by a rebrand?',
        a: 'Some always are, briefly, and it is rarely a lasting commercial issue unless the change also signals something they dislike. Communicating the reason reduces it substantially.',
      },
      {
        q: 'Can we change the logo but keep the name?',
        a: 'Yes, and that is the most common form of refresh. Names carry far more equity than marks, and changing one without the other is much lower risk.',
      },
    ],
    relatedServices: ['rebranding-services', 'logo-redesign', 'brand-strategy', 'website-redesign'],
    relatedGuides: ['what-makes-a-good-logo', 'brand-guidelines-checklist', 'website-redesign-seo'],
  },

  {
    slug: 'choosing-brand-colours',
    category: 'branding',
    title: 'Choosing brand colours that work everywhere',
    metaTitle: 'How to Choose Brand Colours That Actually Work',
    metaDescription:
      'A practical method for choosing brand colours: category differentiation, accessibility contrast, print reproduction and the roles a palette needs.',
    excerpt:
      'Colour psychology articles will not help you. What will: differentiating within your category, meeting contrast requirements, and picking colours that survive print.',
    published: '2026-02-19',
    updated: '2026-06-11',
    readMinutes: 7,
    keywords: 'brand colours, colour palette design, brand color psychology, accessible colour contrast',
    sections: [
      {
        p: [
          'Almost everything written about colour psychology overstates a weak, culturally specific effect. Blue does not make people trust you; banks using blue is a convention, not a mechanism. Here is a method that works on more defensible grounds.',
        ],
      },
      {
        h: 'Start with the category, not the mood board',
        p: [
          'Put your ten closest competitors\' logos on one page. You will usually find the category has converged on two or three colours. That convergence is your opportunity: within a sea of blue, a considered dark green is instantly identifiable, and the recognition benefit is worth far more than any claimed emotional association.',
          'The exception is where category convention carries functional information — safety yellow, medical white and blue, organic green. Breaking those costs you comprehension, not just familiarity.',
        ],
      },
      {
        h: 'A palette needs roles, not just colours',
        ul: [
          'Primary: the one colour people associate with you. One, not three.',
          'Neutral dark: for body text and most UI. Almost never pure black — a very dark desaturated version of your primary reads richer.',
          'Neutral light: backgrounds and surfaces. Rarely pure white in print contexts.',
          'Accent: used sparingly for calls to action. If everything is highlighted, nothing is.',
          'Semantic: success, warning and error states for anything with an interface. These are functional and should not be forced to match the brand.',
        ],
      },
      {
        h: 'Contrast is a requirement, not a preference',
        p: [
          'WCAG requires a contrast ratio of at least 4.5:1 between body text and its background, and 3:1 for large text and interface components. This is a legal requirement in many jurisdictions and a usability one everywhere. The colours that fail most often are mid-tone brand colours used as button backgrounds with white text — a medium orange or a light green with white on top almost always fails.',
          'Check every text-on-colour combination before the palette is signed off, not after the site is built. Retrofitting contrast means changing the palette, which means changing everything.',
        ],
      },
      {
        h: 'Print will not match your screen',
        p: [
          'Screens emit light and can display colours ink cannot reproduce. Bright greens, vivid oranges and electric blues all dull noticeably in CMYK. If a colour matters, specify a Pantone reference and get a physical proof before signing off a large print run. Ask your printer for a printed sample of the specific colour on the specific stock — it can look markedly different on uncoated paper than on coated.',
        ],
      },
      {
        h: 'Practical checks before you commit',
        ol: [
          'Does the primary colour appear in three or more competitor logos? If so, reconsider.',
          'Does white text pass 4.5:1 on your primary? If not, you need a darker variant for buttons.',
          'Print the palette on a cheap office printer. If it becomes mud, it will do the same on low-cost promotional items.',
          'View it in greyscale. Colours that are distinguishable in colour but identical in greyscale will merge in single-colour reproduction.',
          'Check it against the common forms of colour blindness. Red and green as the only distinguishing pair fails for roughly one man in twelve.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How many colours should a brand have?',
        a: 'One primary, two or three neutrals, and one accent covers most businesses. Large palettes are hard to apply consistently, and consistency is the entire point.',
      },
      {
        q: 'Is colour psychology real?',
        a: 'There are measurable but small and context-dependent effects, heavily mediated by culture and by what a category has conditioned people to expect. It is far too weak a signal to be the basis of a brand decision.',
      },
      {
        q: 'Can we trademark a colour?',
        a: 'In rare cases, yes, but it requires demonstrating that consumers associate the specific colour with you exclusively in your category. It takes years of consistent use and considerable evidence.',
      },
    ],
    relatedServices: ['brand-identity-design', 'brand-guidelines', 'visual-identity-design', 'design-system'],
    relatedGuides: ['what-makes-a-good-logo', 'brand-guidelines-checklist', 'accessible-design-guide'],
  },

  {
    slug: 'brand-guidelines-checklist',
    category: 'branding',
    title: 'What belongs in brand guidelines (and what does not)',
    metaTitle: 'Brand Guidelines Checklist: What to Include',
    metaDescription:
      'A complete checklist for brand guideline documents, covering logo rules, colour, typography and applications, without the padding nobody reads.',
    excerpt:
      'Most brand guidelines are forty pages long and consulted twice. Here is what actually needs to be in them, and what is padding.',
    published: '2026-04-02',
    updated: '2026-07-15',
    readMinutes: 6,
    keywords: 'brand guidelines checklist, brand style guide contents, brand manual, brand standards',
    sections: [
      {
        p: [
          'Brand guidelines exist for one reason: so someone who is not you can make something on-brand without asking. Judged against that purpose, most guideline documents fail, because they are written as a showcase of the design work rather than as a reference.',
        ],
      },
      {
        h: 'The essential sections',
        ul: [
          'Logo files: which variant to use in which situation, with the actual files linked or attached.',
          'Clear space: the minimum margin around the mark, expressed in a unit derived from the logo itself so it scales.',
          'Minimum size: separate figures for print and screen. This is the rule most often broken.',
          'What not to do: stretching, recolouring, adding effects, placing on busy photographs, rebuilding the lockup. Show them as visual examples, because prose descriptions do not stop it happening.',
          'Colour: HEX, RGB, CMYK and Pantone for every colour, plus which colours may sit on which.',
          'Typography: the typefaces, the weights in use, the size hierarchy, and — critically — the licensed fallback for people who do not have the fonts.',
          'Imagery: what photographs should look like, with real examples of both acceptable and unacceptable.',
          'Applications: the mark shown on the six or eight things it will actually appear on.',
        ],
      },
      {
        h: 'Sections most documents can skip',
        ul: [
          'The brand story and values essay. It belongs in an internal document, not in the reference a printer opens.',
          'The mood board that informed the design. It was a process artefact.',
          'Extensive rationale for each design decision. Interesting once, never consulted again.',
          'Grid systems for layouts nobody will ever build by hand.',
        ],
      },
      {
        h: 'Add these if they apply to you',
        ul: [
          'Digital and UI: colour roles, button states, form styling, and the tokens developers should use.',
          'Social media: profile and cover crops per platform, and the safe areas each enforces.',
          'Co-branding: how your mark sits beside a partner or sponsor logo, including relative sizing.',
          'Sub-brands: when a division gets its own lockup and when it does not.',
          'Merchandise and embroidery: the simplified variant and the minimum stitch size.',
          'Accessibility: which text and background combinations are permitted, with the contrast ratios stated.',
        ],
      },
      {
        h: 'Make it usable',
        p: [
          'A PDF nobody can find is not a governance system. Host the document somewhere permanent, put the logo files next to it, and give the link to every supplier at the start of a job rather than after they get it wrong. Where budget allows, a simple web page beats a PDF, because you can update it without reissuing anything.',
          'And supply templates. People go off-brand mostly because the on-brand option is harder to use, not out of defiance. A locked template for the documents each team actually makes prevents more inconsistency than any rulebook.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long should brand guidelines be?',
        a: 'Twelve to twenty pages for most businesses. Franchises, multi-brand organisations and anything with extensive physical applications need more, but length is a cost, not a virtue.',
      },
      {
        q: 'Who should get a copy?',
        a: 'Anyone who makes something with your name on it: staff, printers, sign-makers, agencies, freelancers, merchandise suppliers and partners. Send it before the job, not after.',
      },
      {
        q: 'How do we stop people ignoring them?',
        a: 'Templates and a named approver. Rules alone do not survive contact with a deadline; a ready-made on-brand option does.',
      },
    ],
    relatedServices: ['brand-guidelines', 'brand-identity-design', 'design-system', 'enterprise-branding'],
    relatedGuides: ['choosing-brand-colours', 'rebrand-or-refresh', 'font-pairing-guide'],
  },

  {
    slug: 'font-pairing-guide',
    category: 'branding',
    title: 'Font pairing and licensing: a practical guide',
    metaTitle: 'Font Pairing & Licensing Guide for Brands',
    metaDescription:
      'How to choose and pair typefaces for a brand, plus the font licensing rules that catch businesses out on web, apps and merchandise.',
    excerpt:
      'Two typefaces, chosen properly, do more for a brand than most logos. And the licensing question is the one that gets businesses into legal trouble.',
    published: '2026-03-25',
    updated: '2026-06-20',
    readMinutes: 7,
    keywords: 'font pairing, brand typography, font licensing, google fonts commercial use, typeface selection',
    sections: [
      {
        p: [
          'Typography carries more brand recognition than most businesses realise. If you removed the logo from your website, the type would still be doing most of the identifying. It is also where the licensing landmines are.',
        ],
      },
      {
        h: 'How many typefaces you need',
        p: [
          'Two. One for headings, one for body. A third is occasionally justified for a specific role — code, data tables, a display accent — but three general-purpose typefaces is almost always a sign that nobody decided.',
          'Many strong identities use a single typeface family across everything, relying on weight and size for hierarchy. This is the easiest system to keep consistent and the hardest to get wrong.',
        ],
      },
      {
        h: 'What makes a pair work',
        ul: [
          'Contrast in structure, harmony in proportion. A serif and a sans with similar x-heights pair naturally; two similar sans-serifs look like a mistake.',
          'A range of weights. If the body typeface has only regular and bold, you will run out of hierarchy quickly.',
          'Genuine legibility at small sizes. Test at 14px on a phone before deciding, not at 60px in a specimen.',
          'Language coverage. If you will ever publish in another language, check the character set covers it. This catches people out constantly with accented characters, Arabic and Cyrillic.',
          'Numerals. Check for tabular figures if you display prices or data. Proportional numerals in a table look broken.',
        ],
      },
      {
        h: 'Licensing, in plain terms',
        table: [
          ['Open licence (SIL OFL)', 'Free for commercial use including web, print, apps and merchandise. Google Fonts is almost entirely this. The safest option, and the quality is now genuinely competitive.'],
          ['Desktop licence', 'Lets you install the font and make artwork. Does NOT usually permit web embedding or bundling into an app. This is the most commonly violated licence.'],
          ['Web licence', 'Permits serving the font on your site, usually capped by monthly page views. Exceeding the cap is a breach.'],
          ['App licence', 'Required separately for bundling a font into a mobile or desktop application.'],
          ['Bundled fonts', 'Fonts that came with Adobe, Microsoft or Apple software are licensed for use within that software, generally not for redistribution or web serving.'],
        ],
      },
      {
        h: 'The logo exception',
        p: [
          'Once letters in a logo are converted to outlines, they are artwork rather than font software, and most commercial licences permit this. But check the specific licence: a minority explicitly restrict use in trademarks and logos. If your entire identity rests on a wordmark, this is worth reading before you file a trademark rather than after.',
        ],
      },
      {
        h: 'Practical recommendations',
        ol: [
          'For most businesses, choose from open-licensed families. The licensing risk is zero and the quality is high.',
          'Buy a commercial family when you need something genuinely distinctive and you understand which licences you need.',
          'Whatever you choose, record it in the brand guidelines with the licence type and where it is permitted.',
          'Audit what you are currently using. A surprising number of businesses are serving a desktop-licensed font on their website without realising.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I use Google Fonts commercially?',
        a: 'Yes. Nearly all are under the SIL Open Font License, which permits commercial use on web, in print, in apps and on products. You cannot sell the font files themselves.',
      },
      {
        q: 'Do I need a licence for a font in my logo?',
        a: 'You need a licence to create the artwork. Once outlined, the resulting logo is generally yours, but a small number of licences restrict trademark use, so check the specific terms.',
      },
      {
        q: 'What happens if we breach a font licence?',
        a: 'Foundries do enforce, typically starting with an invoice for the correct licence, sometimes with a penalty. It is an avoidable cost and an easy audit to run.',
      },
    ],
    relatedServices: ['typography-design', 'brand-guidelines', 'brand-identity-design', 'design-system'],
    relatedGuides: ['choosing-brand-colours', 'brand-guidelines-checklist', 'accessible-design-guide'],
  },

  {
    slug: 'website-cost-guide',
    category: 'web',
    title: 'What a website actually costs, and what drives the price',
    metaTitle: 'How Much Does a Website Cost? A Realistic Breakdown',
    metaDescription:
      'Real website cost ranges by type, the ongoing costs nobody quotes for, and the specification questions that change the price most.',
    excerpt:
      'Quotes for the same brief routinely vary tenfold. Here is what actually drives the number, and the ongoing costs that never appear in the proposal.',
    published: '2026-04-16',
    updated: '2026-07-28',
    readMinutes: 9,
    keywords: 'website cost, web design pricing, how much does a website cost, ecommerce website price',
    sections: [
      {
        p: [
          'Website quotes vary more than any other design purchase, because "a website" describes anything from a one-page template to a bespoke platform. The specification, not the supplier, explains most of the variance.',
        ],
      },
      {
        h: 'Typical ranges',
        table: [
          ['Landing page', '$350 – $1,500. One page, one goal, usually for a campaign.'],
          ['Small business site (5–10 pages)', '$700 – $4,000. Custom design, CMS, forms, basic SEO setup.'],
          ['Content site with blog and locations', '$3,000 – $12,000. Multiple templates, editorial workflow, structured data.'],
          ['E-commerce', '$1,000 – $25,000+. Driven by catalogue size, variant complexity, integrations and custom checkout logic.'],
          ['Web application or portal', '$10,000 – $100,000+. Genuinely software, priced as software.'],
        ],
      },
      {
        h: 'What drives the price up',
        ul: [
          'Number of distinct page templates, not number of pages. Fifty pages using three templates is cheap; six pages each needing its own design is not.',
          'Integrations. CRM, ERP, booking, payment, shipping, accounting. Each one is a project with its own edge cases.',
          'Custom functionality. Calculators, configurators, member areas, multi-step forms with conditional logic.',
          'Content. If you need copywriting, photography or migration of hundreds of existing pages, that is often the largest line item.',
          'Multi-language. Not double the cost, but substantially more — layouts have to accommodate text expansion, and right-to-left languages mirror the whole design.',
          'Accessibility conformance. Achievable and worth doing, but designing and testing to WCAG AA properly takes real time.',
        ],
      },
      {
        h: 'The ongoing costs nobody quotes',
        ul: [
          'Hosting: $10–$200 a month depending on traffic and platform.',
          'Domain: $10–$50 a year.',
          'SSL: usually free now, occasionally bundled and charged.',
          'CMS or platform fees: Shopify, Webflow and similar charge monthly, and it rises with sales volume.',
          'Plugins and apps: individually small, collectively significant, and the most common cause of a bloated store.',
          'Maintenance: updates, backups, security patching. Budget something even if you do it yourself.',
          'Content: someone has to write the blog posts, and that is the cost that most often goes unpaid and undone.',
        ],
      },
      {
        h: 'Questions that change the quote most',
        ol: [
          'Who writes the content? This single question moves quotes more than any other.',
          'How many templates, not pages?',
          'What has to talk to what? List every existing system.',
          'Who edits it afterwards, and how technical are they?',
          'Is there an existing site with URLs and rankings that must be preserved?',
          'What does success look like — enquiries, sales, bookings? A site with a defined goal is designed differently from one with a vague brief.',
        ],
      },
      {
        h: 'Where to spend and where not to',
        p: [
          'Spend on: speed, mobile experience, the conversion path, and content. These are the things that measurably change outcomes.',
          'Do not spend on: elaborate animation, a full-screen video header, a bespoke CMS when a standard one would do, or a custom design for a page that gets forty visits a year. The video header in particular is one of the most reliable ways to make a site slow and it almost never improves conversion.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a template site good enough?',
        a: 'Often yes, for a small business with standard needs. A well-chosen template customised properly beats a poorly executed custom build. The limits show when you need something the template did not anticipate.',
      },
      {
        q: 'Why do quotes differ by a factor of ten?',
        a: 'Usually because the briefs were interpreted differently. Ask each supplier what they assumed about content, integrations and template count, and the range typically collapses.',
      },
      {
        q: 'Should we pay monthly or own the site?',
        a: 'Owning is cheaper over three years and gives you portability. Monthly arrangements suit businesses that want no involvement at all, but check what happens to the site if you stop paying.',
      },
    ],
    relatedServices: ['wordpress-website-design', 'ecommerce-website-design', 'landing-page-design', 'website-redesign'],
    relatedGuides: ['website-redesign-seo', 'core-web-vitals-guide', 'ecommerce-conversion-checklist'],
  },

  {
    slug: 'website-redesign-seo',
    category: 'web',
    title: 'How to redesign a website without losing your rankings',
    metaTitle: 'Website Redesign Without Losing SEO: A Checklist',
    metaDescription:
      'The complete process for redesigning a site while preserving organic traffic: crawling, content decisions, redirect mapping and post-launch monitoring.',
    excerpt:
      'The classic redesign disaster is a beautiful new site that halves organic traffic. It is entirely preventable, and here is the sequence that prevents it.',
    published: '2026-05-07',
    updated: '2026-07-30',
    readMinutes: 8,
    keywords: 'website redesign seo, migration checklist, 301 redirects, preserve rankings redesign',
    sections: [
      {
        p: [
          'Traffic loss after a redesign is almost never caused by the design. It is caused by URLs changing without redirects, content being cut, or internal linking being flattened. All three are avoidable with a fortnight of preparation.',
        ],
      },
      {
        h: 'Before anything is designed',
        ol: [
          'Crawl the existing site and export every URL. Use a crawler, not your sitemap — sitemaps are routinely incomplete.',
          'Export landing page data from analytics for the last twelve months, and query data from Search Console.',
          'Export your backlink profile. Pages with external links are the ones that hurt most if broken.',
          'Combine these into one spreadsheet: URL, traffic, conversions, external links, current rankings.',
          'Make a keep, merge or retire decision for every URL, and record the destination for the ones you are not keeping.',
        ],
      },
      {
        h: 'Content decisions',
        p: [
          'Keep anything with traffic, conversions or external links, even if it is ugly. Merge thin overlapping pages into one stronger page and redirect the others to it. Retire only genuinely dead content, and even then redirect the URL to the most relevant surviving page rather than letting it 404.',
          'Resist the urge to cut page count for tidiness. "We reduced from 200 pages to 30" is a sentence that precedes a traffic collapse surprisingly often.',
        ],
      },
      {
        h: 'The redirect map',
        ul: [
          'Every changed URL needs a 301 to its closest equivalent. Not the homepage.',
          'Avoid redirect chains. Old A to old B to new C loses value; map A directly to C.',
          'Handle trailing slashes, uppercase variants and parameter versions consistently.',
          'Redirect old image URLs too if they earn image search traffic.',
          'Keep redirects live permanently. Removing them a year later reintroduces the problem.',
        ],
      },
      {
        h: 'Things that quietly break',
        ul: [
          'Title tags and meta descriptions replaced with template defaults.',
          'H1s removed because the new design uses an image for the headline.',
          'Structured data lost with the old templates.',
          'Internal links flattened when a navigation is simplified — this redistributes authority, sometimes badly.',
          'The staging site left indexable, competing with production. Check robots and noindex before launch, and remember to remove them at launch.',
          'Canonical tags pointing at the staging domain. This one is catastrophic and common.',
        ],
      },
      {
        h: 'Launch day and after',
        ol: [
          'Verify robots.txt is not blocking the site, and that noindex tags are removed.',
          'Submit the new sitemap in Search Console.',
          'Crawl the live site and check every redirect resolves in one hop with a 200 at the end.',
          'Watch Search Console coverage and Core Web Vitals daily for a fortnight.',
          'Expect a short dip. Two to four weeks of fluctuation is normal; a decline that is still deepening after six weeks means something is wrong.',
          'Keep the old analytics data accessible for comparison. Annotate the launch date.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should we launch all at once or in phases?',
        a: 'All at once for most sites. Phased launches create duplicate content and inconsistent internal linking, and they extend the risk window rather than reducing it.',
      },
      {
        q: 'How long until traffic recovers?',
        a: 'If URLs and content are preserved, often within two to four weeks. If the domain changed, budget two to three months. If traffic has not recovered by then, the cause is usually a redirect or indexing problem, not a waiting problem.',
      },
      {
        q: 'Do we need to keep the old design live anywhere?',
        a: 'No, but keep a full crawl export and a copy of the old templates. If something breaks, being able to see exactly what the old page contained saves days.',
      },
    ],
    relatedServices: ['website-redesign', 'seo-web-design', 'wordpress-website-design', 'conversion-optimisation'],
    relatedGuides: ['website-cost-guide', 'core-web-vitals-guide', 'rebrand-or-refresh'],
  },

  {
    slug: 'core-web-vitals-guide',
    category: 'web',
    title: 'Core Web Vitals: what actually makes a site fast',
    metaTitle: 'Core Web Vitals Guide: Making a Site Genuinely Fast',
    metaDescription:
      'What LCP, INP and CLS measure, what actually causes each to fail, and the fixes that make the largest difference in practice.',
    excerpt:
      'Three metrics, and most sites fail them for the same handful of reasons. Here is what each measures and what to actually do about it.',
    published: '2026-05-21',
    updated: '2026-07-25',
    readMinutes: 8,
    keywords: 'core web vitals, lcp inp cls, page speed optimisation, website performance',
    sections: [
      {
        p: [
          'Core Web Vitals matter for ranking, but they matter more because a slow site loses conversions regardless of where it ranks. Mobile users on a mediocre connection abandon fast, and they are usually most of your traffic.',
        ],
      },
      {
        h: 'The three metrics',
        table: [
          ['LCP — Largest Contentful Paint', 'How long until the biggest element in the viewport renders. Target under 2.5 seconds. Usually your hero image or headline.'],
          ['INP — Interaction to Next Paint', 'How quickly the page responds when someone taps or clicks. Target under 200 milliseconds. Replaced First Input Delay because FID only measured the first interaction.'],
          ['CLS — Cumulative Layout Shift', 'How much content jumps around while loading. Target under 0.1. Caused by elements loading without reserved space.'],
        ],
      },
      {
        h: 'Fixing LCP',
        ul: [
          'Serve the hero image in a modern format at the size actually displayed. Sending a 3000px image to a 400px slot is the single most common cause.',
          'Do not lazy-load the hero. Lazy loading below the fold is good; lazy loading the LCP element actively delays it.',
          'Preload the LCP image and the fonts used in the headline.',
          'Remove render-blocking CSS and JavaScript from the head. Inline the critical CSS if the framework allows.',
          'Check your server response time. If the HTML takes 800ms to arrive, no front-end work will save you.',
        ],
      },
      {
        h: 'Fixing INP',
        ul: [
          'Reduce JavaScript. This is almost always the answer. Audit third-party scripts — chat widgets, analytics, heat mapping, A/B testing and ad tags are the usual culprits.',
          'Break long tasks up so the main thread can respond between chunks.',
          'Defer anything not needed for the first interaction.',
          'Be sceptical of tag managers. They are a convenient way for scripts to accumulate without anyone owning the total cost.',
        ],
      },
      {
        h: 'Fixing CLS',
        ul: [
          'Set explicit width and height on every image and video so the browser reserves the space.',
          'Reserve space for ads, embeds and iframes, including when they fail to load.',
          'Avoid inserting banners, cookie notices or promotional bars above existing content after load.',
          'Use font-display: optional or swap with a metric-matched fallback so text does not reflow when the webfont arrives.',
        ],
      },
      {
        h: 'Measuring it properly',
        p: [
          'Lab tools like Lighthouse are useful for diagnosis but they are a simulation. What counts for ranking is field data — real users on real devices — which you can see in Search Console\'s Core Web Vitals report and in the Chrome UX Report. A perfect Lighthouse score with failing field data usually means your real users are on slower devices and connections than the test assumed.',
          'Test on a real mid-range Android phone on a throttled connection at least once. It is consistently sobering and it changes priorities.',
        ],
      },
      {
        h: 'The biggest wins, in order',
        ol: [
          'Cut third-party JavaScript. Nothing else comes close for most sites.',
          'Right-size and modernise images.',
          'Fix layout shift with explicit dimensions — cheap and immediate.',
          'Improve server response time or add caching.',
          'Reduce your own JavaScript bundle.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much do Core Web Vitals affect rankings?',
        a: 'They are a real but modest factor, and relevance still dominates. The stronger argument is commercial: measurable conversion loss from slow pages is well documented across e-commerce and lead generation.',
      },
      {
        q: 'Why is our WordPress site slow?',
        a: 'Almost always plugins and a page builder. Both add large amounts of CSS and JavaScript to every page. Audit what is installed and remove what is not earning its cost.',
      },
      {
        q: 'Does a faster host fix everything?',
        a: 'It fixes server response time, which is one input. If your page loads four megabytes of JavaScript, a better host makes it arrive faster and the page is still slow.',
      },
    ],
    relatedServices: ['seo-web-design', 'website-redesign', 'wordpress-website-design', 'shopify-store-design'],
    relatedGuides: ['website-redesign-seo', 'website-cost-guide', 'accessible-design-guide'],
  },

  {
    slug: 'ecommerce-conversion-checklist',
    category: 'web',
    title: 'The e-commerce conversion checklist',
    metaTitle: 'E-commerce Conversion Checklist: Fix the Leaks First',
    metaDescription:
      'A practical checklist of the product page, cart and checkout problems that cost online stores the most sales, in priority order.',
    excerpt:
      'Most stores lose money in the same three places. Work through these before redesigning anything.',
    published: '2026-06-04',
    updated: '2026-07-19',
    readMinutes: 8,
    keywords: 'ecommerce conversion rate, cart abandonment, product page optimisation, checkout design',
    sections: [
      {
        p: [
          'Store owners typically want to redesign the homepage. The homepage is rarely the problem. The money leaks at category filtering, on the product page and in the last steps of checkout, and those are all fixable without a redesign.',
        ],
      },
      {
        h: 'Category and search',
        ul: [
          'Filters that reflect how customers actually choose — size, price, use case — not how your database is structured.',
          'Filter results updating without a full page reload, and the selected filters visible and removable.',
          'A search that tolerates typos and returns something useful for a misspelling.',
          'An empty search result that offers alternatives rather than a dead end.',
          'Product cards showing price, a clear image, and any variant availability without requiring a click.',
        ],
      },
      {
        h: 'Product page',
        ul: [
          'Multiple images including scale reference. "How big is it actually" is the most common unanswered question in online retail.',
          'Shipping cost and delivery estimate shown here, not first revealed at checkout.',
          'Stock status visible before the customer commits attention.',
          'Variant selection that shows unavailable combinations rather than silently failing.',
          'Reviews, including the mediocre ones. A perfect five-star average reads as fake and converts worse than a 4.6.',
          'Returns policy summarised in a sentence near the buy button, not buried in a footer link.',
          'A specification block for anything technical. Buyers who need it will not buy without it.',
        ],
      },
      {
        h: 'Cart and checkout',
        ol: [
          'Guest checkout available and prominent. Forced account creation is the most reliably damaging pattern in e-commerce.',
          'Total cost including shipping and tax shown before the payment step. Surprise costs are the leading stated reason for abandonment.',
          'The fewest fields you can survive with. Every optional field is a cost.',
          'Address autocomplete, and a manual fallback for addresses it does not recognise.',
          'Payment methods your customers actually use, including the local and regional ones for markets you sell into.',
          'No mandatory phone number unless delivery genuinely requires it.',
          'Clear error messages inline, not a red banner at the top after a failed submission.',
          'Progress indication that is honest about how many steps remain.',
        ],
      },
      {
        h: 'Trust',
        ul: [
          'A real address and a phone number somewhere findable.',
          'Delivery times stated specifically. "Fast shipping" means nothing.',
          'Returns process explained in plain language with who pays for return postage stated.',
          'Security indicators at the payment step, but not so many that it starts to look defensive.',
        ],
      },
      {
        h: 'Mobile specifically',
        ul: [
          'Tap targets at least 44 pixels, with real spacing between them.',
          'The buy button reachable without scrolling past a wall of description.',
          'Numeric keyboards for numeric fields. This is a one-line fix that is missing constantly.',
          'Image zoom that works with a pinch.',
          'Test the whole checkout on an actual phone, on cellular data, with one hand. Most teams never do this.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is a good e-commerce conversion rate?',
        a: 'It varies enormously by category and price point. Comparing against your own trend is far more useful than against an industry average that mixes $5 impulse purchases with $5,000 considered ones.',
      },
      {
        q: 'Should we offer free shipping?',
        a: 'If the margin allows, usually yes, with the cost built into pricing. Shipping charged separately at checkout is consistently the largest single cause of abandonment.',
      },
      {
        q: 'Do abandoned cart emails work?',
        a: 'Yes, reliably, and they are cheap. But they recover a problem the checkout created. Fix the checkout first, then run the emails on top.',
      },
    ],
    relatedServices: ['ecommerce-website-design', 'shopify-store-design', 'conversion-optimisation', 'product-photography-editing'],
    relatedGuides: ['website-cost-guide', 'core-web-vitals-guide', 'amazon-listing-guide'],
  },

  {
    slug: 'design-brief-how-to-write',
    category: 'business',
    title: 'How to write a design brief that gets you what you want',
    metaTitle: 'How to Write a Design Brief (With Examples)',
    metaDescription:
      'What to include in a design brief, what to leave out, and how to give feedback that leads to a better result instead of a slower one.',
    excerpt:
      'The quality of a design brief predicts the quality of the outcome more reliably than the budget does. Here is how to write one, in plain language.',
    published: '2026-02-26',
    updated: '2026-06-16',
    readMinutes: 7,
    keywords: 'design brief template, how to brief a designer, creative brief, design feedback',
    sections: [
      {
        p: [
          'You do not need design vocabulary to write a good brief. You need to describe your business accurately and to be specific about constraints. Everything else is the designer\'s job.',
        ],
      },
      {
        h: 'What to include',
        ul: [
          'What the business actually does, in the words you would use to a stranger at a party.',
          'Who buys from you, and what they were doing five minutes before they needed you.',
          'Who your real competitors are — the ones you lose deals to, not the industry giants.',
          'Where the design will be used most. This is the single most useful piece of information and it is usually omitted.',
          'Anything that is fixed: existing colours, a name that cannot change, a regulatory requirement, a supplier\'s template.',
          'Things you actively dislike, with reasons. "Not blue, our two nearest competitors are both blue" is a genuinely useful constraint.',
          'The deadline, and what it is tied to.',
        ],
      },
      {
        h: 'What to leave out',
        ul: [
          'Solutions. "I want a circle with a mountain in it" replaces the designer\'s job with your first idea. Describe the problem instead.',
          'A long list of logos you like from other industries. Two or three with a note on what specifically appeals is more useful than twenty.',
          'Internal politics. Tell the designer who has final approval, not the history of the disagreement.',
          'Adjectives without anchors. "Modern but classic, bold but understated" describes nothing. Tie every adjective to something concrete.',
        ],
      },
      {
        h: 'Giving feedback that helps',
        p: [
          'The most useful feedback describes a reaction, not an instruction. "It feels too corporate for our customers, who are mostly families" tells a designer far more than "make it friendlier" and infinitely more than "make the logo bigger".',
          'Be specific about what is not working, and let the designer solve it. If you prescribe the fix you get your solution executed by someone more skilled, which is rarely the better outcome.',
        ],
      },
      {
        h: 'Consolidate feedback before sending it',
        p: [
          'Contradictory feedback from five people is the fastest way to a mediocre result, because the design ends up satisfying everyone slightly. Collect internal opinions, resolve the conflicts yourselves, and send one coherent response. Name one person with final approval before the work starts.',
        ],
      },
      {
        h: 'A brief that works, in six lines',
        ol: [
          'We are a [what you do] serving [who].',
          'People choose us over [competitors] because [reason].',
          'This design will mostly be seen on [where].',
          'It must work with [fixed constraints].',
          'We want to avoid [specific things, with reasons].',
          'We need it by [date], because [reason]. [Name] signs it off.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What if I genuinely do not know what I want?',
        a: 'That is the normal starting position and it is fine. Describe the business accurately and let the designer present directions to react to. Reacting to real options is much easier than imagining them.',
      },
      {
        q: 'How much detail is too much?',
        a: 'A brief should be a page. Longer briefs tend to contain more prescription, and prescription narrows the range of solutions before anyone has explored it.',
      },
      {
        q: 'Should I include a budget?',
        a: 'Yes. Withholding it wastes a round of proposals that are the wrong size. A range is fine, and it lets the designer scope appropriately rather than guessing.',
      },
    ],
    relatedServices: ['brand-identity-design', 'brand-strategy', 'creative-consulting', 'logo-redesign'],
    relatedGuides: ['how-much-does-a-logo-cost', 'what-makes-a-good-logo', 'ai-logo-generators-vs-designers'],
  },

  {
    slug: 'ai-logo-generators-vs-designers',
    category: 'business',
    title: 'AI logo generators vs designers: an honest comparison',
    metaTitle: 'AI Logo Generators vs Designers: Honest Comparison',
    metaDescription:
      'What AI logo tools do well, where they fall short, and the ownership and trademark problems that catch businesses out later.',
    excerpt:
      'AI logo tools are genuinely useful for some things and a liability for others. The deciding factor is usually ownership, not quality.',
    published: '2026-04-30',
    updated: '2026-07-27',
    readMinutes: 7,
    keywords: 'ai logo generator, ai vs designer, logo maker, ai design tools, logo copyright',
    sections: [
      {
        p: [
          'We use AI tools in our own process, so this is not a defensive piece. But the honest picture is more complicated than either "AI replaces designers" or "AI output is worthless".',
        ],
      },
      {
        h: 'What AI generators are genuinely good for',
        ul: [
          'Exploring directions quickly, before committing to any of them.',
          'Placeholder marks for a prototype, a pitch or an internal test.',
          'Side projects and personal work where nothing commercial rests on it.',
          'Generating variations once a direction is decided.',
          'Showing a designer roughly what territory you have in mind, faster than describing it.',
        ],
      },
      {
        h: 'Where they fall down',
        ul: [
          'Small-size legibility. Generated marks routinely contain detail that dissolves at favicon size, because the model optimises for how the image looks at generation resolution.',
          'Vector quality. Output is usually raster or auto-traced, and auto-traced vectors have wobbly curves and hundreds of stray points that show up in print.',
          'Typography. Letter spacing in generated wordmarks is frequently wrong in ways that are obvious to anyone trained and hard to articulate if you are not.',
          'Category awareness. The model does not know that four of your competitors already use that symbol.',
          'The system around the mark. A logo is not an identity, and the applications are where most of the value sits.',
        ],
      },
      {
        h: 'The ownership problem',
        p: [
          'This is the part that matters commercially. Copyright law in most jurisdictions requires human authorship, and purely machine-generated output generally cannot be registered. Several logo platforms also grant a licence rather than transferring ownership, and some retain the right to sell similar marks to others.',
          'The practical consequence: you may be unable to register a trademark, unable to stop a competitor using something near-identical, and unable to prove authorship if challenged. For a hobby project this is irrelevant. For a business that intends to build recognition — or that might one day be sold, where brand assets get audited in diligence — it is a genuine liability.',
        ],
      },
      {
        h: 'How to decide',
        table: [
          ['Use an AI generator', 'Side projects, internal tools, prototypes, exploration, anything where you will not be defending the mark.'],
          ['Use a designer', 'Anything customer-facing that you intend to keep, anything you may want to trademark, anything in a competitive category, anything that has to work across print and merchandise.'],
          ['Use both', 'Explore with AI to work out what you like, then have a designer draw the real thing properly. This is genuinely efficient and we do it ourselves.'],
        ],
      },
      {
        h: 'Questions to ask any logo platform',
        ol: [
          'Do I receive full copyright ownership, in writing, or a licence?',
          'Can the same or a similar mark be sold to someone else?',
          'Do I get true editable vector files, or an auto-trace?',
          'Was any human designer involved, and can that be evidenced for a trademark application?',
          'What happens if someone else claims the mark?',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I trademark an AI-generated logo?',
        a: 'It is difficult and jurisdiction-dependent. Trademark protects use in commerce and does not strictly require copyright ownership, but registries increasingly ask about authorship, and without copyright you have a much weaker position against copycats. Take legal advice before relying on it.',
      },
      {
        q: 'Do designers use AI?',
        a: 'Many do, for exploration, background removal, upscaling and production tasks. The difference is that the final artwork is drawn deliberately by a person, which is what makes it defensible.',
      },
      {
        q: 'Is a $20 AI logo better than a $50 designed one?',
        a: 'Usually not, once you account for vector quality, ownership and the ability to get variants later. The gap narrows on pure appearance and widens sharply on everything else.',
      },
    ],
    relatedServices: ['brand-identity-design', 'minimalist-logo-design', 'vector-tracing', 'logo-redesign'],
    relatedGuides: ['how-much-does-a-logo-cost', 'trademark-your-logo', 'what-makes-a-good-logo'],
  },

  {
    slug: 'trademark-your-logo',
    category: 'business',
    title: 'Trademarking a logo: what it protects and what it does not',
    metaTitle: 'How to Trademark a Logo: Process, Cost and Limits',
    metaDescription:
      'What a trademark actually protects, how registration works, what it costs, and the searches worth doing before you commit to a name.',
    excerpt:
      'Trademark protects your name in your category, not your artwork everywhere. Understanding that distinction saves a lot of money.',
    published: '2026-03-04',
    updated: '2026-06-25',
    readMinutes: 7,
    keywords: 'trademark logo, register trademark, uspto filing, brand protection, trademark classes',
    sections: [
      {
        p: [
          'Trademark and copyright are different things and both matter. Copyright protects the artwork itself and exists automatically once a human creates it. Trademark protects your use of a name or mark to identify goods and services in commerce, and it requires registration to be properly enforceable. This guide is general information, not legal advice.',
        ],
      },
      {
        h: 'What registration actually gives you',
        ul: [
          'A presumption of ownership in your registered classes and territory.',
          'The right to stop others using a confusingly similar mark on similar goods or services.',
          'A basis for takedowns on marketplaces, app stores and social platforms — this is often the most-used practical benefit.',
          'An asset that appears on a balance sheet and in acquisition diligence.',
          'The ® symbol, which is legally restricted to registered marks.',
        ],
      },
      {
        h: 'What it does not give you',
        ul: [
          'Protection in other countries. Trademarks are territorial. A US registration does not cover the UK, the EU or the UAE.',
          'Protection in classes you did not register. A registration for software does not stop someone using the name on clothing.',
          'Protection of a generic or purely descriptive term. "Fast Plumbing" for a plumbing business is very difficult to register.',
          'Automatic enforcement. Registries do not police infringement; you have to notice and act.',
        ],
      },
      {
        h: 'Before you commit to a name',
        ol: [
          'Search the relevant registry directly for identical and similar marks in your classes.',
          'Search the general web and marketplaces for unregistered use — common law rights exist in some jurisdictions.',
          'Check domain and social handle availability at the same time. Discovering the domain is taken after you have printed signage is expensive.',
          'Consider phonetic and visual similarity, not just exact spelling. Registries assess likelihood of confusion, which is broader than a string match.',
          'Get a professional clearance search if the name is core to a substantial business.',
        ],
      },
      {
        h: 'Word mark or logo mark?',
        p: [
          'A word mark protects the name in any typeface and is usually the stronger and more flexible protection. A logo mark protects the specific design, which means a redesign can weaken it. If budget allows only one, most advisers recommend the word mark. Businesses whose recognition rests heavily on a symbol often register both.',
        ],
      },
      {
        h: 'Rough costs and timescales',
        table: [
          ['Government filing fee (US)', 'Several hundred dollars per class. Multiple classes multiply the fee.'],
          ['Professional preparation', 'Varies. Ours is $299 per class on top of the government fee, including the search.'],
          ['Time to registration', 'Typically eight to eighteen months in most jurisdictions, longer if there is an objection.'],
          ['Renewal', 'Periodic, usually every ten years, with proof of continued use required.'],
        ],
      },
      {
        h: 'Common mistakes',
        ul: [
          'Filing in one class when the business genuinely operates across several.',
          'Registering the logo as it currently stands, then redesigning it a year later.',
          'Assuming a company registration or a domain gives trademark rights. It does not.',
          'Waiting until someone copies you. Registration takes months, and priority generally runs from the filing date.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I need a trademark if I own the copyright?',
        a: 'They protect different things. Copyright stops someone reproducing your artwork; trademark stops a competitor trading under a confusingly similar name in your market. Most businesses want both.',
      },
      {
        q: 'Can I use ™ without registering?',
        a: 'Yes, in most jurisdictions ™ simply asserts a claim and requires no registration. ® is restricted to registered marks and using it without registration can be an offence.',
      },
      {
        q: 'How many classes should I register?',
        a: 'The ones you trade in now plus any you have concrete plans for. Speculative classes add cost and can be challenged for non-use.',
      },
    ],
    relatedServices: ['brand-identity-design', 'brand-strategy', 'logo-redesign', 'rebranding-services'],
    relatedGuides: ['ai-logo-generators-vs-designers', 'how-much-does-a-logo-cost', 'rebrand-or-refresh'],
  },

  {
    slug: 'packaging-design-guide',
    category: 'print',
    title: 'Packaging design: a practical production guide',
    metaTitle: 'Packaging Design Guide: Dielines, Print and Compliance',
    metaDescription:
      'How packaging design actually works: dielines, print methods, colour matching, compliance panels and the mistakes that cause reprints.',
    excerpt:
      'Packaging is where design meets manufacturing, and the manufacturing side is what causes expensive reprints. Here is the process that avoids them.',
    published: '2026-05-14',
    updated: '2026-07-08',
    readMinutes: 8,
    keywords: 'packaging design guide, dieline, print methods packaging, product packaging production',
    sections: [
      {
        p: [
          'Packaging has the highest cost of error in graphic design. A mistake on a website is fixed in five minutes; a mistake on fifty thousand printed cartons is fifty thousand cartons.',
        ],
      },
      {
        h: 'Start with the dieline',
        p: [
          'The dieline is the flat cutting and folding template, supplied by whoever manufactures the pack. Nothing should be designed before it exists, because panel dimensions, glue flaps, tuck tabs and the areas hidden by folding all determine where artwork can go.',
          'Ask the manufacturer for the dieline as a vector file with the cut, crease and bleed lines on separate named layers. Designing on a dieline you drew yourself from measurements is the most common cause of a reprint.',
        ],
      },
      {
        h: 'The three jobs of a pack',
        ol: [
          'Get noticed at two metres. This is about the block of colour, the shape and the silhouette — not the copy.',
          'Explain itself at arm\'s length. What it is, what variant, what quantity, in that order.',
          'Satisfy the back-of-pack requirements. Ingredients, warnings, weight, barcode, batch and date coding, recycling marks.',
        ],
      },
      {
        h: 'Print methods',
        table: [
          ['Digital', 'Low set-up cost, viable for short runs and variable data. Colour consistency across runs is less reliable.'],
          ['Litho', 'Excellent quality, high set-up cost, economical at volume. The standard for cartons.'],
          ['Flexo', 'Common for labels and flexible packaging. Handles fine detail less well; avoid hairlines and small reversed type.'],
          ['Gravure', 'Very high quality at very high volume. Cylinder costs make it viable only for large runs.'],
          ['Screen', 'Used for bottles and containers. Limited colours, heavy ink lay-down, strong on solid areas.'],
        ],
      },
      {
        h: 'Colour, realistically',
        p: [
          'Specify Pantone for any colour that has to match across suppliers, and expect the printed result to differ from your screen. Ask for a physical proof on the actual substrate — the same ink on uncoated board, coated board and a metallised film will look like three different colours.',
          'Where a brand colour sits outside the CMYK gamut, either accept a duller printed version or pay for a spot colour. Deciding this before design rather than after avoids an unpleasant conversation at proof stage.',
        ],
      },
      {
        h: 'Things that cause reprints',
        ul: [
          'Barcodes too small, printed on a dark background, or with the quiet zone violated. Test-scan the proof.',
          'Text too close to the trim or across a fold.',
          'Compliance information below the legally required minimum size.',
          'Fine reversed-out type in flexo, which fills in and becomes illegible.',
          'Artwork built on the wrong dieline version. Version control the dieline explicitly.',
          'Missing or incorrect batch and date-code space, discovered at the packing line.',
        ],
      },
      {
        h: 'Sustainability without greenwash',
        p: [
          'Claims on packaging are increasingly regulated. Vague terms like "eco-friendly" and "green" attract scrutiny in several jurisdictions. If you make a claim, make it specific and verifiable — a stated percentage of recycled content, a named certification, a defined recyclability instruction. Design decisions matter too: mixed materials and full-coverage laminates make packs harder to recycle regardless of what the label says.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does packaging design take?',
        a: 'Three to six weeks for design, plus manufacturer proofing which typically adds two to four. Regulatory review, if your category requires it, sits on top.',
      },
      {
        q: 'Do we need a 3D render?',
        a: 'Almost always, and early. Listings, sales presentations and pre-orders all need pack imagery months before physical stock exists.',
      },
      {
        q: 'Can we change the pack after launch?',
        a: 'Yes, but existing stock is the constraint. Plan changes around reorder points, and where possible make variable information a separate print element from the main artwork.',
      },
    ],
    relatedServices: ['packaging-design', 'label-design', 'catalog-design', 'amazon-listing-design'],
    relatedGuides: ['print-production-guide', 'logo-file-formats-explained', 'amazon-listing-guide'],
  },

  {
    slug: 'print-production-guide',
    category: 'print',
    title: 'Print production: bleed, resolution and getting it right first time',
    metaTitle: 'Print Production Guide: Bleed, Resolution & CMYK',
    metaDescription:
      'The technical basics of print-ready artwork: bleed, safe areas, resolution, colour mode and the file setup printers actually want.',
    excerpt:
      'Most print jobs get rejected for the same five reasons. All five are avoidable in about ten minutes of file setup.',
    published: '2026-06-18',
    updated: '2026-07-21',
    readMinutes: 6,
    keywords: 'print ready artwork, bleed and trim, print resolution, cmyk conversion, prepress',
    sections: [
      {
        p: [
          'Printers reject files constantly, almost always for the same handful of reasons. Understanding them will save you days of back and forth even if you never open a design application.',
        ],
      },
      {
        h: 'Bleed, trim and safe area',
        p: [
          'Printing happens on oversized sheets that are then cut down, and cutting has a tolerance of a millimetre or two. Bleed is artwork extended beyond the final size — usually 3mm or 0.125in — so a slight cutting error shows more artwork rather than a white sliver. The safe area is the inset margin where important content should stay, for the same reason in the other direction.',
          'A design with a coloured background and no bleed will come back with white edges on some copies. This is the most common print error there is.',
        ],
      },
      {
        h: 'Resolution',
        ul: [
          'Standard print: 300 dpi at final size. A 100mm wide image needs roughly 1200 pixels.',
          'Large format viewed at distance: 100 to 150 dpi at final size is usually fine, and full resolution would produce an unmanageable file.',
          'Vector artwork has no resolution and scales infinitely. Logos and type should always be vector.',
          'Upscaling does not add detail. A 72 dpi web image cannot be made print-ready by changing the number in a dialogue box.',
        ],
      },
      {
        h: 'Colour mode',
        p: [
          'Convert to CMYK before sending, or agree with the printer that they will convert. Letting the RIP convert unexpectedly is how bright colours turn muddy without warning. For rich blacks in large areas, use a build rather than 100% K alone — most printers specify their preferred mix, so ask.',
          'Use spot colours only where you have agreed to pay for them. A stray spot colour in a file quoted as four-colour causes either a rejection or a surprise invoice.',
        ],
      },
      {
        h: 'Fonts and transparency',
        ul: [
          'Convert type to outlines, or embed the fonts. Otherwise your typeface may be silently substituted.',
          'Flatten transparency if the printer asks for it. Some older workflows handle it unpredictably.',
          'Keep a live editable version for yourself before outlining. Outlined type cannot be edited.',
        ],
      },
      {
        h: 'What to send',
        ol: [
          'A print-ready PDF, generated with the printer\'s preset if they supply one.',
          'Bleed included and crop marks on.',
          'CMYK, with spot colours only where intended.',
          'Fonts outlined or embedded.',
          'Images at correct resolution and linked or embedded properly.',
          'A clearly named file. "final_final_v3_USE_THIS.pdf" causes genuine errors in production.',
        ],
      },
      {
        h: 'Ask for a proof',
        p: [
          'For anything above a small run, ask for a proof and check it properly: text accuracy, colour, position, and crucially the trim. A digital proof catches content errors; a printed proof on the actual stock catches colour and finish surprises. The cost of a proof is trivial against a reprint.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much bleed do I need?',
        a: '3mm is standard in most of the world, 0.125in in the US. Large format and some binding methods need more, so ask the printer rather than assuming.',
      },
      {
        q: 'Can a printer fix my file?',
        a: 'Many will, for a prepress fee, and they will make judgement calls about your artwork that you might not agree with. Supplying it correctly is cheaper and safer.',
      },
      {
        q: 'Why does my print look different from my screen?',
        a: 'Screens emit light and cover a wider colour range than ink reflects. Some vivid colours simply cannot be reproduced in CMYK. A calibrated screen narrows the gap; a printed proof settles it.',
      },
    ],
    relatedServices: ['business-card-design', 'brochure-design', 'poster-design', 'packaging-design'],
    relatedGuides: ['logo-file-formats-explained', 'packaging-design-guide', 'choosing-brand-colours'],
  },

  {
    slug: 'social-media-image-sizes',
    category: 'web',
    title: 'Social media image sizes and safe areas',
    metaTitle: 'Social Media Image Sizes & Safe Area Guide',
    metaDescription:
      'Current image dimensions and safe areas for every major social platform, plus why designing to the safe area matters more than the exact pixel size.',
    excerpt:
      'Platforms change dimensions constantly, but the safe-area principle does not. Here is what to design to, and why exact pixels matter less than you think.',
    published: '2026-06-25',
    updated: '2026-07-31',
    readMinutes: 6,
    keywords: 'social media image sizes, profile picture size, cover photo dimensions, safe area social',
    sections: [
      {
        p: [
          'Published dimension charts go out of date within months. What does not change is the underlying principle: every platform crops your image differently depending on where it appears, so design to the region that is always visible rather than to the canvas.',
        ],
      },
      {
        h: 'The safe-area principle',
        p: [
          'A YouTube banner is displayed at one size on a television, another on desktop and a third on a phone, cropping progressively tighter. Only the central region survives all three. The same logic applies to Facebook covers overlapped by a profile picture, LinkedIn banners cropped on mobile, and Instagram feed previews that show a square crop of a portrait post.',
          'Design the essential content — name, offer, face — into the guaranteed centre. Treat everything outside it as decoration that may be cut.',
        ],
      },
      {
        h: 'Current working sizes',
        table: [
          ['Profile picture (all platforms)', '1000 × 1000 minimum, square. Assume a circular crop, so keep content away from the corners.'],
          ['Instagram feed', '1080 × 1350 portrait is the largest feed footprint. Keep key content inside the central square for grid preview.'],
          ['Stories and Reels', '1080 × 1920. Keep text out of the top and bottom 250 pixels where the interface sits.'],
          ['Facebook cover', '1200 × 630 works across placements; expect the lower left to be overlapped on desktop.'],
          ['LinkedIn banner', '1584 × 396, with the left portion overlapped by the profile photo on desktop.'],
          ['YouTube banner', '2560 × 1440 canvas with a 1546 × 423 central safe area. Only the safe area is guaranteed visible.'],
          ['YouTube thumbnail', '1280 × 720, under 2 MB. Design and check it at 210 pixels wide, which is closer to how it is seen.'],
          ['X / Twitter post image', '1200 × 675 for landscape. Avoid critical content at the very edges.'],
          ['Open Graph link preview', '1200 × 630. This is what appears when your page is shared anywhere.'],
        ],
      },
      {
        h: 'Practical rules that outlive the specs',
        ul: [
          'Design one master at the largest ratio and crop down, rather than designing each size separately.',
          'Check every crop before publishing, on an actual phone as well as desktop.',
          'Keep text large. Feed images are viewed at a fraction of their exported size.',
          'Do not put essential information in a corner. Every platform crops corners somewhere.',
          'Export at the platform size rather than uploading oversized files — platform compression is harsher on larger uploads.',
          'For anything with text, check legibility at 25% zoom. If it fails there it fails in the feed.',
        ],
      },
      {
        h: 'Do not forget Open Graph',
        p: [
          'The image that appears when someone shares your page on any platform comes from your Open Graph tags, not from the page content. A site without them shows a random image or none at all, which measurably reduces click-through on shared links. Set a 1200 × 630 image, a title and a description on every page, and test with each platform\'s debugging tool — they cache aggressively, and a fix often needs a manual re-scrape.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does my banner look wrong on mobile?',
        a: 'Because the platform crops it more tightly than on desktop. Only the central safe area is guaranteed, so anything essential has to live inside it.',
      },
      {
        q: 'Does image quality affect reach?',
        a: 'Not directly, but blurry or badly cropped images reduce engagement, and engagement is what drives distribution. The effect is indirect and real.',
      },
      {
        q: 'Should we make a separate image for every platform?',
        a: 'Design one master and crop to each. Fully separate designs are rarely worth the time except where a platform has an unusual constraint, such as YouTube\'s multi-device banner.',
      },
    ],
    relatedServices: ['social-media-design', 'instagram-post-design', 'youtube-thumbnail-design', 'youtube-channel-design'],
    relatedGuides: ['accessible-design-guide', 'core-web-vitals-guide', 'print-production-guide'],
  },

  {
    slug: 'accessible-design-guide',
    category: 'web',
    title: 'Accessible design: the practical requirements',
    metaTitle: 'Accessible Design Guide: WCAG in Practice',
    metaDescription:
      'What accessible design actually requires in practice: contrast, keyboard operation, focus, alt text, forms and the checks worth running.',
    excerpt:
      'Accessibility is a legal requirement in most markets and a usability win in all of them. These are the requirements that matter most in practice.',
    published: '2026-07-09',
    updated: '2026-07-29',
    readMinutes: 7,
    keywords: 'accessible design, wcag 2.2, colour contrast, keyboard navigation, alt text',
    sections: [
      {
        p: [
          'Accessible design is not a separate category of design. It is design that works for people using a keyboard, a screen reader, a magnifier, a phone in bright sunlight, or an old device on a bad connection — which is a lot more people than most teams assume.',
        ],
      },
      {
        h: 'Colour and contrast',
        ul: [
          'Body text: at least 4.5:1 against its background.',
          'Large text (24px, or 19px bold): at least 3:1.',
          'Interface components and meaningful graphics: at least 3:1 against adjacent colours.',
          'Never use colour as the only way information is conveyed. Required form fields marked only in red fail for a substantial number of users.',
          'Check link text against surrounding body text, not just against the background — links distinguished only by colour need a 3:1 difference or another cue such as an underline.',
        ],
      },
      {
        h: 'Keyboard operation',
        p: [
          'Every interactive element must be reachable and operable with a keyboard alone, in a logical order, with a clearly visible focus indicator. Removing focus outlines because they look untidy is the single most damaging accessibility decision made in web design, and it happens constantly.',
          'Test it yourself: put the mouse away and try to complete your main conversion flow using only Tab, Shift-Tab, Enter and Space. Most teams discover something broken within thirty seconds.',
        ],
      },
      {
        h: 'Images and media',
        ul: [
          'Alt text describes the function of the image in context. A product photo needs the product name; a decorative flourish needs an empty alt attribute so screen readers skip it.',
          'Do not begin alt text with "image of". The screen reader already announces that it is an image.',
          'Text inside images is invisible to screen readers and to search engines, and it cannot be resized. Use real text over a background instead.',
          'Video needs captions. Audio-only content needs a transcript.',
          'Nothing should auto-play with sound, and anything that moves for more than five seconds needs a pause control.',
        ],
      },
      {
        h: 'Forms',
        ul: [
          'Every input needs a visible label, programmatically associated with it. Placeholder text is not a label — it disappears when typing starts.',
          'Errors must be described in text, adjacent to the field, and announced to assistive technology.',
          'Do not rely on colour alone to indicate an error state.',
          'Group related fields with fieldsets and legends. Radio buttons without a group label are ambiguous when read aloud.',
          'Give inputs the correct type and autocomplete attributes. It helps everyone and it is one line of markup.',
        ],
      },
      {
        h: 'Structure',
        ul: [
          'One h1 per page, then a heading hierarchy that does not skip levels. Screen reader users navigate by headings more than any other method.',
          'Use real semantic elements — buttons, links, lists, landmarks — rather than styled divs with click handlers.',
          'A link should navigate; a button should act. Swapping them breaks keyboard and screen reader expectations.',
          'Provide a skip link to the main content so keyboard users are not forced through the whole navigation on every page.',
          'Set the page language attribute, and mark any passage in a different language inline.',
        ],
      },
      {
        h: 'How to check',
        ol: [
          'Run an automated tool. It catches perhaps a third of issues, which is a useful third.',
          'Navigate the site by keyboard only.',
          'Zoom to 200% and confirm nothing is cut off or overlapping.',
          'Turn on a screen reader and attempt one real task. It is uncomfortable the first time and extremely informative.',
          'Check contrast on every text and background pairing in the design system, once, at design time.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is accessibility legally required?',
        a: 'In many jurisdictions yes, for public sector bodies and increasingly for private businesses. Litigation over inaccessible websites is now common in several markets, and the remediation cost far exceeds building it correctly.',
      },
      {
        q: 'Does accessible design mean ugly design?',
        a: 'No. It constrains contrast, focus visibility and semantics, none of which prevent good design. Most accessibility failures come from carelessness rather than from an aesthetic trade-off.',
      },
      {
        q: 'Can an overlay widget make our site accessible?',
        a: 'No. Accessibility overlays are widely criticised by disabled users and disability organisations, they frequently interfere with assistive technology, and they have not prevented litigation. Fix the underlying markup instead.',
      },
    ],
    relatedServices: ['seo-web-design', 'ui-ux-design', 'design-system', 'wordpress-website-design'],
    relatedGuides: ['choosing-brand-colours', 'core-web-vitals-guide', 'website-redesign-seo'],
  },

  {
    slug: 'amazon-listing-guide',
    category: 'business',
    title: 'Amazon listing images: what actually sells',
    metaTitle: 'Amazon Listing Image Guide: Rules and What Converts',
    metaDescription:
      'Amazon image requirements, what belongs in each carousel slot, and how A+ content and the main image rules affect conversion.',
    excerpt:
      'Most Amazon shoppers never read the bullets. The image carousel does the selling, and there is a well-established order that works.',
    published: '2026-07-02',
    updated: '2026-07-26',
    readMinutes: 7,
    keywords: 'amazon listing images, a+ content, amazon main image rules, product listing optimisation',
    sections: [
      {
        p: [
          'On Amazon, buyers swipe the images and decide. Bullets and description matter for indexing and for the minority who read them, but the carousel is where conversion is won or lost.',
        ],
      },
      {
        h: 'The main image rules',
        ul: [
          'Pure white background (RGB 255, 255, 255).',
          'The product should fill roughly 85% of the frame.',
          'No text, no logos, no badges, no borders, no watermarks.',
          'No props or accessories that are not included in the purchase.',
          'At least 1000 pixels on the longest side so zoom is enabled — 1600 or more is better.',
        ],
        p: [
          'These rules are enforced, and violations risk suppression, which removes the listing from search entirely. Keep the hero compliant and put all the selling into images two onward.',
        ],
      },
      {
        h: 'A carousel order that works',
        ol: [
          'Compliant hero on white.',
          'Primary benefit as an infographic — the single reason someone buys.',
          'Dimensions and scale, with a familiar object or measurements. This answers the most common pre-purchase question.',
          'What is in the box, laid out and labelled.',
          'Lifestyle image showing the product in use by the intended customer.',
          'Comparison or differentiator against the obvious alternative.',
          'Objection handler — durability, compatibility, care, warranty, whatever the reviews of your competitors complain about.',
          'Video where available. It occupies a prominent slot and lifts conversion measurably.',
        ],
      },
      {
        h: 'Design for mobile first',
        p: [
          'The clear majority of Amazon traffic is mobile, where images display small and text on infographics is frequently unreadable. Use a handful of words at large size per image. If you have to zoom to read it on a phone, it is not doing its job.',
        ],
      },
      {
        h: 'A+ content',
        p: [
          'Available to brand-registered sellers, A+ content replaces the plain text description with designed modules. It reliably lifts conversion and reduces returns by setting expectations accurately. It is not indexed for keyword search the way the title and bullets are, so treat it as a conversion tool rather than a ranking one.',
          'The most effective modules are comparison charts across your own range, which increase basket size, and detailed specification tables that pre-empt returns.',
        ],
      },
      {
        h: 'Common mistakes',
        ul: [
          'Seven images that all show the same angle on white.',
          'Text too small to read on a phone.',
          'Badges and claims on the main image, risking suppression.',
          'No scale reference anywhere, which drives both hesitation and returns.',
          'Lifestyle imagery featuring a customer who is obviously not your buyer.',
          'Reusing packaging artwork as a listing image. Different medium, different job.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How many images should a listing have?',
        a: 'Use every slot available, typically seven plus video. Each should make a distinct point rather than repeating the last.',
      },
      {
        q: 'Do listing images affect ranking?',
        a: 'Indirectly and strongly. Amazon\'s ranking responds heavily to conversion rate, and images are the main driver of conversion, so better images improve position without being a direct ranking input.',
      },
      {
        q: 'Is A+ content worth the cost?',
        a: 'For brand-registered sellers with meaningful volume, generally yes. The lift in conversion and the reduction in returns usually cover it quickly.',
      },
    ],
    relatedServices: ['amazon-listing-design', 'product-photography-editing', 'packaging-design', 'ecommerce-website-design'],
    relatedGuides: ['ecommerce-conversion-checklist', 'packaging-design-guide', 'social-media-image-sizes'],
  },
]

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g]))

export function guidesInCategory(id) {
  return guides.filter((g) => g.category === id)
}
