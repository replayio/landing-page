import clsx from 'clsx'
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'
import { gsap } from 'lib/gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { NextIcon } from '~/components/icons/next'
import { ReactIcon } from '~/components/icons/react'
import { SolidIcon } from '~/components/icons/solid'
import { Container } from '~/components/layout/container'
import { Section } from '~/components/layout/section'
import { RadioButtons } from '~/components/primitives/radio-buttons'
import { useGsapTime } from '~/hooks/use-gsap-time'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'

import s from './org-testimonials.module.scss'

export const OrganizationTestimonials = () => {
  const initialIdx = Math.floor(testimonials.length / 2)

  const [activeOrg, setActiveOrg] = useState(initialIdx)
  const [activeOrgTestimonial, setActiveOrgTestimonial] = useState(0)
  const prevActiveOrgRef = useRef<number | undefined>(undefined)
  const organizationsRef = useRef<HTMLDivElement>(null)
  const activeOrgRef = useRef<Element>()
  const [inViewRef, inView] = useIntersectionObserver<HTMLDivElement>({})

  const [emblaRef, embla] = useEmblaCarousel({
    align: 'center',
    startIndex: initialIdx,
    loop: true
  })

  const time = useGsapTime({
    duration: 8,
    onComplete: () => {
      if (embla?.canScrollNext()) {
        embla?.scrollNext()
      } else {
        embla?.scrollTo(0)
      }
    },
    onUpdate: (t) => {
      if (!activeOrgRef.current) return

      gsap.set(activeOrgRef.current, {
        '--progress': `${t.normalizedTime}`,
        immediateRender: true
      })
    }
  })

  useEffect(() => {
    const handler = (em: EmblaCarouselType) => {
      time.pause()
      setActiveOrg(em.selectedScrollSnap())
      setActiveOrgTestimonial(0)
    }

    embla?.on('select', handler)

    return () => {
      embla?.off('select', handler)
    }
  }, [embla, time])

  useIsomorphicLayoutEffect(() => {
    if (!inView) return

    const elms = organizationsRef.current?.querySelectorAll(
      `.${s['organization']}`
    )

    if (!elms) return

    let prevTrgtElm
    const trgtElm = elms[activeOrg]
    let delayedStartTween: gsap.core.Tween
    let showGradientTween: gsap.core.Tween

    if (prevActiveOrgRef.current !== undefined) {
      prevTrgtElm = elms[prevActiveOrgRef.current]
    }

    if (prevTrgtElm) {
      gsap.to([prevTrgtElm], {
        '--gradient-opacity': '0',
        ease: 'power2.out',
        duration: 1
      })
    }

    if (trgtElm) {
      activeOrgRef.current = trgtElm

      gsap.set([activeOrgRef.current], {
        '--gradient-grow': '0',
        '--progress': '0'
      })

      showGradientTween = gsap.to([activeOrgRef.current], {
        '--gradient-grow': '1',
        '--gradient-opacity': '1',
        ease: 'power2.out',
        duration: 1
      })

      showGradientTween.then(() => {
        delayedStartTween = gsap.delayedCall(0.2, () => {
          time.start()
        })
      })
    }

    return () => {
      prevActiveOrgRef.current = activeOrg

      delayedStartTween?.kill()
      showGradientTween?.kill()
    }
  }, [activeOrg, time, inView])

  useEffect(() => {
    if (!inView) {
      time.pause()
    }
  }, [inView, time])

  const currOrgTestimonials = testimonials[activeOrg]?.testimonials
  const testimonial = currOrgTestimonials?.[activeOrgTestimonial]

  return (
    <Section id="homepage-organization-testimonials" className={s['section']}>
      <Container className={s['container']}>
        <div className={clsx(s['root'])} ref={inViewRef}>
          <div className={clsx(s['embla'], s['organizations-wrapper'])}>
            <div className={s['embla-viewport']} ref={emblaRef}>
              <div className={s['embla-container']} ref={organizationsRef}>
                {testimonials.map((o, idx) => (
                  <div className={s['embla-slide']} key={idx}>
                    <div
                      onClick={() => {
                        embla?.scrollTo(idx)
                      }}
                      className={clsx(s['organization'], {
                        [s['active'] as string]: idx === activeOrg
                      })}
                      title={o.org}
                    >
                      <div className={s['logo']}>{o.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Container className={s['inner-container']}>
            <div className={s['quote']}>{testimonial?.quote}</div>

            <div className={s['author']}>
              <Image
                className={s['image']}
                src={testimonial?.image ?? ''}
                width={64}
                height={64}
                alt={'Author Image'}
              />
              <div className={s['info']}>
                <p className={s['name']}>{testimonial?.name}</p>
                <p className={s['title']}>{testimonial?.title}</p>
              </div>
            </div>

            <div className={s['all-testimonials']}>
              <RadioButtons
                defaultValue="0"
                value={activeOrgTestimonial.toString()}
                onValueChange={(v) => setActiveOrgTestimonial(parseInt(v))}
                className={s['radio-buttons']}
                options={
                  currOrgTestimonials?.map((t, idx) => ({
                    label: t.name,
                    value: idx.toString()
                  })) || []
                }
                key={activeOrg}
              />
            </div>
          </Container>
        </div>
      </Container>
    </Section>
  )
}

const testimonials: {
  org: string
  icon: React.ReactNode
  testimonials: {
    name: string
    title: string
    quote: string
    image: string
  }[]
}[] = [
  {
    org: 'React',
    icon: <ReactIcon />,
    testimonials: [
      {
        name: 'Dan Abramov',
        title: 'React Core Team',
        quote:
          '“Replay has saved me weeks debugging Solid’s interruptible concurrent renderer.”',
        image: 'https://dummyimage.com/64x64/fff/000'
      }
    ]
  },
  {
    org: 'Solid',
    icon: <SolidIcon />,
    testimonials: [
      {
        name: 'Ryan Carniato',
        title: 'Solid Founder',
        quote:
          '“Amet ex laborum commodo consectetur ad culpa esse do qui fugiat nostrud sit.”',
        image: 'https://dummyimage.com/64x64/fff/000'
      },
      {
        name: 'Eric Clemmons',
        title: 'Solid Mantainer',
        quote:
          '“Adipisicing dolore exercitation sint mollit et adipisicing et veniam laborum officia duis.”',
        image: 'https://dummyimage.com/64x64/fff/000'
      }
    ]
  },
  {
    org: 'Next',
    icon: <NextIcon />,
    testimonials: [
      {
        name: 'Guillermo Rauch',
        title: 'Vercel CEO',
        quote:
          '“Reprehenderit qui esse eu exercitation. Nulla sint minim adipisicing esse aliqua minim exercitation duis officia nulla aute irure tempor irure. ”',
        image: 'https://dummyimage.com/64x64/fff/000'
      }
    ]
  }
]
