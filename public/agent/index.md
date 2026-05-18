# Replay — homepage (agent-oriented summary)

**Canonical URL:** https://www.replay.io  
**Positioning (site metadata):** Replay CI Agent records every test run, analyzes failures with time-travel debugging, and posts root cause and fix to your PR.

---

## Hero

**Headline:** Your E2E tests fail. **Replay tells you why — and how to fix it.**

**Supporting copy:** Replay CI Agent automatically records every test run, analyzes failures using time-travel debugging data, and posts a root cause, failure trace, and suggested fix as a comment on your PR.

**Primary CTA:** Try Replay for free → https://docs.replay.io/basics/getting-started/record-your-playwright-tests

**Footnote:** Start free. No credit card required. $299/mo for Growth.

---

## The problem

**Headline:** Your CI fails. **Your team debugs. Repeat.**

When a test fails in CI, the assertion tells you what failed—not what broke. Someone opens DevTools, reproduces locally if lucky, and spends about an hour per failure. Coding agents make this worse: they guess at fixes and loop without runtime context. **The bottleneck isn't writing code. It's what happens when it breaks.** Teams then avoid adding automated tests because maintenance isn't worth it.

---

## The solution (time-travel for CI)

Replay captures a **deterministic recording** of the browser runtime and analyzes failures automatically. Your team gets root cause and a suggested fix on the PR—without manual debugging.

---

## Every CI failure, automatically analyzed

Three-step loop on the homepage:

1. **Test fails — Replay records** — Every Playwright run in CI is recorded; failures capture DOM, network, and JS execution. No test code changes required.
2. **Replay analyzes the recording** — The agent steps through time-travel data, finds the causal chain, and assigns a confidence score.
3. **Root cause + suggested fix posted to your PR** — Findings appear as a PR comment with evidence and file/line references.

CI Agent setup: https://docs.replay.io/basics/ci-agent

---

## Analysis that used to require a staff engineer

Three classes of runtime bugs the homepage highlights (with example agent insights):

- **Render-to-cause chains** — Trace why a component re-rendered to the exact state mutation.
- **Selector reference tracking** — See which selector read stale data and when references changed.
- **JS execution, frame by frame** — Step through frames; add retroactive logs; find race conditions in specific lines.

---

## Individual debugging (separate product path)

**Section:** "Debugging a specific bug?"

Replay also works outside CI: record a bug manually, connect **Replay MCP** to your coding agent, and time-travel through the execution in your IDE. Same deterministic capture, different workflow.

**Full page:** https://www.replay.io/debugging  
**MCP quickstart:** https://docs.replay.io/basics/replay-mcp/quickstart

---

## Time travelogue & proof points

Featured case study: Replay MCP helped find a React bug faster than Dan Abramov did (blog on site). Additional "Time travelogue" cards link to real debugging investigations.

---

## Pipeline integrations

Replay works with **Playwright, Cypress, Selenium, WebDriver**, and common CI providers. React apps get deeper component/state analysis; any JavaScript stack in the browser can be recorded.

---

## Replay vs. the old way

**Without Replay:** Manual CI debugging, agent guess-and-loop, flaky tests retried without diagnosis, coverage stagnates.

**With Replay:** Automatic root cause on PRs, agents get implementation-ready fixes, flaky failures get evidence trails.

---

## Homepage FAQs (topics)

- How Replay records tests (instrumented browser in CI)
- What the agent posts on failures (root cause, confidence, line, evidence, suggested fix)
- React vs. any JS stack
- Analysis timing (minutes after the run)
- Wrong analysis → confidence score + link to full recording in DevTools
- CI recording overhead (minimal)
- **Pricing:** Free plan (25 analyses/month), Growth $299/mo annual or $349/mo monthly, 500 analyses — see https://www.replay.io/pricing

---

## Final CTA

**Stop debugging test failures manually.**  
Free plan available. No credit card required. $299/mo for Growth.

---

## Site map (marketing pages with agent markdown)

| Path | Summary |
|------|---------|
| `/` | CI Agent homepage (this file) |
| `/debugging` | Individual debugging with Replay MCP |
| `/pricing` | Plans and FAQs |
| `/how-it-works` | Agent runtime context story |
| `/engineers` | Replay for engineers (see canonical `/for-engineers` on live site) |
| `/partner` | Design partner program |
| `/roi-calculator` | Debugging cost calculator |
| `/about` | Company story |

Request any path with `Accept: text/markdown` to receive the corresponding agent summary.

---

## Links

- Individual debugging: https://www.replay.io/debugging  
- How it works: https://www.replay.io/how-it-works  
- Pricing: https://www.replay.io/pricing  
- Design partners: https://www.replay.io/partner  
- Blog: https://www.replay.io/blog  
- Docs: https://docs.replay.io  
- Replay MCP tools: https://docs.replay.io/basics/replay-mcp/tools  
- Replay MCP quickstart: https://docs.replay.io/basics/replay-mcp/quickstart  
