import dynamic from 'next/dynamic'

// import { useLayoutEffect, useRef } from 'react'
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
      {/* <ScrollBanner /> */}

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

      {/* {isDesktop && (
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
      )} */}
    </Container>
  )
}

// function ScrollBanner() {
//   const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

//   useLayoutEffect(() => {
//     let shouldDestroy = false

//     function handleScroll() {
//       const scrollBannerElement = document.getElementById(
//         'scroll-banner'
//       ) as HTMLElement
//       const heroElement = document.getElementById(
//         'hero-pin-wrapper'
//       ) as HTMLElement
//       const spacerElement = document.getElementById(
//         'scrollytelling-spacer'
//       ) as HTMLElement

//       if (heroElement === null || spacerElement === null) {
//         return
//       }

//       const minHeight = heroElement.offsetHeight
//       const maxHeight = spacerElement.offsetHeight - window.innerHeight
//       const scrollY = window.scrollY

//       /** Clear timeout if continuing to scroll */
//       if (timeoutId.current) {
//         clearTimeout(timeoutId.current)
//       }

//       if (shouldDestroy) {
//         scrollBannerElement.style.opacity = '0'

//         /** Wait to until transition is complete before hiding. */
//         setTimeout(() => {
//           /** Make sure to hide the element */
//           scrollBannerElement.style.display = 'none'
//         }, 300)

//         document.removeEventListener('scroll', handleScroll)
//       } else {
//         /** Remove listener once going through the entire story */
//         if (scrollY > maxHeight) {
//           shouldDestroy = true
//         }

//         /** Start timer to show scroll helper banner */
//         if (scrollY > minHeight && scrollY < maxHeight) {
//           const timeToShowBanner = 5000

//           timeoutId.current = setTimeout(() => {
//             shouldDestroy = true

//             scrollBannerElement.style.display = 'block'

//             /** Wait one tick to trigger transition. */
//             requestAnimationFrame(() => {
//               scrollBannerElement.style.opacity = '1'
//             })
//           }, timeToShowBanner)
//         }
//       }
//     }

//     document.addEventListener('scroll', handleScroll)

//     return () => {
//       document.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   return (
//     <div id="scroll-banner">
//       Keep scrolling to see the rest of the experience
//     </div>
//   )
// }

export { Code, Debugger, DevTools, OverboardStore }
