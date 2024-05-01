import { RocketLaunchIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Button } from '~/components/Button'

import { Link } from '~/components/primitives/link'
import arrow from '~/public/images/about/arrow.svg'
import journeyImg from '~/public/images/about/journey.svg'

const positions = [
  {
    title: 'Founding GTM Lead',
    skills: 'GTM',
    href: 'https://replayio.notion.site/Founding-GTM-Member-44008e5bcbe141eb9bf68c08f71980a4'
  },
  {
    title: 'Team Lead',
    skills: 'Engineering',
    href: 'https://replayio.notion.site/Product-team-lead-5f7a525b7a814015b7defa7531761032'
  }
]

export const Work = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 pt-16 sm:pt-24 lg:flex-row lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <RocketLaunchIcon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <h2 id="careers" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Join our journey
        </h2>
        <p className="text-gray-600">
          Excited by what we are doing? Think you’d be a good match?
          <br /> Great! We’d love to hear from you.
          <br />
          <br />
          Check out our open roles.
        </p>
        <a className="text-center lg:text-left" href="mailto:hiring@replay.io">
          <Button variant="solid" color="default">
            hiring@replay.io
          </Button>
        </a>
      </div>
      <div className="min-w-96">
        <ul className="divide-y divide-gray-200">
          <li className="py-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-900">Job title</span>
              <span className="font-medium text-gray-900">Qualifications</span>
            </div>
          </li>
          {positions.map(({ title, skills, href }, i) => (
            <li key={i} className="py-4">
              <div className="flex items-center justify-between">
                <Link
                  unstyled
                  href={href}
                  className="flex flex-grow justify-between text-gray-600 hover:text-gray-900"
                >
                  <span>{title}</span>
                  <span>{skills}</span>
                </Link>
                <Image src={arrow} alt="go to link arrow" className="ml-2 inline h-5 w-5" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
