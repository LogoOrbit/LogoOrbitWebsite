import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons } from './Icons'
import { whyUs } from '../lib/site'

const icons = [Icons.spark, Icons.clock, Icons.layers, Icons.shield, Icons.team, Icons.shop]

export default function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden py-20 sm:py-28 bg-ink-900">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
      <div
        className="absolute top-1/3 -left-32 w-[30rem] h-[30rem] rounded-full bg-brand-600/20 blur-3xl animate-drift"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          light
          eyebrow="Why us"
          title="Six reasons clients"
          highlight="stay with us"
          body="LogoOrbit is the hallmark of dedication and perfection in custom design for startups and SMEs across every industry."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map((item, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={item.title} delay={i * 70}>
                <div className="h-full rounded-3xl glass p-7 transition-all duration-300 hover:bg-white/15 hover:-translate-y-1.5">
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-white/10 text-orbit-400">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-white/65">{item.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
