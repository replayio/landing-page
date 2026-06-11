import { Container } from '~/components/Container'

const evidence = ['Replay recording', 'DOM mutations', 'Network trace', 'React state']

export function BugReportExample() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">What you get</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Root cause. Suggested fix. Full recording.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
              Every bug Replay QA finds comes with everything your agent needs to fix it — not just
              &ldquo;something broke.&rdquo;
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-xl border border-gray-200 bg-white text-sm">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Bug found
                </span>
              </div>
              <span className="text-xs text-gray-500">confidence: high</span>
            </div>
            <div className="border-b border-gray-200 px-6 py-5">
              <p className="text-base font-semibold text-gray-900">
                Checkout button does nothing on mobile Safari
              </p>
            </div>
            <div className="border-b border-gray-200 px-6 py-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                Root cause
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs">
                  handleSubmit
                </code>{' '}
                is never called because the button is rendered outside the{' '}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs">
                  {'<form>'}
                </code>{' '}
                element after the responsive layout change on screens under 768px.
              </p>
            </div>
            <div className="border-b border-gray-200 px-6 py-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                Suggested fix
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                Move the button inside the form, or add{' '}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs">
                  {'form="checkout-form"'}
                </code>{' '}
                to the button element.
              </p>
            </div>
            <div className="px-6 py-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                Evidence
              </p>
              <div className="flex flex-wrap gap-2">
                {evidence.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs italic text-gray-500">
            Example output — actual reports are generated from your app&apos;s real runtime data.
          </p>
        </div>
      </Container>
    </section>
  )
}
