import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'

type BlogPostBodyProps = {
  markdown: string
}

export function BlogPostBody({ markdown }: BlogPostBodyProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypePrismPlus, { ignoreMissing: true }]]}
      components={{
        a: ({ node: _node, ...props }) => (
          <a
            {...props}
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
          />
        ),
        img: ({ node: _node, ...props }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img {...props} alt={props.alt ?? ''} loading="lazy" />
        )
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}
