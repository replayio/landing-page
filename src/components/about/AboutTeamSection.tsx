import Image from 'next/image'
import Link from 'next/link'
import { Container } from '~/components/Container'
import { aboutTeam } from '~/components/about/about-data'

function PersonPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center text-gray-300">
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  )
}

export function AboutTeamSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-gray-600 sm:text-lg">
            Founded by ex-Mozilla engineers. Distributed globally. Building the future of debugging.
          </p>
          <ul
            role="list"
            className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 text-left sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {aboutTeam.map((person) => (
              <li
                key={person.name}
                className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm"
              >
                <div className="relative aspect-square bg-gray-200">
                  {person.linkedin ? (
                    <Link
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 block"
                    >
                      {person.photo ? (
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <PersonPlaceholder />
                      )}
                    </Link>
                  ) : person.photo ? (
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <PersonPlaceholder />
                  )}
                </div>
                <div className="p-6">
                  {person.linkedin ? (
                    <Link
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-900 hover:text-accent"
                    >
                      {person.name}
                    </Link>
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                  )}
                  <p className="mt-1 text-sm font-medium text-purple-600">{person.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{person.bio}</p>
                  {/* {person.timeTravelDestination && 
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-accent">
                        Ideal time-travel destination
                      </p>
                      <p className="mt-2 text-sm italic leading-relaxed text-gray-600">
                        &ldquo;{person.timeTravelDestination}&rdquo;
                      </p>
                    </div>
                  } */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
