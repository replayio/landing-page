import { Container } from '~/components/Container'

export function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(240,45,94,0.09) 0%, transparent 65%)',
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-slate-500 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Simple, volume-based pricing 
          </span>

          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl xl:text-8xl">
            Debug smarter.
            <br />
            <span className="text-accent">Pay for what you use.</span>
          </h1>

          <p className="mt-6 text-lg tracking-tight text-gray-700 max-w-2xl mx-auto">
            Replay records your web app, delivers an AI root cause analysis, and proposes a fix
            &mdash; right where you work.
          </p>

          {/* Access point badges */}
          <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-sm text-gray-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="stroke-accent"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <rect x="1" y="2" width="12" height="9" rx="1.5" />
                <path d="M4 11v1.5M10 11v1.5M3 13h8" />
              </svg>
              IDE via MCP
            </span>
            <span className="text-sm text-gray-400">+</span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-sm text-gray-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="stroke-accent"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <circle cx="7" cy="7" r="5.5" />
                <path d="M7 1.5C5 3 4 5 4 7s1 4 3 5.5M7 1.5C9 3 10 5 10 7s-1 4-3 5.5M1.5 7h11" />
              </svg>
              Chrome extension
              <span className="text-[9px] font-semibold uppercase tracking-wider text-accent leading-none">
                Coming soon
              </span>
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Both access points draw from the same session pool &mdash; use whichever fits your
            workflow.
          </p>
        </div>
      </Container>
    </section>
  )
}
