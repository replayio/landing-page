'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { Title } from '../primitives/texts'
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
  videoUrl: string
  recordingId: string
  initialPrompt: string
  transcript: StreamEvent[]
}

const examples: Example[] = [
  {
    title: 'Button doesn\'t work',
    subtitle: 'Creating a new task does nothing',
    videoUrl: 'https://placeholder.replay.io/button-debug.mp4',
    recordingId: '26a48f66-ea81-4519-929c-cbcde13eac16',
    initialPrompt: 'The form to add a new task isn\'t doing anything',
    transcript: buttonDoesntWork as StreamEvent[]
  },
  {
    title: 'Broken data import',
    subtitle: 'CRM clients not added correctly',
    videoUrl: 'https://placeholder.replay.io/form-debug.mp4',
    recordingId: '6a271479-83f6-4d49-a337-e57f3438f9bc',
    initialPrompt: 'After I import contacts the client names are wrong',
    transcript: brokenDataImport as StreamEvent[]
  },
  {
    title: 'Sluggish page load',
    subtitle: 'Dashboard takes too long to populate',
    videoUrl: 'https://placeholder.replay.io/perf-debug.mp4',
    recordingId: 'e3e94ee6-83e0-42ad-a0e4-b61b386aefa2',
    initialPrompt: 'The dashboard takes way too long to load',
    transcript: sluggishPageLoad as StreamEvent[]
  },
  {
    title: 'Flashing content',
    subtitle: 'Empty deals list shown briefly',
    videoUrl: 'https://placeholder.replay.io/state-debug.mp4',
    recordingId: '013ccfd4-35d2-4862-ac63-67b2e094bd7d',
    initialPrompt: 'When adding a new deal the deals list flashed as empty before updating',
    transcript: flashingContent as StreamEvent[]
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

  return (
    <section
      id="devtools"
      className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-8 text-left shadow-2xl md:pb-44 md:pt-20"
    >
      <Container className="relative">
        <div className="flex max-w-2xl flex-col justify-center text-center md:mx-auto xl:max-w-none">
          <Title className="text-pretty" as="h2" white>
            From bug to fix — without touching DevTools
          </Title>
          <p className="mx-auto mt-4 max-w-3xl tracking-tight text-[#C1C3C7] md:text-lg">
            See how Replay MCP lets your agent dive in and explain the problem.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left 1/3: Example list */}
          <div className="lg:col-span-4">
            <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-x-visible">
              {examples.map((example, i) => (
                <button
                  key={example.title}
                  onClick={() => selectExample(i)}
                  className={clsx(
                    'whitespace-nowrap rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors lg:whitespace-normal lg:rounded-l-xl lg:rounded-r-none lg:px-6 lg:py-4 lg:text-base',
                    selectedIndex === i
                      ? 'bg-white/10 text-white ring-1 ring-inset ring-white/10'
                      : 'text-blue-100 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <span>{example.title}</span>
                  {selectedIndex === i && example.subtitle && (
                    <span className="mt-1 block text-sm font-normal text-white/60">
                      {example.subtitle}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right 2/3: Content area */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* Video area */}
            <div className="overflow-hidden rounded-xl bg-black/30 shadow-xl shadow-blue-900/20">
              <div className="flex aspect-video items-center justify-center text-gray-500">
                <span className="text-sm">Video placeholder: {selected.videoUrl}</span>
              </div>
            </div>

            {/* Try it button */}
            {!showChat && (
              <button
                onClick={() => setShowChat(true)}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-400 hover:to-indigo-400 hover:shadow-blue-500/40"
              >
                Try it yourself →
              </button>
            )}

            {/* Chat area */}
            <div className="rounded-xl bg-white/5 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  {showChat ? 'Chat with Replay AI' : 'Conversation'}
                </h3>
                {showChat && (
                  <button
                    onClick={() => setShowChat(false)}
                    className="rounded-lg bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                  >
                    View transcript
                  </button>
                )}
              </div>

              {showChat ? (
                <Chat recordingId={selected.recordingId} initialPrompt={selected.initialPrompt} />
              ) : (
                <EventList events={selected.transcript} />
              )}
            </div>
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
