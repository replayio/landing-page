import Image from 'next/image'
import { FC } from 'react'

import { Heading } from '~/components/common/heading'
import { ProgressBar } from '~/components/common/progress-bar'
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
      href: '/docs'
    },
    {
      label: 'Github Issues',
      href: '/github-issues'
    },
    {
      label: 'Contact Us',
      href: '/contact-us'
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
      href: '/blog'
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
    href: '/'
  },
  twitter: {
    icon: '/images/logos/twitter.svg',
    href: '/'
  },
  linkedIn: {
    icon: '/images/logos/linkedIn.svg',
    href: '/'
  }
}

export const Footer: FC = () => {
  return (
    <footer className={s['section']}>
      <div className={s['bg']}>
        <Image src={footerBgSvg} alt="footer background" />
      </div>
      <Container size="lg">
        <div className={s['footer']}>
          <div className={s['top']}>
            <div className={s['head']}>
              <div className={s['logo']}>
                <IsoLogo />
                <Heading>Start Replaying now</Heading>
              </div>
              <div>
                <Link href="/">
                  <svg
                    width="94"
                    height="49"
                    viewBox="0 0 94 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y="0.5" width="94" height="48" rx="24" fill="white" />
                    <path
                      d="M56.0214 23.6453C56.6595 24.0258 56.6595 24.9742 56.0214 25.3547L45.9406 31.3655C45.3009 31.7469 44.5 31.2718 44.5 30.5107L44.5 18.4893C44.5 17.7282 45.3009 17.2531 45.9406 17.6345L56.0214 23.6453Z"
                      fill="#F41C52"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className={s['timeline']}>
              <ProgressBar
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
