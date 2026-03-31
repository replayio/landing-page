import { Container } from '~/components/Container'

export function PrecogAmbient() {
  return (
    <section className="relative isolate overflow-hidden bg-violet-50/80 py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
              <p className="border-b border-gray-100 px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:text-xs">
                Ambient Precog — vibe analysis
              </p>
              <div className="bg-gradient-to-b from-purple-950/95 to-[#1a1025] p-5 sm:p-6">
                <div className="space-y-3 font-mono text-xs leading-relaxed sm:text-sm">
                  <p className="text-amber-300">⚠ Keystroke cadence: erratic</p>
                  <p className="text-amber-300">
                    ⚠ You are about to ask the AI to &quot;just make it look more premium.&quot;
                  </p>
                  <p className="text-purple-300/40">
                    … structural instability inferred … component tree probability …
                  </p>
                  <p className="text-purple-300/30">… prompt sentiment delta …</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 max-w-xl lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              For vibe-coded apps
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              Ambient Precog
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              <p>
                Built for apps where there is no code to analyze — only vibes. Precog monitors the
                emotional state of the prompt author using keystroke cadence, sentence fragment
                length, and the ratio of exclamation points to question marks in your prompts.
              </p>
              <p>
                From this, it infers structural instability in the component tree before the
                component tree exists.
              </p>
              <p>
                Compatible with Lovable, Base44, Replit, and any other platform where the code is
                technically someone else&apos;s problem.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
