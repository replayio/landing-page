'use client'

import { Container } from '~/components/Container'

interface ExtensionProblemSectionProps {
  /** Optional YouTube video ID. If not provided, shows "Video coming soon" placeholder. */
  videoId?: string
}

export function ExtensionProblemSection({ videoId }: ExtensionProblemSectionProps) {
  return (
    <section
      id="the-problem"
      className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-8 md:pb-24 md:pt-20"
    >
      <Container className="relative">
        {/* Headline - centered */}
        <h2 className="text-center text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Your AI says &ldquo;fixed it.&rdquo;
          <br />
          But it&apos;s still broken.
        </h2>

        {/* Two-column layout: text left, video right */}
        <div className="mt-16 flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 lg:max-w-xl">
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              You describe the bug. Your AI says it&apos;s fixed. You refresh the page and&hellip;
              same problem. So you explain it again, maybe paste a screenshot. The AI tries
              something else. Still broken.
            </p>
            <p className="mt-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              You&apos;re stuck in a loop — going back and forth with an AI that can&apos;t
              actually see what&apos;s happening in your app.{' '}
              <strong className="font-semibold text-white">
                It&apos;s guessing, and you have no way to help it.
              </strong>
            </p>
            <p className="mt-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              You didn&apos;t sign up to be a debugger. You&apos;re building something — and you
              just need the bug gone.
            </p>
          </div>

          {/* Right: Video area */}
          <div className="relative flex-1">
            <div className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
              {videoId ? (
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center gap-4 bg-gray-800/80">
                  {/* Play button outline */}
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-500"
                    aria-hidden
                  >
                    <svg
                      className="ml-1 h-8 w-8 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-500">Video coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
