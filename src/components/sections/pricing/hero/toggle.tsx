import * as ToggleGroup from '@radix-ui/react-toggle-group'
import React from 'react'

import s from './toggle.module.css'

export type PricingModes = 'bugs' | 'tests'

export const Toggle = () => (
  <ToggleGroup.Root
    className={s.ToggleGroup}
    type="single"
    defaultValue="bugs"
    aria-label="Pricing Modes"
  >
    <ToggleGroup.Item
      className={s.ToggleGroupItem}
      value="bugs"
      aria-label="Bug Reports"
    >
      Bug Reports
    </ToggleGroup.Item>
    <ToggleGroup.Item
      className={s.ToggleGroupItem}
      value="tests"
      aria-label="Test Suites"
    >
      Test Suites
    </ToggleGroup.Item>
  </ToggleGroup.Root>
)
