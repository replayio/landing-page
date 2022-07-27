import clsx from 'clsx'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { FC, useLayoutEffect, useState } from 'react'

import { Heading } from '~/components/common/heading'
import { ProgressBar } from '~/components/common/progress-bar'
import { Button } from '~/components/primitives/button'
import { Input } from '~/components/primitives/input'
import { Link } from '~/components/primitives/link'
import { IsoLogo } from '~/components/primitives/logo'
import footerBgSvg from '~/public/images/home/footer-bg.svg'

import { Container } from '../container'
import s from './footer.module.scss'

const links = {
  about: [
    {
      label: 'About',
      href: '/about'
    },
    {
      label: 'Pricing',
      href: '/pricing'
    },
    {
      label: "We're Hiring",
      href: '/we-are-hiring'
    },
    {
      label: 'Values',
      href: '/values'
    }
  ],
  'get help': [
    {
      label: 'Docs',
      href: 'https://docs.replay.io/'
    },
    {
      label: 'Github Issues',
      href: 'https://github.com/replayio'
    },
    {
      label: 'Contact Us',
      href: 'mailto:sales@replay.io'
    }
  ],
  legal: [
    {
      label: 'Privacy Policy',
      href: '/privacy-policy'
    },
    {
      label: 'Terms of Service',
      href: '/terms-of-service'
    }
  ],
  resources: [
    {
      label: 'Blog',
      href: 'https://medium.com/replay-io'
    },
    {
      label: 'Security & Privacy',
      href: '/security-and-privacy'
    }
  ]
}

const social = {
  discord: {
    icon: '/images/logos/discord.svg',
    href: '/discord'
  },
  twitter: {
    icon: '/images/logos/twitter.svg',
    href: 'https://twitter.com/replayio'
  },
  linkedIn: {
    icon: '/images/logos/linkedin.svg',
    href: 'https://www.linkedin.com/company/replayio/'
  }
}

export const Footer: FC = () => {
  const router = useRouter()
  const [overflowed, setOverflowed] = useState(false)
  const [hidden, setHidden] = useState(false)

  useLayoutEffect(() => {
    if (!router) return

    if (router.pathname === '/about' || router.pathname === '/pricing') {
      setOverflowed(true)
    } else if (
      router.pathname === '/shoutouts' ||
      router.pathname === '/privacy-policy'
    ) {
      setHidden(true)
    } else {
      setOverflowed(false)
      setHidden(false)
    }
  }, [router])

  return (
    <footer
      className={clsx(s['section'], {
        [s.overflowed]: overflowed,
        [s.hidden]: hidden
      })}
    >
      <div className={s['bg']}>
        <Image src={footerBgSvg} alt="footer background" />
      </div>
      <Container size="lg">
        <div className={s['footer']}>
          <div className={s['top']}>
            <div className={s['head']}>
              <div className={s['logo']}>
                <span className={s['iso']}>
                  <IsoLogo />
                </span>
                <Heading size="lg">Start Replaying now</Heading>
              </div>
              <div className={s['cta']}>
                <Button
                  className={s['play-button']}
                  size="sm"
                  noHover
                  rounded
                  variant="tertiary"
                >
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.0214 14.6453C21.6595 15.0258 21.6595 15.9742 21.0214 16.3547L10.9406 22.3655C10.3009 22.7469 9.5 22.2718 9.5 21.5107L9.5 9.48927C9.5 8.72824 10.3009 8.25307 10.9406 8.63452L21.0214 14.6453Z"
                      fill="#F41C52"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div className={s['timeline']}>
              <ProgressBar
                markers={[{ position: 50 }]}
                primaryColor="#FFF"
                secondaryColor="#FFFFFF4D"
                progress={50}
                direction="horizontal"
                animated={false}
              />
            </div>
          </div>

          <div className={s['middle']}>
            <div className={s['get-in-touch']}>
              <p className={s['title']}>Get in touch</p>
              <Input
                placeholder="Enter your email address"
                className={s['email']}
              />
            </div>
            <div className={s['nav']}>
              {Object.entries(links).map(([key, items]) => (
                <div key={key} className={s['nav-group']}>
                  <p className={s['title']}>{key}</p>
                  <ul className={s['list']}>
                    {items.map(({ label, href }) => (
                      <li key={label}>
                        <Link href={href}>{label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className={s['bottom']}>
            <div className={s['rights']}>
              <p>© {new Date().getFullYear()} Replay, All rights reserved.</p>
            </div>
            <ul className={s['social']}>
              {Object.entries(social).map(([key, link]) => (
                <li key={key} title={key}>
                  <Link href={link.href}>
                    <Image
                      // @ts-ignore
                      layout="raw"
                      width={32}
                      height={32}
                      src={link.icon}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}
