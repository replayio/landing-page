//@ts-nocheck
import clsx from 'clsx'
import get from 'lodash/get'
import {
  ComponentRef,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { ProgressAPI, ProgressProps } from '~/components/common/progress-bar'
import { clearProps, DURATION, gsap } from '~/lib/gsap'
import { rangeMap } from '~/lib/utils'

import { Code, DevTools, OverboardStore } from '../overboard-story'
import {
  buildUuids,
  IdentifiedNode,
  identifyNodes,
  ReactNode,
  useAnimationHover,
  useInspectElement,
  useTimeline
} from '../overboard-story/common'
import { DevToolsProps } from '../overboard-story/devtools'
import { ConsoleProps, Marker } from '../overboard-story/devtools/console'
import { OverboardColors, StoreRef } from '../overboard-story/overboard-store'
import s from './scenes.module.scss'

export type SceneProps = {
  active: boolean
  pauseTimeline?: () => void
  resumeTimeline?: () => void
  hoverTooltipComponent?: (text: string) => ReactNode
  devtoolsProps?: Partial<DevToolsProps>
}

const TIMELINE_PLAY_DELAY = 1.4

const AnimatedPanel: FC<{ active?: boolean }> = ({ active, children }) => {
  return (
    <div
      className={clsx(s['animated-panel'], {
        [s['show'] as string]: active,
        [s['hide'] as string]: !active
      })}
    >
      {children}
    </div>
  )
}

const printMarkers: ProgressProps['markers'] = [
  { position: 30 },
  { position: 36 },
  { position: 40 },
  { position: 55 },
  { position: 80, activeColor: 'var(--color-pink-crayon)' }
]

export const Scene1: FC<SceneProps> = ({
  active,
  pauseTimeline,
  resumeTimeline,
  devtoolsProps,
  hoverTooltipComponent
}) => {
  const timeline = useRef(
    gsap.timeline({ paused: true, delay: TIMELINE_PLAY_DELAY })
  )
  const [markersType, setMarkersType] = useState<Marker>('transparent')
  const [showPrints, setShowPrints] = useState(false)
  const codeRef = useRef<ComponentRef<typeof Code>>(null)
  const consoleRef = useRef()
  const [currentHit, setCurrentHit] = useState(0)

  const fullLogs: ConsoleProps['logs'] = [
    {
      line: 5,
      hits: 5,
      marker: markersType,
      prepend: 'rotate',
      content: [60, 68, 80, 90, 120],
      hide: !showPrints
    },
    {
      hits: 1,
      marker: 'unicorn',
      prepend: 'Start 360',
      content: [{ left: 110, top: 25 }]
    }
  ]

  const updateMarkers = useCallback((marker, asChildTimeline = false) => {
    if (!consoleRef.current) return

    const timeline = gsap.timeline({
      autoRemoveChildren: !asChildTimeline
    })

    const consoleSelector = gsap.utils.selector(consoleRef.current)
    const allConsoleMarkers = consoleSelector('.marker[data-line="5"]')

    timeline.call(() => {
      setMarkersType(marker)
    }, undefined)

    timeline.to(allConsoleMarkers, {
      scale: 1.25,
      stagger: 0.05,
      duration: DURATION / 3
    })

    timeline.to(
      allConsoleMarkers,
      {
        scale: 1,
        stagger: 0.05,
        duration: DURATION / 3
      },
      '>-50%'
    )

    return timeline
  }, [])

  const resetAnimation = useCallback((killAndClear = false) => {
    if (!codeRef.current || !consoleRef.current) return

    const _timeline = timeline.current

    const codeSelector = gsap.utils.selector(codeRef.current.elm)
    const addPrintButton = codeSelector('#dev-tools-add-print')

    const tlChildren = _timeline.getChildren()

    tlChildren.forEach((child) => {
      const elms = child?.targets?.()
      clearProps(elms)
    })

    if (killAndClear) {
      _timeline.clear()
      _timeline.kill()
    }

    addPrintButton[0]?.classList?.remove?.('active')
    ;(codeRef.current?.timeline as ProgressAPI)?.update(0)

    setCurrentHit(0)
    setMarkersType('transparent')
    setShowPrints(false)
  }, [])

  useEffect(() => {
    if (!codeRef.current || !consoleRef.current) return

    const _timeline = timeline.current

    const codeSelector = gsap.utils.selector(codeRef.current.elm)

    const addPrintButton = codeSelector('#dev-tools-add-print')
    const printPanel = codeSelector('#dev-tools-print-panel')
    const consoleMarkers = codeSelector('#dev-tools-console-markers')
    const yellowMarker = codeSelector(
      '#dev-tools-console-markers [data-marker="yellow"]'
    )

    _timeline.fromTo(
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

    _timeline.to(addPrintButton, {
      scale: 1.1,
      delay: 0.5,
      duration: DURATION / 3
    })

    _timeline.to(addPrintButton, {
      scale: 1,
      duration: DURATION / 3
    })

    _timeline.call(
      () => {
        addPrintButton[0]?.classList?.add?.('active')
        setShowPrints(true)
      },
      undefined,
      '>-50%'
    )

    _timeline.fromTo(
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

    _timeline.set(printPanel, { overflow: 'visible' })

    _timeline.call(
      () => {
        consoleMarkers[0]?.classList?.add?.('active')
      },
      undefined,
      '+=0.5'
    )

    _timeline.to(
      yellowMarker,
      {
        scale: 1.5,
        duration: DURATION / 3
      },
      '+=0.5'
    )

    _timeline.to(yellowMarker, {
      scale: 1,
      duration: DURATION / 3,
      clearProps: 'all'
    })

    const updateMarkersTimeline = updateMarkers('yellow', true)

    updateMarkersTimeline && _timeline.add(updateMarkersTimeline)

    _timeline.call(
      () => {
        consoleMarkers[0]?.classList?.remove?.('active')
      },
      undefined,
      '+=0.5'
    )

    const printTimelineProgress = { progress: 0 }

    _timeline.fromTo(
      printTimelineProgress,
      {
        progress: 0
      },
      {
        progress: printMarkers[printMarkers.length - 1].position,
        duration: 3,
        ease: 'linear',
        onUpdate() {
          const progress = printTimelineProgress.progress

          ;(codeRef.current?.timeline as ProgressAPI)?.update(progress)
        }
      },
      '+=0.5'
    )

    return () => {
      resetAnimation(true)
    }
  }, [updateMarkers, resetAnimation])

  useTimeline(active, timeline, resetAnimation)

  const events = useAnimationHover(pauseTimeline, resumeTimeline, timeline)

  return (
    <>
      <AnimatedPanel active={active}>
        {hoverTooltipComponent &&
          hoverTooltipComponent(
            'You can interact with windows now. Try changing the log marker style.'
          )}
        <Code
          {...events}
          printPanelConfig={{
            print: '"rotation", angle',
            markers: printMarkers,
            markerActiveColor: '#01ACFD',
            currentHit: currentHit,
            currentMarker: markersType,
            onChangeMarker: updateMarkers,
            onHit: setCurrentHit,
            timelineType: 'justUi',
            printLineTarget: 5
          }}
          printIndicators={{
            3: 'not-available',
            4: 'available',
            5: 'available'
          }}
          code={`

export function HoverBoard() {
  const [pos, setPos] = useState({left: 0, right: 0})
  const [angle, setAngle] = useState(0)
}
`}
          ref={codeRef}
        />
      </AnimatedPanel>

      <AnimatedPanel active={active}>
        <DevTools
          {...devtoolsProps}
          panel="console"
          panelProps={{
            disableTravel: true,
            currentHit,
            logs: fullLogs,
            // @ts-ignore
            ref: consoleRef
          }}
          className={s.devtools}
        />
      </AnimatedPanel>
    </>
  )
}

const START_OF_ROTATION = 65
const END_OF_ROTATION = 340

const steps = {
  rotation: [0, 45, 90, 120, 160, 360],
  displacement: [0.0, 0.025, 0.05, 0.075, 0.1, 0.125]
}

const storeState = {
  overboardRotation: steps.rotation[0],
  floorDisplacement: steps.displacement[0]
}

export const Scene2: FC<SceneProps> = ({
  active,
  pauseTimeline,
  resumeTimeline,
  devtoolsProps,
  hoverTooltipComponent
}) => {
  const timeline = useRef(
    gsap.timeline({ paused: true, delay: TIMELINE_PLAY_DELAY })
  )
  const consoleRef = useRef<any>(null)
  const hoverboardRef = useRef<StoreRef>(null)
  const [currentHit, setCurrentHit] = useState(0)

  useEffect(() => {
    gsap.to(storeState, {
      overboardRotation: steps.rotation[currentHit],
      floorDisplacement: steps.displacement[currentHit],
      ease: 'linear',
      onUpdate: () => {
        hoverboardRef.current?.grid?.move(
          storeState.floorDisplacement as number
        ),
          hoverboardRef.current?.hoverboard?.flip(
            rangeMap(
              storeState.overboardRotation as number,
              0,
              360,
              START_OF_ROTATION,
              END_OF_ROTATION
            )
          )
      }
    })
  }, [currentHit])

  const logs: ConsoleProps['logs'] = [
    {
      hits: steps.rotation.length,
      marker: 'unicorn',
      prepend: 'rotate',
      content: steps.rotation
    }
  ]

  const resetAnimation = useCallback((killAndClear = false) => {
    if (!consoleRef.current) return

    const logLines = gsap.utils.selector(consoleRef.current)('#log-line')

    logLines.forEach((line) => {
      line.classList.remove('active')
    })

    if (killAndClear) {
      timeline.current.kill()
      timeline.current.clear()
    }
  }, [])

  const wrapedPauseTimeline = useCallback(() => {
    resetAnimation()
    pauseTimeline?.()
  }, [pauseTimeline, resetAnimation])

  useEffect(() => {
    if (!hoverboardRef.current || !consoleRef.current) return

    const _timeline = timeline.current

    const consoleSelector = gsap.utils.selector(consoleRef.current)

    const buttons = consoleSelector('#icon')
    const logLines = consoleSelector('#log-line')

    const setNewMarkerHit = (i: number) => {
      buttons[i].classList.remove('active')
      logLines[i].classList.remove('active')
      setCurrentHit(i)
    }

    _timeline.call(() => {
      logLines[2].classList.add('active')
    }, undefined)

    _timeline.call(
      () => {
        buttons[2].classList.add('active')
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        setNewMarkerHit(2)
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        logLines[5].classList.add('active')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        buttons[5].classList.add('active')
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        setNewMarkerHit(5)
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        logLines[0].classList.add('active')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        buttons[0].classList.add('active')
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        setNewMarkerHit(0)
      },
      undefined,
      '+=0.5'
    )

    return () => {
      resetAnimation(true)
    }
  }, [resetAnimation])

  useTimeline(active, timeline, resetAnimation)

  const events = useAnimationHover(
    wrapedPauseTimeline,
    resumeTimeline,
    timeline
  )

  return (
    <>
      <AnimatedPanel active={active}>
        {hoverTooltipComponent &&
          hoverTooltipComponent(
            'You can interact with windows now. Try time traveling to each log.'
          )}
        <DevTools
          {...devtoolsProps}
          {...events}
          panel="console"
          panelProps={{
            currentHit,
            onCurrentHitChange: setCurrentHit,
            // @ts-ignore
            ref: consoleRef,
            logs
          }}
          className={s.devtools}
        />
      </AnimatedPanel>

      <AnimatedPanel active={active}>
        <OverboardStore
          inspectMode="html"
          mode="just-overboard"
          ref={hoverboardRef}
          className={s.overboard}
        />
      </AnimatedPanel>
    </>
  )
}

const initialColor = 'red'
const initialRotation = 0

export const Scene3: FC<SceneProps> = ({
  active,
  pauseTimeline,
  resumeTimeline,
  devtoolsProps,
  hoverTooltipComponent
}) => {
  const timeline = useRef(
    gsap.timeline({ paused: true, delay: TIMELINE_PLAY_DELAY })
  )
  const devToolsRef = useRef(null)
  const storeRef = useRef(null)
  const overboardRef = useRef<StoreRef>(null)
  const [activeComponent, setActiveComponent] =
    useState<IdentifiedNode<ReactNode> | null>()
  const [hoveredComponentBlockId, setHoveredComponentBlockId] = useState<
    string | null
  >(null)
  const [overboardColor, setOverboardColor] =
    useState<OverboardColors>(initialColor)
  const [rotation] = useState(initialRotation)

  const tree = useMemo<IdentifiedNode<ReactNode>>(() => {
    const tree = {
      type: 'App',
      inspectBlockId: 'app',
      children: [
        {
          type: 'Hoverboard',
          inspectBlockId: 'hoverboard',
          props: {
            rotation: initialRotation,
            isAnimated: true,
            velocity: 20,
            color: initialColor
          }
        },
        {
          type: 'PurchaseForm',
          inspectBlockId: 'purchase-form',
          children: [
            {
              type: 'Colors',
              inspectBlockId: 'colors',
              props: {
                colors: ['red', 'green', 'blue']
              },
              children: [
                {
                  type: 'Color',
                  inspectBlockId: 'color-red',
                  props: {
                    key: 'red'
                  }
                },
                {
                  type: 'Color',
                  inspectBlockId: 'color-green',
                  props: {
                    key: 'green'
                  }
                },
                {
                  type: 'Color',
                  inspectBlockId: 'color-blue',
                  props: {
                    key: 'blue'
                  }
                }
              ]
            }
          ]
        }
      ]
    }

    const uuidsTree = buildUuids(tree)
    const identifiedTree = identifyNodes(uuidsTree)

    return identifiedTree
  }, [])

  useEffect(() => {
    setActiveComponent((prev) => {
      const currentComp = prev?.path ? get(tree, prev?.path) : prev

      if (currentComp?.type === 'Hoverboard') {
        currentComp.props = {
          ...currentComp.props,
          rotation,
          color: overboardColor
        }
      }

      return currentComp
    })
  }, [tree, overboardColor, rotation])

  const resetAnimation = useCallback((killAndClear = false) => {
    if (!devToolsRef.current) return

    const _timeline = timeline.current

    const toolsSelector = gsap.utils.selector(devToolsRef.current)
    const nodeLine = toolsSelector('#node-line')

    nodeLine.forEach((node) => node.classList.remove('hovered'))

    setActiveComponent(null)
    setHoveredComponentBlockId(null)
    setOverboardColor('red')

    if (killAndClear) {
      _timeline.kill()
      _timeline.clear()
    }
  }, [])

  useEffect(() => {
    if (!overboardRef.current || !devToolsRef.current) return

    /* Abort overboard & floor animation */
    overboardRef.current.hoverboard?.wave(20)
    overboardRef.current.grid?.move(0)

    const _timeline = timeline.current

    const toolsSelector = gsap.utils.selector(devToolsRef.current)
    const nodeLine = toolsSelector('#node-line')

    _timeline.call(() => {
      nodeLine[0].classList.add('hovered')
      setHoveredComponentBlockId('app')
    }, undefined)

    _timeline.call(
      () => {
        nodeLine[0].classList.remove('hovered')
        nodeLine[1].classList.add('hovered')
        setHoveredComponentBlockId('hoverboard')
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        setActiveComponent(get(tree, 'children.0'))
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        nodeLine[1].classList.remove('hovered')
        nodeLine[3].classList.add('hovered')
        setHoveredComponentBlockId('colors')
      },
      undefined,
      '+=0.8'
    )

    _timeline.call(
      () => {
        setActiveComponent(get(tree, 'children.1.children.0'))
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        nodeLine[3].classList.remove('hovered')
        nodeLine[4].classList.add('hovered')
        setHoveredComponentBlockId('color-red')
      },
      undefined,
      '+=0.8'
    )

    _timeline.call(
      () => {
        nodeLine[4].classList.remove('hovered')
        nodeLine[5].classList.add('hovered')
        setHoveredComponentBlockId('color-green')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        nodeLine[5].classList.remove('hovered')
        nodeLine[6].classList.add('hovered')
        setHoveredComponentBlockId('color-blue')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        nodeLine[6].classList.remove('hovered')
        setActiveComponent(get(tree, 'children.1.children.0.children.2'))
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        setOverboardColor('green')
      },
      undefined,
      '+=0.8'
    )

    _timeline.call(
      () => {
        setOverboardColor('blue')
      },
      undefined,
      '+=0.6'
    )

    return () => {
      resetAnimation(true)
    }
  }, [tree, resetAnimation])

  useTimeline(active, timeline, resetAnimation)
  useInspectElement(hoveredComponentBlockId, storeRef.current)

  const events = useAnimationHover(pauseTimeline, resumeTimeline, timeline)

  return (
    <>
      <AnimatedPanel active={active}>
        {hoverTooltipComponent &&
          hoverTooltipComponent(
            'You can interact with windows now. Try inspecting any component.'
          )}
        <DevTools
          {...devtoolsProps}
          {...events}
          panel="react"
          panelProps={{
            tree,
            activeComponent,
            onHoverComponent: setHoveredComponentBlockId,
            onActiveComponentChange: setActiveComponent,
            // @ts-ignore
            ref: devToolsRef
          }}
          className={s.devtools}
        />
      </AnimatedPanel>

      <AnimatedPanel active={active}>
        <div ref={storeRef}>
          <OverboardStore
            inspectMode="react"
            overboardColor={overboardColor}
            onOverboardColorChange={setOverboardColor}
            mode="color-picker"
            className={s.overboard}
            ref={overboardRef}
          />
        </div>
      </AnimatedPanel>
    </>
  )
}
