import Link from 'next/link'
import Layout from '../components/Layout'

export default function NotFound() {
  return (
    <Layout title="Page Not Found" description="The page you requested could not be found." path="/404" noIndex>
      <section className="mesh-bg min-h-[70vh] px-6 py-28 text-center text-white">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-orbit-300">404 · Page not found</p>
        <h1 className="mt-5 text-4xl font-bold text-white sm:text-6xl">This page left orbit.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">The link may be outdated, or the page may have moved.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-action px-7 py-4">Back to home</Link>
          <Link href="/contact" className="glass rounded-full px-7 py-4 font-semibold text-white">Contact us</Link>
        </div>
      </section>
    </Layout>
  )
}
