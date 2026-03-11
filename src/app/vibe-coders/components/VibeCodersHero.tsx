'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Container } from '~/components/Container'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'
import { Base44Icon } from '~/components/icons/base44'
import { Button } from '~/components/Button'

const partners = [
  { name: 'Replit', logo: '/images/hero-logos/replit.svg' },
  { name: 'Lovable', logo: '/images/hero-logos/lovable.svg' },
  { name: 'Base44'},
  { name: 'Bolt', logo: '/images/hero-logos/bolt.svg' },
]

const vibeTools = ['Lovable', 'Base44', 'Bolt', 'Replit', 'Other']

export function VibeCodersHero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
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
        body: JSON.stringify({ email, tool: tool === 'Other' ? otherTool : tool }),
      })
    } catch (err) {
      console.error('Failed to submit to Intercom:', err)
    }
    setSubmitted(true)
    setSubmitting(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % partners.length)
        setVisible(true)
      }, 400)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const partner = partners[index]

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[120px] pb-16 lg:pt-[180px] lg:pb-24">
          <div className="flex flex-col justify-center items-center w-full">
            <div ref={heroContentRef} className="max-w-5xl text-center">
              {/* Coming Soon badge */}
              <div className="mb-8 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Coming Soon
                </span>
              </div>

              {/* Cycling partner + Replay logos */}
              <div className="mb-10 flex items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2.5 min-w-[160px] justify-end">
                  <div
                    className={`flex items-center gap-2.5 transition-all duration-[400ms] ${
                      visible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-3'
                    }`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white sm:h-10 sm:w-10">
                      {partner.name === 'Base44' ? (
                        <Base44Icon width={22} height={22} viewBox="0 0 30.1 30.1" />
                      ) : (
                        <Image
                          src={partner.logo || ''}
                          alt={partner.name}
                          width={22}
                          height={22}
                          className="h-[22px] w-[22px]"
                        />
                      )}
                    </div>
                    <span className="text-xl font-semibold text-gray-900 whitespace-nowrap sm:text-2xl">
                      {partner.name}
                    </span>
                  </div>
                </div>

                <span className="text-2xl font-light text-gray-400 sm:text-3xl">+</span>

                <div className="flex items-center gap-2.5 min-w-[160px] justify-start">
                  <Image
                    src="/images/logo.svg"
                    alt="Replay"
                    width={28}
                    height={32}
                    className="h-8 w-7 sm:h-9 sm:w-8"
                  />
                  <span className="text-xl font-semibold text-gray-900 sm:text-2xl">Replay</span>
                </div>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl xl:text-8xl">
                Vibe fearlessly with the Replay Chrome extension.
              </h1>
              <p className="mt-6 text-lg tracking-tight text-gray-700 max-w-2xl mx-auto">
                The Replay Chrome extension is like having a senior engineer watching over your
                shoulder, catching bugs, finding root causes, and telling the AI exactly how to fix
                them.
              </p>
              <div className="mt-8 flex justify-center">
                {!showForm ? (
                  <Button
                    onClick={() => {
                      setShowForm(true)
                      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
                    }}
                    className="inline-block rounded-full bg-accent hover:bg-accent-light px-8 py-3.5 text-base font-medium text-white transition-all"
                  >
                    Coming soon: Get notified
                  </Button>
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
                      className="block w-full rounded-xl border border-gray-200 bg-gray-100 px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                    />
                    <select
                      value={tool}
                      onChange={(e) => setTool(e.target.value)}
                      className="block w-full appearance-none rounded-xl border border-gray-200 bg-gray-100 px-5 py-3.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                    >
                      <option value="" disabled>
                        Which tool do you use?
                      </option>
                      {vibeTools.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {tool === 'Other' && <input
                      type="text"
                      placeholder="Which tool?"
                      value={otherTool}
                      onChange={(e) => setOtherTool(e.target.value)}
                      className="block w-full rounded-xl border border-gray-200 bg-gray-100 px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                    />}
                    <button
                      onClick={handleNotify}
                      disabled={submitting || !email}
                      className="w-full rounded-full bg-gradient-to-r from-rose-500 to-purple-500 px-8 py-3.5 text-base font-medium text-white hover:from-rose-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Notify me'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
