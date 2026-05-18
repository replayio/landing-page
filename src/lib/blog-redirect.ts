import { slugify } from './slugify'

/**
 * Old blog.replay.io path (URL-decoded, leading `/` stripped) -> new
 * www.replay.io/blog/<slug>.
 *
 * For most posts, slugify(oldPath) === newSlug, so the default path is
 * slugify-the-old-path. The entries here cover the cases where the old
 * hashnode/notaku slug and the new notion slug genuinely diverge:
 *
 * - `0%` / `<>` / `&` got transliterated to "percent" / "lessgreater" by
 *   the old generator, but the new slugify just drops them.
 * - Two posts share a title and the new system disambiguates with `-2`
 *   while the old URLs carried hex notion-page-id suffixes; we map the
 *   older one to `-2` based on publish dates pulled from the old RSS feed
 *   and the new page bodies.
 * - Old hashnode "/replay-employees" sub-paths were discussion threads on
 *   a post; collapse them to the base post.
 * - A couple of titles have an ASCII apostrophe in hashnode but a smart
 *   apostrophe in notion (or vice-versa), so the slugs differ by `-s` vs
 *   `s` / `-t` vs `t`.
 */
const OVERRIDES: Record<string, string> = {
  'a-journey-of-driving-down-test-flakes-to-0percent-at-metabase-part-1':
    'a-journey-of-driving-down-test-flakes-to-0-at-metabase-part-1',
  'a-journey-of-driving-down-test-flakes-to-0percent-at-metabase-part-2':
    'a-journey-of-driving-down-test-flakes-to-0-at-metabase-part-2',
  'a-journey-of-driving-down-test-flakes-to-0percent-at-metabase-part-3':
    'a-journey-of-driving-down-test-flakes-to-0-at-metabase-part-3',
  'a-new-direction/replay-employees': 'a-new-direction',
  'changelog-54:-54percent-faster-recording': 'changelog-54-54-faster-recording',
  // 436fbf... was published 2023-08-11 and is the one whose date is shown on the new
  // unsuffixed page. 7c6cd... was 2023-08-03 and is the disambiguated -2.
  'changelog-57:-redux-devtools-436fbf05e421473c80dc7882cbeda045': 'changelog-57-redux-devtools',
  'changelog-57:-redux-devtools-7c6cd447b48f4e3b9d0b6b6c5eabeef5': 'changelog-57-redux-devtools-2',
  'changelog-66:-replayability-roadmap/replay-employees': 'changelog-66-replayability-roadmap',
  // notion title uses an ASCII apostrophe, new slug keeps `nadia-s` / `haven-t` via
  // the canonical slugify path. but the hashnode URL also used ASCII, so the default
  // slugify(oldPath) already lands on `nadia-s` etc - except the live notion title for
  // these particular posts seems to use smart quotes, producing `nadias` / `replays`.
  // override to land on the live slug.
  'replay-time-travelogue:-improving-nadia\'s-"debugging-with-ai"-results-using-replay-mcp':
    'replay-time-travelogue-improving-nadias-debugging-with-ai-results-using-replay-mcp',
  "replay's-recording-roadmap": 'replays-recording-roadmap',
  'tablecheck-transforms-qa-lessgreater-dev-communication-to-support-thousands-of-restaurants-and-hotel-chains':
    'tablecheck-transforms-qa-dev-communication-to-support-thousands-of-restaurants-and-hotel-chains',
  // 955f... was published 2020-08-10 and matches the date shown on the new unsuffixed
  // page. 3e1c... was 2022-12-22 (most likely a republish/duplicate) and gets -2.
  'week-3:-thinking-tools-955f283277e1444b8da6be1405d84e85': 'week-3-thinking-tools',
  'week-3:-thinking-tools-3e1c7353476b4648832925496358be6e': 'week-3-thinking-tools-2'
}

/**
 * Resolve an old blog.replay.io request path to a new www.replay.io path.
 * Always returns a path under /blog (the root `/` maps to `/blog`).
 * `pathname` may be URL-encoded (e.g. `nadia%27s`); we decode before
 * lookup. Starts with `/`.
 */
export function resolveBlogRedirect(pathname: string): string {
  let decoded: string
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    decoded = pathname
  }
  const trimmed = decoded.replace(/^\/+/, '').replace(/\/+$/, '')
  if (!trimmed) return '/blog'

  const override = OVERRIDES[trimmed]
  if (override) return `/blog/${override}`

  const slug = slugify(trimmed)
  return slug ? `/blog/${slug}` : '/blog'
}
