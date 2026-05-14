/**
 * Stable slug derivation for blog post titles. Shared between the notion-blog
 * loader (server-only) and the blog.replay.io middleware redirect (edge), so
 * both sides land on the same /blog/<slug> when reasonable.
 *
 * Behavior notes:
 * - Smart single quotes (‘, ’, ‚, ‛) are dropped, not hyphenated.
 *   ASCII apostrophes (U+0027) hit the [^a-z0-9]+ rule and become '-'. Notion
 *   titles vary between the two, which is why some existing slugs are `replays`
 *   and one is `haven-t` - both are preserved.
 * - Smart double quotes (“-‟) are dropped.
 * - en/em/minus dashes collapse to a single '-' via the alphanumeric rule.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[‘’‚‛]/g, '')
    .replace(/[“”„‟]/g, '')
    .replace(/[–—−]/g, '-')
    .replace(/[…]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
