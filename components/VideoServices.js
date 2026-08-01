import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'
import { videoPackages, money } from '../lib/pricing'

const work = [
  { title: 'YouTube video editing', body: 'Cuts, pacing, b-roll, captions and a sound mix, handed back ready to upload.' },
  { title: 'Thumbnails that get clicked', body: 'Three options per video, designed to be read at the size people actually see them.' },
  { title: 'Intros and outros', body: 'A short branded opener and an end card built from your own logo.' },
  { title: 'Shorts, reels and TikToks', body: 'We cut the vertical clips out of the footage you already sent us.' },
  { title: 'Logo animation', body: 'Your finished mark, moving, with sound. Two seconds or twenty.' },
  { title: 'Film and advert editing', body: 'Colour grading, voice-over, music and motion graphics for anything that has to sell.' },
  { title: 'Sound design and mixing', body: 'Clean dialogue, levelled music, no more videos that are too quiet then too loud.' },
  { title: 'Subtitles and captions', body: 'Burned in or as a file, in the style that suits the platform.' },
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

        <div className="mt-9 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {work.map((w, i) => (
            <Reveal key={w.title} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-50 text-brand-600">
                  <Icons.animation className="w-5 h-5" />
                </span>
                <h3 className="mt-4 text-[16px] font-bold leading-snug text-ink-900">{w.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{w.body}</p>
              </div>
            </Reveal>
          ))}
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
