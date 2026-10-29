/* The headless rrweb stage: mounts rrweb's Replayer, fits the recorded viewport into its box
   and exposes an imperative handle, with no controls of its own. Loaded on demand through
   `ReplayStage`, so rrweb and its stylesheet stay out of the eager graph. */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Replayer } from 'rrweb'
import type { eventWithTime } from 'rrweb'
import { getReplayMeta } from './markers'
import { sanitizeReplayEvent } from './sanitize'
import type { ReplayStageHandle, ReplayStageProps } from './stage-types'
import { ReplayEventType } from './types'
import 'rrweb/dist/style.css'

const SKIP_IDLE_THRESHOLD_MS = 5_000

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const ReplayStageImpl = forwardRef<ReplayStageHandle, ReplayStageProps>(function ReplayStageImpl(
  {
    events,
    autoplay = false,
    loop = false,
    speed = 1,
    skipInactive = true,
    initialTime = 0,
    fit = 'width',
    showMouse = true,
    overlay,
    className,
    style,
    onReady,
    onTimeUpdate,
    onPlayingChange,
    onFinish,
    onLayout,
  },
  ref,
) {
  const boxRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const replayerRef = useRef<Replayer | null>(null)
  const playingRef = useRef(false)
  const fedCountRef = useRef(0)
  const rafRef = useRef(0)
  const callbacks = useRef({ onReady, onTimeUpdate, onPlayingChange, onFinish, onLayout })
  callbacks.current = { onReady, onTimeUpdate, onPlayingChange, onFinish, onLayout }
  const options = useRef({ autoplay, loop, speed, skipInactive, initialTime })
  options.current = { autoplay, loop, speed, skipInactive, initialTime }

  const prepared = useMemo(
    () =>
      events
        .map((event) => sanitizeReplayEvent(event))
        .sort((a, b) => a.timestamp - b.timestamp) as unknown as eventWithTime[],
    [events],
  )
  const meta = useMemo(() => getReplayMeta(events), [events])
  const [dims, setDims] = useState<{ w: number; h: number }>(() => ({ w: meta.width, h: meta.height }))
  const [box, setBox] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  const time = useCallback(() => {
    try {
      const replayer = replayerRef.current
      if (!replayer) return 0
      return Math.max(0, Math.min(replayer.getCurrentTime(), replayer.getMetaData().totalTime))
    } catch {
      return 0
    }
  }, [])

  const setPlaying = useCallback((next: boolean) => {
    if (playingRef.current === next) return
    playingRef.current = next
    callbacks.current.onPlayingChange?.(next)
  }, [])

  const tick = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    const step = () => {
      callbacks.current.onTimeUpdate?.(time())
      if (playingRef.current) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [time])

  const handle = useMemo<ReplayStageHandle>(
    () => ({
      play(offset) {
        const replayer = replayerRef.current
        if (!replayer) return
        let from = offset ?? time()
        try {
          if (offset === undefined && from >= replayer.getMetaData().totalTime - 1) from = 0
        } catch {
          from = 0
        }
        replayer.play(from)
        setPlaying(true)
        tick()
      },
      pause(offset) {
        const replayer = replayerRef.current
        if (!replayer) return
        if (offset === undefined) replayer.pause()
        else replayer.pause(offset)
        setPlaying(false)
        callbacks.current.onTimeUpdate?.(offset ?? time())
      },
      seek(ms) {
        const replayer = replayerRef.current
        if (!replayer) return
        let total = ms
        try {
          total = replayer.getMetaData().totalTime
        } catch {
          // keep ms
        }
        const next = Math.max(0, Math.min(ms, total))
        if (playingRef.current) replayer.play(next)
        else replayer.pause(next)
        callbacks.current.onTimeUpdate?.(next)
      },
      toggle() {
        if (playingRef.current) this.pause()
        else this.play()
      },
      getCurrentTime: time,
      isPlaying: () => playingRef.current,
      getDocument: () => replayerRef.current?.iframe.contentDocument ?? null,
      getDuration() {
        try {
          return replayerRef.current?.getMetaData().totalTime ?? meta.duration
        } catch {
          return meta.duration
        }
      },
    }),
    [meta.duration, setPlaying, tick, time],
  )
  useImperativeHandle(ref, () => handle, [handle])

  // Build / feed the Replayer. Appended events are fed live; a shorter list starts over.
  useEffect(() => {
    if (replayerRef.current && prepared.length < fedCountRef.current) {
      try {
        replayerRef.current.destroy()
      } catch {
        // Ignore stale player teardown.
      }
      replayerRef.current = null
      fedCountRef.current = 0
    }
    const hasSnapshot = prepared.some((event) => event.type === ReplayEventType.FullSnapshot)
    if (!hasSnapshot || !playerRef.current) return

    if (!replayerRef.current) {
      const { autoplay, speed, skipInactive, initialTime } = options.current
      const replayer = new Replayer(prepared, {
        root: playerRef.current,
        liveMode: false,
        speed,
        skipInactive,
        inactivePeriodThreshold: SKIP_IDLE_THRESHOLD_MS,
        mouseTail: false,
        showWarning: false,
      })
      replayer.on('resize', (payload) => {
        const size = payload as { width?: number; height?: number }
        if (size.width && size.height) setDims({ w: size.width, h: size.height })
      })
      replayer.on('finish', () => {
        if (options.current.loop) {
          replayer.play(0)
          setPlaying(true)
          tick()
        } else {
          setPlaying(false)
          callbacks.current.onTimeUpdate?.(time())
          callbacks.current.onFinish?.()
        }
      })
      // rrweb applies only events stamped before the pause point, so pausing at 0 would leave out the
      // mutations recorded with the first snapshot (a trimmed recording stamps everything before its
      // window there): 1ms in, the first frame is the page as recorded at the start.
      replayer.pause(Math.max(initialTime, 1))
      replayerRef.current = replayer
      fedCountRef.current = prepared.length
      let duration = meta.duration
      try {
        duration = replayer.getMetaData().totalTime
      } catch {
        // keep the event-derived duration
      }
      callbacks.current.onReady?.({ duration, width: meta.width, height: meta.height })
      callbacks.current.onTimeUpdate?.(initialTime)
      if (autoplay) handle.play(initialTime)
    } else if (prepared.length > fedCountRef.current) {
      for (let i = fedCountRef.current; i < prepared.length; i++) replayerRef.current.addEvent(prepared[i]!)
      fedCountRef.current = prepared.length
    }
  }, [prepared, meta, handle, setPlaying, tick, time])

  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current)
      try {
        replayerRef.current?.destroy()
      } catch {
        // Ignore unmount teardown errors from rrweb.
      }
      replayerRef.current = null
      fedCountRef.current = 0
    },
    [],
  )

  useEffect(() => {
    replayerRef.current?.setConfig({ speed, skipInactive })
  }, [speed, skipInactive])

  // rrweb's own cursor element; hosts drawing their own pointer overlay hide it.
  useEffect(() => {
    const mouse = playerRef.current?.querySelector<HTMLElement>('.replayer-mouse')
    if (mouse) mouse.style.visibility = showMouse ? '' : 'hidden'
  })

  useIsoLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight })
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const w = dims.w || 1280
  const h = dims.h || 720
  const scale = box.w
    ? fit === 'contain' && box.h
      ? Math.min(box.w / w, box.h / h)
      : Math.min(1, box.w / w)
    : 0
  const offsetX = scale ? Math.max(0, (box.w - w * scale) / 2) : 0
  const offsetY = scale && fit === 'contain' ? Math.max(0, (box.h - h * scale) / 2) : 0

  useEffect(() => {
    if (scale) callbacks.current.onLayout?.({ width: w, height: h, scale, offsetX, offsetY })
  }, [w, h, scale, offsetX, offsetY])

  const rootStyle: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    ...(fit === 'contain' ? { height: '100%' } : { height: scale ? Math.round(h * scale) : undefined, aspectRatio: scale ? undefined : `${w} / ${h}` }),
    ...style,
  }

  return (
    <div ref={boxRef} className={className} style={rootStyle} data-replay-stage="">
      <div
        data-replay-stage-scaler=""
        style={
          {
            position: 'absolute',
            left: offsetX,
            top: offsetY,
            width: w,
            height: h,
            transform: `scale(${scale || 0.0001})`,
            transformOrigin: 'top left',
            visibility: scale ? 'visible' : 'hidden',
            '--replay-scale': String(scale || 1),
          } as CSSProperties
        }
      >
        <div ref={playerRef} aria-hidden="true" style={{ position: 'relative', width: w, height: h, overflow: 'hidden' }} />
        {overlay ? <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>{overlay}</div> : null}
      </div>
    </div>
  )
})

export default ReplayStageImpl
