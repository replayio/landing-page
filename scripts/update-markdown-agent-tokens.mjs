#!/usr/bin/env node
/**
 * Writes src/lib/markdown-agent-tokens.json with rough token counts (ceil(chars/4))
 * for each public/agent/*.md file, keyed by site pathname (for middleware x-markdown-tokens).
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const AGENT_DIR = join(__dirname, '../public/agent')
const OUT = join(__dirname, '../src/lib/markdown-agent-tokens.json')

const byPath = {}
for (const f of readdirSync(AGENT_DIR).filter((x) => x.endsWith('.md'))) {
  const slug = f.replace(/\.md$/, '')
  const pathKey = slug === 'index' ? '/' : `/${slug}`
  const content = readFileSync(join(AGENT_DIR, f), 'utf8')
  byPath[pathKey] = Math.max(1, Math.ceil(content.length / 4))
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(byPath, null, 2) + '\n', 'utf8')
console.log(`update-markdown-agent-tokens: wrote ${Object.keys(byPath).length} paths to markdown-agent-tokens.json`)