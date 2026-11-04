import { Container } from '~/components/Container'
import { AutoplayVideo } from '~/app/components/AutoplayVideo'

const triggers = [
  'A new run on every push to main and every pull request, configurable per project',
  'Daily or weekly schedules, so the team starts the morning with fresh findings',
  'Fixed journeys re-run automatically, confirming the fix and catching what it broke',
  'Root cause and suggested fix posted as a comment on the PR that caused the bug'
]

export function PaceSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Keeps pace with your team
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Every push, every PR, every client.
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Shipping faster only helps if testing ships at the same speed. Connect a client repo
              once and Replay QA runs on its own from then on.
            </p>
            <ul className="mt-6 space-y-3">
              {triggers.map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <AutoplayVideo
              src="/06-TheLoop-Light.mp4"
              mobileSrc="/06-TheLoop-Light_mobile.mp4"
              poster="/posters/06-TheLoop-Light.webp"
              label="Flywheel diagram cycling through Ship, Test, Bugs Found, and Fix"
              className="block aspect-video h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
