import { FC } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Link } from '~/components/primitives/link'

import s from '../policy/policy.module.scss'

export const TermsOfService: FC = () => {
  return (
    <Section className={s.section}>
      <Container size="sm" className={s.container}>
        <div className={s.heading}>
          <Heading as="h1" size="sm">
            Terms of Use
          </Heading>
          <span>Effective date: 28 MAR 2023</span>
          <span>Last reviewed: 2 Apr 2024</span>
        </div>

        <div className={s.content}>
          <p>
            Welcome to Replay. Please read on to learn the rules and restrictions that govern your
            use of our website(s), products, services and applications (the “Services”). If you have
            any questions, comments, or concerns regarding these terms or the Services, please
            contact us at:
          </p>
          <ul>
            <li>
              <Link href="mailto:support@replay.io">support@replay.io</Link>
            </li>
            <li>548 Market St, PMB 78081, San Francisco, CA 94104</li>
          </ul>
          <p>
            These Terms of Use (the “Terms”) are a binding contract between you and RECORD REPLAY
            INC. (“Replay,” “we” and “us”). Your use of the Services in any way means that you agree
            to all of these Terms, and these Terms will remain in effect while you use the Services.
            These Terms include the provisions in this document as well as those in the{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>.{' '}
            <strong>
              Your use of or participation in certain Services may also be subject to additional
              policies, rules and/or conditions (“Additional Terms”), which are incorporated herein
              by reference, and you understand and agree that by using or participating in any such
              Services, you agree to also comply with these Additional Terms.
            </strong>
            <br />
            <br />
            <strong>Please read these Terms carefully</strong>. They cover important information
            about Services provided to you and any charges, taxes, and fees we bill you. These Terms
            include information about future changes to these Terms, automatic renewals, limitations
            of liability, a class action waiver and resolution of disputes by arbitration instead of
            in court.{' '}
            <strong>
              PLEASE NOTE THAT YOUR USE OF AND ACCESS TO OUR SERVICES ARE SUBJECT TO THE FOLLOWING
              TERMS; IF YOU DO NOT AGREE TO ALL OF THE FOLLOWING, YOU MAY NOT USE OR ACCESS THE
              SERVICES IN ANY MANNER.
            </strong>
            <br />
            <br />
            <strong>ARBITRATION NOTICE AND CLASS ACTION WAIVER:</strong> EXCEPT FOR CERTAIN TYPES OF
            DISPUTES DESCRIBED IN THE ARBITRATION AGREEMENT SECTION BELOW, YOU AGREE THAT DISPUTES
            BETWEEN YOU AND US WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION AND YOU WAIVE
            YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.
          </p>
        </div>

        <Heading as="h2">Will these Terms ever change?</Heading>
        <div className={s.content}>
          <p>
            We are constantly trying to improve our Services, so these Terms may need to change
            along with our Services. We reserve the right to change the Terms at any time, but if we
            do, we will place a notice on our site located at replay.io, send you an email, and/or
            notify you by some other means.
            <br />
            <br />
            If you don’t agree with the new Terms, you are free to reject them; unfortunately, that
            means you will no longer be able to use the Services. If you use the Services in any way
            after a change to the Terms is effective, that means you agree to all of the changes.
            Except for changes by us as described here, no other amendment or modification of these
            Terms will be effective unless in writing and signed by both you and us.
          </p>
        </div>

        <Heading as="h2">What about my privacy?</Heading>
        <div className={s.content}>
          <p>
            Replay takes the privacy of its users very seriously. For the current Replay Privacy
            Policy, please <Link href="/privacy-policy">click here</Link>.
          </p>
        </div>

        <Heading as="h3">Children’s Online Privacy Protection Act</Heading>
        <div className={s.content}>
          <p>
            The Children’s Online Privacy Protection Act (“COPPA”) requires that online service
            providers obtain parental consent before they knowingly collect personally identifiable
            information online from children who are under 13 years of age. We do not knowingly
            collect or solicit personally identifiable information from children under 13 years of
            age; if you are a child under 13 years of age, please do not attempt to register for or
            otherwise use the Services or send us any personal information. If we learn we have
            collected personal information from a child under 13 years of age, we will delete that
            information as quickly as possible. If you believe that a child under 13 years of age
            may have provided us personal information, please contact us at{' '}
            <Link href="mailto:support@replay.io">support@replay.io</Link>.
          </p>
        </div>

        <Heading as="h2">What are the basics of using Replay?</Heading>
        <div className={s.content}>
          <p>
            You may be required to sign up for an account, select a password and user name (“Replay
            User ID”), and provide us with certain information or data, such as your contact
            information. You promise to provide us with accurate, complete, and updated registration
            information about yourself. You may not select as your Replay User ID a name that you do
            not have the right to use, or another person’s name with the intent to impersonate that
            person. You may not transfer your account to anyone else without our prior written
            permission.
            <br />
            <br />
            Additionally, you may be able to access certain parts or features of the Services by
            using your account credentials from other services (each, a “Third Party Account”), such
            as those offered by Google. By using the Services through a Third Party Account, you
            permit us to access certain information from such account for use by the Services. You
            are ultimately in control of how much information is accessible to us and may exercise
            such control by adjusting your privacy settings on your Third Party Account. You
            represent and warrant that you are an individual of legal age to form a binding contract
            (or if not, you’ve received your parent’s or guardian’s permission to use the Services
            and have gotten your parent or guardian to agree to these Terms on your behalf). If
            you’re agreeing to these Terms on behalf of an organization or entity, you represent and
            warrant that you are authorized to agree to these Terms on that organization’s or
            entity’s behalf and bind them to these Terms (in which case, the references to “you” and
            “your” in these Terms, except for in this sentence, refer to that organization or
            entity).
            <br />
            <br />
            You will only use the Services for your own internal, non-commercial use, and not on
            behalf of or for the benefit of any third party, and only in a manner that complies with
            all laws that apply to you. If your use of the Services is prohibited by applicable
            laws, then you aren’t authorized to use the Services. We can’t and won’t be responsible
            for your using the Services in a way that breaks the law.
            <br />
            <br />
            You will not share your Replay User ID, account or password with anyone, and you must
            protect the security of your Replay User ID, account, password and any other access
            tools or credentials. You’re responsible for any activity associated with your Replay
            User ID and account.
          </p>
        </div>

        <Heading as="h2">What about messaging?</Heading>
        <div className={s.content}>
          <p>
            As part of the Services, you may receive communications through the Services, including
            messages that Replay sends you (for example, via email). When signing up for the
            Services, you will receive a welcome message and instructions on how to stop receiving
            messages.
          </p>
        </div>

        <Heading as="h2">Are there restrictions in how I can use the Services?</Heading>
        <div className={s.content}>
          <p>
            You represent, warrant, and agree that you will not provide or contribute anything,
            including any Content or User Submission (as those terms are defined below), to the
            Services, or otherwise use or interact with the Services, in a manner that:
          </p>
          <ul>
            <li>
              infringes or violates the intellectual property rights or any other rights of anyone
              else (including Replay);
            </li>
            <li>
              violates any law or regulation, including, without limitation, any applicable export
              control laws, privacy laws or any other purpose not reasonably intended by Replay;
            </li>
            <li>
              is dangerous, harmful, fraudulent, deceptive, threatening, harassing, defamatory,
              obscene, or otherwise objectionable;
            </li>
            <li>
              jeopardizes the security of your Replay User ID, account or anyone else’s (such as
              allowing someone else to log in to the Services as you);
            </li>
            <li>
              attempts, in any manner, to obtain the password, account, or other security
              information from any other user;
            </li>
            <li>
              violates the security of any computer network, or cracks any passwords or security
              encryption codes;
            </li>
            <li>
              runs Maillist, Listserv, any form of auto-responder or “spam” on the Services, or any
              processes that run or are activated while you are not logged into the Services, or
              that otherwise interfere with the proper working of the Services (including by placing
              an unreasonable load on the Services’ infrastructure);
            </li>
            <li>
              “crawls,” “scrapes,” or “spiders” any page, data, or portion of or relating to the
              Services or Content (through use of manual or automated means); copies or stores any
              significant portion of the Content; or
            </li>
            <li>
              decompiles, reverse engineers, or otherwise attempts to obtain the source code or
              underlying ideas or information of or relating to the Services.
            </li>
          </ul>
          <p>
            A violation of any of the foregoing is grounds for termination of your right to use or
            access the Services.
          </p>
        </div>

        <Heading as="h2">What are my rights in the Services?</Heading>
        <div className={s.content}>
          <p>
            The materials displayed or performed or available on or through the Services, including,
            but not limited to, text, graphics, data, articles, photos, images, illustrations, User
            Submissions (as defined below) and so forth (all of the foregoing, the “Content”) are
            protected by copyright and/or other intellectual property laws. You promise to abide by
            all copyright notices, trademark rules, information, and restrictions contained in any
            Content you access through the Services, and you won’t use, copy, reproduce, modify,
            translate, publish, broadcast, transmit, distribute, perform, upload, display, license,
            sell, commercialize or otherwise exploit for any purpose any Content not owned by you,
            (i) without the prior consent of the owner of that Content or (ii) in a way that
            violates someone else’s (including Replay&apos;s) rights.
            <br />
            <br />
            Subject to these Terms, we grant each user of the Services a worldwide, non-exclusive,
            non-sublicensable and non-transferable license to use (i.e., to download and display
            locally) Content solely for purposes of using the Services. Use, reproduction,
            modification, distribution or storage of any Content for any purpose other than using
            the Services is expressly prohibited without prior written permission from us. You
            understand that Replay owns the Services. You won’t modify, publish, transmit,
            participate in the transfer or sale of, reproduce (except as expressly provided in this
            Section), create derivative works based on, or otherwise exploit any of the Services.
            The Services may allow you to copy or download certain Content, but please remember that
            even where these functionalities exist, all the restrictions in this section still
            apply.
          </p>
        </div>

        <Heading as="h2">
          What about anything I contribute to the Services – do I have to grant any licenses to
          Replay or to other users
        </Heading>
        <Heading as="h3">User Submissions</Heading>
        <div className={s.content}>
          <p>
            Anything you post, upload, share, store, or otherwise provide through the Services is
            your “User Submission”. Some User Submissions may be viewable by other users. You are
            solely responsible for all User Submissions you contribute to the Services. You
            represent that all User Submissions submitted by you are accurate, complete, up-to-date,
            and in compliance with all applicable laws, rules and regulations. You agree that you
            will not post, upload, share, store, or otherwise provide through the Services any User
            Submissions that: (i) infringe any third party&apos;s copyrights or other rights (e.g.,
            trademark, privacy rights, etc.); (ii) contain sexually explicit content or pornography;
            (iii) contain hateful, defamatory, or discriminatory content or incite hatred against
            any individual or group; (iv) exploit minors; (v) depict unlawful acts or extreme
            violence; (vi) depict animal cruelty or extreme violence towards animals; (vii) promote
            fraudulent schemes, multi-level marketing (MLM) schemes, get rich quick schemes, online
            gaming and gambling, cash gifting, work from home businesses, or any other dubious
            money-making ventures; or (viii) that violate any law.
          </p>
        </div>
        <Heading as="h3">Licenses</Heading>
        <div className={s.content}>
          <p>
            In order to display your User Submissions on the Services, and to allow other users to
            enjoy them (where applicable), you grant us certain rights in those User Submissions
            (see below for more information). Please note that all of the following licenses are
            subject to our <Link href="/privacy-policy">Privacy Policy</Link> to the extent they
            relate to User Submissions that are also your personally-identifiable information.
            <br />
            <br />
            For all User Submissions, you hereby grant Replay a license to translate, modify (for
            technical purposes, for example, making sure your content is viewable on a mobile device
            as well as a computer) and reproduce and otherwise act with respect to such User
            Submissions, in each case to enable us to operate the Services, as described in more
            detail below. This is a license only – your ownership in User Submissions is not
            affected.
            <br />
            <br />
            If you store a User Submission in your own personal Replay account, in a manner that is
            not viewable by any other user except you (a “Personal User Submission”), you grant
            Replay the license above, as well as a license to display, perform, and distribute your
            Personal User Submission for the sole purpose of making that Personal User Submission
            accessible to you and providing the Services necessary to do so.
            <br />
            <br />
            If you share a User Submission in a manner that only certain specified users can view
            (for example, a private message to one or more other users) (a “Limited Audience User
            Submission”), then you grant Replay the licenses above, as well as a license to display,
            perform, and distribute your Limited Audience User Submission for the sole purpose of
            making that Limited Audience User Submission accessible to such other specified users,
            and providing the Services necessary to do so. Also, you grant such other specified
            users a license to access that Limited Audience User Submission, and to use and exercise
            all rights in it, as permitted by the functionality of the Services.
            <br />
            <br />
            If you share a User Submission publicly on the Services and/or in a manner that more
            than just you or certain specified users can view, or if you provide us (in a direct
            email or otherwise) with any feedback, suggestions, improvements, enhancements, and/or
            feature requests relating to the Services (each of the foregoing, a “Public User
            Submission”), then you grant Replay the licenses above, as well as a license to display,
            perform, and distribute your Public User Submission for the purpose of making that
            Public User Submission accessible to all Replay users and providing the Services
            necessary to do so, as well as all other rights necessary to use and exercise all rights
            in that Public User Submission in connection with the Services and/or otherwise in
            connection with Replay&apos;s business. Also, you grant all other users of the Services
            a license to access that Public User Submission, and to use and exercise all rights in
            it, as permitted by the functionality of the Services.
            <br />
            <br />
            You agree that the licenses you grant are royalty-free, perpetual, sublicensable,
            irrevocable, and worldwide, provided that when you delete your Replay account, we will
            stop displaying your User Submissions (other than Public User Submissions, which may
            remain fully available) to other users (if applicable), but you understand and agree
            that it may not be possible to completely delete that content from Replay&apos;s
            records, and that your User Submissions may remain viewable elsewhere to the extent that
            they were copied or stored by other users.
            <br />
            <br />
            Certain features of the Services allow you to share information with others, including
            through your social networks or other Third Party Accounts. When Content is authorized
            for sharing, we will clearly identify the Content you are authorized to redistribute and
            the ways you may redistribute it, usually by providing a “share” button on or near the
            Content. If you share information from the Services with others through your Third Party
            Accounts, such as your social networks, you authorize Replay to share that information
            with the applicable Third Party Account provider. Please review the policies of any
            Third Party Account providers you share information with or through for additional
            information about how they may use your information. If you redistribute Content, you
            must be able to edit or delete any Content you redistribute, and you must edit or delete
            it promptly upon our request.
            <br />
            <br />
            Finally, you understand and agree that Replay, in performing the required technical
            steps to provide the Services to our users (including you), may need to make changes to
            your User Submissions to conform and adapt those User Submissions to the technical
            requirements of connection networks, devices, services, or media, and the foregoing
            licenses include the rights to do so.
          </p>
        </div>
        <Heading as="h2">
          What if I see something on the Services that infringes my copyright?
        </Heading>
        <div className={s.content}>
          <p>
            In accordance with the DMCA, we’ve adopted the following policy toward copyright
            infringement. We reserve the right to (1) block access to or remove material that we
            believe in good faith to be copyrighted material that has been illegally copied and
            distributed by any of our advertisers, affiliates, content providers, members or users
            and (2) remove and discontinue service to repeat offenders.
            <br />
            <br />
            <strong>Procedure for Reporting Copyright Infringements.</strong> If you believe that
            material or content residing on or accessible through the Services infringes your
            copyright (or the copyright of someone whom you are authorized to act on behalf of),
            please send a notice of copyright infringement containing the following information to
            Replay&apos;s Designated Agent to Receive Notification of Claimed Infringement (our
            “Designated Agent,” whose contact details are listed below):
          </p>
          <ul>
            <li>
              A physical or electronic signature of a person authorized to act on behalf of the
              owner of the copyright that has been allegedly infringed;
            </li>
            <li>Identification of works or materials being infringed;</li>
            <li>
              Identification of the material that is claimed to be infringing including information
              regarding the location of the infringing materials that the copyright owner seeks to
              have removed, with sufficient detail so that Company is capable of finding and
              verifying its existence;
            </li>
            <li>
              Contact information about the notifier including address, telephone number and, if
              available, email address;
            </li>
            <li>
              A statement that the notifier has a good faith belief that the material identified in
              (1)(c) is not authorized by the copyright owner, its agent, or the law; and
            </li>
            <li>
              A statement made under penalty of perjury that the information provided is accurate
              and the notifying party is authorized to make the complaint on behalf of the copyright
              owner.
            </li>
          </ul>
          <p>
            <strong>
              Once Proper Bona Fide Infringement Notification is Received by the Designated Agent.
            </strong>{' '}
            Upon receipt of a proper notice of copyright infringement, we reserve the right to:
          </p>
          <ul>
            <li>remove or disable access to the infringing material;</li>
            <li>
              notify the content provider who is accused of infringement that we have removed or
              disabled access to the applicable material; and
            </li>
            <li>
              terminate such content provider&apos;s access to the Services if he or she is a repeat
              offender.
            </li>
          </ul>
          <p>
            <strong>Procedure to Supply a Counter-Notice to the Designated Agent.</strong> If the
            content provider believes that the material that was removed (or to which access was
            disabled) is not infringing, or the content provider believes that it has the right to
            post and use such material from the copyright owner, the copyright owner&apos;s agent,
            or, pursuant to the law, the content provider may send us a counter-notice containing
            the following information to the Designated Agent:
          </p>
          <ul>
            <li>A physical or electronic signature of the content provider;</li>
            <li>
              Identification of the material that has been removed or to which access has been
              disabled and the location at which the material appeared before it was removed or
              disabled;
            </li>
            <li>
              A statement that the content provider has a good faith belief that the material was
              removed or disabled as a resolt of mistake or misidentification of the material; and
            </li>
            <li>
              Content provider&apos;s name, address, telephone number, and, if available, email
              address, and a statement that such person or entity consents to the jurisdiction of
              the Federal Court for the judicial district in which the content provider’s address is
              located, or, if the content provider&apos;s address is located outside the United
              States, for any judicial district in which Company is located, and that such person or
              entity will accept service of process from the person who provided notification of the
              alleged infringement.
            </li>
          </ul>
          <p>
            If a counter-notice is received by the Designated Agent, Company may, in its discretion,
            send a copy of the counter-notice to the original complaining party informing that
            person that Company may replace the removed material or cease disabling it in 10
            business days. Unless the copyright owner files an action seeking a court order against
            the content provider accused of committing infringement, the removed material may be
            replaced or access to it restored in 10 to 14 business days or more after receipt of the
            counter-notice, at Company&apos;s discretion.
            <br />
            <br />
            Please contact Replay&apos;s Designated Agent at the following address:
            <br />
            <br />
            <div className={s.contact}>
              Record Replay Inc.
              <br />
              Attn: DMCA Designated Agent
              <br />
              Brian Hackett
              <br />
              548 Market St, PMB 78081, San Francisco, CA 94104
              <br />
              <Link href="mailto:support@replay.io">support@replay.io</Link>
            </div>
          </p>
        </div>

        <Heading as="h2">Who is responsible for what I see and do on the Services?</Heading>
        <div className={s.content}>
          <p>
            Any information or Content publicly posted or privately transmitted through the Services
            is the sole responsibility of the person from whom such Content originated, and you
            access all such information and Content at your own risk, and we aren’t liable for any
            errors or omissions in that information or Content or for any damages or loss you might
            suffer in connection with it. We cannot control and have no duty to take any action
            regarding how you may interpret and use the Content or what actions you may take as a
            result of having been exposed to the Content, and you hereby release us from all
            liability for you having acquired or not acquired Content through the Services. We can’t
            guarantee the identity of any users with whom you interact in using the Services and are
            not responsible for which users gain access to the Services.
            <br />
            <br />
            You are responsible for all Content you contribute, in any manner, to the Services, and
            you represent and warrant you have all rights necessary to do so, in the manner in which
            you contribute it. The Services may contain links or connections to third-party websites
            or services that are not owned or controlled by Replay. When you access third-party
            websites or use third-party services, you accept that there are risks in doing so, and
            that Replay is not responsible for such risks. Replay has no control over, and assumes
            no responsibility for, the content, accuracy, privacy policies, or practices of or
            opinions expressed in any third-party websites or by any third party that you interact
            with through the Services. In addition, Replay will not and cannot monitor, verify,
            censor or edit the content of any third-party site or service. We encourage you to be
            aware when you leave the Services and to read the terms and conditions and privacy
            policy of each third-party website or service that you visit or utilize. By using the
            Services, you release and hold us harmless from any and all liability arising from your
            use of any third-party website or service.
            <br />
            <br />
            Your interactions with organizations and/or individuals found on or through the
            Services, including payment and delivery of goods or services, and any other terms,
            conditions, warranties or representations associated with such dealings, are solely
            between you and such organizations and/or individuals. You should make whatever
            investigation you feel necessary or appropriate before proceeding with any online or
            offline transaction with any of these third parties. You agree that Replay shall not be
            responsible or liable for any loss or damage of any sort incurred as the result of any
            such dealings. If there is a dispute between participants on this site or Services, or
            between users and any third party, you agree that Replay is under no obligation to
            become involved. In the event that you have a dispute with one or more other users, you
            release Replay, its directors, officers, employees, agents, and successors from claims,
            demands, and damages of every kind or nature, known or unknown, suspected or
            unsuspected, disclosed or undisclosed, arising out of or in any way related to such
            disputes and/or our Services. You shall and hereby do waive California Civil Code
            Section 1542 or any similar law of any jurisdiction, which says in substance: “A general
            release does not extend to claims that the creditor or releasing party does not know or
            suspect to exist in his or her favor at the time of executing the release and that, if
            known by him or her, would have materially affected his or her settlement with the
            debtor or released party.”
          </p>
        </div>

        <Heading as="h2">Will Replay ever change the Services?</Heading>
        <div className={s.content}>
          <p>
            We’re always trying to improve our Services, so they may change over time. We may
            suspend or discontinue any part of the Services, or we may introduce new features or
            impose limits on certain features or restrict access to parts or all of the Services.
            We’ll try to give you notice when we make a material change to the Services that would
            adversely affect you, but this isn’t always practical. We reserve the right to remove
            any Content from the Services at any time, for any reason (including, but not limited
            to, if someone alleges you contributed that Content in violation of these Terms), in our
            sole discretion, and without notice.
          </p>
        </div>

        <Heading as="h2">Do the Services cost anything?</Heading>
        <div className={s.content}>
          <p>
            The Services may be free or we may charge a fee for using the Services. If you are using
            a free version of the Services, we will notify you before any Services you are then
            using begin carrying a fee, and if you wish to continue using such Services, you must
            pay all applicable fees for such Services. Note that if you elect to receive text
            messages through the Services, data and message rates may apply. Any and all such
            charges, fees or costs are your sole responsibility. You should consult with your
            wireless carrier to determine what rates, charges, fees or costs may apply to your use
            of the Services.
          </p>
          <ul>
            <li>
              <strong>Paid Services.</strong> Certain of our Services may be subject to payments now
              or in the future (the “Paid Services”). Please see our Paid Services page for a
              description of the current Paid Services. Please note that any payment terms presented
              to you in the process of using or signing up for a Paid Service are deemed part of
              these Terms.
            </li>
            <li>
              <strong>Billing.</strong> We use a third-party payment processor (the “Payment
              Processor”) to bill you through a payment account linked to your account on the
              Services (your “Billing Account”) for use of the Paid Services. The processing of
              payments will be subject to the terms, conditions and privacy policies of the Payment
              Processor in addition to these Terms. Currently, we use Stripe, Inc. as our Payment
              Processor. You can access Stripe’s Terms of Service at{' '}
              <Link href="https://stripe.com/us/checkout/legal">
                https://stripe.com/us/checkout/legal
              </Link>{' '}
              and their Privacy Policy at{' '}
              <Link href="https://stripe.com/us/privacy">https://stripe.com/us/privacy</Link>. We
              are not responsible for any error by, or other acts or omissions of, the Payment
              Processor. By choosing to use Paid Services, you agree to pay us, through the Payment
              Processor, all charges at the prices then in effect for any use of such Paid Services
              in accordance with the applicable payment terms, and you authorize us, through the
              Payment Processor, to charge your chosen payment provider (your “Payment Method”). You
              agree to make payment using that selected Payment Method. We reserve the right to
              correct any errors or mistakes that the Payment Processor makes even if it has already
              requested or received payment.
            </li>
            <li>
              <strong>Payment Method.</strong> The terms of your payment will be based on your
              Payment Method and may be determined by agreements between you and the financial
              institution, credit card issuer or other provider of your chosen Payment Method. If
              we, through the Payment Processor, do not receive payment from you, you agree to pay
              all amounts due on your Billing Account upon demand. Recurring Billing. Some of the
              Paid Services may consist of an initial period, for which there is a one-time charge,
              followed by recurring period charges as agreed to by you. By choosing a recurring
              payment plan, you acknowledge that such Services have an initial and recurring payment
              feature and you accept responsibility for all recurring charges prior to cancellation.
              WE MAY SUBMIT PERIODIC CHARGES (E.G., MONTHLY) WITHOUT FURTHER AUTHORIZATION FROM YOU,
              UNTIL YOU PROVIDE PRIOR NOTICE (RECEIPT OF WHICH IS CONFIRMED BY US) THAT YOU HAVE
              TERMINATED THIS AUTHORIZATION OR WISH TO CHANGE YOUR PAYMENT METHOD. SUCH NOTICE WILL
              NOT AFFECT CHARGES SUBMITTED BEFORE WE REASONABLY COULD ACT. TO TERMINATE YOUR
              AUTHORIZATION OR CHANGE YOUR PAYMENT METHOD, GO TO ACCOUNT SETTINGS.
            </li>
            <li>
              <strong>Current Information Required.</strong> YOU MUST PROVIDE CURRENT, COMPLETE AND
              ACCURATE INFORMATION FOR YOUR BILLING ACCOUNT. YOU MUST PROMPTLY UPDATE ALL
              INFORMATION TO KEEP YOUR BILLING ACCOUNT CURRENT, COMPLETE AND ACCURATE (SUCH AS A
              CHANGE IN BILLING ADDRESS, CREDIT CARD NUMBER, OR CREDIT CARD EXPIRATION DATE), AND
              YOU MUST PROMPTLY NOTIFY US OR OUR PAYMENT PROCESSOR IF YOUR PAYMENT METHOD IS
              CANCELED (E.G., FOR LOSS OR THEFT) OR IF YOU BECOME AWARE OF A POTENTIAL BREACH OF
              SECURITY, SUCH AS THE UNAUTHORIZED DISCLOSURE OR USE OF YOUR USER NAME OR PASSWORD.
              CHANGES TO SUCH INFORMATION CAN BE MADE AT{' '}
              <Link href="https://app.replay.io/?settings">ACCOUNT SETTINGS</Link>. IF YOU FAIL TO
              PROVIDE ANY OF THE FOREGOING INFORMATION, YOU AGREE THAT WE MAY CONTINUE CHARGING YOU
              FOR ANY USE OF PAID SERVICES UNDER YOUR BILLING ACCOUNT UNLESS YOU HAVE TERMINATED
              YOUR PAID SERVICES AS SET FORTH ABOVE.
            </li>
            <li>
              <strong>Change in Amount Authorized.</strong> If the amount to be charged to your
              Billing Account varies from the amount you preauthorized (other than due to the
              imposition or change in the amount of state sales taxes), you have the right to
              receive, and we shall provide, notice of the amount to be charged and the date of the
              charge before the scheduled date of the transaction. Any agreement you have with your
              payment provider will govern your use of your Payment Method. You agree that we may
              accumulate charges incurred and submit them as one or more aggregate charges during or
              at the end of each billing cycle.
            </li>
            <li>
              <strong>Auto-Renewal for Paid Services.</strong> Unless you opt out of auto-renewal,
              which can be done through your{' '}
              <Link href="https://app.replay.io/?settings">account settings</Link>, any Paid
              Services you have signed up for will be automatically extended for successive renewal
              periods of the same duration as the subscription term originally selected, at the
              then-current non-promotional rate. To change or resign your Paid Services at any time,
              go to <Link href="https://app.replay.io/?settings">account settings</Link>. If you
              terminate a Paid Service, you may use your subscription until the end of your
              then-current term, and your subscription will not be renewed after your then-current
              term expires. However, you will not be eligible for a prorated refund of any portion
              of the subscription fee paid for the then-current subscription period. If you do not
              want to continue to be charged on a recurring monthly basis, you must cancel the
              applicable Paid Service through your{' '}
              <Link href="https://app.replay.io/?settings">account settings</Link> or terminate your
              REPLAY account before the end of the recurring TERM. Paid Services cannot be
              terminated before the end of the period for which you have already paid, and except as
              expressly provided in these terms, REPLAY will not refund any fees that you have
              already paid.
            </li>
            <li>
              <strong>Reaffirmation of Authorization.</strong> Your non-termination or continued use
              of a Paid Service reaffirms that we are authorized to charge your Payment Method for
              that Paid Service. We may submit those charges for payment and you will be responsible
              for such charges. This does not waive our right to seek payment directly from you.
              Your charges may be payable in advance, in arrears, per usage, or as otherwise
              described when you initially selected to use the Paid Service.
            </li>
          </ul>
        </div>

        <Heading as="h2">What if I want to stop using the Services?</Heading>
        <div className={s.content}>
          <p>
            You’re free to do that at any time by contacting us at
            <Link href="mailto:support@replay.io">support@replay.io</Link>; please refer to our{' '}
            <Link href="/privacy-policy">Privacy Policy</Link> as well as the licenses above, to
            understand how we treat information you provide to us after you have stopped using our
            Services.
            <br />
            <br />
            Replay is also free to terminate (or suspend access to) your use of the Services or your
            account for any reason in our discretion, including your breach of these Terms. Replay
            has the sole right to decide whether you are in violation of any of the restrictions set
            forth in these Terms.
            <br />
            <br />
            Account termination may result in destruction of any Content associated with your
            account, so keep that in mind before you decide to terminate your account. We will try
            to provide advance notice to you prior to our terminating your account so that you are
            able to retrieve any important User Submissions you may have stored in your account (to
            the extent allowed by law and these Terms), but we may not do so if we determine it
            would be impractical, illegal, not in the interest of someone’s safety or security, or
            otherwise harmful to the rights or property of Replay.
            <br />
            <br />
            If you have deleted your account by mistake, contact us immediately at{' '}
            <Link href="mailto:support@replay.io">support@replay.io</Link> – we will try to help,
            but unfortunately, we can’t promise that we can recover or restore anything.
            <br />
            <br />
            Provisions that, by their nature, should survive termination of these Terms shall
            survive termination. By way of example, all of the following will survive termination:
            any obligation you have to pay us or indemnify us, any limitations on our liability, any
            terms regarding ownership or intellectual property rights, and terms regarding disputes
            between us, including without limitation the arbitration agreement.
          </p>
        </div>

        <Heading as="h2">What else do I need to know?</Heading>
        <div className={s.content}>
          <p>
            <strong>Warranty Disclaimer.</strong> Replay and its licensors, suppliers, partners,
            parent, subsidiaries or affiliated entities, and each of their respective officers,
            directors, members, employees, consultants, contract employees, representatives and
            agents, and each of their respective successors and assigns (Replay and all such parties
            together, the “Replay Parties”) make no representations or warranties concerning the
            Services, including without limitation regarding any Content contained in or accessed
            through the Services, and the Replay Parties will not be responsible or liable for the
            accuracy, copyright compliance, legality, or decency of material contained in or
            accessed through the Services or any claims, actions, suits procedures, costs, expenses,
            damages or liabilities arising out of use of, or in any way related to your
            participation in, the Services. The Replay Parties make no representations or warranties
            regarding suggestions or recommendations of services or products offered or purchased
            through or in connection with the Services. THE SERVICES AND CONTENT ARE PROVIDED BY
            REPLAY (AND ITS LICENSORS AND SUPPLIERS) ON AN “AS-IS” BASIS, WITHOUT WARRANTIES OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR THAT USE OF THE
            SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE. SOME STATES DO NOT ALLOW LIMITATIONS ON
            HOW LONG AN IMPLIED WARRANTY LASTS, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
            <br />
            <br />
            <strong>Limitation of Liability.</strong> TO THE FULLEST EXTENT ALLOWED BY APPLICABLE
            LAW, UNDER NO CIRCUMSTANCES AND UNDER NO LEGAL THEORY (INCLUDING, WITHOUT LIMITATION,
            TORT, CONTRACT, STRICT LIABILITY, OR OTHERWISE) SHALL ANY OF THE REPLAY PARTIES BE
            LIABLE TO YOU OR TO ANY OTHER PERSON FOR (A) ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE
            OR CONSEQUENTIAL DAMAGES OF ANY KIND, INCLUDING DAMAGES FOR LOST PROFITS, BUSINESS
            INTERRUPTION, LOSS OF DATA, LOSS OF GOODWILL, WORK STOPPAGE, ACCURACY OF RESULTS, OR
            COMPUTER FAILURE OR MALFUNCTION, (B) ANY SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY, (C)
            ANY AMOUNT, IN THE AGGREGATE, IN EXCESS OF THE GREATER OF (I) ONE-HUNDRED ($100) DOLLARS
            OR (II) THE AMOUNTS PAID AND/OR PAYABLE BY YOU TO REPLAY IN CONNECTION WITH THE SERVICES
            IN THE TWELVE (12) MONTH PERIOD PRECEDING THIS APPLICABLE CLAIM OR (D) ANY MATTER BEYOND
            OUR REASONABLE CONTROL. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
            INCIDENTAL OR CONSEQUENTIAL OR CERTAIN OTHER DAMAGES, SO THE ABOVE LIMITATION AND
            EXCLUSIONS MAY NOT APPLY TO YOU.
            <br />
            <br />
            <strong>Indemnity.</strong> You agree to indemnify and hold the Replay Parties harmless
            from and against any and all claims, liabilities, damages (actual and consequential),
            losses and expenses (including attorneys’ fees) arising from or in any way related to
            any claims relating to (a) your use of the Services (including any actions taken by a
            third party using your account), and (b) your violation of these Terms. In the event of
            such a claim, suit, or action (“Claim”), we will attempt to provide notice of the Claim
            to the contact information we have for your account (provided that failure to deliver
            such notice shall not eliminate or reduce your indemnification obligations hereunder).
            Assignment. You may not assign, delegate or transfer these Terms or your rights or
            obligations hereunder, or your Services account, in any way (by operation of law or
            otherwise) without Replay&apos;s prior written consent. We may transfer, assign, or
            delegate these Terms and our rights and obligations without consent.
            <br />
            <br />
            <strong>Choice of Law.</strong> These Terms are governed by and will be construed under
            the Federal Arbitration Act, applicable federal law, and the laws of the State of
            California, without regard to the conflicts of laws provisions thereof.
            <br />
            <br />
            <strong>Arbitration Agreement.</strong> Please read the following ARBITRATION AGREEMENT
            carefully because it requires you to arbitrate certain disputes and claims with Replay
            and limits the manner in which you can seek relief from Replay. Both you and Replay
            acknowledge and agree that for the purposes of any dispute arising out of or relating to
            the subject matter of these Terms, Replay&apos;s officers, directors, employees and
            independent contractors (“Personnel”) are third-party beneficiaries of these Terms, and
            that upon your acceptance of these Terms, Personnel will have the right (and will be
            deemed to have accepted the right) to enforce these Terms against you as the third-party
            beneficiary hereof.
          </p>
          <ul>
            <li>
              Arbitration Rules; Applicability of Arbitration Agreement. The parties shall use their
              best efforts to settle any dispute, claim, question, or disagreement arising out of or
              relating to the subject matter of these Terms directly through good-faith
              negotiations, which shall be a precondition to either party initiating arbitration. If
              such negotiations do not resolve the dispute, it shall be finally settled by binding
              arbitration in Santa Clara County, California. The arbitration will proceed in the
              English language, in accordance with the JAMS Streamlined Arbitration Rules and
              Procedures (the “Rules”) then in effect, by one commercial arbitrator with substantial
              experience in resolving intellectual property and commercial contract disputes. The
              arbitrator shall be selected from the appropriate list of JAMS arbitrators in
              accordance with such Rules. Judgment upon the award rendered by such arbitrator may be
              entered in any court of competent jurisdiction.
            </li>
            <li>
              Costs of Arbitration. The Rules will govern payment of all arbitration fees. Replay
              will pay all arbitration fees for claims less than seventy-five thousand ($75,000)
              dollars. Replay will not seek its attorneys’ fees and costs in arbitration unless the
              arbitrator determines that your claim is frivolous.
            </li>
            <li>
              Small Claims Court; Infringement. Either you or Replay may assert claims, if they
              qualify, in small claims court in Santa Clara County, California or any United States
              county where you live or work. Furthermore, notwithstanding the foregoing obligation
              to arbitrate disputes, each party shall have the right to pursue injunctive or other
              equitable relief at any time, from any court of competent jurisdiction, to prevent the
              actual or threatened infringement, misappropriation or violation of a party&apos;s
              copyrights, trademarks, trade secrets, patents or other intellectual property rights.
            </li>
            <li>
              Waiver of Jury Trial. YOU AND REPLAY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO
              GO TO COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR JURY. You and Replay are instead
              choosing to have claims and disputes resolved by arbitration. Arbitration procedures
              are typically more limited, more efficient, and less costly than rules applicable in
              court and are subject to very limited review by a court. In any litigation between you
              and Replay over whether to vacate or enforce an arbitration award, YOU AND REPLAY
              WAIVE ALL RIGHTS TO A JURY TRIAL, and elect instead to have the dispute be resolved by
              a judge.
            </li>
            <li>
              Waiver of Class or Consolidated Actions. ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF
              THIS ARBITRATION AGREEMENT MUST BE ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND
              NOT ON A CLASS BASIS. CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR
              LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER. If
              however, this waiver of class or consolidated actions is deemed invalid or
              unenforceable, neither you nor Replay is entitled to arbitration; instead all claims
              and disputes will be resolved in a court as set forth in (g) below.
            </li>
            <li>
              Opt-out. You have the right to opt out of the provisions of this Section by sending
              written notice of your decision to opt out to the following address: 548 Market St,
              PMB 78081, San Francisco, CA 94104, postmarked within thirty (30) days of first
              accepting these Terms. You must include (i) your name and residence address, (ii) the
              email address and/or telephone number associated with your account, and (iii) a clear
              statement that you want to opt out of these Terms’ arbitration agreement.
            </li>
            <li>
              Exclusive Venue. If you send the opt-out notice in (f), and/or in any circumstances
              where the foregoing arbitration agreement permits either you or Replay to litigate any
              dispute arising out of or relating to the subject matter of these Terms in court, then
              the foregoing arbitration agreement will not apply to either party, and both you and
              Replay agree that any judicial proceeding (other than small claims actions) will be
              brought in the state or federal courts located in, respectively, Santa Clara County,
              California, or the federal district in which that county falls.
            </li>
            <li>
              Severability. If the prohibition against class actions and other claims brought on
              behalf of third parties contained above is found to be unenforceable, then all of the
              preceding language in this Arbitration Agreement section will be null and void. This
              arbitration agreement will survive the termination of your relationship with Replay.
            </li>
          </ul>
          <p>
            <strong>Miscellaneous.</strong> You will be responsible for paying, withholding, filing,
            and reporting all taxes, duties, and other governmental assessments associated with your
            activity in connection with the Services, provided that the Replay may, in its sole
            discretion, do any of the foregoing on your behalf or for itself as it sees fit. The
            failure of either you or us to exercise, in any way, any right herein shall not be
            deemed a waiver of any further rights hereunder. If any provision of these Terms are
            found to be unenforceable or invalid, that provision will be limited or eliminated, to
            the minimum extent necessary, so that these Terms shall otherwise remain in full force
            and effect and enforceable. You and Replay agree that these Terms are the complete and
            exclusive statement of the mutual understanding between you and Replay, and that these
            Terms supersede and cancel all previous written and oral agreements, communications and
            other understandings relating to the subject matter of these Terms. You hereby
            acknowledge and agree that you are not an employee, agent, partner, or joint venture of
            Replay, and you do not have any authority of any kind to bind Replay in any respect
            whatsoever.
            <br />
            <br />
            Except as expressly set forth in the section above regarding the arbitration agreement,
            you and Replay agree there are no third-party beneficiaries intended under these Terms.
          </p>
        </div>
      </Container>
    </Section>
  )
}
