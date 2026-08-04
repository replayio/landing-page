/**
 * Repairs links to docs.replay.io that appear in archived blog posts.
 *
 * This is a shim, and deliberately so. The right fix is redirects on the docs
 * property, which would also repair external backlinks and Google's index;
 * `docs-redirects-handoff.md` documents that ask. Until it lands, these links are
 * either dead or take an unnecessary hop, and both are visible to crawlers.
 *
 * Every mapping below was verified by request against docs.replay.io: the key
 * returns 404 (or redirects), the value returns 200. Several are corroborated by
 * docs' own redirects, e.g. docs sends `/reference-guide/debugging/print-statements`
 * to the same page we map `/docs/print-statements-<id>` to.
 *
 * Anything not listed is left untouched, including `docs.replay.io/` itself: its
 * redirect is a 307 and the root is the canonical entry point, so pinning it to
 * whichever page currently sits behind it would be worse than the extra hop.
 */

/** Dead or redirecting docs path -> the live page it should point at. */
export const DOCS_PATH_REWRITES: Record<string, string> = {
  // --- 404s: the pre-migration Notion-id scheme -------------------------------
  '/docs/getting-started-5fc7ace7f3e449ce903e89e59d4b93ba':
    '/basics/getting-started/record-your-app',
  '/docs/why-replay-12b64a4c3b5d461981f1b498fc055d56': '/basics/time-travel/why-time-travel',
  '/docs/viewer-26591deb256c473a946d0f64abb67859':
    '/basics/replay-devtools/browser-devtools/replay-viewer',
  '/docs/adding-source-maps-1923e679c1e4411db1bda29536eb1e31': '/reference/replay-cli/source-maps',
  '/docs/print-statements-1dcf7c3a8414423aab122ea7c4a41661':
    '/basics/replay-devtools/time-travel-devtools/live-console-logs',

  // --- 404s: restructured paths ----------------------------------------------
  '/reference-guide/recording/replay-node-(experimental)': '/reference/replay-runtimes/replay-node',
  '/resources/comparisons/chrome-recorder-vs-replay': '/learn/comparisons/chrome',
  '/recording-browser-tests-(beta)': '/basics/getting-started/record-your-playwright-tests',

  // --- 3XX: resolve the hop --------------------------------------------------
  '/test-suites': '/basics/test-suites/recent-runs',
  '/getting-started/test-suite-integration': '/basics/test-suites/recent-runs',
  '/getting-started/what-is-replay-io': '/basics/time-travel/why-time-travel',
  '/getting-started/introduction-to-debugging': '/basics/time-travel/why-time-travel',
  '/getting-started/teams-admin/setting-up-a-team': '/reference/replay-teams/setting-up-a-team',
  '/getting-started/bug-reports/installing-the-replay-browser': '/basics/replay-qa/overview',
  '/learn-more/workflows/oss-projects': '/reference/test-runners/overview',
  '/reference-guide/debugging/focus-mode':
    '/basics/replay-devtools/time-travel-devtools/focus-window',
  '/reference-guide/debugging/jumping': '/basics/replay-devtools/time-travel-devtools/jump-to-event',
  '/reference-guide/debugging/print-statements':
    '/basics/replay-devtools/time-travel-devtools/live-console-logs',
  '/reference-guide/dev-tools/console': '/basics/replay-devtools/browser-devtools/console',
  '/reference-guide/viewer': '/basics/replay-devtools/browser-devtools/replay-viewer',

  // docs currently 308s this source-maps page to the Redux panel, which is simply
  // the wrong destination for the link text. Point it at the real source maps page
  // instead of following a redirect we can see is broken.
  '/learn-more/contribute/how-replay-works/our-approach-for-source-maps':
    '/reference/replay-cli/source-maps'
}

/**
 * Dead docs paths with no live equivalent.
 *
 * Links to these render as plain text rather than anchors, the same treatment given
 * to Notion links whose destination did not survive migration. Sending a reader to a
 * loosely related page would be worse than not linking: `/learn/comparisons/devtools`
 * is about Browser DevTools, not Cypress, and there is no comparisons index to fall
 * back on.
 */
export const DOCS_PATHS_WITHOUT_EQUIVALENT = new Set([
  '/docs/contributing-to-replay-711d4d8b10fb497aba2a7c06583b26a6',
  '/docs/debugging-a-replay-1c18f02c9f1d455188e3f202ef5f5c08',
  '/resources/comparisons/cypress-test-replay-vs-replay-devtools',
  '/resources/comparisons/session-replay-vs-runtime-replay',
  '/resources/get-help/troubleshooting/importing-ssl-certificate'
])

/**
 * Resolve a docs.replay.io URL.
 *
 * Returns the rewritten URL, `null` if the link should be dropped, or the original
 * string when we have nothing to say about it.
 *
 * Query strings are preserved so utm tags survive. Fragments are not: they are Notion
 * block ids or headings from the old page, and carrying them onto a different page
 * would point at an anchor that does not exist.
 */
export function resolveDocsHref(url: URL): string | null {
  const path = url.pathname.replace(/\/$/, '') || '/'

  if (DOCS_PATHS_WITHOUT_EQUIVALENT.has(path)) return null

  const replacement = DOCS_PATH_REWRITES[path]
  if (!replacement) return url.toString()

  return `https://docs.replay.io${replacement}${url.search}`
}
