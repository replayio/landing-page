import { Container } from '~/components/Container'

const rows = [
  {
    label: 'Test fails',
    without: 'Read error message, guess at cause',
    with: 'Agent traces exact failure sequence'
  },
  {
    label: 'Root cause',
    without: 'Manual reproduction, console.logs, trial and error',
    with: 'Identified automatically with confidence score'
  },
  {
    label: 'Time to fix',
    without: '30 min to 2+ hours per failure',
    with: 'Fix suggestion posted in minutes'
  },
  {
    label: 'Flaky tests',
    without: 'Marked as flaky, ignored, accumulate',
    with: 'Each failure investigated individually with runtime evidence'
  },
  {
    label: 'Team impact',
    without: 'PRs blocked, CI re-runs burning time and money',
    with: 'Developer reads comment, applies fix, merges'
  },
  {
    label: 'Effort',
    without: 'High — requires deep codebase knowledge',
    with: 'Zero — agent does the investigation'
  }
]

export function ReplayComparison() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            With Replay CI Agent vs. without
          </h2>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse overflow-hidden rounded-xl border border-gray-200 bg-white text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-1/4 px-6 py-4 font-semibold text-gray-900" />
                <th className="w-[37.5%] px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Without Replay
                </th>
                <th className="w-[37.5%] px-6 py-4 text-xs font-bold uppercase tracking-wider text-purple-600">
                  With Replay CI Agent
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-gray-100 last:border-b-0">
                  <td className="px-6 py-5 font-semibold text-gray-900">{row.label}</td>
                  <td className="px-6 py-5 text-gray-500">{row.without}</td>
                  <td className="px-6 py-5 font-medium text-gray-900">{row.with}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}
