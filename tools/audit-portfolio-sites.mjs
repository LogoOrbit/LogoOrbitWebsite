import { readFile, writeFile } from 'node:fs/promises'

const sourcePath = process.argv[2]
const outputPath = process.argv[3] || 'site-audit.json'

if (!sourcePath) throw new Error('Pass the candidate-list path as the first argument.')

const source = await readFile(sourcePath, 'utf8')
const lines = source.split(/\r?\n/)
const candidates = []
let category = 'Website'

for (const rawLine of lines) {
  const line = rawLine.trim()
  if (!line) continue
  if (!/^[-*]\s+https?:\/\//i.test(line) && /Web Projects?|WEB Projects?/i.test(line)) {
    category = line.replace(/:\s*$/, '').replace(/\s+Web Projects?/i, '').trim()
    continue
  }

  const match = line.match(/https?:\/\/[^\s)]+/i)
  if (!match) continue
  const href = match[0].replace(/[.,;]+$/, '')
  candidates.push({ href, category })
}

const unique = [...new Map(candidates.map((candidate) => {
  const url = new URL(candidate.href)
  url.hash = ''
  const key = `${url.hostname.replace(/^www\./, '')}${url.pathname.replace(/\/$/, '')}`.toLowerCase()
  return [key, { ...candidate, href: url.toString() }]
})).values()]

const entity = (value = '') => value
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
  .replace(/\s+/g, ' ')
  .trim()

async function inspect(candidate) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  const started = Date.now()
  try {
    const response = await fetch(candidate.href, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36',
        accept: 'text/html,application/xhtml+xml',
      },
    })
    const html = (await response.text()).slice(0, 250000)
    const title = entity(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1])
    const description = entity(
      html.match(/<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']*)/i)?.[1]
      || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["'](?:description|og:description)["']/i)?.[1]
    )
    const live = response.status >= 200 && response.status < 400 && /text\/html|application\/xhtml\+xml/i.test(response.headers.get('content-type') || 'text/html')
    return {
      ...candidate,
      live,
      status: response.status,
      finalUrl: response.url,
      title,
      description,
      elapsedMs: Date.now() - started,
    }
  } catch (error) {
    return {
      ...candidate,
      live: false,
      status: 0,
      error: error.name === 'AbortError' ? 'timeout' : error.message,
      elapsedMs: Date.now() - started,
    }
  } finally {
    clearTimeout(timeout)
  }
}

const results = new Array(unique.length)
let cursor = 0
const workers = Array.from({ length: 20 }, async () => {
  while (cursor < unique.length) {
    const index = cursor++
    results[index] = await inspect(unique[index])
    if ((index + 1) % 25 === 0) process.stdout.write(`Checked ${index + 1}/${unique.length}\n`)
  }
})

await Promise.all(workers)
await writeFile(outputPath, `${JSON.stringify(results, null, 2)}\n`)

const live = results.filter((result) => result.live)
console.log(`Finished: ${live.length} live, ${results.length - live.length} excluded, ${results.length} total.`)
