/* rrweb's event shape and the numeric enums the replay helpers read, declared locally so the
   eager replay modules (and their published declarations) never import rrweb. rrweb is
   lazy: only the player chunk (`ReplayStageImpl`) imports it, so pages that
   never play native events never download it. */

/** One recorded rrweb event. rrweb's own `eventWithTime` is assignable to it. */
export interface ReplayEvent {
  type: number
  data: unknown
  timestamp: number
  delay?: number
}

/** rrweb `EventType`. */
export const ReplayEventType = {
  DomContentLoaded: 0,
  Load: 1,
  FullSnapshot: 2,
  IncrementalSnapshot: 3,
  Meta: 4,
  Custom: 5,
  Plugin: 6,
} as const

/** rrweb `IncrementalSource` (the subset the helpers read). */
export const ReplayIncrementalSource = {
  Mutation: 0,
  MouseMove: 1,
  MouseInteraction: 2,
  Scroll: 3,
  ViewportResize: 4,
  Input: 5,
  TouchMove: 6,
  Drag: 12,
} as const

/** rrweb `MouseInteractions` (the subset the helpers read). */
export const ReplayMouseInteraction = {
  MouseUp: 0,
  MouseDown: 1,
  Click: 2,
  ContextMenu: 3,
  DblClick: 4,
  TouchStart: 7,
  TouchEnd: 9,
} as const
