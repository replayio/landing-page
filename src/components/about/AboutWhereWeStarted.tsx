import { Container } from '~/components/Container'

export function AboutWhereWeStarted() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
            Where we started
          </h2>
          <div className="mt-6 space-y-6 text-base leading-relaxed text-gray-300 sm:text-lg">
            <p>
              Debugging has always been the same: guess what went wrong, try a fix, see if it
              works. Repeat until you get lucky or give up and rewrite.
            </p>
            <p>
              We thought that was broken. Our founders spent a decade at Mozilla working on the
              Firefox browser engine — one of the most complex software systems ever built. They
              saw firsthand how much time gets lost to bugs that nobody can reproduce, errors that
              nobody can explain, and fixes that nobody is confident about.
            </p>
            <p>
              So they built Replay: a way to record exactly what your software did and play it
              back, step by step. Not a video. Not a log file.{' '}
              <strong className="font-semibold text-white">
                A deterministic capture of every DOM change, network request, and state update
              </strong>{' '}
              — the full picture, down to the last detail.
            </p>
            <p>
              That recording changes everything. When you can see what actually happened, debugging
              goes from guessing to knowing.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
