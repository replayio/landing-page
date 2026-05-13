# Replay ROI Calculator

**Canonical URL:** https://www.replay.io/roi-calculator

**Meta description (site):** Estimate how much debugging time and engineering cost your team will save by plugging Replay into your CI/CD pipeline.

---

## Hero

Eyebrow: **ROI Calculator**

**Headline:** How much is debugging **actually costing you?**

**Subhead:** Enter your team's numbers. We'll show you how much engineering time Replay removes from the debugging loop — and what that's worth.

---

## What the page is

An interactive calculator that estimates **debugging time and cost recovered** when Replay is plugged into a team's CI/CD pipeline. The page is structured as **inputs on the left, derived results on the right**, with a benchmark anchor and CTAs.

Primary CTA: **Start your 14-day free trial** → https://docs.replay.io/basics/replay-ci-agent/overview
Secondary CTA: **View pricing** → https://www.replay.io/pricing

---

## Inputs (sliders, with defaults)

All inputs are sliders with sensible ranges. Defaults are tuned to a small-to-mid team shipping a typical web app.

| Input                              | Default | Range          | Step | Notes                                                                                   |
| ---------------------------------- | ------- | -------------- | ---- | --------------------------------------------------------------------------------------- |
| Engineers on the team              | 8       | 1 – 50         | 1    | Anyone who touches the test suite or reviews PRs.                                       |
| PRs opened per week                | 20      | 1 – 100        | 1    | Across the whole team.                                                                  |
| Test failure rate                  | 30%     | 5% – 80%       | 5%   | Percentage of PRs that have at least one test failure.                                  |
| Avg. hours debugging a failure     | 2h      | 0.5h – 8h      | 0.5h | "Test failed" → root cause + fix; includes reproduction, investigation, fix verification. |
| Avg. fully-loaded engineer cost    | $100/hr | $50 – $250/hr  | $10  | Salary + benefits + overhead, divided by working hours. $75–$150/hr is typical for US engineers. |

---

## Methodology (what the calculator computes)

**Constants used in the model:**

- **Replay monthly cost (Starter):** **$299**
- **Time-reduction factor:** **85%** — based on the **Web Debug Bench** benchmark (76% vs. 61% solve rate with Replay MCP) plus customer reports of reproducibility time going from 1–2 hours per engineer per day to near zero.
- **Weeks per month:** **4.33**

**Derived values:**

- `failures/week = PRsPerWeek × failureRate%`
- `failures/month = failures/week × 4.33`
- `total debug hours/month = failures/month × debugHoursPerFailure`
- `total debug cost/month = totalDebugHours × hourlyCost`
- `hours saved/month = totalDebugHours × 0.85`
- `cost saved/month = hoursSaved × hourlyCost`
- `net savings/month = costSaved − $299`
- `ROI = costSaved / $299` (rendered as a multiplier, e.g. `15×`)
- `payback period (days) = $299 / (costSaved / 30)`
- `annual savings = costSaved × 12`

---

## Results displayed

A short methodology callout followed by a 2×2 stat grid, a monthly cost-vs-savings bar, a benchmark anchor, and two CTAs.

**Stat grid (in order):**

1. **Hours saved / month** — formatted as `XX hrs` or `X.Xk hrs`, with a sub-line `~Y hrs per engineer`.
2. **Cost saved / month** — formatted as `$Xk` (or `$X.XM`), with sub-line `vs. $299/mo for Replay`.
3. **Annual savings** — `cost saved × 12`, sub-line `At current team size and failure rate`.
4. **ROI** *(highlighted tile)* — `Math.round(ROI)×` plus `Replay pays for itself in ~N days`.

**Monthly cost vs. savings bar:** Shows the Replay subscription as a small grey bar against the engineering-time-saved bar (always rendered at 100% width since cost-saved is the comparison baseline). Net line in the header reads `Net: $Xk/mo`.

**Backed-by-data callout:** Points to the **Web Debug Bench** post (177 real bugs; Claude Code + Replay MCP scored 76% vs. 61% without — a 15-point lift from time-travel debugging alone).
Link: https://blog.replay.io/web-debug-bench

---

## Default-input example (sanity check for agents)

With the defaults (8 engineers, 20 PRs/week, 30% failure rate, 2h per failure, $100/hr) the calculator surfaces approximately:

- **~26 test failures / month**
- **~52 debug hours / month** consuming **~$5k** in engineering time
- **Hours saved / month: ~44 hrs** (~5.5 hrs per engineer)
- **Cost saved / month: ~$4k** (vs. $299/mo for Replay)
- **Annual savings: ~$53k**
- **ROI: ~15×**, payback in **~2 days**

These numbers are illustrative; the live page recomputes on every slider change.

---

## Social proof anchor (below the calculator)

> "Before Replay we spent somewhere between 1–2 hours per day per dev in this reproducibility purgatory."
>
> — **Mark Probst**, VP Engineering, **Glide**

---

## Links

- Homepage: https://www.replay.io
- Pricing: https://www.replay.io/pricing
- For engineers: https://www.replay.io/engineers
- Replay CI agent overview: https://docs.replay.io/basics/replay-ci-agent/overview
- Web Debug Bench post: https://blog.replay.io/web-debug-bench
- Replay MCP quickstart: https://docs.replay.io/basics/replay-mcp/quickstart
