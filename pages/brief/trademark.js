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
 * The line this form walks is between two failures. Ask everything the
 * application asks and nobody finishes it. Ask only the obvious things and the
 * legal desk cannot begin: it writes back with the same eight questions, and
 * the client has to do the work anyway, a week later and one round trip worse
 * off. So the test for a question here is whether counsel can prepare the
 * filing without the answer.
 *
 * That test keeps some questions that look like detail and are not:
 *
 * - The drawing and the colour claim. A design mark is filed as an image, and
 *   whether colour is claimed is decided at filing and cannot be amended
 *   afterwards. Black and white is usually the broader registration, so the
 *   question is asked rather than assumed.
 * - Where the name came from. It is how counsel judges whether the office will
 *   call the mark descriptive, and it carries the translation of any foreign
 *   wording, which is a mandatory statement on the application.
 * - A person's name or likeness in the mark. Section 2(c) refuses those without
 *   written consent, including the applicant's own, and signature and portrait
 *   logos are common enough to be worth one radio button.
 * - Two dates of first use, not one. First use anywhere and first use in
 *   commerce are separate statements on the application and are frequently
 *   months apart; the federal filing turns on the second.
 * - The specimen. A use-based application is refused without one, so it is
 *   better to learn on day one that the only place the mark appears is an
 *   Instagram bio.
 *
 * And it drops things that look essential and are not, because they are
 * decisions counsel makes rather than facts only the client holds: which
 * classes to file in, what to disclaim, which basis to claim where more than
 * one is available, and the declaration with its signatory, which is signed at
 * filing time and not before.
 *
 * Two questions are worth their extra sentence of warning. An application filed
 * in the wrong owner's name is void ab initio and has to be filed again, fee
 * and all, so the legal name asks people to read their own documents rather
 * than type the trading name from memory. And the domicile must be a street
 * address and appears on the public record, which is a surprise worth avoiding.
 *
 * Nothing here asks for a social security or tax ID number. The USPTO does not
 * need either to register a mark, and an intake form that arrives by email is
 * the wrong place to hold them.
 *
 * The questions live in the array below rather than in the markup, so the same
 * list drives the form and the email the legal desk receives. Anything that
 * only applies to some applicants carries a `when`, so a word mark filed on
 * intent to use never shows the drawing, colour, date or specimen questions.
 */

/** The owner kinds that answer for a person rather than for a filed entity. */
const ownerIsPerson = (a) => /individual|sole proprietorship/i.test(a.ownerType || '')
const ownerIsCompany = (a) => /LLC|corporation|partnership/i.test(a.ownerType || '')
const hasDesign = (a) => /logo|design|together/i.test(a.markType || '')
const isInUse = (a) => /^Yes/.test(a.basis || '')
const questions = [
  {
    group: 'The mark',
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
        options: ['Words only', 'A logo or design with no words', 'Words and a logo together'],
        help: 'Words only is the broader protection: it covers the name however it is written. A design registration protects that drawing.',
      },
      {
        name: 'logoFile',
        label: 'Where can we get the logo file, and who made it?',
        type: 'textarea',
        rows: 2,
        required: true,
        when: hasDesign,
        placeholder: 'LogoOrbit designed it in March. / Drive link, our old designer made it in 2021.',
        help: 'The application is filed with one clear image of the mark. If we designed it we will pull the file. If someone else did, we need to know the artwork is yours.',
      },
      {
        name: 'colourClaim',
        label: 'Should the colours be part of what is registered?',
        type: 'radio',
        required: true,
        when: hasDesign,
        options: [
          'No, register it in black and white so it works in any colour',
          'Yes, the colours are part of the brand',
          'Not sure, advise me',
        ],
        help: 'This is decided at filing and cannot be changed afterwards. Black and white is usually the stronger choice, because claiming colour ties the registration to those colours.',
      },
      {
        name: 'markMeaning',
        label: 'Where does the name come from, and does it mean anything?',
        type: 'textarea',
        rows: 2,
        placeholder: 'Northgate is the street our first workshop was on. It means nothing in the kitchen trade.',
        help: 'Include any non-English wording, which has to be translated on the application. This is also how we judge whether the office will call the mark descriptive.',
      },
      {
        name: 'livingPerson',
        label: 'Does the mark contain a person’s name, signature or likeness?',
        type: 'radio',
        options: ['No', 'Yes', 'Not sure'],
        help: 'Including your own. A living person’s name or portrait needs their written consent filed with the application.',
      },
    ],
  },
  {
    group: 'What it covers',
    fields: [
      {
        name: 'goods',
        label: 'What do you sell or offer under it?',
        type: 'textarea',
        rows: 3,
        required: true,
        placeholder: 'Fitted kitchen installation and custom cabinet making. We also sell branded worktop oil online.',
        help: 'Be specific, and only list what you actually sell. This decides your classes, and the government fee is charged per class.',
      },
      {
        name: 'channels',
        label: 'Where do you sell it, and do you cross a state or national border?',
        type: 'textarea',
        rows: 2,
        required: true,
        placeholder: 'Our website nationwide, two showrooms in Texas, some trade customers in Oklahoma.',
        help: 'A federal registration rests on use in commerce, which in practice means selling across a state line or abroad. If you are not trading yet, say where you plan to.',
      },
    ],
  },
  {
    group: 'Who owns it',
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
        help: 'If the business is a company, the company owns the mark rather than you personally.',
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
        name: 'ownerState',
        label: 'Which state or country is the company registered in?',
        type: 'text',
        required: true,
        when: ownerIsCompany,
        placeholder: 'Texas, United States',
        help: 'Where it was incorporated or organised, which is not always where it trades. It goes on the record.',
      },
      {
        name: 'ownerCitizenship',
        label: 'Country of citizenship',
        type: 'text',
        required: true,
        when: ownerIsPerson,
        placeholder: 'United States',
        help: 'The application names the citizenship of an individual owner, or of the person behind a sole proprietorship.',
      },
      {
        name: 'domicile',
        label: 'The owner’s address',
        type: 'textarea',
        rows: 2,
        required: true,
        placeholder: '1420 Burnet Road, Austin, TX 78756, United States',
        help: 'A street address, not a PO box: the home of an individual or the main place of business of a company. The USPTO puts it on the public record, and an owner living outside the US must be represented by a US attorney.',
      },
    ],
  },
  {
    group: 'Are you using it yet?',
    fields: [
      {
        name: 'basis',
        label: 'Are you selling under the mark already?',
        type: 'radio',
        required: true,
        options: ['Yes, we are already selling under it', 'Not yet, but we intend to'],
        help: 'Both routes end in the same registration. Filing before you launch simply holds your place from the day it is filed.',
      },
      {
        name: 'firstUseAnywhere',
        label: 'When did you first use it publicly?',
        type: 'text',
        required: true,
        when: isInUse,
        placeholder: 'March 2019',
        help: 'The first time you offered the goods or services to anyone under this name. A month and year is enough for now.',
      },
      {
        name: 'firstUseCommerce',
        label: 'When did you first sell across a state or national border?',
        type: 'text',
        required: true,
        when: isInUse,
        placeholder: 'June 2019, first out-of-state order.',
        help: 'Usually later than the date above, and it is the one the federal application turns on. If you have never sold outside your state, say so.',
      },
      {
        name: 'specimen',
        label: 'How does the mark appear to customers today?',
        type: 'textarea',
        rows: 2,
        required: true,
        when: isInUse,
        placeholder: 'On the label of every bottle, and on our shop page at northgatekitchens.com/shop.',
        help: 'A use-based application is refused without a specimen: packaging or labels for products, a website, advert or brochure for services. A link is fine. The logo on its own is not enough.',
      },
    ],
  },
  {
    group: 'Anything already out there',
    fields: [
      {
        name: 'priorMarks',
        label: 'Trademarks you already own, or have tried to register',
        type: 'textarea',
        rows: 2,
        placeholder: 'None. / Reg. 5,432,109 for the old logo. We filed this one in 2023 and got a refusal.',
        help: 'US or foreign, registered, pending, refused or abandoned. A refusal last time tells us what to do differently.',
      },
      {
        name: 'conflicts',
        label: 'Anyone else using a similar name, or any letters or disputes?',
        type: 'textarea',
        rows: 2,
        placeholder: 'There is a Northgate Cabinets in Ohio, different owner. No letters.',
        help: 'Cease-and-desist letters, oppositions, a competitor with a close name. A similar existing mark is the most common reason an application is refused, so this is what the clearance search hunts for.',
      },
      {
        name: 'notes',
        label: 'Anything else we should know?',
        type: 'textarea',
        rows: 2,
        placeholder: 'We are launching in September and would like it filed before then.',
        help: 'Optional. A deadline, a launch date, or countries you may want to protect it in later.',
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
      description="The trademark brief: the mark and its drawing, what you sell under it, who legally owns it, your dates of first use and anything already on the register. The legal desk replies within one working day with the clearance search and the total."
      path="/brief/trademark"
    >
      <PageHero
        eyebrow="Trademark filing"
        title="Tell us the essentials."
        highlight="We do the rest."
        intro="One page, about five minutes. These are the questions counsel cannot prepare a filing without. The classes, the wording and the strategy are ours to work out, and you get them back with the search result and the total."
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
