'use client'

import { useEffect, useMemo, useState } from "react"
import { parse } from "gpu-lexer"

type Span = {
  type: "plain" | "comment" | "string" | "number" | "keyword" | "type" | "function" | "constant" | "operator"
  start: number
  end: number
}

/* Token colors live in styles.css (`.docs-tok-*`) and follow the host's color-scheme, so code reads on
   light and dark backgrounds alike. Hosts can retheme via the --docs-tok-* custom properties. */

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;")
}

function spansToHtml(code: string, spans: Span[]) {
  let cursor = 0
  return spans.map((span) => {
    const prefix = escapeHtml(code.slice(cursor, span.start))
    const text = escapeHtml(code.slice(span.start, span.end))
    cursor = span.end
    return `${prefix}${span.type === "plain" ? text : `<span class="docs-tok docs-tok-${span.type}">${text}</span>`}`
  }).join("") + escapeHtml(code.slice(cursor))
}

export function HighlightedCode({ code, language: _language, lineNumbers = false }: {
  code: string
  language: string | null
  lineNumbers?: boolean
}) {
  const lines = useMemo(() => code.split("\n"), [code])
  const [spans, setSpans] = useState<Span[] | null>(null)

  useEffect(() => {
    let cancelled = false
    setSpans(null)
    parse(code).then((result) => { if (!cancelled) setSpans(result) }).catch(() => { if (!cancelled) setSpans([]) })
    return () => { cancelled = true }
  }, [code])

  const html = useMemo(() => spans && spans.length ? spansToHtml(code, spans) : null, [code, spans])
  if (!lineNumbers) return html === null ? <code>{code}</code> : <code dangerouslySetInnerHTML={{ __html: html }} />

  return <code>{lines.map((line, index) => {
    const start = lines.slice(0, index).reduce((total, value) => total + value.length + 1, 0)
    const lineSpans = spans?.filter((span) => span.start >= start && span.end <= start + line.length)
      .map((span) => ({ ...span, start: span.start - start, end: span.end - start }))
    const lineHtml = lineSpans?.length ? spansToHtml(line, lineSpans) : null
    return <span key={index} className="docs-code-line">
      <span className="docs-code-lineno">{index + 1}</span>
      {lineHtml === null ? <span>{line}</span> : <span dangerouslySetInnerHTML={{ __html: lineHtml }} />}
    </span>
  })}</code>
}
