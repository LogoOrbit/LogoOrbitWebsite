import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import Contact from '../components/Contact'
import FAQ from '../components/FAQ'
import LegalCounsel from '../components/LegalCounsel'
import { Icons } from '../components/Icons'
import { site, whatsapp, whatsappLink } from '../lib/site'

export default function ContactPage() {
  return (
    <Layout
      title="Contact Us"
      description={`Talk to the LogoOrbit design team. Call ${site.phone}, message ${whatsapp.display} on WhatsApp, email ${site.email}, or send a brief for a free consultation and fixed quote.`}
      path="/contact"
    >
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're"
        highlight="building"
        intro="Send a brief and we'll come back with a plan, a timeline and a fixed price, usually within one business day."
      >
        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3.5">
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink-900 shadow-xl shadow-black/25 hover:-translate-y-0.5 transition-all"
          >
            {site.phone}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-7 py-4 font-semibold text-white shadow-xl shadow-[#128c4a]/40 hover:-translate-y-0.5 transition-all"
          >
            <Icons.whatsapp className="w-5 h-5" />
            WhatsApp {whatsapp.display}
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
      <LegalCounsel compact />
      <FAQ />
    </Layout>
  )
}
