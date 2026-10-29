/* Inspections: moments in a recording where someone (a person, a debugging agent) looked at a request or a console
   message — "at 0:35 we inspected GET /api/search?q=te". The player follows them by default: as the playhead
   reaches one, DevTools opens on its tab with that request (or message) selected and the inspection's label above
   it, and playback carries on.

   They come from the `inspections` prop or from the recording itself, as custom events tagged `inspect`
   (`record.addCustomEvent('inspect', { tab, request, message, label })`), so an .rrweb file can carry its own.
   An inspection names its target by the recording's id for it (a request's `requestId` / `id`, a custom console
   event's `id`) or, failing that, by URL (the request with that URL sent nearest the inspection) or by text (the
   last message containing it). Pure readers, no rrweb import. */
import type { ReplayConsoleEntry, ReplayDevtools, ReplayRequest } from './devtools'
import { ReplayEventType, type ReplayEvent } from './types'

export type ReplayInspectionTab = 'network' | 'console' | 'elements' | 'sources'

export interface ReplayInspection {
  /** Stable id; defaults to `inspect-<n>`. */
  id?: string
  /** Milliseconds from the start of the recording. */
  time: number
  /** The DevTools tab to open (default: `network` when `request` is set, `console` for `message`, else `elements`). */
  tab?: ReplayInspectionTab
  /** The request to select: the recording's id for it (`key`), or its URL. */
  request?: string
  /** The console message to select: the recording's id for it (`key`), or text it contains. */
  message?: string
  /** The element to select in the Elements tab (and highlight on the page): a CSS selector. */
  element?: string
  /** The source to show in the Sources tab: a file's path and, optionally, a line. */
  source?: { path: string; line?: number }
  /** What was found, shown above the panel while the inspection is current. */
  label?: string
}

/** An inspection with its defaults filled in and its target resolved against the recording's DevTools. */
export interface ResolvedReplayInspection {
  id: string
  time: number
  tab: ReplayInspectionTab
  label?: string
  /** The `ReplayRequest.id` to select, when the target was found. */
  requestId?: string
  /** The `ReplayConsoleEntry.id` to select, when the target was found. */
  messageId?: string
  /** The CSS selector of the element to select and highlight. */
  element?: string
  source?: { path: string; line?: number }
}

export const INSPECT_TAG = 'inspect'

const str = (value: unknown): string | undefined => (typeof value === 'string' && value ? value : undefined)

/** The `inspect` custom events in a recording, as inspections (times in ms from its first event). */
export function getReplayInspections(events: readonly ReplayEvent[]): ReplayInspection[] {
  const list = [...events].sort((a, b) => a.timestamp - b.timestamp)
  const start = list[0]?.timestamp ?? 0
  const out: ReplayInspection[] = []
  for (const event of list) {
    if (event.type !== ReplayEventType.Custom) continue
    const data = (event.data ?? {}) as { tag?: unknown; payload?: Record<string, unknown> }
    if (data.tag !== INSPECT_TAG) continue
    const p = data.payload ?? {}
    const tab = p.tab === 'network' || p.tab === 'console' || p.tab === 'elements' ? p.tab : undefined
    out.push({ id: str(p.id), time: event.timestamp - start, tab, request: str(p.request), message: str(p.message), element: str(p.element), label: str(p.label) })
  }
  return out
}

function findRequest(network: readonly ReplayRequest[], target: string, time: number): ReplayRequest | undefined {
  const byKey = network.find((r) => r.key === target)
  if (byKey) return byKey
  // By URL (exact, else the address without its origin): the one sent nearest the inspection.
  const matches = network.filter((r) => r.url === target || r.url.replace(/^\w+:\/\/[^/]+/, '') === target)
  return matches.sort((a, b) => Math.abs(a.time - time) - Math.abs(b.time - time))[0]
}

function findMessage(messages: readonly ReplayConsoleEntry[], target: string, time: number): ReplayConsoleEntry | undefined {
  const byKey = messages.find((m) => m.key === target)
  if (byKey) return byKey
  const matches = messages.filter((m) => m.message.includes(target))
  // The last one logged by the inspection, else the first after it.
  return matches.filter((m) => m.time <= time).at(-1) ?? matches[0]
}

/** Fills in each inspection's id and tab and finds its request or message; sorted by time. */
export function resolveReplayInspections(inspections: readonly ReplayInspection[], tools: ReplayDevtools): ResolvedReplayInspection[] {
  return inspections
    .map((inspection, i) => {
      const request = inspection.request ? findRequest(tools.network, inspection.request, inspection.time) : undefined
      const message = inspection.message ? findMessage(tools.console, inspection.message, inspection.time) : undefined
      return {
        id: inspection.id ?? `inspect-${i}`,
        time: Math.max(0, inspection.time),
        tab: inspection.tab ?? (inspection.request ? 'network' : inspection.message ? 'console' : inspection.source ? 'sources' : 'elements'),
        label: inspection.label,
        requestId: request?.id,
        messageId: message?.id,
        element: inspection.element,
        source: inspection.source,
      } satisfies ResolvedReplayInspection
    })
    .sort((a, b) => a.time - b.time)
}

/** The inspection current at `time`: the latest at or before it. */
export function replayInspectionAt(inspections: readonly ResolvedReplayInspection[], time: number): ResolvedReplayInspection | undefined {
  let current: ResolvedReplayInspection | undefined
  for (const inspection of inspections) {
    if (inspection.time > time) break
    current = inspection
  }
  return current
}

/** The speed to play at `time` so the inspection there stays up at least `dwell` ms of wall time before the next one
 *  replaces it: `speed`, or slower while the next is closer than `dwell × speed` of recording. Inspections at the same
 *  instant can't be told apart, so the slowest is a tenth of `speed`. */
export function replayInspectionDwellSpeed(inspections: readonly ResolvedReplayInspection[], time: number, speed: number, dwell: number): number {
  if (dwell <= 0) return speed
  const current = replayInspectionAt(inspections, time)
  if (!current) return speed
  const next = inspections.find((x) => x.time > time)
  if (!next) return speed
  return Math.min(speed, Math.max((next.time - current.time) / dwell, speed / 10))
}
