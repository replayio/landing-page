'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// Audio wave icon component
const AudioWaveIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="#F97391"
    >
      <path
        d="M3 6V10M5.5 5V11M8 3V13M10.5 5V11M13 6V10"
        stroke="#F97391"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
  
  // Plus icon component
  const PlusIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="#F97391"
    >
      <path
        d="M8 3V13M3 8H13"
        stroke="#F97391"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
const InputArea = () => {
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const handleSend = useCallback(() => {
        if (inputValue.trim()) {
            console.log('Sending:', inputValue)
        }
    }, [inputValue])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault()
            handleSend()
          }
          if (e.key === '/') {
            e.preventDefault()
            inputRef.current?.focus()
          }
        }
    
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleSend])

    return (
        <div className="mt-10 w-full max-w-[600px]">
            <div className="relative flex flex-col h-[160px] rounded-lg border-2 border-accent/60 bg-white p-4 shadow-sm transition-all focus-within:border-accent focus-within:shadow-md">
            {/* Prompt text at top */}
            <div className="mb-3 text-sm">
                <span className="text-gray-900">What would you like </span>
                <span className="text-accent font-medium">Replay.Builder to build?</span>
                <span className="text-gray-400"> Click here</span>
            </div>

            {/* Bottom row with icons, input area, and send button */}
            <div className="flex justify-between">
                {/* Icon buttons on left */}
                <div className="flex items-center gap-2">
                  <button
                    disabled={true}
                    type="button"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 hover:bg-gray-50 transition-colors"
                    aria-label="Voice input"
                  >
                    <AudioWaveIcon />
                  </button>
                  <button
                    disabled={true}
                    type="button"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 hover:bg-gray-50 transition-colors"
                    aria-label="Add attachment"
                  >
                    <PlusIcon />
                  </button>
                </div>

                {/* Input area in center */}
                {/* <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                rows={1}
                className="flex-1  resize-none border-0 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 min-h-[24px] max-h-[200px] overflow-y-auto"
                placeholder=""
                disabled={true}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault()
                    handleSend()
                    }
                }}
                style={{
                    height: 'auto',
                }}
                onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height = `${Math.min(target.scrollHeight, 200)}px`
                }}
                /> */}

                {/* Send button on right */}
                <button

                  onClick={handleSend}
                  className="shrink-0 rounded-lg bg-accent px-5 py-2 font-semibold text-white transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                  <span className="ml-2 text-xs font-semibold">⌘Enter</span>
                </button>
            </div>
            </div>
        </div>
    )
}

export default InputArea