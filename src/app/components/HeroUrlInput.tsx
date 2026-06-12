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
      <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-1.5 py-1.5 shadow-lg transition-all focus-within:border-accent/40 focus-within:shadow-[0_0_0_3px_rgba(240,45,94,0.15)] sm:gap-2 sm:px-2 sm:py-2">
        <input
          type="text"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="your-app.com"
          aria-label="Your app URL"
          className="min-w-0 flex-1 border-0 bg-transparent py-2 pl-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:py-0 sm:pl-4"
        />
        <button
          type="submit"
          className="flex-shrink-0 whitespace-nowrap rounded-full bg-accent px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-light sm:px-5 sm:py-2.5 sm:text-sm"
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
