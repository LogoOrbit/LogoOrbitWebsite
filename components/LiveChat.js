import { useEffect, useState } from 'react'
import { Icons } from './Icons'
import { site } from '../lib/site'
import { crispWebsiteId } from '../lib/livechat'

/**
 * Live chat: talk to the team without leaving the page.
 *
 * The site already had two ways to reach a person, and both of them cost the
 * visitor something. The phone asks them to speak to a stranger. WhatsApp
 * asks them to hand over a phone number and switch app. Somebody halfway down
 * the pricing page with one question about a package will usually do neither,
 * and simply leaves. This is the channel for that person: a box, in the page,
 * answered by whoever on the sales or support desk is free.
 *
 * Three things are worth knowing about how it is wired.
 *
 * 1. Crisp is not loaded on page load. Their client is a few hundred KB and
 *    it would land on all three hundred pages of this site to serve the small
 *    fraction of visits that open a chat — the same weight the last round of
 *    performance work went out of its way to remove. The button below is ours,
 *    it is plain markup, and the vendor script is fetched on the click.
 *
 * 2. Except for people who have already written to us. If a visitor started a
 *    conversation on an earlier visit, an agent's reply is worthless if it
 *    only appears once they think to click. For them the client loads quietly
 *    in the background after the page is idle, with the widget hidden, so an
 *    unread reply can raise the badge on its own.
 *
 * 3. Crisp's own launcher stays hidden the whole time. It cannot be moved out
 *    of the corner the WhatsApp button owns, and it does not look like the
 *    rest of the site. So we drive the chatbox by API — show, open, hide —
 *    and render our own control, stacked above WhatsApp.
 */

/* Module scope, not component state, on purpose: the loader must not run
   twice, and the badge must survive a route change. */
let scriptRequested = false
let listenersBound = false
const badgeListeners = new Set()
let unreadCount = 0

const RETURNING_KEY = 'lo-chat-started'

function setUnread(next) {
  unreadCount = next
  badgeListeners.forEach((fn) => fn(unreadCount))
}

function queue(...args) {
  if (typeof window === 'undefined') return
  window.$crisp = window.$crisp || []
  window.$crisp.push(...args)
}

/**
 * Injects the Crisp client once. Everything pushed onto `window.$crisp`
 * before the script arrives is replayed by it on boot, so the configuration
 * and the event handlers below are safe to queue up first.
 */
function loadCrisp() {
  if (typeof window === 'undefined' || !crispWebsiteId() || scriptRequested) return
  scriptRequested = true

  window.$crisp = window.$crisp || []
  window.CRISP_WEBSITE_ID = crispWebsiteId()
  /* "safe" tells Crisp to swallow its own errors rather than throw into our
     page. A vendor widget failing is not a reason for the site to break. */
  queue(['safe', true])
  queue(['do', 'chat:hide'])

  if (!listenersBound) {
    listenersBound = true
    queue(['on', 'chat:opened', () => setUnread(0)])
    /* Closing the chatbox hides Crisp's launcher with it, which hands the
       corner back to our button. */
    queue(['on', 'chat:closed', () => queue(['do', 'chat:hide'])])
    queue([
      'on',
      'message:received',
      () => {
        const opened = window.$crisp && typeof window.$crisp.is === 'function' && window.$crisp.is('chat:opened')
        if (!opened) setUnread(unreadCount + 1)
      },
    ])
  }

  const s = document.createElement('script')
  s.src = 'https://client.crisp.chat/l.js'
  s.async = true
  document.head.appendChild(s)
}

/**
 * Opens the chatbox from anywhere — a "chat to us instead" link in a contact
 * panel, a button on a service page. Returns false when live chat is switched
 * off, so a caller can fall back to the phone or to WhatsApp.
 */
export function openLiveChat(message) {
  if (!crispWebsiteId()) return false
  loadCrisp()
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(RETURNING_KEY, 'true')
    } catch {
      /* Private browsing. The chat still works, it just will not reopen
         itself on the next visit. */
    }
  }
  queue(['do', 'chat:show'])
  queue(['do', 'chat:open'])
  if (message) queue(['set', 'message:text', [message]])
  setUnread(0)
  return true
}

export default function LiveChat() {
  const [unread, setUnreadState] = useState(unreadCount)
  const [hint, setHint] = useState(false)

  useEffect(() => {
    if (!crispWebsiteId()) return undefined

    badgeListeners.add(setUnreadState)

    let returning = false
    try {
      returning = window.localStorage.getItem(RETURNING_KEY) === 'true'
    } catch {
      returning = false
    }

    /* Someone mid-conversation gets the client warmed up so a reply can
       announce itself. Everyone else pays nothing until they click. */
    let idle
    if (returning) {
      const boot = () => loadCrisp()
      idle =
        typeof window.requestIdleCallback === 'function'
          ? window.requestIdleCallback(boot, { timeout: 4000 })
          : window.setTimeout(boot, 2500)
    }

    /* One nudge, once per session, and only for people who have not chatted
       before — an unread badge is the better prompt for everyone else. */
    let show
    let hide
    try {
      if (!returning && window.sessionStorage.getItem('lo-chat-hint') !== 'seen') {
        show = window.setTimeout(() => setHint(true), 9000)
        hide = window.setTimeout(() => setHint(false), 21000)
      }
    } catch {
      /* No session storage, no hint. */
    }

    return () => {
      badgeListeners.delete(setUnreadState)
      window.clearTimeout(show)
      window.clearTimeout(hide)
      if (idle !== undefined) {
        if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle)
        else window.clearTimeout(idle)
      }
    }
  }, [])

  const dismissHint = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setHint(false)
    try {
      window.sessionStorage.setItem('lo-chat-hint', 'seen')
    } catch {
      /* Nothing to remember it in; the hint simply may return next page. */
    }
  }

  const open = () => {
    setHint(false)
    try {
      window.sessionStorage.setItem('lo-chat-hint', 'seen')
    } catch {
      /* See above. */
    }
    openLiveChat()
  }

  // No inbox configured: render nothing rather than a button that opens air.
  if (!crispWebsiteId()) return null

  return (
    <div className="fixed right-4 bottom-42 xl:right-6 xl:bottom-44 z-40 flex flex-col items-end gap-3">
      {/* Pointer events are off while hidden so the card can never sit
          invisibly on top of the page. */}
      {/* The dismiss control is a sibling of the card's button rather than a
          child of it: a button nested inside a button is invalid markup, and
          screen readers disagree about which one a click landed on. */}
      <div
        className={`relative max-w-[17rem] origin-bottom-right transition-all duration-300 ${
          hint ? 'opacity-100 translate-y-0 scale-100' : 'pointer-events-none opacity-0 translate-y-2 scale-95'
        }`}
      >
        <button
          type="button"
          onClick={dismissHint}
          aria-label="Hide the live chat prompt"
          className="absolute right-2 top-2 z-10 grid place-items-center w-6 h-6 rounded-full text-ink-300 hover:bg-slate-100 hover:text-ink-700 transition-colors"
        >
          <Icons.close className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={open}
          className="block w-full rounded-2xl rounded-br-md border border-slate-200 bg-white p-4 pr-9 text-left shadow-2xl shadow-ink-900/15"
        >
          <span className="block text-[15px] font-bold text-ink-900">Talk to the team</span>
          <span className="mt-1 block text-[13px] leading-relaxed text-ink-500">
            Ask about a package, a deadline or a price. Someone from the studio replies here, in the page.
          </span>
          <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-trust-500 opacity-70 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-trust-500" />
            </span>
            {site.hours}
          </span>
        </button>
      </div>

      <div className="group relative">
        <button
          type="button"
          onClick={open}
          aria-label={unread ? `Open live chat, ${unread} unread ${unread === 1 ? 'reply' : 'replies'}` : 'Open live chat with the LogoOrbit team'}
          title="Chat with the team"
          className="relative grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-2xl shadow-brand-700/40 transition-transform duration-300 hover:scale-110 active:scale-95"
        >
          <Icons.chat className="w-7 h-7" />

          {/* Desktop hover label, so the button explains itself before anyone
              has to commit to a click. */}
          <span className="pointer-events-none absolute right-full mr-3 hidden xl:block whitespace-nowrap rounded-full bg-ink-900 px-3.5 py-2 text-sm font-semibold text-white opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
            Chat with the team
          </span>

          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 grid place-items-center min-w-5 h-5 px-1 rounded-full bg-action-500 text-[11px] font-bold text-white ring-2 ring-white">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
