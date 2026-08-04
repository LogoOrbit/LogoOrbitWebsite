/**
 * Who gets told when someone fills something in on the site.
 *
 * Every form on the site — the contact form, the briefs and the cart — ends up
 * as an email, and the owner wants a copy of all of them in one personal inbox
 * rather than only in whichever desk mailbox the environment happens to name.
 * So the owner's address is always in the list, and the environment variable
 * decides who else is on it rather than replacing the list entirely.
 */

/** The one address that is copied on everything, whatever the environment says. */
export const OWNER_INBOX = 'asadsyed711@gmail.com'

/**
 * Builds the recipient list for a desk notification.
 *
 * `configured` is the raw environment variable, which may hold a single address
 * or a comma-separated set. `fallback` is used when nothing is configured.
 * Duplicates are dropped so Resend is never handed the same address twice.
 */
export function deskRecipients(configured, fallback = []) {
  const named = String(configured || '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)

  return [...new Set([OWNER_INBOX, ...(named.length ? named : fallback)])]
}
