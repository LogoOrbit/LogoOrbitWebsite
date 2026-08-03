/**
 * Flat vector portraits for the sales desk, drawn to the same 160-square grid
 * as the legal counsel so the three profile cards line up.
 *
 * The two are deliberately easy to tell apart at a glance: different
 * background, jacket, skin tone, hair and lapel badge. Somebody scanning the
 * page should be able to see there are two distinct people before they read
 * either name, which is the whole point of putting faces here at all.
 *
 * Gradient and clip ids are suffixed, so both can sit on one page without the
 * second inheriting the first one's fills.
 */

const looks = {
  /* Brock: brand blue, navy jacket, open collar, short beard. The badge is a
     spark, the mark used everywhere else on the site for design work. */
  brock: {
    bg: ['#dbeafe', '#bfdbfe'],
    jacket: ['#1e3a8a', '#14265c'],
    shirt: '#ffffff',
    skin: '#e8b184',
    skinShade: '#d29a6c',
    hair: '#3a2a20',
    accent: '#2563eb',
  },
  /* Sam: violet, charcoal jacket over a pale blue shirt, curly hair, no
     beard. The badge is a browser window, for the digital side of the list. */
  sam: {
    bg: ['#ede9fe', '#ddd6fe'],
    jacket: ['#334155', '#1c2739'],
    shirt: '#e0f2fe',
    skin: '#c98d5f',
    skinShade: '#ab7248',
    hair: '#1c1512',
    accent: '#7c3aed',
  },
}

export default function SalesAvatar({ variant = 'brock', className = 'w-40 h-40', id = variant }) {
  const look = looks[variant] || looks.brock

  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={look.bg[0]} />
          <stop offset="100%" stopColor={look.bg[1]} />
        </linearGradient>
        <linearGradient id={`${id}-jacket`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={look.jacket[0]} />
          <stop offset="100%" stopColor={look.jacket[1]} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="80" cy="80" r="76" />
        </clipPath>
      </defs>

      <circle cx="80" cy="80" r="76" fill={`url(#${id}-bg)`} />

      <g clipPath={`url(#${id}-clip)`}>
        {/* neck and shoulders */}
        <path d="M68 82h24v22a12 12 0 01-24 0z" fill={look.skinShade} />
        <path d="M18 160c2-26 15-40 36-46l26-8 26 8c21 6 34 20 36 46z" fill={`url(#${id}-jacket)`} />

        {/* shirt and a slim tie in the person's own accent colour, so the two
            read as a pair without looking like the same drawing twice */}
        <path d="M64 102l16 20 16-20 4 4-8 54H68l-8-54z" fill={look.shirt} />
        <path d="M62 102l18 20-10 38H44z" fill={`url(#${id}-jacket)`} />
        <path d="M98 102l-18 20 10 38h26z" fill={`url(#${id}-jacket)`} />
        <path d="M70 100l10 16-10 10-6-22z" fill={look.shirt} />
        <path d="M90 100L80 116l10 10 6-22z" fill={look.shirt} />
        <path d="M80 122l4 6-4 20-4-20z" fill={look.accent} opacity="0.9" />

        {/* head */}
        <circle cx="52" cy="60" r="6" fill={look.skin} />
        <circle cx="108" cy="60" r="6" fill={look.skin} />
        <circle cx="80" cy="58" r="28" fill={look.skin} />

        {variant === 'sam' ? (
          /* curls, built from overlapping circles so the silhouette is bumpy
             rather than the smooth cap the lawyer wears */
          <g fill={look.hair}>
            <circle cx="80" cy="34" r="15" />
            <circle cx="62" cy="41" r="13" />
            <circle cx="98" cy="41" r="13" />
            <circle cx="53" cy="52" r="9" />
            <circle cx="107" cy="52" r="9" />
            <path d="M52 56c0-16 12-28 28-28s28 12 28 28c0-6-4-10-9-11-6 3-12 4-19 4s-13-1-19-4c-5 1-9 5-9 11z" />
          </g>
        ) : (
          <>
            {/* short crop with a low fringe */}
            <path
              d="M80 27c-17 0-30 12-30 28 0 3 .4 6 1 8 1-9 4-14 9-16 6 4 13 6 20 6s14-2 20-6c5 2 8 7 9 16 .6-2 1-5 1-8 0-16-13-28-30-28z"
              fill={look.hair}
            />
            {/* beard, cut back to the cheekbone so the mouth still reads */}
            <path
              d="M53 58c0 3 1 6 1 9 2 12 12 21 26 21s24-9 26-21c0-3 1-6 1-9-3 6-6 9-9 10-5 2-11 3-18 3s-13-1-18-3c-3-1-6-4-9-10z"
              fill={look.hair}
              opacity="0.92"
            />
            <circle cx="80" cy="70" r="12" fill={look.skin} opacity="0.55" />
          </>
        )}

        {/* eyes, brows, nose, mouth */}
        <path
          d="M60 54c4-3 9-3 12 0M88 54c3-3 8-3 12 0"
          fill="none"
          stroke={look.hair}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="67" cy="61" r="2.8" fill="#1e2a4d" />
        <circle cx="93" cy="61" r="2.8" fill="#1e2a4d" />
        <path
          d="M80 64v7h-4"
          fill="none"
          stroke={look.skinShade}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M72 77c5 5 11 5 16 0"
          fill="none"
          stroke="#a45c3c"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>

      {/* lapel badge, one glyph each: what this person actually sells */}
      <g>
        <circle cx="128" cy="126" r="23" fill="#ffffff" />
        <circle cx="128" cy="126" r="23" fill="none" stroke={look.accent} strokeWidth="2.5" />
        <g
          fill="none"
          stroke={look.accent}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {variant === 'sam' ? (
            /* browser window */
            <>
              <rect x="116" y="116" width="24" height="19" rx="3" />
              <path d="M116 122h24M120.5 119.2h.01M124 119.2h.01" />
            </>
          ) : (
            /* spark */
            <>
              <path d="M128 114l3.2 8.8 8.8 3.2-8.8 3.2-3.2 8.8-3.2-8.8-8.8-3.2 8.8-3.2z" />
              <path d="M138.5 133.5h.01M118 118h.01" />
            </>
          )}
        </g>
      </g>
    </svg>
  )
}
