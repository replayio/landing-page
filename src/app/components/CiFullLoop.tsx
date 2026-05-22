import Image from 'next/image'
import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

const steps = [
  {
    number: '01',
    title: 'Record',
    description:
      'Every E2E test run is automatically recorded — every function call, every DOM mutation, every network request, every state change captured deterministically. No code changes to your tests — just swap in Replay in your Playwright or Cypress config.'
  },
  {
    number: '02',
    title: 'Analyze',
    description:
      "When a test fails, Replay's agent opens the recording and investigates using time-travel debugging data: every function call, every DOM mutation, every network request, every state change. It traces the exact sequence of events that caused the failure."
  },
  {
    number: '03',
    title: 'Report',
    description:
      'The agent posts a detailed analysis as a GitHub comment on your PR: root cause with confidence level, step-by-step failure sequence, suggested fix with specific file and code changes, and an evidence trail citing actual runtime data.'
  }
]

export function CiFullLoop() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Test fails &rarr; Agent investigates &rarr; Fix posted
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Replay does the investigation. Your team gets the root cause and a suggested fix —
            without spending hours debugging.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="border-gray flex gap-4 rounded-xl border bg-slate-50 p-4 sm:gap-5"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent text-xs font-semibold text-accent sm:h-11 sm:w-11 sm:text-sm"
                  aria-hidden
                >
                  {step.number}
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <Image
              src="/images/ci-agent-demo-large.gif"
              alt="Replay CI Agent posting root cause analysis and suggested fix as a GitHub PR comment"
              width={1200}
              height={800}
              className="h-auto w-full"
              unoptimized
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            href="https://docs.replay.io/basics/getting-started/record-your-playwright-tests"
            variant="solid"
            color="default"
            size="base"
            className="px-8"
          >
            Try Replay for free
          </Button>
        </div>
      </Container>
    </section>
  )
}
