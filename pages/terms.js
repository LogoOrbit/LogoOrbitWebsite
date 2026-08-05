import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import PolicyPage from '../components/PolicyPage'
import LegalCounsel from '../components/LegalCounsel'
import CTA from '../components/CTA'
import { site } from '../lib/site'
import { termsSections, termsSummary, legalUpdated } from '../lib/legal'

export default function TermsPage() {
  return (
    <Layout
      title="Terms & Conditions"
      description="The terms you agree to when you order design work from LogoOrbit: revisions, delivery, copyright ownership, trademark filings and billing, in plain English."
      path="/terms"
      jsonLd={{
        '@type': 'WebPage',
        name: 'Terms & Conditions',
        url: `${site.url}/terms`,
        dateModified: '2026-08-01',
        publisher: { '@id': `${site.url}/#organization` },
      }}
    >
      <PageHero
        eyebrow="Terms & Conditions"
        breadcrumb="Terms"
        title="The rules of the road,"
        highlight="in plain English"
        intro="No wall of capital letters and no clauses designed to be skipped. This is what we owe you, what you owe us, and who owns what at the end of it."
      >
        <p className="mt-7 text-sm text-white/60">Last updated {legalUpdated}</p>
      </PageHero>

      <PolicyPage
        summaryTitle="If you read nothing else on this page"
        summary={termsSummary}
        sections={termsSections}
        updated={legalUpdated}
      />

      <LegalCounsel compact />
      <CTA />
    </Layout>
  )
}
