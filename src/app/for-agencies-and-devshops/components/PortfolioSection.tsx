import { Container } from '~/components/Container'

const features = [
  {
    title: 'New client, no test suite',
    body: 'Point it at a repo or a URL. Replay QA discovers the user journeys itself, so a new engagement is covered from the first build.'
  },
  {
    title: 'Staging, preview, or production',
    body: "Each project targets whichever environment you choose, including localhost while a feature is still on a developer's machine."
  },
  {
    title: 'Logged-in areas and roles',
    body: 'Give it test credentials for each role, or let it create its own email-and-password accounts, to reach the parts of the app clients care about most.'
  },
  {
    title: 'A security pass included',
    body: 'Security Scan covers injection, broken access control, weak authentication, IDOR, and cross-tenant data exposure. That’s a check most fixed bids never budget for.'
  },
  {
    title: 'Into the tracker you already use',
    body: 'File reports to GitHub Issues, Linear, Jira, or any webhook. Start with confirmed bugs only so nobody’s board fills with noise.'
  },
  {
    title: 'Driven by your agents',
    body: 'A REST API and MCP server let your coding agents trigger runs and read results. Reports are written so an agent can act on them directly.'
  }
]

export function PortfolioSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-gray-200 bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Built for a portfolio of apps
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Set it up once per client. Then it runs itself.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Each client app is its own project, with its own repo, environment, credentials, and
              schedule. Adding the next client takes minutes, not a new hire.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
