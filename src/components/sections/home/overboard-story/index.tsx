import { clearProps, DURATION, Flip, gsap } from 'lib/gsap'
import get from 'lodash/get'
import React, { forwardRef, useCallback, useRef, useState } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import {
  Marker,
  ProgressAPI,
  ProgressBar
} from '~/components/common/progress-bar'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { IsoLogo } from '~/components/primitives/logo'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useViewportSize } from '~/hooks/use-viewport-size'
import { isDev } from '~/lib/constants'
import { padZeroesToNumber } from '~/lib/utils'
import avatarOne from '~/public/images/home/avatar-1.webp'
import avatarTwo from '~/public/images/home/avatar-2.webp'
import avatarThree from '~/public/images/home/avatar-3.webp'

import { Code, CodeRef } from './code'
import {
  buildUuids,
  IdentifiedNode,
  identifyNodes,
  ReactNode,
  useInspectElement
} from './common'
import { Debugger } from './debugger'
import { DevTools, DevToolsProps, tabs } from './devtools'
import {
  OverboardStore,
  OverboardStoreProps,
  StoreRef
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

const timelineDuration = 10
const padding = 16
const headerHeight = 70
const timelineHeight = 90
const printMarkers: Marker[] = [{ position: 50 }]
const storeId = 'hero'
const devtoolsTabs: (keyof typeof tabs)[] = ['console', 'react']

const codeBlock = `export function handleSubmit(event) {
  event.preventDefault()

  const form = event.currentTarget
  const data = new FormData(form)
  const formData = Object.fromEntries(data.entries())
  const body = JSON.stringify(formData)
  const response = await fetch(form.action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  })

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage)
  }
}`

const reactTree = identifyNodes(
  buildUuids({
    type: 'App',
    inspectBlockId: 'app',
    children: [
      {
        type: 'Hoverboard',
        inspectBlockId: 'hoverboard',
        props: {
          rotation: 0,
          isAnimated: true,
          velocity: 20,
          color: 'red'
        }
      },
      {
        type: 'PurchaseForm',
        inspectBlockId: 'purchase-form',
        children: [
          {
            type: 'PurchaseButton',
            inspectBlockId: 'submit',
            props: {
              hasError: true
            }
          }
        ]
      }
    ]
  })
)

export function ReplayApplication() {
  const [activeDevtoolTab, setActiveDevtoolTab] =
    useState<DevToolsProps<keyof typeof tabs>['panel']>('react')
  const [currentTime, setCurrentTime] = useState(0)
  const { isDesktop } = useDeviceDetect()
  const progressBarRef = useRef<ProgressAPI>(null)
  const { width } = useViewportSize()

  /* Store */
  const [storeState, setStoreState] =
    useState<OverboardStoreProps['state']>('idle')
  const [overboardColor, setOverboardColor] =
    useState<OverboardStoreProps['overboardColor']>('red')

  /* React */
  const [activeComponent, setActiveComponent] =
    useState<IdentifiedNode<ReactNode> | null>()
  const [hoveredComponentBlockId, setHoveredComponentBlockId] = useState<
    string | null
  >(null)

  /* Console */
  const [showPrints, setShowPrints] = useState(false)
  const [currentHit, setCurrentHit] = useState(0)

  /* Refs */
  const applicationRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const targetStoreRef = useRef<HTMLDivElement>(null)
  const smallCenteredStoreRef = useRef<HTMLDivElement>(null)
  const smallRightStoreAreaRef = useRef<HTMLDivElement>(null)
  const viewToggleRef = useRef<HTMLDivElement>(null)
  const codeAreaRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<CodeRef>(null)
  const devtoolsPanelRef = useRef<HTMLDivElement>(null)
  const devtoolsAreaRef = useRef<HTMLDivElement>(null)
  const smallRightCenteredStoreRef = useRef<HTMLDivElement>(null)
  const storeApiRef = useRef<StoreRef>(null)
  const floorAndRotateTimeline = useRef<GSAPTimeline | null>(null)

  useInspectElement(hoveredComponentBlockId, targetStoreRef.current)

  useIsomorphicLayoutEffect(() => {
    if (
      /* Check device */
      !isDesktop ||
      /* Required refs */
      !applicationRef.current ||
      !smallCenteredStoreRef.current ||
      !sectionRef.current ||
      !targetStoreRef.current ||
      !smallRightStoreAreaRef.current ||
      !viewToggleRef.current ||
      !devtoolsPanelRef.current ||
      !devtoolsAreaRef.current ||
      !codeRef.current?.elm ||
      !progressBarRef.current
    ) {
      return
    }

    const _applicationRef = applicationRef.current
    const _targetStoreRef = targetStoreRef.current
    const _devtoolsPanelRef = devtoolsPanelRef.current
    const storeSelector = gsap.utils.selector(targetStoreRef.current)
    const codeSelector = gsap.utils.selector(codeRef.current.elm)

    /* 
      NodeLine is a function because when we change tabs we loose
      reference to the panel we need to query the element again.
    */
    const nodeLine = () =>
      gsap.utils.selector(devtoolsPanelRef.current)('#node-line')
    const addPrintButton = codeSelector('#dev-tools-add-print')
    const printTutorial = codeSelector('#dev-tools-print-tutorial')
    const printPanel = codeSelector('#dev-tools-print-panel')
    const storeLogo = storeSelector(`#overboard-store-logo-${storeId}`)
    const storeContent = storeSelector(`#overboard-store-inner-${storeId}`)
    const storePurchase = storeSelector(`#overboard-store-purchase-${storeId}`)
    const storeColors = storeSelector(`#overboard-store-colors-${storeId}`)

    /* Board and floor movement */
    const storeVariables = {
      floorDisplacement: 0,
      hoverboardWaveProgress: 0,
      hoverboardAnimationMaxArg: 100
    }

    const floorAndRotateTimelineDuration = 16
    floorAndRotateTimeline.current = gsap
      .timeline({ repeat: -1 })
      .to(storeVariables, {
        hoverboardWaveProgress:
          storeVariables.hoverboardAnimationMaxArg *
          floorAndRotateTimelineDuration,
        floorDisplacement: 1,
        duration: floorAndRotateTimelineDuration,
        ease: 'linear',
        onUpdate: () => {
          const nextProgress =
            storeVariables.hoverboardWaveProgress %
            storeVariables.hoverboardAnimationMaxArg

          storeApiRef.current?.grid?.move(storeVariables.floorDisplacement)
          storeApiRef.current?.hoverboard?.wave(nextProgress)
        }
      })

    const flipTimeline1 = Flip.fit(
      targetStoreRef.current,
      smallCenteredStoreRef.current,
      {
        simple: false,
        duration: 2
      }
    )

    const flipTimeline2 = Flip.fit(
      targetStoreRef.current,
      smallRightCenteredStoreRef.current,
      {
        simple: false,
        duration: 2
      }
    )

    const flipTimeline3 = Flip.fit(
      targetStoreRef.current,
      smallRightStoreAreaRef.current,
      {
        simple: false,
        duration: 2
      }
    )

    const flipTimeline4 = Flip.fit(
      devtoolsPanelRef.current,
      devtoolsAreaRef.current,
      {
        simple: false,
        duration: 2
      }
    )

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: targetStoreRef.current,
        endTrigger: sectionRef.current,
        anticipatePin: 1,
        markers: isDev,
        id: 'overboard-story',
        scrub: 0.2,
        pin: sectionRef.current,
        start: 'center center',
        end: 'bottom+=1000vh top',
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

    const printTimelineProgress = { progress: 0 }

    timeline
      .to({}, { duration: 4 })
      .add(() => {
        setOverboardColor('red')
      })
      .add(() => {
        setOverboardColor('green')
      })
      .to(storeColors, {
        opacity: 0,
        duration: 3,
        delay: 2,
        yPercent: -20
      })
      .add(() => {
        setStoreState('idle')
      })
      .fromTo(
        storePurchase,
        {
          opacity: 0,
          yPercent: 20
        },
        { opacity: 1, yPercent: -50, duration: 3 },
        '<'
      )
      .add(() => {
        setStoreState('loading')
      })
      .add(() => {
        setStoreState('error')
        progressBarRef.current?.update(100)
        setCurrentTime(timelineDuration)
      }, '+=4')

      /* Viewer */
      .add(flipTimeline1 as GSAPTimeline, '+=4')
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
      .to(
        storeLogo,
        {
          opacity: 0,
          yPercent: -40,
          duration: 3
        },
        '<'
      )
      .to(
        storePurchase,
        {
          yPercent: -50,
          duration: 3
        },
        '<'
      )
      .to(
        storeContent,
        {
          y: 0,
          duration: 3
        },
        '<'
      )
      .add(() => {
        floorAndRotateTimeline.current?.play()
      })
      .add(() => {
        floorAndRotateTimeline.current?.pause()
      })
      .fromTo(
        viewToggleRef.current,
        { clipPath: 'inset(4px 50% 4px 4px round 4px)' },
        { clipPath: 'inset(4px 4px 4px 50% round 4px)' }
      )

      /* Devtools */
      .to({}, { duration: 3 })
      .add(flipTimeline2 as GSAPTimeline)
      .to(
        devtoolsPanelRef.current,
        {
          opacity: 1,
          duration: 2
        },
        '<'
      )
      .call(() => {
        setHoveredComponentBlockId(null)
        setActiveComponent(null)
      }, undefined)
      .call(
        () => {
          nodeLine()?.[0]?.classList.toggle('hovered')
          setHoveredComponentBlockId('app')
        },
        undefined,
        '+=1'
      )
      .call(
        () => {
          nodeLine()?.[0]?.classList.toggle('hovered')
          nodeLine()?.[1]?.classList.toggle('hovered')
          setHoveredComponentBlockId('hoverboard')
        },
        undefined,
        '+=1'
      )
      .call(
        () => {
          setActiveComponent(get(reactTree, 'children.0'))
        },
        undefined,
        '+=1'
      )
      .call(
        () => {
          nodeLine()?.[1]?.classList.toggle('hovered')
          nodeLine()?.[3]?.classList.toggle('hovered')
          setHoveredComponentBlockId('submit')
        },
        undefined,
        '+=1.5'
      )
      .call(
        () => {
          setActiveComponent(get(reactTree, 'children.1.children.0'))
        },
        undefined,
        '+=1'
      )
      .call(
        () => {
          nodeLine()?.[7]?.classList.toggle('hovered')
          setHoveredComponentBlockId(null)
        },
        undefined,
        '>'
      )
      .add(flipTimeline3 as GSAPTimeline, '+=2')

      /* Code */
      .add(() => {
        setActiveDevtoolTab('react')
      }, '<')
      .add(flipTimeline4 as GSAPTimeline, '<')
      .to(
        codeRef.current.elm,
        {
          opacity: 1,
          duration: 2
        },
        '<'
      )
      .add(() => {
        setActiveDevtoolTab('console')
        floorAndRotateTimeline.current?.seek(0, false)
        setStoreState('idle')
        progressBarRef.current?.update(20)
        setCurrentTime(timelineDuration * 0.2)
      })
      .fromTo(
        addPrintButton,
        {
          x: -5,
          opacity: 0,
          scale: 0.8
        },
        {
          x: 0,
          opacity: 1,
          scale: 1
        }
      )
      .fromTo(
        printTutorial,
        {
          xPercent: -10,
          opacity: 0,
          scale: 0.8
        },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1
        },
        '<+=0.2'
      )
      .to(addPrintButton, {
        scale: 1.1,
        delay: 0.5,
        duration: DURATION / 3
      })
      .to(addPrintButton, {
        scale: 1,
        duration: DURATION / 3
      })
      .to(
        printTutorial,
        {
          xPercent: -10,
          opacity: 0,
          scale: 0.8
        },
        '<+=0.5'
      )
      .call(
        () => {
          addPrintButton[0]?.classList?.remove?.('active')
          setShowPrints(false)
        },
        undefined,
        '>-50%'
      )
      .call(
        () => {
          addPrintButton[0]?.classList?.add?.('active')
          setShowPrints(true)
        },
        undefined,
        '>-50%'
      )
      .fromTo(
        printPanel,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0
        }
      )
      .fromTo(
        printTimelineProgress,
        {
          progress: 20
        },
        {
          progress: 100,
          duration: 10,
          ease: 'linear',
          onStart: () => {
            setStoreState('idle')
            progressBarRef.current?.update(20)
            setCurrentTime(timelineDuration * 0.2)
          },
          onUpdate() {
            const progress = printTimelineProgress.progress

            if (progress > 25 && progress < 50) {
              setStoreState('loading')
            } else if (progress < 25) {
              setStoreState('idle')
            }

            floorAndRotateTimeline.current?.seek(
              (floorAndRotateTimelineDuration / 4) * this.progress(),
              false
            )
            ;(codeRef.current?.timeline as ProgressAPI)?.update(progress)
            progressBarRef.current?.update(progress)
            setCurrentTime(timelineDuration * (progress / 100))
          }
        }
      )

    return () => {
      /* ScrollTrigger Cleanup */
      scrollTo(0, 0)

      floorAndRotateTimeline.current?.kill()
      timeline.scrollTrigger?.kill()
      timeline.kill()

      document.documentElement.classList.remove('hide-header')

      /* Flip Cleanup */
      /* Just clearing transforms bc otherwise we remove some important variables */
      const propsToClear = 'transform,width,height'
      clearProps(_targetStoreRef, propsToClear)
      clearProps(_devtoolsPanelRef, propsToClear)
      clearProps(_applicationRef, propsToClear)
    }
  }, [isDesktop, width])

  const handleHit = useCallback((hit: number) => {
    setCurrentHit((prevValue) => {
      if (prevValue < hit) {
        setStoreState('error')
      }
      return hit
    })
  }, [])

  const devtoolProps = {
    console: {
      currentHit,
      onCurrentHitChange: () => undefined,
      disableTravel: true,
      logs: [
        {
          hits: 1,
          marker: 'transparent',
          content: ['Hello World']
        },
        {
          hits: 1,
          marker: 'transparent',
          prepend: 'response',
          content: [
            {
              ok: false,
              status: 400,
              url: 'api/purchase'
            }
          ],
          hide: !showPrints
        }
      ]
    },
    react: {
      tree: reactTree,
      activeComponent,
      onHoverComponent: setHoveredComponentBlockId,
      onActiveComponentChange: setActiveComponent
    }
  }

  return (
    <Section
      className={s['section']}
      /* @ts-ignore */
      style={{ '--padding': padding + 'px' }}
      ref={sectionRef}
    >
      <AspectBox
        ratio={1920 / 1080}
        className={s['store-container']}
        ref={targetStoreRef}
      >
        <OverboardStore
          storeId={storeId}
          state={storeState}
          overboardColor={overboardColor}
          style={{ height: '100%' }}
          mode="full"
          inspectMode="react"
          ref={storeApiRef}
        />
      </AspectBox>

      <AspectBox className={s['app-container']} ratio={1920 / 1080}>
        <AspectBox
          ratio={1360 / 910}
          className={s['app']}
          /* @ts-ignore */
          style={{ '--padding': padding + 'px' }}
          ref={applicationRef}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 32px',
              backgroundColor: 'white',
              height: headerHeight,
              borderBottom: '1px solid var(--color-gray-lighter)'
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

          <div
            style={{
              position: 'relative',
              display: 'flex',
              height: `calc(100% - ${
                padding * 2
              }px - ${headerHeight}px - ${timelineHeight}px)`,
              flex: 1
            }}
          >
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
                </defs>
              </svg>
            </div>
            <div className={s['grid']}>
              <AspectBox
                ratio={1920 / 1080}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '49%'
                }}
                ref={smallRightCenteredStoreRef}
              />
              <AspectBox
                ratio={1920 / 1080}
                style={{
                  gridArea: '1 / 1 / 3 / 6',
                  alignSelf: 'center'
                }}
                ref={smallCenteredStoreRef}
              />
              <div
                style={{
                  gridArea: 'code',
                  position: 'relative'
                }}
                ref={codeAreaRef}
              >
                <Code
                  filename="PurchaseForm.tsx"
                  printPanelConfig={{
                    print: '"response", response',
                    markers: printMarkers,
                    printLineTarget: 14,
                    timelineType: 'justUi',
                    currentMarker: 'transparent',
                    onHit: handleHit,
                    currentHit
                  }}
                  className={s['code']}
                  printIndicators={{
                    1: 'not-available',
                    2: 'available',
                    4: 'available',
                    5: 'available',
                    6: 'available',
                    7: 'available',
                    8: 'available',
                    9: 'not-available',
                    10: 'not-available',
                    11: 'not-available',
                    15: 'available',
                    16: 'available'
                  }}
                  code={codeBlock}
                  ref={codeRef}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    opacity: 0
                  }}
                  ref={devtoolsPanelRef}
                >
                  <DevTools
                    onlyShow={devtoolsTabs}
                    panelWrapperProps={{ style: { flex: 1 } }}
                    style={{ height: '100%' }}
                    onPanelTabChange={(tab) => {
                      // eslint-disable-next-line no-prototype-builtins
                      if (devtoolProps.hasOwnProperty(tab)) {
                        setActiveDevtoolTab(tab)
                      }
                    }}
                    panel={activeDevtoolTab}
                    // @ts-ignore
                    panelProps={devtoolProps[activeDevtoolTab]}
                  />
                </div>
              </div>
              <div
                style={{
                  gridArea: 'store'
                }}
                ref={smallRightStoreAreaRef}
              />
              <div style={{ gridArea: 'devtools' }} ref={devtoolsAreaRef} />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 24,
              height: timelineHeight
            }}
          >
            <svg
              width="41"
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
                solid
                animated={false}
                progress={0}
                primaryColor="#01ACFD"
                secondaryColor="#D9D9D9"
                markers={showPrints ? printMarkers : undefined}
                markerSize={14}
                markerActiveColor="var(--color-pink-crayon)"
                ref={progressBarRef}
              />
            </div>

            <span
              style={{
                background: '#E6E6E6',
                borderRadius: 'var(--border-radius-full)',
                padding: '2px 12px',
                fontVariantNumeric: 'tabular-nums',
                fontSize: '12px'
              }}
            >
              0:{padZeroesToNumber(Number(currentTime.toFixed(0)), 2)} / 0:
              {padZeroesToNumber(timelineDuration, 2)}
            </span>
          </div>
        </AspectBox>
      </AspectBox>
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

export { Code, Debugger, DevTools, OverboardStore }
