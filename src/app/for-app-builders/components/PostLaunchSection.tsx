import { Container } from '~/components/Container'
import { PostLaunchSequence } from './PostLaunchSequence'
import { FeatureTable } from './FeatureTable'

export function PostLaunchSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Post-launch</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Continuous improvement for your customers&apos; apps.
          </h2>
          <p className="mt-6 leading-relaxed text-gray-600">
            Building the app is one thing. Maintaining it over time is another. With our
            Self-healing API, you can offer your customers an always-on way to turn user signals
            into ready-to-ship fixes and improvements.
          </p>
          <PostLaunchSequence />
          <FeatureTable
            rows={[
              [
                'Detect',
                "Fullstory's Subtext JS snippet runs in your customer's app, watches real user sessions, and flags when something goes wrong."
              ],
              [
                'Diagnose',
                'Replay QA reproduces the problem, finds the root cause from the recording, and files a bug with a severity, the recording evidence and a bug ID.'
              ],
              [
                'Fix',
                'Your Build Loop picks up the bug and opens a pull request that explains why, what changed and the tradeoffs, linked back to the bug.'
              ],
              [
                'Verify',
                'Replay QA signs in to the PR preview, explores the changed surface for anything new it broke, then replays the journey that found the bug to prove the fix holds.'
              ],
              [
                'Ship',
                "Once the fix is verified, your harness merges it and ships the improvement to your customer's app automatically. Fixes that don't pass go back to Your Build Loop for another attempt."
              ]
            ]}
          />
        </div>
      </Container>
    </section>
  )
}
