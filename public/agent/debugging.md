# Individual debugging — Replay

**Canonical URL:** https://www.replay.io/debugging  

**Meta description:** Replay is a time-travel debugger. Record your app, capture every function call and state change, and let your coding agent analyze it with Replay MCP.

**Relationship to CI Agent:** This page is for debugging **specific bugs on your own** (MCP, extension, CLI). The homepage (`/`) covers **Replay CI Agent** — automatic recording and analysis of E2E test failures in CI. Same time-travel technology, different workflow.

---

## Hero

**Badge:** Individual Debugging

**Headline:** Fix the bug your **agent can't figure out.**

**Subhead:** Replay is a time-travel debugger. Record your app, and get a deterministic capture of everything that happened — every function call, every state change, every network request. Then let your coding agent analyze it, or investigate it yourself.

**CTA:** Get started with Replay MCP → https://docs.replay.io/basics/replay-mcp/quickstart

**Footnote:** Free to start — no credit card required

---

## Problem

**Headline:** Your agent is fast. **But it's debugging blind.**

Agents read code and tests but guess when bugs are subtle (races, double state updates, silent redirects). They can't see re-renders, real network payloads, or event order. **Replay gives your agent — and you — the runtime data that turns guessing into knowing.**

---

## How it works — Record → Investigate → Fix

1. **Record the bug** — Reproduce while Replay captures everything via CLI (`npx replayio record-suite`), Chrome extension, or agent-triggered recording. Deterministic replay of program execution—not video.

2. **Investigate** — Add Replay MCP (Claude Code, Codeium, Cursor, etc.) and point at the recording. Agent inspects runtime: logpoints, call traces, state, call chains—or use Replay DevTools yourself.

3. **Fix with confidence** — Root cause from actual execution, not logs or stack traces alone.

---

## Runtime context (what a recording provides)

- **What actually executed** — Function call sequence with args/returns per frame  
- **State at any point** — React state, Redux/Zustand/TanStack Query, locals  
- **Network reality** — Full request/response payloads and timing  
- **DOM as it was** — Actual DOM at any moment  
- **Render behavior** — Re-renders, triggers, component tree  
- **Event sequence** — Handlers in order with before/after state  

*Tagline on site:* This is the difference between debugging with evidence and debugging with intuition.

---

## Replay MCP in action (interactive demo)

Section **"Replay MCP in action"** — **"From bug to fix — without touching DevTools"**

Interactive examples (titles on page): Button doesn't work, Broken data import, Sluggish page load, Flashing content. Each shows a Mux recording plus a simulated agent session transcript (Timeline, ReactComponents, ConsoleMessages, SearchSources, etc.).

---

## Time travelogue

**Headline:** Agents solving real bugs with Replay MCP

- **7 min** — How Replay MCP helped find a React bug faster than Dan Abramov did → `/blog/replay-time-travelogue-how-replay-mcp-helped-find-a-react-bug-faster-than-dan-abramov-did`  
- **4–9 min** — Improving Nadia's "debugging with AI" results using Replay MCP → `/blog/replay-time-travelogue-improving-nadias-debugging-with-ai-results-using-replay-mcp`

---

## Compatibility

**Apps:** React, Vue, Angular, Svelte, Next.js, Remix, jQuery, vanilla JS — if it runs in the browser, Replay records it.

**Coding agents:** Claude Code, Goose, Cursor, Windsurf, any MCP-compatible tool.

**React gets more:** Built-in React DevTools, render chain analysis, Redux/Zustand/TanStack Query tracking, framework-aware diagnostics.

---

## Getting started (three options)

**Option A — Replay MCP (agent-driven)**  
1. Install Replay MCP in your coding agent  
2. Record: `npx replayio record https://your-app.localhost:3000`  
3. Tell your agent: "Debug this Replay recording — [recording URL]"

**Option B — Chrome Extension (visual)**  
1. Install the Replay Chrome extension  
2. Record, reproduce, stop  
3. Open in DevTools or share URL with agent via MCP

**Option C — CLI**  
1. `npm install -g replayio`  
2. `replayio record <url>`  
3. Investigate in DevTools or via MCP

---

## FAQs (verbatim topics)

- **Is this different from Replay CI Agent?** — Yes. CI Agent automates E2E failure analysis in CI; this page is manual/on-demand debugging. Same technology, different workflow.
- **Does Replay MCP work with my coding agent?** — Claude Code, Codeium, Cursor, Windsurf, any MCP-compatible tool.
- **MCP vs. DevTools?** — Both work; DevTools is visual time-travel, MCP gives agents programmatic access. Use either or both.
- **What does Replay record?** — Everything: calls, DOM, network, state, events. Deterministic execution capture, not video.
- **React only?** — No; any JS in the browser. React gets extra DevTools integrations.
- **Free for individuals?** — Free plan to record and investigate with no time limit. Higher volume on Growth ($20/mo for individuals mentioned on page) — see https://www.replay.io/pricing

---

## Also from Replay

**Want automated analysis on every CI failure?** — Replay CI Agent records E2E runs and posts root cause + fix on PRs. Free plan available; Growth $299/mo. → https://www.replay.io

---

## Final CTA

**Stop guessing. Start seeing.**  
Record your first bug and let Replay show you what actually happened.  
**Get started with Replay MCP** → https://docs.replay.io/basics/replay-mcp/quickstart  
Free to start. No credit card required.
