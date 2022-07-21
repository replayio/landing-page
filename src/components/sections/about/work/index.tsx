import Image from 'next/future/image'
import { FC } from 'react'

import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'
import { Link } from '~/components/primitives/link'
import arrow from '~/public/images/about/arrow.svg'
import codeImg from '~/public/images/about/code.svg'
import journeyImg from '~/public/images/about/journey.svg'
import valuesImg from '~/public/images/about/values.svg'

import s from './work.module.scss'

const positions = [
  {
    title: 'QA Manager',
    skills: 'Management',
    href: 'https://google.com'
  },
  {
    title: 'Runtime Engineer',
    skills: 'Engineering',
    href: 'https://google.com'
  },
  {
    title: 'Software Engineer',
    skills: 'Backend',
    href: 'https://google.com'
  }
]

export const Work: FC = () => {
  return (
    <Section className={s.section}>
      <Container className={s.container}>
        <div>
          <div className={s['work-item']}>
            <Image src={codeImg} alt="" />
            <span>The code behind our code</span>
            <p>
              Integrity, honesty, and decency. Our principles are not
              aspirations but constraints. They lie behind every action we take,
              or decision we make. They ensure that we remain true to our course
              and true to ourselves.
            </p>
            <Button variant="tertiary">Learn more</Button>
          </div>
          <div className={s['work-item']}>
            <Image src={valuesImg} alt="" />
            <span>Embedded values</span>
            <p>
              Our values anchor our aspirations and drive us forward.
              <br />
              <br />
              We are making software development faster, more accessible, more
              inclusive, and more exciting. We are dedicated to building a world
              where everyone is technically literate, a world where we are
              better equipped to overcome the greatest of challenges.
            </p>
            <Button variant="tertiary">Learn more</Button>
          </div>
        </div>
        <div className={s['work-item-jobs']}>
          <div>
            <Image src={journeyImg} alt="" />
            <span>Join our journey</span>
            <p>
              Excited by what we are doing? Think you’d be a good match?
              <br /> Great! We’d love to hear from you.
              <br />
              <br />
              Check out our open roles.
            </p>
            <Link href="mailto:hiring@replay.io">
              <Button variant="tertiary">hiring@replay.io</Button>
            </Link>
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
                    <Image src={arrow} />
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
