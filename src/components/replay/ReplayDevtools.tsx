/* The player's DevTools: a Console and a Network button in the top bar, with what had happened by the playhead —
   requests sent and, in red, how many had failed; console errors in red — and, behind them, a panel over the
   page in the manner of Chrome's DevTools. The Console lists what had been logged, warnings and errors on their
   tinted rows with their stack traces; the Network tab lists the requests that had been sent (a request still
   waiting at the playhead shows as pending), and a request's row opens its headers, payload and response.

   Everything is a function of the playhead: scrub back and the lists shrink to what DevTools showed then. A row's
   time jumps the player there. Esc closes the panel. An inspection (inspections.ts) selects its request or
   message and marks it. Plain React + plain CSS, like the player. */
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { ChevronRight, CircleX, Info, Network, SquareTerminal, TriangleAlert, X } from 'lucide-react'
import type { ReplayConsoleEntry, ReplayDevtoolsState, ReplayRequest } from './devtools'
import { sourceName, type ResolvedReplayEvidence } from './evidence'
import type { ResolvedReplayInspection } from './inspections'

export type ReplayDevtoolsTab = 'console' | 'network' | 'elements' | 'sources'

const time = (ms: number) => {
  const s = Math.max(0, ms) / 1000
  return `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, '0')}`
}
const duration = (ms?: number) => (ms === undefined ? '—' : ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(2)} s`)

/** The two buttons for the top bar (or the controls row): icon, request count and, in red, what failed. */
export function DevtoolsButtons({ state, open, onOpen }: {
  state: ReplayDevtoolsState; open: ReplayDevtoolsTab | null; onOpen: (tab: ReplayDevtoolsTab) => void
}) {
  const { requests, failed, errors, warnings } = state.counts
  return (
    <div data-slot="replay-devtools-buttons">
      <button
        type="button"
        data-slot="replay-devtools-button"
        data-tab="console"
        aria-pressed={open === 'console'}
        aria-label={`Console: ${errors} ${errors === 1 ? 'error' : 'errors'}, ${warnings} ${warnings === 1 ? 'warning' : 'warnings'}`}
        title="Console"
        onClick={() => onOpen('console')}
      >
        <SquareTerminal size={14} strokeWidth={2} />
        {errors ? <span data-part="failed">{errors}</span> : null}
        {warnings ? <span data-part="warn">{warnings}</span> : null}
      </button>
      <button
        type="button"
        data-slot="replay-devtools-button"
        data-tab="network"
        aria-pressed={open === 'network'}
        aria-label={`Network: ${requests} ${requests === 1 ? 'request' : 'requests'}, ${failed} failed`}
        title="Network"
        onClick={() => onOpen('network')}
      >
        <Network size={14} strokeWidth={2} />
        <span data-part="count">{requests}</span>
        {failed ? <span data-part="failed">{failed}</span> : null}
      </button>
    </div>
  )
}

/** The panel over the page: Console and Network, cut at the playhead. `inspection` selects and marks its target;
 *  `autoFocus` (default true) moves focus into the panel as it opens — off when an inspection opened it mid-play. */
export function DevtoolsPanel({ state, tab, onTab, onClose, onSeek, inspection, autoFocus = true, onInteract, elements, sources }: {
  state: ReplayDevtoolsState; tab: ReplayDevtoolsTab; onTab: (tab: ReplayDevtoolsTab) => void
  onClose: () => void; onSeek: (ms: number) => void; inspection?: ResolvedReplayInspection | null; autoFocus?: boolean
  /** Any click, scroll or key in the panel (the player then treats it as the user's). */
  onInteract?: () => void
  /** The Elements tab: the replayed page's document, the selected element, and selection / hover callbacks. */
  elements?: ElementsProps
  /** The Sources tab: the debugger's source excerpts and logpoints. */
  sources?: SourcesProps
}) {
  const panel = useRef<HTMLDivElement>(null)
  // Opened by an inspection, the panel starts taller: its point is the request's details.
  const [height, setHeight] = useState(inspection ? 72 : 58)
  // Focus moves in as the panel opens (not later, when the user is already working in it).
  useEffect(() => { if (autoFocus) panel.current?.focus({ preventScroll: true }) }, [])

  // Drag the top edge to resize, as a fraction of the stage.
  const resize = (e: ReactPointerEvent<HTMLDivElement>) => {
    const stage = panel.current?.parentElement
    if (!stage) return
    e.preventDefault()
    const el = e.currentTarget
    el.setPointerCapture(e.pointerId)
    const box = stage.getBoundingClientRect()
    const move = (ev: PointerEvent) => setHeight(Math.min(92, Math.max(22, ((box.bottom - ev.clientY) / box.height) * 100)))
    const up = () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
  }

  const onKeyDown = (e: ReactKeyboardEvent) => {
    onInteract?.()
    if (e.key === 'Escape') { e.stopPropagation(); onClose() }
    // The player's own keys (space, arrows, J/K/L) stay out of the panel.
    else if (!(e.target as HTMLElement).closest('input')) e.stopPropagation()
  }

  const tabs: { id: ReplayDevtoolsTab; label: string }[] = [
    ...(elements ? [{ id: 'elements' as const, label: 'Elements' }] : []),
    { id: 'console', label: 'Console' },
    ...(sources ? [{ id: 'sources' as const, label: 'Sources' }] : []),
    { id: 'network', label: 'Network' },
  ]
  return (
    <div
      ref={panel}
      data-slot="replay-devtools"
      role="dialog"
      aria-label="DevTools"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onPointerDown={onInteract}
      onWheel={onInteract}
      style={{ height: `${height}%` }}
    >
      <div data-slot="replay-devtools-resize" aria-hidden="true" onPointerDown={resize} />
      <div data-slot="replay-devtools-tabs">
        <div data-slot="replay-devtools-tablist" role="tablist" aria-label="DevTools panels">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => onTab(t.id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault()
                const i = tabs.findIndex((x) => x.id === t.id) + (e.key === 'ArrowRight' ? 1 : -1)
                onTab(tabs[(i + tabs.length) % tabs.length]!.id)
              }
            }}
            tabIndex={tab === t.id ? 0 : -1}
          >
            {t.label}
            {t.id === 'console' && state.counts.errors ? <span data-part="failed">{state.counts.errors}</span> : null}
            {t.id === 'network' && state.counts.failed ? <span data-part="failed">{state.counts.failed}</span> : null}
          </button>
        ))}
        </div>
        <button type="button" data-slot="replay-devtools-close" aria-label="Close DevTools" onClick={onClose}><X size={14} /></button>
      </div>
      {tab === 'console'
        ? <ConsolePane state={state} onSeek={onSeek} inspected={inspection?.tab === 'console' ? inspection : null} />
        : tab === 'elements' && elements ? <ElementsPane {...elements} />
        : tab === 'sources' && sources ? <SourcesPane {...sources} />
        : <NetworkPane state={state} onSeek={onSeek} inspected={inspection?.tab === 'network' ? inspection : null} />}
    </div>
  )
}

/* ── Console ─────────────────────────────────────────────────────────────────────── */

type LevelFilter = 'all' | 'error' | 'warn' | 'info'
const LEVEL_ICON = { error: CircleX, warn: TriangleAlert, info: Info } as const

function ConsolePane({ state, onSeek, inspected }: {
  state: ReplayDevtoolsState; onSeek: (ms: number) => void; inspected: ResolvedReplayInspection | null
}) {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<LevelFilter>('all')
  const list = useRef<HTMLDivElement>(null)
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.console.filter((e) =>
      (level === 'all' || (level === 'info' ? e.level === 'info' || e.level === 'log' || e.level === 'debug' : e.level === level)) &&
      (!q || e.message.toLowerCase().includes(q)))
  }, [state.console, query, level])
  // Follow new messages as they're logged, unless you've scrolled up to read (or an inspection is showing one).
  const pinned = useRef(true)
  const inspectedId = inspected?.messageId
  const shown = inspectedId !== undefined && rows.some((r) => r.id === inspectedId)
  useEffect(() => {
    const el = list.current
    if (el && pinned.current && !shown) el.scrollTop = el.scrollHeight
  }, [rows.length, shown])
  useEffect(() => {
    if (shown) list.current?.querySelector('[data-inspected]')?.scrollIntoView?.({ block: 'nearest' })
  }, [shown, inspected?.id])
  return (
    <div data-slot="replay-devtools-pane" data-pane="console">
      <div data-slot="replay-devtools-toolbar">
        <input type="search" aria-label="Filter console" placeholder="Filter" value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
        <select aria-label="Log levels" value={level} onChange={(e) => setLevel(e.currentTarget.value as LevelFilter)}>
          <option value="all">All levels</option>
          <option value="error">Errors</option>
          <option value="warn">Warnings</option>
          <option value="info">Info</option>
        </select>
        <span data-part="summary">
          {state.counts.errors ? <span data-part="failed">{state.counts.errors} {state.counts.errors === 1 ? 'error' : 'errors'}</span> : null}
          {state.counts.warnings ? <span data-part="warn">{state.counts.warnings} {state.counts.warnings === 1 ? 'warning' : 'warnings'}</span> : null}
        </span>
      </div>
      <div
        ref={list}
        data-slot="replay-devtools-list"
        role="log"
        aria-label="Console messages"
        onScroll={(e) => { const el = e.currentTarget; pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 8 }}
      >
        {rows.map((entry) => <ConsoleRow key={entry.id} entry={entry} onSeek={onSeek} inspected={entry.id === inspectedId} />)}
        {!rows.length ? <p data-slot="replay-devtools-empty">{state.console.length ? 'No messages match the filter' : 'Nothing logged yet'}</p> : null}
        {state.counts.laterMessages ? <p data-slot="replay-devtools-later">{state.counts.laterMessages} more later in the recording</p> : null}
      </div>
    </div>
  )
}

function ConsoleRow({ entry, onSeek, inspected }: { entry: ReplayConsoleEntry; onSeek: (ms: number) => void; inspected: boolean }) {
  const Glyph = entry.level === 'error' || entry.level === 'warn' || entry.level === 'info' ? LEVEL_ICON[entry.level] : null
  const body = (
    <>
      <span data-part="icon" aria-hidden="true">{Glyph ? <Glyph size={12} strokeWidth={2.2} /> : null}</span>
      <span data-part="message">{entry.message || ' '}</span>
    </>
  )
  return (
    <div data-slot="replay-devtools-message" data-level={entry.level} data-inspected={inspected || undefined}>
      {entry.trace?.length ? (
        <details>
          <summary>{body}</summary>
          <ol data-part="trace">{entry.trace.map((frame, i) => <li key={i}>{frame}</li>)}</ol>
        </details>
      ) : <div data-part="line">{body}</div>}
      <button type="button" data-part="time" aria-label={`Go to ${time(entry.time)}`} onClick={() => onSeek(entry.time)}>{time(entry.time)}</button>
    </div>
  )
}

/* ── Network ─────────────────────────────────────────────────────────────────────── */

type RequestFilter = 'all' | 'fetch' | 'failed'
type Row = ReplayRequest & { pending: boolean }

const statusText = (r: Row) => (r.pending ? '(pending)' : r.status === undefined ? (r.failed ? '(failed)' : '—') : r.status === 0 ? '(failed)' : String(r.status))

function NetworkPane({ state, onSeek, inspected }: {
  state: ReplayDevtoolsState; onSeek: (ms: number) => void; inspected: ResolvedReplayInspection | null
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<RequestFilter>('all')
  const inspectedId = inspected?.requestId
  const [selectedId, setSelectedId] = useState<string | null>(inspectedId ?? null)
  const table = useRef<HTMLDivElement>(null)
  // A new inspection selects its request (once it has been sent) and brings its row into view.
  useEffect(() => { if (inspectedId) setSelectedId(inspectedId) }, [inspected?.id, inspectedId])
  const sent = inspectedId !== undefined && state.network.some((r) => r.id === inspectedId)
  useEffect(() => {
    if (sent) table.current?.querySelector('[data-inspected]')?.scrollIntoView?.({ block: 'nearest' })
  }, [sent, inspected?.id])
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.network.filter((r) =>
      (filter === 'all' || (filter === 'failed' ? r.failed && !r.pending : r.type === 'fetch' || r.type === 'xhr')) &&
      (!q || r.url.toLowerCase().includes(q) || r.method.toLowerCase() === q))
  }, [state.network, query, filter])
  const selected = state.network.find((r) => r.id === selectedId) ?? null
  // The waterfall spans from the first request to the last answer seen by the playhead.
  const span = useMemo(() => {
    const first = state.network[0]?.time ?? 0
    let last = first + 1
    for (const r of state.network) last = Math.max(last, r.time + (r.duration ?? 0))
    return { first, length: last - first }
  }, [state.network])

  return (
    <div data-slot="replay-devtools-pane" data-pane="network" data-detail={selected ? '' : undefined}>
      <div data-slot="replay-devtools-toolbar">
        <input type="search" aria-label="Filter requests" placeholder="Filter" value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
        <div data-slot="replay-devtools-chips" role="radiogroup" aria-label="Request types">
          {(['all', 'fetch', 'failed'] as const).map((f) => (
            <button key={f} type="button" role="radio" aria-checked={filter === f} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f === 'fetch' ? 'Fetch/XHR' : 'Failed'}
            </button>
          ))}
        </div>
      </div>
      <div data-slot="replay-devtools-network">
        <div ref={table} data-slot="replay-devtools-table-wrap">
          <table data-slot="replay-devtools-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                {selected ? null : <><th scope="col">Method</th><th scope="col">Type</th><th scope="col">Time</th><th scope="col" data-col="waterfall">Waterfall</th></>}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  data-failed={(r.failed && !r.pending) || undefined}
                  data-pending={r.pending || undefined}
                  aria-selected={r.id === selectedId}
                  data-inspected={r.id === inspectedId || undefined}
                  tabIndex={0}
                  onClick={() => setSelectedId(r.id === selectedId ? null : r.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(r.id === selectedId ? null : r.id) } }}
                >
                  <td title={r.url}><span data-part="name">{r.name}</span></td>
                  <td>{statusText(r)}</td>
                  {selected ? null : (
                    <>
                      <td>{r.method}</td>
                      <td>{r.type}</td>
                      <td>{r.pending ? 'Pending' : duration(r.duration)}</td>
                      <td data-col="waterfall">
                        <span
                          data-part="bar"
                          style={{
                            left: `${((r.time - span.first) / span.length) * 100}%`,
                            width: `max(2px, ${(((r.duration ?? 0) / span.length) * 100).toFixed(2)}%)`,
                          }}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length ? <p data-slot="replay-devtools-empty">{state.network.length ? 'No requests match the filter' : 'No requests yet'}</p> : null}
        </div>
        {selected ? <RequestDetail request={selected} onClose={() => setSelectedId(null)} onSeek={onSeek} /> : null}
      </div>
    </div>
  )
}

type DetailTab = 'headers' | 'payload' | 'response'

function RequestDetail({ request, onClose, onSeek }: { request: Row; onClose: () => void; onSeek: (ms: number) => void }) {
  const [tab, setTab] = useState<DetailTab>('headers')
  const pretty = (body?: string) => {
    if (body === undefined || body === '') return undefined
    try { return JSON.stringify(JSON.parse(body), null, 2) } catch { return body }
  }
  const general: [string, string][] = [
    ['Request URL', request.url],
    ['Request Method', request.method],
    ['Status Code', request.pending ? 'Pending' : request.status !== undefined ? `${request.status}${request.statusText ? ` ${request.statusText}` : ''}` : request.failed ? 'Failed' : 'Unknown'],
    ...(request.error ? [['Error', request.error] as [string, string]] : []),
    ['Sent at', time(request.time)],
    ['Duration', duration(request.duration)],
  ]
  return (
    <div data-slot="replay-devtools-detail">
      <div data-slot="replay-devtools-detail-tabs">
        <button type="button" aria-label="Close request details" data-slot="replay-devtools-close" onClick={onClose}><X size={13} /></button>
        <div data-slot="replay-devtools-tablist" role="tablist" aria-label={`${request.name} details`}>
          {(['headers', 'payload', 'response'] as const).map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>
              {t[0]!.toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div data-slot="replay-devtools-detail-body">
        {tab === 'headers' ? (
          <>
            <Section title="General" rows={general} />
            {request.responseHeaders ? <Section title="Response Headers" rows={Object.entries(request.responseHeaders)} /> : null}
            {request.requestHeaders ? <Section title="Request Headers" rows={Object.entries(request.requestHeaders)} /> : null}
            <button type="button" data-slot="replay-devtools-jump" onClick={() => onSeek(request.time)}>Go to {time(request.time)} in the recording</button>
          </>
        ) : (
          <Body text={pretty(tab === 'payload' ? request.requestBody : request.responseBody)} empty={tab === 'payload' ? 'This request has no recorded payload' : request.pending ? 'Waiting for the response' : 'The recording has no response body for this request'} />
        )}
      </div>
    </div>
  )
}

function Section({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <details open data-slot="replay-devtools-section">
      <summary><ChevronRight size={12} data-part="chevron" />{title}</summary>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </details>
  )
}

const HIGHLIGHT_MAX = 64 * 1024

type Span = { type: string; start: number; end: number }

/** gpu-lexer's spans for `text` (loaded on first use; the same model and token colors as docstream's code blocks):
 *  null until they arrive, for empty text, and past 64 KB. */
function useSpans(text: string | undefined): Span[] | null {
  const [spans, setSpans] = useState<{ for: string; spans: Span[] } | null>(null)
  useEffect(() => {
    if (text === undefined || !text || text.length > HIGHLIGHT_MAX) return
    let cancelled = false
    import('gpu-lexer')
      .then(({ parse }) => parse(text))
      .then((result: Span[]) => { if (!cancelled) setSpans({ for: text, spans: result }) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [text])
  return spans && spans.for === text ? spans.spans : null
}

/** A request or response body, syntax-highlighted. Plain until the spans arrive. A <div> of spans, not
 *  <pre><code>, so a host's code-block styles (cards, margins, inline-code pills) can't reach it. */
function Body({ text, empty }: { text?: string; empty: string }) {
  const spans = useSpans(text)
  if (text === undefined) return <p data-slot="replay-devtools-empty">{empty}</p>
  return (
    <div data-slot="replay-devtools-body">
      {spans ? highlight(text, spans) : text}
    </div>
  )
}

function highlight(code: string, spans: Span[], offset = 0) {
  const out: (string | import('react').JSX.Element)[] = []
  let cursor = 0
  spans.forEach((span, i) => {
    const start = Math.max(span.start - offset, 0)
    const end = Math.min(span.end - offset, code.length)
    if (end <= start) return
    if (start > cursor) out.push(code.slice(cursor, start))
    const piece = code.slice(start, end)
    out.push(span.type === 'plain' ? piece : <span key={i} className={`docs-tok docs-tok-${span.type}`}>{piece}</span>)
    cursor = end
  })
  if (cursor < code.length) out.push(code.slice(cursor))
  return out
}

/** Spans for the excerpt's lines by line number, lexed as one text (so a line reads in its neighbours' context) and
 *  cut back into lines. */
function lineSpans(lines: { line: number; text: string }[], spans: Span[] | null) {
  if (!spans) return null
  const out = new Map<number, { offset: number; spans: Span[] }>()
  let offset = 0
  for (const { line, text } of lines) {
    const start = offset
    out.set(line, { offset: start, spans: spans.filter((s) => s.end > start && s.start < start + text.length) })
    offset += text.length + 1
  }
  return out
}

/* ── Elements ────────────────────────────────────────────────────────────────────── */

export interface ElementsProps {
  /** The replayed page's document, read fresh on every render (the page changes as it plays). */
  getDocument: () => Document | null
  /** The selected element (an inspection's, or the one clicked in the tree). */
  selected: Element | null
  onSelect: (el: Element) => void
  /** Hovering a row highlights its element on the page; null when the pointer leaves the tree. */
  onHover: (el: Element | null) => void
}

const MAX_CHILDREN = 300

/** An attribute's value as the page wrote it: rrweb's own markers (`:hover` classes for replayed hover state,
 *  `rrweb-*` classes) are left out. Null when nothing is left of a class attribute. */
function pageValue(name: string, value: string): string | null {
  if (name !== 'class') return value
  const kept = value.split(/\s+/).filter((c) => c && !c.startsWith(':') && !c.startsWith('rrweb-') && !c.startsWith('rr_'))
  return kept.length ? kept.join(' ') : null
}

/** The replayed page's DOM as a collapsible tree, Chrome's Elements panel in miniature. */
function ElementsPane({ getDocument, selected, onSelect, onHover }: ElementsProps) {
  const doc = getDocument()
  const root = doc?.documentElement ?? null
  // Expanded nodes (live DOM nodes, so the tree survives the page mutating under it).
  const [expanded] = useState(() => new Set<Node>())
  const [, bump] = useState(0)
  const toggle = (node: Node) => {
    if (expanded.has(node)) expanded.delete(node)
    else expanded.add(node)
    bump((n) => n + 1)
  }
  // A new selection opens its ancestors and scrolls into view.
  const tree = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!selected) return
    for (let n: Node | null = selected.parentNode; n && n !== doc; n = n.parentNode) expanded.add(n)
    bump((n) => n + 1)
    requestAnimationFrame(() => tree.current?.querySelector('[data-selected]')?.scrollIntoView?.({ block: 'nearest' }))
  }, [selected, doc, expanded])

  if (!root) return <div data-slot="replay-devtools-pane" data-pane="elements"><p data-slot="replay-devtools-empty">The page isn't loaded yet</p></div>
  const path: Element[] = []
  for (let n: Element | null = selected && selected.isConnected ? selected : null; n; n = n.parentElement) path.unshift(n)
  return (
    <div data-slot="replay-devtools-pane" data-pane="elements">
      <div ref={tree} data-slot="replay-devtools-elements" role="tree" aria-label="Elements" onPointerLeave={() => onHover(null)}>
        <ElementRow node={root} depth={0} expanded={expanded} selected={selected} onToggle={toggle} onSelect={onSelect} onHover={onHover} />
      </div>
      {path.length ? (
        <div data-slot="replay-devtools-breadcrumb" aria-label="Selected element's ancestors">
          {path.map((el, i) => (
            <button key={i} type="button" data-current={el === selected || undefined} onClick={() => onSelect(el)} onPointerEnter={() => onHover(el)} onPointerLeave={() => onHover(null)}>
              {crumb(el)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

const crumb = (el: Element) => {
  const tag = el.tagName.toLowerCase()
  const id = el.id ? `#${el.id}` : ''
  const classes = pageValue('class', el.getAttribute('class') ?? '')
  const cls = classes ? '.' + classes.split(' ').slice(0, 2).join('.') : ''
  return tag + id + cls
}

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

function ElementRow({ node, depth, expanded, selected, onToggle, onSelect, onHover }: {
  node: Node; depth: number; expanded: Set<Node>; selected: Element | null
  onToggle: (node: Node) => void; onSelect: (el: Element) => void; onHover: (el: Element | null) => void
}) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.replace(/\s+/g, ' ').trim()
    return text ? <div data-slot="replay-devtools-node" data-kind="text" style={{ paddingInlineStart: depth * 14 + 16 }}>{clip(text, 140)}</div> : null
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return null
  const el = node as Element
  const tag = el.tagName.toLowerCase()
  const kids = [...el.childNodes].filter((c) => c.nodeType === Node.ELEMENT_NODE || (c.nodeType === Node.TEXT_NODE && c.textContent?.trim()))
  const open = expanded.has(el)
  const isSelected = el === selected
  const attrs = [...el.attributes].flatMap((a) => {
    const value = pageValue(a.name, a.value)
    if (value === null) return []
    return [
      <span key={a.name} data-part="attr">
        {' '}<span data-part="attr-name">{a.name}</span>{value !== '' ? <>=&quot;<span data-part="attr-value">{clip(value, 80)}</span>&quot;</> : null}
      </span>,
    ]
  })
  // A lone short text child shows inline, as Chrome does.
  const inlineText = kids.length === 1 && kids[0]!.nodeType === Node.TEXT_NODE && (kids[0]!.textContent?.trim().length ?? 0) <= 80 ? kids[0]!.textContent!.trim() : null
  return (
    <>
      <div
        data-slot="replay-devtools-node"
        data-kind="element"
        data-selected={isSelected || undefined}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={kids.length && inlineText === null ? open : undefined}
        tabIndex={isSelected ? 0 : -1}
        style={{ paddingInlineStart: depth * 14 }}
        onClick={() => onSelect(el)}
        onPointerEnter={() => onHover(el)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(el) }
          else if ((e.key === 'ArrowRight' && !open) || (e.key === 'ArrowLeft' && open)) { e.preventDefault(); onToggle(el) }
        }}
      >
        {kids.length && inlineText === null ? (
          <button type="button" data-part="twisty" aria-label={open ? 'Collapse' : 'Expand'} tabIndex={-1} onClick={(e) => { e.stopPropagation(); onToggle(el) }}>
            <ChevronRight size={11} style={{ rotate: open ? '90deg' : '0deg' }} />
          </button>
        ) : <span data-part="twisty" />}
        <span data-part="tag">&lt;{tag}</span>{attrs}<span data-part="tag">&gt;</span>
        {inlineText !== null ? <><span data-part="text">{clip(inlineText, 80)}</span><span data-part="tag">&lt;/{tag}&gt;</span></> : null}
        {kids.length && inlineText === null && !open ? <><span data-part="ellipsis">…</span><span data-part="tag">&lt;/{tag}&gt;</span></> : null}
        {!kids.length ? <span data-part="tag">&lt;/{tag}&gt;</span> : null}
      </div>
      {open && inlineText === null ? (
        <>
          {kids.slice(0, MAX_CHILDREN).map((child, i) => (
            <ElementRow key={i} node={child} depth={depth + 1} expanded={expanded} selected={selected} onToggle={onToggle} onSelect={onSelect} onHover={onHover} />
          ))}
          {kids.length > MAX_CHILDREN ? <div data-slot="replay-devtools-node" data-kind="text" style={{ paddingInlineStart: (depth + 1) * 14 + 16 }}>… {kids.length - MAX_CHILDREN} more</div> : null}
          <div data-slot="replay-devtools-node" data-kind="close" style={{ paddingInlineStart: depth * 14 + 16 }}><span data-part="tag">&lt;/{tag}&gt;</span></div>
        </>
      ) : null}
    </>
  )
}

/* ── Sources ─────────────────────────────────────────────────────────────────────── */

export interface SourcesProps {
  evidence: ResolvedReplayEvidence
  /** The playhead (ms): which logpoint hit is current. */
  at: number
  /** The file (and line) to show: an inspection's, or the one picked in the list. */
  path: string | null
  line?: number
  onPath: (path: string) => void
}

/** The debugger's view of the source: a file list; the file's lines with their hit counts, the lines it read
 *  highlighted and breakpoints on its logpoints; and a Watch panel with each logpoint's expression and its value at
 *  the playhead (flashing blue as a new hit lands), the line of the latest hit marked in the code. */
function SourcesPane({ evidence, at, path, line, onPath }: SourcesProps) {
  const current = evidence.files.find((f) => f.path === path) ?? evidence.files[0]
  const code = useRef<HTMLDivElement>(null)
  // Each logpoint's latest hit at the playhead, and the latest of those: where the debugger is "paused".
  const watches = evidence.logpoints.map((lp) => {
    const index = lp.hits.filter((h) => h.time <= at).length - 1
    return { lp, index, hit: index >= 0 ? lp.hits[index] : undefined }
  })
  const paused = watches.reduce<(typeof watches)[number] | undefined>((a, w) => (w.hit && (!a?.hit || w.hit.time >= a.hit.time) ? w : a), undefined)
  const pausedLine = paused?.lp.path === current?.path ? paused?.lp.line : undefined
  const target = line ?? pausedLine ?? current?.focus?.[0]
  const sourceSpans = useSpans(current?.lines.map((r) => r.text).join('\n'))
  useEffect(() => {
    if (target === undefined) return
    code.current?.querySelector(`[data-line="${target}"]`)?.scrollIntoView?.({ block: 'center' })
  }, [current?.path, target])
  if (!current) return <div data-slot="replay-devtools-pane" data-pane="sources"><p data-slot="replay-devtools-empty">No sources were read</p></div>
  const points = evidence.logpoints.filter((lp) => lp.path === current.path)
  const focus = new Set(current.focus)
  // A logpoint on a line the excerpt doesn't hold still gets a row of its own.
  const rows = [...current.lines]
  for (const lp of points) if (!rows.some((r) => r.line === lp.line)) rows.push({ line: lp.line, text: '' })
  rows.sort((a, b) => a.line - b.line)
  const lexed = lineSpans(current.lines, sourceSpans)
  const digits = String(rows.at(-1)?.line ?? 0).length
  return (
    <div data-slot="replay-devtools-pane" data-pane="sources">
      <div data-slot="replay-devtools-sources">
        <ul data-slot="replay-devtools-files" aria-label="Files">
          {evidence.files.map((f) => (
            <li key={f.path}>
              <button type="button" aria-current={f.path === current.path || undefined} title={f.path} onClick={() => onPath(f.path)}>
                {sourceName(f.path)}
              </button>
            </li>
          ))}
        </ul>
        <div ref={code} data-slot="replay-devtools-code" aria-label={current.path} style={{ '--replay-devtools-lineno': `${digits}ch` } as CSSProperties}>
          {rows.map((r, i) => {
            const lp = points.find((p) => p.line === r.line)
            const gap = i > 0 && r.line - rows[i - 1]!.line > 1
            return (
              <div key={r.line}>
                {gap ? <div data-slot="replay-devtools-code-gap" aria-hidden="true">⋯</div> : null}
                <div
                  data-slot="replay-devtools-code-line"
                  data-line={r.line}
                  data-focus={focus.has(r.line) || r.line === line || undefined}
                  data-paused={r.line === pausedLine || undefined}
                  data-breakpoint={lp ? '' : undefined}
                >
                  <span data-part="hits">{r.hits ?? ''}</span>
                  <span data-part="lineno">{lp ? <i data-part="breakpoint" title={`Logpoint: ${lp.expression}`} /> : null}{r.line}</span>
                  <span data-part="text">{r.text ? (lexed?.has(r.line) ? highlight(r.text, lexed.get(r.line)!.spans, lexed.get(r.line)!.offset) : r.text) : ' '}</span>
                </div>
              </div>
            )
          })}
        </div>
        {watches.length ? (
          <section data-slot="replay-devtools-watch" aria-label="Watch">
            <h3 data-part="title">Watch</h3>
            <ul>
              {watches.map(({ lp, index, hit }) => (
                <li key={`${lp.path}:${lp.line}:${lp.expression}`} data-current={paused?.lp === lp || undefined}>
                  <button type="button" data-part="where" title={`${lp.path}:${lp.line}`} onClick={() => onPath(lp.path)}>
                    {sourceName(lp.path)}:{lp.line}
                    <span data-part="count">{index >= 0 ? `${index + 1}/${lp.hits.length}` : `0/${lp.hits.length}`}</span>
                  </button>
                  <code data-part="expr">{lp.expression}</code>
                  {hit ? (
                    <code key={index} data-part="value">{clip(hit.value, 400)}</code>
                  ) : (
                    <span data-part="pending">Not hit yet</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  )
}

