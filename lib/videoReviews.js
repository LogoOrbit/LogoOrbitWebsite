/**
 * Filmed client reviews.
 *
 * Four clients sat down on camera and talked about what they came to us for
 * and what they got back. The written wall of quotes in `testimonials` is
 * still the fast read; this is the part a sceptical visitor actually believes,
 * so it gets its own band on the home page directly above the quotes.
 *
 * The `quote` on each one is lifted verbatim from the recording, so the
 * section still says something when a video has not been played yet, and so
 * the copy is readable to anyone who cannot or will not turn sound on.
 */

const cdn = 'https://CinegmaFilms.b-cdn.net'

export const videoReviews = [
  {
    id: 'rhonda',
    // Seconds into the clip where the face is framed cleanly, used for both
    // the tile thumbnail and the circular headshot.
    headshot: 2.5,
    src: `${cdn}/1.mp4`,
    name: 'Rhonda',
    role: 'Founder, LOB-U',
    company: 'lob-u.com',
    business: 'Pickleball merchandise store',
    // The headline is the promise the clip makes; the strap is the detail
    // that makes it specific enough to be worth a click.
    title: 'From a retirement hobby to a store of her own',
    strap: 'Logo and unlimited t-shirt designs for an online pickleball brand',
    quote:
      'They get my designs back to me within 24 to 48 hours, which is just unheard of with some of the other companies. This has just been a dream come true for me.',
    tags: ['Logo design', 'Apparel design', '24 to 48 hour turnaround'],
    length: '1:38',
  },
  {
    id: 'franklin',
    // Seconds into the clip where the face is framed cleanly, used for both
    // the tile thumbnail and the circular headshot.
    headshot: 2.5,
    src: `${cdn}/2.mp4`,
    name: 'Franklin Pillsbury',
    role: "Host, Let's Go Boating.tv",
    company: "Let's Go Boating.tv",
    business: 'Boating podcast and product launch',
    title: 'A whole brand package, not just a logo',
    strap: 'Logo, marketing presentation and print for a podcast launch',
    quote:
      'They came up with several versions for us to look at, but then also helped us put together a complete package, t-shirts, business cards, letterhead. The process was very, very simple, and I felt like our value was very, very good.',
    tags: ['Logo design', 'Marketing deck', 'Print and stationery'],
    length: '1:42',
  },
  {
    id: 'brandon',
    // Seconds into the clip where the face is framed cleanly, used for both
    // the tile thumbnail and the circular headshot.
    headshot: 2,
    src: `${cdn}/3.mp4`,
    name: 'Brandon',
    role: 'President and CEO',
    company: 'Quantum Intelligence Technologies',
    business: 'Technology company',
    title: 'A great design, fast, and a team that picks up',
    strap: 'Logo design for a technology company, start to finish',
    quote:
      'The boys over there are great. They got me a great design real quick. Harry, the lead designer, did a fantastic job, and Jack, my design consultant, you can get a hold of him any time of the day. If you are looking for a logo design, these guys are where you need to go.',
    tags: ['Logo design', 'Named designer', 'Same-day replies'],
    length: '1:02',
  },
  {
    id: 'gage',
    // Seconds into the clip where the face is framed cleanly, used for both
    // the tile thumbnail and the circular headshot.
    headshot: 2.5,
    src: `${cdn}/4.mp4`,
    name: 'Gage',
    role: 'Financial advisor',
    company: 'Retirement planning practice',
    business: 'Financial advice practice',
    title: '100% ownership, and nobody disappeared after delivery',
    strap: 'Logo and website for a financial advice practice',
    quote:
      'One of the things that really stood out is they made sure we got 100% ownership of the logo designs. They do not just give you your logo and cut you out. They kept checking in, making sure everything was exactly what I wanted. It was probably the smoothest process I have ever experienced.',
    tags: ['Logo design', 'Website design', 'Full ownership'],
    length: '2:12',
  },
]

/** Schema.org nodes so the clips can surface as video results. */
export const videoReviewSchema = (url) =>
  videoReviews.map((v) => ({
    '@type': 'VideoObject',
    '@id': `${url}/#video-${v.id}`,
    name: `${v.name} on working with LogoOrbit`,
    description: v.quote,
    contentUrl: v.src,
    uploadDate: '2026-01-15',
    thumbnailUrl: `${url}/og-image.png`,
  }))
