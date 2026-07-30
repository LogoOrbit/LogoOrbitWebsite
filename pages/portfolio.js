import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

export default function PortfolioPage() {
  return (
    <Layout
      title="Portfolio"
      description="Browse original logo marks designed by the LogoOrbit in-house team across technology, healthcare, real estate, finance, fitness and more."
      path="/portfolio"
    >
      <PageHero
        eyebrow="Portfolio"
        title="Every mark here was"
        highlight="drawn from scratch"
        intro="No templates, no stock marks, nothing resold. Filter by industry to see how we adapt to different markets."
      />

      <Portfolio showHeading={false} />
      <Testimonials />
      <CTA />
    </Layout>
  )
}
