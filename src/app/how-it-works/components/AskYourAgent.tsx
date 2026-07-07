'use client'

import { useState } from 'react'
import { Container } from '~/components/Container'

function firstSentence(text: string): string {
  const match = text.match(/^[\s\S]*?[.!?](?=\s|$)/)
  return (match ? match[0] : text).trim()
}

function CopyPromptBlock({
  prompt,
  collapsible = false
}: {
  prompt: string
  collapsible?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isCollapsed = collapsible && !expanded
  const visible = isCollapsed ? firstSentence(prompt) : prompt

  return (
    <div className="relative rounded-xl border border-accent/30 bg-white p-6 pr-14">
      <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-gray-900">
        {visible}
        {isCollapsed ? <span className="text-gray-500">{' …'}</span> : null}
      </pre>
      {collapsible ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 flex items-center gap-1.5 text-sm text-gray-600 transition hover:text-gray-900"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            className={`stroke-current transition-transform ${expanded ? 'rotate-90' : ''}`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
          {expanded ? 'Show less' : 'Show full prompt'}
        </button>
      ) : null}
      <button
        type="button"
        onClick={copy}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-accent/40 hover:text-accent"
      >
        {copied ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  )
}

const FULL_PROMPT = `Set up a continuous QA loop for the app we're building using Replay QA (https://qa.replay.io).

Drive everything through the REST API at https://qa.replay.io/api/v1 — read the OpenAPI spec at /api/v1/openapi.json first; it documents the full workflow. Authenticate with my API token ("Authorization: Bearer lqa_..."), asking me for it if needed.

Your job:
1. Create a QA project for the running app — give it the target_url and a short note on the key flows. If the app is only reachable from this machine (e.g. http://localhost:3000), enable the reverse proxy and follow the spec's setup steps.
2. Let QA run — poll the project status and don't kick off explorations or test runs yourself; QA drives those.
3. For each open bug, read its full root-caused report and apply the fix directly in the codebase, then mark it fixed via the API.
4. Keep looping until no open bugs remain.`

export function AskYourAgent() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Ask Your Agent</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              One prompt. Your agent does the rest.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 sm:text-lg">
              Try feeding this prompt to your coding agent to see the magic unfold.
            </p>
          </div>

          <div className="mt-10">
            <CopyPromptBlock prompt={FULL_PROMPT} collapsible />
          </div>

          <p className="mt-5 text-center text-xs text-gray-500">
            Works with Codex, Claude Code, Cursor, and any agent you&apos;re using.
          </p>
        </div>
      </Container>
    </section>
  )
}
