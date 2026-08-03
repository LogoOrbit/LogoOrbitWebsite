import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import PolicyPage from '../components/PolicyPage'
import LegalCounsel from '../components/LegalCounsel'
import CTA from '../components/CTA'
import { site } from '../lib/site'
import { privacySections, privacySummary, legalUpdated } from '../lib/legal'

export default function PrivacyPage() {
  return (
    <Layout
      title="Privacy Policy"
      description="What LogoOrbit collects, why we collect it, who else ever sees it and how to ask us to correct or delete it. No selling of data, no card numbers on our servers."
      path="/privacy"
      jsonLd={{
        '@type': 'WebPage',
        name: 'Privacy Policy',
        url: `${site.url}/privacy`,
        dateModified: '2026-08-01',
        publisher: { '@id': `${site.url}/#organization` },
      }}
    >
      <PageHero
        eyebrow="Privacy Policy"
        breadcrumb="Privacy"
        title="Your details,"
        highlight="and what we do with them"
        intro="We collect what we need to design your work and invoice you for it. We do not sell it, we do not rent it out, and you can ask for it back or ask us to delete it at any time."
      >
        <p className="mt-7 text-sm text-white/60">Last updated {legalUpdated}</p>
      </PageHero>

      <PolicyPage
        summaryTitle="The whole policy, in four lines"
        summary={privacySummary}
        sections={privacySections}
        updated={legalUpdated}
      />

      <LegalCounsel compact />
      <CTA />
    </Layout>
  )
}
