/* eslint-disable */

import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Section } from '~/components/layout/section'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import s from '~/components/sections/homepage/developer-tools/developer-tools.module.scss'
import Link from 'next/link'

const Overview = () => {
  return (
    <PageLayout>
    <Meta title="Overview | Replay" />
    <Section
      id="homepage-overview"
      className={s.section}
      data-sitemap
      data-sitemap-icon="workflow"
      data-sitemap-short-title="Record"
      data-sitemap-complete-title="Freeze bugs in time."
    >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div id="travel-back" />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Travel Back in Time', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Replay is a time travel debugger.  Unlike a conventional debugger, which can only show a program’s state at the current point in time, a time travel debugger can show that program’s state at all points in time.  Recording changes to this state to reconstruct it later doesn’t work well.  JavaScript can change the state millions or even billions of times while viewing a page, and the browser will slow down hugely if these changes are recorded directly.
              <br />
              <br />
Instead, the Replay browser records the inputs it gets from the system – network data, user events like mouse clicks, and so on – and non-determinism resulting from interactions between threads.  There isn’t very much of this and it can be recorded with little overhead.  When replaying, the same browser runs and uses that recorded data to ensure it behaves in the exact same way as it did when recording. The state at any point in time can be reconstructed simply by replaying the browser to that point.
              <br />
              <br />
The main benefit of using Replay is that recording a bug or any other problem on a website is enough for a developer looking at the recording to fully understand the bug and what is needed to fix it.  The developer has a perfect reproduction of the bug, as if it happened on their own machine.  This enables many improvements to productivity and the overall effectiveness of a software development organization.
              <br></br>
              <br></br>
              <Link href="https://medium.com/replay-io/how-replay-works-5c9c29580c58" aria-label="How Replay Works">
                How Replay Works
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <div id="stop-reproducing" />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Stop Reproducing Bugs', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Filing bug reports with the right information is hard.  Screenshots, videos, console logs, and so forth can indicate where the problem occurred but not the underlying reason needed to fix it.  Figuring out that reason often requires the developer to reproduce the bug themselves, but writing down repro steps is challenging or impossible and can require extensive back-and-forths.
              <br></br>
              <br></br>
Bug reports filed using Replay have a perfect reproduction of the bug.  The reporter just has to record the problem and add a link to that recording with a comment or two pointing out where things went wrong.  This gives developers what they need to understand and fix the problem, and is better than any bug report filed without using Replay.
              <br></br>
              <br></br>
              <Link href="https://docs.replay.io/getting-started" aria-label="Getting Started with Bug Reports">
                Getting Started with Bug Reports
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <div id="handle-issues" />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Support your Users with Ease', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Handling bugs reported by QA and users is a difficult and time consuming process for many organizations.  This results from the difficulty developers have reproducing these bugs.  When a developer isn’t able to reliably reproduce a bug it becomes very time consuming to investigate and speculate about possible fixes, and often these issues will be closed as not actionable.
              <br></br>
              <br></br>
With Replay, bug reports have a perfect reproduction which developers can use to investigate the bug as if it was happening on their own machine.  This takes out the guesswork and the time involved in dealing with these reports, and the need for detailed documentation from the reporter.
              <br></br>
              <br></br>
Companies that consistently use Replay for their support have seen dramatic improvements in the ease and speed with which they can resolve issues.
              <br></br>
              <br></br>
              <Link href="https://medium.com/replay-io/glide-saves-40-hours-weekly-by-eliminating-the-reproducibility-problem-8a06e6330263" aria-label="Glide Case Study">
                Glide
              </Link>
              : Getting replays from QA "has completely revolutionized how we deal with bugs that come in.  Now, we can’t even get a report from support unless it comes with a replay."
              <br></br>
              <br></br>
              <Link href="https://docs.replay.io/resources/replay.io-case-studies/midnite-builds-time-travel-workflows-for-its-fast-paced-betting-platform" aria-label="Midnite Case Study">
                Midnite
              </Link>
              : "Replay has been instrumental in building our bug reporting system and it’s been a game-changer allowing us to land changes and fix bugs immediately."
              <br></br>
              <br></br>
              <Link href="https://medium.com/@pennepitstop/pantheon-solves-performance-bottlenecks-improving-load-time-by-5x-fed6f02e8106" aria-label="Pantheon Case Study">
                Pantheon
              </Link>
              : Across the org, "from PMs to Engineers, to Customer Support and our CEO, we use Replay to track down bugs with so much more ease and save so much time diagnosing what went wrong."
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <div id="fix-flakes" />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Fix all your Flaky Tests', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Flaky test failures are one of the most common and annoying things which developers have to deal with.  A test that fails infrequently is very difficult to understand and fix, and yet a suite with many tests like this will frequently have failures, keeping changes from landing and requiring manual investigation.  Most often these tests end up being suppressed so they don’t run or their results aren’t reported, making them worthless.
              <br></br>
              <br></br>
With Replay, debugging a flaky test failure is no different from any other bug.  A recording of the failure has a perfect reproduction of what went wrong and can be studied by developers to identify the root cause without regard for how infrequently the failure happens.  Flakes are actually even easier to understand than other bugs, as a recording of the failure can be compared with a recording of the same test passing to identify discrepancies between the two recordings which end up leading to the failure.  We’re working on automating this process by the way, schedule a call if you’d like to learn more.
              <br></br>
              <br></br>
              <Link href="https://blog.replay.io/debugging-a-flaky-test-with-replay" aria-label="Getting Started with Bug Reports">
                Debugging a Flaky Test with Replay
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <div id="deploy-with-confidence" />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Deploy with Confidence', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Teams which deploy changes to production frequently and with a low rate of incidents are significantly more likely to meet their organizational performance goals.  This is one of the key findings of the DevOps Research and Assessment (DORA) team at Google.
              <br></br>
              <br></br>
Deploying on demand without causing regressions for users is almost impossible without a thorough test suite that passes reliably.  The hardest part of building a test suite like this is maintaining it.  When tests start failing intermittently it is hard to figure out what change led to the problem, and because intermittent failures are so hard to fix they tend to creep in over time and degrade the suite.  Even if a new failure happens consistently it can still be hard to debug and understand why, creating a major drag for developers.
              <br></br>
              <br></br>
Using Replay to record your test suite effectively eliminates these problems.  It is easy to debug and understand failing tests, whether they are happening intermittently or consistently.  With Replay a team can get all the benefits of a solid test suite, without the downsides.
              <br></br>
              <br></br>
              <Link href="https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance" aria-label="Getting Started with Bug Reports">
                DORA: Are you an Elite DevOps performer?
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <div id="debug-remotely" />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Debug Test Failures Remotely', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Understanding what went wrong when a test starts failing in CI is a troublesome process for many development organizations.  Saving things like console logs and videos helps, along with supporting an environment for locally reproducing the failure.  This process can be slow, doesn’t always work, and is time consuming to set up and maintain.
              <br></br>
              <br></br>
Using Replay streamlines this process considerably.  Instead of gathering various artifacts when a test runs and supporting a reliable environment for developers to locally reproduce failures, recording the test gives developers a perfect reproduction of the failure which they can debug as if it happened on their own machine.
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <div id="modernize-suite" />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Modernize your Test Suite', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Modern testing frameworks like Cypress and Playwright make it easier to understand and debug test failures compared to legacy frameworks like Selenium and Puppeteer.  Tests written in these legacy frameworks are perfectly good, however, and there is a lot of inertia involved in porting them to a more modern framework.
              <br></br>
              <br></br>
Replay works great when used with test suites developed using modern frameworks, but it works equally well with older test suites.  Because Replay is a specialized browser rather than a dedicated framework, integrating it with a suite simply requires using the Replay browser instead of Chrome, and uploading the generated recordings when the suite finishes.
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
    </Section>
    </PageLayout>
  )
}

export default Overview
