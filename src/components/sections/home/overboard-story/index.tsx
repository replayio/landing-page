import { Flip, gsap } from 'lib/gsap'
import React, { forwardRef, useRef, useState } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import { ProgressAPI, ProgressBar } from '~/components/common/progress-bar'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { IsoLogo } from '~/components/primitives/logo'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { isDev } from '~/lib/constants'
import avatarOne from '~/public/images/home/avatar-1.webp'
import avatarTwo from '~/public/images/home/avatar-2.webp'
import avatarThree from '~/public/images/home/avatar-3.webp'

import { Code } from './code'
import { Debugger } from './debugger'
import { DevTools, DevToolsProps, tabs } from './devtools'
import {
  OverboardStore as NewOverboardStore,
  OverboardStore
} from './overboard-store'
import s from './overboard-story.module.scss'

const ViewToggle = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        backgroundColor: '#F5F5F5',
        color: '#464646',
        padding: 4,
        borderRadius: 8,
        fontSize: 14,
        textAlign: 'center'
      }}
    >
      <div
        ref={ref}
        aria-hidden={true}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'inline-grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          padding: 4,
          borderRadius: 8,
          backgroundColor: '#464646',
          color: '#FFFFFF',
          transition: 'clip-path 0.16s ease-out'
        }}
      >
        <span
          style={{
            gridArea: '1 / 1',
            padding: '4px 16px'
          }}
        >
          Viewer
        </span>
        <span
          style={{
            gridArea: '1 / 2',
            padding: '4px 16px'
          }}
        >
          DevTools
        </span>
      </div>

      <button
        onClick={() =>
          window.scrollTo({
            top: document.getElementById('overboard-story')?.offsetTop,
            behavior: 'smooth'
          })
        }
        style={{
          all: 'unset',
          gridColumn: 1,
          gridRow: 1,
          padding: '4px 16px'
        }}
      >
        Viewer
      </button>

      <button
        onClick={() =>
          window.scrollTo({
            top:
              (document.getElementById('overboard-story')?.offsetTop ?? 0) +
              window.innerHeight,
            behavior: 'smooth'
          })
        }
        style={{
          all: 'unset',
          gridColumn: 2,
          gridRow: 1,
          padding: '4px 16px'
        }}
      >
        DevTools
      </button>
    </div>
  )
})

export function ReplayApplication() {
  const padding = 16
  const frameHeight = `calc(100vh - ${padding * 2}px)`
  const progressBarRef = useRef<ProgressAPI>(null)
  const [activeDevtoolTab, setActiveDevtoolTab] =
    useState<DevToolsProps<keyof typeof tabs>['panel']>('console')

  const applicationRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const targetStoreRef = useRef<HTMLDivElement>(null)
  const smallCenteredStoreRef = useRef<HTMLDivElement>(null)
  const smallRightStoreRef = useRef<HTMLDivElement>(null)
  const viewToggleRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (
      !applicationRef.current ||
      !smallCenteredStoreRef.current ||
      !sectionRef.current ||
      !targetStoreRef.current ||
      !smallRightStoreRef.current ||
      !viewToggleRef.current
    ) {
      return
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: targetStoreRef.current,
        endTrigger: sectionRef.current,
        markers: isDev,
        id: 'overboard-story',
        scrub: true,
        pin: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => {
          document.documentElement.classList.add('hide-header')
        },
        onEnterBack: () => {
          document.documentElement.classList.add('hide-header')
        },
        onLeave: () => {
          document.documentElement.classList.remove('hide-header')
        },
        onLeaveBack: () => {
          document.documentElement.classList.remove('hide-header')
        }
      }
    })

    const flipTimeline1 = Flip.fit(
      targetStoreRef.current,
      smallCenteredStoreRef.current,
      {
        simple: true,
        duration: 2
      }
    )

    const flipTimeline2 = Flip.fit(
      targetStoreRef.current,
      smallRightStoreRef.current,
      {
        simple: true,
        duration: 2
      }
    )

    const timelineProgress = { progress: 0 }

    timeline
      .add(flipTimeline1 as GSAPTimeline)
      .fromTo(
        applicationRef.current,
        {
          scale: 0.9,
          yPercent: 20,
          opacity: 0
        },
        {
          scale: 1,
          yPercent: 0,
          opacity: 1,
          duration: 2
        },
        '<'
      )
      .fromTo(
        viewToggleRef.current,
        { clipPath: 'inset(4px 50% 4px 4px round 4px)' },
        { clipPath: 'inset(4px 4px 4px 50% round 4px)' }
      )
      .add(flipTimeline2 as GSAPTimeline, '+=2')
      .to(timelineProgress, {
        progress: 100,
        duration: 10,
        onUpdate: () => {
          progressBarRef.current?.update(timelineProgress.progress)
        }
      })

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, [])

  return (
    <Section style={{ position: 'relative' }} ref={sectionRef}>
      <AspectBox
        ratio={1920 / 1080}
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: 10
        }}
        ref={targetStoreRef}
      >
        <OverboardStore
          style={{ height: '100%' }}
          mode="color-picker"
          inspectMode="html"
        />
      </AspectBox>

      <div
        ref={applicationRef}
        style={{
          margin: `${padding}px 0`,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          height: frameHeight,
          opacity: 0,
          overflow: 'hidden',
          borderRadius: 16,
          border: '1px solid #DCDCDC',
          background: '#F2F2F2'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 32px',
            backgroundColor: 'white',
            borderBottom: '1px solid #DCDCDC'
          }}
        >
          <div style={{ width: 25, color: 'var(--color-pink-crayon)' }}>
            <IsoLogo />
          </div>
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: 32,
              gap: 8,
              marginLeft: 'auto',
              marginRight: 24
            }}
          >
            <img src={avatarOne.src} style={{ borderRadius: '100%' }} />
            <img src={avatarTwo.src} style={{ borderRadius: '100%' }} />
            <img src={avatarThree.src} style={{ borderRadius: '100%' }} />
          </div>
          <ViewToggle ref={viewToggleRef} />
        </div>

        <div style={{ display: 'flex' }}>
          <div className={s['toolbar']}>
            <svg
              width="24"
              height="218"
              viewBox="0 0 24 218"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_806_120)">
                <path
                  d="M11.7419 2.32324C6.47972 2.32324 2.20898 6.59398 2.20898 11.8561C2.20898 17.1183 6.47972 21.389 11.7419 21.389C17.004 21.389 21.2748 17.1183 21.2748 11.8561C21.2748 6.59398 17.004 2.32324 11.7419 2.32324ZM12.6952 16.6226H10.7886V10.9029H12.6952V16.6226ZM12.6952 8.99627H10.7886V7.08969H12.6952V8.99627Z"
                  fill="#BCBCBC"
                />
              </g>
              <g clipPath="url(#clip1_806_120)">
                <path
                  d="M19.3682 56.3394H18.4149V63.6723C18.4149 64.1765 17.9859 64.589 17.4616 64.589H6.02214V65.5056C6.02214 66.5139 6.8801 67.3388 7.92872 67.3388H17.4616L21.2748 71.0053V58.1726C21.2748 57.1643 20.4168 56.3394 19.3682 56.3394ZM16.5083 60.9225V54.5061C16.5083 53.4978 15.6504 52.6729 14.6018 52.6729H4.11556C3.06695 52.6729 2.20898 53.4978 2.20898 54.5061V66.4222L6.02214 62.7557H14.6018C15.6504 62.7557 16.5083 61.9308 16.5083 60.9225Z"
                  fill="#BCBCBC"
                />
              </g>
              <g clipPath="url(#clip2_806_120)">
                <path
                  d="M13.07 102.428C12.7375 102.096 12.2912 101.912 11.8275 101.912H5.55371C4.59121 101.912 3.80371 102.7 3.80371 103.662V117.662C3.80371 118.625 4.58246 119.412 5.54496 119.412H16.0537C17.0162 119.412 17.8037 118.625 17.8037 117.662V107.888C17.8037 107.425 17.62 106.978 17.2875 106.655L13.07 102.428ZM13.4287 115.912H8.17871C7.69746 115.912 7.30371 115.518 7.30371 115.037C7.30371 114.556 7.69746 114.162 8.17871 114.162H13.4287C13.91 114.162 14.3037 114.556 14.3037 115.037C14.3037 115.518 13.91 115.912 13.4287 115.912ZM13.4287 112.412H8.17871C7.69746 112.412 7.30371 112.018 7.30371 111.537C7.30371 111.056 7.69746 110.662 8.17871 110.662H13.4287C13.91 110.662 14.3037 111.056 14.3037 111.537C14.3037 112.018 13.91 112.412 13.4287 112.412ZM11.6787 107.162V103.225L16.4912 108.037H12.5537C12.0725 108.037 11.6787 107.643 11.6787 107.162Z"
                  fill="#BCBCBC"
                />
              </g>
              <g clipPath="url(#clip3_806_120)">
                <path
                  d="M19.5537 158.656C19.5537 163.486 15.6337 167.406 10.8037 167.406C5.97371 167.406 2.05371 163.486 2.05371 158.656C2.05371 157.615 2.24621 156.626 2.57871 155.699L4.22371 156.294C3.95246 157.029 3.80371 157.825 3.80371 158.656C3.80371 162.515 6.94496 165.656 10.8037 165.656C14.6625 165.656 17.8037 162.515 17.8037 158.656C17.8037 154.798 14.6625 151.656 10.8037 151.656C9.97246 151.656 9.18496 151.805 8.44996 152.076L7.85496 150.423C8.78246 150.099 9.77121 149.906 10.8037 149.906C15.6337 149.906 19.5537 153.826 19.5537 158.656ZM5.11621 151.656C4.38996 151.656 3.80371 152.243 3.80371 152.969C3.80371 153.695 4.38996 154.281 5.11621 154.281C5.84246 154.281 6.42871 153.695 6.42871 152.969C6.42871 152.243 5.84246 151.656 5.11621 151.656ZM16.0537 158.656C16.0537 161.553 13.7 163.906 10.8037 163.906C7.90746 163.906 5.55371 161.553 5.55371 158.656C5.55371 155.76 7.90746 153.406 10.8037 153.406C13.7 153.406 16.0537 155.76 16.0537 158.656ZM9.92871 156.031H8.17871V161.281H9.92871V156.031ZM13.4287 156.031H11.6787V161.281H13.4287V156.031Z"
                  fill="#BCBCBC"
                />
              </g>
              <g clipPath="url(#clip4_806_120)">
                <path
                  d="M13.8662 208.399H13.175L12.93 208.163C13.7875 207.166 14.3037 205.871 14.3037 204.462C14.3037 201.321 11.7575 198.774 8.61621 198.774C5.47496 198.774 2.92871 201.321 2.92871 204.462C2.92871 207.603 5.47496 210.149 8.61621 210.149C10.025 210.149 11.32 209.633 12.3175 208.776L12.5537 209.021V209.712L16.9287 214.078L18.2325 212.774L13.8662 208.399V208.399ZM8.61621 208.399C6.43746 208.399 4.67871 206.641 4.67871 204.462C4.67871 202.283 6.43746 200.524 8.61621 200.524C10.795 200.524 12.5537 202.283 12.5537 204.462C12.5537 206.641 10.795 208.399 8.61621 208.399Z"
                  fill="#BCBCBC"
                />
              </g>
              <defs>
                <clipPath id="clip0_806_120">
                  <rect
                    width="22.8789"
                    height="22.8789"
                    fill="white"
                    transform="translate(0.303711 0.416992)"
                  />
                </clipPath>
                <clipPath id="clip1_806_120">
                  <rect
                    width="22.8789"
                    height="22.8789"
                    fill="white"
                    transform="translate(0.303711 50.29)"
                  />
                </clipPath>
                <clipPath id="clip2_806_120">
                  <rect
                    width="21"
                    height="21"
                    fill="white"
                    transform="translate(0.303711 100.162)"
                  />
                </clipPath>
                <clipPath id="clip3_806_120">
                  <rect
                    width="21"
                    height="21"
                    fill="white"
                    transform="translate(0.303711 148.156)"
                  />
                </clipPath>
                <clipPath id="clip4_806_120">
                  <rect
                    width="21"
                    height="21"
                    fill="white"
                    transform="translate(0.303711 196.149)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={s['grid']}>
            <AspectBox
              ratio={1920 / 1080}
              style={{
                gridArea: '1 / 2 / 3 / 5',
                alignSelf: 'center'
              }}
              ref={smallCenteredStoreRef}
            />
            <div style={{ gridArea: 'code' }}>
              <Code className={s['code']} />
            </div>
            <div
              style={{
                gridArea: 'store'
              }}
              ref={smallRightStoreRef}
            />
            <div style={{ gridArea: 'devtools' }}>
              <DevTools
                panel={activeDevtoolTab}
                onPanelTabChange={(tab) => setActiveDevtoolTab(tab)}
                panelProps={{
                  currentHit: 0,
                  logs: [],
                  disableTravel: true,
                  onCurrentHitChange: () => undefined
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 24
          }}
        >
          <svg
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20.3979" cy="20.5102" r="16.5141" fill="#01ACFD" />
            <path
              d="M27.3028 19.2853L22.4846 16.5263L17.6663 13.7674C17.4573 13.6478 17.2203 13.5849 16.9791 13.585C16.7378 13.585 16.5008 13.648 16.2919 13.7676C16.083 13.8873 15.9095 14.0593 15.7888 14.2665C15.6682 14.4737 15.6046 14.7087 15.6045 14.948V25.9837C15.6046 26.2229 15.6681 26.458 15.7888 26.6652C15.9095 26.8724 16.083 27.0444 16.2919 27.164C16.5008 27.2837 16.7378 27.3467 16.979 27.3467C17.2203 27.3468 17.4573 27.2839 17.6663 27.1643L22.4846 24.4054L27.3028 21.6465C27.5118 21.5268 27.6853 21.3547 27.8059 21.1475C27.9266 20.9403 27.9901 20.7052 27.9901 20.4659C27.9901 20.2266 27.9266 19.9915 27.8059 19.7843C27.6853 19.577 27.5118 19.4049 27.3028 19.2853V19.2853Z"
              fill="#F9F9FA"
            />
          </svg>

          <div style={{ flex: 1, margin: '0 20px' }}>
            <ProgressBar
              animated={false}
              progress={0}
              primaryColor="#01ACFD"
              secondaryColor="#D9D9D9"
              ref={progressBarRef}
            />
          </div>

          <span
            style={{
              background: '#E6E6E6',
              borderRadius: 'var(--border-radius-full)',
              padding: '2px 12px',
              fontSize: '12px'
            }}
          >
            0:05 / 0:05
          </span>
        </div>
      </div>
    </Section>
  )
}

export function OverboardStory() {
  return (
    <Container size="lg">
      <ReplayApplication />
    </Container>
  )
}

export { Code, Debugger, DevTools, NewOverboardStore }
