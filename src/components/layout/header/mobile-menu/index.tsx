import Link from 'next/link'
import { useRef } from 'react'

import { Portal } from '~/components/primitives/portal'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useTabletLgBreakpoint } from '~/hooks/use-media'
import type { ToggleState } from '~/hooks/use-toggle-state'
import { DURATION, gsap } from '~/lib/gsap'

import { Burger } from './burger'
import { Navlink } from '..'
import { Button } from '~/components/Button'
import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import useHash from '~/hooks/use-hash'

type MobileMenuProps = ToggleState & {
  burgerClassName?: string
  links: Navlink[]
  variant?: 'light' | 'dark'
}

export const MobileMenu = ({ isOn, handleToggle, handleOff, links, variant }: MobileMenuProps) => {
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuInnerRef = useRef<HTMLDivElement>(null)
  const isTablet = useTabletLgBreakpoint()
  const pathname = usePathname()
  const hash = useHash()

  useIsomorphicLayoutEffect(() => {
    const tl = gsap.timeline({
      smoothChildTiming: true
    })

    if (isOn) {
      tl.to(mobileMenuRef.current, {
        height: 'calc(100dvh - var(--header-height))',
        autoAlpha: 1
      }).to(
        mobileMenuInnerRef.current,
        {
          autoAlpha: 1
        },
        '>-0.2'
      )
    } else {
      tl.to(mobileMenuInnerRef.current, {
        autoAlpha: 0,
        duration: DURATION / 1.6
      }).to(
        mobileMenuRef.current,
        {
          height: 0,
          autoAlpha: 0
        },
        '>-0.3'
      )
    }

    return () => {
      tl.kill()
    }
  }, [isOn])

  // lock scroll when mobile menu is open
  useIsomorphicLayoutEffect(() => {
    if (isOn && isTablet) {
      gsap.set('body', { overflow: 'hidden' })

      return () => {
        gsap.set('body', { overflow: 'unset' })
      }
    }

    if (isOn && !isTablet) {
      handleOff()
    }
  }, [isOn, isTablet, handleOff])

  return (
    <>
      <button
        type="button"
        className={clsx('block pl-[1px]', variant === 'dark' ? 'text-slate-100' : 'text-slate-900')}
        onClick={handleToggle}
        aria-label={`${isOn ? 'Close' : 'Open'} menu mobile`}
      >
        <Burger isOpen={isOn} />
      </button>

      <Portal id="mobile-menu-portal">
        <div
          ref={mobileMenuRef}
          className={clsx(
            'invisible fixed left-0 top-0 z-[100] mt-[var(--header-height)] h-0 w-full opacity-0',
            variant === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'
          )}
        >
          <div
            className="relative flex h-full flex-col overflow-auto py-0 pl-4 pr-4"
            ref={mobileMenuInnerRef}
          >
            <ul className="flex h-full w-full flex-col gap-6">
              {links.map((link) => (
                <li className="first:pt-6 last:pb-6" key={link.label}>
                  <Link
                    className={clsx(
                      {
                        ['font-semibold !text-accent']:
                          pathname === link.href || `/${hash}` === link.href
                      },
                      'duration-[350ms] ease-[cubic-bezier(0.5,1,0.89,1)] flex w-full items-center gap-3 text-2xl leading-8 tracking-[-0.04em] transition-[color] active:text-accent'
                    )}
                    href={link.href || '#'}
                    onClick={handleOff}
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto animate-fadeIn pb-5">
              <Button
                href="https://app.replay.io"
                variant="solid"
                color={variant === 'dark' ? 'white' : 'black'}
                type="solid"
                className={clsx(
                  'w-full border-2',
                  variant === 'dark' ? 'border-white' : 'border-black'
                )}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </Portal>
    </>
  )
}
