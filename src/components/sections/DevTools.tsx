'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { Title } from '../primitives/texts'
import { Chat } from './devtools/Chat'

interface TranscriptMessage {
  role: 'user' | 'assistant'
  content: string
}

interface Example {
  title: string
  subtitle?: string
  videoUrl: string
  recordingId: string
  initialPrompt: string
  transcript: TranscriptMessage[]
}

const examples: Example[] = [
  {
    title: 'Button doesn\'t work',
    subtitle: 'Creating a new task does nothing',
    videoUrl: 'https://placeholder.replay.io/button-debug.mp4',
    recordingId: '7afbb85a-289b-4006-9ca1-93200acceae5',
    initialPrompt: 'Why doesn\'t the submit button work on the signup form?',
    transcript: [
      { role: 'user', content: 'Why doesn\'t the submit button work on the signup form?' },
      {
        role: 'assistant',
        content:
          'I found the issue. The button\'s onClick handler calls `handleSubmit`, but that function has an early return when `isLoading` is true. Looking at the state, `isLoading` is never reset to `false` after the first submission attempt fails.'
      },
      { role: 'user', content: 'How do I fix it?' },
      {
        role: 'assistant',
        content:
          'Add `setIsLoading(false)` in the catch block of your API call in `handleSubmit`. Here\'s the fix:\n\n```js\ncatch (err) {\n  setError(err.message)\n  setIsLoading(false) // Add this line\n}\n```'
      }
    ]
  },
  {
    title: 'Broken data import',
    subtitle: 'CRM clients not added correctly',
    videoUrl: 'https://placeholder.replay.io/form-debug.mp4',
    recordingId: '29c55374-e226-4eb9-81b5-88f3af8c2557',
    initialPrompt: 'The contact form silently fails when I click submit. What\'s going wrong?',
    transcript: [
      { role: 'user', content: 'The contact form silently fails when I click submit. What\'s going wrong?' },
      {
        role: 'assistant',
        content:
          'I traced the form submission and found that the `fetch` call to `/api/contact` is returning a 422 error. The server expects a `phone` field but the form only sends `name`, `email`, and `message`.'
      },
      { role: 'user', content: 'Can you show me where to add the phone field?' },
      {
        role: 'assistant',
        content:
          'In `ContactForm.tsx`, add a phone input to the form and include it in the request body:\n\n```js\nconst body = {\n  name, email, message,\n  phone: phone || "" // optional\n}\n```'
      }
    ]
  },
  {
    title: 'Sluggish page load',
    subtitle: 'Dashboard takes too long to populate',
    videoUrl: 'https://placeholder.replay.io/perf-debug.mp4',
    recordingId: '03afced4-8677-4159-b114-350da6691885',
    initialPrompt: 'The dashboard page takes 8 seconds to load. Can you figure out why?',
    transcript: [
      { role: 'user', content: 'The dashboard page takes 8 seconds to load. Can you figure out why?' },
      {
        role: 'assistant',
        content:
          'I analyzed the network requests during page load. The `/api/dashboard/stats` endpoint takes 6.2 seconds to respond. It\'s making 3 sequential database queries that could be parallelized.'
      },
      { role: 'user', content: 'Which queries should be parallelized?' },
      {
        role: 'assistant',
        content:
          'The `getUserStats`, `getRevenueData`, and `getActivityFeed` calls are independent but run sequentially. Wrap them in `Promise.all`:\n\n```js\nconst [stats, revenue, activity] = await Promise.all([\n  getUserStats(userId),\n  getRevenueData(userId),\n  getActivityFeed(userId)\n])\n```\nThis should bring load time under 2 seconds.'
      }
    ]
  },
  {
    title: 'Flashing content',
    subtitle: 'Empty deals list shown briefly',
    videoUrl: 'https://placeholder.replay.io/state-debug.mp4',
    recordingId: 'be6c6f8c-0b1b-4206-b1b3-49a5c0563472',
    initialPrompt: 'The user profile page shows stale data after editing. Why doesn\'t it update?',
    transcript: [
      { role: 'user', content: 'The user profile page shows stale data after editing. Why doesn\'t it update?' },
      {
        role: 'assistant',
        content:
          'The profile edit saves correctly to the API, but the local React state isn\'t being updated. After the PUT request succeeds, the component doesn\'t refetch or update its cached data.'
      },
      { role: 'user', content: 'What\'s the best way to fix this?' },
      {
        role: 'assistant',
        content:
          'After a successful update, invalidate the query cache so the data refetches:\n\n```js\nawait updateProfile(data)\nqueryClient.invalidateQueries([\'profile\', userId])\n```\nThis will trigger a refetch and the UI will show the updated data immediately.'
      }
    ]
  }
]

function Transcript({ messages }: { messages: TranscriptMessage[] }) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, i) => (
        <div
          key={i}
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
        </div>
      ))}
    </div>
  )
}


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
                <Transcript messages={selected.transcript} />
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
