import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import Portfolio from '../components/Portfolio'
import AnimationReel from '../components/AnimationReel'
import WebsitePortfolio from '../components/WebsitePortfolio'
import Testimonials from '../components/Testimonials'
import LinkGrid from '../components/LinkGrid'
import CTA from '../components/CTA'
import { Icons } from '../components/Icons'
import { site } from '../lib/site'
import { portfolioLogos } from '../lib/portfolio'
import { websites } from '../lib/websites'
import { industryPages } from '../lib/industries'
import { breadcrumb, collectionPageSchema, ORG_ID } from '../lib/seo'

const description =
  'Browse original logo marks designed by the LogoOrbit in-house team across technology, healthcare, real estate, construction, finance and fitness, plus live websites we designed and built and animated logo concepts.'

export default function PortfolioPage({ sectors, sampleWork }) {
  const jsonLd = {
    '@graph': [
      collectionPageSchema({ path: '/portfolio', name: 'LogoOrbit portfolio', description }),
      {
        '@type': 'ImageGallery',
        '@id': `${site.url}/portfolio#gallery`,
        name: 'Client logo portfolio',
        description: `${portfolioLogos.length} original logo marks designed for real businesses.`,
        url: `${site.url}/portfolio`,
        author: { '@id': ORG_ID },
        // A representative sample rather than all 150-odd: enough for a crawler
        // to understand what the gallery holds without a wall of JSON.
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
      breadcrumb([{ name: 'Portfolio', href: '/portfolio' }]),
    ],
  }

  return (
    <Layout title="Portfolio" description={description} path="/portfolio" jsonLd={jsonLd}>
      <PageHero
        eyebrow="Portfolio"
        title="Every mark here was"
        highlight="drawn from scratch"
        intro={`${portfolioLogos.length} logos and ${websites.length} live websites. No templates, no stock marks, nothing resold. Filter by industry to see how we adapt to different markets, then scroll on for the animated work.`}
      >
        <div className="mt-7 sm:mt-9 flex justify-center">
          <a
            href="#logo-animation"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
          >
            <Icons.play className="h-4.5 w-4.5" />
            Jump to the animated logos
          </a>
        </div>
      </PageHero>

      <TrustBar />
      <Portfolio showHeading={false} initial={32} step={48} />
      <WebsitePortfolio />
      <AnimationReel />
      <Testimonials />

      <LinkGrid
        eyebrow="By sector"
        title="See the work for your industry"
        body="Each sector page shows the matching client work alongside the constraints that shaped it."
        items={sectors}
        compact
        tone="muted"
      />

      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: {
      sectors: industryPages.map((i) => ({ name: i.name, href: `/industries/${i.slug}` })),
      sampleWork: portfolioLogos.slice(0, 24).map(({ slug, name, category }) => ({
        slug,
        name: name ?? null,
        category,
      })),
    },
  }
}
