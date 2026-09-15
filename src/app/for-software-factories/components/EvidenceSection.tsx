import { Container } from '~/components/Container'
import { AutoplayVideo } from '~/app/for-teams/components/AutoplayVideo'

export function EvidenceSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">The merge call</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            A human still makes the call. Give them something to look at.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
            <p>
              Keeping a human on every merge isn&apos;t a limitation you&apos;ll grow out of.
              It&apos;s the thing that makes the factory safe to run. We&apos;re not trying to take
              that decision — we&apos;re trying to make it take ninety seconds instead of forty
              minutes.
            </p>
            <p>
              Every bug report includes the reproduction, the root cause, and a suggested fix,
              attached to a full recording of the session where it broke. The reviewer doesn&apos;t
              reconstruct what happened from a diff. They watch it.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 shadow-2xl">
            <AutoplayVideo
              src="/ReplayQA_exampleBug.mp4"
              label="Replay QA structured bug report with recording"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
