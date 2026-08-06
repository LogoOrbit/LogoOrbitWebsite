import { useEffect, useState } from 'react'
import { Icons } from './Icons'
import { whatsapp, whatsappLink } from '../lib/site'
import { crispWebsiteId } from '../lib/livechat'

/**
 * The quick-question button, bottom right on every page.
 *
 * Three things make it read as "you can talk to a person right now" rather
 * than as another icon in a corner:
 *
 *   1. it is there from the first paint, it does not wait for a scroll,
 *   2. a green ring pulses out of it, so it moves in peripheral vision,
 *   3. a small prompt slides out on its own a few seconds in, once, and can
 *      be dismissed for the rest of the session.
 *
 * On a phone it sits clear of the sticky call bar; on a desktop the call
 * button stacks above it.
 */
export default function WhatsAppButton() {
  const [prompt, setPrompt] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem('wa-hidden') === 'true') {
      setHidden(true)
      return
    }
    if (typeof window !== 'undefined' && window.sessionStorage.getItem('wa-prompt') === 'seen') {
      setDismissed(true)
      return
    }
    /* With live chat on, this card stays shut. It grows upward out of the
       button and is tall enough to reach the live chat launcher stacked above
       it, so the two draw on top of each other — and even if they did not, one
       corner popping two invitations at a reader within seconds of each other
       reads as nagging. The button, its ring and the hover label all stay; only
       the card that opens on its own stands down. */
    if (crispWebsiteId()) {
      setDismissed(true)
      return
    }
    const show = setTimeout(() => setPrompt(true), 3200)
    const hide = setTimeout(() => setPrompt(false), 15000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  const close = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setPrompt(false)
    setDismissed(true)
    if (typeof window !== 'undefined') window.sessionStorage.setItem('wa-prompt', 'seen')
  }

  const hideButton = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setHidden(true)
    if (typeof window !== 'undefined') window.localStorage.setItem('wa-hidden', 'true')
  }

  if (hidden) return null

  return (
    <div className="fixed right-4 bottom-24 xl:right-6 xl:bottom-6 z-40 flex flex-col items-end gap-3">
      {/* The prompt. Pointer events are off while it is hidden so it can
          never sit invisibly on top of page content. */}
      <div
        className={`max-w-[17rem] origin-bottom-right transition-all duration-300 ${
          prompt && !dismissed ? 'opacity-100 translate-y-0 scale-100' : 'pointer-events-none opacity-0 translate-y-2 scale-95'
        }`}
      >
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block rounded-2xl rounded-br-md border border-slate-200 bg-white p-4 pr-9 shadow-2xl shadow-ink-900/15"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Hide the WhatsApp prompt"
            className="absolute right-2 top-2 grid place-items-center w-6 h-6 rounded-full text-ink-300 hover:bg-slate-100 hover:text-ink-700 transition-colors"
          >
            <Icons.close className="w-3.5 h-3.5" />
          </button>
          <p className="text-[15px] font-bold text-ink-900">Got a quick question?</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-500">
            Message us on WhatsApp and a real person answers, usually in minutes.
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#128c4a]">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#25d366] opacity-70 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#25d366]" />
            </span>
            {whatsapp.display}
          </span>
        </a>
      </div>

      <div className="group relative">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setDismissed(true)}
          aria-label={`Chat with LogoOrbit on WhatsApp, ${whatsapp.display}`}
          title="Chat with us on WhatsApp"
          className="relative grid place-items-center w-15 h-15 rounded-full bg-gradient-to-br from-[#2fd66f] to-[#128c4a] text-white shadow-2xl shadow-[#128c4a]/40 animate-pulse-ring-wa transition-transform duration-300 hover:scale-110 active:scale-95"
        >
          <Icons.whatsapp className="w-8 h-8 animate-wa-nudge" />

          {/* Hover label, desktop only, so the button explains itself before
              anyone has to click it. */}
          <span className="pointer-events-none absolute right-full mr-3 hidden xl:block whitespace-nowrap rounded-full bg-ink-900 px-3.5 py-2 text-sm font-semibold text-white opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
            Chat on WhatsApp
          </span>

          <span className="absolute -top-0.5 -right-0.5 grid place-items-center w-5 h-5 rounded-full bg-action-500 text-[11px] font-bold text-white ring-2 ring-white">
            1
          </span>
        </a>

        {/* Lets anyone who finds the button annoying get rid of it for good. */}
        <button
          type="button"
          onClick={hideButton}
          aria-label="Hide the WhatsApp button"
          title="Hide this button"
          className="absolute -top-1.5 -left-1.5 grid place-items-center w-5 h-5 rounded-full bg-white text-ink-500 shadow-md ring-1 ring-slate-200 transition-colors duration-200 hover:bg-slate-100 hover:text-ink-700"
        >
          <Icons.close className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
