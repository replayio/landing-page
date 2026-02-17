'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import clsx from 'clsx'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  toolCalls?: { id: string; name: string; isComplete: boolean }[]
}

interface StreamEvent {
  kind?: string
  role?: string
  content?: string
  id?: string
  name?: string
  input?: unknown
  timestamp?: string
}

declare global {
  interface Window {
    copyTranscript?: () => void
  }
}

export function Chat({ recordingId, initialPrompt }: { recordingId: string; initialPrompt: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
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
  }, [messages])

  const sendMessages = useCallback(async (allMessages: ChatMessage[]) => {
    setIsStreaming(true)
    abortRef.current = new AbortController()

    // Build NDJSON body from conversation history (only user/assistant content)
    const body = allMessages
      .map((m) => JSON.stringify({ role: m.role, content: m.content }))
      .join('\n')

    // Add a placeholder assistant message for streaming into
    setMessages((prev) => [...prev, { role: 'assistant', content: '', toolCalls: [] }])

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
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'Something went wrong. Please try again.'
          }
          return updated
        })
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

          if (event.kind === 'Initialized') continue

          if (event.role === 'assistant' && event.content != null) {
            // Streaming text chunk — append to last assistant message
            setMessages((prev) => {
              const updated = [...prev]
              const last = updated[updated.length - 1]
              updated[updated.length - 1] = { ...last, content: last.content + event.content }
              return updated
            })
          }

          if (event.kind === 'ToolCall') {
            setMessages((prev) => {
              const updated = [...prev]
              const last = updated[updated.length - 1]
              const toolCalls = [...(last.toolCalls || []), { id: event.id!, name: event.name!, isComplete: false }]
              updated[updated.length - 1] = { ...last, toolCalls }
              return updated
            })
          }

          if (event.kind === 'ToolEnd') {
            setMessages((prev) => {
              const updated = [...prev]
              const last = updated[updated.length - 1]
              const toolCalls = (last.toolCalls || []).map((tc) =>
                tc.id === event.id ? { ...tc, isComplete: true } : tc
              )
              updated[updated.length - 1] = { ...last, toolCalls }
              return updated
            })
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setMessages((prev) => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (!last.content) {
            updated[updated.length - 1] = {
              role: 'assistant',
              content: 'Something went wrong. Please try again.'
            }
          }
          return updated
        })
      }
    } finally {
      setIsStreaming(false)
      abortRef.current = null
    }
  }, [recordingId])

  function handleSend() {
    const text = input.trim()
    if (!text || isStreaming) return

    const userMessage: ChatMessage = { role: 'user', content: text }
    eventsRef.current.push({ role: 'user', content: text })
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    sendMessages(updatedMessages)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Messages */}
      <div ref={scrollRef} className="flex max-h-96 flex-col gap-3 overflow-y-auto">
        {messages.length === 0 && (
          <div className="rounded-lg bg-white/10 px-4 py-3 text-sm text-gray-300">
            Ask Replay AI about this bug...
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i}>
            <div
              className={clsx(
                'rounded-lg px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'self-end bg-blue-600 text-white'
                  : 'self-start bg-white/10 text-gray-200'
              )}
            >
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">
                {msg.role === 'user' ? 'You' : 'Replay AI'}
              </span>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.role === 'assistant' && !msg.content && isStreaming && i === messages.length - 1 && (
                <span className="inline-block h-4 w-1 animate-pulse bg-white/60" />
              )}
            </div>
            {/* Collapsed tool calls */}
            {msg.toolCalls && msg.toolCalls.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1.5 pl-2">
                {msg.toolCalls.map((tc) => (
                  <span
                    key={tc.id}
                    className={clsx(
                      'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs',
                      tc.isComplete
                        ? 'bg-white/5 text-gray-400'
                        : 'bg-white/10 text-gray-300'
                    )}
                  >
                    {!tc.isComplete && (
                      <span className="inline-block h-2 w-2 animate-spin rounded-full border border-white/40 border-t-white/80" />
                    )}
                    {tc.isComplete && (
                      <span className="text-green-400">&#10003;</span>
                    )}
                    {tc.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
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
