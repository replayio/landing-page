import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import { BugCard } from '~/app/bugs/components/BugCard'
import { bugs, homepageBugs } from '~/app/bugs/data/bugs'

export function ClientEvidenceSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Example Bugs</p>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Bugs only a time-travel debugger can find
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Every report comes with the session recording, the root cause, and a suggested fix.
              When a client asks what was tested and what was fixed, you have the receipts. These
              are real bugs Replay QA found.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homepageBugs.map((bug) => (
              <BugCard key={bug.slug} bug={bug} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="/bugs" variant="outline" size="sm">
              More bugs ({bugs.length})
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
