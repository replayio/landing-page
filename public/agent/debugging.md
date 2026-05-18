# Individual Debugging — Replay

**URL:** https://www.replay.io/debugging

**Meta description:** Replay is a time-travel debugger. Record your app, capture every function call and state change, and let your coding agent analyze it with Replay MCP.

## Hero

**Badge:** Individual Debugging

**Headline:** Fix the bug your **agent can't figure out.**

**Subhead:** Replay is a time-travel debugger. Record your app, and get a deterministic capture of everything that happened — every function call, every state change, every network request. Then let your coding agent analyze it, or investigate it yourself.

**CTA:** Get started with Replay MCP → (docs quickstart)

**Footnote:** Free to start — no credit card required

## Problem

**Headline:** Your agent is fast. **But it's debugging blind.**

Agents guess from source code and error messages when bugs are subtle (race conditions, double state updates, silent redirects). Replay gives your agent — and you — the runtime data that turns guessing into knowing.

## How it works

**Record → Investigate → Fix**

1. **Record the bug** — CLI, Chrome extension, or agent-triggered recording; deterministic replay of program execution.
2. **Investigate** — Replay MCP in Claude Code, Cursor, etc., or Replay DevTools manually.
3. **Fix with confidence** — Root cause from actual execution, not logs or stack traces alone.

## Runtime context

Six capabilities: what actually executed, state at any point, network reality, DOM as it was, render behavior, event sequence.

## Replay MCP in action

Interactive demo: example bugs with agent session transcripts (DevTools section on page).

## Time travelogue

Real case studies: Dan Abramov React bug (7 min), Nadia Makarevich Next.js debugging with AI (4–9 min).

## Compatibility

**Apps:** React, Vue, Angular, Svelte, Next.js, Remix, jQuery, vanilla JS.

**Coding agents:** Claude Code, Goose, Cursor, Windsurf, any MCP-compatible tool.

**React gets more:** React DevTools, render chains, Redux/Zustand/TanStack Query tracking.

## Getting started

- **Option A — Replay MCP:** Install MCP, `npx replayio record`, ask agent to debug recording URL.
- **Option B — Chrome extension:** Record visually, open in DevTools or share via MCP.
- **Option C — CLI:** `npm install -g replayio`, `replayio record <url>`.

## FAQs

Covers difference from CI Agent, MCP compatibility, DevTools vs MCP, what gets recorded, non-React apps, free tier / Growth pricing.

## Also from Replay

CI Agent promo — automated E2E failure analysis on every CI run. Link to homepage.

## Final CTA

**Stop guessing. Start seeing.** Get started with Replay MCP.
