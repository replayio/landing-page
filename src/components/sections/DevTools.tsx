'use client'

import { useState } from 'react'
import clsx from 'clsx'
import MuxPlayer from '@mux/mux-player-react/lazy'

import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { RightArrowIcon } from '~/components/icons/rightArrow'
import { Chat } from './devtools/Chat'
import { EventList } from './devtools/EventList'
import { StreamEvent } from './devtools/types'
import buttonDoesntWork from './devtools/transcripts/button-doesnt-work.json'
import brokenDataImport from './devtools/transcripts/broken-data-import.json'
import sluggishPageLoad from './devtools/transcripts/sluggish-page-load.json'
import flashingContent from './devtools/transcripts/flashing-content.json'

interface Example {
  title: string
  subtitle?: string
  muxPlaybackId: string
  recordingId: string
  initialPrompt: string
  transcript: StreamEvent[]
}

const examples: Example[] = [
  {
    title: 'Button doesn\'t work',
    subtitle: 'Creating a new task does nothing',
    muxPlaybackId: '4qzqK2nSFoP02ppOu6fi9kcf02aVtvaj3ZK02pqpjBVhiQ',
    recordingId: '26a48f66-ea81-4519-929c-cbcde13eac16',
    initialPrompt: 'The form to add a new task isn\'t doing anything',
    transcript: buttonDoesntWork as StreamEvent[],
  },
  {
    title: 'Broken data import',
    subtitle: 'CRM clients not added correctly',
    muxPlaybackId: 'g8gJI73WhFi9019AXDaerLF00019T00YDvKCJvjWEEy8voM',
    recordingId: '6a271479-83f6-4d49-a337-e57f3438f9bc',
    initialPrompt: 'After I import contacts the client names are wrong',
    transcript: brokenDataImport as StreamEvent[],
  },
  {
    title: 'Sluggish page load',
    subtitle: 'Dashboard takes too long to populate',
    muxPlaybackId: 'JWKSQrDAM7NSh9GZ730000YtvBwEWptCNSneUCrTZ21kQ',
    recordingId: 'e3e94ee6-83e0-42ad-a0e4-b61b386aefa2',
    initialPrompt: 'The dashboard takes way too long to load',
    transcript: sluggishPageLoad as StreamEvent[],
  },
  {
    title: 'Flashing content',
    subtitle: 'Empty deals list shown briefly',
    muxPlaybackId: 'wZfgg01KFpLucarzVWKjmeFb3lcQuyVeeHQ00Y02It02cFw',
    recordingId: '013ccfd4-35d2-4862-ac63-67b2e094bd7d',
    initialPrompt: 'When adding a new deal the deals list flashed as empty before updating',
    transcript: flashingContent as StreamEvent[],
  }
]

export function DevTools({ devTools }: LandingPageFragment) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showChat, setShowChat] = useState(false)

  const selected = examples[selectedIndex]

  function selectExample(index: number) {
    setSelectedIndex(index)
    setShowChat(false)
  }

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + examples.length) % examples.length)
    setShowChat(false)
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % examples.length)
    setShowChat(false)
  }

  return (
    <section
      id="devtools"
      className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-8 md:pb-24 md:pt-20"
    >
      <Container className="relative">
        <div className="w-full mb-12 text-center mx-auto">
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            From bug to fix — without touching DevTools
          </h2>
          <p className="mt-4 text-base text-white sm:text-lg">
            See how Replay MCP lets your agent dive in and explain the problem.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left 1/3: Example list */}
          <div className="lg:col-span-4">
            {/* Desktop: Vertical list of cards */}
            <div className="hidden lg:block">
              <div className="space-y-3">
                {examples.map((example, i) => (
                  <button
                    key={example.title}
                    onClick={() => selectExample(i)}
                    className={clsx(
                      'group flex w-full items-center gap-4 rounded-lg border-2 p-4 text-left transition-all',
                      selectedIndex === i
                        ? 'border-accent bg-gray-800 shadow-sm'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'
                    )}
                  >
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white">{example.title}</h3>
                      {example.subtitle && (
                        <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
                          {example.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Right Arrow */}
                    <div className="w-10 h-10 flex shrink-0 items-center justify-center border border-gray-700 rounded-full bg-gray-800">
                      <RightArrowIcon width={20} height={20} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 2/3: Content area */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* Video area */}
            <div className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
              <MuxPlayer
                loading="viewport"
                streamType="on-demand"
                playbackId={selected.muxPlaybackId}
                primaryColor="#FFFFFF"
                secondaryColor="#000000"
                minResolution="720p"
                muted={true}
                autoPlay={true}
                loop={true}
                style={{
                  aspectRatio: '554/327',
                  display: 'block',
                  '--controls': 'none',
                  '--media-object-fit': 'cover',
                  '--media-object-position': 'center',
                } as React.CSSProperties}
              />
            </div>

            {/* Mobile: Carousel-style card with navigation arrows */}
            <div className="lg:hidden">
              <div className="group flex w-full items-center gap-4 rounded-lg border-2 border-accent bg-gray-800 shadow-sm p-4 text-left transition-all">
                {/* Previous button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 shadow-md border border-gray-700 text-accent active:scale-95 transition-transform shrink-0"
                  aria-label="Previous example"
                >
                  <span className="inline-flex rotate-180">
                    <RightArrowIcon width={18} height={18} />
                  </span>
                </button>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{selected.title}</h3>
                  {selected.subtitle && (
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
                      {selected.subtitle}
                    </p>
                  )}
                </div>

                {/* Next button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 shadow-md border border-gray-700 text-accent active:scale-95 transition-transform shrink-0"
                  aria-label="Next example"
                >
                  <RightArrowIcon width={18} height={18} />
                </button>
              </div>
            </div>

            {/* Chat area */}
            <div className={clsx("rounded-xl bg-gray-800/50 border border-gray-700 p-4",
              { 'max-h-96 overflow-y-auto': !showChat }
            )}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  {showChat ? 'Chat with Replay AI' : 'Chat transcript with Replay MCP'}
                </h3>
                {/* {showChat && (
                  <button
                    onClick={() => setShowChat(false)}
                    className="rounded-lg bg-gray-800 border border-gray-700 px-4 py-1.5 text-sm font-medium text-gray-300 transition-all hover:bg-gray-700 hover:border-gray-600"
                  >
                    View transcript
                  </button>
                )} */}
              </div>

              {showChat ? (
                <Chat recordingId={selected.recordingId} initialPrompt={selected.initialPrompt} />
              ) : (
                <EventList events={selected.transcript} />
              )}
            </div>


            {/* Try it button */}
            {/* {!showChat && (
              <button
                onClick={() => setShowChat(true)}
                className="w-full rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl"
              >
                Try it yourself →
              </button>
            )} */}
          </div>
        </div>
      </Container>
      <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
        <div
          className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)'
          }}
        />
      </div>
    </section>
  )
}
