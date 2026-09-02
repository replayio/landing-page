import { Container } from '~/components/Container'

export function SecurityProblemSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">The problem</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            AI coding agents write insecure code at scale.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
            <p>
              AI coding tools can build a working web app in hours. What they can&apos;t do is apply
              the security intuition that takes years of pen testing experience to develop. The
              models optimize for functionality — they produce code that works, not code that
              resists attack.
            </p>
            <p>
              The result is a new class of vulnerability pattern. IDOR flaws appear when agents
              generate API endpoints that fetch resources by ID without checking who&apos;s asking.
              Broken access control shows up when role logic is inconsistent across routes written
              in different sessions. Injection surfaces when inputs are assembled into queries
              without the sanitization a security-aware developer would add instinctively.
            </p>
            <p>
              <span className="font-medium text-gray-900">
                These aren&apos;t edge cases — they&apos;re systematic. And because AI-generated
                codebases ship fast, they reach production before anyone runs a security review.
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
