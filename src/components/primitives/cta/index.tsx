import type * as Polymorphic from '@radix-ui/react-polymorphic'
import clsx from 'clsx'
import Link, { LinkProps as NextLinkProps } from 'next/link'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react'
import mergeRefs from 'react-merge-refs'

import type { IconNames } from '~/components/icons'
import { IconsLibrary } from '~/components/icons'
import type { UseGsapTimeAPI, UseGsapTimeArgs } from '~/hooks/use-gsap-time'
import { useGsapTime } from '~/hooks/use-gsap-time'
import { useMouseTracker } from '~/hooks/use-mouse-tracker'
import { gsap } from '~/lib/gsap'
import { checkIsExternal } from '~/lib/utils/router'

import s from './cta.module.scss'

type ButtonProps = {
  mode?: 'primary' | 'secondary'
  size?: 'small' | 'big'
  iconPrefix?: IconNames
  iconSuffix?: IconNames
}

export const Button = forwardRef(
  (
    {
      as: Comp = 'button',
      mode = 'primary',
      size = 'small',
      iconPrefix,
      iconSuffix,
      ...rest
    },
    ref
  ) => {
    const { elementRef } = useMouseTracker<HTMLButtonElement>({
      onChange: ({ x, y }) => {
        elementRef.current?.classList.add(s.hovering as string)
        gsap.set(elementRef.current, { '--x': `${x}px`, '--y': `${y}px` })
        gsap.to(elementRef.current, {
          '--circle-radius': '3em',
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
      <Comp
        {...rest}
        className={clsx(rest.className, s.cta, s[mode], [s[size]])}
        ref={mergeRefs([ref, elementRef])}
      >
        <div className={s.content}>
          {iconPrefix && (
            <span className={s.iconPrefix}>{IconsLibrary[iconPrefix]}</span>
          )}

          {rest.children}

          {iconSuffix && (
            <span className={s.iconSuffix}>{IconsLibrary[iconSuffix]}</span>
          )}
        </div>
      </Comp>
    )
  }
) as Polymorphic.ForwardRefComponent<
  'button',
  ButtonProps & JSX.IntrinsicElements['button']
>

type ButtonLinkProps = ButtonProps &
  Omit<JSX.IntrinsicElements['a'], 'href'> &
  NextLinkProps & { notExternal?: boolean }

export const ButtonLink = forwardRef<'a', ButtonLinkProps>(
  (
    {
      // NextLinkProps
      href,
      replace,
      scroll,
      shallow,
      prefetch,
      locale,
      // Rest
      notExternal,
      ...props
    },
    ref
  ) => {
    const externalProps = useMemo(() => {
      const p = { target: '_blank', rel: 'noopener' }
      if (typeof href === 'string') {
        if (checkIsExternal(href)) return p
      } else if (checkIsExternal(href.href ?? '')) return p
    }, [href])

    return (
      <Link
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        prefetch={prefetch}
        locale={locale}
        legacyBehavior
        passHref
      >
        <Button
          {...(notExternal ? undefined : externalProps)}
          {...props}
          as="a"
          // @ts-ignore
          ref={ref}
        />
      </Link>
    )
  }
)

export const ButtonTimer = forwardRef<
  {
    element: HTMLButtonElement | null
    time: UseGsapTimeAPI
  },
  React.ComponentProps<typeof Button> & {
    timer: UseGsapTimeArgs & { playing?: boolean }
  }
>(({ timer, ...buttonProps }, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const time = useGsapTime({
    ...timer,
    onComplete: () => {
      if (!buttonRef.current) return

      gsap.to([buttonRef.current], {
        '--gradient-opacity': '0',
        ease: 'power2.out',
        duration: 0.6
      })

      timer.onComplete?.()
    },
    onInterrupt: () => {
      if (!buttonRef.current) return

      gsap.to([buttonRef.current], {
        '--gradient-opacity': '0',
        ease: 'power2.out',
        duration: 0.6
      })

      timer.onInterrupt?.()
    },
    onStart: () => {
      if (!buttonRef.current) return

      gsap.to([buttonRef.current], {
        '--gradient-opacity': '1',
        ease: 'power2.out',
        duration: 0.6
      })

      timer.onStart?.()
    },

    onUpdate: (t) => {
      if (!buttonRef.current) return

      gsap.set(buttonRef.current, {
        '--progress': `${t.normalizedTime}`,
        immediateRender: true
      })
    }
  })

  useEffect(() => {
    if (timer.playing === true) {
      time.start()
    } else if (timer.playing === false) {
      time.pause()
    }

    return time.pause
  }, [time, timer.playing])

  useImperativeHandle(ref, () => ({
    get element() {
      return buttonRef.current
    },
    get time() {
      return time
    }
  }))

  return <Button className={s['timer']} {...buttonProps} ref={buttonRef} />
})
