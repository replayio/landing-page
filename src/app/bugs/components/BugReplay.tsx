'use client'

import { ReplayFile, type ReplayFileProps } from '~/components/replay/ReplayFile'
// Loaded with the player, so pages with a gallery only fetch the replay styles once a modal opens.
import '~/components/replay/replay.scoped.css'
import '~/components/replay/tokens.css'

export function BugReplay(props: ReplayFileProps) {
  return <ReplayFile {...props} />
}
