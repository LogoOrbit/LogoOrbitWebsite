import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import LegalCounsel from '../components/LegalCounsel'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTA from '../components/CTA'
import { Icons } from '../components/Icons'
import { site, legalCounsel } from '../lib/site'

/** Where legal questions go, and what happens after they arrive. */
const route = [
  {
    step: '01',
    title: 'Send it in writing',
    body: `Email ${legalCounsel.email}. It is the only route to the legal desk, and it keeps a record of what was asked. Include the order name so we can pull the file while we read.`,
  },
  {
    step: '02',
    title: 'It reaches a lawyer, not a queue',
    body: 'Legal messages are not triaged by support. They go straight to Greg and the compliance desk.',
  },
  {
    step: '03',
    title: 'A straight answer, normally within a day',
    body: 'Including when the answer is "you do not need us for this" or "that will not work, and here is why".',
  },
]

const documents = [
  {
    href: '/terms',
    title: 'Terms & Conditions',
    body: 'Revisions, delivery, copyright transfer, trademark filings, billing and cancellation.',
  },
  {
    href: '/privacy',
    title: 'Privacy Policy',
    body: 'What we collect, why, who ever sees it, and how to have it corrected or deleted.',
  },
  {
    href: '/pricing#trademark',
    title: 'Trademark filing service',
    body: 'Clearance search, USPTO application and examiner responses. $299 per class plus the government fee.',
  },
]

export default function LegalPage() {
  return (
    <Layout
      title="Legal & Compliance"
      description={`${legalCounsel.name}, ${legalCounsel.role} at LogoOrbit, handles copyright, trademark filings, brand protection and privacy requests. Reach the legal desk by email at ${legalCounsel.email}.`}
      path="/legal"
      jsonLd={{
        '@type': 'ContactPage',
        name: 'Legal & Compliance',
        url: `${site.url}/legal`,
        mainEntity: {
          '@type': 'Person',
          name: legalCounsel.name,
          jobTitle: legalCounsel.role,
          email: legalCounsel.email,
          worksFor: { '@id': `${site.url}/#organization` },
          memberOf: { '@type': 'Organization', name: legalCounsel.bar },
        },
      }}
    >
      <PageHero
        eyebrow="Legal & Compliance"
        breadcrumb="Legal"
        title="Rights, trademarks and data,"
        highlight="handled by a named lawyer"
        intro="Design questions go to your designer. Anything about who owns what, whether a mark can be registered, or what we hold about you, goes to our legal desk, and it has a name and a face."
      >
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <a href={`mailto:${legalCounsel.email}?subject=Legal%20enquiry`} className="btn-action px-7 py-4">
            <Icons.mail className="w-5 h-5" />
            {legalCounsel.email}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Icons.mail className="w-5 h-5" />
            Not a legal question? {site.email}
          </a>
        </div>
        <p className="mt-5 text-[14px] text-white/70">
          Email is the only way to reach the legal desk. Our phone and WhatsApp lines are answered by support.
        </p>
      </PageHero>

      <LegalCounsel />

      {/* How a legal question is handled */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="What happens next"
            title="Three steps, and none of them"
            highlight="involve a ticket number"
            body="We keep the legal route deliberately short, because the questions that end up here are usually the ones somebody is anxious about."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {route.map((r, i) => (
              <Reveal key={r.step} delay={i * 90}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <span className="text-sm font-bold tracking-[0.2em] text-brand-600">{r.step}</span>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">{r.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The documents themselves */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="The paperwork"
            title="Everything is written down,"
            highlight="and it is all readable"
          />

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {documents.map((doc, i) => (
              <Reveal key={doc.href} delay={i * 90}>
                <Link
                  href={doc.href}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl"
                >
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600">
                    <Icons.shield className="w-6 h-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">{doc.title}</h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-500">{doc.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-600">
                    Read it
                    <Icons.arrow className="w-4.5 h-4.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140} className="mt-10">
            <p className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-ink-500">
              None of this is legal advice for your own business, and our legal desk acts for LogoOrbit. What it
              will always do is tell you plainly where you stand with us, and say so when you need your own lawyer
              rather than ours.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />
    </Layout>
  )
}
