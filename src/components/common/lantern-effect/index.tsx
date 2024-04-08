import clsx from 'clsx'
import { gsap } from '~/lib/gsap'

import { useMouseTracker } from '~/hooks/use-mouse-tracker'

import s from './lantern-effect.module.scss'

type RootProps = {
  radius?: string
} & JSX.IntrinsicElements['div']

export const Root = ({ children, className, radius = '4em', ...rest }: RootProps) => {
  const { elementRef } = useMouseTracker<HTMLDivElement>({
    onChange: ({ x, y }) => {
      elementRef.current?.classList.add(s.hovering as string)
      gsap.set(elementRef.current, {
        '--x': `${x}px`,
        '--y': `${y}px`
      })
      gsap.to(elementRef.current, {
        overwrite: 'auto',
        '--circle-radius': `${radius}`,
        duration: 0.3
      })
    },
    onLeave: () => {
      elementRef.current?.classList.remove(s.hovering as string)
      gsap.to(elementRef.current, {
        '--circle-radius': '0px',
        duration: 0.3
      })
    },
    windowAsProxy: true,
    enableOnlyWhenHovering: true
  })

  return (
    <div className={clsx(s['root'], className)} {...rest} ref={elementRef}>
      {children}
    </div>
  )
}

export const ContentWrapper = ({ children, className, ...rest }: JSX.IntrinsicElements['div']) => {
  return (
    <div className={clsx(s['content-wrapper'], className)} {...rest}>
      <div className={s['light']} />
      {children}
    </div>
  )
}

export const MaskBorder = () => {
  return <div className={s['mask-border']} />
}
