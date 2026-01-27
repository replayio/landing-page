import clsx from 'clsx'
import { type ReferenceAppStage } from '~/lib/ReferenceApps'

interface ReferenceAppStatusIndicatorProps {
  stage: ReferenceAppStage
  size?: 'sm' | 'md' | 'lg'
}

const stageConfig = {
  not_tested: {
    label: 'Not Tested',
    color: 'bg-gray-400 text-white',
  },
  broken: {
    label: 'Broken',
    color: 'bg-red-500 text-white',
  },
  alpha: {
    label: 'Alpha',
    color: 'bg-yellow-500 text-white',
  },
  beta: {
    label: 'Beta',
    color: 'bg-blue-500 text-white',
  },
  release: {
    label: 'Release',
    color: 'bg-green-500 text-white',
  },
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
}

export function ReferenceAppStatusIndicator({ stage, size = 'md' }: ReferenceAppStatusIndicatorProps) {
  const config = stageConfig[stage]
  const sizeClass = sizeClasses[size]

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        config.color,
        sizeClass
      )}
    >
      {config.label}
    </span>
  )
}
