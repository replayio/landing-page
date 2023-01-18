import Image from 'next/future/image'
import { FC } from 'react'

import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { ButtonLink } from '~/components/primitives/button'
import { Link } from '~/components/primitives/link'
import arrow from '~/public/images/about/arrow.svg'
import codeImg from '~/public/images/about/code.svg'
import journeyImg from '~/public/images/about/journey.svg'
import valuesImg from '~/public/images/about/values.svg'

import s from './work.module.scss'

const positions = [
  {
    title: 'Runtime Engineer',
    skills: 'Engineering',
    href: 'https://replayio.notion.site/replayio/Runtime-Engineer-47b715e382264dd5bc32d3ab1de14753'
  },

  {
    title: 'UI Developer',
    skills: 'Engineering + Design',
    href: 'https://replayio.notion.site/UI-Developer-79b76cce588a47719b8c7ef032bfae32'
  },
  {
    title: 'Backend Engineering Manager',
    skills: 'Management',
    href: 'https://replayio.notion.site/Backend-Engineering-Manager-bfb84da8872d493dbe7a891e420be408'
  }
]

export const Work: FC = () => {
  return (
    <Section className={s.section}>
      <Container className={s.container}>
        <div>
          <div className={s['work-item']}>
            <Image src={codeImg} alt="Code icon" />
            <h2>The code behind our code</h2>
            <p>
              Integrity, honesty, and decency. Our principles are not
              aspirations but constraints. They lie behind every action we take,
              or decision we make. They ensure that we remain true to our course
              and true to ourselves.
            </p>
            <ButtonLink
              href="https://replayio.notion.site/Replay-s-Principles-Values-7b20c16430524356a28bbe842b1d5f06#4af5092d36214ce4a780e9c144014e58"
              variant="tertiary-inverted-alt"
            >
              Learn more
            </ButtonLink>
          </div>
          <div className={s['work-item']}>
            <Image src={valuesImg} alt="Values icon" />
            <h2>Embedded values</h2>
            <p>
              Our values anchor our aspirations and drive us forward.
              <br />
              <br />
              We are making software development faster, more accessible, more
              inclusive, and more exciting. We are dedicated to building a world
              where everyone is technically literate, a world where we are
              better equipped to overcome the greatest of challenges.
            </p>
            <ButtonLink
              href="https://replayio.notion.site/Replay-s-Principles-Values-7b20c16430524356a28bbe842b1d5f06#4af5092d36214ce4a780e9c144014e58"
              variant="tertiary-inverted-alt"
            >
              Learn more
            </ButtonLink>
          </div>
        </div>
        <div id="jobs" className={s['work-item-jobs']}>
          <div>
            <Image src={journeyImg} alt="Journey icon" />
            <h2>Join our journey</h2>
            <p>
              Excited by what we are doing? Think you’d be a good match?
              <br /> Great! We’d love to hear from you.
              <br />
              <br />
              Check out our open roles.
            </p>
            <ButtonLink
              href="mailto:hiring@replay.io"
              variant="tertiary-inverted-alt"
            >
              hiring@replay.io
            </ButtonLink>
          </div>
          <div>
            <ul>
              <li>
                <span>Job title</span>
                <span>Skills & qualifications</span>
              </li>
              {positions.map(({ title, skills, href }, i) => (
                <li key={i}>
                  <Link unstyled href={href}>
                    <span>{title}</span>
                    <span>{skills}</span>
                    <Image src={arrow} alt="go to link arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
