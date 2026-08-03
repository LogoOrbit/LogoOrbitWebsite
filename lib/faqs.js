/**
 * The full FAQ, grouped the way people actually ask.
 *
 * The home page carries a short version (lib/site.js → faqs). This is the
 * long one: everything support gets asked twice a week, answered in the same
 * plain voice we use on the phone.
 */

export const faqGroups = [
  {
    id: 'getting-started',
    title: 'Getting started',
    icon: 'spark',
    items: [
      {
        q: 'I have no idea what I want. Can you still help?',
        a: 'That is where most people start, and it is genuinely fine. Fill in the short brief or just call us. A designer will ask a handful of ordinary questions, what you sell, who buys it, what you like the look of, and turn your answers into a direction. You never have to know a single design term.',
      },
      {
        q: 'How do I begin?',
        a: 'Send the brief or pick up the phone. There is nothing to pay to have that first conversation, and no card is taken to get a quote. Once you are happy with the plan and the price, we take payment and a designer starts.',
      },
      {
        q: 'Do I have to pay before I see anything?',
        a: 'The consultation is free and unlimited. Design work starts once the package is paid or the agreed deposit has cleared, which is what puts a named designer on your job rather than a queue position.',
      },
      {
        q: 'Can I talk to a real person?',
        a: 'Yes, and quickly. Call the number in the header, or message the WhatsApp button in the corner of the page for anything short. Both reach the same team, no bots and no ticket numbers.',
      },
    ],
  },
  {
    id: 'design',
    title: 'Design and revisions',
    icon: 'logo',
    items: [
      {
        q: 'How fast will I see my first designs?',
        a: 'Usually within 24 hours of the brief, and never later than 48. Animation runs to 72 hours. If you are up against a launch date, say so up front and we will move your job to the front of the queue.',
      },
      {
        q: 'How many concepts do I get?',
        a: 'It depends on the package, and the number is printed on each one. On our Art Director plans concepts are unlimited, which means we keep exploring directions until one of them is clearly right.',
      },
      {
        q: 'How many revisions can I ask for?',
        a: 'On Gold packages and above, as many as it takes. There is no counter running and nobody will ever tell you that you have used up your rounds. Entry-level packages list their included rounds, and if you want more we quote them before we start, never after.',
      },
      {
        q: 'Are the designs original, or from a template library?',
        a: 'Every mark is drawn from scratch for your business by our own team. We do not use template generators, we do not buy stock marks, and a concept you did not choose is never resold to somebody else as-is.',
      },
      {
        q: 'What if I do not like anything you send?',
        a: 'Tell us plainly, and tell us why, even if the reason is "it just feels wrong". That is useful information. We go back and explore a different direction. It happens, and it is a normal part of the process rather than a problem.',
      },
      {
        q: 'Can you work from a sketch I have drawn?',
        a: 'Please send it. A rough sketch on the back of an envelope tells us more about what is in your head than three pages of description. We will treat it as a starting point, not a limit.',
      },
      {
        q: 'Do you work in my industry?',
        a: 'Almost certainly. Fifteen years in, we have branded plumbers, law firms, churches, gyms, food trucks, construction firms, realtors, photographers and software companies. Ask and we will show you the closest thing in our portfolio.',
      },
    ],
  },
  {
    id: 'files',
    title: 'Files and ownership',
    icon: 'layers',
    items: [
      {
        q: 'What files do I actually receive?',
        a: 'The ones printers ask for, AI, EPS, vector PDF and SVG, and the ones the web and social profiles need, PNG with a transparent background and JPG, at every size you are likely to need. If a printer later asks for something unusual, forward us the email and we will make it.',
      },
      {
        q: 'Do I own the logo when it is finished?',
        a: 'Only after the separate $499 Copyright Assignment & Commercial Use Certificate is paid, completed and signed, and the underlying logo project is paid in full. The design package alone does not transfer copyright or authorize public or commercial use.',
      },
      {
        q: 'Can I use it on anything I like?',
        a: 'Yes. Signage, packaging, vehicles, merchandise, a television advert if you want one. It is your property. You do not need our permission and you do not owe us a royalty.',
      },
      {
        q: 'I have lost my files. Can you resend them?',
        a: 'Email support with the name on the order. We keep client files long after a project closes, precisely because this call comes in three years later.',
      },
      {
        q: 'Will you show my logo in your portfolio?',
        a: 'We might, once it is live, and never anything confidential. If you would rather we did not, email the legal address and it comes down. No argument and no form.',
      },
    ],
  },
  {
    id: 'legal',
    title: 'Trademarks and legal',
    icon: 'scales',
    items: [
      {
        q: 'Can you register my logo as a trademark?',
        a: 'Yes. We run a clearance search first and tell you honestly whether the name looks likely to clash, then prepare and file the application with the USPTO and reply to the examiner on your behalf if questions come back. Our filing service is $599, plus $350 for each class your business needs, and the USPTO charges its own government filing fee per class on top.',
      },
      {
        q: 'Is registration guaranteed?',
        a: 'No, and be wary of anyone who says it is. The USPTO decides, not us. What we can do is give you a straight assessment before you spend the money, and handle the process properly so the application is not refused on a technicality.',
      },
      {
        q: 'What is the difference between owning a logo and registering it?',
        a: 'Owning it means the design is your property and you can use it anywhere. Registering it gives you the legal standing to stop somebody else using something confusingly similar. Most small businesses start with the first and add the second once they are trading seriously.',
      },
      {
        q: 'Someone is using my logo. What do I do?',
        a: 'Email the details to legal@logoorbit.net, with links or screenshots. Greg Adams, our Senior Legal Counsel, looks after brand protection and will tell you what your options actually are before anybody spends money on them.',
      },
      {
        q: 'Who do I contact about privacy, contracts or an NDA?',
        a: 'The same desk, at legal@logoorbit.net. Email is the only route to it, so everything arrives in writing. Anything involving rights, data or a signature from our side goes to legal rather than to support, and it is answered by a named lawyer, normally within one working day. The phone and WhatsApp lines are support lines and will not reach him.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing and payment',
    icon: 'shop',
    items: [
      {
        q: 'How much does a logo cost?',
        a: 'Packages start at $49 and run to the Art Director plans in the high hundreds, depending on how much you need alongside the mark itself. Everything is priced on the pricing page, in dollars, with what is included spelled out. No hourly rates and no surprise line items.',
      },
      {
        q: 'Are there hidden costs?',
        a: 'No. The price on the package is the price. The only things charged separately are ones we tell you about first: extra revision rounds on entry-level packages, government trademark fees paid to the USPTO, printing, and domain or hosting renewals that go to the provider rather than to us.',
      },
      {
        q: 'Can I pay in instalments?',
        a: 'On larger website, app and publishing projects, yes, to a schedule we agree in writing before work starts. Smaller design packages are paid up front.',
      },
      {
        q: 'Is my card safe?',
        a: 'Payments run through our processor’s secure form. We never see a full card number and we never store one. All we keep is the record of what was bought and whether it cleared.',
      },
    ],
  },
  {
    id: 'services',
    title: 'Websites, apps and video',
    icon: 'website',
    items: [
      {
        q: 'Do you do anything besides logos?',
        a: 'Quite a lot. Websites and online shops, business cards and print, video and YouTube editing, thumbnails, logo animation, sound design, mobile apps, book covers and Amazon listings. One team, one point of contact, one invoice.',
      },
      {
        q: 'Can I edit my website myself afterwards?',
        a: 'Yes. Dynamic and e-commerce builds ship with an admin panel and a walkthrough so your team can change text, prices and images without calling us. There is no lock-in and no compulsory retainer.',
      },
      {
        q: 'Will my site work on phones and show up on Google?',
        a: 'Layouts are designed at phone width first, because that is where your traffic is. Clean markup, a sitemap, analytics and Search Console are wired in before launch, which is what search engines need to index you properly.',
      },
      {
        q: 'Do you publish apps to the App Store and Google Play?',
        a: 'We do. Listing copy, screenshots and submission are handled through to approval, including dealing with any rejection. The source code, the back end and the store accounts are all in your name.',
      },
      {
        q: 'Can you animate the logo you designed for me?',
        a: 'Yes, and it is the easy case because we already have the vector artwork. Animation packages start at $299 and deliver full HD in 72 hours, with royalty-free music and a transparent version for video overlays.',
      },
    ],
  },
  {
    id: 'support',
    title: 'After delivery',
    icon: 'team',
    items: [
      {
        q: 'What happens once the job is finished?',
        a: 'You get the file pack listed in your package and a person you can still call. For a logo, the project-specific written copyright transfer is a separate $499 purchase and must be signed before public or commercial use.',
      },
      {
        q: 'Can you make a small change later?',
        a: 'Usually yes, and often at no charge if it is genuinely small, adding a strapline, resizing for a new sign. Ask, and we will tell you straight away whether it is a favour or a quote.',
      },
      {
        q: 'How do I reach you fastest?',
        a: 'WhatsApp for anything short, the phone for anything you would rather talk through, email for anything with files attached. All three reach the same team during working hours.',
      },
    ],
  },
]

export const faqCount = faqGroups.reduce((total, group) => total + group.items.length, 0)

/**
 * The long version of each question, so every one can have a page of its own.
 *
 * The accordion answer is the short answer somebody wants when they are
 * scanning. A page needs one more thing: the reason behind the answer, or the
 * edge case that makes people ask it twice. That is what `more` carries.
 *
 * Keyed by the question text so the two can never drift apart — if a question
 * is reworded above and not here, the build surfaces it as a missing entry
 * rather than silently attaching the wrong page.
 */
const detail = {
  'I have no idea what I want. Can you still help?': {
    slug: 'i-do-not-know-what-i-want',
    more: [
      'The people who arrive with the most detailed instructions are not the ones who end up happiest. A brief that specifies a colour, a shape and a font has already made three decisions on the designer’s behalf, usually without knowing what those decisions cost. Arriving with nothing but a description of the business is a legitimate starting position and frequently a better one.',
      'What we need from you is knowledge you already have: what you sell, who buys it, and what your customers worry about when they choose. Nobody expects you to know design vocabulary, and using it incorrectly is more likely to send us the wrong way than saying nothing at all.',
    ],
    links: [
      { name: 'Send a brief', href: '/brief' },
      { name: 'How to write a design brief', href: '/guides/design-brief-how-to-write' },
      { name: 'The brief that makes a good logo', href: '/blog/the-brief-that-makes-a-good-logo' },
    ],
  },
  'How do I begin?': {
    slug: 'how-do-i-begin',
    more: [
      'There are three routes in and none of them costs anything: the brief form, the phone, or a direct email to one of the two named sales reps. The brief form is the most efficient because it asks the questions we would otherwise have to ask you, but a phone call works perfectly well if you would rather talk it through.',
      'Nothing is charged until you have seen a scope and a price and said yes to both. There is no card taken to produce a quote.',
    ],
    links: [
      { name: 'Send a brief', href: '/brief' },
      { name: 'Talk to a named person', href: '/team' },
      { name: 'Contact us', href: '/contact' },
    ],
  },
  'Do I have to pay before I see anything?': {
    slug: 'do-i-pay-before-seeing-designs',
    more: [
      'Design work starts once a package is paid or an agreed deposit has cleared. That is what puts a named designer on your job rather than a queue position, and it is the same arrangement every studio that pays its designers a salary has to run.',
      'What is genuinely free and genuinely unlimited is the conversation before that point: scoping, advice on which package fits, and an honest answer about whether you need the tier you were thinking of.',
    ],
    links: [
      { name: 'Pricing and packages', href: '/pricing' },
      { name: 'Every package', href: '/pricing/packages' },
    ],
  },
  'Can I talk to a real person?': {
    slug: 'can-i-talk-to-a-real-person',
    more: [
      'Yes, and quickly. The phone number in the header is answered by the support desk during opening hours, the WhatsApp button reaches the same team, and both are people rather than bots.',
      'The one deliberate exception is the legal desk, which is email only. That is not to keep you at a distance — it is so that every legal question and answer exists in writing, dated, for both sides.',
    ],
    links: [
      { name: 'Contact us', href: '/contact' },
      { name: 'Meet the team', href: '/team' },
      { name: 'Legal and compliance', href: '/legal' },
    ],
  },
  'How fast will I see my first designs?': {
    slug: 'how-fast-are-first-designs',
    more: [
      'Inside 24 hours is normal and 48 is the outside limit for logo work. Animation runs to 72 hours because rendering and revision cycles are slower. Those are the parts we control.',
      'The part we do not control is feedback, and it is almost always the longer half. A project that takes three weeks usually contains nineteen days of waiting for a decision and two days of drawing. If there is a hard date, say so up front and the queue rearranges around it.',
    ],
    links: [
      { name: 'Logo design', href: '/logo-design' },
      { name: 'Rush delivery', href: '/pricing/add-on-rush-delivery' },
    ],
  },
  'How many concepts do I get?': {
    slug: 'how-many-concepts-do-i-get',
    more: [
      'The number is printed on every package rather than negotiated afterwards: two at the entry tier, rising to unlimited on the Art Director plans. More concepts is not automatically better — four directions explored properly beats ten drawn quickly — but it does buy room to test an idea that might not work.',
      'What unlimited actually changes is the incentive. When there is no counter, the designer is paid to find the right answer rather than to produce a quota.',
    ],
    links: [
      { name: 'Logo packages', href: '/pricing#logo' },
      { name: 'Every package', href: '/pricing/packages' },
    ],
  },
  'How many revisions can I ask for?': {
    slug: 'how-many-revisions',
    more: [
      'Gold and above are unlimited, and there is no counter running in the background. Entry packages print their included rounds, and if you want more they are quoted before we start rather than invoiced after.',
      'The one thing that ends a run of revisions is a change of brief rather than a change of design. "Make it navy" is a revision. "We have renamed the company" is a new job, and we will say so plainly instead of absorbing it and resenting it.',
    ],
    links: [
      { name: 'Why revision counters hurt the work', href: '/blog/revision-counters' },
      { name: 'Logo packages', href: '/pricing#logo' },
    ],
  },
  'Are the designs original, or from a template library?': {
    slug: 'are-designs-original',
    more: [
      'Every mark is drawn from scratch by our own team. No template generators, no purchased stock marks, and a concept you did not choose is never resold as-is to somebody else.',
      'There is a test you can apply to any studio rather than taking the promise on faith: ask whether they will sign a copyright assignment. Anybody reselling template output cannot, because they do not hold the rights to give away.',
    ],
    links: [
      { name: 'Where we use AI and where we do not', href: '/blog/ai-in-the-studio' },
      { name: 'Portfolio', href: '/portfolio' },
    ],
  },
  'What if I do not like anything you send?': {
    slug: 'what-if-i-do-not-like-the-designs',
    more: [
      'Say so plainly, and say it early. "It just feels wrong" is genuinely useful information even without a reason attached — it tells us the direction is off rather than the execution, which is a much more valuable thing to learn in round one than in round four.',
      'The version of this that goes badly is the client who says everything is fine out of politeness and then goes quiet. Nobody here is offended by a rejected concept; it is a normal part of the process.',
    ],
    links: [
      { name: 'Why revision counters hurt the work', href: '/blog/revision-counters' },
      { name: 'What makes a good logo', href: '/guides/what-makes-a-good-logo' },
    ],
  },
  'Can you work from a sketch I have drawn?': {
    slug: 'can-you-work-from-my-sketch',
    more: [
      'Please send it. A rough sketch communicates more about what is in your head than three paragraphs of description, and it does not need to be any good — nobody is judging the drawing.',
      'We will treat it as a starting point rather than a specification. Sometimes the sketch turns out to be the answer; more often it reveals what you are actually after, which is a different and more useful thing.',
    ],
    links: [
      { name: 'Send a brief', href: '/brief' },
      { name: 'The brief that makes a good logo', href: '/blog/the-brief-that-makes-a-good-logo' },
    ],
  },
  'Do you work in my industry?': {
    slug: 'do-you-work-in-my-industry',
    more: [
      'Almost certainly — the portfolio covers technology, real estate, construction, trades, fitness, photography, fashion, food, community organisations and more, and it is filterable by sector.',
      'The honest caveat is that sector experience matters less than people expect. It helps us learn the conventions quickly, and it also makes it tempting to reach for the same solution twice. The portfolio filter exists partly so you can check whether our work in your sector looks like a set of variations or a set of different answers.',
    ],
    links: [
      { name: 'Industries we design for', href: '/industries' },
      { name: 'Portfolio', href: '/portfolio' },
    ],
  },
  'What files do I actually receive?': {
    slug: 'what-files-do-i-receive',
    more: [
      'The ones printers ask for — AI, EPS, PDF and SVG — and the ones websites and social profiles need, which is PNG with transparency and JPG, at every size. Higher packages include the editable master file, which is the one everything else can be regenerated from.',
      'If a printer or a developer ever asks for something unusual, forward us the email. Producing it from the masters is a small job and it is not billed as a favour.',
    ],
    links: [
      { name: 'Logo file formats explained', href: '/guides/logo-file-formats-explained' },
      { name: 'Logo packages', href: '/pricing#logo' },
    ],
  },
  'Do I own the logo when it is finished?': {
    slug: 'do-i-own-the-logo',
    more: [
      'Completely, and in writing. Copyright is assigned to you rather than licensed, there is nothing to renew, and no further payment is ever due for using the mark.',
      'This is the difference that matters most later. A licence cannot be registered as a trademark in your name and is awkward when a business is sold. An assignment is the thing a buyer’s solicitor will ask to see, which is why it is issued as standard rather than on request.',
    ],
    links: [
      { name: 'Legal and compliance', href: '/legal' },
      { name: 'Greg Adams, Senior Legal Counsel', href: '/team/greg-adams' },
    ],
  },
  'Can I use it on anything I like?': {
    slug: 'can-i-use-my-logo-anywhere',
    more: [
      'Yes. Signage, vehicles, merchandise, packaging, tattoos if you insist. Once copyright is assigned there is no category of use you have to ask permission for, and no royalty on anything you sell.',
      'The only elements carrying separate terms are licensed third-party assets such as fonts or stock imagery, and those are named in the handover so you know exactly what you hold.',
    ],
    links: [
      { name: 'Terms and conditions', href: '/terms' },
      { name: 'Brand guidelines', href: '/services/brand-guidelines' },
    ],
  },
  'I have lost my files. Can you resend them?': {
    slug: 'i-lost-my-logo-files',
    more: [
      'Write to support and we will resend them. We keep master files for past clients, and re-exporting a format you have lost is not a chargeable event.',
      'It is worth storing the vector masters somewhere you will still have access to in five years — a cloud drive rather than a laptop. Everything else can be rebuilt from them, which is why they are the files that matter.',
    ],
    links: [
      { name: 'Contact support', href: '/contact' },
      { name: 'Logo file formats explained', href: '/guides/logo-file-formats-explained' },
    ],
  },
  'Will you show my logo in your portfolio?': {
    slug: 'will-you-show-my-logo',
    more: [
      'By default yes — we show finished work as ours to have made, and every mark on the portfolio wall now has a page describing the sector it was drawn for and how work of that kind is built.',
      'If a launch is confidential or you would simply rather not appear, say so and it stays out. We also never publish a client’s budget, timeline or commercial results, because those are yours rather than ours to disclose.',
    ],
    links: [
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Privacy policy', href: '/privacy' },
    ],
  },
  'Can you register my logo as a trademark?': {
    slug: 'can-you-register-my-trademark',
    more: [
      'Yes, and it is handled by our legal desk rather than the design team. A clearance search runs first, and you get an honest read on the risk rather than an encouraging one. Then the application is prepared and filed with the USPTO, and if an examiner comes back with questions the response is drafted for you.',
      'Our filing service is $599, plus $350 per class. The USPTO charges its own government filing fee per class on top, which is paid directly to them.',
    ],
    links: [
      { name: 'Trademark registration', href: '/pricing/trademark-registration' },
      { name: 'Trademarking your logo', href: '/guides/trademark-your-logo' },
    ],
  },
  'Is registration guaranteed?': {
    slug: 'is-trademark-registration-guaranteed',
    more: [
      'No, and any firm promising otherwise is misrepresenting how the process works. Registration is decided by a government examiner applying rules about distinctiveness and conflict, and nobody outside that office can guarantee the outcome.',
      'What can be done is stacking the odds properly: a clearance search before filing, sensible class selection, and an application prepared to the standard the examiner expects. Most refusals we see elsewhere trace back to skipping the first of those.',
    ],
    links: [
      { name: 'Trademark registration', href: '/pricing/trademark-registration' },
      { name: 'Greg Adams, Senior Legal Counsel', href: '/team/greg-adams' },
    ],
  },
  'What is the difference between owning a logo and registering it?': {
    slug: 'owning-versus-registering-a-logo',
    more: [
      'Owning is about the artwork. Copyright arrives with the design and is assigned to you by us, and it means nobody can copy the drawing itself.',
      'Registering is about the market. A trademark is a right in a name or mark for a class of goods and services, and it is what stops a competitor trading under something confusingly similar even if they drew their own version. Most businesses need the first. Businesses in competitive or franchised categories usually want both.',
    ],
    links: [
      { name: 'Trademarking your logo', href: '/guides/trademark-your-logo' },
      { name: 'Legal and compliance', href: '/legal' },
    ],
  },
  'Someone is using my logo. What do I do?': {
    slug: 'someone-is-using-my-logo',
    more: [
      'Gather evidence before doing anything else: screenshots with visible dates, URLs, and where you first saw it. Then write to the legal desk. Where the mark is one we designed, our records of authorship and the signed assignment are strong evidence of your position.',
      'What you will get back is a realistic account of the options rather than a promise of an outcome. Some of these resolve with a letter; some are not worth the cost of pursuing, and you deserve to be told which one you are looking at.',
    ],
    links: [
      { name: 'Legal and compliance', href: '/legal' },
      { name: 'Greg Adams, Senior Legal Counsel', href: '/team/greg-adams' },
    ],
  },
  'Who do I contact about privacy, contracts or an NDA?': {
    slug: 'who-handles-privacy-and-contracts',
    more: [
      'The legal desk, by email. That covers NDAs, service agreements, vendor paperwork, purchase orders needing a signature from our side, and any request about the data we hold on you.',
      'Design and support questions should not go there — they will simply be forwarded and slowed down. The support inbox is watched all day and everyone on the team can see it.',
    ],
    links: [
      { name: 'Legal and compliance', href: '/legal' },
      { name: 'Privacy policy', href: '/privacy' },
      { name: 'Greg Adams, Senior Legal Counsel', href: '/team/greg-adams' },
    ],
  },
  'How much does a logo cost?': {
    slug: 'how-much-does-a-logo-cost',
    more: [
      'Ours start at $49 and the tiers are published in full, so the price you read is the price you pay. What changes between them is how many directions get explored, how long refinement runs, and which files come back.',
      'Across the wider market the range is genuinely enormous, from marketplace templates to five-figure agency engagements, and the deliverable sounds identical at every level. The guide below sets out what actually differs so you can work out which tier your business needs.',
    ],
    links: [
      { name: 'How much does a logo cost?', href: '/guides/how-much-does-a-logo-cost' },
      { name: 'Every package', href: '/pricing/packages' },
      { name: 'What a $99 logo pays for', href: '/blog/what-99-dollars-buys' },
    ],
  },
  'Are there hidden costs?': {
    slug: 'are-there-hidden-costs',
    more: [
      'Not from us. The package price covers what the package lists, and anything added later is quoted before it is started rather than appearing on an invoice.',
      'There are third-party costs on some kinds of work and we raise them before you commit rather than after: domain and hosting renewals, store platform fees, app store developer accounts, font and stock licences, and the USPTO fee on a trademark filing. Those are real, they are not ours, and pretending they do not exist would only move the surprise later.',
    ],
    links: [
      { name: 'Pricing and packages', href: '/pricing' },
      { name: 'Why we publish our prices', href: '/blog/why-we-publish-our-prices' },
    ],
  },
  'Can I pay in instalments?': {
    slug: 'can-i-pay-in-instalments',
    more: [
      'On larger projects, yes. The standard arrangement is half to start and half on approval of the finished work, and on longer builds it can be split across milestones instead.',
      'Ask before ordering rather than after. A payment plan agreed at the quote stage is straightforward; one requested mid-project is a conversation nobody enjoys.',
    ],
    links: [
      { name: 'The Complete Brand', href: '/pricing/complete-brand' },
      { name: 'Talk to a named person', href: '/team' },
    ],
  },
  'Is my card safe?': {
    slug: 'is-my-card-safe',
    more: [
      'Card details are handled by the payment processor and are never stored on our systems. We see that a payment succeeded, not the number that paid it.',
      'If you would rather not pay by card at all, bank transfer and invoiced purchase orders are both available — say so and it will be arranged.',
    ],
    links: [
      { name: 'Privacy policy', href: '/privacy' },
      { name: 'Contact us', href: '/contact' },
    ],
  },
  'Do you do anything besides logos?': {
    slug: 'do-you-do-more-than-logos',
    more: [
      'Websites and online shops, business cards and print, packaging, signage, video and YouTube editing, thumbnails, logo animation, sound design, mobile apps, book covers and Amazon listings. One team and one point of contact for all of it.',
      'The reason to care is consistency rather than convenience. A website built by people who did not draw the mark tends to use it slightly wrong, and slightly wrong across forty pages is how a brand quietly goes soft.',
    ],
    links: [
      { name: 'All services', href: '/services' },
      { name: 'Why one team should hold the whole brand', href: '/blog/one-team-for-the-whole-brand' },
    ],
  },
  'Can I edit my website myself afterwards?': {
    slug: 'can-i-edit-my-website-myself',
    more: [
      'On the dynamic and e-commerce tiers, yes, and you are shown how before handover. Static builds are edited by us, which is cheaper to run if you change things rarely.',
      'Worth deciding honestly at the quote stage: a site you can edit and never do is money spent on a capability you are not using, and a site you cannot edit and want to change weekly is a monthly irritation.',
    ],
    links: [
      { name: 'Website design', href: '/website-design' },
      { name: 'Website packages', href: '/pricing#website' },
    ],
  },
  'Will my site work on phones and show up on Google?': {
    slug: 'will-my-site-work-on-phones-and-google',
    more: [
      'Every build is designed for phones first, because that is where most visitors arrive, and the technical groundwork search engines look for — clean markup, sensible headings, fast loading, correct metadata — is part of the build rather than an upsell.',
      'What no honest studio can promise is a ranking position. Search results depend on your competition, your content and how long the domain has existed. What we can do is make sure nothing about the site is holding you back.',
    ],
    links: [
      { name: 'Website design', href: '/website-design' },
      { name: 'Website redesign and SEO', href: '/guides/website-redesign-seo' },
      { name: 'Core Web Vitals guide', href: '/guides/core-web-vitals-guide' },
    ],
  },
  'Do you publish apps to the App Store and Google Play?': {
    slug: 'do-you-publish-apps-to-the-stores',
    more: [
      'Yes, submission to both stores is part of app projects, including responding to review feedback if a submission comes back with questions.',
      'The developer accounts themselves are yours: Apple and Google each charge their own fees and each holds the account in your name, which is the right arrangement — an app published under a supplier’s account is a hostage.',
    ],
    links: [
      { name: 'Mobile applications', href: '/mobile-application' },
      { name: 'App packages', href: '/pricing#app' },
    ],
  },
  'Can you animate the logo you designed for me?': {
    slug: 'can-you-animate-my-logo',
    more: [
      'Yes, and animating a mark we drew is the easy version because the vector masters already exist. If somebody else designed it, send the vector files; if only a PNG survives, the mark is redrawn first, since animating a low-resolution image produces soft edges in the one place everybody is looking.',
      'Sound is available too. A two-second audio signature attached to a logo sting is worth more than most people expect, and it is no longer only for large advertisers.',
    ],
    links: [
      { name: 'Video, animation and YouTube', href: '/animation' },
      { name: 'Notes from the motion desk', href: '/blog/notes-from-the-motion-desk' },
    ],
  },
  'What happens once the job is finished?': {
    slug: 'what-happens-after-delivery',
    more: [
      'You get the full file set and the written copyright assignment, and the project is yours. There is no ongoing licence, no renewal and nothing further to pay.',
      'We keep the master files, so a format you lose later can be resent. Most clients come back at some point for the next thing rather than the same thing, and the brief history stays with us either way.',
    ],
    links: [
      { name: 'Contact support', href: '/contact' },
      { name: 'Add-ons', href: '/pricing#add-ons' },
    ],
  },
  'Can you make a small change later?': {
    slug: 'can-you-make-a-small-change-later',
    more: [
      'Usually yes, and small things — a file format, a colour value, a resize — are frequently not chargeable at all. Anything that amounts to new design work is quoted before it starts.',
      'If you expect a steady stream of small changes, the care plans exist for exactly that and work out cheaper than paying for each one individually.',
    ],
    links: [
      { name: 'Website care plan', href: '/pricing/add-on-website-care-plan' },
      { name: 'Contact support', href: '/contact' },
    ],
  },
  'How do I reach you fastest?': {
    slug: 'how-do-i-reach-you-fastest',
    more: [
      'WhatsApp for anything short — a price check, "is my file ready", a question before ordering. The phone during opening hours for anything that needs a conversation. Support by email for anything with attachments or a history worth keeping.',
      'For a new project with a price attached, write to whichever of the two named sales reps covers that kind of work; they can commit to a scope and a date in a way a general inbox cannot.',
    ],
    links: [
      { name: 'Contact us', href: '/contact' },
      { name: 'Meet the team', href: '/team' },
    ],
  },
}

/** Every question, flattened, with its group and its page slug attached. */
export const faqItems = faqGroups.flatMap((group) =>
  group.items.map((item) => {
    const extra = detail[item.q] || {}
    return {
      ...item,
      slug:
        extra.slug ||
        item.q
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .split('-')
          .slice(0, 8)
          .join('-'),
      more: extra.more || [],
      links: extra.links || [],
      group: { id: group.id, title: group.title, icon: group.icon },
    }
  })
)

export const faqBySlug = Object.fromEntries(faqItems.map((item) => [item.slug, item]))
