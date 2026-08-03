# docs.replay.io redirect handoff

Source: Ahrefs crawl of replay.io, 28 Jul 2026 (exports dated 2026-08-03).

Two separate Ahrefs reports (`404 pages` and `Page has links to broken page`)
resolve to the **same 16 dead paths** on `docs.replay.io`. Fixing them at the
docs property clears both reports at once, and also fixes external backlinks,
bookmarks and Google's index — which a fix on the marketing site could not.

Every "redirect to" target below was verified as returning HTTP 200 on
2026-08-03. Every "current" path was verified as returning 404.

## 1. Missing path segment (3 paths, one rule)

These lost the `replay-devtools/` segment in a restructure. A single wildcard
rule covers all three:

    /basics/time-travel-devtools/:path*  ->  /basics/replay-devtools/time-travel-devtools/:path*

| Current (404) | Redirect to (200) |
| --- | --- |
| `/basics/time-travel-devtools/collaborative-devtools` | `/basics/replay-devtools/time-travel-devtools/collaborative-devtools` |
| `/basics/time-travel-devtools/focus-window` | `/basics/replay-devtools/time-travel-devtools/focus-window` |
| `/basics/time-travel-devtools/jump-to-event` | `/basics/replay-devtools/time-travel-devtools/jump-to-event` |

## 2. Legacy Notion-ID URLs (7 paths)

The pre-migration docs URL scheme. All are linked from blog posts on
www.replay.io, so they are live entry points, not just crawl artefacts.

| Current (404) | Redirect to (200) | Confidence |
| --- | --- | --- |
| `/docs/why-replay-12b64a4c3b5d461981f1b498fc055d56` | `/basics/time-travel/why-time-travel` | High |
| `/docs/getting-started-5fc7ace7f3e449ce903e89e59d4b93ba` | `/basics/getting-started/record-your-app` | High |
| `/docs/viewer-26591deb256c473a946d0f64abb67859` | `/basics/replay-devtools/browser-devtools/replay-viewer` | High |
| `/docs/adding-source-maps-1923e679c1e4411db1bda29536eb1e31` | `/reference/replay-cli/source-maps` | High |
| `/docs/print-statements-1dcf7c3a8414423aab122ea7c4a41661` | `/basics/replay-devtools/time-travel-devtools/live-console-logs` | Medium |
| `/docs/debugging-a-replay-1c18f02c9f1d455188e3f202ef5f5c08` | `/basics/replay-devtools/overview` | Low — needs an owner's call |
| `/docs/contributing-to-replay-711d4d8b10fb497aba2a7c06583b26a6` | No equivalent found | None — OSS contributing docs appear to be gone |

## 3. Restructured paths (6 paths)

| Current (404) | Redirect to (200) | Confidence |
| --- | --- | --- |
| `/reference-guide/recording/replay-node-(experimental)` | `/reference/replay-runtimes/replay-node` | High — linked from 3 blog posts |
| `/resources/comparisons/chrome-recorder-vs-replay` | `/learn/comparisons/chrome` | High |
| `/recording-browser-tests-(beta)` | `/basics/getting-started/record-your-playwright-tests` | Medium |
| `/resources/comparisons/cypress-test-replay-vs-replay-devtools` | No Cypress comparison exists now. `/learn/comparisons/devtools` is **Browser DevTools**, not Cypress | Low — needs an owner's call |
| `/resources/comparisons/session-replay-vs-runtime-replay` | No equivalent. `/learn/comparisons/loom` is the nearest live comparison | Low — needs an owner's call |
| `/resources/get-help/troubleshooting/importing-ssl-certificate` | No equivalent found | None |

Note there is no `/learn/comparisons`, `/learn`, `/basics` or `/reference`
index page (all 404), so a section index is not available as a fallback target.

## 4. Separate bug: sitemap leaks a preview hostname

`https://docs.replay.io/sitemap.xml` lists all 71 URLs under
`https://replay-documentation-4pxlvf4rd-replayio.vercel.app/` instead of
`https://docs.replay.io/`.

This tells search engines the canonical home of every docs page is a Vercel
preview deployment. It is worth fixing regardless of the redirects above —
likely a missing or misconfigured site URL environment variable in the docs
build.

## Pages on www.replay.io that link to the dead paths

For reference, so the docs owner can see the blast radius. These are all
Notion-sourced blog posts:

- `/blog/using-replay-to-fix-my-first-replay-bug` (5 dead links)
- `/blog/changelog-20-dark-mode` (2)
- `/blog/changelog-21-playwright-tests`
- `/blog/changelog-31-turbo-replay`
- `/blog/changelog-32-focus-mode-v2`
- `/blog/changelog-36-test-suite-comments`
- `/blog/changelog-58-flaky-tests`
- `/blog/debugging-a-react-useeffect-bug`
- `/blog/midnite-builds-time-travel-workflows-for-its-fast-paced-betting-platform`
- `/blog/replay-vs-chrome-recorder`
- `/basics/replay-devtools/overview` (on docs itself)
