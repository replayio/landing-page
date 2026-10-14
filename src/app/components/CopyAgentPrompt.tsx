'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { FULL_PROMPT } from '~/app/how-it-works/components/AskYourAgent'

// Defaults to the general QA-loop prompt from How It Works; pages can pass a more specific one.
export function CopyAgentPrompt({ prompt = FULL_PROMPT }: { prompt?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
      <span>Want your coding agent to do it?</span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1 font-medium text-gray-700 transition hover:border-accent/40 hover:text-accent"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? 'Copied' : 'Copy prompt'}
      </button>
    </div>
  )
}
