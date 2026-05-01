import { Container } from '~/components/Container'

export function PartnerWhoIsFor() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Who this is for
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              Replay MCP is purpose-built for debugging React-based web apps. If your team has
              meaningful surface area in React — a product, a platform, an internal tool — and
              you&apos;re using AI coding agents like Cursor, Claude Code, Codex, Copilot, or
              Windsurf to build and fix it, this program is designed for you.
            </p>
            <p>
              If your stack is primarily mobile, backend, or outside the React ecosystem,{' '}
              <strong className="font-semibold text-gray-900">
                Replay MCP probably isn&apos;t the right fit yet.
              </strong>{' '}
              We&apos;d rather be honest about that upfront than waste your time.
            </p>
            <p>
              What matters beyond the stack: you care about making the debugging loop faster, and
              you&apos;re willing to tell us honestly when something doesn&apos;t work the way it
              should.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
