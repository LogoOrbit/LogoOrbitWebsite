/**
 * Flat vector portrait for the legal desk.
 *
 * Drawn rather than photographed on purpose: it stays sharp at any size,
 * weighs nothing, re-colours with the theme and, most usefully, it *reads*
 * as a lawyer in about a tenth of a second, suit, tie, glasses and a set of
 * scales on the lapel badge. Somebody skimming the page understands who
 * this block is about before they read a word of it.
 *
 * The gradient ids are suffixed so two of these can share a page without the
 * second one inheriting the first one's fills.
 */
export default function LawyerAvatar({ className = 'w-40 h-40', id = 'counsel' }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#ddd6fe" />
        </linearGradient>
        <linearGradient id={`${id}-suit`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#243a70" />
          <stop offset="100%" stopColor="#131f45" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="80" cy="80" r="76" />
        </clipPath>
      </defs>

      <circle cx="80" cy="80" r="76" fill={`url(#${id}-bg)`} />

      <g clipPath={`url(#${id}-clip)`}>
        {/* neck and shoulders */}
        <path d="M68 82h24v22a12 12 0 01-24 0z" fill="#dda175" />
        <path d="M18 160c2-26 15-40 36-46l26-8 26 8c21 6 34 20 36 46z" fill={`url(#${id}-suit)`} />

        {/* shirt, then the lapels laid back over its edges */}
        <path d="M64 102l16 22 16-22 4 4-10 54H70l-10-54z" fill="#f8fafc" />
        <path d="M62 102l18 22-10 36H44z" fill={`url(#${id}-suit)`} />
        <path d="M98 102l-18 22 10 36h26z" fill={`url(#${id}-suit)`} />
        <path d="M68 100l12 16-7 5-9-16z" fill="#ffffff" />
        <path d="M92 100L80 116l7 5 9-16z" fill="#ffffff" />

        {/* tie */}
        <path d="M74 114l6-5 6 5-2 8-4 3-4-3z" fill="#c2410c" />
        <path d="M80 125l7 10-5 25h-4l-5-25z" fill="#f97316" />

        {/* head */}
        <circle cx="52" cy="60" r="6" fill="#dda175" />
        <circle cx="108" cy="60" r="6" fill="#dda175" />
        <circle cx="80" cy="58" r="28" fill="#f2c39a" />

        {/* hair, a clean cap with a side part */}
        <path
          d="M80 28c-17 0-29 12-29 27 0 2 .2 4 .6 6 .6-8 3.4-13 8.4-15 5 3.4 12.4 5.2 20 5.2 7 0 13.4-1.6 18-4.4 4.6 2.2 7.2 7 7.8 14.2.4-2 .6-4 .6-6 0-15-8.4-27-26.4-27z"
          fill="#2b3550"
        />

        {/* glasses */}
        <g fill="rgba(255,255,255,0.45)" stroke="#1e2a4d" strokeWidth="2.4">
          <rect x="57" y="52" width="19" height="15" rx="6.5" />
          <rect x="84" y="52" width="19" height="15" rx="6.5" />
        </g>
        <path
          d="M76 58h8M57 57l-7-2M103 57l7-2"
          fill="none"
          stroke="#1e2a4d"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* eyes, nose, mouth. No brows: the hairline sits where they would
            be, and a brow drawn under it just reads as a smudge. */}
        <circle cx="66.5" cy="59.5" r="2.6" fill="#1e2a4d" />
        <circle cx="93.5" cy="59.5" r="2.6" fill="#1e2a4d" />
        <path
          d="M80 64v7h-4"
          fill="none"
          stroke="#d59a72"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M72.5 77c4.4 4.2 10.6 4.2 15 0"
          fill="none"
          stroke="#b9704b"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>

      {/* the lapel badge: scales of justice, the one symbol nobody has to
          decode. It breaks the circle deliberately so it reads as a seal. */}
      <g>
        <circle cx="128" cy="126" r="23" fill="#ffffff" />
        <circle cx="128" cy="126" r="23" fill="none" stroke="#2563eb" strokeWidth="2.5" />
        <g
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M128 114v22M121 137h14" />
          <path d="M117 119h22" />
          <path d="M117 119l-4.5 8a4.6 4.6 0 009 0z" />
          <path d="M139 119l-4.5 8a4.6 4.6 0 009 0z" />
        </g>
      </g>
    </svg>
  )
}
