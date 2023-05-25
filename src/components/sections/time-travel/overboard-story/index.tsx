import dynamic from 'next/dynamic'

import { AspectBox } from '~/components/common/aspect-box'
import { OnRenderFadeIn } from '~/components/common/on-render-fade-in'
import { Container } from '~/components/layout/container'
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
    </Container>
  )
}

export { Code, Debugger, DevTools, OverboardStore }
