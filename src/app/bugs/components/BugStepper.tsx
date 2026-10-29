import Image from 'next/image'
import { marked } from 'marked'
import type { Evidence, Step } from '../data/bugs'
import { EvidenceProbes } from './EvidenceProbes'

/** A bug's markdown, rendered on the server. */
export const Prose = ({ markdown, className }: { markdown: string; className?: string }) => (
  <div
    className={`bug-prose ${className ?? ''}`}
    dangerouslySetInnerHTML={{ __html: marked.parse(markdown, { async: false }) }}
  />
)

export function EvidenceList({ evidence }: { evidence: Evidence[] }) {
  if (!evidence.length) return null
  return (
    <div className="mt-4 space-y-3">
      {evidence.map((e, i) => (
        <EvidenceProbes key={i} evidence={e} />
      ))}
    </div>
  )
}

/** A screenshot thumbnail; hovering or focusing it opens a card with the full image. */
function Thumbnail({ src, label }: { src: string; label: string }) {
  return (
    <span className="bug-thumb" tabIndex={0} role="img" aria-label={`Screenshot at ${label}`}>
      <span className="bug-thumb-frame">
        <Image src={src} alt="" fill sizes="168px" className="object-cover object-left-top" />
      </span>
      <span className="bug-thumb-card" role="tooltip">
        <Image src={src} alt={`The app at ${label}`} width={1280} height={720} sizes="720px" />
        <span className="bug-thumb-badge">{label}</span>
      </span>
    </span>
  )
}

/** Numbered steps on a rail, as the bug catalog draws them: a step with a screenshot sets it beside the text. */
export function BugStepper({ steps }: { steps: Step[] }) {
  return (
    <div className="bug-stepper">
      {steps.map((step, i) => {
        const body = (
          <>
            {step.time && <div className="bug-step-title">{step.time}</div>}
            <Prose markdown={step.text} />
            <EvidenceList evidence={step.evidence} />
          </>
        )
        return (
          <div key={i} className="bug-step">
            <div className="bug-step-rail">
              <div className="bug-step-badge">{i + 1}</div>
              {i < steps.length - 1 && <div className="bug-step-line" />}
            </div>
            {step.shot ? (
              <div className="bug-step-main bug-step-media">
                <Thumbnail src={step.shot} label={step.time ?? ''} />
                <div className="min-w-0 flex-1">{body}</div>
              </div>
            ) : (
              <div className="bug-step-main">{body}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
