import Image from 'next/image'
import { Container } from '~/components/Container'

const steps = [
  {
    number: '01',
    title: 'Test fails — Replay records',
    description:
      'Every Playwright run in CI is recorded automatically. When a test fails, the full runtime is captured — DOM mutations, network calls, JS execution frames. No changes to your test code.'
  },
  {
    number: '02',
    title: 'Replay analyzes the recording',
    description:
      "Replay's agent steps through the execution using time-travel debugging data, identifies the exact sequence of events that caused the failure, and determines the root cause with a confidence score."
  },
  {
    number: '03',
    title: 'Root cause + suggested fix posted to your PR',
    description:
      'Replay comments on your PR with its findings — root cause, evidence trail, and a suggested fix with specific file and line references. Your team reads the comment and applies the fix.'
  }
]

export function CiFullLoop() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Every CI failure, automatically analyzed
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Replay does the investigation. Your team gets the root cause and a suggested fix —
            without spending hours debugging.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4 sm:gap-5">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent text-xs font-semibold text-accent sm:h-11 sm:w-11 sm:text-sm"
                  aria-hidden
                >
                  {step.number}
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-base font-semibold text-gray-900 sm:text-base">
                    {step.title}
                  </h3>
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
      </Container>
    </section>
  )
}
