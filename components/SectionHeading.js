import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, highlight, body, align = 'center', light = false }) {
  const centered = align === 'center'

  return (
    <Reveal className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-semibold uppercase tracking-[0.22em] ${
            light ? 'text-orbit-400' : 'text-brand-600'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] ${
          light ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {body && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-white/70' : 'text-ink-500'}`}>{body}</p>
      )}
    </Reveal>
  )
}
