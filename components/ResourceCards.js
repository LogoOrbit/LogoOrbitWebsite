import Link from 'next/link'
import Reveal from './Reveal'
import { Icons } from './Icons'

export default function ResourceCards({ resources, heading }) {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {heading && <h2 className="text-2xl sm:text-4xl font-bold text-ink-900">{heading}</h2>}
        <div className={`${heading ? 'mt-9' : ''} grid md:grid-cols-2 lg:grid-cols-3 gap-5`}>
          {resources.map((resource, index) => (
            <Reveal key={resource.slug} delay={index * 60}>
              <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{resource.category}</p>
                <h3 className="mt-4 text-xl font-bold leading-snug text-ink-900">
                  <Link href={`/resources/${resource.slug}`} className="hover:text-brand-600 transition-colors">
                    {resource.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-500">{resource.description}</p>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                  <span className="text-sm text-ink-400">{resource.readTime}</span>
                  <Link href={`/resources/${resource.slug}`} className="inline-flex items-center gap-2 font-semibold text-brand-600">
                    Read guide <Icons.arrow className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
