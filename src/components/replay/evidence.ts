/* Evidence a debugger gathered about a recording, beside its rrweb events: the source it read, the logpoints it
   set (with each hit's watch value) and the screenshots it took. The player shows the first two in DevTools'
   Sources tab and the screenshots as macOS-style captures over the playing page.

     {
       "sources": [{ "path": "…/Profile.jsx", "lines": [{ "line": 61, "text": "…", "hits": 3 }], "focus": [61] }],
       "logpoints": [{ "path": "…/Profile.jsx", "line": 61, "expression": "res.status",
                       "hits": [{ "at": "2026-10-19T…Z", "value": "409" }] }],
       "screenshots": [{ "at": "2026-10-19T…Z", "src": "/shots/a.jpg", "label": "Saved! toast" }]
     }

   Times (`at`) are ISO strings on the recording's clock, or numbers: ms from its first event. Pure readers. */

export interface ReplaySourceLine {
  line: number
  text: string
  /** How many times the line ran, when the debugger counted. */
  hits?: number
}

export interface ReplaySourceFile {
  path: string
  /** When the debugger read it (an ISO time or ms): the player opens Sources on it there. */
  at?: string | number
  label?: string
  lines: ReplaySourceLine[]
  /** The lines the debugger was looking at: highlighted. */
  focus?: number[]
}

export interface ReplayLogpointHit {
  at: string | number
  /** The watch value at the hit, as text (JSON for objects). */
  value: string
}

export interface ReplayLogpoint {
  path: string
  line: number
  expression: string
  hits: ReplayLogpointHit[]
}

export interface ReplayScreenshot {
  at: string | number
  src: string
  label?: string
}

export interface ReplayEvidence {
  sources?: ReplaySourceFile[]
  logpoints?: ReplayLogpoint[]
  screenshots?: ReplayScreenshot[]
}

/** Evidence with times in ms from the recording's start, clamped into it; files merged by path. */
export interface ResolvedReplayEvidence {
  files: ReplaySourceFile[]
  /** Moments the debugger looked at source: each logpoint's first hit, and excerpts read at a time. */
  reads: { time: number; path: string; line?: number; label?: string }[]
  logpoints: (Omit<ReplayLogpoint, 'hits'> & { hits: { time: number; value: string }[] })[]
  screenshots: (Omit<ReplayScreenshot, 'at'> & { time: number })[]
}

const EMPTY: ResolvedReplayEvidence = { files: [], reads: [], logpoints: [], screenshots: [] }

/** Reads evidence (object or JSON text) against a recording that starts at `start` and lasts `duration` ms. */
export function resolveReplayEvidence(evidence: unknown, start: number, duration: number): ResolvedReplayEvidence {
  let data: unknown = evidence
  if (typeof evidence === 'string') {
    try { data = JSON.parse(evidence) } catch { return EMPTY }
  }
  if (!data || typeof data !== 'object') return EMPTY
  const e = data as ReplayEvidence
  const time = (at: unknown): number | undefined => {
    const t = typeof at === 'number' ? at : typeof at === 'string' ? Date.parse(at) - start : NaN
    return Number.isFinite(t) ? Math.min(Math.max(0, t), duration) : undefined
  }

  // One file per path: excerpts merged (a line read twice keeps its first text, its highest count).
  const byPath = new Map<string, { lines: Map<number, ReplaySourceLine>; focus: Set<number> }>()
  const reads: ResolvedReplayEvidence['reads'] = []
  const file = (path: string) => {
    let f = byPath.get(path)
    if (!f) byPath.set(path, (f = { lines: new Map(), focus: new Set() }))
    return f
  }
  for (const src of Array.isArray(e.sources) ? e.sources : []) {
    if (!src || typeof src.path !== 'string') continue
    const f = file(src.path)
    for (const l of Array.isArray(src.lines) ? src.lines : []) {
      if (typeof l?.line !== 'number' || typeof l.text !== 'string') continue
      const had = f.lines.get(l.line)
      f.lines.set(l.line, { line: l.line, text: had?.text ?? l.text, hits: Math.max(had?.hits ?? -1, l.hits ?? -1) >= 0 ? Math.max(had?.hits ?? 0, l.hits ?? 0) : undefined })
    }
    for (const n of Array.isArray(src.focus) ? src.focus : []) if (typeof n === 'number') f.focus.add(n)
    const at = time(src.at)
    if (at !== undefined) reads.push({ time: at, path: src.path, line: src.focus?.[0], label: src.label })
  }
  const logpoints: ResolvedReplayEvidence['logpoints'] = []
  for (const lp of Array.isArray(e.logpoints) ? e.logpoints : []) {
    if (!lp || typeof lp.path !== 'string' || typeof lp.line !== 'number') continue
    file(lp.path)
    const hits = (Array.isArray(lp.hits) ? lp.hits : [])
      .map((h) => ({ time: time(h?.at), value: String(h?.value ?? '') }))
      .filter((h): h is { time: number; value: string } => h.time !== undefined)
      .sort((a, b) => a.time - b.time)
    logpoints.push({ path: lp.path, line: lp.line, expression: String(lp.expression ?? ''), hits })
    if (hits.length) reads.push({ time: hits[0]!.time, path: lp.path, line: lp.line, label: `Logpoint ${sourceName(lp.path)}:${lp.line}` })
  }
  const files = [...byPath].map(([path, f]) => ({
    path,
    lines: [...f.lines.values()].sort((a, b) => a.line - b.line),
    focus: [...f.focus].sort((a, b) => a - b),
  }))
  const screenshots = (Array.isArray(e.screenshots) ? e.screenshots : [])
    .map((s) => ({ src: typeof s?.src === 'string' ? s.src : '', label: typeof s?.label === 'string' ? s.label : undefined, time: time(s?.at) }))
    .filter((s): s is { src: string; label: string | undefined; time: number } => !!s.src && s.time !== undefined)
    .sort((a, b) => a.time - b.time)
  return { files, reads: reads.sort((a, b) => a.time - b.time), logpoints, screenshots }
}

/** A path's last segment, for the file list. */
export const sourceName = (path: string) => path.replace(/[?#].*$/, '').split('/').filter(Boolean).pop() ?? path
