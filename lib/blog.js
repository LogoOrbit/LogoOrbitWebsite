/**
 * The studio blog.
 *
 * Distinct from lib/guides.js on purpose. A guide is evergreen reference — how
 * much a logo costs, which file to send a printer — and gets rewritten when the
 * facts move. A post here is dated: what we changed, what we are seeing in
 * briefs this year, why we do something the way we do it. Nobody should have to
 * guess which one they are reading, so they live at different URLs and each
 * article says when it was published.
 *
 * `sections` uses the same block shape the guides use, so ArticleBody renders
 * both without a second template.
 */

export const blogCategories = [
  { id: 'studio', name: 'From the studio', blurb: 'How we work, and what we changed when it stopped working.' },
  { id: 'craft', name: 'Craft', blurb: 'Design decisions, argued out in public rather than asserted.' },
  { id: 'industry', name: 'Industry', blurb: 'What is actually happening in briefs, prices and platforms.' },
  { id: 'business', name: 'Running a business', blurb: 'The commercial side of commissioning design.' },
]

export const posts = [
  {
    slug: 'why-we-publish-our-prices',
    category: 'business',
    title: 'Why we publish our prices when most studios will not',
    metaTitle: 'Why We Publish Our Design Prices | LogoOrbit',
    metaDescription:
      'Most design studios hide pricing behind a discovery call. Here is the commercial argument for publishing every package price, and what we gave up to do it.',
    excerpt:
      '"Contact us for a quote" is a filter, not a courtesy. Here is what publishing every price cost us, what it saved, and why we are not going back.',
    published: '2026-07-14',
    updated: '2026-07-14',
    readMinutes: 6,
    keywords: 'design pricing transparency, logo design cost, published pricing agency',
    sections: [
      {
        p: [
          'The standard argument against publishing prices goes like this: every project is different, a number without context is misleading, and a discovery call lets you explain the value before the buyer anchors on a figure. Every part of that is true. It is also, in practice, a way of finding out what a customer can afford before deciding what to charge them.',
        ],
      },
      {
        h: 'What hiding the price actually does',
        p: [
          'A hidden price does three things, and only one of them helps the buyer. It filters out people who cannot afford the work, which saves the studio time. It lets the quote flex to the buyer rather than to the job. And it delays the conversation everybody actually wants to have until after somebody has sat through a call.',
          'The second one is the problem. If two businesses ask for the same five-page website and one of them mentions a funding round, a flexible quote will price those differently. Nothing about the work changed. That is not value-based pricing, it is just charging what the room will bear, and the only reason it survives is that nobody can compare notes.',
        ],
      },
      {
        h: 'What it cost us to publish',
        ul: [
          'We lost the ability to price a job by who is asking. That is the point, and it is still occasionally painful.',
          'We get compared to $5 marketplaces by people who were never going to buy from us, and we spend time explaining a difference the price alone does not explain.',
          'Our own packages have to be honest about their limits, because a published spec list is a promise anybody can hold us to.',
          'Every price rise is visible. There is no quiet drift upward when nobody is looking.',
        ],
      },
      {
        h: 'What it bought',
        p: [
          'Enquiries arrive pre-qualified in a way that has nothing to do with budget filtering. People write having already read what a package contains, so the first message is "does the Platinum tier cover a second language on the packaging" rather than "how much for a logo". That is a much better first message, and it means the first reply can be useful instead of exploratory.',
          'It also settled an internal argument permanently. When the spec is public, a salesperson cannot promise something the package does not include, and a designer cannot be asked to absorb it. The page is the referee.',
        ],
      },
      {
        h: 'The one thing we will not put on a page',
        p: [
          'Custom work still gets a custom number. A twelve-language e-commerce build, a brand architecture project across four sub-brands, an app with a payments integration — those get scoped and quoted, because a published figure for them would be fiction. What we will not do is take a job that plainly matches a listed package and quote it differently because of who asked.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does a published price mean a fixed price?',
        a: 'For anything matching a listed package, yes. The price on the page is the price you pay, and additions are quoted separately before they are started rather than added to an invoice afterwards.',
      },
      {
        q: 'Do you negotiate?',
        a: 'Not on listed packages, because that would make the published price a lie for whoever did not think to ask. On custom scopes there is a real conversation about what goes in and what waits, which usually moves the number more than haggling would.',
      },
    ],
    relatedServices: ['brand-identity-design'],
    relatedGuides: ['how-much-does-a-logo-cost'],
    relatedPosts: ['revision-counters', 'what-99-dollars-buys'],
  },

  {
    slug: 'revision-counters',
    category: 'business',
    title: 'The revision counter is a business model, not a design process',
    metaTitle: 'Why Revision Limits Hurt Design Work | LogoOrbit',
    metaDescription:
      'Fixed revision counts make design cheaper to sell and worse to buy. What a revision limit does to the work, and what unlimited revisions actually change.',
    excerpt:
      'Three rounds included, $45 for each extra. It sounds like fairness. What it actually does is end the design when the counter runs out rather than when the work is right.',
    published: '2026-06-22',
    updated: '2026-07-02',
    readMinutes: 5,
    keywords: 'unlimited revisions logo design, revision rounds, design process',
    sections: [
      {
        p: [
          'Almost every design listing you will read includes a revision count. Three rounds, five rounds, ten for the premium tier. It reads like a consumer protection: here is exactly what you get, no ambiguity. In practice it changes the incentive on both sides of the table, and not in the client’s favour.',
        ],
      },
      {
        h: 'What a counter does to the client',
        p: [
          'The moment revisions are finite, a client starts rationing feedback. They batch up notes they are not sure about. They stop saying "I do not know why, but something is off" because it feels like a wasted round. They approve something they are seventy per cent happy with because round three is the last free one and the alternative is an invoice.',
          'Seventy per cent happy is the worst possible outcome for a logo. It is the mark that quietly gets replaced in eighteen months, which means the whole exercise is paid for twice.',
        ],
      },
      {
        h: 'What it does to the designer',
        p: [
          'It rewards the wrong first move. If you have three rounds, the safe play is to open with three noticeably different directions and let the client pick, rather than to interrogate the brief and commit to the one that fits. Breadth is cheap insurance against running out of rounds. It is also how you end up with four mediocre concepts instead of one good one.',
          'It also creates the most unpleasant conversation in this business, which is telling somebody their next note costs money.',
        ],
      },
      {
        h: 'What unlimited actually means here',
        p: [
          'It does not mean infinite patience with an unchanged brief, and it does not mean a project without an end. It means the design finishes when it is right rather than when a counter empties. In fifteen years of doing it this way, the number of jobs that genuinely ran long is small enough to be a rounding error, because a well-interrogated brief converges fast.',
        ],
        ul: [
          'The average job still lands in two or three rounds. Removing the limit did not change the median, it changed what happens in the tail.',
          'Where a project does run long, the cause is almost always a decision that had not been made when the brief was written — a name still in flux, a second stakeholder appearing at round four.',
          'The one thing that does reset the clock is a change of direction rather than a refinement. "Make it navy" is a revision. "Actually we have renamed the company" is a new brief, and we will say so.',
        ],
      },
      {
        h: 'How to tell which kind you are buying',
        ol: [
          'Ask what happens after the last included round. If there is a per-round price, that is the model, whatever the marketing says.',
          'Ask whether a direction change counts as a revision. This is where limits bite hardest.',
          'Ask who decides a round has been used. If it is the studio, and the definition is vague, assume the vague reading favours them.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which packages here include unlimited revisions?',
        a: 'Gold logo packages and everything above them, and all of the bundles that contain one. Entry-level packages print their included rounds on the card, and if you want more we price them before starting rather than after.',
      },
      {
        q: 'Is there really no cut-off?',
        a: 'There is one situation that ends a run of revisions: a change of brief rather than a change of design. A new company name, a new market or a new audience is a new job, and it gets quoted as one.',
      },
    ],
    relatedServices: ['logo-redesign'],
    relatedGuides: ['what-makes-a-good-logo'],
    relatedPosts: ['why-we-publish-our-prices', 'the-brief-that-makes-a-good-logo'],
  },

  {
    slug: 'ai-in-the-studio',
    category: 'craft',
    title: 'AI is in every brief now. Here is where we use it and where we will not',
    metaTitle: 'Where We Use AI in Design (And Where We Do Not) | LogoOrbit',
    metaDescription:
      'An honest account of generative AI inside a working design studio: what it is genuinely good at, what it cannot deliver, and why no client logo is machine-generated.',
    excerpt:
      'Clients ask two versions of the same question: are you using AI, and why are you not cheaper if you are. Both deserve a straight answer.',
    published: '2026-05-30',
    updated: '2026-07-18',
    readMinutes: 8,
    keywords: 'ai logo design, generative ai branding, ai vs human designer',
    sections: [
      {
        p: [
          'Two years ago this question arrived once a month, usually suspiciously. Now it is in most briefs, and it splits cleanly: half of them want reassurance that no machine is drawing their logo, half want to know why we are not charging marketplace prices if a machine is. The honest answer covers both, and it is not a slogan in either direction.',
        ],
      },
      {
        h: 'What no client logo here is',
        p: [
          'No mark we deliver is a generative output with a name set into it. That is not a stylistic position, it is a legal one. A design has to be attributable to a human author for the copyright assignment we sign to mean anything, and that assignment is what makes a trademark application in your name possible. A mark you cannot prove you authored is a mark you cannot properly own, and ownership is most of what you are buying.',
        ],
      },
      {
        h: 'Where the tools genuinely earn their place',
        table: [
          ['Research and reference', 'Pulling together what a sector already looks like, fast. It replaces an afternoon of scrolling, not a decision.'],
          ['Background and mockup work', 'Rendering a business card into a realistic scene so a client can judge scale. Nobody is buying the tabletop in the photograph.'],
          ['Copy drafts for internal use', 'Structuring a proposal or a scope document. Everything client-facing is still written and edited by a person.'],
          ['Image cleanup and upscaling', 'Rescuing a supplied photograph that arrived at 400 pixels wide. This is retouching, and it always was.'],
          ['Video and audio grunt work', 'Transcription, rough cuts, noise removal, subtitle timing. Real hours saved on the motion desk, and it shows in the turnaround.'],
        ],
      },
      {
        h: 'What it is still bad at, specifically',
        ul: [
          'Vector output. Generative tools produce pixels and the traced result carries artefacts a printer will reject. Logos have to be born as vectors.',
          'Consistency across a system. It can give you a mark. It cannot give you the same mark at favicon size, embroidered, and reversed out of a dark photograph, with the deliberate compromises each of those needs.',
          'Restraint. It will always add another element. The hardest part of a logo is deciding what to remove, and that is a judgement about a business, not about an image.',
          'Being wrong on purpose. Distinctiveness usually comes from breaking a convention deliberately. A model trained on the convention reproduces it.',
        ],
      },
      {
        h: 'Why the price did not fall',
        p: [
          'Because the part these tools speed up was never the expensive part. The expensive part is the hour spent working out that a cleaning company selling on trust needs to look established rather than energetic, and the four attempts it takes to get there. Faster reference gathering saves twenty minutes. It does not save the decision.',
          'Where the tools have moved the price, we have moved it: video turnaround is quicker and priced accordingly, and photo cleanup that used to be a line item now usually is not.',
        ],
      },
      {
        h: 'The question worth asking any studio',
        p: [
          'Not "do you use AI" — everybody uses something, and a studio claiming otherwise is either lying or slower than it needs to be. Ask instead: is the mark you are handing me attributable to a human author, and will you sign an assignment that says so? That question has one right answer, and it is the one that matters if you ever need to defend the mark.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I register an AI-generated logo as a trademark?',
        a: 'The trademark itself concerns use in commerce, but the underlying authorship matters when ownership is challenged, and generated output has no human author to assign rights from. It is a weak position to build a brand on, which is why we do not deliver work from it.',
      },
      {
        q: 'If I bring you an AI-generated mark I like, can you work from it?',
        a: 'We can use it as reference for a direction, the same as any sketch or mood board, and then draw an original mark. What we will not do is trace it and call the result yours, because it would not be.',
      },
      {
        q: 'Does any AI touch my files?',
        a: 'On design work, no generative model produces deliverable artwork. On video, tooling handles transcription, subtitle timing and noise cleanup. If you would rather it did not, say so in the brief and it will not.',
      },
    ],
    relatedServices: ['brand-identity-design', 'logo-redesign'],
    relatedGuides: ['ai-logo-generators-vs-designers'],
    relatedPosts: ['what-99-dollars-buys', 'the-brief-that-makes-a-good-logo'],
  },

  {
    slug: 'the-brief-that-makes-a-good-logo',
    category: 'craft',
    title: 'The brief that makes a good logo, and the one that makes four mediocre ones',
    metaTitle: 'How to Write a Logo Brief That Works | LogoOrbit',
    metaDescription:
      'Fifteen years of logo briefs, and the same three sentences separate the good ones from the ones that produce four safe concepts nobody loves.',
    excerpt:
      'The best briefs we receive are shorter than the worst ones. What they contain instead of length is a decision.',
    published: '2026-04-18',
    updated: '2026-06-11',
    readMinutes: 7,
    keywords: 'logo brief, design brief template, how to brief a designer',
    sections: [
      {
        p: [
          'You can predict how a logo project will go from the brief, usually within the first paragraph. Not from how long it is — the ten-page ones are frequently the worst — but from whether anybody has made a decision before writing it.',
        ],
      },
      {
        h: 'The brief that works',
        p: [
          'Here is a real shape, paraphrased from a client who got a mark approved in one round: "We are a two-van pressure washing business in Tampa. Our customers are homeowners over fifty who are nervous about strangers on their property. Every competitor here looks like a monster truck rally. We want to look like the company your daughter would recommend."',
          'Four sentences. It contains the market, the customer, the emotional job the mark has to do, and a position against the category. There is nothing in it about colours, fonts or shapes, and that is exactly why it works: it constrains the outcome without constraining the drawing.',
        ],
      },
      {
        h: 'The brief that does not',
        ul: [
          '"Modern, clean, professional." Every business in every sector wants these. They eliminate nothing, so the designer has to guess, and guessing produces breadth instead of depth.',
          'A list of logos you like with no reason attached. Useful only if you say what you like about each, because otherwise three different lessons can be drawn from the same three images.',
          'A committee with no named decider. Four stakeholders and no tiebreak is how a strong concept gets sanded into a safe one.',
          'A locked visual solution. "We want a globe with a swoosh" answers the drawing question before the positioning question, and the swoosh usually turns out to be the third-best idea.',
          'Nothing about where it has to work. A mark for a food truck and a mark for an app icon fail in opposite directions.',
        ],
      },
      {
        h: 'Three sentences that improve almost any brief',
        ol: [
          'Say who your customer is and what they are worried about when they choose. Anxiety is the most useful design input there is.',
          'Say what everyone else in your category looks like, and whether you want to belong to that or break from it. Both answers are legitimate, and they lead somewhere completely different.',
          'Say who signs it off. Not to be bureaucratic — so the feedback that matters arrives before round three rather than after.',
        ],
      },
      {
        h: 'What you do not need to include',
        p: [
          'You do not need design vocabulary. Nobody here needs you to know what a counter or a ligature is, and briefs that reach for the terminology often end up describing a solution rather than a problem. Plain sentences about the business beat borrowed jargon every time.',
          'You also do not need to be certain. "We cannot decide whether we want to look established or upstart" is a genuinely useful thing to say, because that is the actual decision and it is better argued in round one than discovered in round four.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What if I cannot answer the competitor question?',
        a: 'Send three businesses that do roughly what you do, even if they are in another city. We will do the looking. The useful part is your reaction to them, not the research.',
      },
      {
        q: 'Should I include a budget in the brief?',
        a: 'Yes. It is not a haggling position, it decides scope. Knowing the ceiling means the proposal covers what fits inside it instead of describing something you were never going to buy.',
      },
    ],
    relatedServices: ['brand-strategy', 'brand-identity-design'],
    relatedGuides: ['what-makes-a-good-logo'],
    relatedPosts: ['revision-counters', 'what-clients-ask-in-the-first-call'],
  },

  {
    slug: 'what-99-dollars-buys',
    category: 'business',
    title: 'What a $99 logo actually pays for',
    metaTitle: 'What a $99 Logo Really Pays For | LogoOrbit',
    metaDescription:
      'A line-by-line account of where the money goes on an entry-level logo package, and an honest look at when it is the right thing to buy.',
    excerpt:
      'People assume a cheap logo means a rushed one. The real answer is more specific, and it explains what you are giving up as well as what you are getting.',
    published: '2026-03-27',
    updated: '2026-05-09',
    readMinutes: 6,
    keywords: 'cheap logo design, affordable logo package, entry level logo cost',
    sections: [
      {
        p: [
          'Our Silver logo package is $99. That number sits between two worlds — well above the marketplaces, well below what a studio usually charges for original work — and it invites a fair question: what is actually in it?',
        ],
      },
      {
        h: 'Where the money goes',
        table: [
          ['Designer time', 'The largest share by a distance. Concepting, drawing and refining, done by a person who is paid for those hours whether or not the first direction lands.'],
          ['Revisions', 'Costed in, not bolted on. The package assumes the first attempt will not be the last, because it rarely is.'],
          ['File production', 'Exporting and checking every format a printer, a sign maker and a website will ask for. Unglamorous, and the thing most cheap logos skip.'],
          ['Rights and paperwork', 'The written assignment that transfers copyright. It costs us to produce and it is the reason the mark is genuinely yours.'],
          ['Support and studio overhead', 'Somebody answers the phone, and the studio exists next year to re-export a file you have lost.'],
        ],
      },
      {
        h: 'What you are giving up at this tier',
        ul: [
          'Breadth of exploration. Fewer concepts means fewer directions tested, and the winning idea is more likely to be the obvious one.',
          'The system around the mark. No palette rules, no typographic scale, no application guidance. You get a logo, not an identity.',
          'Strategic work. Nobody is researching your competitors formally. The designer will read your brief carefully, and that is a different thing.',
          'Unlimited revisions. Those start at the Gold tier, and for most people that is the upgrade actually worth paying for.',
        ],
      },
      {
        h: 'When it is exactly the right purchase',
        p: [
          'A business testing an idea. A trade that needs a van sticker and a card and will be judged on the work rather than the branding. A side project that might not exist in a year. In all of those, spending four figures on identity work is a way of feeling serious rather than being serious, and the $99 mark with proper files and proper rights does the job completely.',
        ],
      },
      {
        h: 'When it is a false economy',
        p: [
          'If the brand is the product — retail packaging on a shelf, a category where customers compare brands before buying, anything going into a franchise or an acquisition — the entry tier will not carry it. Not because the mark will be bad, but because you will need the system around it within months, and buying the identity properly the first time costs less than buying a logo and then buying the identity anyway.',
          'The expensive mistake is not buying cheap. It is buying cheap twice.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I still own a $99 logo outright?',
        a: 'Yes. Copyright assignment is not a premium feature here — it is on every package that produces original artwork, including the cheapest one.',
      },
      {
        q: 'Can I upgrade later?',
        a: 'Yes, and the money is not wasted. The mark carries forward into a branding kit or a full identity, and you pay the difference rather than starting again.',
      },
    ],
    relatedServices: ['brand-identity-design', 'minimalist-logo-design'],
    relatedGuides: ['how-much-does-a-logo-cost'],
    relatedPosts: ['why-we-publish-our-prices', 'revision-counters'],
  },

  {
    slug: 'what-clients-ask-in-the-first-call',
    category: 'studio',
    title: 'The six things clients ask in the first call, and our real answers',
    metaTitle: 'The Six Questions Every Client Asks First | LogoOrbit',
    metaDescription:
      'The questions that open almost every enquiry at a design studio, answered the way we answer them on the phone rather than the way a brochure would.',
    excerpt:
      'The same six questions open nearly every call. Here they are with the answers we actually give, including the two people do not enjoy hearing.',
    published: '2026-02-19',
    updated: '2026-06-04',
    readMinutes: 6,
    keywords: 'questions to ask a logo designer, hiring a design studio, design consultation',
    sections: [
      {
        p: [
          'Sales pages are written to be persuasive. Phone calls are not, because the person on the other end can ask a follow-up. These are the six questions that open almost every enquiry, with the answers as they get given on the phone.',
        ],
      },
      {
        h: '"How long will it take?"',
        p: [
          'First concepts inside 24 hours, and never past 48. That is the part we control. The part we do not is how quickly feedback comes back, and it is almost always the longer half. A logo project that takes three weeks usually contains nineteen days of waiting for a decision and two days of drawing. If there is a hard date, say it up front and the queue rearranges around it.',
        ],
      },
      {
        h: '"Will it be original?"',
        p: [
          'Yes, drawn from scratch, and there is a specific test you can apply rather than taking our word for it: ask whether the studio will sign a copyright assignment. Anybody reselling template output cannot, because they do not hold the rights to give. The paperwork is a better guarantee than the promise.',
        ],
      },
      {
        h: '"What if I do not like anything?"',
        p: [
          'Then say so plainly, including if the only reason you can give is that it feels wrong. That is real information. We go back and take a different direction, and it is a normal part of the process rather than a failure. The version of this that goes badly is the client who says everything is fine to be polite and then quietly stops replying.',
        ],
      },
      {
        h: '"Do you do everything, or just logos?"',
        p: [
          'Everything, and this is the answer people are most surprised by: logo, print, packaging, website, app, video, YouTube, sound, trademark filing. The reason to care is not convenience, it is consistency — a website built by people who did not draw the mark tends to use it slightly wrong, and slightly wrong across forty pages is how a brand goes soft.',
        ],
      },
      {
        h: '"Can you beat the price I was quoted?"',
        p: [
          'Usually not, and this is the first answer people do not enjoy. Our prices are published, which means they are the same for everybody who reads the page. What we can do is tell you honestly whether the cheaper quote covers the same thing, and quite often it does — in which case take it.',
        ],
      },
      {
        h: '"Have you done my industry before?"',
        p: [
          'Almost certainly, and here is the second unwelcome answer: it matters less than you think. Sector experience helps us know the conventions quickly. It also makes it tempting to reach for the same solution we reached for last time. The portfolio is filterable by industry precisely so you can check whether our work in your sector looks like a set of variations or a set of different answers.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is the first call free?',
        a: 'Yes, and there is no card taken to have it. Design work starts once a package is paid or a deposit clears, which is what puts a named designer on the job.',
      },
      {
        q: 'Can I speak to a designer rather than a salesperson?',
        a: 'Once the job is running, you speak to the designer directly. Before that you get whichever of the two sales reps covers your kind of work, because they are the ones who can commit to a price and a date.',
      },
    ],
    relatedServices: ['brand-identity-design'],
    relatedGuides: ['how-much-does-a-logo-cost'],
    relatedPosts: ['the-brief-that-makes-a-good-logo', 'why-the-legal-desk-is-a-person'],
  },

  {
    slug: 'why-the-legal-desk-is-a-person',
    category: 'studio',
    title: 'Why we put the legal desk on the front of the site',
    metaTitle: 'Why Our Legal Desk Is a Named Person | LogoOrbit',
    metaDescription:
      'Most studios bury ownership questions in a footer link. Why we publish the counsel who handles copyright transfer, trademark filings and privacy requests.',
    excerpt:
      'The single most consequential question a design client can ask is "do I actually own this". It deserves better than a footer link to a generic inbox.',
    published: '2026-01-30',
    updated: '2026-05-21',
    readMinutes: 5,
    keywords: 'logo copyright ownership, design contract, trademark filing studio',
    sections: [
      {
        p: [
          'For most of this studio’s life, legal questions went where they go everywhere else: a link at the bottom of the page, an address nobody was sure was monitored, and a policy document written to be unreadable. Then we started counting what people were actually asking, and the answer reorganised the site.',
        ],
      },
      {
        h: 'What people were really asking',
        ul: [
          '"If I pay for this, can I trademark it?" — by a distance the most common, and the one with the highest stakes.',
          '"What happens to the concepts I did not pick?"',
          '"Can I change the logo later without asking you?"',
          '"You designed a mark for a competitor of mine. What stops you reusing it?"',
          '"If I sell the business, does the logo go with it?"',
        ],
        p: [
          'These are not footer questions. They are the questions that decide whether the purchase was worth making, and they were being answered by whoever happened to pick up the phone.',
        ],
      },
      {
        h: 'What changed',
        p: [
          'The legal function is now published as a person, with a name, the bar he is admitted to, and the desks that report to him. Every ownership question, trademark filing and privacy request goes to that desk in writing. Not because email is friendlier — it plainly is not — but because a legal answer given on the phone is worthless a month later when it matters, and a written one is not.',
        ],
      },
      {
        h: 'The line we are careful about',
        p: [
          'Our counsel is our counsel. He can tell you exactly what our agreements do, what transfers and when, and he can handle a USPTO filing on your behalf as a service. He cannot act as your attorney, advise you against us, or represent you in a dispute with a third party. Saying that out loud is part of the point: a legal desk that implies it acts for both sides is worse than no legal desk at all.',
        ],
      },
      {
        h: 'What we would suggest asking any studio',
        ol: [
          'Is copyright assigned to me in writing, or am I licensed to use it? These are very different purchases.',
          'When does it transfer — on delivery, or on final payment?',
          'What happens to the concepts I did not choose?',
          'Can I modify the design later without permission?',
          'Will you confirm all of that before I pay, in writing?',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I get the assignment automatically?',
        a: 'Yes. It is issued with the final files on every package that produces original artwork, without having to be requested.',
      },
      {
        q: 'Can the legal desk help with a trademark in another country?',
        a: 'US filings are handled directly. For other jurisdictions the desk will tell you what is involved and where you will need local counsel rather than pretending the process is the same everywhere.',
      },
    ],
    relatedServices: ['brand-guidelines'],
    relatedGuides: ['trademark-your-logo'],
    relatedPosts: ['what-clients-ask-in-the-first-call', 'ai-in-the-studio'],
  },

  {
    slug: 'notes-from-the-motion-desk',
    category: 'industry',
    title: 'Notes from the motion desk: what YouTube briefs ask for now',
    metaTitle: 'What YouTube and Video Briefs Ask For Now | LogoOrbit',
    metaDescription:
      'What has changed in video and YouTube briefs: vertical-first edits, thumbnail testing, sound as a deliverable, and where the money now goes.',
    excerpt:
      'The motion desk is the newest team here and the busiest. What clients ask it for has changed more in two years than logo briefs have in ten.',
    published: '2026-06-08',
    updated: '2026-07-25',
    readMinutes: 7,
    keywords: 'youtube editing service, video branding, thumbnail design, logo animation',
    sections: [
      {
        p: [
          'Logo briefs are remarkably stable. What people want from a mark now is close to what they wanted a decade ago. Video briefs are not stable at all, and the shape of what arrives on the motion desk has moved twice in two years.',
        ],
      },
      {
        h: 'Vertical stopped being an afterthought',
        p: [
          'Two years ago a vertical cut was something you asked for at the end, once the real edit was finished, and it was produced by cropping. Now a substantial share of briefs specify vertical as the primary format and the horizontal cut as the derivative. That is a different edit, not a different export: framing, pacing and where you can put text all change, and captions become part of the composition rather than an accessibility layer added afterwards.',
        ],
      },
      {
        h: 'Thumbnails became a design job with a test attached',
        p: [
          'A thumbnail used to be a still with a headline on it. Now clients arrive expecting three variants designed for comparison, and increasingly with data from the last set: this face angle held, that colour did not, text over five words never wins. It is the only part of the creative process most clients have real numbers for, and it makes for unusually good briefs.',
        ],
      },
      {
        h: 'Sound turned into a deliverable',
        ul: [
          'Voice-over is asked for by name rather than assumed to be the client reading a script badly into a phone.',
          'Noise cleanup on interview footage is now routine, and it is what rescues a shoot that happened in a real room.',
          'Music licensing questions arrive before the edit rather than after a strike notice, which is progress.',
          'Sound design on a four-second logo sting: a mark now often needs an audio signature, not just a moving one.',
        ],
      },
      {
        h: 'Where the money goes now',
        table: [
          ['Two years ago', 'Most of the budget in the edit, a little in graphics, sound as an afterthought.'],
          ['Now', 'Edit still leads, but graphics and thumbnails take a real share, and sound is a line item rather than a favour.'],
          ['What got cheaper', 'Transcription, subtitle timing, rough assembly and noise removal. The tooling genuinely improved and the prices moved with it.'],
          ['What did not', 'Deciding what to cut. The first ten seconds of a video is still the most expensive ten seconds to get right.'],
        ],
      },
      {
        h: 'What we tell people to send',
        ol: [
          'The raw footage, not a pre-cut version. A rough cut removes options and rarely saves time.',
          'Where it is being published, and in what aspect ratio, before the edit starts.',
          'Two videos you think work, and one you think does not, with a sentence on each.',
          'The logo files. A moving mark drawn from a screenshot of a static one starts a step behind.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How fast is a video turnaround?',
        a: 'Animation runs to 72 hours for a logo sting. A full edit depends on footage volume, and the honest estimate comes after we have seen how much there is rather than before.',
      },
      {
        q: 'Do you do the vertical and horizontal cuts as one job?',
        a: 'Yes, and it is worth saying which one is primary at the brief stage. Deciding afterwards means re-framing rather than re-exporting.',
      },
    ],
    relatedServices: ['motion-graphics', 'video-editing', 'youtube-thumbnail-design'],
    relatedGuides: [],
    relatedPosts: ['ai-in-the-studio', 'one-team-for-the-whole-brand'],
  },

  {
    slug: 'one-team-for-the-whole-brand',
    category: 'studio',
    title: 'Why a website built by strangers uses your logo wrong',
    metaTitle: 'Why One Team Should Handle Your Whole Brand | LogoOrbit',
    metaDescription:
      'The specific ways a brand degrades when the logo, the website and the video are made by different suppliers, and what keeping them together actually fixes.',
    excerpt:
      'Nobody notices the moment a brand goes soft. It happens across four suppliers, each of whom did their own job perfectly well.',
    published: '2026-05-12',
    updated: '2026-06-28',
    readMinutes: 6,
    keywords: 'brand consistency, one agency for branding and web, brand guidelines',
    sections: [
      {
        p: [
          'The pitch for using one supplier is normally convenience, which is a weak argument. Managing four suppliers is not that hard. The real argument is that a brand degrades at the seams between them, and it degrades in ways nobody flags because every individual decision was defensible.',
        ],
      },
      {
        h: 'How it actually goes wrong',
        ul: [
          'The web developer needs the logo on a dark header, only has the full-colour version, and adds a white box behind it. Perfectly sensible. Now there is a white box in your brand.',
          'The mark has a minimum clear space. Nobody told the developer, so it sits eight pixels from a heading and reads as part of it.',
          'Brand blue is a print colour. Converted naively to screen it turns slightly purple, and every button on the site is now slightly the wrong blue.',
          'The video editor has a PNG at 800 pixels and needs it at 4K. It gets upscaled and the edges go soft in the one place people are looking.',
          'The social manager needs a square avatar, crops the horizontal lockup, and the wordmark disappears. The icon alone was never designed to carry the name.',
        ],
        p: [
          'Five small things. Individually nothing. Together they are the reason a brand can look sharp in the guidelines document and vague everywhere a customer meets it.',
        ],
      },
      {
        h: 'What keeping it together fixes',
        p: [
          'When the same studio draws the mark and builds the site, the dark-background variant exists before anybody needs it, because the person who drew it knew a dark header was coming. The screen palette is defined alongside the print one. The video team has the vector. The square avatar is a designed lockup rather than a crop.',
          'None of that is clever. It is just the difference between assets produced in anticipation and assets requested under deadline.',
        ],
      },
      {
        h: 'The honest counter-argument',
        p: [
          'One supplier is also one point of failure, and a studio that is genuinely excellent at logos may be mediocre at apps. That is a fair objection and the answer is to check the work rather than the pitch: look at the websites, look at the animation, and if a discipline is thin in the portfolio, treat it as thin.',
          'The other legitimate reason to split suppliers is that you already have a brand you are happy with. In that case what you need is not a new identity, it is a proper set of guidelines so the next four suppliers make fewer of the mistakes above.',
        ],
      },
      {
        h: 'If you are using several suppliers, ask for these',
        ol: [
          'A reversed (light-on-dark) lockup and a single-colour version, as vectors.',
          'A square, avatar-safe lockup that still reads at 32 pixels.',
          'Screen colour values as well as print ones, stated explicitly.',
          'Minimum size and minimum clear space, written down.',
          'The editable master files, not just exports. Everything above becomes possible with them and impossible without.',
        ],
      },
    ],
    faqs: [
      {
        q: 'We already have a logo. Can you do just the website?',
        a: 'Yes, and we will ask for the vector files first. If they no longer exist, redrawing the mark properly is usually a small job and it prevents every problem in the list above.',
      },
      {
        q: 'Is a brand guidelines document worth buying on its own?',
        a: 'If several suppliers are touching your brand, yes — it is the cheapest thing on the list and it prevents the most expensive kind of drift.',
      },
    ],
    relatedServices: ['brand-guidelines', 'brand-identity-design'],
    relatedGuides: [],
    relatedPosts: ['notes-from-the-motion-desk', 'what-clients-ask-in-the-first-call'],
  },

  {
    slug: 'small-business-branding-2026',
    category: 'industry',
    title: 'What changed in small business branding this year',
    metaTitle: 'Small Business Branding Trends 2026 | LogoOrbit',
    metaDescription:
      'What actually moved in small business branding this year, drawn from live briefs rather than trend lists: legibility at 32 pixels, sound, and the return of the wordmark.',
    excerpt:
      'Trend lists are written in December by people guessing. This is drawn from what arrived in briefs, which is a slower and more boring signal, and a more reliable one.',
    published: '2026-07-02',
    updated: '2026-07-28',
    readMinutes: 7,
    keywords: 'branding trends 2026, small business logo trends, brand design direction',
    sections: [
      {
        p: [
          'Most trend articles describe what designers admired last year, which is a poor predictor of what businesses will need next year. What follows is drawn from briefs — what clients asked for, what they rejected, and what they came back to change six months later.',
        ],
      },
      {
        h: 'The wordmark came back, quietly',
        p: [
          'For years the default request was a symbol: something that could stand alone as an app icon. Increasingly the brief asks for the name to be legible first, with the symbol as a companion rather than the lead. The reason is unglamorous — most small businesses are discovered in a search result, a map pin or a directory listing, and in all three the name is doing the work. A beautiful abstract mark next to a name nobody can read is a solved problem being solved twice.',
        ],
      },
      {
        h: 'Everything is now tested at 32 pixels first',
        p: [
          'The favicon, the map pin, the app icon, the profile picture. These used to be the last export. They are now, in practice, where a mark lives most of the time, and briefs increasingly say so. It changes the drawing: fewer elements, heavier weights, more contrast, and a deliberate simplified variant rather than a scaled-down primary.',
        ],
      },
      {
        h: 'Colour got more careful, not more conservative',
        ul: [
          'Dark mode moved from a nice-to-have to a stated requirement, which means a palette needs a second set of values rather than one.',
          'Contrast requirements are being asked about by clients, not just by us. Accessibility arrived in small business briefs this year in a way it had not before.',
          'The very pale, very tasteful palettes of the last few years are receding in categories where standing out on a shelf or a feed matters more than looking calm.',
        ],
      },
      {
        h: 'Sound became part of a brand for ordinary businesses',
        p: [
          'Not for everyone, but no longer only for large advertisers. If a business posts video regularly — and a great many small ones now do — a two-second audio signature attached to the logo sting is a real, cheap piece of brand equity. Two years ago this was a specialist request. Now it turns up on the motion desk from single-location businesses.',
        ],
      },
      {
        h: 'What did not change',
        p: [
          'Distinctiveness still beats prettiness, and it still loses arguments internally to whoever wants to look like the market leader. The most common regret we hear at redesign time is not "it was ugly", it is "it looked like everyone else and we stopped noticing". That has been the number one reason for a rebrand for fifteen years and this year did not move it.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I redesign my logo to follow any of this?',
        a: 'Almost certainly not on its own. Redesign when the mark is failing at a job — illegible small, unusable on dark, wrong for a market you have moved into. Redesigning to be current is how brands lose the recognition they spent years buying.',
      },
      {
        q: 'Is it worth adding a simplified icon version to an existing logo?',
        a: 'Very often yes, and it is a small job. If your current mark turns to mush as a favicon or a map pin, a properly drawn small-size variant fixes the most visible problem for a fraction of a rebrand.',
      },
    ],
    relatedServices: ['logo-redesign', 'brand-guidelines'],
    relatedGuides: ['what-makes-a-good-logo'],
    relatedPosts: ['one-team-for-the-whole-brand', 'the-brief-that-makes-a-good-logo'],
  },
]

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]))

export const postsByCategory = blogCategories
  .map((c) => ({ ...c, posts: posts.filter((p) => p.category === c.id) }))
  .filter((c) => c.posts.length > 0)

/** Newest first, which is what a blog index should lead with. */
export const postsByDate = [...posts].sort((a, b) => (a.published < b.published ? 1 : -1))
