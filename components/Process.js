import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { process } from '../lib/site'

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From brief to brand in"
          highlight="four simple steps"
          body="No lengthy agency onboarding, no account-manager ping-pong. You talk directly to the designers building your identity."
        />

        <div className="relative mt-16">
          <div
            className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 110} className="relative">
                <div className="relative grid place-items-center w-18 h-18 mx-auto rounded-2xl bg-white shadow-lg shadow-brand-900/5 ring-1 ring-slate-100">
                  <span className="text-xl font-bold text-gradient">{item.step}</span>
                </div>
                <h3 className="mt-6 text-center text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-2.5 text-center text-[15px] leading-relaxed text-ink-500">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
