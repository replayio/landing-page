import { FC } from 'react'

import { Section } from '~/components/common/section'

import s from './branding.module.scss'

const StyleGuide: FC = () => {
  return (
    <Section className={s.section}>
      <h1 className={s['title']}>Our styleguide</h1>

      <table className={s['copy-table']}>
        <thead>
          <tr>
            <th>Content</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Company name</td>
            <td>Replay.io</td>
          </tr>
          <tr>
            <td>Browser</td>
            <td>Replay Browser</td>
          </tr>
          <tr>
            <td>DevTools</td>
            <td>Replay DevTools</td>
          </tr>
          <tr>
            <td>Recording</td>
            <td>replay (e.g. "Please share the replay with me")</td>
          </tr>
          <tr>
            <td>Copy style</td>
            <td>Sentence case</td>
          </tr>
          <tr>
            <td>Typeface</td>
            <td>
              <a
                href="https://fonts.google.com/specimen/Space+Grotesk"
                className={s['link']}
              >
                Space Grotesk
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  )
}

export default StyleGuide
