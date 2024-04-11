'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'

import { Container } from '~/components/Container'
import { Logo } from '~/components/FullLogo'
import { NavLink } from '~/components/NavLink'
import { classNames } from '~/lib/utils'

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
        className={classNames('origin-center transition', open ? 'scale-90 opacity-0' : '')}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={classNames('origin-center transition', !open ? 'scale-90 opacity-0' : '')}
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
            <MobileNavLink href="#devtools">DevTools</MobileNavLink>
            <MobileNavLink href="#test-suites">Test Suites</MobileNavLink>
            <MobileNavLink href="/pricing">Pricing</MobileNavLink>
            <MobileNavLink href="https://docs.replay.io">Docs</MobileNavLink>
            <MobileNavLink href="https://blog.replay.io">Changelog</MobileNavLink>
            <MobileNavLink href="/about">Company</MobileNavLink>
            <hr className="m-2 border-slate-300/40" />
            <MobileNavLink href="https://app.replay.io">Sign in</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header({ variant }: { variant?: 'dark' | 'light' }) {
  return (
    <header
      className={classNames(
        'sticky top-0 z-50 py-10 backdrop-blur-md backdrop-saturate-150 backdrop-filter',
        variant === 'dark' ? 'bg-slate-900 text-slate-100 ' : 'bg-transparent text-slate-900'
      )}
    >
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center ">
            <Link href="/" aria-label="Home">
              <Logo variant={variant || 'light'} />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink variant={variant} href="/#devtools">
                DevTools
              </NavLink>
              <NavLink variant={variant} href="/#test-suites">
                Test Suites
              </NavLink>
              <NavLink variant={variant} href="/pricing">
                Pricing
              </NavLink>
              <NavLink variant={variant} href="https://docs.replay.io">
                Docs
              </NavLink>

              <NavLink variant={variant} href="https://blog.replay.io">
                Changelog
              </NavLink>
              <NavLink variant={variant} href="/about">
                Company
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <NavLink href="https://app.replay.io" variant={variant} type="solid">
                Sign in
              </NavLink>
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
