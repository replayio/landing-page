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
      <p className="mt-6 flex flex-wrap items-center justify-center gap-x-1.5 text-xs text-slate-500">
        <span>Using GitHub?</span>
        <a
          href="https://qa.replay.io/new"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-accent transition hover:opacity-80"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          Connect a GitHub repo for continuous testing
        </a>
      </p>
    </form>
  )
}
