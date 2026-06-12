'use client'

import { useState } from 'react'
import clsx from 'clsx'

export function HeroUrlInput({ className }: { className?: string }) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const base = 'https://qa.replay.io/new'
    const raw = url.trim()
    const normalized = raw && !/^https?:\/\//i.test(raw) ? `https://${raw}` : raw
    const destination = normalized ? `${base}?url=${encodeURIComponent(normalized)}` : base
    window.open(destination, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className={clsx('mx-auto w-full max-w-lg', className)}>
      <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg transition-all focus-within:border-accent/40 focus-within:shadow-[0_0_0_3px_rgba(240,45,94,0.15)] sm:flex-row sm:items-center sm:rounded-full sm:px-2 sm:py-2">
        <input
          type="text"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="your-app.com"
          aria-label="Your app URL"
          className="min-w-0 flex-1 rounded-xl border-0 bg-transparent px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:rounded-none sm:py-0 sm:pl-4"
        />
        <button
          type="submit"
          className="w-full flex-shrink-0 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-light sm:w-auto sm:whitespace-nowrap sm:rounded-full"
        >
          Test my app for free
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">
        No test suite &middot; No credit card &middot; Just a URL
      </p>
    </form>
  )
}
