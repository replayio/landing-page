'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function TopBanner() {
  const pathname = usePathname()
  const isHidden = pathname === '/partner'

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
        Become a design partner to help shape Replay MCP
      </span>
      <span className="sm:hidden">
        Become a design partner
      </span>
      <Link
        href="/partner"
        className="inline-flex items-center rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
      >
        Apply now
      </Link>
    </div>
  )
}
