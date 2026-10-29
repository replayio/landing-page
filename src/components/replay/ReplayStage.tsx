/* The eager half of the headless stage: a lazy boundary around `ReplayStageImpl`, so importing
   `ReplayStage` never pulls in rrweb — it (and its stylesheet) load on first render. */
import { Suspense, forwardRef, lazy } from 'react'
import type { ReplayStageHandle, ReplayStageProps } from './stage-types'

const load = () => import('./ReplayStageImpl')
const LazyReplayStage = lazy(load)

/** Start loading the rrweb player chunk ahead of the first `ReplayStage` render. */
export function preloadReplayStage(): Promise<unknown> {
  return load()
}

/**
 * A headless rrweb player: the recorded page, fitted to its box, with no controls. Drive it
 * through the ref (`play`, `pause`, `seek`, …) and the `onTimeUpdate` / `onPlayingChange`
 * callbacks to build custom player chrome.
 */
export const ReplayStage = forwardRef<ReplayStageHandle, ReplayStageProps>(function ReplayStage(
  { fallback = null, ...props },
  ref,
) {
  return (
    <Suspense fallback={fallback}>
      <LazyReplayStage ref={ref} {...props} />
    </Suspense>
  )
})
