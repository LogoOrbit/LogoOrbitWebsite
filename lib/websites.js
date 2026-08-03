/**
 * Live sites we designed and built.
 *
 * Each entry carries the real name and the real one-line pitch taken from the
 * site itself, so a card says something true about the work rather than
 * inventing a description. `accent` and `accent2` paint the card's preview
 * panel; where a site has its own palette we use it.
 *
 * `shot` is optional. Drop a screenshot at /public/portfolio/websites/<slug>.webp
 * and the card renders it in a browser frame instead of the painted panel.
 */
export const websites = [
  {
    slug: 'cinegma-films',
    name: 'Cinegma Films',
    monogram: 'CF',
    href: 'https://cinegmafilms.com',
    category: 'Film production',
    tagline: 'Independent production banner of a Karachi filmmaker.',
    body: 'A reel-first site for a director, editor and colorist, built dark so the work carries the page rather than the layout.',
    tags: ['Video-led', 'Dark UI'],
    accent: '#111827',
    accent2: '#7c3aed',
  },
  {
    slug: 'mindcare-services',
    name: 'MindCare Services',
    monogram: 'MC',
    href: 'https://www.themindcareservices.com',
    category: 'Healthcare',
    tagline: 'Therapy and mental health care in Karachi.',
    body: 'A calm, warm clinic site with an interactive hero, a full team directory and the whole thing readable in both English and Urdu.',
    tags: ['Bilingual', 'Booking'],
    accent: '#0f9aa8',
    accent2: '#2d6a1f',
  },
  {
    slug: 'omniconvert',
    name: 'OmniConvert',
    monogram: 'OC',
    href: 'https://omniconvert-two.vercel.app',
    category: 'Web app',
    tagline: 'Convert any file in seconds.',
    body: 'A free online converter for documents, images, audio, video and archives, with PDF merging, splitting and OCR built in.',
    tags: ['Web app', 'File tools'],
    accent: '#2563eb',
    accent2: '#06b6d4',
  },
  {
    slug: 'domainhunter-ai',
    name: 'DomainHunter AI',
    monogram: 'DH',
    href: 'https://domainhunter-ai.vercel.app',
    category: 'Web app',
    tagline: 'Find the companies that should own your domain.',
    body: 'Turns a domain name into a ranked shortlist of credible buyers, keeping the public-source evidence behind every lead.',
    tags: ['Web app', 'Dashboard'],
    accent: '#0f172a',
    accent2: '#10b981',
  },
]

/**
 * The long version of each build, so a live site is not just a card with a
 * link on it.
 *
 * Only things we know first-hand are written here: what the site had to do,
 * how it was put together and what was handed over. No traffic figures, no
 * conversion claims, no invented client quotes.
 */
const detail = {
  'cinegma-films': {
    metaTitle: 'Cinegma Films Website — Film Production Site Case Study',
    metaDescription:
      'A reel-first, dark-UI website built for an independent film production banner: the brief, how it was built, and what was delivered.',
    intro:
      'A production banner is judged on its reel within about eight seconds. Everything on this build serves getting a visitor to moving footage before anything else asks for their attention.',
    stack: ['Video-led hero', 'Dark interface throughout', 'Reel and project pages', 'Mobile-first playback'],
    sections: [
      {
        h: 'What the site had to do',
        p: [
          'A director, editor and colorist working under one banner needs a site that behaves like a showreel with an index attached, not like a brochure. The commissioning decision is emotional and fast: somebody watches thirty seconds of work and either wants to talk or does not.',
          'So the structure is inverted from a normal service site. Work leads, credentials follow, and the contact route is available from every point in the scroll rather than parked at the bottom.',
        ],
      },
      {
        h: 'Why it is dark',
        p: [
          'Dark interfaces are frequently a style choice. Here they are a functional one: a light page around a video frame raises the perceived black level of the footage and flattens the grade the colorist was paid to produce. A dark surround lets the image carry its own contrast.',
          'The consequence is that every other element has to be designed twice — type contrast, focus states and form fields all behave differently against a dark ground, and accessible contrast is harder to hit, not easier.',
        ],
      },
      {
        h: 'How it was built',
        ul: [
          'Video is loaded on demand rather than on page load, so a phone on mobile data reaches the page quickly and only pays for what is played.',
          'Poster frames are chosen deliberately rather than auto-generated, because the still is doing the selling until playback starts.',
          'Project pages carry credits and roles, which is what other production people scan for.',
          'Layout is built to survive a reel being replaced, since the work changes far more often than the site does.',
        ],
      },
    ],
  },

  'mindcare-services': {
    metaTitle: 'MindCare Services Website — Healthcare Site Case Study',
    metaDescription:
      'A bilingual mental health clinic website with a full team directory and booking: the brief, the accessibility constraints, and how it was built.',
    intro:
      'A mental health clinic site is used by people who are anxious before they arrive on it. Everything here is designed to reduce friction between landing and finding a named person to talk to.',
    stack: ['English and Urdu throughout', 'Team directory', 'Booking route', 'Interactive hero'],
    sections: [
      {
        h: 'What the site had to do',
        p: [
          'Two things, and they pull in opposite directions. It has to feel calm and unhurried, because the visitor is often in distress. It also has to get somebody to a booking in as few decisions as possible, because a long journey is where people quietly give up.',
          'The resolution is a warm, slow-moving surface with a very short path underneath it: a visitor can reach a named clinician and a booking route from anywhere without ever meeting a wall of text.',
        ],
      },
      {
        h: 'Building it in two languages',
        p: [
          'Bilingual is not translation bolted on at the end. It changes layout: line lengths differ, headings wrap differently, and a design tuned to English typography will look broken in Urdu. Both languages were laid out as first-class versions rather than one being derived from the other.',
        ],
        ul: [
          'Every string has a counterpart, including error messages and form labels, which is where bilingual sites usually leak.',
          'Type sizes are set per language rather than shared, because the same point size does not read equally in both scripts.',
          'The language switch persists, so a returning visitor is not sent back to the default.',
        ],
      },
      {
        h: 'The team directory is the point',
        p: [
          'In healthcare, the single most reassuring thing a website can publish is who you will actually see. The directory carries each clinician with their specialism, which turns an anonymous clinic into a set of named people — the same reasoning behind publishing our own team pages.',
        ],
      },
    ],
  },

  omniconvert: {
    metaTitle: 'OmniConvert Website — File Conversion Web App Case Study',
    metaDescription:
      'A free online file converter with PDF merge, split and OCR built in. How the interface was designed around a single job, and what it took to build.',
    intro:
      'A converter has exactly one moment that matters: the user has a file and wants a different file. Every interface decision here is judged against how much it delays that moment.',
    stack: ['Documents, images, audio, video, archives', 'PDF merge, split and OCR', 'Drag-and-drop first', 'No account required'],
    sections: [
      {
        h: 'Designing around a single job',
        p: [
          'Tools like this fail in a predictable way. They accumulate options — format pickers, quality sliders, account prompts — until the user has to make four decisions before the thing they came for happens. The design brief was to make the default path require none.',
          'Drop a file, get the sensible output, with everything else available but out of the way. Advanced options exist and are one click deep rather than in the primary flow.',
        ],
      },
      {
        h: 'What is actually hard here',
        ul: [
          'Format coverage is a long tail: the common conversions are easy and the last ten per cent is most of the work.',
          'Large files break naive interfaces. Progress has to be honest, including when something will take a while.',
          'OCR is a different mental model from conversion and had to be presented as its own path rather than hidden inside a format dropdown.',
          'No-account tools still need to communicate what happens to a file after it is processed. Silence on that question loses trust.',
        ],
      },
      {
        h: 'How the interface holds up',
        p: [
          'The whole tool is usable on a phone, which is unusual in this category and the reason a good share of people reach for it: file conversion is frequently something you need while away from a desk, and desktop-only tools simply fail at that moment.',
        ],
      },
    ],
  },

  'domainhunter-ai': {
    metaTitle: 'DomainHunter AI Website — Lead Research Tool Case Study',
    metaDescription:
      'A tool that turns a domain name into a ranked shortlist of credible buyers, with the public-source evidence kept behind every lead. How it was designed.',
    intro:
      'The hard part of a research tool is not producing a list. It is producing a list somebody will act on, which means every row has to be able to show its working.',
    stack: ['Ranked buyer shortlists', 'Evidence kept per lead', 'Dashboard interface', 'Public-source research'],
    sections: [
      {
        h: 'Why evidence is the interface',
        p: [
          'Any tool that ranks things creates an immediate credibility problem: why is this at the top? A ranked list with no reasoning gets used twice and abandoned. So the design keeps the public-source evidence attached to each lead rather than discarding it after scoring, and makes it reachable in one interaction.',
          'That single decision shaped the layout. Rows had to be expandable without losing position in the list, and the evidence had to be readable rather than a raw data dump.',
        ],
      },
      {
        h: 'Designing a dashboard that does not sprawl',
        ul: [
          'One primary view. Analytics products tend to grow a navigation rail nobody uses; this stays a single working surface.',
          'Dense typography with real hierarchy, because the user is scanning rather than reading.',
          'Dark interface, since this is a tool people keep open for long sessions rather than visit briefly.',
          'Empty and loading states designed as first-class screens, because research runs are not instant and an unexplained wait reads as a broken tool.',
        ],
      },
      {
        h: 'What it demonstrates',
        p: [
          'This is the end of the range where design and build stop being separable. Screens are drawn against real data shapes rather than pretty placeholders, because a layout that only works with short, tidy strings will fall apart the first time a real company name arrives.',
        ],
      },
    ],
  },
}

export const websiteCaseStudies = websites.map((w) => ({ ...w, ...detail[w.slug] }))

export const websiteBySlug = Object.fromEntries(websiteCaseStudies.map((w) => [w.slug, w]))
