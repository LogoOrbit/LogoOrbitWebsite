# Issued client certificates

Executed and issued client documents. **This directory is deliberately not
under `public/`.**

Next.js serves everything in `public/` at the site root, with no auth and no
robots exclusion that matters. An issued certificate carries the client's legal
name and their real postal address — for an individual assignee that is a home
address. Moving one of these files into `public/` publishes it, and the URL is
guessable from the client's name. Don't.

If a client needs a copy, send them the file. Do not link it.

## Getting at them: /clients

The staff portal at `/clients` lists every issued certificate and streams the
PDF through `/api/clients/[id]` after checking a session cookie. That route
reads from this directory; it never copies anything into `public/`.

It needs two environment variables on the host, and **refuses to open without
them** rather than falling back to a default password:

```sh
CLIENT_PORTAL_USER=logoorbitclients   # optional, this is the default
CLIENT_PORTAL_PASSWORD=...            # required — no default, no fallback
```

With `CLIENT_PORTAL_PASSWORD` unset the portal answers 503 and says so on the
page. See `.env.example` and `lib/clientPortal.js`.

Adding a newly issued certificate takes two steps: drop the PDF in
`clients/<slug>/`, then add a row to `issuedCertificates` in
`lib/clientPortal.js`. The list is explicit rather than a directory scan, so a
stray file left here while debugging never becomes downloadable.

## What is here

```
clients/<client-slug>/<client-slug>-copyright-assignment-certificate.pdf
```

The print source for each lives beside the specimen in `tools/`, as
`tools/certificate-<client-slug>.html`, and renders with the same script and
the same cost guard as the public sample:

```sh
CHROME=/opt/pw-browsers/chromium tools/build-certificate-pdf.sh \
  tools/certificate-revelation-ministries.html \
  clients/revelation-ministries/revelation-ministries-copyright-assignment-certificate.pdf
```

Run with no arguments, the same script still rebuilds the public specimen at
its old path — that behaviour is unchanged.

## Exhibit A artwork

The certificate source points at its master with a `data-artwork` attribute
holding a repo-relative path minus the extension:

```html
<div class="plate" data-artwork="clients/<slug>/<slug>-mark">
```

`tools/inline-artwork.py` resolves that to `.png`, `.jpg` or `.jpeg` at build
time and inlines it as a data URI, so the PDF stays a single sendable file. No
master on disk means the placeholder is kept and the build says so — it never
renders an empty panel silently.

The master must be **opaque**. Alpha exports as a soft mask, which is a
transparency group the cost guard rejects; the inliner checks the PNG header
first and names the offending file rather than letting the guard fail
obscurely. Flatten onto the plate colour, not onto white — these marks are
often drawn for a dark ground, and Revelation Ministries' tagline is set in
white, so flattening it onto cream erases a line of the mark's own wording.

## Why the source is a copy of the specimen, not a template engine

There is exactly one issued certificate so far. A copy that shares the
specimen's stylesheet verbatim and diffs cleanly against it is easier to audit
— and an auditable diff is the point, because the thing a client compares their
certificate to is the sample they downloaded before buying. When there are
enough of these to make the duplication annoying, factor the body out then, not
before.

The rules that stylesheet enforces still apply to every copy: no alpha, no soft
masks, no gradient behind a border radius. `tools/build-certificate-pdf.sh`
fails the build if a render starts collecting compositing work again.
