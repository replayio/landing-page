import { Container } from '~/components/Container'

const options = [
  {
    badge: 'Option A',
    badgeClass: 'bg-violet-500',
    title: 'Replay MCP — agent-driven',
    steps: [
      'Install Replay MCP in your coding agent',
      <>
        Record:{' '}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
          npx replayio record https://your-app.localhost:3000
        </code>
      </>,
      <>Tell your agent: &ldquo;Debug this Replay recording — [recording URL]&rdquo;</>
    ]
  },
  {
    badge: 'Option B',
    badgeClass: 'bg-rose-500',
    title: 'Chrome Extension — visual',
    steps: [
      'Install the Replay Chrome extension',
      'Click record, reproduce the bug, stop recording',
      'Open the recording in Replay DevTools — or share the URL with your coding agent via MCP'
    ]
  },
  {
    badge: 'Option C',
    badgeClass: 'bg-purple-600',
    title: 'CLI — manual or scripted',
    steps: [
      <>
        Install:{' '}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
          npm install -g replayio
        </code>
      </>,
      <>
        Record:{' '}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
          replayio record &lt;url&gt;
        </code>
      </>,
      'Investigate in DevTools or via MCP'
    ]
  }
]

export function DebuggingGettingStarted() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Start debugging in under 5 minutes
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Three ways to record — pick the one that fits your workflow.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6">
          {options.map((option) => (
            <article
              key={option.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white ${option.badgeClass}`}
                >
                  {option.badge}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
              </div>
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-700 sm:text-base">
                {option.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
