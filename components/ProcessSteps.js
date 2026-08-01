import Reveal from './Reveal'
import { Icons } from './Icons'
import { process } from '../lib/site'

/**
 * The four steps of a job. Step one links straight to the brief form, because
 * "share your brief" is an instruction with nowhere to go otherwise.
 */
export default function ProcessSteps() {
  return (
    <div className="mt-9 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
      {process.map((item, i) => (
        <Reveal key={item.step} delay={i * 100}>
          <div className="grid place-items-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-lg shadow-brand-900/5 ring-1 ring-slate-100">
            <span className="text-lg font-bold text-gradient">{item.step}</span>
          </div>
          <h3 className="mt-5 text-lg font-bold text-ink-900">{item.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{item.body}</p>

          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-[14px] font-semibold text-brand-600 transition-colors hover:bg-brand-100"
            >
              {item.cta}
              <Icons.arrow className="w-4 h-4" />
            </a>
          )}
        </Reveal>
      ))}
    </div>
  )
}
