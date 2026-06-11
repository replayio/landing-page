import { Container } from '~/components/Container'

export function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-12 md:pb-24 md:pt-16">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(240,45,94,0.09) 0%, transparent 65%)'
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-slate-600">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            Free plan &middot; No credit card required
          </span>

          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
            Simple pricing.
            <br />
            <span className="text-accent">Based on usage.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed tracking-tight text-gray-700">
            Pay for the analyses you run — however you use Replay. Start free with 20 analyses a
            month. Upgrade when you need more.
          </p>
        </div>
      </Container>
    </section>
  )
}
