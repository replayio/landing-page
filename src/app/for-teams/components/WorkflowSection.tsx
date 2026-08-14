import { Container } from '~/components/Container'

const workflow = [
  {
    title: 'Connect a repo, then forget it',
    body: 'Add your GitHub repo and authenticate. The Replay QA GitHub app installs itself and runs a new pass whenever your codebase changes: every push to main, every pull request, or both. No config file, no CI changes.'
  },
  {
    title: 'Every pull request gets checked',
    body: 'PR runs test against your preview deployment and post the root cause and suggested fix as a comment on the pull request, next to the diff that caused it.'
  },
  {
    title: 'Bugs land in your tracker',
    body: 'Not another dashboard nobody opens. GitHub Issues, Linear, Jira, or any endpoint that accepts a webhook. You control whether everything gets filed or only what Replay QA has confirmed.'
  },
  {
    title: 'Everyone on the team can read it',
    body: 'Invite as many collaborators to a project as you want. Designers, PMs, and contractors can read a report and watch the recording without a seat license or a debugging background.'
  }
]

export function WorkflowSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              How it fits your workflow
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              It runs where your team already works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Replay QA hooks into GitHub, comments on pull requests, and files into the tracker you
              already use. Nobody has to adopt a new tool to get the benefit.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {workflow.map((w) => (
              <div key={w.title} className="rounded-xl border border-gray-200 bg-white p-7">
                <h3 className="mb-3 text-base font-semibold tracking-tight text-gray-900">
                  {w.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
