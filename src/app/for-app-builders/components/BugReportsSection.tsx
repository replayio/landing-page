import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import { BugGallery } from './BugGallery'

/** `showGalleryLink` adds a link to the full gallery at /bugs, for pages outside /for-app-builders. */
export function BugReportsSection({ showGalleryLink = false }: { showGalleryLink?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Examples of real agent-ready bug reports with evidence.
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              Every Replay QA bug report is prepared with coding agents in mind: a detailed root
              cause analysis, a suggested fix, a deterministic runtime recording, and all the
              context needed to do the job.
            </p>
          </div>
          <BugGallery />
          {showGalleryLink && (
            <div className="mt-10 text-center">
              <Button href="/bugs" variant="outline" size="sm">
                View our bug gallery
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
