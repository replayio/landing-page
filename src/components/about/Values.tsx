import { CommandLineIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'The code behind our code',
    description:
      'Integrity, honesty, and decency. Our principles are not aspirations but constraints. They lie behind every action we take, or decision we make. They ensure that we remain true to our course and true to ourselves.',
    href: 'https://replayio.notion.site/Replay-s-Principles-Values-7b20c16430524356a28bbe842b1d5f06#19baa7e2-94a0-4f53-8211-12c280f715f5',
    icon: CommandLineIcon
  },
  {
    name: 'Embedded values',
    description: (
      <>
        <p>Our values anchor our aspirations and drive us forward.</p>
        <p>
          We are making software development faster, more accessible, more inclusive, and more
          exciting. We are dedicated to building a world where everyone is technically literate, a
          world where we are better equipped to overcome the greatest of challenges.
        </p>
      </>
    ),
    href: 'https://replayio.notion.site/Replay-s-Principles-Values-7b20c16430524356a28bbe842b1d5f06#4af5092d36214ce4a780e9c144014e58',
    icon: HandThumbUpIcon
  }
]

export function Values() {
  return (
    <div className="flex items-center pb-24 sm:pb-48 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:max-w-none lg:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="text-lg font-semibold leading-7 text-gray-700">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <div className="flex-auto">{feature.description}</div>
                <p className="mt-6">
                  <a href={feature.href} className="text-sm font-semibold leading-6 text-gray-600">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
