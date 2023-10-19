import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { TitleAndSubtitle } from '~/components/primitives/texts'

const UseCases = () => {
  const bugReportData = {
    header: 'File the perfect bug report.',
    title: (
      <>
        <span>
          Bugs reported with Replay are fully actionable and quickly understood
          by developers. Never close issues again for a lack of information.
        </span>
      </>
    ),
    description: (
      <>
        <br />
        <Link href="https://app.replay.io/team/new" aria-label="Create a team">
          Create a team
        </Link>{' '}
        and start sharing replays with your team.
      </>
    ),
    videoPoster: '/images/homepage/bug-report.png',
    videoHref:
      'https://stream.mux.com/OirCesKgI2uAA01r9AvrO1Vh6VaJ46sf00tozLJNbAWrY.m3u8'
  }

  const testSuiteData = {
    header: 'Fix all your Flaky Tests.',
    title: (
      <>
        <span>
          Stop wasting time looking at failures you can’t figure out, or
          suppressing tests because they don’t pass reliably.
        </span>
      </>
    ),
    description: (
      <>
        <button
          className="waitlist"
          data-tf-popup="jTudlerL"
          data-tf-iframe-props="title=Test Suites"
          data-tf-medium="snippet"
          aria-label="Learn more about Test Suites"
        >
          Get in touch
        </button>{' '}
        to start recording your test suite.
      </>
    ),
    videoPoster: '/images/homepage/flaky-tests.png',
    videoHref:
      'https://stream.mux.com/M8pzl7FMFEocw3LEZ523ylfk3Db8019hNP2yfB018JUmI.m3u8'
  }

  return (
    <div>
      <section>
        <TitleAndSubtitle
          title={{
            as: 'h2',
            children: bugReportData.header
          }}
          subtitle={{
            children: <span>{bugReportData.title}</span>
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src={bugReportData.videoPoster}
            alt="Bug Report Video"
            width={900}
            height={504}
          />
        </div>
      </section>

      <br />
      <br />
      <br />
      <section>
        <TitleAndSubtitle
          title={{
            as: 'h2',
            children: testSuiteData.header
          }}
          subtitle={{
            children: <span>{testSuiteData.title}</span>
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src={testSuiteData.videoPoster}
            alt="Test Suite Video"
            width={900}
            height={504}
          />
        </div>
      </section>
      <br />
      <br />
    </div>
  )
}

export default UseCases
