import { ComponentRef, useCallback, useEffect, useRef, useState } from 'react'

import { DURATION, gsap } from '~/lib/gsap'

import { Code, DevTools } from '../overboard-story'

export const Scene1 = () => {
  const [markersType, setMarkersType] = useState('transparent')
  const codeRef = useRef<ComponentRef<typeof Code>>(null)
  const consoleRef = useRef()
  const timeline = useRef(
    gsap.timeline({ repeat: -1, delay: 2, autoRemoveChildren: true })
  )
  const [currentHit, setCurrentHit] = useState(0)

  const fullLogs = [
    {
      marker: markersType,
      prepend: 'rotate',
      content: 60
    },
    {
      marker: markersType,
      prepend: 'rotate',
      content: 60
    },
    {
      marker: markersType,
      prepend: 'rotate',
      content: 60
    },
    {
      marker: markersType,
      prepend: 'rotate',
      content: 60
    },
    {
      marker: markersType,
      prepend: 'rotate',
      content: 60
    },
    {
      marker: 'unicorn',
      prepend: 'Start 360',
      content: { left: 110, top: 25 }
    }
  ]

  useEffect(() => {
    if (!codeRef.current || !consoleRef.current) return

    const _timeline = timeline.current

    const codeSelector = gsap.utils.selector(codeRef.current.elm)
    const consoleSelector = gsap.utils.selector(consoleRef.current)

    const allConsoleMarkers = consoleSelector('.marker')
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
        codeRef.current?.timeline.resume()
      },
      undefined,
      '+=0.5'
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
      duration: DURATION / 3
    })

    _timeline.call(() => {
      setMarkersType('yellow')
    }, undefined)

    _timeline.to(allConsoleMarkers, {
      scale: 1.25,
      stagger: 0.05,
      duration: DURATION / 3
    })

    _timeline.to(
      allConsoleMarkers,
      {
        scale: 1,
        stagger: 0.05,
        duration: DURATION / 3
      },
      '>-50%'
    )

    _timeline.call(
      () => {
        consoleMarkers[0].classList.remove('active')
      },
      undefined,
      '+=2'
    )

    // return () => {
    //   _timeline.kill()
    // }
  }, [])

  const handleHit = useCallback((hit: number) => setCurrentHit(hit), [])

  return (
    <>
      <Code onHit={handleHit} ref={codeRef} />
      <DevTools
        panel="console"
        panelProps={{
          currentHit,
          logs: fullLogs,
          ref: consoleRef
        }}
      />
    </>
  )
}
