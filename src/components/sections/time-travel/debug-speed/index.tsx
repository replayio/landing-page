import clsx from 'clsx'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'

import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/cta'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useTabletLgBreakpoint } from '~/hooks/use-media'
import { useViewportSize } from '~/hooks/use-viewport-size'
import { gsap } from '~/lib/gsap'

import s from './debug.module.scss'
import { SceneProps } from './scenes'

const PrintStatements = dynamic(
  () => import('./scenes').then((m) => m.Scene1),
  {
    ssr: false
  }
)
// @ts-ignore
const Console = dynamic(() => import('./scenes').then((m) => m.Scene2), {
  ssr: false
})
// @ts-ignore
const ReactDevtools = dynamic(() => import('./scenes').then((m) => m.Scene3), {
  ssr: false
})

const SCROLL_TRIGGER_DURATION = 3000
const CARD_HEIGHT = 320
const CONTAINER_PADDING = 76

export const DebugSpeed = () => {
  const { height } = useViewportSize()
  const isTablet = useTabletLgBreakpoint()

  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const [sceneStatus, setSceneStatus] = useState({
    activeScene: null as null | number,
    showScene: 0
  })

  const setScene = (index: number) => {
    setSceneStatus({
      activeScene: index,
      showScene: index
    })
  }

  const offsetTop = height / 2 - CONTAINER_PADDING - CARD_HEIGHT / 2

  useIsomorphicLayoutEffect(() => {
    if (isTablet) return

    const ctx = gsap.context(() => {
      const container = containerRef.current
      const spacer = spacerRef.current

      const progressBar = progressBarRef.current

      if (!container || !spacer || !progressBar) return

      gsap
        .timeline({
          scrollTrigger: {
            trigger: spacerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
          }
        })
        .to(progressBar, {
          height: '33%'
        })
        .to(progressBar, {
          height: '66%'
        })
        .to(progressBar, {
          height: '100%'
        })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: spacerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,

            onEnter: () => {
              setScene(0)
            },
            onEnterBack: () => {
              document.documentElement.classList.add('hide-header')
              setScene(2)
            },
            onLeave: () => {
              document.documentElement.classList.remove('hide-header')
              setSceneStatus({
                activeScene: null,
                showScene: 2
              })
            },
            onLeaveBack: () => {
              document.documentElement.classList.remove('hide-header')
              setSceneStatus({
                activeScene: null,
                showScene: 0
              })
            }
          },
          defaults: {
            ease: 'none',
            duration: 15
          }
        })
        .add(() => {
          document.documentElement.classList.add('hide-header')
        }, '<+=1')
        .to(spacer, {
          delay: 15,
          onStart: () => {
            setScene(0)
          },
          onComplete: () => {
            setScene(1)
          },
          onReverseComplete: () => {
            setScene(0)
          }
        })
        .to(spacer, {
          delay: 15,
          onComplete: () => {
            setScene(2)
          },
          onReverseComplete: () => {
            setScene(1)
          }
        })
        .to(spacer, {
          delay: 10,
          onReverseComplete: () => {
            setScene(2)
          }
        })
        .to(progressBar, {
          duration: 10,
          opacity: 0
        })
    }, sectionRef)
    return () => {
      ctx.revert()
      ctx.kill()
    }
  }, [height, isTablet, offsetTop])

  useEffect(() => {
    const textsContainer = containerRef.current?.querySelector(
      `.${s.sideTextsContainer}`
    )

    const texts = containerRef.current?.querySelectorAll(`.${s.sideText}`)

    if (!textsContainer || !texts) return

    if (isTablet) {
      gsap.set(textsContainer, {
        y: 0
      })

      return
    }

    const ctx = gsap.context(() => {
      gsap.to(textsContainer, {
        y: offsetTop - CARD_HEIGHT * sceneStatus.showScene
      })
      texts.forEach((text, i) => {
        if (i === sceneStatus.showScene) {
          gsap.to(text, {
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut'
          })
        } else {
          gsap.to(text, {
            opacity: 0.2,
            duration: 1,
            ease: 'power1.inOut'
          })
        }
      })
    }, sectionRef)

    return () => {
      ctx?.kill()
    }
  }, [height, isTablet, offsetTop, sceneStatus])

  return (
    <Section
      id="time-travel-debug-speed"
      ref={sectionRef}
      className={s.section}
      data-sitemap
      data-sitemap-icon="debug-speed"
      data-sitemap-short-title="Debug"
      data-sitemap-complete-title="Debug at the speed of thought"
    >
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Debug at the speed of thought.', as: 'h2' }}
        subtitle={{
          children:
            'Everyone debugs with print statements. Time travel takes print statements to the next level.',
          className: s.subtitle
        }}
      />
      <div
        style={{ height: isTablet ? 'auto' : SCROLL_TRIGGER_DURATION }}
        ref={spacerRef}
      >
        <Container ref={containerRef} className={s.container}>
          <div className={s.sideTextsContainer}>
            {data.map((d, i) => (
              <SideText key={i} {...d} />
            ))}
          </div>
          {!isTablet && (
            <div className={s.assetsContainer}>
              {data.map((d, i) => (
                <AssetCard key={i} show={i === sceneStatus.showScene}>
                  <d.asset active={i === sceneStatus.activeScene} />
                </AssetCard>
              ))}
            </div>
          )}
          {!isTablet && <span ref={progressBarRef} className={s.progressBar} />}
        </Container>
      </div>
    </Section>
  )
}

const SideText = ({ title, subtitle, description, icon, asset }: dataType) => {
  const isTablet = useTabletLgBreakpoint()

  const [ref, { inView }] = useIntersectionObserver<HTMLDivElement>({
    triggerOnce: false
  })

  const AssetComponent = asset

  return (
    <div
      ref={ref}
      style={{
        height: isTablet ? 'auto' : CARD_HEIGHT
      }}
      className={s.sideText}
    >
      {isTablet && (
        <AssetCard show={inView}>
          <AssetComponent active={inView} />
        </AssetCard>
      )}
      {!isTablet && <Button className={s.sideTextIcon}>{icon}</Button>}
      <p className={s.sideTextSubtitle}>{subtitle}</p>
      <h3 className={s.sideTextTitle}>{title}</h3>
      <p className={s.sideTextDescription}>{description}</p>
    </div>
  )
}

const AssetCard = ({
  children,
  show
}: {
  show?: boolean
  children: React.ReactNode
}) => {
  return (
    <div
      className={clsx(s.card, {
        [s['show'] as string]: show,
        [s['hide'] as string]: !show
      })}
    >
      {children}
    </div>
  )
}

type dataType = {
  title: string
  subtitle: string
  description: string
  icon: React.ReactElement
  asset: React.FC<SceneProps>
}

const data: dataType[] = [
  {
    title: 'Add logs with a single click.',
    subtitle: 'Print Statements',
    description:
      'Console logs are great, but the feedback loop is slow. With Replay, you can add an expression and see the logs in the console in under a second.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.625 6.25L8.125 8.125L5.625 10M9.375 10H11.875H9.375ZM4.375 16.875H15.625C16.1223 16.875 16.5992 16.6775 16.9508 16.3258C17.3025 15.9742 17.5 15.4973 17.5 15V5C17.5 4.50272 17.3025 4.02581 16.9508 3.67417C16.5992 3.32254 16.1223 3.125 15.625 3.125H4.375C3.87772 3.125 3.40081 3.32254 3.04917 3.67417C2.69754 4.02581 2.5 4.50272 2.5 5V15C2.5 15.4973 2.69754 15.9742 3.04917 16.3258C3.40081 16.6775 3.87772 16.875 4.375 16.875Z"
          fill="white"
          fillOpacity="0.16"
        />
        <path
          d="M5.625 6.25L8.125 8.125L5.625 10M9.375 10H11.875M4.375 16.875H15.625C16.1223 16.875 16.5992 16.6775 16.9508 16.3258C17.3025 15.9742 17.5 15.4973 17.5 15V5C17.5 4.50272 17.3025 4.02581 16.9508 3.67417C16.5992 3.32254 16.1223 3.125 15.625 3.125H4.375C3.87772 3.125 3.40081 3.32254 3.04917 3.67417C2.69754 4.02581 2.5 4.50272 2.5 5V15C2.5 15.4973 2.69754 15.9742 3.04917 16.3258C3.40081 16.6775 3.87772 16.875 4.375 16.875Z"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    asset: PrintStatements as React.FC<SceneProps>
  },
  {
    title: 'Jump to any console log.',
    subtitle: 'console',
    description:
      'Has a console log ever left you with more questions than answers? With Replay, you can fast forward to any log and see what was going on.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.5 7.2399C2.5 6.5199 3.2775 6.06906 3.9025 6.42573L9.82583 9.81073C9.96922 9.89276 10.0884 10.0112 10.1713 10.1541C10.2542 10.297 10.2978 10.4593 10.2978 10.6245C10.2978 10.7897 10.2542 10.9519 10.1713 11.0948C10.0884 11.2377 9.96922 11.3562 9.82583 11.4382L3.9025 14.8232C3.75985 14.9047 3.5983 14.9473 3.43402 14.9467C3.26974 14.9461 3.10851 14.9023 2.96647 14.8198C2.82443 14.7372 2.70657 14.6188 2.62471 14.4764C2.54284 14.334 2.49983 14.1725 2.5 14.0082V7.2399ZM10.625 7.2399C10.625 6.5199 11.4025 6.06906 12.0275 6.42573L17.9508 9.81073C18.0942 9.89276 18.2134 10.0112 18.2963 10.1541C18.3792 10.297 18.4228 10.4593 18.4228 10.6245C18.4228 10.7897 18.3792 10.9519 18.2963 11.0948C18.2134 11.2377 18.0942 11.3562 17.9508 11.4382L12.0275 14.8232C11.8849 14.9047 11.7234 14.9472 11.5592 14.9467C11.395 14.9461 11.2338 14.9024 11.0918 14.82C10.9498 14.7375 10.8319 14.6192 10.75 14.4769C10.6681 14.3346 10.625 14.1733 10.625 14.0091V7.2399Z"
          fill="white"
          fillOpacity="0.16"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    asset: Console as React.FC<SceneProps>
  },
  {
    title: 'Stay in the state of flow.',
    subtitle: 'react devtools',
    description:
      'One of the reasons that debugging is harder than developing is the feedback loop is significantly slower. That’s why we’ve coupled instant print statements with IDE grade code search and Browser DevTools.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.5 16V13.5C4.5 13.1936 4.32687 12.9134 4.05279 12.7764L3.5 12.5L2.44591 11.7973C2.14936 11.5996 1.87307 11.3731 1.62105 11.121L1.11038 10.6104C1.03727 10.5373 0.976428 10.4529 0.93019 10.3604L0.875 10.25C0.667893 9.83579 0.835786 9.33211 1.25 9.125C1.41228 9.04386 1.54386 8.91228 1.625 8.75L1.75 8.5C1.91228 8.17544 2.17544 7.91228 2.5 7.75L2.82426 7.58787C2.94127 7.52936 3.06229 7.47924 3.1864 7.43787L4.3345 7.05517C4.44334 7.01889 4.54223 6.95777 4.62336 6.87664C4.84829 6.65171 4.90405 6.30809 4.76179 6.02358L4.62336 5.74672C4.54223 5.58447 4.5 5.40556 4.5 5.22416V4V3.30902C4.5 2.8132 4.78013 2.35993 5.22361 2.1382C5.40537 2.04731 5.6058 2 5.80902 2H6.09262C6.36244 2 6.6305 2.0435 6.88647 2.12882L7.32181 2.27394C7.77193 2.42398 8.20003 2.63336 8.59481 2.89654L9.44699 3.46466C9.48224 3.48816 9.51509 3.51509 9.54505 3.54505C9.79631 3.79631 10.2037 3.79631 10.455 3.54505L10.5 3.5L10.6858 3.31415C10.8948 3.10523 11.1238 2.91745 11.3697 2.75356L11.9583 2.36114C12.3115 2.12566 12.7265 2 13.1511 2H13.2792C13.4255 2 13.5707 1.97643 13.7094 1.93019C14.4222 1.6926 15.1926 2.07781 15.4302 2.79057C15.4764 2.92928 15.5 3.07454 15.5 3.22076V4V5.22416C15.5 5.40556 15.4578 5.58447 15.3766 5.74672L15.2581 5.98377C15.104 6.29206 15.1644 6.66439 15.4081 6.90811C15.469 6.96897 15.5392 7.01962 15.6162 7.05811L16.5 7.5L18 8.5L18.7142 8.97613C19.1631 9.27541 19.3189 9.86214 19.0776 10.3447C19.0262 10.4476 18.9585 10.5415 18.8772 10.6228L18.697 10.803C18.5665 10.9335 18.4579 11.0841 18.3754 11.2491C18.1385 11.7229 17.6962 12.0608 17.1768 12.1646L16.1443 12.3711C15.7378 12.4524 15.3916 12.7169 15.2061 13.0877C15.0725 13.3549 15.0318 13.6591 15.0904 13.952L15.4594 15.7969C15.4864 15.932 15.5 16.0694 15.5 16.2071V16.691C15.5 17.1868 15.2199 17.6401 14.7764 17.8618C14.5946 17.9527 14.3942 18 14.191 18H14C13.6712 18 13.3469 17.9234 13.0528 17.7764L11.5 17C10.6011 16.4007 9.42204 16.4335 8.55778 17.0817L8.30191 17.2736C8.10151 17.4239 7.88219 17.5471 7.64961 17.6402L6.71897 18.0124C6.00854 18.2966 5.19618 18.0443 4.77175 17.4076C4.59456 17.1418 4.5 16.8295 4.5 16.5101V16Z"
          fill="white"
          fillOpacity="0.16"
        />
        <path
          d="M11.8583 10.0033C11.8583 10.4973 11.6621 10.9712 11.3129 11.3206C10.9636 11.67 10.4899 11.8664 9.99583 11.8666C9.50165 11.8666 9.0277 11.6703 8.67826 11.3209C8.32881 10.9714 8.1325 10.4975 8.1325 10.0033C8.1325 9.50926 8.3287 9.03544 8.67796 8.68602C9.02723 8.3366 9.50096 8.14019 9.995 8.13997C10.4892 8.13997 10.9631 8.33629 11.3126 8.68573C11.662 9.03517 11.8583 9.50912 11.8583 10.0033ZM14.065 1.09497C12.9433 1.09497 11.4758 1.89497 9.99167 3.27997C8.50833 1.90247 7.04 1.11164 5.91917 1.11164C5.5775 1.11164 5.26667 1.18914 4.9975 1.3433C3.85167 2.00414 3.595 4.0633 4.18667 6.64747C1.65 7.4308 0 8.6833 0 10.0033C0 11.3283 1.65833 12.5841 4.2025 13.3616C3.61583 15.9558 3.8775 18.0183 5.02583 18.6783C5.2925 18.8341 5.60083 18.9075 5.94417 18.9075C7.065 18.9075 8.53333 18.1075 10.0175 16.7208C11.5008 18.0991 12.9692 18.89 14.09 18.89C14.4317 18.89 14.7425 18.815 15.0117 18.6608C16.1567 18.0008 16.4142 15.9416 15.8225 13.3566C18.35 12.58 20 11.325 20 10.0033C20 8.6783 18.3417 7.42247 15.7975 6.6433C16.3842 4.05164 16.1225 1.98747 14.9742 1.32664C14.7092 1.1733 14.4017 1.0958 14.065 1.09497ZM14.0608 2.0033V2.0083C14.2483 2.0083 14.3992 2.04497 14.5258 2.11414C15.0808 2.43247 15.3217 3.6433 15.1342 5.2008C15.0892 5.58414 15.0158 5.9883 14.9258 6.4008C14.1258 6.20414 13.2542 6.0533 12.3367 5.9558C11.7867 5.20164 11.2158 4.51664 10.6408 3.91664C11.9675 2.6833 13.2133 2.00664 14.0617 2.00414L14.0608 2.0033ZM5.91917 2.01997C6.7625 2.01997 8.01417 2.6933 9.34417 3.91997C8.7725 4.51997 8.2025 5.2008 7.66083 5.95497C6.73833 6.05247 5.86583 6.2033 5.06667 6.4033C4.97333 5.99497 4.90417 5.59997 4.855 5.21997C4.66333 3.6633 4.9 2.4533 5.45 2.1308C5.60833 2.0558 5.78333 2.02414 5.91917 2.01997ZM9.9875 4.56164C10.3667 4.95164 10.7458 5.3883 11.1208 5.86497C10.7542 5.8483 10.3792 5.83664 10 5.83664C9.61667 5.83664 9.2375 5.84497 8.86667 5.86497C9.23333 5.3883 9.6125 4.95247 9.9875 4.56164ZM10 6.74997C10.6167 6.74997 11.2308 6.7783 11.835 6.82747C12.1733 7.31247 12.5033 7.82997 12.8208 8.37747C13.1308 8.9108 13.4125 9.45247 13.6692 9.99914C13.4125 10.545 13.1308 11.0908 12.825 11.6241C12.5083 12.1741 12.1808 12.6975 11.8417 13.1825C11.235 13.235 10.62 13.2641 10 13.2641C9.38333 13.2641 8.76917 13.235 8.165 13.1866C7.82667 12.7016 7.49667 12.1833 7.17917 11.6366C6.86917 11.1033 6.5875 10.5616 6.33083 10.015C6.58333 9.46747 6.86917 8.9208 7.175 8.38664C7.49167 7.83664 7.81917 7.31497 8.15833 6.82997C8.765 6.77664 9.38 6.7483 10 6.7483V6.74997ZM6.97083 6.96164C6.77083 7.2758 6.57083 7.59747 6.38417 7.9283C6.19667 8.2533 6.02167 8.57997 5.855 8.90664C5.63417 8.35997 5.44667 7.81497 5.29167 7.28414C5.825 7.15914 6.3875 7.04747 6.97083 6.96164ZM13.0208 6.96164C13.6 7.04747 14.1583 7.1533 14.6925 7.28414C14.5425 7.8108 14.355 8.35247 14.1425 8.89497C13.9758 8.56997 13.8008 8.24247 13.6092 7.91664C13.4217 7.58997 13.2217 7.27164 13.0217 6.96164H13.0208ZM15.5733 7.52414C15.9767 7.64914 16.36 7.7883 16.7192 7.93914C18.1625 8.5558 19.0958 9.36247 19.0958 10.0025C19.0917 10.6425 18.1583 11.4525 16.715 12.065C16.365 12.215 15.9817 12.35 15.5858 12.4758C15.3525 11.6775 15.0475 10.8458 14.6692 9.99247C15.0442 9.14497 15.3442 8.31747 15.5733 7.52247V7.52414ZM4.41083 7.52747C4.6425 8.32747 4.94833 9.1583 5.3275 10.0108C4.9525 10.8583 4.65083 11.6858 4.4225 12.4808C4.01917 12.3558 3.63583 12.2158 3.28083 12.0641C1.8375 11.45 0.904167 10.6425 0.904167 10.0025C0.904167 9.36247 1.8375 8.5508 3.28083 7.93914C3.63083 7.78914 4.01417 7.65414 4.41083 7.52747ZM14.1425 11.0941C14.3633 11.6416 14.5508 12.1875 14.7058 12.7175C14.1725 12.8483 13.6092 12.9591 13.0258 13.0425C13.2258 12.73 13.4258 12.4075 13.6133 12.0775C13.8008 11.7525 13.975 11.4208 14.1425 11.0941ZM5.855 11.1108C6.02167 11.4375 6.19667 11.7633 6.38833 12.09C6.58 12.415 6.77583 12.7333 6.97583 13.0425C6.39667 12.9575 5.83833 12.8508 5.30417 12.7208C5.45417 12.1958 5.6425 11.6525 5.85417 11.11L5.855 11.1108ZM14.9333 13.6C15.0267 14.0108 15.1 14.4066 15.145 14.7858C15.3367 16.3425 15.1 17.5525 14.55 17.8758C14.4275 17.9508 14.2683 17.9825 14.0808 17.9825C13.2375 17.9825 11.9858 17.31 10.6558 16.0825C11.2275 15.4825 11.7975 14.8025 12.3392 14.0491C13.2617 13.9508 14.1342 13.8 14.9333 13.6ZM5.075 13.6083C5.875 13.8033 6.74667 13.9541 7.66417 14.0516C8.21417 14.8058 8.785 15.4908 9.36 16.09C8.03083 17.3258 6.78333 18.0025 5.935 18.0025C5.75167 17.9983 5.59667 17.9608 5.47417 17.8925C4.91917 17.5758 4.67833 16.3641 4.86583 14.8066C4.91083 14.4233 4.985 14.02 5.075 13.6083ZM8.875 14.1416C9.24167 14.1583 9.61667 14.17 9.99583 14.17C10.3792 14.17 10.7583 14.1616 11.1292 14.1416C10.7625 14.6183 10.3833 15.0541 10.0083 15.4458C9.62917 15.0541 9.25 14.6183 8.875 14.1416Z"
          fill="white"
        />
      </svg>
    ),
    asset: ReactDevtools as React.FC<SceneProps>
  }
]
