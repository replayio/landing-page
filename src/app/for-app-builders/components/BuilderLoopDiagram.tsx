'use client'

import { useEffect, useRef } from 'react'

// The builder loop: a dot travels the ellipse and lights each node it reaches, playing out
// prompt → build → test (bugs) → fix → rebuild → test (clean) → working app.
type Segment = {
  d: number
  arc?: [number, number]
  line?: Array<[number, number]>
  at?: [number, number]
  lit?: string[]
  status?: string
  hidden?: boolean
}

const segments: Segment[] = [
  {
    d: 900,
    line: [
      [160, 46],
      [272, 60]
    ],
    lit: ['prompt'],
    status: ''
  },
  {
    d: 300,
    line: [
      [272, 60],
      [360, 65]
    ],
    lit: ['build']
  },
  { d: 600, at: [360, 65], lit: ['build'], status: 'Building…', hidden: true },
  { d: 1300, arc: [0, 120], status: '' },
  { d: 1000, at: [542, 237], lit: ['qa'], status: 'Pass 1: testing…', hidden: true },
  { d: 1300, arc: [120, 240], status: 'Pass 1: 3 bugs found' },
  { d: 900, at: [178, 237], lit: ['bugs'], status: 'Fix prompt sent' },
  { d: 1300, arc: [240, 360], status: 'Fixing…' },
  { d: 600, at: [360, 65], lit: ['build'], status: 'Rebuilding…', hidden: true },
  { d: 1300, arc: [0, 120], status: '' },
  { d: 1000, at: [542, 237], lit: ['qa'], status: 'Pass 2: testing…', hidden: true },
  {
    d: 900,
    line: [
      [566, 262],
      [610, 315],
      [640, 340]
    ],
    status: 'Pass 2: clean'
  },
  { d: 1800, at: [640, 340], lit: ['done'], hidden: true },
  { d: 500, at: [640, 340], status: '', hidden: true }
]

const CX = 360,
  CY = 180,
  RX = 210,
  RY = 115
const ease = (u: number) => (u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2)
const lerp = (a: number, b: number, u: number) => a + (b - a) * u
const onEllipse = (deg: number): [number, number] => [
  CX + RX * Math.sin((deg * Math.PI) / 180),
  CY - RY * Math.cos((deg * Math.PI) / 180)
]
const along = (pts: Array<[number, number]>, u: number): [number, number] => {
  const k = Math.min(Math.floor(u * (pts.length - 1)), pts.length - 2)
  const v = u * (pts.length - 1) - k
  return [lerp(pts[k][0], pts[k + 1][0], v), lerp(pts[k][1], pts[k + 1][1], v)]
}

export function BuilderLoopDiagram() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const dot = svg.querySelector<SVGGElement>('.ab-loop-dot')!
    const status = svg.querySelector<SVGTextElement>('.ab-loop-status')!
    const nodes = [...svg.querySelectorAll<SVGElement>('[data-node]')]
    const total = segments.reduce((sum, s) => sum + s.d, 0)
    let clock = 0,
      prev: number | null = null,
      current = -1,
      raf = 0

    const tick = (now: number) => {
      if (prev !== null) clock += Math.min(now - prev, 100)
      prev = now
      let t = clock % total,
        i = 0
      while (t >= segments[i].d) t -= segments[i++].d
      const s = segments[i],
        u = t / s.d
      if (i !== current) {
        current = i
        nodes.forEach((n) => n.classList.toggle('lit', !!s.lit?.includes(n.dataset.node!)))
        if (s.status !== undefined) status.textContent = s.status
      }
      const [x, y] = s.arc
        ? onEllipse(lerp(s.arc[0], s.arc[1], ease(u)))
        : s.line
          ? along(s.line, u)
          : s.at!
      dot.setAttribute('transform', `translate(${x} ${y})`)
      dot.style.opacity = s.hidden ? '0' : '1'
      raf = requestAnimationFrame(tick)
    }
    // Only run while on screen, so the story starts from the top when someone scrolls to it.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) raf = requestAnimationFrame(tick)
      if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf)
        raf = 0
        prev = null
      }
    })
    observer.observe(svg)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="ab-loop mt-10">
      <svg
        ref={svgRef}
        viewBox="0 0 760 380"
        role="img"
        aria-label="The builder loop: user prompts, your agent builds, Replay QA tests, and bugs with root cause and fix prompt go back to your agent. The loop repeats until Replay QA finds the app clean, then the user gets a working app."
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="14"
        fontWeight="500"
        className="hidden h-auto w-full md:block"
      >
        <defs>
          <marker
            id="ab-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill="#6b7280" />
          </marker>
        </defs>
        <ellipse
          className="ab-loop-track"
          cx={CX}
          cy={CY}
          rx={RX}
          ry={RY}
          fill="none"
          stroke="#f02d5e"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <g fill="#f02d5e">
          <path d="M-7 -6 L7 0 L-7 6 Z" transform="translate(541.9 122.5) rotate(43.5)" />
          <path d="M-7 -6 L7 0 L-7 6 Z" transform="translate(360 295) rotate(180)" />
          <path d="M-7 -6 L7 0 L-7 6 Z" transform="translate(178.1 122.5) rotate(-43.5)" />
        </g>
        <text x="360" y="175" textAnchor="middle" fill="#6b7280" fontSize="13" fontWeight="400">
          re-test until clean,
        </text>
        <text x="360" y="195" textAnchor="middle" fill="#6b7280" fontSize="13" fontWeight="400">
          in the background, before delivery
        </text>
        <text
          className="ab-loop-status"
          x="360"
          y="232"
          textAnchor="middle"
          fill="#f02d5e"
          fontSize="13"
          fontWeight="600"
        />

        <line
          x1="160"
          y1="46"
          x2="270"
          y2="60"
          stroke="#6b7280"
          strokeWidth="1.5"
          markerEnd="url(#ab-arrow)"
        />
        <line
          x1="566"
          y1="262"
          x2="610"
          y2="315"
          stroke="#6b7280"
          strokeWidth="1.5"
          markerEnd="url(#ab-arrow)"
        />
        <text x="600" y="282" fill="#6b7280" fontSize="13" fontWeight="400">
          clean
        </text>

        <g className="ab-loop-dot">
          <circle r="11" fill="#f02d5e" opacity=".2" />
          <circle r="5" fill="#f02d5e" />
        </g>

        <g stroke="#e5e7eb" fill="#fff">
          <rect data-node="prompt" x="20" y="18" width="140" height="44" rx="10" />
          <rect data-node="build" x="275" y="43" width="170" height="44" rx="10" />
          <rect data-node="bugs" x="53" y="215.5" width="250" height="44" rx="10" />
          <rect data-node="done" x="540" y="318" width="200" height="44" rx="10" />
        </g>
        <rect data-node="qa" x="477" y="215.5" width="130" height="44" rx="10" fill="#111827" />
        <path d="M500 232.5 L508 237.5 L500 242.5 Z" fill="#f02d5e" />

        <g fill="#111827" textAnchor="middle">
          <text x="90" y="45">
            User prompts
          </text>
          <text x="360" y="70">
            Your agent builds
          </text>
          <text x="178" y="242.5">
            Bugs + root cause + fix prompt
          </text>
          <text x="640" y="345">
            User gets a working app
          </text>
        </g>
        <text x="549" y="242.5" textAnchor="middle" fill="#fff">
          Replay QA
        </text>
      </svg>

      {/* Small screens get the loop as a stacked list. */}
      <ol className="flex flex-col items-stretch text-center text-sm md:hidden" aria-hidden="true">
        {['User prompts', 'Your agent builds', 'Replay QA', 'Bugs + root cause + fix prompt'].map(
          (label, i) => (
            <li key={label}>
              {i > 0 && <div className="py-1 text-gray-400">↓</div>}
              <div
                className={
                  label === 'Replay QA'
                    ? 'rounded-lg bg-gray-900 px-4 py-3 font-medium text-white'
                    : 'rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900'
                }
              >
                {label}
              </div>
            </li>
          )
        )}
        <li className="py-2 text-xs text-gray-500">
          <span className="font-bold text-accent">↺</span> back to your agent, re-test until clean
        </li>
        <li>
          <div className="py-1 text-gray-400">↓</div>
          <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900">
            User gets a working app
          </div>
        </li>
      </ol>
    </div>
  )
}
