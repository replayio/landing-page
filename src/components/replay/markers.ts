/* Pure readers over an rrweb event list — no rrweb import, so custom player chrome (a
   scrubber with event markers, a cursor overlay) can be drawn before the player chunk loads. */
import { ReplayEventType, ReplayIncrementalSource, ReplayMouseInteraction, type ReplayEvent } from './types'

export interface ReplayMeta {
  /** Timestamp of the first event (ms since epoch). */
  start: number
  /** Timestamp of the last event. */
  end: number
  /** `end - start`: rrweb's `totalTime`. */
  duration: number
  /** Recorded viewport, from the first Meta / viewport-resize event (0 when unknown). */
  width: number
  height: number
  /** The first recorded page URL, if any. */
  href?: string
  /** Whether a full DOM snapshot is present (rrweb can't play without one). */
  playable: boolean
}

export type ReplayMarkerKind = 'click' | 'error' | 'network' | 'navigation' | 'custom'

export interface ReplayMarker {
  /** Stable id (`<kind>-<index>`), handy as a React key. */
  id: string
  kind: ReplayMarkerKind
  /** Milliseconds from the start of the recording. */
  time: number
  label: string
  detail?: string
  /** Viewport coordinates, for clicks. */
  x?: number
  y?: number
}

export interface ReplayPointerPoint {
  /** Milliseconds from the start of the recording. */
  time: number
  x: number
  y: number
}

export interface ReplayPointerTrack {
  moves: ReplayPointerPoint[]
  clicks: ReplayPointerPoint[]
}

function sorted(events: readonly ReplayEvent[]): ReplayEvent[] {
  return [...events].sort((a, b) => a.timestamp - b.timestamp)
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

function text(value: unknown): string | undefined {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (Array.isArray(value)) return value.map((v) => (typeof v === 'string' ? v.replace(/^"|"$/g, '') : JSON.stringify(v))).join(' ')
  return undefined
}

export function getReplayMeta(events: readonly ReplayEvent[]): ReplayMeta {
  const list = sorted(events)
  const start = list[0]?.timestamp ?? 0
  const end = list[list.length - 1]?.timestamp ?? start
  let width = 0
  let height = 0
  let href: string | undefined
  let playable = false
  for (const event of list) {
    const data = record(event.data)
    if (event.type === ReplayEventType.FullSnapshot) playable = true
    if (event.type === ReplayEventType.Meta) {
      if (!width && typeof data.width === 'number') width = data.width
      if (!height && typeof data.height === 'number') height = data.height
      if (!href && typeof data.href === 'string') href = data.href
    } else if (
      !width &&
      event.type === ReplayEventType.IncrementalSnapshot &&
      data.source === ReplayIncrementalSource.ViewportResize &&
      typeof data.width === 'number' &&
      typeof data.height === 'number'
    ) {
      width = data.width
      height = data.height
    }
  }
  return { start, end, duration: end - start, width, height, href, playable }
}

const ERROR_TAGS = new Set(['error', 'exception', 'console.error', 'uncaught'])
const NETWORK_TAGS = new Set(['network', 'network.error', 'request.failed', 'fetch.failed'])
const FAILED_TAGS = new Set(['network.error', 'request.failed', 'fetch.failed'])
// Console messages (from a console log, say) mark the rail only when they're errors.
const CONSOLE_TAGS = new Set(['console', 'log', 'warn', 'warning', 'info', 'debug'])
const NAVIGATION_TAGS = new Set(['navigation', 'navigate', 'route'])

/**
 * Timeline markers for a scrubber: clicks, console errors (rrweb console plugin), failed
 * requests (rrweb network plugin, status 0 or ≥ 400), page navigations (Meta events after the
 * first) and Custom events (`record.addCustomEvent(tag, payload)`; tags `error`, `network`,
 * `navigation` map to those kinds, anything else is `custom` labelled by `payload.label`).
 */
export function getReplayMarkers(events: readonly ReplayEvent[]): ReplayMarker[] {
  const list = sorted(events)
  const start = list[0]?.timestamp ?? 0
  const markers: ReplayMarker[] = []
  let seenMeta = false
  const push = (marker: Omit<ReplayMarker, 'id'>) =>
    markers.push({ ...marker, id: `${marker.kind}-${markers.length}` })

  for (const event of list) {
    const time = event.timestamp - start
    const data = record(event.data)
    switch (event.type) {
      case ReplayEventType.IncrementalSnapshot: {
        if (
          data.source === ReplayIncrementalSource.MouseInteraction &&
          (data.type === ReplayMouseInteraction.Click || data.type === ReplayMouseInteraction.DblClick) &&
          typeof data.x === 'number' &&
          typeof data.y === 'number'
        ) {
          push({ kind: 'click', time, label: data.type === ReplayMouseInteraction.DblClick ? 'Double-click' : 'Click', x: data.x, y: data.y })
        }
        break
      }
      case ReplayEventType.Meta: {
        if (seenMeta && typeof data.href === 'string') push({ kind: 'navigation', time, label: 'Navigated', detail: data.href })
        seenMeta = true
        break
      }
      case ReplayEventType.Plugin: {
        const payload = record(data.payload)
        if (data.plugin === 'rrweb/console@1' && (payload.level === 'error' || payload.level === 'assert')) {
          push({ kind: 'error', time, label: 'Console error', detail: text(payload.payload) })
        } else if (data.plugin === 'rrweb/network@1' && Array.isArray(payload.requests)) {
          for (const raw of payload.requests) {
            const request = record(raw)
            const status = typeof request.status === 'number' ? request.status : typeof request.responseStatus === 'number' ? request.responseStatus : undefined
            if (status === 0 || (status !== undefined && status >= 400) || request.error) {
              const method = typeof request.method === 'string' ? request.method : 'GET'
              push({ kind: 'network', time, label: `${method} ${status || 'failed'}`, detail: text(request.url ?? request.name) })
            }
          }
        }
        break
      }
      case ReplayEventType.Custom: {
        const tag = typeof data.tag === 'string' ? data.tag : 'custom'
        const payload = record(data.payload)
        const detail = text(payload.detail ?? payload.message ?? payload.url)
        const label = text(payload.label)
        if (ERROR_TAGS.has(tag)) push({ kind: 'error', time, label: label ?? 'Error', detail })
        else if (NETWORK_TAGS.has(tag)) {
          // A failed request marks the rail (the same rule as DevTools: an error, a failure tag, status 0 or 400 and
          // up); one that answered, or never did within the recording, doesn't.
          const code = typeof payload.status === 'number' ? payload.status : undefined
          const failed = FAILED_TAGS.has(tag) || !!payload.error || code === 0 || (code !== undefined && code >= 400)
          if (failed) push({ kind: 'network', time, label: label ?? `${text(payload.method) ?? 'GET'} ${code ?? 'failed'}`, detail })
        } else if (CONSOLE_TAGS.has(tag)) {
          if (payload.level === 'error' || payload.level === 'assert') push({ kind: 'error', time, label: label ?? 'Console error', detail })
        } else if (NAVIGATION_TAGS.has(tag)) push({ kind: 'navigation', time, label: label ?? 'Navigated', detail })
        else push({ kind: 'custom', time, label: label ?? tag, detail })
        break
      }
    }
  }
  return markers
}

/** The recorded pointer path (mouse/touch moves and drags) and click points, in viewport px. */
export function getReplayPointerTrack(events: readonly ReplayEvent[]): ReplayPointerTrack {
  const list = sorted(events)
  const start = list[0]?.timestamp ?? 0
  const moves: ReplayPointerPoint[] = []
  const clicks: ReplayPointerPoint[] = []
  for (const event of list) {
    if (event.type !== ReplayEventType.IncrementalSnapshot) continue
    const data = record(event.data)
    const source = data.source
    if (
      (source === ReplayIncrementalSource.MouseMove ||
        source === ReplayIncrementalSource.TouchMove ||
        source === ReplayIncrementalSource.Drag) &&
      Array.isArray(data.positions)
    ) {
      for (const raw of data.positions) {
        const p = record(raw)
        if (typeof p.x !== 'number' || typeof p.y !== 'number') continue
        const offset = typeof p.timeOffset === 'number' ? p.timeOffset : 0
        moves.push({ time: Math.max(0, event.timestamp - start + offset), x: p.x, y: p.y })
      }
    } else if (source === ReplayIncrementalSource.MouseInteraction && typeof data.x === 'number' && typeof data.y === 'number') {
      const point = { time: event.timestamp - start, x: data.x, y: data.y }
      moves.push(point)
      if (data.type === ReplayMouseInteraction.Click || data.type === ReplayMouseInteraction.DblClick) clicks.push(point)
    }
  }
  moves.sort((a, b) => a.time - b.time)
  return { moves, clicks }
}

/** The pointer position at `time` (linear between recorded points), or null before the first. */
export function replayPointerAt(track: ReplayPointerTrack, time: number): { x: number; y: number } | null {
  const { moves } = track
  if (!moves.length || time < moves[0]!.time) return null
  let lo = 0
  let hi = moves.length - 1
  if (time >= moves[hi]!.time) return { x: moves[hi]!.x, y: moves[hi]!.y }
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (moves[mid]!.time <= time) lo = mid
    else hi = mid
  }
  const a = moves[lo]!
  const b = moves[hi]!
  const k = b.time === a.time ? 1 : (time - a.time) / (b.time - a.time)
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }
}
