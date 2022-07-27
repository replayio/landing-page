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
        description: `Record Node scripts and Playwright and Puppeteer tests in CI with API Keys. With Replay, you can record the flakey test once and debug it directly.`
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
      'The organization plan offers additional controls around access to Replay and how replays are recorded.',
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
        title: 'Single sign on authentication',
        description: `Replay handles authentication with Google SSO by default. Additional identity providers and authentication protocols of your choice are available.`
      }
    ]
  },
  {
    type: 'Enterprise',
    icon: enterprise,
    description:
      'The organization plan offers additional controls around access to Replay and how replays are recorded.',
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
      }
    ]
  }
]
