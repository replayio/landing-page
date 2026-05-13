# Replay — homepage (agent-oriented summary)

**Canonical URL:** https://www.replay.io  
**Positioning (site metadata):** Replay is the MCP time-travel debugger for your coding agent.

---

## Hero message

**Headline:** Your coding agent can't fix what it can't see.

**Supporting copy:** Replay captures the full browser runtime — every DOM change, network request, and state update — and turns it into a root cause and a specific fix. No manual debugging.

Primary call-to-action on the site: **Add Replay to your agent** → https://docs.replay.io/basics/replay-mcp/quickstart

---

## The problem (why agents fail at bugs)

Your agent reads code. **It can't read the runtime.**

When a test fails or a user hits a bug, agents often guess at a fix, push it, and fail again. They have no DOM state, no network timing, no component re-renders — **it's debugging blind.** Teams end up opening DevTools manually instead of the agent saving that time.

---

## The solution (what Replay does)

**Give your agent the power of time-travel.**

Replay captures a **deterministic recording** — every DOM change, network request, JS execution frame, and state update. **Using Replay MCP**, your coding agent can analyze the recording, **trace the exact causal chain from failure to root cause**, and deliver the root cause and a suggested fix. **No guessing. No manual debugging. No human required.**

Explainer video (embedded on the site): https://youtu.be/Ew5Yc2Hni-8

---

## Three ways to Replay

Replay's time-travel debugging works **wherever your tests run** and **wherever your agent works**. Most teams use all three.

### In your CI pipeline — Test fails. Fix lands on your PR.

The Replay CI Agent installs as a GitHub bot. It records every Playwright run on every PR. When a test fails, Replay analyzes the recording and posts root cause plus a suggested fix as a PR comment — **automatically.**

Set up the CI Agent: https://docs.replay.io/basics/ci-agent

### In your IDE — Your agent time-travels through the recording.

Replay MCP connects to **Cursor, Claude Code, Codex, Copilot, or Windsurf** in one command. Your coding agent can step through any recorded execution, inspect state at any point in time, and identify root causes — right inside your IDE.

Set up Replay MCP: https://docs.replay.io/basics/replay-mcp/quickstart

### In your browser — Record any bug, anywhere.

The Replay Chrome extension lets engineers and QA capture a deterministic recording of any bug — on **localhost, a staging environment, or production**. Record it once, hand it to your agent, or step through it yourself. **No reproduction required.**

Install the extension: https://docs.replay.io/basics/chrome-extension

---

## What your agent gets from Replay (three promises)

1. **Root-cause analysis, automated** — Replay traces the recording to find the exact cause (state change, failed request, bad render) and explains why it happened — not only the surface error.

2. **Detailed fixes, not vague suggestions** — The agent receives an **implementation-ready fix** with full context: which file, which function, what to change, and why — to reduce trial-and-error loops.

3. **Works with any coding agent that supports MCP** — Replay MCP connects to **Claude Code, Codex, Cursor, Copilot, Windsurf**, and other MCP-capable agents.

---

## Built for teams shipping with agents (use cases on the site)

- **Agent-assisted development** — Failing test or runtime error: the agent sends the recording to Replay and gets a precise fix back instead of looping.

- **Flaky tests in CI** — Record test runs; when a flake happens, Replay analyzes the recording and delivers root cause and fix to the agent.

- **Bug triage on autopilot** — User reports a bug → Replay captures the session → diagnosis and fix → agent applies it → you review the PR.

- **Unblocking stuck agents** — When the agent retries the same patch against the same failing test, Replay supplies runtime context to break the loop.

---

## Replay vs. the old way (marketing comparison)

**Without Replay:** Agent guesses and loops; you debug manually in DevTools; flaky tests get retried and ignored; bug reports wait for reproduction; agents write code fast but can't debug what they break.

**With Replay:** Agent gets a detailed fix from the recording; you review the PR; flaky tests get diagnosed automatically; bug reports get recording + analysis + fix quickly; agents ship fixes as fast as they ship features.

---

## How this differs from session replay (FAQ on the site)

Session replay tools capture video and logs **for humans to watch**. Replay captures a **deterministic recording of the browser runtime** (DOM mutations, network, state) and **Replay MCP analyzes it automatically** to generate fixes for your agent — the site positions this as not requiring a human to watch a replay.

**Recording overhead:** Described as minimal and comparable to screen recording for many teams. **Tests:** Replay integrates with **Cypress, Playwright, Selenium, and WebDriver** without requiring you to replace your test setup.

**Pricing entry:** The homepage FAQ states Replay is **free to get started** (record sessions, connect MCP, get automated fixes at no cost). For current commercial tiers, see https://www.replay.io/pricing .

---

## Final call-to-action (bottom of homepage)

**Stop debugging for your agent. Give it time-travel.**  
Free to get started. No credit card required.

- Install the CI Agent → https://docs.replay.io/basics/ci-agent
- Add Replay MCP → https://docs.replay.io/basics/replay-mcp/quickstart

---

## Links

- How it works: https://www.replay.io/how-it-works  
- For engineers: https://www.replay.io/engineers  
- Vibe coders / Chrome extension story: https://www.replay.io/vibe-coders  
- Pricing: https://www.replay.io/pricing  
- Blog: https://www.replay.io/blog  
- Docs: https://docs.replay.io  
- Replay MCP tools reference: https://docs.replay.io/basics/replay-mcp/tools  
