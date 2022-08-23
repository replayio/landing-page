import { ReactNode } from 'react'

export type Runtime = {
  icon: string
  title: ReactNode
  badge:
    | 'Beta'
    | 'Today'
    | 'Coming Soon'
    | 'Closed Beta'
    | '2023'
    | 'Community'
    | ''
  description: string
}

export const browsers: Runtime[] = [
  {
    icon: '/images/logos/firefox.svg',
    title: 'Firefox',
    badge: 'Today',
    description: ''
  },
  {
    icon: '/images/logos/chrome.svg',
    title: 'Chrome',
    badge: 'Beta',
    description: ' '
  },
  {
    icon: '/images/logos/safari.svg',
    title: 'Safari',
    badge: 'Beta',
    description: ''
  }
]

export const security: Runtime[] = [
  {
    icon: '/images/logos/encryption.svg',
    title: <>Encryption at Rest &amp;&nbsp;In-Transit</>,
    badge: '',
    description: ' '
  },
  {
    icon: '/images/logos/multifactor.svg',
    title: 'Multi Factor authentication',
    badge: '',
    description: ' '
  },
  {
    icon: '/images/logos/monitoring.svg',
    title: 'Intelligent Threat Monitoring',
    badge: '',
    description: ' '
  },
  {
    icon: '/images/logos/access-control.svg',
    title: 'Least Privilege Access Control',
    badge: '',
    description: ' '
  },
  {
    icon: '/images/logos/SSO.svg',
    title: 'SAML / SSO Integration',
    badge: '',
    description: ' '
  }
]

export const runtimes: Runtime[] = [
  {
    badge: 'Beta',
    description: ' ',
    icon: '/images/logos/node.svg',
    title: 'Node'
  },
  {
    badge: 'Community',
    description: ' ',
    icon: '/images/logos/ruby.svg',
    title: 'Ruby'
  },
  {
    badge: 'Community',
    description: ' ',
    icon: '/images/logos/java.svg',
    title: 'Java'
  },
  {
    badge: 'Community',
    description: ' ',
    icon: '/images/logos/python.svg',
    title: 'Python'
  }
]

export const platforms: Runtime[] = [
  {
    badge: 'Today',
    description: ' ',
    icon: '/images/logos/apple.svg',
    title: 'Mac'
  },
  {
    badge: 'Today',
    description: ' ',
    icon: '/images/logos/windows.svg',
    title: 'Windows'
  },
  {
    badge: 'Today',
    description: ' ',
    icon: '/images/logos/windows.svg',
    title: 'Linux'
  },
  {
    badge: '2023',
    description: ' ',
    icon: '/images/logos/android.svg',
    title: 'Android'
  }
]

export const testRunners: Runtime[] = [
  {
    badge: 'Closed Beta',
    description: ' ',
    icon: '/images/logos/playwright.svg',
    title: 'Playwright'
  },
  {
    badge: 'Closed Beta',
    description: ' ',
    icon: '/images/logos/cypress.svg',
    title: 'Cypress'
  },
  {
    badge: 'Closed Beta',
    description: ' ',
    icon: '/images/logos/pupeteer.svg',
    title: 'Puppeteer'
  },
  {
    badge: 'Closed Beta',
    description: ' ',
    icon: '/images/logos/jest.svg',
    title: 'Jest'
  },
  {
    badge: 'Closed Beta',
    description: ' ',
    icon: '/images/logos/selenium.svg',
    title: 'Selenium'
  }
]
