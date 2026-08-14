/**
 * Client portal sign-in and sign-out.
 *
 * POST { user, password } -> sets the session cookie.
 * DELETE                  -> clears it.
 *
 * Credentials come from the environment; see lib/clientPortal.js for why they
 * are not in the repository.
 */

import { clientIp, isRateLimited } from '../../../lib/ratelimit'
import {
  SESSION_MAX_AGE,
  checkCredentials,
  isConfigured,
  issueToken,
  sessionCookie,
} from '../../../lib/clientPortal'

export const config = { api: { bodyParser: { sizeLimit: '8kb' } } }

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', sessionCookie('', 0))
    return res.status(200).json({ ok: true })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, DELETE')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!isConfigured()) {
    return res.status(503).json({
      error: 'The client portal is not configured on this deployment.',
    })
  }

  // Five tries per 10-minute window per address. This is the same courtesy
  // brake the contact forms use and it is per-instance, so treat it as friction
  // against casual guessing rather than as the thing standing between a
  // stranger and the files. The credential's own strength is that thing.
  if (isRateLimited(`portal:${clientIp(req)}`)) {
    return res.status(429).json({ error: 'Too many attempts. Try again in a few minutes.' })
  }

  const { user, password } = req.body || {}

  if (!checkCredentials(user, password)) {
    // One message for both halves: saying which was wrong confirms a valid
    // username to anyone guessing.
    return res.status(401).json({ error: 'Those details were not recognised.' })
  }

  res.setHeader('Set-Cookie', sessionCookie(issueToken(), SESSION_MAX_AGE))
  return res.status(200).json({ ok: true })
}
