'use client'

import { SLIDER_FIELDS } from './config'
import { SliderInput } from './SliderInput'
import type { RoiInputs } from './types'

type InputsPanelProps = {
  inputs: RoiInputs
  onChange: (key: keyof RoiInputs, value: number) => void
}

export function InputsPanel({ inputs, onChange }: InputsPanelProps) {
  return (
    <div className="flex shrink-0 flex-col gap-7 rounded-2xl border border-gray-200 bg-white p-7 sm:p-8 lg:w-[420px]">
      <div>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
          Your team
        </p>
        <p className="text-sm leading-relaxed text-slate-500">
          Adjust to match your setup. We&apos;ll estimate how much debugging time and cost Replay
          removes.
        </p>
      </div>
      <div className="h-px bg-gray-200" />
      <div className="flex flex-col gap-7">
        {SLIDER_FIELDS.map((field) => (
          <SliderInput
            key={field.key}
            field={field}
            value={inputs[field.key]}
            onChange={(v) => onChange(field.key, v)}
          />
        ))}
      </div>
    </div>
  )
}
