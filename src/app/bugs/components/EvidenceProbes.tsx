'use client'

import { useState } from 'react'
import { HighlightedCode } from '~/components/replay/HighlightedCode'
import type { Evidence } from '../data/bugs'

/** A step's evidence probes (tool calls and their output), collapsed; highlighted once first opened. */
export function EvidenceProbes({ evidence }: { evidence: Evidence }) {
  const [opened, setOpened] = useState(false)
  return (
    <details className="bug-evidence" onToggle={(e) => e.currentTarget.open && setOpened(true)}>
      <summary>{evidence.summary}</summary>
      <div className="bug-evidence-body">
        {evidence.probes.map((probe, i) => (
          <pre key={i} className="bug-evidence-probe">
            {opened ? <HighlightedCode code={probe} language="txt" /> : <code>{probe}</code>}
          </pre>
        ))}
      </div>
    </details>
  )
}
