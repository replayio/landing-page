import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import throttle from 'lodash/throttle'
import { useEffect, useRef, useState } from 'react'

import { Button } from '~/components/primitives/button'
import { Link } from '~/components/primitives/link'
import { Logo } from '~/components/primitives/logo'
import { useToggleState } from '~/hooks/use-toggle-state'

import { Container } from '../container'
import s from './header.module.scss'

const link = [
  {
    href: '/',
    label: 'Use Cases'
  },
  {
    href: '/about',
    label: 'About'
  },
  {
    href: '/pricing',
    label: 'Pricing'
  },
  {
    href: '/',
    label: "We're hiring"
  },
  {
    href: '/',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2144_5001)">
          <path
            d="M24.3045 8.46995C22.7705 7.76607 21.1255 7.24748 19.4055 6.95046C19.3742 6.94473 19.3429 6.95906 19.3268 6.98771C19.1152 7.36399 18.8809 7.85488 18.7168 8.24072C16.8668 7.96377 15.0264 7.96377 13.2144 8.24072C13.0502 7.84631 12.8074 7.36399 12.5949 6.98771C12.5787 6.96001 12.5474 6.94569 12.5161 6.95046C10.7971 7.24653 9.15207 7.76512 7.61709 8.46995C7.6038 8.47568 7.59241 8.48524 7.58485 8.49764C4.4646 13.1592 3.60983 17.7062 4.02915 22.1969C4.03105 22.2189 4.04338 22.2399 4.06046 22.2532C6.11911 23.7651 8.11327 24.6829 10.0704 25.2912C10.1017 25.3008 10.1349 25.2893 10.1548 25.2635C10.6178 24.6313 11.0305 23.9647 11.3843 23.2637C11.4052 23.2226 11.3853 23.1739 11.3426 23.1577C10.688 22.9093 10.0647 22.6066 9.46513 22.2628C9.4177 22.2351 9.41391 22.1673 9.45754 22.1348C9.58371 22.0402 9.70991 21.9419 9.83039 21.8425C9.85219 21.8244 9.88256 21.8206 9.90819 21.832C13.8471 23.6304 18.1115 23.6304 22.0039 21.832C22.0296 21.8196 22.0599 21.8235 22.0827 21.8416C22.2032 21.9409 22.3294 22.0402 22.4565 22.1348C22.5001 22.1673 22.4973 22.2351 22.4498 22.2628C21.8503 22.6133 21.227 22.9093 20.5714 23.1567C20.5288 23.1729 20.5098 23.2226 20.5307 23.2637C20.8921 23.9637 21.3048 24.6303 21.7592 25.2626C21.7782 25.2893 21.8123 25.3008 21.8436 25.2912C23.8103 24.6829 25.8044 23.7651 27.863 22.2532C27.8811 22.2399 27.8925 22.2198 27.8944 22.1978C28.3962 17.0062 27.0538 12.4964 24.3358 8.49859C24.3292 8.48524 24.3178 8.47568 24.3045 8.46995ZM11.9725 19.4626C10.7866 19.4626 9.80951 18.3738 9.80951 17.0367C9.80951 15.6997 10.7677 14.6109 11.9725 14.6109C13.1868 14.6109 14.1545 15.7092 14.1355 17.0367C14.1355 18.3738 13.1773 19.4626 11.9725 19.4626ZM19.97 19.4626C18.7841 19.4626 17.807 18.3738 17.807 17.0367C17.807 15.6997 18.7651 14.6109 19.97 14.6109C21.1843 14.6109 22.1519 15.7092 22.133 17.0367C22.133 18.3738 21.1843 19.4626 19.97 19.4626Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_2144_5001">
            <rect
              width="24"
              height="19.5938"
              fill="currentColor"
              transform="translate(4 6)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    label: 'Discord'
  }
]

const Burger = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 18H21"
      stroke="#464646"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M3 12H21"
      stroke="#464646"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M3 6H21"
      stroke="#464646"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
)

export const Header = () => {
  const menuRef = useRef(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { isOn, handleToggle } = useToggleState()

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  useEffect(() => {
    const selector = gsap.utils.selector(menuRef.current)
    const menuInner = selector(`.${s['menu-inner']}`)
    const duration = 0.5

    if (isOn) {
      gsap.to(menuRef.current, {
        '--shadow-opacity': 0.12,
        duration,
        borderRadius: 'var(--border-radius-lg)'
      })

      gsap.fromTo(
        menuInner,
        {
          margin: 0,
          height: 0
        },
        {
          margin: '24px 0',
          force3d: true,
          duration,
          height: 'auto',
          opacity: 1
        }
      )
    } else {
      gsap.to(menuInner, {
        duration,
        height: 0,
        margin: 0,
        opacity: 0
      })

      gsap.to(menuRef.current, {
        duration,
        '--shadow-opacity': 0
      })
    }
  }, [isOn])

  return (
    <header className={clsx(s['header'], { [s['has-scrolled']]: hasScrolled })}>
      <Container size="md">
        <div className={s['inner-mobile']}>
          <div className={s['mobile-wrapper']}>
            <Link href="/">
              <Logo width={80} className={s['logo']} />
            </Link>

            <div className={s['burger']}>
              <Button onClick={handleToggle} unstyled>
                <Burger />
              </Button>
            </div>
          </div>

          <div className={s['menu']} ref={menuRef}>
            <Container className={s['menu-inner']}>
              <ul>
                {link.map(({ href, icon, label }) => (
                  <li key={label}>
                    <Link href={href}>
                      <p className={s['nav-link']}>
                        {icon && <span className={s['icon']}>{icon}</span>}
                        {label}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <Button size="md" variant="secondary">
                Login
              </Button>
            </Container>
          </div>
        </div>

        <div className={s['inner-desktop']}>
          <Link href="/">
            <Logo width={94} className={s['logo']} />
          </Link>

          <div className={s['nav']}>
            <ul>
              {link.map(({ href, icon, label }) => (
                <li key={label}>
                  <Link href={href}>
                    <p className={s['nav-link']}>
                      {icon && <span className={s['icon']}>{icon}</span>}
                      {label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Button size="sm" variant="secondary">
              Login
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
