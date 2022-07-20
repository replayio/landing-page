import { FC } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Link } from '~/components/primitives/link'

import s from './policy.module.scss'

export const Policy: FC = () => {
  return (
    <Section className={s.section}>
      <Container size="sm" className={s.container}>
        <div className={s.heading}>
          <Heading as="h1" size="lg">
            Privacy Policy
          </Heading>
          <span>Efective date: 13 sep 2021</span>
        </div>
        <div className={s.content}>
          <p>
            At Replay, we take your privacy seriously. Please read this Privacy
            Policy to learn how we treat your personal data. By using or
            accessing our Services in any manner, you acknowledge that you
            accept the practices and policies outlined below, and you hereby
            consent that we will collect, use and share your information as
            described in this Privacy Policy
            <br />
            <br />
            Remember that your use of Replay's Services is at all times subject
            to our Terms of Use, which incorporates this Privacy Policy. Any
            terms we use in this Policy without defining them have the
            definitions given to them in the Terms of Use.
            <br />
            <br />
            If you have a disability, you may access this Privacy Policy in an
            alternative format by contacting{' '}
            <Link href="mailto:support@replay.io">support@replay.io</Link>.
          </p>
        </div>
        <Heading as="h2">Privacy Policy Table of Contents</Heading>
        <div className={s.content}>
          <p>
            This Privacy Policy covers how we treat Personal Data that we gather
            when you access or use our Services. “Personal Data” means any
            information that identifies or relates to a particular individual
            and also includes information referred to as “personally
            identifiable information” or “personal information” under applicable
            data privacy laws, rules or regulations. This Privacy Policy does
            not cover the practices of companies we don’t own or control or
            people we don’t manage.
          </p>
        </div>
        <Heading as="h2">Personal Data</Heading>
        <Heading as="h3">Categories of Personal Data We Collect</Heading>

        <p>
          This chart details the categories of Personal Data that we collect and
          have collected over the past 12 months:
        </p>

        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.cell}>Category of Personal Data</th>
              <th className={s.cell}>Examples of Personal Data We Collect</th>
              <th className={s.cell}>
                Categories of Third Parties With Whom We Share this Personal
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={s.cell}>Profile or Contact Data</td>
              <td className={s.cell}>
                <ul>
                  <li>First and last name</li>
                  <li>Email</li>
                  <li>
                    Google Account information including user's photograph
                  </li>
                </ul>
              </td>
              <td className={s.cell}>
                <ul>
                  <li>Service Providers</li>
                  <li>Analytics Partners</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className={s.cell}>Payment Data</td>
              <td className={s.cell}>
                <ul>
                  <li>Payment card type</li>
                  <li>Full number and last 4 digits of payment card</li>
                  <li>Expiration date of payment card</li>
                  <li>Payment card security code</li>
                  <li>Billing address, phone number and email</li>
                </ul>
              </td>
              <td className={s.cell}>
                <ul>
                  <li>
                    Service Providers (specifically our payment processing
                    partner, currently Stripe Inc.)
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className={s.cell}>Device/IP Data</td>
              <td className={s.cell}>
                <ul>
                  <li>IP address</li>
                  <li>
                    Type of device/operating system/browser used to access the
                    services
                  </li>
                  <li>Network data</li>
                </ul>
              </td>
              <td className={s.cell}>
                <ul>
                  <li>Service Providers</li>
                  <li>Analytics Partners</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className={s.cell}>Web Analytics</td>
              <td className={s.cell}>
                <ul>
                  <li>Web page interactions</li>
                  <li>
                    Referring webpage/source through which you accessed the
                    services
                  </li>
                  <li>Network data</li>
                </ul>
              </td>
              <td className={s.cell}>
                <ul>
                  <li>Service Providers</li>
                  <li>Analytics Partners</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className={s.cell}>User Data</td>
              <td className={s.cell}>
                <ul>
                  <li>Session data</li>
                </ul>
              </td>
              <td className={s.cell}>
                <ul>
                  <li>Parties users authorize access</li>
                  <li>Authenticate</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </Section>
  )
}
