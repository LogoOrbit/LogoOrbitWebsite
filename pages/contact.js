import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import Contact from '../components/Contact'
import FAQ from '../components/FAQ'
import { site } from '../lib/site'

export default function ContactPage() {
  return (
    <Layout
      title="Contact Us"
      description={`Talk to the LogoOrbit design team. Call ${site.phone}, email ${site.email}, or send a brief for a free consultation and fixed quote.`}
      path="/contact"
    >
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're"
        highlight="building"
        intro="Send a brief and we'll come back with a plan, a timeline and a fixed price — usually within one business day."
      >
        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3.5">
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink-900 shadow-xl shadow-black/25 hover:-translate-y-0.5 transition-all"
          >
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
          >
            {site.email}
          </a>
        </div>
      </PageHero>

      <TrustBar />
      <Contact showIntro={false} />
      <FAQ />
    </Layout>
  )
}
