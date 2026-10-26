#!/usr/bin/env node
/**
 * Submit changed URLs to IndexNow (https://www.indexnow.org/documentation). One submission to
 * api.indexnow.org is shared with every participating engine (Bing, Yandex, Seznam, Naver, ...).
 * Google does not use IndexNow.
 *
 * Which URLs count as changed comes from the live sitemap's <lastmod> values:
 *
 *   --snapshot <file>  Compare against the sitemap saved by the previous run: submit URLs that are
 *                      new, whose lastmod changed, or that disappeared (deleted pages). Then write
 *                      the current sitemap to the same file for next time. If the file does not
 *                      exist yet, it is created and nothing is submitted unless --since is given.
 *   --since <date>     Submit URLs whose lastmod falls on or after this date (day granularity).
 *   --urls <list>      Submit exactly these URLs or paths (comma or whitespace separated).
 *   --dry-run          Print what would be submitted; send nothing.
 *
 * Requires INDEXNOW_KEY. The site serves the key at /<key>.txt (src/proxy.ts), and this script
 * checks that file is live before submitting, since IndexNow rejects keys it cannot verify.
 * The key is never printed.
 *
 * Usage:
 *   node --env-file=.env.local scripts/indexnow.mjs --urls /compare,/pricing --dry-run
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { parseArgs } from 'node:util'

const SITE_ORIGIN = (process.env.INDEXNOW_SITE_ORIGIN ?? 'https://replay.io').replace(/\/$/, '')
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const MAX_URLS_PER_REQUEST = 10_000
// A sitemap read that loses most of its URLs (for example the Notion blog fetch failing during
// render) must not be reported to search engines as mass deletion.
const MAX_REMOVED_FRACTION = 0.2

const { values: args } = parseArgs({
  options: {
    snapshot: { type: 'string' },
    since: { type: 'string' },
    urls: { type: 'string' },
    'dry-run': { type: 'boolean', default: false }
  }
})

function fail(message) {
  console.error(`indexnow: ${message}`)
  process.exit(1)
}

const key = process.env.INDEXNOW_KEY?.trim()
if (!key) fail('INDEXNOW_KEY is not set')
if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) fail('INDEXNOW_KEY must be 8-128 letters, digits or dashes')
const keyLocation = `${SITE_ORIGIN}/${key}.txt`
const host = new URL(SITE_ORIGIN).host

async function fetchSitemap() {
  const res = await fetch(`${SITE_ORIGIN}/sitemap.xml`, {
    headers: { 'User-Agent': 'replay-indexnow/1.0 (+https://replay.io)' }
  })
  const xml = await res.text()
  // Vercel's bot checkpoint answers with an HTML page; refuse to diff against that.
  if (!res.ok || !xml.includes('<urlset')) {
    fail(
      `could not read ${SITE_ORIGIN}/sitemap.xml (HTTP ${res.status}); got a non-sitemap response`
    )
  }
  const entries = {}
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim()
    if (!loc) continue
    entries[loc] = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? null
  }
  if (Object.keys(entries).length === 0) fail('sitemap has no URLs')
  return entries
}

function toUrl(value) {
  const url = new URL(value, SITE_ORIGIN)
  if (url.host !== host) fail(`${value} is not on ${host}`)
  return url.href
}

async function changedUrls() {
  if (args.urls) {
    return {
      urls: args.urls
        .split(/[\s,]+/)
        .filter(Boolean)
        .map(toUrl),
      current: null
    }
  }

  const current = await fetchSitemap()
  const urls = new Set()

  if (args.since) {
    const since = new Date(args.since)
    if (Number.isNaN(since.getTime())) fail(`--since "${args.since}" is not a date`)
    const sinceDay = since.toISOString().slice(0, 10)
    for (const [loc, lastmod] of Object.entries(current)) {
      if (lastmod && new Date(lastmod).toISOString().slice(0, 10) >= sinceDay) urls.add(loc)
    }
  }

  if (args.snapshot && existsSync(args.snapshot)) {
    const previous = JSON.parse(readFileSync(args.snapshot, 'utf8'))
    for (const [loc, lastmod] of Object.entries(current)) {
      if (!(loc in previous) || previous[loc] !== lastmod) urls.add(loc)
    }
    const removed = Object.keys(previous).filter((loc) => !(loc in current))
    if (removed.length > Object.keys(previous).length * MAX_REMOVED_FRACTION) {
      console.warn(
        `indexnow: ${removed.length} URLs vanished from the sitemap; treating that as a bad read, not deletions`
      )
    } else {
      removed.forEach((loc) => urls.add(loc))
    }
  } else if (args.snapshot) {
    console.log(`indexnow: no snapshot at ${args.snapshot} yet; this run sets the baseline`)
  }

  return { urls: [...urls], current }
}

async function assertKeyFileLive() {
  const res = await fetch(keyLocation)
  const body = (await res.text()).trim()
  if (!res.ok || body !== key) {
    fail(
      `key file is not live at ${SITE_ORIGIN}/<key>.txt (HTTP ${res.status}); is INDEXNOW_KEY set in Vercel?`
    )
  }
}

async function submit(urlList) {
  for (let i = 0; i < urlList.length; i += MAX_URLS_PER_REQUEST) {
    const batch = urlList.slice(i, i + MAX_URLS_PER_REQUEST)
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList: batch })
    })
    // 200: accepted. 202: accepted, key validation pending (normal for a new key).
    if (res.status === 200 || res.status === 202) {
      console.log(`indexnow: submitted ${batch.length} URL(s), HTTP ${res.status}`)
      continue
    }
    const meaning =
      {
        400: 'bad request format',
        403: 'key not valid (key file missing or wrong)',
        422: 'URLs do not belong to the host, or key does not match the schema',
        429: 'too many requests'
      }[res.status] ?? 'unexpected response'
    fail(`submission failed, HTTP ${res.status}: ${meaning}`)
  }
}

if (!args.urls && !args.since && !args.snapshot) fail('pass --snapshot, --since or --urls')

const { urls, current } = await changedUrls()

if (urls.length === 0) {
  console.log('indexnow: nothing changed; no submission')
} else {
  console.log(`indexnow: ${urls.length} URL(s) to submit:\n  ${urls.join('\n  ')}`)
  if (args['dry-run']) {
    console.log('indexnow: dry run; nothing sent')
  } else {
    await assertKeyFileLive()
    await submit(urls)
  }
}

// Only advance the baseline after a successful (or empty) real run, so a failed submission
// is retried next time.
if (args.snapshot && current && !args['dry-run']) {
  mkdirSync(dirname(args.snapshot), { recursive: true })
  writeFileSync(args.snapshot, JSON.stringify(current, null, 2))
}
