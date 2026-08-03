import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icons } from './Icons'
import { site } from '../lib/site'

const pillars = [
  {
    icon: 'spark',
    label: 'Our mission',
    title: 'Give a small business the design a big one takes for granted',
    body:
      'A corner bakery and a funded startup should get the same standard of thinking, the same original drawing and the same speed. The budget changes what you can buy. It has never changed how carefully we work.',
  },
  {
    icon: 'logo',
    label: 'Our vision',
    title: 'Be the one team a growing brand never has to replace',
    body:
      'Most businesses outgrow their first designer within a year. We built the studio so that never has to happen: the logo, the website, the video, the app and the trademark all sit under one roof, and the team already knows your brand.',
  },
]

const principles = [
  {
    title: 'Draw it, do not generate it',
    body: 'Every mark starts on a designer’s screen, not in a template engine. It is slower for us and it is the entire difference.',
  },
  {
    title: 'Say the honest thing',
    body: 'If a name is likely to fail a trademark search, if a budget will not stretch to what you are describing, you hear it before you pay, not after.',
  },
  {
    title: 'Answer the phone',
    body: 'A real designer picks up during working hours. No ticket queues, no bots, and the same person stays with your project.',
  },
  {
    title: 'Hand everything over',
    body: 'Source files, copyright, store accounts, code. You leave owning all of it, with nothing held back to keep you tied to us.',
  },
]

const setup = [
  { icon: 'team', title: 'In-house, in the USA', body: 'Our designers are our own staff. Your brief is never quietly passed to a freelancer you will never speak to.' },
  { icon: 'shield', title: 'Backed by RevoluSys Inc', body: 'LogoOrbit is a design brand of RevoluSys Inc, registered in Delaware with a client office in New York.' },
  { icon: 'layers', title: 'Six disciplines, one invoice', body: 'Logos, websites, animation and video, mobile apps, publishing and Amazon, coordinated by one point of contact.' },
  { icon: 'clock', title: 'Built for speed', body: 'Concepts inside 24 hours is the standard, not the exception, and it comes from process rather than from cutting corners.' },
]

/**
 * The "who we actually are" block on the About page: what we are for, what we
 * refuse to do, and how the studio is put together. Deliberately concrete,
 * every claim here is one a client can hold us to.
 */
export default function MissionVision() {
  return (
    <section id="mission" className="py-16 sm:py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Mission & vision"
          title="What we are here"
          highlight="to do"
          body={`${site.years} years in, the reason the studio exists has not changed, and neither has the way it works.`}
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-5">
          {pillars.map((p, i) => {
            const Icon = Icons[p.icon]
            return (
              <Reveal key={p.label} delay={i * 90}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
                    <Icon className="w-4 h-4" />
                    {p.label}
                  </span>
                  <h3 className="mt-5 text-xl sm:text-2xl font-bold leading-snug text-ink-900">{p.title}</h3>
                  <p className="mt-3.5 text-[15px] sm:text-base leading-relaxed text-ink-500">{p.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-5 grid sm:grid-cols-2 gap-5">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="flex h-full gap-3.5 rounded-3xl border border-slate-200 bg-white p-6">
                <span className="mt-0.5 grid shrink-0 place-items-center w-7 h-7 rounded-full bg-trust-50 text-trust-600">
                  <Icons.check className="w-4.5 h-4.5" />
                </span>
                <div>
                  <p className="font-bold text-ink-900">{p.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-500">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* How the studio is put together */}
        <Reveal delay={120} className="mt-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-ink-500">How we are set up</h3>
            <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {setup.map((s) => {
                const Icon = Icons[s.icon]
                return (
                  <div key={s.title}>
                    <span className="grid place-items-center w-11 h-11 rounded-2xl bg-brand-50 text-brand-600">
                      <Icon className="w-5.5 h-5.5" />
                    </span>
                    <p className="mt-4 font-bold text-ink-900">{s.title}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">{s.body}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-6 text-[14px] text-ink-500">
              {site.addresses.map((address) => (
                <p key={address} className="flex gap-2.5">
                  <Icons.pin className="mt-0.5 w-4.5 h-4.5 shrink-0 text-brand-600" />
                  {address}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
