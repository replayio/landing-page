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
          <Heading as="h1" size="lg">
            Security & Privacy
          </Heading>
          <span>Efective date: 16 SEP 2021</span>
        </div>
        <Heading as="h2">Our Approach to Secure Development</Heading>
        <div className={s.content}>
          <p>
            Replay employs a secure Software Development Lifecycle ("SDLC") to
            manage updates to the infrastructure and application. Key features
            of our SDLC include:
          </p>
          <ul>
            <li>Code reviews</li>
            <li>Source control access restrictions</li>
            <li>Source code dependency scanning</li>
            <li>Comprehensive audit & deployment logging</li>
            <li>Separated testing and production environments</li>
          </ul>
        </div>

        <Heading as="h2">Our Approach to Encryption</Heading>
        <div className={s.content}>
          <p>
            We maintain strict encryption standards and you can rest assured
            that your data is encrypted both in transit and at rest. Highlights
            of our encryption program includes:
          </p>
          <ul>
            <li>
              A+ Rating from SSL Labs around the SSL configuration of the
              application.
            </li>
            <li>Minimum requirement of TLS v1.2 for encryption in transit.</li>
            <li>AES 256 encryption used for data at rest.</li>
          </ul>
        </div>

        <Heading as="h2">Our Approach to Authentication</Heading>
        <div className={s.content}>
          <p>
            We support single sign-on via Google SAML 2.0, which includes Multi
            Factor Authentication, automated account provisioning/revocation and
            other features. We leave the controls in the hands of our users.
          </p>
        </div>

        <Heading as="h2">Our Approach to Access Control</Heading>
        <div className={s.content}>
          <p>
            Replay follows the principle of least privilege to all access
            granted within the organization. Access to key systems is also
            reviewed at least annually to ensure that access and permissions
            remain appropriate. In addition, multi-factor authentication is
            enabled for users to further protect the application and
            infrastructure.
          </p>
        </div>

        <Heading as="h2">Our Approach to Network Security</Heading>
        <div className={s.content}>
          <p>
            Replay takes network security very seriously and has worked hard to
            ensure the network is configured to protect our customer's data. Our
            controls include:
          </p>
          <ul>
            <li>Security team reviews of the firewall rules.</li>
            <li>
              Intelligent Threat Detection Tools constantly monitoring the
              environment.
            </li>
          </ul>
        </div>

        <Heading as="h2">Our Approach to Privacy</Heading>
        <div className={s.content}>
          <p>
            The privacy of everyone who uses our software must be respected.
            Replay has the power to see everything that happens in a program,
            and with that comes an immense responsibility to keep customer's
            data safe. We will maintain user privacy even if it prevents certain
            features from being built. Replay does the following to ensure
            privacy is maintained:
          </p>
          <ul>
            <li>Minimize data collection</li>
            <li>Replay does not sell customer data</li>
            <li>
              Customer data is not accessed through Replay's normal course of
              business
            </li>
            <li>
              Replay does not view or analyze your Replay's without your
              explicit permission
            </li>
          </ul>
        </div>

        <Heading as="h2">Our Approach to Session Replay</Heading>
        <div className={s.content}>
          <p>
            Replay uses <Link href="https://logrocket.com/">LogRocket</Link> to
            record user sessions in order to diagnose issues after the fact and
            better understand how improve the product.
          </p>
          <ul>
            <li>LogRocket can be disabled in Preferences</li>
            <li>Sensitive user information is redacted</li>
            <li>
              Intellectual property such as source code, filenames, and runtime
              data is redacted
            </li>
            <li>
              Replay's{' '}
              <Link href="https://github.com/RecordReplay/devtools">
                DevTools
              </Link>{' '}
              are publicly available and we appreciate feedback on fields that
              should be redacted
            </li>
          </ul>
        </div>

        <Heading as="h2">Additional Information</Heading>
        <div className={s.content}>
          <p>
            This Security Overview is a summary of our information security
            framework. Please don't hesitate to reach out with questions at{' '}
            <Link href="mailto:security@replay.io">security@replay.io</Link>.
          </p>
        </div>
      </Container>
    </Section>
  )
}
