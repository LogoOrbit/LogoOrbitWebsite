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
        a: 'Yes. We run a clearance search first and tell you honestly whether the name looks likely to clash, then prepare and file the application with the USPTO and reply to the examiner on your behalf if questions come back. Our fee is $299 per class, and the USPTO charges its own government filing fee on top.',
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
