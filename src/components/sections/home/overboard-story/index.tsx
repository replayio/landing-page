import dynamic from 'next/dynamic'

import { AspectBox } from '~/components/common/aspect-box'
import { OnRenderFadeIn } from '~/components/common/on-render-fade-in'
import { Container } from '~/components/layout/container'
import { ButtonLink } from '~/components/primitives/button'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useViewportSize } from '~/hooks/use-viewport-size'

import { Code } from './code'
import { Debugger } from './debugger'
import { DevTools } from './devtools'
import { OverboardStore } from './overboard-store'

const ReplayApplication = dynamic(() => import('./scrollytelling'), {
  ssr: false,
  loading: () => <AspectBox ratio={1920 / 1080} />
})

const SCROLLYTELLING_MIN_HEIGHT = 620

export function OverboardStory() {
  const { isDesktop } = useDeviceDetect()
  const { height } = useViewportSize()

  const canFitScrollytelling = height >= SCROLLYTELLING_MIN_HEIGHT

  return (
    <Container size="lg">
      {(() => {
        switch (isDesktop) {
          case true && canFitScrollytelling:
            return <ReplayApplication />

          case false || !canFitScrollytelling:
            return (
              <OnRenderFadeIn>
                {(animationEnded: boolean) => {
                  return (
                    <AspectBox
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      ratio={1593 / 1080}
                    >
                      <video
                        style={{ borderRadius: 12, zIndex: 10 }}
                        muted
                        playsInline
                        src={
                          animationEnded ? '/video/hero-video.mp4' : undefined
                        }
                        controls
                        poster="/video/hero-video-thumbnail.png"
                      />
                    </AspectBox>
                  )
                }}
              </OnRenderFadeIn>
            )

          default:
            /* This saves the space for the video/scrollytelling preventing layout shift */
            return <AspectBox ratio={1920 / 1080} />
        }
      })()}

      {isDesktop && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '80px',
            marginBottom: '-20px'
          }}
        >
          <p
            style={{
              width: '360px',
              textAlign: 'center',
              marginBottom: '1.2rem',
              fontStyle: 'italic'
            }}
          >
            We promise this isn't vaporware. Inspect this replay in DevTools, no
            login needed.
          </p>
          <ButtonLink
            href="https://app.replay.io/recording/cannot-purchase-bugslayer--76c9f375-ccc9-4af9-a431-6e69e5f6e053"
            variant="tertiary-inverted-alt"
          >
            View original replay
          </ButtonLink>
        </div>
      )}
    </Container>
  )
}

export { Code, Debugger, DevTools, OverboardStore }
