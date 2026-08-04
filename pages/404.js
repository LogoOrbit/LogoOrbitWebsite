import Link from 'next/link'
import Layout from '../components/Layout'

export default function NotFound() {
  return (
    <Layout title="Page Not Found" description="The page you requested could not be found." path="/404" noIndex>
      {/* Pulled up under the transparent header the same way Hero and PageHero
          do it. Without the overlap the header keeps its white-text state over
          a white page background and the wordmark disappears. */}
      <section className="relative -mt-18 pt-18 overflow-hidden mesh-bg text-white">
        <div className="relative mx-auto min-h-[70vh] max-w-7xl px-6 py-24 text-center sm:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-orbit-300">404 · Page not found</p>
          <h1 className="mt-5 text-4xl font-bold text-white sm:text-6xl">This page left orbit.</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
            The link may be outdated, or the page may have moved. Search for what you were after:
          </p>

          <form
            action="/search"
            method="get"
            className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/20 focus-within:ring-white/40"
          >
            <label htmlFor="notfound-search" className="sr-only">Search the site</label>
            <input
              id="notfound-search"
              name="q"
              type="text"
              inputMode="search"
              autoComplete="off"
              placeholder="Search services, pricing, guides…"
              className="h-11 flex-1 bg-transparent px-4 text-[15px] text-white placeholder:text-white/50 focus:outline-none"
            />
            <button type="submit" className="btn-action shrink-0 px-6 py-3 text-[15px]">Search</button>
          </form>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="glass rounded-full px-7 py-4 font-semibold text-white">Back to home</Link>
            <Link href="/contact" className="glass rounded-full px-7 py-4 font-semibold text-white">Contact us</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
