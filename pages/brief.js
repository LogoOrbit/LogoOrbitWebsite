import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import Reveal from '../components/Reveal'
import { Icons } from '../components/Icons'
import { site } from '../lib/site'

/**
 * The brief form.
 *
 * Two kinds of job need two different sets of questions, so the form swaps its
 * middle section rather than asking a logo client about hosting. Every question
 * is one a business owner can answer without knowing any design words.
 */
const kinds = [
  { id: 'logo', label: 'A logo and brand', icon: Icons.logo, note: 'Logo, business cards, social, print' },
  { id: 'website', label: 'A website', icon: Icons.website, note: 'New site, redesign or online shop' },
  { id: 'video', label: 'Video and YouTube', icon: Icons.animation, note: 'Editing, thumbnails, animation' },
]

const logoQuestions = [
  { name: 'business', label: 'What does your business do?', placeholder: 'We fit kitchens for homeowners in Austin.', required: true, rows: 3 },
  { name: 'audience', label: 'Who are your customers?', placeholder: 'Homeowners, 35 to 60, mostly word of mouth.', rows: 2 },
  { name: 'feeling', label: 'How should the logo make people feel?', placeholder: 'Solid and trustworthy. Not cheap, not fussy.', rows: 2 },
  { name: 'likes', label: 'Any logos you like? Paste links or names.', placeholder: 'I like how clean the Stripe one is.', rows: 2 },
  { name: 'colours', label: 'Colours you want or want to avoid', placeholder: 'Blues are good. Please no red.', rows: 2 },
  { name: 'deliverables', label: 'What else will carry the logo?', placeholder: 'Business cards, van signage, a t-shirt.', rows: 2 },
]

const websiteQuestions = [
  { name: 'business', label: 'What does your business do?', placeholder: 'We fit kitchens for homeowners in Austin.', required: true, rows: 3 },
  { name: 'goal', label: 'What should the website get people to do?', placeholder: 'Call us or fill in a quote form.', rows: 2 },
  { name: 'pages', label: 'What pages do you need?', placeholder: 'Home, about, gallery, prices, contact.', rows: 2 },
  { name: 'selling', label: 'Are you selling anything online?', placeholder: 'Not yet, but maybe next year.', rows: 2 },
  { name: 'likes', label: 'Websites you like the look of', placeholder: 'Paste any links here.', rows: 2 },
  { name: 'existing', label: 'Do you have a site or domain already?', placeholder: 'We own the domain, the old site is on Wix.', rows: 2 },
]

const videoQuestions = [
  { name: 'business', label: 'What is the channel or business?', placeholder: 'A weekly YouTube channel about home repair.', required: true, rows: 3 },
  { name: 'videos', label: 'How many videos, and how long?', placeholder: 'One a week, usually 12 minutes.', rows: 2 },
  { name: 'style', label: 'What style are you after?', placeholder: 'Fast cuts, captions, a bit of humour.', rows: 2 },
  { name: 'extras', label: 'Do you need thumbnails, intros or shorts?', placeholder: 'Thumbnails and 3 shorts per video.', rows: 2 },
  { name: 'footage', label: 'Where is your footage?', placeholder: 'Google Drive, about 40 GB per video.', rows: 2 },
]

const questionsFor = { logo: logoQuestions, website: websiteQuestions, video: videoQuestions }

const budgets = ['Under $250', '$250 to $750', '$750 to $1,500', '$1,500 to $3,000', 'Over $3,000', 'Not sure yet']
const timings = ['As soon as possible', 'Within 2 weeks', 'Within a month', 'Just planning ahead']

function Field({ q, value, onChange }) {
  return (
    <label className="block">
      <span className="block text-[15px] font-semibold text-ink-900">
        {q.label}
        {q.required && <span className="ml-1 text-action-600">*</span>}
      </span>
      <textarea
        name={q.name}
        rows={q.rows || 2}
        required={q.required}
        value={value || ''}
        onChange={(e) => onChange(q.name, e.target.value)}
        placeholder={q.placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none"
      />
    </label>
  )
}

export default function Brief() {
  const [kind, setKind] = useState('logo')
  const [answers, setAnswers] = useState({})
  const [contact, setContact] = useState({ name: '', email: '', phone: '', budget: '', timing: '' })
  const [state, setState] = useState({ status: 'idle', message: '' })

  const setAnswer = (name, value) => setAnswers((a) => ({ ...a, [name]: value }))
  const setField = (name, value) => setContact((c) => ({ ...c, [name]: value }))

  const questions = questionsFor[kind]

  const submit = async (e) => {
    e.preventDefault()
    setState({ status: 'sending', message: '' })

    const lines = questions
      .filter((q) => answers[q.name])
      .map((q) => `${q.label}\n${answers[q.name]}`)
      .concat([`Budget: ${contact.budget || 'not given'}`, `Timing: ${contact.timing || 'not given'}`])

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          service: `Brief: ${kind}`,
          message: lines.join('\n\n'),
          consent: true,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setState({ status: 'error', message: data.error || 'Something went wrong. Please try again.' })
        return
      }

      setState({
        status: 'done',
        message: 'Thank you. We have your brief and a designer will reply within one working day.',
      })
    } catch (err) {
      setState({ status: 'error', message: 'We could not send that. Please call us instead and we will take it down.' })
    }
  }

  return (
    <Layout
      title="Start your brief"
      description="Tell LogoOrbit what you need in plain words. A short form for a logo, a website or video work, answered by a designer within one working day."
      path="/brief"
    >
      <PageHero
        eyebrow="Tell us what you need"
        title="Answer a few questions."
        highlight="We do the rest."
        intro="No design words needed. Write it the way you would explain it to a friend, and a designer will come back with a plan and a price."
      >
        <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
          <a href="#brief-form" className="btn-action px-7 py-3.5 sm:py-4">
            Start the form
            <Icons.arrow className="w-5 h-5" />
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-3.5 sm:py-4 font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Icons.phone className="w-5 h-5" />
            Rather just talk? Call us
          </a>
        </div>
      </PageHero>

      <TrustBar />

      <section id="brief-form" className="scroll-mt-24 py-12 sm:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          {state.status === 'done' ? (
            <Reveal>
              <div className="rounded-3xl border border-trust-100 bg-trust-50 p-8 text-center">
                <span className="mx-auto grid place-items-center w-14 h-14 rounded-2xl bg-white text-trust-600">
                  <Icons.check className="w-7 h-7" />
                </span>
                <h2 className="mt-5 text-2xl font-bold text-ink-900">Got it</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{state.message}</p>
                <Link href="/pricing" className="btn-action mt-6 px-7 py-3.5">
                  Look at packages while you wait
                  <Icons.arrow className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={submit} className="space-y-8">
              <Reveal>
                <p className="text-[15px] font-semibold text-ink-900">First, what is this for?</p>
                <div className="mt-3 grid sm:grid-cols-3 gap-3">
                  {kinds.map((k) => {
                    const Icon = k.icon
                    const active = kind === k.id
                    return (
                      <button
                        key={k.id}
                        type="button"
                        onClick={() => setKind(k.id)}
                        aria-pressed={active}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                          active
                            ? 'border-action-500 bg-brand-50 shadow-md'
                            : 'border-slate-200 bg-white hover:border-brand-300'
                        }`}
                      >
                        <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-brand-50 text-brand-600">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[15px] font-bold text-ink-900">{k.label}</span>
                          <span className="block text-[13px] leading-snug text-ink-500">{k.note}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </Reveal>

              <Reveal className="space-y-5">
                {questions.map((q) => (
                  <Field key={q.name} q={q} value={answers[q.name]} onChange={setAnswer} />
                ))}
              </Reveal>

              <Reveal className="space-y-5 rounded-3xl bg-slate-50 p-6">
                <p className="text-[15px] font-semibold text-ink-900">How do we reach you?</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-[14px] font-medium text-ink-700">
                      Your name <span className="text-action-600">*</span>
                    </span>
                    <input
                      type="text"
                      required
                      value={contact.name}
                      onChange={(e) => setField('name', e.target.value)}
                      className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 focus:border-brand-400 focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-[14px] font-medium text-ink-700">
                      Email <span className="text-action-600">*</span>
                    </span>
                    <input
                      type="email"
                      required
                      value={contact.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 focus:border-brand-400 focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-[14px] font-medium text-ink-700">Phone (optional)</span>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 focus:border-brand-400 focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-[14px] font-medium text-ink-700">Roughly what budget?</span>
                    <select
                      value={contact.budget}
                      onChange={(e) => setField('budget', e.target.value)}
                      className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 focus:border-brand-400 focus:outline-none"
                    >
                      <option value="">Pick one</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="block text-[14px] font-medium text-ink-700">When do you need it?</span>
                    <select
                      value={contact.timing}
                      onChange={(e) => setField('timing', e.target.value)}
                      className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 focus:border-brand-400 focus:outline-none"
                    >
                      <option value="">Pick one</option>
                      {timings.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>

                {state.status === 'error' && (
                  <p className="rounded-2xl bg-action-500/10 px-4 py-3 text-[14px] font-medium text-action-700">
                    {state.message}
                  </p>
                )}

                <button type="submit" disabled={state.status === 'sending'} className="btn-action w-full px-7 py-4">
                  {state.status === 'sending' ? 'Sending your brief...' : 'Send my brief'}
                  <Icons.arrow className="w-5 h-5" />
                </button>

                <p className="text-center text-[13px] text-ink-500">
                  A designer reads every brief. You get a reply within one working day, with a price and a plan.
                </p>
              </Reveal>
            </form>
          )}
        </div>
      </section>
    </Layout>
  )
}
