import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TrustBar from '../../components/TrustBar'
import LinkGrid from '../../components/LinkGrid'
import Guarantees from '../../components/Guarantees'
import Testimonials from '../../components/Testimonials'
import CTA from '../../components/CTA'
import { industryPages } from '../../lib/industries'
import { breadcrumb, collectionPageSchema, itemListSchema } from '../../lib/seo'

const description =
  'Branding, web and design work by sector: technology, SaaS, healthcare, construction, real estate, hospitality, retail, education, gaming and twenty more, each with the constraints that shape the brief.'

export default function IndustriesHub({ items }) {
  const jsonLd = {
    '@graph': [
      collectionPageSchema({ path: '/industries', name: 'Industries we design for', description }),
      itemListSchema({ path: '/industries', name: 'Industries', items }),
      breadcrumb([{ name: 'Industries', href: '/industries' }]),
    ],
  }

  return (
    <Layout title="Industries We Design For" description={description} path="/industries" jsonLd={jsonLd}>
      <PageHero
        eyebrow="Industries"
        breadcrumb="Industries"
        title="We have almost certainly"
        highlight="branded something like yours"
        intro="A dental practice and an esports team are not the same design job. Pick your sector and see what actually changes about the brief, the constraints and the work."
      />

      <TrustBar />

      <LinkGrid
        eyebrow="Every sector"
        title={`${items.length} industries, each with its own constraints`}
        body="These pages are written around what the sector really needs rather than a template with the industry name swapped in."
        items={items}
        tone="light"
      />

      <Guarantees />
      <Testimonials />
      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: {
      items: industryPages.map((i) => ({
        name: i.name,
        href: `/industries/${i.slug}`,
        description: i.metaDescription,
      })),
    },
  }
}
