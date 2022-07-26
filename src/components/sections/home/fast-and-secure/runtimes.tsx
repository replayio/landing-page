import { ReactNode } from 'react'

export type Runtime = {
  icon: any
  title: string | ReactNode
  badge: 'beta' | 'today'
  description: string
}

export const browsers: Runtime[] = [
  {
    icon: '/images/logos/firefox.svg',
    title: 'Firefox',
    badge: 'beta',
    description: ' '
  },
  {
    icon: '/images/logos/chrome.svg',
    title: 'Chrome',
    badge: 'beta',
    description: ' '
  },
  {
    icon: '/images/logos/safari.svg',
    title: 'Safari',
    badge: 'beta',
    description: ' '
  }
]

export const security: Runtime[] = [
  {
    icon: '/images/logos/encryption.svg',
    title: <>Encryption at Rest &amp;&nbsp;In-Transit</>,
    badge: 'today',
    description: ' '
  },
  {
    icon: '/images/logos/multifactor.svg',
    title: 'Multi Factor authentication',
    badge: 'beta',
    description: ' '
  },
  {
    icon: '/images/logos/monitoring.svg',
    title: 'Intelligent Threat Monitoring',
    badge: 'beta',
    description: ' '
  },
  {
    icon: '/images/logos/access-control.svg',
    title: 'Least Privilege Access Control',
    badge: 'beta',
    description: ' '
  },
  {
    icon: '/images/logos/SSO.svg',
    title: 'SAML / SSO Integration',
    badge: 'beta',
    description: ' '
  }
]

export const runtimes: Runtime[] = [
  {
    badge: 'beta',
    description: ' ',
    icon: '/images/logos/node.svg',
    title: 'Flight Recorder'
  },
  {
    badge: 'today',
    description: ' ',
    icon: '/images/logos/node.svg',
    title: 'Node'
  },
  {
    badge: 'beta',
    description: ' ',
    icon: '/images/logos/ruby.svg',
    title: 'Ruby'
  },
  {
    badge: 'beta',
    description: ' ',
    icon: '/images/logos/java.svg',
    title: 'Java'
  },
  {
    badge: 'beta',
    description: ' ',
    icon: '/images/logos/python.svg',
    title: 'Python'
  }
]

export const platforms: Runtime[] = [
  {
    badge: 'today',
    description: ' ',
    icon: '/images/logos/apple.svg',
    title: 'Mac'
  },
  {
    badge: 'today',
    description: ' ',
    icon: '/images/logos/windows.svg',
    title: 'Windows'
  },
  {
    badge: 'beta',
    description: ' ',
    icon: '/images/logos/android.svg',
    title: 'Android'
  }
]

export const testRunners: Runtime[] = [
  {
    badge: 'today',
    description: ' ',
    icon: '/images/logos/playwright.svg',
    title: 'Playwright'
  },
  {
    badge: 'beta',
    description: ' ',
    icon: '/images/logos/cypress.svg',
    title: 'Cypress'
  },
  {
    badge: 'beta',
    description: ' ',
    icon: '/images/logos/pupeteer.svg',
    title: 'Puppeteer'
  },
  {
    badge: 'beta',
    description: ' ',
    icon: '/images/logos/jest.svg',
    title: 'Jest'
  },
  {
    badge: 'beta',
    description: ' ',
    icon: '/images/logos/selenium.svg',
    title: 'Selenium'
  }
]
