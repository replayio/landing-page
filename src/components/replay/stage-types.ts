import type { CSSProperties, ReactNode } from 'react'
import type { ReplayEvent } from './types'

/** Imperative control over a mounted `ReplayStage`. Times are ms from the recording's start. */
export interface ReplayStageHandle {
  /** Play from `offset` (default: the current time; from 0 when at the end). */
  play(offset?: number): void
  /** Pause, optionally jumping to `offset`. */
  pause(offset?: number): void
  /** Jump to `ms`, keeping the play state. */
  seek(ms: number): void
  toggle(): void
  getCurrentTime(): number
  getDuration(): number
  isPlaying(): boolean
  /** The replayed page's document (rrweb's iframe), once the player is up. */
  getDocument?(): Document | null
}

export interface ReplayStageLayout {
  /** Recorded viewport size (px). */
  width: number
  height: number
  /** How much the viewport is scaled to fit the stage box. */
  scale: number
  /** Where the scaled viewport sits inside the box. */
  offsetX: number
  offsetY: number
}

export interface ReplayStageProps {
  /** rrweb events; appended events are fed to the running player. */
  events: ReplayEvent[]
  autoplay?: boolean
  loop?: boolean
  /** Playback rate (1 = real time). */
  speed?: number
  /** Fast-forward idle stretches longer than 5s (rrweb `skipInactive`). Default true. */
  skipInactive?: boolean
  /** Where the paused player starts (ms). */
  initialTime?: number
  /**
   * `width` (default): scale down to the box width, height follows the recording's aspect.
   * `contain`: fill the box (give it a height) and letterbox the viewport inside it.
   */
  fit?: 'width' | 'contain'
  /** rrweb's own cursor. Hide it when drawing a pointer overlay. Default true. */
  showMouse?: boolean
  /**
   * Rendered over the page, in recorded-viewport coordinates (a box of `width × height` px
   * scaled with the page). `var(--replay-scale)` holds the scale, so an overlay can
   * counter-scale elements that should keep their on-screen size.
   */
  overlay?: ReactNode
  className?: string
  style?: CSSProperties
  /** Shown while the player chunk (rrweb) loads. */
  fallback?: ReactNode
  onReady?(info: { duration: number; width: number; height: number }): void
  /** Every frame while playing, and after each seek/pause. */
  onTimeUpdate?(ms: number): void
  onPlayingChange?(playing: boolean): void
  onFinish?(): void
  onLayout?(layout: ReplayStageLayout): void
}
