import { FC } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'

import s from './software-tells-story.module.scss'

const PlayIcon = () => (
  <svg
    width="17"
    height="18"
    viewBox="0 0 17 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.0214 8.14526C14.6595 8.52577 14.6595 9.47423 14.0214 9.85474L3.94062 15.8655C3.30087 16.2469 2.5 15.7718 2.5 15.0107L2.5 2.98927C2.5 2.22824 3.30087 1.75307 3.94062 2.13452L14.0214 8.14526Z"
      fill="#464646"
    />
  </svg>
)

const story = [
  {
    title: 'Replayable.dev',
    subtitle: 'Share all the context. Avoid draining back-and-forths.',
    asset: <></>
  },
  {
    title: 'Tutorials',
    subtitle: 'Share all the context. Avoid draining back-and-forths.',
    asset: <></>
  },
  {
    title: 'React Community Guide',
    subtitle: 'Share all the context. Avoid draining back-and-forths.',
    asset: <></>
  },
  {
    title: 'Walkthroughs',
    subtitle: 'Share all the context. Avoid draining back-and-forths.',
    asset: <></>
  }
]

export const SoftwareTellsStory: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="lg">
        <SectionHeading title="Software tells a story" centered />
        <div className={s['cta']}>
          <Button variant="tertiary" size="md">
            Replay for teams{' '}
            <span style={{ marginLeft: 8 }}>
              <PlayIcon />
            </span>
          </Button>
        </div>
        <div className={s['main']}>
          <div className={s['story']}>
            {story.map(({ title, subtitle }) => (
              <div className={s['story-chunk']} key={title}>
                <div className={s['timeline']}></div>
                <div className={s['content']}>
                  <p className={s['content-title']}>
                    <span className={s['timeline-marker']}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="10"
                          fill="#F41C52"
                          fillOpacity="0.2"
                        />
                        <circle cx="10" cy="10" r="5.625" fill="#F41C52" />
                      </svg>
                    </span>
                    {title}
                  </p>
                  <p className={s['content-subtitle']}>{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={s['asset']}>
            <AspectBox ratio={785 / 627} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
