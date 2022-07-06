import { gsap } from 'lib/gsap'
import * as React from 'react'
import { useIndexedChildren, useIndexPath } from 'use-indexed-children'

import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'

type ScrollFrame = {
  ref: React.RefObject<HTMLElement>
  index: number
  width: number
  height: number
  x: number
  y: number
  color: string
  backgroundColor: string
  borderRadius: string
  opacity: string
}

function getInvertedTransform(startBounds: any, endBounds: any) {
  return {
    x: startBounds.x - endBounds.x,
    y: startBounds.y - endBounds.y,
    scaleX: startBounds.width / endBounds.width,
    scaleY: startBounds.height / endBounds.height
  }
}

const ScrollTimelineContext = React.createContext<Map<
  string,
  ScrollFrame[]
> | null>(null)

const useScrollTimelineContext = () => {
  const context = React.useContext(ScrollTimelineContext)

  if (context === null) {
    throw new Error(
      'useScrollTimelineContext must be used within a ScrollTimelineProvider'
    )
  }

  return context
}

export const useScrollTimeline = (
  id: string,
  ref: React.RefObject<HTMLElement>
) => {
  const scrollTimelineContext = useScrollTimelineContext()
  const { index } = useIndexPath()
  const firstRender = React.useRef<boolean | null>(null)
  const [shouldRender, setShouldRender] = React.useState<boolean>(true)

  if (firstRender.current === null) {
    firstRender.current = scrollTimelineContext.get(id) === undefined
  }

  if (!scrollTimelineContext.has(id)) {
    scrollTimelineContext.set(id, [])
  }

  useIsomorphicLayoutEffect(() => {
    /** Store each component instance as a "frame". */
    const currentFrames = scrollTimelineContext.get(id)

    if (ref.current && currentFrames) {
      const bounds = ref.current.getBoundingClientRect()
      const computedStyles = window.getComputedStyle(ref.current)

      currentFrames[index] = {
        ref,
        index,
        width: bounds.width,
        height: bounds.height,
        x: bounds.x + window.scrollX,
        y: bounds.y + window.scrollY,
        color: computedStyles.color,
        backgroundColor: computedStyles.backgroundColor,
        borderRadius: computedStyles.borderRadius,
        opacity: computedStyles.opacity
      }

      scrollTimelineContext.set(id, currentFrames)
    }

    /** Now that we've collected measurements we can remove the components from the DOM. */
    setShouldRender(firstRender.current as boolean)

    return () => {
      if (currentFrames) {
        if (currentFrames.length > 0) {
          currentFrames.splice(index, 1)
        }

        if (currentFrames.length === 0) {
          scrollTimelineContext.delete(id)
        }
      }
    }
  }, [ref, id, index, scrollTimelineContext])

  React.useEffect(() => {
    const currentFrames = scrollTimelineContext.get(id)

    if (!currentFrames || !firstRender.current) {
      return
    }

    const filteredFrames = currentFrames
      .map((frame: ScrollFrame, index: number) => {
        if (index > 0) {
          const previousFrame = currentFrames[index - 1]

          if (previousFrame) {
            return {
              start: previousFrame,
              end: frame
            }
          }
        }
      })
      .filter(Boolean) as { start: ScrollFrame; end: ScrollFrame }[]

    let translateX = 0
    let translateY = 0

    filteredFrames.forEach((frame) => {
      const invertedTransform = getInvertedTransform(frame.start, frame.end)
      const startTranslateX = translateX
      const startTranslateY = translateY

      translateX -= invertedTransform.x
      translateY -= invertedTransform.y

      gsap
        .timeline({
          scrollTrigger: {
            start: frame.start.y,
            end: frame.end.y,
            scrub: true
          }
        })
        .from(ref.current, {
          width: frame.start.width,
          height: frame.start.height,
          x: startTranslateX,
          y: startTranslateY,
          color: frame.start.color,
          backgroundColor: frame.start.backgroundColor,
          borderRadius: frame.start.borderRadius,
          opacity: frame.start.opacity
        })
        .to(ref.current, {
          width: frame.end.width,
          height: frame.end.height,
          x: translateX,
          y: translateY,
          color: frame.end.color,
          backgroundColor: frame.end.backgroundColor,
          borderRadius: frame.end.borderRadius,
          opacity: frame.end.opacity
        })
    })
  }, [id, ref, scrollTimelineContext])

  return shouldRender
}

export const ScrollTimeline = ({ children }: { children: React.ReactNode }) => {
  const indexedChildren = useIndexedChildren(children)
  const scrollContext = React.useRef<Map<string, ScrollFrame[]> | null>(null)

  if (scrollContext.current === null) {
    scrollContext.current = new Map()
  }

  return (
    <ScrollTimelineContext.Provider value={scrollContext.current}>
      {indexedChildren}
    </ScrollTimelineContext.Provider>
  )
}
