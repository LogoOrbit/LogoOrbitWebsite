import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import CTA from '../components/CTA'
import { Icons } from '../components/Icons'
import { site } from '../lib/site'
import { breadcrumb } from '../lib/seo'

const standards = [
  { title: 'Useful before promotional', body: 'A resource must answer a real planning, buying or implementation question on its own. Service links are contextual and never replace the answer.' },
  { title: 'Facts separated from opinion', body: 'We distinguish production requirements and standards from creative judgment. Where a choice depends on context, we say what changes the decision.' },
  { title: 'No invented evidence', body: 'We do not manufacture client outcomes, survey findings, awards, credentials or statistics. A case study should identify its evidence and limits.' },
  { title: 'Primary sources for standards', body: 'For accessibility, platform, legal and technical requirements, editors check the responsible standards body or official documentation when practical.' },
  { title: 'Commercial transparency', body: 'LogoOrbit sells design services. Our resources may link to those services, but rankings, comparisons and definitions are not sold to outside parties.' },
  { title: 'Corrections stay visible', body: 'Material corrections include an updated date. Readers can report a factual error to support, and the responsible team reviews the source before changing it.' },
]

export default function EditorialStandardsPage() {
  return (
    <Layout title="Editorial Standards" description="How LogoOrbit researches, writes, reviews, corrects and maintains its branding and design resources, including evidence and commercial-disclosure standards." path="/editorial-standards" jsonLd={{ '@graph': [{ '@type': 'WebPage', '@id': `${site.url}/editorial-standards#webpage`, name: 'LogoOrbit editorial standards', url: `${site.url}/editorial-standards`, dateModified: '2026-08-03', publisher: { '@id': `${site.url}/#organization` } }, breadcrumb([{ name: 'Editorial standards', href: '/editorial-standards' }])] }}>
      <PageHero eyebrow="Editorial standards" trail={[{ name: 'Editorial standards', href: '/editorial-standards' }]} title="Useful, accurate and clear" highlight="about what we know" intro="LogoOrbit is a design business, and that commercial context is explicit. These standards govern the educational resources we publish and the evidence we will-and will not-claim." />

      <section className="py-16 sm:py-20 bg-white"><div className="mx-auto max-w-7xl px-5 sm:px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">{standards.map((standard, index) => <Reveal key={standard.title} delay={index * 60}><article className="h-full rounded-3xl border border-slate-200 p-7"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 font-bold text-brand-600">{index + 1}</span><h2 className="mt-5 text-xl font-bold text-ink-900">{standard.title}</h2><p className="mt-3 text-[15px] leading-relaxed text-ink-500">{standard.body}</p></article></Reveal>)}</div></section>

      <section className="py-16 sm:py-20 bg-slate-50"><div className="mx-auto max-w-4xl px-5 sm:px-6"><h2 className="text-3xl sm:text-4xl font-bold text-ink-900">Review and maintenance</h2><div className="mt-6 space-y-5 text-[17px] leading-8 text-ink-600"><p>Every guide carries a reviewed date. Evergreen process articles receive a scheduled accuracy review at least annually; pages tied to software, standards, prices or regulations are reviewed when the underlying source changes or a reader flags an issue.</p><p>Editors check internal consistency, links, terminology, unsupported superlatives and whether the page still satisfies the question in its title. Substantive changes update the reviewed date. Pure spelling or formatting corrections do not imply a new factual review.</p><p>Design and production guidance is educational. Trademark, regulatory, privacy and other legal questions require a qualified professional for the relevant jurisdiction and facts.</p></div><div className="mt-8 flex flex-wrap gap-3"><a href={`mailto:${site.email}?subject=Resource%20correction`} className="btn-action px-7 py-3.5"><Icons.mail className="w-4.5 h-4.5" />Report a correction</a><Link href="/resources" className="rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600">Browse resources</Link></div></div></section>
      <CTA />
    </Layout>
  )
}
