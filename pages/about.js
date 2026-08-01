import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import About from '../components/About'
import WhyUs from '../components/WhyUs'
import Stats from '../components/Stats'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import { site } from '../lib/site'

export default function AboutPage() {
  return (
    <Layout
      title="About Us & Our Story"
      description={`LogoOrbit has spent ${site.years}+ years building brand identities for startups, SMEs and multinational ventures, with an in-house design team and 100% original work.`}
      path="/about"
    >
      <PageHero
        eyebrow="Our Story"
        breadcrumb="About"
        title="Fifteen years of"
        highlight="brand-building craft"
        intro="LogoOrbit began with a simple conviction: a small business deserves the same calibre of design an agency reserves for its largest accounts."
      />

      <TrustBar />
      <About />
      <Stats />
      <WhyUs />
      <Process />
      <Testimonials />
      <CTA />
    </Layout>
  )
}
