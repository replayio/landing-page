import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import ChevronIcon from '~/components/icons/chevron'
import { ButtonLink } from '~/components/primitives/cta'
import { Portal } from '~/components/primitives/portal'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useTabletLgBreakpoint } from '~/hooks/use-media'
import type { ToggleState } from '~/hooks/use-toggle-state'
import { DURATION, gsap } from '~/lib/gsap'
import type { SitemapType } from '~/lib/sitemap'
import { SITEMAP } from '~/lib/sitemap'

import { links } from '..'
import { NavigationContent } from '../navigation'
import { Burger } from './burger'
import s from './mobile-menu.module.scss'

type MobileMenuProps = ToggleState & {
  burgerClassName?: string
}

const MobileDropdown = ({
  label,
  dropdown,
  index
}: SitemapType & { index: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownContentWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      gsap.timeline().to(
        dropdownContentWrapperRef.current,
        {
          height: 'auto',
          padding: '24px 0',
          autoAlpha: 1,
          display: 'block'
        },
        0
      )
    } else {
      gsap.timeline().to(
        dropdownContentWrapperRef.current,
        {
          height: 0,
          padding: '0',
          autoAlpha: 0,
          display: 'none'
        },
        0
      )
    }
    gsap
  }, [isOpen])

  return (
    <>
      <button
        className={clsx(s.menuLink, { [s.active as string]: isOpen })}
        type="button"
        aria-label={label}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}

        <ChevronIcon />
      </button>

      {dropdown && (
        <div
          className={s.dropdownContentWrapper}
          ref={dropdownContentWrapperRef}
        >
          <NavigationContent
            sidebar={dropdown.sidebar}
            mainContent={dropdown.mainContent}
            index={index}
            as="div"
          />
        </div>
      )}
    </>
  )
}

export const MobileMenu = ({
  isOn,
  handleToggle,
  handleOff,
  burgerClassName
}: MobileMenuProps) => {
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuInnerRef = useRef<HTMLDivElement>(null)
  const isTablet = useTabletLgBreakpoint()

  useIsomorphicLayoutEffect(() => {
    const tl = gsap.timeline({
      smoothChildTiming: true
    })

    if (isOn) {
      tl.to(mobileMenuRef.current, {
        height: 'calc(var(--vh, 1vh) * 100 - var(--header-height) - 93px)',
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
        className={clsx(s.burgerButton, burgerClassName)}
        onClick={handleToggle}
        aria-label={`${isOn ? 'Close' : 'Open'} menu mobile`}
      >
        <Burger isOpen={isOn} />
      </button>

      <Portal id="mobile-menu-portal">
        <div className={s.mobileMenuContainer} ref={mobileMenuRef}>
          <div className={s.mobileMenuInner} ref={mobileMenuInnerRef}>
            <ul className={s.menuLinksContainer}>
              {links.map((link, index) => (
                <li className={s.menuListItem} key={link.label}>
                  {link.dropdown ? (
                    <MobileDropdown {...link} index={index} />
                  ) : (
                    <Link
                      className={s.menuLink}
                      href={link.href || '#'}
                      onClick={handleOff}
                      aria-label={link.label}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className={s.bottomCtasWrapper}>
              <ButtonLink size="big" mode="secondary" href="/" aria-label="">
                Get started
              </ButtonLink>
              <ButtonLink
                size="big"
                href={SITEMAP.login.href || '/'}
                aria-label={SITEMAP.login.label}
              >
                {SITEMAP.login.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Portal>
    </>
  )
}
