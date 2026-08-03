import { getSearchIndex } from '../../lib/searchIndex'

/**
 * The whole site, flattened for client-side search. Computed once per
 * server instance (the source data only changes at deploy time) and cached
 * at the edge, so after the first request this never recomputes.
 */
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800')
  res.status(200).json(getSearchIndex())
}
