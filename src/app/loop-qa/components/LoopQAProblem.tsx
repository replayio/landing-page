import { Container } from '~/components/Container'

export function LoopQAProblem() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <Container className="max-w-3xl">
        <h2 className="mb-6 text-center font-display text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
          Apps ship faster than ever.
          <br />
          <span className="text-accent">QA hasn&apos;t kept up.</span>
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-gray-600">
          <p>
            AI coding tools have compressed development cycles from weeks to hours. A solo founder
            or a small team can now ship a full web app in a day. But the way we test software
            hasn&apos;t changed — it still requires engineers to write test suites, QA teams to run
            them, and someone to triage what breaks.
          </p>
          <p>
            The result: vibecoded apps ship without meaningful test coverage. Internal tools get
            deployed with no QA layer at all. And the bugs your users hit are the first signal that
            something is wrong.
          </p>
          <p className="font-medium text-gray-900">
            Loop QA closes the gap. Give it a URL and it takes care of the rest.
          </p>
        </div>
      </Container>
    </section>
  )
}
