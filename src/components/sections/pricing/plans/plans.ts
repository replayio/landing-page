import enterprise from '~/public/images/pricing/enterprise.svg'
import individual from '~/public/images/pricing/individual.svg'
import organization from '~/public/images/pricing/organization.svg'
import team from '~/public/images/pricing/team.svg'

export const plans = [
  {
    type: 'Individual',
    icon: individual,
    description:
      'Replay will always be free for local development, open source, and collaboration.',
    cta: 'Sign Up',
    link: 'https://app.replay.io/',
    content: [
      {
        features: {
          title: 'Perfect for',
          items: [
            'Debugging your app locally',
            'Posting a question on StackOverflow',
            'Adding a replay to a GitHub issue',
            'Getting feedback from friends'
          ]
        }
      },
      {
        title: 'Private by default',
        description:
          'Replays are private by default so that you have the ability to decide if you would like to make your replay publicly available or invite collaborators.'
      },
      {
        title: 'Single sign on authentication',
        description:
          'Google SSO is available by default for all of our plan levels because security should not be expensive.'
      }
    ]
  },
  {
    type: 'Team',
    icon: team,
    description:
      'Team workspaces make it easy to collaborate, manage recordings, and track conversations so that bugs get fixed faster.',
    cta: 'Create Team',
    link: 'https://app.replay.io/team/new',
    content: [
      {
        title: 'Only pay for developers on your team',
        description:
          'Replay is best when anyone on the team can record and collaborate within Replay. This is why teams can be up to ten users and you only pay per developer.'
      },
      {
        title: 'Upload source maps',
        description: `Upload source maps at deploy time to Replay's secure backend with our Webpack and Next.js integrations or CLI. Because source maps are associated with the team, only members will have access to them.`
      },
      {
        title: 'Create recordings programmatically',
        description: `Record Node scripts and Playwright and Puppeteer tests in CI with API Keys. With Replay, you can record the flaky test once and debug it directly.`
      },
      {
        title: 'Open source communities',
        description: `Teams are a safe way for open source communities to receive private replays that only maintainers will be able to view. Email support@replay.io and we'll cover the cost.`
      }
    ]
  },
  {
    type: 'Organization',
    icon: organization,
    description:
      'Organization includes Team workspaces with additional controls around access and recordings, SSO / SAML integration and Enterprise Security features.',
    cta: 'Create Organization',
    link: 'https://app.replay.io/org/new',
    content: [
      {
        features: {
          title: 'Account-level access controls',
          items: [
            'Limit team members by email domain',
            'Disable public recordings',
            'Allow and block recordings on specific domains'
          ]
        }
      },
      {
        title: 'Multiple Teams',
        description:
          'Create multiple teams for different workflows, environments and teams within your Organization. We set an Org-wide cap at 10k recordings / month and up to 100 users / developers.'
      },
      {
        title: 'Test Suites',
        description:
          'We offer custom integrations with your e2e test runner and CI/CD pipeline e.g. Playwright, Cypress. Add Replay to CI, upload Replay for test failures to record and debug flaky tests. '
      },
      {
        title: 'Single sign on authentication',
        description: `Replay handles authentication with Google SSO by default. Additional identity providers and authentication protocols of your choice are available e.g Okta.`
      }
    ]
  },
  {
    type: 'Enterprise',
    icon: enterprise,
    description:
      'The enterprise plan offers additional controls around how Replays are managed, how they are recorded, and how they are stored. We also happy to discuss additional customizations around security, platform support, and debugging functionality.',
    cta: 'Email Us',
    link: 'mailto:sales@replay.io',
    content: [
      {
        title: 'Own your data',
        description: `Retain full control of your Replay data. Host a storage bucket that Replay uses to store all of your replays. Revoke and monitor access to your replay data.`
      },
      {
        title: 'Support',
        description: `Access to dedicated support and a 99.9% uptime commitment for all scheduled availability.`
      },
      {
        title: 'Custom integrations',
        description:
          'Integrate Replay into your existing bug reporting, CI/CD, and development workflows. e.g. Jira, Jenkins, Selenium, Sentry, NextJS'
      }
    ]
  },
  {
    type: 'Open Source',
    icon: organization,
    description:
      'Our Open Source Plan offers the same features of our Team Plan with more flexibility on the number of users and developers.',
    cta: 'Email Us',
    link: 'mailto:sales@replay.io',
    content: [
      {
        title: 'Team Plan',
        description: `Access to Team Plan features with flexibility on the number of seats for developers and users to fit large and growing Open Source projects taht want to use Replay at scale.`
      },
      {
        title: 'Issue Template Best Practices',
        description: `Documentation and onboarding support to get your bug report process in good shape with Replay.`
      },
      {
        title: 'Team Inbox',
        description: `Contributors can submit Replays and share them with maintainers so they can be easily triaged with source map support.`
      }
    ]
  }
]
