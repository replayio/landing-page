import { ResizeObserver } from '@juggle/resize-observer'
import clsx from 'clsx'
import Image, { ImageProps } from 'next/future/image'
import {
  FC,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react'
import mergeRefs from 'react-merge-refs'
import useMeasure from 'react-use-measure'

import { AspectBox } from '~/components/common/aspect-box'
import { Badge } from '~/components/common/badge'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { DURATION, gsap } from '~/lib/gsap'

import s from './card.module.scss'

type CardProps = {
  icon: ImageProps['src']
  title: string | ReactNode
  badge: string
  ref?: ForwardedRef<{ refresh: () => void }>
  lantern?: boolean
  mouseLanternValuesRef?: MutableRefObject<{ x: number; y: number } | undefined>
}

export const Card: FC<CardProps> = forwardRef<
  { refresh: () => void },
  CardProps
>(({ icon, title, badge, lantern, mouseLanternValuesRef }, refreshRef) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ref, bounds, refresh] = useMeasure({
    scroll: true,
    polyfill: ResizeObserver
  })

  useImperativeHandle(refreshRef, () => {
    return {
      refresh: () => {
        refresh()
        const currentScrollY = window.scrollY
        window.scrollTo(0, currentScrollY + 1)
        window.scrollTo(0, currentScrollY)
      }
    }
  })

  useIsomorphicLayoutEffect(() => {
    const tween = gsap.to(containerRef.current, {
      opacity: 1,
      duration: DURATION * 0.5
    })

    return () => {
      tween.kill()
    }
  }, [])

  useEffect(() => {
    // effect to handle initial render
    // when we change tabs, we still want the last value of the lantern to be preserved.
    if (!lantern) return
    if (!mouseLanternValuesRef?.current) return
    const lanternContainer = containerRef.current
    if (!lanternContainer) return

    const x = mouseLanternValuesRef.current.x - bounds.left
    const y = mouseLanternValuesRef.current.y - bounds.top

    lanternContainer.style.setProperty('--lantern-x', `${x}px`)
    lanternContainer.style.setProperty('--lantern-y', `${y}px`)
  }, [bounds.left, bounds.top, mouseLanternValuesRef, lantern])

  useEffect(() => {
    if (!lantern) return
    const lanternContainer = containerRef.current
    if (!lanternContainer) return

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      const x = e.clientX - bounds.left
      const y = e.clientY - bounds.top

      lanternContainer.style.setProperty('--lantern-x', `${x}px`)
      lanternContainer.style.setProperty('--lantern-y', `${y}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [bounds.left, bounds.top, lantern])

  return (
    <AspectBox
      ratio={228 / 256}
      className={clsx(s['container'], lantern && s['lantern'])}
      ref={mergeRefs([containerRef, ref])}
      style={{ opacity: 0 }}
    >
      {lantern && (
        <>
          <div className={s['border-bg']} />
          <div className={s['bg']} />
        </>
      )}
      <div className={s['content']}>
        <div className={s['icon']}>
          <Image
            src={icon}
            width={80}
            height={80}
            alt="runtime logo"
            loading="eager"
            sizes="80px"
          />
        </div>
        <p className={s['title']}>{title}</p>
        {badge ? <Badge className={s['badge']} text={badge} /> : null}
      </div>
    </AspectBox>
  )
})
