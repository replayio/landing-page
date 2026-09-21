import Image from 'next/image'
import { Container } from '~/components/Container'

export function EvidenceSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Runtime evidence</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Turn a failed run into something a reviewer can judge.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
            <p>
              A failed run needs more than a stack trace. A reviewer or agent needs to see what
              happened, understand the expected behavior, and decide what to do next.
            </p>
            <p>
              Replay QA puts the reproduction and supporting runtime evidence in the report,
              attached to the full recording of the session where it broke. The reviewer does not
              have to reconstruct the failure from a diff.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
            <Image
              src="/software-factories-runtime-report.png"
              alt="Replay QA report showing a runtime bundle-loading issue, expected behavior, root cause, and supporting evidence"
              width={1756}
              height={1080}
              className="block h-auto w-full"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
