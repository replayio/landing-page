#!/usr/bin/env node
/**
 * generate-agent-markdown.mjs
 *
 * Post-build script that self-scrapes the Next.js production build to generate
 * agent-friendly markdown files. Runs `next start` temporarily, fetches each
 * marketing page, extracts main content via Readability, converts to markdown
 * via Turndown, and writes the results to public/agent/*.md + llms.txt files.
 *
 * Run after `next build`:
 *   yarn basehub-gen && next build && node scripts/generate-agent-markdown.mjs
 */
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { extractContent, htmlToMarkdown } from 'web-to-markdown'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const AGENT_DIR = join(ROOT, 'public/agent')
const TOKENS_OUT = join(ROOT, 'src/lib/markdown-agent-tokens.json')

const PORT = 3099
const BASE_URL = `http://127.0.0.1:${PORT}`
const SITE_URL = 'https://www.replay.io'

// Same route mapping as MARKDOWN_BY_PATH in src/middleware.ts
const ROUTES = [
  { pathname: '/', slug: 'index', title: 'Replay — Home' },
  { pathname: '/how-it-works', slug: 'how-it-works', title: 'How It Works — Replay' },
  { pathname: '/engineers', slug: 'engineers', title: 'For Engineers — Replay' },
  { pathname: '/vibe-coders', slug: 'vibe-coders', title: 'For Vibe Coders — Replay' },
  { pathname: '/precog', slug: 'precog', title: 'Precog — Replay' },
  { pathname: '/partner', slug: 'partner', title: 'Partner — Replay' },
  { pathname: '/pricing', slug: 'pricing', title: 'Pricing — Replay' },
  { pathname: '/debugging', slug: 'debugging', title: 'Debugging — Replay' },
  { pathname: '/roi-calculator', slug: 'roi-calculator', title: 'ROI Calculator — Replay' },
  { pathname: '/about', slug: 'about', title: 'About — Replay' },
  { pathname: '/privacy-policy', slug: 'privacy-policy', title: 'Privacy Policy — Replay' },
  { pathname: '/terms-of-service', slug: 'terms-of-service', title: 'Terms of Service — Replay' },
  { pathname: '/security-and-privacy', slug: 'security-and-privacy', title: 'Security & Privacy — Replay' },
]

// ---------------------------------------------------------------------------
// Server lifecycle
// ---------------------------------------------------------------------------

/** Start `next start -p PORT` and wait until it's accepting connections. */
function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn('node_modules/.bin/next', ['start', '-p', String(PORT)], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'production' },
    })

    let started = false
    const timeout = setTimeout(() => {
      if (!started) {
        proc.kill('SIGTERM')
        reject(new Error('Server failed to start within 30s'))
      }
    }, 30_000)

    // Poll for readiness instead of parsing stdout (more reliable)
    const poll = setInterval(async () => {
      try {
        const res = await fetch(`${BASE_URL}/`, { signal: AbortSignal.timeout(2000) })
        if (res.ok || res.status < 500) {
          started = true
          clearTimeout(timeout)
          clearInterval(poll)
          resolve(proc)
        }
      } catch {
        // Not ready yet
      }
    }, 500)

    proc.on('error', (err) => {
      clearTimeout(timeout)
      clearInterval(poll)
      reject(err)
    })

    proc.on('exit', (code) => {
      if (!started) {
        clearTimeout(timeout)
        clearInterval(poll)
        reject(new Error(`Server exited with code ${code} before becoming ready`))
      }
    })
  })
}

/** Run fn with a live server, then kill it regardless of outcome. */
async function withServer(fn) {
  const proc = await startServer()
  try {
    return await fn()
  } finally {
    proc.kill('SIGTERM')
    // Give it a moment to shut down gracefully
    await new Promise((r) => setTimeout(r, 500))
    if (!proc.killed) proc.kill('SIGKILL')
  }
}

// ---------------------------------------------------------------------------
// Page fetching & conversion
// ---------------------------------------------------------------------------

/** Fetch a page from the local server and convert to markdown. */
async function convertPage(route) {
  const url = `${BASE_URL}${route.pathname}`
  const canonicalUrl = `${SITE_URL}${route.pathname === '/' ? '' : route.pathname}`

  // Fetch HTML (plain fetch, no Accept: text/markdown — avoids middleware rewrite)
  const res = await fetch(url, {
    headers: { Accept: 'text/html' },
    signal: AbortSignal.timeout(15_000),
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  }

  const html = await res.text()

  // Extract main content with Readability
  const extracted = extractContent(html, canonicalUrl)
  if (!extracted) {
    console.warn(`  ⚠ Readability extraction failed for ${route.pathname}, using raw HTML fallback`)
    // Fallback: convert entire body
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
    const bodyHtml = bodyMatch ? bodyMatch[1] : html
    const markdown = htmlToMarkdown(bodyHtml, { baseUrl: canonicalUrl })
    return { markdown, metadata: { title: route.title, excerpt: null } }
  }

  const markdown = htmlToMarkdown(extracted.content, { baseUrl: canonicalUrl })
  return { markdown, metadata: extracted.metadata }
}

// ---------------------------------------------------------------------------
// Post-processing
// ---------------------------------------------------------------------------

/** Add canonical URL header and links footer to the markdown. */
function postProcess(markdown, route, metadata) {
  const canonicalUrl = `${SITE_URL}${route.pathname === '/' ? '' : route.pathname}`
  const title = metadata?.title || route.title

  const header = [
    `# ${title}`,
    '',
    `**Canonical URL:** ${canonicalUrl}`,
    '',
    '---',
    '',
  ].join('\n')

  const footer = [
    '',
    '---',
    '',
    '## Links',
    '',
    `- [Replay Home](${SITE_URL})`,
    `- [Documentation](https://docs.replay.io)`,
    `- [Pricing](${SITE_URL}/pricing)`,
    `- [About](${SITE_URL}/about)`,
    '',
  ].join('\n')

  return header + markdown + footer
}

// ---------------------------------------------------------------------------
// llms.txt generation
// ---------------------------------------------------------------------------

function generateLlmsTxt(results) {
  const lines = [
    '# Replay',
    '',
    '> Replay is an AI-native QA platform. Replay QA autonomously explores your web app, records every session with time-travel debugging, finds real bugs, and gives your coding agent the root cause and fix.',
    '',
    '## Pages',
    '',
  ]

  for (const { route, metadata } of results) {
    const title = metadata?.title || route.title
    const desc = metadata?.excerpt ? `: ${metadata.excerpt}` : ''
    // Link to the agent markdown version of each page
    const mdUrl = route.pathname === '/'
      ? `${SITE_URL}/agent/index.md`
      : `${SITE_URL}/agent${route.pathname}.md`
    lines.push(`- [${title}](${mdUrl})${desc}`)
  }

  lines.push('')
  lines.push('## Documentation')
  lines.push('')
  lines.push('- [Replay Docs](https://docs.replay.io)')
  lines.push('- [MCP Tools](https://docs.replay.io/reference/mcp-tools)')
  lines.push('')

  return lines.join('\n')
}

function generateLlmsFullTxt(results) {
  const sections = results.map(({ route, content }) => {
    const canonicalUrl = `${SITE_URL}${route.pathname === '/' ? '' : route.pathname}`
    return `<!-- Source: ${canonicalUrl} -->\n\n${content}`
  })
  return sections.join('\n\n---\n\n') + '\n'
}

// ---------------------------------------------------------------------------
// Token counting (replaces update-markdown-agent-tokens.mjs)
// ---------------------------------------------------------------------------

function computeTokens(results) {
  const byPath = {}
  for (const { route, content } of results) {
    const pathKey = route.pathname
    byPath[pathKey] = Math.max(1, Math.ceil(content.length / 4))
  }
  return byPath
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('generate-agent-markdown: starting...')
  mkdirSync(AGENT_DIR, { recursive: true })

  const results = await withServer(async () => {
    const results = []

    for (const route of ROUTES) {
      process.stdout.write(`  Converting ${route.pathname}...`)
      try {
        const { markdown, metadata } = await convertPage(route)
        const content = postProcess(markdown, route, metadata)
        results.push({ route, content, metadata })
        console.log(` ✓ (${content.length} chars)`)
      } catch (err) {
        console.error(` ✗ ${err.message}`)
        // Continue with other pages
      }
    }

    return results
  })

  if (results.length === 0) {
    console.error('generate-agent-markdown: no pages converted successfully!')
    process.exit(1)
  }

  // Write individual markdown files
  for (const { route, content } of results) {
    const outPath = join(AGENT_DIR, `${route.slug}.md`)
    writeFileSync(outPath, content, 'utf8')
  }
  console.log(`generate-agent-markdown: wrote ${results.length} markdown files to public/agent/`)

  // Write llms.txt and llms-full.txt
  const llmsTxt = generateLlmsTxt(results)
  writeFileSync(join(ROOT, 'public/llms.txt'), llmsTxt, 'utf8')
  console.log('generate-agent-markdown: wrote public/llms.txt')

  const llmsFullTxt = generateLlmsFullTxt(results)
  writeFileSync(join(ROOT, 'public/llms-full.txt'), llmsFullTxt, 'utf8')
  console.log('generate-agent-markdown: wrote public/llms-full.txt')

  // Write token counts (replaces update-markdown-agent-tokens.mjs)
  const tokens = computeTokens(results)
  mkdirSync(dirname(TOKENS_OUT), { recursive: true })
  writeFileSync(TOKENS_OUT, JSON.stringify(tokens, null, 2) + '\n', 'utf8')
  console.log(`generate-agent-markdown: wrote token counts for ${Object.keys(tokens).length} paths`)

  console.log('generate-agent-markdown: done!')
}

main().catch((err) => {
  console.error('generate-agent-markdown: fatal error:', err)
  process.exit(1)
})
