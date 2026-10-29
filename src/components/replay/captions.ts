/* WebVTT captions for a replay: cues on the recording's clock (ms from its first event), as a `.vtt` file beside
   the recording holds them. Only what captions need: cue timings and text. Cue settings, STYLE and REGION blocks
   are ignored, voice and class spans keep their text, and the common entities are decoded. */

export interface ReplayCaption {
  start: number
  end: number
  text: string
}

const TIMING = /^\s*((?:\d+:)?\d{1,2}:\d{2}[.,]\d{1,3})\s*-->\s*((?:\d+:)?\d{1,2}:\d{2}[.,]\d{1,3})/

/** A WebVTT timestamp (`hh:mm:ss.ttt` or `mm:ss.ttt`) in ms. */
function vttTime(s: string): number {
  const [clock, frac = '0'] = s.replace(',', '.').split('.')
  const parts = clock!.split(':').map(Number)
  const seconds = parts.reduce((total, n) => total * 60 + n, 0)
  return seconds * 1000 + Number(frac.padEnd(3, '0').slice(0, 3))
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', lrm: '‎', rlm: '‏' }

/** A cue's text without its tags (`<v Agent>`, `<c.x>`, `<b>`, timestamps), entities decoded. */
function cueText(lines: string[]): string {
  return lines
    .join('\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, (m, e: string) =>
      e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : ENTITIES[e.toLowerCase()] ?? m,
    )
    .trim()
}

/** The cues of a WebVTT file, by start time. Malformed blocks are skipped; text that isn't WebVTT gives none. */
export function parseWebVTT(text: string): ReplayCaption[] {
  const blocks = text.replace(/^﻿/, '').replace(/\r\n?/g, '\n').split(/\n{2,}/)
  if (!/^WEBVTT(?:[ \t]|$)/.test(blocks[0] ?? '')) return []
  const cues: ReplayCaption[] = []
  for (const block of blocks.slice(1)) {
    const lines = block.split('\n')
    // An identifier line may come before the timing line.
    const at = lines.findIndex((l) => l.includes('-->'))
    if (at < 0 || at > 1) continue
    const m = TIMING.exec(lines[at]!)
    if (!m) continue
    const start = vttTime(m[1]!)
    const end = vttTime(m[2]!)
    const body = cueText(lines.slice(at + 1))
    if (end > start && body) cues.push({ start, end, text: body })
  }
  return cues.sort((a, b) => a.start - b.start)
}

/** The cues showing at `time` (usually one; overlapping cues show together, earliest first). */
export function replayCaptionsAt(cues: readonly ReplayCaption[], time: number): ReplayCaption[] {
  return cues.filter((c) => c.start <= time && time < c.end)
}
