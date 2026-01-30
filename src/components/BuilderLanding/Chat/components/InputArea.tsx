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
        <div className="mt-10 w-full max-w-[700px]">
            <div className="relative flex flex-col justify-between h-[180px] rounded-2xl border-2 border-accent/50 bg-white p-5 shadow-sm transition-all focus-within:border-accent focus-within:shadow-md">
                {/* Prompt text at top */}
                <div className="text-sm sm:text-lg">
                    <span className="text-gray-900">What would you like Replay Builder to build?</span>
                </div>

                {/* Bottom row with icons and send button */}
                <div className="flex items-end justify-between">
                    {/* Icon buttons on left */}
                    <div className="flex items-center gap-3">
                        {/* <button
                            disabled={true}
                            type="button"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 hover:bg-gray-50 transition-colors disabled:opacity-70"
                            aria-label="Voice input"
                        >
                            <AudioWaveIcon />
                        </button> */}
                        <button
                            disabled={true}
                            type="button"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 hover:bg-gray-50 transition-colors disabled:opacity-70"
                            aria-label="Add attachment"
                        >
                            <PlusIcon />
                        </button>
                    </div>

                    {/* Send button on right */}
                    <button
                        onClick={handleSend}
                        className="shrink-0 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <span className="text-base">Send</span>
                        <span className="ml-2 text-sm font-medium opacity-90">⌘Enter</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InputArea