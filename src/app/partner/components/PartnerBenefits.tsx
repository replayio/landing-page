import { Container } from '~/components/Container'

const benefits = [
  {
    title: 'Free for the full engagement',
    description:
      'Full access to Replay MCP at no cost for the duration of the partnership — a minimum of 30 days, up to three months. No credit card. No catch. Use it on real work.'
  },
  {
    title: 'Direct line to the engineering team',
    description:
      "You'll have access to the Replay engineering team in Discord. Ask questions, share feedback, or just tell us when something doesn't work the way you expected."
  },
  {
    title: 'Your workflow shapes the product',
    description:
      "We'll schedule occasional calls to hear how you're using Replay MCP — what's clicking, what's still painful. Your feedback directly influences what we build next."
  },
  {
    title: "Preferred pricing when you're ready",
    description:
      "At the end of the engagement, we're happy to work out friendly pricing that reflects the relationship we've built. Design partners won't be treated like strangers at renewal."
  }
]

export function PartnerBenefits() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            What design partners get
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            This isn&apos;t a beta waitlist. It&apos;s a working relationship.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-xl border border-gray-200 bg-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-900">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
