import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const dataPath = path.resolve('lib/websites.generated.json')
const imageDir = path.resolve('public/portfolio/websites')
const sites = JSON.parse(await readFile(dataPath, 'utf8'))

async function fetchShot(site) {
  const endpoint = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(site.href)}?w=1200&h=750`
  try {
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(30000) })
    if (!response.ok) return false
    const buffer = Buffer.from(await response.arrayBuffer())
    const image = sharp(buffer)
    const metadata = await image.metadata()
    if ((metadata.width || 0) < 800 || buffer.length < 18000) return false
    const output = path.join(imageDir, `${site.slug}.webp`)
    await image.resize(1200, 750, { fit: 'cover', position: 'top' }).webp({ quality: 76 }).toFile(output)
    site.shot = `/portfolio/websites/${site.slug}.webp`
    return true
  } catch {
    return false
  }
}

async function pass(number) {
  const pending = sites.filter((site) => !site.shot)
  let cursor = 0
  let captured = 0
  const workers = Array.from({ length: 14 }, async () => {
    while (cursor < pending.length) {
      const index = cursor++
      if (await fetchShot(pending[index])) captured += 1
      if ((index + 1) % 30 === 0) process.stdout.write(`Pass ${number}: ${index + 1}/${pending.length}\n`)
    }
  })
  await Promise.all(workers)
  console.log(`Pass ${number} captured ${captured} screenshots.`)
}

await pass(1)
await pass(2)
await writeFile(dataPath, `${JSON.stringify(sites, null, 2)}\n`)
console.log(`Finished: ${sites.filter((site) => site.shot).length}/${sites.length} additional sites have screenshots.`)
