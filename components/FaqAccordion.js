import { useState } from 'react'
import Reveal from './Reveal'
import { Icons } from './Icons'

/**
 * The same accordion the home page uses, but fed from props so a service,
 * industry or guide page can carry its own questions.
 *
 * Every question is rendered into the DOM whether or not the panel is open.
 * Collapsing with a grid row rather than unmounting keeps the answers present
 * for a crawler and for anyone using find-in-page.
 */
export default function FaqAccordion({ items, heading = 'Common questions', eyebrow = 'FAQs', tone = 'muted' }) {
  const [open, setOpen] = useState(0)
  if (!items?.length) return null

  return (
    <section className={`py-14 sm:py-20 ${tone === 'muted' ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">{eyebrow}</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight text-ink-900">{heading}</h2>
        </Reveal>

        <div className="mt-8 sm:mt-12 space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 45}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                    isOpen ? 'border-brand-200 shadow-lg shadow-brand-900/5' : 'border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
                  >
                    <span className="text-[15px] sm:text-base font-semibold text-ink-900">{item.q}</span>
                    <span
                      className={`grid shrink-0 place-items-center w-8 h-8 rounded-full transition-all duration-300 ${
                        isOpen ? 'rotate-45 bg-brand-600 text-white' : 'bg-slate-100 text-ink-500'
                      }`}
                    >
                      <Icons.plus className="w-4.5 h-4.5" />
                    </span>
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 sm:px-6 text-[15px] leading-relaxed text-ink-500">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
