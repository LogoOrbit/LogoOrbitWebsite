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
 * ─── The credential ─────────────────────────────────────────────────────────
 *
 *   CLIENT_PORTAL_USER      - login name (defaults to `logoorbitclients`)
 *   CLIENT_PORTAL_PASSWORD  - plaintext; wins when set
 *   CLIENT_PORTAL_SECRET    - optional; signs the session cookie
 *
 * With no environment set the portal falls back to PASSWORD_HASH below, so a
 * fresh deploy works without touching hosting config. The plaintext is not in
 * this repository and never was: what is committed is an scrypt digest, which
 * is the same arrangement /etc/shadow uses and for the same reason. Recovering
 * the password from it means an offline attack against a deliberately slow KDF
 * (~110ms per guess here), and the password itself stays out of the history -
 * which matters most because people reuse passwords somewhere that is not this
 * site.
 *
 * ─── What this door is actually for ─────────────────────────────────────────
 *
 * It stops the public internet, not a repository collaborator. The
 * certificates are committed in clients/, so anyone who can read this file can
 * already read the PDFs it guards - and that is precisely why the cookie
 * signing key may be derived from the committed digest without weakening
 * anything. Forging a session gets an attacker to documents they could have
 * opened with `git show`. Set CLIENT_PORTAL_SECRET (and ideally
 * CLIENT_PORTAL_PASSWORD) when that stops being true - when the certificates
 * move to storage the repository does not carry, or when someone gets repo
 * access who should not have client documents.
 */

const DEFAULT_USER = 'logoorbitclients'

/**
 * scrypt digest of the shared portal password, as `scrypt$N$r$p$salt$hash`.
 *
 * Replace by running, and commit the single line it prints:
 *   node tools/portal-password.mjs 'the new password'
 */
const PASSWORD_HASH =
  'scrypt$32768$8$1$5e6c76a7621073e9a71d4ccc27ffdc64$d4a59c6ee2b77359613a0bb4564932e1eceb499c0ca1ac38788bd77ba494589d'

/**
 * Verify a candidate against a `scrypt$N$r$p$salt$hash` digest.
 *
 * maxmem is raised explicitly: N=32768 with r=8 needs ~32MB, which is exactly
 * Node's default ceiling, and scryptSync throws rather than degrading when it
 * is hit.
 */
function matchesHash(candidate, digest) {
  const parts = String(digest).split('$')
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false
  const [, n, r, p, salt, expected] = parts
  const want = Buffer.from(expected, 'hex')
  let got
  try {
    got = crypto.scryptSync(String(candidate), Buffer.from(salt, 'hex'), want.length, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
      maxmem: 128 * 1024 * 1024,
    })
  } catch {
    return false
  }
  return crypto.timingSafeEqual(got, want)
}

/** Eight hours: a working day, then sign in again. */
export const SESSION_MAX_AGE = 8 * 60 * 60

export const SESSION_COOKIE = 'lo_portal'

export function portalUser() {
  return process.env.CLIENT_PORTAL_USER || DEFAULT_USER
}

/**
 * Whether the portal has anything to check a password against.
 *
 * Every entry point calls this first and answers 503 when it is false, so a
 * deployment with both the env var and the committed digest removed is a
 * closed door rather than an open one.
 */
export function isConfigured() {
  return Boolean(process.env.CLIENT_PORTAL_PASSWORD || PASSWORD_HASH)
}

function signingKey() {
  const explicit = process.env.CLIENT_PORTAL_SECRET
  if (explicit) return explicit
  // Derived from whichever credential is in force, so rotating either signs
  // every live session out - the behaviour you want from a shared login.
  return crypto
    .createHash('sha256')
    .update(`lo-portal-v1:${process.env.CLIENT_PORTAL_PASSWORD || PASSWORD_HASH}`)
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

  // Both halves are always evaluated: `&&` would skip the password check
  // whenever the username was wrong, and the request finishing early is itself
  // the answer to "is this a real username?".
  const userOk = safeEqual(user || '', portalUser())

  const override = process.env.CLIENT_PORTAL_PASSWORD
  const passOk = override
    ? safeEqual(password || '', override)
    : matchesHash(password || '', PASSWORD_HASH)

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
