import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import FaqAccordion from '../components/FaqAccordion'
import CertificateInstrument, { CertificateSeal } from '../components/CertificateInstrument'
import { Icons } from '../components/Icons'
import { site } from '../lib/site'
import { useCart } from '../lib/cart'
import { brandProtection } from '../lib/pricing'
import { salesTax } from '../lib/money'

const SERVICE = brandProtection.price
const PER_CLASS = brandProtection.classPrice

/** The application face, with the fields a real filing carries. */
const applicationRecord = [
  { label: 'Serial number', value: 'SAMPLE-00000000' },
  { label: 'Filing basis', value: 'Use / intent to use' },
  { label: 'Applicant of record', value: null, wide: true },
  { label: 'The mark', value: null },
  { label: 'Classes applied for', value: null },
]

/**
 * The Nice Classification runs to 45 classes: 1 to 34 for goods, 35 to 45 for
 * services. Nobody filing their first trademark thinks in those numbers, so
 * the picker below asks what the business does and answers in them.
 *
 * These are the classes a business of each kind usually files in. They are a
 * starting point for the conversation, not a determination - the classes on
 * your application are settled with the legal desk against what you actually
 * sell.
 */
const businesses = [
  {
    id: 'restaurant',
    label: 'Restaurant or café',
    classes: [
      { n: 43, name: 'Restaurant and café services', why: 'The core service: serving food and drink to people.' },
      { n: 30, name: 'Coffee, baked goods, sauces', why: 'Only if you also sell packaged goods under the same mark.' },
    ],
    note: 'A single site serving food usually files one class. Add a goods class the moment you put your logo on a bottle, a bag of beans or a jar of sauce sold to take away.',
  },
  {
    id: 'clothing',
    label: 'Clothing or apparel brand',
    classes: [
      { n: 25, name: 'Clothing, footwear, headwear', why: 'The garments themselves, which is what the label is on.' },
      { n: 35, name: 'Retail and online store services', why: 'If you run the shop as well as make the product.' },
    ],
    note: 'Apparel is the classic two-class filing. Class 25 protects the clothing; class 35 protects the store the clothing is sold through, which matters if you also stock other brands.',
  },
  {
    id: 'software',
    label: 'Software, app or SaaS',
    classes: [
      { n: 9, name: 'Downloadable software and apps', why: 'Anything a customer installs on a device.' },
      { n: 42, name: 'Software as a service, development', why: 'Anything a customer signs into rather than installs.' },
    ],
    note: 'Most modern products live in both: an app in the store is class 9, the service behind it is class 42. Filing only one is the most common gap we see in software applications.',
  },
  {
    id: 'ecommerce',
    label: 'Online shop or e-commerce',
    classes: [
      { n: 35, name: 'Retail and online store services', why: 'The shop itself, whatever it sells.' },
      { n: 25, name: 'Goods you make yourself', why: 'One class per family of own-brand product, if you have them.' },
    ],
    note: 'If you resell other people’s products, class 35 alone is usually right. If you make your own, you need the class that covers the product too - that is the class that stops a copycat manufacturer.',
  },
  {
    id: 'construction',
    label: 'Construction or trade services',
    classes: [
      { n: 37, name: 'Building, installation, repair', why: 'The work itself, from roofing to plumbing.' },
      { n: 42, name: 'Design and surveying', why: 'Only if you also draw plans or survey.' },
    ],
    note: 'Trades are usually a clean single-class filing, which makes them among the cheapest marks to register - and among the most worth registering, because the brand is the reputation.',
  },
  {
    id: 'consulting',
    label: 'Agency, consulting or marketing',
    classes: [
      { n: 35, name: 'Advertising, marketing, business consulting', why: 'The broad services class most agencies live in.' },
      { n: 41, name: 'Training, workshops, published content', why: 'If you teach, run courses or publish.' },
    ],
    note: 'Class 35 is the busiest class on the register, which cuts both ways: it covers a great deal, and it is crowded, so the clearance search matters more here than almost anywhere else.',
  },
  {
    id: 'beauty',
    label: 'Cosmetics, skincare or beauty',
    classes: [
      { n: 3, name: 'Cosmetics, skincare, soaps', why: 'The products in the bottles and jars.' },
      { n: 44, name: 'Salon and treatment services', why: 'If you also treat clients in person.' },
    ],
    note: 'A product line and a salon are two different businesses to the USPTO, even under one name. Sell both and you file both, or you leave half the brand unprotected.',
  },
  {
    id: 'fitness',
    label: 'Gym, fitness or coaching',
    classes: [
      { n: 41, name: 'Fitness training, classes, coaching', why: 'The sessions and programmes you run.' },
      { n: 25, name: 'Branded apparel', why: 'If you sell kit with your logo on it.' },
    ],
    note: 'The apparel class is the one gyms forget. The day you print hoodies with the mark on them, a second class is the difference between merchandise and a merchandise problem.',
  },
  {
    id: 'health',
    label: 'Clinic or healthcare practice',
    classes: [
      { n: 44, name: 'Medical, dental and health services', why: 'Care provided to patients.' },
      { n: 5, name: 'Supplements and preparations', why: 'If you sell products under the practice name.' },
    ],
    note: 'Healthcare marks are examined closely and names are often descriptive, so the clearance search is doing real work here before a dollar goes to the USPTO.',
  },
  {
    id: 'food',
    label: 'Packaged food or drink',
    classes: [
      { n: 30, name: 'Coffee, tea, snacks, sauces, baked goods', why: 'Shelf-stable food products.' },
      { n: 32, name: 'Soft drinks, juices, waters', why: 'Non-alcoholic drinks.' },
      { n: 29, name: 'Meat, dairy, preserved foods', why: 'Chilled and preserved products.' },
    ],
    note: 'Food is split across several classes by what the product actually is, which is why a range under one brand can need two or three. We work it out from your product list, not from a guess.',
  },
  {
    id: 'logistics',
    label: 'Transport, delivery or logistics',
    classes: [
      { n: 39, name: 'Transport, delivery, storage', why: 'Moving and holding goods for other people.' },
      { n: 35, name: 'Order fulfilment and administration', why: 'If you also run fulfilment for sellers.' },
    ],
    note: 'One class covers most haulage and courier businesses. Fulfilment operations that also handle the selling side usually need the second.',
  },
  {
    id: 'finance',
    label: 'Finance, insurance or real estate',
    classes: [
      { n: 36, name: 'Financial, insurance and property services', why: 'The single class that covers all three.' },
      { n: 42, name: 'Platform and software services', why: 'If your product is really a fintech platform.' },
    ],
    note: 'Class 36 is broad and does a lot of work in one filing. If what you actually sell is software with a licence, class 42 belongs alongside it.',
  },
]

/** What the $599 covers, and what it deliberately does not. */
const included = [
  'A clearance search of the federal register before anything is filed, with an honest read on your odds',
  'A recommendation on which classes your goods and services actually fall in',
  'The full application drafted and filed with the USPTO in your name',
  'Your specimen of use checked against what the examiner will accept',
  'Correspondence with the examining attorney handled by our legal desk',
  'Status monitoring through publication, with the deadlines watched for you',
  'The registration certificate and your file, handed over when it issues',
]

const excluded = [
  ['USPTO government filing fee', 'Set by the government, charged per class, and paid to the USPTO rather than to us.'],
  ['A guaranteed registration', 'No filing service can promise one. The examiner decides, and the register is the register.'],
  ['International protection', 'A US registration is a US right. Other countries are separate filings, in their own offices.'],
  ['Maintenance filings later', 'A registration has to be kept alive at years five to six and every ten years after that.'],
]

/** Why any of this matters, written for someone who has never filed anything. */
const stakes = [
  {
    icon: 'shield',
    title: 'It is the only thing that makes a copycat stop',
    body: 'Owning your logo means nobody can copy the artwork. It does not stop a competitor two states away opening under a confusingly similar name and taking your calls. A federal registration is what turns "please stop" into a letter their lawyer takes seriously.',
  },
  {
    icon: 'badge',
    title: 'It works everywhere in the country, from day one',
    body: 'Trading under a name gives you rights only where people actually know you. A registration gives you a claim across all fifty states from the filing date - including in the cities you have not opened in yet.',
  },
  {
    icon: 'shop',
    title: 'Marketplaces ask for the registration number',
    body: 'Amazon Brand Registry, and the equivalent programmes at other marketplaces, gate their brand-protection tools behind a registered mark. Without one you are filing takedown requests as a member of the public.',
  },
  {
    icon: 'scales',
    title: 'It is the cheapest hour of the whole dispute',
    body: 'Registering early costs a few hundred dollars. Discovering at year three that somebody else registered your name first costs you the name - the signage, the domain, the packaging, the search rankings, and every customer who cannot find you afterwards.',
  },
  {
    icon: 'spark',
    title: 'It turns a brand into an asset on the books',
    body: 'A registered mark can be valued, licensed, franchised, borrowed against and sold. Investors and buyers ask for the registration number in the first round of diligence, and an unregistered name is a discount they will find.',
  },
  {
    icon: 'clock',
    title: 'Priority is decided by who filed first, not who is right',
    body: 'The register does not reward the business that had the better idea. It rewards the one that got its date in first. Every month a good name sits unfiled is a month somebody else can take it.',
  },
]

const timeline = [
  {
    step: 'Week 1',
    title: 'Clearance search',
    body: 'We search the federal register for marks close enough to yours to matter, and tell you plainly whether to file, to adjust the mark, or to keep the money. This conversation is the most valuable part of the service.',
  },
  {
    step: 'Week 1-2',
    title: 'Classes and specimen',
    body: 'We settle which classes your goods and services fall in, and check that your evidence of use is the kind an examiner accepts - a mocked-up logo on a blank background is the most common rejection we see.',
  },
  {
    step: 'Filing day',
    title: 'The application goes in',
    body: 'We file with the USPTO in your name, pay the government fee on your instruction, and send you the serial number. Your priority date is set from this moment.',
  },
  {
    step: 'Month 3-8',
    title: 'Examination',
    body: 'An examining attorney reviews the application and may raise an office action. We draft and file the response for you. This is where most self-filed applications quietly die.',
  },
  {
    step: 'Month 6-10',
    title: 'Publication',
    body: 'A clean application is published for opposition and anyone who believes it harms them has thirty days to object. Most marks pass this window without a word.',
  },
  {
    step: 'Month 8-18',
    title: 'Registration',
    body: 'The certificate issues, the ® symbol becomes yours to use, and we hand over the file. Then we tell you the maintenance dates, because a registration you forget to renew is a registration you lose.',
  },
]

const faqs = [
  {
    q: 'What is a class, and why does the price depend on how many I need?',
    a: `A trademark is never registered for a name in the abstract - it is registered for a name applied to particular goods or services. The system sorts those into 45 classes: 1 to 34 for physical goods, 35 to 45 for services. Registering "class 25 clothing" does not protect you if a rival launches a restaurant under the same name. So the number of classes is set by what your business actually sells, and each one is examined and charged separately by the USPTO, which is why our classification work is $${PER_CLASS} per class rather than a flat fee.`,
  },
  {
    q: 'How many classes will I need?',
    a: 'Most first filings need one or two. A single-site service business is usually one. A brand that both makes a product and sells it is usually two. A food range across chilled, packaged and drinks can be three. Use the class finder on this page for a starting number, then send us your product and service list and we will tell you which classes are genuinely necessary - including when a class you asked for is not.',
  },
  {
    q: 'What does the $599 actually pay for?',
    a: `The filing itself, from the clearance search through to the certificate: the search and our honest read on it, drafting, the specimen check, the filing, correspondence with the examining attorney, and the deadline watching in between. It is charged once for the application, not per class and not per month, and it does not go up if the examination turns out to be a long one.`,
  },
  {
    q: 'Is the USPTO fee included?',
    a: 'No, and be careful of anyone who implies it is. The USPTO sets its own government filing fee, charges it per class, and it is paid to them rather than to us. We tell you the current amount for your class count before you commit to anything, so the total is on the table in advance.',
  },
  {
    q: 'Can you guarantee my trademark will be registered?',
    a: 'No. Nobody honest can. The examining attorney at the USPTO decides, and marks are refused for reasons outside anyone’s control - a similar mark already on the register, a name that merely describes the product, a specimen that does not show real use. What we can do is tell you before you spend money when the odds look bad, and we would rather lose the filing fee than take it knowing that.',
  },
  {
    q: 'Do I need to own the copyright in my logo first?',
    a: 'They are two separate rights and neither requires the other, but they work best together. Copyright is about the artwork - who drew it and who owns it. A trademark is about the name and mark in commerce - who is allowed to trade under it. If we designed your logo, the $499 copyright assignment certificate puts the artwork in your name; this service puts the mark on the federal register. Owners who take one usually want both.',
  },
  {
    q: 'Can I file it myself?',
    a: 'Yes, and for a simple, distinctive mark in one class, some people do exactly that. What you are paying us for is the part before the form and the part after it: knowing whether the name is clear enough to be worth filing, choosing classes that cover the business, and answering an office action when one lands. Most self-filed applications that fail, fail at that last step.',
  },
  {
    q: 'What if a similar mark already exists?',
    a: 'We will find it in the clearance search and tell you at that point, before an application is filed. Sometimes the answer is that the other mark is in a different class and yours is fine. Sometimes it is a small change to your mark. And sometimes the honest answer is that the name is taken and a rebrand now costs far less than a dispute in two years - we will say so.',
  },
]

/**
 * Two lines rather than one: the filing service, which is charged once, and
 * the classification fee, which is charged per class. Putting them in the cart
 * separately is how the invoice reads, and it means changing the class count
 * later is a quantity edit rather than a new conversation.
 */
function AddToCartClasses({ count }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  const put = () => {
    add({ sku: 'trademark-filing', name: 'US trademark filing service', kind: 'Brand protection', price: SERVICE, href: '/trademark-filing' }, 1)
    add(
      {
        sku: 'trademark-class',
        name: 'Trademark class fee',
        kind: 'Brand protection',
        price: PER_CLASS,
        href: '/trademark-filing',
        note: 'per class, USPTO government fee paid separately',
      },
      count
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={put}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-ink-900 transition-transform hover:-translate-y-0.5"
      >
        <Icons.cart className="h-4.5 w-4.5" />
        {added ? 'Added to cart' : `Add to cart - filing + ${count} ${count === 1 ? 'class' : 'classes'}`}
      </button>
      {added && (
        <Link href="/cart" className="mt-2 flex items-center justify-center gap-1.5 text-[13.5px] font-bold text-[#f0d89a]">
          View cart and checkout
          <Icons.arrow className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

/** The interactive class finder: business type in, class count and price out. */
function ClassFinder() {
  const [active, setActive] = useState(0)
  const [count, setCount] = useState(1)
  const business = businesses[active]

  const pick = (index) => {
    setActive(index)
    /* Reset to the primary class, so the estimate never carries the previous
       business's class count into a business that does not need it. */
    setCount(1)
  }

  const subtotal = SERVICE + count * PER_CLASS
  const tax = Math.round(subtotal * salesTax.rate) / 100
  const total = subtotal + tax

  return (
    <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:items-start">
      <Reveal>
        <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#e7c877]">
          1 - What does the business do?
        </span>
        <div className="mt-4 flex flex-wrap gap-2">
          {businesses.map((item, index) => {
            const isActive = index === active
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => pick(index)}
                className={`rounded-full border px-4 py-2.5 text-[14px] font-semibold transition-colors ${
                  isActive
                    ? 'border-[#c9a044]/70 bg-[#c9a044]/15 text-white'
                    : 'border-white/12 bg-white/[0.04] text-white/65 hover:border-white/25 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <p className="mt-6 text-[14.5px] leading-relaxed text-white/60">{business.note}</p>

        <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-[13.5px] leading-relaxed text-white/50">
          These are the classes a business of this kind usually files in, not a determination about yours. The classes
          on your application are settled with the legal desk against your actual product and service list.
        </p>
      </Reveal>

      <Reveal delay={90}>
        <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-5 sm:p-7">
          <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#e7c877]">
            2 - The classes it usually needs
          </span>

          <ul className="mt-4 space-y-3">
            {business.classes.map((cls, index) => {
              const included = index < count
              return (
                <li key={cls.n}>
                  <button
                    type="button"
                    aria-pressed={included}
                    onClick={() => setCount(index + 1)}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors ${
                      included
                        ? 'border-[#c9a044]/60 bg-[#c9a044]/10'
                        : 'border-white/10 bg-transparent hover:border-white/25'
                    }`}
                  >
                    <span
                      className={`doc-mono grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[15px] font-bold ${
                        included ? 'bg-[#c9a044] text-[#101a3a]' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {cls.n}
                    </span>
                    <span>
                      <span className={`block text-[15px] font-semibold ${included ? 'text-white' : 'text-white/70'}`}>
                        {cls.name}
                      </span>
                      <span className="mt-1 block text-[13.5px] leading-relaxed text-white/50">{cls.why}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 rounded-2xl border border-[#c9a044]/35 bg-[#0a1330]/70 p-5">
            <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#e7c877]">
              3 - What that comes to
            </span>

            <dl className="mt-4 space-y-2.5 text-[14.5px]">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-white/65">Filing service, once</dt>
                <dd className="doc-mono font-semibold text-white">${SERVICE}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-white/65">
                  Classification, {count} {count === 1 ? 'class' : 'classes'} × ${PER_CLASS}
                </dt>
                <dd className="doc-mono font-semibold text-white">${count * PER_CLASS}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-white/65">{salesTax.label}, {salesTax.rate}%</dt>
                <dd className="doc-mono font-semibold text-white">
                  ${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-3">
                <dt className="font-semibold text-white">LogoOrbit total</dt>
                <dd className="doc-mono text-2xl font-bold text-[#f0d89a]">
                  ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-[13px] leading-relaxed text-white/45">
              Plus the USPTO government filing fee, charged per class and paid directly to the USPTO. We confirm the
              current amount for your class count in writing before anything is filed.
            </p>

            {/* The finder already knows the class count, so the cart takes it
                as the quantity of the per-class line rather than making
                somebody set the same number twice. */}
            <AddToCartClasses count={count} />

            <Link href="/contact?subject=Trademark%20Filing" className="btn-action mt-2.5 w-full px-6 py-3.5">
              Start with the clearance search
              <Icons.arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

export default function TrademarkFilingPage() {
  return (
    <Layout
      title={`US Trademark Filing Service - $${SERVICE} + $${PER_CLASS} per class`}
      description={`LogoOrbit files your US trademark with the USPTO: clearance search, classification, application and examiner responses. $${SERVICE} plus $${PER_CLASS} per class.`}
      path="/trademark-filing"
      jsonLd={{
        '@graph': [
          {
            '@type': 'Service',
            name: 'LogoOrbit US Trademark Filing Service',
            serviceType: 'Trademark application preparation and filing',
            description:
              'Clearance search, class recommendation, USPTO application drafting and filing, specimen review and examining-attorney correspondence, handled by the LogoOrbit legal desk.',
            provider: { '@type': 'Organization', name: 'LogoOrbit' },
            areaServed: { '@type': 'Country', name: 'United States' },
            offers: [
              {
                '@type': 'Offer',
                name: 'Trademark filing service',
                price: String(SERVICE),
                priceCurrency: 'USD',
                url: `${site.url}/trademark-filing`,
              },
              {
                '@type': 'Offer',
                name: 'Classification, per class',
                price: String(PER_CLASS),
                priceCurrency: 'USD',
                url: `${site.url}/trademark-filing`,
              },
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: faqs.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          },
        ],
      }}
    >
      {/* ---------- The application, on the table ---------- */}
      <section className="relative -mt-18 overflow-hidden cert-vault pt-18 text-white">
        <div className="absolute inset-0 cert-engrave opacity-70" aria-hidden="true" />
        <div
          className="absolute -right-32 top-0 h-[36rem] w-[36rem] rounded-full bg-[#c9a044]/12 blur-3xl animate-drift"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-white/45">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/legal" className="transition-colors hover:text-white">Legal</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">Trademark filing</span>
            </nav>

            <span className="doc-mono mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#c9a044]/40 bg-[#c9a044]/10 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#e7c877]">
              <Icons.badge className="h-4 w-4" />
              Federal registration
            </span>

            <h1 className="mt-5 max-w-xl text-[2.1rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Owning your logo stops copying.{' '}
              <span className="cert-foil">Registering it stops competitors.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-white/70 sm:text-lg">
              A US trademark is the right to stop someone else trading under a name confusingly close to yours,
              anywhere in the country. Our legal desk runs the clearance search, works out your classes, files the
              application with the USPTO in your name, and answers the examiner when they write back.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact?subject=Trademark%20Filing" className="btn-action px-7 py-4">
                Start with a clearance search
                <Icons.arrow className="h-5 w-5" />
              </Link>
              <a
                href="#class-finder"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c9a044]/45 bg-[#c9a044]/[0.08] px-7 py-4 font-semibold text-[#f0d89a] transition-colors hover:bg-[#c9a044]/20"
              >
                How many classes do I need?
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {[
                [`$${SERVICE}`, 'Filing service, once'],
                [`$${PER_CLASS}`, 'Per class of goods or services'],
                ['+ USPTO fee', 'Government fee, paid at cost'],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#0a1330]/80 px-3 py-4 text-center sm:px-4">
                  <dt className="text-[15px] font-bold text-[#e7c877] sm:text-base">{value}</dt>
                  <dd className="mt-1 text-[11.5px] leading-snug text-white/50 sm:text-xs">{label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 max-w-lg text-[12.5px] leading-relaxed text-white/40">{salesTax.short}</p>
          </div>

          <Reveal delay={120} className="lg:pl-4">
            <div className="cert-tilt mx-auto max-w-md lg:max-w-none">
              <CertificateInstrument
                record={applicationRecord}
                watermark="SPECIMEN"
                title={
                  <>
                    Trademark Application &amp;<br className="sm:hidden" /> Prosecution File
                  </>
                }
                subtitle="Filed with the United States Patent and Trademark Office"
                parties={['Applicant of record', 'Correspondent - LogoOrbit legal desk']}
                seal={{ arc: 'LOGOORBIT · TRADEMARK & BRAND PROTECTION ·', foot: 'FEDERAL REGISTER' }}
              >
                <p className="doc-mono text-[10px] uppercase tracking-[0.22em] text-[#8a6a22]">
                  Identification of goods and services
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.8] text-[#26314f] sm:text-[14.5px]">
                  The applicant requests registration of the mark shown herein on the Principal Register, for the goods
                  and services identified in each class listed above, and claims priority from the filing date.
                </p>
                <div className="mt-4 space-y-2" aria-hidden="true">
                  <span className="block h-2 w-full cert-redact" />
                  <span className="block h-2 w-[88%] cert-redact" />
                  <span className="block h-2 w-[64%] cert-redact" />
                </div>
              </CertificateInstrument>
            </div>
            <p className="mt-5 text-center text-[13px] text-white/45">
              Illustration of the file we prepare and keep for you. Not a USPTO document.
            </p>
          </Reveal>
        </div>

        <div className="cert-foil-rule relative h-px w-full opacity-60" aria-hidden="true" />
      </section>

      {/* ---------- Why it matters, for someone who has never filed ---------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Why this matters
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-ink-900 sm:text-4xl">
              A name is the one asset you can{' '}
              <span className="text-gradient">lose to somebody else</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              You can lose a supplier and find another. You can lose a website and rebuild it in a fortnight. The
              name over the door is different: if another business registers it first, you do not get to keep using
              it, however long you were there. Six reasons this sits near the top of the list.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {stakes.map((item, index) => {
              const Icon = Icons[item.icon]
              return (
                <Reveal key={item.title} delay={index * 60}>
                  <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#c9a044]/12 text-[#8a6a22]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold leading-snug text-ink-900">{item.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{item.body}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- Classes, and the money ---------- */}
      <section id="class-finder" className="relative scroll-mt-24 overflow-hidden cert-vault py-16 text-white sm:py-24">
        <div className="absolute inset-0 cert-engrave opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#e7c877]">
              The class finder
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-white sm:text-4xl">
              You are not registering a name.{' '}
              <span className="cert-foil">You are registering what it sells.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              This is the part nobody explains, and it is the part that sets the price. A trademark covers a name
              applied to particular goods or services, sorted into 45 official classes. Pick what your business does
              and see the classes it usually needs, and what that comes to.
            </p>
          </Reveal>

          <ClassFinder />
        </div>
      </section>

      {/* ---------- What the fee buys ---------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              What you are paying for
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-ink-900 sm:text-4xl">
              The filing is the easy part.{' '}
              <span className="text-gradient">Everything around it is the service</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500">
                  Included in the ${SERVICE}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-ink-900">Start to certificate</h3>
                <ul className="mt-6 space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-trust-100 text-trust-600">
                        <Icons.check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[15px] leading-relaxed text-ink-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="h-full rounded-3xl border-2 border-action-500/40 bg-action-500/[0.04] p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-action-600">
                  Not included, and why
                </span>
                <h3 className="mt-3 text-2xl font-bold text-ink-900">Said plainly, up front</h3>
                <dl className="mt-6 space-y-5">
                  {excluded.map(([label, body]) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-200 text-ink-500">
                        <Icons.close className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <dt className="text-[15px] font-bold text-ink-900">{label}</dt>
                        <dd className="mt-1 text-[14.5px] leading-relaxed text-ink-500">{body}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- How long it takes ---------- */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">The route through</span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-ink-900 sm:text-4xl">
              Filing takes a week.{' '}
              <span className="text-gradient">Registration takes months</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              Anyone quoting you a fortnight is quoting the paperwork, not the register. Here is the real shape of it,
              and where the work actually falls.
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {timeline.map((item, index) => (
              <Reveal key={item.title} delay={index * 60} as="li">
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="doc-mono grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 border-[#c9a044] text-[13px] font-bold text-[#8a6a22]">
                      {index + 1}
                    </span>
                    <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- The pair of rights ---------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-action-600">
              Two different rights
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-ink-900 sm:text-4xl">
              Copyright is the artwork.{' '}
              <span className="text-gradient">A trademark is the name in the market</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              People ask for one and mean the other constantly. They protect different things, they are granted by
              different processes, and most brands eventually want both.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-xl font-bold text-ink-900">Copyright assignment - $499</h3>
                <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-300">
                  A private, signed document
                </p>
                <dl className="mt-5 space-y-4 border-t border-slate-200 pt-5">
                  {[
                    ['Protects', 'The drawing itself - the shape, the artwork, the files'],
                    ['Stops', 'Somebody reproducing your actual logo'],
                    ['Comes from', 'A signed transfer between us and you, not a government office'],
                    ['Exists', 'From the moment the work is created; the document moves who owns it'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-600">{label}</dt>
                      <dd className="mt-1 text-[14.5px] leading-relaxed text-ink-600">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/copyright-certificate"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
                >
                  See the copyright certificate
                  <Icons.arrow className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="h-full rounded-3xl border border-[#c9a044] bg-white p-6 shadow-lg shadow-[#c9a044]/15 ring-1 ring-[#c9a044]/30 sm:p-8">
                <span className="doc-mono inline-flex rounded-full bg-[#c9a044]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a6a22]">
                  What this page sells
                </span>
                <h3 className="mt-3 text-xl font-bold text-ink-900">
                  Trademark filing - ${SERVICE} + ${PER_CLASS} per class
                </h3>
                <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-300">
                  A federal government registration
                </p>
                <dl className="mt-5 space-y-4 border-t border-slate-200 pt-5">
                  {[
                    ['Protects', 'The name and mark you trade under, in the classes you registered'],
                    ['Stops', 'A competitor using a confusingly similar name, even a different-looking one'],
                    ['Comes from', 'The USPTO, after examination - we prepare and prosecute the application'],
                    ['Exists', 'Once granted, and it has to be maintained and renewed to survive'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-600">{label}</dt>
                      <dd className="mt-1 text-[14.5px] leading-relaxed text-ink-600">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href="/contact?subject=Trademark%20Filing" className="btn-action mt-6 w-full px-6 py-3.5">
                  Start the clearance search
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The desk that does it ---------- */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl cert-vault px-6 py-10 text-white sm:px-10 sm:py-12">
              <div className="absolute inset-0 cert-engrave opacity-60" aria-hidden="true" />
              <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#e7c877]">
                    Before you spend anything
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    The search comes first, and the answer might be no.
                  </h2>
                  <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/70">
                    We would rather tell you a name is taken than take your filing fee and let an examiner tell you
                    eight months later. Send the mark and what the business sells, and the legal desk will come back
                    with a straight read: file it, change it, or keep your money.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contact?subject=Trademark%20Filing" className="btn-action px-7 py-3.5">
                      Request a clearance search
                    </Link>
                    <a
                      href={`mailto:${site.legalEmail}?subject=Trademark%20Filing`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <Icons.mail className="h-4.5 w-4.5" />
                      Ask the legal desk
                    </a>
                  </div>

                  <p className="mt-5 text-[13px] leading-relaxed text-white/45">
                    LogoOrbit prepares and files trademark applications for its clients. Nothing on this page is legal
                    advice about your own facts, and no filing service can guarantee that a mark will register.
                  </p>
                </div>

                <Reveal delay={140} className="justify-self-center">
                  <CertificateSeal
                    className="h-44 w-44 cert-seal sm:h-56 sm:w-56"
                    id="tm-seal"
                    plate={false}
                    arc="LOGOORBIT · TRADEMARK & BRAND PROTECTION ·"
                    foot="FEDERAL REGISTER"
                  />
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqAccordion items={faqs} heading="What people ask before they file" eyebrow="Trademark FAQs" />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl">Get the name on the register.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-500">
              Send the mark, the legal name behind the business, and a list of what you sell. We come back with the
              search result, the classes we recommend, and the total - tax and USPTO fee included in the figure -
              before anything is filed.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact?subject=Trademark%20Filing" className="btn-action px-7 py-4">
                Start my trademark - ${SERVICE}
              </Link>
              <Link
                href="/copyright-certificate"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600"
              >
                I need the copyright certificate too
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
