import { Container } from '~/components/Container'

const steps = [
  {
    number: 1,
    title: 'Install the Replay Chrome Extension',
    description:
      'It takes about 30 seconds. Just click install from the Chrome Web Store.',
  },
  {
    number: 2,
    title: 'Go to your app, hit Record, and reproduce the bug',
    description:
      "Just do the thing that's broken while Replay is watching. Click the button, fill out the form, whatever it is.",
  },
  {
    number: 3,
    title: 'Read what Replay found',
    description:
      'It tells you what went wrong and what to fix, in plain English. Copy the fix and paste it into your AI tool.',
  },
]

export function VibeCodersSteps() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Three steps. No setup.
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            You don&apos;t need to install anything complicated or learn new tools.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-5 rounded-xl border border-gray-200 bg-gray-100 p-6"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-purple-200 bg-purple-100 text-sm font-semibold text-purple-600">
                {step.number}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
