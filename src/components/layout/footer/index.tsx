import Image from 'next/image'

import { NavLink } from '~/components/primitives/nav-link'
import { SITEMAP } from '~/lib/sitemap'
import { getImageSizes } from '~/lib/utils/image'

import s from './footer.module.scss'

const links = [
  {
    section: 'About',
    links: [SITEMAP.aboutUs, SITEMAP.hiring, SITEMAP.values]
  },
  {
    section: 'Get Help',
    links: [SITEMAP.discord, SITEMAP.docs, SITEMAP.githubIssues, SITEMAP.contactUs]
  },
  {
    section: 'Legal',
    links: [SITEMAP.privacyPolicy, SITEMAP.termsService]
  },
  {
    section: 'Resources',
    links: [SITEMAP.blog, SITEMAP.securityPrivacy, SITEMAP.branding]
  }
]

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.titleWrapper}>
        <div className={s.isotypeWrapper}>
          <Image
            src="/images/isotype.png"
            alt="Replay's isotype"
            fill
            quality={100}
            priority
            sizes={getImageSizes(2, 2, 2)}
          />
        </div>
        <h2 className={s.title}>Start replaying now</h2>
      </div>

      <div className={s.mainContent}>
        <p className={s.info}>
          Time travel debugging is the best way to see and understand software.{' '}
          <span>That’s why Replay will always be free for individuals and open source.</span>
        </p>

        <div className={s.links}>
          {links.map((item) => (
            <div key={item.section}>
              <p className={s.title}>{item.section}</p>

              <ul>
                {item.links.map((link) => (
                  <NavLink key={link.label} href={link.href || '/'} aria-label={link.label}>
                    {link.label}
                  </NavLink>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className={s.copyright}>&copy; {new Date().getFullYear()} Replay, All rights reserved.</p>
    </footer>
  )
}
