import { FC } from 'react'

import { Section } from '~/components/common/section'

import s from './contact.module.scss'

const ContactForm: FC = () => {
  return (
    <Section className={s.section}>
      <div className={s.twoColumnLayout}>
        <div className={s.firstColumn}>
          <span className={s.contactLabel}>Contact us</span>
          <div className={s.content}>
            <article>
              <p>
                We'd love to hear from you. Please reach out via this form,{' '}
                <a href="http://replay.io/discord">say hi on Discord</a> , or
                check out our{' '}
                <a href="https://docs.replay.io">documentation.</a>
              </p>
              <p className={s.testimonial}>
                "Next.js App Router is now stable in 13.4. Wouldn’t have been
                possible without Replay, we investigated so many (over 20) super
                complicated bugs that using traditional debugging would have
                cost us days to investigate."
                <span className={s.author}>
                  – Tim Neutkins, Co-author of Next.js
                </span>
              </p>
            </article>
          </div>
        </div>
        <div className={s.secondColumn}>
          <iframe
            src="https://tally.so/embed/wApXpz?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            style={{ width: '100%', height: '500px', border: 'none' }}
            title="Lead generation form"
          ></iframe>
        </div>
      </div>
    </Section>
  )
}

export default ContactForm
