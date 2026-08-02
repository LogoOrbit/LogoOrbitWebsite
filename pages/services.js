import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import Services from '../components/Services'
import VideoServices from '../components/VideoServices'
import Process from '../components/Process'
import Guarantees from '../components/Guarantees'
import Reveal from '../components/Reveal'
import CTA from '../components/CTA'
import { Icons } from '../components/Icons'
import { site, serviceNav, services } from '../lib/site'

/**
 * The hub the Services menu points at.
 *
 * Services was the one heading in the bar with no page behind it: on a phone
 * tapping it could only unfold a list, so there was nowhere to send anyone who
 * wanted to see the whole offer in one place. This is that page, built from the
 * same sections the home page uses so the two never drift apart.
 */
export default function ServicesPage() {
  const jsonLd = {
    '@type': 'ItemList',
    '@id': `${site.url}/services#list`,
    name: 'LogoOrbit services',
    itemListElement: services.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: service.name,
      url: `${site.url}${service.href}`,
    })),
  }

  return (
    <Layout
      title="Our Services"
      description="Logo design, websites, video and YouTube editing, animation, mobile apps, book publication and Amazon marketing, all from one in-house team."
      path="/services"
      jsonLd={jsonLd}
    >
      <PageHero
        eyebrow="Services"
        breadcrumb="Services"
        title="Everything we make,"
        highlight="on one page"
        intro="Six services and one team behind all of them. Start with a logo, or hand us the whole brand, the website and the channel that goes with it."
      />

      <TrustBar />

      {/* A plain list of the pages under this one, for anyone who arrived
          knowing exactly what they came for. */}
      <section className="pt-12 sm:pt-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Jump straight to</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {serviceNav
                .filter((s) => s.href !== '/services')
                .map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[14px] font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    {s.label}
                    <Icons.arrow className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Services />
      <VideoServices />
      <Process />
      <Guarantees />
      <CTA />
    </Layout>
  )
}
