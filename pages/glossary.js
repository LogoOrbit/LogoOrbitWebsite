import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import CTA from '../components/CTA'
import { glossary } from '../lib/resources'
import { site } from '../lib/site'
import { breadcrumb } from '../lib/seo'

export default function GlossaryPage() {
  const groups = glossary.reduce((result, item) => {
    const letter = item[0][0]
    result[letter] = [...(result[letter] || []), item]
    return result
  }, {})

  return (
    <Layout
      title="Branding & Design Glossary"
      description="Plain-English definitions for branding, logo design, typography, web accessibility, packaging and print production terms."
      path="/glossary"
      jsonLd={{ '@graph': [{
          '@type': 'DefinedTermSet',
          '@id': `${site.url}/glossary#terms`,
          name: 'LogoOrbit branding and design glossary',
          hasDefinedTerm: glossary.map(([name, description]) => ({ '@type': 'DefinedTerm', name, description, inDefinedTermSet: `${site.url}/glossary#terms` })),
        }, breadcrumb([{ name: 'Design glossary', href: '/glossary' }])] }}
    >
      <PageHero eyebrow="Design glossary" trail={[{ name: 'Design glossary', href: '/glossary' }]} title="Design language," highlight="translated into plain English" intro="The terms you will hear in a branding, website, packaging or print project—defined without expecting you to be a designer." />

      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <nav aria-label="Glossary letters" className="flex flex-wrap gap-2 border-b border-slate-100 pb-8">
            {Object.keys(groups).map((letter) => <a key={letter} href={`#letter-${letter}`} className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 font-bold text-ink-700 hover:border-brand-300 hover:text-brand-600">{letter}</a>)}
          </nav>
          {Object.entries(groups).map(([letter, terms]) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-28 grid gap-6 border-b border-slate-100 py-10 last:border-0 md:grid-cols-[5rem_1fr]">
              <h2 className="text-4xl font-bold text-brand-600">{letter}</h2>
              <dl className="grid gap-7 sm:grid-cols-2">
                {terms.map(([term, definition]) => <div key={term}><dt className="text-lg font-bold text-ink-900">{term}</dt><dd className="mt-2 text-[15px] leading-relaxed text-ink-500">{definition}</dd></div>)}
              </dl>
            </section>
          ))}
        </div>
      </section>
      <CTA />
    </Layout>
  )
}
