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
