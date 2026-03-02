'use client'

import { useState, useEffect } from 'react'
import { LovableIcon, Base44Icon, BoltIcon, ReplitIcon } from '~/components/icons/index'
import { IsoLogo } from '~/components/primitives/logo'


const PARTNERS = [
  { id: 'lovable', name: 'Lovable', Icon: LovableIcon },
  { id: 'base44', name: 'Base44', Icon: Base44Icon },
  { id: 'bolt', name: 'Bolt', Icon: BoltIcon },
  { id: 'replit', name: 'Replit', Icon: ReplitIcon }
] as const

const CYCLE_INTERVAL_MS = 3000

export function PartnerLogosCycler({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PARTNERS.length)
    }, CYCLE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  const current = PARTNERS[index]
  const itemHeight = 40 // h-10 = 40px

  return (
    <div
      className={`flex items-center justify-center gap-4 ${className ?? ''}`}
      role="img"
      aria-label={`${current.name} plus Replay`}
    >
      {/* Cycling partner (left) - vertical reel */}
      <div
        className="h-10 overflow-hidden"
        style={{ minWidth: 'fit-content' }}
      >
        <div
          className="flex flex-col transition-all duration-[400ms] ease-out "
          style={{ transform: `translateY(-${index * itemHeight}px)` }}
        >
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="flex h-10 shrink-0 items-center gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-white">
                <partner.Icon className="h-5 w-5" aria-hidden />
              </div>
              <span className="text-xl font-bold text-slate-900 sm:text-2xl">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Static plus sign */}
      <span className="text-xl font-bold text-slate-900 sm:text-2xl" aria-hidden>
        +
      </span>

      {/* Static Replay (right) */}
      <div className="flex items-center gap-3">
        <IsoLogo className="h-10 w-10 shrink-0 text-[#F41C52]" aria-hidden />
        <span className="text-xl font-bold text-slate-900 sm:text-2xl">Replay</span>
      </div>
    </div>
  )
}
