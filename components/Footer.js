import Link from 'next/link'
import { Icons } from './Icons'
import { site, services, legalLinks } from '../lib/site'

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About Us', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
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
              <span className="text-xl font-bold tracking-tight text-white">
                Logo<span className="text-orbit-400">Orbit</span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed">
              Custom logo design, websites, animation, apps and marketing — {site.years}+ years of building
              brands that get noticed.
            </p>

            <div className="mt-6 space-y-2.5 text-[15px]">
              <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Icons.phone className="w-4.5 h-4.5 text-orbit-400" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Icons.mail className="w-4.5 h-4.5 text-orbit-400" />
                {site.email}
              </a>
              <p className="flex items-center gap-2.5">
                <Icons.clock className="w-4.5 h-4.5 text-orbit-400" />
                {site.hours}
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className="inline-block py-1 hover:text-white transition-colors">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-1 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Offices</h3>
            <ul className="mt-5 space-y-4 text-[15px]">
              {site.addresses.map((address) => (
                <li key={address} className="flex gap-2.5">
                  <Icons.pin className="mt-0.5 w-4.5 h-4.5 shrink-0 text-orbit-400" />
                  <span>{address}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="inline-block py-1 hover:text-white transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-white/50">
            <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <p>{site.domain}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
