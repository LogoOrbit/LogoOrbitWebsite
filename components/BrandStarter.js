import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Icons } from './Icons'
import LogoMark from './LogoMark'

/**
 * Brand Starter, the entry bar on the home page.
 *
 * The visitor picks Logo or Website, types a name, answers three short
 * questions, then watches a concept "generate". The result is a real
 * composition built from their own answers, deliberately held behind a
 * blur: enough to prove we understood the brief, not enough to take away.
 * The only way past the blur is talking to us.
 */

const palettes = [
  { id: 'ocean', label: 'Cool & trustworthy', bg: '#0b2f6b', fg: '#bfdbfe', dot: '#2563eb' },
  { id: 'ember', label: 'Warm & energetic', bg: '#7c2d12', fg: '#fed7aa', dot: '#f97316' },
  { id: 'forest', label: 'Natural & calm', bg: '#064e3b', fg: '#a7f3d0', dot: '#059669' },
  { id: 'violet', label: 'Creative & bold', bg: '#3b0764', fg: '#ddd6fe', dot: '#8b5cf6' },
  { id: 'mono', label: 'Minimal & premium', bg: '#0b1733', fg: '#e2e8f0', dot: '#0b1733' },
]

const shapes = ['orbit', 'hex', 'leaf', 'wave', 'shield', 'peak', 'drop', 'cube', 'ring', 'bolt', 'bloom', 'arch']

/* Stable pseudo-random pick, so the same name always returns the same
   concept, a second run must not look like a slot machine. */
function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

function initials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return 'LO'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

const flows = {
  logo: {
    label: 'Logo',
    icon: 'logo',
    placeholder: 'Enter your logo name…',
    nameLabel: 'What should your logo say?',
    nameHint: 'Your business or brand name, exactly how you want it written.',
    action: 'Create My Logo',
    building: 'Designing your logo',
    steps: [
      {
        key: 'tagline',
        question: 'Add a slogan?',
        hint: 'A short line that sits under the mark. You can skip this.',
        type: 'text',
        placeholder: 'e.g. Built to last',
        optional: true,
      },
      {
        key: 'industry',
        question: 'What industry are you in?',
        type: 'choice',
        options: ['Technology', 'Health & Wellness', 'Food & Drink', 'Real Estate', 'Retail & E-commerce', 'Professional Services', 'Creative & Media', 'Something else'],
      },
      {
        key: 'style',
        question: 'Which style feels like you?',
        type: 'choice',
        options: ['Modern & minimal', 'Classic & timeless', 'Playful & friendly', 'Luxury & elegant', 'Bold & industrial', 'Hand-crafted'],
      },
      {
        key: 'palette',
        question: 'Pick a colour mood',
        type: 'palette',
      },
    ],
  },
  website: {
    label: 'Website',
    icon: 'website',
    placeholder: 'Enter your website name…',
    nameLabel: 'What is your website called?',
    nameHint: 'The name that will sit top-left on every page.',
    action: 'Create My Website',
    building: 'Building your homepage',
    steps: [
      {
        key: 'tagline',
        question: 'Add a headline?',
        hint: 'The one line visitors read first. You can skip this.',
        type: 'text',
        placeholder: 'e.g. Same-day delivery, city-wide',
        optional: true,
      },
      {
        key: 'industry',
        question: 'What is the site for?',
        type: 'choice',
        options: ['Business & services', 'Online store', 'Restaurant & café', 'Portfolio', 'Booking & appointments', 'Startup landing page', 'Blog & content', 'Something else'],
      },
      {
        key: 'style',
        question: 'How should it feel?',
        type: 'choice',
        options: ['Clean & modern', 'Warm & welcoming', 'Corporate & solid', 'Bold & editorial', 'Luxury & minimal', 'Fun & colourful'],
      },
      {
        key: 'palette',
        question: 'Pick a colour mood',
        type: 'palette',
      },
    ],
  },
}

const buildStages = [
  'Reading your brief',
  'Sketching concepts',
  'Balancing the composition',
  'Setting type and spacing',
  'Rendering your preview',
]

export default function BrandStarter() {
  const [mode, setMode] = useState('logo')
  const [step, setStep] = useState(0) // 0 = the name bar, 1..4 = questions
  const [phase, setPhase] = useState('form') // form | building | done
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState({})
  const [text, setText] = useState('')
  const [stage, setStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const timers = useRef([])
  const panelRef = useRef(null)

  const flow = flows[mode]
  const steps = flow.steps
  const current = step === 0 ? null : steps[step - 1]
  const totalSteps = steps.length + 1

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const reset = (nextMode) => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setMode(nextMode)
    setStep(0)
    setPhase('form')
    setAnswers({})
    setText('')
    setStage(0)
    setProgress(0)
  }

  const goTo = (next) => {
    setStep(next)
    setText('')
    /* Keep the panel in view as it grows on small screens. */
    if (panelRef.current && typeof window !== 'undefined' && window.innerWidth < 640) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const submitName = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    goTo(1)
  }

  const answer = (key, value) => {
    setAnswers((a) => ({ ...a, [key]: value }))
    if (step < steps.length) goTo(step + 1)
    else build()
  }

  const build = () => {
    setPhase('building')
    setStage(0)
    setProgress(0)

    buildStages.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStage(i), i * 900))
    })
    /* Progress runs slightly ahead of the stage labels so the bar never
       looks stalled between them. */
    let p = 0
    const tick = setInterval(() => {
      p = Math.min(100, p + 2)
      setProgress(p)
      if (p >= 100) clearInterval(tick)
    }, 90)
    timers.current.push(setTimeout(() => {
      clearInterval(tick)
      setProgress(100)
      setPhase('done')
    }, 4600))
  }

  const seed = hash(name.trim().toLowerCase() || 'logoorbit')
  const palette = palettes.find((p) => p.label === answers.palette) || palettes[seed % palettes.length]
  const shape = shapes[seed % shapes.length]
  const display = name.trim() || 'Your Brand'

  const brief = [
    `${flow.label} brief from the ${flow.label.toLowerCase()} builder`,
    `Name: ${display}`,
    answers.tagline ? `${mode === 'logo' ? 'Slogan' : 'Headline'}: ${answers.tagline}` : null,
    answers.industry ? `Industry: ${answers.industry}` : null,
    answers.style ? `Style: ${answers.style}` : null,
    answers.palette ? `Colour mood: ${answers.palette}` : null,
    '',
    'Please send me the full-resolution preview.',
  ]
    .filter(Boolean)
    .join('\n')

  const contactHref = `/contact?service=${encodeURIComponent(
    mode === 'logo' ? 'Logo Design' : 'Website Design'
  )}&brief=${encodeURIComponent(brief)}#contact`

  const field =
    'w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-[16px] text-ink-900 placeholder:text-ink-300 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10'

  return (
    <section id="start" className="relative -mt-10 pb-20 sm:pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div
          ref={panelRef}
          className="relative rounded-[2rem] bg-white p-6 sm:p-9 shadow-2xl shadow-brand-950/15 ring-1 ring-slate-100"
        >
          <div
            className="absolute -inset-px rounded-[2rem] bg-gradient-to-r from-brand-500/20 via-orbit-500/20 to-action-500/20 blur-lg -z-10"
            aria-hidden="true"
          />

          {/* ---- What are we making? ---- */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
                Start free
              </span>
              <h2 className="mt-2 text-2xl sm:text-[1.75rem] font-bold text-ink-900">
                Make your {flow.label.toLowerCase()} in under a minute
              </h2>
            </div>

            <div
              className="inline-flex shrink-0 rounded-full bg-slate-100 p-1"
              role="tablist"
              aria-label="What do you want to create?"
            >
              {Object.entries(flows).map(([key, f]) => {
                const Icon = Icons[f.icon]
                const active = mode === key
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => reset(key)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                      active ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-900'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {f.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ---- Progress ---- */}
          {phase === 'form' && (
            <div className="mt-6 flex items-center gap-2" aria-hidden="true">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i <= step ? 'bg-brand-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          )}

          {/* ---- Step 0: the bar ---- */}
          {phase === 'form' && step === 0 && (
            <form onSubmit={submitName} className="mt-6">
              <label htmlFor="starter-name" className="block text-lg font-semibold text-ink-900">
                {flow.nameLabel}
              </label>
              <p className="mt-1 text-sm text-ink-500">{flow.nameHint}</p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  id="starter-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={flow.placeholder}
                  maxLength={40}
                  autoComplete="organization"
                  className={`${field} sm:text-lg`}
                />
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="group btn-action shrink-0 px-7 py-4 text-[16px] disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0"
                >
                  Continue
                  <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <p className="mt-4 text-sm text-ink-500">
                Free to try · No card, no signup · {(8503).toLocaleString()} brands started here
              </p>
            </form>
          )}

          {/* ---- Steps 1..n ---- */}
          {phase === 'form' && current && (
            <div className="mt-6" key={current.key}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-300">
                Step {step + 1} of {totalSteps} · {display}
              </p>
              <h3 className="mt-2 text-lg sm:text-xl font-semibold text-ink-900">{current.question}</h3>
              {current.hint && <p className="mt-1 text-sm text-ink-500">{current.hint}</p>}

              {current.type === 'text' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    answer(current.key, text.trim())
                  }}
                  className="mt-4 flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={current.placeholder}
                    maxLength={60}
                    autoFocus
                    className={field}
                  />
                  <div className="flex gap-3">
                    <button type="submit" className="btn-action shrink-0 px-6 py-4">
                      Next
                    </button>
                    {current.optional && (
                      <button
                        type="button"
                        onClick={() => answer(current.key, '')}
                        className="shrink-0 rounded-2xl px-6 py-4 font-semibold text-ink-500 hover:text-ink-900 hover:bg-slate-50 transition-colors"
                      >
                        Skip
                      </button>
                    )}
                  </div>
                </form>
              )}

              {current.type === 'choice' && (
                <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                  {current.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => answer(current.key, option)}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-5 py-3.5 text-left text-[15px] font-medium text-ink-700 transition-all hover:border-brand-400 hover:bg-brand-50/50 hover:text-ink-900"
                    >
                      {option}
                      <Icons.arrow className="w-4.5 h-4.5 shrink-0 text-ink-300 transition-all group-hover:text-brand-600 group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              )}

              {current.type === 'palette' && (
                <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                  {palettes.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => answer(current.key, p.label)}
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3.5 text-left text-[15px] font-medium text-ink-700 transition-all hover:border-brand-400 hover:bg-brand-50/50 hover:text-ink-900"
                    >
                      <span
                        className="grid place-items-center w-10 h-10 shrink-0 rounded-xl"
                        style={{ backgroundColor: p.bg, color: p.fg }}
                      >
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: p.fg }} />
                      </span>
                      {p.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors"
                >
                  ← Back
                </button>
                {step === steps.length && (
                  <span className="text-sm text-ink-300">Last one, then we build it</span>
                )}
              </div>
            </div>
          )}

          {/* ---- Building ---- */}
          {phase === 'building' && (
            <div className="mt-8 pb-2" aria-live="polite">
              <div className="relative mx-auto grid place-items-center h-56 w-full max-w-sm overflow-hidden rounded-3xl bg-slate-50">
                <div className="absolute inset-0 shimmer-sweep" aria-hidden="true" />
                <div
                  className="grid place-items-center w-32 h-32 rounded-3xl animate-forming"
                  style={{ backgroundColor: palette.bg, color: palette.fg }}
                >
                  <LogoMark shape={shape} className="w-20 h-20" />
                </div>
                <p
                  className="absolute bottom-8 text-xl font-bold tracking-[0.18em] animate-forming"
                  style={{ color: palette.bg }}
                >
                  {display.toUpperCase()}
                </p>
              </div>

              <p className="mt-6 text-center text-[15px] font-semibold text-ink-900">
                {flow.building}, {buildStages[stage]}…
              </p>
              <div className="mt-3 mx-auto max-w-sm h-2 rounded-full bg-slate-100 overflow-hidden">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-orbit-500 transition-[width] duration-200 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-center text-sm text-ink-500">{progress}%</p>
            </div>
          )}

          {/* ---- Result: blurred on purpose ---- */}
          {phase === 'done' && (
            <div className="mt-7 grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-7 items-center">
              <div className="relative overflow-hidden rounded-3xl bg-slate-100 ring-1 ring-slate-200">
                <div className="blur-[8px] scale-[1.06] select-none pointer-events-none" aria-hidden="true">
                  {mode === 'logo' ? (
                    <div
                      className="grid place-items-center h-64 px-6"
                      style={{ backgroundColor: palette.bg, color: palette.fg }}
                    >
                      <LogoMark shape={shape} className="w-24 h-24" />
                      <p className="mt-4 text-2xl font-bold tracking-[0.2em] text-center">
                        {display.toUpperCase()}
                      </p>
                      {answers.tagline && (
                        <p className="mt-1.5 text-xs tracking-[0.3em] uppercase opacity-80 text-center">
                          {answers.tagline}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="h-64 bg-white">
                      <div
                        className="flex items-center justify-between px-5 py-3"
                        style={{ backgroundColor: palette.bg, color: palette.fg }}
                      >
                        <span className="flex items-center gap-2 text-sm font-bold tracking-wider">
                          <LogoMark shape={shape} className="w-5 h-5" />
                          {display.toUpperCase()}
                        </span>
                        <span className="flex gap-2 text-[10px]">
                          <span>Home</span><span>Services</span><span>About</span><span>Contact</span>
                        </span>
                      </div>
                      <div className="px-5 py-5" style={{ color: palette.bg }}>
                        <p className="text-lg font-bold leading-tight">
                          {answers.tagline || `${display}, built for what you do next`}
                        </p>
                        <span
                          className="mt-3 inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold text-white"
                          style={{ backgroundColor: palette.dot }}
                        >
                          Get started
                        </span>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {[0, 1, 2].map((i) => (
                            <span key={i} className="h-14 rounded-lg bg-slate-100 block" />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 grid place-items-center bg-ink-900/25">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink-900 shadow-lg">
                    <Icons.shield className="w-4.5 h-4.5 text-brand-600" />
                    Preview locked
                  </span>
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-trust-50 px-3.5 py-1.5 text-sm font-semibold text-trust-700">
                  <Icons.check className="w-4 h-4" />
                  {mode === 'logo' ? 'Concept ready' : 'Homepage ready'}
                </span>
                <h3 className="mt-3 text-xl sm:text-2xl font-bold text-ink-900">
                  Your {flow.label.toLowerCase()} for {display} is done
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                  A designer has your brief and the first concept is rendered. We keep previews blurred
                  until we&apos;ve spoken, that way nothing goes out with the wrong spelling, the wrong
                  colours, or into the wrong hands. Say hello and we&apos;ll send the full-resolution
                  files over.
                </p>

                <ul className="mt-4 space-y-1.5 text-sm text-ink-500">
                  {[
                    'Full-resolution, unblurred preview',
                    'Vector source files; logo copyright certificate available separately',
                    'Unlimited revisions until it is right',
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <Icons.check className="w-4.5 h-4.5 shrink-0 mt-0.5 text-trust-600" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <Link href={contactHref} className="group mt-6 btn-action w-full px-7 py-4 text-[16px]">
                  Contact Us To Unlock Preview
                  <Icons.arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={() => reset(mode)}
                  className="mt-3 w-full rounded-full px-6 py-3 text-sm font-medium text-ink-500 hover:text-ink-900 hover:bg-slate-50 transition-colors"
                >
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
