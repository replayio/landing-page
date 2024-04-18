'use client'

import { Fragment, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'

import { Container } from '~/components/Container'
import { Logo } from '~/components/FullLogo'
import { NavLink } from '~/components/NavLink'
import { clsx } from 'clsx'
import useHash from '~/hooks/use-hash'
import { Button } from './Button'

const NAVLINKS = [
  { href: '/#devtools', label: 'DevTools' },
  { href: '/#test-suites', label: 'Test Suites' },
  { href: '/pricing', label: 'Pricing' },
  { href: 'https://docs.replay.io', label: 'Docs' },
  { href: 'https://blog.replay.io', label: 'Changelog' },
  { href: '/about', label: 'Company' }
]

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx('origin-center transition', open && 'scale-90 opacity-0')}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx('origin-center transition', !open && 'scale-90 opacity-0')}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight  shadow-xl ring-1 ring-slate-900/5"
          >
            {NAVLINKS.map(({ href, label }) => (
              <MobileNavLink key={href} href={href}>
                {label}
              </MobileNavLink>
            ))}
            <hr className="m-2 border-slate-300/40" />
            <MobileNavLink href="https://app.replay.io">Sign in</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header({ variant = 'light' }: { variant?: 'dark' | 'light' }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()
  const hash = useHash()

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 z-50 flex h-[var(--header-height)] w-full items-center',
        variant === 'dark' ? 'bg-slate-900 text-slate-100 ' : 'bg-transparent text-slate-900',
        { ['border-b border-slate-950']: variant === 'dark' && scrollProgress > 0 },
        { ['border-b border-gray-100 bg-white']: variant === 'light' && scrollProgress > 0 }
      )}
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
                  active={pathname === href || hash === href}
                >
                  {label}
                </NavLink>
              ))}
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
                  variant === 'dark' ? 'border-white hover:bg-slate-900' : 'border-black'
                )}
              >
                Sign in
              </Button>
            </div>

            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
