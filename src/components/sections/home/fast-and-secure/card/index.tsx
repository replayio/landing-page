import { ResizeObserver } from '@juggle/resize-observer'
import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import {
  FC,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react'
import mergeRefs from 'react-merge-refs'
import useMeasure from 'react-use-measure'

import { AspectBox } from '~/components/common/aspect-box'
import { Badge } from '~/components/common/badge'

import s from './card.module.scss'

type CardProps = {
  icon: ImageProps['src']
  title: string | ReactNode
  badge: string
  ref?: ForwardedRef<{ refresh: () => void }>
  lantern?: boolean
}

export const Card: FC<CardProps> = forwardRef<
  { refresh: () => void },
  CardProps
>(({ icon, title, badge, lantern }, refreshRef) => {
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

  useEffect(() => {
    if (!lantern) return
    const lanternContainer = containerRef.current
    if (!lanternContainer) return

    const handleMouseMove = (e: MouseEvent) => {
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
    >
      {lantern && (
        <>
          <div className={s['border-bg']} />
          <div className={s['bg']} />
        </>
      )}
      <div className={s['content']}>
        <div className={s['icon']}>
          <Image src={icon} width={80} height={80} alt="runtime logo" />
        </div>
        <p className={s['title']}>{title}</p>
        {badge ? <Badge className={s['badge']} text={badge} /> : null}
      </div>
    </AspectBox>
  )
})
