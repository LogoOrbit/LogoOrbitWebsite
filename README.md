# LogoOrbit, logoorbit.net

Marketing site for LogoOrbit: custom logo design, websites, animation, mobile apps,
book publication and Amazon marketing.

Built with **Next.js 16** (Pages Router) and **Tailwind CSS v4**. No external asset
requests, every logo mark, icon and illustration is inline SVG, so the page renders
identically offline and behind strict CSPs.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Structure

```
pages/
  index.js            single-page site, SEO meta + JSON-LD structured data
  _app.js             global CSS
  _document.js        <html> shell, favicon, theme colour
  api/contact.js      contact form endpoint (validation only, see below)
components/
  Nav.js              sticky header, transparent over hero, mobile drawer
  Hero.js             animated hero with rotating logo preview
  Marquee.js          scrolling industries strip
  Stats.js            scroll-triggered count-up numbers
  Services.js         six service cards
  Process.js          four-step "how it works"
  Portfolio.js        filterable SVG logo grid
  WhyUs.js            six differentiators (dark section)
  About.js            company story with orbiting marks
  Pricing.js          three packages
  Testimonials.js     auto-rotating carousel + rating band
  CTA.js              primary CTA + designer recruitment
  FAQ.js              accordion (also emitted as FAQPage JSON-LD)
  Contact.js          enquiry form + contact details
  Footer.js           sitemap, offices, legal links
  FloatingCall.js     floating call / quote buttons
  Icons.js            inline SVG icon set
  LogoMark.js         portfolio logo marks + portfolio data
  Reveal.js           scroll-reveal wrapper
lib/
  site.js             all copy, services, pricing, FAQs, contact details
  hooks.js            useInView, useCountUp, useScrolled
```

All site copy and contact details live in `lib/site.js`, edit there, not in the
components.

## Contact form

`pages/api/contact.js` validates submissions and logs them to the Vercel runtime
logs. **It does not send email yet.** To deliver enquiries to `support@logoorbit.net`,
uncomment the provider block in that file (a Resend example is included), then add the
API key as a Vercel environment variable:

```
Project → Settings → Environment Variables → RESEND_API_KEY
```

## Accessibility & performance notes

- Respects `prefers-reduced-motion`, all animation is disabled for those users.
- No horizontal overflow at 390px or 1440px (verified with Playwright).
- Semantic landmarks, labelled form fields, `aria-label` on icon-only controls.
