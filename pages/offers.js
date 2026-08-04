import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { Icons } from '../components/Icons'
import { site, services, whatsappLink } from '../lib/site'
import { offer, informativeWebsite } from '../lib/offers'
import { ORG_ID } from '../lib/seo'

const description =
  'Limited time offer for existing LogoOrbit customers: 70% off every service. Our $1000 websites are now $299, and the same 70% discount applies across logo design, animation, apps and marketing.'

export default function Offers() {
  const jsonLd = {
    '@graph': [
      {
        '@type': 'Offer',
        '@id': `${site.url}/offers#offer`,
        name: '70% off all services for existing customers',
        description,
        url: `${site.url}/offers`,
        price: offer.nowPrice,
        priceCurrency: 'USD',
        availability: 'https://schema.org/LimitedAvailability',
        eligibleCustomerType: 'https://schema.org/ReturningCustomer',
        offeredBy: { '@id': ORG_ID },
      },
    ],
  }

  return (
    <Layout title="Limited Time Offer — 70% Off" description={description} path="/offers" jsonLd={jsonLd}>
      <PageHero
        eyebrow={offer.eyebrow}
        title="Everything is"
        highlight="70% off"
        intro={offer.shortPitch}
        breadcrumb="Offers"
      >
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link href="/contact" className="group btn-action px-7 py-4">
            Claim this offer
            <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Icons.phone className="w-5 h-5" />
            {site.phone}
          </a>
        </div>
      </PageHero>

      {/* The headline number, said plainly and only once. */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-8 py-12 sm:px-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                Website design
              </p>
              <div className="mt-5 flex flex-wrap items-baseline justify-center gap-4">
                <span className="text-3xl sm:text-4xl font-semibold text-slate-400 line-through">
                  ${offer.wasPrice}
                </span>
                <span className="text-6xl sm:text-7xl font-bold text-slate-900">${offer.nowPrice}</span>
                <span className="rounded-full bg-brand-600 px-4 py-1.5 text-sm font-bold text-white">
                  Save {offer.discount}%
                </span>
              </div>
              <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
                The same website we normally build for ${offer.wasPrice} is ${offer.nowPrice} while this
                promotion runs. Same designers, same pages, same ownership terms — only the price moved.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* And it is not only websites. */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center">
              {offer.discount}% off every service, not just websites
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-center text-lg leading-relaxed text-slate-600">
              This is an existing-customer offer. If we have worked together before, the discount applies to
              anything in our catalogue.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-lg"
                >
                  <span className="inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
                    {offer.discount}% off
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{s.name}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{s.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                    See what is included
                    <Icons.arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The one package with a fixed discounted price gets its own door. */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                  {informativeWebsite.tagline}
                </p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                  {informativeWebsite.name} — ${informativeWebsite.price} only
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  Unlimited logo concepts, 8 dedicated designers, an 8 to 10 page mobile-responsive website,
                  stationery, forms and full ownership rights. No monthly cost, no yearly cost.
                </p>
                <Link
                  href={informativeWebsite.href}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-4 font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  See the full package
                  <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <ul className="space-y-2.5">
                {informativeWebsite.features.slice(0, 8).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-slate-700">
                    <Icons.check className="mt-1 w-4 h-4 shrink-0 text-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Terms, then the ask. */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How the offer works</h2>
            <ul className="mt-8 space-y-3 text-left">
              {offer.terms.map((t) => (
                <li key={t} className="flex items-start gap-3 text-lg text-slate-700">
                  <Icons.check className="mt-1.5 w-5 h-5 shrink-0 text-brand-600" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-lg font-semibold text-slate-900">
              Reply with “YES” to avail now, or call us and we will apply it to your next order.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3.5">
              <Link href="/contact" className="group btn-action px-7 py-4">
                Say YES
                <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsappLink('Hi LogoOrbit, YES — I would like to avail the 70% existing customer offer.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Icons.whatsapp className="w-5 h-5" />
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
