import { testimonials } from './site'

/**
 * Content for the reviews page.
 *
 * The quotes themselves live in lib/site.js alongside the rest of the client
 * feedback, so the home page and this page can never drift apart. What lives
 * here is the framing: the themes that come up again and again in what people
 * write, and the honest explanation of where the rating comes from.
 */

export const reviewThemes = [
  {
    id: 'speed',
    icon: 'clock',
    title: 'The turnaround surprises people',
    body:
      'The single most common line in our feedback is some version of "I did not expect it that fast". First concepts inside 24 hours is normal here, and clients who have waited a fortnight elsewhere tend to say so in writing.',
  },
  {
    id: 'listening',
    icon: 'team',
    title: 'They felt listened to',
    body:
      'People notice when a designer asks about the business rather than about hex codes. The reviews that mean the most to us are the ones that say we understood the market before we drew anything.',
  },
  {
    id: 'original',
    icon: 'spark',
    title: 'Nothing looked recycled',
    body:
      'Clients arrive braced for template output and say afterwards that the concepts were clearly drawn for them. That is the whole point of keeping the team in-house rather than farming briefs out.',
  },
  {
    id: 'one-team',
    icon: 'layers',
    title: 'One team for the whole brand',
    body:
      'A lot of feedback comes from people who came for a logo and stayed for the website, the cards and the animation. One point of contact instead of four suppliers is the thing they mention.',
  },
]

export const reviewFacts = [
  {
    title: 'Only real clients',
    body: 'Every review we publish comes from somebody who paid for work and received it. We do not run incentive schemes for feedback and we have never bought a review.',
  },
  {
    title: 'The bad ones stay up',
    body: 'When a project goes wrong we would rather fix it than bury it. Criticism that leads to a change in how we work is worth more to us than another five stars.',
  },
  {
    title: 'Read them anywhere',
    body: 'Our clients leave feedback on the independent platforms as well as with us. Those pages are not ours to edit, which is exactly why they are worth reading.',
  },
]

export const reviewPlatforms = [
  { name: 'Trustpilot', href: 'https://www.trustpilot.com/review/www.logoorbit.com', note: 'Independent, unedited' },
  { name: 'Google', href: 'https://www.google.com/search?q=LogoOrbit+reviews', note: 'Business profile reviews' },
  { name: 'Facebook', href: 'https://www.facebook.com/', note: 'Page recommendations' },
]

/** Where the feedback comes from, by the kind of work it was left for. */
export const reviewSources = [
  { label: 'Logo and brand identity', share: 'Most of it' },
  { label: 'Websites and online shops', share: 'Growing fastest' },
  { label: 'Animation, video and YouTube', share: 'Newest team' },
  { label: 'Apps, publishing and Amazon', share: 'Specialist work' },
]

/**
 * A page for every published review.
 *
 * The quotes live in lib/site.js and are reproduced verbatim here — not
 * paraphrased, not lengthened, not attributed to a project we cannot evidence.
 * What each page adds is clearly ours rather than the client's: `note` is our
 * commentary on what the review is pointing at, and `theme` links it to the
 * pattern it belongs to.
 *
 * We do not invent budgets, timelines or results for a review page. If a
 * quote does not say it, this file does not say it either.
 */
const reviewNotes = {
  'Rusk Jones': {
    slug: 'rusk-jones-the-sealant-guys',
    theme: 'speed',
    subject: 'Logo and brand files',
    note: [
      'Two things in this one are worth separating. The brainstorming came before any drawing — that is the part of a logo project people underestimate, and it is where the direction is actually decided.',
      'The hours are the part clients notice. First concepts inside 24 hours is the standard here, and where a job is genuinely urgent, saying so at the brief stage moves it up the queue rather than costing extra.',
    ],
  },
  'Rebecca Rowe': {
    slug: 'rebecca-rowe-planticious',
    theme: 'one-team',
    subject: 'Complete brand identity',
    note: [
      'The phrase doing the work here is "at one place". This is the review of somebody who expected to buy a logo from one supplier, cards from another and a website from a third, and did not have to.',
      'The reason that matters is consistency rather than convenience: assets made by people who did not draw the mark tend to use it slightly wrong, and slightly wrong everywhere is how a brand goes soft.',
    ],
  },
  'Alan Mekinley': {
    slug: 'alan-mekinley-battlefield',
    theme: 'listening',
    subject: 'First-time logo commission',
    note: [
      'A first commission is the one we take most care over, because the client has no benchmark for what is normal and no vocabulary to push back with. Nobody should need either.',
      'If you are in the same position: you do not have to know a single design term. Describe the business and who buys from it, and the designer will do the translating.',
    ],
  },
  'Franklin D.': {
    slug: 'franklin-d-northline-logistics',
    theme: 'speed',
    subject: 'Logo concepts and refinement',
    note: [
      'Three directions then a final mark on the first revision is a good outcome, and it is usually a sign that the brief was strong rather than that the designer got lucky.',
      'Turnaround is the thing most often mentioned in our feedback. It is also the thing most dependent on the client: the drawing is rarely the slow part, waiting for a decision is.',
    ],
  },
  'Guage M.': {
    slug: 'guage-m-guage-fitness',
    theme: 'one-team',
    subject: 'Logo, brand system, website and social',
    note: [
      'This is the most common shape of a long relationship here — arrive for a logo, come back for the system around it, then the website and the social kit.',
      'One team and one invoice is the practical benefit. The durable one is that everything was drawn from the same mark in the same weeks, so nothing had to be reconciled afterwards.',
    ],
  },
  'Rhonda Pierce': {
    slug: 'rhonda-pierce-bloom-and-co',
    theme: 'listening',
    subject: 'Brand identity',
    note: [
      'Understanding the market before drawing anything is the whole method, and it is why the brief asks about customers rather than about colours.',
      'On the comparison to agencies: large agency fees mostly buy research, stakeholder alignment and brand governance across many teams. For a business with one location almost none of that applies, which is why the gap in price is far wider than the gap in the work.',
    ],
  },
}

/** Every published quote, with its page slug and our note attached. */
export const reviewPages = testimonials.map((t) => {
  const extra = reviewNotes[t.name] || {}
  return {
    ...t,
    slug:
      extra.slug ||
      `${t.name}-${t.company}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    theme: extra.theme || null,
    subject: extra.subject || 'Design work',
    note: extra.note || [],
  }
})

export const reviewBySlug = Object.fromEntries(reviewPages.map((r) => [r.slug, r]))
