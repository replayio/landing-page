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
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const isExternal = /^https?:\/\//i.test(href ?? '')
      const targetAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}"${titleAttr}${targetAttrs}>${text}</a>`
    },
    image({ href, title, text }) {
      const titleAttr = title ? ` title="${title}"` : ''
      const altAttr = text ? ` alt="${text}"` : ' alt=""'
      return `<img src="${href}"${altAttr}${titleAttr} loading="lazy" />`
    }
  }
})

type BlogPostBodyProps = {
  markdown: string
}

export function BlogPostBody({ markdown }: BlogPostBodyProps) {
  const html = marked.parse(markdown, { async: false }) as string
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
