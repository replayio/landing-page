'use client'

import { useEffect, useState } from 'react'

const steps = [
  { n: '01', label: 'Start' },
  { n: '02', label: 'Exploration' },
  { n: '03', label: 'Testing' },
  { n: '04', label: 'Analysis' },
  { n: '05', label: 'Bug Reports' },
  { n: '06', label: 'The Loop' }
]

export function StepSideNav() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = steps
      .map((_, i) => document.getElementById(`step-${i}`))
      .filter((el): el is HTMLElement => Boolean(el))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement))
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const goTo = (e: React.MouseEvent, i: number) => {
    e.preventDefault()
    const el = document.getElementById(`step-${i}`)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div className="hidden lg:flex flex-col gap-1 w-[180px] flex-shrink-0 sticky top-[120px] self-start">
      {steps.map((s, i) => (
        <a
          key={s.n}
          href={`#step-${i}`}
          onClick={(e) => goTo(e, i)}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap no-underline border-l-2 transition-all ${
            active === i
              ? 'text-accent border-accent'
              : 'text-gray-500 border-transparent hover:text-gray-900'
          }`}
        >
          <span className="opacity-70 text-[11px] tabular-nums">{s.n}</span>
          {s.label}
        </a>
      ))}
    </div>
  )
}
