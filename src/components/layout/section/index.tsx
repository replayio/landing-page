import clsx from 'clsx'
import { ComponentProps, ElementType, forwardRef } from 'react'
import mergeRefs from 'react-merge-refs'

import { useAppStore } from '~/context/use-app-store'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'

import s from './section.module.scss'

export type Props = {
  as?: 'div' | 'section'
} & JSX.IntrinsicElements['div']

export const Section = forwardRef<HTMLDivElement, Props>(
  ({ className, as = 'section', ...rest }, fwrdRef) => {
    const [ref, { inView }] = useIntersectionObserver<HTMLDivElement>({
      triggerOnce: false
    })
    const Element: ElementType = as
    const { tabIsFocused } = useAppStore()

    return (
      <Element
        className={clsx(s.section, className, {
          [s['not-in-view'] as string]: !inView || !tabIsFocused
        })}
        ref={mergeRefs([fwrdRef, ref])}
        {...rest}
      >
        {rest.children}
      </Element>
    )
  }
)

export type SectionProps = ComponentProps<typeof Section>
