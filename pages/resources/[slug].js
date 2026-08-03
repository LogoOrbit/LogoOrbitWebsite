import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/Reveal'
import ResourceCards from '../../components/ResourceCards'
import CTA from '../../components/CTA'
import { Icons } from '../../components/Icons'
import { resources, resourceBySlug } from '../../lib/resources'
import { articleSchema, breadcrumb } from '../../lib/seo'

export async function getStaticPaths() {
  return { paths: resources.map((resource) => ({ params: { slug: resource.slug } })), fallback: false }
}

export async function getStaticProps({ params }) {
  return { props: { resource: resourceBySlug[params.slug] } }
}

export default function ResourcePage({ resource }) {
  const related = resources.filter((item) => item.slug !== resource.slug).slice(0, 3)
  const dateLabel = new Date(`${resource.updated}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
  const jsonLd = { '@graph': [
    articleSchema({ path: `/resources/${resource.slug}`, headline: resource.title, description: resource.description, published: resource.updated, updated: resource.updated, keywords: resource.category }),
    breadcrumb([{ name: 'Resources', href: '/resources' }, { name: resource.title, href: `/resources/${resource.slug}` }]),
  ] }

  return (
    <Layout title={resource.title} description={resource.description} path={`/resources/${resource.slug}`} jsonLd={jsonLd} ogType="article" article={{ published: resource.updated, updated: resource.updated, section: resource.category }}>
      <PageHero eyebrow={resource.category} trail={[{ name: 'Resources', href: '/resources' }, { name: resource.title, href: `/resources/${resource.slug}` }]} title={resource.title} intro={resource.intro}>
        <p className="mt-6 text-sm text-white/65">Reviewed {dateLabel} · {resource.readTime} · LogoOrbit editorial team</p>
      </PageHero>

      <article className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 grid lg:grid-cols-[15rem_minmax(0,1fr)] gap-10 lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-300">In this guide</p>
            <ol className="mt-4 space-y-2 text-[14px] text-ink-500">
              {resource.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`} className="hover:text-brand-600">{section.heading}</a></li>)}
            </ol>
            <Link href={resource.service.href} className="btn-action mt-7 w-full px-5 py-3 text-sm">{resource.service.label}<Icons.arrow className="w-4 h-4" /></Link>
          </aside>

          <div className="min-w-0">
            <Reveal>
              <section className="rounded-3xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-ink-900">Key takeaways</h2>
                <ul className="mt-5 space-y-3">
                  {resource.takeaways.map((item) => <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-700"><Icons.check className="mt-0.5 w-5 h-5 shrink-0 text-trust-600" />{item}</li>)}
                </ul>
              </section>
            </Reveal>

            {resource.sections.map((section, index) => (
              <section key={section.heading} id={`section-${index + 1}`} className="scroll-mt-28 border-b border-slate-100 py-10 last:border-0">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-ink-900">{section.heading}</h2>
                {section.body.map((paragraph) => <p key={paragraph} className="mt-5 text-[17px] leading-8 text-ink-600">{paragraph}</p>)}
              </section>
            ))}

            <section className="mt-6 rounded-3xl bg-ink-900 p-7 sm:p-9 text-white">
              <h2 className="text-2xl font-bold text-white">Put the guide into practice</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">Bring the checklist to your next planning session, or send us the project and we will turn it into a clear scope, timeline and fixed quote.</p>
              <div className="mt-6 flex flex-wrap gap-3"><Link href="/brief" className="btn-action px-6 py-3">Start a brief</Link><Link href="/contact" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10">Ask a question</Link></div>
            </section>
          </div>
        </div>
      </article>

      <ResourceCards resources={related} heading="Keep learning" />
      <CTA />
    </Layout>
  )
}
