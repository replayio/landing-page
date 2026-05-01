import type { ReactNode } from 'react'
import { Container } from '~/components/Container'

const principles: {
  name: string
  description: ReactNode
  href: string
}[] = [
  {
    name: 'The code behind our code',
    description:
      'Integrity, honesty, and decency. Our principles are not aspirations but constraints. They lie behind every action we take, or decision we make. They ensure that we remain true to our course and true to ourselves.',
    href: 'https://replayio.notion.site/Replay-s-Principles-Values-7b20c16430524356a28bbe842b1d5f06#19baa7e2-94a0-4f53-8211-12c280f715f5'
  },
  {
    name: 'Embedded values',
    description: (
      <div className="space-y-4">
        <p>Our values anchor our aspirations and drive us forward.</p>
        <p>
          We are making software development faster, more accessible, more inclusive, and more
          exciting. We are dedicated to building a world where everyone is technically literate, a
          world where we are better equipped to overcome the greatest of challenges.
        </p>
      </div>
    ),
    href: 'https://replayio.notion.site/Replay-s-Principles-Values-7b20c16430524356a28bbe842b1d5f06#4af5092d36214ce4a780e9c144014e58'
  }
]

export function AboutPrinciples() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <dl className="grid max-w-2xl grid-cols-1 gap-x-16 gap-y-12 sm:gap-y-16 lg:max-w-none lg:grid-cols-2">
            {principles.map((item) => {
              return (
                <div key={item.name} className="flex flex-col">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">{item.name}</dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <div className="flex-auto">
                      {typeof item.description === 'string' ? (
                        <p>{item.description}</p>
                      ) : (
                        item.description
                      )}
                    </div>
                    <p className="mt-6">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold leading-6 text-gray-600 transition hover:text-accent"
                      >
                        Learn more <span aria-hidden>→</span>
                      </a>
                    </p>
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </Container>
    </section>
  )
}
