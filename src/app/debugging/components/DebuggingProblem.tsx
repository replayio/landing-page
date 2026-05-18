import { Container } from '~/components/Container'

export function DebuggingProblem() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Your agent is fast.
            <br />
            <span className="text-accent">But it&apos;s debugging blind.</span>
          </h2>

          <div className="mt-12 space-y-6 text-center text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              Your coding agent can read your code, run your tests, and suggest fixes. But when the
              bug is subtle — a race condition, a state update that fires twice, a redirect that
              silently fails — it&apos;s stuck guessing from error messages and source code alone.
            </p>
            <p>
              It doesn&apos;t know what actually happened at runtime. It can&apos;t see which
              component re-rendered, what the network response actually contained, or which event
              handler fired first. So it suggests a fix, you try it, it doesn&apos;t work, and the
              cycle repeats.
            </p>
            <p>
              <strong className="font-semibold text-gray-900">
                Replay gives your agent — and you — the runtime data that turns guessing into
                knowing.
              </strong>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
