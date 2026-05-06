'use client'

import type { SliderField } from './types'

type SliderInputProps = {
  field: SliderField
  value: number
  onChange: (v: number) => void
}

export function SliderInput({ field, value, onChange }: SliderInputProps) {
  const pct = ((value - field.min) / (field.max - field.min)) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <label className="text-sm font-medium text-gray-900">{field.label}</label>
          <p className="mt-0.5 text-xs leading-snug text-slate-500">{field.hint}</p>
        </div>
        <span className="whitespace-nowrap text-sm font-semibold tabular-nums text-accent">
          {field.format(value)}
        </span>
      </div>

      <div className="relative h-1.5 rounded-full bg-gray-200">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-accent"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={field.label}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          style={{ WebkitAppearance: 'none' }}
        />
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent shadow"
          style={{ left: `${pct}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{field.format(field.min)}</span>
        <span>{field.format(field.max)}</span>
      </div>
    </div>
  )
}
