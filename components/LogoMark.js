/**
 * Abstract logo marks rendered as inline SVG so the portfolio stays
 * fully self-contained (no external image requests).
 */

const marks = {
  orbit: (
    <>
      <circle cx="32" cy="32" r="9" fill="currentColor" />
      <ellipse cx="32" cy="32" rx="26" ry="12" transform="rotate(-30 32 32)" stroke="currentColor" strokeWidth="3.5" fill="none" opacity="0.75" />
      <circle cx="52" cy="20" r="4.5" fill="currentColor" opacity="0.9" />
    </>
  ),
  hex: (
    <>
      <path d="M32 5l23 13.5v27L32 59 9 45.5v-27z" stroke="currentColor" strokeWidth="4" fill="none" />
      <path d="M32 19l11 6.5v13L32 45l-11-6.5v-13z" fill="currentColor" opacity="0.85" />
    </>
  ),
  leaf: (
    <>
      <path d="M50 12C26 12 12 26 12 46c0 3 .4 5.6 1 7.6C20 36 33 27 50 24c-13 6-23 16-28 32 22 3 42-11 42-32 0-5-1-9-2-12z" fill="currentColor" />
    </>
  ),
  wave: (
    <>
      <path d="M6 40c8-14 16-14 24 0s16 14 24 0" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M6 26c8-14 16-14 24 0s16 14 24 0" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.45" />
    </>
  ),
  shield: (
    <>
      <path d="M32 5l22 8.5v17C54 43.5 44.6 55 32 59 19.4 55 10 43.5 10 30.5v-17z" fill="currentColor" opacity="0.9" />
      <path d="M23 32l7 7 13-14" stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  peak: (
    <>
      <path d="M6 52l16-30 10 18 7-11 19 23z" fill="currentColor" />
      <circle cx="46" cy="14" r="6" fill="currentColor" opacity="0.55" />
    </>
  ),
  drop: (
    <>
      <path d="M32 4c10 13 17 22 17 30a17 17 0 11-34 0c0-8 7-17 17-30z" fill="currentColor" />
      <path d="M32 44a10 10 0 01-10-10" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.85" />
    </>
  ),
  cube: (
    <>
      <path d="M32 6l24 12v28L32 58 8 46V18z" stroke="currentColor" strokeWidth="3.5" fill="none" />
      <path d="M8 18l24 12 24-12M32 30v28" stroke="currentColor" strokeWidth="3.5" fill="none" opacity="0.6" />
    </>
  ),
  ring: (
    <>
      <circle cx="32" cy="32" r="23" stroke="currentColor" strokeWidth="6" fill="none" opacity="0.3" />
      <path d="M32 9a23 23 0 0123 23" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="32" cy="32" r="7" fill="currentColor" />
    </>
  ),
  bolt: (
    <>
      <path d="M36 4L14 36h14l-6 24 24-34H32z" fill="currentColor" />
    </>
  ),
  bloom: (
    <>
      <circle cx="32" cy="16" r="10" fill="currentColor" opacity="0.9" />
      <circle cx="18" cy="40" r="10" fill="currentColor" opacity="0.6" />
      <circle cx="46" cy="40" r="10" fill="currentColor" opacity="0.75" />
      <circle cx="32" cy="34" r="7" fill="currentColor" />
    </>
  ),
  arch: (
    <>
      <path d="M10 54V30a22 22 0 0144 0v24" stroke="currentColor" strokeWidth="5.5" fill="none" />
      <path d="M24 54V32a8 8 0 0116 0v22" stroke="currentColor" strokeWidth="5.5" fill="none" opacity="0.55" />
    </>
  ),
}

export default function LogoMark({ shape = 'orbit', className = 'w-16 h-16' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {marks[shape] || marks.orbit}
    </svg>
  )
}

export const portfolio = [
  { name: 'Novaris', word: 'NOVARIS', category: 'Technology', shape: 'orbit', color: '#4f46e5', bg: '#eef2ff' },
  { name: 'Hexon Labs', word: 'HEXON', category: 'Technology', shape: 'hex', color: '#0ea5e9', bg: '#e0f2fe' },
  { name: 'Verdant', word: 'VERDANT', category: 'Food & Beverage', shape: 'leaf', color: '#16a34a', bg: '#ecfdf5' },
  { name: 'Tidalwave', word: 'TIDALWAVE', category: 'Travel', shape: 'wave', color: '#0891b2', bg: '#ecfeff' },
  { name: 'Aegis Legal', word: 'AEGIS', category: 'Finance', shape: 'shield', color: '#1e40af', bg: '#eff6ff' },
  { name: 'Summit Peak', word: 'SUMMIT', category: 'Real Estate', shape: 'peak', color: '#7c3aed', bg: '#f5f3ff' },
  { name: 'Purelane', word: 'PURELANE', category: 'Healthcare', shape: 'drop', color: '#0d9488', bg: '#f0fdfa' },
  { name: 'Blockform', word: 'BLOCKFORM', category: 'Technology', shape: 'cube', color: '#4338ca', bg: '#eef2ff' },
  { name: 'Orbitron', word: 'ORBITRON', category: 'Finance', shape: 'ring', color: '#c026d3', bg: '#fdf4ff' },
  { name: 'Voltix', word: 'VOLTIX', category: 'Fitness', shape: 'bolt', color: '#ea580c', bg: '#fff7ed' },
  { name: 'Bloom & Co', word: 'BLOOM&CO', category: 'Beauty', shape: 'bloom', color: '#db2777', bg: '#fdf2f8' },
  { name: 'Archline', word: 'ARCHLINE', category: 'Real Estate', shape: 'arch', color: '#b45309', bg: '#fffbeb' },
]
