import { sitemapXml } from '../lib/routes'

/**
 * Served from a page rather than /public so it can never fall out of step with
 * the routes. There is no component to render: getServerSideProps writes the
 * XML straight to the response.
 */
export default function Sitemap() {
  return null
}

export function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800')
  res.write(sitemapXml())
  res.end()

  return { props: {} }
}
