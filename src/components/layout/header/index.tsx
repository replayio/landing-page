'use client'

import { useState, useEffect, FC } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Container } from '~/components/Container'
import { Logo } from '~/components/FullLogo'
import { NavLink } from '~/components/NavLink'
import { clsx } from 'clsx'
import useHash from '~/hooks/use-hash'
import { Button } from '~/components/Button'
import { MobileMenu } from './mobile-menu'
import { useToggleState } from '~/hooks/use-toggle-state'

export type Navlink = {
  href: string
  label: string
}

const NAVLINKS: Navlink[] = [
  { href: '/#devtools', label: 'DevTools' },
  { href: 'https://docs.replay.io', label: 'Docs' },
  { href: 'https://blog.replay.io', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'Company' }
]

type HeaderProps = {
  variant?: 'dark' | 'light'
} & React.HTMLAttributes<HTMLDivElement>

export const Header: FC<HeaderProps> = ({ variant = 'light', className, ...rest }) => {
  const toggle = useToggleState()
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()
  const hash = useHash()

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(window.scrollY)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 z-50 flex h-[var(--header-height)] w-full items-center',
        variant === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-transparent text-slate-900',
        {
          ['border-b border-slate-950 shadow-[0px_2px_18px_0px_rgba(5,73,30,0.08)]']:
            variant === 'dark' && (scrollProgress > 0 || toggle.isOn)
        },
        {
          ['border-b border-gray-100 !bg-white shadow-[0px_2px_18px_0px_rgba(5,73,30,0.08)]']:
            variant === 'light' && (scrollProgress > 0 || toggle.isOn)
        },
        className
      )}
      {...rest}
    >
      <Container className="flex-1">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center ">
            <Link href="/" aria-label="Home">
              <Logo className="h-auto w-[144px]" variant={variant || 'light'} />
            </Link>
            <div className="hidden md:flex md:gap-x-4">
              {NAVLINKS.map(({ href, label }) => (
                <NavLink
                  key={href}
                  variant={variant}
                  href={href}
                  active={pathname === href || `/${hash}` === href}
                >
                  {label}
                </NavLink>
              ))}

              {pathname === '/about' && (
                <NavLink
                  className="font-semibold "
                  variant={variant}
                  href="#careers"
                  active={false}
                >
                  We&apos;re hiring 👋{' '}
                </NavLink>
              )}
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <Button
                href="https://app.replay.io"
                variant="solid"
                size="sm"
                color={variant === 'dark' ? 'white' : 'black'}
                type="solid"
                className={clsx(
                  '!h-[33px] border-2',
                  variant === 'dark' ? 'border-white' : 'border-black'
                )}
              >
                Sign in
              </Button>
            </div>

            <div className="-mr-1 md:hidden">
              <MobileMenu variant={variant} links={NAVLINKS} {...toggle} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
