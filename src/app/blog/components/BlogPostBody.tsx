import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-yaml'

/**
 * Links authored inside Notion serialise to a bare `/<32-hex-page-id>` href rather than
 * a real URL. Nothing on this site serves those paths, so every one is a crawlable 404
 * (Ahrefs found 22 of them across the changelog archive).
 *
 * Where the id belongs to a post in the blog database we rewrite it to that post's slug.
 * The rest are links whose destination did not survive the migration into Notion — they
 * point at no recoverable target, so we render the text without an anchor instead of
 * emitting a link we know is broken.
 */
/**
 * A bare Notion page id used as a path, optionally followed by a block anchor or a
 * query string: `/<32-hex>`, `/<32-hex>#<32-hex>`, `/<32-hex>?foo=bar`.
 *
 * The trailing group matters. An earlier version anchored straight to the end of
 * the string, so links carrying a Notion block anchor (`/<id>#<id>`) fell through
 * unrewritten and stayed as 404s.
 *
 * The path must be *only* the id, which is what keeps legitimate external links
 * containing a 32-hex segment (Loom shares, GitHub gists, notion.so pages) from
 * matching: those start with a scheme rather than the id.
 */
const BARE_NOTION_ID = /^\/?([0-9a-f]{32})(?:[?#].*)?$/i

function resolveNotionHref(
  href: string | null | undefined,
  idToSlug: Record<string, string>
): string | null {
  if (!href) return null
  const match = href.match(BARE_NOTION_ID)
  if (!match) return href

  const slug = idToSlug[match[1].toLowerCase()]
  return slug ? `/blog/${slug}` : null
}

function createMarked(idToSlug: Record<string, string>) {
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'language-',
      highlight(code, language) {
        const grammar = Prism.languages[language]
        if (!grammar) return code
        return Prism.highlight(code, grammar, language)
      }
    })
  )

  marked.use({
    renderer: {
      /**
       * The page already renders the post title as the document's `<h1>`, so a `#`
       * heading in the Notion body produced a second one (Ahrefs flagged 27 posts
       * for multiple H1 tags). Shift every body heading down one level so the title
       * stays the sole h1 and the body reads as subsections beneath it. h6 is the
       * floor, since there is no h7.
       */
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens)
        const level = Math.min(depth + 1, 6)
        return `<h${level}>${text}</h${level}>`
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens)
        const resolved = resolveNotionHref(href, idToSlug)
        if (!resolved) return text

        const isExternal = /^https?:\/\//i.test(resolved)
        const targetAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
        const titleAttr = title ? ` title="${title}"` : ''
        return `<a href="${resolved}"${titleAttr}${targetAttrs}>${text}</a>`
      },
      image({ href, title, text }) {
        const titleAttr = title ? ` title="${title}"` : ''
        const altAttr = text ? ` alt="${text}"` : ' alt=""'
        return `<img src="${href}"${altAttr}${titleAttr} loading="lazy" />`
      }
    }
  })

  return marked
}

type BlogPostBodyProps = {
  markdown: string
  notionIdToSlug?: Record<string, string>
}

export function BlogPostBody({ markdown, notionIdToSlug = {} }: BlogPostBodyProps) {
  const html = createMarked(notionIdToSlug).parse(markdown, { async: false }) as string
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
