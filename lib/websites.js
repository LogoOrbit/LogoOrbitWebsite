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
