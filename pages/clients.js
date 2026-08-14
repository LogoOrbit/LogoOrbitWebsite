import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { CertificateSeal } from '../components/CertificateInstrument'
import { issuedCertificates, isConfigured, readSession } from '../lib/clientPortal'
import { legalCounsel } from '../lib/site'

/**
 * The client portal.
 *
 * Signed-in staff see every issued certificate and can open the PDF. The list
 * and the files are both server-side: the session lives in an HttpOnly cookie,
 * so nothing here can read it from JavaScript, and the page is rendered per
 * request rather than statically so a signed-out visitor never receives the
 * list at all. The PDFs are streamed by /api/clients/[id] from outside
 * `public/` - see lib/clientPortal.js for why they are not simply files on the
 * site.
 */
export default function Clients({ configured, signedIn, certificates }) {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function signIn(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/clients/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Sign-in failed.')
        setBusy(false)
        return
      }
      // The cookie is set; re-run getServerSideProps rather than tracking auth
      // state on the client, which cannot see an HttpOnly cookie anyway.
      router.replace(router.asPath)
    } catch {
      setError('Could not reach the server. Please try again.')
      setBusy(false)
    }
  }

  async function signOut() {
    await fetch('/api/clients/login', { method: 'DELETE' })
    router.replace(router.asPath)
  }

  return (
    <Layout
      title="Client Portal"
      description="Sign in to access issued LogoOrbit client documents."
      path="/clients"
      noIndex
    >
      <section className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <div className="flex items-center gap-4">
          <CertificateSeal className="h-14 w-14 shrink-0" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
              LogoOrbit · Legal Compliance Department
            </p>
            <h1 className="mt-1 text-3xl font-bold text-ink-900 sm:text-4xl">Client Portal</h1>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-ink-700">
          Issued copyright assignment certificates and other executed client documents. These files carry clients&rsquo;
          legal names and postal addresses, so they are not published anywhere on this site and are not linked from it.
          Do not forward a certificate to anyone other than the client it names.
        </p>

        {!configured && (
          <div className="mt-10 rounded-xl border border-action-300 bg-action-50/60 p-6">
            <p className="font-bold text-ink-900">The portal is not configured on this deployment.</p>
            <p className="mt-2 text-sm text-ink-700">
              The committed password digest in{' '}
              <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">lib/clientPortal.js</code> is missing,
              and no <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">CLIENT_PORTAL_PASSWORD</code> is
              set in the environment. Restore one of the two and redeploy. The door stays shut rather than falling open
              on a default.
            </p>
          </div>
        )}

        {configured && !signedIn && (
          <form onSubmit={signIn} className="mt-10 max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="block text-sm font-bold text-ink-900" htmlFor="portal-user">
              Login
            </label>
            <input
              id="portal-user"
              name="username"
              autoComplete="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-ink-900 outline-none focus:border-brand-500"
              required
            />

            <label className="mt-4 block text-sm font-bold text-ink-900" htmlFor="portal-password">
              Password
            </label>
            <input
              id="portal-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-ink-900 outline-none focus:border-brand-500"
              required
            />

            {error && (
              <p role="alert" className="mt-4 text-sm font-semibold text-action-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-6 w-full rounded-lg bg-brand-600 px-4 py-2.5 font-bold text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        )}

        {configured && signedIn && (
          <>
            <div className="mt-10 flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-bold text-ink-900">
                Issued certificates
                <span className="ml-2 text-sm font-normal text-ink-500">({certificates.length})</span>
              </h2>
              <button onClick={signOut} className="text-sm font-bold text-brand-700 underline">
                Sign out
              </button>
            </div>

            <ul className="mt-5 space-y-4">
              {certificates.map((cert) => (
                <li key={cert.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-ink-900">{cert.business}</p>
                      <p className="text-sm text-ink-700">{cert.client}</p>
                      <p className="mt-2 text-sm text-ink-500">{cert.document}</p>
                      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-500">
                        {cert.certificateId} · issued {cert.issued}
                      </p>
                    </div>
                    <a
                      href={`/api/clients/${cert.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-700"
                    >
                      Open PDF
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink-500">
              Something wrong on a certificate? It is a signed instrument, so corrections go through the legal desk at{' '}
              <a className="font-bold text-brand-700 underline" href={`mailto:${legalCounsel.email}`}>
                {legalCounsel.email}
              </a>
              , not by re-issuing quietly.
            </p>
          </>
        )}
      </section>
    </Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // A portal page in a CDN cache is a portal page served to the next visitor.
  res.setHeader('Cache-Control', 'no-store, max-age=0')

  const configured = isConfigured()
  const signedIn = configured && readSession(req)

  return {
    props: {
      configured,
      signedIn,
      // The registry never leaves the server unless the request is signed in.
      certificates: signedIn ? issuedCertificates.map(({ file, ...rest }) => rest) : [],
    },
  }
}
