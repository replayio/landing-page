#!/usr/bin/env node
/**
 * Fetches SKILL.md paths from replayio/skills (GitHub tree API), hashes each file,
 * and writes src/app/.well-known/agent-skills/skills.generated.json
 */
import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '../src/app/.well-known/agent-skills/skills.generated.json')
const TREE_URL =
  'https://api.github.com/repos/replayio/skills/git/trees/main?recursive=1'
const RAW_BASE = 'https://raw.githubusercontent.com/replayio/skills/main'

function skillNameFromPath(path) {
  const dir = path.replace(/\/SKILL\.md$/i, '').replace(/\/README\.md$/i, '')
  return dir.replace(/\//g, '-').replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'skill'
}

function descriptionFromMarkdown(text) {
  let body = text
  if (body.startsWith('---')) {
    const end = body.indexOf('\n---\n', 3)
    if (end !== -1) body = body.slice(end + 5)
  }
  const lines = body.split(/\r?\n/)
  let i = 0
  while (i < lines.length && (lines[i].trim() === '' || lines[i].startsWith('#'))) {
    i++
  }
  const first = lines[i]?.trim() ?? ''
  if (first.length > 240) return `${first.slice(0, 237)}...`
  return first || 'Replay skill documentation (SKILL.md).'
}

async function main() {
  const res = await fetch(TREE_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'replay-landing-page-generate-agent-skills'
    }
  })
  if (!res.ok) {
    console.warn(`generate-agent-skills: tree fetch failed ${res.status}, writing empty skills`)
    await mkdir(dirname(OUT), { recursive: true })
    await writeFile(OUT, JSON.stringify({ skills: [] }, null, 2) + '\n', 'utf8')
    process.exit(0)
  }

  const data = await res.json()
  const tree = data.tree ?? []
  const skillPaths = tree
    .filter((e) => e.type === 'blob' && /(^|\/)SKILL\.md$/i.test(e.path))
    .map((e) => e.path)
    .sort()

  const skills = []
  for (const path of skillPaths) {
    const url = `${RAW_BASE}/${path}`
    const fileRes = await fetch(url, {
      headers: { 'User-Agent': 'replay-landing-page-generate-agent-skills' }
    })
    if (!fileRes.ok) {
      console.warn(`generate-agent-skills: skip ${path} (${fileRes.status})`)
      continue
    }
    const buf = Buffer.from(await fileRes.arrayBuffer())
    const sha256 = createHash('sha256').update(buf).digest('hex')
    const text = buf.toString('utf8')
    skills.push({
      name: skillNameFromPath(path),
      type: 'cli',
      description: descriptionFromMarkdown(text),
      url,
      sha256
    })
  }

  await mkdir(dirname(OUT), { recursive: true })
  await writeFile(OUT, JSON.stringify({ skills }, null, 2) + '\n', 'utf8')
  console.log(`generate-agent-skills: wrote ${skills.length} skills to skills.generated.json`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
