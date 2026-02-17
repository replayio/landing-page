'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import { StreamEvent } from './types'

// Display items in the order they appear in the stream
type DisplayItem =
  | { type: 'user'; content: string }
  | { type: 'text'; content: string }
  | { type: 'tool'; id: string; name: string; input: unknown; result?: string; isComplete: boolean }
  | { type: 'cursor' }

declare global {
  interface Window {
    copyTranscript?: () => void
  }
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
        {item.isComplete && (
          <span className="flex-shrink-0 text-green-400">&#10003;</span>
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

export function Chat({ recordingId, initialPrompt }: { recordingId: string; initialPrompt: string }) {
  const [items, setItems] = useState<DisplayItem[]>([])
  const [input, setInput] = useState(initialPrompt)
  const [isStreaming, setIsStreaming] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const eventsRef = useRef<StreamEvent[]>([])

  useEffect(() => {
    window.copyTranscript = () => {
      const text = JSON.stringify(eventsRef.current, null, 2)
      navigator.clipboard.writeText(text).then(
        () => console.log('Transcript copied to clipboard'),
        () => console.log(text)
      )
    }
    return () => { delete window.copyTranscript }
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [items])

  const sendMessages = useCallback(async (userContents: string[]) => {
    setIsStreaming(true)
    abortRef.current = new AbortController()

    const body = userContents
      .map((c) => JSON.stringify({ role: 'user', content: c }))
      .join('\n')

    // Add cursor
    setItems((prev) => [...prev, { type: 'cursor' }])

    try {
      const res = await fetch(
        `https://dispatch.replay.io/nut/recording/${recordingId}/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-ndjson' },
          body,
          signal: abortRef.current.signal
        }
      )

      if (!res.ok || !res.body) {
        setItems((prev) => [
          ...prev.filter((it) => it.type !== 'cursor'),
          { type: 'text', content: 'Something went wrong. Please try again.' }
        ])
        setIsStreaming(false)
        return
      }

      // Remove cursor, we'll add text items as they come
      setItems((prev) => prev.filter((it) => it.type !== 'cursor'))

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.trim()) continue
          let event: StreamEvent
          try {
            event = JSON.parse(line)
          } catch {
            continue
          }

          eventsRef.current.push(event)

          if (event.kind === 'Initialized') continue

          if (event.role === 'assistant' && event.content != null) {
            setItems((prev) => {
              const last = prev[prev.length - 1]
              if (last && last.type === 'text') {
                const updated = [...prev]
                updated[updated.length - 1] = { type: 'text', content: last.content + event.content }
                return updated
              }
              return [...prev, { type: 'text', content: event.content! }]
            })
          }

          if (event.kind === 'ToolCall') {
            setItems((prev) => [
              ...prev,
              { type: 'tool', id: event.id!, name: event.name!, input: event.input, isComplete: false }
            ])
          }

          if (event.kind === 'ToolEnd') {
            setItems((prev) =>
              prev.map((it) =>
                it.type === 'tool' && it.id === event.id
                  ? { ...it, result: event.content, isComplete: true }
                  : it
              )
            )
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setItems((prev) => {
          const filtered = prev.filter((it) => it.type !== 'cursor')
          const last = filtered[filtered.length - 1]
          if (!last || last.type !== 'text' || !last.content) {
            return [...filtered, { type: 'text', content: 'Something went wrong. Please try again.' }]
          }
          return filtered
        })
      }
    } finally {
      setIsStreaming(false)
      abortRef.current = null
    }
  }, [recordingId])

  // Collect all user messages from items for the conversation history
  const userMessages = items.filter((it) => it.type === 'user').map((it) => (it as Extract<DisplayItem, { type: 'user' }>).content)

  function handleSend() {
    const text = input.trim()
    if (!text || isStreaming) return

    eventsRef.current.push({ role: 'user', content: text })
    setItems((prev) => [...prev, { type: 'user', content: text }])
    setInput('')
    sendMessages([...userMessages, text])
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Items */}
      <div ref={scrollRef} className="flex max-h-96 flex-col gap-2 overflow-y-auto">
        {items.length === 0 && (
          <div className="rounded-lg bg-white/10 px-4 py-3 text-sm text-gray-300">
            Ask Replay AI about this bug...
          </div>
        )}
        {items.map((item, i) => {
          if (item.type === 'user') {
            return (
              <div key={i} className="rounded-lg bg-blue-600 px-4 py-3 text-sm leading-relaxed text-white">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">You</span>
                <p className="whitespace-pre-wrap">{item.content}</p>
              </div>
            )
          }
          if (item.type === 'text') {
            return (
              <div key={i} className="rounded-lg bg-white/10 px-4 py-3 text-sm leading-relaxed text-gray-200">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Replay AI</span>
                <p className="whitespace-pre-wrap">{item.content}</p>
              </div>
            )
          }
          if (item.type === 'tool') {
            return <ToolCallItem key={i} item={item} />
          }
          if (item.type === 'cursor') {
            return (
              <div key={i} className="rounded-lg bg-white/10 px-4 py-3 text-sm text-gray-200">
                <span className="inline-block h-4 w-1 animate-pulse bg-white/60" />
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about this bug..."
          disabled={isStreaming}
          className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}
