import { Container } from '~/components/Container'

export function AgentProblem() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Apps ship faster than ever.
            <br />
            <span className="text-accent">QA hasn&apos;t kept up.</span>
          </h2>

          <div className="mt-12 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              AI coding tools have compressed development cycles from weeks to hours. A solo founder
              or a small team can now ship a full web app in a day. But the way we test software
              hasn&apos;t changed — it still requires engineers to write test suites, QA teams to
              run them, and someone to triage what breaks.
            </p>
            <p>
              The result: AI-built apps ship without meaningful test coverage. Internal tools get
              deployed with no QA layer at all. And the bugs your users hit are the first signal
              that something is wrong.
            </p>
            <p className="font-medium text-gray-900">
              Replay QA gives AI-built apps the QA loop they&apos;re missing.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
