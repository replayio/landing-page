import { useEffect, useRef, useState } from 'react'

export const useMouseTracker = <T extends HTMLElement>(config?: {
  onEnter?: () => void
  onLeave?: () => void
  onChange?: (mousePosition: {
    x: number
    y: number
    normalized: {
      x: number
      y: number
    }
    isHovering: boolean
    first: boolean
  }) => void
  windowAsProxy?: boolean
  enableOnlyWhenHovering?: boolean
  centered?: boolean
}) => {
  const elementRef = useRef<T>(null)
  const onEnterRef = useRef(config?.onEnter)
  const onLeaveRef = useRef(config?.onLeave)
  const onChangeRef = useRef(config?.onChange)

  /* Reasign the callbacks if changed */
  onEnterRef.current = config?.onEnter
  onLeaveRef.current = config?.onLeave
  onChangeRef.current = config?.onChange

  const mousePositionRef = useRef({
    x: 0,
    y: 0,
    normalized: {
      x: 0,
      y: 0
    },
    isHovering: false
  })

  const [enableTracking, setEnableTracking] = useState(!config?.enableOnlyWhenHovering)

  // enable / disable tracking if enableOnlyWhenHovering === true
  useEffect(() => {
    if (!config?.enableOnlyWhenHovering) return

    const element = elementRef.current
    if (!element) return

    function handlePointerEnter() {
      onEnterRef.current?.()
      mousePositionRef.current = {
        ...mousePositionRef.current,
        isHovering: true
      }
      setEnableTracking(true)
    }

    function handlePointerLeave() {
      mousePositionRef.current = {
        ...mousePositionRef.current,
        isHovering: false
      }
      setEnableTracking(false)
    }

    element.addEventListener('pointerenter', handlePointerEnter, {
      passive: true
    })

    element.addEventListener('pointerleave', handlePointerLeave, {
      passive: true
    })

    return () => {
      element.removeEventListener('pointerenter', handlePointerEnter)
      element.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [config?.enableOnlyWhenHovering])

  useEffect(() => {
    if (!enableTracking) return

    const element = elementRef.current
    if (!element) return

    let first = true

    const handleMouseMove = (e: {
      clientX: number
      clientY: number
      target: EventTarget | null
    }) => {
      const target = e.target

      const bounds = element.getBoundingClientRect()

      const xPx = config?.centered
        ? e.clientX - bounds.left - bounds.width / 2
        : e.clientX - bounds.left
      const yPx = config?.centered
        ? e.clientY - bounds.top - bounds.height / 2
        : e.clientY - bounds.top

      mousePositionRef.current = {
        x: xPx,
        y: yPx,
        normalized: {
          x: xPx / bounds.width,
          y: yPx / bounds.height
        },
        isHovering: target instanceof HTMLElement && element.contains(target)
      }

      onChangeRef.current?.({ ...mousePositionRef.current, first })

      first = false
    }

    if (config?.windowAsProxy) {
      window.addEventListener('mousemove', handleMouseMove, {
        passive: true
      })
      return () => {
        if (!mousePositionRef.current.isHovering) {
          onLeaveRef.current?.()
        }
        window.removeEventListener('mousemove', handleMouseMove)
      }
    } else {
      element.addEventListener('pointermove', handleMouseMove, {
        passive: true
      })
      return () => {
        if (!mousePositionRef.current.isHovering) {
          onLeaveRef.current?.()
        }
        element.removeEventListener('pointermove', handleMouseMove)
      }
    }
  }, [enableTracking, config?.centered, config?.windowAsProxy])

  return { elementRef, mousePositionRef }
}
