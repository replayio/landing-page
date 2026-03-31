import { Container } from '~/components/Container'

export function PrecogTerminal() {
  return (
    <section className="relative isolate overflow-hidden bg-violet-50/80 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            See it in action.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Run{' '}
            <code className="rounded-md border border-gray-200 bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              replay-mcp precog --watch
            </code>{' '}
            on any file and Precog begins analyzing your potential execution state in real time.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-800 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            <span className="flex-1 text-center font-mono text-xs text-gray-400">terminal</span>
          </div>
          <div className="bg-[#0d0d0f] p-4 font-mono text-sm leading-relaxed sm:p-6 sm:text-[13px]">
            <p className="text-gray-400">
              $ npx replay-mcp precog --watch ./src/components/PaymentFlow.tsx
            </p>
            <div className="mt-6 border-l-2 border-amber-400 pl-4">
              <p className="font-semibold text-amber-400">
                ⚠ PRECOG WARNING [line 47 – not yet written]
              </p>
              <p className="mt-2 text-gray-200">
                You are about to introduce a useEffect dependency array omission. Predicted at 94.3%
                confidence.
              </p>
              <p className="mt-3 text-gray-500">Suggested fix (preemptive):</p>
              <pre className="mt-2 overflow-x-auto text-blue-300">
                {`useEffect(() => { ... }, [userId, cartTotal])`}
              </pre>
              <p className="mt-1 text-gray-500">
                {'// userId added. You were going to forget it again.'}
              </p>
            </div>
            <div className="mt-6 border-l-2 border-rose-500 pl-4">
              <p className="font-semibold text-rose-400">
                PRECOG CRITICAL [line 83 – 12 minutes from now]
              </p>
              <p className="mt-2 text-gray-200">
                Imminent race condition in optimistic cart update.
              </p>
              <p className="mt-2 text-gray-300">
                Replay recording pre-generated. Link: replay.io/precog/abc123
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
