import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import FaqAccordion from '../components/FaqAccordion'
import CertificateInstrument, { CertificateSeal } from '../components/CertificateInstrument'
import { Icons } from '../components/Icons'
import { site } from '../lib/site'
import { salesTax } from '../lib/pricing'

const samplePdf = '/documents/logoorbit-sample-copyright-assignment-certificate.pdf'

/**
 * The record block printed at the head of every certificate. A value of `null`
 * is drawn as a blanked field, which is what the public specimen carries in
 * place of a client's details.
 */
const heroRecord = [
  { label: 'Certificate ID', value: 'SAMPLE-000000' },
  { label: 'Instrument', value: 'Assignment of copyright' },
  { label: 'Assignee', value: null, wide: true },
  { label: 'Project / order', value: null },
  { label: 'Effective date', value: null },
]

/**
 * Every operative part of the document, in the order the instrument carries
 * them. `operative` is the certificate's own wording, taken from the public
 * sample so the page cannot drift from the document it describes; `plain` is
 * the same thing said once, in English, for the person deciding whether to
 * buy it.
 */
const clauses = [
  {
    id: 'definitions',
    tab: 'Definitions',
    number: '1',
    heading: 'Definitions',
    operative:
      '“Work” means only the approved final logo artwork specifically identified in Exhibit A, together with the listed deliverables. “Unused Concepts” means drafts, rejected directions, sketches and alternatives not listed in Exhibit A. “Third-Party Materials” means fonts, stock assets, software, templates or other material owned or licensed by someone other than the Assignor.',
    plain:
      'Three defined terms carry the whole document. Everything that follows either grants you the Work, or explains why Unused Concepts and Third-Party Materials are not part of it. If you read one clause slowly, read this one — it is the clause that decides what the other nine are talking about.',
  },
  {
    id: 'conditions',
    tab: 'Conditions',
    number: '2',
    heading: 'Conditions to effectiveness',
    operative:
      'The assignment in Section 3 takes effect only after: (a) the Assignee has paid the separate copyright certificate fee of US $499; (b) all invoices for the underlying logo project have been paid in full; (c) the final Work has been approved; and (d) this Agreement has been completed and signed by authorised representatives of both parties. Before all conditions are satisfied, any concepts or previews are provided solely for private evaluation.',
    plain:
      'Four conditions, all of which have to be true. This is the clause behind the ownership notice on our pricing pages: until every one of them is met, previews are for your private evaluation and nothing has moved. It is also the clause that makes the order of the work obvious — approve, settle, sign, launch.',
  },
  {
    id: 'assignment',
    tab: 'Assignment',
    number: '3',
    heading: 'Assignment of copyright',
    operative:
      'Subject to Section 2, the Assignor irrevocably assigns to the Assignee all of the Assignor’s right, title and interest in the Work, including the exclusive rights to reproduce, adapt, distribute, display and otherwise exploit the Work throughout the world for the full term of copyright and any renewals or extensions. The assignment includes the right to apply for copyright registration in the Assignee’s name.',
    plain:
      'This is the sentence you are buying, and it is a transfer rather than a licence: worldwide, full term, irrevocable, nothing held back. Note the last line — once it is effective, registering the copyright in your own name is a filing you are entitled to make, without coming back to us for permission.',
  },
  {
    id: 'commercial',
    tab: 'Commercial use',
    number: '4',
    heading: 'Commercial use authorisation',
    operative:
      'Once effective, the Assignee may use the Work publicly and commercially in any lawful medium, including websites, social media, advertising, packaging, signage, merchandise and business documents, without an ongoing royalty payable to the Assignor. This authorisation is part of the assignment and does not extend to any excluded material.',
    plain:
      'The clause you actually rely on the week you launch. It names the mediums rather than gesturing at “commercial use”, so nobody has to argue later about whether a shopfront sign, a product box or a paid ad was included. No royalty, no usage cap, no per-medium permission to request.',
  },
  {
    id: 'excluded',
    tab: 'Excluded material',
    number: '5',
    heading: 'Excluded material and reserved rights',
    operative:
      'The assignment does not include Unused Concepts, the Assignor’s pre-existing tools, processes, templates, know-how, or Third-Party Materials, which remain governed by their own licence terms. The Assignor retains no ownership interest in the Work after the assignment becomes effective, except for any portfolio-display permission separately stated in the service terms or agreed in writing.',
    plain:
      'What stays behind, written down rather than left to be discovered. Rejected routes stay with us. A commercial typeface stays with its foundry — nobody can assign what they never owned. And we say plainly that the only thing we keep in the finished mark is permission to show it in our portfolio.',
  },
  {
    id: 'representations',
    tab: 'Representations',
    number: '6',
    heading: 'Assignor representations',
    operative:
      'The Assignor represents that it has authority to enter into this Agreement and that, to its knowledge, the human-authored portions of the Work created by it are original and have not previously been assigned. This Agreement does not guarantee copyright registrability, trademark registrability, non-conflict with every third-party right, or acceptance by a government office.',
    plain:
      'We stand behind what we can actually stand behind: the work is human-made, ours, and unassigned elsewhere. What we will not pretend is that no one anywhere holds a similar mark. That question is answered by a trademark clearance search, which is separate work — and any studio promising otherwise is writing a clause it cannot honour.',
  },
  {
    id: 'client-material',
    tab: 'Your material',
    number: '7',
    heading: 'Client-supplied material',
    operative:
      'The Assignee represents that it has permission to use every name, slogan, image, sketch, font or other item it supplied for the project. Rights in client-supplied material are not created or expanded by this Agreement, and the Assignee remains responsible for claims arising from that material.',
    plain:
      'The obligation that runs the other way. If you sent us a sketch, a photograph, a slogan or a font to work from, this instrument does not launder it — whatever rights you had in it before, you have after. Worth a moment’s thought if any part of the brief came from somewhere other than you.',
  },
  {
    id: 'moral-rights',
    tab: 'Moral rights',
    number: '8',
    heading: 'Moral rights',
    operative:
      'To the maximum extent permitted by applicable law, the Assignor waives and agrees not to assert moral rights or similar rights in the Work. Where a waiver is not legally effective, the Assignor consents to reasonable modification and use of the Work by the Assignee consistent with this Agreement.',
    plain:
      'The clause most ownership paperwork forgets. In several countries an author keeps personal rights over their work even after selling the copyright — enough to object to how it is altered. Here the designer waives them, so redrawing, recolouring or cropping your own logo is never somebody else’s decision.',
  },
  {
    id: 'assurances',
    tab: 'Further assurances',
    number: '9',
    heading: 'Further assurances',
    operative:
      'Each party will sign reasonable additional documents needed to confirm the transfer described here. Any government copyright registration, recordation, filing fee or trademark filing is separate from this Agreement unless expressly included in a written order.',
    plain:
      'Years later a registrar, an investor or a buyer’s lawyer may want one more signature to complete a chain of title. This clause commits us to giving it. It also states, again, that a government filing is a separate job — we would rather repeat ourselves than let that be assumed.',
  },
  {
    id: 'governing',
    tab: 'Governing terms',
    number: '10',
    heading: 'Governing terms',
    operative:
      'This Agreement, Exhibit A, the applicable LogoOrbit service terms and any signed statement of work form the complete agreement concerning ownership of the Work. If they conflict, the later document signed by both parties controls.',
    plain:
      'Four pieces of paper can end up describing the same project. Rather than leave a court to guess, the instrument names them and sets the order of precedence: the most recent thing you and we both signed wins. That is the whole clause, and it is deliberately short.',
  },
  {
    id: 'exhibit',
    tab: 'Exhibit A',
    number: 'A',
    heading: 'Exhibit A — description of the Work',
    operative:
      'Only the final work and deliverables listed in this exhibit are covered by the assignment. The exhibit records the final logo name, the project or order number, the approved version, the included files, the colour specifications, the typography and its licence notes, and any excluded material — initialled and dated by both parties.',
    plain:
      'A transfer of “the logo” is an argument waiting to happen. Exhibit A turns it into an inventory: this mark, this approved version, these files, these colours, this typeface. If it is not on the schedule it was not assigned — which cuts both ways, and is why we walk the list with you before anyone signs.',
  },
]

const ledger = {
  design: [
    'Original concepts drawn for your business',
    'Revisions until the mark is right',
    'Master files for print, web and social',
    'Permission to review and approve internally',
  ],
  designNot: [
    'Public or commercial use of the final mark',
    'Any transfer of our copyright in it',
  ],
  certificate: [
    'The copyright in the approved final mark, assigned to a named entity',
    'Written authorisation for public, commercial use worldwide',
    'The right to apply for copyright registration in your own name',
    'A moral-rights waiver, so adapting your own logo is your decision',
    'Exhibit A: the mark, approved version, files, colours and typography, itemised',
    'Stated exclusions, so the boundaries are on paper rather than assumed',
    'A Certificate ID and effective date for your records',
  ],
}

const chain = [
  {
    step: 'Step 01',
    title: 'The mark is approved',
    body: 'You sign off one final design. That mark, and the files that carry it, become the subject of Exhibit A. Drafts and rejected routes stay outside the transfer.',
  },
  {
    step: 'Step 02',
    title: 'Both fees are settled',
    body: 'The project balance and the separate $499 certificate fee are paid. Until then the conditions in Section 2 are not met and nothing moves.',
  },
  {
    step: 'Step 03',
    title: 'The instrument is executed',
    body: 'Our legal desk issues the project-specific certificate with its ID. Both parties sign, electronically or in wet ink. This signature is the transfer.',
  },
  {
    step: 'Step 04',
    title: 'The rights are yours',
    body: 'From the effective date the mark is yours to use publicly and commercially, worldwide, for the full term — with no renewal and no royalty back to us.',
  },
]

/**
 * Three documents people conflate. Setting them side by side is the fastest
 * way to say what this certificate is, and just as importantly what it is not:
 * nothing here is issued by a government office.
 */
const registers = [
  {
    name: 'This certificate',
    price: '$499 · issued by us',
    highlight: true,
    rows: [
      ['What it is', 'A private, signed instrument transferring our copyright in your final logo to you'],
      ['Who issues it', 'LogoOrbit’s legal desk, for your specific project'],
      ['What it gives you', 'Ownership of the mark, the right to use it commercially, and the right to register it in your own name'],
      ['What it is not', 'It is not a government record and it creates no public register entry'],
      ['How long it takes', 'Issued and signed within a few business days of approval and payment'],
    ],
  },
  {
    name: 'Copyright Office registration',
    price: 'Government fee · optional, later',
    rows: [
      ['What it is', 'A public record of a copyright claim, held by the U.S. Copyright Office'],
      ['Who issues it', 'The U.S. Copyright Office — a government body, not a design studio'],
      ['What it gives you', 'A public record, plus remedies that can matter if you ever have to sue'],
      ['What it is not', 'It does not, by itself, move ownership from us to you — a signed transfer does that'],
      ['How long it takes', 'Months, and it is filed by whoever owns the work at the time of filing'],
    ],
  },
  {
    name: 'USPTO trademark',
    price: 'From $599 + $350 per class + government fee',
    rows: [
      ['What it is', 'Registration of a brand name or mark for use in commerce in specific classes'],
      ['Who issues it', 'The United States Patent and Trademark Office'],
      ['What it gives you', 'Rights against others trading under a confusingly similar mark'],
      ['What it is not', 'It is a different right entirely — it says nothing about who drew the artwork'],
      ['How long it takes', 'Typically eight to eighteen months, and it starts with a clearance search'],
    ],
  },
]

const faqs = [
  {
    q: 'Why is ownership priced separately from the logo?',
    a: 'Because they are two different things being bought. The package pays a studio to create original artwork. This instrument moves a property right from our balance sheet to yours, is drafted for your specific project, is checked and signed by our legal desk, and is the document you would rely on years later. Plenty of clients only ever need the first. Everyone who intends to trade publicly under the mark needs the second.',
  },
  {
    q: 'Can I use the logo before the certificate is signed?',
    a: 'Internally, while you review and decide, yes. Public and commercial use is authorised once the project is paid in full and this certificate has been completed and signed. If you have a launch date, tell us early and we will have the instrument ready to sign the day the design is approved.',
  },
  {
    q: 'Is this the same as registering my copyright with the government?',
    a: 'No, and we will not let that be unclear. This is a private transfer document between two parties, which is how ownership of a copyright actually moves under U.S. law — a transfer generally has to be in a writing signed by the owner. Registration with the U.S. Copyright Office is a separate, optional public filing you can make afterwards, as the owner, once this instrument has made you the owner.',
  },
  {
    q: 'Whose name should be on it?',
    a: 'The legal entity that will trade under the mark. If your company already exists, use its registered name exactly as it appears on the incorporation paperwork. If it does not exist yet, either wait or put it in your own name and plan a second assignment into the company later. Tell the legal desk which you want before the certificate is drawn up — changing the assignee after signature means issuing a fresh instrument.',
  },
  {
    q: 'Does anything expire, renew, or come back to you?',
    a: 'No. It is a one-time fee for an outright assignment, for the full term of copyright, worldwide. There is no licence to renew, no royalty, no usage cap and no category we hold back. The only things outside the transfer are the ones written into the exclusions clause: rejected concepts, and third-party fonts or stock that were never ours to give.',
  },
  {
    q: 'What if my logo contains a licensed font?',
    a: 'It is disclosed in the certificate rather than glossed over. A typeface used inside a logotype is usually converted to outlines, and the resulting artwork is assigned to you — but the font software itself stays under its foundry licence, and we say so on the face of the document. If you would rather avoid the question entirely, ask for a hand-drawn wordmark at the design stage.',
  },
  {
    q: 'Can we have our own lawyer review it first?',
    a: 'Please do. That is exactly why the specimen PDF is published on this page with no gate in front of it — download it, send it to your counsel, and come back with questions. If your lawyer wants a change to the wording for your project, write to the legal desk and we will tell you plainly whether we can accommodate it.',
  },
]

/** The interactive walk-through of the document's seven operative clauses. */
function InstrumentAnatomy() {
  const [active, setActive] = useState(0)
  const clause = clauses[active]

  /* A tablist that only responds to the mouse is a lie told in ARIA, so the
     arrow keys walk the clauses and only the selected tab is in the tab
     order, which is what a screen reader announces it as. */
  const onKeyDown = (event) => {
    const keys = {
      ArrowRight: (i) => (i + 1) % clauses.length,
      ArrowDown: (i) => (i + 1) % clauses.length,
      ArrowLeft: (i) => (i - 1 + clauses.length) % clauses.length,
      ArrowUp: (i) => (i - 1 + clauses.length) % clauses.length,
      Home: () => 0,
      End: () => clauses.length - 1,
    }
    const next = keys[event.key]
    if (!next) return

    event.preventDefault()
    const index = next(active)
    setActive(index)
    document.getElementById(`clause-tab-${clauses[index].id}`)?.focus()
  }

  return (
    <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:items-start">
      <Reveal className="min-w-0">
        <div
          className="flex min-w-0 gap-2 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:overflow-visible lg:pb-0"
          role="tablist"
          aria-label="Clauses of the certificate"
          onKeyDown={onKeyDown}
        >
          {clauses.map((item, index) => {
            const isActive = index === active
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`clause-tab-${item.id}`}
                aria-selected={isActive}
                aria-controls="clause-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(index)}
                className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors lg:w-full ${
                  isActive
                    ? 'border-[#c9a044]/70 bg-[#c9a044]/12 text-white'
                    : 'border-white/12 bg-white/[0.04] text-white/65 hover:border-white/25 hover:text-white'
                }`}
              >
                <span
                  className={`doc-mono grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-bold ${
                    isActive ? 'bg-[#c9a044] text-[#101a3a]' : 'bg-white/10 text-white/70'
                  }`}
                >
                  {item.number}
                </span>
                <span className="whitespace-nowrap text-[14.5px] font-semibold lg:whitespace-normal">{item.tab}</span>
              </button>
            )
          })}
        </div>

        <p className="mt-5 hidden text-[13.5px] leading-relaxed text-white/45 lg:block">
          Wording taken from the public sample, so this page cannot drift from the document it describes. Your own
          certificate carries the same sections around your project, order number and file schedule.
        </p>
      </Reveal>

      <Reveal delay={90}>
        <div id="clause-panel" role="tabpanel" aria-labelledby={`clause-tab-${clause.id}`}>
          <CertificateInstrument showSeal={false} watermark="" className="shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)]">
            <p className="doc-mono text-[10px] uppercase tracking-[0.24em] text-[#8a6a22]">
              {clause.number === 'A' ? 'Exhibit A' : `Section ${clause.number} of 10`}
            </p>
            <h3 className="doc-face mt-2 text-xl font-bold text-[#121c36] sm:text-2xl">{clause.heading}</h3>
            <p className="doc-face mt-4 text-[15px] leading-[1.85] text-[#26314f] sm:text-[16.5px]">
              {clause.operative}
            </p>

            <div className="mt-6 rounded-xl border border-[#c9a044]/35 bg-[#c9a044]/[0.09] p-4 sm:p-5">
              <span className="doc-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a6a22]">
                In plain English
              </span>
              {/* The plain-English note is deliberately set in the site's own
                  face, not the document serif: it is us talking, not the
                  instrument. */}
              <p
                className="mt-2 text-[14.5px] leading-relaxed text-[#26314f] sm:text-[15.5px]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {clause.plain}
              </p>
            </div>
          </CertificateInstrument>
        </div>
      </Reveal>
    </div>
  )
}

export default function CopyrightCertificatePage() {
  return (
    <Layout
      title="Copyright Assignment Certificate - $499"
      description="The signed instrument that moves LogoOrbit's copyright in your approved final logo to your business. Read all ten sections, compare it with government registration, and download the public specimen PDF."
      path="/copyright-certificate"
      jsonLd={{
        '@graph': [
          {
            '@type': 'Product',
            name: 'LogoOrbit Copyright Assignment & Commercial Use Certificate',
            description:
              'A project-specific written copyright assignment transferring LogoOrbit’s copyright in an approved final logo to the client, with authorisation for public commercial use.',
            brand: { '@type': 'Brand', name: 'LogoOrbit' },
            category: 'Legal document preparation',
            offers: {
              '@type': 'Offer',
              price: '499',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: `${site.url}/copyright-certificate`,
            },
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
      {/* ---------- The instrument, on the table ---------- */}
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
              <span className="text-white/80">Copyright certificate</span>
            </nav>

            <span className="doc-mono mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#c9a044]/40 bg-[#c9a044]/10 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#e7c877]">
              <Icons.scales className="h-4 w-4" />
              Instrument of transfer
            </span>

            <h1 className="mt-5 max-w-xl text-[2.1rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Design is a service.{' '}
              <span className="cert-foil">Ownership is a document.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-white/70 sm:text-lg">
              Your logo package pays for the work. This is the separate, project-specific instrument that assigns
              LogoOrbit’s copyright in the approved final mark to your business in signed writing, and authorises
              public commercial use from a stated effective date.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact?subject=Copyright%20Certificate" className="btn-action px-7 py-4">
                Request the certificate - $499
                <Icons.arrow className="h-5 w-5" />
              </Link>
              <a
                href={samplePdf}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c9a044]/45 bg-[#c9a044]/[0.08] px-7 py-4 font-semibold text-[#f0d89a] transition-colors hover:bg-[#c9a044]/20"
              >
                Read the specimen PDF
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {[
                ['One-time', 'No renewal, no royalty'],
                ['Worldwide', 'Full term of copyright'],
                ['Signed', 'By both parties, on paper'],
              ].map(([value, label]) => (
                <div key={value} className="bg-[#0a1330]/80 px-3 py-4 text-center sm:px-4">
                  <dt className="text-[15px] font-bold text-[#e7c877] sm:text-base">{value}</dt>
                  <dd className="mt-1 text-[11.5px] leading-snug text-white/50 sm:text-xs">{label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 max-w-lg text-[12.5px] leading-relaxed text-white/40">{salesTax.short}</p>
          </div>

          <Reveal delay={120} className="lg:pl-4">
            <div className="cert-tilt mx-auto max-w-md lg:max-w-none">
              <CertificateInstrument record={heroRecord}>
                <p className="doc-mono text-[10px] uppercase tracking-[0.22em] text-[#8a6a22]">
                  Section 3 — Assignment of copyright
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.8] text-[#26314f] sm:text-[14.5px]">
                  Subject to Section 2, the Assignor irrevocably assigns to the Assignee all of the Assignor’s right,
                  title and interest in the Work, including the exclusive rights to reproduce, adapt, distribute,
                  display and otherwise exploit the Work throughout the world for the full term of copyright.
                </p>
                <div className="mt-4 space-y-2" aria-hidden="true">
                  <span className="block h-2 w-full cert-redact" />
                  <span className="block h-2 w-[92%] cert-redact" />
                  <span className="block h-2 w-[72%] cert-redact" />
                </div>
              </CertificateInstrument>
            </div>
            <p className="mt-5 text-center text-[13px] text-white/45">
              Specimen. Every client field is a placeholder, and the file is unsigned and watermarked.
            </p>
          </Reveal>
        </div>

        <div className="cert-foil-rule relative h-px w-full opacity-60" aria-hidden="true" />
      </section>

      {/* ---------- What each payment actually buys ---------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Two purchases, one project
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-ink-900 sm:text-4xl">
              Paying a designer is not the same as{' '}
              <span className="text-gradient">acquiring a right</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              Under U.S. law a copyright generally moves only by a writing signed by the owner. Until that writing
              exists, the studio that drew the mark still holds the copyright in it — however much the design itself
              cost. Here is the line between the two, written out.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500">Your logo package</span>
                <h3 className="mt-3 text-2xl font-bold text-ink-900">The design fee buys the work</h3>
                <ul className="mt-6 space-y-3">
                  {ledger.design.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-trust-100 text-trust-600">
                        <Icons.check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[15px] leading-relaxed text-ink-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500">
                    What it does not buy
                  </span>
                  <ul className="mt-3 space-y-3">
                    {ledger.designNot.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-200 text-ink-500">
                          <Icons.close className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-[15px] leading-relaxed text-ink-500">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="relative h-full overflow-hidden rounded-3xl cert-vault p-6 text-white sm:p-8">
                <div className="absolute inset-0 cert-engrave opacity-60" aria-hidden="true" />
                <div className="relative">
                  <span className="doc-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#e7c877]">
                    The $499 certificate
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white">The instrument buys the right</h3>
                  <ul className="mt-6 space-y-3">
                    {ledger.certificate.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#c9a044]/20 text-[#e7c877]">
                          <Icons.check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-[15px] leading-relaxed text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact?subject=Copyright%20Certificate"
                    className="btn-action mt-7 w-full px-6 py-3.5"
                  >
                    Add the certificate to my project
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Read the document before you buy it ---------- */}
      <section className="relative overflow-hidden cert-vault py-16 text-white sm:py-24">
        <div className="absolute inset-0 cert-engrave opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#e7c877]">
              Anatomy of the instrument
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-white sm:text-4xl">
              Ten sections and an exhibit. Nothing behind a{' '}
              <span className="cert-foil">contact form.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              Most studios describe their ownership paperwork. Read ours instead — section by section, in the
              certificate’s own words, with what each one actually means for you underneath it.
            </p>
          </Reveal>

          <InstrumentAnatomy />
        </div>
      </section>

      {/* ---------- Chain of title ---------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Chain of title</span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-ink-900 sm:text-4xl">
              How the mark gets from{' '}
              <span className="text-gradient">our desk to your name</span>
            </h2>
          </Reveal>

          <ol className="cert-spine relative mt-12 grid gap-8 lg:grid-cols-4 lg:gap-6">
            {chain.map((item, index) => (
              <Reveal key={item.step} delay={index * 80} as="li" className="relative pl-16 lg:pl-0">
                <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border-2 border-[#c9a044] bg-white text-[15px] font-bold text-[#8a6a22] shadow-sm lg:relative lg:mb-6">
                  {index + 1}
                </span>
                <span className="doc-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-brand-600">
                  {item.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{item.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <p className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-[15px] leading-relaxed text-ink-600 sm:p-6">
              Step three is the one that carries legal weight. A transfer of copyright ownership generally has to be in
              writing and signed by the owner of the rights being transferred — see{' '}
              <a
                className="font-semibold text-brand-600 underline underline-offset-4"
                href="https://www.copyright.gov/title17/92chap2.html#204"
                target="_blank"
                rel="noreferrer"
              >
                17 U.S.C. § 204
              </a>{' '}
              and the U.S. Copyright Office’s{' '}
              <a
                className="font-semibold text-brand-600 underline underline-offset-4"
                href="https://www.copyright.gov/circs/circ01.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Copyright Basics
              </a>{' '}
              circular.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- The distinction people get wrong ---------- */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-action-600">
              Read this before you buy
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-ink-900 sm:text-4xl">
              This is not a government filing, and we will{' '}
              <span className="text-gradient">never imply that it is</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              Three different documents get called “copyrighting my logo”. Only one of them is what we issue. Here is
              the honest comparison, including the parts that send you somewhere other than us.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {registers.map((column, index) => (
              <Reveal key={column.name} delay={index * 80}>
                <div
                  className={`h-full rounded-3xl border p-6 sm:p-7 ${
                    column.highlight
                      ? 'border-[#c9a044] bg-white shadow-lg shadow-[#c9a044]/15 ring-1 ring-[#c9a044]/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  {column.highlight && (
                    <span className="doc-mono inline-flex rounded-full bg-[#c9a044]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a6a22]">
                      What this page sells
                    </span>
                  )}
                  <h3 className={`text-xl font-bold text-ink-900 ${column.highlight ? 'mt-3' : ''}`}>{column.name}</h3>
                  <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-300">
                    {column.price}
                  </p>

                  <dl className="mt-5 space-y-4 border-t border-slate-200 pt-5">
                    {column.rows.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-600">{label}</dt>
                        <dd className="mt-1 text-[14.5px] leading-relaxed text-ink-600">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-8 text-center text-[15px] leading-relaxed text-ink-500">
              Thinking about the third column?{' '}
              <Link href="/legal" className="font-semibold text-brand-600 underline underline-offset-4">
                Our trademark filing service
              </Link>{' '}
              handles the clearance search and the USPTO application separately — and we will tell you when it is not
              worth filing yet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- The specimen and the record ---------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl cert-vault px-6 py-10 text-white sm:px-10 sm:py-12">
              <div className="absolute inset-0 cert-engrave opacity-60" aria-hidden="true" />
              <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#e7c877]">
                    On the record
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    Read all four pages before you decide.
                  </h2>
                  <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/70">
                    The specimen is the whole instrument: the certificate face, the ten sections, and the Exhibit A
                    schedule with its initial blocks. It is published without a form in front of it so your own lawyer
                    can read it before you spend anything.
                  </p>

                  <div className="mt-6 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-white/12 bg-white/[0.05] px-5 py-4">
                    <span className="doc-mono text-lg font-bold tracking-[0.14em] text-[#f0d89a]">SAMPLE-000000</span>
                    <span className="text-[13px] text-white/45">
                      the specimen ID · yours carries a real one and an effective date
                    </span>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a href={samplePdf} download className="btn-action px-7 py-3.5">
                      Download the specimen
                    </a>
                    <a
                      href={`mailto:${site.legalEmail}?subject=Certificate%20verification`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <Icons.mail className="h-4.5 w-4.5" />
                      Ask the legal desk
                    </a>
                  </div>

                  <p className="mt-5 text-[13px] leading-relaxed text-white/45">
                    Every client field in the specimen is a placeholder, and no client artwork appears in it. It is
                    incomplete, unsigned, visibly watermarked, transfers nothing, and is not a certificate issued by the
                    U.S. Copyright Office or any other government authority. PDF, US Letter, 4 pages.
                  </p>
                </div>

                <Reveal delay={140} className="justify-self-center">
                  <CertificateSeal className="h-44 w-44 cert-seal sm:h-56 sm:w-56" id="record-seal" plate={false} />
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqAccordion items={faqs} heading="Questions the legal desk actually gets" eyebrow="Certificate FAQs" />

      {/* ---------- Close ---------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl">Ready to put the mark in your name?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-500">
              Send your order number and the exact legal name that should own the final logo. Our legal desk drafts the
              project-specific instrument, and you read it in full before anyone signs anything.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact?subject=Copyright%20Certificate" className="btn-action px-7 py-4">
                Request the certificate - $499
              </Link>
              <a
                href={`mailto:${site.legalEmail}?subject=Copyright%20Certificate`}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600"
              >
                Ask the legal desk first
              </a>
            </div>
            <p className="mt-6 text-[13.5px] leading-relaxed text-ink-300">
              {salesTax.short} LogoOrbit prepares this instrument for its own design projects. It is not a substitute for advice from a
              lawyer admitted in your jurisdiction on your own facts.
            </p>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
