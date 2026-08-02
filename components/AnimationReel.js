import { useState } from 'react'
import Link from 'next/link'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons } from './Icons'

/**
 * The animation reel.
 *
 * Six marks drawn and animated in-house, in SVG rather than video, so the
 * section costs a few kilobytes instead of six MP4s and stays sharp on any
 * screen. Each one demonstrates a different technique we sell, because
 * "logo animation" means very little until you have seen a mark draw itself.
 *
 * These are our own concept marks, not client work, and they are captioned
 * as such. Every tile is a finished logo with the animation stripped out,
 * see the base states in globals.css, so nothing here depends on motion.
 */

const dash = (len) => ({ strokeDasharray: len, '--len': len })

function Orbit() {
  return (
    <svg viewBox="0 0 120 120" className="la-svg h-full w-full" role="img" aria-label="Orbit Labs mark">
      <circle
        className="la-draw"
        cx="60" cy="60" r="38"
        fill="none" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round"
        transform="rotate(-90 60 60)"
        style={dash(239)}
      />
      <circle className="la-pop" cx="60" cy="60" r="15" fill="#2563eb" style={{ animationDelay: '0.55s' }} />
      <g className="la-orbit">
        <circle cx="60" cy="22" r="7" fill="#f97316" />
      </g>
    </svg>
  )
}

function Vertex() {
  return (
    <svg viewBox="0 0 120 120" className="la-svg h-full w-full" role="img" aria-label="Vertex Outdoors mark">
      <path
        className="la-draw"
        d="M20 88 L46 46 L64 70 L86 34"
        fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
        style={dash(126)}
      />
      <path
        className="la-draw"
        d="M16 100 H104"
        fill="none" stroke="#93c5fd" strokeWidth="7" strokeLinecap="round"
        style={{ ...dash(88), animationDelay: '0.7s' }}
      />
      <circle className="la-pop" cx="96" cy="30" r="8" fill="#f59e0b" style={{ animationDelay: '1s' }} />
    </svg>
  )
}

function Prism() {
  return (
    <svg viewBox="0 0 120 120" className="la-svg h-full w-full" role="img" aria-label="Prism Studio mark">
      <path className="la-in-top" d="M60 18 L96 39 L60 60 L24 39 Z" fill="#fdba74" />
      <path className="la-in-left" d="M24 39 L60 60 L60 102 L24 81 Z" fill="#f97316" style={{ animationDelay: '0.18s' }} />
      <path className="la-in-right" d="M96 39 L96 81 L60 102 L60 60 Z" fill="#ea580c" style={{ animationDelay: '0.36s' }} />
    </svg>
  )
}

function Beacon() {
  return (
    <svg viewBox="0 0 120 120" className="la-svg h-full w-full" role="img" aria-label="Beacon Signal mark">
      {[0, 1.05, 2.1].map((d) => (
        <circle
          key={d}
          className="la-ring"
          cx="60" cy="60" r="44"
          fill="none" stroke="#f59e0b" strokeWidth="5"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
      <path
        className="la-draw"
        d="M34 78 A 34 34 0 0 1 86 78"
        fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round"
        style={dash(90)}
      />
      <path
        className="la-draw"
        d="M46 88 A 18 18 0 0 1 74 88"
        fill="none" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round"
        style={{ ...dash(48), animationDelay: '0.35s' }}
      />
      <circle className="la-pop" cx="60" cy="94" r="8" fill="#f97316" style={{ animationDelay: '0.75s' }} />
    </svg>
  )
}

function Vital() {
  return (
    <svg viewBox="0 0 120 120" className="la-svg h-full w-full" role="img" aria-label="Vital Health mark">
      <rect className="la-fade-up" x="8" y="8" width="104" height="104" rx="30" fill="none" stroke="#d1fae5" strokeWidth="7" />
      <path
        className="la-trace"
        d="M22 60 H44 L52 38 L62 84 L72 56 L80 60 H98"
        fill="none" stroke="#10b981" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
        style={dash(150)}
      />
    </svg>
  )
}

function Momentum() {
  return (
    <svg viewBox="0 0 120 120" className="la-svg h-full w-full" role="img" aria-label="Momentum Freight mark">
      <rect className="la-slide" x="16" y="30" width="42" height="11" rx="5.5" fill="#93c5fd" />
      <rect className="la-slide" x="16" y="54" width="58" height="11" rx="5.5" fill="#2563eb" style={{ animationDelay: '0.12s' }} />
      <rect className="la-slide" x="16" y="78" width="30" height="11" rx="5.5" fill="#bfdbfe" style={{ animationDelay: '0.24s' }} />
      <path
        className="la-draw"
        d="M78 26 L102 60 L78 94"
        fill="none" stroke="#f97316" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"
        style={{ ...dash(84), animationDelay: '0.4s' }}
      />
    </svg>
  )
}

const reel = [
  {
    id: 'orbit',
    Mark: Orbit,
    name: 'Orbit Labs',
    technique: 'Draw-on build',
    note: 'The ring draws itself, the core lands, and a satellite keeps turning after the build finishes.',
    use: 'Website headers',
  },
  {
    id: 'vertex',
    Mark: Vertex,
    name: 'Vertex Outdoors',
    technique: 'Line draw',
    note: 'A single-stroke mark drawn in the order a pen would draw it. The cleanest option for a monoline logo.',
    use: 'Video intros',
  },
  {
    id: 'prism',
    Mark: Prism,
    name: 'Prism Studio',
    technique: 'Assemble',
    note: 'Each face flies in and locks into place, which reads as something being built rather than revealed.',
    use: 'Social posts',
  },
  {
    id: 'beacon',
    Mark: Beacon,
    name: 'Beacon Signal',
    technique: 'Signal pulse',
    note: 'The mark builds once, then broadcasts on a loop, so the logo never sits completely still on a page.',
    use: 'App splash screens',
  },
  {
    id: 'vital',
    Mark: Vital,
    name: 'Vital Health',
    technique: 'Looping trace',
    note: 'The trace draws, holds, and clears itself. Best where a logo has to stay alive on screen for minutes.',
    use: 'Reception screens',
  },
  {
    id: 'momentum',
    Mark: Momentum,
    name: 'Momentum Freight',
    technique: 'Kinetic stagger',
    note: 'Elements arrive on a beat instead of together, which is what makes an animation feel deliberate.',
    use: 'YouTube outros',
  },
]

function Tile({ item, index }) {
  // Remounting the artwork is what replays a CSS animation, so the button
  // simply changes the key rather than reaching into the DOM.
  const [run, setRun] = useState(0)
  const { Mark } = item

  return (
    <Reveal delay={(index % 3) * 90} className="h-full">
      <figure className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-900/10">
        <div className="relative grid aspect-[4/3] place-items-center bg-gradient-to-b from-slate-50 to-white px-6 py-7">
          <div key={run} className="flex h-full w-full flex-col items-center justify-center">
            <div className="h-24 w-24 sm:h-28 sm:w-28">
              <Mark />
            </div>
            <p
              className="la-wipe mt-4 text-[15px] font-bold uppercase tracking-[0.18em] text-ink-900"
              style={{ animationDelay: '1.25s' }}
            >
              {item.name}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRun(run + 1)}
            aria-label={`Play the ${item.name} animation again`}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-ink-500 opacity-0 shadow-sm ring-1 ring-slate-200 transition-all hover:text-brand-600 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <Icons.play className="h-3.5 w-3.5" />
            Replay
          </button>
        </div>

        <figcaption className="flex flex-1 flex-col border-t border-slate-100 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-ink-900">{item.technique}</p>
            <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-600">
              {item.use}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{item.note}</p>
        </figcaption>
      </figure>
    </Reveal>
  )
}

export default function AnimationReel({ showHeading = true }) {
  return (
    <section id="logo-animation" className="scroll-mt-28 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {showHeading && (
          <SectionHeading
            eyebrow="Logo animation"
            title="The same mark, but"
            highlight="in motion"
            body="Six concept marks our team drew and animated to show the styles we build in. Hover a tile and hit replay to watch the build again."
          />
        )}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reel.map((item, i) => (
            <Tile key={item.id} item={item} index={i} />
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-[15px] text-ink-500">
            These are our own concept marks, made to demonstrate the techniques. Client animations stay private
            until the client launches them.
          </p>
          <Link href="/animation" className="btn-action px-7 py-4">
            See logo animation packages
            <Icons.arrow className="h-5 w-5" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
