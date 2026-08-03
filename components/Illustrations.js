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
 *
 * Every scene loops. The `a-*` classes are keyframes defined in globals.css,
 * transform and opacity only, and they run whether or not the card is hovered,
 * so the page has movement in it without anyone having to find the movement.
 * `prefers-reduced-motion` turns all of it off in one rule.
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
function Sparkle({ x, y, s = 1, fill = '#fbbf24', className = 'a-twinkle' }) {
  return (
    <path
      className={className}
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
      {/* The tilt lives on the group, because a CSS transform on the ellipse
          would overwrite a transform attribute on the same element. Inside that
          tilted frame the ring turns about its own centre, which is the centre
          of the mark, so the whole thing reads as one slow orbit. */}
      <g transform="rotate(-25 44 45)">
        <ellipse className="a-spin" cx="44" cy="45" rx="24" ry="9.5" stroke="#8b5cf6" strokeWidth="3.4" />
      </g>
      <circle className="a-pulse" cx="44" cy="45" r="10.5" fill="#2563eb" />
      <circle className="a-float" cx="62.5" cy="32" r="4" fill="#f97316" />
      <rect className="a-float ad-1" x="26" y="70" width="10" height="10" rx="3" fill="#2563eb" />
      <rect className="a-float ad-2" x="39" y="70" width="10" height="10" rx="3" fill="#8b5cf6" />
      <rect className="a-float ad-3" x="52" y="70" width="10" height="10" rx="3" fill="#f97316" />
      <Sparkle x="81" y="22" s={1.5} />
      <Sparkle x="10" y="62" s={1} fill="#93c5fd" className="a-twinkle ad-3" />
    </Scene>
  )
}

/** A browser and a phone showing the same site: "it works on both". */
function WebsiteArt(p) {
  return (
    <Scene {...p}>
      <rect x="6" y="14" width="68" height="52" rx="9" fill={PAPER} stroke={EDGE} strokeWidth="2" />
      <path d="M6 23a9 9 0 019-9h50a9 9 0 019 9v5H6z" fill="#f1f5f9" />
      <circle className="a-twinkle" cx="17" cy="21" r="2.4" fill="#f87171" />
      <circle className="a-twinkle ad-1" cx="25" cy="21" r="2.4" fill="#fbbf24" />
      <circle className="a-twinkle ad-2" cx="33" cy="21" r="2.4" fill="#34d399" />
      <rect className="a-float" x="14" y="35" width="26" height="20" rx="5" fill="#7c3aed" />
      <rect className="a-sheen" x="46" y="35" width="20" height="4.5" rx="2.2" fill="#c4b5fd" />
      <rect className="a-sheen ad-2" x="46" y="44" width="14" height="4.5" rx="2.2" fill={FAINT} />
      <rect className="a-sheen ad-4" x="14" y="59" width="30" height="4.5" rx="2.2" fill={FAINT} />
      {/* The phone floats as one piece, screen and all. */}
      <g className="a-float-far">
        <rect x="58" y="44" width="32" height="46" rx="8" fill={PAPER} stroke={EDGE} strokeWidth="2" />
        <path d="M58 52a8 8 0 018-8h16a8 8 0 018 8v6H58z" fill="#2563eb" />
        <rect x="64" y="63" width="20" height="4" rx="2" fill={FAINT} />
        <rect x="64" y="71" width="14" height="4" rx="2" fill={FAINT} />
        <rect className="a-pulse" x="64" y="80" width="20" height="6" rx="3" fill="#f97316" />
      </g>
    </Scene>
  )
}

/** A video frame on a scrubbed timeline, with the sound under it. */
function VideoArt(p) {
  return (
    <Scene {...p}>
      <rect x="8" y="10" width="80" height="48" rx="9" fill={NIGHT} />
      <rect x="14" y="16" width="68" height="36" rx="5" fill="#334155" />
      <g className="a-pulse">
        <circle cx="48" cy="34" r="13" fill={PAPER} />
        <path d="M44 27.5l10 6.5-10 6.5z" fill="#f97316" />
      </g>
      {/* The bar fills and the head rides along with it, both on the same five
          seconds, so the clip plays and rewinds forever. */}
      <rect x="8" y="66" width="80" height="8" rx="4" fill={FAINT} />
      <rect className="a-fill" x="8" y="66" width="44" height="8" rx="4" fill="#f97316" />
      <circle
        className="a-scrub"
        style={{ '--travel': '-37px' }}
        cx="52"
        cy="70"
        r="7"
        fill={PAPER}
        stroke="#f97316"
        strokeWidth="3"
      />
      <rect className="a-rise" x="12" y="83" width="5" height="7" rx="2.5" fill="#8b5cf6" />
      <rect className="a-rise ad-1" x="21" y="79" width="5" height="11" rx="2.5" fill="#8b5cf6" />
      <rect className="a-rise ad-2" x="30" y="82" width="5" height="8" rx="2.5" fill="#c4b5fd" />
      <rect className="a-rise ad-3" x="61" y="80" width="5" height="10" rx="2.5" fill="#c4b5fd" />
      <rect className="a-rise ad-4" x="70" y="83" width="5" height="7" rx="2.5" fill="#8b5cf6" />
      <rect className="a-rise ad-5" x="79" y="81" width="5" height="9" rx="2.5" fill="#c4b5fd" />
    </Scene>
  )
}

/** Two phones, one tapped: screens designed, then built. */
function MobileArt(p) {
  return (
    <Scene {...p}>
      <g transform="rotate(9 62 48)">
        <g className="a-float-far">
          <rect x="48" y="16" width="34" height="62" rx="9" fill={PAPER} stroke={EDGE} strokeWidth="2" />
          <rect x="54" y="24" width="22" height="10" rx="4" fill="#a7f3d0" />
          <rect x="54" y="38" width="22" height="4" rx="2" fill={FAINT} />
          <rect x="54" y="46" width="16" height="4" rx="2" fill={FAINT} />
        </g>
      </g>
      <rect x="14" y="8" width="40" height="80" rx="11" fill={PAPER} stroke={EDGE} strokeWidth="2" />
      <path d="M14 19a11 11 0 0111-11h18a11 11 0 0111 11v11H14z" fill="#059669" />
      <rect x="27" y="13" width="14" height="3" rx="1.5" fill="#a7f3d0" />
      <rect className="a-pulse" x="20" y="37" width="13" height="13" rx="4" fill="#d1fae5" />
      <rect className="a-pulse ad-1" x="36" y="37" width="13" height="13" rx="4" fill="#6ee7b7" />
      <rect className="a-pulse ad-2" x="20" y="54" width="13" height="13" rx="4" fill="#6ee7b7" />
      <rect className="a-pulse ad-3" x="36" y="54" width="13" height="13" rx="4" fill="#d1fae5" />
      <rect x="26" y="76" width="16" height="3.5" rx="1.75" fill={EDGE} />
      {/* A tap that keeps landing. */}
      <circle className="a-ripple" cx="49" cy="60" r="11" stroke="#059669" strokeWidth="2.5" opacity="0.5" />
      <circle className="a-pulse" cx="49" cy="60" r="6" fill="#059669" />
    </Scene>
  )
}

/** An open book with a cover standing behind it. */
function BookArt(p) {
  return (
    <Scene {...p}>
      <g className="a-float-far">
        <rect x="30" y="6" width="36" height="46" rx="4" fill="#db2777" />
        <rect x="30" y="6" width="7" height="46" rx="3" fill="#9d174d" />
        <rect x="42" y="18" width="18" height="4" rx="2" fill="#fbcfe8" />
        <rect x="42" y="27" width="12" height="3.5" rx="1.75" fill="#f9a8d4" />
      </g>
      {/* The open book rocks on its spine, the way one does in a hand. */}
      <g className="a-rock">
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
      </g>
      <Sparkle x="80" y="22" s={1.3} />
    </Scene>
  )
}

/** A parcel in front of a rising bar chart, with the reviews above it. */
function AmazonArt(p) {
  return (
    <Scene {...p}>
      <rect className="a-rise" x="54" y="48" width="11" height="32" rx="4" fill="#fcd34d" />
      <rect className="a-rise ad-2" x="69" y="36" width="11" height="44" rx="4" fill="#fbbf24" />
      <rect className="a-rise ad-4" x="84" y="26" width="11" height="54" rx="4" fill="#d97706" />
      <g className="a-float-far">
        <path d="M50 40l12-12 9 8 16-17" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M77 17h13v13" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="a-float">
        <rect x="6" y="46" width="44" height="36" rx="6" fill="#fbbf24" />
        <path d="M6 52a6 6 0 016-6h38a6 6 0 016 6v6H6z" fill="#f59e0b" />
        <rect x="24" y="46" width="8" height="36" fill="#fde68a" />
        <path d="M14 66c8 5 16 5 24 0" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path className="a-twinkle" d="M11 16l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4L6.5 30l.9-5-3.6-3.5 5-.7z" fill="#f59e0b" />
      <path className="a-twinkle ad-2" d="M27 16l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4L22.5 30l.9-5-3.6-3.5 5-.7z" fill="#f59e0b" />
      <path className="a-twinkle ad-4" d="M43 16l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4L38.5 30l.9-5-3.6-3.5 5-.7z" fill="#fcd34d" />
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
      <rect className="a-float" x="4" y="14" width="18" height="14" rx="4" fill="#2563eb" />
      <rect className="a-float ad-1" x="24" y="14" width="14" height="14" rx="4" fill="#93c5fd" />
      <rect className="a-float ad-2" x="40" y="14" width="20" height="14" rx="4" fill="#2563eb" />
      <rect className="a-float ad-3" x="4" y="34" width="26" height="14" rx="4" fill="#c4b5fd" />
      <rect className="a-float ad-4" x="32" y="34" width="28" height="14" rx="4" fill="#8b5cf6" />
      <g className="a-scrub" style={{ '--travel': '-26px' }}>
        <path d="M36 8v50" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
        <circle cx="36" cy="8" r="4.5" fill="#f97316" />
      </g>
    </Small>
  )
}

/** A thumbnail with a big headline bar, and a cursor about to click it. */
function ThumbnailArt(p) {
  return (
    <Small {...p}>
      <rect x="10" y="6" width="48" height="30" rx="5" fill={FAINT} />
      <rect x="4" y="14" width="48" height="32" rx="5" fill={NIGHT} />
      <rect className="a-sheen" x="9" y="19" width="26" height="8" rx="3" fill="#f97316" />
      <rect className="a-sheen ad-2" x="9" y="31" width="18" height="5" rx="2.5" fill="#94a3b8" />
      <g className="a-pulse">
        <circle cx="43" cy="31" r="7" fill={PAPER} />
        <path d="M41 27.6l5 3.4-5 3.4z" fill="#f97316" />
      </g>
      <path
        className="a-float-far"
        d="M40 44l16 8-6.5 2.2L46 60z"
        fill={PAPER}
        stroke={NIGHT}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </Small>
  )
}

/** A mark landing in frame with rays: the branded opener. */
function IntroArt(p) {
  return (
    <Small {...p}>
      <rect x="4" y="10" width="56" height="40" rx="6" fill={NIGHT} />
      {/* Rays out, mark in: the opener, on a loop. */}
      <g className="a-sheen">
        <path
          d="M32 20v-8M32 56v-8M14 34H6M58 34h-8M20 22l-5-5M44 22l5-5"
          stroke="#fbbf24"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>
      <circle className="a-pulse" cx="32" cy="30" r="8" fill="#8b5cf6" />
      <g transform="rotate(-25 32 30)">
        <ellipse className="a-spin" cx="32" cy="30" rx="16" ry="6.5" stroke="#fbbf24" strokeWidth="2.6" />
      </g>
    </Small>
  )
}

/** A vertical clip with a like on it. */
function ShortsArt(p) {
  return (
    <Small {...p}>
      <rect x="16" y="4" width="32" height="56" rx="8" fill="#db2777" />
      <rect x="21" y="12" width="22" height="40" rx="4" fill="#fce7f3" />
      <path className="a-pulse" d="M29 26l10 6-10 6z" fill="#db2777" />
      <path
        className="a-beat"
        d="M52 40c0-3.2 3.8-4.2 5.4-1.6 1.6-2.6 5.4-1.6 5.4 1.6 0 3.4-5.4 7-5.4 7s-5.4-3.6-5.4-7z"
        fill="#f97316"
      />
      <circle className="a-float" cx="9" cy="20" r="4" fill="#f9a8d4" />
      <circle className="a-float ad-3" cx="7" cy="44" r="3" fill="#f9a8d4" />
    </Small>
  )
}

/** The mark itself, mid-spin. */
function LogoMotionArt(p) {
  return (
    <Small {...p}>
      <path className="a-sheen" d="M13 44a22 22 0 010-24" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
      <path className="a-sheen ad-2" d="M6 48a30 30 0 010-32" stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round" />
      <circle className="a-pulse" cx="36" cy="32" r="11" fill="#2563eb" />
      <g transform="rotate(-25 36 32)">
        <ellipse className="a-spin" cx="36" cy="32" rx="22" ry="9" stroke="#8b5cf6" strokeWidth="3.2" />
      </g>
      <circle className="a-float" cx="53" cy="20" r="4" fill="#f97316" />
    </Small>
  )
}

/** A clapperboard for the film and advert work. */
function AdvertArt(p) {
  return (
    <Small {...p}>
      <rect x="6" y="24" width="52" height="32" rx="6" fill={NIGHT} />
      {/* The clapper hinges on its left corner and keeps calling action. */}
      <g className="a-clap">
        <path
          d="M8.5 8.2l48.3 6.4a4 4 0 013.4 4.5l-.7 5.2-55.4-7.4.7-5.2a4 4 0 013.7-3.5z"
          fill="#475569"
        />
        <path d="M18 9.5l-6 9M32 11.5l-6 9M46 13.5l-6 9" stroke={PAPER} strokeWidth="3" strokeLinecap="round" />
      </g>
      <rect className="a-sheen" x="14" y="33" width="24" height="4" rx="2" fill="#64748b" />
      <rect className="a-sheen ad-2" x="14" y="43" width="14" height="4" rx="2" fill="#64748b" />
      <g className="a-pulse">
        <circle cx="47" cy="42" r="7" fill="#f97316" />
        <path d="M45 38.8l4.6 3.2-4.6 3.2z" fill={PAPER} />
      </g>
    </Small>
  )
}

/** Mixer faders and a levelled waveform. */
function SoundArt(p) {
  return (
    <Small {...p}>
      <path d="M6 32h4M56 32h2" stroke={FAINT} strokeWidth="2" strokeLinecap="round" />
      <rect className="a-rise" x="10" y="26" width="5" height="12" rx="2.5" fill="#a78bfa" />
      <rect className="a-rise ad-1" x="19" y="18" width="5" height="28" rx="2.5" fill="#7c3aed" />
      <rect className="a-rise ad-2" x="28" y="10" width="5" height="44" rx="2.5" fill="#a78bfa" />
      <rect className="a-rise ad-3" x="37" y="20" width="5" height="24" rx="2.5" fill="#7c3aed" />
      <rect className="a-rise ad-4" x="46" y="27" width="5" height="10" rx="2.5" fill="#a78bfa" />
      <circle className="a-float ad-1" cx="21.5" cy="38" r="4.5" fill={PAPER} stroke="#7c3aed" strokeWidth="2.5" />
      <circle className="a-float ad-3" cx="30.5" cy="22" r="4.5" fill={PAPER} stroke="#f97316" strokeWidth="2.5" />
      <circle className="a-float ad-5" cx="39.5" cy="34" r="4.5" fill={PAPER} stroke="#7c3aed" strokeWidth="2.5" />
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
      {/* The caption changes as the line is spoken. */}
      <rect className="a-sheen" x="14" y="42" width="18" height="3.5" rx="1.75" fill="#0b1733" />
      <rect className="a-sheen ad-3" x="35" y="42" width="11" height="3.5" rx="1.75" fill="#f97316" />
      <g className="a-pulse">
        <rect x="40" y="14" width="16" height="12" rx="4" fill="#059669" />
        <path d="M46.5 18.2a2.8 2.8 0 100 3.6M52 18.2a2.8 2.8 0 100 3.6" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
      </g>
    </Small>
  )
}

/* ---------------------------------------------------------------- add-ons */

/** A fanned stack of printed cards, the top one carrying the mark. */
function CardsArt(p) {
  return (
    <Small {...p}>
      <g transform="rotate(-13 32 38)">
        <rect x="8" y="24" width="46" height="28" rx="5" fill={FAINT} stroke={EDGE} strokeWidth="1.6" />
      </g>
      <g transform="rotate(-6 32 36)">
        <rect x="9" y="20" width="46" height="28" rx="5" fill="#e0e7ff" stroke={EDGE} strokeWidth="1.6" />
      </g>
      <g className="a-float">
        <rect x="10" y="14" width="46" height="28" rx="5" fill={PAPER} stroke={EDGE} strokeWidth="1.8" />
        <circle className="a-pulse" cx="22" cy="24" r="5.5" fill="#2563eb" />
        <rect x="31" y="21" width="18" height="3.4" rx="1.7" fill="#93c5fd" />
        <rect x="31" y="28" width="12" height="3" rx="1.5" fill={FAINT} />
        <rect x="17" y="34" width="26" height="3" rx="1.5" fill={FAINT} />
      </g>
      <Sparkle x="56" y="12" s={1} fill="#f97316" />
    </Small>
  )
}

/** A globe wired to a server: the domain, then the box it lives on. */
function HostingArt(p) {
  return (
    <Small {...p}>
      <g className="a-float">
        <circle cx="26" cy="22" r="15" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.2" />
        <path d="M11 22h30M26 7c7 8 7 22 0 30M26 7c-7 8-7 22 0 30" stroke="#7c3aed" strokeWidth="2" />
      </g>
      {/* The link from the name to the machine, pulsing along. */}
      <path d="M41 30c8 2 10 6 10 10" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="3 4" />
      <rect x="20" y="42" width="38" height="9" rx="3.5" fill={PAPER} stroke={EDGE} strokeWidth="1.8" />
      <rect x="20" y="53" width="38" height="9" rx="3.5" fill={PAPER} stroke={EDGE} strokeWidth="1.8" />
      <circle className="a-twinkle" cx="26" cy="46.5" r="2.4" fill="#34d399" />
      <circle className="a-twinkle ad-2" cx="26" cy="57.5" r="2.4" fill="#34d399" />
      <rect className="a-sheen" x="33" y="45" width="18" height="3" rx="1.5" fill={FAINT} />
      <rect className="a-sheen ad-3" x="33" y="56" width="12" height="3" rx="1.5" fill={FAINT} />
      <Sparkle x="55" y="14" s={0.9} fill="#a78bfa" />
    </Small>
  )
}

/** A shield with a tick, watched over by a turning cog: the care plan. */
function CareArt(p) {
  return (
    <Small {...p}>
      <path
        className="a-float"
        d="M30 6l19 7v16c0 13-8 22-19 27-11-5-19-14-19-27V13z"
        fill="#d1fae5"
        stroke="#059669"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path className="a-pulse" d="M21 30l7 7 13-14" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Maintenance, quietly turning over in the corner. */}
      <g className="a-spin">
        <path
          d="M50 38l3.6.8 2.2-3 2.6 2.6-3 2.2.8 3.6-3.6.9-.9 3.6-3.6-.9.8-3.6-3-2.2 2.6-2.6 2.2 3z"
          fill="#047857"
        />
        <circle cx="51.5" cy="45" r="3.4" fill={PAPER} />
      </g>
      <Sparkle x="9" y="52" s={0.9} fill="#6ee7b7" />
    </Small>
  )
}

/** One page, then another sliding out from behind it. */
function PagesArt(p) {
  return (
    <Small {...p}>
      <g className="a-float-far">
        <rect x="26" y="8" width="32" height="42" rx="5" fill="#cffafe" stroke="#0891b2" strokeWidth="1.8" />
        <rect x="32" y="16" width="18" height="3.4" rx="1.7" fill="#67e8f9" />
        <rect x="32" y="24" width="13" height="3" rx="1.5" fill="#a5f3fc" />
      </g>
      <rect x="8" y="14" width="34" height="44" rx="6" fill={PAPER} stroke={EDGE} strokeWidth="2" />
      <rect x="14" y="21" width="22" height="7" rx="3" fill="#0891b2" />
      <rect className="a-sheen" x="14" y="33" width="18" height="3.4" rx="1.7" fill={FAINT} />
      <rect className="a-sheen ad-2" x="14" y="41" width="22" height="3.4" rx="1.7" fill={FAINT} />
      <rect className="a-sheen ad-4" x="14" y="49" width="12" height="3.4" rx="1.7" fill={FAINT} />
      {/* The page being added. */}
      <g className="a-pulse">
        <circle cx="50" cy="52" r="9" fill="#0891b2" />
        <path d="M50 47.5v9M45.5 52h9" stroke={PAPER} strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </Small>
  )
}

/** A stopwatch with a paper plane shooting past it. */
function RushArt(p) {
  return (
    <Small {...p}>
      <path d="M4 19h11M2 29h8M5 39h11" stroke="#fdba74" strokeWidth="2.6" strokeLinecap="round" className="a-scrub" style={{ '--travel': '-8px' }} />
      <g className="a-float">
        <circle cx="32" cy="29" r="16" fill={PAPER} stroke="#ea580c" strokeWidth="2.6" />
        <rect x="27" y="5" width="10" height="4.6" rx="2.3" fill="#ea580c" />
        <rect x="29.5" y="9" width="5" height="4" fill="#ea580c" />
        {/* The hand sweeps the dial, which is the whole promise. It has to turn
            about the centre of the face, not about its own thin bounding box,
            so it takes the view-box origin the way the orbits do. */}
        <g className="a-spin" style={{ transformBox: 'view-box', transformOrigin: '32px 29px' }}>
          <path d="M32 29V18" stroke="#f97316" strokeWidth="3.2" strokeLinecap="round" />
        </g>
        <circle cx="32" cy="29" r="2.8" fill="#0b1733" />
      </g>
      {/* The job, already on its way out. The float lives on an inner group
          because a CSS transform would overwrite the placement attribute. */}
      <g transform="translate(41 44) scale(0.9)">
        <g className="a-float-far">
          <path d="M2 21l21-9L2 3v7l15 2-15 2z" fill="#f97316" />
        </g>
      </g>
    </Small>
  )
}

/** A phone catching an update, with the badge that says one is waiting. */
function AppCareArt(p) {
  return (
    <Small {...p}>
      <rect x="16" y="6" width="32" height="52" rx="8" fill={PAPER} stroke={EDGE} strokeWidth="2" />
      <path d="M16 14a8 8 0 018-8h16a8 8 0 018 8v5H16z" fill="#db2777" />
      <rect x="27" y="10" width="10" height="2.6" rx="1.3" fill="#fbcfe8" />
      {/* The refresh arrow keeps coming round. The placement sits on an outer
          group so the spin, which is a CSS transform, does not overwrite it. */}
      <g transform="translate(21 22) scale(0.92)">
        <g className="a-spin">
          <path
            d="M17.65 6.35A7.96 7.96 0 0012 4a8 8 0 108 8h-2a6 6 0 11-6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"
            fill="#db2777"
          />
        </g>
      </g>
      <rect className="a-fill" x="22" y="46" width="20" height="4" rx="2" fill="#f9a8d4" />
      {/* The badge that says an update is waiting. */}
      <g className="a-beat">
        <circle cx="47" cy="12" r="7" fill="#f97316" stroke={PAPER} strokeWidth="2" />
        <path d="M47 8.5v6M44.4 11.9l2.6 2.6 2.6-2.6" stroke={PAPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Small>
  )
}

/** A grid of posts with a heart lifting off it. */
function SocialArt(p) {
  return (
    <Small {...p}>
      <rect x="6" y="16" width="42" height="42" rx="7" fill={PAPER} stroke={EDGE} strokeWidth="2" />
      <rect className="a-pulse" x="12" y="22" width="14" height="14" rx="4" fill="#fbbf24" />
      <rect className="a-pulse ad-1" x="29" y="22" width="14" height="14" rx="4" fill="#fde68a" />
      <rect className="a-pulse ad-2" x="12" y="39" width="14" height="14" rx="4" fill="#fde68a" />
      <rect className="a-pulse ad-3" x="29" y="39" width="14" height="14" rx="4" fill="#d97706" />
      <path
        className="a-beat"
        d="M50 20c0-3.6 4.3-4.7 6.1-1.8 1.8-2.9 6.1-1.8 6.1 1.8 0 3.8-6.1 7.9-6.1 7.9S50 23.8 50 20z"
        fill="#f97316"
      />
      <Sparkle x="55" y="44" s={1.1} />
      <Sparkle x="9" y="9" s={0.85} fill="#fcd34d" className="a-twinkle ad-3" />
    </Small>
  )
}

export const addOnArt = {
  cards: CardsArt,
  hosting: HostingArt,
  care: CareArt,
  pages: PagesArt,
  rush: RushArt,
  appCare: AppCareArt,
  social: SocialArt,
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
  cyan: { accent: '8 145 178', ink: '14 116 144', lift: '103 232 249' },
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
