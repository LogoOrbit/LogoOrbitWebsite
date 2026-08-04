import Link from 'next/link'
import { Icons } from './Icons'
import BrandMark from './BrandMark'
import { site, services, salesTeam, legalLinks, whatsapp, whatsappLink } from '../lib/site'

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'Search the site', href: '/search' },
  { label: 'All services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Where we work', href: '/locations' },
  { label: 'Guides', href: '/guides' },
  { label: 'Blog', href: '/blog' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Every package', href: '/pricing/packages' },
  { label: 'Your cart', href: '/cart' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Design Resources', href: '/resources' },
  { label: 'Design Glossary', href: '/glossary' },
  { label: 'Copyright Certificate', href: '/copyright-certificate' },
  { label: 'Trademark Filing', href: '/trademark-filing' },
]

/**
 * A flat row of the most-searched specialist pages.
 *
 * The catalogue is too large to list in a footer column, so this is the slice
 * with the most search demand behind it. Everything else is one click away
 * through /services.
 */
const popularServices = [
  { label: 'Brand identity', href: '/services/brand-identity-design' },
  { label: 'Business cards', href: '/services/business-card-design' },
  { label: 'Packaging design', href: '/services/packaging-design' },
  { label: 'UI/UX design', href: '/services/ui-ux-design' },
  { label: 'Landing pages', href: '/services/landing-page-design' },
  { label: 'E-commerce', href: '/services/ecommerce-website-design' },
  { label: 'Shopify stores', href: '/services/shopify-store-design' },
  { label: 'WordPress sites', href: '/services/wordpress-website-design' },
  { label: 'Social media design', href: '/services/social-media-design' },
  { label: 'YouTube thumbnails', href: '/services/youtube-thumbnail-design' },
  { label: 'Pitch decks', href: '/services/pitch-deck-design' },
  { label: 'Presentations', href: '/services/presentation-design' },
  { label: 'Brochures', href: '/services/brochure-design' },
  { label: 'Menu design', href: '/services/menu-design' },
  { label: 'Vehicle wraps', href: '/services/vehicle-wrap-design' },
  { label: 'Signage', href: '/services/signage-design' },
  { label: 'T-shirt design', href: '/services/apparel-design' },
  { label: 'Illustration', href: '/services/custom-illustration' },
  { label: 'Icon sets', href: '/services/icon-design' },
  { label: 'Motion graphics', href: '/services/motion-graphics' },
  { label: 'Video editing', href: '/services/video-editing' },
  { label: 'Book covers', href: '/services/book-cover-design' },
  { label: 'Amazon listings', href: '/services/amazon-listing-design' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark className="w-10 h-10" />
              <span className="text-xl font-bold tracking-tight text-white">
                Logo<span className="text-orbit-400">Orbit</span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed">
              Custom logo design, websites, animation, apps and marketing, {site.years}+ years of building
              brands that get noticed.
            </p>

            <div className="mt-6 space-y-2.5 text-[15px]">
              <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Icons.phone className="w-4.5 h-4.5 text-orbit-400" />
                {site.phone}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Icons.whatsapp className="w-4.5 h-4.5 text-[#25d366]" />
                {whatsapp.display}
                <span className="text-white/40">WhatsApp</span>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Icons.mail className="w-4.5 h-4.5 text-orbit-400" />
                {site.email}
              </a>
              <Link
                href="/contact#sales"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Icons.team className="w-4.5 h-4.5 text-orbit-400" />
                {site.salesEmail}
                <span className="text-white/40">
                  ({salesTeam.map((p) => p.name.split(' ')[0]).join(' or ')})
                </span>
              </Link>
              <Link
                href="/legal"
                className="flex items-center gap-2.5 text-[14px] hover:text-white transition-colors"
              >
                <Icons.scales className="w-4.5 h-4.5 text-orbit-400" />
                {site.legalEmail}
                <span className="text-white/40">legal, email only</span>
              </Link>
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

        {/* Specialist services, flat, so nothing deep is more than one click away */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Popular services</h3>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
            {popularServices.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="inline-block py-1 font-semibold text-orbit-400 hover:text-white transition-colors">
                See all services
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal row */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="inline-block py-1 hover:text-white transition-colors">
                  {link.label}
                </Link>
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
