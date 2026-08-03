import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import ResourceCards from '../../components/ResourceCards'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { resources } from '../../lib/resources'
import { breadcrumb, collectionPageSchema, itemListSchema } from '../../lib/seo'

export default function ResourcesPage() {
  return (
    <Layout
      title="Branding & Design Resources"
      description="Practical, independently useful guides to logo design, brand identity, rebranding, website planning, packaging production and design buying decisions."
      path="/resources"
      jsonLd={{ '@graph': [
        collectionPageSchema({ path: '/resources', name: 'LogoOrbit branding and design resources', description: 'Practical guides for planning, commissioning and using design work.' }),
        itemListSchema({ path: '/resources', name: 'LogoOrbit design resources', items: resources.map((resource) => ({ name: resource.title, href: `/resources/${resource.slug}` })) }),
        breadcrumb([{ name: 'Resources', href: '/resources' }]),
      ] }}
    >
      <PageHero
        eyebrow="Design resources"
        trail={[{ name: 'Resources', href: '/resources' }]}
        title="Make better design decisions"
        highlight="before you spend a dollar"
        intro="Plain-language field guides for planning, commissioning, reviewing and using creative work. Written for owners and teams, not for search engines."
      >
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <a href="#guides" className="btn-action px-7 py-4">Browse the guides <Icons.arrow className="w-5 h-5" /></a>
          <Link href="/glossary" className="inline-flex items-center justify-center rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors">Open the design glossary</Link>
        </div>
      </PageHero>

      <div id="guides" className="scroll-mt-24"><ResourceCards resources={resources} /></div>

      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 grid md:grid-cols-3 gap-5">
          {[
            { href: '/glossary', title: 'Design glossary', body: 'Clear definitions for the production, branding, print and web terms that appear in briefs and quotes.' },
            { href: '/industries', title: 'Industry design guides', body: 'The practical constraints that change identity decisions across real estate, healthcare, technology and more.' },
            { href: '/editorial-standards', title: 'How we publish', body: 'Our standards for accuracy, evidence, conflicts, corrections and keeping these resources current.' },
          ].map((item, index) => (
            <Link key={item.href} href={item.href} className="rounded-3xl border border-slate-200 p-7 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Resource {index + 1}</p>
              <h2 className="mt-4 text-xl font-bold text-ink-900">{item.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{item.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-600">Explore <Icons.arrow className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </section>
      <CTA />
    </Layout>
  )
}
