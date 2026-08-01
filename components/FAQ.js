import { useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons } from './Icons'
import { faqs } from '../lib/site'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faqs" className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="FAQs"
          title="Questions, answered"
          body="Still unsure about something? Call us, a real designer will pick up."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 55}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                    isOpen ? 'border-brand-200 shadow-lg shadow-brand-900/5' : 'border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-ink-900">{item.q}</span>
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
                      <p className="px-6 pb-5 text-[15px] leading-relaxed text-ink-500">{item.a}</p>
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
