import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'
import { videoArt, toneVars } from './Illustrations'
import { videoPackages } from '../lib/pricing'
import { money } from '../lib/money'

/**
 * Eight jobs, eight pictures.
 *
 * Every one of these cards used to show the same play-button icon, so the row
 * gave a reader nothing to aim at: on a phone it was eight near-identical white
 * boxes, one per screenful. Each now has its own scene, its own colour and a
 * one-word label above the title, and they sit two-up on a phone so the whole
 * list can be taken in with one thumb.
 */
const work = [
  {
    art: 'editing',
    tone: 'blue',
    kind: 'Editing',
    title: 'YouTube video editing',
    body: 'Cuts, pacing, b-roll, captions and a sound mix, handed back ready to upload.',
  },
  {
    art: 'thumbnails',
    tone: 'orange',
    kind: 'Clicks',
    title: 'Thumbnails that get clicked',
    body: 'Three options per video, designed to be read at the size people actually see them.',
  },
  {
    art: 'intro',
    tone: 'violet',
    kind: 'Branding',
    title: 'Intros and outros',
    body: 'A short branded opener and an end card built from your own logo.',
  },
  {
    art: 'shorts',
    tone: 'pink',
    kind: 'Social',
    title: 'Shorts, reels and TikToks',
    body: 'We cut the vertical clips out of the footage you already sent us.',
  },
  {
    art: 'logoMotion',
    tone: 'blue',
    kind: 'Motion',
    title: 'Logo animation',
    body: 'Your finished mark, moving, with sound. Two seconds or twenty.',
  },
  {
    art: 'advert',
    tone: 'amber',
    kind: 'Adverts',
    title: 'Film and advert editing',
    body: 'Colour grading, voice-over, music and motion graphics for anything that has to sell.',
  },
  {
    art: 'sound',
    tone: 'violet',
    kind: 'Audio',
    title: 'Sound design and mixing',
    body: 'Clean dialogue, levelled music, no more videos that are too quiet then too loud.',
  },
  {
    art: 'subtitles',
    tone: 'emerald',
    kind: 'Captions',
    title: 'Subtitles and captions',
    body: 'Burned in or as a file, in the style that suits the platform.',
  },
]

/**
 * Video is half of what the studio does and none of what the old site said, so
 * it gets a band of its own on the home page.
 */
export default function VideoServices() {
  const from = Math.min(...videoPackages.items.map((i) => i.price))

  return (
    <section id="video-services" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Video and sound</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">
            We cut video too, not just draw logos
          </h2>
          <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-ink-500">
            Send us the footage. You get back a finished video with thumbnails, captions and sound, matched to the
            same brand we designed for you. Editing starts at {money(from)}.
          </p>
        </Reveal>

        <div className="mt-9 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {work.map((w, i) => {
            const Art = videoArt[w.art]
            return (
              <Reveal key={w.title} delay={i * 60} className="h-full">
                {/* Picture beside the words on a phone, above them from `sm` up.
                    Eight full-width stacked cards was eight screenfuls; this is
                    a list you can thumb through without shrinking the type. */}
                <div
                  className="group card-lift flex h-full flex-row items-start gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-col sm:gap-0 sm:p-5"
                  style={toneVars(w.tone)}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl accent-band accent-ring sm:h-14 sm:w-14">
                    <Art className="h-8 w-8 transition-transform duration-500 group-hover:scale-110 sm:h-9 sm:w-9" />
                  </span>

                  <div className="min-w-0 sm:mt-4">
                    <span className="block text-[10.5px] font-bold uppercase tracking-[0.16em] accent-text">
                      {w.kind}
                    </span>
                    <h3 className="mt-1 text-[16px] font-bold leading-snug text-ink-900">{w.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">{w.body}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={120} className="mt-9 flex flex-col sm:flex-row gap-3">
          <Link href="/pricing#video" className="btn-action px-7 py-3.5">
            See video prices
            <Icons.arrow className="w-5 h-5" />
          </Link>
          <Link
            href="/brief"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink-900 hover:border-brand-300 hover:text-brand-600 transition-colors"
          >
            Tell us about your channel
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
