import clsx from 'clsx'
import { ScrollTrigger } from 'lib/gsap'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useMemo, useRef } from 'react'

import { DownloadButton } from '~/components/common/download-button'
import { Heading } from '~/components/common/heading'
import { ProgressAPI, ProgressBar } from '~/components/common/progress-bar'
import { Discord, Linkedin, Twitter } from '~/components/icons/social'
import { ButtonLink } from '~/components/primitives/button'
import { Link } from '~/components/primitives/link'
import { IsoLogo } from '~/components/primitives/logo'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useMedia } from '~/hooks/use-media'
import { breakpoints } from '~/lib/constants'
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
      href: '/about#jobs'
    },
    {
      label: 'Values',
      href: '/about#values'
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
    icon: <Discord />,
    href: '/discord'
  },
  twitter: {
    icon: <Twitter />,
    href: 'https://twitter.com/replayio'
  },
  linkedIn: {
    icon: <Linkedin />,
    href: 'https://www.linkedin.com/company/replayio/'
  }
}

export const Footer: FC = () => {
  const router = useRouter()
  const progressRef = useRef<ProgressAPI>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isDesktopSize = useMedia(`(min-width: ${breakpoints.screenLg}px)`)
  const { isDesktop } = useDeviceDetect()

  useEffect(() => {
    if (!sectionRef.current || !progressRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      markers: false,
      scrub: 1,
      start: 'top bottom',
      end: `${isDesktopSize ? 'bottom' : '+=600px'} bottom`,
      onUpdate: (stState) => {
        if (progressRef.current) {
          progressRef.current.update(stState.progress * 70)
        }
      }
    })

    return () => {
      trigger.kill()
    }
  }, [isDesktop, isDesktopSize])

  const { overflowed, hidden } = useMemo(() => {
    let overflowed = false
    let hidden = false
    switch (router.pathname) {
      case '/about':
      case '/pricing':
        overflowed = true
        break
      case '/shoutouts':
      case '/privacy-policy':
      case '/security-and-privacy':
      case '/terms-of-service':
        hidden = true
        break
      default:
        break
    }

    return { overflowed, hidden }
  }, [router.pathname])

  return (
    <footer
      className={clsx(s['section'], 'inverted-selection', {
        [s.overflowed]: overflowed,
        [s.hidden]: hidden
      })}
    >
      <div className={s['bg']}>
        <Image src={footerBgSvg} alt="" />
      </div>
      <Container size="lg">
        <div className={s['footer']} ref={sectionRef}>
          <div className={s['top']}>
            <div className={s['head']}>
              <div className={s['logo']}>
                <span className={s['iso']}>
                  <IsoLogo />
                </span>
                <Heading as="h4" className={s.heading} size="lg">
                  Start Replaying now
                </Heading>
              </div>
              <div className={s['cta']}>
                <ButtonLink
                  aria-label="login to replay"
                  href="https://app.replay.io/"
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
                </ButtonLink>
              </div>
            </div>
            <div className={s['timeline']}>
              <ProgressBar
                markers={[{ position: 70 }]}
                primaryColor="#FFF"
                secondaryColor="#FFFFFF4D"
                progress={70}
                direction="horizontal"
                animated={false}
                ref={progressRef}
              />
            </div>
          </div>

          <div className={s['middle']}>
            <div className={s['get-in-touch']}>
              <h4 className={s['title']}>
                Replay is free for individuals because everyone should be able
                to time travel.
              </h4>
              <div className={s['button-container']}>
                <DownloadButton
                  variant="tertiary"
                  title="Record your first replay"
                />
              </div>
            </div>
            <div className={s['nav']}>
              {Object.entries(links).map(([key, items]) => (
                <div key={key} className={s['nav-group']}>
                  <h4 id={`footer-${key}`} className={s['title']}>
                    {key}
                  </h4>
                  <ul aria-labelledby={`footer-${key}`} className={s['list']}>
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
                  <Link href={link.href} aria-label={key}>
                    {link.icon}
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
