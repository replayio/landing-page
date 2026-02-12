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
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-600"
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
            <div className="relative flex items-end gap-3 rounded-2xl bg-gray-100 p-4">
                {/* Plus button on left */}
                <button
                    type="button"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Add attachment"
                >
                    <PlusIcon />
                </button>

                {/* Textarea in the middle */}
                <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What would you like Replay Builder to build?"
                    className="flex-1 min-h-[44px] max-h-[200px] resize-none bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-base"
                    rows={1}
                />

                {/* Send button on right */}
                <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="shrink-0 rounded-xl bg-gray-800 px-4 py-2.5 font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2"
                >
                    <span className="text-sm">Send</span>
                    <span className="text-xs opacity-75">⌘Enter</span>
                </button>
            </div>
        </div>
    )
}

export default InputArea