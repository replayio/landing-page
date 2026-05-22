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
    <div className="fixed top-0 z-[60] flex h-[var(--banner-height)] w-full items-center justify-center gap-3 bg-gradient-to-r from-rose-500 to-purple-600 px-4 text-sm text-white">
      <span className="hidden sm:inline">
        <strong>Introducing Loop QA:</strong> Test your web apps with confidence
      </span>
      <span className="font-bold sm:hidden">Introducing Loop QA</span>
      <Link
        href="/loop-qa"
        className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
      >
        Learn More
      </Link>
    </div>
  )
}
