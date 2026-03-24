import { Container } from '~/components/Container'

export function VibeCodersExample() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Here&apos;s what it looks like.
          </h2>

          <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/dsawLUKTqmU"
                title="Replay for vibe coders demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-100 p-8 sm:p-10">
            <div className="space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
              <p>
                You built a CRM app in Lovable. In the People table, you click the three dots menu
                and nothing happens. No dropdown, no obvious error, just a broken interaction.
              </p>
              <p>
                Instead of guessing, you open the Replay Chrome extension and hit Record. You
                reproduce the bug, stop the recording, and wait a few seconds for Replay to process
                it.
              </p>
              <p>
                <strong className="font-semibold text-accent">With Replay:</strong> you ask your
                agent, &quot;When I click the three dots in the table item, nothing happens. Can you
                investigate?&quot; Replay analyzes what happened behind the scenes and returns a
                concrete fix you can paste back into Lovable.
              </p>
              <p>
                Lovable applies the change and the dropdown menu starts working.{' '}
                <strong className="font-semibold text-gray-900">Fixed.</strong>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
