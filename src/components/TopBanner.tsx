'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function TopBanner() {
  const pathname = usePathname()
  const isHidden = pathname === '/loop-qa'

  useEffect(() => {
    if (isHidden) {
      document.documentElement.style.setProperty('--banner-height', '0px')
    } else {
      document.documentElement.style.removeProperty('--banner-height')
    }
  }, [isHidden])

  if (isHidden) return null

  return (
    <div className="fixed top-0 z-[60] flex h-[var(--banner-height)] w-full items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 px-3 text-white sm:gap-3 sm:px-4">
      <span className="text-xs sm:hidden">We&apos;re live on ProductHunt!</span>
      <span className="hidden text-sm sm:inline">
        <strong>We&apos;re on ProductHunt today, currently #3 on the leaderboard</strong>
      </span>
      <Link
        href="https://www.producthunt.com/products/replayio"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
      >
        View the Launch
      </Link>
    </div>
  )
}
