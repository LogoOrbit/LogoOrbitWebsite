import { useEffect, useState } from 'react'

const Sun = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2M6.3 6.3 4.8 4.8M19.2 19.2l-1.5-1.5M6.3 17.7l-1.5 1.5M19.2 4.8l-1.5 1.5" />
  </svg>
)

const Moon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.5 14.4A8.6 8.6 0 1 1 9.6 3.5a7 7 0 0 0 10.9 10.9z" />
  </svg>
)

/**
 * Light / dark switch. The document class is set before paint by the script in
 * _document, so this only has to read the state back and flip it.
 */
export default function ThemeToggle({ light = false, className = '' }) {
  const [dark, setDark] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
    setReady(true)
  }, [])

  const toggle = () => {
    const next = !dark
    const root = document.documentElement

    // Colour transitions on every element at once look like a glitch.
    root.classList.add('theme-switching')
    root.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch (e) {
      /* private mode, the choice just will not persist */
    }
    window.setTimeout(() => root.classList.remove('theme-switching'), 60)

    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className={`grid place-items-center w-10 h-10 shrink-0 rounded-full border transition-colors ${
        light
          ? 'border-white/25 text-white hover:bg-white/15'
          : 'border-slate-200 text-ink-700 hover:border-brand-300 hover:text-brand-600'
      } ${className}`}
    >
      {/* Before hydration the icon would guess wrong, so render nothing. */}
      {ready && (dark ? <Sun /> : <Moon />)}
    </button>
  )
}
