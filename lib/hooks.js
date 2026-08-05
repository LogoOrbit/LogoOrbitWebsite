import { useEffect, useRef, useState } from 'react'

/** Reveals an element once it scrolls into view. Returns [ref, isVisible]. */
export function useInView({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return [ref, inView]
}

/** Counts from 0 up to `target` once `start` flips true. */
export function useCountUp(target, start, duration = 1700) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    let frame
    let began

    const tick = (now) => {
      if (began === undefined) began = now
      const progress = Math.min((now - began) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, start, duration])

  return value
}

/* ------------------------------------------------------------ scroll lock */

/**
 * How many things currently want the page behind them to stop scrolling.
 *
 * The drawer, the search palette and the offer popup each used to set
 * `document.body.style.overflow` themselves and clear it on the way out, which
 * breaks the moment two of them overlap — and two of them do. Opening search
 * from the mobile drawer closes the drawer and opens the palette in the same
 * commit; the palette is a child of the nav, so its effect ran first and set
 * the lock, and the drawer's cleanup then ran and cleared it. The result was a
 * modal search dialog over a page that scrolled freely behind it.
 *
 * Counting instead of assigning means the lock lifts when the last holder lets
 * go, whatever order the effects happen to run in.
 */
let lockCount = 0
let restoreOverflow = ''

/** Stops the page behind a drawer or dialog scrolling while `active`. */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return

    if (lockCount === 0) {
      restoreOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount += 1

    return () => {
      lockCount -= 1
      if (lockCount === 0) document.body.style.overflow = restoreOverflow
    }
  }, [active])
}

/* --------------------------------------------------------------- scrolling */

/** True once the page has been scrolled past `offset` pixels. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}
