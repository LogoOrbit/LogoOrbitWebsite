import Link from 'next/link'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons } from './Icons'
import { billingEntity } from '../lib/site'

/**
 * How LogoOrbit and Phelps & Associates, LLC fit together.
 *
 * Two company names on one transaction is the sort of thing that reads as
 * evasive when it is left to be discovered and as ordinary when it is simply
 * drawn. So it gets drawn: who you contract with, who bills you, and the
 * officer who sits across both. The chain is deliberately left to right and
 * the split of responsibilities is a table rather than a paragraph, because
 * the question this answers is "which of these two do I go to", and a table
 * answers that in one glance.
 *
 * Used on the finance officer's profile and on the legal page. `tone`
 * switches the band between the white and slate sections it sits between.
 */

const chain = [
  {
    icon: 'logo',
    label: 'You contract with',
    name: 'LogoOrbit',
    body: 'The design work, the terms you accept, the deadlines and the copyright that transfers to you at the end. All ours.',
  },
  {
    icon: 'badge',
    label: 'The officer across both',
    name: billingEntity.officer,
    body: `Director of ${billingEntity.name} and LogoOrbit's ${billingEntity.officerRole}. He is the reason the two are connected.`,
    href: `/team/${billingEntity.officerSlug}`,
  },
  {
    icon: 'receipt',
    label: 'You are billed by',
    name: billingEntity.name,
    body: 'The billing and merchant entity named on the invoice, and the name that reaches your card statement.',
    external: billingEntity.site,
  },
]

const split = [
  ['The design work itself', 'LogoOrbit'],
  ['The terms and conditions you accept', 'LogoOrbit'],
  ['Copyright and ownership of the finished design', 'LogoOrbit'],
  ['The invoice document', billingEntity.name],
  ['The card payment and the statement descriptor', billingEntity.name],
  ['Refunds, receipts and billing records', billingEntity.name],
]

export default function BillingEntityRelation({ tone = 'light' }) {
  const bg = tone === 'muted' ? 'bg-slate-50' : 'bg-white'
  const card = tone === 'muted' ? 'bg-white' : 'bg-slate-50'

  return (
    <section className={`py-14 sm:py-20 ${bg}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Billing entity"
          title="Two names on one job,"
          highlight="and why that is normal"
          body={`Your invoice is issued by ${billingEntity.name} rather than under the LogoOrbit trading name. Nothing is hidden behind that. Here is exactly how the two are connected and which one does what.`}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {chain.map((node, i) => {
            const Icon = Icons[node.icon] || Icons.team
            return (
              <Reveal key={node.name} delay={i * 90} className="h-full">
                <div className={`relative flex h-full flex-col rounded-3xl border border-slate-200 p-7 ${card}`}>
                  {/* The arrow that makes it a chain rather than three cards.
                      Desktop only: stacked on a phone the reading order
                      already carries the sequence. */}
                  {i < chain.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white p-1.5 text-brand-600 shadow-sm lg:grid"
                    >
                      <Icons.arrow className="h-4 w-4" />
                    </span>
                  )}

                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    {node.label}
                  </span>
                  <h3 className="mt-1.5 text-lg font-bold text-ink-900">{node.name}</h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-500">{node.body}</p>

                  {node.href && (
                    <Link
                      href={node.href}
                      className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Read his profile
                      <Icons.arrow className="w-4 h-4" />
                    </Link>
                  )}
                  {node.external && (
                    <a
                      href={node.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Visit phelps-llc.com
                      <Icons.arrow className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <Reveal delay={120}>
            <div className={`h-full rounded-3xl border border-slate-200 p-7 ${card}`}>
              <h3 className="text-lg font-bold text-ink-900">Which one does what</h3>
              <dl className="mt-5 divide-y divide-slate-200">
                {split.map(([what, who]) => (
                  <div key={what} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                    <dt className="text-[15px] leading-relaxed text-ink-700">{what}</dt>
                    <dd className="text-[13.5px] font-bold text-ink-900">{who}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="h-full rounded-3xl border border-brand-200 bg-brand-50/60 p-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-brand-700">
                <Icons.shield className="w-4 h-4" />
                Check it for yourself
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink-900">{billingEntity.name}</h3>

              <dl className="mt-5 space-y-3.5 text-[15px]">
                <div className="flex gap-3">
                  <Icons.receipt className="mt-0.5 w-4.5 h-4.5 shrink-0 text-brand-600" />
                  <span>
                    <dt className="font-semibold text-ink-900">On your card statement</dt>
                    <dd className="text-ink-500">{billingEntity.descriptor}</dd>
                  </span>
                </div>
                <div className="flex gap-3">
                  <Icons.pin className="mt-0.5 w-4.5 h-4.5 shrink-0 text-brand-600" />
                  <span>
                    <dt className="font-semibold text-ink-900">Registered address</dt>
                    <dd className="text-ink-500">{billingEntity.address}</dd>
                  </span>
                </div>
                <div className="flex gap-3">
                  <Icons.phone className="mt-0.5 w-4.5 h-4.5 shrink-0 text-brand-600" />
                  <span>
                    <dt className="font-semibold text-ink-900">Phone</dt>
                    <dd>
                      <a
                        href={`tel:${billingEntity.phone.replace(/[^+\d]/g, '')}`}
                        className="text-brand-600 underline underline-offset-2"
                      >
                        {billingEntity.phone}
                      </a>
                    </dd>
                  </span>
                </div>
                <div className="flex gap-3">
                  <Icons.mail className="mt-0.5 w-4.5 h-4.5 shrink-0 text-brand-600" />
                  <span>
                    <dt className="font-semibold text-ink-900">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${billingEntity.officerEmail}`}
                        className="text-brand-600 underline underline-offset-2"
                      >
                        {billingEntity.officerEmail}
                      </a>
                    </dd>
                  </span>
                </div>
                <div className="flex gap-3">
                  <Icons.website className="mt-0.5 w-4.5 h-4.5 shrink-0 text-brand-600" />
                  <span>
                    <dt className="font-semibold text-ink-900">Website</dt>
                    <dd>
                      <a
                        href={billingEntity.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 underline underline-offset-2"
                      >
                        phelps-llc.com
                      </a>
                    </dd>
                  </span>
                </div>
              </dl>

              <p className="mt-5 text-[14px] leading-relaxed text-ink-500">
                If a charge looks unfamiliar, write to{' '}
                <a
                  href={`mailto:${billingEntity.officerEmail}`}
                  className="font-semibold text-brand-600 underline underline-offset-2"
                >
                  {billingEntity.officerEmail}
                </a>{' '}
                before opening a bank dispute. It will be identified for you in writing, usually the same day.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
