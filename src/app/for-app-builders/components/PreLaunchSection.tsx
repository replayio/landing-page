import { Container } from '~/components/Container'
import { BuilderLoopDiagram } from './BuilderLoopDiagram'
import { FeatureTable } from './FeatureTable'

export function PreLaunchSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-bold uppercase tracking-wider text-accent">
            Pre-launch
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Build the highest quality app for your customers.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-gray-600">
            An app builder with built-in runtime visibility will build better apps.
          </p>
          <BuilderLoopDiagram />
          <FeatureTable
            rows={[
              [
                'One API call',
                'Send the app when a build finishes. Structured bugs come back to your agent.'
              ],
              [
                'No test suite',
                'Generated apps have nobody to write tests, so Replay QA discovers the user journeys and writes and runs its own tests.'
              ],
              [
                'No traffic needed',
                'It generates its own sessions from a URL, so it works on apps nobody has used yet.'
              ],
              [
                'You choose the gate',
                'Before publish, before share, or asynchronously after first preview.'
              ],
              [
                'Security Scan',
                'An optional extra pass for broken access control and cross-tenant data exposure: the vulnerability classes AI-written apps ship with.'
              ],
              [
                'Built for volume',
                'Designed for high volume, with usage-based pricing for platforms.'
              ]
            ]}
          />
        </div>
      </Container>
    </section>
  )
}
