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
            ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600 hover:bg-gray-700 shadow-sm'
            : 'border-gray-700 bg-gray-800 text-gray-300 shadow-sm'
        )}
      >
        {/* Icon container */}
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
          {!item.isComplete && (
            <span className="inline-block h-2.5 w-2.5 animate-spin rounded-full border-2 border-gray-600 border-t-gray-400" />
          )}
          {item.isComplete && !item.failed && (
            <span className="flex-shrink-0 text-green-400 text-sm">✓</span>
          )}
          {item.isComplete && item.failed && (
            <span className="flex-shrink-0 text-red-400 text-sm">✗</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-medium text-white block">{item.name}</span>
          {item.isComplete && item.result && (
            <span className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              {typeof item.result === 'string' ? item.result.substring(0, 60) : 'Completed'}
            </span>
          )}
        </div>
        <span className="ml-auto text-gray-500 text-xs flex-shrink-0">{expanded ? '▾' : '▸'}</span>
      </button>
      {expanded && (
        <div className="mt-2 rounded-lg border border-gray-700 bg-gray-800 p-3 text-xs">
          {item.input != null && (
            <div className="mb-3">
              <span className="font-semibold text-gray-300">Input:</span>
              <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap rounded bg-gray-900 border border-gray-700 p-2 text-gray-300 font-mono text-xs">
                {JSON.stringify(item.input, null, 2)}
              </pre>
            </div>
          )}
          {item.result != null && (
            <div>
              <span className="font-semibold text-gray-300">Result:</span>
              <pre className="mt-1.5 max-h-48 overflow-auto whitespace-pre-wrap rounded bg-gray-900 border border-gray-700 p-2 text-gray-300 font-mono text-xs">
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
            <div key={i} className="w-fit max-w-[70%] ml-auto">
              <div className="rounded-lg bg-gray-700 p-5 text-sm leading-relaxed text-white shadow-sm">
                <div className="prose prose-sm max-w-none prose-p:my-0 prose-p:leading-relaxed prose-p:text-white prose-headings:text-white">
                  <Markdown>{item.content}</Markdown>
                </div>
              </div>
            </div>
          )
        }
        if (item.type === 'text') {
          return (
            <div key={i} className="w-[80%] mr-auto">
              <div className="px-4 py-3 text-sm leading-relaxed text-gray-100">
                <div className="prose prose-sm max-w-none prose-p:my-0 prose-p:leading-relaxed prose-p:text-gray-100 prose-headings:text-white prose-strong:text-white prose-code:bg-gray-800 prose-code:text-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:border prose-code:border-gray-700 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-700 prose-li:text-gray-100 prose-ul:text-gray-100 prose-ol:text-gray-100">
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
