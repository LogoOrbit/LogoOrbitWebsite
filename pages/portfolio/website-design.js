import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TrustBar from '../../components/TrustBar'
import WebsitePortfolio from '../../components/WebsitePortfolio'
import LinkGrid from '../../components/LinkGrid'
import Testimonials from '../../components/Testimonials'
import CTA from '../../components/CTA'
import { websites } from '../../lib/websites'
import { breadcrumb, collectionPageSchema } from '../../lib/seo'

const description =
  'Live websites designed and built by the LogoOrbit team. Every site here is live right now, no mockups or templates.'

export default function WebsitePortfolioPage({ allBuilds }) {
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

      {/* The card wall pages itself in with a button, so only the first
          twenty-four builds exist in the served HTML - the other three hundred
          were reachable by clicking and by nothing else. This is the plain
          index of all of them: cheap to render, and it means every case study
          has a route in that does not depend on JavaScript running. */}
      <LinkGrid
        eyebrow="Every build"
        title="All the sites, listed"
        body="The full set, including everything the wall above has not loaded yet. Each one opens its own page: the brief it answered, how it was built and what was handed over."
        items={allBuilds}
        tone="muted"
        compact
      />

      <Testimonials />
      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: {
      allBuilds: websites.map((w) => ({ name: w.name, href: `/portfolio/websites/${w.slug}` })),
    },
  }
}
