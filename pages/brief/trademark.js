import { useMemo, useRef, useState } from 'react'
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
 * A trademark application is not a design brief with different words on it. The
 * USPTO wants specific things, most of them impossible to correct later without
 * refiling: the owner’s exact legal name and entity type, a street domicile
 * address, the mark exactly as it will be used, the goods and services, the
 * filing basis, and dates of first use if the mark is already out there. Get
 * the owner name wrong and the application is void ab initio - it cannot be
 * amended into a different owner - so this form asks for each of those in the
 * words a business owner would use, with the reason underneath.
 *
 * Two things are deliberately *not* asked. Nothing here collects a social
 * security number or an EIN: the USPTO does not require either to register a
 * mark, and an intake form that arrives by email is the wrong place for them.
 * And nothing here is filed on an answer alone - every one of these is checked
 * with the client against their own records before anything goes to the office.
 *
 * The questions live in the array below rather than in the markup so the same
 * list drives the form, the step count and the email the legal desk receives,
 * and a new question is one entry rather than three edits.
 */

const OWNER_TYPES = [
  'Individual person',
  'Sole proprietorship',
  'Corporation',
  'Limited liability company (LLC)',
  'General partnership',
  'Limited partnership',
  'Joint venture',
  'Non-profit or association',
  'Trust or estate',
  'Something else / not sure',
]

/** True when the owner is a kind that has to name its people on the record. */
const isMultiPerson = (a) => /partnership|joint venture/i.test(a.ownerType || '')
const isEntity = (a) => Boolean(a.ownerType) && !/^Individual person$/.test(a.ownerType)
const usesDesign = (a) => /logo|design|together/i.test(a.markType || '')
const isInUse = (a) => /already using/i.test(a.basis || '')
const isIntent = (a) => /not yet/i.test(a.basis || '')
const isForeign = (a) => /foreign/i.test(a.basis || '')

const steps = [
  {
    id: 'mark',
    title: 'The mark itself',
    blurb: 'What exactly you want on the register. Spelling, spacing and capitals all matter here - the registration protects what you write, not what you meant.',
    fields: [
      {
        name: 'markText',
        label: 'Write the mark exactly as you use it',
        type: 'text',
        required: true,
        placeholder: 'Northgate Kitchens',
        help: 'Exact spelling, spacing and punctuation. Leave off “Inc”, “LLC” and “™” unless they are genuinely part of the name you trade under.',
      },
      {
        name: 'markType',
        label: 'What kind of mark is it?',
        type: 'radio',
        required: true,
        options: [
          'Words only (no particular font or colour)',
          'A logo or design only, with no words',
          'Words and a logo together',
          'Something else - a slogan, a sound, a shape',
        ],
        help: 'Words only is the broader protection: it covers the name however it is written. A design registration protects that drawing.',
      },
      {
        name: 'markDesign',
        label: 'Where can we get the logo file?',
        type: 'textarea',
        rows: 2,
        when: usesDesign,
        placeholder: 'Drive link, or “LogoOrbit designed it in March 2026”.',
        help: 'The office needs one clear image of the mark. If we made it, say so and we will pull the file.',
      },
      {
        name: 'markLiteral',
        label: 'Every word, letter or number that appears in the design',
        type: 'text',
        when: usesDesign,
        placeholder: 'NORTHGATE KITCHENS EST. 2009',
        help: 'Including anything small or stylised. This becomes the searchable text on the application.',
      },
      {
        name: 'colourClaim',
        label: 'Do you want the colours to be part of what is registered?',
        type: 'radio',
        when: usesDesign,
        options: [
          'No - register it in black and white (works in any colour)',
          'Yes - the colours are part of the brand',
          'Not sure, advise me',
        ],
        help: 'Black and white is usually the stronger choice. Claiming colour ties the registration to those colours.',
      },
      {
        name: 'colourDetail',
        label: 'Which colours, and on what part of the mark?',
        type: 'textarea',
        rows: 2,
        when: (a) => usesDesign(a) && /^Yes/.test(a.colourClaim || ''),
        placeholder: 'Navy on the lettering, copper on the arch above it.',
      },
      {
        name: 'markMeaning',
        label: 'Does the mark mean anything?',
        type: 'textarea',
        rows: 2,
        placeholder: 'Northgate is the street our first workshop was on. It has no meaning in the kitchen trade.',
        help: 'The office asks whether the wording has a meaning in your industry, in a foreign language, or as a place name or surname.',
      },
      {
        name: 'foreignWording',
        label: 'Any non-English wording in the mark?',
        type: 'textarea',
        rows: 2,
        placeholder: 'None. / “Casa Bella” means “beautiful house” in Italian.',
        help: 'Foreign wording has to be translated on the application, and non-Latin characters transliterated.',
      },
      {
        name: 'livingPerson',
        label: 'Does it contain a person’s name, signature or likeness?',
        type: 'radio',
        options: ['No', 'Yes - a living person', 'Yes - but they are deceased', 'Not sure'],
        help: 'A living person’s name or portrait needs their written consent filed with the application, including your own.',
      },
      {
        name: 'livingPersonDetail',
        label: 'Whose, and can you get their written consent?',
        type: 'textarea',
        rows: 2,
        when: (a) => /^Yes/.test(a.livingPerson || ''),
        placeholder: 'It is my own surname. / My co-founder, and yes.',
      },
    ],
  },
  {
    id: 'owner',
    title: 'Who owns the mark',
    blurb: 'The single most important part of the filing. An application filed in the wrong owner’s name cannot be corrected into the right one - it has to be filed again, fee and all. So this needs to be the exact legal name on the formation documents, not the trading name.',
    fields: [
      {
        name: 'ownerType',
        label: 'Who will own the registration?',
        type: 'select',
        required: true,
        options: OWNER_TYPES,
        help: 'If the business is a company, the company owns it - not you personally. If you have not formed one yet, that is fine, say individual.',
      },
      {
        name: 'ownerLegalName',
        label: 'The owner’s exact legal name',
        type: 'text',
        required: true,
        placeholder: 'Northgate Kitchens LLC / Jordan A. Ellis',
        help: 'Word for word as it appears on the incorporation certificate or on your ID. Not the trading name, unless they are the same.',
      },
      {
        name: 'ownerState',
        label: 'Where is the entity formed?',
        type: 'text',
        when: isEntity,
        placeholder: 'Texas, USA',
        help: 'The state and country the company was incorporated or organised in. It goes on the record.',
      },
      {
        name: 'ownerCitizenship',
        label: 'Country of citizenship',
        type: 'text',
        when: (a) => !isEntity(a) || /sole proprietor/i.test(a.ownerType || ''),
        placeholder: 'United States',
        help: 'Required for an individual owner, and for the person behind a sole proprietorship.',
      },
      {
        name: 'partnersDetail',
        label: 'Every general partner or active member',
        type: 'textarea',
        rows: 3,
        when: isMultiPerson,
        placeholder: 'Jordan Ellis, individual, US citizen. Marchetti Holdings LLC, a Delaware LLC.',
        help: 'A partnership has to name each one on the application, with their own entity type and citizenship.',
      },
      {
        name: 'dba',
        label: 'Trading name, DBA, or a name you used before',
        type: 'text',
        placeholder: 'Trading as Northgate Fitted Kitchens.',
        help: 'Useful for the clearance search even when it does not go on the application.',
      },
      {
        name: 'domicile',
        label: 'The owner’s domicile address',
        type: 'textarea',
        rows: 3,
        required: true,
        placeholder: '1420 Burnet Road, Austin, TX 78756, United States',
        help: 'A street address - the permanent home of an individual, or the principal place of business of a company. The USPTO will not accept a PO box or a mail-forwarding address here, and it does appear on the public record.',
      },
      {
        name: 'mailing',
        label: 'Mailing address, if correspondence goes elsewhere',
        type: 'textarea',
        rows: 2,
        placeholder: 'Leave blank if it is the same as above.',
      },
      {
        name: 'ownerEmail',
        label: 'The owner’s email address',
        type: 'text',
        required: true,
        placeholder: 'owner@northgatekitchens.com',
        help: 'The office requires an owner email separate from any attorney’s, and it becomes part of the public file. A business address is a better idea than a personal one.',
      },
      {
        name: 'ownerPhone',
        label: 'The owner’s phone number',
        type: 'text',
        placeholder: '+1 512 555 0143',
      },
      {
        name: 'outsideUS',
        label: 'Is the owner domiciled outside the United States?',
        type: 'radio',
        required: true,
        options: ['No - US domiciled', 'Yes - outside the US', 'Not sure'],
        help: 'A foreign-domiciled applicant must be represented by a US-licensed attorney. It changes how we run the filing, so we need to know up front.',
      },
      {
        name: 'businessWebsite',
        label: 'Business website',
        type: 'text',
        placeholder: 'https://northgatekitchens.com',
      },
    ],
  },
  {
    id: 'goods',
    title: 'What you sell under it',
    blurb: 'A registration covers particular goods and services in particular classes, not the name in general. This is what we use to work out the classes and the government fee - the fee is charged per class.',
    fields: [
      {
        name: 'goods',
        label: 'List everything you sell or offer under this name',
        type: 'textarea',
        rows: 5,
        required: true,
        placeholder: 'Fitted kitchen installation. Custom cabinet making. We also sell branded worktop oil online.',
        help: 'Be specific and be honest. “Everything” is not a class, and claiming goods you do not actually sell puts the registration at risk later.',
      },
      {
        name: 'classesKnown',
        label: 'Do you already know your class numbers?',
        type: 'text',
        placeholder: 'No idea. / Class 25 and 35, I think.',
        help: 'Most people do not, and that is normal. We work them out and confirm them with you before filing.',
      },
      {
        name: 'plannedGoods',
        label: 'Anything you plan to add in the next year or two',
        type: 'textarea',
        rows: 2,
        placeholder: 'A line of tools, maybe a franchise programme.',
        help: 'Worth covering now if it is real. Adding goods to a live registration means a new application.',
      },
      {
        name: 'channels',
        label: 'Where do customers buy it?',
        type: 'textarea',
        rows: 2,
        placeholder: 'Our website, Amazon, two showrooms in Texas, trade shows.',
        help: 'Selling across state lines or internationally is what makes it “use in commerce” for federal purposes.',
      },
      {
        name: 'territory',
        label: 'Which states or countries do you sell into?',
        type: 'text',
        placeholder: 'Texas and Oklahoma today, nationwide online.',
      },
    ],
  },
  {
    id: 'basis',
    title: 'Are you using it yet?',
    blurb: 'The answer sets the filing basis, and the basis decides what has to be filed with the application and what it costs. Both routes end in the same registration.',
    fields: [
      {
        name: 'basis',
        label: 'Which is true today?',
        type: 'radio',
        required: true,
        options: [
          'Already using the mark to sell to customers',
          'Not yet - but we intend to use it',
          'Based on a foreign application or registration we already hold',
          'Not sure which one we are',
        ],
        help: 'Using it already is Section 1(a) and needs proof of use now. Intent to use is Section 1(b): you file first and prove use later.',
      },
      {
        name: 'firstUseAnywhere',
        label: 'Date you first used the mark anywhere',
        type: 'text',
        when: isInUse,
        required: true,
        placeholder: 'March 2019, or as close as you can get.',
        help: 'The first time you offered the goods or services to the public under this name. A best estimate is fine now, we pin it down before filing.',
      },
      {
        name: 'firstUseCommerce',
        label: 'Date you first used it across a state or national border',
        type: 'text',
        when: isInUse,
        required: true,
        placeholder: 'June 2019, first out-of-state order.',
        help: 'The first interstate or international sale. Often later than the date above, and it is the one the federal filing turns on.',
      },
      {
        name: 'specimen',
        label: 'What proof of use can you show?',
        type: 'textarea',
        rows: 3,
        when: isInUse,
        placeholder: 'Product photos with the label on, our shop page, invoices with the logo.',
        help: 'The office needs a specimen: the mark as customers actually see it. Packaging and labels for goods; a website, advert or brochure for services. A logo on its own is not enough.',
      },
      {
        name: 'specimenUrl',
        label: 'A live URL where the mark appears with the goods or services',
        type: 'text',
        when: isInUse,
        placeholder: 'https://northgatekitchens.com/shop',
        help: 'A web page specimen has to show the mark, the goods, and a way to order.',
      },
      {
        name: 'intentDate',
        label: 'When do you expect to start using it?',
        type: 'text',
        when: isIntent,
        placeholder: 'Launching in about four months.',
        help: 'An intent-to-use filing holds your place from the day it is filed, and you file the proof of use once you launch.',
      },
      {
        name: 'foreignFiling',
        label: 'The foreign application or registration',
        type: 'textarea',
        rows: 3,
        when: isForeign,
        placeholder: 'UK registration UK00003456789, registered 12 May 2025.',
        help: 'Country, number and date. A foreign filing within the last six months may also give you an earlier priority date.',
      },
    ],
  },
  {
    id: 'history',
    title: 'Anything already out there',
    blurb: 'Whatever exists already - yours or somebody else’s - is what the clearance search is looking for. Telling us now is far cheaper than the office telling us in nine months.',
    fields: [
      {
        name: 'priorRegistrations',
        label: 'Trademarks you already own',
        type: 'textarea',
        rows: 2,
        placeholder: 'None. / Reg. 5,432,109 for the old logo.',
        help: 'US or foreign, registered or pending. Owning a related one can help the new application.',
      },
      {
        name: 'priorAttempts',
        label: 'Have you tried to register this before?',
        type: 'textarea',
        rows: 2,
        placeholder: 'Filed in 2023, got a refusal letter, let it lapse.',
        help: 'Including any application that was refused or abandoned. We need to know what the office said last time.',
      },
      {
        name: 'similarMarks',
        label: 'Any similar names you know of in your industry',
        type: 'textarea',
        rows: 2,
        placeholder: 'There is a Northgate Cabinets in Ohio, different owner.',
        help: 'Even a rough recollection is useful. Similar existing marks are the most common reason an application is refused.',
      },
      {
        name: 'disputes',
        label: 'Has anyone challenged your use of this name?',
        type: 'textarea',
        rows: 2,
        placeholder: 'No. / We had a letter from a law firm in 2024.',
        help: 'Cease-and-desist letters, oppositions, domain disputes, anything in court. This does not stop a filing, but it changes how we approach it.',
      },
      {
        name: 'domains',
        label: 'Domains and social handles you hold for this name',
        type: 'textarea',
        rows: 2,
        placeholder: 'northgatekitchens.com, @northgatekitchens on Instagram.',
      },
      {
        name: 'stateRegistrations',
        label: 'State trademark or business registrations',
        type: 'text',
        placeholder: 'Texas assumed name filing, 2019.',
      },
      {
        name: 'foreignPlans',
        label: 'Countries you may want to protect it in later',
        type: 'text',
        placeholder: 'Canada, maybe the UK.',
        help: 'A US filing can be extended abroad within six months at a better priority date, so it is worth saying now.',
      },
    ],
  },
  {
    id: 'signing',
    title: 'Who signs, and what you are confirming',
    blurb: 'The application carries a declaration signed under penalty of perjury. We prepare it, you sign it - so it has to be someone with authority to bind the owner.',
    fields: [
      {
        name: 'signerName',
        label: 'Full legal name of the person who will sign',
        type: 'text',
        required: true,
        placeholder: 'Jordan A. Ellis',
      },
      {
        name: 'signerTitle',
        label: 'Their position, and their authority to sign for the owner',
        type: 'text',
        required: true,
        placeholder: 'Managing Member',
        help: 'An officer, a general partner, or the individual owner. Not an employee without authority.',
      },
      {
        name: 'signerEmail',
        label: 'Their email address, for signing',
        type: 'text',
        required: true,
        placeholder: 'jordan@northgatekitchens.com',
      },
      {
        name: 'attorney',
        label: 'Do you already have a trademark attorney?',
        type: 'radio',
        options: ['No', 'Yes', 'We had one previously'],
      },
      {
        name: 'attorneyDetail',
        label: 'Who, and are they still acting for you?',
        type: 'textarea',
        rows: 2,
        when: (a) => /yes|previously/i.test(a.attorney || ''),
        placeholder: 'Name and firm.',
      },
      {
        name: 'declareTrue',
        label:
          'Everything I have written here is true to the best of my knowledge, and I understand that a wilfully false statement can put the registration at risk.',
        type: 'check',
        required: true,
      },
      {
        name: 'declareOwner',
        label:
          'I have checked the owner name and the domicile address above against our actual legal documents, and they match.',
        type: 'check',
        required: true,
      },
      {
        name: 'declareBelief',
        label:
          'To the best of my knowledge, nobody else has the right to use this mark for these goods or services.',
        type: 'check',
        required: true,
      },
      {
        name: 'declareAuthorise',
        label:
          'I authorise LogoOrbit to run the clearance search and prepare the USPTO application on this information, and I understand nothing is filed until I approve the classes and the total.',
        type: 'check',
        required: true,
      },
    ],
  },
  {
    id: 'contact',
    title: 'How we reach you',
    blurb: 'Last part. The legal desk reads every intake and comes back with the search result, the classes we recommend and the full cost - including the USPTO fee per class - before anything is filed.',
    fields: [
      {
        name: 'timeline',
        label: 'How soon do you need this filed?',
        type: 'select',
        options: [
          'As soon as possible - someone else may be using it',
          'Within a month',
          'Within three months',
          'Just planning ahead',
        ],
      },
      {
        name: 'classCount',
        label: 'How many classes do you think you need?',
        type: 'select',
        options: ['One', 'Two', 'Three or more', 'No idea - tell me'],
        help: 'The government fee is charged per class, so this changes the total. Most first filings are one or two.',
      },
      {
        name: 'notes',
        label: 'Anything else we should know',
        type: 'textarea',
        rows: 3,
        placeholder: 'Anything that did not fit above.',
      },
    ],
  },
]

const totalSteps = steps.length

/** Fields on a step that the current answers actually call for. */
const visibleFields = (step, answers) => step.fields.filter((f) => !f.when || f.when(answers))

const inputClass =
  'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none'

function Field({ field, value, onChange }) {
  const label = (
    <span className="block text-[15px] font-semibold text-ink-900">
      {field.label}
      {field.required && <span className="ml-1 text-action-600">*</span>}
    </span>
  )

  const help = field.help && <span className="mt-1.5 block text-[13px] leading-relaxed text-ink-500">{field.help}</span>

  if (field.type === 'check') {
    return (
      <label className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <input
          type="checkbox"
          name={field.name}
          required={field.required}
          checked={Boolean(value)}
          onChange={(e) => onChange(field.name, e.target.checked)}
          className="mt-1 h-4.5 w-4.5 shrink-0 accent-brand-600"
        />
        <span className="text-[14px] leading-relaxed text-ink-700">
          {field.label}
          {field.required && <span className="ml-1 text-action-600">*</span>}
        </span>
      </label>
    )
  }

  if (field.type === 'radio') {
    return (
      <fieldset className="block">
        <legend className="block text-[15px] font-semibold text-ink-900">
          {field.label}
          {field.required && <span className="ml-1 text-action-600">*</span>}
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

  if (field.type === 'select') {
    return (
      <label className="block">
        {label}
        {help}
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
      </label>
    )
  }

  if (field.type === 'textarea') {
    return (
      <label className="block">
        {label}
        {help}
        <textarea
          name={field.name}
          rows={field.rows || 2}
          required={field.required}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      </label>
    )
  }

  return (
    <label className="block">
      {label}
      {help}
      <input
        type="text"
        name={field.name}
        required={field.required}
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        className={inputClass}
      />
    </label>
  )
}

export default function TrademarkBrief() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [contact, setContact] = useState({ name: '', email: '', phone: '', website: '' })
  const [state, setState] = useState({ status: 'idle', message: '' })
  const top = useRef(null)

  const step = steps[index]
  const isLast = index === totalSteps - 1
  const fields = useMemo(() => visibleFields(step, answers), [step, answers])

  const setAnswer = (name, value) => setAnswers((a) => ({ ...a, [name]: value }))
  const setField = (name, value) => setContact((c) => ({ ...c, [name]: value }))

  const goTo = (next) => {
    setIndex(next)
    // Every step replaces the whole panel, so without this the visitor lands
    // halfway down a form they have not read the top of yet.
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /**
   * Collects the answers in the order they were asked, skipping the questions
   * this particular applicant was never shown.
   */
  const collect = () =>
    steps
      .map((s) => ({
        title: s.title,
        answers: visibleFields(s, answers)
          .map((f) => {
            const value = answers[f.name]
            if (f.type === 'check') return value ? { label: f.label, value: 'Confirmed' } : null
            return value ? { label: f.label, value: String(value) } : null
          })
          .filter(Boolean),
      }))
      .filter((s) => s.answers.length)

  const submit = async (e) => {
    e.preventDefault()

    // Only the current step is in the DOM, so the browser has already validated
    // exactly the required fields on it. Advancing is all that is left to do.
    if (!isLast) return goTo(index + 1)

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
          'Thank you. The legal desk has your intake and will come back within one working day with the clearance search result, the classes we recommend and the total.',
      })
      top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
      description="Answer the questions a USPTO trademark application actually asks - the mark, the legal owner, the goods and services, and whether you are using it yet. The legal desk replies within one working day."
      path="/brief/trademark"
    >
      <PageHero
        eyebrow="Trademark filing"
        title="The questions the USPTO asks."
        highlight="In plain words."
        intro="A trademark application needs specific things, and most of them cannot be fixed after filing. Answer these once and the legal desk runs the clearance search, works out your classes and gives you the total before anything is filed."
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
        <div ref={top} className="mx-auto max-w-3xl px-5 sm:px-6">
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
            <>
              <div className="mb-8">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-300">
                    Step {index + 1} of {totalSteps}
                  </p>
                  <p className="text-[13px] text-ink-500">About 8 minutes</p>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all duration-500"
                    style={{ width: `${((index + 1) / totalSteps) * 100}%` }}
                  />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-ink-900 sm:text-3xl">{step.title}</h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{step.blurb}</p>
              </div>

              <form onSubmit={submit} className="space-y-8" noValidate={false}>
                <div className="space-y-6">
                  {fields.map((field) => (
                    <Field key={field.name} field={field} value={answers[field.name]} onChange={setAnswer} />
                  ))}
                </div>

                {isLast && (
                  <div className="space-y-5 rounded-3xl bg-slate-50 p-6">
                    <p className="text-[15px] font-semibold text-ink-900">Who should we reply to?</p>

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
                          className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 focus:border-brand-400 focus:outline-none"
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
                          className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 focus:border-brand-400 focus:outline-none"
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
                          className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 focus:border-brand-400 focus:outline-none"
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

                    <p className="text-[13px] leading-relaxed text-ink-500">
                      By sending this you agree to our{' '}
                      <Link href="/privacy" className="font-medium text-brand-600 hover:underline">
                        privacy policy
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms" className="font-medium text-brand-600 hover:underline">
                        terms
                      </Link>
                      . We do not need your social security number or EIN to register a trademark, so please do not send
                      them.
                    </p>
                  </div>
                )}

                {state.status === 'error' && (
                  <p className="rounded-2xl bg-action-500/10 px-4 py-3 text-[14px] font-medium text-action-700">
                    {state.message}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {index > 0 ? (
                    <button
                      type="button"
                      onClick={() => goTo(index - 1)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-600"
                    >
                      Back
                    </button>
                  ) : (
                    <span className="hidden sm:block" />
                  )}

                  <button
                    type="submit"
                    disabled={state.status === 'sending'}
                    className="btn-action w-full px-7 py-4 sm:w-auto"
                  >
                    {isLast
                      ? state.status === 'sending'
                        ? 'Sending your brief...'
                        : 'Send my trademark brief'
                      : 'Continue'}
                    <Icons.arrow className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-center text-[13px] leading-relaxed text-ink-500">
                  This is an intake form, not legal advice, and sending it does not file anything or create an
                  attorney-client relationship. Nothing goes to the USPTO until you have seen the search result and
                  approved the classes and the cost.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </Layout>
  )
}
