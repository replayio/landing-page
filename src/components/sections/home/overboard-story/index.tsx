import dynamic from 'next/dynamic'

import { AspectBox } from '~/components/common/aspect-box'
import { OnRenderFadeIn } from '~/components/common/on-render-fade-in'
import { PlayIcon } from '~/components/common/play-icon'
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

  // useEffect(() => {
  //   let int

  //   gsap.delayedCall(3, () => {
  //     int = setInterval(() => {
  //       console.log('Hi')
  //       window.scroll({ top: window.scrollY + 2.5 })
  //     }, 1)
  //   })

  //   return () => {
  //     if (int) {
  //       clearInterval(int)
  //     }
  //   }
  // }, [])

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
                    <video
                      style={{ borderRadius: 12, zIndex: 10 }}
                      muted
                      playsInline
                      src={animationEnded ? '/video/hero-video.mp4' : undefined}
                      controls
                      poster="/video/hero-video-thumbnail.png"
                    />
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
          <ButtonLink
            href="https://app.replay.io/recording/cannot-purchase-bugslayer--76c9f375-ccc9-4af9-a431-6e69e5f6e053"
            variant="tertiary-inverted-alt"
          >
            View Overboard replay
            <PlayIcon style={{ marginLeft: '14px' }} />
          </ButtonLink>
        </div>
      )}
    </Container>
  )
}

export { Code, Debugger, DevTools, OverboardStore }
