'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { StreamEvent } from './types'
import { EventList } from './EventList'

declare global {
  interface Window {
    copyTranscript?: () => void
  }
}

export function Chat({ recordingId, initialPrompt }: { recordingId: string; initialPrompt: string }) {
  const [events, setEvents] = useState<StreamEvent[]>([])
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
  }, [events])

  const sendMessage = useCallback(async (allEvents: StreamEvent[]) => {
    setIsStreaming(true)
    abortRef.current = new AbortController()

    // Send all user messages as NDJSON
    const body = allEvents
      .filter((e) => e.role === 'user')
      .map((e) => JSON.stringify({ role: 'user', content: e.content }))
      .join('\n')

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
        const errorEvent: StreamEvent = { role: 'assistant', content: 'Something went wrong. Please try again.' }
        eventsRef.current.push(errorEvent)
        setEvents([...eventsRef.current])
        setIsStreaming(false)
        return
      }

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
          setEvents([...eventsRef.current])
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        const errorEvent: StreamEvent = { role: 'assistant', content: 'Something went wrong. Please try again.' }
        eventsRef.current.push(errorEvent)
        setEvents([...eventsRef.current])
      }
    } finally {
      setIsStreaming(false)
      abortRef.current = null
    }
  }, [recordingId])

  function handleSend() {
    const text = input.trim()
    if (!text || isStreaming) return

    const userEvent: StreamEvent = { role: 'user', content: text }
    eventsRef.current.push(userEvent)
    setEvents([...eventsRef.current])
    setInput('')
    sendMessage(eventsRef.current)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div ref={scrollRef} className="max-h-96 overflow-y-auto">
        {events.length === 0 && (
          <div className="rounded-lg bg-white/10 px-4 py-3 text-sm text-gray-300">
            Ask Replay AI about this bug...
          </div>
        )}
        <EventList events={events} />
        {isStreaming && events.length > 0 && events[events.length - 1].kind === 'Initialized' && (
          <div className="rounded-lg bg-white/10 px-4 py-3 text-sm text-gray-200">
            <span className="inline-block h-4 w-1 animate-pulse bg-white/60" />
          </div>
        )}
      </div>

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
