import { Container } from '~/components/Container'
import { AutoplayVideo } from '~/app/for-teams/components/AutoplayVideo'

const proofPoints = [
  {
    title: 'Tested in the running app',
    body: 'Replay QA tested the behavior of a live, authenticated application.'
  },
  {
    title: 'Reproduction captured',
    body: 'The finding preserves the evidence needed to understand what happened.'
  },
  {
    title: 'Fix ready for the team',
    body: 'The report gives the team a focused path from finding to remediation.'
  }
]

export function SecurityProofSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">A real finding</p>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Pen testing you can see.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              A Security Scan found that one authenticated user could access another customer&apos;s
              project. Replay QA captured the evidence and turned it into a report the team could
              reproduce and fix.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.8fr)]">
            <div className="relative min-h-[18rem] bg-gray-900 lg:min-h-full">
              <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-gray-900/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.2)]" />
                Real Replay QA finding
              </div>
              <AutoplayVideo
                src="/replayQA_IDOR-bugreport.mp4"
                label="Replay QA Security Scan report for an IDOR finding"
                poster="/replayQA_IDOR-bugreport-poster.jpg"
                className="block h-full min-h-[18rem] w-full object-cover object-center lg:min-h-full"
              />
            </div>

            <div className="flex flex-col p-7 sm:p-9">
              <span className="inline-flex w-fit rounded-md bg-red-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-700">
                IDOR · High severity
              </span>
              <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
                A user accessed another customer&apos;s project.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                The report records the behavior, the impact, and the next step for the team.
              </p>

              <div className="mt-7 grid gap-3">
                {proofPoints.map((point, index) => (
                  <div
                    key={point.title}
                    className="flex gap-3 rounded-xl border border-gray-200 p-3"
                  >
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{point.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-600">{point.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
