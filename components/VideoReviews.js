import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons, Star } from './Icons'
import { videoReviews } from '../lib/videoReviews'

/**
 * Filmed client reviews.
 *
 * Four clients recorded themselves talking about their projects. The clips are
 * vertical, so they sit four across as 9:16 tiles rather than in a landscape
 * player that would letterbox them into a stripe.
 *
 * Nothing is downloaded up front. Each tile asks only for metadata, and the
 * `#t=` fragment on the source makes the browser seek to a frame and paint it
 * as the still, which is where the thumbnail comes from: a real frame of the
 * clip rather than a separate poster file to keep in sync. The same trick
 * supplies the reviewer's face, a second video element parked on that frame
 * and cropped to the head inside a circle.
 *
 * Hover plays the clip in place, muted, and leaving rewinds it. Hover does not
 * exist on a phone, so there the tile that is centred in the viewport plays
 * instead. Either way a click opens the full clip with sound and controls,
 * because a muted preview is not a review anyone can actually hear.
 */

/** Where in each clip the face is framed well enough to freeze on. */
const FRAME = 1.2

const src = (v, t = FRAME) => `${v.src}#t=${t}`

function Avatar({ item, className = '' }) {
  // The head sits in the upper third of a vertical talking-head shot, so the
  // frame is scaled up and pushed down to bring it into the circle.
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full bg-white/10 ${className}`}>
      <video
        src={src(item, item.headshot ?? FRAME)}
        className="absolute left-1/2 top-1/2 h-[230%] w-[230%] -translate-x-1/2 -translate-y-[38%] object-cover"
        preload="metadata"
        muted
        playsInline
        tabIndex={-1}
        aria-hidden="true"
      />
    </span>
  )
}

function Tile({ item, index, muted, onToggleMute, onOpen }) {
  const videoRef = useRef(null)
  const wrapRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const play = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    el.play().then(() => setPlaying(true)).catch(() => {})
  }, [])

  const stop = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    el.pause()
    el.currentTime = FRAME
    setPlaying(false)
  }, [])

  // Touch screens have no hover, so the tile nearest the middle of the screen
  // is the one that plays. A coarse-pointer check keeps this off desktops,
  // where four clips playing at once would be a mess.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: none)').matches) return
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : stop()),
      { threshold: 0.75 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [play, stop])

  return (
    <Reveal delay={index * 80} className="h-full">
      <div
        ref={wrapRef}
        className="group relative h-full overflow-hidden rounded-3xl bg-ink-900 ring-1 ring-white/12 transition-all duration-300 hover:-translate-y-1.5 hover:ring-orbit-400/60 hover:shadow-2xl hover:shadow-black/40"
        onMouseEnter={play}
        onMouseLeave={stop}
      >
        <div className="relative aspect-[9/16] w-full">
          <video
            ref={videoRef}
            src={src(item)}
            className="h-full w-full object-cover"
            preload="metadata"
            muted={muted}
            playsInline
            loop
          />

          {/* Legibility for the caption, and a hint that there is a video
              under here before anyone has hovered anything. */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/35 to-transparent"
            aria-hidden="true"
          />

          {!playing && (
            <span
              className="pointer-events-none absolute left-1/2 top-[38%] grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center sm:h-14 sm:w-14 rounded-full bg-white/90 text-brand-700 shadow-xl transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              <Icons.play className="ml-0.5 h-6 w-6" />
            </span>
          )}


          {/* One button over the whole tile, so the caption is clickable too
              without nesting anything inside it. */}
          <button
            type="button"
            onClick={() => onOpen(index)}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Watch ${item.name}'s full review`}
          />

          <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white/80 backdrop-blur-sm">
            {item.length}
          </span>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Unmute the reviews' : 'Mute the reviews'}
            aria-pressed={!muted}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:bg-black/70"
          >
            {muted ? <Icons.muted className="h-4 w-4" /> : <Icons.sound className="h-4 w-4" />}
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
            <div className="flex items-center gap-2.5">
              <Avatar item={item} className="h-10 w-10 ring-1 ring-white/30" />
              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold leading-tight text-white">{item.name}</p>
                <p className="truncate text-[12px] text-white/65">{item.company}</p>
              </div>
            </div>

            <div className="mt-2.5 flex text-flare-300">
              {[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-3.5 w-3.5" />)}
            </div>
            <p className="mt-1.5 text-[13.5px] font-semibold leading-snug text-white">{item.title}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function Lightbox({ item, onClose, onStep }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose, onStep])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name}'s review`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-5xl flex-col gap-5 overflow-y-auto lg:flex-row lg:items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          key={item.id}
          src={item.src}
          className="mx-auto max-h-[72vh] w-auto rounded-2xl bg-black lg:max-h-[80vh]"
          controls
          autoPlay
          playsInline
          preload="auto"
        />

        <div className="lg:max-w-sm">
          <div className="flex items-center gap-3">
            <Avatar item={item} className="h-12 w-12 ring-1 ring-white/25" />
            <div className="min-w-0">
              <p className="font-semibold text-white">{item.name}</p>
              <p className="text-sm text-white/60">{item.role}</p>
            </div>
          </div>
          <h3 className="mt-4 text-xl font-bold leading-snug text-white">{item.title}</h3>
          <p className="mt-1.5 text-[14px] text-white/60">{item.strap}</p>
          <blockquote className="mt-4 border-l-2 border-orbit-400/70 pl-4 text-[15px] leading-relaxed text-white/85">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-[11.5px] font-semibold text-white/75">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close the review"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/25"
      >
        <Icons.close className="h-5 w-5" />
      </button>
    </div>
  )
}

export default function VideoReviews() {
  const [muted, setMuted] = useState(true)
  const [open, setOpen] = useState(null)

  const step = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + videoReviews.length) % videoReviews.length)),
    []
  )

  return (
    <section id="video-reviews" className="scroll-mt-28 bg-gradient-to-b from-ink-900 to-[#111d3b] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          light
          eyebrow="Video reviews"
          title="Real clients, on camera,"
          highlight="in their own words"
          body="Four people who hired us recorded what they came for and what they got back. They play as you go, the speaker turns the sound on, and a click opens the whole thing."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {videoReviews.map((v, i) => (
            <Tile
              key={v.id}
              item={v}
              index={i}
              muted={muted}
              onToggleMute={() => setMuted((m) => !m)}
              onOpen={setOpen}
            />
          ))}
        </div>

        <Reveal className="mt-9 flex flex-col items-center gap-3 text-center">
          <p className="text-[15px] text-white/60">
            Recorded by the clients themselves once their projects had shipped.
          </p>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-orbit-300 hover:text-white"
          >
            Read all client reviews
            <Icons.arrow className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      {open !== null && (
        <Lightbox item={videoReviews[open]} onClose={() => setOpen(null)} onStep={step} />
      )}
    </section>
  )
}
