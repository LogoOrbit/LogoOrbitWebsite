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
