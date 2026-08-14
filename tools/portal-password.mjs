#!/usr/bin/env node
/**
 * Prints an scrypt digest for the /clients portal password.
 *
 *   node tools/portal-password.mjs 'the new password'
 *
 * Paste the single line it prints over PASSWORD_HASH in lib/clientPortal.js and
 * commit. The plaintext never enters the repository, and rotating the digest
 * signs out every live session because the cookie signing key is derived from
 * it.
 *
 * Passing the password as an argument puts it in your shell history; run it
 * with a leading space, or clear the entry afterwards.
 */

import crypto from 'crypto'

const N = 32768
const r = 8
const p = 1
const KEYLEN = 32
const MAXMEM = 128 * 1024 * 1024

const password = process.argv[2]

if (!password) {
  console.error("usage: node tools/portal-password.mjs 'the new password'")
  process.exit(2)
}

// Not a strength meter, just a floor. The digest is committed, so the only
// thing standing between a repo reader and the password is how long it takes
// to guess - and short passwords fall to an offline attack regardless of KDF.
if (password.length < 12) {
  console.error(
    `warning: ${password.length} characters. The digest is committed, so this ` +
      'is exposed to an offline attack by anyone with repo access. 16+ is worth the typing.\n',
  )
}

const salt = crypto.randomBytes(16)
const started = Date.now()
const hash = crypto.scryptSync(password, salt, KEYLEN, { N, r, p, maxmem: MAXMEM })

console.error(`verify cost: ~${Date.now() - started}ms per attempt\n`)
console.log(`scrypt$${N}$${r}$${p}$${salt.toString('hex')}$${hash.toString('hex')}`)
