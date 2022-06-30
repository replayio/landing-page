import { Button } from '~/components/primitives/button'
import { Link } from '~/components/primitives/link'
import { Logo } from '~/components/primitives/logo'

import { Container } from '../container'
import s from './header.module.scss'

const link = [
  {
    href: '/',
    label: 'Use Cases'
  },
  {
    href: '/',
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

export const Header = () => {
  return (
    <header className={s['header']}>
      <Container>
        <div className={s['inner']}>
          <div className={s['logo']}>
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className={s['nav']}>
            <ul>
              {link.map(({ href, label }) => (
                <li key={href}>
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
