import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Reveal from './Reveal'
import { Icons, Star } from './Icons'
import { videoReviews } from '../lib/videoReviews'

/**
 * Filmed client reviews.
 *
 * One large player with the other clips listed beside it, rather than a row of
 * four small videos: a talking head at a quarter of the screen is unwatchable,
 * and four autoplaying files would cost a phone user several megabytes before
 * they had asked for anything.
 *
 * So nothing is fetched until a play button is pressed. Until then each clip is
 * a still card carrying the reviewer, the business and the line they actually
 * said, which means the section works fully with the video never loaded at all.
 */

const tint = [
  'from-brand-600 to-orbit-600',
  'from-orbit-600 to-brand-700',
  'from-action-500 to-brand-600',
  'from-trust-600 to-brand-600',
]

function Monogram({ name, className = '' }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full font-bold ${className}`}>
      {name.charAt(0)}
    </span>
  )
}

export default function VideoReviews() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const current = videoReviews[active]

  // Changing clip drops back to the still card, so a half-watched review is
  // never left running behind the one that just replaced it.
  useEffect(() => {
    setPlaying(false)
  }, [active])

  useEffect(() => {
    if (playing && videoRef.current) videoRef.current.play().catch(() => {})
  }, [playing])

  return (
    <section id="video-reviews" className="scroll-mt-28 bg-gradient-to-b from-ink-900 to-[#111d3b] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-orbit-400">
            <Icons.play className="h-3.5 w-3.5" />
            Video reviews
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-[2.75rem]">
            Real clients, on camera,{' '}
            <span className="bg-gradient-to-r from-orbit-400 to-action-400 bg-clip-text text-transparent">
              in their own words
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Four people who hired us sat down and recorded what they came for and what they got back. Nothing
            scripted, nothing read off a card. Press play on any of them.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* The player */}
          <Reveal className="lg:col-span-7">
            <figure className="overflow-hidden rounded-3xl bg-black/40 ring-1 ring-white/12 shadow-2xl shadow-black/40">
              <div className="relative aspect-video w-full bg-black">
                {playing ? (
                  <video
                    ref={videoRef}
                    key={current.id}
                    src={current.src}
                    className="h-full w-full object-contain"
                    controls
                    playsInline
                    preload="auto"
                    onEnded={() => setPlaying(false)}
                  >
                    Your browser cannot play this video.
                  </video>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play ${current.name}'s review`}
                    className={`group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br ${
                      tint[active % tint.length]
                    } px-6 text-center`}
                  >
                    <Monogram
                      name={current.name}
                      className="h-16 w-16 bg-white/15 text-2xl text-white ring-1 ring-white/25"
                    />
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-brand-700 shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <Icons.play className="ml-0.5 h-7 w-7" />
                    </span>
                    <span className="text-[15px] font-semibold text-white">
                      Watch {current.name}&rsquo;s review
                      <span className="ml-2 font-normal text-white/70">{current.length}</span>
                    </span>
                  </button>
                )}
              </div>

              <figcaption className="border-t border-white/10 bg-white/[0.04] p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <div className="flex text-flare-300">
                    {[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-4 w-4" />)}
                  </div>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    {current.business}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold leading-snug text-white sm:text-2xl">{current.title}</h3>
                <p className="mt-1.5 text-[14px] text-white/60">{current.strap}</p>

                <blockquote className="mt-5 border-l-2 border-orbit-400/70 pl-4 text-[15px] leading-relaxed text-white/85">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5">
                  <Monogram
                    name={current.name}
                    className="h-11 w-11 bg-white/12 text-white ring-1 ring-white/20"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-white">{current.name}</p>
                    <p className="text-sm text-white/60">{current.role}</p>
                  </div>
                  <div className="ml-auto flex flex-wrap gap-2">
                    {current.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/10 px-3 py-1 text-[11.5px] font-semibold text-white/75"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* The other clips */}
          <div className="lg:col-span-5">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {videoReviews.map((v, i) => (
                <li key={v.id}>
                  <Reveal delay={i * 70}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={i === active ? 'true' : undefined}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                        i === active
                          ? 'border-orbit-400/60 bg-white/[0.09] shadow-lg shadow-black/20'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07]'
                      }`}
                    >
                      <span className="relative shrink-0">
                        <Monogram
                          name={v.name}
                          className={`h-14 w-14 bg-gradient-to-br text-lg text-white ${tint[i % tint.length]}`}
                        />
                        <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-white text-brand-700 shadow">
                          <Icons.play className="ml-px h-3 w-3" />
                        </span>
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-white">{v.name}</span>
                        <span className="block truncate text-[13px] text-white/55">{v.company}</span>
                        <span className="mt-1 block text-[13px] leading-snug text-white/75 line-clamp-2">
                          {v.title}
                        </span>
                      </span>

                      <span className="shrink-0 self-start text-[12px] font-semibold text-white/45">
                        {v.length}
                      </span>
                    </button>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={280}>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[14px] leading-relaxed text-white/70">
                  These were recorded by clients themselves after their projects shipped. Want the written ones
                  instead?
                </p>
                <Link
                  href="/reviews"
                  className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-orbit-300 hover:text-white"
                >
                  Read all client reviews
                  <Icons.arrow className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
