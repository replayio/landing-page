import { HoverboardControls } from '@replayio/overboard'
import clamp from 'lodash/clamp'
import get from 'lodash/get'
import {
  ComponentRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { clearProps, DURATION, gsap } from '~/lib/gsap'
import { rangeMap } from '~/lib/utils'

import { Code, DevTools, NewOverboardStore } from '../overboard-story'
import {
  HTMLNode,
  IdentifiedNode,
  identifyNodes,
  ReactNode
} from '../overboard-story/devtools/common'
import { NetworkCall } from '../overboard-story/devtools/network'
import {
  OverboardColors,
  OverboardStoreProps
} from '../overboard-story/overboard-store'

export const Scene1 = () => {
  const [markersType, setMarkersType] = useState('transparent')
  const [showPrints, setShowPrints] = useState(false)
  const codeRef = useRef<ComponentRef<typeof Code>>(null)
  const consoleRef = useRef()
  const timeline = useRef(gsap.timeline())
  const [currentHit, setCurrentHit] = useState(0)

  const fullLogs = [
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

    addPrintButton[0].classList.remove('active')

    setCurrentHit(0)
    setMarkersType('transparent')
    setShowPrints(false)
  }, [])

  const handleComplete = useCallback(() => {
    gsap.delayedCall(3, () => {
      resetAnimation()
      codeRef.current?.timeline?.reset()
      timeline.current.restart()
    })
  }, [resetAnimation])

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
        addPrintButton[0].classList.add('active')
        setShowPrints(true)
      },
      undefined,
      '>-50%'
    )

    _timeline.fromTo(
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

    _timeline.call(
      () => {
        consoleMarkers[0].classList.add('active')
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
        consoleMarkers[0].classList.remove('active')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        codeRef.current?.timeline?.start?.()
      },
      undefined,
      '+=0.5'
    )

    return () => {
      resetAnimation(true)
    }
  }, [updateMarkers, resetAnimation])

  return (
    <>
      <Code
        currentHit={currentHit}
        currentMarker={markersType}
        onChangeMarker={updateMarkers}
        onComplete={handleComplete}
        onHit={setCurrentHit}
        ref={codeRef}
      />

      <DevTools
        panel="console"
        panelProps={{
          disableTravel: true,
          currentHit,
          logs: fullLogs,
          ref: consoleRef
        }}
      />
    </>
  )
}

const START_OF_ROTATION = 65
const END_OF_ROTATION = 340

const variables = {
  rotate: [0, 45, 90, 120, 160, 360]
}

export const Scene2 = () => {
  const consoleRef = useRef<any>(null)
  const hoverboardRef = useRef<HoverboardControls>(null)
  const [currentHit, setCurrentHit] = useState(0)

  const timeline = useRef(gsap.timeline({ delay: 2 }))

  const hoverboardState = useRef({
    _rotate: 0,
    set rotate(v: number) {
      this._rotate = v
      hoverboardRef.current?.rotate(
        rangeMap(v, 0, 360, START_OF_ROTATION, END_OF_ROTATION)
      )
    },
    get rotate() {
      return this._rotate
    }
  })

  useEffect(() => {
    gsap.to(hoverboardState.current, {
      rotate: variables.rotate[currentHit],
      ease: 'linear'
    })
  }, [currentHit])

  const logs = [
    {
      hits: variables.rotate.length,
      marker: 'unicorn',
      prepend: 'rotate',
      content: variables.rotate
    }
  ]

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

    _timeline.call(
      () => {
        _timeline?.restart()
      },
      undefined,
      '+=3'
    )
  }, [])

  return (
    <>
      <DevTools
        panel="console"
        panelProps={{
          currentHit,
          onCurrentHitChange: setCurrentHit,
          ref: consoleRef,
          logs
        }}
      />

      <NewOverboardStore
        inspectMode="html"
        mode="just-overboard"
        ref={hoverboardRef}
      />
    </>
  )
}

let overboardProgress = 0

export const Scene3 = () => {
  const devToolsRef = useRef(null)
  const storeRef = useRef(null)
  const overboardRef = useRef<HoverboardControls>(null)
  const [activeComponent, setActiveComponent] =
    useState<IdentifiedNode<ReactNode> | null>()
  const [hoveredComponentBlockId, setHoveredComponentBlockId] = useState<
    string | null
  >(null)
  const [overboardColor, setOverboardColor] = useState<OverboardColors>('red')
  const [rotation, setRotation] = useState(0)

  const tree = useMemo<IdentifiedNode<ReactNode>>(() => {
    const tree = {
      type: 'App',
      inspectBlockId: 'app',
      children: [
        {
          type: 'Hoverboard',
          inspectBlockId: 'hoverboard',
          props: {
            rotation: rotation,
            isAnimated: true,
            velocity: 20,
            color: overboardColor
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

    const identifiedTree = identifyNodes(tree)

    setActiveComponent((prev) =>
      prev?.path ? get(identifiedTree, prev?.path) : prev
    )

    return identifiedTree
  }, [overboardColor, rotation])

  const updateOverboard = useCallback(() => {
    overboardProgress += 1
    const loopedValue = overboardProgress % 360
    const a = rangeMap(
      clamp(loopedValue, START_OF_ROTATION, END_OF_ROTATION),
      START_OF_ROTATION,
      END_OF_ROTATION,
      0,
      360
    )

    setRotation(Number(a.toFixed(0)))
    overboardRef.current?.rotate(loopedValue)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateOverboard()
    }, 1)

    return () => {
      clearInterval(intervalId)
    }
  }, [updateOverboard])

  useEffect(() => {
    if (!storeRef.current) return

    const storeSelector = gsap.utils.selector(storeRef.current)

    const targetInspect = storeSelector(
      `*[data-box-id='${hoveredComponentBlockId}']`
    )

    gsap.set(targetInspect, {
      '--inspect': 1
    })

    return () => {
      gsap.set(targetInspect, {
        '--inspect': 0
      })
    }
  }, [hoveredComponentBlockId])

  const timeline = useRef(gsap.timeline({ delay: 2 }))

  const resetAnimation = () => {
    if (!overboardRef.current || !devToolsRef.current) return

    const _timeline = timeline.current

    const toolsSelector = gsap.utils.selector(devToolsRef.current)
    const nodeLine = toolsSelector('#node-line')

    nodeLine[6].classList.remove('active')

    setActiveComponent(null)
    setHoveredComponentBlockId(null)

    _timeline.clear()
    _timeline.kill()
  }

  useEffect(() => {
    if (!overboardRef.current || !devToolsRef.current) return

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
      '+=1'
    )

    _timeline.call(
      () => {
        setActiveComponent(get(tree, 'children.0'))
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        nodeLine[1].classList.remove('hovered')
        nodeLine[3].classList.add('hovered')
        setHoveredComponentBlockId('colors')
      },
      undefined,
      '+=1.5'
    )

    _timeline.call(
      () => {
        setActiveComponent(get(tree, 'children.1.children.0'))
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        nodeLine[3].classList.remove('hovered')
        nodeLine[4].classList.add('hovered')
        setHoveredComponentBlockId('color-red')
      },
      undefined,
      '+=1'
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
        resetAnimation()
        _timeline?.restart()
      },
      undefined,
      '+=3'
    )
  }, [tree])

  return (
    <>
      <DevTools
        panel="react"
        panelProps={{
          tree,
          activeComponent,
          onHoverComponent: setHoveredComponentBlockId,
          onActiveComponentChange: setActiveComponent,
          ref: devToolsRef
        }}
      />

      <div ref={storeRef}>
        <NewOverboardStore
          inspectMode="react"
          overboardColor={overboardColor}
          onOverboardColorChange={setOverboardColor}
          mode="color-picker"
          ref={overboardRef}
        />
      </div>
    </>
  )
}

export const Scene4 = () => {
  const devToolsRef = useRef(null)
  const storeRef = useRef(null)
  const overboardRef = useRef<HoverboardControls>(null)
  const [activeElement, setActiveElement] =
    useState<IdentifiedNode<HTMLNode> | null>()
  const [overboardColor, setOverboardColor] = useState<OverboardColors>('red')
  const [hoveredComponentBlockId, setHoveredComponentBlockId] = useState<
    string | null
  >(null)

  const tree = useMemo<IdentifiedNode<HTMLNode>>(() => {
    const tree: HTMLNode = {
      type: 'body',
      inspectBlockId: 'app',
      overrideStyles: {
        width: '100vw',
        height: '100vh'
      },
      children: [
        {
          type: 'main',
          inspectBlockId: 'main',

          children: [
            {
              type: 'div',
              inspectBlockId: 'hoverboard-container',
              overrideStyles: {
                width: '100%',
                height: '100%'
              },
              attributes: {
                class: 'hoverboard-container'
              },
              children: [
                {
                  type: 'svg',
                  inspectBlockId: 'hoverboard',
                  overrideStyles: {
                    '--elevation': 0,
                    width: '100%',
                    height: '100%'
                  },
                  attributes: {
                    class: 'hoverboard'
                  }
                }
              ]
            },
            {
              type: 'form',
              inspectBlockId: 'purchase-form',
              inspectInnerTarget: ':scope > div',
              stylesWhitelist: ['position'],
              attributes: {
                class: 'purchase-form'
              },
              children: ['red', 'green', 'blue'].map((name) => ({
                type: 'input',
                inspectBlockId: `color-${name}`,
                inspectInnerTarget: 'input',
                stylesWhitelist: ['--stop-1', '--stop-2', 'background-image'],
                attributes: {
                  type: 'radio'
                }
              }))
            }
          ]
        }
      ]
    }

    const identifiedTree = identifyNodes(tree)

    setActiveElement((prev) =>
      prev?.path ? get(identifiedTree, prev?.path) : prev
    )

    return identifiedTree
  }, [])

  useEffect(() => {
    if (!storeRef.current) return

    const storeSelector = gsap.utils.selector(storeRef.current)

    const targetInspect = storeSelector(
      `*[data-box-id='${hoveredComponentBlockId}']`
    )

    gsap.set(targetInspect, {
      '--inspect': 1
    })

    return () => {
      gsap.set(targetInspect, {
        '--inspect': 0
      })
    }
  }, [hoveredComponentBlockId])

  const timeline = useRef(gsap.timeline({ delay: 2 }))

  const resetAnimation = () => {
    if (!overboardRef.current || !devToolsRef.current) return

    const _timeline = timeline.current

    const toolsSelector = gsap.utils.selector(devToolsRef.current)
    const nodeLine = toolsSelector('#node-line')

    nodeLine[7].classList.remove('active')

    setHoveredComponentBlockId(null)
    setActiveElement(null)

    // _timeline.clear()
    _timeline.kill()
  }

  useEffect(() => {
    if (!overboardRef.current || !devToolsRef.current) return

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
        nodeLine[2].classList.add('hovered')
        setHoveredComponentBlockId('hoverboard-container')
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        setActiveElement(get(tree, 'children.0.children.0'))
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        nodeLine[2].classList.remove('hovered')
        nodeLine[4].classList.add('hovered')
        setHoveredComponentBlockId('colors')
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        setActiveElement(get(tree, 'children.0.children.1'))
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        nodeLine[4].classList.remove('hovered')
        nodeLine[5].classList.add('hovered')
        setHoveredComponentBlockId('color-red')
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        nodeLine[5].classList.remove('hovered')
        nodeLine[6].classList.add('hovered')
        setHoveredComponentBlockId('color-green')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        nodeLine[6].classList.remove('hovered')
        nodeLine[7].classList.add('hovered')
        setHoveredComponentBlockId('color-blue')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        setActiveElement(get(tree, 'children.0.children.1.children.2'))
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        resetAnimation()
        _timeline?.restart()
      },
      undefined,
      '+=3'
    )
  }, [tree])

  return (
    <>
      <DevTools
        panel="elements"
        panelProps={{
          tree,
          activeElement,
          onHoverElement: setHoveredComponentBlockId,
          onActiveElementChange: setActiveElement,
          ref: devToolsRef
        }}
      />

      <div ref={storeRef}>
        <NewOverboardStore
          inspectMode="html"
          overboardColor={overboardColor}
          onOverboardColorChange={setOverboardColor}
          mode="color-picker"
          ref={overboardRef}
        />
      </div>
    </>
  )
}

export const Scene5 = () => {
  const devToolsRef = useRef(null)
  const storeRef = useRef(null)
  const overboardRef = useRef<HoverboardControls>(null)
  const [activeCallIdx, setActiveCallIdx] = useState<number>()
  const [storeState, setStoreState] =
    useState<OverboardStoreProps['state']>('idle')

  const initialCalls: NetworkCall[] = [
    {
      pending: false,
      status: 200,
      caller: 'fetchVariants',
      method: 'GET',
      url: 'overboard.replay.io/api/variants',
      response: {
        variants: ['red', 'green', 'blue']
      }
    },
    {
      pending: false,
      status: 200,
      caller: 'addToCart',
      method: 'POST',
      url: 'overboard.replay.io/api/addToCart',
      request: {
        variant: 'red',
        quantity: 1
      },
      response: {
        cartId: 'c9811cbd64b8'
      }
    }
  ]

  const [calls, setCalls] = useState(initialCalls)

  const handlePurchase = useCallback(() => {
    setStoreState('loading')

    let currCallIdx: number

    setCalls((prev) => {
      currCallIdx = prev.length

      return [
        ...prev,
        {
          pending: true,
          status: 500,
          caller: 'purchase',
          method: 'POST',
          url: 'overboard.replay.io/api/purchase',
          request: {
            cartId: 'c9811cbd64b8'
          },
          response: {
            message: 'Something went wrong'
          }
        }
      ]
    })

    gsap.delayedCall(1, () => {
      setCalls((prev) => {
        prev[currCallIdx].pending = false
        return prev
      })

      setActiveCallIdx(currCallIdx)

      setStoreState('error')
    })
  }, [])

  const timeline = useRef(gsap.timeline({ delay: 2 }))

  const resetAnimation = () => {
    if (!overboardRef.current || !devToolsRef.current) return

    const _timeline = timeline.current

    const toolsSelector = gsap.utils.selector(devToolsRef.current)
    const callLine = toolsSelector('#call-line')

    callLine[2].classList.remove('active')

    setStoreState('idle')
    setCalls(initialCalls)

    _timeline.clear()
    _timeline.kill()
  }

  useEffect(() => {
    if (!overboardRef.current || !devToolsRef.current) return

    const _timeline = timeline.current

    _timeline.call(() => {
      setActiveCallIdx(0)
    }, undefined)

    _timeline.call(
      () => {
        setActiveCallIdx(1)
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        handlePurchase()
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        resetAnimation()
        _timeline?.restart()
      },
      undefined,
      '+=3'
    )
  })

  return (
    <>
      <DevTools
        panel="network"
        panelProps={{
          calls,
          activeCallIdx,
          onActiveCallChange: setActiveCallIdx,
          ref: devToolsRef
        }}
      />

      <div ref={storeRef}>
        <NewOverboardStore
          onPurchase={handlePurchase}
          state={storeState}
          inspectMode="html"
          overboardColor="red"
          mode="purchase"
          ref={overboardRef}
        />
      </div>
    </>
  )
}
