// Copy for the /compare hub and the "Replay QA vs X" pages.
// Replay claims must be stated in public/for-llms.txt. Competitor claims must come from the
// competitor's own public site or docs, listed in `sources`, and be re-checked on `lastVerified`.

export type CompetitorKey =
  | 'momentic'
  | 'ranger'
  | 'tester-army'
  | 'posthog'
  | 'qa-wolf'
  | 'meticulous'
  | 'browserstack'
  | 'sauce-labs'
  | 'playwright'
  | 'coding-agents'

export type Relationship = 'alternative' | 'alongside' | 'diy'

export type DimensionKey =
  | 'setup'
  | 'testSuite'
  | 'discovery'
  | 'evidence'
  | 'rootCause'
  | 'codeFix'
  | 'traffic'
  | 'mobile'
  | 'agents'
  | 'pricing'

export type Cell = { verdict?: 'yes' | 'partial' | 'no'; text: string }

export type Point = { title: string; body: string }

export type Competitor = {
  key: CompetitorKey
  name: string
  relationship: Relationship
  path: string
  titleTag: string
  metaDescription: string
  h1: string
  subhead: string
  oneLiner: string
  tldr: string[]
  matrix: Record<DimensionKey, Cell>
  // alternative: where Replay goes further / where they are stronger
  // alongside: how they work together / where Replay goes further
  // diy: what your agent does well (strongerAt) / what changes (replayFurther) / together
  replayFurther: Point[]
  strongerAt: Point[]
  together?: Point[]
  chooseThemIf: string[]
  chooseReplayIf: string[]
  faqs: Array<{ question: string; answer: string }>
  lastVerified: string
  sources: string[]
}

export const DIMENSIONS: Array<{ key: DimensionKey; label: string }> = [
  { key: 'setup', label: 'What you provide' },
  { key: 'testSuite', label: 'Test suite' },
  { key: 'discovery', label: 'How bugs are found' },
  { key: 'evidence', label: 'Evidence' },
  { key: 'rootCause', label: 'Root cause analysis' },
  { key: 'codeFix', label: 'Suggested code fix' },
  { key: 'traffic', label: 'Needs real user traffic' },
  { key: 'mobile', label: 'Native mobile' },
  { key: 'agents', label: 'Coding agent access' },
  { key: 'pricing', label: 'Pricing' }
]

export const replayColumn: Record<DimensionKey, Cell> = {
  setup: { text: 'A URL or a GitHub repo. No setup beyond that.' },
  testSuite: { text: 'None needed. Writes and runs its own Playwright tests.' },
  discovery: { text: 'Agents explore the app and discover user journeys themselves.' },
  evidence: {
    text: 'Deterministic time-travel recording of every session, plus video and annotated screenshots.'
  },
  rootCause: {
    verdict: 'yes',
    text: 'Agents time-travel through the recording; each report has a confidence score.'
  },
  codeFix: {
    verdict: 'yes',
    text: 'Every bug report includes a suggested fix for a coding agent.'
  },
  traffic: { verdict: 'no', text: 'No. Tests before you ship.' },
  mobile: { verdict: 'no', text: 'No. Web apps, tested in Chromium.' },
  agents: { verdict: 'yes', text: 'Replay MCP server, REST API, and PR comments.' },
  pricing: { text: 'Free (25 credits/mo), Starter $20/mo, Pro $200/mo.' }
}

const VERIFIED = '2026-10-14'

const pricingAnswer =
  'Replay QA has a free plan with 25 credits a month and no credit card. Starter is $20/month and Pro is $200/month, with Private Cloud and On-Prem available. An average app costs about 20 credits per full QA run.'

export const competitors: Competitor[] = [
  // ---------------------------------------------------------------- Alternatives
  {
    key: 'momentic',
    name: 'Momentic',
    relationship: 'alternative',
    path: '/compare/momentic',
    titleTag: 'Replay QA vs Momentic: AI QA Agents Compared',
    metaDescription:
      'Replay QA vs Momentic and its Mo agent: how each explores your app, what evidence you get, root cause and suggested fixes, mobile support, and pricing.',
    h1: 'Replay QA vs Momentic',
    subhead:
      'Both run an AI agent against your live app. Momentic’s Mo works from a brief and reports reproduced findings. Replay QA starts from a URL, records every session deterministically, and hands your coding agent a root cause and a suggested fix.',
    oneLiner: 'Briefed AI QA agent plus a YAML test framework, with native mobile.',
    tldr: [
      'Mo explores from a brief that defines target, scope, accounts, test data and prohibited actions. Replay QA starts from a URL or a GitHub repo.',
      'Momentic gives you screenshots, video and traces. Replay QA gives you a deterministic recording your agent can time-travel through.',
      'Momentic covers native iOS and Android. Replay QA is web only.'
    ],
    matrix: {
      setup: {
        text: 'A reachable URL or mobile build, sign-in instructions, a test account, and a brief.'
      },
      testSuite: { text: 'Plain-English YAML tests in your repo, plus Mo for exploration.' },
      discovery: { text: 'Mo explores toward the objective in your brief.' },
      evidence: {
        text: 'Screenshots, video and traces per step; DOM, network and console for agents.'
      },
      rootCause: {
        verdict: 'partial',
        text: 'Triage classifies failures as app bug, flaky or environment.'
      },
      codeFix: {
        verdict: 'no',
        text: 'No. Export the report so your coding agent can investigate.'
      },
      traffic: { verdict: 'no', text: 'No.' },
      mobile: { verdict: 'yes', text: 'Yes. iOS simulators and Android emulators.' },
      agents: {
        verdict: 'yes',
        text: 'MCP servers and skills for Cursor, Claude Code, Codex and more.'
      },
      pricing: { text: 'Free (2,000 credits), $125/mo pay-as-you-go, Enterprise.' }
    },
    replayFurther: [
      {
        title: 'A URL, not a brief',
        body: 'Momentic asks you to define the target, scope, accounts, test data and prohibited actions for each Mo run. Replay QA starts from a URL or a GitHub repo, then maps the app and discovers the journeys itself.'
      },
      {
        title: 'Recorded causality, not reconstructed',
        body: 'Momentic captures screenshots, video and traces and lets agents read the code alongside them. Replay QA records every session with a deterministic time-travel debugger, capturing every DOM mutation, network call and JS frame. Agents trace a failure through what the app actually executed.'
      },
      {
        title: 'A suggested fix in every report',
        body: 'Momentic’s documented loop is to export a report and let your coding agent investigate. Every Replay QA bug report already includes root cause analysis with a confidence score and a suggested fix.'
      },
      {
        title: 'Flat plans',
        body: 'Momentic’s pay-as-you-go tier bills overage per credit with no hard cap. Replay QA has fixed monthly plans: Starter at $20 and Pro at $200.'
      }
    ],
    strongerAt: [
      {
        title: 'Native mobile',
        body: 'Momentic tests iOS on simulators and Android on emulators. Replay QA tests web apps only.'
      },
      {
        title: 'Reproduction before reporting',
        body: 'A separate Momentic agent reproduces functional bugs before they are reported, which keeps noise down.'
      },
      {
        title: 'Test-suite maintenance',
        body: 'If you want an authored regression suite in your repo, Momentic’s YAML tests, triage and proposed test repairs are built for that.'
      }
    ],
    chooseThemIf: [
      'You need native iOS or Android testing.',
      'You want a hand-authored regression suite living in your repo.',
      'You can write a precise brief for each area you want explored.'
    ],
    chooseReplayIf: [
      'You want testing to start from a URL with nothing else to configure.',
      'You want a root cause and a suggested fix, not just a finding.',
      'Your coding agents need to query exactly what the app did when it failed.'
    ],
    faqs: [
      {
        question: 'Is Replay QA a Momentic alternative?',
        answer:
          'Yes, for web apps. Both run an AI agent against your live app. Replay QA starts from a URL or GitHub repo, records every session deterministically, and returns root cause and a suggested fix. If you need native mobile testing, Momentic covers it and Replay QA does not.'
      },
      {
        question: 'Does Replay QA need a brief like Mo?',
        answer:
          'No. Paste a URL or connect a GitHub repo. Agents map the app, discover user journeys and pick the flows worth testing.'
      },
      {
        question: 'Can my coding agent use the results?',
        answer:
          'Yes. Each Replay QA bug report includes a suggested fix ready for a coding agent, and the Replay MCP server lets agents pull reports and time-travel debug the recording.'
      },
      { question: 'How much does Replay QA cost?', answer: pricingAnswer }
    ],
    lastVerified: VERIFIED,
    sources: [
      'https://momentic.ai/',
      'https://momentic.ai/mo',
      'https://momentic.ai/pricing',
      'https://momentic.ai/docs/mo.md',
      'https://momentic.ai/coding-agents'
    ]
  },
  {
    key: 'ranger',
    name: 'Ranger',
    relationship: 'alternative',
    path: '/compare/ranger',
    titleTag: 'Replay QA vs Ranger: AI QA Platforms Compared',
    metaDescription:
      'Replay QA vs Ranger: scenario-based verification inside your coding agent, or autonomous exploration with deterministic recordings, root cause and fixes.',
    h1: 'Replay QA vs Ranger',
    subhead:
      'Ranger verifies the feature your coding agent just built, using scenarios the agent writes. Replay QA explores the whole app from a URL and returns root cause and a suggested fix for every bug it finds.',
    oneLiner: 'Verifies features inside your coding agent’s loop, using scenarios you approve.',
    tldr: [
      'Ranger tests scenarios your coding agent writes and you approve. Replay QA discovers user journeys on its own.',
      'Ranger returns a verdict with screenshots, video and Playwright traces. Replay QA adds a deterministic recording, root cause and a suggested fix.',
      'Ranger runs locally inside the agent loop. Replay QA runs on every PR, push or schedule, and through the REST API.'
    ],
    matrix: {
      setup: { text: 'Install the CLI, run setup, and add a profile per environment.' },
      testSuite: { text: 'Scenarios written by your coding agent and approved by you.' },
      discovery: { text: 'Verifies the scenarios for the feature you just built.' },
      evidence: { text: 'Screenshots, video recordings and Playwright traces.' },
      rootCause: { verdict: 'partial', text: 'Failures are triaged into a verdict.' },
      codeFix: { verdict: 'no', text: 'Your coding agent fixes the code and re-tests.' },
      traffic: { verdict: 'no', text: 'No.' },
      mobile: { verdict: 'no', text: 'Not documented. Supports Electron apps.' },
      agents: { verdict: 'yes', text: 'Claude Code plugin; skills for Cursor and Codex.' },
      pricing: { text: 'Free (5 reviews), $50/user/mo Growth, Enterprise.' }
    },
    replayFurther: [
      {
        title: 'Finds what nobody wrote a scenario for',
        body: 'Ranger verifies the scenarios for a feature. Replay QA explores the whole app, discovers journeys on its own, and re-runs them to catch regressions anywhere.'
      },
      {
        title: 'Root cause and a fix',
        body: 'Ranger hands a verdict back to your coding agent. Replay QA agents time-travel through a deterministic recording to find root cause, then suggest a fix.'
      },
      {
        title: 'More than functional bugs',
        body: 'Every Replay QA run also checks accessibility and performance, and an optional Security Scan covers injection, access control and business-logic flaws.'
      },
      {
        title: 'Pricing that doesn’t scale with seats',
        body: 'Ranger’s Growth plan is per user. Replay QA plans are per team, priced by usage credits.'
      }
    ],
    strongerAt: [
      {
        title: 'Inside the agent loop',
        body: 'Ranger checks a feature before your coding agent says it’s done, which is a tight feedback loop for agent-driven development.'
      },
      {
        title: 'Human review flow',
        body: 'Ranger’s dashboard has a PR-style approve and request-changes flow for test results.'
      },
      {
        title: 'Code stays local',
        body: 'Ranger runs verification locally and says your code is never stored on its servers.'
      }
    ],
    chooseThemIf: [
      'You want each feature checked inside your coding agent’s session before it finishes.',
      'You prefer to approve the scenarios that get tested.',
      'You need to test Electron apps.'
    ],
    chooseReplayIf: [
      'You want coverage of the whole app, not just the feature in front of you.',
      'You want root cause analysis and a suggested fix with each bug.',
      'You want runs on every PR, push or schedule without per-seat pricing.'
    ],
    faqs: [
      {
        question: 'Is Replay QA a Ranger alternative?',
        answer:
          'Yes. Both test web apps with AI agents. Ranger verifies scenarios for the feature you’re building. Replay QA explores the whole app from a URL and returns root cause and a suggested fix for each bug.'
      },
      {
        question: 'Can I test localhost with Replay QA?',
        answer:
          'Yes. The reverse proxy lets Replay QA test localhost or private-network apps without exposing them publicly.'
      },
      {
        question: 'Does Replay QA work with my coding agent?',
        answer:
          'Yes. Bug reports include a suggested fix ready for a coding agent, and the Replay MCP server lets agents pull reports and time-travel debug failures.'
      },
      { question: 'How much does Replay QA cost?', answer: pricingAnswer }
    ],
    lastVerified: VERIFIED,
    sources: ['https://ranger.net/', 'https://ranger.net/pricing', 'https://docs.ranger.net/']
  },
  {
    key: 'tester-army',
    name: 'Tester Army',
    relationship: 'alternative',
    path: '/compare/tester-army',
    titleTag: 'Replay QA vs Tester Army: AI Testing Compared',
    metaDescription:
      'Replay QA vs Tester Army: plain-English test runs and discovery runs, or autonomous exploration with deterministic recordings, root cause and suggested fixes.',
    h1: 'Replay QA vs Tester Army',
    subhead:
      'Tester Army runs plain-English tests on web and mobile and alerts you when a step fails. Replay QA explores your web app from a URL, records every session deterministically, and tells you why it broke and how to fix it.',
    oneLiner: 'Plain-English test runs on web and mobile, with Slack alerts and an MCP endpoint.',
    tldr: [
      'Tester Army tests are prompts turned into editable steps. Discovery runs explore toward a goal, capped at 12 steps and 15 minutes. Replay QA maps the app and discovers journeys itself.',
      'Tester Army gives you video, screenshots, logs and an agent transcript. Replay QA adds root cause analysis and a suggested fix.',
      'Tester Army covers iOS and Android. Replay QA is web only.'
    ],
    matrix: {
      setup: { text: 'A URL or app build, plus a prompt for each test.' },
      testSuite: { text: 'Plain-English prompts turned into editable steps.' },
      discovery: { text: 'Your tests, PR test plans, and goal-driven discovery runs.' },
      evidence: { text: 'Video synced to steps, screenshots, console and network logs.' },
      rootCause: { verdict: 'no', text: 'Not described. You get the transcript and logs.' },
      codeFix: { verdict: 'no', text: 'No.' },
      traffic: { verdict: 'no', text: 'No.' },
      mobile: { verdict: 'yes', text: 'Yes. iOS and Android builds, React Native and Expo.' },
      agents: { verdict: 'yes', text: 'Hosted MCP endpoint and CLI.' },
      pricing: { text: 'Free (5 runs), $99/mo (250 runs), $299/mo (1,000 runs).' }
    },
    replayFurther: [
      {
        title: 'Why it broke, not just that it broke',
        body: 'Tester Army tells you which step failed and what the agent saw. Replay QA agents time-travel through a deterministic recording to find root cause and attach a suggested fix.'
      },
      {
        title: 'No tests to write',
        body: 'Tester Army tests start from a prompt you write. Replay QA explores from a URL and writes and runs its own Playwright tests.'
      },
      {
        title: 'Security in the same tool',
        body: 'Replay QA’s optional Security Scan looks for injection, broken access control, weak authentication and business-logic gaps like cross-tenant data exposure.'
      }
    ],
    strongerAt: [
      {
        title: 'Native mobile',
        body: 'Tester Army tests iOS and Android builds, including React Native and Expo. Replay QA tests web apps only.'
      },
      {
        title: 'Login coverage',
        body: 'Test accounts support Google and GitHub OAuth, magic links and SMS codes.'
      },
      {
        title: 'Open-source framework',
        body: 'Tester Army publishes an Apache-2.0 testing framework you can run with your own model.'
      }
    ],
    chooseThemIf: [
      'You need to test native mobile apps.',
      'You want to write specific flows in plain English and monitor them.',
      'You want an open-source framework to self-host.'
    ],
    chooseReplayIf: [
      'You don’t want to write tests at all.',
      'You want root cause and a suggested fix, ready for your coding agent.',
      'You want functional, accessibility, performance and security bugs from one run.'
    ],
    faqs: [
      {
        question: 'Is Replay QA a Tester Army alternative?',
        answer:
          'Yes, for web apps. Both test your running app with AI agents and plug into coding agents. Replay QA needs no prompts or tests, and every bug report includes root cause and a suggested fix. Tester Army also covers native mobile.'
      },
      {
        question: 'Does Replay QA run on pull requests?',
        answer:
          'Yes. Install the GitHub app and runs trigger on PRs, pushes to main, or a schedule. PR runs post root cause and a suggested fix as a PR comment.'
      },
      {
        question: 'Can Replay QA file issues?',
        answer:
          'Yes. Webhooks send reports to GitHub Issues, Linear, Jira or any HTTP endpoint, either for every report or confirmed bugs only.'
      },
      { question: 'How much does Replay QA cost?', answer: pricingAnswer }
    ],
    lastVerified: VERIFIED,
    sources: [
      'https://tester.army/',
      'https://tester.army/pricing',
      'https://tester.army/e2e.md',
      'https://docs.tester.army/run/discovery-runs.md',
      'https://docs.tester.army/get-started/quick-start'
    ]
  },
  {
    key: 'posthog',
    name: 'PostHog',
    relationship: 'alternative',
    path: '/compare/posthog',
    titleTag: 'Replay QA vs PostHog Self-Driving: Compared',
    metaDescription:
      'Replay QA vs PostHog self-driving: finding bugs from production user data, or testing your app before you ship with deterministic recordings and fixes.',
    h1: 'Replay QA vs PostHog self-driving',
    subhead:
      'PostHog finds problems in what your users already did and opens PRs to fix them. Replay QA tests your app before anyone uses it, records every session deterministically, and suggests the fix.',
    oneLiner: 'Finds issues in production user data and opens fix PRs.',
    tldr: [
      'PostHog’s signals come from real usage: errors, dead clicks, session replays and support tickets. Replay QA needs no users.',
      'PostHog session replay reconstructs the DOM, and third-party iframes such as Stripe Checkout can’t be recorded. Replay QA records the browser deterministically.',
      'Both deliver fixes for review. Replay QA re-runs the same journeys to verify the fix.'
    ],
    matrix: {
      setup: { text: 'Install the PostHog SDK, run the wizard, connect GitHub.' },
      testSuite: { text: 'None.' },
      discovery: { text: 'Scheduled agents watch production errors, replays and tickets.' },
      evidence: { text: 'Session replay (DOM reconstruction), stack traces, events.' },
      rootCause: { verdict: 'yes', text: 'Investigated reports in an Inbox.' },
      codeFix: { verdict: 'yes', text: 'Opens PRs for actionable reports; you merge.' },
      traffic: { verdict: 'yes', text: 'Yes. Signals come from real usage.' },
      mobile: { verdict: 'partial', text: 'Mobile replay and analytics; no mobile testing.' },
      agents: { verdict: 'yes', text: 'PostHog MCP, CLI and desktop app.' },
      pricing: { text: '$15 per self-driving PR (3 free/mo); usage pricing per product.' }
    },
    replayFurther: [
      {
        title: 'Before users hit it',
        body: 'PostHog’s loop starts when a real user hits an error, a dead click or files a ticket. Replay QA tests every journey before you ship, so it works on a new app with no users at all.'
      },
      {
        title: 'Runs your app to prove the fix',
        body: 'Replay QA re-runs the same journeys after you apply a fix, verifying it in a real browser and catching regressions.'
      },
      {
        title: 'A recording of what actually ran',
        body: 'Replay QA captures every DOM mutation, network call and JS frame deterministically. PostHog session replay reconstructs the DOM and cannot record third-party iframes.'
      }
    ],
    strongerAt: [
      {
        title: 'Real-user impact',
        body: 'PostHog ranks problems by what real users actually experienced, which no pre-release test can see.'
      },
      {
        title: 'One product-data platform',
        body: 'Analytics, feature flags, experiments, session replay and error tracking live in the same place.'
      },
      {
        title: 'Free tier and mobile replay',
        body: 'PostHog has a generous free tier and replays native iOS, Android, React Native and Flutter sessions.'
      }
    ],
    together: [
      {
        title: 'Before and after release',
        body: 'Replay QA catches bugs before you ship. PostHog watches what slips through in production. Many teams want both halves.'
      }
    ],
    chooseThemIf: [
      'You have meaningful production traffic and want fixes ranked by user impact.',
      'You already use PostHog for analytics, replay or error tracking.'
    ],
    chooseReplayIf: [
      'You want bugs caught before release, not after a user hits them.',
      'You ship faster than real traffic can reveal problems, or you have few users yet.',
      'You want each fix verified by re-running the journey in a real browser.'
    ],
    faqs: [
      {
        question: 'Is Replay QA a PostHog alternative?',
        answer:
          'For finding and fixing bugs, they work at different stages. PostHog self-driving uses production data. Replay QA tests your app before release and needs no users. Many teams use both.'
      },
      {
        question: 'Is Replay QA a session replay tool?',
        answer:
          'No. Replay QA explores and tests your app itself, recording each test session with a deterministic time-travel debugger. It does not record your end users.'
      },
      {
        question: 'Does Replay QA open fixes?',
        answer:
          'Every bug report includes a suggested fix ready for a coding agent. On GitHub PR runs, root cause and the suggested fix are posted as a PR comment.'
      },
      { question: 'How much does Replay QA cost?', answer: pricingAnswer }
    ],
    lastVerified: VERIFIED,
    sources: [
      'https://posthog.com/self-driving',
      'https://posthog.com/docs/self-driving',
      'https://posthog.com/pricing',
      'https://posthog.com/docs/session-replay/iframes'
    ]
  },

  // ---------------------------------------------------------------- Works alongside
  {
    key: 'qa-wolf',
    name: 'QA Wolf',
    relationship: 'alongside',
    path: '/compare/qa-wolf',
    titleTag: 'Replay QA vs QA Wolf: How They Compare',
    metaDescription:
      'Replay QA vs QA Wolf: a managed Playwright and Appium test factory, or an autonomous QA agent that records every run and returns root cause and a fix.',
    h1: 'Replay QA vs QA Wolf',
    subhead:
      'QA Wolf builds, runs and maintains your end-to-end test suite, with its own agents and experts. Replay QA explores your app autonomously and explains why things break, down to a suggested code fix.',
    oneLiner: 'Managed E2E coverage in open-source Playwright and Appium.',
    tldr: [
      'QA Wolf is built around a durable regression suite, either self-serve or fully managed. Replay QA needs no suite.',
      'QA Wolf separates app bugs from out-of-date tests and repairs the tests. Replay QA diagnoses the app bug and suggests a code fix.',
      'QA Wolf covers web, iOS, Android and Electron. Replay QA is web only.'
    ],
    matrix: {
      setup: { text: 'Self-serve platform, or a managed service via sales.' },
      testSuite: { text: 'Playwright and Appium suite, created and maintained for you.' },
      discovery: { text: 'Mapping AI maps test cases; the suite runs on schedule or deploy.' },
      evidence: { text: 'Video, Playwright traces, console logs; human-verified reports.' },
      rootCause: { verdict: 'partial', text: 'Classifies failures as app bug or outdated test.' },
      codeFix: { verdict: 'no', text: 'Repairs tests, not application code.' },
      traffic: { verdict: 'no', text: 'No.' },
      mobile: { verdict: 'yes', text: 'Yes, including real iPhones and iPads.' },
      agents: { verdict: 'yes', text: 'MCP server for Claude Code, Codex and others.' },
      pricing: { text: '1¢/AI credit + 15¢/runner minute; managed tier by quote.' }
    },
    together: [
      {
        title: 'Suite plus diagnosis',
        body: 'QA Wolf keeps a regression suite running across web and mobile. Replay QA explores beyond the suite and, when something breaks, records the run and finds root cause in your app code.'
      },
      {
        title: 'Both speak Playwright',
        body: 'QA Wolf tests are open-source Playwright. Replay QA writes and runs its own Playwright tests too, so neither locks you into a proprietary format.'
      }
    ],
    replayFurther: [
      {
        title: 'Start in minutes, from a URL',
        body: 'Paste a URL or connect a GitHub repo and Replay QA maps the app and discovers journeys itself.'
      },
      {
        title: 'Fixes for the app, not the test',
        body: 'Replay QA agents time-travel through a deterministic recording to find root cause, and every report includes a suggested fix for your coding agent.'
      },
      {
        title: 'Security, accessibility and performance',
        body: 'The same run checks WCAG issues and performance problems, with an optional AI pentest.'
      }
    ],
    strongerAt: [
      {
        title: 'Managed coverage',
        body: 'QA Wolf’s Coverage as a Service has its team create, run, investigate and maintain tests, with human-verified bug reports.'
      },
      {
        title: 'Mobile and real devices',
        body: 'QA Wolf covers iOS, Android and Electron, including real devices.'
      }
    ],
    chooseThemIf: [
      'You want a team to own a durable regression suite for you.',
      'You need mobile or real-device coverage.'
    ],
    chooseReplayIf: [
      'You want testing running today without building a suite.',
      'You want the root cause in your app code and a suggested fix.',
      'You want your coding agents to act on bug reports directly.'
    ],
    faqs: [
      {
        question: 'Can I use Replay QA with QA Wolf?',
        answer:
          'Yes. QA Wolf maintains your regression suite. Replay QA explores the app independently and returns root cause and a suggested fix for every bug it finds.'
      },
      {
        question: 'Is Replay QA a managed service?',
        answer: 'No. Replay QA is an autonomous product, not a managed service with human testers.'
      },
      { question: 'How much does Replay QA cost?', answer: pricingAnswer }
    ],
    lastVerified: VERIFIED,
    sources: [
      'https://www.qawolf.com/',
      'https://www.qawolf.com/pricing',
      'https://www.qawolf.com/mapping-ai',
      'https://docs.qawolf.com/qawolf-mcp'
    ]
  },
  {
    key: 'meticulous',
    name: 'Meticulous',
    relationship: 'alongside',
    path: '/compare/meticulous',
    titleTag: 'Replay QA vs Meticulous: How They Compare',
    metaDescription:
      'Replay QA vs Meticulous: visual regression tests from recorded sessions, or an autonomous QA agent that explores your app and returns root cause and fixes.',
    h1: 'Replay QA vs Meticulous',
    subhead:
      'Meticulous turns sessions recorded in your environments into visual end-to-end tests and checks every PR for changes. Replay QA explores your app on its own and diagnoses the bugs it finds.',
    oneLiner: 'Visual regression tests generated from recorded sessions, on every PR.',
    tldr: [
      'Meticulous replays sessions captured by a recorder script and diffs every PR. Replay QA needs only a URL or repo.',
      'Meticulous answers “what changed in this PR?”. Replay QA answers “what’s broken, and why?”.',
      'Both use deterministic replay. Replay QA agents time-travel through the recording to find root cause.'
    ],
    matrix: {
      setup: { text: 'A recorder script tag in your environments, plus CI.' },
      testSuite: { text: 'Generated from recorded sessions and kept up to date.' },
      discovery: { text: 'Replays recorded sessions on base and head; diffs snapshots.' },
      evidence: { text: 'Visual and behavioural diffs as a PR comment.' },
      rootCause: { verdict: 'partial', text: '“Debug with AI” diagnoses each difference.' },
      codeFix: { verdict: 'partial', text: 'Agent swarm (beta) returns a fix prompt.' },
      traffic: { verdict: 'no', text: 'No. Internal environments are usually enough.' },
      mobile: { verdict: 'no', text: 'Not offered.' },
      agents: { verdict: 'yes', text: 'Hosted MCP server and agent skills.' },
      pricing: { text: 'No public pricing; book a demo.' }
    },
    together: [
      {
        title: 'Regression gate plus exploration',
        body: 'Meticulous checks each PR for unintended visual and behavioural changes. Replay QA explores the app for bugs that exist whether or not this PR touched them.'
      },
      {
        title: 'Same belief in determinism',
        body: 'Both products rely on deterministic replay at the browser level. Meticulous uses it to diff PRs. Replay QA uses it to time-travel to root cause.'
      }
    ],
    replayFurther: [
      {
        title: 'Nothing to install in your app',
        body: 'Meticulous needs a recorder script loaded before your other scripts. Replay QA starts from a URL or GitHub repo.'
      },
      {
        title: 'A suggested fix in every report',
        body: 'Replay QA bug reports include root cause analysis with a confidence score and a suggested fix ready for a coding agent.'
      },
      {
        title: 'Beyond visual change',
        body: 'Replay QA also catches runtime bugs like race conditions, accessibility violations, performance problems and, with Security Scan, logic flaws like cross-tenant data exposure.'
      }
    ],
    strongerAt: [
      {
        title: 'Visual regression coverage',
        body: 'Meticulous checks thousands of screens per PR for unintended visual changes, with no tests to write or maintain.'
      }
    ],
    chooseThemIf: [
      'Your main risk is unintended visual or behavioural change on each PR.',
      'You’re happy to add a recorder script to your environments.'
    ],
    chooseReplayIf: [
      'You want bugs found without recording sessions first.',
      'You want root cause and a suggested fix for each bug.',
      'You want functional, accessibility, performance and security coverage in one run.'
    ],
    faqs: [
      {
        question: 'Can I use Replay QA with Meticulous?',
        answer:
          'Yes. Meticulous gates each PR for visual regressions. Replay QA explores the app for bugs and returns root cause and a suggested fix.'
      },
      {
        question: 'Do I need to add a script to my app for Replay QA?',
        answer: 'No. Paste a URL or connect a GitHub repo. There is no setup beyond that.'
      },
      { question: 'How much does Replay QA cost?', answer: pricingAnswer }
    ],
    lastVerified: VERIFIED,
    sources: [
      'https://www.meticulous.ai/',
      'https://www.meticulous.ai/how-it-works',
      'https://app.meticulous.ai/docs/recorder-installation',
      'https://app.meticulous.ai/docs/agents/agent-swarm',
      'https://app.meticulous.ai/docs/agents/mcp-server'
    ]
  },
  {
    key: 'browserstack',
    name: 'BrowserStack',
    relationship: 'alongside',
    path: '/compare/browserstack',
    titleTag: 'Replay QA vs BrowserStack: How They Compare',
    metaDescription:
      'Replay QA vs BrowserStack: a real-device cloud and AI agents for your test suite, or an autonomous QA agent that finds bugs and explains their root cause.',
    h1: 'Replay QA vs BrowserStack',
    subhead:
      'BrowserStack runs your tests across thousands of real devices and browsers, with AI agents to author, heal and analyse them. Replay QA explores your app without a suite and records every session deterministically.',
    oneLiner: 'Real-device cloud for running your test suite, with 20+ AI agents.',
    tldr: [
      'BrowserStack is where your tests run, at device scale. Replay QA finds bugs without a test suite.',
      'BrowserStack’s failure analysis reads logs, screenshots and metadata from the run, and says it can’t reach evidence stored outside the product. Replay QA records everything that happened inside the browser.',
      'BrowserStack covers 30,000+ real devices. Replay QA tests web apps in Chromium.'
    ],
    matrix: {
      setup: { text: 'Point your Selenium, Playwright, Cypress or Appium suite at the cloud.' },
      testSuite: { text: 'Your suite, plus AI agents for authoring and self-healing.' },
      discovery: { text: 'Runs the tests you have.' },
      evidence: { text: 'Video, screenshots, network and console logs.' },
      rootCause: {
        verdict: 'partial',
        text: 'Failure analysis from logs, screenshots and run metadata.'
      },
      codeFix: { verdict: 'yes', text: 'Suggested fix, applied locally via MCP.' },
      traffic: { verdict: 'no', text: 'No.' },
      mobile: { verdict: 'yes', text: 'Yes. 30,000+ real iOS and Android devices.' },
      agents: { verdict: 'yes', text: 'Official MCP server.' },
      pricing: { text: 'Automate from $59/mo; AI features on Pro and Ultimate plans.' }
    },
    together: [
      {
        title: 'Coverage plus discovery',
        body: 'Keep running your suite across devices on BrowserStack. Replay QA explores the journeys your suite doesn’t cover and records each one.'
      },
      {
        title: 'Evidence from inside the app',
        body: 'When a bug is in your app code, Replay QA’s recording captures every DOM mutation, network call and JS frame, so the root cause comes from what actually executed.'
      }
    ],
    replayFurther: [
      {
        title: 'No suite required',
        body: 'Replay QA explores from a URL and writes and runs its own Playwright tests.'
      },
      {
        title: 'Runtime-level diagnosis',
        body: 'Replay QA agents time-travel through a deterministic recording rather than reading logs after the fact.'
      }
    ],
    strongerAt: [
      {
        title: 'Device and browser scale',
        body: 'BrowserStack offers tens of thousands of real devices, which Replay QA does not attempt to match.'
      },
      {
        title: 'Agent catalogue',
        body: 'BrowserStack has 20+ AI agents across authoring, self-healing, visual review and failure analysis, including clustering failures across a build.'
      }
    ],
    chooseThemIf: [
      'You have a test suite and need it to run across real devices and browsers.',
      'You need native mobile coverage.'
    ],
    chooseReplayIf: [
      'You don’t have a suite, or it misses journeys you care about.',
      'You want root cause from a deterministic recording of the app.'
    ],
    faqs: [
      {
        question: 'Can I use Replay QA with BrowserStack?',
        answer:
          'Yes. BrowserStack runs your existing tests across devices. Replay QA explores the app without a suite and returns root cause and a suggested fix for each bug it finds.'
      },
      {
        question: 'Does Replay QA test on real mobile devices?',
        answer: 'No. Replay QA tests web applications in a Chromium browser.'
      },
      { question: 'How much does Replay QA cost?', answer: pricingAnswer }
    ],
    lastVerified: VERIFIED,
    sources: [
      'https://www.browserstack.com/',
      'https://www.browserstack.com/pricing',
      'https://www.browserstack.com/test-reporting-and-analytics',
      'https://www.browserstack.com/docs/test-reporting-and-analytics/agents/test-failure-analysis',
      'https://www.browserstack.com/docs/browserstack-mcp-server/overview'
    ]
  },
  {
    key: 'sauce-labs',
    name: 'Sauce Labs',
    relationship: 'alongside',
    path: '/compare/sauce-labs',
    titleTag: 'Replay QA vs Sauce Labs: How They Compare',
    metaDescription:
      'Replay QA vs Sauce Labs: an enterprise device cloud with Sauce AI authoring and insights, or an autonomous QA agent that records every run and suggests fixes.',
    h1: 'Replay QA vs Sauce Labs',
    subhead:
      'Sauce Labs runs your Appium and Selenium suites on real devices and uses Sauce AI to author tests and diagnose failed jobs. Replay QA explores your web app autonomously and diagnoses bugs in your app code.',
    oneLiner: 'Enterprise real-device cloud with AI test authoring and job diagnostics.',
    tldr: [
      'Sauce Labs authors tests from intent and runs them across web and mobile. Replay QA explores and writes its own Playwright tests.',
      'Sauce AI for Insights diagnoses failed jobs from command logs and recommends how to get the test passing. Replay QA finds root cause in your app and suggests a code fix.',
      'Sauce Labs offers 10,000+ real devices. Replay QA tests web apps in Chromium.'
    ],
    matrix: {
      setup: { text: 'Point your suite at Sauce, or author tests with Sauce AI.' },
      testSuite: { text: 'Your Appium/Selenium suite, or AI-authored test steps.' },
      discovery: { text: 'Runs the tests you have.' },
      evidence: { text: 'Jobs, builds and test artifacts; natural-language insights.' },
      rootCause: {
        verdict: 'partial',
        text: 'Per-job diagnosis at infrastructure, environment or code level.'
      },
      codeFix: { verdict: 'no', text: 'Recommendations to get the test passing.' },
      traffic: { verdict: 'no', text: 'No.' },
      mobile: { verdict: 'yes', text: 'Yes. 10,000+ real devices.' },
      agents: { verdict: 'yes', text: 'Hosted Sauce MCP server.' },
      pricing: { text: 'Live from $39/mo; device clouds from $149/mo; AI on Enterprise.' }
    },
    together: [
      {
        title: 'Device execution plus app diagnosis',
        body: 'Sauce Labs runs your suites across real devices. Replay QA explores your web app independently and explains, from a deterministic recording, why the app misbehaves.'
      }
    ],
    replayFurther: [
      {
        title: 'No tests to author',
        body: 'Replay QA explores from a URL and discovers user journeys itself.'
      },
      {
        title: 'A fix for the app',
        body: 'Every Replay QA bug report includes root cause with a confidence score and a suggested code fix for your coding agent.'
      },
      {
        title: 'Security in the same run',
        body: 'Replay QA’s optional Security Scan covers injection, access control and business-logic flaws.'
      }
    ],
    strongerAt: [
      {
        title: 'Real-device depth',
        body: 'Sauce Labs offers a mature real-device cloud and an MCP server that controls devices, installs apps and shapes network conditions.'
      },
      {
        title: 'One test across platforms',
        body: 'Sauce AI authoring produces framework-agnostic steps that run across Android, iOS and web.'
      }
    ],
    chooseThemIf: [
      'You run Appium or Selenium suites and need enterprise real-device coverage.',
      'You want one authored test to run across web and mobile.'
    ],
    chooseReplayIf: [
      'You want bugs found in your web app without authoring tests.',
      'You want root cause in your app code and a suggested fix.'
    ],
    faqs: [
      {
        question: 'Can I use Replay QA with Sauce Labs?',
        answer:
          'Yes. Sauce Labs runs your suites across real devices. Replay QA explores your web app and returns root cause and a suggested fix for each bug.'
      },
      {
        question: 'Does Replay QA support Selenium or Appium?',
        answer:
          'Replay QA writes and runs its own Playwright tests in Chromium. It does not run existing Selenium or Appium suites.'
      },
      { question: 'How much does Replay QA cost?', answer: pricingAnswer }
    ],
    lastVerified: VERIFIED,
    sources: [
      'https://saucelabs.com/',
      'https://saucelabs.com/pricing',
      'https://saucelabs.com/resources/data-sheet/sauce-ai-for-test-authoring',
      'https://saucelabs.com/resources/blog/sauce-ai-for-insights-now-delivers-automated-test-diagnostics',
      'https://docs.saucelabs.com/sauce-ai/sauce-mcp/'
    ]
  },
  {
    key: 'playwright',
    name: 'Playwright',
    relationship: 'alongside',
    path: '/compare/playwright',
    titleTag: 'Replay QA vs Playwright Test Agents: Compared',
    metaDescription:
      'Replay QA is built on Playwright. How it compares to Playwright Test Agents and Playwright MCP, and what changes when a test fails because of a real app bug.',
    h1: 'Replay QA vs Playwright',
    subhead:
      'Replay QA is built on Playwright: it writes and runs Playwright tests. The difference is what happens when a test fails because your app is broken.',
    oneLiner: 'The open-source framework Replay QA builds on, now with Test Agents.',
    tldr: [
      'Playwright Test Agents plan, generate and heal tests. Replay QA explores, tests, and diagnoses the app.',
      'When a failure looks like a real app bug, Playwright’s healer marks the test test.fixme() so it is skipped. Replay QA reports the bug with root cause and a suggested fix.',
      'Playwright MCP drives a live browser. Replay MCP queries a recorded one. They fit together.'
    ],
    matrix: {
      setup: { text: 'Install Playwright, a seed test, and init-agents for your agent.' },
      testSuite: { text: 'Test files in your repo, generated or hand-written.' },
      discovery: { text: 'Planner explores the app and writes a test plan.' },
      evidence: { text: 'Trace viewer: DOM snapshots, screencast, console, network.' },
      rootCause: { verdict: 'no', text: 'Healer repairs test code only.' },
      codeFix: { verdict: 'no', text: 'Fixes the test; skips it if the app looks broken.' },
      traffic: { verdict: 'no', text: 'No.' },
      mobile: { verdict: 'no', text: 'Mobile browser emulation only.' },
      agents: { verdict: 'yes', text: 'Playwright MCP; agents for Claude Code, Codex, VS Code.' },
      pricing: { text: 'Free and open source (Apache-2.0).' }
    },
    together: [
      {
        title: 'Built on Playwright',
        body: 'Replay QA writes and runs its own Playwright tests, so the framework you already trust is under the hood.'
      },
      {
        title: 'Two MCP servers, opposite directions',
        body: 'Playwright MCP lets an agent drive a live browser. Replay MCP lets an agent pull bug reports and time-travel debug a recorded run. Give your agent both.'
      }
    ],
    replayFurther: [
      {
        title: 'App bugs get diagnosed, not skipped',
        body: 'Playwright’s healer is designed to get tests passing, and marks a test test.fixme() when it believes the functionality is broken. Replay QA treats that failure as the finding: it time-travels through the recording to root cause and suggests a fix.'
      },
      {
        title: 'Nothing to seed',
        body: 'The Playwright planner needs a seed test to set up the environment. Replay QA starts from a URL or GitHub repo.'
      },
      {
        title: 'A deterministic recording',
        body: 'Playwright traces capture snapshots around each action. Replay QA records every DOM mutation, network call and JS frame, so agents can inspect any moment of the run.'
      }
    ],
    strongerAt: [
      {
        title: 'Free, open and in your repo',
        body: 'Playwright is Apache-2.0, runs anywhere, and its tests are auditable files you own.'
      },
      {
        title: 'Cross-browser',
        body: 'Playwright runs Chromium, Firefox and WebKit. Replay QA tests in Chromium.'
      }
    ],
    chooseThemIf: [
      'You want to own and maintain a test suite yourself, at no license cost.',
      'You need Firefox and WebKit coverage.'
    ],
    chooseReplayIf: [
      'You want app bugs diagnosed with a suggested fix, not tests skipped.',
      'You want exploration, testing and analysis running without maintaining a harness.'
    ],
    faqs: [
      {
        question: 'Does Replay QA replace Playwright?',
        answer:
          'No. Replay QA is built on Playwright: it writes and runs its own Playwright tests, then records and analyses every session.'
      },
      {
        question: 'How is Replay MCP different from Playwright MCP?',
        answer:
          'Playwright MCP lets an agent control a live browser. Replay MCP lets an agent pull structured bug reports and time-travel debug a recorded failure. They complement each other.'
      },
      { question: 'How much does Replay QA cost?', answer: pricingAnswer }
    ],
    lastVerified: VERIFIED,
    sources: [
      'https://playwright.dev/docs/test-agents',
      'https://github.com/microsoft/playwright/blob/main/packages/playwright/src/agents/playwright-test-healer.agent.md',
      'https://playwright.dev/docs/trace-viewer',
      'https://github.com/microsoft/playwright-mcp'
    ]
  },

  // ---------------------------------------------------------------- Doing it yourself
  {
    key: 'coding-agents',
    name: 'Your coding agent',
    relationship: 'diy',
    path: '/compare/coding-agents',
    titleTag: 'Replay QA vs Testing With Your Coding Agent',
    metaDescription:
      'Why not ask Claude Code or Codex to test your app with a browser? What a coding agent does well, what Replay QA adds, and how to use the two together.',
    h1: 'Why not just ask your coding agent to test it?',
    subhead:
      'Claude Code and Codex can drive a browser, read the console and fix what they find. Replay QA turns that one-off check into systematic testing with evidence your agent can query.',
    oneLiner: 'Claude Code or Codex driving a browser through Chrome or MCP tools.',
    tldr: [
      'Your agent checks the flow you ask about, in one session. Replay QA explores every journey, on every PR or schedule.',
      'Your agent sees a live browser while it runs. Replay QA keeps a deterministic recording your agent can come back to.',
      'Use them together: Replay QA finds and diagnoses, your agent applies the fix.'
    ],
    matrix: {
      setup: {
        text: 'A prompt, plus browser tooling (Claude in Chrome, Codex browser, Playwright MCP).'
      },
      testSuite: { text: 'None. Nothing persists between sessions unless you build it.' },
      discovery: { text: 'Checks the flows you ask it to.' },
      evidence: { text: 'Screenshots, DOM, console and network from the live session.' },
      rootCause: { verdict: 'partial', text: 'Reasons from what it observed and the code.' },
      codeFix: { verdict: 'yes', text: 'Edits your code directly.' },
      traffic: { verdict: 'no', text: 'No.' },
      mobile: { verdict: 'no', text: 'Depends on your tooling.' },
      agents: { verdict: 'yes', text: 'It is the agent.' },
      pricing: { text: 'Your existing agent plan.' }
    },
    strongerAt: [
      {
        title: 'Zero setup for a quick check',
        body: 'Ask your agent to click through the change it just made and it will. For a one-off check, that’s hard to beat.'
      },
      {
        title: 'It fixes in the same loop',
        body: 'The agent that finds the problem can edit the code immediately.'
      },
      {
        title: 'It can see the browser',
        body: 'Claude in Chrome reads console errors and DOM state. Codex’s browser can expose console output and network traffic.'
      }
    ],
    replayFurther: [
      {
        title: 'Systematic, not ad hoc',
        body: 'Your agent tests what you ask about. Replay QA maps the whole app, runs every journey in parallel, and re-runs them on every PR, push or schedule, checking accessibility, performance and optionally security in the same pass.'
      },
      {
        title: 'Evidence that outlives the session',
        body: 'Each agent session starts with a fresh context. Replay QA records every session deterministically, so you, a reviewer or another agent can return to the exact failure later.'
      },
      {
        title: 'Runtime evidence improves fixes',
        body: 'On Web Debug Bench, 177 hard bugs in agent-built web apps, an agent with runtime access solved 76%; the same agent reading code alone solved 61%.'
      },
      {
        title: 'No harness to maintain',
        body: 'Prompts, browser tooling, CI wiring and schedules work at small scale, then become something your team maintains. Replay QA is the harness.'
      }
    ],
    together: [
      {
        title: 'Replay QA finds, your agent fixes',
        body: 'Replay QA files bug reports with root cause and a suggested fix. Your agent pulls them through the Replay MCP server, time-travel debugs the recording if it needs more, and applies the fix.'
      },
      {
        title: 'The loop closes itself',
        body: 'Ship the fix and Replay QA re-runs the same journeys to verify it and catch regressions.'
      }
    ],
    chooseThemIf: ['You want a quick check of one change you just made.'],
    chooseReplayIf: [
      'You want every journey tested on every PR or schedule without babysitting it.',
      'You want a durable recording of each failure that any agent or reviewer can inspect.',
      'You want your agent working from a diagnosed root cause instead of a guess.'
    ],
    faqs: [
      {
        question: 'Can’t Claude Code or Codex test my app already?',
        answer:
          'They can check a flow you ask about in a live browser, and that’s useful. Replay QA explores the whole app systematically, re-runs on every PR or schedule, and keeps a deterministic recording of every failure.'
      },
      {
        question: 'Does Replay QA work with Claude Code and Codex?',
        answer:
          'Yes. Bug reports include a suggested fix ready for a coding agent, and the Replay MCP server lets agents pull reports and time-travel debug failures.'
      },
      {
        question: 'What is Web Debug Bench?',
        answer:
          'A benchmark of 177 hard, realistic bugs in agent-built web apps. An agent with runtime access solved 76% of them; the same agent reading code alone solved 61%.'
      },
      { question: 'How much does Replay QA cost?', answer: pricingAnswer }
    ],
    lastVerified: VERIFIED,
    sources: [
      'https://code.claude.com/docs/en/chrome',
      'https://code.claude.com/docs/en/memory',
      'https://learn.chatgpt.com/docs/browser?surface=app',
      'https://github.com/browser-use/browser-use',
      'https://blog.replay.io/web-debug-bench'
    ]
  }
]

export const RELATIONSHIP_GROUPS: Array<{ relationship: Relationship; heading: string }> = [
  { relationship: 'alternative', heading: 'Alternatives to Replay QA' },
  { relationship: 'alongside', heading: 'Works alongside Replay QA' },
  { relationship: 'diy', heading: 'Doing it yourself' }
]

export function getCompetitor(key: string) {
  return competitors.find((c) => c.key === key)
}

export const compareHub = {
  path: '/compare',
  titleTag: 'Replay QA Alternatives & Comparisons',
  metaDescription:
    'How Replay QA compares with Momentic, QA Wolf, Meticulous, Playwright, BrowserStack, PostHog and your coding agent: setup, evidence, root cause and pricing.',
  eyebrow: 'Compare',
  h1: 'How Replay QA compares',
  subhead:
    'Some tools are alternatives to Replay QA. Others run your test suite, catch regressions or watch production, and work well alongside it. Here is an honest look at each.',
  faqs: [
    {
      question: 'What makes Replay QA different from other AI QA tools?',
      answer:
        'Three things together. It starts from a URL or GitHub repo with no brief or test suite. It records every session with a deterministic time-travel debugger. And every bug report includes root cause analysis with a confidence score and a suggested fix ready for a coding agent.'
    },
    {
      question: 'Do I need a test suite to use Replay QA?',
      answer:
        'No. Replay QA explores the app, discovers user journeys, and writes and runs its own Playwright tests.'
    },
    {
      question: 'Can I use Replay QA with my existing QA tools?',
      answer:
        'Yes. Teams keep their regression suite, device cloud or production monitoring and add Replay QA to explore the app and diagnose the bugs it finds. Reports go to GitHub, Linear, Jira or any HTTP endpoint.'
    },
    {
      question: 'Does Replay QA test native mobile apps?',
      answer: 'No. Replay QA tests web applications in a Chromium browser.'
    },
    {
      question: 'How much does Replay QA cost?',
      answer:
        'Replay QA has a free plan with 25 credits a month and no credit card. Starter is $20/month and Pro is $200/month, with Private Cloud and On-Prem available. An average app costs about 20 credits per full QA run.'
    }
  ]
}
