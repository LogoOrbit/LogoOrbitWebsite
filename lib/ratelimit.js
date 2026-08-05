/**
 * The rate limiter shared by every form endpoint.
 *
 * All three API routes had grown their own copy of this, and all three copies
 * had the same two faults.
 *
 * The first was a leak. The Map was only ever written to: an address that
 * submitted once and never returned kept its entry for the life of the server
 * process, so a long-running instance accumulated one entry per visitor
 * forever. Expired entries are now dropped as they are found, and a sweep runs
 * once the Map has grown past a threshold so addresses that never come back
 * are collected too.
 *
 * The second was that a blocked caller still had its attempt recorded, which
 * pushed the window forward on every rejected try. Anything hammering the
 * endpoint therefore extended its own block indefinitely — but so did an
 * office or a phone network sharing one address, and they were the ones who
 * would give up. A rejected attempt is no longer counted, so the window always
 * drains.
 *
 * This is per-instance and deliberately so: it is a courtesy brake on
 * accidental double-submits and casual scripted noise, not a security control.
 * A serverless deployment runs several instances and each keeps its own count.
 */

const WINDOW_MS = 10 * 60 * 1000

/** Sweep once the Map is this big rather than on every request. */
const SWEEP_AT = 5000

const hits = new Map()

function sweep(now) {
  for (const [key, times] of hits) {
    const live = times.filter((time) => now - time < WINDOW_MS)
    if (live.length) hits.set(key, live)
    else hits.delete(key)
  }
}

/**
 * Records an attempt and says whether it should be refused.
 *
 * `key` must identify the caller *and* the endpoint. The three routes used to
 * hold a Map each and so had a budget each; sharing one store without
 * namespacing would silently pool them, and somebody who had asked the contact
 * form five questions would find they could no longer place an order. Callers
 * pass `contact:<ip>` rather than `<ip>` for that reason.
 *
 * `limit` is the number of submissions allowed inside the ten-minute window.
 */
export function isRateLimited(key, limit = 5) {
  const now = Date.now()

  if (hits.size > SWEEP_AT) sweep(now)

  const recent = (hits.get(key) || []).filter((time) => now - time < WINDOW_MS)

  if (recent.length >= limit) {
    // Kept, but not extended: the window has to be allowed to drain.
    hits.set(key, recent)
    return true
  }

  recent.push(now)
  hits.set(key, recent)
  return false
}

/**
 * The caller's address, as far as we can tell behind a proxy.
 *
 * x-forwarded-for is a client-supplied header and can be anything, so this is
 * only ever a best-effort grouping key — see the note above about what this
 * limiter is and is not for.
 */
export function clientIp(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '')
    .split(',')[0]
    .trim()

  return (forwarded || req.socket?.remoteAddress || 'unknown').slice(0, 64)
}
