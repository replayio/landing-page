import { FC } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Link } from '~/components/primitives/link'

import s from '../policy/policy.module.scss'

export const Security: FC = () => {
  return (
    <Section className={s.section}>
      <Container size="sm" className={s.container}>
        <div className={s.heading}>
          <Heading as="h1" size="sm">
            Security &amp; Privacy
          </Heading>
          <span>Effective date: 28 MAR 2023</span>
          <span>Last reviewed: 2 Apr 2024</span>
        </div>
        <Heading id="compliance" as="h2">
          Compliance reporting
        </Heading>
        <div className={s.content}>
          <p>
            Replay.io continuously monitors and reports primarily using System and Organization
            Controls (SOC) 2 Type 2. To receive a copy of the report please contact{' '}
            <a href="mailto:support@replay.io">Support</a>.
          </p>
        </div>

        <Heading id="secure-development" as="h2">
          Our Approach to Secure Development
        </Heading>
        <div className={s.content}>
          <p>
            Replay employs a secure Software Development Lifecycle (&quot;SDLC&quot;) to manage
            updates to the infrastructure and application. Key features of our SDLC include:
          </p>
          <ul>
            <li>Code reviews</li>
            <li>Source control access restrictions</li>
            <li>Source code dependency scanning</li>
            <li>Comprehensive audit &amp; deployment logging</li>
            <li>Separated testing and production environments</li>
          </ul>
        </div>
        <Heading id="encryption" as="h2">
          Our Approach to Encryption
        </Heading>
        <div className={s.content}>
          <p>
            We maintain strict encryption standards and you can rest assured that your data is
            encrypted both in transit and at rest. Highlights of our encryption program includes:
          </p>
          <ul>
            <li>A+ Rating from SSL Labs around the SSL configuration of the application.</li>
            <li>Minimum requirement of TLS v1.2 for encryption in transit.</li>
            <li>AES 256 encryption used for data at rest.</li>
          </ul>
        </div>
        <Heading id="authentication" as="h2">
          Our Approach to Authentication
        </Heading>
        <div className={s.content}>
          <p>
            We support single sign-on via Google SAML 2.0, which includes Multi Factor
            Authentication, automated account provisioning/revocation and other features. We leave
            the controls in the hands of our users.
          </p>
        </div>
        <Heading id="access-control" as="h2">
          Our Approach to Access Control
        </Heading>
        <div className={s.content}>
          <p>
            Replay follows the principle of least privilege to all access granted within the
            organization. Access to key systems is also reviewed at least annually to ensure that
            access and permissions remain appropriate. In addition, multi-factor authentication is
            enabled for users to further protect the application and infrastructure.
          </p>
        </div>
        <Heading id="network" as="h2">
          Our Approach to Network Security
        </Heading>
        <div className={s.content}>
          <p>
            Replay takes network security very seriously and has worked hard to ensure the network
            is configured to protect our customer&apos;s data. Our controls include:
          </p>
          <ul>
            <li>Security team reviews of the firewall rules.</li>
            <li>Intelligent Threat Detection Tools constantly monitoring the environment.</li>
          </ul>
        </div>
        <Heading id="privacy" as="h2">
          Our Approach to Privacy
        </Heading>
        <div className={s.content}>
          <p>
            The privacy of everyone who uses our software must be respected. Replay has the power to
            see everything that happens in a program, and with that comes an immense responsibility
            to keep customer&apos;s data safe. We will maintain user privacy even if it prevents
            certain features from being built. Replay does the following to ensure privacy is
            maintained:
          </p>
          <ul>
            <li>Minimize data collection</li>
            <li>Replay does not sell customer data</li>
            <li>Customer data is not accessed through Replay&apos;s normal course of business</li>
            <li>
              Replay does not view or analyze your Replay&apos;s without your explicit permission
            </li>
          </ul>
        </div>
        <Heading id="session-replay" as="h2">
          Our Approach to Session Replay
        </Heading>
        <div className={s.content}>
          <p>
            Replay uses <Link href="https://logrocket.com/">LogRocket</Link> to record user sessions
            in order to diagnose issues after the fact and better understand how improve the
            product.
          </p>
          <ul>
            <li>LogRocket can be disabled in Preferences</li>
            <li>Sensitive user information is redacted</li>
            <li>
              Intellectual property such as source code, filenames, and runtime data is redacted
            </li>
            <li>
              Replay&apos;s <Link href="https://github.com/RecordReplay/devtools">DevTools</Link>{' '}
              are publicly available and we appreciate feedback on fields that should be redacted
            </li>
          </ul>
        </div>
        <Heading as="h2">Additional Information</Heading>
        <div className={s.content}>
          <p>
            This Security Overview is a summary of our information security framework. Please
            don&apos;t hesitate to reach out with questions at{' '}
            <Link href="mailto:security@replay.io">security@replay.io</Link>.
          </p>
        </div>
      </Container>
    </Section>
  )
}
