import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Reveal from './Reveal'
import { Icons } from './Icons'
import SalesAvatar from './SalesAvatar'
import Link from 'next/link'
import { site, services, salesTeam, legalCounsel, whatsapp, whatsappLink } from '../lib/site'
import { crispWebsiteId } from '../lib/livechat'
import { openLiveChat } from './LiveChat'

const empty = { name: '', email: '', phone: '', service: '', message: '', consent: false, website: '' }

export default function Contact({ showIntro = true }) {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const router = useRouter()

  /* The home-page brand starter hands its brief over in the URL, so the
     visitor never has to retype what they already told us. */
  useEffect(() => {
    if (!router.isReady) return
    const { service, brief } = router.query
    if (!service && !brief) return
    setForm((f) => ({
      ...f,
      service: f.service || (typeof service === 'string' ? service : ''),
      message: f.message || (typeof brief === 'string' ? brief : ''),
    }))
  }, [router.isReady, router.query])

  const update = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      /* Not every failure comes back as JSON. A proxy timeout, a platform
         error page or a request rejected before it reaches the handler all
         return HTML, and parsing that threw a SyntaxError which was then shown
         to the visitor verbatim — "Unexpected token '<'" as the reply to
         somebody asking about a logo. Anything unreadable becomes the same
         sentence as any other server-side failure. */
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus('error')
        setError(data.error || 'Something went wrong at our end. Please call or email us instead.')
        return
      }

      setStatus('sent')
      setForm(empty)
    } catch {
      // fetch itself rejecting means the request never arrived: offline, DNS,
      // a dropped connection. That is worth saying plainly rather than
      // repeating the browser's own wording for it.
      setStatus('error')
      setError('We could not reach our server. Check your connection, or call us on ' + site.phone + '.')
    }
  }

  const field =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-300 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10'

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-16">
        {/* Details */}
        <div>
          {showIntro && (
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Need help?</span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] text-ink-900">
                Let&apos;s straighten out your <span className="text-gradient">question marks</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-500">
                With our affordable logo maker and custom design services you get the benefit of expert advice.
                Tell us what you need and we&apos;ll come back with a plan and a price.
              </p>
            </Reveal>
          )}

          <Reveal delay={90} className={`${showIntro ? 'mt-9' : ''} space-y-4`}>
            <a
              href={site.phoneHref}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition-all hover:border-brand-200 hover:shadow-lg"
            >
              <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-brand-50 text-brand-600 animate-pulse-ring">
                <Icons.phone className="w-5.5 h-5.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-ink-500">Call now</span>
                <span className="block font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">
                  {site.phone}
                </span>
              </span>
            </a>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-[#25d366]/40 bg-[#25d366]/8 p-4 transition-all hover:border-[#25d366] hover:shadow-lg"
            >
              <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-[#25d366] text-white animate-pulse-ring-wa">
                <Icons.whatsapp className="w-5.5 h-5.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-ink-500">WhatsApp, for quick questions</span>
                <span className="block font-semibold text-ink-900 group-hover:text-[#128c4a] transition-colors">
                  {whatsapp.display}
                </span>
              </span>
            </a>

            {/* Only rendered when live chat is switched on, so this list never
                offers a channel that is not actually being watched. */}
            {crispWebsiteId() && (
              <button
                type="button"
                onClick={() => openLiveChat()}
                className="group flex w-full items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50/60 p-4 text-left transition-all hover:border-brand-500 hover:shadow-lg"
              >
                <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                  <Icons.chat className="w-5.5 h-5.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-ink-500">Live chat, no phone number needed</span>
                  <span className="block font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">
                    Message the team right here
                  </span>
                </span>
              </button>
            )}

            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition-all hover:border-brand-200 hover:shadow-lg"
            >
              <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-orbit-500/10 text-orbit-600">
                <Icons.mail className="w-5.5 h-5.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-ink-500">Email support</span>
                <span className="block truncate font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">
                  {site.email}
                </span>
              </span>
            </a>

            {/* A new enquiry can skip the shared inbox and go straight to the
                person who will price it. They get a card each, because they
                cover different work and a visitor should be able to tell at a
                glance which of the two is theirs. */}
            {salesTeam.map((person) => (
              <a
                key={person.email}
                href={`mailto:${person.email}?subject=Project%20enquiry`}
                className={`group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition-all ${person.theme.hover} hover:shadow-lg`}
              >
                <SalesAvatar variant={person.avatar} id={`${person.avatar}-mini`} className="w-12 h-12 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm text-ink-500">
                    {person.role} · {person.focus}
                  </span>
                  <span className={`block font-semibold text-ink-900 transition-colors ${person.theme.hoverText}`}>
                    {person.name}
                  </span>
                  <span className="block truncate text-[14px] text-ink-500">{person.email}</span>
                </span>
              </a>
            ))}

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
              <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-flare-400/15 text-flare-500">
                <Icons.clock className="w-5.5 h-5.5" />
              </span>
              <span>
                <span className="block text-sm text-ink-500">Business hours</span>
                <span className="block font-semibold text-ink-900">{site.hours}</span>
              </span>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4">
              <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-trust-50 text-trust-600">
                <Icons.pin className="w-5.5 h-5.5" />
              </span>
              <span>
                <span className="block text-sm text-ink-500">Offices</span>
                {site.addresses.map((a) => (
                  <span key={a} className="block text-[15px] font-medium text-ink-900">
                    {a}
                  </span>
                ))}
              </span>
            </div>

            {/* Anything about rights, contracts or data skips support and goes
                straight to the legal desk. */}
            <Link
              href="/legal"
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-4 transition-all hover:border-brand-200 hover:shadow-lg"
            >
              <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-brand-50 text-brand-600">
                <Icons.scales className="w-5.5 h-5.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-ink-500">Legal, copyright &amp; trademarks</span>
                <span className="block font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">
                  {legalCounsel.name}, {legalCounsel.role}
                </span>
                <span className="block truncate text-[14px] text-ink-500">{legalCounsel.email}</span>
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={60}>
          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-7 sm:p-9">
            {status === 'sent' ? (
              // The form is replaced outright on success, so without a live
              // region a screen reader hears the submit button disappear and
              // nothing else. role="status" reads the confirmation out.
              <div role="status" className="grid place-items-center py-14 text-center">
                <span className="grid place-items-center w-16 h-16 rounded-full bg-trust-100 text-trust-600">
                  <Icons.check className="w-8 h-8" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-ink-900">Thanks, we&apos;ve got it.</h3>
                <p className="mt-2.5 max-w-sm text-ink-500">
                  A designer will reach out shortly. If it&apos;s urgent, call us directly on{' '}
                  <a href={site.phoneHref} className="font-semibold text-brand-600">
                    {site.phone}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-7 rounded-full border border-slate-300 px-6 py-3 font-semibold text-ink-900 hover:bg-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
                      Full name
                    </label>
                    <input
                      id="name" name="name" required autoComplete="name" value={form.name} onChange={update}
                      placeholder="Jane Cooper" className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
                      Email
                    </label>
                    <input
                      id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={update}
                      placeholder="jane@company.com" className={field}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">
                      Phone
                    </label>
                    <div className="flex">
                      <span className="grid place-items-center rounded-l-xl border border-r-0 border-slate-200 bg-white px-3.5 text-[15px] font-medium text-ink-500">
                        +1
                      </span>
                      <input
                        id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update}
                        placeholder="917 831 1779" className={`${field} rounded-l-none`}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink-700">
                      Service
                    </label>
                    <select id="service" name="service" required value={form.service} onChange={update} className={field}>
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                      <option value="Other">Something else</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message" name="message" rows={4} value={form.message} onChange={update}
                    placeholder="What are you building, and what does success look like?"
                    className={`${field} resize-none`}
                  />
                </div>

                <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink-500">
                  <input
                    type="checkbox" name="consent" required checked={form.consent} onChange={update}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>
                    I agree to be contacted by SMS or email in line with the{' '}
                    <Link href="/privacy" className="font-medium text-brand-600 underline underline-offset-2">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms" className="font-medium text-brand-600 underline underline-offset-2">
                      Terms &amp; Conditions
                    </Link>
                    . Carrier charges may apply for SMS. Reply STOP or UNSUBSCRIBE at any time.
                  </span>
                </label>

                {status === 'error' && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-action w-full px-6 py-4 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === 'sending' ? 'Sending…' : 'Submit request'}
                  {status !== 'sending' && <Icons.arrow className="w-5 h-5" />}
                </button>

                <p className="text-center text-[13px] text-ink-300">
                  Free consultation · No obligation · Reply within one business day
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
