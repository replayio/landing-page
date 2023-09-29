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
              Replay is a time travel debugger.  Unlike a conventional debugger, which can only show a program’s state at the current point in time, a time travel debugger can show that program’s state at all points in time.  Recording the right information to be able to do this is tricky.  Surface level details like changes to the DOM, network requests, and console logs won’t let you see important information like JavaScript state, but trying to record changes to that JavaScript state causes a flood of millions or even billions of operations that will slow things down hugely if recorded directly.
              <br />
              <br />
Instead, the Replay browser records the inputs it gets from the system – network data, user events like mouse clicks, and so on – and non-determinism resulting from interactions between threads.  There isn’t very much of this and it can be recorded with little overhead.  When replaying, the same browser runs and uses that recorded data to ensure it behaves in the exact same way as it did when recording. The state at any point in time can be reconstructed simply by replaying the browser to that point.
              <br />
              <br />
The main benefit of using Replay is that recording a bug or any other problem on a website is enough for a developer looking at the recording to fully understand the bug and what is needed to fix it.  The developer has a perfect reproduction of the bug, as if it happened on their own machine.  This enables many improvements both to developer productivity and to the overall efficiency and effectiveness of a software development organization, which we describe in more detail below.
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
              Filing bug reports with enough information for developers to fix the problem is often pretty difficult.  Screenshots, videos, console logs, and so forth can indicate where the problem occurred but not the underlying reason needed for fixing it.  Figuring out that reason requires the developer to reproduce the bug themselves, but writing down repro steps is challenging or even impossible and can require extensive back-and-forths.
              <br></br>
              <br></br>
Bug reports filed using Replay have a perfect reproduction of the bug.  Whoever is filing the report just has to create a recording of the problem and add a link to the recording to the report with a comment or two pointing out where things went wrong.  This gives developers what they need to fix the problem, and is better than any bug report filed without using Replay.
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
        title={{ children: 'Handle QA and User Issues with Ease', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Handling bugs reported by QA and users is a difficult and time consuming process for many organizations.  This results from the difficulty developers have reproducing these bugs, as described above.  When a developer isn’t able to reliably reproduce a bug it becomes very time consuming to investigate and speculate about possible fixes, and quite often these issues will be closed as not actionable.  This problem is especially difficult when the issue is transient and may disappear after a few minutes or hours – requiring the developer to drop everything to work on a fix – or when the issue is related to a user’s data – requiring the developer to work closely with that user to track down what is going wrong.
              <br></br>
              <br></br>
With Replay bug reports have a perfect reproduction which developers can use to investigate the bug as if it was happening on their own machine.  This takes out the guesswork and the time involved in dealing with these reports, and simplifies things for the reporter because all they have to do is create a recording, without concern for repro steps or all the other documentation that otherwise accompanies a bug report.
              <br></br>
              <br></br>
Across the board, companies we’ve worked with to write case studies have seen dramatic improvements in their QA and related support processes by adopting Replay and consistently using it when filing bug reports.
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
              Flaky test failures are one of the most common, difficult, and annoying things which developers have to deal with.  A test that only fails 1% of the time is super difficult to understand and fix, and yet a test suite with 100 tests like this will have one failure on average every time it runs.  Waiting some amount of time during the test might fix the problem, but can mask real issues and steadily increases the time it takes for the test suite to run.  More often tests failing intermittently are suppressed so they don’t run or their results aren’t reported, which increases the suite’s stability but makes the test basically worthless.
              <br></br>
              <br></br>
With Replay, debugging a flaky test failure is no different from any other bug.  A recording of the failure has a perfect reproduction of what went wrong and can be studied by developers to identify the root cause without regard for how infrequently the failure happens.  Actually, flakes are even easier to understand than other bugs, as a recording of the failure can be compared with a recording of the same test passing to identify discrepancies between the two recordings which end up leading to the failure.  We’re working on automating this process by the way, schedule a call if you’d like to learn more.
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
    </Section>
    </PageLayout>
  )
}

export default Overview
