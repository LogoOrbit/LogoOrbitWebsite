/**
 * The certificate itself, drawn rather than photographed.
 *
 * The $499 document is the product on /copyright-certificate, so the page has
 * to show it. A flat JPEG of a PDF would be blurry on a retina screen, heavy,
 * unreadable on a phone and invisible to a screen reader. This renders the
 * same object in markup: the foil border, the engine-turned crest, the record
 * block, the execution block and the seal are all real elements, so the
 * document scales, re-flows and can be read aloud.
 *
 * Everything shown is specimen text. No clause here is a client's, and the
 * pieces that would carry a name on a real certificate are drawn as blanked
 * fields on purpose.
 */

import { useId } from 'react'

/** The foil ink used by both the crest and the seal. */
function FoilDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-foil`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8a641a" />
        <stop offset="28%" stopColor="#caa044" />
        <stop offset="52%" stopColor="#f7e8b4" />
        <stop offset="76%" stopColor="#c79a3c" />
        <stop offset="100%" stopColor="#7d5a15" />
      </linearGradient>
    </defs>
  )
}

/** The orbit crest that heads the document. */
export function CertificateCrest({ className = 'h-14 w-14', id: fixedId }) {
  // The foil is referenced as url(#id), so two crests on one page need two
  // ids. The colons React puts in useId have no business in a fragment.
  const uid = useId().replace(/:/g, '')
  const id = fixedId || `crest-${uid}`

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="LogoOrbit crest">
      <FoilDefs id={id} />
      <circle cx="32" cy="32" r="30" fill="none" stroke={`url(#${id}-foil)`} strokeWidth="1.4" />
      <circle cx="32" cy="32" r="26" fill="none" stroke={`url(#${id}-foil)`} strokeWidth="0.7" opacity="0.7" />
      <ellipse
        cx="32"
        cy="32"
        rx="19"
        ry="8.5"
        transform="rotate(-30 32 32)"
        fill="none"
        stroke={`url(#${id}-foil)`}
        strokeWidth="1.8"
      />
      <circle cx="32" cy="32" r="6" fill={`url(#${id}-foil)`} />
      <circle cx="46.5" cy="23" r="3" fill={`url(#${id}-foil)`} />
    </svg>
  )
}

/**
 * The impressed seal. The lettering runs on a circular path the way it does on
 * a real embossed seal, rather than being faked with letter-spacing.
 */
export function CertificateSeal({ className = 'h-28 w-28', id: fixedId, plate = true }) {
  const uid = useId().replace(/:/g, '')
  const id = fixedId || `seal-${uid}`

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="LogoOrbit legal desk seal">
      <FoilDefs id={id} />
      <path id={`${id}-arc`} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" fill="none" />

      {/* The impression disc. It belongs on paper, where the seal is pressed
          into the stock; on a dark surface it reads as a grey coin, so that
          use asks for plate={false} and gets bare foil instead. */}
      {plate && <circle cx="60" cy="60" r="57" fill="#fbf8f1" opacity="0.55" />}
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke={`url(#${id}-foil)`}
        strokeWidth="2.5"
        strokeDasharray="1.5 5"
        className="cert-seal-ring"
        style={{ transformOrigin: '60px 60px' }}
      />
      <circle cx="60" cy="60" r="50" fill="none" stroke={`url(#${id}-foil)`} strokeWidth="1.6" />
      <circle cx="60" cy="60" r="35" fill="none" stroke={`url(#${id}-foil)`} strokeWidth="1" opacity="0.8" />

      <text
        fontSize="8.2"
        letterSpacing="1.6"
        fontWeight="700"
        fill={`url(#${id}-foil)`}
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        <textPath href={`#${id}-arc`} startOffset="50%" textAnchor="middle">
          LOGOORBIT · LEGAL COMPLIANCE DEPARTMENT ·
        </textPath>
      </text>

      <g transform="translate(60 60)">
        <ellipse rx="17" ry="7.5" transform="rotate(-30)" fill="none" stroke={`url(#${id}-foil)`} strokeWidth="1.6" />
        <circle r="5.2" fill={`url(#${id}-foil)`} />
        <circle cx="13" cy="-8" r="2.6" fill={`url(#${id}-foil)`} />
      </g>

      <text
        x="60"
        y="88"
        textAnchor="middle"
        fontSize="6.6"
        letterSpacing="1.1"
        fontWeight="700"
        fill={`url(#${id}-foil)`}
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        17 U.S.C. § 204(a)
      </text>
    </svg>
  )
}

/** The filigree that turns a plain rectangle into a document border. */
function CornerRule({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={`absolute h-8 w-8 sm:h-11 sm:w-11 ${className}`} aria-hidden="true">
      <path
        d="M2 46V14C2 7.4 7.4 2 14 2h32"
        fill="none"
        stroke="#c9a044"
        strokeWidth="1.4"
        opacity="0.75"
      />
      <path d="M8 46V16c0-4.4 3.6-8 8-8h30" fill="none" stroke="#c9a044" strokeWidth="0.7" opacity="0.45" />
      <circle cx="14" cy="14" r="2.2" fill="#c9a044" opacity="0.7" />
    </svg>
  )
}

/**
 * The paper. `record` fills the metadata block, `children` is the body of the
 * instrument, and `footer` defaults to the execution block.
 */
export default function CertificateInstrument({
  record,
  children,
  showSeal = true,
  watermark = 'SPECIMEN',
  className = '',
}) {
  return (
    <article
      className={`cert-paper relative isolate overflow-hidden rounded-2xl shadow-[0_50px_100px_-45px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-2 rounded-xl border border-[#c9a044]/45" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-[0.85rem] rounded-lg border border-[#c9a044]/25" aria-hidden="true" />
      <CornerRule className="left-2 top-2" />
      <CornerRule className="right-2 top-2 rotate-90" />
      <CornerRule className="bottom-2 right-2 rotate-180" />
      <CornerRule className="bottom-2 left-2 -rotate-90" />

      {watermark && (
        <span
          aria-hidden="true"
          className="doc-face pointer-events-none absolute inset-0 -z-10 grid place-items-center text-[3.2rem] font-bold tracking-[0.3em] text-[#1b2440]/[0.055] sm:text-[4.5rem]"
          style={{ transform: 'rotate(-24deg)' }}
        >
          {watermark}
        </span>
      )}

      <div className="relative px-5 py-7 sm:px-9 sm:py-9">
        <header className="text-center">
          <div className="relative mx-auto w-fit">
            <span
              className="cert-guilloche absolute inset-[-0.6rem] rounded-full opacity-45"
              aria-hidden="true"
              style={{ maskImage: 'radial-gradient(circle, #000 40%, transparent 72%)', WebkitMaskImage: 'radial-gradient(circle, #000 40%, transparent 72%)' }}
            />
            <CertificateCrest className="relative h-12 w-12 sm:h-14 sm:w-14" />
          </div>

          <p className="doc-mono mt-3 text-[9px] uppercase tracking-[0.32em] text-[#8a6a22] sm:text-[10px]">
            LogoOrbit · Legal Compliance Department
          </p>
          <h3 className="doc-face mt-2 text-[1.05rem] font-bold leading-tight tracking-tight text-[#121c36] sm:text-[1.4rem]">
            Copyright Assignment &amp;<br className="sm:hidden" /> Commercial Use Certificate
          </h3>
          <p className="doc-face mt-1.5 text-[11px] italic text-[#4a5372] sm:text-[12.5px]">
            An instrument of transfer executed under 17 U.S.C. § 204(a)
          </p>
          <div className="cert-foil-rule mx-auto mt-3.5 h-px w-3/4" aria-hidden="true" />
        </header>

        {record && (
          <dl className="doc-mono mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[9.5px] uppercase tracking-[0.1em] sm:text-[10.5px]">
            {record.map((row) => (
              <div key={row.label} className={row.wide ? 'col-span-2' : ''}>
                <dt className="text-[#8a6a22]">{row.label}</dt>
                <dd className="mt-1 font-semibold tracking-normal text-[#1b2440]">
                  {row.value ?? <span className="block h-3 w-full cert-redact" aria-label="redacted on the specimen" />}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="doc-face mt-5">{children}</div>

        <footer className="relative mt-6 border-t border-dashed border-[#1b2440]/20 pt-5">
          <div className="grid grid-cols-2 gap-5">
            {['Assignor — LogoOrbit', 'Assignee — client of record'].map((party) => (
              <div key={party}>
                <span className="block h-8 w-full" aria-hidden="true" />
                <span className="block h-px w-full bg-[#1b2440]/45" aria-hidden="true" />
                <p className="doc-mono mt-1.5 text-[8.5px] uppercase tracking-[0.14em] text-[#4a5372] sm:text-[9.5px]">
                  {party}
                </p>
              </div>
            ))}
          </div>

          {/* The seal sits across the rule above the signature lines, the way
              one lands on paper, without burying the party names under it. */}
          {showSeal && (
            <span className="cert-seal absolute -top-9 right-1 sm:-top-12 sm:right-2">
              <CertificateSeal className="h-20 w-20 opacity-95 sm:h-24 sm:w-24" />
            </span>
          )}
        </footer>
      </div>
    </article>
  )
}
