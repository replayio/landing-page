'use client'

import { useMemo, useState } from 'react'
import { DEFAULT_INPUTS } from './config'
import { InputsPanel } from './InputsPanel'
import { ResultsPanel } from './ResultsPanel'
import type { RoiInputs } from './types'
import { computeRoiResults } from './utils'

export function RoiCalculator() {
  const [inputs, setInputs] = useState<RoiInputs>(DEFAULT_INPUTS)

  const results = useMemo(() => computeRoiResults(inputs), [inputs])

  const handleChange = (key: keyof RoiInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
      <InputsPanel inputs={inputs} onChange={handleChange} />
      <ResultsPanel inputs={inputs} results={results} />
    </div>
  )
}
