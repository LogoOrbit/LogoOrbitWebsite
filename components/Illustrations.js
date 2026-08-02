/**
 * Flat vector scenes for the service and video cards.
 *
 * The cards used to carry a single-weight line icon, and the video row used the
 * same one eight times over, so a visitor scanning the page got no help telling
 * one card from the next. These are small illustrations instead: a few filled
 * shapes each, in fixed brand-adjacent colours, so a reader who skips the words
 * can still tell a website from a book from a sound mix.
 *
 * Colours are hard-coded rather than inherited. Each scene reads as artwork on
 * both the white and the near-black page, the same way the portfolio tiles do,
 * and paper-white panels inside a scene stay paper-white in dark mode on
 * purpose: that is what makes them read as paper.
 */

const PAPER = '#ffffff'
const EDGE = '#cbd5e1'
const FAINT = '#e2e8f0'
const NIGHT = '#1e293b'

function Scene({ children, className = 'w-full h-full', box = '0 0 96 96' }) {
  return (
    <svg viewBox={box} className={className} fill="none" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

function Small({ children, className }) {
  return (
    <Scene box="0 0 64 64" className={className}>
      {children}
    </Scene>
  )
}

/* A four-pointed sparkle, reused wherever a scene needs a bit of life. */
function Sparkle({ x, y, s = 1, fill = '#fbbf24' }) {
  return (
    <path
      d={`M${x} ${y - 6 * s}c${1.1 * s} ${3.4 * s} ${1.5 * s} ${3.8 * s} ${4.9 * s} ${4.9 * s}c-${3.4 * s} ${1.1 * s}-${3.8 * s} ${1.5 * s}-${4.9 * s} ${4.9 * s}c-${1.1 * s}-${3.4 * s}-${1.5 * s}-${3.8 * s}-${4.9 * s}-${4.9 * s}c${3.4 * s}-${1.1 * s} ${3.8 * s}-${1.5 * s} ${4.9 * s}-${4.9 * s}z`}
      fill={fill}
    />
  )
}

/* ---------------------------------------------------------------- services */

/** A concept sheet: the drawn mark, a palette under it, a spark of an idea. */
function LogoArt(p) {
  return (
    <Scene {...p}>
      <rect x="17" y="7" width="54" height="82" rx="10" fill={PAPER} stroke={EDGE} strokeWidth="2" />
      <rect x="27" y="16" width="22" height="4" rx="2" fill={FAINT} />
      <ellipse
        cx="44"
        cy="45"
        rx="24"
        ry="9.5"
        stroke="#8b5cf6"
        strokeWidth="3.4"
        transform="rotate(-25 44 45)"
      />
      <circle cx="44" cy="45" r="10.5" fill="#2563eb" />
      <circle cx="62.5" cy="32" r="4" fill="#f97316" />
      <rect x="26" y="70" width="10" height="10" rx="3" fill="#2563eb" />
      <rect x="39" y="70" width="10" height="10" rx="3" fill="#8b5cf6" />
      <rect x="52" y="70" width="10" height="10" rx="3" fill="#f97316" />
      <Sparkle x="81" y="22" s={1.5} />
      <Sparkle x="10" y="62" s={1} fill="#93c5fd" />
    </Scene>
  )
}

/** A browser and a phone showing the same site: "it works on both". */
function WebsiteArt(p) {
  return (
    <Scene {...p}>
      <rect x="6" y="14" width="68" height="52" rx="9" fill={PAPER} stroke={EDGE} strokeWidth="2" />
      <path d="M6 23a9 9 0 019-9h50a9 9 0 019 9v5H6z" fill="#f1f5f9" />
      <circle cx="17" cy="21" r="2.4" fill="#f87171" />
      <circle cx="25" cy="21" r="2.4" fill="#fbbf24" />
      <circle cx="33" cy="21" r="2.4" fill="#34d399" />
      <rect x="14" y="35" width="26" height="20" rx="5" fill="#7c3aed" />
      <rect x="46" y="35" width="20" height="4.5" rx="2.2" fill="#c4b5fd" />
      <rect x="46" y="44" width="14" height="4.5" rx="2.2" fill={FAINT} />
      <rect x="14" y="59" width="30" height="4.5" rx="2.2" fill={FAINT} />
      <rect x="58" y="44" width="32" height="46" rx="8" fill={PAPER} stroke={EDGE} strokeWidth="2" />
      <path d="M58 52a8 8 0 018-8h16a8 8 0 018 8v6H58z" fill="#2563eb" />
      <rect x="64" y="63" width="20" height="4" rx="2" fill={FAINT} />
      <rect x="64" y="71" width="14" height="4" rx="2" fill={FAINT} />
      <rect x="64" y="80" width="20" height="6" rx="3" fill="#f97316" />
    </Scene>
  )
}

/** A video frame on a scrubbed timeline, with the sound under it. */
function VideoArt(p) {
  return (
    <Scene {...p}>
      <rect x="8" y="10" width="80" height="48" rx="9" fill={NIGHT} />
      <rect x="14" y="16" width="68" height="36" rx="5" fill="#334155" />
      <circle cx="48" cy="34" r="13" fill={PAPER} />
      <path d="M44 27.5l10 6.5-10 6.5z" fill="#f97316" />
      <rect x="8" y="66" width="80" height="8" rx="4" fill={FAINT} />
      <rect x="8" y="66" width="44" height="8" rx="4" fill="#f97316" />
      <circle cx="52" cy="70" r="7" fill={PAPER} stroke="#f97316" strokeWidth="3" />
      <rect x="12" y="83" width="5" height="7" rx="2.5" fill="#8b5cf6" />
      <rect x="21" y="79" width="5" height="11" rx="2.5" fill="#8b5cf6" />
      <rect x="30" y="82" width="5" height="8" rx="2.5" fill="#c4b5fd" />
      <rect x="61" y="80" width="5" height="10" rx="2.5" fill="#c4b5fd" />
      <rect x="70" y="83" width="5" height="7" rx="2.5" fill="#8b5cf6" />
      <rect x="79" y="81" width="5" height="9" rx="2.5" fill="#c4b5fd" />
    </Scene>
  )
}

/** Two phones, one tapped: screens designed, then built. */
function MobileArt(p) {
  return (
    <Scene {...p}>
      <g transform="rotate(9 62 48)">
        <rect x="48" y="16" width="34" height="62" rx="9" fill={PAPER} stroke={EDGE} strokeWidth="2" />
        <rect x="54" y="24" width="22" height="10" rx="4" fill="#a7f3d0" />
        <rect x="54" y="38" width="22" height="4" rx="2" fill={FAINT} />
        <rect x="54" y="46" width="16" height="4" rx="2" fill={FAINT} />
      </g>
      <rect x="14" y="8" width="40" height="80" rx="11" fill={PAPER} stroke={EDGE} strokeWidth="2" />
      <path d="M14 19a11 11 0 0111-11h18a11 11 0 0111 11v11H14z" fill="#059669" />
      <rect x="27" y="13" width="14" height="3" rx="1.5" fill="#a7f3d0" />
      <rect x="20" y="37" width="13" height="13" rx="4" fill="#d1fae5" />
      <rect x="36" y="37" width="13" height="13" rx="4" fill="#6ee7b7" />
      <rect x="20" y="54" width="13" height="13" rx="4" fill="#6ee7b7" />
      <rect x="36" y="54" width="13" height="13" rx="4" fill="#d1fae5" />
      <rect x="26" y="76" width="16" height="3.5" rx="1.75" fill={EDGE} />
      <circle cx="49" cy="60" r="11" stroke="#059669" strokeWidth="2.5" opacity="0.5" />
      <circle cx="49" cy="60" r="6" fill="#059669" />
    </Scene>
  )
}

/** An open book with a cover standing behind it. */
function BookArt(p) {
  return (
    <Scene {...p}>
      <rect x="30" y="6" width="36" height="46" rx="4" fill="#db2777" />
      <rect x="30" y="6" width="7" height="46" rx="3" fill="#9d174d" />
      <rect x="42" y="18" width="18" height="4" rx="2" fill="#fbcfe8" />
      <rect x="42" y="27" width="12" height="3.5" rx="1.75" fill="#f9a8d4" />
      <path
        d="M10 44c10-6 22-6 36 1v42c-14-7-26-7-36-1z"
        fill={PAPER}
        stroke={EDGE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M86 44c-10-6-22-6-36 1v42c14-7 26-7 36-1z"
        fill={PAPER}
        stroke={EDGE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="45" y="45" width="6" height="41" rx="3" fill="#db2777" />
      <path d="M18 54c7-3 14-3 20 1M18 63c7-3 14-3 20 1M18 72c5-2 10-2 14 0" stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
      <path d="M78 54c-7-3-14-3-20 1M78 63c-7-3-14-3-20 1M78 72c-5-2-10-2-14 0" stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
      <Sparkle x="80" y="22" s={1.3} />
    </Scene>
  )
}

/** A parcel in front of a rising bar chart, with the reviews above it. */
function AmazonArt(p) {
  return (
    <Scene {...p}>
      <rect x="54" y="48" width="11" height="32" rx="4" fill="#fcd34d" />
      <rect x="69" y="36" width="11" height="44" rx="4" fill="#fbbf24" />
      <rect x="84" y="26" width="11" height="54" rx="4" fill="#d97706" />
      <path d="M50 40l12-12 9 8 16-17" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M77 17h13v13" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6" y="46" width="44" height="36" rx="6" fill="#fbbf24" />
      <path d="M6 52a6 6 0 016-6h38a6 6 0 016 6v6H6z" fill="#f59e0b" />
      <rect x="24" y="46" width="8" height="36" fill="#fde68a" />
      <path d="M14 66c8 5 16 5 24 0" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M11 16l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4L6.5 30l.9-5-3.6-3.5 5-.7z" fill="#f59e0b" />
      <path d="M27 16l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4L22.5 30l.9-5-3.6-3.5 5-.7z" fill="#f59e0b" />
      <path d="M43 16l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4L38.5 30l.9-5-3.6-3.5 5-.7z" fill="#fcd34d" />
    </Scene>
  )
}

export const serviceArt = {
  logo: LogoArt,
  website: WebsiteArt,
  animation: VideoArt,
  mobile: MobileArt,
  book: BookArt,
  amazon: AmazonArt,
}

/* ------------------------------------------------------------------ video */

/** Clips laid out on a track with a playhead through them. */
function EditingArt(p) {
  return (
    <Small {...p}>
      <rect x="4" y="14" width="18" height="14" rx="4" fill="#2563eb" />
      <rect x="24" y="14" width="14" height="14" rx="4" fill="#93c5fd" />
      <rect x="40" y="14" width="20" height="14" rx="4" fill="#2563eb" />
      <rect x="4" y="34" width="26" height="14" rx="4" fill="#c4b5fd" />
      <rect x="32" y="34" width="28" height="14" rx="4" fill="#8b5cf6" />
      <path d="M36 8v50" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="8" r="4.5" fill="#f97316" />
    </Small>
  )
}

/** A thumbnail with a big headline bar, and a cursor about to click it. */
function ThumbnailArt(p) {
  return (
    <Small {...p}>
      <rect x="10" y="6" width="48" height="30" rx="5" fill={FAINT} />
      <rect x="4" y="14" width="48" height="32" rx="5" fill={NIGHT} />
      <rect x="9" y="19" width="26" height="8" rx="3" fill="#f97316" />
      <rect x="9" y="31" width="18" height="5" rx="2.5" fill="#94a3b8" />
      <circle cx="43" cy="31" r="7" fill={PAPER} />
      <path d="M41 27.6l5 3.4-5 3.4z" fill="#f97316" />
      <path d="M40 44l16 8-6.5 2.2L46 60z" fill={PAPER} stroke={NIGHT} strokeWidth="2.5" strokeLinejoin="round" />
    </Small>
  )
}

/** A mark landing in frame with rays: the branded opener. */
function IntroArt(p) {
  return (
    <Small {...p}>
      <rect x="4" y="10" width="56" height="40" rx="6" fill={NIGHT} />
      <path
        d="M32 20v-8M32 56v-8M14 34H6M58 34h-8M20 22l-5-5M44 22l5-5"
        stroke="#fbbf24"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="32" cy="30" r="8" fill="#8b5cf6" />
      <ellipse cx="32" cy="30" rx="16" ry="6.5" stroke="#fbbf24" strokeWidth="2.6" transform="rotate(-25 32 30)" />
    </Small>
  )
}

/** A vertical clip with a like on it. */
function ShortsArt(p) {
  return (
    <Small {...p}>
      <rect x="16" y="4" width="32" height="56" rx="8" fill="#db2777" />
      <rect x="21" y="12" width="22" height="40" rx="4" fill="#fce7f3" />
      <path d="M29 26l10 6-10 6z" fill="#db2777" />
      <path
        d="M52 40c0-3.2 3.8-4.2 5.4-1.6 1.6-2.6 5.4-1.6 5.4 1.6 0 3.4-5.4 7-5.4 7s-5.4-3.6-5.4-7z"
        fill="#f97316"
      />
      <circle cx="9" cy="20" r="4" fill="#f9a8d4" />
      <circle cx="7" cy="44" r="3" fill="#f9a8d4" />
    </Small>
  )
}

/** The mark itself, mid-spin. */
function LogoMotionArt(p) {
  return (
    <Small {...p}>
      <path d="M13 44a22 22 0 010-24" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
      <path d="M6 48a30 30 0 010-32" stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="32" r="11" fill="#2563eb" />
      <ellipse cx="36" cy="32" rx="22" ry="9" stroke="#8b5cf6" strokeWidth="3.2" transform="rotate(-25 36 32)" />
      <circle cx="53" cy="20" r="4" fill="#f97316" />
    </Small>
  )
}

/** A clapperboard for the film and advert work. */
function AdvertArt(p) {
  return (
    <Small {...p}>
      <rect x="6" y="24" width="52" height="32" rx="6" fill={NIGHT} />
      <path
        d="M8.5 8.2l48.3 6.4a4 4 0 013.4 4.5l-.7 5.2-55.4-7.4.7-5.2a4 4 0 013.7-3.5z"
        fill="#475569"
      />
      <path d="M18 9.5l-6 9M32 11.5l-6 9M46 13.5l-6 9" stroke={PAPER} strokeWidth="3" strokeLinecap="round" />
      <rect x="14" y="33" width="24" height="4" rx="2" fill="#64748b" />
      <rect x="14" y="43" width="14" height="4" rx="2" fill="#64748b" />
      <circle cx="47" cy="42" r="7" fill="#f97316" />
      <path d="M45 38.8l4.6 3.2-4.6 3.2z" fill={PAPER} />
    </Small>
  )
}

/** Mixer faders and a levelled waveform. */
function SoundArt(p) {
  return (
    <Small {...p}>
      <path d="M6 32h4M56 32h2" stroke={FAINT} strokeWidth="2" strokeLinecap="round" />
      <rect x="10" y="26" width="5" height="12" rx="2.5" fill="#a78bfa" />
      <rect x="19" y="18" width="5" height="28" rx="2.5" fill="#7c3aed" />
      <rect x="28" y="10" width="5" height="44" rx="2.5" fill="#a78bfa" />
      <rect x="37" y="20" width="5" height="24" rx="2.5" fill="#7c3aed" />
      <rect x="46" y="27" width="5" height="10" rx="2.5" fill="#a78bfa" />
      <circle cx="21.5" cy="38" r="4.5" fill={PAPER} stroke="#7c3aed" strokeWidth="2.5" />
      <circle cx="30.5" cy="22" r="4.5" fill={PAPER} stroke="#f97316" strokeWidth="2.5" />
      <circle cx="39.5" cy="34" r="4.5" fill={PAPER} stroke="#7c3aed" strokeWidth="2.5" />
    </Small>
  )
}

/** A caption bar burned into the bottom of a frame. */
function SubtitleArt(p) {
  return (
    <Small {...p}>
      <rect x="4" y="10" width="56" height="44" rx="6" fill={NIGHT} />
      <rect x="10" y="16" width="26" height="4.5" rx="2.25" fill="#475569" />
      <rect x="10" y="25" width="16" height="4.5" rx="2.25" fill="#475569" />
      <rect x="10" y="38" width="44" height="11" rx="4" fill={PAPER} />
      <rect x="14" y="42" width="18" height="3.5" rx="1.75" fill="#0b1733" />
      <rect x="35" y="42" width="11" height="3.5" rx="1.75" fill="#f97316" />
      <rect x="40" y="14" width="16" height="12" rx="4" fill="#059669" />
      <path d="M46.5 18.2a2.8 2.8 0 100 3.6M52 18.2a2.8 2.8 0 100 3.6" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
    </Small>
  )
}

/* ------------------------------------------------------------------ tones */

/**
 * Colour ways for the illustrated cards, as bare "r g b" triples so the CSS in
 * globals.css can mix them at any opacity.
 *
 *   accent  fills, rules and the tinted panel
 *   ink     the same hue darkened enough to read as text on white
 *   lift    the same hue lightened enough to read as text on the dark page
 */
export const tones = {
  blue: { accent: '37 99 235', ink: '29 78 216', lift: '147 197 253' },
  violet: { accent: '124 58 237', ink: '109 40 217', lift: '196 181 253' },
  orange: { accent: '234 88 12', ink: '194 65 12', lift: '253 186 116' },
  emerald: { accent: '5 150 105', ink: '4 120 87', lift: '110 231 183' },
  pink: { accent: '219 39 119', ink: '190 24 93', lift: '249 168 212' },
  amber: { accent: '217 119 6', ink: '180 83 9', lift: '252 211 77' },
}

/** Spreads a tone onto an element as inline custom properties. */
export function toneVars(name) {
  const t = tones[name] || tones.blue
  return { '--accent': t.accent, '--accent-ink': t.ink, '--accent-lift': t.lift }
}

export const videoArt = {
  editing: EditingArt,
  thumbnails: ThumbnailArt,
  intro: IntroArt,
  shorts: ShortsArt,
  logoMotion: LogoMotionArt,
  advert: AdvertArt,
  sound: SoundArt,
  subtitles: SubtitleArt,
}
