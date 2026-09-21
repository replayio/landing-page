import { Container } from '~/components/Container'
import { AutoplayVideo } from '~/app/for-teams/components/AutoplayVideo'

const integrationBlocks = [
  {
    title: 'Trigger it however you already work.',
    body: 'REST API from your own orchestration, every main-branch update, every PR, or on a daily or weekly schedule. Input is a URL, a recording ID, or a GitHub repo.'
  },
  {
    title: 'Get structured output back.',
    body: 'Not a dashboard to check — a structured bug report with root cause and suggested fix, with structured error codes, consumable headlessly. Your build agents pull it through Replay MCP and get time-travel debugging on their own failures.'
  },
  {
    title: 'One project, every environment.',
    body: 'Dev, staging, production, and localhost via reverse proxy, including ephemeral preview environments. Switch in settings or manage it programmatically.'
  }
]

export function PipelineSection() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gray-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Integration</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Your orchestration calls it. Your agents read the output.
            </h2>

            <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 shadow-lg">
              <AutoplayVideo
                src="/pipeline-integration.mp4"
                label="REST API trigger and structured output flow animation"
              />
            </div>

            <div className="mt-10 flex flex-col gap-8">
              {integrationBlocks.map((block, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <span className="text-xs font-bold text-accent">{i + 1}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{block.title}</span>{' '}
                    <span className="leading-relaxed text-gray-600">{block.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Scheduling</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Wake up to a queue your agents can work through
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
              <p>
                Most factories run a scan overnight, and the morning starts with a prioritized batch
                of real issues instead of an empty backlog and a feature meeting. Each item arrives
                with root cause and a suggested fix, formatted for an agent to pick up directly.
              </p>
              <p>
                Set it in project settings, or ask the project chat in plain language:{' '}
                <span className="italic">&ldquo;Set up a nightly test run.&rdquo;</span>
              </p>
              <p className="font-medium text-gray-900">
                If you already built a version of this, the difference is that you stop maintaining
                it.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 shadow-lg">
              <AutoplayVideo
                src="/overnight-queue.mp4"
                label="Overnight scan producing a prioritized morning queue animation"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
