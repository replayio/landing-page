export const annualDiscount = 0.9
export const showAnnual = false

type Feature = {
  name: string
  description: string
  hidden?: boolean
  learnMore?: string
}

export const FEATURES: Record<string, Feature> = {
  users: {
    name: 'Users',
    description:
      'We believe that debugging should be collaborative so we encourage you to invite both frontend and backend developers to investigate failing tests.'
  },
  runs: {
    name: 'Test runs',
    description:
      'The Test Suite dashboard and CI workflows support all test run artifacts free of charge.'
  },
  recordings: {
    name: 'Uploaded recordings',
    description: `By default all failed tests are uploaded, but we recommend also uploading all recordings for atleast one run a day so you have a reference point.`,
    learnMore: '#'
  },
  processed: {
    name: 'Replayed recordings',
    description:
      'We try and replay a represantitive sample of your failed recordings so that you can start debugging them immediately.',
    learnMore: '#'
  },
  rca: {
    name: 'Root cause analysis *',
    description: '',
    hidden: true
  },
  perf: {
    name: 'Perf regression detection *',
    description: '',
    hidden: true
  },
  retention: {
    name: 'Retention limit',
    description: '',
    hidden: true
  },
  support: {
    name: 'Customer Support',
    description: '',
    hidden: true
  }
}

type TierIncluded = {
  name: string
  description: string
  learnMore?: string
}

export type Tier = {
  name: string
  href: string
  description: string
  features: Record<string, string | number>
  included: TierIncluded[]
  featured: boolean
  price: number
  priceDescription?: string
}

export const tiers: Record<string, Tier> = {
  free: {
    name: 'Free',
    featured: false,
    price: 0,
    description: 'For small teams with a handful of flaky E2E tests.',
    href: 'https://replayio.typeform.com/to/jTudlerL',
    priceDescription: 'No credit card required',
    features: {
      users: 20,
      runs: 'Unlimited',
      recordings: 100,
      processed: 20,
      rca: 0,
      perf: 0,
      retention: '7 days',
      support: 'Community'
    },
    included: [
      {
        name: 'Recent runs dashboard',
        description:
          'Spot regressions in recent test runs and either silence the test or revert the change.',
        learnMore: '#'
      },
      {
        name: 'Replay DevTools',
        description: `Debug a failed test with Replay DevTools as if it's running locally on your laptop.`,
        learnMore: '#'
      },
      {
        name: 'Discord support',
        description: 'Find us in Discord and talk with anyone on the team or in the community.'
      }
    ]
  },
  team: {
    name: 'Team',
    price: 75,
    priceDescription: 'No credit card required',
    description: 'For teams with a growing test suite.',
    href: 'https://replayio.typeform.com/to/jTudlerL',
    featured: true,
    features: {
      users: 20,
      runs: 'Unlimited',
      recordings: 1000,
      processed: 100,
      rca: 0,
      perf: 0,
      retention: '7 days',
      support: 'Email'
    },
    included: [
      {
        name: 'Failing test dashboard',
        description:
          'Stay on top of your top failing tests and take action to fix the the issue at the source.',
        learnMore: '#'
      },
      {
        name: 'Flaky test dashboard',
        description:
          'Stay on top of your most flaky tests and take action to fix the the issues at the source.',
        learnMore: '#'
      },
      {
        name: 'Email support',
        description: 'Have direct access to the Replay team with dedicated email support.'
      }
    ]
  },
  pro: {
    name: 'Pro',
    price: 350,
    priceDescription: 'No credit card required',
    description: 'For businesses who want to set E2E reliability goals.',
    href: 'https://replayio.typeform.com/to/jTudlerL',
    featured: false,
    features: {
      users: 50,
      runs: 'Unlimited',
      recordings: 20000,
      processed: 250,
      rca: 0,
      perf: 0,
      retention: '7 days',
      support: 'Email'
    },
    included: [
      {
        name: 'Test Suite insights',
        description: 'Track the health of your suite relative to the goals your team has set.'
      },
      {
        name: 'SSO',
        description: 'Login to Replay via SAML or identity providers such as Okta.',
        learnMore: '#'
      },

      {
        name: 'Office hours',
        description:
          "Dedicated time to work with the team on the top issues you're seeing in your application that are contributing to flaky test results.",
        learnMore: '#'
      }
    ]
  },
  enterprise: {
    name: 'Enterprise',
    price: -1,
    featured: false,
    description: 'For organizations with custom needs at an enterprise scale.',
    href: 'mailto:sales@replay.io',
    features: {
      users: 'Unlimited',
      runs: 'Unlimited',
      recordings: 'Custom',
      processed: 'Custom',
      rca: 'Custom',
      perf: 'Custom',
      retention: '30 days',
      support: 'Premium'
    },
    included: [
      {
        name: 'Host your own storage',
        description: 'Host recording artifacts in S3 or the cloud storage provider of your choice.',
        learnMore: '#'
      },
      {
        name: 'Custom legal terms',
        description: "We'll work with you to accommodate your business requirements.",
        learnMore: '#'
      },
      {
        name: 'Account manager',
        description: 'Get a dedicated partner to help you hit your test suite success goals.',
        learnMore: '#'
      },
      {
        name: 'Debugging workshops',
        description: 'Expert sessions on debugging flaky tests and React + Redux best practices.',
        learnMore: '#'
      }
    ]
  }
}

function mappedValue(feature: string) {
  return {
    name: FEATURES[feature].name,
    values: {
      free: tiers.free.features[feature],
      team: tiers.team.features[feature],
      pro: tiers.pro.features[feature],
      enterprise: tiers.enterprise.features[feature]
    }
  }
}

const allTrue = {
  free: true,
  team: true,
  pro: true,
  enterprise: true
}

const teamPlus = {
  free: false,
  team: true,
  pro: true,
  enterprise: true
}

const proPlus = {
  free: false,
  team: false,
  pro: true,
  enterprise: true
}

const enterprisePlus = {
  free: true,
  team: true,
  pro: false,
  enterprise: true
}

export type Section = {
  name?: string
  subtitle?: string
  features: {
    name: string
    values: {
      [key in keyof typeof tiers]: string | boolean | number
    }
  }[]
}

export const sections: Section[] = [
  {
    // name: "Plan limits",
    // subtitle: "Select the plan best for you",
    features: [
      mappedValue('users'),
      mappedValue('runs'),
      mappedValue('recordings'),
      mappedValue('processed'),
      mappedValue('retention'),
      mappedValue('support')
    ]
  },
  {
    name: 'Replay DevTools',
    subtitle: 'Debug your app with 100% reproducibility',
    features: [
      { name: 'Network monitor', values: allTrue },
      { name: 'Elements panel', values: allTrue },
      { name: 'Source viewer', values: allTrue },
      { name: 'Live Console logs', values: allTrue },
      { name: 'Playwright Panel', values: allTrue },
      { name: 'Cypress Panel', values: allTrue },
      { name: 'React DevTools', values: allTrue },
      { name: 'Redux DevTools', values: allTrue }
    ]
  },
  {
    name: 'Test Suite Analytics',
    subtitle: 'Maintain the health of your suite at scale',
    features: [
      { name: 'Loom integration', values: allTrue },
      { name: 'GitHub PR Comments', values: teamPlus },
      { name: 'Recent test runs dashboard', values: teamPlus },
      { name: 'Failing test dashboard', values: proPlus },
      { name: 'Flaky test dashboard', values: proPlus },
      { name: 'Test Suite analytics', values: proPlus }
    ]
  }
]

export const devToolsTiers = [
  { name: 'Session Replay', featured: false },
  { name: 'Chrome DevTools', featured: false },
  { name: 'Replay DevTools', featured: true }
]

const allDevTools = [true, true, true]
const chromeDevTools = [false, true, true]
const replayDevTools = [false, false, true]

export const devToolsSections = [
  {
    name: 'Replay DevTools',
    subtitle: 'Debug your app with 100% reproducibility',
    features: [
      { name: 'Console logs', values: allDevTools },
      { name: 'Network monitor', values: allDevTools },
      { name: 'Elements panel', values: allDevTools },
      { name: 'React DevTools', values: chromeDevTools },
      { name: 'Redux DevTools', values: chromeDevTools },
      { name: 'Code coverage', values: replayDevTools },
      { name: 'Live console logs', values: replayDevTools },
      { name: 'Playwright Panel', values: replayDevTools },
      { name: 'Cypress Panel', values: replayDevTools }
    ]
  }
]
