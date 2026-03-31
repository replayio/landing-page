import { Container } from '~/components/Container'

const rows = [
  { dot: 'bg-red-500', label: 'jsmith / CheckoutFlow.tsx', pct: '91%' },
  { dot: 'bg-orange-500', label: 'mlee / AuthProvider.tsx', pct: '87%' },
  { dot: 'bg-emerald-500', label: 'rpark / useCartState.ts', pct: '74%' },
  { dot: 'bg-emerald-500', label: 'jsmith / PaymentForm.tsx', pct: '68%' }
]

export function PrecogDashboard() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">For teams</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              The Precrime Dashboard
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              A real-time feed of bugs your engineers are statistically likely to introduce in the
              next 72 hours, ranked by predicted severity.
            </p>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              Engineering managers have described early access as &quot;clarifying.&quot;
            </p>
            <blockquote className="mt-8 border-l-4 border-accent pl-5 text-base italic text-gray-700 sm:text-lg">
              I finally have data to back up what I&apos;ve always suspected about our senior
              front-end engineer.
              <footer className="mt-3 text-sm font-normal not-italic text-gray-500">
                — Series B fintech CTO, beta customer
              </footer>
            </blockquote>
            <p className="mt-6 text-xs text-gray-400">
              We are not responsible for any personnel decisions made using Precog data.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-center text-xs font-medium uppercase tracking-wide text-slate-500">
              Precrime dashboard — next 72h
            </p>
            <ul className="mt-6 space-y-3">
              {rows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center gap-3 rounded-lg bg-violet-50/80 px-4 py-3"
                >
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${row.dot}`} aria-hidden />
                  <span className="min-w-0 flex-1 truncate font-mono text-sm text-gray-800">
                    {row.label}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-gray-700">{row.pct}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
