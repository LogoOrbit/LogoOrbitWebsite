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

`pages/api/contact.js` validates submissions, filters bots, rate-limits abuse and
delivers enquiries through Resend. Configure these deployment environment variables:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=legal@logoorbit.net
CONTACT_FROM_EMAIL=LogoOrbit Website <website@logoorbit.net>
```

The sending domain must be verified in Resend. Without `RESEND_API_KEY`, the endpoint
returns a clear service-unavailable response instead of silently losing a lead.

## Live chat

`components/LiveChat.js` is the floating chat launcher, stacked above the WhatsApp
button. It runs on [Crisp](https://crisp.chat) (free plan) and lands in one shared
inbox that whoever is free on the sales or support desk answers.

```
NEXT_PUBLIC_CRISP_WEBSITE_ID=00000000-0000-0000-0000-000000000000
```

Find the ID in Crisp under **Settings → Website Settings → Setup instructions**; it is
the UUID in the snippet they give you. It is public by design - it names the inbox and
grants nothing - which is why it carries the `NEXT_PUBLIC_` prefix.

With the variable unset, no launcher renders and no vendor script loads, so the site is
unchanged until an inbox actually exists to answer.

Two things worth keeping in mind when editing it:

- The Crisp client is **not** loaded on page load. It weighs a few hundred KB and would
  land on every page to serve the few visits that open a chat, so it is fetched on the
  click instead. The exception is a visitor with an existing conversation, detected via
  the `lo-chat-started` flag in `localStorage`: for them it loads quietly once the page
  is idle, so an agent's reply can raise the unread badge on its own.
- Crisp's own launcher stays hidden throughout (`chat:hide`). The corner belongs to the
  WhatsApp button, and Crisp's launcher cannot be moved out of it, so the chatbox is
  driven by API and the visible control is ours. `openLiveChat()` is exported for any
  other "chat to us instead" entry point - the contact page uses it.

Free-plan limits worth knowing: **two agent seats**, one inbox, no chat history export.
Adding a third person who answers chats means paying, or rotating the two seats.

## Accessibility & performance notes

- Respects `prefers-reduced-motion`, all animation is disabled for those users.
- No horizontal overflow at 390px or 1440px (verified with Playwright).
- Semantic landmarks, labelled form fields, `aria-label` on icon-only controls.
