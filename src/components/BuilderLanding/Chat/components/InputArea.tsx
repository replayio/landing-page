'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// Audio wave icon component
// const AudioWaveIcon = () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 16 16"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M3 6V10M5.5 5V11M8 3V13M10.5 5V11M13 6V10"
//         stroke="#F97391"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   )

// Plus icon component
const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-900"
  >
    <path
      d="M8 3V13M3 8H13"
      stroke="currentColor"
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

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [inputValue])

  return (
    <div className="mt-10 w-full max-w-[700px]">
      {/* Main input container with white background */}
      <div className="rounded-md border border-gray-200 bg-white">
        {/* Textarea area */}
        <div className="relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What would you like Replay Builder to build?"
            className="w-full resize-none rounded-md border-none bg-transparent p-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 active:border-none"
            style={{
              minHeight: '76px',
              maxHeight: '200px',
              overflowY: 'auto'
            }}
            rows={1}
          />
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            {/* Plus/Upload button */}
            <button
              type="button"
              className="flex aspect-square h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50"
              aria-label="Add attachment"
            >
              <PlusIcon />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 font-medium text-white transition-all duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>Send</span>
            <span className="text-sm text-white/70">⌘Enter</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputArea
