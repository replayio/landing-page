import { Container } from '~/components/Container'

const destinations = [
  {
    eyebrow: 'For your team',
    title: 'Into the tracker you already use',
    body: 'File reports to GitHub Issues, Linear, Jira, or any webhook. Each one carries the severity, the recording, the root cause and the suggested fix, so whoever picks it up starts from evidence.'
  },
  {
    eyebrow: 'For your agents',
    title: 'Straight back to your coding agent',
    body: 'A REST API and MCP server let your coding agent pull new reports and act on them. Reports are written so an agent can make the fix directly, and Replay QA can test the change before it ships.'
  }
]

export function CloseTheLoopSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-gray-200 bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Close the loop</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Every report ends up where it gets fixed.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {destinations.map((d) => (
              <div key={d.title} className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-accent">
                  {d.eyebrow}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
