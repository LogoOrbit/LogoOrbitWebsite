import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icons } from './Icons'
import { nav, site } from '../lib/site'

function Wordmark({ light }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${site.name} home`}>
      <span className="relative grid place-items-center w-9 h-9">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-600 to-orbit-500" />
        <svg viewBox="0 0 32 32" className="relative w-6 h-6 text-white" aria-hidden="true">
          <circle cx="16" cy="16" r="4.4" fill="currentColor" />
          <ellipse
            cx="16" cy="16" rx="13" ry="6"
            transform="rotate(-30 16 16)"
            stroke="currentColor" strokeWidth="2" fill="none" opacity="0.85"
          />
        </svg>
      </span>
      <span className={`text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
        Logo<span className="text-orbit-400">Orbit</span>
      </span>
    </Link>
  )
}

function Dropdown({ item, light, active }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onAway = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onAway)
    return () => document.removeEventListener('mousedown', onAway)
  }, [])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[15px] font-medium transition-colors ${
          light
            ? `${active ? 'text-white bg-white/10' : 'text-white/85'} hover:text-white hover:bg-white/10`
            : `${active ? 'text-brand-600 bg-brand-50' : 'text-ink-700'} hover:text-brand-600 hover:bg-brand-50`
        }`}
      >
        {item.label}
        <svg
          viewBox="0 0 20 20"
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 7.5l5 5 5-5" />
        </svg>
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${
          open ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-1'
        }`}
      >
        <div className="w-60 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-ink-900/10">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              {child.label}
              <Icons.arrow className="w-4 h-4 opacity-35" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Nav() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close the drawer whenever navigation completes.
  useEffect(() => {
    const close = () => setOpen(false)
    router.events.on('routeChangeComplete', close)
    return () => router.events.off('routeChangeComplete', close)
  }, [router.events])

  const light = !solid
  const isActive = (href) => router.pathname === href
  const groupActive = (item) => item.children?.some((c) => isActive(c.href))

  return (
    <>
      <div className="hidden md:block bg-ink-900 text-white/80 text-[13px]">
        <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between">
          <p className="flex items-center gap-2">
            <Icons.spark className="w-4 h-4 text-flare-400" />
            Free design consultation — custom concepts back in under 24 hours.
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Icons.clock className="w-4 h-4" /> {site.hours}
            </span>
            <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          solid ? 'bg-white/90 backdrop-blur-lg shadow-[0_1px_24px_rgba(15,10,60,0.09)]' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between gap-4">
          <Wordmark light={light} />

          <nav className="hidden lg:flex items-center gap-0.5">
            {nav.map((item) =>
              item.children ? (
                <Dropdown key={item.label} item={item} light={light} active={groupActive(item)} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-[15px] font-medium transition-colors ${
                    light
                      ? `${isActive(item.href) ? 'text-white bg-white/10' : 'text-white/85'} hover:text-white hover:bg-white/10`
                      : `${isActive(item.href) ? 'text-brand-600 bg-brand-50' : 'text-ink-700'} hover:text-brand-600 hover:bg-brand-50`
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={site.phoneHref}
              className={`flex items-center gap-2 text-[15px] font-semibold transition-colors ${
                light ? 'text-white hover:text-flare-300' : 'text-ink-900 hover:text-brand-600'
              }`}
            >
              <Icons.phone className="w-4.5 h-4.5" />
              <span className="hidden xl:inline">{site.phone}</span>
              <span className="xl:hidden">Call Now</span>
            </a>
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-brand-600 to-orbit-500 px-5 py-2.5 text-[15px] font-semibold text-white shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/35 hover:-translate-y-0.5 transition-all"
            >
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`lg:hidden p-2 rounded-lg ${light ? 'text-white' : 'text-ink-900'}`}
          >
            <Icons.menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="sticky top-0 flex items-center justify-between bg-white px-6 h-20 border-b border-slate-100">
            <Wordmark light={false} />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-ink-500">
              <Icons.close className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col p-4">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                    aria-expanded={openGroup === item.label}
                    className="flex w-full items-center justify-between px-3 py-3.5 rounded-xl text-lg font-medium text-ink-700"
                  >
                    {item.label}
                    <Icons.plus
                      className={`w-5 h-5 opacity-40 transition-transform ${
                        openGroup === item.label ? 'rotate-45' : ''
                      }`}
                    />
                  </button>

                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: openGroup === item.label ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-3 border-l-2 border-slate-100 pl-3 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={`block px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
                              isActive(child.href)
                                ? 'text-brand-600 font-semibold bg-brand-50'
                                : 'text-ink-500 hover:text-brand-600'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-3 py-3.5 rounded-xl text-lg font-medium transition-colors ${
                    isActive(item.href) ? 'bg-brand-50 text-brand-600' : 'text-ink-700 hover:bg-brand-50'
                  }`}
                >
                  {item.label}
                  <Icons.arrow className="w-5 h-5 opacity-40" />
                </Link>
              )
            )}
          </nav>

          <div className="px-6 pb-10 mt-2 space-y-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block text-center rounded-full bg-gradient-to-r from-brand-600 to-orbit-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/25"
            >
              Get a Free Quote
            </Link>
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3.5 font-semibold text-ink-900"
            >
              <Icons.phone className="w-5 h-5" /> {site.phone}
            </a>
            <p className="text-center text-sm text-ink-500 pt-2">{site.hours}</p>
          </div>
        </div>
      </div>
    </>
  )
}
