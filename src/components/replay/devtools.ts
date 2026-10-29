/* What a browser's DevTools would have shown during a recording: its console messages and its network requests,
   read from the event list with no rrweb import. Two kinds of event carry them:

   - rrweb's plugins: `rrweb/console@1` (level, the logged values as JSON strings, a stack trace) and
     `rrweb/network@1` (`{ requests: [...] }`, each with url, method, status, startTime/endTime, headers, bodies).
   - Custom events (`record.addCustomEvent(tag, payload)`): tag `network` (or `request`, `fetch`, `xhr`,
     `network.error`, `request.failed`, `fetch.failed`) with `{ method, url, status, … }`; tag `error` (or
     `exception`, `console.error`, `uncaught`) with `{ label, message }`; tag `console` (or `log`, `warn`, `info`,
     `debug`) with `{ level, message }`.

   `replayDevtoolsAt` cuts both lists at a playhead: what had been logged, which requests had been sent and which
   of those had answered by then. */
import { ReplayEventType, type ReplayEvent } from './types'

export type ReplayConsoleLevel = 'log' | 'info' | 'warn' | 'error' | 'debug'

export interface ReplayConsoleEntry {
  /** Stable id (`console-<n>`). */
  id: string
  /** The recording's own id for the message (`payload.id` of a custom event), which an inspection can name. */
  key?: string
  /** Milliseconds from the start of the recording. */
  time: number
  level: ReplayConsoleLevel
  /** The logged values as text, joined with spaces. */
  message: string
  /** Each logged value as text. */
  args: string[]
  /** Stack frames, when the recording kept them. */
  trace?: string[]
  /** `console` (rrweb's console plugin), `exception` (an error event) or `custom` (a custom console event). */
  source: 'console' | 'exception' | 'custom'
}

export interface ReplayRequest {
  /** Stable id (`request-<n>`). */
  id: string
  /** The recording's own id for the request (`id` / `requestId`, e.g. a Replay request id), which an
   *  inspection can name. */
  key?: string
  /** When the request was sent, in ms from the start of the recording. */
  time: number
  /** How long it took, when known: the response arrived at `time + duration`. */
  duration?: number
  method: string
  url: string
  /** The last path segment (and query), as DevTools' Name column shows it. */
  name: string
  /** HTTP status; 0 when the request failed without one. Missing when the recording doesn't say. */
  status?: number
  statusText?: string
  /** `fetch`, `xhr`, `script`, `img`, … (the resource's initiator type). */
  type: string
  /** No response, a status of 0, or a status of 400 and up. */
  failed: boolean
  error?: string
  requestHeaders?: Record<string, string>
  responseHeaders?: Record<string, string>
  requestBody?: string
  responseBody?: string
}

export interface ReplayDevtools {
  console: ReplayConsoleEntry[]
  network: ReplayRequest[]
}

export interface ReplayDevtoolsState {
  /** Messages logged at or before the playhead. */
  console: ReplayConsoleEntry[]
  /** Requests sent at or before the playhead, with `pending` true for those still waiting on a response. */
  network: (ReplayRequest & { pending: boolean })[]
  counts: {
    requests: number
    /** Requests that had failed by the playhead (a pending request hasn't failed yet). */
    failed: number
    errors: number
    warnings: number
    /** Messages and requests later in the recording. */
    laterMessages: number
    laterRequests: number
  }
}

const ERROR_TAGS = new Set(['error', 'exception', 'console.error', 'uncaught'])
const REQUEST_TAGS = new Set(['network', 'request', 'fetch', 'xhr', 'network.error', 'request.failed', 'fetch.failed'])
const FAILED_TAGS = new Set(['network.error', 'request.failed', 'fetch.failed'])
const CONSOLE_TAGS = new Set(['console', 'log', 'warn', 'warning', 'info', 'debug'])

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

const str = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : typeof value === 'number' || typeof value === 'boolean' ? String(value) : undefined

const num = (value: unknown): number | undefined => (typeof value === 'number' && Number.isFinite(value) ? value : undefined)

/** A body or a logged value as text: strings as they are, anything else as compact JSON. */
function asText(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined
  if (typeof value === 'string') return value
  try { return JSON.stringify(value) } catch { return String(value) }
}

/** rrweb's console plugin stores each value JSON-stringified: a string comes back as itself, the rest as JSON. */
function consoleArg(raw: unknown): string {
  if (typeof raw !== 'string') return asText(raw) ?? String(raw)
  try {
    const value: unknown = JSON.parse(raw)
    return typeof value === 'string' ? value : raw
  } catch {
    return raw
  }
}

function headers(value: unknown): Record<string, string> | undefined {
  if (!value || typeof value !== 'object') return undefined
  const out: Record<string, string> = {}
  if (Array.isArray(value)) {
    for (const pair of value) if (Array.isArray(pair) && pair.length >= 2) out[String(pair[0])] = String(pair[1])
  } else for (const [k, v] of Object.entries(value)) if (v !== undefined && v !== null) out[k] = String(v)
  return Object.keys(out).length ? out : undefined
}

/** DevTools' Name column: the last path segment plus the query, or the host for a bare origin. */
export function requestName(url: string): string {
  const clean = url.replace(/#.*$/, '')
  const [path, query] = clean.split('?', 2) as [string, string | undefined]
  const segment = path.replace(/\/+$/, '').split('/').pop() || path.replace(/^\w+:\/\//, '') || '/'
  return query !== undefined ? `${segment}?${query}` : segment
}

const levelOf = (value: unknown): ReplayConsoleLevel => {
  const level = str(value)?.toLowerCase()
  if (level === 'warn' || level === 'warning') return 'warn'
  if (level === 'error' || level === 'assert') return 'error'
  if (level === 'info') return 'info'
  if (level === 'debug' || level === 'trace') return 'debug'
  return 'log'
}

/** Every console message and network request in the recording, in time order. */
export function getReplayDevtools(events: readonly ReplayEvent[]): ReplayDevtools {
  const list = [...events].sort((a, b) => a.timestamp - b.timestamp)
  const start = list[0]?.timestamp ?? 0
  const consoleEntries: Omit<ReplayConsoleEntry, 'id'>[] = []
  const requests: Omit<ReplayRequest, 'id'>[] = []

  const addRequest = (raw: Record<string, unknown>, at: number, tagFailed = false, batchEnd?: number) => {
    const url = str(raw.url) ?? str(raw.name) ?? ''
    const status = num(raw.status) ?? num(raw.responseStatus) ?? num(raw.statusCode)
    const startTime = num(raw.startTime)
    const endTime = num(raw.endTime) ?? num(raw.responseEnd)
    const duration = num(raw.duration) ?? (startTime !== undefined && endTime !== undefined ? Math.max(0, endTime - startTime) : undefined)
    const error = str(raw.error) ?? (raw.error ? 'Failed' : undefined)
    // The plugin emits requests once they have finished: the batch's last answer is the event's time, and each
    // request was sent that far before it (its own duration, for a lone request).
    const sent = Math.max(0, startTime !== undefined && batchEnd !== undefined ? at - (batchEnd - startTime) : at - (duration ?? 0))
    requests.push({
      key: str(raw.requestId) ?? str(raw.id),
      time: sent,
      duration,
      method: (str(raw.method) ?? 'GET').toUpperCase(),
      url,
      name: requestName(url),
      status,
      statusText: str(raw.statusText),
      type: (str(raw.initiatorType) ?? str(raw.type) ?? 'fetch').replace(/^navigation$/, 'document'),
      failed: tagFailed || !!error || status === 0 || (status !== undefined && status >= 400),
      error,
      requestHeaders: headers(raw.requestHeaders),
      responseHeaders: headers(raw.responseHeaders),
      requestBody: asText(raw.requestBody ?? raw.body),
      responseBody: asText(raw.responseBody ?? raw.response),
    })
  }

  for (const event of list) {
    const time = event.timestamp - start
    const data = record(event.data)
    if (event.type === ReplayEventType.Plugin) {
      const payload = record(data.payload)
      if (data.plugin === 'rrweb/console@1') {
        const args = Array.isArray(payload.payload) ? payload.payload.map(consoleArg) : []
        const trace = Array.isArray(payload.trace) ? payload.trace.map(String).filter(Boolean) : undefined
        consoleEntries.push({ time, level: levelOf(payload.level), message: args.join(' '), args, trace: trace?.length ? trace : undefined, source: 'console' })
      } else if (data.plugin === 'rrweb/network@1' && Array.isArray(payload.requests)) {
        const batch = payload.requests.map(record)
        let batchEnd: number | undefined
        for (const r of batch) {
          const end = num(r.endTime) ?? num(r.responseEnd)
          if (end !== undefined) batchEnd = Math.max(batchEnd ?? end, end)
        }
        for (const r of batch) addRequest(r, time, false, batchEnd)
      }
    } else if (event.type === ReplayEventType.Custom) {
      const tag = str(data.tag) ?? ''
      const payload = record(data.payload)
      if (REQUEST_TAGS.has(tag)) addRequest(payload, time, FAILED_TAGS.has(tag))
      else if (ERROR_TAGS.has(tag)) {
        const label = str(payload.label) ?? str(payload.name) ?? 'Error'
        const detail = str(payload.message) ?? str(payload.detail)
        const message = detail ? `Uncaught ${label}: ${detail}` : `Uncaught ${label}`
        const trace = Array.isArray(payload.stack) ? payload.stack.map(String) : str(payload.stack)?.split('\n').map((l) => l.trim()).filter(Boolean)
        consoleEntries.push({ key: str(payload.id), time, level: 'error', message, args: [message], trace: trace?.length ? trace : undefined, source: 'exception' })
      } else if (CONSOLE_TAGS.has(tag)) {
        const args = Array.isArray(payload.args) ? payload.args.map((a) => asText(a) ?? '') : [str(payload.message) ?? str(payload.label) ?? asText(payload.detail) ?? '']
        consoleEntries.push({ key: str(payload.id), time, level: levelOf(payload.level ?? tag), message: args.join(' '), args, source: 'custom' })
      }
    }
  }

  requests.sort((a, b) => a.time - b.time)
  return {
    console: consoleEntries.map((e, i) => ({ ...e, id: `console-${i}` })),
    network: requests.map((r, i) => ({ ...r, id: `request-${i}` })),
  }
}

/** How many items of a time-sorted list are at or before `time`. */
function countUpTo(list: readonly { time: number }[], time: number) {
  let lo = 0
  let hi = list.length
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (list[mid]!.time <= time) lo = mid + 1
    else hi = mid
  }
  return lo
}

/** The console and network as they stood at `time` (ms from the start). */
export function replayDevtoolsAt(devtools: ReplayDevtools, time: number): ReplayDevtoolsState {
  const logged = devtools.console.slice(0, countUpTo(devtools.console, time))
  const network = devtools.network.slice(0, countUpTo(devtools.network, time)).map((r) => ({
    ...r, pending: r.duration !== undefined && r.time + r.duration > time,
  }))
  let errors = 0
  let warnings = 0
  for (const e of logged) {
    if (e.level === 'error') errors++
    else if (e.level === 'warn') warnings++
  }
  return {
    console: logged,
    network,
    counts: {
      requests: network.length,
      failed: network.filter((r) => r.failed && !r.pending).length,
      errors,
      warnings,
      laterMessages: devtools.console.length - logged.length,
      laterRequests: devtools.network.length - network.length,
    },
  }
}
