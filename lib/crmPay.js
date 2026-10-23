/**
 * Invoice payments live in the LogoOrbit CRM; this site only shows them.
 *
 * Clients open https://logoorbit.net/pay/<token>. The page reads the invoice
 * from the CRM server-to-server and the Pay button asks the CRM for a Stripe
 * Checkout link. PAY_PROXY_SECRET lets the CRM rate-limit by the visitor's
 * IP rather than this server's.
 */

export const CRM_URL = (process.env.CRM_URL || 'https://crm.logoorbit.net').replace(/\/+$/, '')

const TOKEN_RE = /^[A-Za-z0-9_-]{20,128}$/

export function validToken(token) {
  return typeof token === 'string' && TOKEN_RE.test(token)
}

function proxyHeaders(ip) {
  const headers = { Accept: 'application/json' }
  if (process.env.PAY_PROXY_SECRET) {
    headers['x-lo-proxy-key'] = process.env.PAY_PROXY_SECRET
    if (ip) headers['x-lo-client-ip'] = ip
  }
  return headers
}

export async function fetchInvoice(token, ip) {
  if (!validToken(token)) return null
  const res = await fetch(`${CRM_URL}/api/pay/${encodeURIComponent(token)}`, {
    headers: proxyHeaders(ip),
    signal: AbortSignal.timeout(10000),
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`CRM responded ${res.status}`)
  const data = await res.json()
  return data.invoice || null
}

export async function startCheckout(token, ip) {
  const res = await fetch(`${CRM_URL}/api/pay/${encodeURIComponent(token)}`, {
    method: 'POST',
    headers: proxyHeaders(ip),
    signal: AbortSignal.timeout(15000),
  })
  const data = await res.json().catch(() => ({}))
  return { status: res.status, data }
}
