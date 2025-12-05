'use client'

import { useState, useEffect, useRef, FC } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
  { href: 'https://blog.replay.io', label: 'Changelog' },
  // { href: '/about', label: 'Company' }
]

const DEVTOOLS_DROPDOWN_LINKS = [
  { href: 'https://docs.replay.io', label: 'Docs', description: 'Read the documentation.' },
]

const BUILDER_DROPDOWN_ITEMS = [
  { id: 'showcase-gallery', label: 'Showcase Gallery', description: 'Browse builder examples.' },
  { id: 'how-builder-works', label: 'How Builder Works', description: 'Learn how Replay Builder works.' },
  { id: 'connectors', label: 'Connectors', description: 'Learn about Builder multiple connectors.' },
  { id: 'pricing', label: 'Pricing', description: 'Learn about Builder pricing & plans.' },
  { id: 'faq', label: 'FAQ', description: 'Frequently asked questions' },
]

// Chevron icon for dropdown
const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type HeaderProps = {
  variant?: 'dark' | 'light'
} & React.HTMLAttributes<HTMLDivElement>

export const Header: FC<HeaderProps> = ({ variant = 'light', className, ...rest }) => {
  const toggle = useToggleState()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [builderDropdownOpen, setBuilderDropdownOpen] = useState(false)
  const [devtoolsDropdownOpen, setDevtoolsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const devtoolsDropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const hash = useHash()
  const isHomepage = pathname === '/'
  const isDevtoolsPage = pathname === '/devtools'

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(window.scrollY)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Open dropdown if navigated with ?builder=open param
  useEffect(() => {
    if (searchParams.get('builder') === 'open' && isHomepage) {
      setBuilderDropdownOpen(true)
      // Clean up the URL param
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams, isHomepage])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setBuilderDropdownOpen(false)
      }
      if (devtoolsDropdownRef.current && !devtoolsDropdownRef.current.contains(event.target as Node)) {
        setDevtoolsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setBuilderDropdownOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      })
    }
  }

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
            <div className="hidden md:flex md:gap-x-4 md:items-center">
              {/* Builder Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => {
                    if (isHomepage) {
                      // On homepage - just toggle dropdown
                      setBuilderDropdownOpen(!builderDropdownOpen)
                    } else {
                      // Not on homepage - navigate to homepage with param to open dropdown
                      router.push('/')
                    }
                  }}
                  className={clsx(
                    'inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium transition-colors',
                    variant === 'dark'
                      ? 'text-slate-100 hover:text-white'
                      : isHomepage
                        ? 'text-accent hover:text-accent/80'
                        : 'text-slate-700 hover:text-accent'
                  )}
                >
                  Builder
                  <ChevronDown
                    className={clsx(
                      'transition-transform duration-200',
                      builderDropdownOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* Dropdown Menu */}
                {builderDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                    {BUILDER_DROPDOWN_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="block w-full px-4 py-3 text-left transition-colors hover:bg-gray-50"
                      >
                        <span className="block text-sm font-medium text-accent">{item.label}</span>
                        <span className="block text-sm text-gray-600">{item.description}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* DevTools Dropdown */}
              <div ref={devtoolsDropdownRef} className="relative">
                <button
                  onClick={() => {
                    if (isDevtoolsPage) {
                      // On devtools page - just toggle dropdown
                      setDevtoolsDropdownOpen(!devtoolsDropdownOpen)
                    } else {
                      // Not on devtools page - navigate to devtools page
                      router.push('/devtools')
                    }
                  }}
                  className={clsx(
                    'inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium transition-colors',
                    variant === 'dark'
                      ? 'text-slate-100 hover:text-white'
                      : isDevtoolsPage
                        ? 'text-accent hover:text-accent/80'
                        : 'text-slate-700 hover:text-accent'
                  )}
                >
                  DevTools
                  <ChevronDown
                    className={clsx(
                      'transition-transform duration-200',
                      devtoolsDropdownOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* Dropdown Menu */}
                {devtoolsDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                    {DEVTOOLS_DROPDOWN_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDevtoolsDropdownOpen(false)}
                        className="block w-full px-4 py-3 text-left transition-colors hover:bg-gray-50"
                      >
                        <span className="block text-sm font-medium text-accent">
                          {item.label}
                        </span>
                        <span className="block text-sm text-gray-600">{item.description}</span>
                      </Link>
                    ))}
                    {/* Sign in Button */}
                    <div className="border-t border-gray-100 mt-2 pt-3 px-4 pb-2">
                      <Button
                        href="https://app.replay.io"
                        variant="solid"
                        size="sm"
                        color="black"
                        className="!h-[33px] w-full border-2 border-black"
                      >
                        Sign in
                      </Button>
                    </div>
                  </div>
                )}
              </div>

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
            <div className="hidden md:flex md:items-center md:gap-x-4">
              <Button
                href="https://builder.replay.io/?login=true"
                variant="outline"
                size="sm"
                // color={variant === 'dark' ? 'white' : 'black'}
                className={clsx(
                  'px-8 py-6 border border-gray-200',
                )}
              >
                Login
              </Button>
              <Button
                href="https://builder.replay.io/?focus=true"
                variant="solid"
                size="sm"
                color="default"
                className="px-8 py-6"
              >
                Start Building
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
