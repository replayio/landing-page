import { Container } from '~/components/Container'

export function AgentSolution() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">
            That&apos;s why we built Replay
          </p>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Give your agent
            <br />
            the power of time-travel
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            Replay captures a deterministic recording — every DOM change, network request, JS
            execution frame, and state update. Using Replay MCP, your coding agent can analyze the
            recording, trace the exact causal chain from failure to root cause, and deliver the root
            cause and a suggested fix. No guessing. No manual debugging. No human required.
          </p>
          <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            You might be thinking{' '}
            <em className="underline">
              &ldquo;how is this different than the monitoring tools I&apos;m already using?&rdquo;
            </em>{' '}
            We made this video for you.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/Ew5Yc2Hni-8"
                title="How Replay is different from monitoring tools"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
