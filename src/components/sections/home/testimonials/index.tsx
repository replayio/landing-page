import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import Image from 'next/future/image'
import { FC, memo, useEffect, useRef, useState } from 'react'

import { PlayIcon } from '~/components/common/play-icon'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'
import { Link } from '~/components/primitives/link'
import { useGsapTime } from '~/hooks/use-gsap-time'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'

import s from './testimonials.module.scss'

const testimonials = [
  {
    picture: '/images/home/rauch.jpg',
    name: 'Guillermo Rauch',
    company: {
      name: 'Vercel',
      url: 'https://vercel.com',
      logo: 'https://dummyimage.com/64/000/fff'
    },
    position: 'CEO',
    quote:
      "“It's a well known fact that engineers want high quality bug reports, with extensive details...”"
  },
  {
    picture: '/images/home/abramov.jpg',
    name: 'Dan Abramov',
    company: {
      name: 'React',
      url: 'https://es.reactjs.org/',
      logo: 'https://dummyimage.com/64/000/fff'
    },
    position: 'Mantainer',
    quote: '“Replay.io is galaxy brain tooling. Real gamechanger.”'
  },
  {
    picture: '/images/home/ghadyani.jpeg',
    name: 'Kevin Ghadyani',
    company: {
      name: 'JavaScript',
      url: '#',
      logo: 'https://dummyimage.com/64/000/fff'
    },
    position: 'Engineer',
    quote:
      '“I first saw Replay at ReactConf in 2019 and came away thinking "this is way cooler than anything I saw...”'
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
                <Link href={testimonials[activeIdx].company.url}>
                  <span className={s['company-logo']}>
                    <Image
                      src={testimonials[activeIdx].company.logo}
                      width={16}
                      height={16}
                      draggable={false}
                    />
                  </span>{' '}
                  {testimonials[activeIdx].company.name}
                </Link>
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
                  <Link href={company.url}>
                    <span className={s['company-logo']}>
                      <Image src={company.logo} width={16} height={16} />
                    </span>{' '}
                    {company.name}
                  </Link>
                </p>
              </div>
            ))}
          </div>

          <Container className={s['cta']} size="lg">
            <Button className={s['button']} variant="tertiary">
              See shoutouts <PlayIcon style={{ marginLeft: 8 }} />
            </Button>
          </Container>
        </div>
      </Container>
    </Section>
  )
}
