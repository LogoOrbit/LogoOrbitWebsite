import Link from 'next/link'
import Layout from '../components/Layout'
import BrandProtectionBand from '../components/BrandProtectionBand'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import About from '../components/About'
import MissionVision from '../components/MissionVision'
import WhyUs from '../components/WhyUs'
import Stats from '../components/Stats'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Reveal from '../components/Reveal'
import LinkGrid from '../components/LinkGrid'
import CTA from '../components/CTA'
import { Icons } from '../components/Icons'
import { site, process as processSteps } from '../lib/site'
import { industryPages } from '../lib/industries'
import { locationPages } from '../lib/locations'
import { ORG_ID, SITE_ID, absolute, breadcrumb, howToSchema } from '../lib/seo'

export default function AboutPage({ sectors, cities }) {
  const description = `LogoOrbit has spent ${site.years}+ years building brand identities for startups, SMEs and multinational ventures, with an in-house design team, original work and project-specific written ownership documents.`

  const jsonLd = {
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${absolute('/about')}#about`,
        url: absolute('/about'),
        name: 'About LogoOrbit',
        description,
        isPartOf: { '@id': SITE_ID },
        mainEntity: { '@id': ORG_ID },
      },
      howToSchema({
        path: '/about',
        name: 'How a LogoOrbit project works',
        description: 'The four steps every design project goes through, from first brief to final handover.',
        steps: processSteps.map((s) => ({ title: s.title, body: s.body })),
      }),
      breadcrumb([{ name: 'About', href: '/about' }]),
    ],
  }

  return (
    <Layout title="About Us & Our Story" description={description} path="/about" jsonLd={jsonLd}>
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
      <MissionVision />
      <WhyUs />
      <Process />
      <Testimonials />

      {/* Pointers to the pages people go looking for next */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 grid md:grid-cols-3 gap-5">
          {[
            {
              href: '/reviews',
              icon: 'quote',
              title: 'What clients say',
              body: `${site.reviewCount.toLocaleString()} reviews, and the four things they keep mentioning.`,
            },
            {
              href: '/faqs',
              icon: 'spark',
              title: 'Questions, answered',
              body: 'Turnaround, revisions, file formats, ownership and pricing, all in one place.',
            },
            {
              href: '/legal',
              icon: 'scales',
              title: 'Legal & compliance',
              body: 'Copyright, trademarks and data, handled by a named lawyer rather than an inbox.',
            },
          ].map((card, i) => {
            const Icon = Icons[card.icon]
            return (
              <Reveal key={card.href} delay={i * 90}>
                <Link
                  href={card.href}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl"
                >
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">{card.title}</h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-500">{card.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-600">
                    Take a look
                    <Icons.arrow className="w-4.5 h-4.5" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <LinkGrid
        eyebrow="Who we work with"
        title="Sectors we have branded"
        items={sectors}
        compact
        tone="muted"
      />

      <LinkGrid eyebrow="Where" title="Markets we serve" items={cities} compact tone="light" />

      <BrandProtectionBand />

      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: {
      sectors: industryPages.map((i) => ({ name: i.name, href: `/industries/${i.slug}` })),
      cities: locationPages.map((l) => ({ name: `${l.city}, ${l.country}`, href: `/locations/${l.slug}` })),
    },
  }
}
