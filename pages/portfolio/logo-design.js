import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TrustBar from '../../components/TrustBar'
import Portfolio from '../../components/Portfolio'
import Testimonials from '../../components/Testimonials'
import CTA from '../../components/CTA'
import { site } from '../../lib/site'
import { portfolioLogos } from '../../lib/portfolio'
import { breadcrumb, collectionPageSchema, ORG_ID } from '../../lib/seo'

const description =
  'Browse original logo marks designed by the LogoOrbit in-house team across technology, healthcare, real estate, construction, finance and fitness. No templates, no stock marks, nothing resold.'

export default function LogoPortfolioPage({ sampleWork }) {
  const jsonLd = {
    '@graph': [
      collectionPageSchema({ path: '/portfolio/logo-design', name: 'LogoOrbit logo design portfolio', description }),
      {
        '@type': 'ImageGallery',
        '@id': `${site.url}/portfolio/logo-design#gallery`,
        name: 'Client logo portfolio',
        description: `${portfolioLogos.length} original logo marks designed for real businesses.`,
        url: `${site.url}/portfolio/logo-design`,
        author: { '@id': ORG_ID },
        associatedMedia: sampleWork.map((item) => ({
          '@type': 'ImageObject',
          contentUrl: `${site.url}/portfolio/${item.slug}.webp`,
          name: item.name || `${item.category} logo concept`,
          caption: item.name ? `${item.name} logo design` : `${item.category} logo concept`,
          creditText: site.name,
          creator: { '@id': ORG_ID },
          width: 520,
          height: 520,
          encodingFormat: 'image/webp',
        })),
      },
      breadcrumb([
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Logo design', href: '/portfolio/logo-design' },
      ]),
    ],
  }

  return (
    <Layout
      title="Logo Design Portfolio"
      description={description}
      path="/portfolio/logo-design"
      jsonLd={jsonLd}
    >
      <PageHero
        eyebrow="Logo design portfolio"
        title="Every mark here was"
        highlight="drawn from scratch"
        intro={`${portfolioLogos.length} logos, all original, all designed in-house. Filter by industry to see how we adapt to different markets.`}
        trail={[
          { name: 'Portfolio', href: '/portfolio' },
          { name: 'Logo design' },
        ]}
      />

      <TrustBar />
      <Portfolio showHeading={false} initial={6} step={12} />
      <Testimonials />
      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: {
      sampleWork: portfolioLogos.slice(0, 24).map(({ slug, name, category }) => ({
        slug,
        name: name ?? null,
        category,
      })),
    },
  }
}
