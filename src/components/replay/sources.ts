/* More sources for a recording's DevTools, beside the rrweb events: a HAR (the network log browsers export) and a
   console log (one message per line, `2026-06-12T21:01:38.123Z [warn] text`; indented lines continue the message
   above). Both are read into the custom events devtools.ts already understands, stamped on their own absolute
   times, so they line up with the recording when they share its clock. Anything stamped before the recording
   starts or after it ends lands on its first or last moment. Pure readers, no rrweb import.

   A HAR can also carry inspections (inspections.ts) as an extension: `log._inspections`, each
   `{ at: ISO time, request?: entry _requestId or URL, message?: text, tab?, label? }`. */
import { ReplayEventType, type ReplayEvent } from './types'

type Json = Record<string, unknown>
const obj = (v: unknown): Json => (v && typeof v === 'object' ? (v as Json) : {})
const str = (v: unknown): string | undefined => (typeof v === 'string' && v !== '' ? v : undefined)
const num = (v: unknown): number | undefined => (typeof v === 'number' && Number.isFinite(v) ? v : undefined)
const time = (v: unknown): number | undefined => {
  const t = typeof v === 'string' ? Date.parse(v) : num(v)
  return t !== undefined && Number.isFinite(t) ? t : undefined
}

const custom = (timestamp: number, tag: string, payload: Json): ReplayEvent => ({
  type: ReplayEventType.Custom,
  timestamp,
  data: { tag, payload },
})

/** HAR headers (`[{ name, value }]`) as a record. */
function harHeaders(list: unknown): Record<string, string> | undefined {
  if (!Array.isArray(list)) return undefined
  const out: Record<string, string> = {}
  for (const h of list) {
    const name = str(obj(h).name)
    if (name) out[name] = String(obj(h).value ?? '')
  }
  return Object.keys(out).length ? out : undefined
}

/** A HAR body: as written, or decoded when base64 and textual. */
function harText(content: Json): string | undefined {
  const text = typeof content.text === 'string' ? content.text : undefined
  if (text === undefined || content.encoding !== 'base64') return text
  try {
    const bytes = Uint8Array.from(atob(text), (c) => c.charCodeAt(0))
    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    return decoded
  } catch {
    return `[${Math.round((text.length * 3) / 4)} bytes of binary data]`
  }
}

/** A HAR (object or JSON text) as `network` (and `inspect`) custom events. */
export function harToReplayEvents(har: unknown): ReplayEvent[] {
  let data: unknown = har
  if (typeof har === 'string') {
    try { data = JSON.parse(har) } catch { return [] }
  }
  const log = obj(obj(data).log)
  const out: ReplayEvent[] = []
  for (const raw of Array.isArray(log.entries) ? log.entries : []) {
    const e = obj(raw)
    const started = time(e.startedDateTime)
    if (started === undefined) continue
    const request = obj(e.request)
    const response = obj(e.response)
    const duration = Math.max(0, num(e.time) ?? 0)
    const status = num(response.status)
    const error = str(e._error) ?? str(response._error)
    out.push(custom(started + duration, error ? 'network.error' : 'network', {
      requestId: str(e._requestId),
      method: str(request.method) ?? 'GET',
      url: str(request.url) ?? '',
      status: status === -1 ? undefined : status,
      statusText: str(response.statusText),
      error,
      duration,
      type: str(e._resourceType) ?? 'fetch',
      requestHeaders: harHeaders(request.headers),
      responseHeaders: harHeaders(response.headers),
      requestBody: str(obj(request.postData).text),
      responseBody: harText(obj(response.content)),
    }))
  }
  for (const raw of Array.isArray(log._inspections) ? log._inspections : []) {
    const i = obj(raw)
    const at = time(i.at)
    if (at === undefined) continue
    out.push(custom(at, 'inspect', { request: str(i.request), message: str(i.message), element: str(i.element), tab: str(i.tab), label: str(i.label), id: str(i.id) }))
  }
  return out
}

const LINE = /^(\d{4}-\d\d-\d\dT[\d:.]+(?:Z|[+-]\d\d:?\d\d))\s+\[(\w+)\]\s?(.*)$/

/** A console log (`<ISO time> [level] message`, indented continuation lines) as `console` custom events. */
export function consoleLogToReplayEvents(text: string): ReplayEvent[] {
  const out: { at: number; level: string; lines: string[] }[] = []
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(LINE)
    const at = m ? time(m[1]) : undefined
    if (m && at !== undefined) out.push({ at, level: m[2]!.toLowerCase(), lines: [m[3] ?? ''] })
    else if (out.length && /^\s/.test(line)) out[out.length - 1]!.lines.push(line.replace(/^ {2}/, ''))
  }
  return out.map((m) => custom(m.at, 'console', { level: m.level === 'warning' ? 'warn' : m.level, message: m.lines.join('\n').trimEnd() }))
}

/** The recording's events with the HAR's and the console log's added, each stamped inside the recording. */
export function mergeReplaySources(events: ReplayEvent[], sources: { har?: unknown; consoleLog?: string }): ReplayEvent[] {
  const extra = [
    ...(sources.har ? harToReplayEvents(sources.har) : []),
    ...(sources.consoleLog ? consoleLogToReplayEvents(sources.consoleLog) : []),
  ]
  if (!extra.length || !events.length) return events
  let first = Infinity
  let last = -Infinity
  for (const e of events) {
    first = Math.min(first, e.timestamp)
    last = Math.max(last, e.timestamp)
  }
  const clamped = extra.map((e) => (e.timestamp < first || e.timestamp > last ? { ...e, timestamp: Math.min(last, Math.max(first, e.timestamp)) } : e))
  return [...events, ...clamped].sort((a, b) => a.timestamp - b.timestamp)
}
