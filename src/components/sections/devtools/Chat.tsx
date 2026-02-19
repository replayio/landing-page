'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Plus } from 'lucide-react'
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

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '40px'
      const scrollHeight = textarea.scrollHeight
      textarea.style.height = `${Math.min(scrollHeight, 200)}px`
    }
  }, [input])

  return (
    <div className="flex flex-col gap-4">
      <div ref={scrollRef} className="max-h-96 overflow-y-auto pr-1">
        {events.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
            Ask Replay AI about this bug...
          </div>
        )}
        <EventList events={events} />
        {isStreaming && events.length > 0 && events[events.length - 1].kind === 'Initialized' && (
          <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
            <span className="inline-block h-4 w-1 animate-pulse bg-gray-400" />
          </div>
        )}
      </div>

      {/* Input container matching the image design */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4">
        {/* Textarea on top */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What would you like to do now?"
          disabled={isStreaming}
          rows={1}
          className="w-full rounded-lg border-none bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-600 focus:outline-none resize-none overflow-y-auto disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            minHeight: '40px',
            maxHeight: '150px',
          }}
        />

        {/* Bottom controls */}
        <div className="flex justify-end items-center mt-3">
          {/* Send button on right */}
          <button
            onClick={handleSend}
            disabled={isStreaming || !input.trim()}
            className="px-5 py-2.5 rounded-full font-medium bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Send</span>
            <span className="text-white/70 text-sm">⌘Enter</span>
          </button>
        </div>
      </div>
    </div>
  )
}
