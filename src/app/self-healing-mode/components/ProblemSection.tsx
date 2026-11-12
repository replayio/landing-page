import { Container } from '~/components/Container'

const points = [
  {
    title: 'Most bugs never get reported',
    body: 'A user taps a button that does nothing, tries twice more, and leaves. No ticket, no email. The only trace is in the session.'
  },
  {
    title: 'Session replay shows what, not why',
    body: 'You can watch the user get stuck. You still have to reproduce it, find the code path that failed, and work out the fix.'
  },
  {
    title: 'Nobody has time to watch replays',
    body: 'Frustration signals pile up in a dashboard. Triaging them by hand is a job most teams never get to.'
  }
]

export function ProblemSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Your users are already reporting bugs. They&apos;re doing it with rage clicks.
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              Tests catch what you thought to check. Real users find everything else, on real data,
              in browsers and paths you never tried.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {points.map((p) => (
              <div key={p.title} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
