'use client'

import { useState, useRef } from 'react'
import { Container } from '~/components/Container'

const vibeTools = ['Lovable', 'Base44', 'Bolt', 'Replit', 'Other']

export function VibeCodersCTA() {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [tool, setTool] = useState('')
  const [otherTool, setOtherTool] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const handleNotify = async () => {
    if (!email) return
    setSubmitting(true)
    try {
      await fetch('/api/intercom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tool: tool === 'Other' ? otherTool : tool })
      })
    } catch (err) {
      console.error('Failed to submit to Intercom:', err)
    }
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Give it a try. It&apos;s free.
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Install the Chrome extension and see what Replay finds.
          </p>
          <div className="mt-8 flex justify-center">
            {!showForm ? (
              <button
                onClick={() => {
                  setShowForm(true)
                  setTimeout(
                    () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
                    100
                  )
                }}
                className="inline-block rounded-full bg-gradient-to-r from-rose-500 to-purple-500 px-8 py-3.5 text-base font-medium text-white transition-all hover:from-rose-600 hover:to-purple-600"
              >
                Coming soon: Get notified
              </button>
            ) : submitted ? (
              <p className="text-base font-medium text-gray-700">
                Thanks! We&apos;ll let you know when it&apos;s ready.
              </p>
            ) : (
              <div ref={formRef} className="w-full max-w-md space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <select
                  value={tool}
                  onChange={(e) => setTool(e.target.value)}
                  className="block w-full appearance-none rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="" disabled>
                    Which tool do you use?
                  </option>
                  {vibeTools.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {tool === 'Other' && (
                  <input
                    type="text"
                    placeholder="Which tool?"
                    value={otherTool}
                    onChange={(e) => setOtherTool(e.target.value)}
                    className="block w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                )}
                <button
                  onClick={handleNotify}
                  disabled={submitting || !email}
                  className="w-full rounded-full bg-gradient-to-r from-rose-500 to-purple-500 px-8 py-3.5 text-base font-medium text-white transition-all hover:from-rose-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Notify me'}
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
