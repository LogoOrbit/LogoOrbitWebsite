/**
 * The people, given pages of their own.
 *
 * Until now the named people on this site existed only as cards: two sales
 * reps in a grid and a lawyer in a panel. A card cannot answer the questions
 * somebody actually has before they write to a stranger — what does this
 * person decide, what will they ask me, how fast do they reply — so each
 * one now gets a page that does.
 *
 * The roster is deliberately short. It lists the people a client is put
 * through to by name, not an invented org chart. The studio desks that work
 * as teams rather than as named contacts are described on the hub page
 * instead, honestly, as desks.
 *
 * `sections` uses the same block shape as lib/guides.js so ArticleBody can
 * render both: `h` for a heading, `p` for paragraphs, `ul`, `ol`, `table`.
 */

export const team = [
  {
    slug: 'brock-wilson',
    name: 'Brock Wilson',
    role: 'Brand & Identity Sales',
    desk: 'Logo, brand kits and print',
    email: 'brock@logoorbit.net',
    icon: 'logo',
    initials: 'BW',
    accent: '#2563eb',
    tagline: 'Quotes logo, brand identity and print work, and will tell you when the cheaper package is the right one.',
    metaTitle: 'Brock Wilson — Brand & Identity Sales',
    metaDescription:
      'Brock Wilson quotes logo design, brand identity and print projects at LogoOrbit. What he handles, what he will ask you, and how to reach him directly.',
    summary:
      'Brock takes new logo, brand identity and print enquiries from the first question through to a fixed price. If your project is a mark, a stationery set, packaging or a full identity system, he is the person who scopes it and prices it.',
    responsibilities: [
      'Scoping logo and brand identity projects, and saying which package actually covers them',
      'Fixed quotes for print work: cards, stationery, packaging, signage and vehicle livery',
      'Bundle advice, including when a bundle is worse value than two separate items',
      'Deadline commitments before you pay, so a launch date is agreed rather than hoped for',
      'Handing a signed job to the studio with a brief the designers can start from',
    ],
    handoff:
      'Once a job is paid, Brock hands it to the design desk and support takes over the day-to-day. He stays reachable if the scope changes or you want to add to it.',
    respondsIn: 'Same working day, usually within a couple of hours',
    coverage: 'Mon to Fri, 11 AM to 8 PM (US Central)',
    sections: [
      {
        h: 'What Brock actually does here',
        p: [
          'Most design studios put a form between you and a price. The form goes to a shared inbox, somebody triages it, and two days later a generic proposal arrives that does not quite describe your project. Brock exists so that does not happen on brand and print work. He reads the enquiry himself, and if something in it is unclear he asks rather than guessing high.',
          'His job is to turn a description of a business into a scope, a timeline and one number. Not a range, not an estimate that moves once the work starts. If the brief later grows — another concept direction, a second language on the packaging, a signage set nobody mentioned — he re-quotes the addition on its own rather than quietly inflating the original.',
        ],
      },
      {
        h: 'What he will ask you',
        p: [
          'You do not need to arrive with a design vocabulary. The questions are about the business, and there are only ever a handful of them.',
        ],
        ol: [
          'What does the business sell, and who buys it? This decides more about a mark than any stylistic preference.',
          'Where will the logo have to work? A food truck, an embroidered polo and a favicon are three different constraints.',
          'Is there a name and is it settled? A mark drawn around a name that changes next month is money spent twice.',
          'What do you already have, and what is wrong with it? A redraw and a redesign are different jobs at different prices.',
          'When do you need it? If there is a launch, an opening or a trade show, that sets the queue position.',
        ],
      },
      {
        h: 'When he will talk you out of spending more',
        p: [
          'A sales rep paid on volume has an obvious incentive to sell the biggest package on the page. The reason we publish full package contents and prices is so that conversation stays honest: if the Platinum logo covers your project and the Diamond tier does not add anything you will use, Brock will say so, and the page you are reading backs him up.',
          'The most common example is the bundle. Bundles save real money when you genuinely want every component. If you want a logo and nothing else for the next year, buying the three-in-one to "have it ready" is worse value than buying the logo now and the website when you need it, because the website spec will have moved on by then anyway.',
        ],
      },
      {
        h: 'How to get a useful answer fastest',
        ul: [
          'Two or three sentences about the business beats a blank "how much for a logo". Price follows scope, and scope follows what you sell.',
          'Say the deadline out loud, including the soft ones. A trade show in five weeks changes the recommendation.',
          'Send anything you already have — a sketch, a competitor you admire, a photo of the old sign. Rough is fine, and useful.',
          'If you have a budget ceiling, say it. It saves a round trip and nobody here will spend to the ceiling for the sake of it.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I have to go through Brock to order?',
        a: 'No. Every package on the pricing pages can be ordered directly, and the brief form reaches the studio without a sales step. Writing to Brock is for when you want a scope and a fixed price before committing, or when the job does not match a listed package.',
      },
      {
        q: 'Is a quote free, and does it commit me to anything?',
        a: 'It is free and it commits you to nothing. No card is taken to produce a quote, and a quote that sits unanswered gets one follow-up, not a sequence of them.',
      },
      {
        q: 'What if my project is a website or a video rather than a logo?',
        a: 'Write to Sam Marcus instead — websites, apps, video, YouTube and Amazon work sit on his desk. If you send it to the wrong one of them, they pass it across the same day rather than making you resend it.',
      },
      {
        q: 'Can I speak to him rather than write?',
        a: 'Yes. Call the number in the header during opening hours and ask for the brand desk, or say in your email that you would rather talk and give a window that suits you.',
      },
    ],
    related: [
      { name: 'Logo design', href: '/logo-design' },
      { name: 'Brand identity design', href: '/services/brand-identity-design' },
      { name: 'Pricing and packages', href: '/pricing' },
      { name: 'Send a brief', href: '/brief' },
    ],
  },

  {
    slug: 'sam-marcus',
    name: 'Sam Marcus',
    role: 'Digital & Growth Sales',
    desk: 'Websites, apps, video and Amazon',
    email: 'sam@logoorbit.net',
    icon: 'website',
    initials: 'SM',
    accent: '#0ea5e9',
    tagline: 'Quotes websites, apps, video and Amazon work, and scopes the parts people forget to ask about.',
    metaTitle: 'Sam Marcus — Digital & Growth Sales',
    metaDescription:
      'Sam Marcus quotes website, mobile app, video, YouTube and Amazon projects at LogoOrbit. What he handles, what he will ask, and how to reach him directly.',
    summary:
      'Sam handles everything that runs rather than prints: websites and online shops, mobile applications, video and YouTube production, and Amazon listing and advertising work. He scopes the project, prices it and agrees the delivery dates before anything is paid.',
    responsibilities: [
      'Fixed quotes for websites, online shops and the hosting and maintenance around them',
      'Mobile app scoping across iOS and Android, including what goes in version one and what waits',
      'Video, YouTube and animation packages, including footage volumes and turnaround',
      'Amazon listing, A+ content and advertising retainers',
      'Flagging the recurring costs — domains, hosting, store platforms, app store fees — before you commit',
    ],
    handoff:
      'After the deposit clears, the build team picks it up and support runs the updates. Sam re-quotes anything added later so the original price never moves under you.',
    respondsIn: 'Same working day, usually within a couple of hours',
    coverage: 'Mon to Fri, 11 AM to 8 PM (US Central)',
    sections: [
      {
        h: 'What Sam actually does here',
        p: [
          'Digital projects go wrong in a specific way: everybody agrees on the visible part and nobody agrees on the rest. The site looked great in the mockup, then it turned out nobody had scoped who writes the copy, who supplies the photography, where the domain lives, what the store platform charges per transaction, or what happens the first time a plugin breaks. Sam’s job is to have that argument at the quote stage, where it is free.',
          'So a quote from him lists what is built, what is configured, what you supply, and what will cost money every month whether or not we are involved. It is a longer document than a logo quote, and deliberately so.',
        ],
      },
      {
        h: 'What he will ask you',
        ol: [
          'What should a visitor do on the site — call, book, buy, or read? A brochure site and a shop are different builds and different prices.',
          'How many pages, honestly? Five pages you will maintain beats twenty you will not.',
          'Who writes the words and who owns the photography? This is the single most common cause of a stalled build.',
          'Do you want to edit it yourself afterwards, or would you rather send us changes? That answer chooses the platform.',
          'For an app: what is the one thing version one must do? Everything else is version two, and that is not a downgrade.',
          'For video: how much raw footage, in what format, and where will it be published? Vertical shorts and a long-form edit are not the same job.',
        ],
      },
      {
        h: 'The costs he will raise before you ask',
        table: [
          ['Domain and hosting', 'Yours, in your own account wherever possible. We will set it up, but we would rather you owned the keys than rented them from us.'],
          ['Store platform fees', 'Per-transaction and monthly charges belong to the platform, not to us. They get quoted alongside the build so the running total is honest.'],
          ['App store accounts', 'Apple and Google both charge developer fees and both review submissions. Neither is optional and neither is ours.'],
          ['Stock footage, fonts and music', 'Licensed per project. Where a free alternative is genuinely as good, he will point at it instead.'],
          ['Ongoing maintenance', 'Optional. Sites do need updating, and we will say plainly which parts you can do yourself.'],
        ],
      },
      {
        h: 'How to get a useful answer fastest',
        ul: [
          'Send two or three sites you like and say what you like about each. "This one, but calmer" is more useful than a page of adjectives.',
          'Say whether you already have a logo and brand, or whether that is part of the job.',
          'For a shop, give a rough product count and whether they have variants. Twelve products and twelve hundred are different builds.',
          'For an app, describe the user, not the feature list. The feature list follows.',
          'Name a launch date if one exists. If it is not achievable he will say so rather than agree and hope.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I get a website quote without knowing my page count?',
        a: 'Yes. Describe what the business does and what you want a visitor to do, and Sam will propose a page structure with the quote. Most people change it once, which is normal and does not change the price unless the scope changes with it.',
      },
      {
        q: 'Do you take on projects that need fixing rather than building?',
        a: 'Often, yes — a site somebody else built and abandoned, a store that will not check out, a listing that stopped ranking. He will look before quoting, and occasionally the honest answer is that rebuilding costs less than repairing.',
      },
      {
        q: 'Is the app code mine?',
        a: 'Yes. The source is handed over on completion, the same way the design files are. That is written into the quote rather than left to be argued about later.',
      },
      {
        q: 'What if I need a logo as well?',
        a: 'He will loop in Brock for the brand half and you will still get one quote and one invoice. You are never asked to run two conversations for one project.',
      },
    ],
    related: [
      { name: 'Website design', href: '/website-design' },
      { name: 'Mobile applications', href: '/mobile-application' },
      { name: 'Video, animation and YouTube', href: '/animation' },
      { name: 'Amazon marketing', href: '/amazon-marketing' },
    ],
  },

  {
    slug: 'greg-adams',
    name: 'Greg Adams',
    role: 'Senior Legal Counsel',
    desk: 'Legal compliance',
    email: 'legal@logoorbit.net',
    icon: 'scales',
    initials: 'GA',
    accent: '#7c3aed',
    bar: 'State Bar of California',
    tagline: 'The named lawyer behind the ownership paperwork, the trademark filings and every privacy request.',
    metaTitle: 'Greg Adams — Senior Legal Counsel',
    metaDescription:
      'Greg Adams leads legal compliance at LogoOrbit: copyright transfer, USPTO trademark filings, brand protection and privacy requests. Reachable by email.',
    summary:
      'Greg reviews the ownership paperwork behind every finished design, runs the clearance checks before a trademark application goes to the USPTO, and handles privacy and data requests. If your question is about who owns what, he is the one who answers it.',
    responsibilities: [
      'Copyright assignment: the written transfer that hands a finished design to the client',
      'Trademark clearance searches and USPTO applications, including replies to office actions',
      'Brand protection where somebody is using a client mark without permission',
      'Privacy requests — copies, corrections and deletions under the privacy policy',
      'Contracts, NDAs, vendor paperwork and purchase orders that need a signature from our side',
    ],
    handoff:
      'Email is the only route to the legal desk, and that is deliberate: it puts every legal question and every answer in writing, dated, for both sides.',
    respondsIn: 'Within two business days, and faster where a filing deadline is running',
    coverage: 'Written enquiries only — legal@logoorbit.net',
    sections: [
      {
        h: 'Why the legal desk is a person and not an address',
        p: [
          'Almost every design studio hides this function behind a footer link and a generic inbox, which leaves a client with no way of knowing whether a lawyer exists at the other end. When the question is "do I actually own this mark", that uncertainty is the whole problem. So the desk is published as a person, with the bar he is admitted to and the teams that report to him.',
          'It also sets expectations correctly in the other direction. Greg is our counsel, not yours. He can tell you exactly what our paperwork does, what rights transfer and when, and what a USPTO examiner is likely to say about a mark. He cannot act as your attorney or advise you on a dispute with a third party, and he will say so rather than blur the line.',
        ],
      },
      {
        h: 'What transfers to you, and when',
        p: [
          'Every package that produces original artwork transfers full copyright in the delivered design to the client on final payment. Not a licence, not a permission to use — assignment, in writing, signed from our side. That written record is what makes a trademark application in your name possible, and it is what a buyer’s solicitor will ask for if you ever sell the business.',
        ],
        table: [
          ['The delivered design', 'Assigned to you in full. Use it anywhere, forever, modify it, sell it with the business, register it.'],
          ['Working files and source artwork', 'Handed over with the assignment on packages that include editable masters.'],
          ['Concepts you did not choose', 'Stay with us and are not resold as-is to another client. If you want an unused direction assigned too, ask and it can be added.'],
          ['Licensed third-party elements', 'Fonts and stock assets carry their own licences, which are named in the handover so you know what you hold.'],
          ['Our portfolio use', 'We show finished work as ours to have made. If a launch is confidential, say so and it stays out of the portfolio.'],
        ],
      },
      {
        h: 'Trademarks, plainly',
        p: [
          'A logo and a trademark are different things. Copyright arrives automatically with the artwork and is what you get from us. A trademark is a registered right in a name or mark for a class of goods and services, granted by a government office, and it is the one that stops a competitor trading under something confusingly close to you.',
          'The order matters: clearance search first, then filing. A search that comes back badly is a cheap result, because the alternative is discovering the conflict after you have printed the signage.',
        ],
        ol: [
          'Clearance search across the USPTO register and common-law use, with an honest read on the risk rather than a green light for the sake of it.',
          'Class selection — what you actually sell, not everything you might one day sell.',
          'Filing the application, with specimen and description prepared to the standard the examiner expects.',
          'Office actions: if an examiner comes back with questions or a refusal, the response is drafted and filed.',
          'Registration, then the renewal dates you will need to diarise.',
        ],
      },
      {
        h: 'Privacy and your data',
        p: [
          'Requests for a copy of what we hold, corrections to it, or deletion of it come to this desk and are answered in writing. So do questions about how the contact form and the brief form store what you send. The privacy policy is the standing answer; Greg is who you write to when your situation is not covered by it.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can Greg act as my lawyer?',
        a: 'No. He is LogoOrbit’s counsel. He can explain exactly what our agreements do and handle a trademark filing on your behalf as a service, but he cannot advise you against us or represent you in a dispute with a third party. Where you need your own attorney, he will tell you plainly.',
      },
      {
        q: 'Why can I not phone the legal desk?',
        a: 'Because a legal answer given on the phone helps nobody a month later. Email means both sides hold the same dated record of the question and the answer. Anything urgent still reaches him — mark the subject line accordingly.',
      },
      {
        q: 'What does a trademark filing cost?',
        a: 'Our fee is $299 per class, plus the government filing fee, which is set by the USPTO and paid to them rather than to us. The clearance search is quoted first, and if it comes back badly you have lost the search fee rather than the filing fee.',
      },
      {
        q: 'Somebody is using my logo. What can you do?',
        a: 'Write to the desk with the evidence — screenshots, URLs, dates. Where the mark is one we designed, our records of authorship and the assignment are strong evidence of your position, and Greg will set out the realistic options rather than promising an outcome.',
      },
    ],
    related: [
      { name: 'Legal and compliance', href: '/legal' },
      { name: 'Trademark registration', href: '/pricing#trademark' },
      { name: 'Terms and conditions', href: '/terms' },
      { name: 'Privacy policy', href: '/privacy' },
    ],
  },
]

export const teamBySlug = Object.fromEntries(team.map((person) => [person.slug, person]))

/**
 * The desks that work as teams rather than as named contacts.
 *
 * Listing these as desks rather than inventing head-shots and biographies is
 * the honest version: these are real functions with real people in them, and
 * the person you get depends on the job.
 */
export const desks = [
  {
    id: 'design',
    icon: 'logo',
    name: 'The design desk',
    body: 'Logo, identity, packaging and print. Every mark on the portfolio wall was drawn here. A named designer is assigned to your job at the point it is paid, and you deal with the same one throughout.',
    href: '/services',
  },
  {
    id: 'web',
    icon: 'website',
    name: 'The build desk',
    body: 'Websites, online shops and mobile applications. Design and development sit together rather than throwing files over a wall, which is why a mockup here does not arrive at the build stage as a surprise.',
    href: '/website-design',
  },
  {
    id: 'motion',
    icon: 'animation',
    name: 'The motion desk',
    body: 'Animation, video editing, YouTube production, thumbnails, shorts and sound. The newest team here and the fastest growing, because clients who came for a logo keep asking for the moving version of it.',
    href: '/animation',
  },
  {
    id: 'support',
    icon: 'phone',
    name: 'The support desk',
    body: 'Once a job is running, this is who you talk to. The phone, the WhatsApp line and support@ all land in the same place, and everybody on the desk can see the whole history of your project.',
    href: '/contact',
  },
]
