import { Container } from '~/components/Container'

const useCases = [
  {
    title: 'Software factories & vibecoding platforms',
    description:
      'Embed Loop QA as a quality gate in your AI-powered development platform. Every app generated gets automatically tested before it ships — no human QA required.'
  },
  {
    title: 'Early-stage startups without dedicated QA',
    description:
      "You're moving fast and QA isn't headcount you can afford yet. Loop QA finds the bugs before your users do — at a fraction of the cost of a QA hire."
  },
  {
    title: 'Companies that have vibecoded internal apps',
    description:
      'Internal tools built with AI move fast and break things. Loop QA gives you a continuous layer of coverage so breakages get caught before they become incidents.'
  },
  {
    title: 'Individual vibecoders',
    description:
      "Building solo with AI? Loop QA acts as your QA layer — catching the bugs that slip through when you're moving fast and shipping constantly."
  },
  {
    title: 'Agencies & Dev Shops',
    description:
      'Deliver higher-quality work to clients without adding QA overhead. Loop QA tests every project automatically before handoff.'
  }
]

export function LoopQAUseCases() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <Container className="max-w-4xl">
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-accent">Use cases</p>
        <h2 className="mb-14 text-center font-display text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Who is Loop QA for?
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {useCases.map((uc) => (
            <div key={uc.title} className="rounded-xl border border-gray-200 bg-white p-7">
              <h3 className="mb-2 text-base font-semibold text-gray-900">{uc.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{uc.description}</p>
            </div>
          ))}
          <div className="flex flex-col justify-center rounded-xl border border-dashed border-accent/40 bg-accent/[0.02] p-7">
            <h3 className="mb-2 text-base font-semibold text-gray-900">Don&apos;t see your use case?</h3>
            <p className="text-sm leading-relaxed text-gray-500">
              We want to hear about how you&apos;d like to use Loop QA.{' '}
              <a href="mailto:sales@replay.io" className="text-accent transition hover:opacity-80">
                Let&apos;s talk.
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
