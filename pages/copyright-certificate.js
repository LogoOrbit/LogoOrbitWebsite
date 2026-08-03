import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CopyrightOwnershipNotice from '../components/CopyrightOwnershipNotice'
import { Icons } from '../components/Icons'
import { site } from '../lib/site'

const samplePdf = '/documents/logoorbit-sample-copyright-assignment-certificate.pdf'

const steps = [
  {
    number: '01',
    title: 'Approve the final logo',
    body: 'The certificate identifies the exact approved artwork and file set. Drafts and unused concepts stay outside the transfer.',
  },
  {
    number: '02',
    title: 'Settle the project and $499 certificate fee',
    body: 'Both the logo project and the separate ownership document must be paid before the assignment can take effect.',
  },
  {
    number: '03',
    title: 'Sign the written assignment',
    body: 'LogoOrbit and the client sign the completed document. That signed writing is what transfers the listed copyright rights.',
  },
  {
    number: '04',
    title: 'Use the logo publicly',
    body: 'After the effective date, the client may publish and use the assigned logo commercially, subject to any listed third-party licences.',
  },
]

const included = [
  'A project-specific copyright assignment naming the legal owner',
  'A commercial-use authorization for the final approved logo',
  'An Exhibit A identifying the artwork, versions and delivered files',
  'Clear exclusions for unused concepts, third-party fonts and stock assets',
  'Electronic-signature-ready execution blocks for both parties',
  'A certificate ID and effective date for your records',
]

export default function CopyrightCertificatePage() {
  return (
    <Layout
      title="Copyright Assignment Certificate - $499"
      description="Transfer ownership of your approved LogoOrbit logo with a project-specific written copyright assignment and commercial-use certificate for $499. Download the public sample PDF."
      path="/copyright-certificate"
      jsonLd={{
        '@type': 'Product',
        name: 'LogoOrbit Copyright Assignment & Commercial Use Certificate',
        description: 'A project-specific written copyright assignment for an approved LogoOrbit logo.',
        brand: { '@type': 'Brand', name: 'LogoOrbit' },
        offers: {
          '@type': 'Offer',
          price: '499',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${site.url}/copyright-certificate`,
        },
      }}
    >
      <PageHero
        eyebrow="Copyright & ownership"
        breadcrumb="Copyright certificate"
        title="Own the final logo,"
        highlight="in a signed writing"
        intro="The logo package pays for the design work. This separate $499 certificate is the project-specific legal document that assigns LogoOrbit’s copyright in the approved final mark and authorizes public, commercial use."
      >
        <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row">
          <Link href="/contact?subject=Copyright%20Certificate" className="btn-action px-7 py-4">
            Get the certificate - $499
            <Icons.arrow className="h-5 w-5" />
          </Link>
          <a href={samplePdf} download className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white transition-colors hover:bg-white/20">
            Download sample PDF
          </a>
        </div>
        <p className="mt-5 text-sm text-white/65">One-time fee. No renewal or continuing royalty to LogoOrbit after an effective assignment.</p>
      </PageHero>

      <CopyrightOwnershipNotice />

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="What you receive"
            title="A transfer document built around"
            highlight="your exact final artwork"
            body="The signed certificate records who owns what, when the transfer takes effect, and which materials remain subject to separate licences."
          />
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {included.map((item, index) => (
              <Reveal key={item} delay={index * 60}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-trust-50 text-trust-600">
                    <Icons.check className="h-4 w-4" />
                  </span>
                  <p className="text-[15px] leading-relaxed text-ink-700">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading eyebrow="How it works" title="Four steps from approval" highlight="to ownership" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 70}>
                <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="text-sm font-bold tracking-[0.2em] text-brand-600">{step.number}</span>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Important distinction</span>
              <h2 className="mt-3 text-2xl font-bold text-ink-900 sm:text-3xl">Assignment is not government registration.</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-600 sm:text-[16px]">
                <p>
                  Copyright protection generally begins automatically when an original work is created and fixed. A transfer of ownership is different: under U.S. law, a transfer generally must be in writing and signed by the owner of the rights being transferred.
                </p>
                <p>
                  LogoOrbit’s certificate is that transaction document for the listed final logo. It is not a registration certificate from the U.S. Copyright Office and does not promise that any logo is registrable as copyright or trademark.
                </p>
                <p>
                  Read the official guidance in the <a className="font-semibold text-brand-600 underline underline-offset-4" href="https://www.copyright.gov/circs/circ01.pdf" target="_blank" rel="noreferrer">U.S. Copyright Office’s Copyright Basics circular</a> and <a className="font-semibold text-brand-600 underline underline-offset-4" href="https://www.copyright.gov/title17/92chap2.html#204" target="_blank" rel="noreferrer">17 U.S.C. § 204</a>.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <aside className="rounded-3xl mesh-bg p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
                Public sample
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white">Inspect the document before you buy.</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                The downloadable PDF contains no client name, personal details, signature, or client artwork. It is watermarked and has no legal effect.
              </p>
              <a href={samplePdf} download className="btn-action mt-6 w-full px-6 py-3.5">
                Download sample certificate PDF
              </a>
              <p className="mt-4 text-center text-xs leading-relaxed text-white/50">PDF, US Letter, 4 pages</p>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl">Ready to document the transfer?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-500">
              Send the order number and the legal name that should own the final logo. Our legal desk will prepare the project-specific certificate.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact?subject=Copyright%20Certificate" className="btn-action px-7 py-4">Get the certificate - $499</Link>
              <a href={`mailto:${site.legalEmail}?subject=Copyright%20Certificate`} className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600">
                Ask the legal desk
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
