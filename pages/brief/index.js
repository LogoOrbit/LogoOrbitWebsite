import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TrustBar from '../../components/TrustBar'
import Reveal from '../../components/Reveal'
import { Icons } from '../../components/Icons'
import { site } from '../../lib/site'

/**
 * The brief chooser.
 *
 * The logo, website and mobile app briefs are the long, step-by-step forms in
 * /public/brief. They are served as plain HTML rather than rebuilt as pages,
 * which is why they are linked by file rather than by route, and why they
 * arrive carrying their own styling instead of the site chrome.
 */
const briefs = [
  {
    id: 'logo',
    href: '/brief/logo.html',
    icon: Icons.logo,
    title: 'Logo and brand brief',
    body: 'The full brand questionnaire, styles, colours, symbols to use and to avoid, and where the mark has to work.',
    meta: '8 steps, about 6 minutes',
    external: true,
  },
  {
    id: 'website',
    href: '/brief/website.html',
    icon: Icons.website,
    title: 'Website brief',
    body: 'Pages, features, who it is for and what it has to get people to do, plus anything you already own.',
    meta: '8 steps, about 7 minutes',
    external: true,
  },
  {
    id: 'app',
    href: '/brief/app.html',
    icon: Icons.mobile,
    title: 'Mobile app brief',
    body: 'Screens, features, logins and payments. Mostly tapping, in plain words, with a "?" on anything technical.',
    meta: '9 steps, about 5 minutes',
    external: true,
  },
  {
    id: 'video',
    href: '/brief/video',
    icon: Icons.animation,
    title: 'Video and YouTube brief',
    body: 'Editing, thumbnails and animation. A shorter set of questions, answered in plain words.',
    meta: 'One page, about 3 minutes',
    external: false,
  },
  {
    id: 'trademark',
    href: '/brief/trademark',
    icon: Icons.scales,
    title: 'USPTO trademark brief',
    body: 'The mark, the legal owner, what you sell under it and whether you are using it yet. The things a filing cannot be corrected on later.',
    meta: '7 steps, about 8 minutes',
    external: false,
  },
]

export default function BriefChooser() {
  return (
    <Layout
      title="Start Your Brief"
      description="Start a LogoOrbit project brief. Answer a few plain questions about your logo, website, video or USPTO trademark filing, download a PDF copy, and our team takes it from there."
      path="/brief"
    >
      <PageHero
        eyebrow="Start here"
        title="Tell us what you need."
        highlight="We do the rest."
        intro="Pick the brief that matches your job. No design words needed, and you get a PDF copy of everything you tell us at the end."
      />

      <TrustBar />

      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {briefs.map((brief, i) => {
              const Icon = brief.icon
              const inner = (
                <>
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h2 className="mt-5 text-xl font-bold text-ink-900">{brief.title}</h2>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-500">{brief.body}</p>
                  <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-300">
                    {brief.meta}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-600 group-hover:text-action-600 transition-colors">
                    Start this brief
                    <Icons.arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </>
              )

              const className =
                'group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl'

              return (
                <Reveal key={brief.id} delay={i * 90} className="h-full">
                  {brief.external ? (
                    <a href={brief.href} className={className}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={brief.href} className={className}>
                      {inner}
                    </Link>
                  )}
                </Reveal>
              )
            })}
          </div>

          <Reveal className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-[15px] text-ink-500">
              Rather talk it through first? That is fine, most clients do.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-action px-7 py-3.5">
                Send a message
                <Icons.arrow className="w-4.5 h-4.5" />
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
              >
                <Icons.phone className="w-4.5 h-4.5" />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
