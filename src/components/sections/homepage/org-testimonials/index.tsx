import clsx from 'clsx'
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'
import { gsap } from 'lib/gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { NextIcon } from '~/components/icons/next'
import { ReactIcon } from '~/components/icons/react'
import { SolidIcon } from '~/components/icons/solid'
import { Container } from '~/components/layout/container'
import { Section } from '~/components/layout/section'
import { RadioButtons } from '~/components/primitives/radio-buttons'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useGsapTime } from '~/hooks/use-gsap-time'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'

import s from './org-testimonials.module.scss'

export const OrganizationTestimonials = () => {
  const initialIdx = Math.floor(0)

  const [activeOrg, setActiveOrg] = useState(initialIdx)
  const [activeOrgTestimonial, setActiveOrgTestimonial] = useState(0)
  const prevActiveOrgRef = useRef<number | undefined>(undefined)
  const organizationsRef = useRef<HTMLDivElement>(null)
  const activeOrgRef = useRef<Element>()
  const [inViewRef, { inView }] = useIntersectionObserver<HTMLDivElement>({})

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
  }, [activeOrg, time])

  useEffect(() => {
    if (!inView) {
      time.pause()
    } else {
      time.resume()
    }
  }, [inView, time])

  const currOrgTestimonials = testimonials[activeOrg]?.testimonials
  const testimonial = currOrgTestimonials?.[activeOrgTestimonial]

  return (
    <Section id="homepage-organization-testimonials" className={s['section']}>
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Travel back in time', as: 'h2' }}
        subtitle={{
          children: (
            <>
              <span>
                Replay is a next generation time travel debugger. The browser
                records just enough so that you can retroactively inspect your
                application.
              </span>{' '}
              <Link
                style={{ textDecoration: 'underline' }}
                href="https://www.notion.so/replayio/Replay-io-Overview-05d8d8ae2a9045b682c19a1ae2de9f76?pvs=4#dd66af0c13694f2e9f8ccadbb19258c1"
                aria-label="Time travel debugging"
              >
                Learn More
              </Link>
            </>
          )
        }}
      />
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
              <Image
                className={s['badge']}
                src={'/images/homepage/time-travel-badge.png'}
                width={16}
                height={18}
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
    org: 'Next',
    icon: <NextIcon />,
    testimonials: [
      {
        name: 'Tim Neutkins',
        title: 'Co-author of Next.js',
        quote:
          '“Next.js App Router is now stable in 13.4. Wouldn’t have been possible without Replay, we investigated so many (over 20) super complicated bugs that using traditional debugging would have cost us days to investigate.”',
        image: '/images/homepage/testimonials/tim-neutkins.png'
      },
      {
        name: 'JJ Kasper',
        title: 'Next.js Maintainer',
        quote:
          '“When I see a hard-to-reproduce issue in GitHub, I ask for a replay.”',
        image: '/images/homepage/testimonials/jj-kasper.png'
      }
    ]
  },
  {
    org: 'React',
    icon: <ReactIcon />,
    testimonials: [
      {
        name: 'Sebastian Markbåge',
        title: 'React Maintainer',
        quote: `“If I don't immediately know the answer to a bug, I immediately reach for replay.io. It's like HMR for repros.”`,
        image: '/images/homepage/testimonials/sebastian.png'
      },
      {
        name: 'Dan Abramov',
        title: 'React Maintainer',
        quote: '“Replay.io is galaxy brain tooling. Real gamechanger”',
        image: '/images/homepage/testimonials/dan-abramov.png'
      }
    ]
  },
  {
    org: 'Replit',
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4059_171807)">
          <g filter="url(#filter0_d_4059_171807)">
            <path
              d="M4 3C4 1.3432 5.3432 0 7 0H21C22.6568 0 24 1.3432 24 3V16H7C5.3432 16 4 14.6568 4 13V3ZM24 16H41C42.6568 16 44 17.3432 44 19V29C44 30.6568 42.6568 32 41 32H24V16ZM4 35C4 33.3432 5.3432 32 7 32H24V45C24 46.6568 22.6568 48 21 48H7C5.3432 48 4 46.6568 4 45V35Z"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_4059_171807"
            x="0"
            y="-4"
            width="48"
            height="56"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4059_171807"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4059_171807"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_4059_171807">
            <rect width="48" height="48" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    ),
    testimonials: [
      {
        name: 'Amjad Masad',
        title: 'Founder Replit',
        quote:
          '"Programmers typically reach for debuggers when they run out of ideas on how to fix their code. Now coders reach for time-travel debugging to understand their programs and not just when they want fix a bug."',
        image: '/images/homepage/testimonials/amjad.png'
      },
      {
        name: 'Alex Kotliarskyi',
        title: 'Senior engineer at Replit',
        quote:
          '“Morning! Saved another 10 to 20 minutes finding a bug using Replay!”',
        image: '/images/homepage/testimonials/alex.png'
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
          '"Fast forwarding and rewinding to breakpoints has saved me days(weeks??) while hunting down issues in @solid_js interruptible concurrent rendering."',
        image: '/images/homepage/testimonials/ryan-carniato.png'
      }
    ]
  },
  {
    org: 'Redux',
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4060_172495)">
          <g filter="url(#filter0_d_4060_172495)">
            <path
              d="M32.4956 32.1207C34.0906 31.9832 35.3245 30.5807 35.2456 28.905C35.1595 27.2293 33.7863 25.8837 32.1125 25.8837H32.0006C31.17 25.9133 30.3851 26.2716 29.8185 26.8797C29.252 27.4879 28.9501 28.2962 28.9793 29.1268C29.0343 30.005 29.3936 30.72 29.885 31.2407C27.9636 34.977 25.0798 37.7233 20.7091 40.0315C17.7703 41.5678 14.6665 42.1472 11.6451 41.7365C9.11881 41.379 7.14247 40.2515 5.93247 38.4383C4.12114 35.6902 3.95614 32.7257 5.46497 29.7593C6.56497 27.6143 8.21314 26.0505 9.31314 25.2805C8.98107 24.3597 8.72357 23.4137 8.54314 22.4517C0.408641 28.278 1.23731 36.242 3.70864 40.0058C5.54931 42.7522 9.31314 44.5085 13.4326 44.5085C14.5326 44.5085 15.6876 44.4278 16.8115 44.1528C23.956 42.7797 29.3661 38.4952 32.47 32.1775L32.4956 32.1207ZM42.3003 25.253C38.047 20.2517 31.7806 17.5053 24.638 17.5053H23.703C23.2391 16.4897 22.1685 15.8572 20.9566 15.8572H20.8741C19.1453 15.8572 17.7978 17.3422 17.8546 19.071C17.9096 20.7173 19.3103 22.0923 20.986 22.0923H21.1216C21.716 22.0694 22.2912 21.8758 22.7785 21.5348C23.2658 21.1938 23.6447 20.7197 23.8698 20.1692H24.8873C29.1205 20.1692 33.1281 21.4048 36.782 23.8212C39.5815 25.6637 41.589 28.08 42.7165 30.9657C43.7028 33.327 43.6496 35.6352 42.634 37.5602C41.0665 40.5797 38.4283 42.1747 34.9413 42.1747C32.7431 42.1747 30.6018 41.4872 29.5018 40.994C28.8418 41.5403 27.7418 42.4478 26.9461 42.9978C29.3625 44.0942 31.8081 44.7267 34.1695 44.7267C39.5265 44.7267 43.5085 41.7072 45.021 38.794C46.6673 35.4977 46.5316 29.95 42.326 25.198L42.3003 25.253ZM13.8983 33.107C13.9533 34.7552 15.3521 36.1283 17.0296 36.1283H17.1396C17.5525 36.119 17.9593 36.0272 18.336 35.8582C18.7128 35.6893 19.052 35.4466 19.3336 35.1445C19.6151 34.8425 19.8334 34.4871 19.9755 34.0994C20.1176 33.7117 20.1806 33.2995 20.161 32.887C20.161 31.237 18.7328 29.8675 17.0571 29.8675H16.9471C16.8371 29.8675 16.6721 29.8675 16.5328 29.9207C14.254 26.0743 13.2915 21.9512 13.6508 17.5053C13.8708 14.154 14.9708 11.2408 16.9453 8.8245C18.5953 6.76383 21.6991 5.7445 23.8148 5.69317C29.7475 5.58133 32.2206 12.9733 32.4113 15.9122L35.1576 16.7372C34.5251 7.7245 28.9243 3 23.5673 3C18.5366 3 13.8983 6.65383 12.0283 12.0108C9.47447 19.1517 11.1501 26.0212 14.2833 31.5157C14.0083 31.8732 13.8433 32.5038 13.8983 33.107Z"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_4060_172495"
            x="-2"
            y="-1"
            width="52.0005"
            height="49.7266"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4060_172495"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4060_172495"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_4060_172495">
            <rect width="48" height="48" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    ),
    testimonials: [
      {
        name: 'Mark Erikson',
        title: 'Redux Maintainer',
        quote:
          '“Replay.io gives me the tools I need to solve seemingly impossible bugs. It’s like the Redux DevTools, but for every line of code in your app. It’s so good I joined the team to help build out the future of debugging.”',
        image: '/images/homepage/testimonials/mark-erikson.png'
      },
      {
        name: 'Lenz Weber-Tronic',
        title: 'Redux Redux Toolkit Maintainer',
        quote: `“Replay.io allows me to debug problems that would be impossible to debug by traditional means - it has saved me from countless hours of confusion and frustration.”`,
        image: '/images/homepage/testimonials/lenz.png'
      }
    ]
  },
  {
    org: 'RedwoodJS',
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4061_172787)">
          <g filter="url(#filter0_d_4061_172787)">
            <path
              d="M14.9797 8.36075L23.5231 14.1926C23.7156 14.3209 23.9411 14.3906 24.1721 14.3961C24.4038 14.3945 24.6298 14.3236 24.8211 14.1926L33.3717 8.34058C33.5348 8.22293 33.6648 8.06514 33.749 7.88251C33.8333 7.69987 33.8689 7.49858 33.8525 7.29812C33.8361 7.09767 33.7682 6.90486 33.6554 6.73835C33.5425 6.57185 33.3886 6.4373 33.2086 6.34775L24.6652 2.11825C24.5053 2.04044 24.3297 2 24.1519 2C23.974 2 23.7985 2.04044 23.6386 2.11825L15.1227 6.34775C14.939 6.4374 14.7821 6.57377 14.6677 6.74319C14.5533 6.91261 14.4855 7.10912 14.471 7.31303C14.4565 7.51694 14.4959 7.72107 14.5852 7.90496C14.6745 8.08885 14.8105 8.24603 14.9797 8.36075ZM27.0742 16.0223C27.0742 16.4091 27.2649 16.7703 27.5802 16.9903L34.4296 21.6708C34.6425 21.8175 34.8987 21.8882 35.1568 21.8716C35.4149 21.855 35.6598 21.7519 35.8522 21.5791L41.5979 16.4403C41.7245 16.3269 41.8249 16.1874 41.892 16.0312C41.9591 15.8751 41.9913 15.7063 41.9864 15.5364C41.9816 15.3666 41.9397 15.1998 41.8637 15.0478C41.7877 14.8958 41.6795 14.7623 41.5466 14.6564L36.0612 10.2693C35.8673 10.115 35.6291 10.0267 35.3815 10.0171C35.1339 10.0075 34.8897 10.0772 34.6844 10.2161L27.5821 15.0744C27.4284 15.1809 27.3023 15.3224 27.214 15.4872C27.1257 15.6519 27.0778 15.8353 27.0742 16.0223ZM10.0407 22.3913C10.1774 22.5142 10.2832 22.6674 10.3498 22.8388C10.4164 23.0101 10.4417 23.1947 10.4239 23.3776C10.4064 23.5614 10.3447 23.7382 10.2442 23.893C10.1436 24.0478 10.0072 24.176 9.84638 24.2668L5.75622 26.7179C5.55388 26.8391 5.31928 26.8955 5.08396 26.8795C4.84864 26.8634 4.62387 26.7757 4.43988 26.6281C4.25492 26.48 4.11915 26.2793 4.05042 26.0525C3.9817 25.8257 3.98326 25.5835 4.05488 25.3576L5.56738 20.5983C5.62496 20.4133 5.72811 20.2458 5.86736 20.1112C6.00661 19.9766 6.17749 19.8791 6.36426 19.8278C6.55103 19.7765 6.74771 19.773 6.9362 19.8176C7.12468 19.8622 7.29892 19.9535 7.44288 20.0831L10.0407 22.3913ZM32.2241 22.8881L24.8302 17.8281C24.6384 17.699 24.4124 17.63 24.1812 17.63C23.95 17.63 23.724 17.699 23.5322 17.8281L16.1384 22.8881C15.9929 22.989 15.872 23.1213 15.7844 23.2752C15.6969 23.4291 15.6449 23.6006 15.6324 23.7773C15.6233 23.9552 15.6534 24.133 15.7206 24.298C15.7877 24.4631 15.8903 24.6114 16.0211 24.7324L23.4094 31.3416C23.6223 31.5301 23.8968 31.6342 24.1812 31.6342C24.4656 31.6342 24.7402 31.5301 24.9531 31.3416L32.3414 24.7324C32.4722 24.6127 32.5744 24.4652 32.6407 24.3008C32.707 24.1363 32.7355 23.9591 32.7242 23.7822C32.713 23.6052 32.6622 23.4331 32.5757 23.2783C32.4891 23.1236 32.3689 22.9903 32.2241 22.8881ZM12.5011 21.5809L6.76272 16.4421C6.63442 16.3261 6.533 16.1834 6.46555 16.0242C6.3981 15.8649 6.36625 15.6928 6.37222 15.5199C6.3748 15.3499 6.41513 15.1826 6.49027 15.0301C6.56541 14.8776 6.6735 14.7437 6.80672 14.6381L12.2921 10.2253C12.4872 10.0713 12.7262 9.98327 12.9746 9.97372C13.2229 9.96417 13.468 10.0336 13.6744 10.1721L20.7694 15.0304C20.9324 15.1369 21.0663 15.2823 21.159 15.4536C21.2517 15.6249 21.3003 15.8165 21.3003 16.0113C21.3003 16.206 21.2517 16.3976 21.159 16.5689C21.0663 16.7402 20.9324 16.8856 20.7694 16.9921L13.9274 21.6726C13.7135 21.8187 13.4569 21.889 13.1984 21.8724C12.94 21.8558 12.6945 21.7532 12.5011 21.5809ZM41.9682 28.9619L36.1254 25.4639C35.9142 25.3363 35.6675 25.2801 35.4219 25.3036C35.1762 25.327 34.9447 25.4289 34.7614 25.5941L27.6206 31.9686C27.4725 32.1018 27.3605 32.2704 27.2952 32.4586C27.2298 32.6467 27.213 32.8484 27.2466 33.0448C27.2798 33.2407 27.3626 33.425 27.4871 33.58C27.6116 33.735 27.7737 33.8555 27.9579 33.9303L37.8652 37.9453C38.1446 38.0569 38.4564 38.0559 38.7351 37.9424C39.0138 37.8289 39.2375 37.6117 39.3594 37.3366L42.4302 30.4579C42.5509 30.1954 42.5705 29.8976 42.4852 29.6216C42.4 29.3455 42.2159 29.1107 41.9682 28.9619ZM42.7786 20.6001L44.2911 25.3594H44.2782C44.3508 25.5842 44.3533 25.8257 44.2854 26.052C44.2174 26.2782 44.0823 26.4784 43.8979 26.626C43.7135 26.7736 43.4885 26.8616 43.2529 26.8784C43.0173 26.8951 42.7821 26.8398 42.5787 26.7198L38.4831 24.2686C38.3255 24.1759 38.1925 24.0468 38.0952 23.8921C37.9979 23.7374 37.9391 23.5616 37.9239 23.3794C37.9047 23.1964 37.9294 23.0114 37.9961 22.8399C38.0627 22.6683 38.1693 22.5152 38.3071 22.3931L40.9031 20.0794C41.0474 19.9499 41.222 19.8588 41.4108 19.8146C41.5996 19.7703 41.7965 19.7743 41.9834 19.8262C42.1702 19.878 42.341 19.9761 42.48 20.1114C42.619 20.2466 42.7216 20.4147 42.7786 20.6001ZM21.1086 33.0411C21.1431 32.8456 21.1272 32.6445 21.0624 32.4568C20.9976 32.2692 20.886 32.1011 20.7382 31.9686L13.5974 25.5941C13.4141 25.4289 13.1825 25.327 12.9369 25.3036C12.6913 25.2801 12.4446 25.3363 12.2334 25.4639L6.39055 28.9619C6.14563 29.1119 5.96333 29.3455 5.87738 29.6195C5.79143 29.8936 5.80766 30.1894 5.92305 30.4524L8.99938 37.3311C9.12049 37.6064 9.3439 37.8238 9.62239 37.9374C9.90088 38.051 10.2126 38.0518 10.4917 37.9398L20.3917 33.9248C20.5766 33.8508 20.7396 33.7308 20.865 33.5761C20.9905 33.4215 21.0743 33.2373 21.1086 33.0411ZM24.6139 35.0028L32.5596 38.2203C32.9482 38.3871 33.2159 38.7519 33.2599 39.1754C33.2845 39.3852 33.2516 39.5976 33.1648 39.7901C33.0779 39.9826 32.9403 40.1478 32.7667 40.2681L24.8137 45.7919C24.6239 45.9248 24.3983 45.9971 24.1666 45.9991C23.9343 45.9952 23.7084 45.9225 23.5176 45.7901L15.5719 40.2662C15.3962 40.1474 15.2564 39.9828 15.1675 39.7902C15.0786 39.5977 15.044 39.3845 15.0674 39.1737C15.0908 38.9629 15.1713 38.7625 15.3003 38.5942C15.4293 38.4258 15.6018 38.2959 15.7992 38.2184L23.7449 35.0009C24.0242 34.8907 24.3351 34.8913 24.6139 35.0028Z"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_4061_172787"
            x="0"
            y="-2"
            width="48.3345"
            height="51.999"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4061_172787"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4061_172787"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_4061_172787">
            <rect width="48" height="48" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    ),
    testimonials: [
      {
        name: 'Dom Saadi',
        title: 'Building RedwoodJS',
        quote: `“I’m not sure if we could’ve shipped the last major version of RedwoodJS without Replay.”`,
        image: '/images/homepage/testimonials/dom.png'
      }
    ]
  },
  {
    org: 'CodeSandbox',
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4060_172646)">
          <g filter="url(#filter0_d_4060_172646)">
            <path
              d="M2 46H46V2H2V6.50001H41.5001V41.5001H6.50001V2H2V46Z"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_4060_172646"
            x="-2"
            y="-2"
            width="52"
            height="52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4060_172646"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4060_172646"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_4060_172646">
            <rect width="48" height="48" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    ),
    testimonials: [
      {
        name: 'Ives van Hoorne',
        title: 'Co-Founder CodeSandbox',
        quote: `“Replay.io is so great! Today I had a hard-to-repro flow in development, so I recorded a replay to see how it works. I didn’t only find the bug, I discovered a performance improvement using Replay.”`,
        image: '/images/homepage/testimonials/ives.png'
      }
    ]
  },
  {
    org: 'Typescript',
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4061_172839)">
          <g filter="url(#filter0_d_4061_172839)">
            <path
              d="M2.0625 0C0.920333 0 0 0.920333 0 2.0625V41.9375C0 43.0797 0.920333 44 2.0625 44H41.9375C43.0797 44 44 43.0797 44 41.9375V2.0625C44 0.920333 43.0797 0 41.9375 0H2.0625ZM33.8947 17.875C35.0167 17.875 36.0103 17.9428 36.8775 18.0785C37.6954 18.201 38.498 18.41 39.2718 18.7018V23.2082C38.9004 22.9513 38.5057 22.7297 38.093 22.5463C37.6674 22.3548 37.228 22.1955 36.7785 22.0697C35.9271 21.8324 35.048 21.7091 34.1642 21.703C33.6142 21.703 33.1137 21.7543 32.6627 21.8607C32.2607 21.9466 31.8751 22.0964 31.5205 22.3043C31.2088 22.495 30.9705 22.7242 30.8 22.99C30.6285 23.2579 30.5393 23.5702 30.5433 23.8883C30.5433 24.2477 30.6405 24.5722 30.8293 24.8582C31.02 25.1442 31.2913 25.4155 31.6415 25.6722C31.9917 25.9288 32.417 26.1782 32.9175 26.4238C33.418 26.6713 33.9845 26.9262 34.6152 27.1865C35.4768 27.5477 36.2505 27.9327 36.9362 28.3378C37.6218 28.7448 38.2103 29.205 38.7017 29.7183C39.193 30.2298 39.567 30.8147 39.8273 31.4728C40.0877 32.131 40.2197 32.8955 40.2197 33.77C40.2197 34.9745 39.9905 35.9883 39.5358 36.806C39.0916 37.6124 38.4541 38.2959 37.6805 38.7952C36.8467 39.3239 35.9225 39.6943 34.9543 39.8878C33.9167 40.1078 32.8222 40.2178 31.6727 40.2178C30.5413 40.2228 29.412 40.1221 28.2993 39.9172C27.3367 39.7507 26.4031 39.4463 25.5273 39.0133V34.1917C27.1843 35.6017 29.2862 36.3809 31.4618 36.3917C32.0723 36.3917 32.6058 36.3367 33.0605 36.2267C33.517 36.1167 33.8965 35.9627 34.2027 35.7683C34.507 35.5703 34.7343 35.3393 34.8865 35.0717C35.0547 34.76 35.1312 34.4071 35.1072 34.0538C35.0832 33.7005 34.9596 33.3612 34.7508 33.0752C34.4784 32.7147 34.1453 32.4045 33.7663 32.1585C33.2964 31.847 32.8015 31.5747 32.2868 31.3445C31.6768 31.0659 31.0613 30.7994 30.4407 30.5452C28.7577 29.843 27.5037 28.9832 26.6768 27.9693C25.8518 26.9555 25.4375 25.729 25.4375 24.2935C25.4375 23.1678 25.663 22.2017 26.114 21.3932C26.565 20.5847 27.1773 19.9192 27.9547 19.3967C28.7768 18.8543 29.6896 18.4637 30.6497 18.2435C31.713 17.9928 32.8022 17.8691 33.8947 17.875ZM6.1875 18.2197H23.7197V22.1907H17.4277V39.875H12.4465V22.1907H6.1875V18.2197Z"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_4061_172839"
            x="-4"
            y="-4"
            width="52"
            height="52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4061_172839"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4061_172839"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_4061_172839">
            <rect width="44" height="44" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    ),
    testimonials: [
      {
        name: 'Mateusz Burzyński',
        title: 'Software Engineer at Stately.ai',
        quote: `"Current status: time-travel debugging Typescript's compiler. Replay is the hero tool I don't deserve. My dev life consists of 2 major eras now - I call them pre-Replay and post-Replay."`,
        image: '/images/homepage/testimonials/mateusz.png'
      },

      {
        name: 'Matt Pockock',
        title: 'Full-time TypeScript educator',
        quote: `“Replay.io is from another planet where bug reports save you time, instead of eating up hours of debugging.”`,
        image: '/images/homepage/testimonials/matt.png'
      }
    ]
  },
  {
    org: 'Stately',
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4061_173475)">
          <path
            d="M33.7608 9.73629C35.5305 7.96651 35.5305 5.09712 33.7608 3.32734C31.991 1.55755 29.1216 1.55755 27.3518 3.32734C25.582 5.09712 25.582 7.96651 27.3518 9.73629C29.1216 11.5061 31.991 11.5061 33.7608 9.73629Z"
            fill="currentColor"
          />
          <g filter="url(#filter0_d_4061_173475)">
            <path
              d="M41.5238 26.4472L23.4846 8.40787L17.0835 2.00684C13.5391 5.55121 13.5744 11.2469 17.1011 14.7913L24.8776 22.5677L24.8599 22.5854L29.2683 26.9939C29.4271 27.1525 29.5328 27.3817 29.5328 27.611C29.5328 27.8578 29.4094 28.087 29.2508 28.2458L24.1017 33.3949C23.7491 33.7476 23.2024 33.7476 22.8497 33.3949L17.7007 28.2281C17.348 27.8755 17.348 27.3288 17.7007 26.9762C21.2274 23.2201 18.6 18.7235 16.9601 17.2071L15.8139 16.0608L5.51579 26.3766C4.82807 27.0643 4.82807 28.1752 5.51579 28.8629L22.2326 45.5797C22.9202 46.2675 24.0312 46.2675 24.7188 45.5797L41.4004 28.8982C41.7707 28.5985 42 28.14 42 27.6287C42 27.1702 41.806 26.7469 41.5238 26.4472Z"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_4061_173475"
            x="1"
            y="-1.99316"
            width="45"
            height="52.0889"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4061_173475"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4061_173475"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_4061_173475">
            <rect width="48" height="48" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    ),
    testimonials: [
      {
        name: 'David Khourshid',
        title: 'Founder of Stately.ai',
        quote: `“Time travel is the obvious next step for the future of collaboratively inspecting and debugging applications.”`,
        image: '/images/homepage/testimonials/david.png'
      },
      {
        name: 'Mateusz Burzyński',
        title: 'Software Engineer at Stately.ai',
        quote: `“What the fuck is this, is it the future? is it the past? is it now? don't care this is just freaking amazing!”`,
        image: '/images/homepage/testimonials/mateusz.png'
      }
    ]
  },
  {
    org: 'RFF',
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4061_173110)">
          <g filter="url(#filter0_d_4061_173110)">
            <rect
              y="10"
              width="48"
              height="28"
              fill="url(#pattern0)"
              shapeRendering="crispEdges"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_4061_173110"
            x="-4"
            y="6"
            width="56"
            height="36"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4061_173110"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4061_173110"
              result="shape"
            />
          </filter>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_4061_173110"
              transform="matrix(0.00166667 0 0 0.00285714 0 -0.0171429)"
            />
          </pattern>
          <clipPath id="clip0_4061_173110">
            <rect width="48" height="48" fill="currentColor" />
          </clipPath>
          <image
            id="image0_4061_173110"
            width="600"
            height="362"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    ),
    testimonials: [
      {
        name: 'Erik Rasmussen',
        title: 'Author of Redux form and final form',
        quote: `"People use the word "game-changer" waaaaay too often. Very rarely does anything change the game. But holy 🤬, this just might! I'm sharing it to all of my teams, even reaching out to teams at previous employers to make them aware of this magic. Great work!"`,
        image: '/images/homepage/testimonials/erik.png'
      }
    ]
  }
]
