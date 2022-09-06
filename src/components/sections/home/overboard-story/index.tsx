import clsx from 'clsx'
import { Elastic } from 'gsap'
import { clearProps, DURATION, Flip, gsap, SplitText } from 'lib/gsap'
import get from 'lodash/get'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import {
  Marker as ProgressMarker,
  ProgressAPI,
  ProgressBar
} from '~/components/common/progress-bar'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { IsoLogo } from '~/components/primitives/logo'
import { Marker as ConsoleMarker } from '~/components/sections/home/overboard-story/devtools/console'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useViewportSize } from '~/hooks/use-viewport-size'
import { padZeroesToNumber } from '~/lib/utils'
import avatarOne from '~/public/images/home/avatar-1.webp'
import avatarTwo from '~/public/images/home/avatar-2.jpeg'

import { Code, CodeRef } from './code'
import { CommentModule } from './comment-module'
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
        backgroundColor: '#d9d9d9',
        color: '#00000080',
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
          backgroundColor: 'white',
          color: '#38383d',
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

const RecSvg = () => (
  <svg
    width="86"
    height="40"
    viewBox="0 0 86 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx('record', s['record'])}
  >
    <rect className={s['bg']} width="86" height="40" rx="8" fill="#F41C52" />
    <path
      d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className={s['circle']}
      d="M20 26C23.3137 26 26 23.3137 26 20C26 16.6863 23.3137 14 20 14C16.6863 14 14 16.6863 14 20C14 23.3137 16.6863 26 20 26Z"
      fill="white"
    />
    <path
      d="M39.7614 27V12.4545H44.6761C45.8125 12.4545 46.7453 12.6487 47.4744 13.0369C48.2036 13.4205 48.7434 13.9484 49.0938 14.6207C49.4441 15.2931 49.6193 16.0578 49.6193 16.9148C49.6193 17.7718 49.4441 18.5317 49.0938 19.1946C48.7434 19.8575 48.206 20.3783 47.4815 20.7571C46.7571 21.1312 45.8314 21.3182 44.7045 21.3182H40.7273V19.7273H44.6477C45.4242 19.7273 46.0492 19.6136 46.5227 19.3864C47.0009 19.1591 47.3466 18.8371 47.5597 18.4205C47.7775 17.9991 47.8864 17.4972 47.8864 16.9148C47.8864 16.3324 47.7775 15.8234 47.5597 15.3878C47.3419 14.9522 46.9938 14.616 46.5156 14.3793C46.0374 14.1378 45.4053 14.017 44.6193 14.017H41.5227V27H39.7614ZM46.608 20.4659L50.1875 27H48.142L44.6193 20.4659H46.608ZM52.5543 27V12.4545H61.3327V14.017H54.3157V18.9318H60.8782V20.4943H54.3157V25.4375H61.4464V27H52.5543ZM76.212 17H74.4506C74.3465 16.4934 74.1642 16.0483 73.9038 15.6648C73.6481 15.2812 73.3356 14.9593 72.9663 14.6989C72.6017 14.4337 72.1969 14.2348 71.7518 14.1023C71.3067 13.9697 70.8427 13.9034 70.3597 13.9034C69.479 13.9034 68.6812 14.1259 67.9663 14.571C67.256 15.0161 66.6902 15.6719 66.2688 16.5384C65.8522 17.4048 65.6438 18.4678 65.6438 19.7273C65.6438 20.9867 65.8522 22.0497 66.2688 22.9162C66.6902 23.7827 67.256 24.4384 67.9663 24.8835C68.6812 25.3286 69.479 25.5511 70.3597 25.5511C70.8427 25.5511 71.3067 25.4848 71.7518 25.3523C72.1969 25.2197 72.6017 25.0232 72.9663 24.7628C73.3356 24.4976 73.6481 24.1733 73.9038 23.7898C74.1642 23.4015 74.3465 22.9564 74.4506 22.4545H76.212C76.0794 23.1979 75.838 23.8632 75.4876 24.4503C75.1372 25.0374 74.7016 25.5369 74.1808 25.9489C73.6599 26.3561 73.0752 26.6662 72.4265 26.8793C71.7826 27.0923 71.0936 27.1989 70.3597 27.1989C69.1192 27.1989 68.016 26.8958 67.0501 26.2898C66.0842 25.6837 65.3242 24.822 64.7702 23.7045C64.2163 22.5871 63.9393 21.2614 63.9393 19.7273C63.9393 18.1932 64.2163 16.8674 64.7702 15.75C65.3242 14.6326 66.0842 13.7708 67.0501 13.1648C68.016 12.5587 69.1192 12.2557 70.3597 12.2557C71.0936 12.2557 71.7826 12.3622 72.4265 12.5753C73.0752 12.7884 73.6599 13.1009 74.1808 13.5128C74.7016 13.92 75.1372 14.4171 75.4876 15.0043C75.838 15.5866 76.0794 16.2519 76.212 17Z"
      fill="white"
    />
  </svg>
)

const timelineDuration = 10
const padding = 16
const headerHeight = 50
const timelineHeight = 90
const printMarkers: ProgressMarker[] = [{ position: 50 }]
const storeId = 'hero'
const devtoolsTabs: (keyof typeof tabs)[] = ['console', 'react']
const firstComment = [
  {
    name: 'Erika',
    date: 'Now',
    avatar: avatarOne,
    text: `@jasmine can you look into this checkout bug, please? Customers can't purchase hoverboards right now.`
  },
  {
    name: 'Jasmine',
    date: 'Now',
    avatar: avatarTwo,
    text: 'Absolutely!'
  }
]

const secondComment = [
  {
    name: 'Jasmine',
    date: 'Now',
    avatar: avatarTwo,
    text: 'It looks like we sent `color` instead of `colorId` to the API at that time. Fix deployed, @erika ready for a look!'
  },
  {
    name: 'Erika',
    date: 'Now',
    avatar: avatarOne,
    text: 'LGTM 🚢 thanks for fixing that so quickly!'
  }
]

const SCROLLYTELLING_PX_DURATION = 16000

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
  const [markersType, setMarkersType] = useState<ConsoleMarker>('transparent')
  const [currentTime, setCurrentTime] = useState(0)
  const { isDesktop } = useDeviceDetect()
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
  const progressBarRef = useRef<ProgressAPI>(null)
  const playPauseRef = useRef<SVGSVGElement>(null)

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
    const appSelector = gsap.utils.selector(applicationRef.current)

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
    const [storePurchaseLoader] = storeSelector(
      `#overboard-store-purchase-${storeId} .loader`
    )
    const storeColors = storeSelector(`#overboard-store-colors-${storeId}`)
    const devtoolsTools = appSelector('.toolbar .debugger,.search,.code')
    const devtoolsToolsComments = appSelector('.toolbar .comments')
    const devtoolsToolsCode = appSelector('.toolbar .code')
    const headerUsers = appSelector('.header .user')
    const recordBadge = storeSelector('.record')
    const storeContainer = storeSelector('.store')

    /* First Comment */
    const firstComment = storeSelector('#scrollytelling-first-comment')
    const firstCommentIcon = storeSelector(
      '#scrollytelling-first-comment .comment-icon'
    )
    const firstCommentBox = storeSelector(
      '#scrollytelling-first-comment .comment'
    )

    /* Second Comment */
    const secondCommentIcon = appSelector(
      '#scrollytelling-second-comment .comment-icon'
    )

    const secondCommentBox = appSelector(
      '#scrollytelling-second-comment .comment'
    )

    const animateCommentThread = (
      wrapperId: string,
      timeline: GSAPTimeline,
      customSelector?: gsap.utils.SelectorFunc
    ) => {
      const selector = customSelector || gsap.utils.selector(sectionRef.current)

      const commentContent = selector(`${wrapperId} .content`)
      const [commentInput] = selector(`${wrapperId} .input`)
      const commentDate = selector(`${wrapperId} .content:nth-child(1) .date`)

      const splitText = new SplitText(commentInput.children[1], {
        type: 'chars',
        wordsClass: 'hi'
      })

      timeline
        .set(commentInput.children[0], {
          display: 'none'
        })
        .fromTo(
          commentInput.children[1],
          {
            display: 'none'
          },
          {
            display: 'block'
          }
        )
        .fromTo(
          splitText.chars,
          {
            display: 'none'
          },
          {
            duration: 2,
            display: 'inline',
            stagger: 0.05
          },
          '<'
        )
        .fromTo(
          commentDate,
          {
            opacity: 0,
            height: 0
          },
          {
            opacity: 1,
            duration: 1,
            height: 'auto'
          }
        )
        .fromTo(
          commentContent[1],
          {
            scale: 0.8,
            opacity: 0,
            height: 0
          },
          {
            scale: 1,
            opacity: 1,
            height: 'auto'
          },
          '>+=2'
        )

      return splitText
    }

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
        duration: 4
      }
    )

    const flipTimeline2 = Flip.fit(
      targetStoreRef.current,
      smallRightCenteredStoreRef.current,
      {
        simple: false,
        duration: 4
      }
    )

    const flipTimeline3 = Flip.fit(
      targetStoreRef.current,
      smallRightStoreAreaRef.current,
      {
        simple: false,
        duration: 4
      }
    )

    const flipTimeline4 = Flip.fit(
      devtoolsPanelRef.current,
      devtoolsAreaRef.current,
      {
        simple: false,
        duration: 4
      }
    )

    // Calculate Distance (Percentaje) from the top of the screen to the top of the element
    const { height: pinTargetHeight, top: pinTargetSpaceTop } =
      sectionRef.current.getBoundingClientRect()
    const distance =
      window.pageYOffset +
      pinTargetSpaceTop -
      (window.innerHeight - pinTargetHeight) / 2
    const percentage = -(distance * 100) / pinTargetHeight
    const applicationWindowSpaceBottom = Math.floor(
      (window.innerHeight - applicationRef.current.clientHeight) / 2
    )

    /* Set the spacer height */
    const pinSpacer = document.getElementById('scrollytelling-spacer')
    gsap.set(pinSpacer, { height: SCROLLYTELLING_PX_DURATION })

    const timeline = gsap.timeline({
      smoothChildTiming: true,
      defaults: {
        ease: 'sine.inOut',
        duration: 2
      },
      scrollTrigger: {
        anticipatePin: 1,
        /* Adding 1px to trigger start to fix header disappearing bug */
        start: 'top+=1px top',
        end: `top+=${
          SCROLLYTELLING_PX_DURATION + pinTargetSpaceTop
        }px bottom-=${applicationWindowSpaceBottom}px`,
        fastScrollEnd: true,
        id: 'overboard-story',
        markers: false,
        pin: sectionRef.current,
        /* We are making our own spacer */
        pinSpacing: false,
        preventOverlaps: true,
        scrub: true,
        trigger: 'body',
        onEnterBack: () => {
          document.documentElement.classList.add('hide-header')
        },
        onLeave: () => {
          document.documentElement.classList.remove('hide-header')
        }
      }
    })

    const printTimelineProgress = { progress: 0 }

    timeline
      .to(sectionRef.current, {
        yPercent: percentage,
        duration: 7,
        ease: 'power3.out'
      })
      .add(() => {
        document.documentElement.classList.remove('hide-header')
      })
      .add(() => {
        document.documentElement.classList.add('hide-header')
      })
      .to(
        recordBadge,
        {
          opacity: 1,
          duration: 2
        },
        '<'
      )
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
      .add(flipTimeline1 as GSAPTimeline, '+=2')
      .to(storeContainer, { borderRadius: 12 }, '<')
      .to(
        recordBadge,
        {
          opacity: 0
        },
        '<'
      )
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
        [storePurchase, firstComment],
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
      }, '<')
      .add(() => {
        floorAndRotateTimeline.current?.pause()
      }, '<')
      .add(() => {
        playPauseRef.current?.classList.remove('play')
        playPauseRef.current?.classList.add('pause')
        progressBarRef.current?.update(50)
        setCurrentTime(timelineDuration * 0.5)
      }, '<')

      /* Comments */
      .set(firstComment, { opacity: 1 })
      .to(
        devtoolsToolsComments,
        {
          fill: '#05ACFD'
        },
        '<'
      )
      .to(
        devtoolsToolsCode,
        {
          fill: '#BCBCBC'
        },
        '<'
      )
      .fromTo(
        firstCommentIcon,
        {
          scale: 0.6,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1
        }
      )
      .to(firstCommentIcon, {
        scale: 1.2,
        duration: 1
      })
      .to(firstCommentIcon, {
        scale: 1,
        duration: 1
      })
      .fromTo(
        firstCommentBox,
        {
          transformOrigin: 'left top',
          y: -8,
          scale: 0.8,
          opacity: 0
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: Elastic.easeOut.config(1, 0.6),
          duration: 3
        }
      )

    const firstCommentSplitText = animateCommentThread(
      '#scrollytelling-first-comment',
      timeline,
      storeSelector
    )

    timeline
      .fromTo(
        headerUsers[0],
        {
          xPercent: 20,
          opacity: 0
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 2
        },
        '<'
      )
      .to(
        firstCommentBox,
        {
          y: -8,
          scale: 0.8,
          opacity: 0,
          duration: 1.5
        },
        '>+=2'
      )

      /* Devtools */
      .fromTo(
        viewToggleRef.current,
        { clipPath: 'inset(4px 50% 4px 4px round 4px)' },
        { clipPath: 'inset(4px 4px 4px 50% round 4px)' }
      )
      .fromTo(
        devtoolsTools,
        {
          yPercent: -20,
          opacity: 0
        },
        {
          yPercent: 1,
          opacity: 1,
          duration: 2,
          stagger: 0.3
        },
        '<'
      )

      /* Devtools */
      .add(flipTimeline2 as GSAPTimeline)
      .to(
        devtoolsToolsComments,
        {
          fill: '#BCBCBC'
        },
        '<'
      )
      .to(
        devtoolsToolsCode,
        {
          fill: '#05ACFD'
        },
        '<'
      )
      .to(
        firstComment,
        {
          opacity: 0
        },
        '<'
      )
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
      .add(flipTimeline3 as GSAPTimeline, '+=0.5')

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
          scale: 1.0
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
          opacity: 1,
          overflow: 'hidden',
          height: 0
        },
        {
          height: 'auto'
        }
      )
      .set(printPanel, { overflow: 'visible' })
      .set(storePurchaseLoader, { '--play-state': 'paused' })
      .add(() => {
        playPauseRef.current?.classList.remove('play')
        playPauseRef.current?.classList.add('pause')
      })
      .fromTo(
        printTimelineProgress,
        {
          progress: 20
        },
        {
          progress: 50,
          duration: 5,
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

            gsap.set(storePurchaseLoader, {
              '--rotate-z': `${360 * 4 * (progress / 100)}deg`
            })

            playPauseRef.current?.classList.remove('pause')
            playPauseRef.current?.classList.add('play')

            floorAndRotateTimeline.current?.seek(
              (floorAndRotateTimelineDuration / 4) * this.progress(),
              false
            )
            ;(codeRef.current?.timeline as ProgressAPI)?.update(progress)
            progressBarRef.current?.update(progress)
            setCurrentTime(timelineDuration * (progress / 100))
          },
          onComplete: () => {
            playPauseRef.current?.classList.remove('play')
            playPauseRef.current?.classList.add('pause')
          }
        }
      )
      .to(
        secondCommentIcon,
        {
          scale: 1.2,
          duration: 1
        },
        '+=2'
      )
      .to(secondCommentIcon, {
        scale: 1,
        duration: 1
      })
      .fromTo(
        secondCommentBox,
        {
          transformOrigin: 'right center',
          y: -42,
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          ease: Elastic.easeOut.config(1, 0.6),
          duration: 3
        }
      )

    const secondCommentSplitText = animateCommentThread(
      '#scrollytelling-second-comment',
      timeline,
      appSelector
    )

    /* Add some duration at the end */
    timeline.to({}, {})

    return () => {
      /* Split Text Cleanup */
      firstCommentSplitText.revert()
      secondCommentSplitText.revert()

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
          marker: markersType,
          content: [{ color: 'green' }],
          hide: !showPrints
        },
        {
          hits: 1,
          marker: 'transparent',
          prepend: 'Error',
          isError: true,
          content: [{ message: 'Color not found, received: undefined' }]
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
    <div id="scrollytelling-spacer">
      <Section
        className={s['section']}
        /* @ts-ignore */
        ref={sectionRef}
      >
        <AspectBox
          ratio={1920 / 1080}
          className={s['store-container']}
          ref={targetStoreRef}
        >
          <RecSvg />

          <div
            id="scrollytelling-first-comment"
            style={{
              opacity: 0,
              width: 44,
              position: 'absolute',
              left: '38.5%',
              top: '38%',
              zIndex: 'var(--z-index-20)'
            }}
          >
            <CommentModule side="bottom-right" comments={firstComment} />
          </div>

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
              className={clsx('header', s['header'])}
              // @ts-ignore
              style={{ '--height': headerHeight + 'px' }}
            >
              <div className={s['left']}>
                <IsoLogo className={s['logo']} />
              </div>
              <div className={s['users']}>
                <img className="user" src={avatarTwo.src} />
                <img className="user" src={avatarOne.src} />
              </div>
              <ViewToggle ref={viewToggleRef} />
            </div>

            <div
              className={s['content']}
              style={{
                // @ts-ignore
                '--height': `calc(100% - ${
                  padding * 2
                }px - ${headerHeight}px - ${timelineHeight}px)`
              }}
            >
              <div className={clsx('toolbar', s['toolbar'])}>
                <svg
                  width="24"
                  height="218"
                  viewBox="0 0 24 218"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    clipPath="url(#clip0_806_120)"
                    className="info"
                    fill="#BCBCBC"
                  >
                    <path d="M11.7419 2.32324C6.47972 2.32324 2.20898 6.59398 2.20898 11.8561C2.20898 17.1183 6.47972 21.389 11.7419 21.389C17.004 21.389 21.2748 17.1183 21.2748 11.8561C21.2748 6.59398 17.004 2.32324 11.7419 2.32324ZM12.6952 16.6226H10.7886V10.9029H12.6952V16.6226ZM12.6952 8.99627H10.7886V7.08969H12.6952V8.99627Z" />
                  </g>
                  <g
                    clipPath="url(#clip1_806_120)"
                    className="comments"
                    fill="#BCBCBC"
                  >
                    <path d="M19.3682 56.3394H18.4149V63.6723C18.4149 64.1765 17.9859 64.589 17.4616 64.589H6.02214V65.5056C6.02214 66.5139 6.8801 67.3388 7.92872 67.3388H17.4616L21.2748 71.0053V58.1726C21.2748 57.1643 20.4168 56.3394 19.3682 56.3394ZM16.5083 60.9225V54.5061C16.5083 53.4978 15.6504 52.6729 14.6018 52.6729H4.11556C3.06695 52.6729 2.20898 53.4978 2.20898 54.5061V66.4222L6.02214 62.7557H14.6018C15.6504 62.7557 16.5083 61.9308 16.5083 60.9225Z" />
                  </g>
                  <g
                    clipPath="url(#clip2_806_120)"
                    className="code"
                    fill="#BCBCBC"
                  >
                    <path d="M13.07 102.428C12.7375 102.096 12.2912 101.912 11.8275 101.912H5.55371C4.59121 101.912 3.80371 102.7 3.80371 103.662V117.662C3.80371 118.625 4.58246 119.412 5.54496 119.412H16.0537C17.0162 119.412 17.8037 118.625 17.8037 117.662V107.888C17.8037 107.425 17.62 106.978 17.2875 106.655L13.07 102.428ZM13.4287 115.912H8.17871C7.69746 115.912 7.30371 115.518 7.30371 115.037C7.30371 114.556 7.69746 114.162 8.17871 114.162H13.4287C13.91 114.162 14.3037 114.556 14.3037 115.037C14.3037 115.518 13.91 115.912 13.4287 115.912ZM13.4287 112.412H8.17871C7.69746 112.412 7.30371 112.018 7.30371 111.537C7.30371 111.056 7.69746 110.662 8.17871 110.662H13.4287C13.91 110.662 14.3037 111.056 14.3037 111.537C14.3037 112.018 13.91 112.412 13.4287 112.412ZM11.6787 107.162V103.225L16.4912 108.037H12.5537C12.0725 108.037 11.6787 107.643 11.6787 107.162Z" />
                  </g>
                  <g
                    clipPath="url(#clip3_806_120)"
                    className="debugger"
                    fill="#BCBCBC"
                  >
                    <path d="M19.5537 158.656C19.5537 163.486 15.6337 167.406 10.8037 167.406C5.97371 167.406 2.05371 163.486 2.05371 158.656C2.05371 157.615 2.24621 156.626 2.57871 155.699L4.22371 156.294C3.95246 157.029 3.80371 157.825 3.80371 158.656C3.80371 162.515 6.94496 165.656 10.8037 165.656C14.6625 165.656 17.8037 162.515 17.8037 158.656C17.8037 154.798 14.6625 151.656 10.8037 151.656C9.97246 151.656 9.18496 151.805 8.44996 152.076L7.85496 150.423C8.78246 150.099 9.77121 149.906 10.8037 149.906C15.6337 149.906 19.5537 153.826 19.5537 158.656ZM5.11621 151.656C4.38996 151.656 3.80371 152.243 3.80371 152.969C3.80371 153.695 4.38996 154.281 5.11621 154.281C5.84246 154.281 6.42871 153.695 6.42871 152.969C6.42871 152.243 5.84246 151.656 5.11621 151.656ZM16.0537 158.656C16.0537 161.553 13.7 163.906 10.8037 163.906C7.90746 163.906 5.55371 161.553 5.55371 158.656C5.55371 155.76 7.90746 153.406 10.8037 153.406C13.7 153.406 16.0537 155.76 16.0537 158.656ZM9.92871 156.031H8.17871V161.281H9.92871V156.031ZM13.4287 156.031H11.6787V161.281H13.4287V156.031Z" />
                  </g>
                  <g
                    clipPath="url(#clip4_806_120)"
                    className="search"
                    fill="#BCBCBC"
                  >
                    <path d="M13.8662 208.399H13.175L12.93 208.163C13.7875 207.166 14.3037 205.871 14.3037 204.462C14.3037 201.321 11.7575 198.774 8.61621 198.774C5.47496 198.774 2.92871 201.321 2.92871 204.462C2.92871 207.603 5.47496 210.149 8.61621 210.149C10.025 210.149 11.32 209.633 12.3175 208.776L12.5537 209.021V209.712L16.9287 214.078L18.2325 212.774L13.8662 208.399V208.399ZM8.61621 208.399C6.43746 208.399 4.67871 206.641 4.67871 204.462C4.67871 202.283 6.43746 200.524 8.61621 200.524C10.795 200.524 12.5537 202.283 12.5537 204.462C12.5537 206.641 10.795 208.399 8.61621 208.399Z" />
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
                    filename="handle-submit.ts"
                    printPanelConfig={{
                      onChangeMarker: setMarkersType,
                      print: '"handleSubmit", formData',
                      markers: printMarkers,
                      printLineTarget: 7,
                      timelineType: 'justUi',
                      comments: secondComment,
                      currentMarker: markersType,
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
              className={s['bottom']}
              style={{
                // @ts-ignore
                '--height': timelineHeight
              }}
            >
              <div className={s['left']}>
                <svg
                  className={clsx(s['play-pause'], 'pause')}
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  ref={playPauseRef}
                >
                  <circle
                    cx="20.5141"
                    cy="20.5141"
                    r="16.5141"
                    fill="#01ACFD"
                  />
                  <path
                    className={s['play']}
                    d="M27.3028 19.2853L22.4846 16.5263L17.6663 13.7674C17.4573 13.6478 17.2203 13.5849 16.9791 13.585C16.7378 13.585 16.5008 13.648 16.2919 13.7676C16.083 13.8873 15.9095 14.0593 15.7888 14.2665C15.6682 14.4737 15.6046 14.7087 15.6045 14.948V25.9837C15.6046 26.2229 15.6681 26.458 15.7888 26.6652C15.9095 26.8724 16.083 27.0444 16.2919 27.164C16.5008 27.2837 16.7378 27.3467 16.979 27.3467C17.2203 27.3468 17.4573 27.2839 17.6663 27.1643L22.4846 24.4054L27.3028 21.6465C27.5118 21.5268 27.6853 21.3547 27.8059 21.1475C27.9266 20.9403 27.9901 20.7052 27.9901 20.4659C27.9901 20.2266 27.9266 19.9915 27.8059 19.7843C27.6853 19.577 27.5118 19.4049 27.3028 19.2853V19.2853Z"
                    fill="#F9F9FA"
                  />
                  <path
                    className={s['pause']}
                    d="M24.5823 27.3994C23.247 27.3994 22.1645 26.317 22.1645 24.9817L22.1645 15.8172C22.1645 14.4819 23.247 13.3994 24.5823 13.3994V13.3994C25.9175 13.3994 27 14.4819 27 15.8172L27 24.9817C27 26.317 25.9175 27.3994 24.5823 27.3994V27.3994ZM16.4177 27.3994C15.0825 27.3994 14 26.317 14 24.9817L14 15.8172C14 14.4819 15.0825 13.3994 16.4177 13.3994V13.3994C17.753 13.3994 18.8355 14.4819 18.8355 15.8172L18.8355 24.9817C18.8355 26.317 17.753 27.3994 16.4177 27.3994V27.3994Z"
                    fill="#F9F9FA"
                  />
                  <path
                    className={s['replay']}
                    d="M25.2306 15.4557C23.961 14.1869 22.2187 13.3994 20.2837 13.3994C16.4138 13.3994 13.2881 16.5319 13.2881 20.3994C13.2881 24.2669 16.4138 27.3994 20.2837 27.3994C23.1348 27.3994 25.5722 25.6988 26.6637 23.2583C26.9069 22.7146 26.4712 22.1494 25.8756 22.1494C25.4891 22.1494 25.1516 22.3972 24.9792 22.7431C24.1203 24.4659 22.3403 25.6494 20.2837 25.6494C17.3856 25.6494 15.0304 23.2957 15.0304 20.3994C15.0304 17.5032 17.3856 15.1494 20.2837 15.1494C21.7371 15.1494 23.0329 15.7532 23.9785 16.7069L21.5009 19.1829C21.3749 19.3089 21.4641 19.5244 21.6423 19.5244H27.0881C27.1986 19.5244 27.2881 19.4349 27.2881 19.3244V13.882C27.2881 13.7039 27.0727 13.6146 26.9467 13.7406L25.2306 15.4557Z"
                    fill="#F9F9FA"
                  />
                </svg>
              </div>

              <div className={s['timeline']}>
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

              <span className={s['current-time']}>
                0:{padZeroesToNumber(Number(currentTime.toFixed(0)), 2)} / 0:
                {padZeroesToNumber(timelineDuration, 2)}
              </span>
            </div>
          </AspectBox>
        </AspectBox>
      </Section>
    </div>
  )
}

export function OverboardStory() {
  const { isDesktop } = useDeviceDetect()

  // useEffect(() => {
  //   let int

  //   gsap.delayedCall(3, () => {
  //     int = setInterval(() => {
  //       console.log('Hi')
  //       window.scroll({ top: window.scrollY + 2.5 })
  //     }, 1)
  //   })

  //   return () => {
  //     if (int) {
  //       clearInterval(int)
  //     }
  //   }
  // }, [])

  return (
    <Container size="lg">
      {isDesktop ? (
        <ReplayApplication />
      ) : (
        <video
          style={{ borderRadius: 12 }}
          src="/video/hero-video.mp4"
          poster="/video/hero-video-thumbnail.png"
        />
      )}
    </Container>
  )
}

export { Code, Debugger, DevTools, OverboardStore }
