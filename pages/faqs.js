import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import CTA from '../components/CTA'
import { Icons } from '../components/Icons'
import { site, whatsapp, whatsappLink } from '../lib/site'
import { faqGroups, faqCount, faqItems } from '../lib/faqs'

/** The same groups, but with the per-question page slugs attached. */
const groupsWithSlugs = faqGroups.map((group) => ({
  ...group,
  items: faqItems.filter((item) => item.group.id === group.id),
}))

function Group({ group }) {
  const [open, setOpen] = useState(null)
  const Icon = Icons[group.icon] || Icons.spark

  return (
    <section id={group.id} className="scroll-mt-28 border-t border-slate-100 pt-10 first:border-0 first:pt-0 pb-10">
      <div className="flex items-center gap-3">
        <span className="grid shrink-0 place-items-center w-11 h-11 rounded-2xl bg-brand-50 text-brand-600">
          <Icon className="w-5.5 h-5.5" />
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-ink-900">{group.title}</h2>
      </div>

      <div className="mt-6 space-y-3">
        {group.items.map((item, i) => {
          const isOpen = open === i
          return (
            <Reveal key={item.q} delay={i * 40}>
              <div
                className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                  isOpen ? 'border-brand-200 shadow-lg shadow-brand-900/5' : 'border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left sm:px-6 sm:py-5"
                >
                  <span className="font-semibold text-ink-900">{item.q}</span>
                  <span
                    className={`grid shrink-0 place-items-center w-8 h-8 rounded-full transition-all duration-300 ${
                      isOpen ? 'rotate-45 bg-brand-600 text-white' : 'bg-slate-100 text-ink-500'
                    }`}
                  >
                    <Icons.plus className="w-4.5 h-4.5" />
                  </span>
                </button>

                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 text-[15px] leading-relaxed text-ink-500 sm:px-6">{item.a}</p>
                    {/* Every question also has a page of its own, with the
                        longer answer and the pages that go into it properly. */}
                    <Link
                      href={`/faqs/${item.slug}`}
                      className="mx-5 mb-5 mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600 hover:text-brand-700 sm:mx-6"
                    >
                      Read the longer answer
                      <Icons.arrow className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export default function FaqsPage() {
  return (
    <Layout
      title="FAQs"
      description={`${faqCount} straight answers about LogoOrbit: turnaround times, revisions, file formats, copyright ownership, trademark filings, pricing and support.`}
      path="/faqs"
      jsonLd={{
        '@type': 'FAQPage',
        mainEntity: faqGroups.flatMap((g) =>
          g.items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          }))
        ),
      }}
    >
      <PageHero
        eyebrow="FAQs"
        breadcrumb="FAQs"
        title="Everything people ask us,"
        highlight="answered honestly"
        intro={`${faqCount} questions, grouped the way they actually come up. If yours is not here, message us on WhatsApp, it is usually answered in minutes.`}
      >
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={whatsappLink('Hi LogoOrbit, I have a question that is not in your FAQs:')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action px-7 py-4"
          >
            <Icons.whatsapp className="w-5 h-5" />
            Ask on WhatsApp
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Icons.phone className="w-5 h-5" />
            {site.phone}
          </a>
        </div>
      </PageHero>

      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 grid lg:grid-cols-[15rem_minmax(0,1fr)] gap-10 lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-300">Jump to</p>
            <ul className="mt-4 space-y-1.5">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="flex items-center justify-between gap-2 rounded-lg py-1.5 text-[14px] text-ink-500 hover:text-brand-600 transition-colors"
                  >
                    {g.title}
                    <span className="text-ink-300 tabular-nums">{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl border border-[#25d366]/40 bg-[#25d366]/8 p-5">
              <p className="font-bold text-ink-900">Still stuck?</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
                Send it over on WhatsApp and a real person will reply.
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-semibold text-[#128c4a]"
              >
                <Icons.whatsapp className="w-4.5 h-4.5" />
                {whatsapp.display}
              </a>
            </div>
          </aside>

          <div className="min-w-0">
            {groupsWithSlugs.map((group) => (
              <Group key={group.id} group={group} />
            ))}

            <Reveal className="border-t border-slate-100 pt-10">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-ink-900">Looking for the fine print?</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                  The full detail on revisions, delivery, ownership and data lives in the policies, and our legal
                  desk answers anything they do not cover.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {[
                    { href: '/terms', label: 'Terms & Conditions' },
                    { href: '/privacy', label: 'Privacy Policy' },
                    { href: '/legal', label: 'Legal & Compliance' },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
                    >
                      {l.label}
                      <Icons.arrow className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  )
}
