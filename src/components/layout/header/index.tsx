import clsx from 'clsx'
import throttle from 'lodash/throttle'
import { useEffect, useState } from 'react'

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
    href: '/',
    label: 'Pricing'
  },
  {
    href: '/',
    label: "We're hiring"
  },
  {
    href: '/',
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

          {isOn && (
            <div className={s['menu']}>
              <ul>
                {link.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href}>
                      <div className={s['nav-link']}>{label}</div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Button size="sm" variant="secondary">
                Login
              </Button>
            </div>
          )}
        </div>

        <div className={s['inner-desktop']}>
          <Link href="/">
            <Logo width={94} className={s['logo']} />
          </Link>

          <div className={s['nav']}>
            <ul>
              {link.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href}>
                    <div className={s['nav-link']}>{label}</div>
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
