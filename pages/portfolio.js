import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import Portfolio from '../components/Portfolio'
import AnimationReel from '../components/AnimationReel'
import WebsitePortfolio from '../components/WebsitePortfolio'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import { Icons } from '../components/Icons'

export default function PortfolioPage() {
  return (
    <Layout
      title="Portfolio"
      description="Browse original logo marks designed by the LogoOrbit in-house team across technology, healthcare, real estate, finance and fitness, plus animated logo concepts showing the motion styles we build in."
      path="/portfolio"
    >
      <PageHero
        eyebrow="Portfolio"
        title="Every mark here was"
        highlight="drawn from scratch"
        intro="No templates, no stock marks, nothing resold. Filter by industry to see how we adapt to different markets, then scroll on for the animated work."
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
      <CTA />
    </Layout>
  )
}
