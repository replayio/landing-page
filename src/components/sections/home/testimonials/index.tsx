import clsx from 'clsx'
import Image from 'next/future/image'
import { FC } from 'react'

import { PlayIcon } from '~/components/common/play-icon'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'
import { Link } from '~/components/primitives/link'

import s from './testimonials.module.scss'

const testimonials = [
  {
    picture: 'https://dummyimage.com/64/000/fff',
    name: 'Guillermo Rauch',
    company: {
      name: 'Vercel',
      url: 'https://company.com',
      logo: 'https://dummyimage.com/64/000/fff'
    },
    position: 'CEO',
    quote:
      '“I think Replay has a very good chance of creating a new category around collaborative debugging”'
  },
  {
    picture: 'https://dummyimage.com/64/000/fff',
    name: 'Dan Abramov',
    company: {
      name: 'Company Name',
      url: 'https://vercel.com',
      logo: 'https://dummyimage.com/64/000/fff'
    },
    position: 'CEO',
    quote:
      '“I think Replay has a very good chance of creating a new category around collaborative debugging”'
  },
  {
    picture: 'https://dummyimage.com/64/000/fff',
    name: 'Alexandr Wang',
    company: {
      name: 'Scale',
      url: 'https://scale.com',
      logo: 'https://dummyimage.com/64/000/fff'
    },
    position: 'CEO',
    quote:
      '“I think Replay has a very good chance of creating a new category around collaborative debugging”'
  }
]

export const Testimonials: FC = () => {
  const activeIdx = 0

  return (
    <Section className={s['section']}>
      <Container size="lg">
        <div className={s['testimonials']}>
          <div className={s['pictures']}>
            {testimonials.map(({ picture, name }) => (
              <button key={name}>
                <div className={s['picture']}>
                  {/* @ts-ignore */}
                  <Image src={picture} width={64} height={64} layout="raw" />
                </div>
              </button>
            ))}
          </div>
          <div className={s['quotes']}>
            {
              <p className={clsx(s['quote'], s['placeholder'])}>
                {testimonials[activeIdx].quote}
              </p>
            }
            {testimonials.map(({ quote, name }) => (
              <h4 className={s['quote']} key={name}>
                {quote}
              </h4>
            ))}
          </div>
          <div className={s['identities']}>
            {/* Fix this, make a component */}
            <div className={clsx(s['identity'], s['placeholder'])}>
              <h5 className={s['identity-name']}>
                {testimonials[activeIdx].name}
              </h5>
              <p className={s['identity-position']}>
                {testimonials[activeIdx].position},{' '}
                <Link href={testimonials[activeIdx].company.url}>
                  <span className={s['company-logo']}>
                    <Image
                      src={testimonials[activeIdx].company.logo}
                      width={16}
                      height={16}
                      // @ts-ignore
                      layout="raw"
                    />
                  </span>{' '}
                  {testimonials[activeIdx].company.name}
                </Link>
              </p>
            </div>

            {testimonials.map(({ company, position, name }) => (
              <div className={s['identity']} key={name}>
                <h5 className={s['identity-name']}>{name}</h5>
                <p className={s['identity-position']}>
                  {position},{' '}
                  <Link href={company.url}>
                    <span className={s['company-logo']}>
                      <Image
                        src={company.logo}
                        width={16}
                        height={16}
                        // @ts-ignore
                        layout="raw"
                      />
                    </span>{' '}
                    {company.name}
                  </Link>
                </p>
              </div>
            ))}
          </div>

          <Container className={s['cta']} size="lg">
            <Button variant="tertiary">
              See shoutouts <PlayIcon />
            </Button>
          </Container>
        </div>
      </Container>
    </Section>
  )
}
