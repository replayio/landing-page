/**
 * Helpers for deriving search-friendly metadata from Notion blog posts.
 *
 * Ahrefs flagged 77 posts with a meta description under 110 characters and 57 over
 * 160, because the description comes straight from the Notion `Description` property
 * and nothing enforces a length. Titles were flagged too: the page appended
 * " — Replay Blog" unconditionally, which pushed already-long post titles further
 * past the 60-character limit.
 */

const DESC_MIN = 110
const DESC_MAX = 160
const TITLE_MAX = 60

/** Cut at a word boundary, appending an ellipsis, without exceeding `max`. */
function truncateAtWord(value: string, max: number): string {
  if (value.length <= max) return value
  // Leave room for the ellipsis.
  const slice = value.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(' ')
  const cut = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice
  return `${cut.replace(/[\s,;:.!?-]+$/, '')}…`
}

/**
 * Reduce Notion-generated markdown to plain prose suitable for a meta description.
 *
 * Drops fenced code, images, headings, block quotes, list markers and callout
 * emoji, and unwraps links to their text. Deliberately conservative: anything it
 * cannot confidently turn into prose is discarded rather than guessed at.
 */
export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ') // fenced code
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/^\s{0,3}#{1,6}\s+.*$/gm, ' ') // headings
    .replace(/^\s{0,3}>\s?/gm, ' ') // block quotes
    .replace(/^\s{0,3}([-*+]|\d+\.)\s+/gm, ' ') // list markers
    .replace(/^\s{0,3}(\*\s*){3,}$/gm, ' ') // horizontal rules
    .replace(/[*_~]/g, '') // emphasis
    .replace(/<[^>]+>/g, ' ') // stray html
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Build a meta description that lands inside the 110-160 character band where the
 * available text allows it.
 *
 * Order of preference:
 *  1. The Notion excerpt, if it already fits.
 *  2. The excerpt truncated, if it is too long.
 *  3. The excerpt topped up from the post body, if it is too short.
 *  4. The body alone, then a generic fallback.
 *
 * A post with very little prose can still fall short of DESC_MIN. That is correct:
 * padding it out would mean inventing copy.
 */
export function buildPostDescription(excerpt: string, markdown = '', fallback = ''): string {
  const clean = (excerpt ?? '').replace(/\s+/g, ' ').trim()

  if (clean.length > DESC_MAX) return truncateAtWord(clean, DESC_MAX)
  if (clean.length >= DESC_MIN) return clean

  const body = markdownToPlainText(markdown)

  if (clean && body) {
    // Top the excerpt up with the opening of the post, avoiding an immediate repeat.
    const rest = body.startsWith(clean) ? body.slice(clean.length).trim() : body
    const combined = `${clean} ${rest}`.replace(/\s+/g, ' ').trim()
    if (combined.length >= DESC_MIN) return truncateAtWord(combined, DESC_MAX)
  }

  if (body.length >= DESC_MIN) return truncateAtWord(body, DESC_MAX)

  return clean || truncateAtWord(body, DESC_MAX) || fallback
}

/**
 * Append the site suffix only when the result still fits inside the title limit.
 *
 * Long post titles are the author's words, so they are left intact rather than
 * truncated; this just stops the suffix making them worse.
 */
export function buildPostTitle(postTitle: string, suffix = ' — Replay Blog'): string {
  const withSuffix = `${postTitle}${suffix}`
  return withSuffix.length <= TITLE_MAX ? withSuffix : postTitle
}
