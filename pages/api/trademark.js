/**
 * Trademark intake endpoint for the USPTO brief at /brief/trademark.
 *
 * This does not reuse /api/contact, even though it is the same shape of job,
 * for one reason: that endpoint clamps the message at 4,000 characters. A
 * filled-in trademark intake runs well past that - the goods and services
 * description alone is often a page - and the truncation there is silent, so
 * the legal desk would receive a brief that simply stopped mid-sentence with
 * nothing to say it had. The answers are also worth keeping grouped by the
 * section they were asked in rather than flattened into one blob, because the
 * desk reads them against the application form in the same order.
 *
 * Configure RESEND_API_KEY and, optionally, TRADEMARK_TO_EMAIL (falling back to
 * BRIEF_TO_EMAIL) and CONTACT_FROM_EMAIL in the deployment environment.
 */

import { deskRecipients } from '../../lib/notify'
import { clientIp, isRateLimited } from '../../lib/ratelimit'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Generous enough for a long goods-and-services list and a page of history,
// small enough that the endpoint is not a place to post a document through.
const MAX_SECTIONS = 12
const MAX_ANSWERS = 90
const MAX_LABEL = 200
const MAX_VALUE = 4000

export const config = { api: { bodyParser: { sizeLimit: '256kb' } } }

const clean = (value, max) => String(value == null ? '' : value).trim().slice(0, max)

/**
 * Normalises the answer groups the form posts.
 *
 * The form decides what is asked and in what order, so the endpoint does not
 * try to know the questions. It only guarantees that what arrives is a list of
 * titled sections holding label/value pairs of a sane size, and drops anything
 * that is neither.
 */
function readSections(raw) {
  if (!Array.isArray(raw)) return []

  const sections = []
  let answersSeen = 0

  for (const section of raw.slice(0, MAX_SECTIONS)) {
    if (!section || typeof section !== 'object') continue

    const answers = []
    for (const answer of Array.isArray(section.answers) ? section.answers : []) {
      if (answersSeen >= MAX_ANSWERS) break
      if (!answer || typeof answer !== 'object') continue

      const label = clean(answer.label, MAX_LABEL)
      const value = clean(answer.value, MAX_VALUE)
      if (!label || !value) continue

      answers.push({ label, value })
      answersSeen += 1
    }

    if (answers.length) sections.push({ title: clean(section.title, MAX_LABEL) || 'Answers', answers })
  }

  return sections
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (isRateLimited(`trademark:${clientIp(req)}`)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again shortly.' })
  }

  const body = req.body || {}

  // Bots commonly fill fields hidden from people; return success without sending.
  if (body.website) return res.status(200).json({ ok: true })

  const name = clean(body.name, 120)
  const email = clean(body.email, 160)
  const phone = clean(body.phone, 40)
  const mark = clean(body.mark, 200)
  const owner = clean(body.owner, 200)
  const sections = readSections(body.sections)

  if (name.length < 2) return res.status(400).json({ error: 'Please tell us your name.' })
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (!mark) return res.status(400).json({ error: 'Please tell us the mark you want to register.' })
  if (!sections.length) return res.status(400).json({ error: 'The form came through empty. Please try again.' })

  const apiKey = process.env.RESEND_API_KEY
  // The legal desk owns the filing, so it is named first here rather than
  // relying on the contact desk to forward it; deskRecipients adds the owner's
  // inbox on top whatever the environment is set to.
  const to = deskRecipients(process.env.TRADEMARK_TO_EMAIL || process.env.BRIEF_TO_EMAIL, [
    'legal@logoorbit.net',
    process.env.CONTACT_TO_EMAIL || 'support@logoorbit.net',
  ])
  const from = process.env.CONTACT_FROM_EMAIL || 'LogoOrbit Website <website@logoorbit.net>'

  if (!apiKey) {
    return res.status(503).json({ error: 'The trademark form is temporarily unavailable. Please call or email us.' })
  }

  // Written out before the send is attempted, so an enquiry is recoverable from
  // the deployment log on a day the mail provider is down rather than lost.
  console.log(`[trademark] intake for "${mark}" from ${name} <${email}>`)

  const lines = [
    `USPTO trademark intake - ${mark}`,
    '',
    `Mark:     ${mark}`,
    owner ? `Owner:    ${owner}` : null,
    `Contact:  ${name}`,
    `Email:    ${email}`,
    `Phone:    ${phone || 'Not provided'}`,
    `Received: ${new Date().toISOString()}`,
  ].filter((line) => line !== null)

  for (const section of sections) {
    lines.push('', '='.repeat(60), section.title.toUpperCase(), '='.repeat(60))
    for (const answer of section.answers) {
      lines.push('', `${answer.label}`, answer.value)
    }
  }

  lines.push(
    '',
    '---',
    'Sent from the USPTO trademark brief at /brief/trademark. Nothing here has',
    'been checked against the register yet - the clearance search comes first.',
  )

  try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New USPTO Trademark Brief - ${mark}${owner ? ` (${owner})` : ''}`,
        text: lines.join('\n'),
      }),
    })

    if (!delivery.ok) {
      console.error('[trademark] email delivery failed', delivery.status)
      return res.status(502).json({ error: 'We could not send your brief. Please call or email us instead.' })
    }
  } catch (error) {
    console.error('[trademark] email delivery threw', error)
    return res.status(502).json({ error: 'We could not send your brief. Please call or email us instead.' })
  }

  return res.status(200).json({ ok: true })
}
