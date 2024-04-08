import clsx from 'clsx'
import { FC, useEffect, useRef, useState } from 'react'

import { useHasRendered } from '~/hooks/use-has-rendered'

import s from './on-render-fade-in.module.scss'

type OnRenderFadeInProps = JSX.IntrinsicElements['div'] & {
  animateTranslate?: boolean
  children: ((animationEnded: boolean) => JSX.Element) | JSX.Element
}

export const OnRenderFadeIn: FC<OnRenderFadeInProps> = ({
  children,
  className,
  animateTranslate = true,
  ...rest
}) => {
  const [animationEnded, setAnimationEnded] = useState(false)
  const rendered = useHasRendered()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || typeof children != 'function') {
      return
    }

    const elm = containerRef.current
    const handleAnimationEnd = () => {
      setAnimationEnded(true)
    }

    elm.addEventListener('transitionend', handleAnimationEnd, false)

    return () => {
      elm.removeEventListener('transitionend', handleAnimationEnd)
    }
  }, [rendered, children])

  return (
    <div
      className={clsx(s['container'], className, {
        [s['translate'] as string]: animateTranslate,
        [s['visible'] as string]: rendered
      })}
      {...rest}
      ref={containerRef}
    >
      {typeof children === 'function' ? children(animationEnded) : children}
    </div>
  )
}
