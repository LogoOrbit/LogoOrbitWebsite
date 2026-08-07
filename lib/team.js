/**
 * The people, given pages of their own.
 *
 * Until now the named people on this site existed only as cards: two sales
 * reps in a grid and a lawyer in a panel. A card cannot answer the questions
 * somebody actually has before they write to a stranger - what does this
 * person decide, what will they ask me, how fast do they reply - so each
 * one now gets a page that does.
 *
 * The roster is deliberately short. It lists the people a client is put
 * through to by name, not an invented org chart. The studio desks that work
 * as teams rather than as named contacts are described on the hub page
 * instead, honestly, as desks.
 *
 * `sections` uses the same block shape as lib/guides.js so ArticleBody can
 * render both: `h` for a heading, `p` for paragraphs, `ul`, `ol`, `table`.
 *
 * `photo` is optional. Where there is a real photograph of the person it is
 * used; where there is not, the initials tile stands in rather than a stock
 * head-shot of somebody who does not work here.
 */

export const team = [
  {
    slug: 'james-phelps',
    name: 'Professor James Phelps',
    shortName: 'Professor Phelps',
    role: 'Director & Chief Financial Officer',
    desk: 'Finance, billing and invoices',
    email: 'james@phelps-llc.com',
    icon: 'receipt',
    initials: 'JP',
    accent: '#0f766e',
    photo: '/team/james-phelps.jpg',
    photoAlt: 'Professor James Phelps, Director and Chief Financial Officer of LogoOrbit',
    credentials: 'Ph.D.',
    badges: [
      'Ph.D., university professor',
      'U.S. Navy, 21 years, retired 1998',
      'Director, Phelps & Associates, LLC',
    ],
    tagline:
      'Our Director and Chief Financial Officer, and the person behind the entity that issues your invoice.',
    metaTitle: 'Professor James Phelps - Director & Chief Financial Officer',
    metaDescription:
      'Professor James Phelps, Ph.D., is Director and Chief Financial Officer of LogoOrbit. He directs Phelps & Associates, LLC, the billing entity named on your invoice.',
    summary:
      'Professor James Phelps, Ph.D., is our Director and Chief Financial Officer. He signs off pricing, holds the accounting records and directs Phelps & Associates, LLC - the merchant entity that issues LogoOrbit invoices and appears on your card statement. If a question is about money rather than design, it ends up on his desk.',
    responsibilities: [
      'Financial direction: pricing approval, margin, and what a package is allowed to cost',
      'Invoicing and the merchant relationship through Phelps & Associates, LLC',
      'Billing disputes that support could not settle - duplicate charges, refunds, chargebacks',
      'Purchase orders, W-9s, vendor onboarding and anything a client’s accounts department needs signed',
      'Tax treatment on invoices, and which pass-through charges are not marked up',
      'The accounting records themselves, kept for as long as tax law requires',
    ],
    handoff:
      'Day-to-day payment questions - "has my payment cleared", "can you resend the receipt" - are faster through support, who can see the payment record. Anything unresolved, or anything your own accountant needs in writing, comes here.',
    respondsIn: 'Within one to two business days',
    coverage: 'Written enquiries only',
    sections: [
      {
        h: 'Why the finance desk is published as a person',
        p: [
          'Most studios treat billing as an address at the bottom of a receipt. That is fine until something goes wrong, and the moment it does - a charge you do not recognise, a refund that has not landed, an accounts department asking who exactly they are paying - an anonymous inbox is the worst possible answer. So the finance function is published the same way the legal one is: with a name, a role and a route.',
          'Professor Phelps holds the financial direction of the business. He approves what a package is allowed to cost before it goes on the pricing page, he holds the accounting records behind every invoice, and he directs the entity that bills you. When a client asks who they are actually paying, the honest answer is a person, and this page is that answer.',
        ],
      },
      {
        h: 'Phelps & Associates, LLC, and why it is on your statement',
        p: [
          'LogoOrbit invoices are issued by Phelps & Associates, LLC, which is the billing and merchant entity behind the invoice. It is a professional education, training and academic writing company based in Lindale, Texas, and Professor Phelps directs it. That is the connection: the same officer who signs our accounts also directs the entity that processes the payment.',
          'This is worth saying out loud because of what happens otherwise. A charge appears on a card statement under a name the customer has never seen, they assume fraud, and the first call is to the bank rather than to us. A chargeback opened by mistake costs everybody a fortnight. So the descriptor is published here in advance rather than explained afterwards.',
        ],
        table: [
          ['Who you contract with', 'LogoOrbit, a design brand operated by NexusForgeGroup. The terms you accept are ours and the work is ours.'],
          ['Who issues the invoice', 'Phelps & Associates, LLC - the billing and merchant entity named on the invoice document itself.'],
          ['What appears on your statement', 'A descriptor referencing Phelps & Associates, LLC rather than the LogoOrbit trading name. Expected, not an error.'],
          ['Registered billing address', 'Phelps & Associates, LLC, 12332 Maplewood Dr., Lindale, TX 75771.'],
          ['The officer behind both', 'Professor James Phelps - Director of Phelps & Associates, LLC and our Director and Chief Financial Officer.'],
          ['Where your card number goes', 'To the payment processor, on their form. It never reaches our servers and we never store one.'],
        ],
      },
      {
        h: 'The background he brings to it',
        p: [
          'Professor Phelps holds a Ph.D. and teaches online, live and asynchronous, to students all over the world, alongside lecturing in his local community on a wide range of subjects. His stated interest is history - the view that you cannot read the present accurately without reading how it was arrived at - combined with years of world travel and the habit of applying scientific and engineering principles to a problem before applying an opinion to it.',
          'Before the academic career came twenty-one years in the U.S. Navy, on nuclear submarines. He entered the service as an E-1 in 1977, earned promotions through to E-7 as an enlisted sailor, and in 1991 was selected for a direct commission to Ensign in the Nuclear Power Limited Duty Officer field, where he served until retiring in 1998.',
        ],
        table: [
          ['1996-1998', 'SEAL Delivery Vehicle Team 1 - Quality Assurance Officer and DDS Maintenance Officer'],
          ['1994-1996', 'Naval Intermediate Maintenance Facility, Pearl Harbor - General Services Division Officer, Electronic Systems Production Officer'],
          ['1993-1994', 'Submarine Base, Pearl Harbor - Assistant Radiological Controls Officer for Production, Special Projects Nuclear Repair Officer'],
          ['1992-1993', 'USS Holland - Repair Department Administration Officer, Nuclear Production Officer'],
          ['1991-1992', 'USS Proteus - Nuclear Repair Officer'],
          ['1986-1991', 'USS Florida and USS Michigan - Leading Chief Petty Officer and Leading Petty Officer, Machinery Division (Nuclear)'],
          ['1983-1986', 'Maintenance Training Group, Nuclear Power Training Unit, Idaho'],
          ['1980-1983', 'USS Puffer - Machinist Mate (Nuclear)'],
          ['1977-1980', 'Naval Nuclear Power Pipeline School'],
        ],
      },
      {
        h: 'What to send when you write about an invoice',
        p: [
          'A finance question is answered in one reply or in four, and the difference is almost always what arrived in the first message.',
        ],
        ul: [
          'The invoice number, or the order name and the date. Either one finds the record; a description of the design does not.',
          'The last four digits of the card and the amount, if the question is about a charge you do not recognise.',
          'Who the invoice needs to be addressed to, if your accounts department needs it reissued to a company rather than a person.',
          'The exact document you need - a W-9, a signed purchase order, a statement of account. Naming it saves a round trip.',
          'If a bank dispute is already open, say so. It changes what we are allowed to do and how quickly.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does my card statement say Phelps & Associates rather than LogoOrbit?',
        a: 'Because Phelps & Associates, LLC is the billing and merchant entity that issues the invoice and processes the payment. It is directed by Professor James Phelps, our Director and Chief Financial Officer. The charge is correct and it is ours - please write to james@phelps-llc.com before opening a bank dispute, and it will be identified for you the same way.',
      },
      {
        q: 'Who am I actually contracting with?',
        a: 'LogoOrbit, a design brand operated by NexusForgeGroup. Our terms and conditions govern the work, and the design and its ownership come from us. Phelps & Associates, LLC handles the billing side of that arrangement and is named on the invoice as such.',
      },
      {
        q: 'Can I get a W-9, a purchase order or an invoice reissued to my company?',
        a: 'Yes, all three. Write to the finance desk with the company name and address exactly as your accounts department needs it printed, and the corrected document comes back signed.',
      },
      {
        q: 'I think I have been charged twice. What do I do?',
        a: 'Contact support first - they can see the payment record immediately and most duplicates are settled the same day. If it is still unresolved, bring it here with the invoice number and the last four digits of the card, and it will be refunded or explained in writing.',
      },
      {
        q: 'Does Professor Phelps get involved in design work?',
        a: 'No. Design decisions belong to the studio and quotes belong to Brock and Sam. His remit is the financial side: what things cost, how they are invoiced, and the records behind them.',
      },
    ],
    related: [
      { name: 'Pricing and packages', href: '/pricing' },
      { name: 'Terms and conditions', href: '/terms' },
      { name: 'Legal and compliance', href: '/legal' },
      { name: 'Contact us', href: '/contact' },
    ],
  },

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
    metaTitle: 'Brock Wilson - Brand & Identity Sales',
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
          'His job is to turn a description of a business into a scope, a timeline and one number. Not a range, not an estimate that moves once the work starts. If the brief later grows - another concept direction, a second language on the packaging, a signage set nobody mentioned - he re-quotes the addition on its own rather than quietly inflating the original.',
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
          'Send anything you already have - a sketch, a competitor you admire, a photo of the old sign. Rough is fine, and useful.',
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
        a: 'Write to Sam Marcus instead - websites, apps, video, YouTube and Amazon work sit on his desk. If you send it to the wrong one of them, they pass it across the same day rather than making you resend it.',
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
    metaTitle: 'Sam Marcus - Digital & Growth Sales',
    metaDescription:
      'Sam Marcus quotes website, mobile app, video, YouTube and Amazon projects at LogoOrbit. What he handles, what he will ask, and how to reach him directly.',
    summary:
      'Sam handles everything that runs rather than prints: websites and online shops, mobile applications, video and YouTube production, and Amazon listing and advertising work. He scopes the project, prices it and agrees the delivery dates before anything is paid.',
    responsibilities: [
      'Fixed quotes for websites, online shops and the hosting and maintenance around them',
      'Mobile app scoping across iOS and Android, including what goes in version one and what waits',
      'Video, YouTube and animation packages, including footage volumes and turnaround',
      'Amazon listing and A+ content work, quoted per listing rather than as an ongoing arrangement',
      'Flagging the recurring costs - domains, hosting, store platforms, app store fees - before you commit',
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
          'What should a visitor do on the site - call, book, buy, or read? A brochure site and a shop are different builds and different prices.',
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
        a: 'Often, yes - a site somebody else built and abandoned, a store that will not check out, a listing that stopped ranking. He will look before quoting, and occasionally the honest answer is that rebuilding costs less than repairing.',
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
    metaTitle: 'Greg Adams - Senior Legal Counsel',
    metaDescription:
      'Greg Adams leads legal compliance at LogoOrbit: copyright transfer, USPTO trademark filings, brand protection and privacy requests. Reachable by email.',
    summary:
      'Greg reviews the ownership paperwork behind every finished design, runs the clearance checks before a trademark application goes to the USPTO, and handles privacy and data requests. If your question is about who owns what, he is the one who answers it.',
    responsibilities: [
      'Copyright assignment: the written transfer that hands a finished design to the client',
      'Trademark clearance searches and USPTO applications, including replies to office actions',
      'Brand protection where somebody is using a client mark without permission',
      'Privacy requests - copies, corrections and deletions under the privacy policy',
      'Contracts, NDAs, vendor paperwork and purchase orders that need a signature from our side',
    ],
    handoff:
      'Email is the only route to the legal desk, and that is deliberate: it puts every legal question and every answer in writing, dated, for both sides.',
    respondsIn: 'Within two business days, and faster where a filing deadline is running',
    coverage: 'Written enquiries only - legal@logoorbit.net',
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
          'Every package that produces original artwork transfers full copyright in the delivered design to the client on final payment. Not a licence, not a permission to use - assignment, in writing, signed from our side. That written record is what makes a trademark application in your name possible, and it is what a buyer’s solicitor will ask for if you ever sell the business.',
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
          'Class selection - what you actually sell, not everything you might one day sell.',
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
        a: 'Because a legal answer given on the phone helps nobody a month later. Email means both sides hold the same dated record of the question and the answer. Anything urgent still reaches him - mark the subject line accordingly.',
      },
      {
        q: 'What does a trademark filing cost?',
        a: 'Our filing service is $599, plus $350 per class, plus the government filing fee, which is set by the USPTO and paid to them rather than to us. The clearance search is quoted first, and if it comes back badly you have lost the search fee rather than the filing fee.',
      },
      {
        q: 'Somebody is using my logo. What can you do?',
        a: 'Write to the desk with the evidence - screenshots, URLs, dates. Where the mark is one we designed, our records of authorship and the assignment are strong evidence of your position, and Greg will set out the realistic options rather than promising an outcome.',
      },
    ],
    related: [
      { name: 'Legal and compliance', href: '/legal' },
      { name: 'Trademark registration', href: '/trademark-filing' },
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
