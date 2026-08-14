import crypto from 'crypto'

/**
 * The client portal behind /clients.
 *
 * What sits behind this door is the reason it is written the way it is. An
 * issued copyright certificate carries the client's legal name and their real
 * postal address, and for an individual assignee that is a home address. The
 * files therefore live in `clients/` at the repo root rather than in `public/`,
 * because everything in `public/` is served at the site root with no auth and a
 * URL that is guessable from the client's own name. Nothing here ever moves a
 * file into `public/`; the portal reads from disk and streams the bytes.
 *
 * ─── Why the password is not in this file ───────────────────────────────────
 *
 * It is read from the environment, and if the environment does not carry one
 * the portal refuses to open at all rather than falling back to a default. A
 * credential committed to a repository is readable by everyone with access to
 * the repository, survives in history after it is "changed", and travels to
 * every clone and fork - and this one would unlock other people's home
 * addresses. Two variables on the host is a smaller cost than that.
 *
 *   CLIENT_PORTAL_USER      - the login name (defaults to `logoorbitclients`)
 *   CLIENT_PORTAL_PASSWORD  - required; no default, no fallback
 *   CLIENT_PORTAL_SECRET    - optional; signs the session cookie
 *
 * If CLIENT_PORTAL_SECRET is unset the signing key is derived from the
 * password, which means changing the password invalidates every live session.
 * That is the behaviour you want from a shared credential anyway.
 */

const DEFAULT_USER = 'logoorbitclients'

/** Eight hours: a working day, then sign in again. */
export const SESSION_MAX_AGE = 8 * 60 * 60

export const SESSION_COOKIE = 'lo_portal'

export function portalUser() {
  return process.env.CLIENT_PORTAL_USER || DEFAULT_USER
}

/**
 * Whether the portal has been given a password to check against.
 *
 * Every entry point calls this first and answers 503 when it is false, so an
 * unconfigured deployment is a closed door rather than an open one.
 */
export function isConfigured() {
  return Boolean(process.env.CLIENT_PORTAL_PASSWORD)
}

function signingKey() {
  const explicit = process.env.CLIENT_PORTAL_SECRET
  if (explicit) return explicit
  return crypto
    .createHash('sha256')
    .update(`lo-portal-v1:${process.env.CLIENT_PORTAL_PASSWORD || ''}`)
    .digest('hex')
}

/**
 * Constant-time string comparison.
 *
 * `===` on a secret leaks its length and its matching prefix through how long
 * the comparison takes. The lengths are hashed to a fixed width first because
 * timingSafeEqual throws on a length mismatch, and throwing on the wrong length
 * is itself the leak.
 */
function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest()
  const hb = crypto.createHash('sha256').update(String(b)).digest()
  return crypto.timingSafeEqual(ha, hb)
}

export function checkCredentials(user, password) {
  if (!isConfigured()) return false
  // Both halves are always evaluated: `&&` would skip the password compare
  // whenever the username was wrong, which tells an attacker which half failed.
  const userOk = safeEqual(user || '', portalUser())
  const passOk = safeEqual(password || '', process.env.CLIENT_PORTAL_PASSWORD)
  return userOk && passOk
}

/** `<issued-at>.<hmac>` - stateless, so it survives serverless cold starts. */
export function issueToken(now = Date.now()) {
  const issued = String(now)
  const mac = crypto.createHmac('sha256', signingKey()).update(issued).digest('hex')
  return `${issued}.${mac}`
}

export function verifyToken(token) {
  if (!isConfigured() || typeof token !== 'string') return false
  const [issued, mac] = token.split('.')
  if (!issued || !mac) return false

  const expected = crypto.createHmac('sha256', signingKey()).update(issued).digest('hex')
  if (!safeEqual(mac, expected)) return false

  const age = (Date.now() - Number(issued)) / 1000
  return Number.isFinite(age) && age >= 0 && age < SESSION_MAX_AGE
}

export function sessionCookie(value, maxAge) {
  const parts = [
    `${SESSION_COOKIE}=${value}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${maxAge}`,
  ]
  // Set-Cookie; Secure over plain http is silently dropped by the browser,
  // which would break `next dev` on localhost.
  if (process.env.NODE_ENV === 'production') parts.push('Secure')
  return parts.join('; ')
}

export function readSession(req) {
  const raw = req.headers.cookie || ''
  const match = raw.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${SESSION_COOKIE}=`))
  if (!match) return false
  return verifyToken(match.slice(SESSION_COOKIE.length + 1))
}

/**
 * The issued certificates, listed rather than discovered.
 *
 * Reading the directory at request time would mean the portal serves whatever
 * happens to be on disk, so a stray file dropped into `clients/` while
 * debugging becomes downloadable. An explicit list is one line per issued
 * document and cannot leak something nobody meant to publish.
 *
 * `file` is resolved against `clients/` and is never taken from the request -
 * see pages/api/clients/[id].js.
 */
export const issuedCertificates = [
  {
    id: 'revelation-ministries',
    client: 'Elder Rodney Wilson',
    business: 'Revelation Ministries',
    document: 'Copyright Assignment & Commercial Use Certificate',
    certificateId: 'LO-CR-2026-0184',
    issued: '14 August 2026',
    file: 'revelation-ministries/revelation-ministries-copyright-assignment-certificate.pdf',
  },
]

export function findCertificate(id) {
  return issuedCertificates.find((entry) => entry.id === id) || null
}
