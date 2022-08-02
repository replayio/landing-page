import { HoverboardControls } from '@replayio/overboard'
import { ComponentRef, useCallback, useEffect, useRef, useState } from 'react'

import { clearProps, DURATION, gsap } from '~/lib/gsap'
import { rangeMap } from '~/lib/utils'

import { Code, DevTools, NewOverboardStore } from '../overboard-story'

export const Scene1 = () => {
  const [markersType, setMarkersType] = useState('transparent')
  const [showPrints, setShowPrints] = useState(false)
  const codeRef = useRef<ComponentRef<typeof Code>>(null)
  const consoleRef = useRef()
  const timeline = useRef(gsap.timeline({ delay: 2 }))
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
      '+=2'
    )

    _timeline.to(
      yellowMarker,
      {
        scale: 1.5,
        duration: DURATION / 3
      },
      '+=1'
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

  // const resetAnimation = useCallback((killAndClear = false) => {
  //   if (!hoverboardRef.current || !consoleRef.current) return

  //   const _timeline = timeline.current

  //   const tlChildren = _timeline.getChildren()

  //   tlChildren.forEach((child) => {
  //     const elms = child?.targets?.()
  //     clearProps(elms)
  //   })

  //   if (killAndClear) {
  //     _timeline.clear()
  //     _timeline.kill()
  //   }

  //   setCurrentHit(0)
  // }, [])

  useEffect(() => {
    if (!hoverboardRef.current || !consoleRef.current) return

    const _timeline = timeline.current

    const consoleSelector = gsap.utils.selector(consoleRef.current)

    const buttons = consoleSelector('#icon')
    const logLines = consoleSelector('#log-line')

    _timeline.call(() => {
      logLines[2].classList.add('active')
    }, undefined)

    _timeline.call(
      () => {
        buttons[1].classList.add('active')
      },
      undefined,
      '+=0.2'
    )

    _timeline.call(
      () => {
        buttons[1].classList.remove('active')
        logLines[2].classList.remove('active')
        setCurrentHit(2)
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
        buttons[4].classList.add('active')
      },
      undefined,
      '+=0.2'
    )

    _timeline.call(
      () => {
        buttons[4].classList.remove('active')
        logLines[5].classList.remove('active')
        setCurrentHit(5)
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        logLines[1].classList.add('active')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        buttons[0].classList.add('active')
      },
      undefined,
      '+=0.2'
    )

    _timeline.call(
      () => {
        buttons[0].classList.remove('active')
        logLines[1].classList.remove('active')
        setCurrentHit(1)
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        _timeline.restart()
      },
      undefined,
      '+=1.5'
    )

    // return () => {
    //   resetAnimation(true)
    // }
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

      <NewOverboardStore mode="just-overboard" ref={hoverboardRef} />
    </>
  )
}
