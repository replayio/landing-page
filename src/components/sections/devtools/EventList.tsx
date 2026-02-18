'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Markdown from 'react-markdown'
import { StreamEvent } from './types'

type DisplayItem =
  | { type: 'user'; content: string }
  | { type: 'text'; content: string }
  | { type: 'tool'; id: string; name: string; input: unknown; result?: string; isComplete: boolean; failed: boolean }

export function eventsToDisplayItems(events: StreamEvent[]): DisplayItem[] {
  const items: DisplayItem[] = []
  for (const event of events) {
    if (event.kind === 'Initialized') continue

    if (event.role === 'user') {
      items.push({ type: 'user', content: event.content || '' })
    } else if (event.role === 'assistant' && event.content != null) {
      const last = items[items.length - 1]
      if (last && last.type === 'text') {
        last.content += event.content
      } else {
        items.push({ type: 'text', content: event.content })
      }
    } else if (event.kind === 'ToolCall') {
      items.push({ type: 'tool', id: event.id!, name: event.name!, input: event.input, isComplete: false, failed: false })
    } else if (event.kind === 'ToolEnd' || event.kind === 'ToolFailed') {
      const tool = items.find((it) => it.type === 'tool' && it.id === event.id) as Extract<DisplayItem, { type: 'tool' }> | undefined
      if (tool) {
        tool.result = event.content
        tool.isComplete = true
        tool.failed = event.kind === 'ToolFailed'
      }
    }
  }
  return items
}

function ToolCallItem({ item }: { item: Extract<DisplayItem, { type: 'tool' }> }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="my-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className={clsx(
          'flex w-full items-center gap-1.5 rounded-md px-3 py-1.5 text-left text-xs transition-colors',
          item.isComplete
            ? 'bg-white/5 text-gray-400 hover:bg-white/10'
            : 'bg-white/10 text-gray-300'
        )}
      >
        {!item.isComplete && (
          <span className="inline-block h-2 w-2 flex-shrink-0 animate-spin rounded-full border border-white/40 border-t-white/80" />
        )}
        {item.isComplete && !item.failed && (
          <span className="flex-shrink-0 text-green-400">&#10003;</span>
        )}
        {item.isComplete && item.failed && (
          <span className="flex-shrink-0 text-red-400">&#10005;</span>
        )}
        <span className="font-medium">{item.name}</span>
        <span className="ml-auto text-white/30">{expanded ? '▾' : '▸'}</span>
      </button>
      {expanded && (
        <div className="mt-1 rounded-md bg-black/30 p-3 text-xs">
          {item.input != null && (
            <div className="mb-2">
              <span className="font-semibold text-gray-400">Input:</span>
              <pre className="mt-1 overflow-x-auto whitespace-pre-wrap text-gray-500">
                {JSON.stringify(item.input, null, 2)}
              </pre>
            </div>
          )}
          {item.result != null && (
            <div>
              <span className="font-semibold text-gray-400">Result:</span>
              <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap text-gray-500">
                {item.result}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function EventList({ events }: { events: StreamEvent[] }) {
  const items = eventsToDisplayItems(events)
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        if (item.type === 'user') {
          return (
            <div key={i} className="rounded-lg bg-blue-600 px-4 py-3 text-sm leading-relaxed text-white">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">You</span>
              <div className="prose-invert prose-sm max-w-none"><Markdown>{item.content}</Markdown></div>
            </div>
          )
        }
        if (item.type === 'text') {
          return (
            <div key={i} className="rounded-lg bg-white/10 px-4 py-3 text-sm leading-relaxed text-gray-200">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Replay AI</span>
              <div className="prose-invert prose-sm max-w-none"><Markdown>{item.content}</Markdown></div>
            </div>
          )
        }
        if (item.type === 'tool') {
          return <ToolCallItem key={i} item={item} />
        }
        return null
      })}
    </div>
  )
}
