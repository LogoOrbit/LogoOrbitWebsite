/**
 * Fetches the index once per page load and hands the same promise to every
 * caller, so the palette and the /search page share one download rather than
 * fetching a copy each.
 */
let indexPromise = null
export function loadSearchIndex() {
  if (!indexPromise) {
    indexPromise = fetch('/api/search-index')
      .then((res) => res.json())
      .catch(() => [])
  }
  return indexPromise
}

/**
 * Plain-JS ranking over the flattened site index (lib/searchIndex.js).
 *
 * No search library: the whole index is a few hundred short records, so a
 * single pass of substring/token matching is well under a millisecond and
 * runs on every keystroke with no debounce needed. AND-matching on tokens
 * keeps results relevant; the score just decides the order among matches.
 */
export function rankResults(index, rawQuery, limit = Infinity) {
  const query = rawQuery.trim().toLowerCase()
  if (!query) return []

  const tokens = query.split(/\s+/).filter(Boolean)
  const scored = []

  for (const entry of index) {
    const title = entry.title.toLowerCase()
    const haystack = entry._h || (entry._h = `${title} ${(entry.description || '').toLowerCase()} ${(entry.category || '').toLowerCase()}`)

    if (!tokens.every((t) => haystack.includes(t))) continue

    let score = 0
    if (title === query) score += 1000
    else if (title.startsWith(query)) score += 400
    else if (title.includes(query)) score += 200

    for (const t of tokens) {
      if (title.includes(t)) score += 30
    }
    // Shorter titles that match are usually the more precise hit.
    score -= Math.min(title.length, 60) * 0.5

    scored.push({ entry, score })
  }

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((s) => s.entry)
}
