import { Container } from '~/components/Container'

export function AgentProblem() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Your CI fails.
            <br />
            <span className="text-accent">Your team debugs. Repeat.</span>
          </h2>

          <div className="mt-12 space-y-6 text-center text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              A test fails in CI. The test assertion tells you what failed—not what broke. Someone
              opens DevTools, reproduces it locally if they&apos;re lucky, and eventually figures
              out the root cause. That&apos;s an hour per failure. Multiply by your team.
            </p>
            <p>
              Your coding agents make this worse. They can write code faster than ever, but when
              something breaks at runtime they&apos;re debugging blind — guessing at fixes, looping
              on the same failure, burning tokens without making progress.{' '}
              <strong className="font-semibold text-gray-900">
                The bottleneck isn&apos;t writing code. It&apos;s what happens when it breaks.
              </strong>
            </p>
            <p>
              So teams do the rational thing: they avoid writing more automated tests, because the
              maintenance overhead isn&apos;t worth it. Coverage stagnates. Confidence erodes.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
