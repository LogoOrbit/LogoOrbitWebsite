import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import { Icons, Star } from '../components/Icons'
import { site, whatsapp, whatsappLink } from '../lib/site'
import { reviewThemes, reviewFacts, reviewPlatforms, reviewSources } from '../lib/reviews'

export default function ReviewsPage() {
  return (
    <Layout
      title="Client Reviews"
      description={`What LogoOrbit clients actually say: ${site.reviewCount.toLocaleString()} reviews, a ${site.rating} average, and the four things that come up again and again.`}
      path="/reviews"
      jsonLd={{
        '@type': 'WebPage',
        name: 'Client Reviews',
        url: `${site.url}/reviews`,
        about: { '@id': `${site.url}/#organization` },
      }}
    >
      <PageHero
        eyebrow="Client Reviews"
        breadcrumb="Reviews"
        title="Fifteen years of work,"
        highlight="judged by the people who paid for it"
        intro="We would rather show you the pattern in thousands of reviews than pick out the three nicest sentences. Here is what clients keep telling us, in their words and ours."
      >
        <Reveal className="mt-8 sm:mt-10">
          <div className="mx-auto flex max-w-xl flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 rounded-3xl glass px-7 py-6">
            <div className="flex items-center gap-4">
              <p className="text-5xl font-bold text-white">{site.rating}</p>
              <div>
                <div className="flex text-flare-300">
                  {[0, 1, 2, 3].map((i) => <Star key={i} className="w-5 h-5" />)}
                  <Star className="w-5 h-5" half id="reviews-hero-half" />
                </div>
                <p className="mt-1 text-sm text-white/75">
                  {site.reviewCount.toLocaleString()} clients, and counting
                </p>
              </div>
            </div>
            <span className="hidden sm:block w-px h-14 bg-white/25" aria-hidden="true" />
            <p className="max-w-[15rem] text-[15px] leading-relaxed text-white/80">
              Every one of them received a finished, fully-owned design from our team.
            </p>
          </div>
        </Reveal>
      </PageHero>

      {/* The recurring themes */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="The pattern"
            title="Four things clients mention"
            highlight="over and over"
            body="Read enough feedback and the same four points keep surfacing, whatever the industry and whatever the budget."
          />

          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {reviewThemes.map((theme, i) => {
              const Icon = Icons[theme.icon] || Icons.spark
              return (
                <Reveal key={theme.id} delay={i * 80}>
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600">
                      <Icon className="w-6 h-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-ink-900">{theme.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{theme.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* The quotes themselves */}
      <Testimonials />

      {/* Where the feedback comes from */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Where it comes from
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
              Reviews across everything we make
            </h2>
            <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">
              Most of our feedback is still left by logo clients, which is what we have been doing longest. The
              share coming from websites, video and app projects grows every year, because people who liked the
              first job tend to come back for the second.
            </p>

            <ul className="mt-8 space-y-3">
              {reviewSources.map((source) => (
                <li
                  key={source.label}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4"
                >
                  <span className="font-semibold text-ink-900">{source.label}</span>
                  <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-[13px] font-semibold text-brand-600">
                    {source.share}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90}>
            <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
              <h3 className="text-xl font-bold text-ink-900">How we handle feedback</h3>
              <div className="mt-6 space-y-6">
                {reviewFacts.map((fact) => (
                  <div key={fact.title} className="flex gap-3">
                    <span className="mt-0.5 grid shrink-0 place-items-center w-6 h-6 rounded-full bg-trust-50 text-trust-600">
                      <Icons.check className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink-900">{fact.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-500">{fact.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink-300">Read them elsewhere</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {reviewPlatforms.map((p) => (
                    <a
                      key={p.name}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-col rounded-2xl border border-slate-200 px-4 py-3 transition-colors hover:border-brand-300"
                    >
                      <span className="font-semibold text-ink-900">{p.name}</span>
                      <span className="text-[13px] text-ink-500">{p.note}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leave one */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Reveal>
            <div className="rounded-3xl border-2 border-action-500/50 bg-white p-7 sm:p-10 text-center shadow-lg">
              <span className="inline-flex items-center gap-2 rounded-full bg-action-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                <Icons.quote className="w-4 h-4" />
                Worked with us?
              </span>
              <h2 className="mt-5 text-2xl sm:text-3xl font-bold leading-tight text-ink-900">
                Tell us how it went, good or bad
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-ink-500">
                Send it on WhatsApp or by email. If something went wrong we would rather hear it from you than read
                it later, and if it went well, it helps the next person decide.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={whatsappLink('Hi LogoOrbit, here is my feedback on the project you did for me:')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-action px-7 py-4"
                >
                  <Icons.whatsapp className="w-5 h-5" />
                  Send it on WhatsApp
                </a>
                <a
                  href={`mailto:${site.email}?subject=Feedback`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
                >
                  <Icons.mail className="w-5 h-5" />
                  Email the team
                </a>
              </div>
              <p className="mt-4 text-sm text-ink-500">{whatsapp.display} · {site.hours}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </Layout>
  )
}
