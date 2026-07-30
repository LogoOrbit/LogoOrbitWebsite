import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons, Star } from './Icons'
import { testimonials, site } from '../lib/site'

const avatarTint = [
  'bg-brand-100 text-brand-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
]

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(3)

  useEffect(() => {
    const sync = () => setPerPage(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  const pages = Math.ceil(testimonials.length / perPage)

  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1))
  }, [pages])

  useEffect(() => {
    const id = setInterval(() => setPage((p) => (p + 1) % pages), 6000)
    return () => clearInterval(id)
  }, [pages])

  const visible = testimonials.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Join 1,000+ customers who"
          highlight="grew with us"
          body="Real feedback from founders and marketing leads who trusted LogoOrbit with their brand."
        />

        <Reveal className="mt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[19rem]">
            {visible.map((t, i) => (
              <figure
                key={t.name}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
              >
                <Icons.quote className="w-8 h-8 text-brand-200" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex text-flare-400">
                  {[0, 1, 2, 3, 4].map((s) => <Star key={s} className="w-4 h-4" />)}
                </div>

                <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span
                    className={`grid place-items-center w-11 h-11 rounded-full font-bold ${
                      avatarTint[(page * perPage + i) % avatarTint.length]
                    }`}
                  >
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{t.name}</p>
                    <p className="text-sm text-ink-500">{t.company}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Show testimonial page ${i + 1}`}
                className="grid place-items-center h-11 w-7 px-1"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === page ? 'w-8 bg-brand-600' : 'w-2 bg-slate-200'
                  }`}
                />
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 rounded-3xl bg-gradient-to-r from-brand-700 to-orbit-600 px-8 py-8 text-white text-center sm:text-left">
            <div className="flex items-center gap-4">
              <p className="text-5xl font-bold">{site.rating}</p>
              <div>
                <div className="flex text-flare-300">
                  {[0, 1, 2, 3].map((i) => <Star key={i} className="w-5 h-5" />)}
                  <Star className="w-5 h-5" half id="rating-half" />
                </div>
                <p className="mt-1 text-sm text-white/80">
                  Rated by {site.reviewCount.toLocaleString()} customers globally
                </p>
              </div>
            </div>
            <span className="hidden sm:block w-px h-14 bg-white/25" aria-hidden="true" />
            <p className="max-w-sm text-[15px] text-white/85">
              Every review is left by a verified client who received a finished, fully-owned design from our team.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
