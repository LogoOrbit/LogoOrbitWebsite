import CatalogService from '../../components/CatalogService'
import { catalogServices, serviceBySlug } from '../../lib/catalog'
import { guides } from '../../lib/guides'

export default function CatalogServicePage({ service, related, relatedGuides }) {
  return <CatalogService service={service} related={related} guides={relatedGuides} />
}

export function getStaticPaths() {
  return {
    paths: catalogServices.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const service = serviceBySlug[params.slug]

  // A guide earns a link from a service page by naming that service, which
  // keeps the relationship declared in one place instead of two.
  const relatedGuides = guides
    .filter((g) => g.relatedServices.includes(service.slug))
    .slice(0, 3)
    .map(({ slug, title, excerpt }) => ({ slug, title, excerpt }))

  return {
    props: {
      service,
      related: (service.related || []).filter((slug) => serviceBySlug[slug]),
      relatedGuides,
    },
  }
}
