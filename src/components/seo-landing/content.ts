// Copy for the three SEO landing pages, from the approved briefs (Magister plan item
// b0db0182-3ca8-4ae1-8809-04d8eb3c0513). Only claims stated in public/for-llms.txt belong here.

export type SeoVariantKey = 'web-application-testing' | 'continuous-testing' | 'automated-qa-testing'

export type SeoVariant = {
  key: SeoVariantKey
  keyword: string
  monthlyVolume: number
  path: string
  titleTag: string
  metaDescription: string
  eyebrow: string
  h1: string
  subhead: string
  features: {
    label: string
    heading: string
    items: Array<{ title: string; body: string }>
  }
  steps: {
    label: string
    heading: string
    items: Array<{ title: string; body: string }>
  }
  highlight: {
    label: string
    heading: string
    body: string
    href?: string
    linkLabel?: string
  }
  faqs: Array<{ question: string; answer: string }>
}

const bugCategories = [
  {
    title: 'Deep runtime bugs',
    body: 'React component failures, state mutations, race conditions, and async timing.'
  },
  {
    title: 'UI glitches',
    body: 'Layout shifts, broken buttons, and elements hidden behind overlays.'
  },
  {
    title: 'Accessibility',
    body: 'WCAG contrast violations, missing ARIA labels, and keyboard traps.'
  },
  {
    title: 'Performance',
    body: 'Slow network calls, render-blocking resources, and long tasks.'
  }
]

const howItWorks = [
  { title: 'Start', body: 'Paste a URL or connect a GitHub repo. No setup beyond that.' },
  {
    title: 'Exploration',
    body: 'Agents map the app, discover user journeys, and identify flows worth testing.'
  },
  {
    title: 'Testing',
    body: 'A swarm of agents runs all journeys in parallel in a Chromium browser, recording every session deterministically.'
  },
  {
    title: 'Analysis',
    body: 'For failed tests, agents time-travel through recordings to find root cause. They read what the app did at runtime, not what the code says it should do.'
  },
  {
    title: 'Reports',
    body: 'Each bug comes with a video recording, annotated screenshots, root cause analysis with a confidence score, and a suggested fix.'
  },
  {
    title: 'The Loop',
    body: 'Apply fixes, ship, re-run. The same journeys verify the fix and catch regressions.'
  }
]

const pricingFaq = {
  question: 'How much does it cost?',
  answer:
    'Free includes 25 credits a month with no credit card required. Starter is $20/month and Pro is $200/month, with Private Cloud and On-Prem available. Credits are consumed per unit of work, such as a journey discovered or a bug analyzed. An average app costs about 20 credits per full QA run.'
}

export const seoVariants: SeoVariant[] = [
  {
    key: 'web-application-testing',
    keyword: 'web application testing service',
    monthlyVolume: 90,
    path: '/web-application-testing',
    titleTag: 'Web Application Testing Service — Paste a URL | Replay QA',
    metaDescription:
      'Replay QA explores your web app, writes and runs its own Playwright tests, records every session, and files bug reports with root cause and a suggested fix.',
    eyebrow: 'Web application testing',
    h1: 'A web application testing service that needs only a URL',
    subhead:
      'Replay QA explores your web app, writes and runs its own Playwright tests, records every session, and files bug reports with root cause and a suggested fix. No test suite, QA team, or manual configuration.',
    features: {
      label: 'What gets tested',
      heading: 'Functional, UI, accessibility, and performance in one pass',
      items: bugCategories
    },
    steps: {
      label: 'How it works',
      heading: 'From URL to bug report in six steps',
      items: howItWorks
    },
    highlight: {
      label: 'Optional security scan',
      heading: 'Add a security pass to the same run',
      body: 'Check for injection, broken access control, weak authentication, insecure API behavior, IDOR, and cross-tenant data exposure. Test dev, staging, production, or localhost through a reverse proxy.',
      href: '/security',
      linkLabel: 'See the security scan'
    },
    faqs: [
      {
        question: 'What do I need to get started?',
        answer:
          'A URL or a connected GitHub repository. Replay QA explores the app and writes its own tests, so there is no test suite to build first.'
      },
      {
        question: 'What is in a bug report?',
        answer:
          'A video recording of the failure, annotated screenshots, root cause analysis with a confidence score, and a suggested fix ready for a coding agent to apply.'
      },
      {
        question: 'Which environments can it test?',
        answer:
          'Dev, staging, production, or localhost through a reverse proxy, all from one project.'
      },
      pricingFaq
    ]
  },
  {
    key: 'continuous-testing',
    keyword: 'continuous testing platform',
    monthlyVolume: 30,
    path: '/continuous-testing',
    titleTag: 'Continuous Testing Platform for Web Apps | Replay QA',
    metaDescription:
      'Run Replay QA on every push, PR or schedule. The same journeys verify fixes and catch regressions, with bug reports sent to GitHub, Linear or Jira.',
    eyebrow: 'Continuous testing',
    h1: 'A continuous testing platform that re\u2011tests every change',
    subhead:
      'Run Replay QA on every push, PR, or schedule. The same journeys verify fixes and catch regressions, and new app changes are detected and tested automatically.',
    features: {
      label: 'Triggers',
      heading: 'Runs when your code changes, or on your schedule',
      items: [
        {
          title: 'GitHub app',
          body: 'Trigger on push to main, on pull requests, or on a schedule. PR runs post the root cause and suggested fix as a PR comment.'
        },
        {
          title: 'Scheduled runs',
          body: 'Run daily or weekly. An overnight run leaves a fresh batch of prioritized issues each morning.'
        },
        {
          title: 'REST API',
          body: 'Trigger runs, switch environments, retrieve results, and mark bugs resolved from your own orchestration.'
        },
        {
          title: 'Multi-environment',
          body: 'One project targets dev, staging, production, or localhost through a reverse proxy.'
        }
      ]
    },
    steps: {
      label: 'Where results go',
      heading: 'Bug reports land where your team and agents work',
      items: [
        {
          title: 'Issue trackers',
          body: 'Webhooks to GitHub Issues, Linear, Jira, or any HTTP endpoint. File manually, on confirmed bugs only, or for all reports.'
        },
        {
          title: 'Coding agents',
          body: 'The Replay MCP server lets agents pull structured bug reports and time-travel debug their own failures.'
        },
        {
          title: 'Reviewers',
          body: 'Every failure is recorded deterministically, including DOM mutations, network calls, and JS frames, so reviewers get a recording instead of a diff.'
        }
      ]
    },
    highlight: {
      label: 'For autonomous coding pipelines',
      heading: 'A runtime verification layer for your factory',
      body: 'Trigger runs via the REST API, receive structured bug reports your agents can act on, and re-run the same journeys to verify each fix.',
      href: '/for-software-factories',
      linkLabel: 'Replay QA for software factories'
    },
    faqs: [
      {
        question: 'How do I run tests on every change?',
        answer:
          'Install the Replay QA GitHub app on your repo. It triggers on push to main, on pull requests, or on a schedule.'
      },
      {
        question: 'How are regressions caught?',
        answer:
          'After you apply a fix and ship, Replay QA re-runs the same journeys to verify the fix and catch regressions. New app changes are detected and tested automatically.'
      },
      {
        question: 'Can I trigger runs from my own pipeline?',
        answer:
          'Yes. The REST API at qa.replay.io/api/v1 lets you trigger runs, switch environments, retrieve results, and mark bugs resolved.'
      },
      pricingFaq
    ]
  },
  {
    key: 'automated-qa-testing',
    keyword: 'automated qa testing tool',
    monthlyVolume: 10,
    path: '/automated-qa-testing',
    titleTag: 'Automated QA Testing Tool — No Test Suite Needed | Replay',
    metaDescription:
      "Replay QA maps your app's user journeys, writes and runs Playwright tests, and debugs failures with time-travel recordings. Free to start, no credit card.",
    eyebrow: 'Automated QA testing',
    h1: 'An automated QA testing tool that writes its own tests',
    subhead:
      "Replay QA maps your app's user journeys, writes and runs Playwright tests, and debugs failures with time-travel recordings. No test suite, QA team, or manual configuration.",
    features: {
      label: "What's automated",
      heading: 'The whole QA loop, not just test execution',
      items: [
        {
          title: 'Exploration',
          body: 'Agents map the app and find the flows worth testing.'
        },
        {
          title: 'Test authoring and execution',
          body: 'Playwright tests are written and run in a Chromium browser.'
        },
        {
          title: 'Analysis',
          body: 'Agents read what the app did at runtime, not what the code says it should do.'
        },
        {
          title: 'Reporting',
          body: 'Root cause with a confidence score, plus a suggested fix ready for a coding agent.'
        }
      ]
    },
    steps: {
      label: 'What it catches',
      heading: 'Bugs across runtime, UI, accessibility, and performance',
      items: bugCategories
    },
    highlight: {
      label: "Built on Replay's time-travel debugger",
      heading: 'Every session recorded deterministically',
      body: 'Replay QA is built by Replay.io, founded by ex-Mozilla engineers. Every DOM mutation, network call, and JS frame is captured, so failures can be debugged after the fact.',
      href: '/how-it-works',
      linkLabel: 'See how it works'
    },
    faqs: [
      {
        question: 'Do I need to write tests?',
        answer:
          'No. Agents explore your app, discover user journeys, and write and run their own Playwright tests.'
      },
      {
        question: 'How does it find the root cause of a failure?',
        answer:
          'Every session is recorded with a deterministic time-travel debugger. For failed tests, agents time-travel through the recording to find root cause.'
      },
      pricingFaq
    ]
  }
]
