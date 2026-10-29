#!/usr/bin/env node
/**
 * Imports the bug gallery from the Replay QA bug catalog (the replay-qa-catalog repo).
 *
 *   node scripts/import-qa-bugs.mjs path/to/replay-qa-catalog
 *
 * Each catalog ticket (src/tickets/<slug>/ticket.md, docstream markdown) becomes a plain record in
 * src/app/bugs/data/bugs.json, with its prose pre-rendered to HTML so the site never ships a
 * markdown renderer. Each step's evidence probes (the `<details>` of tool calls and their output) are
 * kept as plain text beside it, under `evidence`. Screenshots are copied to public/bugs/shots.
 * The session replay's files (the recording, and the network.har, console.log, evidence.json and
 * captions.vtt its embed names) are copied to public/bugs/<slug>/ for the replay player
 * (src/components/replay). The recording and the HAR get .json names so hosts serve them compressed,
 * and the HAR drops the response bodies of scripts, stylesheets, images, fonts and source maps (by
 * resource type, MIME type or a .map URL): the app's whole bundle, which made up most of each file. Those requests stay listed, with
 * status and timing; API responses keep their bodies.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_JSON = join(ROOT, 'src/app/bugs/data/bugs.json')
const OUT_PUBLIC = join(ROOT, 'public/bugs')

// The six shown on the homepage, in order. Everything else follows on /bugs, high severity first.
const HOMEPAGE = [
  'search-shows-results-for-the-previous-keystroke',
  'checkout-charges-the-pre-discount-total-after-a-promo-code',
  'home-greeting-fails-hydration-good-afternoon-vs-good-evening',
  'users-with-9-notes-are-told-they-have-none-for-760ms',
  'inviting-a-teammate-throws-object-is-not-extensible',
  'every-grid-row-fetches-the-same-owner-record-again'
]

const CATEGORIES = {
  race: 'Races & ordering',
  flash: 'Sub-second glitches',
  state: 'Hidden state corruption',
  silent: 'Swallowed failures',
  perf: 'Render & network forensics'
}

const SEVERITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 }

const catalog = process.argv[2]
if (!catalog || !existsSync(join(catalog, 'src/tickets'))) {
  console.error('usage: node scripts/import-qa-bugs.mjs path/to/replay-qa-catalog')
  process.exit(1)
}
const ticketsDir = join(catalog, 'src/tickets')

function frontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/)
  const data = {}
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([a-z_]+):\s*(.*)$/)
    if (!m) continue
    const raw = m[2].trim()
    data[m[1]] = raw.startsWith('"') ? JSON.parse(raw) : raw
  }
  return { data, body: source.slice(match[0].length) }
}

const html = (md) => marked.parse(md.trim(), { async: false }).trim()

const hint = (md, style) =>
  md.match(new RegExp(`{% hint style="${style}" %}\\n([\\s\\S]*?)\\n{% endhint %}`))?.[1].trim()

const steps = (md) => [...md.matchAll(/{% step %}([\s\S]*?){% endstep %}/g)].map((m) => m[1].trim())

// A ticket's evidence: `<details><summary>2 evidence probes (…)</summary> ~~~~txt … ~~~~ … </details>`.
// Probe output can hold its own `## ` headings, so the blocks are swapped for `<!--evidence:N-->`
// before the ticket is split into sections, and each step takes its own back with `prose`.
const EVIDENCE = /<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g
const EVIDENCE_MARK = /<!--evidence:(\d+)-->/g

function setAsideEvidence(raw) {
  const blocks = []
  const body = raw.replace(EVIDENCE, (_, summary, inner) => {
    blocks.push({
      summary: summary.trim(),
      probes: [...inner.matchAll(/~~~~txt\n([\s\S]*?)\n~~~~/g)].map((m) => m[1])
    })
    return `\n<!--evidence:${blocks.length - 1}-->\n`
  })
  return { body, blocks }
}

/** Markdown with evidence marks → its HTML and the evidence it carried. */
const prose = (md, blocks) => ({
  html: html(md.replace(EVIDENCE_MARK, '')),
  evidence: [...md.matchAll(EVIDENCE_MARK)].map((m) => blocks[Number(m[1])])
})

// `## Heading` → its markdown; headings are matched without their emphasis (`## **Chronology…**`).
function sections(body) {
  const out = {}
  for (const part of body.split(/^## /m).slice(1)) {
    const newline = part.indexOf('\n')
    out[part.slice(0, newline).replace(/\*/g, '').trim()] = part.slice(newline + 1)
  }
  return out
}

// `### ![Screenshot at 0:31.3](/shots/x.jpg "thumbnail") 0:05.4`, or just `### 2:49.4`.
function chronologyStep(md, blocks) {
  const m = md.match(/^### (?:!\[[^\]]*\]\(([^ )]+)[^)]*\)\s*)?(\S+)\n([\s\S]*)$/)
  if (!m) return { time: null, shot: null, ...prose(md, blocks) }
  return {
    time: m[2],
    shot: m[1]?.replace(/^\/shots\//, '/bugs/shots/') ?? null,
    ...prose(m[3], blocks)
  }
}

// The ticket's `{% embed url="./recording.rrweb#t=4.7,7.4" har="./network.har" … %}`: its files are
// copied beside each other and the props point at their public URLs, keeping the #t= window.
const EMBED_FILES = {
  har: ['network.har', 'network.json'],
  log: ['console.log', 'console.log'],
  evidence: ['evidence.json', 'evidence.json'],
  captions: ['captions.vtt', 'captions.vtt']
}
const STATIC_RESOURCES = new Set(['script', 'stylesheet', 'image', 'img', 'font'])
const STATIC_MIME = /^(?:text\/(?:javascript|css)|application\/(?:x-)?javascript|image\/|font\/)/

function slimHar(text) {
  const har = JSON.parse(text)
  for (const entry of har.log.entries)
    if (
      STATIC_RESOURCES.has(entry._resourceType) ||
      STATIC_MIME.test(entry.response.content.mimeType ?? '') ||
      /\.map(?:\?|$)/.test(entry.request.url)
    )
      delete entry.response.content.text
  return JSON.stringify(har)
}

function replayProps(slug, body) {
  const tag = body.match(/{% embed ([^%]*)%}/)?.[1]
  if (!tag) return null
  const attrs = Object.fromEntries([...tag.matchAll(/(\w+)="([^"]*)"/g)].map((m) => [m[1], m[2]]))
  const [file, fragment] = attrs.url.split('#')
  if (file !== './recording.rrweb') return null
  const dir = join(OUT_PUBLIC, slug)
  mkdirSync(dir, { recursive: true })
  copyFileSync(join(ticketsDir, slug, 'recording.rrweb'), join(dir, 'recording.json'))
  const props = {
    url: `/bugs/${slug}/recording.json${fragment ? `#${fragment}` : ''}`,
    title: attrs.title || 'Session replay'
  }
  for (const [key, [name, out]] of Object.entries(EMBED_FILES)) {
    if (attrs[key] !== `./${name}`) continue
    const text = readFileSync(join(ticketsDir, slug, name), 'utf8')
    writeFileSync(join(dir, out), key === 'har' ? slimHar(text) : text)
    props[key] = `/bugs/${slug}/${out}`
  }
  return props
}

rmSync(OUT_PUBLIC, { recursive: true, force: true })
mkdirSync(join(OUT_PUBLIC, 'shots'), { recursive: true })
mkdirSync(dirname(OUT_JSON), { recursive: true })

const bugs = []
for (const slug of readdirSync(ticketsDir)) {
  const file = join(ticketsDir, slug, 'ticket.md')
  if (!existsSync(file)) continue
  const { data, body: raw } = frontmatter(readFileSync(file, 'utf8'))
  const { body, blocks } = setAsideEvidence(raw)
  const intro = body.split(/^## /m)[0]
  const parts = sections(body)

  const chronology = steps(parts['Chronology of events'] ?? '').map((md) =>
    chronologyStep(md, blocks)
  )
  for (const { shot } of chronology) {
    if (!shot) continue
    const name = shot.slice('/bugs/shots/'.length)
    copyFileSync(join(catalog, 'public/shots', name), join(OUT_PUBLIC, 'shots', name))
  }

  bugs.push({
    slug,
    title: data.title,
    severity: data.severity,
    category: data.category,
    categoryName: CATEGORIES[data.category] ?? data.category,
    why: data.why,
    project: data.project,
    discovered: data.discovered,
    report: data.report,
    homepage: HOMEPAGE.includes(slug),
    thumbnail: chronology.find((s) => s.shot)?.shot ?? null,
    finding: html(hint(intro, 'info')?.replace(/^\*\*What the recording showed\.\*\*\s*/, '') ?? ''),
    actual: html(hint(intro, 'danger')?.replace(/^\*\*Actual\*\*\s*—\s*/, '') ?? ''),
    expected: html(hint(intro, 'success')?.replace(/^\*\*Expected\*\*\s*—\s*/, '') ?? ''),
    replay: replayProps(slug, body),
    chronology,
    reproduce: steps(parts['Steps to reproduce'] ?? '').map((md) => prose(md, blocks)),
    rootCause: prose(parts['Root cause'] ?? '', blocks),
    rootCauseSteps: steps(parts['Root cause → actual behavior'] ?? '').map((md) => prose(md, blocks))
  })
}

const homepageRank = (slug) => (HOMEPAGE.includes(slug) ? HOMEPAGE.indexOf(slug) : HOMEPAGE.length)
bugs.sort(
  (a, b) =>
    homepageRank(a.slug) - homepageRank(b.slug) ||
    SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] ||
    a.title.localeCompare(b.title)
)

const missing = HOMEPAGE.filter((slug) => !bugs.some((b) => b.slug === slug))
if (missing.length) throw new Error(`homepage bugs missing from the catalog: ${missing.join(', ')}`)

writeFileSync(OUT_JSON, JSON.stringify(bugs, null, 1) + '\n')
console.log(`imported ${bugs.length} bugs → ${OUT_JSON}`)
