import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import Image from 'next/future/image'
import { FC, memo, useEffect, useRef, useState } from 'react'

import { PlayIcon } from '~/components/common/play-icon'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { ButtonLink } from '~/components/primitives/button'
import { useGsapTime } from '~/hooks/use-gsap-time'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import abramov from '~/public/images/home/abramov.jpg'
import andarist from '~/public/images/shoutouts/andarist.jpg'
import rauchg from '~/public/images/home/rauch.jpg'
import kirschner from '~/public/images/shoutouts/kirschner.jpg'
import khourshid from '~/public/images/shoutouts/khourshid.jpg'
import yang from '~/public/images/shoutouts/yang.jpg'

import s from './testimonials.module.scss'

const testimonials = [
  {
    picture: rauchg,
    name: 'Guillermo Rauch',
    company: {
      name: 'Vercel',
      logo: '/images/home/vercel.svg'
    },
    position: 'CEO',
    quote:
      "“This tool has a very good chance of creating a new category around collaborative debugging.”"
  },
  {
    picture: abramov,
    name: 'Dan Abramov',
    company: {
      name: 'React',
      logo: '/images/home/react.svg'
    },
    position: 'Maintainer',
    quote: '“Replay.io is galaxy brain tooling. Real gamechanger.”'
  },
  {
    picture: khourshid,
    name: 'David Khourshid',
    company: {
      name: 'Stately.ai',
      logo: '/images/home/stately.svg'
    },
    position: 'Founder',
    quote:
      '“Replay.io is the obvious next step for the future of collaborative debugging applications...”'
  },
  {
    picture: yang,
    name: 'Jean Yang',
    company: {
      name: 'Akita Software',
      logo: '/images/home/akita.svg'
    },
    position: 'Founder and CEO',
    quote:
      '“Awesome to see time-travel debugging in such a usable, intuitive form!”'
  },
  {
    picture: kirschner,
    name: 'Harald Kirschner',
    company: {
      name: 'VS Code',
      logo: '/images/home/vscode.svg'
    },
    position: 'Product Manager',
    quote:
      '“Replay first feels like magic, but you quickly wonder how you ever worked without it.”'
  },
  {
    picture: andarist,
    name: 'Mateusz Burzyński',
    company: {
      name: 'Stately.ai',
      logo: '/images/home/stately.svg'
    },
    position: 'Software Engineer',
    quote:
      `What the fuck is this, is it the future? Is it the past? Is it now? Don't care this is just freaking amazing!`
  }
]

type CircularProgressBarProps = {
  active: boolean
  onComplete?: () => void
  duration: number
}

const CircularProgressBar: FC<CircularProgressBarProps> = memo(
  ({ active, duration, onComplete }) => {
    const progressRef = useRef<SVGCircleElement>(null)
    const maxDeg = 351.858

    const time = useGsapTime({
      duration,
      onUpdate: (progress) => {
        if (progressRef.current) {
          gsap.set(progressRef.current, {
            '--max-dash-array': maxDeg,
            '--dash-array': `${maxDeg * progress.normalizedTime}`
          })
        }
      },
      onComplete
    })

    useEffect(() => {
      if (active) {
        time.start()
      } else {
        time.pause()
      }

      return time.pause
    }, [active, time])

    return (
      <svg className={s['progress-bar-root']} viewBox="0 0 120 120">
        <circle
          className={s['progress-bar']}
          r="56"
          cx="60"
          cy="60"
          strokeWidth="8"
        />
        <circle
          className={s['progress']}
          r="56"
          cx="60"
          cy="60"
          strokeWidth="8"
          // @ts-ignore
          style={{ '--max-dash-array': maxDeg }}
          ref={progressRef}
        />
      </svg>
    )
  }
)

export const Testimonials: FC = () => {
  const [ref, { inView }] = useIntersectionObserver({ triggerOnce: false })

  const [activeIdx, setActiveIdx] = useState(0)

  const next = () => {
    setActiveIdx((activeIdx + 1) % testimonials.length)
  }

  const QUOTE_DURATION = 10

  return (
    <Section className={s['section']} ref={ref}>
      <Container size="lg">
        <div className={s['testimonials']}>
          <div className={s['pictures']}>
            {testimonials.map(({ picture, name }, idx) => (
              <button onClick={() => setActiveIdx(idx)} key={name}>
                <div
                  className={clsx(s['picture'], {
                    [s['active']]: idx === activeIdx && inView
                  })}
                >
                  <div className={s['progress-bar-container']}>
                    <CircularProgressBar
                      duration={QUOTE_DURATION}
                      active={idx === activeIdx && inView}
                      onComplete={next}
                    />
                  </div>

                  <Image
                    width={64}
                    height={64}
                    src={picture}
                    quality={100}
                    placeholder="blur"
                    alt={`${name} picture`}
                  />
                </div>
              </button>
            ))}
          </div>
          <div className={s['quotes']}>
            {
              <p className={clsx(s['quote'], s['placeholder'])}>
                {testimonials[0].quote}
              </p>
            }
            {testimonials.map(({ quote, name }, idx) => (
              <h4
                className={clsx(
                  s['quote'],
                  idx === activeIdx ? s['new'] : s['old']
                )}
                key={name}
              >
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
                <span className={s['company-logo']}>
                  <Image
                    src={testimonials[activeIdx].company.logo}
                    width={16}
                    height={16}
                    draggable={false}
                    alt={testimonials[activeIdx].company.name}
                  />
                </span>{' '}
                {testimonials[activeIdx].company.name}
              </p>
            </div>

            {testimonials.map(({ company, position, name }, idx) => (
              <div
                className={clsx(
                  s['identity'],
                  idx === activeIdx ? s['new'] : s['old']
                )}
                key={name}
              >
                <h5 className={s['identity-name']}>{name}</h5>
                <p className={s['identity-position']}>
                  {position},{' '}
                  <span className={s['company-logo']}>
                    <Image
                      src={company.logo}
                      width={16}
                      height={16}
                      alt={`${company.name} logo`}
                    />
                  </span>{' '}
                  {company.name}
                </p>
              </div>
            ))}
          </div>

          <Container className={s['cta']} size="lg">
            <ButtonLink
              href="/shoutouts"
              className={s['button']}
              variant="tertiary"
            >
              See shoutouts <PlayIcon style={{ marginLeft: 8 }} />
            </ButtonLink>
          </Container>
        </div>
      </Container>
    </Section>
  )
}
