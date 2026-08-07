import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TrustBar from '../../components/TrustBar'
import Reveal from '../../components/Reveal'
import { Icons } from '../../components/Icons'
import { site } from '../../lib/site'

/**
 * The USPTO trademark brief.
 *
 * A trademark application asks for a great deal, and an intake form that asks
 * for all of it is an intake form nobody finishes. So this asks only for the
 * things the legal desk cannot start without: what the mark is, what it covers,
 * who legally owns it, and whether it is already in use. Everything else the
 * office wants - colour claims, specimens, prior registrations, the declaration
 * and its signatory - is settled in the reply, by which point there is a real
 * conversation to settle it in.
 *
 * Two of these are worth the extra sentence of help underneath them. The owner
 * name is one: an application filed in the wrong owner's name is void and has
 * to be filed again, fee and all, so the note asks people to check it against
 * their own documents rather than type the trading name from memory. The
 * domicile address is the other: it must be a street address and it goes on the
 * public record, which is a surprise worth avoiding.
 *
 * Nothing here asks for a social security or tax ID number. The USPTO does not
 * need either to register a mark, and an intake form that arrives by email is
 * the wrong place to hold them.
 *
 * The questions live in the array below rather than in the markup, so the same
 * list drives the form and the email the legal desk receives.
 */
const questions = [
  {
    group: 'The mark and what it covers',
    fields: [
      {
        name: 'markText',
        label: 'Write the mark exactly as you want it registered',
        type: 'text',
        required: true,
        placeholder: 'Northgate Kitchens',
        help: 'Exact spelling, spacing and capitals. Leave off Inc, LLC and the TM symbol unless you genuinely trade under them.',
      },
      {
        name: 'markType',
        label: 'What kind of mark is it?',
        type: 'radio',
        required: true,
        options: ['Words only', 'A logo or design', 'Words and a logo together'],
        help: 'Words only is the broader protection: it covers the name however it is written.',
      },
      {
        name: 'goods',
        label: 'What do you sell or offer under it?',
        type: 'textarea',
        rows: 3,
        required: true,
        placeholder: 'Fitted kitchen installation and custom cabinet making.',
        help: 'Be specific. This is what decides your classes, and the government fee is charged per class.',
      },
    ],
  },
  {
    group: 'The owner and the filing',
    fields: [
      {
        name: 'ownerType',
        label: 'Who will own the registration?',
        type: 'select',
        required: true,
        options: [
          'An individual person',
          'A limited liability company (LLC)',
          'A corporation',
          'A partnership',
          'A sole proprietorship',
          'Something else / not sure',
        ],
        help: 'If the business is a company, the company owns it rather than you personally.',
      },
      {
        name: 'ownerLegalName',
        label: 'The owner’s exact legal name',
        type: 'text',
        required: true,
        placeholder: 'Northgate Kitchens LLC',
        help: 'Word for word as it appears on the incorporation papers or your ID, not the trading name. An application filed in the wrong name cannot be corrected later, it has to be filed again.',
      },
      {
        name: 'domicile',
        label: 'The owner’s address',
        type: 'textarea',
        rows: 2,
        required: true,
        placeholder: '1420 Burnet Road, Austin, TX 78756, United States',
        help: 'A street address, not a PO box: the home of an individual or the main place of business of a company. The USPTO puts it on the public record.',
      },
      {
        name: 'basis',
        label: 'Are you using the mark yet?',
        type: 'radio',
        required: true,
        options: ['Yes, we are already selling under it', 'Not yet, but we intend to'],
        help: 'Both routes end in the same registration. Filing before you launch simply holds your place.',
      },
      {
        name: 'firstUse',
        label: 'Roughly when did you first sell under it?',
        type: 'text',
        required: true,
        when: (a) => /^Yes/.test(a.basis || ''),
        placeholder: 'March 2019',
        help: 'A month and year is enough for now.',
      },
      {
        name: 'notes',
        label: 'Anything else we should know?',
        type: 'textarea',
        rows: 2,
        placeholder: 'Someone else may be using a similar name. / We had a letter from a law firm last year.',
        help: 'Optional. Existing registrations, disputes or a deadline are the useful ones.',
      },
    ],
  },
]

/** The questions the current answers actually call for. */
const visibleFields = (group, answers) => group.fields.filter((f) => !f.when || f.when(answers))

const inputClass =
  'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none'

const contactClass =
  'mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 focus:border-brand-400 focus:outline-none'

function Field({ field, value, onChange }) {
  const required = field.required && <span className="ml-1 text-action-600">*</span>
  const help = field.help && <span className="mt-1.5 block text-[13px] leading-relaxed text-ink-500">{field.help}</span>

  if (field.type === 'radio') {
    return (
      <fieldset className="block">
        <legend className="block text-[15px] font-semibold text-ink-900">
          {field.label}
          {required}
        </legend>
        {help}
        <div className="mt-2.5 space-y-2">
          {field.options.map((option) => (
            <label
              key={option}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-colors ${
                value === option ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name={field.name}
                value={option}
                required={field.required}
                checked={value === option}
                onChange={() => onChange(field.name, option)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600"
              />
              <span className="text-[14px] leading-relaxed text-ink-700">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    )
  }

  return (
    <label className="block">
      <span className="block text-[15px] font-semibold text-ink-900">
        {field.label}
        {required}
      </span>
      {help}
      {field.type === 'select' ? (
        <select
          name={field.name}
          required={field.required}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={inputClass}
        >
          <option value="">Pick one</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          name={field.name}
          rows={field.rows || 2}
          required={field.required}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      ) : (
        <input
          type="text"
          name={field.name}
          required={field.required}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}
    </label>
  )
}

export default function TrademarkBrief() {
  const [answers, setAnswers] = useState({})
  const [contact, setContact] = useState({ name: '', email: '', phone: '', website: '' })
  const [state, setState] = useState({ status: 'idle', message: '' })

  const setAnswer = (name, value) => setAnswers((a) => ({ ...a, [name]: value }))
  const setField = (name, value) => setContact((c) => ({ ...c, [name]: value }))

  /** The answers, grouped the way the legal desk reads them. */
  const collect = () =>
    questions
      .map((group) => ({
        title: group.group,
        answers: visibleFields(group, answers)
          .filter((f) => answers[f.name])
          .map((f) => ({ label: f.label, value: String(answers[f.name]) })),
      }))
      .filter((group) => group.answers.length)

  const submit = async (e) => {
    e.preventDefault()
    setState({ status: 'sending', message: '' })

    try {
      const res = await fetch('/api/trademark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          website: contact.website,
          mark: answers.markText || '',
          owner: answers.ownerLegalName || '',
          sections: collect(),
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setState({ status: 'error', message: data.error || 'Something went wrong. Please try again.' })
        return
      }

      setState({
        status: 'done',
        message:
          'Thank you. The legal desk has your brief and will come back within one working day with the clearance search result, the classes we recommend and the total.',
      })
    } catch (err) {
      setState({
        status: 'error',
        message: 'We could not send that. Please call us instead and we will take it down over the phone.',
      })
    }
  }

  return (
    <Layout
      title="USPTO Trademark Brief"
      description="A short trademark brief: the mark, what you sell under it, who legally owns it and whether you are using it yet. The legal desk replies within one working day with the clearance search and the total."
      path="/brief/trademark"
    >
      <PageHero
        eyebrow="Trademark filing"
        title="Tell us the essentials."
        highlight="We do the rest."
        intro="One page, about three minutes. Enough for the legal desk to run the clearance search, work out your classes and give you the total. Everything else the USPTO wants, we settle with you in the reply."
        trail={[{ name: 'Briefs', href: '/brief' }, { name: 'Trademark' }]}
      >
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#trademark-form" className="btn-action px-7 py-3.5 sm:py-4">
            Start the form
            <Icons.arrow className="w-5 h-5" />
          </a>
          <a
            href={site.phoneHref}
            className="glass inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/20 sm:py-4"
          >
            <Icons.phone className="w-5 h-5" />
            Rather just talk? Call us
          </a>
        </div>
      </PageHero>

      <TrustBar />

      <section id="trademark-form" className="scroll-mt-24 bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          {state.status === 'done' ? (
            <Reveal>
              <div className="rounded-3xl border border-trust-100 bg-trust-50 p-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-trust-600">
                  <Icons.check className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-2xl font-bold text-ink-900">Got it</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{state.message}</p>
                <Link href="/trademark-filing" className="btn-action mt-6 px-7 py-3.5">
                  How the filing works
                  <Icons.arrow className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={submit} className="space-y-8">
              {questions.map((group) => (
                <Reveal key={group.group} className="space-y-6">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-300">{group.group}</p>
                  {visibleFields(group, answers).map((field) => (
                    <Field key={field.name} field={field} value={answers[field.name]} onChange={setAnswer} />
                  ))}
                </Reveal>
              ))}

              <Reveal className="space-y-5 rounded-3xl bg-slate-50 p-6">
                <p className="text-[15px] font-semibold text-ink-900">How do we reach you?</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="block text-[14px] font-medium text-ink-700">
                      Your name <span className="text-action-600">*</span>
                    </span>
                    <input
                      type="text"
                      name="contactName"
                      autoComplete="name"
                      required
                      value={contact.name}
                      onChange={(e) => setField('name', e.target.value)}
                      className={contactClass}
                    />
                  </label>

                  <label className="block">
                    <span className="block text-[14px] font-medium text-ink-700">
                      Email <span className="text-action-600">*</span>
                    </span>
                    <input
                      type="email"
                      name="contactEmail"
                      autoComplete="email"
                      required
                      value={contact.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className={contactClass}
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="block text-[14px] font-medium text-ink-700">Phone (optional)</span>
                    <input
                      type="tel"
                      name="contactPhone"
                      autoComplete="tel"
                      value={contact.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      className={contactClass}
                    />
                  </label>
                </div>

                {/* Hidden from people, filled in by bots. */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Do not fill this in
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={contact.website}
                      onChange={(e) => setField('website', e.target.value)}
                    />
                  </label>
                </div>

                {state.status === 'error' && (
                  <p className="rounded-2xl bg-action-500/10 px-4 py-3 text-[14px] font-medium text-action-700">
                    {state.message}
                  </p>
                )}

                <button type="submit" disabled={state.status === 'sending'} className="btn-action w-full px-7 py-4">
                  {state.status === 'sending' ? 'Sending your brief...' : 'Send my trademark brief'}
                  <Icons.arrow className="h-5 w-5" />
                </button>

                <p className="text-center text-[13px] leading-relaxed text-ink-500">
                  Sending this does not file anything and is not legal advice. Nothing goes to the USPTO until you have
                  seen the search result and approved the classes and the cost. We never need your social security or
                  tax ID number, so please do not send them. See our{' '}
                  <Link href="/privacy" className="font-medium text-brand-600 hover:underline">
                    privacy policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/terms" className="font-medium text-brand-600 hover:underline">
                    terms
                  </Link>
                  .
                </p>
              </Reveal>
            </form>
          )}
        </div>
      </section>
    </Layout>
  )
}
