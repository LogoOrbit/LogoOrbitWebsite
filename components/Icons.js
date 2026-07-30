const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ children, className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      {children}
    </svg>
  )
}

export const Icons = {
  logo: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="3.2" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4.6" transform="rotate(-28 12 12)" />
      <circle cx="19.4" cy="8.2" r="1.4" />
    </Svg>
  ),
  website: (p) => (
    <Svg {...p}>
      <rect x="2.5" y="4" width="19" height="15" rx="2.2" />
      <path d="M2.5 8.6h19" />
      <path d="M5.6 6.3h.01M8 6.3h.01M10.4 6.3h.01" />
      <path d="M7 12.4h6M7 15.4h9" />
    </Svg>
  ),
  animation: (p) => (
    <Svg {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.2" />
      <path d="M10 9.6l4.6 2.6-4.6 2.6z" />
      <path d="M6 2.6l.9 1.6M18 2.6l-.9 1.6" />
    </Svg>
  ),
  mobile: (p) => (
    <Svg {...p}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
      <path d="M10.6 5.4h2.8" />
      <circle cx="12" cy="18" r="0.9" />
    </Svg>
  ),
  book: (p) => (
    <Svg {...p}>
      <path d="M4 4.5A1.5 1.5 0 015.5 3H10a2.5 2.5 0 012.5 2.5V21a2 2 0 00-2-2H4z" />
      <path d="M20 4.5A1.5 1.5 0 0018.5 3H14a2.5 2.5 0 00-2.5 2.5V21a2 2 0 012-2H20z" />
    </Svg>
  ),
  amazon: (p) => (
    <Svg {...p}>
      <path d="M4 6h16l-1.4 9.4a2 2 0 01-2 1.7H7.4a2 2 0 01-2-1.7z" />
      <path d="M9 6a3 3 0 016 0" />
      <path d="M4.5 20.4c3.6 1.8 11.4 1.8 15-.6" />
    </Svg>
  ),
  spark: (p) => (
    <Svg {...p}>
      <path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7z" />
      <path d="M18.5 16.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />
    </Svg>
  ),
  clock: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2V12l3.2 1.9" />
    </Svg>
  ),
  layers: (p) => (
    <Svg {...p}>
      <path d="M12 3l8.5 4.4L12 11.8 3.5 7.4z" />
      <path d="M3.5 12.2L12 16.6l8.5-4.4" />
      <path d="M3.5 16.8L12 21.2l8.5-4.4" />
    </Svg>
  ),
  shield: (p) => (
    <Svg {...p}>
      <path d="M12 2.8l7.5 3v5.6c0 4.4-3.1 8.4-7.5 9.8-4.4-1.4-7.5-5.4-7.5-9.8V5.8z" />
      <path d="M9 12.1l2.1 2.1 4-4.2" />
    </Svg>
  ),
  team: (p) => (
    <Svg {...p}>
      <circle cx="9" cy="8.4" r="3.2" />
      <path d="M2.8 19.6a6.2 6.2 0 0112.4 0" />
      <path d="M16.4 5.6a3.2 3.2 0 010 6.2M17.6 14a5.6 5.6 0 013.6 5.2" />
    </Svg>
  ),
  shop: (p) => (
    <Svg {...p}>
      <path d="M3.6 8.6L5 4h14l1.4 4.6a3 3 0 01-5.6 2 3 3 0 01-5.6 0 3 3 0 01-5.6-2z" />
      <path d="M5 11.4V20h14v-8.6" />
      <path d="M10 20v-4.6h4V20" />
    </Svg>
  ),
  phone: (p) => (
    <Svg {...p}>
      <path d="M6.2 3.5h3l1.5 4-2 1.3a12 12 0 006.5 6.5l1.3-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.2 5.7a2 2 0 012-2.2z" />
    </Svg>
  ),
  mail: (p) => (
    <Svg {...p}>
      <rect x="2.5" y="4.8" width="19" height="14.4" rx="2.2" />
      <path d="M3.2 6.6L12 12.8l8.8-6.2" />
    </Svg>
  ),
  pin: (p) => (
    <Svg {...p}>
      <path d="M12 21.4s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </Svg>
  ),
  check: (p) => (
    <Svg {...p}>
      <path d="M4.5 12.6l5 5L19.5 6.6" />
    </Svg>
  ),
  arrow: (p) => (
    <Svg {...p}>
      <path d="M5 12h13.5" />
      <path d="M13 6.5l5.5 5.5-5.5 5.5" />
    </Svg>
  ),
  play: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M10.2 8.8l5.4 3.2-5.4 3.2z" />
    </Svg>
  ),
  quote: (p) => (
    <Svg {...p}>
      <path d="M9.4 6.4C6.6 7.6 5 10 5 13.1c0 2.6 1.5 4.5 3.7 4.5 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.2-3-3.2-.3 0-.6 0-.8.1.3-1.4 1.4-2.6 3-3.3z" />
      <path d="M19 6.4c-2.8 1.2-4.4 3.6-4.4 6.7 0 2.6 1.5 4.5 3.7 4.5 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.2-3-3.2-.3 0-.6 0-.8.1.3-1.4 1.4-2.6 3-3.3z" />
    </Svg>
  ),
  menu: (p) => (
    <Svg {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  ),
  close: (p) => (
    <Svg {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  ),
  plus: (p) => (
    <Svg {...p}>
      <path d="M12 5.5v13M5.5 12h13" />
    </Svg>
  ),
}

export const serviceIcon = {
  logo: Icons.logo,
  website: Icons.website,
  animation: Icons.animation,
  mobile: Icons.mobile,
  book: Icons.book,
  amazon: Icons.amazon,
}

export function Star({ className = 'w-4 h-4', half = false, id = 'star' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {half && (
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      )}
      <path
        fill={half ? `url(#${id})` : 'currentColor'}
        d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z"
      />
    </svg>
  )
}
