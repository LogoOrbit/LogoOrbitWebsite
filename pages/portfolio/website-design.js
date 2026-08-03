import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TrustBar from '../../components/TrustBar'
import WebsitePortfolio from '../../components/WebsitePortfolio'
import Testimonials from '../../components/Testimonials'
import CTA from '../../components/CTA'
import { websites } from '../../lib/websites'
import { breadcrumb, collectionPageSchema } from '../../lib/seo'

const description =
  'Live websites designed and built by the LogoOrbit team. Every site here is live right now, no mockups or templates.'

export default function WebsitePortfolioPage() {
  const jsonLd = {
    '@graph': [
      collectionPageSchema({
        path: '/portfolio/website-design',
        name: 'LogoOrbit website design portfolio',
        description,
      }),
      breadcrumb([
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Website design', href: '/portfolio/website-design' },
      ]),
    ],
  }

  return (
    <Layout
      title="Website Design Portfolio"
      description={description}
      path="/portfolio/website-design"
      jsonLd={jsonLd}
    >
      <PageHero
        eyebrow="Website design portfolio"
        title="Sites we designed,"
        highlight="built and launched"
        intro={`${websites.length} live websites. Tap a card to open it in a new tab and judge it yourself.`}
        trail={[
          { name: 'Portfolio', href: '/portfolio' },
          { name: 'Website design' },
        ]}
      />

      <TrustBar />
      <WebsitePortfolio showHeading={false} />
      <Testimonials />
      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  return { props: {} }
}
