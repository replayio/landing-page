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
          'flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-all',
          item.isComplete
            ? 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-sm'
            : 'border-gray-200 bg-white text-gray-700 shadow-sm'
        )}
      >
        {/* Icon container */}
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
          {!item.isComplete && (
            <span className="inline-block h-2.5 w-2.5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          )}
          {item.isComplete && !item.failed && (
            <span className="flex-shrink-0 text-green-600 text-sm">✓</span>
          )}
          {item.isComplete && item.failed && (
            <span className="flex-shrink-0 text-red-600 text-sm">✗</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-medium text-gray-900 block">{item.name}</span>
          {item.isComplete && item.result && (
            <span className="text-xs text-gray-500 line-clamp-1 mt-0.5">
              {typeof item.result === 'string' ? item.result.substring(0, 60) : 'Completed'}
            </span>
          )}
        </div>
        <span className="ml-auto text-gray-400 text-xs flex-shrink-0">{expanded ? '▾' : '▸'}</span>
      </button>
      {expanded && (
        <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs">
          {item.input != null && (
            <div className="mb-3">
              <span className="font-semibold text-gray-700">Input:</span>
              <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap rounded bg-white border border-gray-200 p-2 text-gray-700 font-mono text-xs">
                {JSON.stringify(item.input, null, 2)}
              </pre>
            </div>
          )}
          {item.result != null && (
            <div>
              <span className="font-semibold text-gray-700">Result:</span>
              <pre className="mt-1.5 max-h-48 overflow-auto whitespace-pre-wrap rounded bg-white border border-gray-200 p-2 text-gray-700 font-mono text-xs">
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
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        if (item.type === 'user') {
          return (
            <div key={i} className="w-[95%] ml-auto">
              <div className="rounded-lg bg-gray-100 px-4 py-3 text-sm leading-relaxed text-gray-900 shadow-sm">
                <div className="prose prose-sm max-w-none prose-p:my-0 prose-p:leading-relaxed">
                  <Markdown>{item.content}</Markdown>
                </div>
              </div>
            </div>
          )
        }
        if (item.type === 'text') {
          return (
            <div key={i} className="w-[95%] mr-auto">
              <div className="px-4 py-3 text-sm leading-relaxed text-gray-900">
                <div className="prose prose-sm max-w-none prose-p:my-0 prose-p:leading-relaxed prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-gray-900 prose-pre:text-gray-100">
                  <Markdown>{item.content}</Markdown>
                </div>
              </div>
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
