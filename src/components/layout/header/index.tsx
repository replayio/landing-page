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
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/engineers', label: 'For Engineers' },
  { href: '/vibe-coders', label: 'For Vibe Coders' },
  { href: '/pricing', label: 'Pricing' },
  { href: 'https://blog.replay.io', label: 'Blog' },
  // { href: '/about', label: 'Company' }
]

const MobileNavlinks: Navlink[] = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/engineers', label: 'For Engineers' },
  { href: '/vibe-coders', label: 'For Vibe Coders' },
  { href: '/pricing', label: 'Pricing' },
  { href: 'https://blog.replay.io', label: 'Changelog' },
  // { href: '/about', label: 'Company' },
]

type HeaderProps = {
  variant?: 'dark' | 'light'
} & React.HTMLAttributes<HTMLDivElement>

export const Header: FC<HeaderProps> = ({ variant = 'light', className, ...rest }) => {
  const toggle = useToggleState()
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()
  const hash = useHash()
  const isBuilderPage = pathname === '/builder'

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
          <Link href="/" aria-label="Home">
            <Logo className="h-auto w-[144px]" variant={variant || 'light'} />
          </Link>
          <div className="flex items-center ">
            <div className="hidden md:flex md:gap-x-4 md:items-center">
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

              {/*(
                <NavLink
                  className="font-semibold "
                  variant={variant}
                  href="https://jobs.ashbyhq.com/replay"
                  active={false}
                >
                  We&apos;re hiring 👋{' '}
                </NavLink>
              )*/}
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            {isBuilderPage ? (
              <div className="hidden md:flex md:items-center md:gap-x-4">
                <Button
                  href="https://builder.replay.io/?login=true"
                  variant="outline"
                  size="sm"
                  // color={variant === 'dark' ? 'white' : 'black'}
                  className={clsx(
                    'px-6 py-4 border border-gray-200',
                  )}
                >
                  Login
                </Button>
                <Button
                  href="https://builder.replay.io/?focus=true"
                  variant="solid"
                  size="sm"
                  color="default"
                  className="px-6 py-4"
                >
                  Start Building
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex md:items-center md:gap-x-4">
                <Button
                  href="https://docs.replay.io/basics/replay-mcp/overview"
                  variant="solid"
                  size="sm"
                  color="default"
                  className="px-6 py-4"
                >
                  Try Replay Free
                </Button>
              </div>
            )}

            <div className="-mr-1 md:hidden">
              <MobileMenu variant={variant} links={MobileNavlinks} {...toggle} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
