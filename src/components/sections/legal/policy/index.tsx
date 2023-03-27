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
          <Heading as="h1" size="sm">
            Privacy Policy
          </Heading>
          <span>Effective date: 8 Feb 2023</span>
        </div>
        <div className={s.content}>
          <p>
            At Replay, we take your privacy seriously. Please read this Privacy
            Policy to learn how we treat your personal data. By using or
            accessing our Services in any manner, you acknowledge that you
            accept the practices and policies outlined below, and you hereby
            consent that we will collect, use and share your information as
            described in this Privacy Policy.
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
          <div>
            <strong>What this Privacy Policy covers</strong>
            <br />
            <br />
            <strong>Personal Data</strong>
            <ul>
              <li>Categories of Personal Data We Collect</li>
              <li>Categories of Sources of Personal Data</li>
              <li>
                Our Commercial or Business Purposes for Collecting Personal Data
              </li>
            </ul>
            <br />
            <strong>How We Share Your Personal Data</strong>
            <br />
            <strong>Tracking Tools and Opt-Out</strong>
            <br />
            <strong>Data Security and Retention</strong>
            <br />
            <strong>Personal Data of Children</strong>
            <br />
            <strong>California Resident Rights</strong>
            <br />
            <strong>Other State Law Privacy Rights</strong>
            <br />
            <strong>Transfers of Personal Data</strong>
            <br />
            <strong>Changes to this Privacy Policy</strong>
            <br />
            <strong>Contact Information</strong>
          </div>
        </div>
        <Heading as="h2">What this Privacy Policy Covers</Heading>
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

        <Heading as="h3">Changes to this Privacy Policy</Heading>
        <div className={s.content}>
          <p>
            We collect Personal Data about you from the following categories of
            sources:
          </p>
          <ul>
            <li>
              <strong>You</strong>
            </li>
            <ul>
              <li>When you provide such information directly to us.</li>
              <ul>
                <li>
                  When you create an account or use our interactive tools and
                  Services.
                </li>
                <li>
                  When you voluntarily provide information in free-form text
                  boxes through the Services or through responses to surveys or
                  questionnaires.
                </li>
                <li>When you send us an email or otherwise contact us.</li>
              </ul>
              <li>
                When you use the Services and such information is collected
                automatically.
              </li>
              <ul>
                <li>
                  Through Cookies (defined in the “Tracking Tools and Opt-Out”
                  section below).
                </li>
                <li>
                  If you use a location-enabled browser, we may receive
                  information about your location.
                </li>
                <li>
                  If you download and install certain applications and software
                  we make available, we may receive and collect information
                  transmitted from your computing device for the purpose of
                  providing you the relevant Services, such as information
                  regarding when you are logged on and available to receive
                  updates or alert notices.
                </li>
              </ul>
            </ul>
            <li>
              <strong>Third Parties</strong>
            </li>
            <ul>
              <li>Vendors</li>
              <ul>
                <li>
                  We may use analytics providers to analyze how you interact and
                  engage with the Services, or third parties may help us provide
                  you with customer support.
                </li>
                <li>
                  We may use vendors to obtain information to generate leads and
                  create user profiles.
                </li>
              </ul>
              <li>Social Networks</li>
              <ul>
                <li>
                  If you provide your social network account credentials to us
                  or otherwise sign in to the Services through a third-party
                  site or service, some content and/or information in those
                  accounts may be transmitted into your account with us.
                </li>
              </ul>
            </ul>
          </ul>
        </div>

        <Heading as="h3">
          Our Commercial or Business Purposes for Collecting Personal Data
        </Heading>
        <div className={s.content}>
          <ul>
            <li>
              <strong>Providing, Customizing and Improving the Services</strong>
            </li>
            <ul>
              <li>
                Creating and managing your account or other user profiles.
              </li>
              <li>Processing orders or other transactions; billing.</li>
              <li>
                Providing you with the products, services or information you
                request.
              </li>
              <li>
                Meeting or fulfilling the reason you provided the information to
                us.
              </li>
              <li>Providing support and assistance for the Services.</li>
              <li>
                Improving the Services, including testing, research, internal
                analytics and product development.
              </li>
              <li>
                Personalizing the Services, website content and communications
                based on your preferences.
              </li>
              <li>Doing fraud protection, security and debugging.</li>
              <li>
                Carrying out other business purposes stated when collecting your
                Personal Data or as otherwise set forth in applicable data
                privacy laws, such as the California Consumer Privacy Act (the
                “CCPA”).
              </li>
            </ul>
            <li>
              <strong>Marketing the Services</strong>
            </li>
            <ul>
              <li>Marketing and selling the Services.</li>
            </ul>
            <li>
              <strong>Corresponding with You</strong>
            </li>
            <ul>
              <li>
                Responding to correspondence that we receive from you,
                contacting you when necessary or requested, and sending you
                information about Replay or the Services.
              </li>
              <li>
                Sending emails and other communications according to your
                preferences or that display content that we think will interest
                you.
              </li>
            </ul>
            <li>
              <strong>
                Meeting Legal Requirements and Enforcing Legal Terms
              </strong>
            </li>
            <ul>
              <li>
                Fulfilling our legal obligations under applicable law,
                regulation, court order or other legal process, such as
                preventing, detecting and investigating security incidents and
                potentially illegal or prohibited activities.
              </li>
              <li>
                Protecting the rights, property or safety of you, Replay or
                another party.
              </li>
              <li>Enforcing any agreements with you.</li>
              <li>
                Responding to claims that any posting or other content violates
                third-party rights.
              </li>
              <li>Resolving disputes.</li>
            </ul>
          </ul>
          <p>
            We will not collect additional categories of Personal Data or use
            the Personal Data we collected for materially different, unrelated
            or incompatible purposes without providing you notice.
          </p>
        </div>

        <Heading as="h2">How We Share Your Personal Data</Heading>
        <div className={s.content}>
          <p>
            We disclose your Personal Data to the categories of service
            providers and other parties listed in this section. Depending on
            state laws that may be applicable to you, some of these disclosures
            may constitute a “sale” of your Personal Data. For more information,
            please refer to the state-specific sections below.‍
          </p>
          <ul>
            <li>
              <strong>Service Providers.</strong>
            </li>
            <ul>
              <li>
                These parties help us provide the Services or perform business
                functions on our behalf. They include:
              </li>
              <li>Hosting, technology and communication providers.</li>
              <li>Security and fraud prevention consultants.</li>
              <li>Support and customer service vendors.</li>
              <li>Payment processors.</li>
              <li>
                Our payment processing partner Stripe, Inc. (“Stripe”) collects
                your voluntarily-provided payment card information necessary to
                process your payment.
              </li>
              <li>
                Please see Stripe’s terms of service and privacy policy for
                information on its use and storage of your Personal Data.
              </li>
            </ul>
            <li>
              <strong>Analytics Partners.</strong> These parties provide
              analytics on web traffic or usage of the Services. They include:
            </li>
            <ul>
              <li>
                Companies that track how users found or were referred to the
                Services.
              </li>
              <li>
                Companies that track how users interact with the Services.
              </li>
            </ul>
            <li>
              <strong>Parties You Authorize, Access or Authenticate.</strong>
            </li>
            <ul>
              <li>Third parties you access through the services.</li>
              <li>Social media services.</li>
              <li>Other users.</li>
            </ul>
          </ul>
        </div>

        <Heading as="h3">Legal Obligations</Heading>
        <div className={s.content}>
          <p>
            We may share any Personal Data that we collect with third parties in
            conjunction with any of the activities set forth under “Meeting
            Legal Requirements and Enforcing Legal Terms” in the “Our Commercial
            or Business Purposes for Collecting Personal Data” section above.{' '}
          </p>
        </div>

        <Heading as="h3">Business Transfers</Heading>
        <div className={s.content}>
          <p>
            All of your Personal Data that we collect may be transferred to a
            third party if we undergo a merger, acquisition, bankruptcy or other
            transaction in which that third party assumes control of our
            business (in whole or in part). Should one of these events occur, we
            will make reasonable efforts to notify you before your information
            becomes subject to different privacy and security policies and
            practices.
          </p>
        </div>

        <Heading as="h3">Data that is Not Personal Data</Heading>
        <div className={s.content}>
          <p>
            We may create aggregated, de-identified or anonymized data from the
            Personal Data we collect, including by removing information that
            makes the data personally identifiable to a particular user. We may
            use such aggregated, de-identified or anonymized data and share it
            with third parties for our lawful business purposes, including to
            analyze, build and improve the Services and promote our business,
            provided that we will not share such data in a manner that could
            identify you.
          </p>
        </div>

        <Heading as="h2">Tracking Tools and Opt-Out</Heading>
        <div className={s.content}>
          <p>
            The Services use cookies and similar technologies such as pixel
            tags, web beacons, clear GIFs and JavaScript (collectively,
            “Cookies”) to enable our servers to recognize your web browser, tell
            us how and when you visit and use our Services, analyze trends,
            learn about our user base and operate and improve our Services.
            Cookies are small pieces of data– usually text files – placed on
            your computer, tablet, phone or similar device when you use that
            device to access our Services. We may also supplement the
            information we collect from you with information received from third
            parties, including third parties that have placed their own Cookies
            on your device(s). Please note that because of our use of Cookies,
            the Services do not support “Do Not Track” requests sent from a
            browser at this time.
            <br />
            <br />
            We use the following types of Cookies:
          </p>
          <ul>
            <li>
              <strong>Essential Cookies.</strong> Essential Cookies are required
              for providing you with features or services that you have
              requested. For example, certain Cookies enable you to log into
              secure areas of our Services. Disabling these Cookies may make
              certain features and services unavailable.
            </li>
            <li>
              <strong>Performance/Analytical Cookies.</strong>{' '}
              Performance/Analytical Cookies allow us to understand how visitors
              use our Services. They do this by collecting information about the
              number of visitors to the Services, what pages visitors view on
              our Services and how long visitors are viewing pages on the
              Services. Performance/Analytical Cookies also help us measure the
              performance of our advertising campaigns in order to help us
              improve our campaigns and the Services’ content for those who
              engage with our advertising. For example, Mixpanel, Inc.
              (“Mixpanel”) uses cookies in connection with its analytics
              services. Mixpanels’s ability to use and share information
              collected by their analytics services about your visits to the
              Services is subject to the Mixpanel Terms of Use and the Mixpanel
              Privacy Policy. You have the option to opt-out of Mixpanel’s use
              of Cookies by visiting the Mixpanel Privacy Policy at{' '}
              <Link href="https://mixpanel.com/legal/privacy-policy/">
                https://mixpanel.com/legal/privacy-policy/
              </Link>
              .
            </li>
          </ul>
          <p>
            You can decide whether or not to accept Cookies through your
            internet browser’s settings. Most browsers have an option for
            turning off the Cookie feature, which will prevent your browser from
            accepting new Cookies, as well as (depending on the sophistication
            of your browser software) allow you to decide on acceptance of each
            new Cookie in a variety of ways. You can also delete all Cookies
            that are already on your device. If you do this, however, you may
            have to manually adjust some preferences every time you visit our
            website and some of the Services and functionalities may not work.
            <br />
            <br />
            To explore what Cookie settings are available to you, look in the
            “preferences” or “options” section of your browser’s menu. To find
            out more information about Cookies, including information about how
            to manage and delete Cookies, please visit{' '}
            <Link href="http://www.allaboutcookies.org/">
              http://www.allaboutcookies.org/
            </Link>{' '}
            or{' '}
            <Link href="https://ico.org.uk/for-the-public/online/cookies/">
              https://ico.org.uk/for-the-public/online/cookies/
            </Link>{' '}
            if you are located in the European Union.
          </p>
        </div>

        <Heading as="h2">Data Security and Retention</Heading>
        <div className={s.content}>
          <p>
            We seek to protect your Personal Data from unauthorized access, use
            and disclosure using appropriate physical, technical, organizational
            and administrative security measures based on the type of Personal
            Data and how we are processing that data. You should also help
            protect your data by appropriately selecting and protecting your
            password and/or other sign-on mechanism; limiting access to your
            computer or device and browser; and signing off after you have
            finished accessing your account. Although we work to protect the
            security of your account and other data that we hold in our records,
            please be aware that no method of transmitting data over the
            internet or storing data is completely secure. We retain Personal
            Data about you for as long as you have an open account with us or as
            otherwise necessary to provide you with our Services. In some cases
            we retain Personal Data for longer, if doing so is necessary to
            comply with our legal obligations, resolve disputes or collect fees
            owed, or is otherwise permitted or required by applicable law, rule
            or regulation. We may further retain information in an anonymous or
            aggregated form where that information would not identify you
            personally.
          </p>
        </div>

        <Heading as="h2">Personal Data of Children</Heading>
        <div className={s.content}>
          <p>
            As noted in the Terms of Use, we do not knowingly collect or solicit
            Personal Data about children under 16 years of age; if you are a
            child under the age of 16, please do not attempt to register for or
            otherwise use the Services or send us any Personal Data. If we learn
            we have collected Personal Data from a child under 16 years of age,
            we will delete that information as quickly as possible. If you
            believe that a child under 16 years of age may have provided
            Personal Data to us, please contact us at{' '}
            <Link href="mailto:support@replay.io">support@replay.io</Link>.
          </p>
        </div>

        <Heading as="h2">California Resident Rights</Heading>
        <div className={s.content}>
          <p>
            If you are a California resident, you have the rights set forth in
            this section. Please see the “Exercising Your Rights” section below
            for instructions regarding how to exercise these rights. Please note
            that we may process Personal Data of our customers’ end users or
            employees in connection with our provision of certain services to
            our customers. If we are processing your Personal Data as a service
            provider, you should contact the entity that collected your Personal
            Data in the first instance to address your rights with respect to
            such data. If there are any conflicts between this section and any
            other provision of this Privacy Policy and you are a California
            resident, the portion that is more protective of Personal Data shall
            control to the extent of such conflict. If you have any questions
            about this section or whether any of the following rights apply to
            you, please contact us at{' '}
            <Link href="mailto:support@replay.io">support@replay.io</Link>.
          </p>
        </div>

        <Heading as="h3">Access</Heading>
        <div className={s.content}>
          <p>
            You have the right to request certain information about our
            collection and use of your Personal Data over the past 12 months. In
            response, we will provide you with the following information:
          </p>
          <ul>
            <li>
              The categories of Personal Data that we have collected about you.
            </li>
            <li>
              The categories of sources from which that Personal Data was
              collected.
            </li>
            <li>
              The business or commercial purpose for collecting or selling your
              Personal Data.
            </li>
            <li>
              The categories of third parties with whom we have shared your
              Personal Data.
            </li>
            <li>
              The specific pieces of Personal Data that we have collected about
              you.
            </li>
          </ul>
          <p>
            If we have disclosed your Personal Data to any third parties for a
            business purpose over the past 12 months, we will identify the
            categories of Personal Data shared with each category of third party
            recipient. If we have sold your Personal Data over the past 12
            months, we will identify the categories of Personal Data sold to
            each category of third party recipient.
          </p>
        </div>

        <Heading as="h3">Deletion</Heading>
        <div className={s.content}>
          <p>
            You have the right to request that we delete the Personal Data that
            we have collected about you. Under the CCPA, this right is subject
            to certain exceptions: for example, we may need to retain your
            Personal Data to provide you with the Services or complete a
            transaction or other action you have requested. If your deletion
            request is subject to one of these exceptions, we may deny your
            deletion request.
          </p>
        </div>

        <Heading as="h3">Exercising Your Rights</Heading>
        <div className={s.content}>
          <p>
            To exercise the rights described above, you or your Authorized Agent
            (defined below) must send us a request that (1) provides sufficient
            information to allow us to verify that you are the person about whom
            we have collected Personal Data, and (2) describes your request in
            sufficient detail to allow us to understand, evaluate and respond to
            it. Each request that meets both of these criteria will be
            considered a “Valid Request.” We may not respond to requests that do
            not meet these criteria. We will only use Personal Data provided in
            a Valid Request to verify your identity and complete your request.
            You do not need an account to submit a Valid Request.
          </p>
          <p>
            We will work to respond to your Valid Request within 45 days of
            receipt. We will not charge you a fee for making a Valid Request
            unless your Valid Request(s) is excessive, repetitive or manifestly
            unfounded. If we determine that your Valid Request warrants a fee,
            we will notify you of the fee and explain that decision before
            completing your request. You may submit a Valid Request using the
            following methods:
          </p>
          <ul>
            <li>
              Email us at:{' '}
              <Link href="mailto:support@replay.io">support@replay.io</Link>
            </li>
          </ul>
          <p>
            You may also authorize an agent (an “Authorized Agent”) to exercise
            your rights on your behalf. To do this, you must provide your
            Authorized Agent with written permission to exercise your rights on
            your behalf, and we may request a copy of this written permission
            from your Authorized Agent when they make a request on your behalf.
          </p>
        </div>

        <Heading as="h3">Personal Data Sales Opt-Out and Opt-In</Heading>
        <div className={s.content}>
          <p>
            We will not sell your Personal Data, and have not done so over the
            last 12 months. To our knowledge, we do not sell the Personal Data
            of minors under 16 years of age.
          </p>
        </div>

        <Heading as="h3">
          We Will Not Discriminate Against You for Exercising Your Rights Under
          the CCPA
        </Heading>
        <div className={s.content}>
          <p>
            We will not discriminate against you for exercising your rights
            under the CCPA. We will not deny you our goods or services, charge
            you different prices or rates, or provide you a lower quality of
            goods and services if you exercise your rights under the CCPA.
            However, we may offer different tiers of our Services as allowed by
            applicable data privacy laws (including the CCPA) with varying
            prices, rates or levels of quality of the goods or services you
            receive related to the value of Personal Data that we receive from
            you.
          </p>
        </div>

        <Heading as="h2">Other State Law Privacy Rights</Heading>
        <Heading as="h3">California Resident Rights</Heading>
        <div className={s.content}>
          <p>
            Under California Civil Code Sections 1798.83-1798.84, California
            residents are entitled to contact us to prevent disclosure of
            Personal Data to third parties for such third parties’ direct
            marketing purposes; in order to submit such a request, please
            contact us at{' '}
            <Link href="mailto:support@replay.io">support@replay.io</Link>.
          </p>
        </div>
        <Heading as="h3">Nevada Resident Rights</Heading>
        <div className={s.content}>
          <p>
            If you are a resident of Nevada, you have the right to opt-out of
            the sale of certain Personal Data to third parties who intend to
            license or sell that Personal Data. You can exercise this right by
            contacting us at{' '}
            <Link href="mailto:support@replay.io">support@replay</Link>.io with
            the subject line “Nevada Do Not Sell Request” and providing us with
            your name and the email address associated with your account. Replay
            does not sell personal data.
          </p>
        </div>

        <Heading as="h2">Transfers of Personal Data</Heading>
        <div className={s.content}>
          <p>
            The Services are hosted and operated in the United States (“U.S.”)
            through Replay and its service providers, and if you do not reside
            in the U.S., laws in the U.S. may differ from the laws where you
            reside. By using the Services, you acknowledge that any Personal
            Data about you, regardless of whether provided by you or obtained
            from a third party, is being provided to Replay in the U.S. and will
            be hosted on U.S. servers, and you authorize Replay to transfer,
            store and process your information to and in the U.S., and possibly
            other countries.
          </p>
        </div>

        <Heading as="h2">Changes to this Privacy Policy</Heading>
        <div className={s.content}>
          <p>
            We’re constantly trying to improve our Services, so we may need to
            change this Privacy Policy from time to time, but we will alert you
            to any such changes by placing a notice on the Replay website, by
            sending you an email and/or by so me other means. Please note that
            if you’ve opted not to receive legal notice emails from us (or you
            haven’t provided us with your email address), those legal notices
            will still govern your use of the Services, and you are still
            responsible for reading and understanding them. If you use the
            Services after any changes to the Privacy Policy have been posted,
            that means you agree to all of the changes. Use of information we
            collect is subject to the Privacy Policy in effect at the time such
            information is collected.
          </p>
        </div>
        <Heading as="h2">Contact Information</Heading>
        <div className={s.content}>
          <p>
            If you have any questions or comments about this Privacy Policy, the
            ways in which we collect and use your Personal Data or your choices
            and rights regarding such collection and use, please do not hesitate
            to contact us at:
          </p>
          <ul className={s.contact}>
            <li>
              <Link href="mailto:support@replay.io">support@replay.io</Link>
            </li>
            <li>548 Market St, PMB 78081, San Francisco, CA 94104</li>
          </ul>
        </div>
      </Container>
    </Section>
  )
}
