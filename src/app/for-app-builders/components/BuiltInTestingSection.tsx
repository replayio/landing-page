import { Container } from '~/components/Container'

const rows: Array<{ label: string; builtIn: string; replay: string }> = [
  {
    label: 'What it captures',
    builtIn:
      'Screenshots or a video of the session, plus whatever surfaces in the console and network logs',
    replay:
      'A deterministic recording of the whole runtime: every function call, state change, network request and render'
  },
  {
    label: 'When something fails',
    builtIn: 'The symptom: what the screen showed and the error that surfaced',
    replay: 'The root cause, traced back through the recording to the code responsible'
  },
  {
    label: 'The fix',
    builtIn: 'The same agent that wrote the code guesses at a fix from the symptom',
    replay: 'A suggested fix with the evidence attached, ready for your build loop'
  },
  {
    label: "Bugs that don't reproduce",
    builtIn:
      'Race conditions, stale state and timing bugs often pass on the next run and slip through',
    replay: 'Captured on the run where they happen, and replayed exactly as they occurred'
  }
]

export function BuiltInTestingSection() {
  return (
    <section className="relative isolate overflow-hidden border-t border-gray-200 bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-bold uppercase tracking-wider text-accent">
            Works alongside built-in testing
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            We already do browser-testing on the apps we build. How is this different?
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-gray-600">
            Built-in browser testing shows your agent what a user would see. Replay QA records what
            the app actually did, so it can explain why something broke and prove that the fix
            works.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Built-in agent browser testing
              </h3>
              <dl className="mt-5 space-y-5 text-sm">
                {rows.map((row) => (
                  <div key={row.label}>
                    <dt className="font-semibold text-gray-900">{row.label}</dt>
                    <dd className="mt-1 leading-relaxed text-gray-600">{row.builtIn}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-xl border border-accent/40 bg-accent/5 p-6 shadow-[0_6px_18px_rgba(240,45,94,0.08)]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                Replay QA
              </h3>
              <dl className="mt-5 space-y-5 text-sm">
                {rows.map((row) => (
                  <div key={row.label}>
                    <dt className="font-semibold text-gray-900">{row.label}</dt>
                    <dd className="mt-1 font-medium leading-relaxed text-gray-900">{row.replay}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center leading-relaxed text-gray-600">
            Keep your built-in testing. It&apos;s a fast check while the agent builds. Replay QA
            runs alongside it as the independent check that explains failures and verifies fixes.
          </p>
        </div>
      </Container>
    </section>
  )
}
