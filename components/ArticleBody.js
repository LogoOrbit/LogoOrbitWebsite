import Reveal from './Reveal'

/**
 * The long-form block renderer, shared by every page that carries written
 * content: guides, blog articles, team profiles, case studies and package
 * pages.
 *
 * It stays deliberately dumb. The data files are the source of truth for
 * what is said, this only decides how a heading, a paragraph, a list or a
 * two-column table looks, so a new content type never has to reinvent the
 * typography.
 */

export function slugify(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function Block({ block }) {
  return (
    <Reveal className="mt-10 first:mt-0">
      {block.h && (
        <h2 className="text-xl sm:text-2xl font-bold leading-snug text-ink-900 scroll-mt-24" id={slugify(block.h)}>
          {block.h}
        </h2>
      )}

      {block.p?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="mt-4 text-[16px] sm:text-[17px] leading-[1.75] text-ink-700">
          {paragraph}
        </p>
      ))}

      {block.ul && (
        <ul className="mt-5 space-y-3">
          {block.ul.map((item) => (
            <li key={item} className="flex gap-3 text-[16px] leading-[1.7] text-ink-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {block.ol && (
        <ol className="mt-5 space-y-3">
          {block.ol.map((item, i) => (
            <li key={item} className="flex gap-3.5 text-[16px] leading-[1.7] text-ink-700">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-[13px] font-bold text-brand-600">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      )}

      {block.table && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <tbody>
              {block.table.map(([label, value]) => (
                <tr key={label} className="border-b border-slate-200 last:border-b-0">
                  <th
                    scope="row"
                    className="w-[38%] bg-slate-50 px-4 py-3.5 align-top text-[14px] font-bold text-ink-900"
                  >
                    {label}
                  </th>
                  <td className="px-4 py-3.5 align-top text-[15px] leading-relaxed text-ink-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Reveal>
  )
}

/** The whole body plus an optional "on this page" jump list. */
export default function ArticleBody({ sections, contents = [], showContents = true }) {
  return (
    <>
      {showContents && contents.length > 2 && (
        <Reveal className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">On this page</p>
          <ul className="mt-3.5 space-y-2">
            {contents.map((h) => (
              <li key={h}>
                <a
                  href={`#${slugify(h)}`}
                  className="text-[15px] font-medium text-ink-700 underline-offset-4 hover:text-brand-600 hover:underline"
                >
                  {h}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {sections.map((block, i) => (
        <Block key={block.h || `block-${i}`} block={block} />
      ))}
    </>
  )
}
