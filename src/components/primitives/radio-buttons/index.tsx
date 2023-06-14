import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radio-buttons.module.scss'

export const RadioButtons = ({
  options,
  ...rest
}: {
  options: {
    value: string
    label: string
  }[]
} & RadioGroup.RadioGroupProps) => {
  return (
    <RadioGroup.Root {...rest}>
      {options.map((option) => (
        <RadioGroup.Item
          className={s['button']}
          value={option.value}
          key={option.value}
        >
          <RadioGroup.Indicator className={s['indicator']} />
          <span className={s['content']}>{option.label}</span>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
