#!/usr/bin/env node
/**
 * Ensures src/lib/markdown-agent-tokens.json exists before `next build`.
 * The middleware imports this file at compile time, but the real data is
 * generated post-build by generate-agent-markdown.mjs. This writes an
 * empty stub so the build doesn't fail on a clean checkout.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

const path = 'src/lib/markdown-agent-tokens.json'
if (!existsSync(path)) {
  mkdirSync('src/lib', { recursive: true })
  writeFileSync(path, '{}\n')
  console.log('ensure-agent-tokens-stub: created empty', path)
}
