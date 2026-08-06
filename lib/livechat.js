/**
 * Whether live chat is switched on, and which Crisp inbox it talks to.
 *
 * This sits in a file of its own rather than in lib/site.js with the rest of
 * the contact details, for a reason worth writing down: lib/site.js exports a
 * constant named `process` — the four "how it works" steps — which shadows the
 * Node global for every line of that module. `process.env.NEXT_PUBLIC_...`
 * there resolves against an array of copy blocks and the build dies while
 * pre-rendering, with an error that points nowhere near the cause.
 *
 * The ID is public by design: it names the inbox to Crisp's own servers and
 * grants nothing. It comes from the environment so the widget can be turned
 * off, or aimed at a test inbox, without a code change. Next substitutes the
 * literal into the browser bundle at build time, so changing it needs a
 * redeploy rather than a restart.
 */
export function crispWebsiteId() {
  return process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || ''
}
