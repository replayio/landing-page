import dynamic from 'next/dynamic'

import { AspectBox } from '~/components/common/aspect-box'
import { OnRenderFadeIn } from '~/components/common/on-render-fade-in'
import { Container } from '~/components/layout/container'
import { ButtonLink } from '~/components/primitives/button'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useHasRendered } from '~/hooks/use-has-rendered'
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
  const rendered = useHasRendered()
  const { isDesktop } = useDeviceDetect()
  const { height } = useViewportSize()

  const canFitScrollytelling = height >= SCROLLYTELLING_MIN_HEIGHT

  return (
    <Container size="lg">
      <div
        style={{
          minWidth: 200,
          padding: '4px 8px',
          transform: 'translateX(-50%)',
          position: 'fixed',
          left: '50%',
          top: 10,
          zIndex: 1000,
          borderRadius: 'var(--border-radius-md)',
          backgroundColor: 'var(--color-gray-darker)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        Keep scrolling to see the rest of the experience
      </div>

      {(() => {
        if (rendered && isDesktop == true && canFitScrollytelling) {
          return <ReplayApplication />
        }

        if (rendered && (isDesktop == false || !canFitScrollytelling)) {
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
                      src={animationEnded ? '/video/hero-video.mp4' : undefined}
                      controls
                      poster="/video/hero-video-thumbnail.png"
                    />
                  </AspectBox>
                )
              }}
            </OnRenderFadeIn>
          )
        }

        /* This saves the space for the video/scrollytelling preventing layout shift */
        return <AspectBox ratio={1920 / 1080} />
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
