import fs from 'fs'
import path from 'path'

import { findCertificate, isConfigured, readSession } from '../../../lib/clientPortal'

/**
 * Streams an issued certificate to a signed-in visitor.
 *
 * The `id` in the URL selects a row from the registry in lib/clientPortal.js;
 * it is never joined onto a path. That is the whole defence against traversal:
 * a request for `../../.env` finds no row and gets a 404, because the only
 * strings this route ever hands to the filesystem are the ones written into
 * that registry by hand. The realpath check below is a second lock on the same
 * door, in case a registry entry is ever mistyped.
 */

const ROOT = path.join(process.cwd(), 'clients')

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')
  // Belt and braces with the noindex header in next.config.js: a certificate
  // that reaches an index has already lost.
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive')

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!isConfigured()) {
    return res.status(503).json({ error: 'The client portal is not configured.' })
  }

  if (!readSession(req)) {
    return res.status(401).json({ error: 'Not signed in.' })
  }

  const entry = findCertificate(req.query.id)
  if (!entry) return res.status(404).json({ error: 'No such certificate.' })

  const target = path.resolve(ROOT, entry.file)
  if (target !== path.normalize(target) || !target.startsWith(ROOT + path.sep)) {
    return res.status(404).json({ error: 'No such certificate.' })
  }
  if (!fs.existsSync(target)) {
    return res.status(404).json({ error: 'That certificate is not on this deployment.' })
  }

  const file = fs.readFileSync(target)
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Length', file.length)
  res.setHeader('Content-Disposition', `inline; filename="${path.basename(entry.file)}"`)
  return res.status(200).send(file)
}
